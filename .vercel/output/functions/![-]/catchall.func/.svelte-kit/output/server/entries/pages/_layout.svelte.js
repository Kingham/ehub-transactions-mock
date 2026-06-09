import { a as attr, e as ensure_array_like, s as store_get, b as attr_class, c as escape_html, u as unsubscribe_stores, d as slot } from "../../chunks/renderer.js";
import { p as page } from "../../chunks/stores.js";
function Sidebar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const LOGO_URL = "https://openecxcdn.blob.core.windows.net/live/missioncontrol/Customer%20Images/Open%20ECX/Open-ECX-Logo.svg";
    const transactionsItems = [
      { label: "Dashboard", href: "/transactions/dashboard" },
      { label: "All Transactions", href: "/transactions" },
      { label: "Fraud", href: "/fraud", isNew: true },
      { label: "Community", href: "/community", isNew: true },
      { label: "Matching Data", href: "/transactions/matching" },
      { label: "Suspensions", href: "/transactions/suspensions" },
      { label: "Reconciliation", href: "/reconciliation" }
    ];
    const adminItems = [
      { label: "Users", href: "/admin/users" },
      { label: "Documents", href: "/admin/documents" },
      { label: "Feed Results", href: "/admin/feed-results" },
      { label: "Onboarding", href: "/admin/onboarding" },
      { label: "eHub Customers", href: "/admin/ehub-customers" },
      { label: "eHub Senders", href: "/admin/ehub-senders" },
      { label: "Approvals", href: "/admin/approvals" },
      { label: "Reports", href: "/admin/reports" },
      { label: "Settings", href: "/admin/settings" }
    ];
    const recentCustomers = ["AI Test Customer", "EH Smith", "Adama"];
    function isListActive(pathname) {
      return pathname === "/transactions" || pathname.startsWith("/transactions/");
    }
    function isReconActive(pathname) {
      return pathname === "/reconciliation" || pathname.startsWith("/reconciliation/");
    }
    function isActiveFor(item, pathname) {
      if (item.label === "All Transactions") return isListActive(pathname);
      if (item.label === "Reconciliation") return isReconActive(pathname);
      return pathname === item.href;
    }
    $$renderer2.push(`<aside class="sidebar svelte-129hoe0"><div class="brand svelte-129hoe0"><a class="brand-link svelte-129hoe0" href="/" aria-label="Open ECX overview"><img class="logo svelte-129hoe0"${attr("src", LOGO_URL)} alt="openECX"/></a> <div class="environment env-test svelte-129hoe0">Test System</div></div> <div class="divider svelte-129hoe0"></div> <nav class="nav svelte-129hoe0"><div class="group-head svelte-129hoe0"><span class="group-icon svelte-129hoe0" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="18" rx="2"></rect><path d="M9 4h6v3H9z"></path><path d="M9 12h6M9 16h6"></path></svg></span> <span class="group-title">Transactions</span></div> <ul class="items svelte-129hoe0"><!--[-->`);
    const each_array = ensure_array_like(transactionsItems);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let item = each_array[$$index];
      const active = isActiveFor(item, store_get($$store_subs ??= {}, "$page", page).url.pathname);
      $$renderer2.push(`<li${attr_class("svelte-129hoe0", void 0, { "active": active })}>`);
      if (active) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="arrow svelte-129hoe0" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M10 8l5 4-5 4z" fill="currentColor" stroke="none"></path></svg></span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <a${attr("href", item.href)}${attr_class("svelte-129hoe0", void 0, { "new-item": item.isNew })}>${escape_html(item.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul> <div class="group-head admin svelte-129hoe0"><span class="group-icon svelte-129hoe0" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></span> <span class="group-title">Admin</span></div> <ul class="items svelte-129hoe0"><!--[-->`);
    const each_array_1 = ensure_array_like(adminItems);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let item = each_array_1[$$index_1];
      $$renderer2.push(`<li${attr_class("svelte-129hoe0", void 0, {
        "active": store_get($$store_subs ??= {}, "$page", page).url.pathname === item.href
      })}><a${attr("href", item.href)} class="svelte-129hoe0">${escape_html(item.label)}</a></li>`);
    }
    $$renderer2.push(`<!--]--></ul></nav> <div class="recent svelte-129hoe0"><div class="recent-head svelte-129hoe0"><span class="recent-icon svelte-129hoe0" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7"></path><path d="M3 3v6h6"></path><path d="M12 7v5l3 2"></path></svg></span> <span class="recent-title svelte-129hoe0">Recent Customers</span> <span class="recent-caret svelte-129hoe0"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"></path></svg></span></div> <ul class="recent-list svelte-129hoe0"><!--[-->`);
    const each_array_2 = ensure_array_like(recentCustomers);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let name = each_array_2[$$index_2];
      $$renderer2.push(`<li class="svelte-129hoe0">${escape_html(name)}</li>`);
    }
    $$renderer2.push(`<!--]--></ul></div> <div class="user svelte-129hoe0"><span class="user-icon svelte-129hoe0" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4 4-7 8-7s8 3 8 7"></path></svg></span> <div class="user-info"><div class="user-name svelte-129hoe0">Andrew Froude</div> <button class="logout svelte-129hoe0">Log Out</button></div></div> <div class="sidebar-foot svelte-129hoe0"><button class="collapse-btn svelte-129hoe0" aria-label="Collapse sidebar"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"></path></svg></button> <span class="v-number svelte-129hoe0">5.8.0</span></div></aside>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Eva($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let open = false;
    let inputText = "";
    let conversation = [];
    let transactionSearch = "";
    const availableTransactions = [
      {
        id: "INV-24118",
        customer: "Apex Retail UK",
        status: "Failed matching",
        note: "Received on 22 May • failed matching • matched value in view £6,120"
      },
      {
        id: "INV-24091",
        customer: "Apex Retail UK",
        status: "Approved",
        note: "Approved for payment • expected in the week of 27 May • value £4,120"
      },
      {
        id: "INV-24084",
        customer: "Apex Retail UK",
        status: "Approved",
        note: "Matched successfully • approved for payment • value £2,860"
      },
      {
        id: "INV-24076",
        customer: "Apex Retail UK",
        status: "On hold",
        note: "Hold linked to open query QRY-1048 • awaiting replacement shipment detail"
      }
    ];
    transactionSearch.trim().length === 0 ? availableTransactions : availableTransactions.filter((item) => `${item.id} ${item.customer} ${item.status}`.toLowerCase().includes(transactionSearch.toLowerCase()));
    $$renderer2.push(`<div${attr_class("eva-overlay svelte-egj6lu", void 0, { "is-open": open })} role="presentation"></div> <div${attr_class("eva-container svelte-egj6lu", void 0, { "is-open": open })}><div class="eva-float svelte-egj6lu"><img src="/eva/EVA-Float.png" alt="EVA" class="svelte-egj6lu"/></div> <div class="eva-container-inner svelte-egj6lu"><div class="eva-header svelte-egj6lu"><img src="/eva/EVA-Header.png" alt="EVA Header" class="svelte-egj6lu"/> <button class="eva-close svelte-egj6lu" aria-label="Close">×</button> <button class="button secondary eva-new-chat-button svelte-egj6lu">New Chat</button></div> <div class="eva-conversation svelte-egj6lu"><div class="chat-row eva-row svelte-egj6lu"><img class="chat-avatar eva-avatar svelte-egj6lu" src="/eva/EVA-Circle.png" alt="EVA"/> <div class="chat-bubble-stack svelte-egj6lu"><div class="eva-message-content svelte-egj6lu"><div class="eva-message-text svelte-egj6lu">`);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> Ask your question and I will try to answer it from the invoice, payment, remittance, and query data
              available in Community.</div></div> <div class="eva-message-timestamp svelte-egj6lu">12:32 pm</div></div></div> `);
    if (!conversation.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="chat-row eva-row svelte-egj6lu"><img class="chat-avatar eva-avatar svelte-egj6lu" src="/eva/EVA-Circle.png" alt="EVA"/> <div class="chat-bubble-stack svelte-egj6lu"><div class="eva-message-content svelte-egj6lu"><div class="eva-message-text svelte-egj6lu">${escape_html("Ask me anything about your transactions.")}</div></div> <div class="eva-message-timestamp svelte-egj6lu">12:32 pm</div></div></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <!--[-->`);
    const each_array = ensure_array_like(conversation);
    for (let $$index_2 = 0, $$length = each_array.length; $$index_2 < $$length; $$index_2++) {
      let item = each_array[$$index_2];
      $$renderer2.push(`<div${attr_class("chat-row svelte-egj6lu", void 0, {
        "item.role": item.role,
        "user-row": item.role === "user",
        "eva-row": item.role === "eva"
      })}>`);
      if (item.role === "eva") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<img class="chat-avatar eva-avatar svelte-egj6lu" src="/eva/EVA-Circle.png" alt="EVA"/>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> <div class="chat-bubble-stack svelte-egj6lu"><div${attr_class("svelte-egj6lu", void 0, {
        "eva-message-content": item.role === "eva",
        "user-message-content": item.role === "user"
      })}><div${attr_class("svelte-egj6lu", void 0, {
        "eva-message-text": item.role === "eva",
        "user-message-text": item.role === "user"
      })}>${escape_html(item.text)}</div> `);
      if (item.querySummary) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="query-summary-card svelte-egj6lu"><div class="query-summary-top svelte-egj6lu">`);
        if (item.queryLink) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<button type="button" class="query-summary-link svelte-egj6lu">${escape_html(item.querySummary.id)}</button>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<button type="button" class="query-summary-link svelte-egj6lu">${escape_html(item.querySummary.id)}</button>`);
        }
        $$renderer2.push(`<!--]--> <span class="query-summary-status svelte-egj6lu">${escape_html(item.querySummary.status)}</span></div> <div class="query-summary-note svelte-egj6lu">${escape_html(item.queryLink ? item.queryLink.note : item.querySummary.note)}</div></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (item.queryDraft) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="query-draft-card svelte-egj6lu"><div class="query-draft-grid svelte-egj6lu"><label class="svelte-egj6lu"><span class="svelte-egj6lu">Customer</span> <input${attr("value", item.queryDraft.customer)} readonly="" class="svelte-egj6lu"/></label> <label class="svelte-egj6lu"><span class="svelte-egj6lu">Transaction</span> <div class="transaction-search-wrap svelte-egj6lu"><input${attr("value", transactionSearch)} placeholder="Search by transaction number" class="svelte-egj6lu"/> `);
        if (item.queryDraft.linkedTransactionSummary && item.queryDraft.linkedTransactionSummary.status !== "Failed matching") {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="transaction-selected-status svelte-egj6lu">Status: ${escape_html(item.queryDraft.linkedTransactionSummary.status)}</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> `);
        {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div></label> <label class="wide svelte-egj6lu"><span class="svelte-egj6lu">Subject</span> <input${attr("value", item.queryDraft.subject)} readonly="" class="svelte-egj6lu"/></label> <label class="svelte-egj6lu"><span class="svelte-egj6lu">Category</span> <input${attr("value", item.queryDraft.category)} readonly="" class="svelte-egj6lu"/></label> <label class="svelte-egj6lu"><span class="svelte-egj6lu">Priority</span> <input${attr("value", item.queryDraft.priority)} readonly="" class="svelte-egj6lu"/></label> <label class="wide svelte-egj6lu"><span class="svelte-egj6lu">Summary</span> <textarea readonly="" class="svelte-egj6lu">`);
        const $$body = escape_html(item.queryDraft.summary);
        if ($$body) {
          $$renderer2.push(`${$$body}`);
        }
        $$renderer2.push(`</textarea></label></div> `);
        if (item.queryDraft.linkedTransactionSummary) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="query-summary-card query-draft-summary svelte-egj6lu"><div class="query-summary-top svelte-egj6lu"><button type="button" class="query-summary-link svelte-egj6lu">${escape_html(item.queryDraft.linkedTransactionSummary.id)}</button> `);
          if (item.queryDraft.linkedTransactionSummary.status !== "Failed matching") {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<span class="query-summary-status svelte-egj6lu">${escape_html(item.queryDraft.linkedTransactionSummary.status)}</span>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--></div> <div class="query-summary-note svelte-egj6lu">${escape_html(item.queryDraft.linkedTransactionSummary.note)}</div></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (item.actions?.length) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="chat-actions svelte-egj6lu"><!--[-->`);
        const each_array_2 = ensure_array_like(item.actions);
        for (let $$index_1 = 0, $$length2 = each_array_2.length; $$index_1 < $$length2; $$index_1++) {
          let action = each_array_2[$$index_1];
          $$renderer2.push(`<button type="button" class="chat-action-btn svelte-egj6lu"${attr("disabled", action.disabled, true)}>${escape_html(action.label)}</button>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div> <div${attr_class("svelte-egj6lu", void 0, {
        "eva-message-timestamp": item.role === "eva",
        "user-message-timestamp": item.role === "user"
      })}>${escape_html(item.time)}</div></div> `);
      if (item.role === "user") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="chat-avatar user-avatar svelte-egj6lu" aria-hidden="true">AF</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="eva-input svelte-egj6lu"><div class="eva-input-textbox svelte-egj6lu"><div class="form-group block svelte-egj6lu"><textarea${attr("placeholder", "Ask me anything...")} class="svelte-egj6lu">`);
    const $$body_1 = escape_html(inputText);
    if ($$body_1) {
      $$renderer2.push(`${$$body_1}`);
    }
    $$renderer2.push(`</textarea></div></div> <button class="eva-submit svelte-egj6lu">Send</button></div></div></div>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    if (store_get($$store_subs ??= {}, "$page", page).url.pathname === "/" || store_get($$store_subs ??= {}, "$page", page).url.pathname === "/community-info" || store_get($$store_subs ??= {}, "$page", page).url.pathname === "/module-maps") {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="app-shell">`);
      Sidebar($$renderer2);
      $$renderer2.push(`<!----> <main class="main"><!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]--></main> `);
      Eva($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _layout as default
};
