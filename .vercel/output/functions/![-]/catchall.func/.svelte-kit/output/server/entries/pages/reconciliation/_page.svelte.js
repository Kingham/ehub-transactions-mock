import { a as attr, c as escape_html, e as ensure_array_like, i as stringify } from "../../../chunks/renderer.js";
import { s as statements } from "../../../chunks/data.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filtersOn = true;
    let status = {
      "Processing Document": false,
      "Processing Statement": false,
      Disregarded: false,
      Reconciled: false,
      Unreconciled: true
    };
    $$renderer2.push(`<div class="page-header svelte-2utasi"><span class="icon-tile"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="18" rx="2"></rect><path d="M9 4h6v3H9z"></path><path d="M9 12h6M9 16h6"></path></svg></span> <h1>Matching</h1> <div class="customer-ctrl svelte-2utasi"><span class="cust-label svelte-2utasi">Customer</span> <div class="select cust-select svelte-2utasi"><span>Klipboard</span> <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"></path></svg></div></div></div> <section class="panel main-card svelte-2utasi"><div class="tabs-row primary svelte-2utasi"><button class="tab active svelte-2utasi">Statement</button> <button class="tab svelte-2utasi">Payment Reconciliation</button> <button class="tab svelte-2utasi">Settings</button></div> <div class="tabs-row secondary svelte-2utasi"><div class="sec-tabs svelte-2utasi"><button class="stab svelte-2utasi">Dashboard</button> <button class="stab active svelte-2utasi">Statement List</button> <button class="stab svelte-2utasi">Suppliers</button> <button class="stab svelte-2utasi">Users</button> <button class="stab svelte-2utasi">Documents</button> <button class="stab svelte-2utasi">Queries (0/0)</button></div> <button class="download-btn svelte-2utasi">Download Ledger</button></div> <div class="controls-bar svelte-2utasi"><label class="toggle svelte-2utasi"><input type="checkbox"${attr("checked", filtersOn, true)} class="svelte-2utasi"/> <span class="track svelte-2utasi"><span class="thumb svelte-2utasi"></span></span> <span class="toggle-label svelte-2utasi">Filters</span></label> <span class="ctrl-label svelte-2utasi">Sort</span> <div class="select select-md svelte-2utasi"><span>Received At</span> <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"></path></svg></div> <button class="icon-btn svelte-2utasi" title="Toggle sort direction"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M6 20l-3-3M6 20l3-3"></path><path d="M13 8h8M13 12h6M13 16h4"></path></svg></button> <button class="icon-btn plain svelte-2utasi" title="Reset"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"></path><path d="M21 3v6h-6"></path></svg></button> <div class="controls-right svelte-2utasi"><div class="select select-sm svelte-2utasi"><span>25</span> <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"></path></svg></div> <button class="pg-btn disabled svelte-2utasi">«</button> <button class="pg-btn disabled svelte-2utasi">Prev</button> <button class="pg-btn active svelte-2utasi">1</button> <button class="pg-btn disabled svelte-2utasi">Next</button> <button class="pg-btn disabled svelte-2utasi">»</button> <span class="results svelte-2utasi">${escape_html(statements.length)} Results</span></div></div> <div class="work-area svelte-2utasi">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<aside class="filter-pane svelte-2utasi"><div class="pane-head svelte-2utasi"><span class="pane-title svelte-2utasi">Searches</span> <button class="pane-btn svelte-2utasi">Search</button></div> <div class="pane-body svelte-2utasi"><div class="floating-input svelte-2utasi"><input id="sn" class="tinput svelte-2utasi" placeholder=" "/> <label for="sn" class="svelte-2utasi">Sender Name</label></div> <div class="floating-input svelte-2utasi"><input id="stn" class="tinput svelte-2utasi" placeholder=" "/> <label for="stn" class="svelte-2utasi">Statement Number</label></div> <div class="floating-input svelte-2utasi"><input id="fn" class="tinput svelte-2utasi" placeholder=" "/> <label for="fn" class="svelte-2utasi">File Name</label></div></div> <div class="pane-head svelte-2utasi"><span class="pane-title svelte-2utasi">Filters</span> <button class="pane-btn svelte-2utasi">Filter</button></div> <div class="pane-body svelte-2utasi"><div class="group-box svelte-2utasi"><div class="group-label svelte-2utasi">Status</div> <ul class="check-list svelte-2utasi"><!--[-->`);
      const each_array = ensure_array_like(Object.keys(status));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let key = each_array[$$index];
        $$renderer2.push(`<li><label class="svelte-2utasi"><input type="checkbox"${attr("checked", status[key], true)}/> <span>${escape_html(key)}</span></label></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div> <div class="floating-input has-label svelte-2utasi"><label class="top-label svelte-2utasi">Received At</label> <div class="date-row svelte-2utasi"><input class="tinput svelte-2utasi" placeholder="dd/mm/yyyy"/> <span class="dash svelte-2utasi">-</span> <input class="tinput svelte-2utasi" placeholder="dd/mm/yyyy"/></div></div></div></aside>`);
    }
    $$renderer2.push(`<!--]--> <div class="table-wrap svelte-2utasi"><table class="st-table svelte-2utasi"><thead><tr><th class="sel svelte-2utasi">Select</th><th class="svelte-2utasi">Supplier</th><th class="svelte-2utasi">Statement Number</th><th class="svelte-2utasi">File Name</th><th class="svelte-2utasi">Received At</th><th class="svelte-2utasi">Statement Date</th><th class="num svelte-2utasi">Statement Total</th><th class="num svelte-2utasi">No. Reconciled Transactions</th><th class="num svelte-2utasi">No. Unreconciled Transactions</th><th class="svelte-2utasi">Assigned User</th><th class="svelte-2utasi">Status</th><th class="svelte-2utasi">View Statement</th></tr></thead><tbody class="svelte-2utasi"><!--[-->`);
    const each_array_1 = ensure_array_like(statements);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let s = each_array_1[$$index_1];
      $$renderer2.push(`<tr class="clickable svelte-2utasi" role="button" tabindex="0"><td class="sel svelte-2utasi"><input type="checkbox"/></td><td class="svelte-2utasi">${escape_html(s.supplier)}</td><td class="strong svelte-2utasi">${escape_html(s.statementNumber)}</td><td class="svelte-2utasi">${escape_html(s.fileName)}</td><td class="svelte-2utasi">${escape_html(s.receivedAt)}</td><td class="svelte-2utasi">${escape_html(s.statementDate)}</td><td class="num strong svelte-2utasi">${escape_html(s.statementTotal)}</td><td class="num svelte-2utasi">${escape_html(s.reconciledCount)}</td><td class="num svelte-2utasi">${escape_html(s.unreconciledCount)}</td><td class="svelte-2utasi">${escape_html(s.assignedUser || "")}</td><td class="svelte-2utasi">${escape_html(s.status)}</td><td class="svelte-2utasi"><a class="pill-btn svelte-2utasi"${attr("href", `/reconciliation/${stringify(s.id)}`)}>Statement</a></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div></section>`);
  });
}
export {
  _page as default
};
