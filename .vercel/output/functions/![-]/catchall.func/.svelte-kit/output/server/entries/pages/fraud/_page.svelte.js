import { e as ensure_array_like, b as attr_class, c as escape_html, i as stringify, a as attr } from "../../../chunks/renderer.js";
import { k as fraudCases, f as fraudSummaryMetrics, l as fraudCallToActions, m as fraudCapabilityBlueprint, n as fraudAlertFeed } from "../../../chunks/data.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let selectedCase, filteredCases;
    let activeTab = "dashboard";
    let cases = fraudCases.map((item) => ({
      ...item,
      updates: item.updates.map((update) => ({ ...update }))
    }));
    let updateDrafts = {};
    let showUpdateComposer = {};
    const tabs = [
      { id: "dashboard", label: "Dashboard" },
      { id: "suppliers", label: "Suppliers" },
      { id: "customers", label: "Customers" },
      { id: "cases", label: "Cases" },
      { id: "settings", label: "Settings" }
    ];
    const statusOptions = ["Open", "In progress", "Waiting on third party", "Resolved"];
    function toneClass(score) {
      if (score >= 90) return "critical";
      if (score >= 75) return "high";
      if (score >= 50) return "medium";
      return "low";
    }
    function sentenceCase(value) {
      return value ? value.charAt(0).toUpperCase() + value.slice(1) : "";
    }
    function caseSeverityClass(value) {
      return value?.toLowerCase() || "low";
    }
    function getCase(caseId) {
      return cases.find((item) => item.id === caseId);
    }
    function queueCount(queue) {
      return queue.items.filter((item) => {
        const caseItem = getCase(item.caseId);
        return caseItem && caseItem.status !== "Resolved";
      }).length;
    }
    selectedCase = null;
    ["All", ...new Set(cases.map((item) => item.owner))];
    filteredCases = cases.filter((item) => {
      return true;
    });
    [...filteredCases].sort((a, b) => {
      {
        if (a.status === "Resolved" && b.status !== "Resolved") return 1;
        if (a.status !== "Resolved" && b.status === "Resolved") return -1;
        return a.id < b.id ? 1 : -1;
      }
    });
    $$renderer2.push(`<div class="page-header"><span class="icon-tile"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z"></path><path d="M12 8v4M12 16h.01"></path></svg></span> <h1>Fraud</h1></div> <section class="panel main-card svelte-1roktpd"><div class="tabs-row primary svelte-1roktpd"><!--[-->`);
    const each_array = ensure_array_like(tabs);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let tab = each_array[$$index];
      $$renderer2.push(`<button${attr_class("tab svelte-1roktpd", void 0, { "active": activeTab === tab.id })}>${escape_html(tab.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="dashboard-shell svelte-1roktpd"><section class="top-summary-row svelte-1roktpd"><div class="hero-score amber-risk svelte-1roktpd"><div class="hero-topline svelte-1roktpd"><span class="hero-label svelte-1roktpd">Live risk pressure</span> <button type="button" class="hero-state svelte-1roktpd">Amber</button></div> <strong class="svelte-1roktpd">64</strong> <span class="hero-note svelte-1roktpd">Watchlist because 6 critical and high-severity cases remain active</span></div> <div class="metric-grid top-metrics svelte-1roktpd"><!--[-->`);
      const each_array_1 = ensure_array_like(fraudSummaryMetrics);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let metric = each_array_1[$$index_1];
        $$renderer2.push(`<article class="metric-card svelte-1roktpd"><span class="metric-title svelte-1roktpd">${escape_html(metric.title)}</span> <strong class="metric-value svelte-1roktpd">${escape_html(metric.value)}</strong> <span${attr_class(`metric-change ${stringify(metric.tone)}`, "svelte-1roktpd")}>${escape_html(metric.change)}</span></article>`);
      }
      $$renderer2.push(`<!--]--></div></section> <section class="content-grid svelte-1roktpd"><div class="stack svelte-1roktpd"><article class="subpanel svelte-1roktpd"><div class="section-head svelte-1roktpd"><div><h3 class="svelte-1roktpd">Priority queues</h3></div> <button class="ghost-btn svelte-1roktpd">Open cases</button></div> <div class="cta-list svelte-1roktpd"><!--[-->`);
      const each_array_2 = ensure_array_like(fraudCallToActions);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let action = each_array_2[$$index_2];
        $$renderer2.push(`<article${attr_class(`cta-card ${stringify(action.severity)}`, "svelte-1roktpd")}><div class="cta-topline svelte-1roktpd"><span${attr_class(`severity-pill ${stringify(action.severity)}`, "svelte-1roktpd")}>${escape_html(sentenceCase(action.severity))}</span> <span class="cta-count svelte-1roktpd">${escape_html(queueCount(action))} open</span></div> <h4 class="svelte-1roktpd">${escape_html(action.title)}</h4> <p class="svelte-1roktpd">${escape_html(action.detail)}</p> <div class="cta-action-row svelte-1roktpd"><button type="button" class="inline-action svelte-1roktpd">${escape_html(action.action)}</button> `);
        if (action.items?.[0]?.transactionId) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<a class="inline-action transaction-link svelte-1roktpd"${attr("href", `/transactions/${stringify(action.items[0].transactionId)}`)}>Open transaction ${escape_html(action.items[0].transactionReference)}</a>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div></article>`);
      }
      $$renderer2.push(`<!--]--></div></article> <article class="subpanel svelte-1roktpd"><div class="section-head svelte-1roktpd"><div><span class="section-kicker svelte-1roktpd">Explainable scoring</span> <h3 class="svelte-1roktpd">How each fraud feature should work</h3></div></div> <div class="blueprint-grid svelte-1roktpd"><!--[-->`);
      const each_array_3 = ensure_array_like(fraudCapabilityBlueprint);
      for (let $$index_4 = 0, $$length = each_array_3.length; $$index_4 < $$length; $$index_4++) {
        let section = each_array_3[$$index_4];
        $$renderer2.push(`<section class="blueprint-card svelte-1roktpd"><h4 class="svelte-1roktpd">${escape_html(section.title)}</h4> <ul class="svelte-1roktpd"><!--[-->`);
        const each_array_4 = ensure_array_like(section.items);
        for (let $$index_3 = 0, $$length2 = each_array_4.length; $$index_3 < $$length2; $$index_3++) {
          let item = each_array_4[$$index_3];
          $$renderer2.push(`<li>${escape_html(item)}</li>`);
        }
        $$renderer2.push(`<!--]--></ul></section>`);
      }
      $$renderer2.push(`<!--]--></div></article></div> <div class="feed-stack svelte-1roktpd"><article class="network-alert-card svelte-1roktpd"><div class="network-alert-topline svelte-1roktpd"><span class="severity-pill critical svelte-1roktpd">Alert</span> <div class="network-alert-meta svelte-1roktpd"><span class="signal-chip svelte-1roktpd">Cross-customer intelligence</span> <button type="button" class="info-helper svelte-1roktpd" aria-label="How shared intelligence works" title="Shared intelligence uses anonymised fraud signals across the platform. If one customer identifies a fraud case, matching signals can be used to warn other customers without exposing the original customer's transaction details.">i</button></div></div> <strong class="svelte-1roktpd">Northwind Components has been flagged because its bank details match a fraud case raised by another customer</strong> <p class="svelte-1roktpd">This is not an open fraud case on your account. The open case belongs to another customer on the platform,
              but the same bank details have been matched here as a precaution. You currently have 3 outstanding
              invoices from Northwind Components, with total exposure of £18.4k.</p></article> <article class="subpanel feed-panel svelte-1roktpd"><div class="section-head svelte-1roktpd"><div><span class="section-kicker svelte-1roktpd">Real-time signals</span> <h3 class="svelte-1roktpd">Alert feed</h3></div> <button class="ghost-btn svelte-1roktpd">Open case</button></div> <div class="feed-table-wrap svelte-1roktpd"><table class="feed-table svelte-1roktpd"><thead><tr><th class="svelte-1roktpd">Entity</th><th class="svelte-1roktpd">Type</th><th class="svelte-1roktpd">Signal</th><th class="svelte-1roktpd">Score</th><th class="svelte-1roktpd">Status</th><th class="svelte-1roktpd">Owner</th><th class="svelte-1roktpd">Updated</th></tr></thead><tbody><!--[-->`);
      const each_array_5 = ensure_array_like(fraudAlertFeed);
      for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
        let alert = each_array_5[$$index_5];
        $$renderer2.push(`<tr><td class="entity-cell svelte-1roktpd"><strong class="svelte-1roktpd">${escape_html(alert.entity)}</strong></td><td class="svelte-1roktpd">${escape_html(alert.type)}</td><td class="svelte-1roktpd">${escape_html(alert.signal)}</td><td class="svelte-1roktpd"><button${attr_class(`score-badge clickable ${stringify(toneClass(alert.score))}`, "svelte-1roktpd")}>${escape_html(alert.score)}</button></td><td class="svelte-1roktpd">${escape_html(alert.status)}</td><td class="svelte-1roktpd">${escape_html(alert.owner)}</td><td class="svelte-1roktpd">${escape_html(alert.updated)}</td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div></article></div></section></div>`);
    }
    $$renderer2.push(`<!--]--></section> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (selectedCase) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="queue-modal-backdrop svelte-1roktpd" role="button" tabindex="0" aria-label="Close case details"><div class="queue-modal case-modal svelte-1roktpd" role="dialog" tabindex="0" aria-modal="true" aria-labelledby="case-modal-title"><div class="queue-modal-head svelte-1roktpd"><div><span class="section-kicker svelte-1roktpd">${escape_html(selectedCase.source)} case</span> <h3 id="case-modal-title" class="svelte-1roktpd">${escape_html(selectedCase.id)} · ${escape_html(selectedCase.entity)}</h3></div> <div class="queue-meta svelte-1roktpd"><button${attr_class(`severity-pill clickable ${stringify(caseSeverityClass(selectedCase.severity))}`, "svelte-1roktpd")}>${escape_html(sentenceCase(selectedCase.severity))}</button> <span class="status-pill neutral svelte-1roktpd">${escape_html(selectedCase.status)}</span> <button type="button" class="close-btn svelte-1roktpd" aria-label="Close">×</button></div></div> <div class="case-summary-grid svelte-1roktpd"><div class="summary-card svelte-1roktpd"><span class="svelte-1roktpd">Queue</span><strong class="svelte-1roktpd">${escape_html(selectedCase.queue)}</strong></div> <div class="summary-card svelte-1roktpd"><span class="svelte-1roktpd">Owner</span><strong class="svelte-1roktpd">${escape_html(selectedCase.owner)}</strong></div> <div class="summary-card svelte-1roktpd"><span class="svelte-1roktpd">Due</span><strong class="svelte-1roktpd">${escape_html(selectedCase.due)}</strong></div> <div class="summary-card svelte-1roktpd"><span class="svelte-1roktpd">Risk score</span><strong class="svelte-1roktpd"><button class="risk-inline svelte-1roktpd">${escape_html(selectedCase.score)}</button></strong></div></div> <article class="case-body-card svelte-1roktpd"><span class="section-kicker svelte-1roktpd">Case summary</span> <p class="svelte-1roktpd">${escape_html(selectedCase.summary)}</p> <div class="queue-next-step svelte-1roktpd"><span class="svelte-1roktpd">Next step</span> <strong class="svelte-1roktpd">${escape_html(selectedCase.nextStep)}</strong></div></article> <div class="case-controls svelte-1roktpd"><label class="control-field svelte-1roktpd"><span class="svelte-1roktpd">Status</span> `);
      $$renderer2.select(
        { value: selectedCase.status, class: "" },
        ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_20 = ensure_array_like(statusOptions);
          for (let $$index_20 = 0, $$length = each_array_20.length; $$index_20 < $$length; $$index_20++) {
            let status = each_array_20[$$index_20];
            $$renderer3.option({ value: status }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(status)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        },
        "svelte-1roktpd"
      );
      $$renderer2.push(`</label> <div class="case-buttons svelte-1roktpd"><button class="ghost-btn svelte-1roktpd">Add update</button> <button class="ghost-btn success svelte-1roktpd">Resolve</button></div></div> `);
      if (showUpdateComposer[selectedCase.id]) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="composer svelte-1roktpd"><textarea rows="3" placeholder="Add a progress note, callback outcome, or third-party update" class="svelte-1roktpd">`);
        const $$body_1 = escape_html(updateDrafts[selectedCase.id]);
        if ($$body_1) {
          $$renderer2.push(`${$$body_1}`);
        }
        $$renderer2.push(`</textarea> <div class="composer-actions svelte-1roktpd"><button class="ghost-btn svelte-1roktpd">Cancel</button> <button class="ghost-btn solid svelte-1roktpd">Save update</button></div></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <article class="case-body-card svelte-1roktpd"><span class="section-kicker svelte-1roktpd">Audit trail</span> <div class="timeline svelte-1roktpd"><!--[-->`);
      const each_array_21 = ensure_array_like(selectedCase.updates);
      for (let $$index_21 = 0, $$length = each_array_21.length; $$index_21 < $$length; $$index_21++) {
        let update = each_array_21[$$index_21];
        $$renderer2.push(`<div class="timeline-item svelte-1roktpd"><div class="timeline-top svelte-1roktpd"><strong>${escape_html(update.author)}</strong> <span class="svelte-1roktpd">${escape_html(update.time)}</span></div> <p class="svelte-1roktpd">${escape_html(update.note)}</p></div>`);
      }
      $$renderer2.push(`<!--]--></div></article></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
