import { e as ensure_array_like, c as escape_html, a as attr, b as attr_class, i as stringify } from "../../../chunks/renderer.js";
import { t as transactions, p as customers } from "../../../chunks/data.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const columns = [
      "Type",
      "Group",
      "Reason",
      "Document Type",
      "Status",
      "Processed Date",
      "Exported Date",
      "Sender",
      "Transaction Number",
      "Order Number",
      "Transaction Date",
      "Net",
      "VAT",
      "Total",
      "AssignedTo",
      "Options",
      "Customer Name",
      "Engine"
    ];
    let filtersOn = true;
    let currentPage = 1;
    const pages = [1, 2, 3, 4, 5];
    const communityContextRows = /* @__PURE__ */ (() => {
      return [];
    })();
    const visibleTransactions = communityContextRows.length ? communityContextRows : transactions;
    $$renderer2.push(`<div class="page-header"><span class="icon-tile"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="18" rx="2"></rect><path d="M9 4h6v3H9z"></path><path d="M9 12h6M9 16h6"></path></svg></span> <h1>Transactions</h1></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section class="main-card panel svelte-1q0dtg6"><div class="all-groups-bar svelte-1q0dtg6"><div class="select svelte-1q0dtg6"><span>All Groups</span> <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"></path></svg></div></div> <div class="views-bar svelte-1q0dtg6"><!--[-->`);
    const each_array = ensure_array_like([
      "Including Received Column",
      "Received At",
      "Test Field Data",
      "test order"
    ]);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let v = each_array[$$index];
      $$renderer2.push(`<button class="view-tab svelte-1q0dtg6" type="button"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 9h18"></path></svg> <span>${escape_html(v)}</span></button>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="controls-bar svelte-1q0dtg6"><div class="controls-left svelte-1q0dtg6"><label class="toggle svelte-1q0dtg6"><input type="checkbox"${attr("checked", filtersOn, true)} class="svelte-1q0dtg6"/> <span class="track svelte-1q0dtg6"><span class="thumb svelte-1q0dtg6"></span></span> <span class="toggle-label svelte-1q0dtg6">Filters</span></label> <span class="ctrl-label svelte-1q0dtg6">Sort</span> <div class="select select-md svelte-1q0dtg6"><span>Processed Date</span> <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"></path></svg></div> <button class="icon-btn svelte-1q0dtg6" title="Toggle sort direction"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16M6 20l-3-3M6 20l3-3"></path><path d="M13 8h8M13 12h6M13 16h4"></path></svg></button> <button class="icon-btn plain svelte-1q0dtg6" title="Reset"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"></path><path d="M21 3v6h-6"></path></svg></button> <span class="ctrl-label svelte-1q0dtg6">View</span> <div class="select select-md svelte-1q0dtg6"><span>Default</span> <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"></path></svg></div></div> <div class="controls-right svelte-1q0dtg6"><div class="select select-sm svelte-1q0dtg6"><span>25</span> <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"></path></svg></div> <button class="pg-btn disabled svelte-1q0dtg6">«</button> <button class="pg-btn disabled svelte-1q0dtg6">Prev</button> <!--[-->`);
    const each_array_1 = ensure_array_like(pages);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let p = each_array_1[$$index_1];
      $$renderer2.push(`<button${attr_class("pg-btn svelte-1q0dtg6", void 0, { "active": p === currentPage })}>${escape_html(p)}</button>`);
    }
    $$renderer2.push(`<!--]--> <button class="pg-btn svelte-1q0dtg6">Next</button> <button class="pg-btn svelte-1q0dtg6">»</button> <span class="results svelte-1q0dtg6">${escape_html("11752 Results")}</span> <button class="bulk-btn svelte-1q0dtg6">Bulk Options (0)</button> <button class="export-btn svelte-1q0dtg6">Export</button></div></div> <div class="work-area svelte-1q0dtg6">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<aside class="filter-pane svelte-1q0dtg6"><div class="pane-head svelte-1q0dtg6"><span class="pane-title svelte-1q0dtg6">Searches</span> <button class="pane-btn svelte-1q0dtg6">Search</button></div> <div class="pane-body svelte-1q0dtg6"><div class="floating-input svelte-1q0dtg6"><input id="txn" class="tinput svelte-1q0dtg6" placeholder=" "/> <label for="txn" class="svelte-1q0dtg6">Transaction #</label></div> <div class="floating-input svelte-1q0dtg6"><input id="ord" class="tinput svelte-1q0dtg6" placeholder=" "/> <label for="ord" class="svelte-1q0dtg6">Order #</label></div> <div class="floating-input svelte-1q0dtg6"><input id="sen" class="tinput svelte-1q0dtg6" placeholder=" "/> <label for="sen" class="svelte-1q0dtg6">Sender</label></div> <div class="floating-input svelte-1q0dtg6"><input id="rec" class="tinput svelte-1q0dtg6" placeholder=" "/> <label for="rec" class="svelte-1q0dtg6">Receiver</label></div> <div class="floating-input svelte-1q0dtg6"><input id="fn" class="tinput svelte-1q0dtg6" placeholder=" "/> <label for="fn" class="svelte-1q0dtg6">File Name</label></div> <div class="floating-input svelte-1q0dtg6"><input id="sea" class="tinput svelte-1q0dtg6" placeholder=" "/> <label for="sea" class="svelte-1q0dtg6">Sender Email Address</label></div></div> <div class="pane-head svelte-1q0dtg6"><span class="pane-title svelte-1q0dtg6">Filters</span> <button class="pane-btn svelte-1q0dtg6">Filter</button></div> <div class="pane-body svelte-1q0dtg6"><div class="floating-input has-label svelte-1q0dtg6"><label class="top-label svelte-1q0dtg6">Processed Date</label> <div class="date-row svelte-1q0dtg6"><input class="tinput svelte-1q0dtg6" placeholder="dd/mm/yyyy"/> <span class="dash svelte-1q0dtg6">-</span> <input class="tinput svelte-1q0dtg6" placeholder="dd/mm/yyyy"/></div></div> <div class="customer-block svelte-1q0dtg6"><div class="customer-label svelte-1q0dtg6">Customer</div> <input class="tinput search svelte-1q0dtg6" placeholder="Search"/> <ul class="check-list svelte-1q0dtg6"><!--[-->`);
      const each_array_2 = ensure_array_like(customers);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let c = each_array_2[$$index_2];
        $$renderer2.push(`<li><label class="svelte-1q0dtg6"><input type="checkbox"/> <span>${escape_html(c)}</span></label></li>`);
      }
      $$renderer2.push(`<!--]--></ul></div></div></aside>`);
    }
    $$renderer2.push(`<!--]--> <div class="table-wrap svelte-1q0dtg6"><table class="tx-table svelte-1q0dtg6"><thead><tr><!--[-->`);
    const each_array_3 = ensure_array_like(columns);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let c = each_array_3[$$index_3];
      $$renderer2.push(`<th class="svelte-1q0dtg6">${escape_html(c)}</th>`);
    }
    $$renderer2.push(`<!--]--><th class="sel svelte-1q0dtg6"><input type="checkbox"/></th></tr></thead><tbody class="svelte-1q0dtg6"><!--[-->`);
    const each_array_4 = ensure_array_like(visibleTransactions);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let t = each_array_4[$$index_4];
      $$renderer2.push(`<tr class="clickable svelte-1q0dtg6" role="button" tabindex="0"><td class="svelte-1q0dtg6">${escape_html(t.type)}</td><td class="strong svelte-1q0dtg6">${escape_html(t.group)}</td><td class="svelte-1q0dtg6">${escape_html(t.reason)}</td><td class="svelte-1q0dtg6">${escape_html(t.documentType)}</td><td class="svelte-1q0dtg6">`);
      if (t.status === "Exported") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<a class="pill green"${attr("href", `/transactions/${stringify(t.id)}`)}><span class="pill-icon"><svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l4 4 10-10"></path></svg></span> Exported</a>`);
      } else {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<a class="pill amber"${attr("href", `/transactions/${stringify(t.id)}`)}><span class="pill-icon">!</span> Suspended</a>`);
      }
      $$renderer2.push(`<!--]--></td><td class="date svelte-1q0dtg6">${escape_html(t.processedDate)}</td><td class="date svelte-1q0dtg6">${escape_html(t.exportedDate)}</td><td class="svelte-1q0dtg6">${escape_html(t.sender)}</td><td class="svelte-1q0dtg6"><a class="link svelte-1q0dtg6"${attr("href", `/transactions/${stringify(t.id)}`)}>${escape_html(t.transactionNumber)}</a></td><td class="svelte-1q0dtg6">${escape_html(t.orderNumber)}</td><td class="svelte-1q0dtg6">${escape_html(t.transactionDate)}</td><td class="num svelte-1q0dtg6">${escape_html(t.net)}</td><td class="num svelte-1q0dtg6">${escape_html(t.vat)}</td><td class="num svelte-1q0dtg6">${escape_html(t.total)}</td><td class="small svelte-1q0dtg6">${escape_html(t.assignedTo)}</td><td class="svelte-1q0dtg6"><div class="opt-select svelte-1q0dtg6"><span>...</span> <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"></path></svg></div></td><td class="small svelte-1q0dtg6">${escape_html(t.customerName)}</td><td class="svelte-1q0dtg6">${escape_html(t.engine)}</td><td class="sel svelte-1q0dtg6"><input type="checkbox"/></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div></section>`);
  });
}
export {
  _page as default
};
