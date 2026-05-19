<script>
  import { communityFeatureCatalog, fraudFeatureCatalog } from '$lib/data.js';

  const fraudSummary =
    'Fraud Analysis helps customers detect, investigate, and control potentially fraudulent activity across suppliers, invoices, payments, customers, and orders.';

  const communitySummary =
    'Community gives senders and receivers shared visibility, self-service access, and faster issue resolution across invoices, orders, payments, and delivery events.';

  const aiUtilisationSummary =
    'AI is being used across the business to improve customer reporting, project delivery, product design, development, onboarding, and automated support journeys.';

  const fraudMap = [
    {
      title: 'Detection signals',
      color: 'orange',
      points: fraudFeatureCatalog[0].features.slice(0, 6).map((feature) => feature.name)
    },
    {
      title: 'Protected areas',
      color: 'navy',
      points: [
        'Suppliers and onboarding',
        'Invoices and duplicates',
        'Payments before release',
        'Customer orders',
        'Delivery and address changes'
      ]
    },
    {
      title: 'Operating model',
      color: 'slate',
      points: [
        'Standalone investigation workspace',
        'Embedded inside live workflows',
        'Case management and escalation',
        'Explainable scoring and thresholds',
        'Full audit trail and controls'
      ]
    },
    {
      title: 'Platform intelligence',
      color: 'teal',
      points: [
        'Cross-customer pattern detection',
        'Shared risky accounts or entities',
        'Behavioural profiling',
        'Approval anomaly monitoring',
        'Intervention before payment or fulfilment'
      ]
    }
  ];

  const communityMap = [
    {
      title: 'Self-service visibility',
      color: 'teal',
      points: communityFeatureCatalog[0].features.map((feature) => feature.name)
    },
    {
      title: 'Interaction flows',
      color: 'navy',
      points: communityFeatureCatalog[1].features.map((feature) => feature.name)
    },
    {
      title: 'Control and insight',
      color: 'slate',
      points: communityFeatureCatalog[2].features.slice(0, 3).map((feature) => feature.name)
    },
    {
      title: 'AI and roadmap',
      color: 'orange',
      points: [
        'AI-powered assistant',
        'Email queries routed through AI with automatic responses when an appropriate answer is available',
        'Customer-uploaded knowledge for FAQs',
        'Answers beyond status updates',
        'Role-based collaboration',
        'Future analytics and service insights'
      ]
    }
  ];

  const aiUtilisationMap = [
    {
      title: 'Project Delivery & Onboarding',
      color: 'teal',
      points: [
        {
          text: 'GuideCX 2.0 rollout with AI-driven project risk, delay prediction, and proactive notifications',
          status: 'amber'
        },
        {
          text: 'Weekly RAG project reporting and intelligent task chasing across delivery stakeholders',
          status: 'amber'
        },
        {
          text: 'Onboarding journeys and implementation support',
          status: 'green'
        }
      ]
    },
    {
      title: 'Support & Service Management',
      color: 'slate',
      points: [
        {
          text: 'Customer service packs with bundle, transaction, and onboarding utilisation reporting',
          status: 'green'
        },
        {
          text: 'Executive-ready summaries for customer stakeholder and board updates',
          status: 'green'
        },
        {
          text: 'Suspense and support-report analysis to identify configuration and process improvements',
          status: 'amber'
        },
        {
          text: 'Zoho support analysis to identify recurring issues and improvement opportunities',
          status: 'amber'
        },
        {
          text: 'EVA-assisted support and self-service to answer customer queries and reduce manual burden',
          status: 'red'
        }
      ]
    },
    {
      title: 'Commercial',
      color: 'orange',
      points: [{ text: 'TBC', status: 'red' }]
    },
    {
      title: 'Product / Development',
      color: 'navy',
      points: [
        { text: 'AI-assisted productisation for new solution design', status: 'green' },
        { text: 'AI-assisted development', status: 'green' },
        { text: 'Transaction processing', status: 'green' },
        { text: "ECX's Virtual Assistant (EVA)", status: 'green' }
      ]
    }
  ];
</script>

<svelte:head>
  <title>Open ECX Mind Maps</title>
</svelte:head>

<div class="maps-shell">
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
          <a class="switch-link" href="/community-info">Community</a>
          <a class="switch-link active" href="/module-maps">Mind maps</a>
        </nav>
      </div>
    </div>

    <div class="hero-copy">
      <span class="eyebrow">Module idea maps</span>
      <h1>Three visual concept maps to pressure-test the proposition and AI story.</h1>
      <p>
        This page groups the main ideas from each module overview into a customer-facing mind-map format, so the shape
        of each proposition and internal AI narrative is easier to assess before we refine the copy further.
      </p>
    </div>
  </header>

  <main class="maps-stack">
    <section class="map-panel fraud-panel">
      <div class="panel-head">
        <div>
          <span class="panel-kicker">Fraud</span>
          <h2>Risk detection and intervention across the platform</h2>
        </div>
        <p>{fraudSummary}</p>
      </div>

      <div class="mind-map">
        <div class="branch-column left">
          {#each fraudMap.slice(0, 2) as branch}
            <article class={`branch-card ${branch.color}`}>
              <h3>{branch.title}</h3>
              <ul>
                {#each branch.points as point}
                  <li class:status-item={typeof point !== 'string'}>
                    <span>{typeof point === 'string' ? point : point.text}</span>
                    {#if typeof point !== 'string'}
                      <span class={`status-dot ${point.status}`} aria-hidden="true"></span>
                    {/if}
                  </li>
                {/each}
              </ul>
            </article>
          {/each}
        </div>

        <div class="core-card fraud-core">
          <span>Fraud</span>
          <strong>Protect payments, orders, and supplier activity before risk becomes loss.</strong>
        </div>

        <div class="branch-column right">
          {#each fraudMap.slice(2) as branch}
            <article class={`branch-card ${branch.color}`}>
              <h3>{branch.title}</h3>
              <ul>
                {#each branch.points as point}
                  <li class:status-item={typeof point !== 'string'}>
                    <span>{typeof point === 'string' ? point : point.text}</span>
                    {#if typeof point !== 'string'}
                      <span class={`status-dot ${point.status}`} aria-hidden="true"></span>
                    {/if}
                  </li>
                {/each}
              </ul>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <section class="map-panel community-panel">
      <div class="panel-head">
        <div>
          <span class="panel-kicker">Community</span>
          <h2>Shared visibility, self-service, and guided resolution</h2>
        </div>
        <p>{communitySummary}</p>
      </div>

      <div class="mind-map">
        <div class="branch-column left">
          {#each communityMap.slice(0, 2) as branch}
            <article class={`branch-card ${branch.color}`}>
              <h3>{branch.title}</h3>
              <ul>
                {#each branch.points as point}
                  <li>{point}</li>
                {/each}
              </ul>
            </article>
          {/each}
        </div>

        <div class="core-card community-core">
          <span>Community</span>
          <strong>Reduce chasing by giving users the right information, context, and help in one place.</strong>
        </div>

        <div class="branch-column right">
          {#each communityMap.slice(2) as branch}
            <article class={`branch-card ${branch.color}`}>
              <h3>{branch.title}</h3>
              <ul>
                {#each branch.points as point}
                  <li>{point}</li>
                {/each}
              </ul>
            </article>
          {/each}
        </div>
      </div>
    </section>

    <section class="map-panel ai-panel">
      <div class="panel-head">
        <div>
          <span class="panel-kicker">AI - Powering Open ECX</span>
          <h2>How AI is being used across the business</h2>
        </div>
        <p>{aiUtilisationSummary}</p>
      </div>

      <div class="mind-map ai-map">
        <div class="branch-column left">
          {#each aiUtilisationMap.slice(0, 2) as branch}
            <article class={`branch-card ${branch.color}`}>
              <h3>{branch.title}</h3>
              <ul>
                {#each branch.points as point}
                  <li class:status-item={typeof point !== 'string'}>
                    <span>{typeof point === 'string' ? point : point.text}</span>
                    {#if typeof point !== 'string'}
                      <span class={`status-dot ${point.status}`} aria-hidden="true"></span>
                    {/if}
                  </li>
                {/each}
              </ul>
            </article>
          {/each}
        </div>

        <div class="core-card ai-core">
          <span>AI - Powering Open ECX</span>
          <strong>We've adopted an AI-first approach to enhancing processes and reporting data insights across operations, commercial, and product.</strong>
        </div>

        <div class="branch-column right">
          {#each aiUtilisationMap.slice(2) as branch}
            <article class={`branch-card ${branch.color}`}>
              <h3>{branch.title}</h3>
              <ul>
                {#each branch.points as point}
                  <li class:status-item={typeof point !== 'string'}>
                    <span>{typeof point === 'string' ? point : point.text}</span>
                    {#if typeof point !== 'string'}
                      <span class={`status-dot ${point.status}`} aria-hidden="true"></span>
                    {/if}
                  </li>
                {/each}
              </ul>
            </article>
          {/each}
        </div>
      </div>
    </section>
  </main>
</div>

<style>
  .maps-shell {
    min-height: 100vh;
    background:
      radial-gradient(circle at top left, rgba(235, 96, 40, 0.1), transparent 22%),
      radial-gradient(circle at top right, rgba(11, 127, 119, 0.12), transparent 24%),
      linear-gradient(180deg, #f4f6f9 0%, #edf2f7 100%);
    color: var(--text);
  }

  .hero,
  .maps-stack {
    width: min(1380px, calc(100vw - 48px));
    margin: 0 auto;
  }

  .hero {
    padding: 28px 0 20px;
  }

  .hero-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 30px;
  }

  .hero-brand {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .hero-logo {
    width: 150px;
    height: auto;
    display: block;
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
    background: var(--navy);
    color: #fff;
  }

  .hero-copy {
    max-width: 840px;
  }

  .eyebrow {
    display: inline-block;
    color: var(--navy);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 10px;
    font-weight: 800;
  }

  h1 {
    margin: 12px 0;
    color: var(--navy);
    font-size: 44px;
    line-height: 1.04;
  }

  .hero p,
  .panel-head p {
    margin: 0;
    color: var(--text-dim);
    font-size: 16px;
    line-height: 1.6;
  }

  .maps-stack {
    padding: 8px 0 42px;
    display: grid;
    gap: 24px;
  }

  .map-panel {
    padding: 26px;
    border-radius: 28px;
    border: 1px solid rgba(16, 58, 106, 0.08);
    background: rgba(255, 255, 255, 0.78);
    box-shadow: 0 18px 48px rgba(16, 41, 79, 0.08);
  }

  .fraud-panel {
    background:
      linear-gradient(135deg, rgba(235, 96, 40, 0.08), transparent 35%),
      rgba(255, 255, 255, 0.82);
  }

  .community-panel {
    background:
      linear-gradient(135deg, rgba(11, 127, 119, 0.08), transparent 35%),
      rgba(255, 255, 255, 0.82);
  }

  .panel-head {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
    gap: 20px;
    align-items: end;
    margin-bottom: 24px;
  }

  .panel-kicker {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-dim);
  }

  h2 {
    margin: 0;
    color: var(--navy);
    font-size: 28px;
    line-height: 1.1;
  }

  .mind-map {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(280px, 340px) minmax(0, 1fr);
    gap: 18px;
    align-items: center;
  }

  .branch-column {
    display: grid;
    gap: 16px;
  }

  .branch-card,
  .core-card {
    position: relative;
    border-radius: 22px;
    padding: 20px;
    border: 1px solid rgba(16, 58, 106, 0.08);
    background: rgba(255, 255, 255, 0.92);
  }

  .branch-card::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 28px;
    height: 2px;
    background: rgba(16, 58, 106, 0.14);
    z-index: 0;
  }

  .left .branch-card::after {
    right: -28px;
  }

  .right .branch-card::after {
    left: -28px;
  }

  .branch-card.orange {
    box-shadow: inset 0 0 0 1px rgba(235, 96, 40, 0.1);
  }

  .branch-card.teal {
    box-shadow: inset 0 0 0 1px rgba(11, 127, 119, 0.12);
  }

  .branch-card.navy {
    box-shadow: inset 0 0 0 1px rgba(16, 58, 106, 0.12);
  }

  .branch-card.slate {
    box-shadow: inset 0 0 0 1px rgba(77, 95, 130, 0.12);
  }

  h3 {
    margin: 0 0 12px;
    color: var(--navy);
    font-size: 18px;
  }

  ul {
    margin: 0;
    padding-left: 18px;
    color: var(--text-dim);
    display: grid;
    gap: 8px;
    line-height: 1.45;
  }

  li.status-item {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    list-style: none;
    padding-left: 16px;
  }

  li.status-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 9px;
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: #0f172a;
  }

  .status-dot {
    flex: 0 0 auto;
    width: 12px;
    height: 12px;
    margin-top: 6px;
    border-radius: 999px;
    box-shadow: 0 0 0 4px rgba(16, 58, 106, 0.05);
    border: 1px solid rgba(16, 58, 106, 0.12);
  }

  .status-dot.green { background: #1f9d72; }
  .status-dot.amber { background: #f2b01e; }
  .status-dot.red { background: #b42318; }

  .core-card {
    min-height: 240px;
    display: grid;
    align-content: center;
    gap: 14px;
    text-align: center;
    box-shadow: 0 18px 44px rgba(16, 41, 79, 0.12);
    z-index: 2;
  }

  .ai-map .left .branch-card::after {
    right: -38px;
    width: 38px;
  }

  .ai-map .left .branch-card:first-child::after {
    top: 75%;
  }

  .ai-map .right .branch-card::after {
    left: -38px;
    width: 38px;
  }

  .fraud-panel .left .branch-card:nth-child(1)::after {
    top: 70%;
  }

  .fraud-panel .left .branch-card:nth-child(2)::after {
    top: 30%;
  }

  .fraud-panel .right .branch-card:nth-child(1)::after {
    top: 65%;
  }

  .fraud-panel .right .branch-card:nth-child(2)::after {
    top: 40%;
  }

  .community-panel .left .branch-card:nth-child(1)::after {
    top: 60%;
  }

  .community-panel .left .branch-card:nth-child(2)::after {
    top: 35%;
  }

  .community-panel .right .branch-card:nth-child(1)::after {
    top: 75%;
  }

  .community-panel .right .branch-card:nth-child(2)::after {
    top: 40%;
  }

  .ai-core {
  }

  .core-card span {
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-dim);
  }

  .core-card strong {
    color: var(--navy);
    font-size: 26px;
    line-height: 1.2;
  }

  .fraud-core {
    background:
      radial-gradient(circle at top, rgba(235, 96, 40, 0.18), transparent 48%),
      linear-gradient(180deg, #fff 0%, #fff8f4 100%);
  }

  .community-core {
    background:
      radial-gradient(circle at top, rgba(11, 127, 119, 0.18), transparent 48%),
      linear-gradient(180deg, #fff 0%, #f5fcfb 100%);
  }

  @media (max-width: 1080px) {
    .panel-head,
    .mind-map {
      grid-template-columns: 1fr;
    }

    .core-card {
      min-height: 0;
      order: -1;
    }

    .branch-card::after {
      display: none;
    }
  }

  @media (max-width: 640px) {
    .hero,
    .maps-stack {
      width: min(1380px, calc(100vw - 28px));
    }

    .hero-brand {
      flex-wrap: wrap;
    }

    h1 {
      font-size: 32px;
    }

    h2 {
      font-size: 24px;
    }

    .map-panel {
      padding: 20px;
      border-radius: 22px;
    }
  }
</style>
