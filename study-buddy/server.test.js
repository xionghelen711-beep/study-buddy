import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import http from 'node:http';
const cwd=new URL('.',import.meta.url);
async function launch(port,extra={}){
 const proc=spawn(process.execPath,['server.js'],{cwd,env:{...process.env,PORT:String(port),AI_MODEL:'',AI_API_KEY:'',...extra},stdio:['ignore','pipe','pipe']});
 await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('startup timeout')),5000);proc.stdout.once('data',()=>{clearTimeout(timer);resolve();});proc.once('error',reject);});
 return proc;
}
test('static app, safe file serving and disabled AI',async()=>{
 const p=await launch(3011);const base='http://127.0.0.1:3011';
 try{
 assert.equal((await fetch(base)).status,200);
 assert.equal((await fetch(base+'/app.js')).status,200);
 assert.equal((await fetch(base+'/.env')).status,404);
 assert.equal((await fetch(base+'/server.js')).status,404);
 assert.equal((await(await fetch(base+'/api/status')).json()).configured,false);
 assert.equal((await fetch(base+'/api/chat',{method:'POST',body:'{}'})).status,503);
 assert.equal((await fetch(base+'/api/chat',{method:'POST',headers:{Origin:'https://example.com'},body:'{}'})).status,403);
 }finally{p.kill();}
});
test('configured proxy forwards model/key and returns real upstream text; handles errors',async()=>{
 let received;
 const mock=http.createServer(async(req,res)=>{let raw='';for await(const c of req)raw+=c;received={path:req.url,key:req.headers.authorization,body:JSON.parse(raw)};res.setHeader('Content-Type','application/json');res.end(JSON.stringify({choices:[{message:{content:'A test-only upstream answer.'}}]}));});
 await new Promise(r=>mock.listen(3013,'127.0.0.1',r));
 const p=await launch(3012,{AI_MODEL:'test-model',AI_API_KEY:'test-secret',AI_BASE_URL:'http://127.0.0.1:3013/v1'});
 const post=body=>fetch('http://127.0.0.1:3012/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 try{
 assert.equal((await post({message:''})).status,400);
 assert.equal((await post({message:'x'.repeat(2001)})).status,400);
 const response=await(await post({message:'Explain a noun.'})).json();
 assert.equal(response.answer,'A test-only upstream answer.');
 assert.equal(received.path,'/v1/chat/completions');assert.equal(received.key,'Bearer test-secret');assert.equal(received.body.model,'test-model');
 await new Promise(r=>mock.close(r));assert.equal((await post({message:'Hi'})).status,502);
 }finally{p.kill();mock.close();}
});
