import { s as store_get, c as escape_html, b as attr_class, e as ensure_array_like, u as unsubscribe_stores } from "../../../../chunks/renderer.js";
import { p as page } from "../../../../chunks/stores.js";
import { t as transactions, q as transactionDetail, c as communityTransactions } from "../../../../chunks/data.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let transactionId, d, fraudAlert, keys, rows;
    function parseAmount(amount = "") {
      const cleaned = amount.replace(/[^\d.,-]/g, "").replace(/,/g, "");
      const value = Number.parseFloat(cleaned);
      return Number.isFinite(value) ? value : 0;
    }
    function formatPounds(value) {
      return `£${value.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    function mapCommunityLineItems(item) {
      const total = parseAmount(item.amount);
      const net = Number((total / 1.2).toFixed(2));
      const vat = Number((total - net).toFixed(2));
      return [
        {
          line: 1,
          supplierCode: `${item.reference}-1`,
          buyerCode: "",
          description: item.issue,
          quantity: "1.00",
          price: net.toFixed(2),
          discountPct: "0.00",
          discountAmount: "0.00",
          vatRate: "20.00",
          vatAmount: vat.toFixed(2),
          netAmount: net.toFixed(2),
          total: total.toFixed(2)
        }
      ];
    }
    function buildCommunityDetail(item) {
      const total = parseAmount(item.amount);
      const net = Number((total / 1.2).toFixed(2));
      const vat = Number((total - net).toFixed(2));
      return {
        breadcrumb: ["Transactions", item.type],
        details: {
          Engine: "Community",
          Workflow: "Supplier self-service",
          Reason: item.issue,
          Sender: item.party,
          Customer: item.customer,
          "Transaction Number": item.reference,
          Processed: item.timeline?.[0]?.at || "",
          "Transaction Date": item.timeline?.[0]?.at || "",
          Status: item.status,
          Channel: item.channel,
          "Next milestone": item.nextMilestone,
          "Next ETA": item.nextEta,
          Assignee: item.assignee,
          Counterparty: item.counterparty,
          Notes: item.issue,
          "Processed Time In Seconds": "412.00"
        },
        documents: [
          {
            label: item.documents?.[0] || `${item.type} document`,
            view: true,
            download: true
          }
        ],
        attachments: [],
        lineItems: mapCommunityLineItems(item),
        totals: {
          discountAmount: "0.00",
          vatAmount: vat.toFixed(2),
          netAmount: net.toFixed(2),
          total: total.toFixed(2)
        }
      };
    }
    function buildEvaTransactionDetail(reference) {
      const total = 6840;
      const net = 5700;
      const vat = 1140;
      return {
        breadcrumb: ["Transactions", "Invoice"],
        details: {
          Engine: "Community",
          Workflow: "Supplier self-service",
          Reason: "PO mismatch under review",
          Sender: "Supplier portal",
          Customer: "Apex Retail UK",
          "Transaction Number": reference,
          Processed: "22/05/2026 10:14:00",
          "Transaction Date": "22/05/2026",
          Status: "Failed Matching",
          Channel: "Supplier",
          "Next milestone": "Customer review of failed match",
          "Next ETA": "Awaiting customer response",
          Assignee: "Open ECX AP",
          Counterparty: "Apex Retail UK",
          "Matched Value In View": formatPounds(6120),
          Notes: ""
        },
        documents: [{ label: "Source invoice PDF", view: true, download: true }],
        attachments: [],
        lineItems: [
          {
            line: 1,
            supplierCode: `${reference}-1`,
            buyerCode: "",
            description: "Submitted invoice under PO review",
            quantity: "1.00",
            price: net.toFixed(2),
            discountPct: "0.00",
            discountAmount: "0.00",
            vatRate: "20.00",
            vatAmount: vat.toFixed(2),
            netAmount: net.toFixed(2),
            total: total.toFixed(2)
          }
        ],
        totals: {
          discountAmount: "0.00",
          vatAmount: vat.toFixed(2),
          netAmount: net.toFixed(2),
          total: total.toFixed(2)
        }
      };
    }
    function buildTransactionDetail(item) {
      const total = parseAmount(item.total);
      const net = parseAmount(item.net) || Number((total / 1.2).toFixed(2));
      const vat = parseAmount(item.vat) || Number((total - net).toFixed(2));
      const isFraudOutlier = item.id === "fraud-WIL-4286";
      const lineDescription = isFraudOutlier ? "Office supplies and stationery order" : item.reason;
      return {
        breadcrumb: ["Transactions", item.documentType || item.type],
        details: {
          Engine: item.engine,
          Workflow: item.group,
          Reason: item.reason,
          Sender: item.sender,
          Customer: item.customerName,
          "Transaction Number": item.transactionNumber,
          "Order Number": item.orderNumber,
          Processed: item.processedDate,
          "Transaction Date": item.transactionDate,
          Status: item.status,
          Channel: "Invoice ingestion",
          "Next milestone": item.status === "Held for review" ? "Fraud review decision" : "Workflow review",
          "Next ETA": item.status === "Held for review" ? "Today 16:00" : "",
          Assignee: item.assignedTo,
          Counterparty: item.customerName,
          Notes: isFraudOutlier ? "" : item.reason,
          "Processed Time In Seconds": "286.00"
        },
        documents: [{ label: "Source invoice PDF", view: true, download: true }],
        attachments: [],
        lineItems: [
          {
            line: 1,
            supplierCode: `${item.transactionNumber}-1`,
            buyerCode: item.orderNumber,
            description: lineDescription,
            quantity: "1.00",
            price: net.toFixed(2),
            discountPct: "0.00",
            discountAmount: "0.00",
            vatRate: "20.00",
            vatAmount: vat.toFixed(2),
            netAmount: net.toFixed(2),
            total: total.toFixed(2)
          }
        ],
        totals: {
          discountAmount: "0.00",
          vatAmount: vat.toFixed(2),
          netAmount: net.toFixed(2),
          total: total.toFixed(2)
        }
      };
    }
    function resolveDetail(id) {
      if (!id?.startsWith("community-")) {
        const matchingTransaction = transactions.find((item) => item.id === id);
        return matchingTransaction ? buildTransactionDetail(matchingTransaction) : transactionDetail;
      }
      const reference = id.replace(/^community-/, "");
      const matchingCommunityTransaction = communityTransactions.find((item) => item.reference === reference);
      if (matchingCommunityTransaction) {
        return buildCommunityDetail(matchingCommunityTransaction);
      }
      if (reference === "INV-24118") {
        return buildEvaTransactionDetail(reference);
      }
      return buildEvaTransactionDetail(reference);
    }
    const lineColumns = [
      "Line",
      "Supplier Code",
      "Buyer Code",
      "Description",
      "Quantity",
      "Price",
      "Discount %",
      "Discount Amount",
      "Vat Rate",
      "VAT Amount",
      "Net Amount",
      "Total"
    ];
    let detailsOpen = true;
    const collapsibleSections = ["Hangfire", "Exports", "Integrations", "History", "Emails"];
    transactionId = store_get($$store_subs ??= {}, "$page", page).params.id;
    d = resolveDetail(transactionId);
    fraudAlert = transactionId === "fraud-WIL-4286" ? {
      severity: "High fraud risk",
      title: "Invoice value pattern outlier detected",
      summary: "Willow Office Supplies usually averages GBP 126 per invoice, but this invoice is GBP 4,286. Payment should stay held until AP Review confirms the value is genuine.",
      score: 78,
      caseId: "FC-1022",
      nextStep: "Confirm whether this is a genuine consolidated order, unusual line items, or a substituted invoice."
    } : null;
    keys = Object.keys(d.details);
    rows = [];
    for (let i = 0; i < keys.length; i += 3) {
      rows.push(keys.slice(i, i + 3).map((k) => ({ label: k, value: d.details[k] })));
    }
    $$renderer2.push(`<div class="page-header"><span class="icon-tile"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="18" rx="2"></rect><path d="M9 4h6v3H9z"></path><path d="M9 12h6M9 16h6"></path></svg></span> <div class="crumbs svelte-kuo18u"><a class="crumb-link svelte-kuo18u" href="/transactions">Transactions</a> <svg class="crumb-sep svelte-kuo18u" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 6l6 6-6 6"></path></svg> <span class="crumb-current svelte-kuo18u">${escape_html(d.breadcrumb?.[1] || "Transaction")}</span></div></div> `);
    if (fraudAlert) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="fraud-alert-banner svelte-kuo18u" aria-label="Fraud risk alert"><div class="fraud-alert-score svelte-kuo18u"><span class="svelte-kuo18u">Fraud score</span> <strong class="svelte-kuo18u">${escape_html(fraudAlert.score)}</strong></div> <div class="fraud-alert-copy svelte-kuo18u"><span class="fraud-alert-kicker svelte-kuo18u">${escape_html(fraudAlert.severity)} • ${escape_html(fraudAlert.caseId)}</span> <h2 class="svelte-kuo18u">${escape_html(fraudAlert.title)}</h2> <p class="svelte-kuo18u">${escape_html(fraudAlert.summary)}</p> <strong class="svelte-kuo18u">${escape_html(fraudAlert.nextStep)}</strong></div> <div class="fraud-alert-actions svelte-kuo18u"><a class="fraud-alert-btn solid svelte-kuo18u" href="/fraud">Open fraud case</a> <a class="fraud-alert-btn svelte-kuo18u" href="#line-items">Review line items</a></div></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <div class="detail-grid svelte-kuo18u"><section class="panel details-panel"><header class="section-head svelte-kuo18u"><span${attr_class("caret svelte-kuo18u", void 0, { "open": detailsOpen })}><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5l8 7-8 7z"></path></svg></span> <span class="section-title svelte-kuo18u">Details</span></header> `);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="details-body svelte-kuo18u"><!--[-->`);
      const each_array = ensure_array_like(rows);
      for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
        let row = each_array[$$index_1];
        $$renderer2.push(`<div class="details-row svelte-kuo18u"><!--[-->`);
        const each_array_1 = ensure_array_like(row);
        for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
          let cell = each_array_1[$$index];
          $$renderer2.push(`<div class="field"><div class="field-label svelte-kuo18u">${escape_html(cell.label)}</div> `);
          if (cell.value) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<div class="field-value svelte-kuo18u">${escape_html(cell.value)}</div>`);
          } else {
            $$renderer2.push("<!--[-1-->");
            $$renderer2.push(`<div class="field-value empty svelte-kuo18u"> </div>`);
          }
          $$renderer2.push(`<!--]--></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></section> <aside class="side-col svelte-kuo18u"><section class="panel side-panel"><header class="section-head small svelte-kuo18u"><span class="caret open svelte-kuo18u"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5l8 7-8 7z"></path></svg></span> <span class="section-title svelte-kuo18u">Documents</span></header> <div class="doc-list svelte-kuo18u"><!--[-->`);
    const each_array_2 = ensure_array_like(d.documents);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let doc = each_array_2[$$index_2];
      $$renderer2.push(`<div class="doc-row svelte-kuo18u"><span class="doc-label svelte-kuo18u">${escape_html(doc.label)}</span> <span class="doc-actions svelte-kuo18u">`);
      if (doc.view) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button class="doc-btn view svelte-kuo18u">View</button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (doc.download) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button class="doc-btn icon svelte-kuo18u" aria-label="Download"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12"></path><path d="M6 12l6 6 6-6"></path><path d="M4 20h16"></path></svg></button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (doc.send) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<button class="doc-btn send svelte-kuo18u">Send</button>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></span></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> `);
    if (d.attachments?.length) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<section class="panel side-panel"><header class="section-head small plain svelte-kuo18u"><span class="section-title svelte-kuo18u">Attachments</span></header> <div class="doc-list svelte-kuo18u"><!--[-->`);
      const each_array_3 = ensure_array_like(d.attachments);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let name = each_array_3[$$index_3];
        $$renderer2.push(`<div class="doc-row svelte-kuo18u"><span class="doc-label svelte-kuo18u">${escape_html(name)}</span> <span class="doc-actions svelte-kuo18u"><button class="doc-btn view svelte-kuo18u">View</button> <button class="doc-btn icon svelte-kuo18u" aria-label="Download"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12"></path><path d="M6 12l6 6 6-6"></path><path d="M4 20h16"></path></svg></button></span></div>`);
      }
      $$renderer2.push(`<!--]--></div></section>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <section class="panel side-panel side-collapsible-stack svelte-kuo18u"><!--[-->`);
    const each_array_4 = ensure_array_like(collapsibleSections);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let section = each_array_4[$$index_4];
      $$renderer2.push(`<header class="section-head small bar svelte-kuo18u"><span class="caret svelte-kuo18u"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5l8 7-8 7z"></path></svg></span> <span class="section-title svelte-kuo18u">${escape_html(section)}</span></header>`);
    }
    $$renderer2.push(`<!--]--></section></aside></div> <section id="line-items" class="panel line-items-panel"><header class="section-head plain svelte-kuo18u"><span class="section-title svelte-kuo18u">Line Items</span></header> <div class="table-wrap svelte-kuo18u"><table class="line-table svelte-kuo18u"><thead><tr><!--[-->`);
    const each_array_5 = ensure_array_like(lineColumns);
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let c = each_array_5[$$index_5];
      $$renderer2.push(`<th class="svelte-kuo18u">${escape_html(c)}</th>`);
    }
    $$renderer2.push(`<!--]--></tr></thead><tbody><!--[-->`);
    const each_array_6 = ensure_array_like(d.lineItems);
    for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
      let li = each_array_6[$$index_6];
      $$renderer2.push(`<tr><td class="svelte-kuo18u">${escape_html(li.line)}</td><td class="svelte-kuo18u">${escape_html(li.supplierCode)}</td><td class="svelte-kuo18u">${escape_html(li.buyerCode)}</td><td class="svelte-kuo18u">${escape_html(li.description)}</td><td class="num svelte-kuo18u">${escape_html(li.quantity)}</td><td class="num svelte-kuo18u">${escape_html(li.price)}</td><td class="num svelte-kuo18u">${escape_html(li.discountPct)}</td><td class="num svelte-kuo18u">${escape_html(li.discountAmount)}</td><td class="num svelte-kuo18u">${escape_html(li.vatRate)}</td><td class="num svelte-kuo18u">${escape_html(li.vatAmount)}</td><td class="num svelte-kuo18u">${escape_html(li.netAmount)}</td><td class="num svelte-kuo18u">${escape_html(li.total)}</td></tr>`);
    }
    $$renderer2.push(`<!--]--><tr class="totals svelte-kuo18u"><td colspan="7" class="svelte-kuo18u"></td><td class="num svelte-kuo18u">${escape_html(d.totals.discountAmount)}</td><td class="svelte-kuo18u"></td><td class="num svelte-kuo18u">${escape_html(d.totals.vatAmount)}</td><td class="num svelte-kuo18u">${escape_html(d.totals.netAmount)}</td><td class="num svelte-kuo18u">${escape_html(d.totals.total)}</td></tr></tbody></table></div></section>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
