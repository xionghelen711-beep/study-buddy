import http from 'node:http';
import {readFile} from 'node:fs/promises';
const port=Number(process.env.PORT||3000),model=process.env.AI_MODEL||'';
const base=(process.env.AI_BASE_URL||'http://127.0.0.1:11434/v1').replace(/\/$/,'');
const headers={'Content-Type':'application/json',...(process.env.AI_API_KEY?{Authorization:`Bearer ${process.env.AI_API_KEY}`}:{})};
const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
let busy=false;
http.createServer(async(req,res)=>{
 const url=new URL(req.url,`http://127.0.0.1:${port}`);
 if(!['127.0.0.1','localhost'].includes((req.headers.host||'').split(':')[0]))return json(res,403,{error:'Invalid host'});
 if(req.headers.origin&&!['http://localhost:'+port,'http://127.0.0.1:'+port].includes(req.headers.origin))return json(res,403,{error:'Origin rejected'});
 if(url.pathname==='/api/status'&&req.method==='GET')return json(res,200,{configured:!!model,model,provider:/localhost|127\.0\.0\.1/.test(base)?'本地模型':'在线模型'});
 if(url.pathname==='/api/chat'&&req.method==='POST'){
  if(!model)return json(res,503,{error:'AI 尚未配置。请按 README 设置服务端 .env；本地练习仍可正常使用。'});
  if(busy)return json(res,429,{error:'模型忙碌，请稍后重试。'});
  let raw='';
  try{
   for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>16000)return json(res,413,{error:'请求过长'});}
   let body;try{body=JSON.parse(raw);}catch{return json(res,400,{error:'无效 JSON'});}
   if(typeof body.message!=='string'||!body.message.trim()||body.message.length>2000)return json(res,400,{error:'请输入 1–2000 字的问题。'});
   busy=true;
   const upstream=await fetch(`${base}/chat/completions`,{method:'POST',headers,signal:AbortSignal.timeout(90000),body:JSON.stringify({model,messages:[{role:'system',content:'You are Study Buddy, an English tutor for a Chinese student learning CS. Explain in Chinese with English examples. Be concise. Help with vocabulary, grammar and sentence correction. Never claim to save progress.'},{role:'user',content:body.message}],stream:false,max_tokens:1800})});
   if(!upstream.ok)return json(res,502,{error:`模型服务返回 HTTP ${upstream.status}。请检查模型名称、密钥、余额或日志。`});
   const result=await upstream.json();const answer=result.choices?.[0]?.message?.content?.replace(/<think>[\s\S]*?<\/think>/g,'').trim();
   if(!answer)return json(res,502,{error:'模型未返回正文，请增加输出预算或换用其他模型。'});
   return json(res,200,{answer,model});
  }catch{return json(res,502,{error:'模型连接失败或超过 90 秒。请确认服务已启动、模型已下载且地址可访问。'});}finally{busy=false;}
 }
 if(req.method!=='GET')return json(res,405,{error:'Method not allowed'});
 const files={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/style.css':'style.css','/data.js':'data.js'};
 const file=files[url.pathname];if(!file)return json(res,404,{error:'Not found'});
 try{const data=await readFile(new URL('./public/'+file,import.meta.url));res.writeHead(200,{'Content-Type':file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8','X-Content-Type-Options':'nosniff'});res.end(data);}catch{json(res,500,{error:'读取失败'});}
}).listen(port,'127.0.0.1',()=>console.log(`Study Buddy: http://127.0.0.1:${port}`));
