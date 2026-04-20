<script>
  import { transactions, customers } from '$lib/data.js';
  import { goto } from '$app/navigation';

  const columns = [
    'Type', 'Group', 'Reason', 'Document Type', 'Status',
    'Processed Date', 'Exported Date', 'Sender', 'Transaction Number',
    'Order Number', 'Transaction Date', 'Net', 'VAT', 'Total',
    'AssignedTo', 'Options', 'Customer Name', 'Engine'
  ];

  let filtersOn = true;
  let pageSize = '25';
  let currentPage = 1;
  const pages = [1, 2, 3, 4, 5];

  // Navigate when a row is clicked — skip when the user clicks an
  // interactive element inside the row (checkbox, options dropdown, link).
  function rowClick(event, id) {
    const el = event.target;
    if (el.closest('input, button, a, .opt-select, .sel')) return;
    goto(`/transactions/${id}`);
  }
  function rowKey(event, id) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goto(`/transactions/${id}`);
    }
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
  <h1>Transactions</h1>
</div>

<section class="main-card panel">
  <div class="all-groups-bar">
    <div class="select">
      <span>All Groups</span>
      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6" /></svg>
    </div>
  </div>

  <div class="views-bar">
    {#each ['Including Received Column', 'Received At', 'Test Field Data', 'test order'] as v}
      <button class="view-tab" type="button">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 9h18" />
        </svg>
        <span>{v}</span>
      </button>
    {/each}
  </div>

  <div class="controls-bar">
    <div class="controls-left">
      <label class="toggle">
        <input type="checkbox" bind:checked={filtersOn} />
        <span class="track"><span class="thumb" /></span>
        <span class="toggle-label">Filters</span>
      </label>

      <span class="ctrl-label">Sort</span>
      <div class="select select-md">
        <span>Processed Date</span>
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
          <path d="M21 12a9 9 0 1 1-3-6.7" />
          <path d="M21 3v6h-6" />
        </svg>
      </button>

      <span class="ctrl-label">View</span>
      <div class="select select-md">
        <span>Default</span>
        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6" /></svg>
      </div>
    </div>

    <div class="controls-right">
      <div class="select select-sm">
        <span>{pageSize}</span>
        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6" /></svg>
      </div>
      <button class="pg-btn disabled">&laquo;</button>
      <button class="pg-btn disabled">Prev</button>
      {#each pages as p}
        <button class="pg-btn" class:active={p === currentPage} on:click={() => currentPage = p}>{p}</button>
      {/each}
      <button class="pg-btn">Next</button>
      <button class="pg-btn">&raquo;</button>
      <span class="results">11752 Results</span>
      <button class="bulk-btn">Bulk Options (0)</button>
      <button class="export-btn">Export</button>
    </div>
  </div>

  <div class="work-area">
    {#if filtersOn}
      <aside class="filter-pane">
        <div class="pane-head">
          <span class="pane-title">Searches</span>
          <button class="pane-btn">Search</button>
        </div>
        <div class="pane-body">
          <div class="floating-input">
            <input id="txn" class="tinput" placeholder=" " />
            <label for="txn">Transaction #</label>
          </div>
          <div class="floating-input">
            <input id="ord" class="tinput" placeholder=" " />
            <label for="ord">Order #</label>
          </div>
          <div class="floating-input">
            <input id="sen" class="tinput" placeholder=" " />
            <label for="sen">Sender</label>
          </div>
          <div class="floating-input">
            <input id="rec" class="tinput" placeholder=" " />
            <label for="rec">Receiver</label>
          </div>
          <div class="floating-input">
            <input id="fn" class="tinput" placeholder=" " />
            <label for="fn">File Name</label>
          </div>
          <div class="floating-input">
            <input id="sea" class="tinput" placeholder=" " />
            <label for="sea">Sender Email Address</label>
          </div>
        </div>

        <div class="pane-head">
          <span class="pane-title">Filters</span>
          <button class="pane-btn">Filter</button>
        </div>
        <div class="pane-body">
          <div class="floating-input has-label">
            <label class="top-label">Processed Date</label>
            <div class="date-row">
              <input class="tinput" placeholder="dd/mm/yyyy" />
              <span class="dash">-</span>
              <input class="tinput" placeholder="dd/mm/yyyy" />
            </div>
          </div>

          <div class="customer-block">
            <div class="customer-label">Customer</div>
            <input class="tinput search" placeholder="Search" />
            <ul class="check-list">
              {#each customers as c}
                <li><label><input type="checkbox" /> <span>{c}</span></label></li>
              {/each}
            </ul>
          </div>
        </div>
      </aside>
    {/if}

    <div class="table-wrap">
      <table class="tx-table">
        <thead>
          <tr>
            {#each columns as c}<th>{c}</th>{/each}
            <th class="sel"><input type="checkbox" /></th>
          </tr>
        </thead>
        <tbody>
          {#each transactions as t}
            <tr
              class="clickable"
              role="button"
              tabindex="0"
              on:click={(e) => rowClick(e, t.id)}
              on:keydown={(e) => rowKey(e, t.id)}
            >
              <td>{t.type}</td>
              <td class="strong">{t.group}</td>
              <td>{t.reason}</td>
              <td>{t.documentType}</td>
              <td>
                {#if t.status === 'Exported'}
                  <a class="pill green" href="/transactions/{t.id}">
                    <span class="pill-icon">
                      <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l4 4 10-10" /></svg>
                    </span>
                    Exported
                  </a>
                {:else}
                  <a class="pill amber" href="/transactions/{t.id}">
                    <span class="pill-icon">!</span>
                    Suspended
                  </a>
                {/if}
              </td>
              <td class="date">{t.processedDate}</td>
              <td class="date">{t.exportedDate}</td>
              <td>{t.sender}</td>
              <td><a class="link" href="/transactions/{t.id}">{t.transactionNumber}</a></td>
              <td>{t.orderNumber}</td>
              <td>{t.transactionDate}</td>
              <td class="num">{t.net}</td>
              <td class="num">{t.vat}</td>
              <td class="num">{t.total}</td>
              <td class="small">{t.assignedTo}</td>
              <td>
                <div class="opt-select">
                  <span>...</span>
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6" /></svg>
                </div>
              </td>
              <td class="small">{t.customerName}</td>
              <td>{t.engine}</td>
              <td class="sel"><input type="checkbox" /></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<style>
  /* Main wrapper card */
  .main-card { padding: 16px 18px; }

  /* Top All Groups bar with light inner background */
  .all-groups-bar {
    background: #eef1f4;
    border-radius: 6px;
    padding: 14px;
    margin-bottom: 14px;
  }

  .select {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 12px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    color: #000;
    font-size: 13px;
    font-weight: 400;
    cursor: default;
    min-width: 260px;
  }

  /* Named view tabs */
  .views-bar {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 12px;
  }
  .view-tab {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #000;
    font-size: 12px;
    font-weight: 500;
  }

  /* Controls row */
  .controls-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 0 12px;
    flex-wrap: wrap;
    border-bottom: 1px solid var(--border);
    margin-bottom: 4px;
  }
  .controls-left, .controls-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .controls-right { margin-left: auto; }

  .ctrl-label {
    color: #000;
    font-weight: 500;
    margin-left: 4px;
    font-size: 12px;
  }

  .select-md { padding: 5px 10px; min-width: 130px; font-size: 12px; }
  .select-sm { padding: 5px 10px; min-width: 50px; font-size: 12px; }

  .toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
  }
  .toggle input { display: none; }
  .toggle .track {
    width: 32px;
    height: 16px;
    border-radius: 999px;
    background: #cdd3db;
    position: relative;
    transition: background 0.15s;
  }
  .toggle .thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
    transition: left 0.15s;
  }
  .toggle input:checked + .track { background: var(--teal); }
  .toggle input:checked + .track .thumb { left: 18px; }
  .toggle-label { font-weight: 500; font-size: 12px; }

  .icon-btn {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 6px;
    width: 28px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--navy);
  }
  .icon-btn.plain { background: transparent; border: none; color: var(--orange); }

  .pg-btn {
    background: #fff;
    border: 1px solid var(--border);
    padding: 5px 9px;
    border-radius: 6px;
    color: #000;
    font-weight: 500;
    font-size: 12px;
    min-width: 28px;
  }
  .pg-btn.active {
    background: rgba(26, 51, 96, 0.1);
    border-color: transparent;
    color: var(--navy);
    font-weight: 600;
    box-shadow:
      rgba(0, 0, 0, 0.1) 0px 1px 0px 1px,
      rgba(255, 255, 255, 0.1) 0px 2px 0px 0px inset;
  }
  .pg-btn.disabled { color: var(--text-soft); }

  .results { color: #000; font-weight: 400; font-size: 12px; }
  .bulk-btn, .export-btn {
    background: #fff;
    border: 1px solid var(--border);
    padding: 6px 12px;
    border-radius: 6px;
    font-weight: 500;
    font-size: 12px;
    color: #000;
  }

  /* Work area */
  .work-area {
    display: flex;
    align-items: flex-start;
    gap: 0;
  }

  /* Filter pane (left column inside main card) */
  .filter-pane {
    width: 230px;
    min-width: 230px;
    padding: 4px 16px 14px 0;
    border-right: 1px solid var(--border);
  }
  .pane-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0 8px;
  }
  .pane-title {
    color: var(--navy);
    font-weight: 700;
    font-size: 16px;
  }
  .pane-btn {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 3px 12px;
    font-weight: 500;
    font-size: 12px;
    color: #000;
  }
  .pane-body { display: flex; flex-direction: column; gap: 10px; }

  .tinput {
    width: 100%;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 10px;
    font-size: 13px;
    outline: none;
    background: #fff;
  }
  .tinput:focus { border-color: var(--navy); }

  /* Floating orange label */
  .floating-input {
    position: relative;
  }
  .floating-input label {
    position: absolute;
    top: -6px;
    left: 8px;
    padding: 0 4px;
    background: #fff;
    color: var(--orange);
    font-size: 10px;
    font-weight: 500;
    pointer-events: none;
  }
  .floating-input .tinput { padding: 7px 10px; }

  .floating-input.has-label .top-label {
    position: static;
    background: transparent;
    padding: 0;
    color: var(--orange);
    font-size: 10px;
    font-weight: 500;
    display: block;
    margin-bottom: 4px;
  }

  .date-row {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .date-row .dash { color: #000; }

  .customer-block {
    margin-top: 4px;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 10px;
  }
  .customer-label {
    color: var(--orange);
    font-size: 10px;
    font-weight: 500;
    margin-bottom: 6px;
  }
  .tinput.search { padding: 6px 10px; }

  .check-list {
    list-style: none;
    padding: 0;
    margin: 6px 0 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
    max-height: 180px;
    overflow-y: auto;
  }
  .check-list label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
  }

  /* Data table */
  .table-wrap {
    flex: 1 1 auto;
    min-width: 0;
    overflow-x: auto;
    padding-left: 14px;
    padding-top: 2px;
  }

  .tx-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }
  .tx-table th {
    text-align: left;
    padding: 10px 5px;
    color: #000;
    font-weight: 600;
    font-size: 11px;
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
    vertical-align: top;
  }
  .tx-table td {
    padding: 10px 5px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
    color: #000;
  }
  .tx-table td.strong { font-weight: 500; }
  .tx-table td.num { text-align: right; }
  .tx-table td.date, .tx-table td.small { font-size: 11.5px; }
  .tx-table tbody tr:hover { background: var(--row-hover); }
  .tx-table tbody tr.clickable { cursor: pointer; }
  .tx-table tbody tr.clickable:focus-visible {
    outline: 2px solid var(--navy);
    outline-offset: -2px;
  }

  .link { color: #000; }
  .link:hover { color: var(--orange); text-decoration: underline; }

  .opt-select {
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 2px 6px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    min-width: 42px;
    justify-content: space-between;
    color: var(--text-dim);
    font-size: 11px;
  }

  .sel { text-align: center; width: 32px; }
</style>
