/* Basic consent: no Google library, measurement or attribution storage before opt-in. */
(function () {
  'use strict';
  var id = 'G-4LZG421Q7T', key = 'eaf_analytics_consent_v1', choice = null, loaded = false;
  try { var saved = JSON.parse(localStorage.getItem(key)); if (saved && saved.expires > Date.now()) choice = saved.choice; } catch (_) {}
  if (choice !== 'granted' && choice !== 'denied') choice = null;
  window.eafAnalyticsAllowed = function () { return choice === 'granted'; };
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  function load() {
    if (loaded || !window.eafAnalyticsAllowed()) return;
    loaded = true;
    window['ga-disable-' + id] = false;
    window.gtag('consent', 'update', {analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
    window.gtag('js', new Date());
    window.gtag('config', id, {allow_google_signals:false,allow_ad_personalization_signals:false});
    var script = document.createElement('script'); script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id; document.head.appendChild(script);
  }
  function save(value) {
    choice = value;
    try { localStorage.setItem(key, JSON.stringify({choice:value,expires:Date.now()+180*86400000})); } catch (_) {}
    if (value === 'denied') {
      window['ga-disable-' + id] = true;
      try { sessionStorage.removeItem('eaf_campaign_v1'); sessionStorage.removeItem('eaf_tutorial_v1'); } catch (_) {}
      document.cookie.split(';').forEach(function (part) {
        var name = part.trim().split('=')[0];
        if (!/^_ga(?:_|$)/.test(name)) return;
        ['', '; Domain=easyaiflows.com', '; Domain=.easyaiflows.com'].forEach(function (domain) { document.cookie = name + '=; Max-Age=0; Path=/' + domain; });
      });
    } else load();
    document.dispatchEvent(new Event('eaf-consent-change'));
    panel.hidden = true;
    if (value === 'denied' && loaded) location.reload();
  }
  var panel = document.createElement('section');
  panel.setAttribute('aria-label', 'Analytics preferences');
  panel.style.cssText = 'position:fixed;bottom:12px;left:12px;right:12px;z-index:10000;max-width:620px;padding:18px;background:#fff;color:#172033;border:1px solid #64748b;border-radius:8px;box-shadow:0 3px 18px #0003;font:16px/1.5 system-ui';
  panel.innerHTML = '<p style="margin:0 0 12px">Allow analytics to help us understand which guides lead to strategy calls? This enables Google Analytics and adds guide information to booking links. You can book without allowing analytics. <a href="/privacy/">Privacy policy</a></p>';
  ['Allow analytics','Decline analytics'].forEach(function (label, index) { var b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.style.cssText='padding:10px;margin:4px;border:1px solid #475569;background:#fff;color:#172033;border-radius:4px;cursor:pointer'; b.onclick = function () { save(index === 0 ? 'granted' : 'denied'); }; panel.appendChild(b); });
  var settings = document.createElement('button'); settings.type='button'; settings.textContent='Analytics preferences'; settings.style.cssText='display:block;margin:16px auto;padding:8px'; settings.onclick=function(){panel.hidden=false;panel.querySelector('button').focus();};
  document.body.appendChild(panel); document.body.appendChild(settings); panel.hidden = choice !== null;
  if (choice === 'denied') { try { sessionStorage.removeItem('eaf_campaign_v1'); sessionStorage.removeItem('eaf_tutorial_v1'); } catch (_) {} }
  window.addEventListener('storage', function (event) { if (event.key === key) { window['ga-disable-' + id] = true; location.reload(); } });
  load();
})();
