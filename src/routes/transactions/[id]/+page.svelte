<script>
  import { page } from '$app/stores';
  import { communityTransactions, transactionDetail, transactions } from '$lib/data.js';

  function parseAmount(amount = '') {
    const cleaned = amount.replace(/[^\d.,-]/g, '').replace(/,/g, '');
    const value = Number.parseFloat(cleaned);
    return Number.isFinite(value) ? value : 0;
  }

  function formatPounds(value) {
    return `£${value.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }

  function mapCommunityLineItems(item) {
    const total = parseAmount(item.amount);
    const net = Number((total / 1.2).toFixed(2));
    const vat = Number((total - net).toFixed(2));

    return [
      {
        line: 1,
        supplierCode: `${item.reference}-1`,
        buyerCode: '',
        description: item.issue,
        quantity: '1.00',
        price: net.toFixed(2),
        discountPct: '0.00',
        discountAmount: '0.00',
        vatRate: '20.00',
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
      breadcrumb: ['Transactions', item.type],
      details: {
        Engine: 'Community',
        Workflow: 'Supplier self-service',
        Reason: item.issue,
        Sender: item.party,
        Customer: item.customer,
        'Transaction Number': item.reference,
        Processed: item.timeline?.[0]?.at || '',
        'Transaction Date': item.timeline?.[0]?.at || '',
        Status: item.status,
        Channel: item.channel,
        'Next milestone': item.nextMilestone,
        'Next ETA': item.nextEta,
        Assignee: item.assignee,
        Counterparty: item.counterparty,
        Notes: item.issue,
        'Processed Time In Seconds': '412.00'
      },
      documents: [{ label: item.documents?.[0] || `${item.type} document`, view: true, download: true }],
      attachments: [],
      lineItems: mapCommunityLineItems(item),
      totals: {
        discountAmount: '0.00',
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
      breadcrumb: ['Transactions', 'Invoice'],
      details: {
        Engine: 'Community',
        Workflow: 'Supplier self-service',
        Reason: 'PO mismatch under review',
        Sender: 'Supplier portal',
        Customer: 'Apex Retail UK',
        'Transaction Number': reference,
        Processed: '22/05/2026 10:14:00',
        'Transaction Date': '22/05/2026',
        Status: 'Failed Matching',
        Channel: 'Supplier',
        'Next milestone': 'Customer review of failed match',
        'Next ETA': 'Awaiting customer response',
        Assignee: 'Open ECX AP',
        Counterparty: 'Apex Retail UK',
        'Matched Value In View': formatPounds(6120),
        Notes: ''
      },
      documents: [{ label: 'Source invoice PDF', view: true, download: true }],
      attachments: [],
      lineItems: [
        {
          line: 1,
          supplierCode: `${reference}-1`,
          buyerCode: '',
          description: 'Submitted invoice under PO review',
          quantity: '1.00',
          price: net.toFixed(2),
          discountPct: '0.00',
          discountAmount: '0.00',
          vatRate: '20.00',
          vatAmount: vat.toFixed(2),
          netAmount: net.toFixed(2),
          total: total.toFixed(2)
        }
      ],
      totals: {
        discountAmount: '0.00',
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
    const isFraudOutlier = item.id === 'fraud-WIL-4286';
    const lineDescription = isFraudOutlier ? 'Office supplies and stationery order' : item.reason;

    return {
      breadcrumb: ['Transactions', item.documentType || item.type],
      details: {
        Engine: item.engine,
        Workflow: item.group,
        Reason: item.reason,
        Sender: item.sender,
        Customer: item.customerName,
        'Transaction Number': item.transactionNumber,
        'Order Number': item.orderNumber,
        Processed: item.processedDate,
        'Transaction Date': item.transactionDate,
        Status: item.status,
        Channel: 'Invoice ingestion',
        'Next milestone': item.status === 'Held for review' ? 'Fraud review decision' : 'Workflow review',
        'Next ETA': item.status === 'Held for review' ? 'Today 16:00' : '',
        Assignee: item.assignedTo,
        Counterparty: item.customerName,
        Notes: isFraudOutlier ? '' : item.reason,
        'Processed Time In Seconds': '286.00'
      },
      documents: [{ label: 'Source invoice PDF', view: true, download: true }],
      attachments: [],
      lineItems: [
        {
          line: 1,
          supplierCode: `${item.transactionNumber}-1`,
          buyerCode: item.orderNumber,
          description: lineDescription,
          quantity: '1.00',
          price: net.toFixed(2),
          discountPct: '0.00',
          discountAmount: '0.00',
          vatRate: '20.00',
          vatAmount: vat.toFixed(2),
          netAmount: net.toFixed(2),
          total: total.toFixed(2)
        }
      ],
      totals: {
        discountAmount: '0.00',
        vatAmount: vat.toFixed(2),
        netAmount: net.toFixed(2),
        total: total.toFixed(2)
      }
    };
  }

  function resolveDetail(id) {
    if (!id?.startsWith('community-')) {
      const matchingTransaction = transactions.find((item) => item.id === id);
      return matchingTransaction ? buildTransactionDetail(matchingTransaction) : transactionDetail;
    }

    const reference = id.replace(/^community-/, '');
    const matchingCommunityTransaction = communityTransactions.find((item) => item.reference === reference);

    if (matchingCommunityTransaction) {
      return buildCommunityDetail(matchingCommunityTransaction);
    }

    if (reference === 'INV-24118') {
      return buildEvaTransactionDetail(reference);
    }

    return buildEvaTransactionDetail(reference);
  }

  $: transactionId = $page.params.id;
  $: d = resolveDetail(transactionId);
  $: fraudAlert =
    transactionId === 'fraud-WIL-4286'
      ? {
          severity: 'High fraud risk',
          title: 'Invoice value pattern outlier detected',
          summary:
            'Willow Office Supplies usually averages GBP 126 per invoice, but this invoice is GBP 4,286. Payment should stay held until AP Review confirms the value is genuine.',
          score: 78,
          caseId: 'FC-1022',
          nextStep: 'Confirm whether this is a genuine consolidated order, unusual line items, or a substituted invoice.'
        }
      : null;

  const lineColumns = [
    'Line',
    'Supplier Code',
    'Buyer Code',
    'Description',
    'Quantity',
    'Price',
    'Discount %',
    'Discount Amount',
    'Vat Rate',
    'VAT Amount',
    'Net Amount',
    'Total'
  ];

  let detailsOpen = true;
  let docsOpen = true;
  const collapsibleSections = ['Hangfire', 'Exports', 'Integrations', 'History', 'Emails'];

  $: keys = Object.keys(d.details);
  $: rows = [];
  $: for (let i = 0; i < keys.length; i += 3) {
    rows.push(keys.slice(i, i + 3).map((k) => ({ label: k, value: d.details[k] })));
  }
</script>

<div class="page-header">
  <span class="icon-tile">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="5" y="4" width="14" height="18" rx="2" />
      <path d="M9 4h6v3H9z" />
      <path d="M9 12h6M9 16h6" />
    </svg>
  </span>
  <div class="crumbs">
    <a class="crumb-link" href="/transactions">Transactions</a>
    <svg class="crumb-sep" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M9 6l6 6-6 6" /></svg>
    <span class="crumb-current">{d.breadcrumb?.[1] || 'Transaction'}</span>
  </div>
</div>

{#if fraudAlert}
  <section class="fraud-alert-banner" aria-label="Fraud risk alert">
    <div class="fraud-alert-score">
      <span>Fraud score</span>
      <strong>{fraudAlert.score}</strong>
    </div>
    <div class="fraud-alert-copy">
      <span class="fraud-alert-kicker">{fraudAlert.severity} • {fraudAlert.caseId}</span>
      <h2>{fraudAlert.title}</h2>
      <p>{fraudAlert.summary}</p>
      <strong>{fraudAlert.nextStep}</strong>
    </div>
    <div class="fraud-alert-actions">
      <a class="fraud-alert-btn solid" href="/fraud">Open fraud case</a>
      <a class="fraud-alert-btn" href="#line-items">Review line items</a>
    </div>
  </section>
{/if}

<div class="detail-grid">
  <section class="panel details-panel">
    <header class="section-head" on:click={() => (detailsOpen = !detailsOpen)}>
      <span class="caret" class:open={detailsOpen}>
        <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5l8 7-8 7z" /></svg>
      </span>
      <span class="section-title">Details</span>
    </header>
    {#if detailsOpen}
      <div class="details-body">
        {#each rows as row}
          <div class="details-row">
            {#each row as cell}
              <div class="field">
                <div class="field-label">{cell.label}</div>
                {#if cell.value}
                  <div class="field-value">{cell.value}</div>
                {:else}
                  <div class="field-value empty">&nbsp;</div>
                {/if}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {/if}
  </section>

  <aside class="side-col">
    <section class="panel side-panel">
      <header class="section-head small">
        <span class="caret open"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5l8 7-8 7z" /></svg></span>
        <span class="section-title">Documents</span>
      </header>
      <div class="doc-list">
        {#each d.documents as doc}
          <div class="doc-row">
            <span class="doc-label">{doc.label}</span>
            <span class="doc-actions">
              {#if doc.view}<button class="doc-btn view">View</button>{/if}
              {#if doc.download}
                <button class="doc-btn icon" aria-label="Download">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 4v12" /><path d="M6 12l6 6 6-6" /><path d="M4 20h16" />
                  </svg>
                </button>
              {/if}
              {#if doc.send}<button class="doc-btn send">Send</button>{/if}
            </span>
          </div>
        {/each}
      </div>
    </section>

    {#if d.attachments?.length}
      <section class="panel side-panel">
        <header class="section-head small plain">
          <span class="section-title">Attachments</span>
        </header>
        <div class="doc-list">
          {#each d.attachments as name}
            <div class="doc-row">
              <span class="doc-label">{name}</span>
              <span class="doc-actions">
                <button class="doc-btn view">View</button>
                <button class="doc-btn icon" aria-label="Download">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 4v12" /><path d="M6 12l6 6 6-6" /><path d="M4 20h16" />
                  </svg>
                </button>
              </span>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <section class="panel side-panel side-collapsible-stack">
      {#each collapsibleSections as section}
        <header class="section-head small bar">
          <span class="caret"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5l8 7-8 7z" /></svg></span>
          <span class="section-title">{section}</span>
        </header>
      {/each}
    </section>
  </aside>
</div>

<section id="line-items" class="panel line-items-panel">
  <header class="section-head plain"><span class="section-title">Line Items</span></header>
  <div class="table-wrap">
    <table class="line-table">
      <thead>
        <tr>{#each lineColumns as c}<th>{c}</th>{/each}</tr>
      </thead>
      <tbody>
        {#each d.lineItems as li}
          <tr>
            <td>{li.line}</td>
            <td>{li.supplierCode}</td>
            <td>{li.buyerCode}</td>
            <td>{li.description}</td>
            <td class="num">{li.quantity}</td>
            <td class="num">{li.price}</td>
            <td class="num">{li.discountPct}</td>
            <td class="num">{li.discountAmount}</td>
            <td class="num">{li.vatRate}</td>
            <td class="num">{li.vatAmount}</td>
            <td class="num">{li.netAmount}</td>
            <td class="num">{li.total}</td>
          </tr>
        {/each}
        <tr class="totals">
          <td colspan="7"></td>
          <td class="num">{d.totals.discountAmount}</td>
          <td></td>
          <td class="num">{d.totals.vatAmount}</td>
          <td class="num">{d.totals.netAmount}</td>
          <td class="num">{d.totals.total}</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>

<style>
  .crumbs {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  .crumb-link {
    color: var(--navy);
    font-weight: 700;
    background: #fff;
    border-radius: 6px;
    padding: 6px 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  .crumb-sep { color: var(--text-soft); }
  .crumb-current {
    color: var(--navy);
    font-weight: 600;
    padding: 4px 8px;
  }

  .fraud-alert-banner {
    margin-bottom: 14px;
    padding: 18px;
    border-radius: 14px;
    border: 1px solid #f0b8a8;
    background:
      linear-gradient(135deg, rgba(166, 27, 27, 0.08), rgba(255, 247, 237, 0.96)),
      #fff;
    box-shadow: 0 18px 42px rgba(166, 27, 27, 0.14);
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 18px;
    align-items: center;
  }
  .fraud-alert-score {
    width: 104px;
    min-height: 104px;
    border-radius: 14px;
    background: #a61b1b;
    color: #fff;
    display: grid;
    place-items: center;
    text-align: center;
    padding: 12px;
  }
  .fraud-alert-score span {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.86);
  }
  .fraud-alert-score strong {
    font-size: 38px;
    line-height: 1;
  }
  .fraud-alert-copy {
    min-width: 0;
  }
  .fraud-alert-kicker {
    display: inline-flex;
    margin-bottom: 6px;
    color: #a61b1b;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .fraud-alert-copy h2 {
    margin: 0 0 6px;
    color: #7f1d1d;
    font-size: 22px;
  }
  .fraud-alert-copy p {
    margin: 0 0 8px;
    color: #5f2f23;
    line-height: 1.5;
  }
  .fraud-alert-copy > strong {
    color: var(--navy);
    line-height: 1.4;
  }
  .fraud-alert-actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
  }
  .fraud-alert-btn {
    min-width: 150px;
    padding: 10px 14px;
    border-radius: 999px;
    border: 1px solid #f0b8a8;
    background: #fff;
    color: #7f1d1d;
    font-size: 12px;
    font-weight: 800;
    text-align: center;
    text-decoration: none;
  }
  .fraud-alert-btn.solid {
    background: #a61b1b;
    color: #fff;
    border-color: #a61b1b;
  }

  .detail-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 14px;
    align-items: start;
    margin-bottom: 14px;
  }

  .section-head {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    user-select: none;
  }
  .section-head.small { padding: 10px 12px; }
  .section-head.plain { cursor: default; }
  .section-head.bar {
    background: var(--panel-alt);
    border-bottom: 1px solid var(--border);
  }
  .section-head.bar:last-child { border-bottom: none; }

  .section-title {
    color: var(--navy);
    font-weight: 700;
    font-size: 14px;
  }
  .caret {
    color: var(--orange);
    display: inline-flex;
    transform: rotate(0deg);
    transition: transform 0.1s;
  }
  .caret.open { transform: rotate(90deg); }

  .details-body {
    padding: 10px 14px 14px;
  }
  .details-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px 18px;
    padding: 10px 0;
    border-bottom: 1px solid rgba(226, 232, 240, 0.75);
  }
  .details-row:last-child { border-bottom: none; }
  .field-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--text-dim);
    margin-bottom: 6px;
  }
  .field-value {
    color: var(--navy);
    font-weight: 600;
    line-height: 1.4;
    word-break: break-word;
  }
  .field-value.empty { color: transparent; }

  .side-col {
    display: grid;
    gap: 14px;
  }
  .doc-list {
    padding: 10px 12px 12px;
    display: grid;
    gap: 10px;
  }
  .doc-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(248, 250, 252, 0.9);
    border: 1px solid rgba(226, 232, 240, 0.85);
  }
  .doc-label {
    color: var(--navy);
    font-weight: 600;
  }
  .doc-actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .doc-btn {
    border: 0;
    background: rgba(16, 41, 79, 0.08);
    color: var(--navy);
    border-radius: 10px;
    padding: 8px 10px;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
  }
  .doc-btn.view,
  .doc-btn.send {
    padding-inline: 12px;
  }

  .side-collapsible-stack {
    overflow: hidden;
  }

  .table-wrap {
    overflow: auto;
  }
  .line-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 980px;
  }
  .line-table th,
  .line-table td {
    padding: 10px 12px;
    border-bottom: 1px solid rgba(226, 232, 240, 0.85);
    text-align: left;
    white-space: nowrap;
  }
  .line-table th {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--text-dim);
    background: rgba(248, 250, 252, 0.95);
  }
  .line-table td {
    color: var(--navy);
    font-size: 13px;
  }
  .line-table td.num {
    text-align: right;
    font-variant-numeric: tabular-nums;
  }
  .totals td {
    font-weight: 700;
    background: rgba(248, 250, 252, 0.6);
  }

  @media (max-width: 900px) {
    .fraud-alert-banner {
      grid-template-columns: 1fr;
      align-items: stretch;
    }
    .fraud-alert-score {
      width: 100%;
      min-height: 78px;
    }
    .fraud-alert-actions {
      flex-direction: row;
      flex-wrap: wrap;
    }
    .fraud-alert-btn {
      flex: 1 1 180px;
    }
  }
</style>
