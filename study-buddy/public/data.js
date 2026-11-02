// 人工编写的本地样例课程，不是实时 AI 输出。
export const words=[
['algorithm','/ˈælɡərɪðəm/','算法','A good algorithm solves a problem step by step.','好的算法逐步解决问题。','计算机'],
['variable','/ˈveəriəbl/','变量','Store the result in a variable.','把结果存入变量。','计算机'],
['iterate','/ˈɪtəreɪt/','迭代；遍历','We iterate over the items in the list.','我们遍历列表中的元素。','计算机'],
['function','/ˈfʌŋkʃən/','函数；功能','This function returns a number.','这个函数返回一个数字。','计算机'],
['debug','/ˌdiːˈbʌɡ/','调试','I learned how to debug my code.','我学会了如何调试代码。','计算机'],
['efficient','/ɪˈfɪʃənt/','高效的','This method is more efficient.','这个方法更高效。','计算机'],
['dataset','/ˈdeɪtəset/','数据集','The dataset contains a thousand records.','数据集包含一千条记录。','数据科学'],
['predict','/prɪˈdɪkt/','预测','The model can predict future trends.','模型可以预测未来趋势。','数据科学'],
['evidence','/ˈevɪdəns/','证据','We need evidence to support this idea.','我们需要证据支持这个观点。','数据科学'],
['distribution','/ˌdɪstrɪˈbjuːʃən/','分布','Look at the distribution of the data.','看一下数据的分布。','数据科学'],
['accuracy','/ˈækjərəsi/','准确率；准确性','We measured the accuracy of the model.','我们测量了模型的准确率。','数据科学'],
['pattern','/ˈpætən/','模式；规律','Can you find a pattern in these numbers?','你能找出这些数字的规律吗？','数据科学'],
['curious','/ˈkjʊəriəs/','好奇的','Stay curious and keep asking questions.','保持好奇，不断提问。','学习日常'],
['consistent','/kənˈsɪstənt/','持续的；一致的','Consistent practice builds confidence.','持续练习建立信心。','学习日常'],
['challenge','/ˈtʃælɪndʒ/','挑战','Learning a new language is a challenge.','学习新语言是一项挑战。','学习日常'],
['progress','/ˈprəʊɡres/','进步；进展','Small steps lead to real progress.','小步前进带来真正的进步。','学习日常'],
['reflect','/rɪˈflekt/','反思；反映','Reflect on what you learned today.','反思今天学到的内容。','学习日常'],
['achieve','/əˈtʃiːv/','实现；达到','You can achieve your goal with practice.','通过练习，你可以实现目标。','学习日常']
].map(([word,phonetic,meaning,example,translation,topic])=>({id:word,word,phonetic,meaning,example,translation,topic}));
export const questions=[
['一般现在时','She ___ Python every day.',['study','studies','studying','studied'],1,'She 是第三人称单数。一般现在时中 study 变为 studies；辅音字母 + y 结尾，变 y 为 i 再加 es。'],
['现在完成时','I ___ three exercises so far.',['finish','finished','have finished','am finishing'],2,'so far 表示「到目前为止」，强调过去动作与现在的联系，用 have/has + 过去分词。'],
['条件句','If it rains tomorrow, we ___ at home.',['stay','stayed','will stay','have stayed'],2,'第一条件句描述真实可能：if 从句用一般现在时，主句用 will + 动词原形。'],
['被动语态','The data ___ every morning.',['collect','collects','is collected','is collecting'],2,'数据是被收集的，使用 be + 过去分词。这里把 data 作为整体数据看待，使用 is。'],
['动名词','She enjoys ___ new languages.',['learn','to learn','learning','learned'],2,'enjoy 后接动名词（doing），不是 to do。类似结构有 finish doing、avoid doing。'],
['比较级','This solution is ___ than the old one.',['efficient','most efficient','more efficient','efficiency'],2,'than 表示比较。efficient 是多音节形容词，比较级用 more efficient。'],
['关系从句','A programmer is someone ___ writes code.',['which','who','where','when'],1,'someone 指人，关系代词用 who，在从句中作主语。'],
['冠词','She wrote ___ useful function.',['a','an','the only','no'],0,'a/an 取决于发音。useful 以辅音 /j/ 开头，因此用 a。'],
['过去进行时','I ___ when you called.',['study','have studied','was studying','will study'],2,'过去某一时刻正在进行的动作，用 was/were + doing。'],
['主谓一致','Each of the students ___ a laptop.',['have','has','having','are having'],1,'each 作主语时谓语用单数，因此选择 has。'],
['不定式','We decided ___ a new project.',['start','starting','to start','started'],2,'decide 后接 to do，表示决定做某事。'],
['介词','She is interested ___ machine learning.',['on','at','in','for'],2,'be interested in 是固定搭配，表示「对……感兴趣」。']
].map(([topic,prompt,options,answer,explanation],i)=>({id:String(i),topic,prompt,options,answer,explanation}));
