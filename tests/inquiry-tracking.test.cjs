const vm = require('node:vm');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const code = fs.readFileSync(require('node:path').join(__dirname, '../js/inquiry-tracking.js'), 'utf8');
const target = 'https://api.leadconnectorhq.com/widget/form/PQwWIbbL5y2v0pBMn3Oe';
function visit(search='', storage=new Map(), href=target, referrer='', now=10000000, blocked=false) {
  const link={href}; const handlers={}; const events=[];
  const context={URL, URLSearchParams, Date:{now:()=>now}, location:new URL('https://easyaiflows.com/blog/example'+search), window:{gtag:(...args)=>events.push(args)}, sessionStorage:{getItem:k=>{if(blocked)throw Error();return storage.get(k)||null;},setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},document:{referrer,querySelectorAll:()=>[link],addEventListener:(k,fn)=>handlers[k]=fn}};
  vm.runInNewContext(code, context);
  const click=(type='click',button=0)=>handlers[type]({type,button,target:{closest:()=>link}});
  return {link,events,click,storage};
}
let a=visit('?utm_source=test&utm_medium=email&utm_campaign=setup&email=private%40example.com');
assert.equal(new URL(a.link.href).searchParams.get('utm_campaign'),'setup');
assert.equal(new URL(a.link.href).searchParams.has('email'),false);
a.click(); assert.equal(a.events.length,1); assert.equal(a.events[0][1],'inquiry_form_open');
assert.equal(a.events[0][2].page_path,'/blog/example');
let b=visit('',a.storage); assert.equal(new URL(b.link.href).searchParams.get('utm_source'),'test');
let expired=visit('',a.storage,target,'',10000000+1800001); assert.equal(expired.link.href,target);
let fresh=visit('?utm_source=original&utm_medium=email');
let referral=visit('',fresh.storage,target,'https://www.google.com/'); assert.equal(referral.link.href,target);
let invalid=visit('?utm_source=private%40example.com'); assert.equal(invalid.link.href,target);
let preset=visit('?utm_source=test',new Map(),target+'?utm_source=partner'); assert.equal(new URL(preset.link.href).searchParams.get('utm_source'),'partner');
let unrelated=visit('?utm_source=test',new Map(),'https://example.com/'); unrelated.click(); assert.equal(unrelated.link.href,'https://example.com/'); assert.equal(unrelated.events.length,0);
let noStorage=visit('?utm_source=test',new Map(),target,'',10000000,true); noStorage.click(); assert.equal(noStorage.events.length,1);
let direct=visit(); assert.equal(direct.link.href,target); direct.click('auxclick',2); assert.equal(direct.events.length,0); direct.click('auxclick',1); assert.equal(direct.events.length,1);
console.log('PASS: campaign handoff, internal navigation, expiration, external referral reset, sensitive/unknown parameter exclusion, explicit destination campaign, unrelated links, blocked storage, direct traffic, click-only event and middle/right clicks.');
