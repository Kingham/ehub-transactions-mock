<script>
  import { page } from '$app/stores';

  const LOGO_URL =
    'https://openecxcdn.blob.core.windows.net/live/missioncontrol/Customer%20Images/Open%20ECX/Open-ECX-Logo.svg';

  const transactionsItems = [
    { label: 'Dashboard', href: '/transactions/dashboard' },
    { label: 'All Transactions', href: '/transactions' },
    { label: 'Fraud', href: '/fraud', isNew: true },
    { label: 'Community', href: '/community', isNew: true },
    { label: 'Matching Data', href: '/transactions/matching' },
    { label: 'Suspensions', href: '/transactions/suspensions' },
    { label: 'Reconciliation', href: '/reconciliation' }
  ];

  const adminItems = [
    { label: 'Users', href: '/admin/users' },
    { label: 'Documents', href: '/admin/documents' },
    { label: 'Feed Results', href: '/admin/feed-results' },
    { label: 'Onboarding', href: '/admin/onboarding' },
    { label: 'eHub Customers', href: '/admin/ehub-customers' },
    { label: 'eHub Senders', href: '/admin/ehub-senders' },
    { label: 'Approvals', href: '/admin/approvals' },
    { label: 'Reports', href: '/admin/reports' },
    { label: 'Settings', href: '/admin/settings' }
  ];

  const recentCustomers = ['AI Test Customer', 'EH Smith', 'Adama'];

  function isListActive(pathname) {
    return pathname === '/transactions' || pathname.startsWith('/transactions/');
  }
  function isReconActive(pathname) {
    return pathname === '/reconciliation' || pathname.startsWith('/reconciliation/');
  }
  function isActiveFor(item, pathname) {
    if (item.label === 'All Transactions') return isListActive(pathname);
    if (item.label === 'Reconciliation') return isReconActive(pathname);
    return pathname === item.href;
  }
</script>

<aside class="sidebar">
  <div class="brand">
    <a class="brand-link" href="/" aria-label="Open ECX overview">
      <img class="logo" src={LOGO_URL} alt="openECX" />
    </a>
    <div class="environment env-test">Test System</div>
  </div>

  <div class="divider" />

  <nav class="nav">
    <div class="group-head">
      <span class="group-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="5" y="4" width="14" height="18" rx="2" />
          <path d="M9 4h6v3H9z" />
          <path d="M9 12h6M9 16h6" />
        </svg>
      </span>
      <span class="group-title">Transactions</span>
    </div>

    <ul class="items">
      {#each transactionsItems as item}
        {@const active = isActiveFor(item, $page.url.pathname)}
        <li class:active>
          {#if active}
            <span class="arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M10 8l5 4-5 4z" fill="currentColor" stroke="none" />
              </svg>
            </span>
          {/if}
          <a href={item.href} class:new-item={item.isNew}>{item.label}</a>
        </li>
      {/each}
    </ul>

    <div class="group-head admin">
      <span class="group-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01A1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </span>
      <span class="group-title">Admin</span>
    </div>

    <ul class="items">
      {#each adminItems as item}
        <li class:active={$page.url.pathname === item.href}>
          <a href={item.href}>{item.label}</a>
        </li>
      {/each}
    </ul>
  </nav>

  <div class="recent">
    <div class="recent-head">
      <span class="recent-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 3v6h6" />
          <path d="M12 7v5l3 2" />
        </svg>
      </span>
      <span class="recent-title">Recent Customers</span>
      <span class="recent-caret">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 15l6-6 6 6" />
        </svg>
      </span>
    </div>
    <ul class="recent-list">
      {#each recentCustomers as name}
        <li>{name}</li>
      {/each}
    </ul>
  </div>

  <div class="user">
    <span class="user-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
      </svg>
    </span>
    <div class="user-info">
      <div class="user-name">Andrew Froude</div>
      <button class="logout">Log Out</button>
    </div>
  </div>

  <div class="sidebar-foot">
    <button class="collapse-btn" aria-label="Collapse sidebar">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 6l-6 6 6 6" />
      </svg>
    </button>
    <span class="v-number">5.8.0</span>
  </div>
</aside>

<style>
  .sidebar {
    width: 225px;
    min-width: 225px;
    background: #fff;
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    padding: 14px 14px 10px;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
  }

  .brand {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 4px 0 14px;
  }

  .logo {
    width: 140px;
    height: auto;
    display: block;
  }

  .brand-link {
    display: inline-flex;
  }

  .environment {
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 10px;
    font-weight: 600;
    padding: 10px;
    border-radius: 6px;
    letter-spacing: 0.02em;
  }
  .env-test { background: var(--navy-deep); }

  .divider {
    height: 1px;
    background: var(--border);
    margin: 0 -14px 12px;
  }

  .nav { flex: 0 0 auto; }

  .group-head {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--navy);
    font-weight: 700;
    font-size: 16px;
    padding: 5px 8px;
  }
  .group-head.admin { margin-top: 16px; }

  .group-icon { color: var(--navy); display: inline-flex; }

  .items {
    list-style: none;
    margin: 4px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  .items li {
    position: relative;
    padding: 5px 8px 5px 28px;
  }
  .items a {
    color: #000;
    font-weight: 500;
    font-size: 13px;
    display: block;
  }
  .items li:hover a { color: var(--orange); }
  .items li.active > a { color: var(--navy); font-weight: 600; }

  .items li .arrow {
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--orange);
    display: inline-flex;
  }

  .items a.new-item::after {
    content: 'NEW';
    background: var(--orange);
    color: #fff;
    font-size: 8px;
    font-weight: 700;
    padding: 2px 5px;
    border-radius: 3px;
    margin-left: 6px;
    vertical-align: middle;
    letter-spacing: 0.04em;
    line-height: 1;
  }

  .recent {
    margin-top: 18px;
    padding: 0 4px;
  }
  .recent-head {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--orange);
    font-weight: 600;
  }
  .recent-icon { color: var(--orange); display: inline-flex; }
  .recent-title { flex: 1; font-size: 13px; }
  .recent-caret { color: var(--orange); display: inline-flex; }
  .recent-list {
    list-style: none;
    margin: 8px 0 0;
    padding: 0 0 0 4px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .recent-list li {
    color: #000;
    font-size: 13px;
  }

  .user {
    margin-top: 18px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 0 4px;
  }
  .user-icon { color: var(--navy); padding-top: 2px; }
  .user-name { color: var(--navy); font-weight: 700; font-size: 13px; }
  .logout {
    margin-top: 8px;
    background: #fff;
    color: #000;
    border: 1px solid var(--border-strong);
    border-radius: 6px;
    padding: 4px 14px;
    font-size: 12px;
    font-weight: 500;
  }

  .sidebar-foot {
    margin-top: auto;
    padding: 12px 4px 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .collapse-btn {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: #fff;
    color: var(--orange);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .v-number {
    background: var(--chip-grey);
    color: #fff;
    font-size: 10px;
    font-weight: 400;
    padding: 5px 10px;
    border-radius: 50px;
  }
</style>
