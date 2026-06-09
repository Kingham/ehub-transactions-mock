import { h as head, e as ensure_array_like, c as escape_html } from "../../../chunks/renderer.js";
import { i as communitySummaryMetrics, j as communityFeatureCatalog } from "../../../chunks/data.js";
function _page($$renderer) {
  const spotlightItems = [
    "Shared supplier and customer visibility across invoices, orders, payments, and delivery milestones",
    "External self-service tracking, messaging, and document access embedded into the operational transaction flow",
    "A future-facing community layer for notifications, role-managed collaboration, analytics, and AI assistance"
  ];
  head("kf58qh", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Open ECX Community Module</title>`);
    });
  });
  $$renderer.push(`<div class="overview-shell svelte-kf58qh"><header class="hero svelte-kf58qh"><div class="hero-bar svelte-kf58qh"><div class="hero-brand svelte-kf58qh"><img class="hero-logo svelte-kf58qh" src="https://openecxcdn.blob.core.windows.net/live/missioncontrol/Customer%20Images/Open%20ECX/Open-ECX-Logo.svg" alt="Open ECX"/> <nav class="module-switch svelte-kf58qh"><a class="switch-link svelte-kf58qh" href="/">Fraud</a> <a class="switch-link active svelte-kf58qh" href="/community-info">Community</a></nav></div> <div class="hero-actions svelte-kf58qh"><a class="map-link svelte-kf58qh" href="/module-maps">View mind maps</a> <a class="enter-app svelte-kf58qh" href="/community">Open module</a></div></div> <div class="hero-grid svelte-kf58qh"><div><span class="eyebrow svelte-kf58qh">Community module overview</span> <h1 class="svelte-kf58qh">Shared visibility, communication, and self-service across invoices, payments, orders, and delivery events.</h1> <p class="svelte-kf58qh">This page is a concise internal overview of how Community gives suppliers and customers controlled visibility into the lifecycle of their transactions. The working screens remain operational, while this page summarises the capability set and experience.</p> <div class="spotlight-list svelte-kf58qh"><!--[-->`);
  const each_array = ensure_array_like(spotlightItems);
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let item = each_array[$$index];
    $$renderer.push(`<div class="spotlight-item svelte-kf58qh">${escape_html(item)}</div>`);
  }
  $$renderer.push(`<!--]--></div></div> <div class="hero-panel svelte-kf58qh"><span class="panel-label svelte-kf58qh">Module outcomes</span> <div class="hero-metrics svelte-kf58qh"><!--[-->`);
  const each_array_1 = ensure_array_like(communitySummaryMetrics);
  for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
    let metric = each_array_1[$$index_1];
    $$renderer.push(`<div class="mini-metric svelte-kf58qh"><span class="svelte-kf58qh">${escape_html(metric.title)}</span> <strong class="svelte-kf58qh">${escape_html(metric.value)}</strong></div>`);
  }
  $$renderer.push(`<!--]--></div></div></div></header> <main class="content svelte-kf58qh"><!--[-->`);
  const each_array_2 = ensure_array_like(communityFeatureCatalog);
  for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
    let group = each_array_2[$$index_3];
    $$renderer.push(`<section class="feature-section svelte-kf58qh"><div class="section-head svelte-kf58qh"><span class="section-mark svelte-kf58qh"></span> <h2 class="svelte-kf58qh">${escape_html(group.title)}</h2></div> <div class="feature-grid svelte-kf58qh"><!--[-->`);
    const each_array_3 = ensure_array_like(group.features);
    for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
      let feature = each_array_3[$$index_2];
      $$renderer.push(`<article class="feature-card svelte-kf58qh"><h3 class="svelte-kf58qh">${escape_html(feature.name)}</h3> <p class="svelte-kf58qh">${escape_html(feature.detail)}</p></article>`);
    }
    $$renderer.push(`<!--]--></div></section>`);
  }
  $$renderer.push(`<!--]--></main></div>`);
}
export {
  _page as default
};
