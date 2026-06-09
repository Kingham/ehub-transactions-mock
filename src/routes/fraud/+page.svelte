<script>
  import {
    fraudAlertFeed,
    fraudCallToActions,
    fraudCapabilityBlueprint,
    fraudCases,
    fraudSettings,
    fraudSummaryMetrics,
    supplierFraudProfiles,
    customerFraudProfiles
  } from '$lib/data.js';

  let activeTab = 'dashboard';
  let supplierView = 'card';
  let customerView = 'card';
  let selectedQueue = null;
  let selectedCaseId = null;
  let showCreateCaseModal = false;
  let selectedRiskExplain = null;
  let caseFilters = {
    severity: 'All',
    status: 'All',
    source: 'All',
    owner: 'All'
  };
  let caseSort = 'updated';

  let cases = fraudCases.map((item) => ({
    ...item,
    updates: item.updates.map((update) => ({ ...update }))
  }));

  let updateDrafts = {};
  let showUpdateComposer = {};

  let manualCaseForm = {
    entity: '',
    severity: 'high',
    owner: 'Fraud Desk',
    due: 'Tomorrow 12:00',
    summary: '',
    nextStep: ''
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'suppliers', label: 'Suppliers' },
    { id: 'customers', label: 'Customers' },
    { id: 'cases', label: 'Cases' },
    { id: 'settings', label: 'Settings' }
  ];

  const statusOptions = ['Open', 'In progress', 'Waiting on third party', 'Resolved'];

  function toneClass(score) {
    if (score >= 90) return 'critical';
    if (score >= 75) return 'high';
    if (score >= 50) return 'medium';
    return 'low';
  }

  function sentenceCase(value) {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
  }

  function caseSeverityClass(value) {
    return value?.toLowerCase() || 'low';
  }

  function impactValue(impact) {
    const numeric = Number.parseInt(String(impact).replace(/[^0-9-]/g, ''), 10);
    return Number.isNaN(numeric) ? 0 : numeric;
  }

  function getCase(caseId) {
    return cases.find((item) => item.id === caseId);
  }

  function queueCount(queue) {
    return queue.items.filter((item) => {
      const caseItem = getCase(item.caseId);
      return caseItem && caseItem.status !== 'Resolved';
    }).length;
  }

  function queueCases(queue) {
    return queue.items
      .map((item) => {
        const caseItem = getCase(item.caseId);
        return caseItem ? { ...item, case: caseItem } : null;
      })
      .filter(Boolean);
  }

  function openQueueModal(queue) {
    selectedQueue = queue;
  }

  function closeQueueModal() {
    selectedQueue = null;
  }

  function openCaseModal(caseId) {
    selectedCaseId = caseId;
  }

  function closeCaseModal() {
    selectedCaseId = null;
  }

  function updateCaseStatus(caseId, status) {
    cases = cases.map((item) =>
      item.id === caseId ? { ...item, status, updatedAt: 'Just now' } : item
    );
  }

  function toggleUpdateComposer(caseId) {
    showUpdateComposer = {
      ...showUpdateComposer,
      [caseId]: !showUpdateComposer[caseId]
    };
  }

  function saveCaseUpdate(caseId) {
    const note = updateDrafts[caseId]?.trim();
    if (!note) return;

    cases = cases.map((item) =>
      item.id === caseId
        ? {
            ...item,
            updatedAt: 'Just now',
            updates: [{ author: 'A. Cheetham', time: 'Just now', note }, ...item.updates]
          }
        : item
    );

    updateDrafts = { ...updateDrafts, [caseId]: '' };
    showUpdateComposer = { ...showUpdateComposer, [caseId]: false };
  }

  function resolveCase(caseId) {
    cases = cases.map((item) =>
      item.id === caseId
        ? {
            ...item,
            status: 'Resolved',
            updatedAt: 'Just now',
            updates: [
              { author: 'A. Cheetham', time: 'Just now', note: 'Case resolved and closed.' },
              ...item.updates
            ]
          }
        : item
    );
  }

  function createManualCase() {
    if (!manualCaseForm.entity.trim() || !manualCaseForm.summary.trim() || !manualCaseForm.nextStep.trim()) {
      return;
    }

    const nextIdNumber = cases.reduce((max, item) => {
      const numeric = Number(item.id.replace('FC-', ''));
      return Number.isNaN(numeric) ? max : Math.max(max, numeric);
    }, 1000) + 1;

    const newCase = {
      id: `FC-${nextIdNumber}`,
      source: 'Manual',
      queue: 'Analyst opened',
      entity: manualCaseForm.entity.trim(),
      severity: manualCaseForm.severity,
      status: 'Open',
      owner: manualCaseForm.owner,
      due: manualCaseForm.due,
      score: manualCaseForm.severity === 'critical' ? 90 : manualCaseForm.severity === 'high' ? 78 : 58,
      summary: manualCaseForm.summary.trim(),
      nextStep: manualCaseForm.nextStep.trim(),
      updatedAt: 'Just now',
      updates: [{ author: 'A. Cheetham', time: 'Just now', note: 'Manual case created.' }]
    };

    cases = [newCase, ...cases];
    showCreateCaseModal = false;
    manualCaseForm = {
      entity: '',
      severity: 'high',
      owner: 'Fraud Desk',
      due: 'Tomorrow 12:00',
      summary: '',
      nextStep: ''
    };
    activeTab = 'cases';
  }

  function riskExplainPayload(title, level, score, drivers) {
    return { title, level, score, drivers };
  }

  function openRiskExplain(payload) {
    selectedRiskExplain = payload;
  }

  function closeRiskExplain() {
    selectedRiskExplain = null;
  }

  function liveRiskExplain() {
    return riskExplainPayload('Live risk pressure', 'Amber', 64, [
      { label: 'Critical open cases', impact: '+24', detail: 'Three critical queues remain active and unresolved.' },
      { label: 'High severity workload', impact: '+16', detail: 'Three high-severity supplier and invoice cases still require review.' },
      { label: 'Verification failures', impact: '+12', detail: 'Failed bank verification items are still inside release windows.' },
      { label: 'Recent progress', impact: '-10', detail: 'Resolved cases and recent analyst updates reduce the overall pressure score.' }
    ]);
  }

  function supplierRiskExplain(supplier) {
    return riskExplainPayload(`${supplier.name} risk profile`, supplier.riskLevel, supplier.riskScore, [
      { label: supplier.topSignals[0], impact: '+32', detail: `Primary signal contributing to the score for ${supplier.name}.` },
      { label: supplier.topSignals[1], impact: '+21', detail: 'Secondary pattern linked to invoice or payment behaviour.' },
      { label: supplier.topSignals[2], impact: '+14', detail: 'Operational or approval anomaly increasing the risk profile.' },
      { label: 'Exposure weighting', impact: '+8', detail: `${supplier.exposure} exposure and ${supplier.alertCount} active alerts increase review priority.` }
    ]);
  }

  function customerRiskExplain(customer) {
    return riskExplainPayload(`${customer.name} risk profile`, customer.riskLevel, customer.riskScore, [
      { label: customer.topSignals[0], impact: '+28', detail: `Primary customer-side fraud signal for ${customer.name}.` },
      { label: customer.topSignals[1], impact: '+18', detail: 'Behavioural deviation from normal order patterns.' },
      { label: customer.topSignals[2], impact: '+12', detail: 'Supporting evidence increasing confidence in the alert.' },
      { label: 'Exposure weighting', impact: '+7', detail: `${customer.exposure} at risk across ${customer.orders30d} recent orders.` }
    ]);
  }

  function caseRiskExplain(caseItem) {
    return riskExplainPayload(`${caseItem.id} risk explanation`, sentenceCase(caseItem.severity), caseItem.score, [
      { label: 'Queue context', impact: '+20', detail: `${caseItem.queue} defines the main risk category for this case.` },
      { label: 'Case summary', impact: '+26', detail: caseItem.summary },
      { label: 'Status weighting', impact: caseItem.status === 'Resolved' ? '-20' : caseItem.status === 'Waiting on third party' ? '+10' : '+14', detail: `${caseItem.status} affects how urgently the case should be handled.` },
      { label: 'Next step urgency', impact: '+8', detail: caseItem.nextStep }
    ]);
  }

  $: selectedCase = selectedCaseId ? getCase(selectedCaseId) : null;
  $: explainedScore = selectedRiskExplain
    ? selectedRiskExplain.drivers.reduce((total, driver) => total + impactValue(driver.impact), 0)
    : 0;
  $: residualScore = selectedRiskExplain ? selectedRiskExplain.score - explainedScore : 0;
  $: selectedRiskScaleScore = selectedRiskExplain ? Math.max(0, Math.min(100, selectedRiskExplain.score)) : 0;
  $: selectedRiskScaleBand =
    selectedRiskScaleScore >= 75 ? 'Red' : selectedRiskScaleScore >= 50 ? 'Amber' : 'Green';
  $: selectedRiskScaleNote =
    selectedRiskScaleBand === 'Red'
      ? 'This score is in the red zone and needs immediate attention.'
      : selectedRiskScaleBand === 'Amber'
        ? 'This score is in the amber zone and should stay under active review.'
        : 'This score is in the green zone and is currently under control.';
  $: caseOwners = ['All', ...new Set(cases.map((item) => item.owner))];
  $: filteredCases = cases.filter((item) => {
    if (caseFilters.severity !== 'All' && sentenceCase(item.severity) !== caseFilters.severity) return false;
    if (caseFilters.status !== 'All' && item.status !== caseFilters.status) return false;
    if (caseFilters.source !== 'All' && item.source !== caseFilters.source) return false;
    if (caseFilters.owner !== 'All' && item.owner !== caseFilters.owner) return false;
    return true;
  });
  $: caseRows = [...filteredCases].sort((a, b) => {
    if (caseSort === 'updated') {
      if (a.status === 'Resolved' && b.status !== 'Resolved') return 1;
      if (a.status !== 'Resolved' && b.status === 'Resolved') return -1;
      return a.id < b.id ? 1 : -1;
    }
    if (caseSort === 'severity') {
      const order = { critical: 0, high: 1, medium: 2, low: 3 };
      return order[a.severity] - order[b.severity];
    }
    if (caseSort === 'due') return a.due.localeCompare(b.due);
    if (caseSort === 'score') return b.score - a.score;
    return 0;
  });
</script>

<div class="page-header">
  <span class="icon-tile">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  </span>
  <h1>Fraud</h1>
</div>

<section class="panel main-card">
  <div class="tabs-row primary">
    {#each tabs as tab}
      <button class:active={activeTab === tab.id} class="tab" on:click={() => (activeTab = tab.id)}>
        {tab.label}
      </button>
    {/each}
  </div>

  {#if activeTab === 'dashboard'}
    <div class="dashboard-shell">
      <section class="top-summary-row">
        <div class="hero-score amber-risk">
          <div class="hero-topline">
            <span class="hero-label">Live risk pressure</span>
            <button type="button" class="hero-state" on:click={() => openRiskExplain(liveRiskExplain())}>Amber</button>
          </div>
          <strong>64</strong>
          <span class="hero-note">Watchlist because 6 critical and high-severity cases remain active</span>
        </div>

        <div class="metric-grid top-metrics">
          {#each fraudSummaryMetrics as metric}
            <article class="metric-card">
              <span class="metric-title">{metric.title}</span>
              <strong class="metric-value">{metric.value}</strong>
              <span class="metric-change {metric.tone}">{metric.change}</span>
            </article>
          {/each}
        </div>
      </section>

      <section class="content-grid">
        <div class="stack">
          <article class="subpanel">
            <div class="section-head">
              <div>
                <h3>Priority queues</h3>
              </div>
              <button class="ghost-btn" on:click={() => (activeTab = 'cases')}>Open cases</button>
            </div>

            <div class="cta-list">
              {#each fraudCallToActions as action}
                <article class="cta-card {action.severity}">
                  <div class="cta-topline">
                    <span class="severity-pill {action.severity}">{sentenceCase(action.severity)}</span>
                    <span class="cta-count">{queueCount(action)} open</span>
                  </div>
                  <h4>{action.title}</h4>
                  <p>{action.detail}</p>
                  <div class="cta-action-row">
                    <button type="button" class="inline-action" on:click={() => openQueueModal(action)}>{action.action}</button>
                    {#if action.items?.[0]?.transactionId}
                      <a class="inline-action transaction-link" href="/transactions/{action.items[0].transactionId}">
                        Open transaction {action.items[0].transactionReference}
                      </a>
                    {/if}
                  </div>
                </article>
              {/each}
            </div>
          </article>

          <article class="subpanel">
            <div class="section-head">
              <div>
                <span class="section-kicker">Explainable scoring</span>
                <h3>How each fraud feature should work</h3>
              </div>
            </div>

            <div class="blueprint-grid">
              {#each fraudCapabilityBlueprint as section}
                <section class="blueprint-card">
                  <h4>{section.title}</h4>
                  <ul>
                    {#each section.items as item}
                      <li>{item}</li>
                    {/each}
                  </ul>
                </section>
              {/each}
            </div>
          </article>
        </div>

        <div class="feed-stack">
          <article class="network-alert-card">
            <div class="network-alert-topline">
              <span class="severity-pill critical">Alert</span>
              <div class="network-alert-meta">
                <span class="signal-chip">Cross-customer intelligence</span>
                  <button
                    type="button"
                    class="info-helper"
                    aria-label="How shared intelligence works"
                    title="Shared intelligence uses anonymised fraud signals across the platform. If one customer identifies a fraud case, matching signals can be used to warn other customers without exposing the original customer's transaction details."
                  >
                    i
                  </button>
                </div>
              </div>
            <strong>Northwind Components has been flagged because its bank details match a fraud case raised by another customer</strong>
            <p>
              This is not an open fraud case on your account. The open case belongs to another customer on the platform,
              but the same bank details have been matched here as a precaution. You currently have 3 outstanding
              invoices from Northwind Components, with total exposure of £18.4k.
            </p>
          </article>

        <article class="subpanel feed-panel">
          <div class="section-head">
            <div>
              <span class="section-kicker">Real-time signals</span>
              <h3>Alert feed</h3>
            </div>
            <button class="ghost-btn" on:click={() => (showCreateCaseModal = true)}>Open case</button>
          </div>

          <div class="feed-table-wrap">
            <table class="feed-table">
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>Type</th>
                  <th>Signal</th>
                  <th>Score</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {#each fraudAlertFeed as alert}
                  <tr>
                    <td class="entity-cell">
                      <strong>{alert.entity}</strong>
                    </td>
                    <td>{alert.type}</td>
                    <td>{alert.signal}</td>
                    <td>
                      <button class="score-badge clickable {toneClass(alert.score)}" on:click={() => openRiskExplain(riskExplainPayload(`${alert.entity} alert score`, sentenceCase(toneClass(alert.score)), alert.score, [
                        { label: alert.signal, impact: '+24', detail: 'Primary alert signal driving the current score.' },
                        { label: 'Workflow status', impact: '+12', detail: `${alert.status} keeps the risk live in the queue.` },
                        { label: 'Operational ownership', impact: '+6', detail: `${alert.owner} currently owns the alert response.` }
                      ]))}>{alert.score}</button>
                    </td>
                    <td>{alert.status}</td>
                    <td>{alert.owner}</td>
                    <td>{alert.updated}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </article>
        </div>
      </section>
    </div>
  {:else if activeTab === 'suppliers'}
    <div class="directory-shell">
      <div class="directory-head">
        <div class="view-toggle">
          <button class:active={supplierView === 'card'} class="view-btn" on:click={() => (supplierView = 'card')}>Card view</button>
          <button class:active={supplierView === 'list'} class="view-btn" on:click={() => (supplierView = 'list')}>List view</button>
        </div>
      </div>

      {#if supplierView === 'card'}
        <div class="profile-grid">
          {#each supplierFraudProfiles as supplier}
            <article class="profile-card">
              <div class="profile-top">
                <div>
                  <h3>{supplier.name}</h3>
                  <span class="profile-meta">{supplier.category}</span>
                </div>
                <button class="risk-orb {toneClass(supplier.riskScore)}" on:click={() => openRiskExplain(supplierRiskExplain(supplier))}>
                  <span>{supplier.riskScore}</span>
                  <small>{supplier.riskLevel}</small>
                </button>
              </div>

              <div class="profile-stats">
                <div><span>30d invoices</span><strong>{supplier.invoices30d}</strong></div>
                <div><span>Exposure</span><strong>{supplier.exposure}</strong></div>
                <div><span>Bank status</span><strong>{supplier.bankStatus}</strong></div>
                <div><span>CoP / VoP</span><strong>{supplier.copVopStatus}</strong></div>
              </div>

              <div class="verification-panel {supplier.copVopTone}">
                <div>
                  <span>Onboarding bank check</span>
                  <strong>{supplier.copVopStatus}</strong>
                </div>
                <p>Account {supplier.bankAccountMask} • Checked {supplier.copVopCheckedAt}</p>
              </div>

              <div class="signal-group">
                {#each supplier.topSignals as signal}
                  <span class="signal-chip">{signal}</span>
                {/each}
              </div>

              <div class="card-footer">
                <div>
                  <span class="footer-label">Next action</span>
                  <strong>{supplier.nextAction}</strong>
                </div>
                <span class="status-pill">{supplier.status}</span>
              </div>
            </article>
          {/each}
        </div>
      {:else}
        <div class="list-wrap">
          <table class="directory-table">
            <thead>
              <tr>
                <th>Supplier</th>
                <th>Risk score</th>
                <th>Status</th>
                <th>30d invoices</th>
                <th>Exposure</th>
                <th>Bank status</th>
                <th>CoP / VoP</th>
                <th>Checked</th>
                <th>Open alerts</th>
                <th>Next action</th>
              </tr>
            </thead>
            <tbody>
              {#each supplierFraudProfiles as supplier}
                <tr>
                  <td>
                    <strong>{supplier.name}</strong>
                    <div class="table-sub">{supplier.category}</div>
                  </td>
                  <td><button class="score-badge clickable {toneClass(supplier.riskScore)}" on:click={() => openRiskExplain(supplierRiskExplain(supplier))}>{supplier.riskScore}</button></td>
                  <td>{supplier.status}</td>
                  <td>{supplier.invoices30d}</td>
                  <td>{supplier.exposure}</td>
                  <td>{supplier.bankStatus}</td>
                  <td>
                    <span class="status-pill {supplier.copVopTone}">{supplier.copVopStatus}</span>
                    <div class="table-sub">{supplier.bankAccountMask}</div>
                  </td>
                  <td>{supplier.copVopCheckedAt}</td>
                  <td>{supplier.alertCount}</td>
                  <td>{supplier.nextAction}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  {:else if activeTab === 'customers'}
    <div class="directory-shell">
      <div class="directory-head">
        <div class="view-toggle">
          <button class:active={customerView === 'card'} class="view-btn" on:click={() => (customerView = 'card')}>Card view</button>
          <button class:active={customerView === 'list'} class="view-btn" on:click={() => (customerView = 'list')}>List view</button>
        </div>
      </div>

      {#if customerView === 'card'}
        <div class="profile-grid">
          {#each customerFraudProfiles as customer}
            <article class="profile-card">
              <div class="profile-top">
                <div>
                  <h3>{customer.name}</h3>
                  <span class="profile-meta">{customer.segment}</span>
                </div>
                <button class="risk-orb {toneClass(customer.riskScore)}" on:click={() => openRiskExplain(customerRiskExplain(customer))}>
                  <span>{customer.riskScore}</span>
                  <small>{customer.riskLevel}</small>
                </button>
              </div>

              <div class="profile-stats">
                <div><span>30d orders</span><strong>{customer.orders30d}</strong></div>
                <div><span>Exposure</span><strong>{customer.exposure}</strong></div>
                <div><span>Address status</span><strong>{customer.addressStatus}</strong></div>
                <div><span>Open alerts</span><strong>{customer.alertCount}</strong></div>
              </div>

              <div class="signal-group">
                {#each customer.topSignals as signal}
                  <span class="signal-chip">{signal}</span>
                {/each}
              </div>

              <div class="card-footer">
                <div>
                  <span class="footer-label">Next action</span>
                  <strong>{customer.nextAction}</strong>
                </div>
                <span class="status-pill">{customer.status}</span>
              </div>
            </article>
          {/each}
        </div>
      {:else}
        <div class="list-wrap">
          <table class="directory-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Risk score</th>
                <th>Status</th>
                <th>30d orders</th>
                <th>Exposure</th>
                <th>Address status</th>
                <th>Open alerts</th>
                <th>Next action</th>
              </tr>
            </thead>
            <tbody>
              {#each customerFraudProfiles as customer}
                <tr>
                  <td>
                    <strong>{customer.name}</strong>
                    <div class="table-sub">{customer.segment}</div>
                  </td>
                  <td><button class="score-badge clickable {toneClass(customer.riskScore)}" on:click={() => openRiskExplain(customerRiskExplain(customer))}>{customer.riskScore}</button></td>
                  <td>{customer.status}</td>
                  <td>{customer.orders30d}</td>
                  <td>{customer.exposure}</td>
                  <td>{customer.addressStatus}</td>
                  <td>{customer.alertCount}</td>
                  <td>{customer.nextAction}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  {:else if activeTab === 'cases'}
    <div class="cases-shell">
      <div class="directory-head cases-head">
        <div>
          <h2>Cases</h2>
          <span class="profile-meta">System and analyst-opened fraud cases</span>
        </div>
        <button class="ghost-btn solid" on:click={() => (showCreateCaseModal = true)}>Open case</button>
      </div>

      <div class="cases-toolbar">
        <div class="toolbar-group">
          <label class="control-field slim">
            <span>Sort</span>
            <select bind:value={caseSort}>
              <option value="updated">Newest activity</option>
              <option value="severity">Severity</option>
              <option value="due">Due</option>
              <option value="score">Risk score</option>
            </select>
          </label>
        </div>
        <div class="toolbar-group filters">
          <label class="control-field slim">
            <span>Severity</span>
            <select bind:value={caseFilters.severity}>
              <option>All</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </label>
          <label class="control-field slim">
            <span>Status</span>
            <select bind:value={caseFilters.status}>
              <option>All</option>
              {#each statusOptions as status}
                <option>{status}</option>
              {/each}
            </select>
          </label>
          <label class="control-field slim">
            <span>Source</span>
            <select bind:value={caseFilters.source}>
              <option>All</option>
              <option>System</option>
              <option>Manual</option>
            </select>
          </label>
          <label class="control-field slim">
            <span>Owner</span>
            <select bind:value={caseFilters.owner}>
              {#each caseOwners as owner}
                <option>{owner}</option>
              {/each}
            </select>
          </label>
        </div>
      </div>

      <div class="list-wrap">
        <table class="directory-table">
          <thead>
            <tr>
              <th>Case</th>
              <th>Entity</th>
              <th>Source</th>
              <th>Queue</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Due</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {#each caseRows as caseItem}
              <tr>
                <td>
                  <strong>{caseItem.id}</strong>
                  <div class="table-sub">{caseItem.summary}</div>
                </td>
                <td>{caseItem.entity}</td>
                <td>{caseItem.source}</td>
                <td>{caseItem.queue}</td>
                <td><button class="severity-pill clickable {caseSeverityClass(caseItem.severity)}" on:click={() => openRiskExplain(caseRiskExplain(caseItem))}>{sentenceCase(caseItem.severity)}</button></td>
                <td><span class="status-pill neutral">{caseItem.status}</span></td>
                <td>{caseItem.owner}</td>
                <td>{caseItem.due}</td>
                <td>{caseItem.updatedAt}</td>
                <td><button class="table-link" on:click={() => openCaseModal(caseItem.id)}>Open</button></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {:else}
    <div class="settings-shell">
      <section class="settings-grid">
        <article class="subpanel">
          <div class="section-head">
            <div>
              <span class="section-kicker">Risk thresholds</span>
              <h3>Customer-configurable sensitivity</h3>
            </div>
          </div>

          <div class="threshold-grid">
            {#each fraudSettings.thresholds as threshold}
              <div class="threshold-card">
                <span>{threshold.label}</span>
                <strong>{threshold.value}</strong>
              </div>
            {/each}
          </div>

          <p class="settings-note">
            This is where each customer can tune how much detail gets surfaced, when alerts stay informational, and when the platform should stop a payment or hold an order automatically.
          </p>
        </article>

        <article class="subpanel methodology-panel">
          <div class="section-head">
            <div>
              <span class="section-kicker">Scoring model</span>
              <h3>How risk scoring works</h3>
            </div>
          </div>

          <div class="methodology-grid">
            <div class="threshold-card methodology-stat">
              <span>Score scale</span>
              <strong>{fraudSettings.scoringMethodology.scale}</strong>
            </div>
            <div class="threshold-card methodology-stat">
              <span>Baseline</span>
              <strong>{fraudSettings.scoringMethodology.baseline}</strong>
            </div>
          </div>

          <p class="settings-note">{fraudSettings.scoringMethodology.summary}</p>

          <div class="methodology-list">
            {#each fraudSettings.scoringMethodology.principles as principle}
              <article class="rule-card">
                <p>{principle}</p>
              </article>
            {/each}
          </div>
        </article>

        <article class="subpanel">
          <div class="section-head">
            <div>
              <span class="section-kicker">Rules engine</span>
              <h3>Detection controls</h3>
            </div>
          </div>

          <div class="rule-list">
            {#each fraudSettings.rules as rule}
              <article class="rule-card">
                <div class="rule-topline">
                  <h4>{rule.name}</h4>
                  <span class="status-pill">{rule.state}</span>
                </div>
                <p>{rule.description}</p>
                <div class="rule-meta">
                  <span>Sensitivity</span>
                  <strong>{rule.sensitivity}</strong>
                </div>
              </article>
            {/each}
          </div>
        </article>
      </section>
    </div>
  {/if}
</section>

{#if selectedQueue}
  <div
    class="queue-modal-backdrop"
    role="button"
    tabindex="0"
    aria-label="Close queue details"
    on:click={closeQueueModal}
    on:keydown={(event) => (event.key === 'Enter' || event.key === ' ' ? closeQueueModal() : null)}
  >
    <div
      class="queue-modal"
      role="dialog"
      tabindex="0"
      aria-modal="true"
      aria-labelledby="queue-modal-title"
      on:click|stopPropagation
      on:keydown|stopPropagation={() => {}}
    >
      <div class="queue-modal-head">
        <div>
          <span class="section-kicker">Priority queue</span>
          <h3 id="queue-modal-title">{selectedQueue.title}</h3>
        </div>
        <div class="queue-meta">
          <span class="severity-pill {selectedQueue.severity}">{sentenceCase(selectedQueue.severity)}</span>
          <span class="queue-count">{queueCount(selectedQueue)} open items</span>
          <button type="button" class="close-btn" aria-label="Close" on:click={closeQueueModal}>×</button>
        </div>
      </div>

      <p class="queue-modal-summary">{selectedQueue.detail}</p>

      <div class="queue-items">
        {#each queueCases(selectedQueue) as item}
          <article class="queue-item">
            <div class="queue-item-top">
              <div>
                <strong>{item.case.id} · {item.entity}</strong>
                <span class="queue-owner">{item.case.owner}</span>
              </div>
              <div class="queue-badges">
                <button class="score-badge clickable {toneClass(item.case.score)}" on:click={() => openRiskExplain(caseRiskExplain(item.case))}>{item.case.score}</button>
                <span class="due-pill">{item.case.due}</span>
              </div>
            </div>
            <p>{item.case.summary}</p>
            <div class="queue-next-step">
              <span>Next step</span>
              <strong>{item.case.nextStep}</strong>
            </div>

            <div class="case-controls">
              <label class="control-field">
                <span>Status</span>
                <select value={item.case.status} on:change={(event) => updateCaseStatus(item.case.id, event.currentTarget.value)}>
                  {#each statusOptions as status}
                    <option value={status}>{status}</option>
                  {/each}
                </select>
              </label>
              <div class="case-buttons">
                <button class="ghost-btn" on:click={() => toggleUpdateComposer(item.case.id)}>Add update</button>
                <button class="ghost-btn solid" on:click={() => openCaseModal(item.case.id)}>Open case</button>
                <button class="ghost-btn success" on:click={() => resolveCase(item.case.id)}>Resolve</button>
              </div>
            </div>

            {#if showUpdateComposer[item.case.id]}
              <div class="composer">
                <textarea
                  rows="3"
                  bind:value={updateDrafts[item.case.id]}
                  placeholder="Add a progress note, callback outcome, or third-party update"
                ></textarea>
                <div class="composer-actions">
                  <button class="ghost-btn" on:click={() => toggleUpdateComposer(item.case.id)}>Cancel</button>
                  <button class="ghost-btn solid" on:click={() => saveCaseUpdate(item.case.id)}>Save update</button>
                </div>
              </div>
            {/if}
          </article>
        {/each}
      </div>
    </div>
  </div>
{/if}

{#if selectedCase}
  <div
    class="queue-modal-backdrop"
    role="button"
    tabindex="0"
    aria-label="Close case details"
    on:click={closeCaseModal}
    on:keydown={(event) => (event.key === 'Enter' || event.key === ' ' ? closeCaseModal() : null)}
  >
    <div
      class="queue-modal case-modal"
      role="dialog"
      tabindex="0"
      aria-modal="true"
      aria-labelledby="case-modal-title"
      on:click|stopPropagation
      on:keydown|stopPropagation={() => {}}
    >
      <div class="queue-modal-head">
        <div>
          <span class="section-kicker">{selectedCase.source} case</span>
          <h3 id="case-modal-title">{selectedCase.id} · {selectedCase.entity}</h3>
        </div>
        <div class="queue-meta">
          <button class="severity-pill clickable {caseSeverityClass(selectedCase.severity)}" on:click={() => openRiskExplain(caseRiskExplain(selectedCase))}>{sentenceCase(selectedCase.severity)}</button>
          <span class="status-pill neutral">{selectedCase.status}</span>
          <button type="button" class="close-btn" aria-label="Close" on:click={closeCaseModal}>×</button>
        </div>
      </div>

      <div class="case-summary-grid">
        <div class="summary-card"><span>Queue</span><strong>{selectedCase.queue}</strong></div>
        <div class="summary-card"><span>Owner</span><strong>{selectedCase.owner}</strong></div>
        <div class="summary-card"><span>Due</span><strong>{selectedCase.due}</strong></div>
        <div class="summary-card"><span>Risk score</span><strong><button class="risk-inline" on:click={() => openRiskExplain(caseRiskExplain(selectedCase))}>{selectedCase.score}</button></strong></div>
      </div>

      <article class="case-body-card">
        <span class="section-kicker">Case summary</span>
        <p>{selectedCase.summary}</p>
        <div class="queue-next-step">
          <span>Next step</span>
          <strong>{selectedCase.nextStep}</strong>
        </div>
      </article>

      <div class="case-controls">
        <label class="control-field">
          <span>Status</span>
          <select value={selectedCase.status} on:change={(event) => updateCaseStatus(selectedCase.id, event.currentTarget.value)}>
            {#each statusOptions as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </label>
        <div class="case-buttons">
          <button class="ghost-btn" on:click={() => toggleUpdateComposer(selectedCase.id)}>Add update</button>
          <button class="ghost-btn success" on:click={() => resolveCase(selectedCase.id)}>Resolve</button>
        </div>
      </div>

      {#if showUpdateComposer[selectedCase.id]}
        <div class="composer">
          <textarea
            rows="3"
            bind:value={updateDrafts[selectedCase.id]}
            placeholder="Add a progress note, callback outcome, or third-party update"
          ></textarea>
          <div class="composer-actions">
            <button class="ghost-btn" on:click={() => toggleUpdateComposer(selectedCase.id)}>Cancel</button>
            <button class="ghost-btn solid" on:click={() => saveCaseUpdate(selectedCase.id)}>Save update</button>
          </div>
        </div>
      {/if}

      <article class="case-body-card">
        <span class="section-kicker">Audit trail</span>
        <div class="timeline">
          {#each selectedCase.updates as update}
            <div class="timeline-item">
              <div class="timeline-top">
                <strong>{update.author}</strong>
                <span>{update.time}</span>
              </div>
              <p>{update.note}</p>
            </div>
          {/each}
        </div>
      </article>
    </div>
  </div>
{/if}

{#if showCreateCaseModal}
  <div
    class="queue-modal-backdrop"
    role="button"
    tabindex="0"
    aria-label="Close create case"
    on:click={() => (showCreateCaseModal = false)}
    on:keydown={(event) => (event.key === 'Enter' || event.key === ' ' ? (showCreateCaseModal = false) : null)}
  >
    <div
      class="queue-modal case-modal"
      role="dialog"
      tabindex="0"
      aria-modal="true"
      aria-labelledby="create-case-title"
      on:click|stopPropagation
      on:keydown|stopPropagation={() => {}}
    >
      <div class="queue-modal-head">
        <div>
          <span class="section-kicker">Manual case</span>
          <h3 id="create-case-title">Open a case</h3>
        </div>
        <button type="button" class="close-btn" aria-label="Close" on:click={() => (showCreateCaseModal = false)}>×</button>
      </div>

      <div class="form-grid">
        <label class="control-field">
          <span>Entity</span>
          <input bind:value={manualCaseForm.entity} placeholder="Supplier or customer" />
        </label>
        <label class="control-field">
          <span>Severity</span>
          <select bind:value={manualCaseForm.severity}>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
        <label class="control-field">
          <span>Owner</span>
          <input bind:value={manualCaseForm.owner} />
        </label>
        <label class="control-field">
          <span>Due</span>
          <input bind:value={manualCaseForm.due} />
        </label>
        <label class="control-field full">
          <span>Summary</span>
          <textarea rows="3" bind:value={manualCaseForm.summary} placeholder="What needs investigating?"></textarea>
        </label>
        <label class="control-field full">
          <span>Next step</span>
          <textarea rows="3" bind:value={manualCaseForm.nextStep} placeholder="What should happen next?"></textarea>
        </label>
      </div>

      <div class="composer-actions">
        <button class="ghost-btn" on:click={() => (showCreateCaseModal = false)}>Cancel</button>
        <button class="ghost-btn solid" on:click={createManualCase}>Create case</button>
      </div>
    </div>
  </div>
{/if}

{#if selectedRiskExplain}
  <div
    class="queue-modal-backdrop"
    role="button"
    tabindex="0"
    aria-label="Close risk explanation"
    on:click={closeRiskExplain}
    on:keydown={(event) => (event.key === 'Enter' || event.key === ' ' ? closeRiskExplain() : null)}
  >
    <div
      class="queue-modal case-modal"
      role="dialog"
      tabindex="0"
      aria-modal="true"
      aria-labelledby="risk-explain-title"
      on:click|stopPropagation
      on:keydown|stopPropagation={() => {}}
    >
      <div class="queue-modal-head">
        <div>
          <span class="section-kicker">Risk explanation</span>
          <h3 id="risk-explain-title">{selectedRiskExplain.title}</h3>
        </div>
        <div class="queue-meta">
          <span class="severity-pill {caseSeverityClass(selectedRiskExplain.level.toLowerCase())}">{selectedRiskExplain.level}</span>
          <span class="score-badge {caseSeverityClass(selectedRiskExplain.level.toLowerCase())}">{selectedRiskExplain.score}</span>
          <button type="button" class="close-btn" aria-label="Close" on:click={closeRiskExplain}>×</button>
        </div>
      </div>

      <article class="case-body-card methodology-helper">
        <span class="section-kicker">How to read this score</span>
        <p>{fraudSettings.scoringMethodology.baseline}</p>
        <p>{fraudSettings.scoringMethodology.summary}</p>
        <div class="risk-scale-helper">
          <div class="risk-scale-topline">
            <strong>Green to Amber to Red scale</strong>
            <span>{selectedRiskScaleScore}/100</span>
          </div>
          <div class="risk-scale" aria-hidden="true">
            <div class="risk-scale-segment green"></div>
            <div class="risk-scale-segment amber"></div>
            <div class="risk-scale-segment red"></div>
            <div class="risk-scale-marker" style={`left: calc(${selectedRiskScaleScore}% - 9px);`}></div>
          </div>
          <div class="risk-scale-thresholds">
            <span class="threshold-start">0</span>
            <span class="threshold-mid">50</span>
            <span class="threshold-high">75</span>
            <span class="threshold-end">100</span>
          </div>
          <div class="risk-scale-labels">
            <span>Green</span>
            <span>Amber</span>
            <span>Red</span>
          </div>
          <p class="risk-scale-note">{selectedRiskScaleNote}</p>
        </div>
        {#if residualScore !== 0}
          <div class="queue-next-step">
            <span>Displayed drivers account for {explainedScore} of {selectedRiskExplain.score}</span>
            <strong>
              {fraudSettings.scoringMethodology.residualLabel}: {residualScore > 0 ? '+' : ''}{residualScore}
            </strong>
            <p class="settings-note">{fraudSettings.scoringMethodology.residualDetail}</p>
          </div>
        {/if}
      </article>

      <div class="timeline">
        {#each selectedRiskExplain.drivers as driver}
          <div class="timeline-item">
            <div class="timeline-top">
              <strong>{driver.label}</strong>
              <span class="impact-chip">{driver.impact}</span>
            </div>
            <p>{driver.detail}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .main-card { padding: 0; overflow: hidden; }
  .tabs-row.primary { display: flex; align-items: center; gap: 28px; padding: 0 20px; border-bottom: 1px solid var(--border); }
  .tab { background: transparent; border: none; padding: 16px 0 14px; font-size: 14px; font-weight: 500; color: var(--text-dim); border-bottom: 2px solid transparent; margin-bottom: -1px; }
  .tab.active { color: var(--orange); border-bottom-color: var(--orange); font-weight: 600; }

  .dashboard-shell, .directory-shell, .settings-shell, .cases-shell { padding: 20px; }

  .top-summary-row { display: grid; grid-template-columns: 320px minmax(0, 1fr); gap: 14px; align-items: stretch; }
  .hero-score { border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 18px; display: flex; flex-direction: column; gap: 12px; color: #fff; }
  .amber-risk {
    border-color: rgba(217, 119, 6, 0.28);
    background:
      radial-gradient(circle at top right, rgba(251, 191, 36, 0.24), transparent 34%),
      linear-gradient(135deg, #7c2d12 0%, #b45309 44%, #92400e 100%);
    box-shadow: 0 18px 36px rgba(146, 64, 14, 0.22);
  }
  .hero-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .hero-label, .hero-note, .metric-title, .metric-change, .profile-meta, .footer-label, .table-sub, .settings-note { color: var(--text-dim); }
  .hero-score .hero-label, .hero-score .hero-note { color: rgba(255,255,255,0.78); }
  .hero-score strong { font-size: 52px; line-height: 1; }
  .hero-state {
    border: none;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 30px;
    padding: 0 12px;
    border-radius: 999px;
    background: rgba(255, 248, 235, 0.18);
    border: 1px solid rgba(255, 241, 214, 0.28);
    color: #fff7ed;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .hero-state:hover,
  .hero-state:focus-visible {
    background: rgba(255, 248, 235, 0.28);
    border-color: rgba(255, 241, 214, 0.42);
  }

  .eyebrow, .section-kicker { display: inline-block; text-transform: uppercase; letter-spacing: 0.08em; font-size: 10px; font-weight: 700; }
  .metric-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; margin-top: 18px; }
  .top-metrics { margin-top: 0; }
  .metric-card, .subpanel, .profile-card, .threshold-card, .rule-card, .case-body-card, .summary-card { background: #fff; border: 1px solid var(--border); border-radius: 16px; box-shadow: 0 10px 30px rgba(16, 41, 79, 0.06); }
  .metric-card { padding: 18px; display: flex; flex-direction: column; gap: 10px; }
  .metric-title { font-size: 12px; font-weight: 600; }
  .metric-value { color: var(--navy); font-size: 28px; line-height: 1; }
  .metric-change { font-size: 12px; }

  .metric-change.critical, .severity-pill.critical, .score-badge.critical { color: #a61b1b; }
  .metric-change.high, .severity-pill.high, .score-badge.high { color: #b45309; }
  .metric-change.medium, .severity-pill.medium, .score-badge.medium { color: #1f6d8c; }
  .metric-change.good { color: #117864; }

  .content-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(330px, 0.95fr); gap: 18px; margin-top: 18px; }
  .stack { display: flex; flex-direction: column; gap: 18px; }
  .feed-stack { display: grid; gap: 14px; align-content: start; }
  .subpanel, .feed-panel { padding: 18px; }
  .network-alert-card {
    padding: 16px 18px;
    border-radius: 16px;
    border: 1px solid #f0c2c2;
    background: linear-gradient(180deg, #fff5f5 0%, #fff 100%);
    box-shadow: 0 10px 30px rgba(16, 41, 79, 0.06);
    display: grid;
    gap: 10px;
  }
  .network-alert-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .network-alert-meta {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .info-helper {
    width: 22px;
    height: 22px;
    border-radius: 999px;
    border: 1px solid rgba(16, 41, 79, 0.16);
    background: #fff;
    color: var(--navy);
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: help;
  }
  .network-alert-card strong { color: var(--navy); font-size: 18px; line-height: 1.3; }
  .network-alert-card p { margin: 0; color: var(--text-dim); line-height: 1.5; }
  .section-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
  .section-head h3, .blueprint-card h4, .cta-card h4, .profile-card h3, .rule-card h4 { margin: 6px 0 0; }

  .ghost-btn, .inline-action, .view-btn, .table-link {
    border: 1px solid var(--border);
    border-radius: 999px;
    background: #fff;
    color: var(--navy);
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 600;
  }
  .ghost-btn.solid { background: var(--navy); color: #fff; border-color: var(--navy); }
  .ghost-btn.success { background: #117864; color: #fff; border-color: #117864; }
  .table-link { padding: 6px 12px; }
  .cta-list, .rule-list { display: grid; gap: 12px; }
  .cta-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cta-card { padding: 16px; border-radius: 14px; border: 1px solid var(--border); background: linear-gradient(180deg, #fff 0%, #fafbfc 100%); text-align: left; width: 100%; }
  .cta-card.critical { border-color: #f4c9c9; background: linear-gradient(180deg, #fff 0%, #fff5f5 100%); }
  .cta-card.high { border-color: #f2dcc0; background: linear-gradient(180deg, #fff 0%, #fff8ef 100%); }
  .cta-card.medium { border-color: #cfe4ea; background: linear-gradient(180deg, #fff 0%, #f4fbfd 100%); }
  .cta-action-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
  .transaction-link { text-decoration: none; background: var(--navy); color: #fff; border-color: var(--navy); }
  .cta-topline, .rule-topline, .card-footer, .directory-head, .view-toggle, .rule-meta, .cases-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .cta-card p, .rule-card p, .queue-item p, .timeline-item p, .case-body-card p { margin: 10px 0 14px; color: var(--text-dim); line-height: 1.5; }

  .severity-pill, .status-pill, .signal-chip, .score-badge {
    display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; font-size: 11px; font-weight: 700;
  }
  .severity-pill, .status-pill, .signal-chip { padding: 6px 10px; }
  .severity-pill.critical, .score-badge.critical { background: #fbe4e4; }
  .severity-pill.high, .score-badge.high { background: #fff0db; }
  .severity-pill.medium, .score-badge.medium { background: #e1f4f7; }
  .severity-pill.low { background: #eef2f7; color: var(--navy); }
  .status-pill, .signal-chip, .score-badge.low { background: #eef2f7; color: var(--navy); }
  .status-pill.neutral { background: #f3f4f6; color: var(--navy); }
  .status-pill.good { background: #e4f7ef; color: #117864; }
  .status-pill.high { background: #fff0db; color: #b45309; }
  .status-pill.critical { background: #fbe4e4; color: #a61b1b; }
  .score-badge { min-width: 42px; padding: 6px 12px; }
  .clickable { cursor: pointer; }
  .risk-inline {
    border: none;
    background: transparent;
    color: var(--navy);
    font: inherit;
    font-weight: 700;
    padding: 0;
  }

  .blueprint-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  .blueprint-card { padding: 16px; border: 1px solid var(--border); border-radius: 14px; background: var(--panel-alt); }
  .blueprint-card ul { margin: 12px 0 0; padding-left: 18px; color: var(--text-dim); display: grid; gap: 10px; line-height: 1.45; }

  .feed-table-wrap, .list-wrap { overflow-x: auto; }
  .feed-table, .directory-table { width: 100%; border-collapse: collapse; }
  .feed-table th, .feed-table td, .directory-table th, .directory-table td { text-align: left; padding: 12px 10px; border-bottom: 1px solid var(--border); vertical-align: top; }
  .feed-table th, .directory-table th { font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-dim); }
  .entity-cell strong, .directory-table strong, .profile-card h3, .card-footer strong, .rule-meta strong, .threshold-card strong, .summary-card strong, .queue-item strong { color: var(--navy); }

  .directory-head { margin-bottom: 18px; align-items: flex-end; }
  .directory-head h2 { margin: 0; color: var(--navy); }
  .view-toggle { background: var(--panel-alt); border-radius: 999px; padding: 4px; }
  .view-btn { border-color: transparent; background: transparent; }
  .view-btn.active { background: #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.08); }
  .cases-toolbar { display: flex; align-items: flex-end; justify-content: space-between; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }
  .toolbar-group { display: flex; gap: 12px; flex-wrap: wrap; }
  .toolbar-group.filters { margin-left: auto; }

  .profile-grid, .threshold-grid, .settings-grid { display: grid; gap: 16px; }
  .profile-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .profile-card { padding: 18px; }
  .profile-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .profile-meta, .footer-label, .table-sub { display: block; margin-top: 4px; font-size: 12px; }
  .risk-orb { min-width: 84px; height: 84px; border-radius: 22px; padding: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 700; text-align: center; border: none; cursor: pointer; }
  .risk-orb span { font-size: 30px; line-height: 1; }
  .risk-orb small { margin-top: 4px; font-size: 11px; }
  .risk-orb.critical { background: #fff0f0; color: #a61b1b; }
  .risk-orb.high { background: #fff5e7; color: #b45309; }
  .risk-orb.medium { background: #edf9fb; color: #1f6d8c; }
  .risk-orb.low { background: #eef2f7; color: var(--navy); }

  .profile-stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 16px; }
  .profile-stats div { border: 1px solid var(--border); border-radius: 12px; padding: 12px; background: var(--panel-alt); }
  .profile-stats span, .rule-meta span, .threshold-card span, .summary-card span, .control-field span { display: block; color: var(--text-dim); font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }
  .profile-stats strong { display: block; margin-top: 6px; font-size: 15px; color: var(--navy); }
  .verification-panel {
    margin-top: 12px;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: #fff;
    display: grid;
    gap: 6px;
  }
  .verification-panel.good { border-color: #bdebd8; background: #f2fbf7; }
  .verification-panel.high { border-color: #f2dcc0; background: #fff8ef; }
  .verification-panel.critical { border-color: #f4c9c9; background: #fff5f5; }
  .verification-panel div { display: flex; justify-content: space-between; gap: 10px; align-items: center; }
  .verification-panel span { color: var(--text-dim); font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
  .verification-panel strong { color: var(--navy); }
  .verification-panel p { margin: 0; color: var(--text-dim); font-size: 12px; }
  .signal-group { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
  .card-footer { margin-top: 18px; align-items: flex-end; }

  .settings-grid { grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); }
  .methodology-panel { grid-column: 1 / -1; }
  .methodology-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .methodology-list { display: grid; gap: 12px; margin-top: 16px; }
  .threshold-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 8px; }
  .threshold-card, .rule-card, .summary-card, .case-body-card { padding: 16px; }
  .threshold-card strong { display: block; margin-top: 10px; font-size: 22px; }
  .methodology-stat strong { font-size: 15px; line-height: 1.45; }
  .settings-note { margin: 16px 0 0; line-height: 1.5; }
  .methodology-helper { margin-bottom: 14px; }
  .methodology-helper p { margin: 10px 0 0; }

  .queue-modal-backdrop { position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 28px; background: rgba(15,23,42,0.42); backdrop-filter: blur(4px); }
  .queue-modal { width: min(980px, 100%); max-height: min(88vh, 920px); overflow: auto; border-radius: 22px; background: #fff; box-shadow: 0 28px 70px rgba(15,23,42,0.28); padding: 22px; }
  .case-modal { width: min(860px, 100%); }
  .queue-modal-head, .queue-item-top, .queue-meta, .queue-badges, .case-controls, .case-buttons, .composer-actions, .timeline-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
  .queue-modal-head { margin-bottom: 10px; }
  .queue-modal-head h3 { margin: 6px 0 0; color: var(--navy); font-size: 24px; }
  .queue-modal-summary { margin: 0 0 18px; color: var(--text-dim); line-height: 1.55; }
  .close-btn { width: 34px; height: 34px; border: 1px solid var(--border); border-radius: 999px; background: #fff; color: var(--navy); font-size: 22px; line-height: 1; }
  .queue-count, .queue-owner, .due-pill, .queue-next-step span { color: var(--text-dim); font-size: 12px; }
  .queue-items, .timeline { display: grid; gap: 12px; }
  .risk-scale-helper {
    margin: 14px 0 4px;
    padding: 14px;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: #f8fafc;
  }
  .risk-scale-topline,
  .risk-scale-labels {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .risk-scale-topline strong {
    color: var(--navy);
    font-size: 13px;
  }
  .risk-scale-topline span,
  .risk-scale-thresholds span,
  .risk-scale-labels span,
  .risk-scale-note {
    color: var(--text-dim);
    font-size: 12px;
  }
  .risk-scale-thresholds {
    position: relative;
    height: 16px;
    margin-bottom: 6px;
  }
  .risk-scale-thresholds span {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
  }
  .risk-scale-thresholds .threshold-start {
    left: 0;
    transform: none;
  }
  .risk-scale-thresholds .threshold-mid { left: 50%; }
  .risk-scale-thresholds .threshold-high { left: 75%; }
  .risk-scale-thresholds .threshold-end {
    right: 0;
    transform: none;
  }
  .risk-scale {
    position: relative;
    display: flex;
    margin: 12px 0 8px;
    overflow: hidden;
    border-radius: 999px;
  }
  .risk-scale-segment {
    height: 12px;
  }
  .risk-scale-segment.green { width: 50%; background: linear-gradient(90deg, #1f9d72 0%, #58c99b 100%); }
  .risk-scale-segment.amber { width: 25%; background: linear-gradient(90deg, #f0b429 0%, #d97706 100%); }
  .risk-scale-segment.red { width: 25%; background: linear-gradient(90deg, #ef6b6b 0%, #c53030 100%); }
  .risk-scale-marker {
    position: absolute;
    top: -4px;
    width: 18px;
    height: 20px;
    border-radius: 999px;
    background: #10294f;
    border: 3px solid #fff;
    box-shadow: 0 6px 14px rgba(16, 41, 79, 0.2);
  }
  .risk-scale-note { margin: 10px 0 0; }
  .impact-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    background: var(--panel-alt);
    color: var(--navy);
    padding: 4px 10px;
    font-size: 11px;
    font-weight: 700;
  }
  .queue-item, .timeline-item { background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 14px; }
  .queue-owner { display: block; margin-top: 4px; }
  .due-pill { display: inline-flex; align-items: center; border-radius: 999px; background: #fff; border: 1px solid var(--border); padding: 6px 10px; white-space: nowrap; }
  .queue-next-step strong { display: block; margin-top: 6px; color: var(--navy); line-height: 1.45; }

  .case-controls { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border); align-items: flex-end; }
  .control-field { min-width: 180px; display: flex; flex-direction: column; gap: 8px; }
  .control-field.slim { min-width: 140px; }
  .control-field.full { grid-column: 1 / -1; }
  .control-field input, .control-field select, .control-field textarea, .composer textarea {
    width: 100%; border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; font: inherit; background: #fff;
  }
  .composer { margin-top: 14px; padding: 14px; border-radius: 14px; border: 1px solid var(--border); background: var(--panel-alt); }
  .case-summary-grid, .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
  .case-body-card { margin-top: 14px; }
  .timeline-top span { color: var(--text-dim); font-size: 12px; }

  @media (max-width: 1180px) {
    .metric-grid, .blueprint-grid, .profile-grid, .settings-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .content-grid { grid-template-columns: 1fr; }
    .top-summary-row { grid-template-columns: 1fr; }
  }

  @media (max-width: 760px) {
    .tabs-row.primary, .directory-head, .section-head, .card-footer, .queue-modal-head, .queue-item-top, .queue-meta, .case-controls, .case-buttons, .composer-actions, .cases-head { flex-wrap: wrap; }
    .metric-grid, .blueprint-grid, .profile-grid, .threshold-grid, .settings-grid, .profile-stats, .case-summary-grid, .form-grid { grid-template-columns: 1fr; }
    .dashboard-shell, .directory-shell, .settings-shell, .cases-shell { padding: 14px; }
    .queue-modal-backdrop { padding: 14px; }
    .queue-modal { padding: 16px; }
  }
</style>


