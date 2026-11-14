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
  var tutorialKey = 'eaf_tutorial_v1';
  var tutorialPaths = ['publish-claude-designed-website','export-claude-design-as-png','do-all-ai-tools-build-the-same-ui'];
  var tutorial = '';
  var originals = new Map();
  function allowed() { return typeof window.eafAnalyticsAllowed === 'function' && window.eafAnalyticsAllowed(); }
  var campaign = {};
  var now = Date.now();
  function clean(value) {
    return typeof value === 'string' && /^[a-zA-Z0-9 _.,+()\/-]{1,100}$/.test(value) ? value : '';
  }
  function destination(link) {
    try {
      var url = new URL(link.href, location.href);
      return url.origin === 'https://api.leadconnectorhq.com' && destinations[url.pathname] ? url : null;
    } catch (_) { return null; }
  }
  function decorate(link) {
    var url = destination(link);
    if (!url || !allowed()) return;
    if (!originals.has(link)) originals.set(link, link.href);
    if (!names.some(function (name) { return url.searchParams.has(name); })) {
      names.forEach(function (name) { if (campaign[name]) url.searchParams.set(name, campaign[name]); });
    }
    if (tutorial) {
      // Preserve acquisition UTMs; this identifies the assisting tutorial, not a traffic source.
      if (!url.searchParams.has('utm_content')) url.searchParams.set('utm_content', 'eaf_tutorial_' + tutorial);
      url.searchParams.set('eaf_tutorial', tutorial);
    }
    link.href = url.href;
  }
  function refresh() {
    originals.forEach(function (href, link) { link.href = href; });
    campaign = {}; tutorial = ''; now = Date.now();
    if (!allowed()) return;
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
    try {
      var previous = JSON.parse(sessionStorage.getItem(tutorialKey));
      if (!externalReferral && !hasCampaign && previous && now - previous.savedAt >= 0 && now - previous.savedAt < ttl && tutorialPaths.indexOf(previous.id) !== -1) tutorial = previous.id;
      if (externalReferral || hasCampaign) sessionStorage.removeItem(tutorialKey);
    } catch (_) {}
    tutorialPaths.forEach(function (slug) { if (location.pathname === '/blog/' + slug + '.html') tutorial = slug; });
    if (tutorial) {
      try { sessionStorage.setItem(tutorialKey, JSON.stringify({id:tutorial,savedAt:now})); } catch (_) {}
    }
    document.querySelectorAll('a[href]').forEach(decorate);
  }
  refresh();
  document.addEventListener('eaf-consent-change', refresh);
  function track(event) {
    if (!allowed()) return;
    if (event.type === 'auxclick' && event.button !== 1) return;
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    refresh();
    var url = destination(link);
    if (!url) return;
    decorate(link);
    if (typeof window.gtag === 'function') {
      window.gtag('event', destinations[url.pathname] === 'strategy_calendar' ? 'strategy_call_click' : 'inquiry_form_open', {
        send_to: 'G-4LZG421Q7T',
        destination: destinations[url.pathname],
        page_path: location.pathname,
        tutorial_id: tutorial || undefined,
        link_url: link.href,
        link_text: (link.textContent || '').trim().slice(0, 100),
        transport_type: 'beacon'
      });
    }
  }
  document.addEventListener('click', track);
  document.addEventListener('auxclick', track);
})();
