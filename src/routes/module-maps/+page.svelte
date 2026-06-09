<script>
  import { communityFeatureCatalog, fraudFeatureCatalog } from '$lib/data.js';

  const fraudSummary =
    'Fraud Analysis helps customers detect, investigate, and control potentially fraudulent activity across suppliers, invoices, payments, customers, and orders.';

  const communitySummary =
    'Community gives senders and receivers shared visibility, self-service access, and faster issue resolution across invoices, orders, payments, and delivery events.';

  const aiUtilisationSummary =
    'AI is being used across the business to improve customer reporting, project delivery, product design, development, onboarding, and automated support journeys.';

  const frenchEinvoicingFlowSummary =
    'Based on the French eInvoicing mandate flow shown in the Arratech document, this view maps where each transaction is initiated, where it starts, where it ends, and how the outbound and inbound paths fit together.';

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
        points: [
          { text: 'Content creation and research support across the commercial function', status: 'amber' },
          { text: 'Drafting and refining emails, proposals, and wider sales content', status: 'amber' },
          { text: 'Competitive research and market investigation', status: 'amber' },
          { text: 'Prospect research and account lookups', status: 'amber' },
          { text: 'HubSpot analysis to advise on campaigns and track SDR performance', status: 'amber' },
          { text: 'Future use for SDR data cleansing and list improvement', status: 'red' },
          { text: 'Future use of agentic AI within commercial workflows', status: 'red' },
          { text: 'Controlled ECX GPT setup in Claude to support content creation and data management', status: 'amber' }
        ]
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

  const frenchOutboundFlow = [
    {
      step: '1',
      title: 'Deliver e-invoice',
      code: 'Outbound invoice',
      initiatedBy: 'Supplier / PAe',
      starts: 'PAe',
      ends: 'PAr',
      detail: 'The supplier-side accredited platform sends the e-invoice to the buyer-side platform.'
    },
    {
      step: '2',
      title: 'Send tax data subset',
      code: 'Flow 1 tax data',
      initiatedBy: 'PAe',
      starts: 'PAe',
      ends: 'PPF',
      detail: 'The tax-relevant invoice data is sent to the public invoicing portal in parallel with delivery.'
    },
    {
      step: '3',
      title: 'PPF acknowledgement',
      code: 'Status 250 / 500',
      initiatedBy: 'PPF',
      starts: 'PPF',
      ends: 'PAe',
      detail: 'The public platform responds to confirm acceptance or signal a technical issue.'
    },
    {
      step: '4',
      title: 'Submission status',
      code: 'Status 200',
      initiatedBy: 'PAe',
      starts: 'PAe',
      ends: 'PPF and customer C1',
      detail: 'PAe records submission to the PPF and can also notify the supplier customer that the invoice has been submitted.'
    },
    {
      step: '5',
      title: 'Buyer-side lifecycle update',
      code: 'Status 202',
      initiatedBy: 'PAr',
      starts: 'PAr',
      ends: 'PAe',
      detail: 'The buyer-side platform confirms the invoice has been received.'
    },
    {
      step: '6',
      title: 'Made available update',
      code: 'Status 203',
      initiatedBy: 'PAr',
      starts: 'PAr',
      ends: 'PAe',
      detail: 'The buyer-side platform confirms the invoice has been made available to the buyer.'
    },
    {
      step: '7',
      title: 'Payment status update',
      code: 'Status 212',
      initiatedBy: 'PAe',
      starts: 'PAe',
      ends: 'PPF and PAr',
      detail: 'If the supplier is on VAT on payments, payment receipt status is sent back into the French network.'
    }
  ];

  const frenchInboundFlow = [
    {
      step: '1',
      title: 'Receive e-invoice',
      code: 'Inbound receipt',
      initiatedBy: 'PAr',
      starts: 'PAr',
      ends: 'Buyer / receiving platform',
      detail: 'The inbound flow starts when the buyer-side accredited platform receives the e-invoice.'
    },
    {
      step: '2',
      title: 'Report international B2B purchase data',
      code: 'e-reporting 10.1',
      initiatedBy: 'PAr',
      starts: 'PAr',
      ends: 'PPF',
      detail: 'Where applicable, inbound purchase tax reporting is sent from the buyer-side platform to the public portal.'
    },
    {
      step: '3',
      title: 'Received confirmation',
      code: 'Status 202',
      initiatedBy: 'PAr',
      starts: 'PAr',
      ends: 'PAe',
      detail: 'The buyer-side platform notifies the supplier-side platform that the invoice has been received.'
    },
    {
      step: '4',
      title: 'Made available confirmation',
      code: 'Status 203',
      initiatedBy: 'PAr',
      starts: 'PAr',
      ends: 'PAe',
      detail: 'The buyer-side platform confirms the invoice is available to the buyer.'
    },
    {
      step: '5',
      title: 'Technical rejection',
      code: 'Status 213',
      initiatedBy: 'PAr',
      starts: 'PAr',
      ends: 'PAe and PPF',
      detail: 'If there is a technical issue with the invoice, a rejection is sent back to both the supplier-side platform and the public portal.',
      optional: true
    },
    {
      step: '6',
      title: 'Business refusal',
      code: 'Status 210',
      initiatedBy: 'PAr',
      starts: 'PAr',
      ends: 'PAe and PPF',
      detail: 'If there is a business issue with the invoice, a refusal is sent back to both the supplier-side platform and the public portal.',
      optional: true
    }
  ];

  const frenchActors = ['Supplier', 'PAe', 'PPF', 'PAr', 'Buyer'];

  const frenchPointToPointFlow = [
    {
      phase: 'Primary delivery and reporting',
      rows: [
        {
          code: '1',
          label: 'e-invoice',
          from: 'PAe',
          to: 'PAr',
          note: 'Seller-side platform sends the invoice to the buyer-side platform.'
        },
        {
          code: '2',
          label: 'Tax data subset',
          from: 'PAe',
          to: 'PPF',
          note: 'PAe sends the invoice tax data to the public portal in parallel.'
        }
      ]
    },
    {
      phase: 'Platform acknowledgements',
      rows: [
        {
          code: '3',
          label: 'Status 250 / 500',
          from: 'PPF',
          to: 'PAe',
          note: 'PPF responds to the supplier-side platform after tax data submission.'
        },
        {
          code: '4',
          label: 'Status 200',
          from: 'PAe',
          to: 'PPF',
          note: 'PAe submits lifecycle status back into the public flow.'
        },
        {
          code: '5',
          label: 'Status 200',
          from: 'PAe',
          to: 'Supplier',
          note: 'PAe can also notify the seller customer that the invoice has been submitted.'
        }
      ]
    },
    {
      phase: 'Buyer-side receipt updates',
      rows: [
        {
          code: '6',
          label: 'Status 202',
          from: 'PAr',
          to: 'PAe',
          note: 'Buyer-side platform confirms the invoice has been received.'
        },
        {
          code: '7',
          label: 'Status 203',
          from: 'PAr',
          to: 'PAe',
          note: 'Buyer-side platform confirms the invoice has been made available to the buyer.'
        },
        {
          code: '8',
          label: 'Receipt to buyer',
          from: 'PAr',
          to: 'Buyer',
          note: 'The invoice is available within the buyer environment.'
        }
      ]
    },
    {
      phase: 'Exception and payment events',
      rows: [
        {
          code: '9',
          label: 'Status 213',
          from: 'PAr',
          to: 'PAe + PPF',
          note: 'Technical rejection, if the invoice fails validation.',
          optional: true
        },
        {
          code: '10',
          label: 'Status 210',
          from: 'PAr',
          to: 'PAe + PPF',
          note: 'Business refusal, if the buyer disputes the invoice.',
          optional: true
        },
        {
          code: '11',
          label: 'Status 212',
          from: 'PAe',
          to: 'PPF + PAr',
          note: 'Payment received update where VAT on payments applies.',
          optional: true
        }
      ]
    }
  ];

  const frenchProcessLanes = [
    {
      title: 'Outbound process',
      subtitle: 'Seller issues invoice to buyer',
      chargeSummary: 'Commercial charge: 4 outbound transactions per invoice',
      tone: 'outbound',
      steps: [
        {
          title: 'Supplier creates invoice',
          generatedBy: 'Supplier',
          from: 1,
          to: 2,
          note: 'Commercial instruction begins when the seller asks its accredited platform to issue the invoice.'
        },
        {
          title: 'e-invoice sent to buyer platform',
          generatedBy: 'PAe',
          from: 2,
          to: 4,
          note: 'The core invoice delivery from seller-side accredited platform to buyer-side accredited platform.',
          chargeable: true,
          chargeLabel: 'Chargeable outbound event'
        },
        {
          title: 'Tax data subset sent to PPF',
          generatedBy: 'PAe',
          from: 2,
          to: 3,
          note: 'The invoice tax data is reported to the public portal in parallel with delivery.',
          chargeable: true,
          chargeLabel: 'Chargeable outbound event'
        },
        {
          title: 'PPF returns acknowledgement',
          generatedBy: 'PPF',
          from: 3,
          to: 2,
          note: 'Technical acknowledgement or issue response back to the seller-side platform.'
        },
        {
          title: 'Buyer platform confirms receipt',
          generatedBy: 'PAr',
          from: 4,
          to: 2,
          note: 'Status 202 confirms the invoice has been received by the buyer-side platform.',
          chargeable: true,
          chargeLabel: 'Chargeable outbound event'
        },
        {
          title: 'Buyer platform confirms availability',
          generatedBy: 'PAr',
          from: 4,
          to: 2,
          note: 'Status 203 confirms the invoice has been made available to the buyer.',
          chargeable: true,
          chargeLabel: 'Chargeable outbound event'
        },
        {
          title: 'Buyer receives invoice',
          generatedBy: 'PAr / Buyer',
          from: 4,
          to: 5,
          note: 'The invoice is now visible to the buyer and ready for downstream processing.'
        }
      ]
    },
    {
      title: 'Inbound process',
      subtitle: 'Buyer receives invoice from seller',
      chargeSummary: 'Commercial charge: 2 inbound transactions per invoice',
      tone: 'inbound',
      steps: [
        {
          title: 'Buyer platform receives invoice',
          generatedBy: 'PAr',
          from: 4,
          to: 5,
          note: 'Inbound commercial receipt starts when the buyer-side platform receives and presents the invoice.',
          chargeable: true,
          chargeLabel: 'Chargeable inbound event'
        },
        {
          title: 'International B2B purchase reporting',
          generatedBy: 'PAr',
          from: 4,
          to: 3,
          note: 'Where applicable, buyer-side reporting is sent from the receiving platform to the public portal.',
          chargeable: true,
          chargeLabel: 'Chargeable inbound event'
        },
        {
          title: 'Receipt confirmation sent back',
          generatedBy: 'PAr',
          from: 4,
          to: 2,
          note: 'Status 202 is returned to the seller-side platform to confirm receipt.'
        },
        {
          title: 'Made available confirmation sent back',
          generatedBy: 'PAr',
          from: 4,
          to: 2,
          note: 'Status 203 is returned to confirm the invoice has been made available to the buyer.'
        },
        {
          title: 'Technical rejection, if needed',
          generatedBy: 'PAr',
          from: 4,
          to: 2,
          note: 'Status 213 can be raised for a technical issue and also reported to the PPF.',
          optional: true
        },
        {
          title: 'Business refusal, if needed',
          generatedBy: 'PAr',
          from: 4,
          to: 2,
          note: 'Status 210 can be raised for a business issue and also reported to the PPF.',
          optional: true
        }
      ]
    }
  ];

  const frenchTransmissionFlows = [
    {
      title: 'Outbound invoice route',
      subtitle: 'From seller issue through to buyer receipt',
      tone: 'outbound',
      transmissions: [
        {
          label: 'Invoice issue request',
          document: 'Seller instruction',
          generatedBy: 'Supplier',
          from: 1,
          to: 2,
          note: 'Seller asks its accredited platform to prepare and send the invoice.'
        },
        {
          label: 'e-invoice delivery',
          document: 'Invoice',
          generatedBy: 'PAe',
          from: 2,
          to: 4,
          note: 'Core invoice transmission from seller-side accredited platform to buyer-side accredited platform.',
          chargeable: 'Chargeable outbound'
        },
        {
          label: 'Tax reporting flow',
          document: 'Invoice tax data subset',
          generatedBy: 'PAe',
          from: 2,
          to: 3,
          note: 'Parallel tax data submission to the public portal.',
          chargeable: 'Chargeable outbound'
        },
        {
          label: 'PPF acknowledgement',
          document: 'Status 250 / 500',
          generatedBy: 'PPF',
          from: 3,
          to: 2,
          note: 'Public platform acknowledgement or technical error response.'
        },
        {
          label: 'Receipt confirmation',
          document: 'Status 202',
          generatedBy: 'PAr',
          from: 4,
          to: 2,
          note: 'Buyer-side platform confirms the invoice has been received.',
          chargeable: 'Chargeable outbound'
        },
        {
          label: 'Made available confirmation',
          document: 'Status 203',
          generatedBy: 'PAr',
          from: 4,
          to: 2,
          note: 'Buyer-side platform confirms the invoice has been made available to the buyer.',
          chargeable: 'Chargeable outbound'
        },
        {
          label: 'Buyer processing start',
          document: 'Invoice available',
          generatedBy: 'PAr',
          from: 4,
          to: 5,
          note: 'Buyer can now process the invoice in its natural business system.'
        }
      ]
    },
    {
      title: 'Inbound and exception route',
      subtitle: 'What the buyer-side platform sends back into the network',
      tone: 'inbound',
      transmissions: [
        {
          label: 'Inbound commercial receipt',
          document: 'Invoice received',
          generatedBy: 'PAr',
          from: 4,
          to: 5,
          note: 'Inbound commercial event when the buyer-side platform receives and presents the invoice.',
          chargeable: 'Chargeable inbound'
        },
        {
          label: 'Inbound purchase reporting',
          document: 'e-reporting 10.1',
          generatedBy: 'PAr',
          from: 4,
          to: 3,
          note: 'Where applicable, inbound reporting is sent to the public portal.',
          chargeable: 'Chargeable inbound'
        },
        {
          label: 'Technical rejection',
          document: 'Status 213',
          generatedBy: 'PAr',
          from: 4,
          to: 2,
          note: 'Optional technical rejection back to the seller-side platform and also reported to the PPF.',
          optional: true
        },
        {
          label: 'Business refusal',
          document: 'Status 210',
          generatedBy: 'PAr',
          from: 4,
          to: 2,
          note: 'Optional business refusal back to the seller-side platform and also reported to the PPF.',
          optional: true
        },
        {
          label: 'Payment update',
          document: 'Status 212',
          generatedBy: 'PAe',
          from: 2,
          to: 3,
          note: 'If VAT on payments applies, payment receipt status is sent into the public flow.',
          optional: true
        },
        {
          label: 'Payment visibility',
          document: 'Status 212 onward',
          generatedBy: 'PAe',
          from: 2,
          to: 4,
          note: 'Payment receipt status is also passed to the buyer-side platform where applicable.',
          optional: true
        }
      ]
    }
  ];

  const frenchCornerMessages = [
    {
      num: 1,
      from: 'Seller',
      to: 'PAe',
      label: 'Seller issues invoice',
      sublabel: 'Invoice prepared in the natural business system',
      charge: null,
      detail: 'The supplier instructs its accredited platform (PAe) to prepare and send the e-invoice.'
    },
    {
      num: 2,
      from: 'PAe',
      to: 'PAr',
      label: 'e-invoice delivered to buyer platform',
      sublabel: 'Primary invoice transmission',
      charge: 'both',
      detail: 'PAe transmits the e-invoice directly across to the buyer-side accredited platform PAr. Counts as 1 outbound (delivery) and 1 inbound (invoice receipt from PAe).'
    },
    {
      num: 3,
      from: 'PAe',
      to: 'PPF',
      label: 'Tax data sent to public portal',
      sublabel: 'Flow 1 - tax data subset',
      charge: 'outbound',
      detail: 'In parallel with delivery, PAe reports the invoice tax data subset to the PPF.'
    },
    {
      num: 4,
      from: 'PPF',
      to: 'PAe',
      label: 'Receipt message from PPF',
      sublabel: 'Status 250 accepted, or 500 technical error',
      charge: 'outbound',
      detail: 'PPF returns a receipt/status message to PAe. Several messages may be exchanged but the bundle is charged as 1 outbound transaction.'
    },
    {
      num: 5,
      from: 'PAr',
      to: 'PAe',
      label: 'Receipt and status messages',
      sublabel: 'Status 202 received and 203 made available',
      charge: 'both',
      detail: 'PAr returns lifecycle statuses to the seller-side platform. Several messages may go back and forth - charged as 1 outbound and 1 inbound transaction.'
    },
    {
      num: 6,
      from: 'PAr',
      to: 'Buyer',
      label: 'Invoice made available to buyer',
      sublabel: 'Buyer receipt',
      charge: null,
      detail: "PAr presents the invoice to the buyer's natural business system for downstream processing. Not separately charged - covered by the inbound charge on transaction 2."
    },
    {
      num: 7,
      from: 'PAr',
      to: 'PPF',
      label: 'Inbound purchase reporting',
      sublabel: 'e-reporting 10.1 - international B2B purchases',
      charge: null,
      detail: 'Where applicable, PAr reports inbound purchase data into the PPF on behalf of the buyer. Not separately charged.'
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

    <section class="map-panel france-panel">
      <div class="panel-head">
        <div>
          <span class="panel-kicker">French eInvoicing</span>
          <h2>Inbound and outbound transaction flow</h2>
        </div>
        <p>{frenchEinvoicingFlowSummary}</p>
      </div>

      <div class="flow-stack">
        <article class="flow-lane outbound-lane">
          <div class="flow-head">
            <div>
              <span class="flow-kicker">Outbound</span>
              <h3>Invoice issued by supplier</h3>
            </div>
            <div class="flow-badge">Commercially treated as 4 outbound transactions per invoice</div>
          </div>

          <div class="actor-strip">
            <span>Supplier</span>
            <span>PAe</span>
            <span>PPF</span>
            <span>PAr</span>
            <span>Buyer</span>
          </div>

          <div class="flow-grid">
            {#each frenchOutboundFlow as item}
              <article class={`flow-step ${item.optional ? 'optional' : ''}`}>
                <div class="flow-step-top">
                  <span class="step-number">{item.step}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.code}</small>
                  </div>
                </div>
                <div class="flow-meta">
                  <span><b>Instigated by</b> {item.initiatedBy}</span>
                  <span><b>Starts</b> {item.starts}</span>
                  <span><b>Ends</b> {item.ends}</span>
                </div>
                <p>{item.detail}</p>
              </article>
            {/each}
          </div>
        </article>

        <article class="flow-lane inbound-lane">
          <div class="flow-head">
            <div>
              <span class="flow-kicker">Inbound</span>
              <h3>Invoice received by buyer</h3>
            </div>
            <div class="flow-badge">Commercially treated as 2 inbound transactions per invoice</div>
          </div>

          <div class="actor-strip">
            <span>Supplier</span>
            <span>PAe</span>
            <span>PPF</span>
            <span>PAr</span>
            <span>Buyer</span>
          </div>

          <div class="flow-grid">
            {#each frenchInboundFlow as item}
              <article class={`flow-step ${item.optional ? 'optional' : ''}`}>
                <div class="flow-step-top">
                  <span class="step-number">{item.step}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.code}</small>
                  </div>
                </div>
                <div class="flow-meta">
                  <span><b>Instigated by</b> {item.initiatedBy}</span>
                  <span><b>Starts</b> {item.starts}</span>
                  <span><b>Ends</b> {item.ends}</span>
                </div>
                <p>{item.detail}</p>
              </article>
            {/each}
          </div>
        </article>
      </div>

      <p class="flow-note">
        Optional status updates such as refusal and rejection are shown separately. The billable transaction grouping is
        taken from the Arratech slide; the step-by-step start and end points above are inferred from that flow and the
        standard French Y-model roles.
      </p>

      <div class="ptp-panel">
        <div class="ptp-head">
          <div>
            <span class="flow-kicker">Process flow</span>
            <h3>Seller-to-buyer swimlane showing who generates each step and what is commercially chargeable</h3>
          </div>
          <p>
            This view follows the actual hand-off path across the French model. Each box shows who generated the step,
            where it travels, and whether it contributes to the commercially chargeable transaction bundle.
          </p>
        </div>

        <div class="swimlane-stack">
          {#each frenchProcessLanes as lane}
            <section class={`swimlane-panel ${lane.tone}`}>
              <div class="swimlane-head">
                <div>
                  <h3>{lane.title}</h3>
                  <p>{lane.subtitle}</p>
                </div>
                <div class="flow-badge">{lane.chargeSummary}</div>
              </div>

              <div class="swimlane-actors">
                {#each frenchActors as actor}
                  <span>{actor}</span>
                {/each}
              </div>

              <div class="swimlane-body">
                {#each frenchActors as _, index}
                  <div class="lane-guide" style={`grid-column:${index + 1}`}></div>
                {/each}

                {#each lane.steps as step, stepIndex}
                  <article
                    class={`swimlane-step ${step.chargeable ? 'chargeable' : ''} ${step.optional ? 'optional' : ''}`}
                    style={`grid-column:${step.from} / ${step.to + 1}; grid-row:${stepIndex + 1};`}
                  >
                    <div class="swimlane-step-head">
                      <div>
                        <strong>{step.title}</strong>
                        <small>Generated by {step.generatedBy}</small>
                      </div>
                      {#if step.chargeable}
                        <span class="charge-pill">{step.chargeLabel}</span>
                      {/if}
                    </div>
                    <div class="swimlane-route">
                      <span>{frenchActors[step.from - 1]}</span>
                      <span class="route-arrow" aria-hidden="true"></span>
                      <span>{frenchActors[step.to - 1]}</span>
                    </div>
                    <p>{step.note}</p>
                  </article>
                {/each}
              </div>
            </section>
          {/each}
        </div>

        <div class="sequence-stack">
          <div class="ptp-head">
            <div>
              <span class="flow-kicker">Process flow</span>
              <h3>Participant diagram with messages moving between the parties</h3>
            </div>
            <p>
              This is the visual process-flow version: each party sits on the canvas and the messages show exactly who
              sends what to whom, with the commercial charge called out on the relevant transmission.
            </p>
          </div>

          <section class="corner-flow-card">
            <div class="corner-diagram-frame">
              <svg
                class="corner-diagram-svg"
                viewBox="0 0 1000 620"
                role="img"
                aria-label="French e-invoicing participant flow diagram"
              >
                <defs>
                  <marker
                    id="cf-arrow-out"
                    markerWidth="12"
                    markerHeight="12"
                    refX="11"
                    refY="6"
                    orient="auto"
                    markerUnits="userSpaceOnUse"
                  >
                    <path d="M0,0 L12,6 L0,12 z" fill="#eb6028"></path>
                  </marker>
                  <marker
                    id="cf-arrow-in"
                    markerWidth="12"
                    markerHeight="12"
                    refX="11"
                    refY="6"
                    orient="auto"
                    markerUnits="userSpaceOnUse"
                  >
                    <path d="M0,0 L12,6 L0,12 z" fill="#0b7f77"></path>
                  </marker>
                  <marker
                    id="cf-arrow-ack"
                    markerWidth="12"
                    markerHeight="12"
                    refX="11"
                    refY="6"
                    orient="auto"
                    markerUnits="userSpaceOnUse"
                  >
                    <path d="M0,0 L12,6 L0,12 z" fill="#103a6a"></path>
                  </marker>
                  <linearGradient id="cf-split-fill" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="50%" stop-color="#eb6028"></stop>
                    <stop offset="50%" stop-color="#0b7f77"></stop>
                  </linearGradient>
                </defs>

                <rect
                  x="160"
                  y="95"
                  width="680"
                  height="430"
                  rx="14"
                  fill="none"
                  stroke="#103a6a"
                  stroke-opacity="0.06"
                  stroke-dasharray="4 6"
                ></rect>

                <g>
                  <rect x="340" y="5" width="320" height="230" rx="18" fill="#ffffff" stroke="#103a6a" stroke-opacity="0.18" stroke-width="1.5"></rect>

                  <circle cx="362" cy="27" r="12" fill="#fff5ef" stroke="#eb6028" stroke-width="2"></circle>
                  <text x="362" y="32" text-anchor="middle" fill="#eb6028" font-size="13" font-weight="900">£</text>
                  <text x="382" y="31" font-size="11" font-weight="800" fill="#103a6a" letter-spacing="1.4">CHARGEABLE TRANSACTIONS</text>

                  <line x1="358" y1="45" x2="642" y2="45" stroke="#103a6a" stroke-opacity="0.08" stroke-width="1"></line>

                  <text x="360" y="63" font-size="10" font-weight="800" fill="#a94917" letter-spacing="1.4">OUTBOUND · 4 PER INVOICE</text>

                  <circle cx="370" cy="81" r="10" fill="#eb6028"></circle>
                  <text x="370" y="85" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">2</text>
                  <text x="390" y="85" font-size="13" fill="#103a6a">e-invoice delivered to buyer platform</text>
                  <text x="650" y="85" text-anchor="end" font-size="12" font-weight="800" fill="#eb6028">x1</text>

                  <circle cx="370" cy="101" r="10" fill="#eb6028"></circle>
                  <text x="370" y="105" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">3</text>
                  <text x="390" y="105" font-size="13" fill="#103a6a">Tax data sent to public portal</text>
                  <text x="650" y="105" text-anchor="end" font-size="12" font-weight="800" fill="#eb6028">x1</text>

                  <circle cx="370" cy="121" r="10" fill="#eb6028"></circle>
                  <text x="370" y="125" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">4</text>
                  <text x="390" y="125" font-size="13" fill="#103a6a">Receipt message from PPF</text>
                  <text x="650" y="125" text-anchor="end" font-size="12" font-weight="800" fill="#eb6028">x1</text>

                  <circle cx="370" cy="141" r="10" fill="#eb6028"></circle>
                  <text x="370" y="145" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">5</text>
                  <text x="390" y="145" font-size="13" fill="#103a6a">Receipt and status messages</text>
                  <text x="650" y="145" text-anchor="end" font-size="12" font-weight="800" fill="#eb6028">x1</text>

                  <text x="360" y="171" font-size="10" font-weight="800" fill="#0b7f77" letter-spacing="1.4">INBOUND · 2 PER INVOICE</text>

                  <circle cx="370" cy="189" r="10" fill="#0b7f77"></circle>
                  <text x="370" y="193" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">2</text>
                  <text x="390" y="193" font-size="13" fill="#103a6a">Invoice receipt from PAe</text>
                  <text x="650" y="193" text-anchor="end" font-size="12" font-weight="800" fill="#0b7f77">x1</text>

                  <circle cx="370" cy="209" r="10" fill="#0b7f77"></circle>
                  <text x="370" y="213" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">5</text>
                  <text x="390" y="213" font-size="13" fill="#103a6a">Receipt message from PAr to PAe</text>
                  <text x="650" y="213" text-anchor="end" font-size="12" font-weight="800" fill="#0b7f77">x1</text>
                </g>

                <line x1="160" y1="155" x2="160" y2="445" stroke="#eb6028" stroke-width="3" marker-end="url(#cf-arrow-out)"></line>
                <line x1="285" y1="510" x2="715" y2="510" stroke="#eb6028" stroke-width="3" marker-end="url(#cf-arrow-out)"></line>
                <path d="M 260 450 Q 300 400 405 360" fill="none" stroke="#eb6028" stroke-width="3" marker-end="url(#cf-arrow-out)"></path>
                <path d="M 440 360 Q 360 440 280 490" fill="none" stroke="#eb6028" stroke-width="3" marker-end="url(#cf-arrow-out)"></path>
                <line x1="715" y1="555" x2="285" y2="555" stroke="#eb6028" stroke-width="3" marker-end="url(#cf-arrow-out)"></line>
                <line x1="840" y1="445" x2="840" y2="155" stroke="#0b7f77" stroke-width="3" marker-end="url(#cf-arrow-in)"></line>
                <path d="M 740 450 Q 700 400 595 360" fill="none" stroke="#0b7f77" stroke-width="3" marker-end="url(#cf-arrow-in)"></path>

                <g>
                  <circle cx="160" cy="300" r="18" fill="#eb6028"></circle>
                  <text x="160" y="306" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">1</text>
                </g>
                <g>
                  <circle cx="500" cy="510" r="18" fill="#eb6028"></circle>
                  <text x="500" y="516" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">2</text>
                  <circle cx="514" cy="496" r="11" fill="#fff" stroke="url(#cf-split-fill)" stroke-width="2"></circle>
                  <text x="514" y="501" text-anchor="middle" fill="url(#cf-split-fill)" font-size="14" font-weight="900">£</text>
                </g>
                <g>
                  <circle cx="316" cy="403" r="18" fill="#eb6028"></circle>
                  <text x="316" y="409" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">3</text>
                  <circle cx="330" cy="389" r="11" fill="#fff" stroke="#eb6028" stroke-width="2"></circle>
                  <text x="330" y="394" text-anchor="middle" fill="#eb6028" font-size="14" font-weight="900">£</text>
                </g>
                <g>
                  <circle cx="360" cy="433" r="18" fill="#eb6028"></circle>
                  <text x="360" y="439" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">4</text>
                  <circle cx="374" cy="419" r="11" fill="#fff" stroke="#eb6028" stroke-width="2"></circle>
                  <text x="374" y="424" text-anchor="middle" fill="#eb6028" font-size="14" font-weight="900">£</text>
                </g>
                <g>
                  <circle cx="500" cy="555" r="18" fill="#eb6028"></circle>
                  <text x="500" y="561" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">5</text>
                  <circle cx="514" cy="541" r="11" fill="#fff" stroke="url(#cf-split-fill)" stroke-width="2"></circle>
                  <text x="514" y="546" text-anchor="middle" fill="url(#cf-split-fill)" font-size="14" font-weight="900">£</text>
                </g>
                <g>
                  <circle cx="840" cy="300" r="18" fill="#0b7f77"></circle>
                  <text x="840" y="306" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">6</text>
                </g>
                <g>
                  <circle cx="684" cy="403" r="18" fill="#0b7f77"></circle>
                  <text x="684" y="409" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">7</text>
                </g>

                <g>
                  <rect x="40" y="35" width="240" height="120" rx="20" fill="#ffffff" stroke="#eb6028" stroke-opacity="0.35" stroke-width="1.5"></rect>
                  <text x="60" y="62" font-size="10" font-weight="800" fill="#a94917" letter-spacing="1.5">OUTBOUND</text>
                  <text x="60" y="92" font-size="20" font-weight="800" fill="#103a6a">Seller</text>
                  <text x="60" y="115" font-size="13" fill="#5b6573">Natural business system -</text>
                  <text x="60" y="132" font-size="13" fill="#5b6573">issues the invoice</text>
                </g>

                <g>
                  <rect x="40" y="445" width="240" height="140" rx="20" fill="#ffffff" stroke="#eb6028" stroke-opacity="0.35" stroke-width="1.5"></rect>
                  <text x="60" y="472" font-size="10" font-weight="800" fill="#a94917" letter-spacing="1.5">SELLER-SIDE PA</text>
                  <text x="60" y="502" font-size="20" font-weight="800" fill="#103a6a">PAe</text>
                  <text x="60" y="525" font-size="13" fill="#5b6573">Sends e-invoice to PAr and</text>
                  <text x="60" y="542" font-size="13" fill="#5b6573">reports tax data to PPF</text>
                  <text x="60" y="568" font-size="12" font-weight="700" fill="#a94917">4 outbound transactions / invoice</text>
                </g>

                <g>
                  <rect x="720" y="445" width="240" height="140" rx="20" fill="#ffffff" stroke="#0b7f77" stroke-opacity="0.35" stroke-width="1.5"></rect>
                  <text x="740" y="472" font-size="10" font-weight="800" fill="#0b7f77" letter-spacing="1.5">BUYER-SIDE PA</text>
                  <text x="740" y="502" font-size="20" font-weight="800" fill="#103a6a">PAr</text>
                  <text x="740" y="525" font-size="13" fill="#5b6573">Receives the invoice and</text>
                  <text x="740" y="542" font-size="13" fill="#5b6573">issues lifecycle statuses</text>
                  <text x="740" y="568" font-size="12" font-weight="700" fill="#0b7f77">2 inbound transactions / invoice</text>
                </g>

                <g>
                  <rect x="720" y="35" width="240" height="120" rx="20" fill="#ffffff" stroke="#0b7f77" stroke-opacity="0.35" stroke-width="1.5"></rect>
                  <text x="740" y="62" font-size="10" font-weight="800" fill="#0b7f77" letter-spacing="1.5">INBOUND</text>
                  <text x="740" y="92" font-size="20" font-weight="800" fill="#103a6a">Buyer</text>
                  <text x="740" y="115" font-size="13" fill="#5b6573">Natural business system -</text>
                  <text x="740" y="132" font-size="13" fill="#5b6573">processes the invoice</text>
                </g>

                <g>
                  <rect x="380" y="240" width="240" height="120" rx="20" fill="#f5f7fb" stroke="#103a6a" stroke-opacity="0.3" stroke-width="1.5"></rect>
                  <text x="400" y="267" font-size="10" font-weight="800" fill="#103a6a" letter-spacing="1.5">CENTRAL HUB · PUBLIC PORTAL</text>
                  <text x="400" y="297" font-size="20" font-weight="800" fill="#103a6a">PPF</text>
                  <text x="400" y="320" font-size="13" fill="#5b6573">Receives tax data and</text>
                  <text x="400" y="337" font-size="13" fill="#5b6573">e-reporting, returns acks</text>
                </g>
              </svg>
            </div>

            <ol class="corner-legend">
              {#each frenchCornerMessages as msg}
                <li class="corner-legend-item">
                  <span class={`legend-num ${msg.charge ?? 'ack'}`}>{msg.num}</span>
                  <div class="legend-body">
                    <div class="legend-head">
                      <span class="legend-route">{msg.from} &rarr; {msg.to}</span>
                      {#if msg.charge === 'outbound' || msg.charge === 'both'}
                        <span class="charge-pill">Chargeable outbound</span>
                      {/if}
                      {#if msg.charge === 'inbound' || msg.charge === 'both'}
                        <span class="charge-pill inbound">Chargeable inbound</span>
                      {/if}
                    </div>
                    <strong>{msg.label}</strong>
                    <small>{msg.sublabel}</small>
                    <p>{msg.detail}</p>
                  </div>
                </li>
              {/each}
            </ol>

            <p class="corner-footnote">
              Numbered arrows show the seven main messages. Transactions 2 and 5 carry both an outbound and an inbound charge on the same flow - shown by the split-colour £ badge. Optional flows (status 213 rejection, 210 refusal, 212 payment) are covered in the transmission diagram below.
            </p>
          </section>

          <div class="ptp-head">
            <div>
              <span class="flow-kicker">Transmission diagram</span>
              <h3>Point-to-point participant view with charge points shown on the document transmission</h3>
            </div>
            <p>
              This is the closest view to a classic process diagram: the parties stay fixed, the transmissions move
              between them, and the commercial charge is called out on the relevant message.
            </p>
          </div>

          {#each frenchTransmissionFlows as flow}
            <section class={`sequence-panel ${flow.tone}`}>
              <div class="swimlane-head">
                <div>
                  <h3>{flow.title}</h3>
                  <p>{flow.subtitle}</p>
                </div>
              </div>

              <div class="sequence-actors">
                {#each frenchActors as actor}
                  <span>{actor}</span>
                {/each}
              </div>

              <div class="sequence-body">
                {#each frenchActors as _, index}
                  <div class="sequence-guide" style={`grid-column:${index + 1}`}></div>
                {/each}

                {#each flow.transmissions as item, itemIndex}
                  <article class={`sequence-row ${item.optional ? 'optional' : ''}`} style={`grid-row:${itemIndex + 1};`}>
                    <div
                      class={`sequence-arrow ${item.from > item.to ? 'reverse' : 'forward'}`}
                      style={`grid-column:${Math.min(item.from, item.to)} / ${Math.max(item.from, item.to) + 1};`}
                    >
                      <div class="sequence-line"></div>
                      <div class="sequence-label">
                        <strong>{item.label}</strong>
                        <small>{item.document} · Generated by {item.generatedBy}</small>
                        {#if item.chargeable}
                          <span class="charge-pill">{item.chargeable}</span>
                        {/if}
                      </div>
                    </div>
                    <p>{item.note}</p>
                  </article>
                {/each}
              </div>
            </section>
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

  .france-panel {
    background:
      linear-gradient(135deg, rgba(16, 58, 106, 0.08), transparent 35%),
      rgba(255, 255, 255, 0.84);
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

  .ai-map .right .branch-card:nth-child(2)::after {
    top: 20%;
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

  .flow-stack {
    display: grid;
    gap: 18px;
  }

  .flow-lane {
    border-radius: 24px;
    border: 1px solid rgba(16, 58, 106, 0.08);
    background: rgba(255, 255, 255, 0.92);
    padding: 20px;
    box-shadow: inset 0 0 0 1px rgba(16, 58, 106, 0.03);
  }

  .outbound-lane {
    background:
      linear-gradient(135deg, rgba(235, 96, 40, 0.08), transparent 35%),
      rgba(255, 255, 255, 0.94);
  }

  .inbound-lane {
    background:
      linear-gradient(135deg, rgba(11, 127, 119, 0.08), transparent 35%),
      rgba(255, 255, 255, 0.94);
  }

  .flow-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 14px;
  }

  .flow-kicker {
    display: inline-block;
    margin-bottom: 8px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-dim);
  }

  .flow-badge {
    flex: 0 0 auto;
    border-radius: 999px;
    padding: 8px 12px;
    background: rgba(16, 58, 106, 0.08);
    color: var(--navy);
    font-size: 12px;
    font-weight: 700;
  }

  .actor-strip {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 8px;
    margin-bottom: 16px;
  }

  .actor-strip span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 34px;
    border-radius: 999px;
    background: rgba(16, 58, 106, 0.06);
    color: var(--navy);
    font-size: 12px;
    font-weight: 700;
  }

  .flow-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .flow-step {
    position: relative;
    border-radius: 20px;
    padding: 16px;
    border: 1px solid rgba(16, 58, 106, 0.08);
    background: rgba(255, 255, 255, 0.96);
    box-shadow: 0 10px 24px rgba(16, 41, 79, 0.06);
  }

  .flow-step.optional {
    background: linear-gradient(180deg, #fff 0%, #f8fafc 100%);
    border-style: dashed;
  }

  .flow-step-top {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
  }

  .flow-step-top strong {
    display: block;
    color: var(--navy);
    font-size: 16px;
    line-height: 1.25;
  }

  .flow-step-top small {
    display: block;
    margin-top: 4px;
    color: var(--text-dim);
    font-size: 12px;
    font-weight: 700;
  }

  .step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 999px;
    background: var(--navy);
    color: #fff;
    font-size: 13px;
    font-weight: 800;
  }

  .flow-meta {
    display: grid;
    gap: 6px;
    margin-bottom: 10px;
    color: var(--text);
    font-size: 13px;
  }

  .flow-meta b {
    margin-right: 6px;
    color: var(--navy);
  }

  .flow-step p,
  .flow-note {
    margin: 0;
    color: var(--text-dim);
    line-height: 1.55;
  }

  .flow-note {
    margin-top: 16px;
    font-size: 14px;
  }

  .ptp-panel {
    margin-top: 22px;
    border-top: 1px solid rgba(16, 58, 106, 0.08);
    padding-top: 22px;
    display: grid;
    gap: 18px;
  }

  .ptp-head {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
    gap: 18px;
    align-items: end;
  }

  .ptp-head h3 {
    margin: 6px 0 0;
  }

  .ptp-head p {
    margin: 0;
    color: var(--text-dim);
    line-height: 1.55;
  }

  .swimlane-stack {
    display: grid;
    gap: 18px;
  }

  .sequence-stack {
    display: grid;
    gap: 18px;
    margin-top: 18px;
    padding-top: 18px;
    border-top: 1px solid rgba(16, 58, 106, 0.08);
  }

  .corner-flow-card {
    border-radius: 24px;
    border: 1px solid rgba(16, 58, 106, 0.08);
    background:
      radial-gradient(circle at 50% 18%, rgba(16, 58, 106, 0.04), transparent 35%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(247, 250, 252, 0.96));
    padding: 24px;
    display: grid;
    gap: 22px;
  }

  .corner-diagram-frame {
    width: 100%;
    background: #ffffff;
    border-radius: 18px;
    border: 1px solid rgba(16, 58, 106, 0.06);
    padding: 14px;
    box-shadow: 0 10px 28px rgba(16, 41, 79, 0.06);
  }

  .corner-diagram-svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .corner-legend {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .corner-legend-item {
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 14px;
    align-items: start;
    padding: 14px 16px;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.98);
    border: 1px solid rgba(16, 58, 106, 0.08);
    box-shadow: 0 8px 18px rgba(16, 41, 79, 0.05);
  }

  .legend-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border-radius: 999px;
    color: #fff;
    font-weight: 800;
    font-size: 16px;
    background: #103a6a;
  }

  .legend-num.outbound { background: #eb6028; }
  .legend-num.inbound { background: #0b7f77; }
  .legend-num.ack { background: #103a6a; }
  .legend-num.both {
    background: linear-gradient(to right, #eb6028 50%, #0b7f77 50%);
  }

  .legend-body {
    display: grid;
    gap: 2px;
  }

  .legend-head {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-bottom: 6px;
  }

  .legend-route {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--navy);
    background: rgba(16, 58, 106, 0.08);
    padding: 4px 10px;
    border-radius: 999px;
  }

  .charge-pill.inbound {
    background: rgba(11, 127, 119, 0.14);
    color: #0b7f77;
  }

  .corner-legend-item strong {
    display: block;
    color: var(--navy);
    font-size: 15px;
    line-height: 1.3;
  }

  .corner-legend-item small {
    display: block;
    margin-top: 4px;
    color: var(--text-dim);
    font-size: 12px;
    font-weight: 700;
  }

  .corner-legend-item p {
    margin: 8px 0 0;
    color: var(--text-dim);
    font-size: 13px;
    line-height: 1.5;
  }

  .corner-footnote {
    margin: 0;
    padding: 12px 16px;
    background: rgba(16, 58, 106, 0.05);
    border-radius: 14px;
    color: var(--text-dim);
    font-size: 13px;
    line-height: 1.55;
  }

  .sequence-panel {
    border-radius: 22px;
    border: 1px solid rgba(16, 58, 106, 0.08);
    background: rgba(255, 255, 255, 0.94);
    padding: 18px;
  }

  .sequence-panel.outbound {
    background:
      linear-gradient(135deg, rgba(235, 96, 40, 0.06), transparent 28%),
      rgba(255, 255, 255, 0.94);
  }

  .sequence-panel.inbound {
    background:
      linear-gradient(135deg, rgba(11, 127, 119, 0.06), transparent 28%),
      rgba(255, 255, 255, 0.94);
  }

  .sequence-actors {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 14px;
  }

  .sequence-actors span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 52px;
    border-radius: 16px;
    background: rgba(16, 58, 106, 0.08);
    color: var(--navy);
    font-size: 12px;
    font-weight: 800;
    text-align: center;
    padding: 8px;
  }

  .sequence-body {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 14px 12px;
    position: relative;
  }

  .sequence-guide {
    grid-row: 1 / span 12;
    border-left: 1px dashed rgba(16, 58, 106, 0.12);
    margin-left: 6px;
  }

  .sequence-row {
    display: grid;
    grid-column: 1 / -1;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
    align-items: center;
    position: relative;
    z-index: 1;
  }

  .sequence-row.optional .sequence-label {
    border-style: dashed;
    background: rgba(248, 250, 252, 0.96);
  }

  .sequence-arrow {
    position: relative;
    min-height: 96px;
    display: grid;
    align-items: center;
  }

  .sequence-line {
    position: absolute;
    top: 50%;
    left: 12px;
    right: 12px;
    height: 3px;
    background: rgba(16, 58, 106, 0.18);
    transform: translateY(-50%);
  }

  .sequence-arrow::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 12px;
    width: 12px;
    height: 12px;
    border-top: 3px solid rgba(16, 58, 106, 0.32);
    border-right: 3px solid rgba(16, 58, 106, 0.32);
    transform: translateY(-50%) rotate(45deg);
  }

  .sequence-arrow.reverse::after {
    right: auto;
    left: 12px;
    border-right: 0;
    border-top: 0;
    border-left: 3px solid rgba(16, 58, 106, 0.32);
    border-bottom: 3px solid rgba(16, 58, 106, 0.32);
    transform: translateY(-50%) rotate(45deg);
  }

  .sequence-label {
    position: relative;
    z-index: 1;
    justify-self: center;
    max-width: 320px;
    border-radius: 18px;
    border: 1px solid rgba(16, 58, 106, 0.1);
    background: rgba(255, 255, 255, 0.98);
    padding: 12px 14px;
    box-shadow: 0 10px 24px rgba(16, 41, 79, 0.08);
    text-align: center;
  }

  .sequence-label strong {
    display: block;
    color: var(--navy);
    font-size: 15px;
    line-height: 1.25;
  }

  .sequence-label small {
    display: block;
    margin-top: 4px;
    color: var(--text-dim);
    font-size: 12px;
    font-weight: 700;
    line-height: 1.4;
  }

  .sequence-row p {
    grid-column: 1 / -1;
    margin: -4px 0 0;
    color: var(--text-dim);
    line-height: 1.5;
    font-size: 14px;
  }

  .swimlane-panel {
    border-radius: 22px;
    border: 1px solid rgba(16, 58, 106, 0.08);
    background: rgba(255, 255, 255, 0.92);
    padding: 18px;
    overflow: hidden;
  }

  .swimlane-panel.outbound {
    background:
      linear-gradient(135deg, rgba(235, 96, 40, 0.08), transparent 32%),
      rgba(255, 255, 255, 0.94);
  }

  .swimlane-panel.inbound {
    background:
      linear-gradient(135deg, rgba(11, 127, 119, 0.08), transparent 32%),
      rgba(255, 255, 255, 0.94);
  }

  .swimlane-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 14px;
  }

  .swimlane-head h3 {
    margin: 0 0 6px;
  }

  .swimlane-head p {
    margin: 0;
    color: var(--text-dim);
  }

  .swimlane-actors {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 14px;
  }

  .swimlane-actors span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 38px;
    border-radius: 14px;
    background: rgba(16, 58, 106, 0.08);
    color: var(--navy);
    font-size: 12px;
    font-weight: 800;
  }

  .swimlane-body {
    position: relative;
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 14px 12px;
    align-items: start;
  }

  .lane-guide {
    grid-row: 1 / span 12;
    min-height: 100%;
    border-left: 1px dashed rgba(16, 58, 106, 0.12);
    margin-left: 6px;
    pointer-events: none;
  }

  .swimlane-step {
    position: relative;
    z-index: 1;
    border-radius: 18px;
    border: 1px solid rgba(16, 58, 106, 0.08);
    background: rgba(255, 255, 255, 0.98);
    padding: 14px;
    box-shadow: 0 10px 24px rgba(16, 41, 79, 0.06);
  }

  .swimlane-step::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 16px;
    width: 22px;
    height: 10px;
    transform: translateY(-50%);
    clip-path: polygon(0 0, 72% 0, 72% -20%, 100% 50%, 72% 120%, 72% 100%, 0 100%, 18% 50%);
    background: rgba(16, 58, 106, 0.18);
  }

  .swimlane-step.chargeable {
    border-color: rgba(235, 96, 40, 0.24);
    box-shadow:
      0 12px 28px rgba(235, 96, 40, 0.1),
      inset 0 0 0 1px rgba(235, 96, 40, 0.08);
  }

  .swimlane-step.optional {
    border-style: dashed;
    background: rgba(248, 250, 252, 0.95);
  }

  .swimlane-step-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
  }

  .swimlane-step-head strong {
    display: block;
    color: var(--navy);
    font-size: 15px;
    line-height: 1.3;
  }

  .swimlane-step-head small {
    display: block;
    margin-top: 4px;
    color: var(--text-dim);
    font-size: 12px;
    font-weight: 700;
  }

  .charge-pill {
    flex: 0 0 auto;
    border-radius: 999px;
    padding: 6px 10px;
    background: rgba(235, 96, 40, 0.12);
    color: #a94917;
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .swimlane-route {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    color: var(--navy);
    font-size: 12px;
    font-weight: 800;
  }

  .route-arrow {
    width: 18px;
    height: 2px;
    background: currentColor;
    position: relative;
  }

  .route-arrow::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -1px;
    width: 8px;
    height: 8px;
    border-top: 2px solid currentColor;
    border-right: 2px solid currentColor;
    transform: translateY(-50%) rotate(45deg);
  }

  .swimlane-step p {
    margin: 0;
    color: var(--text-dim);
    line-height: 1.5;
    font-size: 14px;
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

    .flow-head,
    .flow-grid {
      grid-template-columns: 1fr;
    }

    .flow-head {
      display: grid;
    }

    .ptp-head,
    .swimlane-head,
    .swimlane-body,
    .swimlane-actors,
    .sequence-actors,
    .sequence-body,
    .sequence-row {
      grid-template-columns: 1fr;
    }

    .swimlane-head {
      display: grid;
    }

    .lane-guide {
      display: none;
    }

    .sequence-guide,
    .sequence-arrow,
    .sequence-row p {
      grid-column: 1 !important;
    }

    .swimlane-step {
      grid-column: 1 !important;
    }

    .corner-legend {
      grid-template-columns: 1fr;
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

    .actor-strip,
    .flow-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
