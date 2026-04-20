<script>
  import { statementDetail } from '$lib/data.js';
  const d = statementDetail;

  function statusClass(s) {
    if (!s) return '';
    if (s === 'Matched') return 'matched';
    if (s === 'Matched within Tolerance') return 'tolerance';
    if (s === 'Matched with Different Total') return 'diff-total';
    if (s === 'Not Matched') return 'not-matched';
    if (s === 'Query Raised') return 'query';
    return '';
  }
</script>

<section class="recon-head panel">
  <div class="head-left">
    <span class="head-title">Statement Reconciliation</span>
    <span class="status-pill">{d.status}</span>
  </div>
  <div class="head-right">
    <button class="btn-text">Disregard Statement</button>
    <button class="btn-outline-teal">Reconcile Statement</button>
    <button class="btn-navy">Add Note</button>
    <button class="btn-text">Actions</button>
    <div class="select">
      <span>Options</span>
      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6" /></svg>
    </div>
    <div class="assign-chip">
      <span class="avatar">{d.assignedInitials}</span>
      <div class="assign-text">
        <span class="small-dim">Assigned To</span>
        <span class="small-strong">{d.assignedTo}</span>
      </div>
    </div>
  </div>
</section>

<div class="tabs-underline">
  <button class="tab active">Statement Reconciliation</button>
  <button class="tab">Payment Reconciliation</button>
</div>

<div class="body-grid">
  <div class="body-col">
    <!-- Supplier + statement meta card row -->
    <div class="meta-row">
      <div class="card supplier-card">
        <span class="card-icon muted">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 8l9-4 9 4-9 4-9-4z" />
            <path d="M3 8v8l9 4 9-4V8" />
          </svg>
        </span>
        <div class="card-body">
          <span class="small-dim">Supplier</span>
          <span class="big-bold">{d.supplier}</span>
        </div>
      </div>

      <div class="card meta-card">
        <div class="meta-field">
          <span class="small-dim">Statement Date</span>
          <span class="big-bold">{d.statementDate}</span>
        </div>
        <div class="meta-field">
          <span class="small-dim">Statement #</span>
          <span class="big-bold">{d.statementNumber}</span>
        </div>
        <div class="meta-field">
          <span class="small-dim">Captured Total</span>
          <span class="big-bold">{d.capturedTotal}</span>
        </div>
        <div class="meta-field">
          <span class="small-dim">Statement End Date</span>
          <span class="big-bold">{d.statementEndDate}</span>
        </div>
      </div>
    </div>

    <!-- Balance cards grid -->
    <div class="balances-grid">
      <div class="card">
        <span class="card-icon muted doc">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M9 8h6M9 12h6M9 16h4" />
          </svg>
        </span>
        <div class="card-body">
          <span class="small-dim">Calculated Statement Balance</span>
          <span class="big-bold">{d.stats.calculatedStatementBalance}</span>
        </div>
      </div>
      <div class="card">
        <span class="card-icon warn">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 19l9-16H3z" transform="rotate(180 12 12)" /></svg>
        </span>
        <div class="card-body">
          <span class="small-dim">Value Difference</span>
          <span class="big-bold warn-text">{d.stats.valueDifference}</span>
        </div>
      </div>

      <div class="card">
        <span class="card-icon muted doc">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M9 8h6M9 12h6M9 16h4" />
          </svg>
        </span>
        <div class="card-body">
          <span class="small-dim">Calculated Document Balance</span>
          <span class="big-bold">{d.stats.calculatedDocumentBalance}</span>
        </div>
      </div>
      <div class="card">
        <span class="card-icon warn-soft">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 17v.01" /><path d="M12 13c0-2 2-2 2-4a2 2 0 10-4 0" />
          </svg>
        </span>
        <div class="card-body">
          <span class="small-dim">Unreconciled Items</span>
          <span class="big-bold warn-text">{d.stats.unreconciledItems}</span>
        </div>
      </div>

      <div class="card">
        <span class="card-icon warn-soft doc">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M9 8h6M9 12h6M9 16h4" />
          </svg>
        </span>
        <div class="card-body">
          <span class="small-dim">Not Listed on Statement</span>
          <span class="big-bold warn-text">{d.stats.notListedOnStatement}</span>
        </div>
      </div>
      <div class="card">
        <span class="card-icon warn-soft doc">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M9 8h6M9 12h6M9 16h4" />
          </svg>
        </span>
        <div class="card-body">
          <span class="small-dim">Documents Not Found</span>
          <span class="big-bold warn-text">{d.stats.documentsNotFound}</span>
        </div>
      </div>

      <div class="card">
        <span class="card-icon teal-soft">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 5l9 16H3z" /></svg>
        </span>
        <div class="card-body">
          <span class="small-dim">Positive Unreconciled Differences</span>
          <span class="big-bold teal-text">{d.stats.positiveDifferences}</span>
        </div>
      </div>
      <div class="card">
        <span class="card-icon warn">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 19l9-16H3z" transform="rotate(180 12 12)" /></svg>
        </span>
        <div class="card-body">
          <span class="small-dim">Negative Unreconciled Differences</span>
          <span class="big-bold">{d.stats.negativeDifferences}</span>
        </div>
      </div>

      <div class="card">
        <span class="card-icon warn-soft">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 17v.01" /><path d="M12 13c0-2 2-2 2-4a2 2 0 10-4 0" />
          </svg>
        </span>
        <div class="card-body">
          <span class="small-dim">In Query Document Total</span>
          <span class="big-bold warn-text">{d.stats.inQueryDocumentTotal}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Ledger sidebar -->
  <aside class="ledger panel">
    <ul class="ledger-list">
      {#each d.ledger as row}
        <li class:bold={row.bold}>
          {#if row.count !== null && row.count !== undefined}
            <span class="count">{row.count}</span>
          {:else}
            <span class="count hidden" />
          {/if}
          <span class="label">{row.label}</span>
          <span class="value" class:warn-text={row.valueClass === 'warn'}>{row.value}</span>
        </li>
      {/each}
    </ul>
  </aside>
</div>

<!-- Statement History collapsible -->
<div class="stmt-history">
  <span class="section-title">Statement History</span>
</div>

<!-- Statement Transactions -->
<section class="panel tx-panel">
  <div class="tx-head">
    <span class="section-title">Statement Transactions</span>
    <div class="tx-actions">
      <button class="btn-outline">Export</button>
      <button class="btn-navy">Raise Query</button>
      <button class="btn-navy">Add Note</button>
      <button class="btn-navy">Add Tags</button>
      <button class="btn-navy">Bulk Link</button>
    </div>
  </div>

  <div class="tx-tabs">
    <button class="tx-tab active">All Items</button>
    <button class="tx-tab">Unreconciled Items</button>
    <button class="tx-tab">Items For Supplier</button>
    <button class="tx-tab">Items For Query</button>
    <button class="tx-tab">Missing Items</button>
  </div>

  <div class="tx-selects">
    <label class="tx-check"><input type="checkbox" /> <span>Select All Records</span></label>
    <label class="tx-check"><input type="checkbox" /> <span>Select Records on This Page</span></label>
  </div>

  <div class="tx-controls">
    <input class="tinput search" placeholder="Search" />
    <span class="ctrl-label">Sort</span>
    <div class="select select-md">
      <span>Line Number</span>
      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6" /></svg>
    </div>
    <button class="icon-btn" title="Toggle sort direction">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 4v16M6 20l-3-3M6 20l3-3" />
        <path d="M13 8h8M13 12h6M13 16h4" />
      </svg>
    </button>
    <button class="icon-btn plain" title="Reset">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 3v6h-6" />
      </svg>
    </button>

    <div class="controls-right">
      <div class="select select-sm">
        <span>25</span>
        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6" /></svg>
      </div>
      <button class="pg-btn disabled">&laquo;</button>
      <button class="pg-btn disabled">Prev</button>
      <button class="pg-btn active">1</button>
      <button class="pg-btn disabled">Next</button>
      <button class="pg-btn disabled">&raquo;</button>
      <span class="results">21 Results</span>
    </div>
  </div>

  <!-- Transactions grid -->
  <div class="tx-grid-wrap">
    <div class="grid-heads">
      <div class="grid-col stmt">Statement</div>
      <div class="grid-col filter">Filter</div>
      <div class="grid-col docs">Documents</div>
    </div>
    {#each d.transactions as t}
      <div class="grid-row">
        <label class="sel-cell"><input type="checkbox" /></label>

        <!-- Statement side -->
        {#if t.line === null && t.statementMessage}
          <div class="stmt-cell warn-cell">{t.statementMessage}</div>
        {:else}
          <div class="stmt-cell">
            <span class="line-no">{t.line}</span>
            <span class="type-pill">{t.stType}</span>
            <span class="stmt-num">{t.stNum}</span>
            <span class="stmt-amount">{t.stAmount}</span>
          </div>
        {/if}

        <!-- Filter/status -->
        <div class="filter-cell">
          <span class="status-pill-sm {statusClass(t.status)}">
            <span class="dot" />
            {t.status}
            {#if t.editable}
              <svg class="edit-ico" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
              </svg>
            {/if}
          </span>
        </div>

        <!-- Documents side -->
        {#if t.docMessage}
          <div class="docs-cell warn-cell">{t.docMessage}</div>
        {:else}
          <div class="docs-cell">
            <span class="type-pill">{t.docType}</span>
            <div class="doc-ref">
              <div>{t.docNum}</div>
              <div class="small-dim">Order #: {t.order}</div>
              {#if t.tag}<span class="tag-pill">{t.tag}</span>{/if}
            </div>
            <div class="doc-dates">
              <div><span class="small-dim">Date</span><div class="doc-date">{t.date}</div></div>
              <div><span class="small-dim">Due</span><div class="doc-date">{t.due}</div></div>
            </div>
            <div class="doc-amount">{t.docAmount}</div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</section>

<style>
  /* Header bar */
  .recon-head {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    margin-bottom: 12px;
  }
  .head-left { display: flex; align-items: center; gap: 14px; }
  .head-right { display: flex; align-items: center; gap: 10px; margin-left: auto; }
  .head-title { color: var(--navy); font-weight: 700; font-size: 14px; }

  .status-pill {
    background: #f06060;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 6px;
  }

  .btn-text {
    background: transparent; border: none; color: var(--navy);
    font-weight: 600; font-size: 13px; padding: 6px 10px;
  }
  .btn-outline-teal {
    background: #fff; color: var(--navy);
    border: 1px solid var(--teal); border-radius: 6px;
    padding: 7px 14px; font-size: 13px; font-weight: 600;
  }
  .btn-navy {
    background: var(--navy); color: #fff; border: none;
    border-radius: 6px; padding: 7px 14px; font-size: 13px; font-weight: 600;
  }
  .btn-outline {
    background: #fff; color: var(--navy);
    border: 1px solid var(--border); border-radius: 6px;
    padding: 7px 14px; font-size: 13px; font-weight: 600;
  }

  .select {
    background: #fff; border: 1px solid var(--border);
    border-radius: 6px; padding: 6px 10px;
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12px;
  }
  .select-md { min-width: 130px; }
  .select-sm { min-width: 50px; }

  .assign-chip {
    display: flex; align-items: center; gap: 8px;
    background: var(--panel); padding: 4px 10px 4px 4px;
    border: 1px solid var(--border); border-radius: 6px;
  }
  .avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: #bac2cf; color: #fff; font-size: 11px; font-weight: 700;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .assign-text { display: flex; flex-direction: column; }
  .small-dim { color: #999; font-size: 10px; }
  .small-strong { color: #000; font-size: 12px; font-weight: 600; }

  .tabs-underline {
    display: flex; align-items: center; gap: 28px;
    padding: 0 14px; margin-bottom: 14px;
    border-bottom: 1px solid var(--border);
    background: transparent;
  }
  .tab {
    background: transparent; border: none;
    padding: 14px 0 12px; font-size: 14px; font-weight: 500;
    color: var(--text-dim); border-bottom: 2px solid transparent;
    margin-bottom: -1px;
  }
  .tab.active { color: var(--orange); border-bottom-color: var(--orange); font-weight: 700; }

  .body-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 420px;
    gap: 16px;
    margin-bottom: 16px;
  }

  /* Card layouts */
  .meta-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    gap: 14px;
    margin-bottom: 14px;
  }
  .card {
    background: #fff; border-radius: 6px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
    padding: 14px 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .meta-card {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    align-items: center;
  }
  .meta-field { display: flex; flex-direction: column; }
  .card-body { display: flex; flex-direction: column; gap: 2px; }
  .card-icon {
    width: 38px; height: 38px; border-radius: 8px;
    display: inline-flex; align-items: center; justify-content: center;
    flex: none;
  }
  .card-icon.muted { background: #eef1f5; color: var(--navy); }
  .card-icon.warn { background: #fde3d6; color: var(--orange); }
  .card-icon.warn-soft { background: #fde9de; color: var(--orange); }
  .card-icon.teal-soft { background: #d3ecee; color: var(--teal); }

  .big-bold { color: #000; font-weight: 700; font-size: 15px; }
  .warn-text { color: var(--orange); }
  .teal-text { color: var(--teal); }

  .balances-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  /* Ledger */
  .ledger { padding: 6px 0; }
  .ledger-list { list-style: none; margin: 0; padding: 0; }
  .ledger-list li {
    display: grid;
    grid-template-columns: 28px 1fr auto;
    gap: 10px;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
  }
  .ledger-list li:last-child { border-bottom: none; }
  .ledger-list li.bold { font-weight: 700; }
  .ledger-list li.bold .value { color: var(--navy); }
  .ledger-list .count {
    width: 22px; height: 22px; border-radius: 50%;
    background: #eef1f5; color: #999;
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 600;
  }
  .ledger-list .count.hidden { visibility: hidden; }
  .ledger-list .label { color: #000; }

  /* Statement History collapsible strip */
  .stmt-history {
    background: #fff;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    padding: 14px 18px;
    margin-bottom: 14px;
  }
  .section-title { color: var(--navy); font-weight: 700; font-size: 14px; }

  /* Transactions panel */
  .tx-panel { padding: 14px 18px 18px; }
  .tx-head { display: flex; align-items: center; margin-bottom: 12px; }
  .tx-actions { margin-left: auto; display: flex; gap: 8px; flex-wrap: wrap; }

  .tx-tabs {
    display: flex; align-items: center; gap: 22px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 14px;
  }
  .tx-tab {
    background: transparent; border: none;
    padding: 10px 0 8px; font-size: 13px; font-weight: 500;
    color: #000; border-bottom: 2px solid transparent; margin-bottom: -1px;
  }
  .tx-tab.active { color: var(--orange); border-bottom-color: var(--orange); font-weight: 700; }

  .tx-selects { display: flex; gap: 26px; margin-bottom: 10px; }
  .tx-check { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-dim); }

  .tx-controls {
    display: flex; align-items: center; gap: 10px;
    padding-bottom: 10px; margin-bottom: 4px;
    flex-wrap: wrap;
  }
  .tinput {
    border: 1px solid var(--border); border-radius: 6px;
    padding: 6px 10px; font-size: 12px; outline: none;
  }
  .tinput.search { min-width: 220px; }
  .ctrl-label { font-size: 12px; color: var(--text-dim); }
  .controls-right { margin-left: auto; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .icon-btn { background: #fff; border: 1px solid var(--border); border-radius: 6px; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; color: var(--navy); }
  .icon-btn.plain { background: transparent; border: none; color: var(--orange); }
  .pg-btn { background: #fff; border: 1px solid var(--border); padding: 5px 9px; border-radius: 6px; font-size: 12px; min-width: 28px; }
  .pg-btn.active { background: rgba(26,51,96,0.1); border-color: transparent; color: var(--navy); font-weight: 600; box-shadow: rgba(0,0,0,.1) 0 1px 0 1px, rgba(255,255,255,.1) 0 2px 0 0 inset; }
  .pg-btn.disabled { color: var(--text-soft); }

  /* Statement Transactions grid */
  .tx-grid-wrap { border-top: 1px solid var(--border); }

  .grid-heads {
    display: grid;
    grid-template-columns: 50px minmax(0, 1fr) 200px minmax(0, 1.5fr);
    padding: 10px 0 8px;
    border-bottom: 1px solid var(--border);
    font-size: 12px;
    color: #000;
    font-weight: 700;
  }
  .grid-heads .grid-col { text-align: center; }
  .grid-heads .grid-col.stmt { text-align: center; }
  .grid-heads .grid-col.filter { color: var(--orange); background: #fff6ef; padding: 4px 0; border-radius: 4px; }

  .grid-row {
    display: grid;
    grid-template-columns: 50px minmax(0, 1fr) 200px minmax(0, 1.5fr);
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid var(--border);
    gap: 0;
  }
  .sel-cell { text-align: center; }
  .sel-cell input { margin: 0; }

  .stmt-cell {
    display: flex; align-items: center; gap: 10px;
    padding: 4px 12px;
  }
  .line-no { color: #000; font-size: 13px; width: 24px; font-weight: 400; }
  .type-pill {
    background: var(--navy);
    color: #fff;
    font-size: 10px; font-weight: 700;
    border-radius: 4px; padding: 3px 8px;
    letter-spacing: 0.04em;
    min-width: 34px; text-align: center;
  }
  /* Different types use subtle colour variations */
  .stmt-cell .type-pill,
  .docs-cell .type-pill { background: var(--navy); }
  .grid-row:nth-child(4) .type-pill { background: var(--navy); }
  .stmt-num { color: #000; font-weight: 600; font-size: 13px; flex: 1; }
  .stmt-amount { color: #000; font-size: 13px; font-weight: 400; margin-left: auto; }

  .filter-cell { display: flex; justify-content: center; padding: 0 6px; }

  .status-pill-sm {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 4px 10px; border-radius: 6px;
    font-size: 10px; font-weight: 600;
    border: 1px solid;
    white-space: normal; text-align: center;
    line-height: 1.2;
  }
  .status-pill-sm .dot {
    width: 8px; height: 8px; border-radius: 50%; display: inline-block;
    flex: none;
  }
  .status-pill-sm.matched { color: var(--teal); border-color: var(--teal); background: #fff; }
  .status-pill-sm.matched .dot { background: var(--teal); }
  .status-pill-sm.tolerance { color: #000; border-color: var(--teal); background: #fff; }
  .status-pill-sm.tolerance .dot { background: var(--orange); }
  .status-pill-sm.diff-total { color: #000; border-color: var(--amber); background: #fff; }
  .status-pill-sm.diff-total .dot { background: var(--amber); }
  .status-pill-sm.not-matched { color: #e74c3c; border-color: #e74c3c; background: #fff; }
  .status-pill-sm.not-matched .dot { background: #e74c3c; }
  .status-pill-sm.query { color: #000; border-color: var(--amber); background: #fff; }
  .status-pill-sm.query .dot { background: var(--amber); }

  .docs-cell {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr) 140px 80px;
    gap: 10px; align-items: center;
    padding: 4px 12px;
  }
  .doc-ref { display: flex; flex-direction: column; gap: 2px; font-size: 12px; }
  .doc-ref > div:first-child { color: #000; font-weight: 600; }
  .doc-dates {
    display: grid; grid-template-columns: 1fr 1fr; gap: 6px;
    font-size: 11px;
  }
  .doc-date { color: #000; font-weight: 600; font-size: 12px; }
  .doc-amount { text-align: right; font-size: 13px; color: #000; font-weight: 400; }

  .tag-pill {
    background: #fef1e3;
    color: var(--orange);
    font-size: 10px; font-weight: 600;
    padding: 2px 8px; border-radius: 4px;
    display: inline-block; margin-top: 2px;
    align-self: flex-start;
  }

  .warn-cell {
    background: #fdeeea; color: #e74c3c;
    font-size: 12px; font-weight: 600;
    padding: 14px 16px; text-align: center;
    border-radius: 4px; margin: 0 8px;
  }
</style>
