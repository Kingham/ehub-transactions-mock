import { c as escape_html, b as attr_class, e as ensure_array_like, i as stringify, a as attr } from "../../../../chunks/renderer.js";
import { o as statementDetail } from "../../../../chunks/data.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const d = statementDetail;
    let highlightedLines = [];
    function statusClass(s) {
      if (!s) return "";
      if (s === "Matched") return "matched";
      if (s === "Matched within Tolerance") return "tolerance";
      if (s === "Matched with Different Total") return "diff-total";
      if (s === "Not Matched") return "not-matched";
      if (s === "Query Raised") return "query";
      return "";
    }
    function fraudToneClass(tone) {
      if (tone === "critical") return "critical";
      if (tone === "high") return "high";
      if (tone === "medium") return "medium";
      return "";
    }
    function rowFraudSignal(row) {
      if (row.line === null && row.statementMessage === "Not Found on Statement") {
        return d.fraud.rowSignals.docNotOnStatement;
      }
      return d.fraud.rowSignals[row.line] || null;
    }
    $$renderer2.push(`<section class="recon-head panel svelte-18r24pm"><div class="head-left svelte-18r24pm"><span class="head-title svelte-18r24pm">Statement Reconciliation</span> <span class="status-pill svelte-18r24pm">${escape_html(d.status)}</span></div> <div class="head-right svelte-18r24pm"><button class="btn-text svelte-18r24pm">Disregard Statement</button> <button class="btn-outline-teal svelte-18r24pm">Reconcile Statement</button> <button class="btn-navy svelte-18r24pm">Add Note</button> <button class="btn-text svelte-18r24pm">Actions</button> <div class="select svelte-18r24pm"><span>Options</span> <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"></path></svg></div> <div class="assign-chip svelte-18r24pm"><span class="avatar svelte-18r24pm">${escape_html(d.assignedInitials)}</span> <div class="assign-text svelte-18r24pm"><span class="small-dim svelte-18r24pm">Assigned To</span> <span class="small-strong svelte-18r24pm">${escape_html(d.assignedTo)}</span></div></div></div></section> <div class="tabs-underline svelte-18r24pm"><button class="tab active svelte-18r24pm">Statement Reconciliation</button> <button class="tab svelte-18r24pm">Payment Reconciliation</button></div> <section class="fraud-banner panel svelte-18r24pm"><div class="fraud-banner-head svelte-18r24pm"><button${attr_class(`fraud-score-card clickable ${stringify(fraudToneClass(d.fraud.riskLevel.toLowerCase()))}`, "svelte-18r24pm")}><span class="small-dim svelte-18r24pm">Overall risk level</span> <span class="fraud-level svelte-18r24pm">${escape_html(d.fraud.riskLevel)}</span> <strong class="svelte-18r24pm">${escape_html(d.fraud.riskScore)}</strong> <span class="fraud-score-caption svelte-18r24pm">Risk score</span></button> <div class="fraud-indicators-wrap svelte-18r24pm"><span class="fraud-kicker svelte-18r24pm">Fraud Signals</span> <div class="fraud-indicators svelte-18r24pm"><!--[-->`);
    const each_array = ensure_array_like(d.fraud.indicators);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let indicator = each_array[$$index];
      $$renderer2.push(`<button type="button"${attr_class(`fraud-indicator clickable ${stringify(fraudToneClass(indicator.tone))}`, "svelte-18r24pm")}><div class="indicator-top svelte-18r24pm"><span${attr_class(`severity-pill ${stringify(fraudToneClass(indicator.tone))}`, "svelte-18r24pm")}>${escape_html(indicator.title)}</span> <strong class="svelte-18r24pm">${escape_html(indicator.value)}</strong></div> <p class="svelte-18r24pm">${escape_html(indicator.detail)}</p></button>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="fraud-actions svelte-18r24pm"><!--[-->`);
    const each_array_1 = ensure_array_like(d.fraud.actions);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let action = each_array_1[$$index_1];
      $$renderer2.push(`<button type="button" class="fraud-action-card clickable svelte-18r24pm"><strong>${escape_html(action.title)}</strong> <span class="svelte-18r24pm">${escape_html(action.owner)}</span> <p class="svelte-18r24pm">${escape_html(action.note)}</p></button>`);
    }
    $$renderer2.push(`<!--]--></div></section> <div class="body-grid svelte-18r24pm"><div class="body-col"><div class="meta-row svelte-18r24pm"><div class="card supplier-card svelte-18r24pm"><span class="card-icon muted svelte-18r24pm"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8l9-4 9 4-9 4-9-4z"></path><path d="M3 8v8l9 4 9-4V8"></path></svg></span> <div class="card-body svelte-18r24pm"><span class="small-dim svelte-18r24pm">Supplier</span> <span class="big-bold svelte-18r24pm">${escape_html(d.supplier)}</span></div></div> <div class="card meta-card svelte-18r24pm"><div class="meta-field svelte-18r24pm"><span class="small-dim svelte-18r24pm">Statement Date</span> <span class="big-bold svelte-18r24pm">${escape_html(d.statementDate)}</span></div> <div class="meta-field svelte-18r24pm"><span class="small-dim svelte-18r24pm">Statement #</span> <span class="big-bold svelte-18r24pm">${escape_html(d.statementNumber)}</span></div> <div class="meta-field svelte-18r24pm"><span class="small-dim svelte-18r24pm">Captured Total</span> <span class="big-bold svelte-18r24pm">${escape_html(d.capturedTotal)}</span></div> <div class="meta-field svelte-18r24pm"><span class="small-dim svelte-18r24pm">Statement End Date</span> <span class="big-bold svelte-18r24pm">${escape_html(d.statementEndDate)}</span></div></div></div> <div class="balances-grid svelte-18r24pm"><div class="card svelte-18r24pm"><span class="card-icon muted doc svelte-18r24pm"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M9 8h6M9 12h6M9 16h4"></path></svg></span> <div class="card-body svelte-18r24pm"><span class="small-dim svelte-18r24pm">Calculated Statement Balance</span> <span class="big-bold svelte-18r24pm">${escape_html(d.stats.calculatedStatementBalance)}</span></div></div> <div class="card svelte-18r24pm"><span class="card-icon warn svelte-18r24pm"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 19l9-16H3z" transform="rotate(180 12 12)"></path></svg></span> <div class="card-body svelte-18r24pm"><span class="small-dim svelte-18r24pm">Value Difference</span> <span class="big-bold warn-text svelte-18r24pm">${escape_html(d.stats.valueDifference)}</span></div></div> <div class="card svelte-18r24pm"><span class="card-icon muted doc svelte-18r24pm"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M9 8h6M9 12h6M9 16h4"></path></svg></span> <div class="card-body svelte-18r24pm"><span class="small-dim svelte-18r24pm">Calculated Document Balance</span> <span class="big-bold svelte-18r24pm">${escape_html(d.stats.calculatedDocumentBalance)}</span></div></div> <div class="card svelte-18r24pm"><span class="card-icon warn-soft svelte-18r24pm"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v.01"></path><path d="M12 13c0-2 2-2 2-4a2 2 0 10-4 0"></path></svg></span> <div class="card-body svelte-18r24pm"><span class="small-dim svelte-18r24pm">Unreconciled Items</span> <span class="big-bold warn-text svelte-18r24pm">${escape_html(d.stats.unreconciledItems)}</span></div></div> <div class="card svelte-18r24pm"><span class="card-icon warn-soft doc svelte-18r24pm"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M9 8h6M9 12h6M9 16h4"></path></svg></span> <div class="card-body svelte-18r24pm"><span class="small-dim svelte-18r24pm">Not Listed on Statement</span> <span class="big-bold warn-text svelte-18r24pm">${escape_html(d.stats.notListedOnStatement)}</span></div></div> <div class="card svelte-18r24pm"><span class="card-icon warn-soft doc svelte-18r24pm"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"></rect><path d="M9 8h6M9 12h6M9 16h4"></path></svg></span> <div class="card-body svelte-18r24pm"><span class="small-dim svelte-18r24pm">Documents Not Found</span> <span class="big-bold warn-text svelte-18r24pm">${escape_html(d.stats.documentsNotFound)}</span></div></div> <div class="card svelte-18r24pm"><span class="card-icon teal-soft svelte-18r24pm"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 5l9 16H3z"></path></svg></span> <div class="card-body svelte-18r24pm"><span class="small-dim svelte-18r24pm">Positive Unreconciled Differences</span> <span class="big-bold teal-text svelte-18r24pm">${escape_html(d.stats.positiveDifferences)}</span></div></div> <div class="card svelte-18r24pm"><span class="card-icon warn svelte-18r24pm"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 19l9-16H3z" transform="rotate(180 12 12)"></path></svg></span> <div class="card-body svelte-18r24pm"><span class="small-dim svelte-18r24pm">Negative Unreconciled Differences</span> <span class="big-bold svelte-18r24pm">${escape_html(d.stats.negativeDifferences)}</span></div></div> <div class="card svelte-18r24pm"><span class="card-icon warn-soft svelte-18r24pm"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v.01"></path><path d="M12 13c0-2 2-2 2-4a2 2 0 10-4 0"></path></svg></span> <div class="card-body svelte-18r24pm"><span class="small-dim svelte-18r24pm">In Query Document Total</span> <span class="big-bold warn-text svelte-18r24pm">${escape_html(d.stats.inQueryDocumentTotal)}</span></div></div></div></div> <aside class="ledger panel svelte-18r24pm"><ul class="ledger-list svelte-18r24pm"><!--[-->`);
    const each_array_2 = ensure_array_like(d.ledger);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let row = each_array_2[$$index_2];
      $$renderer2.push(`<li${attr_class("svelte-18r24pm", void 0, { "bold": row.bold })}>`);
      if (row.count !== null && row.count !== void 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="count svelte-18r24pm">${escape_html(row.count)}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<span class="count hidden svelte-18r24pm"></span>`);
      }
      $$renderer2.push(`<!--]--> <span class="label svelte-18r24pm">${escape_html(row.label)}</span> <span${attr_class("value svelte-18r24pm", void 0, { "warn-text": row.valueClass === "warn" })}>${escape_html(row.value)}</span></li>`);
    }
    $$renderer2.push(`<!--]--></ul></aside></div> <div class="stmt-history svelte-18r24pm"><span class="section-title svelte-18r24pm">Statement History</span></div> <section class="panel tx-panel svelte-18r24pm"><div class="tx-head svelte-18r24pm"><span class="section-title svelte-18r24pm">Statement Transactions</span> <div class="tx-actions svelte-18r24pm"><button class="btn-outline svelte-18r24pm">Export</button> <button class="btn-navy svelte-18r24pm">Raise Query</button> <button class="btn-navy svelte-18r24pm">Add Note</button> <button class="btn-navy svelte-18r24pm">Add Tags</button> <button class="btn-navy svelte-18r24pm">Bulk Link</button></div></div> <div class="tx-tabs svelte-18r24pm"><button class="tx-tab active svelte-18r24pm">All Items</button> <button class="tx-tab svelte-18r24pm">Unreconciled Items</button> <button class="tx-tab svelte-18r24pm">Items For Supplier</button> <button class="tx-tab svelte-18r24pm">Items For Query</button> <button class="tx-tab svelte-18r24pm">Missing Items</button></div> <div class="tx-selects svelte-18r24pm"><label class="tx-check svelte-18r24pm"><input type="checkbox"/> <span>Select All Records</span></label> <label class="tx-check svelte-18r24pm"><input type="checkbox"/> <span>Select Records on This Page</span></label></div> <div class="tx-controls svelte-18r24pm"><input class="tinput search svelte-18r24pm" placeholder="Search"/> <span class="ctrl-label svelte-18r24pm">Sort</span> <div class="select select-md svelte-18r24pm"><span>Line Number</span> <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"></path></svg></div> <button class="icon-btn svelte-18r24pm" title="Toggle sort direction"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M6 20l-3-3M6 20l3-3"></path><path d="M13 8h8M13 12h6M13 16h4"></path></svg></button> <button class="icon-btn plain svelte-18r24pm" title="Reset"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"></path><path d="M21 3v6h-6"></path></svg></button> <div class="controls-right svelte-18r24pm"><div class="select select-sm svelte-18r24pm"><span>25</span> <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"></path></svg></div> <button class="pg-btn disabled svelte-18r24pm">«</button> <button class="pg-btn disabled svelte-18r24pm">Prev</button> <button class="pg-btn active svelte-18r24pm">1</button> <button class="pg-btn disabled svelte-18r24pm">Next</button> <button class="pg-btn disabled svelte-18r24pm">»</button> <span class="results">21 Results</span></div></div> <div class="tx-grid-wrap svelte-18r24pm"><div class="grid-heads svelte-18r24pm"><div class="grid-spacer svelte-18r24pm" aria-hidden="true"></div> <div class="grid-col stmt svelte-18r24pm">Statement</div> <div class="grid-col filter svelte-18r24pm">Filter</div> <div class="grid-col docs svelte-18r24pm">Documents</div></div> <!--[-->`);
    const each_array_3 = ensure_array_like(d.transactions);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let t = each_array_3[$$index_3];
      $$renderer2.push(`<div${attr("id", t.line !== null ? `statement-line-${t.line}` : void 0)}${attr_class("grid-row svelte-18r24pm", void 0, {
        "row-highlight": t.line !== null && highlightedLines.includes(t.line)
      })}><label class="sel-cell svelte-18r24pm"><input type="checkbox" class="svelte-18r24pm"/></label> `);
      if (t.line === null && t.statementMessage) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="stmt-cell warn-cell svelte-18r24pm">${escape_html(t.statementMessage)}</div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="stmt-cell svelte-18r24pm"><span class="line-no svelte-18r24pm">${escape_html(t.line)}</span> <span class="type-pill svelte-18r24pm">${escape_html(t.stType)}</span> <div class="stmt-reference svelte-18r24pm"><span class="stmt-num svelte-18r24pm">${escape_html(t.stNum)}</span> `);
        if (rowFraudSignal(t)) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<button${attr_class(`row-fraud-inline clickable ${stringify(fraudToneClass(rowFraudSignal(t).tone))}`, "svelte-18r24pm")}>${escape_html(rowFraudSignal(t).label)}</button>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div> <span class="stmt-amount svelte-18r24pm">${escape_html(t.stAmount)}</span></div>`);
      }
      $$renderer2.push(`<!--]--> <div class="filter-cell svelte-18r24pm"><span${attr_class(`status-pill-sm ${stringify(statusClass(t.status))}`, "svelte-18r24pm")}><span class="dot svelte-18r24pm"></span> ${escape_html(t.status)} `);
      if (t.editable) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<svg class="edit-ico" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"></path></svg>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></span></div> `);
      if (t.docMessage) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="docs-cell warn-cell svelte-18r24pm">${escape_html(t.docMessage)}</div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="docs-cell svelte-18r24pm"><span class="type-pill svelte-18r24pm">${escape_html(t.docType)}</span> <div class="doc-ref svelte-18r24pm"><div class="svelte-18r24pm">${escape_html(t.docNum)}</div> <div class="small-dim svelte-18r24pm">Order #: ${escape_html(t.order)}</div> `);
        if (t.tag) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="tag-pill svelte-18r24pm">${escape_html(t.tag)}</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="doc-dates svelte-18r24pm"><div><span class="small-dim svelte-18r24pm">Date</span><div class="doc-date svelte-18r24pm">${escape_html(t.date)}</div></div> <div><span class="small-dim svelte-18r24pm">Due</span><div class="doc-date svelte-18r24pm">${escape_html(t.due)}</div></div></div> <div class="doc-amount svelte-18r24pm">${escape_html(t.docAmount)}</div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
