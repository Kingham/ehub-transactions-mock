<script>
  import { communityFeatureCatalog, communitySummaryMetrics } from '$lib/data.js';

  const spotlightItems = [
    'Shared supplier and customer visibility across invoices, orders, payments, and delivery milestones',
    'External self-service tracking, messaging, and document access embedded into the operational transaction flow',
    'A future-facing community layer for notifications, role-managed collaboration, analytics, and AI assistance'
  ];
</script>

<svelte:head>
  <title>Open ECX Community Module</title>
</svelte:head>

<div class="overview-shell">
  <header class="hero">
    <div class="hero-bar">
      <div class="hero-brand">
        <img
          class="hero-logo"
          src="https://openecxcdn.blob.core.windows.net/live/missioncontrol/Customer%20Images/Open%20ECX/Open-ECX-Logo.svg"
          alt="Open ECX"
        />
        <nav class="module-switch">
          <a class="switch-link" href="/">Fraud</a>
          <a class="switch-link active" href="/community-info">Community</a>
        </nav>
      </div>
      <div class="hero-actions">
        <a class="map-link" href="/module-maps">View mind maps</a>
        <a class="enter-app" href="/community">Open module</a>
      </div>
    </div>

    <div class="hero-grid">
      <div>
        <span class="eyebrow">Community module overview</span>
        <h1>Shared visibility, communication, and self-service across invoices, payments, orders, and delivery events.</h1>
        <p>
          This page is a concise internal overview of how Community gives suppliers and customers controlled visibility into the lifecycle of their transactions. The working screens remain operational, while this page summarises the capability set and experience.
        </p>

        <div class="spotlight-list">
          {#each spotlightItems as item}
            <div class="spotlight-item">{item}</div>
          {/each}
        </div>
      </div>

      <div class="hero-panel">
        <span class="panel-label">Module outcomes</span>
        <div class="hero-metrics">
          {#each communitySummaryMetrics as metric}
            <div class="mini-metric">
              <span>{metric.title}</span>
              <strong>{metric.value}</strong>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </header>

  <main class="content">
    {#each communityFeatureCatalog as group}
      <section class="feature-section">
        <div class="section-head">
          <span class="section-mark"></span>
          <h2>{group.title}</h2>
        </div>

        <div class="feature-grid">
          {#each group.features as feature}
            <article class="feature-card">
              <h3>{feature.name}</h3>
              <p>{feature.detail}</p>
            </article>
          {/each}
        </div>
      </section>
    {/each}
  </main>
</div>

<style>
  .overview-shell {
    min-height: 100vh;
    background:
      radial-gradient(circle at top left, rgba(12, 133, 125, 0.12), transparent 28%),
      linear-gradient(180deg, #f5f7fa 0%, #eef3f7 100%);
    color: var(--text);
  }

  .hero,
  .content {
    width: min(1240px, calc(100vw - 48px));
    margin: 0 auto;
  }

  .hero {
    padding: 28px 0 22px;
  }

  .hero-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 28px;
  }

  .hero-logo {
    width: 150px;
    height: auto;
    display: block;
  }

  .hero-brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .module-switch {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(16, 58, 106, 0.08);
    border-radius: 999px;
  }

  .switch-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    color: var(--navy);
    font-size: 12px;
    font-weight: 700;
  }

  .switch-link.active {
    background: #0b7f77;
    color: #fff;
  }

  .enter-app {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 0 18px;
    border-radius: 999px;
    background: transparent;
    color: transparent;
    border: none;
    font-weight: 700;
    opacity: 0;
  }

  .map-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 0 18px;
    border-radius: 999px;
    border: 1px solid rgba(16, 58, 106, 0.12);
    background: rgba(255, 255, 255, 0.78);
    color: var(--navy);
    font-size: 13px;
    font-weight: 700;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(300px, 0.8fr);
    gap: 18px;
    align-items: stretch;
  }

  .eyebrow {
    display: inline-block;
    color: #0b7f77;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 10px;
    font-weight: 800;
  }

  h1 {
    margin: 12px 0;
    color: var(--navy);
    font-size: 42px;
    line-height: 1.08;
    max-width: 860px;
  }

  .hero p {
    margin: 0;
    max-width: 760px;
    color: var(--text-dim);
    font-size: 16px;
    line-height: 1.6;
  }

  .spotlight-list {
    display: grid;
    gap: 10px;
    margin-top: 24px;
  }

  .spotlight-item,
  .hero-panel,
  .feature-card {
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(16, 58, 106, 0.08);
    box-shadow: 0 12px 36px rgba(16, 41, 79, 0.06);
  }

  .spotlight-item {
    padding: 14px 16px;
    border-radius: 14px;
    font-weight: 600;
    color: var(--navy);
  }

  .hero-panel {
    border-radius: 20px;
    padding: 20px;
  }

  .panel-label {
    display: inline-block;
    margin-bottom: 16px;
    color: var(--text-dim);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
  }

  .hero-metrics {
    display: grid;
    gap: 12px;
  }

  .mini-metric {
    border-radius: 14px;
    background: var(--panel-alt);
    padding: 14px;
  }

  .mini-metric span {
    display: block;
    color: var(--text-dim);
    font-size: 12px;
    margin-bottom: 8px;
  }

  .mini-metric strong {
    color: var(--navy);
    font-size: 28px;
    line-height: 1;
  }

  .content {
    padding: 8px 0 40px;
    display: grid;
    gap: 20px;
  }

  .feature-section {
    background: rgba(255, 255, 255, 0.68);
    border: 1px solid rgba(16, 58, 106, 0.07);
    border-radius: 22px;
    padding: 20px;
  }

  .section-head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
  }

  .section-mark {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #0b7f77;
  }

  h2 {
    margin: 0;
    color: var(--navy);
    font-size: 24px;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .feature-card {
    padding: 18px;
    border-radius: 16px;
  }

  h3 {
    margin: 0 0 10px;
    color: var(--navy);
    font-size: 17px;
  }

  .feature-card p {
    margin: 0;
    color: var(--text-dim);
    line-height: 1.55;
  }

  @media (max-width: 920px) {
    .hero-grid,
    .feature-grid {
      grid-template-columns: 1fr;
    }

    h1 {
      font-size: 32px;
    }
  }

  @media (max-width: 640px) {
    .hero,
    .content {
      width: min(1240px, calc(100vw - 28px));
    }

    .hero-bar {
      flex-wrap: wrap;
    }

    h1 {
      font-size: 28px;
    }
  }
</style>
