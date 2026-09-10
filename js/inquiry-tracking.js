/* Preserve explicit campaign tags on the website-to-CRM handoff.
   This measures a click, never a submitted lead or confirmed appointment. */
(function () {
  'use strict';
  var key = 'eaf_campaign_v1';
  var ttl = 30 * 60 * 1000;
  var names = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id'];
  var destinations = {
    '/widget/form/PQwWIbbL5y2v0pBMn3Oe': 'inquiry_form',
    '/widget/bookings/easyaiflows-ai-strategy-call': 'strategy_calendar'
  };
  var campaign = {};
  var now = Date.now();
  function clean(value) {
    return typeof value === 'string' && /^[a-zA-Z0-9 _.,+()\/-]{1,100}$/.test(value) ? value : '';
  }
  try {
    var saved = JSON.parse(sessionStorage.getItem(key));
    if (saved && now - saved.savedAt < ttl && now >= saved.savedAt) {
      names.forEach(function (name) { if (clean(saved.tags[name])) campaign[name] = saved.tags[name]; });
    }
  } catch (_) { /* Tracking must not interfere with navigation. */ }
  var query = new URLSearchParams(location.search);
  var hasCampaign = names.some(function (name) { return query.has(name); });
  var externalReferral = false;
  try { externalReferral = !!document.referrer && new URL(document.referrer).origin !== location.origin; } catch (_) {}
  if (hasCampaign || externalReferral) campaign = {};
  if (hasCampaign) names.forEach(function (name) {
    var value = clean(query.get(name));
    if (value) campaign[name] = value;
  });
  try {
    if (hasCampaign || externalReferral || !Object.keys(campaign).length) sessionStorage.removeItem(key);
    if (hasCampaign && Object.keys(campaign).length) sessionStorage.setItem(key, JSON.stringify({savedAt: now, tags: campaign}));
  } catch (_) {}
  function destination(link) {
    try {
      var url = new URL(link.href, location.href);
      return url.origin === 'https://api.leadconnectorhq.com' && destinations[url.pathname] ? url : null;
    } catch (_) { return null; }
  }
  function decorate(link) {
    var url = destination(link);
    if (!url) return;
    if (!names.some(function (name) { return url.searchParams.has(name); })) {
      names.forEach(function (name) { if (campaign[name]) url.searchParams.set(name, campaign[name]); });
      link.href = url.href;
    }
  }
  document.querySelectorAll('a[href]').forEach(decorate);
  function track(event) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var url = destination(link);
    if (!url) return;
    decorate(link);
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'inquiry_form_open', {
        send_to: 'G-4LZG421Q7T',
        destination: destinations[url.pathname],
        page_path: location.pathname,
        transport_type: 'beacon'
      });
    }
  }
  document.addEventListener('click', track);
  document.addEventListener('auxclick', track);
})();
