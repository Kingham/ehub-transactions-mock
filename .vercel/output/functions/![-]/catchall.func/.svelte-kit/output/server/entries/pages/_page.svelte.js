import { h as head, e as ensure_array_like, c as escape_html } from "../../chunks/renderer.js";
import { f as fraudSummaryMetrics, a as fraudFeatureCatalog } from "../../chunks/data.js";
function _page($$renderer) {
  const spotlightItems = [
    "Operational dashboard for payment and order risk intervention",
    "Embedded fraud signals inside modules such as Statement Reconciliation, not just in a standalone workspace",
    "Supplier and customer risk worklists with explainable scoring, configurable thresholds, and full audit trail"
  ];
  head("1uha8ag", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Open ECX Fraud Module</title>`);
    });
  });
  $$renderer.push(`<div class="overview-shell svelte-1uha8ag"><header class="hero svelte-1uha8ag"><div class="hero-bar svelte-1uha8ag"><div class="hero-brand svelte-1uha8ag"><img class="hero-logo svelte-1uha8ag" src="https://openecxcdn.blob.core.windows.net/live/missioncontrol/Customer%20Images/Open%20ECX/Open-ECX-Logo.svg" alt="Open ECX"/> <nav class="module-switch svelte-1uha8ag"><a class="switch-link active svelte-1uha8ag" href="/">Fraud</a> <a class="switch-link svelte-1uha8ag" href="/community-info">Community</a></nav></div> <div class="hero-actions svelte-1uha8ag"><a class="map-link svelte-1uha8ag" href="/module-maps">View mind maps</a> <a class="enter-app svelte-1uha8ag" href="/fraud">Open module</a></div></div> <div class="hero-grid svelte-1uha8ag"><div><span class="eyebrow svelte-1uha8ag">Fraud module overview</span> <h1 class="svelte-1uha8ag">Fraud controls across suppliers, invoices, payments, customers, and orders.</h1> <p class="svelte-1uha8ag">This page is a concise internal overview of how Fraud sits across the platform. The working screens remain embedded inside each operational module, while this page summarises the capability set and operating model.</p> <div class="spotlight-list svelte-1uha8ag"><!--[-->`);
  const each_array = ensure_array_like(spotlightItems);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$renderer.push(`<div class="spotlight-item svelte-1uha8ag">${escape_html(item)}</div>`);
  }
  $$renderer.push(`<!--]--></div></div> <div class="hero-panel svelte-1uha8ag"><span class="panel-label svelte-1uha8ag">Module outcomes</span> <div class="hero-metrics svelte-1uha8ag"><!--[-->`);
  const each_array_1 = ensure_array_like(fraudSummaryMetrics);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let metric = each_array_1[$$index_1];
    $$renderer.push(`<div class="mini-metric svelte-1uha8ag"><span class="svelte-1uha8ag">${escape_html(metric.title)}</span> <strong class="svelte-1uha8ag">${escape_html(metric.value)}</strong></div>`);
  }
  $$renderer.push(`<!--]--></div></div></div></header> <main class="content svelte-1uha8ag"><!--[-->`);
  const each_array_2 = ensure_array_like(fraudFeatureCatalog);
  for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
    let group = each_array_2[$$index_3];
    $$renderer.push(`<section class="feature-section svelte-1uha8ag"><div class="section-head svelte-1uha8ag"><span class="section-mark svelte-1uha8ag"></span> <h2 class="svelte-1uha8ag">${escape_html(group.title)}</h2></div> <div class="feature-grid svelte-1uha8ag"><!--[-->`);
    const each_array_3 = ensure_array_like(group.features);
    for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
      let feature = each_array_3[$$index_2];
      $$renderer.push(`<article class="feature-card svelte-1uha8ag"><h3 class="svelte-1uha8ag">${escape_html(feature.name)}</h3> <p class="svelte-1uha8ag">${escape_html(feature.detail)}</p></article>`);
    }
    $$renderer.push(`<!--]--></div></section>`);
  }
  $$renderer.push(`<!--]--></main></div>`);
}
export {
  _page as default
};
