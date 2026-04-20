<script>
  import { statements } from '$lib/data.js';
  import { goto } from '$app/navigation';

  let filtersOn = true;
  let status = {
    'Processing Document': false,
    'Processing Statement': false,
    Disregarded: false,
    Reconciled: false,
    Unreconciled: true
  };

  function rowClick(event, id) {
    const el = event.target;
    if (el.closest('input, button, a, .sel')) return;
    goto(`/reconciliation/${id}`);
  }
  function rowKey(event, id) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      goto(`/reconciliation/${id}`);
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
  <h1>Matching</h1>
  <div class="customer-ctrl">
    <span class="cust-label">Customer</span>
    <div class="select cust-select">
      <span>Klipboard</span>
      <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6" /></svg>
    </div>
  </div>
</div>

<section class="panel main-card">
  <!-- Primary tabs -->
  <div class="tabs-row primary">
    <button class="tab active">Statement</button>
    <button class="tab">Payment Reconciliation</button>
    <button class="tab">Settings</button>
  </div>

  <!-- Secondary tabs -->
  <div class="tabs-row secondary">
    <div class="sec-tabs">
      <button class="stab">Dashboard</button>
      <button class="stab active">Statement List</button>
      <button class="stab">Suppliers</button>
      <button class="stab">Users</button>
      <button class="stab">Documents</button>
      <button class="stab">Queries (0/0)</button>
    </div>
    <button class="download-btn">Download Ledger</button>
  </div>

  <!-- Controls row -->
  <div class="controls-bar">
    <label class="toggle">
      <input type="checkbox" bind:checked={filtersOn} />
      <span class="track"><span class="thumb" /></span>
      <span class="toggle-label">Filters</span>
    </label>

    <span class="ctrl-label">Sort</span>
    <div class="select select-md">
      <span>Received At</span>
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
      <span class="results">{statements.length} Results</span>
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
            <input id="sn" class="tinput" placeholder=" " />
            <label for="sn">Sender Name</label>
          </div>
          <div class="floating-input">
            <input id="stn" class="tinput" placeholder=" " />
            <label for="stn">Statement Number</label>
          </div>
          <div class="floating-input">
            <input id="fn" class="tinput" placeholder=" " />
            <label for="fn">File Name</label>
          </div>
        </div>

        <div class="pane-head">
          <span class="pane-title">Filters</span>
          <button class="pane-btn">Filter</button>
        </div>
        <div class="pane-body">
          <div class="group-box">
            <div class="group-label">Status</div>
            <ul class="check-list">
              {#each Object.keys(status) as key}
                <li><label><input type="checkbox" bind:checked={status[key]} /> <span>{key}</span></label></li>
              {/each}
            </ul>
          </div>

          <div class="floating-input has-label">
            <label class="top-label">Received At</label>
            <div class="date-row">
              <input class="tinput" placeholder="dd/mm/yyyy" />
              <span class="dash">-</span>
              <input class="tinput" placeholder="dd/mm/yyyy" />
            </div>
          </div>
        </div>
      </aside>
    {/if}

    <div class="table-wrap">
      <table class="st-table">
        <thead>
          <tr>
            <th class="sel">Select</th>
            <th>Supplier</th>
            <th>Statement Number</th>
            <th>File Name</th>
            <th>Received At</th>
            <th>Statement Date</th>
            <th class="num">Statement Total</th>
            <th class="num">No. Reconciled Transactions</th>
            <th class="num">No. Unreconciled Transactions</th>
            <th>Assigned User</th>
            <th>Status</th>
            <th>View Statement</th>
          </tr>
        </thead>
        <tbody>
          {#each statements as s}
            <tr
              class="clickable"
              role="button"
              tabindex="0"
              on:click={(e) => rowClick(e, s.id)}
              on:keydown={(e) => rowKey(e, s.id)}
            >
              <td class="sel"><input type="checkbox" /></td>
              <td>{s.supplier}</td>
              <td class="strong">{s.statementNumber}</td>
              <td>{s.fileName}</td>
              <td>{s.receivedAt}</td>
              <td>{s.statementDate}</td>
              <td class="num strong">{s.statementTotal}</td>
              <td class="num">{s.reconciledCount}</td>
              <td class="num">{s.unreconciledCount}</td>
              <td>{s.assignedUser || ''}</td>
              <td>{s.status}</td>
              <td>
                <a class="pill-btn" href="/reconciliation/{s.id}">Statement</a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<style>
  .page-header { position: relative; }
  .customer-ctrl {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .cust-label { color: #000; font-size: 12px; }
  .cust-select { min-width: 260px; }

  .main-card { padding: 0; overflow: hidden; }

  /* Primary tabs — underlined */
  .tabs-row.primary {
    display: flex;
    align-items: center;
    gap: 28px;
    padding: 0 20px;
    border-bottom: 1px solid var(--border);
  }
  .tab {
    background: transparent;
    border: none;
    padding: 16px 0 14px;
    font-size: 14px;
    font-weight: 500;
    color: var(--text-dim);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
  }
  .tab.active { color: var(--orange); border-bottom-color: var(--orange); font-weight: 600; }

  /* Secondary tabs row */
  .tabs-row.secondary {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 20px 0;
  }
  .sec-tabs {
    display: flex;
    align-items: center;
    gap: 24px;
    flex: 1;
  }
  .stab {
    background: transparent;
    border: none;
    padding: 14px 0 12px;
    font-size: 13px;
    font-weight: 500;
    color: #000;
    border-bottom: 2px solid transparent;
  }
  .stab.active { color: var(--navy); font-weight: 700; border-bottom-color: var(--navy); }
  .download-btn {
    background: #fff;
    color: var(--navy);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 600;
  }

  /* Controls row */
  .controls-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    border-top: 1px solid var(--border);
    flex-wrap: wrap;
  }
  .controls-right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .ctrl-label { font-size: 12px; font-weight: 500; }

  .select {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 6px 10px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
  }
  .select-md { min-width: 130px; }
  .select-sm { min-width: 50px; }

  .toggle { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
  .toggle input { display: none; }
  .toggle .track { width: 32px; height: 16px; border-radius: 999px; background: #cdd3db; position: relative; }
  .toggle .thumb { position: absolute; top: 2px; left: 2px; width: 12px; height: 12px; background: #fff; border-radius: 50%; transition: left 0.15s; }
  .toggle input:checked + .track { background: var(--teal); }
  .toggle input:checked + .track .thumb { left: 18px; }
  .toggle-label { font-size: 12px; font-weight: 500; }

  .icon-btn { background: #fff; border: 1px solid var(--border); border-radius: 6px; width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; color: var(--navy); }
  .icon-btn.plain { background: transparent; border: none; color: var(--orange); }

  .pg-btn { background: #fff; border: 1px solid var(--border); padding: 5px 9px; border-radius: 6px; font-size: 12px; min-width: 28px; }
  .pg-btn.active { background: rgba(26,51,96,0.1); border-color: transparent; color: var(--navy); font-weight: 600; box-shadow: rgba(0,0,0,.1) 0 1px 0 1px, rgba(255,255,255,.1) 0 2px 0 0 inset; }
  .pg-btn.disabled { color: var(--text-soft); }

  .results { color: #000; font-size: 12px; }

  /* Work area */
  .work-area { display: flex; align-items: flex-start; padding: 0 0 16px; }

  .filter-pane {
    width: 220px;
    min-width: 220px;
    padding: 4px 16px 14px 20px;
  }
  .pane-head { display: flex; align-items: center; justify-content: space-between; padding: 12px 0 8px; }
  .pane-title { color: var(--navy); font-weight: 700; font-size: 16px; }
  .pane-btn { background: #fff; border: 1px solid var(--border); border-radius: 6px; padding: 3px 12px; font-weight: 500; font-size: 12px; color: #000; }
  .pane-body { display: flex; flex-direction: column; gap: 10px; }

  .tinput { width: 100%; border: 1px solid var(--border); border-radius: 6px; padding: 7px 10px; font-size: 13px; outline: none; background: #fff; }
  .tinput:focus { border-color: var(--navy); }

  .floating-input { position: relative; }
  .floating-input label {
    position: absolute;
    top: -6px; left: 8px;
    padding: 0 4px;
    background: #fff;
    color: var(--orange);
    font-size: 10px;
    font-weight: 500;
    pointer-events: none;
  }
  .floating-input.has-label .top-label { position: static; background: transparent; padding: 0; color: var(--orange); font-size: 10px; font-weight: 500; display: block; margin-bottom: 4px; }

  .date-row { display: flex; align-items: center; gap: 6px; }
  .date-row .dash { color: #000; }

  .group-box { position: relative; padding: 14px 12px 10px; border: 1px solid var(--border); border-radius: 6px; }
  .group-label { position: absolute; top: -7px; left: 10px; padding: 0 4px; background: #fff; color: var(--orange); font-size: 10px; font-weight: 500; }

  .check-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
  .check-list label { display: flex; align-items: center; gap: 8px; font-size: 13px; }

  /* Table */
  .table-wrap { flex: 1 1 auto; min-width: 0; overflow-x: auto; padding: 4px 20px 0 0; }

  .st-table { width: 100%; border-collapse: collapse; font-size: 12px; }
  .st-table th {
    text-align: left;
    padding: 10px 8px;
    color: #000;
    font-weight: 600;
    font-size: 11px;
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
    vertical-align: top;
  }
  .st-table th.num { text-align: right; }
  .st-table td { padding: 14px 8px; border-bottom: 1px solid var(--border); vertical-align: middle; color: #000; }
  .st-table td.num { text-align: right; }
  .st-table td.strong { font-weight: 600; }
  .st-table tbody tr.clickable { cursor: pointer; }
  .st-table tbody tr:hover { background: var(--row-hover); }
  .sel { text-align: center; width: 48px; }

  .pill-btn {
    display: inline-block;
    background: #fff;
    color: var(--orange);
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 4px 14px;
    font-size: 12px;
    font-weight: 600;
  }
</style>
