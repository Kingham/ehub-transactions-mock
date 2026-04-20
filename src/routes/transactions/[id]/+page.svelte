<script>
  import { transactionDetail } from '$lib/data.js';
  const d = transactionDetail;

  // break detail fields into 3-column rows to match the source layout
  const keys = Object.keys(d.details);
  /** @type {{label:string,value:string}[][]} */
  const rows = [];
  for (let i = 0; i < keys.length; i += 3) {
    rows.push(
      keys.slice(i, i + 3).map((k) => ({ label: k, value: d.details[k] }))
    );
  }

  const lineColumns = [
    'Line', 'Supplier Code', 'Buyer Code', 'Description', 'Quantity', 'Price',
    'Discount %', 'Discount Amount', 'Vat Rate', 'VAT Amount', 'Net Amount', 'Total'
  ];

  let detailsOpen = true;
  let docsOpen = true;
  const collapsibleSections = ['Hangfire', 'Exports', 'Integrations', 'History', 'Emails'];
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
    <span class="crumb-current">Sales Invoice</span>
  </div>
</div>

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
  </aside>
</div>

<section class="panel collapsible-stack">
  {#each collapsibleSections as section}
    <header class="section-head bar">
      <span class="caret"><svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M8 5l8 7-8 7z" /></svg></span>
      <span class="section-title">{section}</span>
    </header>
  {/each}
</section>

<section class="panel line-items-panel">
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

  .details-panel .details-body {
    padding: 18px 22px 24px;
  }
  .details-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 40px;
    padding-bottom: 22px;
  }
  .field-label {
    color: #999;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 4px;
  }
  .field-value {
    color: #000;
    font-weight: 600;
    font-size: 13px;
  }
  .field-value.empty { color: transparent; }

  .side-col { display: flex; flex-direction: column; gap: 14px; }

  .doc-list { display: flex; flex-direction: column; }
  .doc-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-top: 1px solid var(--border);
    font-size: 13px;
  }
  .doc-row:first-child { border-top: none; }
  .doc-label { color: var(--text); font-weight: 500; }
  .doc-actions { display: inline-flex; align-items: center; gap: 6px; }
  .doc-btn {
    border: 1px solid var(--border);
    background: #fff;
    border-radius: 6px;
    padding: 3px 10px;
    font-size: 12px;
    font-weight: 600;
    color: var(--orange);
  }
  .doc-btn.view { color: var(--orange); }
  .doc-btn.icon {
    color: var(--orange);
    width: 24px;
    height: 24px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .doc-btn.send { color: var(--orange); }

  .collapsible-stack {
    margin-bottom: 14px;
    overflow: hidden;
  }

  .line-items-panel { padding-bottom: 4px; }
  .line-items-panel .section-head { border-bottom: 1px solid var(--border); }
  .line-items-panel .table-wrap { padding: 4px 14px 12px; overflow-x: auto; }
  .line-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .line-table th {
    text-align: left;
    padding: 10px 6px;
    color: var(--navy);
    font-weight: 700;
    border-bottom: 1px solid var(--border);
  }
  .line-table td {
    padding: 10px 6px;
    border-bottom: 1px solid var(--border);
  }
  .line-table td.num, .line-table th:nth-child(n+5) { text-align: right; }
  .line-table tr.totals td { font-weight: 700; border-top: 1px solid var(--border); border-bottom: none; }
</style>
