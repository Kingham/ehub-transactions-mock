<script>
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import {
    communityCashflowForecast,
    communityInsights,
    communityOutstandingInvoices,
    communityPriorityQueues,
    communityRemittanceFeed,
    communityRoleProfiles,
    communityTransactions
  } from '$lib/data.js';

  let activeTab = 'dashboard';
  let persona = 'receiver';
  let receiverRole = 'manager';
  let selectedApClerk = 'Amelia Clarke';
  let selectedPeriod = '30d';
  let selectedTransactionId = communityTransactions[0].id;
  let selectedReceiverSender = communityTransactions[0].party;
  let queryDetailTab = 'conversation';
  let transactionFilter = 'All';
  let statusFilter = 'All';
  let automationFilter = 'All';
  let pressureFocus = 'all';
  let workspaceSummary = 'All tracked Community queries';
  let workspaceItemsOverride = null;
  let workspaceOperationalContext = null;
  let pressureHelperOpen = false;
  let pressureDetailOpen = false;
  let slaDetailOpen = false;
  let selectedSlaInsight = null;
  let selectedSlaContext = null;
  let teamMetricDetailOpen = false;
  let selectedTeamMetricDetail = null;
  let heatmapMode = 'weekday';
  let responseTarget = '4 hours';
  let closureTarget = '2 days';
  let senderMandateBannerDismissed = false;
  let senderAssistantCustomer = 'Apex Retail UK';
  let expectedCashDetailOpen = false;
  let expectedCashSelection = null;
  let expectedCashView = 'timeline';
  let aiOpportunityDetailOpen = false;
  let selectedAiOpportunity = null;
  let receiverInsightsFocus = null;
  let aiSettingsFocus = 'knowledge-files';
  let selectedSenderQueryId = 'sender-query-1048';
  let senderQueryCustomerFilter = 'All';
  let senderQueryStatusFilter = 'All';
  let senderResponseNotification = 'Instant';
  let senderAwaitingNotification = 'Instant';
  let senderHoldNotification = 'Instant';
  let senderRemittanceNotification = 'Daily digest';
  let senderDeliveryChannel = 'Email and in-platform';
  let senderDigestTime = '08:00';
  let senderDefaultCustomerView = 'All Community customers';
  let senderDetailChangeArea = 'Company details';
  let senderDetailChangeField = 'Registered company name';
  let senderDetailChangeValue = '';
  let senderDetailChangeReason = '';
  let senderDetailChangeCustomer = 'All Community customers';
  let senderDetailChangeSubmitted = false;
  let senderDetailChangeRequests = [
    {
      reference: 'SUP-CHG-1042',
      area: 'Remittance contact',
      field: 'Accounts receivable email',
      proposed: 'ar-team@northwind-components.example',
      customer: 'Apex Retail UK',
      status: 'Under customer review',
      submitted: '28 May 2026'
    }
  ];
  let pendingSenderQueryReference = null;
  let receiverReplyText = '';
  let senderReplyText = '';
  let receiverExcludeFromEva = false;
  let senderExcludeFromEva = false;
  let uploadedInvoiceFileName = '';
  let receiverStatusDraft = 'In review';
  let senderStatusDraft = 'With customer';
  let receiverStatusDraftFor = '';
  let senderStatusDraftFor = '';
  let queryInteractionVersion = 0;
  let prioritySenderIds = ['Stonebridge Wholesale', 'Northwind Components'];
  let emailEvaResponseVisible = false;
  let senderPortfolioSearch = '';
  let senderOwnerOverrides = {};
  let clerkSenderScope = 'assigned';
  let workflowAutomationEnabled = true;
  let workflowStepCount = 3;
  let workflowSequenceSteps = [
    {
      sequence: 1,
      triggerDays: 1,
      action: 'Send email template',
      template: 'Payment overdue reminder',
      owner: 'Automation'
    },
    {
      sequence: 2,
      triggerDays: 5,
      action: 'Send email template',
      template: 'Second payment chase',
      owner: 'Automation'
    },
    {
      sequence: 3,
      triggerDays: 10,
      action: 'Escalate to human',
      template: 'Credit control escalation',
      owner: 'AP Query Team'
    }
  ];

  if (browser) {
    const params = new URLSearchParams(window.location.search);
    const personaParam = params.get('persona');
    const tabParam = params.get('tab');
    pendingSenderQueryReference = params.get('query');

    if (personaParam === 'email' || personaParam === 'sender' || personaParam === 'receiver') {
      persona = personaParam;
    }
    if (tabParam && ['dashboard', 'my-details', 'queries', 'senders', 'insights', 'settings'].includes(tabParam)) {
      activeTab = tabParam;
    }
  }

  const personas = [
    { id: 'email', label: 'Email' },
    { id: 'sender', label: 'Sender' },
    { id: 'receiver', label: 'Receiver' }
  ];
  const baseTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'my-details', label: 'My Details' },
    { id: 'queries', label: 'Queries' },
    { id: 'insights', label: 'Insights' },
    { id: 'settings', label: 'Settings' }
  ];
  const receiverManagerTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'queries', label: 'Queries' },
    { id: 'senders', label: 'Senders' },
    { id: 'insights', label: 'Insights' },
    { id: 'settings', label: 'Settings' }
  ];
  const receiverClerkTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'queries', label: 'Queries' },
    { id: 'senders', label: 'Senders' },
    { id: 'insights', label: 'Insights' }
  ];
  const receiverRoles = [
    { id: 'manager', label: 'AP Manager' },
    { id: 'clerk', label: 'AP Clerk' }
  ];
  const senderProfileDetails = {
    legalName: 'Northwind Components Ltd',
    tradingName: 'Northwind Components',
    supplierId: 'SUP-48291',
    registrationNumber: '08942711',
    vatNumber: 'GB 927 4812 44',
    onboardingStatus: 'Approved supplier',
    lastVerified: '18 May 2026',
    paymentTerms: 'Net 30',
    bankAccount: '**** **** **** 1842',
    remittanceEmail: 'remittance@northwind-components.example',
    primaryContact: 'Lena Morris',
    primaryEmail: 'lena.morris@northwind-components.example',
    financeContact: 'AR Team',
    financeEmail: 'ar@northwind-components.example',
    registeredAddress: '42 Charter Square, Leeds, LS1 4AP',
    invoiceAddress: 'Unit 8, Calder Business Park, Wakefield, WF2 7BJ'
  };
  const senderDetailChangeAreas = [
    'Company details',
    'Tax and registration',
    'Bank and remittance',
    'Contacts',
    'Addresses',
    'Trading status'
  ];
  const senderDetailChangeFields = [
    'Registered company name',
    'Trading name',
    'Company registration number',
    'VAT number',
    'Bank account',
    'Remittance email',
    'Primary contact',
    'Finance contact',
    'Registered address',
    'Invoice address',
    'Payment terms'
  ];
  const apClerkProfiles = [
    {
      name: 'Amelia Clarke',
      senders: ['Northwind Components', 'Stonebridge Wholesale', 'Harbor Freight Services', 'Summit Electrical'],
      focus: 'invoice holds, missing evidence, and payment-release queries'
    },
    {
      name: 'Priya Shah',
      senders: ['Vertex Industrial', 'Greenline Packaging', 'Central Trade Supply', 'Riverside Foods'],
      focus: 'pricing mismatches, payment timing, and remittance follow-up'
    },
    {
      name: 'Marcus Reed',
      senders: ['Bluewave Retail', 'Aptus Utilities', 'Metro Builders Group', 'Northgate Services', 'Greenline Wholesale'],
      focus: 'fulfilment exceptions, dispatch changes, and POD queries'
    }
  ];
  const emailPortalDemo = {
    sender: 'Sarah Mitchell',
    senderEmail: 'accounts@northwind-components.co.uk',
    company: 'Northwind Components',
    recipient: 'ap@openecx.example',
    subject: 'Payment status for invoice INV-24084',
    receivedAt: 'Today • 09:14',
    invoice: 'INV-24084',
    amount: '£18,420.00',
    portalLink: '/community?persona=sender&tab=queries',
    bypassWord: 'HUMAN'
  };
  const periodOptions = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '90d', label: 'Last 90 days' }
  ];
  const aiInsightFocusMeta = {
    'high-friction-escalations': {
      title: 'High-friction escalations in focus',
      summary: 'These are the repeat AI journeys where manual intervention is still doing too much of the work.'
    },
    'best-automation-opportunity': {
      title: 'Best automation opportunity in focus',
      summary: 'These queries already have a consistent answer pattern and are the best place to reduce manual workload next.'
    },
    'next-knowledge-update': {
      title: 'Next knowledge update in focus',
      summary: 'This is a repeated guidance gap that can be closed with targeted EVA knowledge before a query needs team handling.'
    },
    'teach-eva-from-closed-query-resolutions': {
      title: 'Teach EVA from closed resolutions',
      summary: 'These are closed manual answers that can be safely reused when the same question comes back again.'
    },
    'payment-date': {
      title: 'Payment date queries in focus',
      summary: 'This theme is surfacing often enough to justify a clearer payment and remittance answer path.'
    },
    'dispatch-status': {
      title: 'Dispatch status queries in focus',
      summary: 'These journeys need stronger milestone visibility before they become tracked queries.'
    },
    documents: {
      title: 'Document requests in focus',
      summary: 'The answer usually exists already but is not being surfaced quickly enough to the sender.'
    },
    beneficiary: {
      title: 'Beneficiary checks in focus',
      summary: 'These questions point to a repeat validation gap that should be handled with guided EVA content.'
    },
    'knowledge-update': {
      title: 'Knowledge update opportunities in focus',
      summary: 'These are the next topics that should be approved and published into EVA.'
    }
  };
  const defaultReceiverInsightFocusMeta = {
    title: 'Receiver insight focus',
    summary: 'Use this area to move from dashboard signals into the specific themes, queries, and data changes that will reduce future manual workload.'
  };

  const pressureDrivers = [
    {
      key: 'payment-holds',
      label: 'Payment holds',
      points: 32,
      basis: '8 critical held invoices with suppliers waiting on release'
    },
    {
      key: 'dispatch-delays',
      label: 'Dispatch delays',
      points: 20,
      basis: '5 high-priority orders beyond promised dispatch timing'
    },
    {
      key: 'open-queries',
      label: 'Open external queries',
      points: 22,
      basis: '11 medium-priority conversations waiting on customer or supplier response'
    }
  ];

  const pressureBands = [
    { label: 'Healthy', range: '0-39', note: 'Low backlog, limited chasing, and exceptions moving quickly.' },
    { label: 'Watchlist', range: '40-69', note: 'Some friction is building and teams should intervene early.' },
    { label: 'High', range: '70-100', note: 'External users are likely feeling delay, uncertainty, or increased chasing.' }
  ];

  const receiverPeriodMetrics = {
    '7d': {
      selfManaged: { value: '42', change: '31% of incoming queries closed through self-service' },
      managedInSystem: { value: '94', change: 'Portal and inbox queries tracked through Community' },
      outstanding: { value: '18', change: 'Still open at the end of the selected period' },
      avgResponse: { value: '3.4h', change: 'Average first response time for queries needing team follow-up' },
      valueSummary:
        'Resolved through self-service or automatic inbox answers before your team needed to step in.',
      topReasons: [
        { label: 'Inbox status and remittance answers', count: 18 },
        { label: 'Order and dispatch updates', count: 14 },
        { label: 'Document and POD requests', count: 10 }
      ]
    },
    '30d': {
      selfManaged: { value: '367', change: '67% of incoming queries closed through self-service' },
      managedInSystem: { value: '548', change: 'Portal and inbox queries tracked through Community' },
      outstanding: { value: '37', change: 'Still open and waiting for action or response' },
      avgResponse: { value: '4.1h', change: 'Average first response time for queries needing team follow-up' },
      valueSummary:
        'Resolved through self-service or automatic inbox answers before your team needed to step in.',
      topReasons: [
        { label: 'Inbox status and remittance answers', count: 74 },
        { label: 'Order and dispatch updates', count: 61 },
        { label: 'Document and POD requests', count: 51 }
      ]
    },
    '90d': {
      selfManaged: { value: '492', change: '36% of incoming queries closed through self-service' },
      managedInSystem: { value: '1,482', change: 'Portal and inbox queries tracked through Community' },
      outstanding: { value: '52', change: 'Current open balance after three months of activity' },
      avgResponse: { value: '4.6h', change: 'Average first response time for queries needing team follow-up' },
      valueSummary:
        'Resolved through self-service or automatic inbox answers before your team needed to step in.',
      topReasons: [
        { label: 'Inbox status and remittance answers', count: 201 },
        { label: 'Order and dispatch updates', count: 164 },
        { label: 'Document and POD requests', count: 127 }
      ]
    }
  };

  const receiverServiceMetrics = {
    '7d': {
      slaGroups: [
        {
          title: 'Responded within 4 hours',
          buckets: [
            { label: 'Green', value: '71', share: '78%', tone: 'good' },
            { label: 'Amber', value: '11', share: '12%', tone: 'high' },
            { label: 'Red', value: '9', share: '10%', tone: 'critical' }
          ]
        },
        {
          title: 'Resolved within 2 days',
          buckets: [
            { label: 'Green', value: '64', share: '72%', tone: 'good' },
            { label: 'Amber', value: '14', share: '16%', tone: 'high' },
            { label: 'Red', value: '11', share: '12%', tone: 'critical' }
          ]
        }
      ],
      metrics: [
        {
          title: 'Awaiting team response',
          value: '9',
          urgentValue: '4',
          urgentLabel: 'need attention in the next hour',
          summary: 'Queries waiting for a first team response',
          tone: 'high',
          key: 'awaiting-response'
        },
        {
          title: 'Still outstanding',
          value: '18',
          urgentValue: '7',
          urgentLabel: 'need attention today',
          summary: 'Queries still open and not yet fully resolved',
          tone: 'high',
          key: 'outstanding'
        },
        {
          title: 'Average first response',
          value: '3.4h',
          change: 'Down 0.6h over the last 30 days',
          tone: 'good'
        },
        {
          title: 'Average resolution time',
          value: '1.5d',
          change: 'Down 0.3d over the last 30 days',
          tone: 'good'
        }
      ]
    },
    '30d': {
      slaGroups: [
        {
          title: 'Responded within 4 hours',
          buckets: [
            { label: 'Green', value: '402', share: '73%', tone: 'good' },
            { label: 'Amber', value: '89', share: '16%', tone: 'high' },
            { label: 'Red', value: '57', share: '11%', tone: 'critical' }
          ]
        },
        {
          title: 'Resolved within 2 days',
          buckets: [
            { label: 'Green', value: '351', share: '64%', tone: 'good' },
            { label: 'Amber', value: '112', share: '20%', tone: 'high' },
            { label: 'Red', value: '85', share: '16%', tone: 'critical' }
          ]
        }
      ],
      metrics: [
        {
          title: 'Awaiting team response',
          value: '17',
          urgentValue: '8',
          urgentLabel: 'need attention in the next hour',
          summary: 'Queries waiting for a first team response',
          tone: 'high',
          key: 'awaiting-response'
        },
        {
          title: 'Still outstanding',
          value: '37',
          urgentValue: '14',
          urgentLabel: 'need attention today',
          summary: 'Queries still open and not yet fully resolved',
          tone: 'high',
          key: 'outstanding'
        },
        {
          title: 'Average first response',
          value: '4.1h',
          change: 'Down 0.4h over the last 30 days',
          tone: 'good'
        },
        {
          title: 'Average resolution time',
          value: '1.8d',
          change: 'Down 0.4d over the last 30 days',
          tone: 'good'
        }
      ]
    },
    '90d': {
      slaGroups: [
        {
          title: 'Responded within 4 hours',
          buckets: [
            { label: 'Green', value: '1,028', share: '69%', tone: 'good' },
            { label: 'Amber', value: '278', share: '19%', tone: 'high' },
            { label: 'Red', value: '176', share: '12%', tone: 'critical' }
          ]
        },
        {
          title: 'Resolved within 2 days',
          buckets: [
            { label: 'Green', value: '894', share: '60%', tone: 'good' },
            { label: 'Amber', value: '346', share: '23%', tone: 'high' },
            { label: 'Red', value: '242', share: '17%', tone: 'critical' }
          ]
        }
      ],
      metrics: [
        {
          title: 'Awaiting team response',
          value: '24',
          urgentValue: '10',
          urgentLabel: 'need attention in the next hour',
          summary: 'Queries waiting for a first team response',
          tone: 'high',
          key: 'awaiting-response'
        },
        {
          title: 'Still outstanding',
          value: '52',
          urgentValue: '21',
          urgentLabel: 'need attention today',
          summary: 'Queries still open and not yet fully resolved',
          tone: 'high',
          key: 'outstanding'
        },
        {
          title: 'Average first response',
          value: '4.6h',
          change: 'Down 0.2h over the last 30 days',
          tone: 'good'
        },
        {
          title: 'Average resolution time',
          value: '2.1d',
          change: 'Down 0.2d over the last 30 days',
          tone: 'good'
        }
      ]
    }
  };

  const receiverSlaInsights = {
    '7d': {
      response: {
        Green: {
          title: 'Responded within 4 hours',
          status: 'Green',
          count: '71 queries',
          summary: 'Mostly routine payment-date, remittance, and dispatch update questions answered quickly.',
          patterns: [
            'Peaks on Tuesday and Wednesday between 09:00 and 11:00.',
            'Most often from Blue Peak Supply and Eastline Retail.',
            'Usually clustered around remittance release days.'
          ],
          examples: ['Payment date confirmation', 'Copy remittance request', 'Dispatch ETA check']
        },
        Amber: {
          title: 'Responded within 4 hours',
          status: 'Amber',
          count: '11 queries',
          summary: 'These were responded to later in the day and are starting to show a repeat pattern.',
          patterns: [
            'Frequently late on month-end Mondays.',
            'Skews toward Northwind Components.',
            'Often linked to approval-chain or missing-document follow-up.'
          ],
          examples: ['Invoice approval progress', 'Missing POD follow-up', 'Dispatch exception update']
        },
        Red: {
          title: 'Responded within 4 hours',
          status: 'Red',
          count: '9 queries',
          summary: 'These missed the response target and should be reviewed for root cause.',
          patterns: [
            'Concentrated on the final three working days of the week.',
            'Often raised after 15:00 when team cover is lighter.',
            'High share from Vertex Wholesale.'
          ],
          examples: ['Tax mismatch dispute', 'Urgent payment hold challenge', 'Missing delivery evidence']
        }
      },
      closure: {
        Green: {
          title: 'Resolved within 2 days',
          status: 'Green',
          count: '64 queries',
          summary: 'Typically straightforward queries with a clear answer path and no dependency on third parties.',
          patterns: [
            'More likely for remittance and expected payment questions.',
            'Most closures happen within the same working day.',
            'Lower dependency on buyer-side approvals.'
          ],
          examples: ['Payment date confirmed', 'Remittance attached', 'Dispatch proof shared']
        },
        Amber: {
          title: 'Resolved within 2 days',
          status: 'Amber',
          count: '14 queries',
          summary: 'These close eventually but require extra chasing or supporting evidence.',
          patterns: [
            'Often tied to missing POD or mismatch questions.',
            'More common after bank-holiday weekends.',
            'Usually need one internal handoff before closure.'
          ],
          examples: ['POD clarification', 'Pricing discrepancy review', 'Delivery exception explanation']
        },
        Red: {
          title: 'Resolved within 2 days',
          status: 'Red',
          count: '11 queries',
          summary: 'These are the slowest to resolve and usually depend on repeated follow-up or internal exceptions.',
          patterns: [
            'Repeat issue around month end and payment-run cut-off.',
            'Strong concentration in Vertex Wholesale queries.',
            'Frequently linked to invoice holds and disputes.'
          ],
          examples: ['Held invoice dispute', 'Tax mismatch investigation', 'Unconfirmed goods receipt']
        }
      }
    },
    '30d': {
      response: {
        Green: {
          title: 'Responded within 4 hours',
          status: 'Green',
          count: '402 queries',
          summary: 'Fast-response workload is dominated by routine status, payment, and remittance requests.',
          patterns: [
            'Highest volume in the first week after month end.',
            'Peaks between 09:00 and 11:00 on Tuesdays and Thursdays.',
            'Mostly driven by larger-volume senders with lower query complexity.'
          ],
          examples: ['Payment date request', 'Remittance copy', 'Order status update']
        },
        Amber: {
          title: 'Responded within 4 hours',
          status: 'Amber',
          count: '89 queries',
          summary: 'Response target was nearly missed, often when the team was handling clustered follow-up work.',
          patterns: [
            'Frequently spikes on the first Monday and final Friday of the month.',
            'Higher share from Northwind Components and Southgate Foods.',
            'Often raised mid-afternoon after manual exception queues build.'
          ],
          examples: ['Approval progress request', 'Delayed dispatch follow-up', 'Missing POD check']
        },
        Red: {
          title: 'Responded within 4 hours',
          status: 'Red',
          count: '57 queries',
          summary: 'These missed target and are the best source of response-side trend analysis.',
          patterns: [
            'Strong concentration in the final five calendar days of the month.',
            'Most misses happen after 15:00 on Wednesdays and Fridays.',
            'Vertex Wholesale is consistently overrepresented.'
          ],
          examples: ['Urgent invoice hold', 'Pricing dispute escalation', 'Missing delivery evidence']
        }
      },
      closure: {
        Green: {
          title: 'Resolved within 2 days',
          status: 'Green',
          count: '351 queries',
          summary: 'Most quickly closed queries are repeatable question types that should continue shifting into self-service.',
          patterns: [
            'Remittance and payment-date questions dominate.',
            'Often resolved in one response when the right document is available.',
            'Higher closure success on Tuesdays through Thursdays.'
          ],
          examples: ['Remittance shared', 'Payment timing confirmed', 'Dispatch milestone explained']
        },
        Amber: {
          title: 'Resolved within 2 days',
          status: 'Amber',
          count: '112 queries',
          summary: 'These are not yet breaching badly, but they point to process friction and repeat manual handling.',
          patterns: [
            'Frequently linked to approval bottlenecks and POD clarification.',
            'Higher incidence in week one and week four of the month.',
            'Often requires a second internal touch before closure.'
          ],
          examples: ['Approval delay follow-up', 'POD validation', 'Dispatch promise slippage']
        },
        Red: {
          title: 'Resolved within 2 days',
          status: 'Red',
          count: '85 queries',
          summary: 'These are the queries most likely to cause repeat chasing and should be used for targeted process improvement.',
          patterns: [
            'Recurring concentration around payment-run deadlines.',
            'Same senders appear repeatedly, especially Vertex Wholesale.',
            'Often depend on disputes, missing evidence, or approval release.'
          ],
          examples: ['Tax mismatch dispute', 'Held invoice release', 'Unconfirmed delivery challenge']
        }
      }
    },
    '90d': {
      response: {
        Green: {
          title: 'Responded within 4 hours',
          status: 'Green',
          count: '1,028 queries',
          summary: 'Routine response handling is working well but still highly concentrated in predictable windows.',
          patterns: [
            'Peaks in the first seven days of each month.',
            'Morning demand is consistently strongest on Tuesdays and Thursdays.',
            'High-volume senders generate most of this workload, but at a low query rate.'
          ],
          examples: ['Payment timing', 'Remittance copy', 'Delivery status']
        },
        Amber: {
          title: 'Responded within 4 hours',
          status: 'Amber',
          count: '278 queries',
          summary: 'Borderline response queries show where resourcing starts to slip during known busy periods.',
          patterns: [
            'Regular build-up around month end and post-weekend Mondays.',
            'Commonly follows spikes in approval exceptions.',
            'Northwind and Southgate both contribute repeat workload here.'
          ],
          examples: ['Dispatch clarification', 'Approval progress', 'Missing document follow-up']
        },
        Red: {
          title: 'Responded within 4 hours',
          status: 'Red',
          count: '176 queries',
          summary: 'The missed-response cohort is large enough to expose recurring process and cover gaps.',
          patterns: [
            'Late-week afternoons are the most vulnerable.',
            'Same sender set appears repeatedly across the quarter.',
            'Often overlaps with payment holds and dispute handling.'
          ],
          examples: ['Invoice dispute', 'Urgent payment release', 'POD escalation']
        }
      },
      closure: {
        Green: {
          title: 'Resolved within 2 days',
          status: 'Green',
          count: '894 queries',
          summary: 'Quickly closed queries are stable and provide the strongest pool of knowledge to push into AI.',
          patterns: [
            'Payment and remittance topics remain the easiest to complete.',
            'Most are resolved with a single authoritative answer.',
            'Lower friction for senders with consistent document quality.'
          ],
          examples: ['Payment confirmed', 'Remittance issued', 'Status explanation']
        },
        Amber: {
          title: 'Resolved within 2 days',
          status: 'Amber',
          count: '346 queries',
          summary: 'These show the repeatable middle ground where better automation or process design would reduce manual handling.',
          patterns: [
            'Often tied to delivery proof and approval-chain lag.',
            'Spikes after long weekends and month-end cut-offs.',
            'Typically need multiple messages before resolution.'
          ],
          examples: ['POD follow-up', 'Approval delay', 'Dispatch exception']
        },
        Red: {
          title: 'Resolved within 2 days',
          status: 'Red',
          count: '242 queries',
          summary: 'This is the highest-friction cohort and should drive both process fixes and AI learning priorities.',
          patterns: [
            'Heavily concentrated around payment-run and reconciliation cycles.',
            'Same small group of senders generates a disproportionate share.',
            'Often blocked by third-party confirmation or dispute evidence.'
          ],
          examples: ['Tax dispute', 'Held payment challenge', 'Receipt mismatch investigation']
        }
      }
    }
  };

  const receiverQueryHeatmaps = {
    '7d': {
      weekday: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        columns: ['08-10', '10-12', '12-14', '14-16', '16-18', '18+'],
        values: [
          [6, 11, 8, 9, 7, 3],
          [7, 13, 10, 11, 8, 4],
          [8, 12, 11, 10, 8, 4],
          [7, 10, 9, 9, 7, 3],
          [9, 12, 10, 11, 9, 5],
          [2, 3, 2, 2, 1, 1]
        ]
      },
      monthday: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        columns: ['1-7', '8-14', '15-21', '22-31'],
        values: [
          [10, 7, 0, 0],
          [0, 11, 8, 0],
          [0, 0, 9, 7],
          [0, 0, 0, 12]
        ]
      }
    },
    '30d': {
      weekday: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        columns: ['08-10', '10-12', '12-14', '14-16', '16-18', '18+'],
        values: [
          [18, 24, 19, 21, 17, 8],
          [21, 28, 24, 23, 18, 9],
          [20, 27, 23, 25, 20, 11],
          [17, 25, 21, 22, 18, 9],
          [23, 29, 24, 26, 22, 12],
          [4, 6, 5, 5, 3, 2]
        ]
      },
      monthday: {
        labels: ['Month start', 'Week 2', 'Week 3', 'Month end'],
        columns: ['1-7', '8-14', '15-21', '22-31'],
        values: [
          [31, 0, 0, 0],
          [0, 24, 0, 0],
          [0, 0, 22, 0],
          [0, 0, 0, 36]
        ]
      }
    },
    '90d': {
      weekday: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        columns: ['08-10', '10-12', '12-14', '14-16', '16-18', '18+'],
        values: [
          [51, 68, 56, 58, 49, 22],
          [57, 74, 61, 63, 54, 24],
          [55, 72, 60, 66, 58, 27],
          [49, 69, 57, 60, 51, 23],
          [61, 78, 64, 70, 59, 29],
          [11, 14, 12, 11, 9, 5]
        ]
      },
      monthday: {
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month-end'],
        columns: ['1-7', '8-14', '15-21', '22-31'],
        values: [
          [86, 0, 0, 0],
          [0, 71, 0, 0],
          [0, 0, 66, 0],
          [0, 0, 0, 98]
        ]
      }
    }
  };

  const senderPeriodMetrics = {
    '7d': {
      tracked: { value: '28', change: 'Invoices and orders with live milestone visibility' },
      queriesRaised: { value: '12', change: 'Raised directly in Community instead of email chasing' },
      awaitingResponse: { value: '5', change: 'Queries and exceptions waiting for your update or supporting information' },
      remittances: { value: '9', change: 'Remittances received during the selected period' },
      expectedCash: { value: '£27.6k', change: 'Expected receipts visible for the selected period' },
      summary:
        'Live visibility into what is moving, what needs attention, what cash is likely to arrive soon, and which email queries were answered automatically.',
      focusItems: [
        'Invoice payment timing and remittance visibility',
        'Order dispatch and delivery update tracking',
        'Email and portal queries answered without waiting for a manual response'
      ]
    },
    '30d': {
      tracked: { value: '146', change: 'Invoices and orders with live milestone visibility' },
      queriesRaised: { value: '54', change: 'Raised directly in Community instead of email chasing' },
      awaitingResponse: { value: '17', change: 'Queries and exceptions waiting for your update or supporting information' },
      remittances: { value: '43', change: 'Remittances received during the selected period' },
      expectedCash: { value: '£84.7k', change: 'Expected receipts visible for the selected period' },
      summary:
        'Self-service access to updates, remittance information, expected cash, and automatic answers from your inbox.',
      focusItems: [
        'Payment dates, remittances, and expected settlement windows',
        'Order milestones and exception visibility without phoning support',
        'Email and portal questions answered or converted into tracked queries automatically'
      ]
    },
    '90d': {
      tracked: { value: '428', change: 'Invoices and orders with live milestone visibility' },
      queriesRaised: { value: '162', change: 'Raised directly in Community instead of email chasing' },
      awaitingResponse: { value: '39', change: 'Queries and exceptions waiting for your update or supporting information' },
      remittances: { value: '134', change: 'Remittances received during the selected period' },
      expectedCash: { value: '£241.3k', change: 'Expected receipts visible for the selected period' },
      summary:
        'A longer-term operational view of outcomes, exceptions, expected incoming cash, and inbox queries handled automatically.',
      focusItems: [
        'Longer-term remittance history and payment trend visibility',
        'Recurring order and invoice issue patterns surfaced earlier',
        'Repeat email questions deflected before they need manual follow-up'
      ]
    }
  };

  const senderInboxAssistant = {
    '7d': {
      autoAnswered: { value: '18', note: 'Email queries answered automatically with status, remittance, or document detail' },
      converted: { value: '7', note: 'Created as tracked queries when AI could not close the journey' },
      avgMessages: { value: '1.6', note: 'Average email turns before an answer was returned' },
      themes: [
        { label: 'Invoice status and payment timing', detail: 'Most often answered in the first reply' },
        { label: 'Remittance copy requests', detail: 'Closed automatically when remittance was already available' },
        { label: 'Delivery and POD follow-up', detail: 'Escalated only when supporting evidence was missing' }
      ]
    },
    '30d': {
      autoAnswered: { value: '74', note: 'Email queries answered automatically with status, remittance, or document detail' },
      converted: { value: '21', note: 'Created as tracked queries when AI could not close the journey' },
      avgMessages: { value: '1.8', note: 'Average email turns before an answer was returned' },
      themes: [
        { label: 'Invoice status and payment timing', detail: 'Largest source of automatic answers from the inbox' },
        { label: 'Remittance copy and settlement questions', detail: 'Usually closed without a manual reply' },
        { label: 'Delivery and POD follow-up', detail: 'Most likely to become tracked queries when documents are missing' }
      ]
    },
    '90d': {
      autoAnswered: { value: '201', note: 'Email queries answered automatically with status, remittance, or document detail' },
      converted: { value: '58', note: 'Created as tracked queries when AI could not close the journey' },
      avgMessages: { value: '1.9', note: 'Average email turns before an answer was returned' },
      themes: [
        { label: 'Invoice status and payment timing', detail: 'The most stable long-term inbox answer path' },
        { label: 'Remittance and expected payment questions', detail: 'Strong deflection opportunity with current data' },
        { label: 'Delivery and POD follow-up', detail: 'Still the main reason a sender email needs manual intervention' }
      ]
    }
  };

  const senderInvoiceActivity = {
    '7d': {
      submitted: { value: '28', note: 'Invoices submitted into Community customers this week' },
      submittedValue: { value: '£118.4k', note: 'Total value of recently sent invoices' },
      awaitingPayment: { value: '14', note: 'Invoices still awaiting approval or payment' },
      rows: [
        { reference: 'INV-24102', customer: 'Apex Retail UK', submittedAt: '16 May', amount: '£8,420', status: 'Approved for payment', note: 'Expected in the week of 20 May', tone: 'good' },
        { reference: 'INV-24108', customer: 'Metro Builders Group', submittedAt: '17 May', amount: '£5,960', status: 'Matching in progress', note: 'Three-way match still in progress', tone: 'medium' },
        { reference: 'INV-24111', customer: 'Greenline Wholesale', submittedAt: '18 May', amount: '£3,740', status: 'Query raised', note: 'Quantity variance under review', tone: 'high' },
        { reference: 'INV-24114', customer: 'Riverside Foods', submittedAt: '19 May', amount: '£6,180', status: 'Sent', note: 'Awaiting first processing update', tone: 'medium' }
      ]
    },
    '30d': {
      submitted: { value: '124', note: 'Invoices submitted across Community customers' },
      submittedValue: { value: '£512.8k', note: 'Total value sent into the selected period' },
      awaitingPayment: { value: '46', note: 'Invoices still awaiting approval, payment, or clarification' },
      rows: [
        { reference: 'INV-24084', customer: 'Apex Retail UK', submittedAt: '12 May', amount: '£12,640', status: 'Approved for payment', note: 'Expected settlement in the week of 27 May', tone: 'good' },
        { reference: 'INV-24091', customer: 'Greenline Wholesale', submittedAt: '13 May', amount: '£7,180', status: 'Scheduled for payment', note: 'Remittance expected before payment release', tone: 'good' },
        { reference: 'INV-24096', customer: 'Metro Builders Group', submittedAt: '15 May', amount: '£4,920', status: 'Matching in progress', note: 'Awaiting GRN confirmation', tone: 'medium' },
        { reference: 'INV-24099', customer: 'Northgate Services', submittedAt: '16 May', amount: '£9,560', status: 'Query raised', note: 'Pricing difference flagged by AP team', tone: 'high' },
        { reference: 'INV-24101', customer: 'South Coast Distribution', submittedAt: '17 May', amount: '£3,480', status: 'Sent', note: 'No exception currently shown', tone: 'medium' }
      ]
    },
    '90d': {
      submitted: { value: '358', note: 'Invoices submitted across Community customers' },
      submittedValue: { value: '£1.46m', note: 'Total invoice value sent into the selected period' },
      awaitingPayment: { value: '118', note: 'Invoices still awaiting approval, payment, or clarification' },
      rows: [
        { reference: 'INV-23984', customer: 'Apex Retail UK', submittedAt: '08 Apr', amount: '£16,280', status: 'Approved for payment', note: 'Settlement timing available from remittance data', tone: 'good' },
        { reference: 'INV-24007', customer: 'Metro Builders Group', submittedAt: '18 Apr', amount: '£6,940', status: 'Matching in progress', note: 'Still waiting on delivery confirmation', tone: 'medium' },
        { reference: 'INV-24031', customer: 'Vertex Industrial', submittedAt: '29 Apr', amount: '£4,180', status: 'Query raised', note: 'Beneficiary detail confirmation requested', tone: 'high' },
        { reference: 'INV-24062', customer: 'Riverside Foods', submittedAt: '07 May', amount: '£8,760', status: 'Scheduled for payment', note: 'Expected in the next remittance batch', tone: 'good' },
        { reference: 'INV-24099', customer: 'Northgate Services', submittedAt: '16 May', amount: '£9,560', status: 'Query raised', note: 'Pricing difference still under review', tone: 'high' }
      ]
    }
  };

  const senderCustomerBreakdown = {
    '7d': [
      { customer: 'Apex Retail UK', invoices: '9', value: '£34.6k', queries: '3', processing: '1', processingValue: '£4.6k', approved: '2', approvedValue: '£8.9k', remittanceIssued: '3', remittanceIssuedValue: '£12.2k', onHold: '1', onHoldValue: '£3.7k', inQuery: '2', inQueryValue: '£5.2k', note: 'Largest current invoice flow in view' },
      { customer: 'Metro Builders Group', invoices: '6', value: '£18.4k', queries: '2', processing: '1', processingValue: '£3.4k', approved: '1', approvedValue: '£4.8k', remittanceIssued: '1', remittanceIssuedValue: '£2.9k', onHold: '2', onHoldValue: '£4.7k', inQuery: '1', inQueryValue: '£2.6k', note: 'Most activity still in matching' },
      { customer: 'Greenline Wholesale', invoices: '5', value: '£14.9k', queries: '2', processing: '1', processingValue: '£3.2k', approved: '1', approvedValue: '£2.9k', remittanceIssued: '1', remittanceIssuedValue: '£3.1k', onHold: '1', onHoldValue: '£2.4k', inQuery: '1', inQueryValue: '£3.3k', note: 'Highest query rate this week' }
    ],
    '30d': [
      { customer: 'Apex Retail UK', invoices: '38', value: '£142.6k', queries: '9', processing: '6', processingValue: '£20.4k', approved: '8', approvedValue: '£31.2k', remittanceIssued: '12', remittanceIssuedValue: '£45.8k', onHold: '4', onHoldValue: '£14.6k', inQuery: '8', inQueryValue: '£30.6k', note: 'Your biggest Community customer in the selected period' },
      { customer: 'Greenline Wholesale', invoices: '26', value: '£94.1k', queries: '11', processing: '3', processingValue: '£11.2k', approved: '5', approvedValue: '£18.4k', remittanceIssued: '8', remittanceIssuedValue: '£27.1k', onHold: '3', onHoldValue: '£9.8k', inQuery: '7', inQueryValue: '£27.6k', note: 'Highest query volume relative to invoice count' },
      { customer: 'Metro Builders Group', invoices: '24', value: '£82.8k', queries: '7', processing: '3', processingValue: '£10.4k', approved: '6', approvedValue: '£19.6k', remittanceIssued: '6', remittanceIssuedValue: '£21.3k', onHold: '4', onHoldValue: '£13.1k', inQuery: '5', inQueryValue: '£18.4k', note: 'Strong throughput with some holds still in view' },
      { customer: 'Northgate Services', invoices: '18', value: '£66.2k', queries: '6', processing: '2', processingValue: '£8.7k', approved: '4', approvedValue: '£14.9k', remittanceIssued: '5', remittanceIssuedValue: '£18.8k', onHold: '2', onHoldValue: '£7.4k', inQuery: '5', inQueryValue: '£16.4k', note: 'Most recent manual query raised' }
    ],
    '90d': [
      { customer: 'Apex Retail UK', invoices: '96', value: '£381.4k', queries: '24', processing: '14', processingValue: '£49.8k', approved: '20', approvedValue: '£78.6k', remittanceIssued: '34', remittanceIssuedValue: '£138.2k', onHold: '10', onHoldValue: '£36.9k', inQuery: '18', inQueryValue: '£77.9k', note: 'Largest long-term payment relationship in view' },
      { customer: 'Greenline Wholesale', invoices: '72', value: '£248.9k', queries: '28', processing: '10', processingValue: '£31.8k', approved: '14', approvedValue: '£47.6k', remittanceIssued: '21', remittanceIssuedValue: '£73.4k', onHold: '9', onHoldValue: '£30.9k', inQuery: '18', inQueryValue: '£65.2k', note: 'Most query-heavy account relative to invoice volume' },
      { customer: 'Metro Builders Group', invoices: '63', value: '£221.8k', queries: '19', processing: '8', processingValue: '£24.9k', approved: '16', approvedValue: '£55.8k', remittanceIssued: '18', remittanceIssuedValue: '£66.7k', onHold: '8', onHoldValue: '£27.3k', inQuery: '13', inQueryValue: '£47.1k', note: 'Most stable processing pattern across the period' },
      { customer: 'Northgate Services', invoices: '44', value: '£156.7k', queries: '14', processing: '5', processingValue: '£16.8k', approved: '11', approvedValue: '£39.6k', remittanceIssued: '12', remittanceIssuedValue: '£45.2k', onHold: '5', onHoldValue: '£17.4k', inQuery: '11', inQueryValue: '£37.7k', note: 'Largest unresolved invoice value today' }
    ]
  };

  const senderRemittanceOpportunity = {
    '7d': {
      available: { value: '9', note: 'Remittances available for invoices in this period' },
      coveredValue: { value: '£22.4k', note: 'Payment value already supported by remittance detail' },
      expectedNext: { value: '4', note: 'Approved invoices where remittance is expected next based on customer payment patterns' },
      benefits: [
        'Receive remittance detail directly into your ERP instead of downloading and keying it manually.',
        'Improve cash application by matching remittance information earlier in the payment cycle.',
        'Use the same remittance data to strengthen your expected cash visibility.'
      ]
    },
    '30d': {
      available: { value: '43', note: 'Remittances available for invoices in this period' },
      coveredValue: { value: '£118.9k', note: 'Payment value already supported by remittance detail' },
      expectedNext: { value: '18', note: 'Approved invoices where remittance is expected next based on customer payment patterns' },
      benefits: [
        'Send remittance detail straight into your ERP to reduce manual cash allocation effort.',
        'Give finance teams earlier confirmation of what has been paid and how it should be matched.',
        'Turn remittance visibility on this screen into an operational feed that supports reconciliation.'
      ]
    },
    '90d': {
      available: { value: '134', note: 'Remittances available for invoices in this period' },
      coveredValue: { value: '£346.7k', note: 'Payment value already supported by remittance detail' },
      expectedNext: { value: '52', note: 'Approved invoices where remittance is expected next based on customer payment patterns' },
      benefits: [
        'Automate a larger share of remittance handling across multiple customers using the same ERP feed.',
        'Reduce manual reconciliation effort across high-volume paying customers.',
        'Create a clearer audit trail from remittance receipt through to cash posting.'
      ]
    }
  };

  const senderExpectedCashBreakdown = {
    '7d': {
      title: 'Expected cash breakdown',
      summary: 'Drill from month into week and day level receipt timing.',
      months: [
        {
          label: 'May 2026',
          total: 'GBP 27,600.00',
          weeks: [
            {
              label: 'Week of 04 May',
              total: 'GBP 27,600.00',
              days: [
                { label: '06 May', total: 'GBP 12,180.00', detail: 'Apex Retail UK, Greenline Wholesale, and Northgate Services' },
                { label: '07 May', total: 'GBP 9,460.00', detail: 'Metro Builders Group, Riverside Foods, and Apex Retail UK' },
                { label: '08 May', total: 'GBP 5,960.00', detail: 'Greenline Wholesale, Central Trade Supply, and Metro Builders Group' }
              ]
            }
          ]
        }
      ]
    },
    '30d': {
      title: 'Expected cash breakdown',
      summary: 'Drill from month into week and day level receipt timing.',
      months: [
        {
          label: 'May 2026',
          total: 'GBP 84,700.00',
          weeks: [
            {
              label: 'Week of 04 May',
              total: 'GBP 27,600.00',
              days: [
                { label: '06 May', total: 'GBP 12,180.00', detail: 'Apex Retail UK, Greenline Wholesale, and Northgate Services' },
                { label: '07 May', total: 'GBP 9,460.00', detail: 'Metro Builders Group, Riverside Foods, and Apex Retail UK' },
                { label: '08 May', total: 'GBP 5,960.00', detail: 'Greenline Wholesale, Central Trade Supply, and Metro Builders Group' }
              ]
            },
            {
              label: 'Week of 11 May',
              total: 'GBP 24,800.00',
              days: [
                { label: '12 May', total: 'GBP 8,900.00', detail: 'Apex Retail UK and South Coast Distribution' },
                { label: '14 May', total: 'GBP 7,740.00', detail: 'Metro Builders Group and Vertex Industrial' },
                { label: '16 May', total: 'GBP 8,160.00', detail: 'Greenline Wholesale and Riverside Foods' }
              ]
            },
            {
              label: 'Week of 18 May',
              total: 'GBP 18,900.00',
              days: [
                { label: '19 May', total: 'GBP 6,250.00', detail: 'Northgate Services and Blue Peak Supply' },
                { label: '21 May', total: 'GBP 5,480.00', detail: 'Apex Retail UK and Metro Builders Group' },
                { label: '23 May', total: 'GBP 7,170.00', detail: 'Central Trade Supply and Riverside Foods' }
              ]
            },
            {
              label: 'Week of 25 May',
              total: 'GBP 13,400.00',
              days: [
                { label: '27 May', total: 'GBP 4,960.00', detail: 'Greenline Wholesale and Vertex Industrial' },
                { label: '28 May', total: 'GBP 3,880.00', detail: 'South Coast Distribution' },
                { label: '30 May', total: 'GBP 4,560.00', detail: 'Apex Retail UK and Northgate Services' }
              ]
            }
          ]
        }
      ]
    },
    '90d': {
      title: 'Expected cash breakdown',
      summary: 'Drill from month into week and day level receipt timing.',
      months: [
        {
          label: 'May 2026',
          total: 'GBP 84,700.00',
          weeks: [
            {
              label: 'Week of 04 May',
              total: 'GBP 27,600.00',
              days: [
                { label: '06 May', total: 'GBP 12,180.00', detail: 'Apex Retail UK, Greenline Wholesale, and Northgate Services' },
                { label: '07 May', total: 'GBP 9,460.00', detail: 'Metro Builders Group, Riverside Foods, and Apex Retail UK' },
                { label: '08 May', total: 'GBP 5,960.00', detail: 'Greenline Wholesale, Central Trade Supply, and Metro Builders Group' }
              ]
            }
          ]
        },
        {
          label: 'June 2026',
          total: 'GBP 79,600.00',
          weeks: [
            {
              label: 'Week of 01 June',
              total: 'GBP 21,400.00',
              days: [
                { label: '02 June', total: 'GBP 7,240.00', detail: 'Northgate Services and Blue Peak Supply' },
                { label: '04 June', total: 'GBP 6,980.00', detail: 'Apex Retail UK and Riverside Foods' },
                { label: '05 June', total: 'GBP 7,180.00', detail: 'Vertex Industrial and Greenline Wholesale' }
              ]
            }
          ]
        },
        {
          label: 'July 2026',
          total: 'GBP 77,000.00',
          weeks: [
            {
              label: 'Week of 06 July',
              total: 'GBP 20,600.00',
              days: [
                { label: '07 July', total: 'GBP 6,840.00', detail: 'Apex Retail UK and Central Trade Supply' },
                { label: '09 July', total: 'GBP 7,120.00', detail: 'Metro Builders Group and Riverside Foods' },
                { label: '10 July', total: 'GBP 6,640.00', detail: 'Greenline Wholesale and Northgate Services' }
              ]
            }
          ]
        }
      ]
    }
  };

  const receiverSenderMix = {
    '7d': [
      {
        sender: 'Vertex Wholesale',
        transactions: 184,
        queries: 26,
        queryRate: '14.1%',
        context: 'Highest query rate in the period with repeat POD and dispatch issues.',
        tone: 'critical'
      },
      {
        sender: 'Northwind Components',
        transactions: 612,
        queries: 39,
        queryRate: '6.4%',
        context: 'Moderate volume but still above the expected query rate.',
        tone: 'high'
      },
      {
        sender: 'Blue Peak Supply',
        transactions: 1280,
        queries: 41,
        queryRate: '3.2%',
        context: 'Higher query count but relatively low against transaction volume.',
        tone: 'good'
      }
    ],
    '30d': [
      {
        sender: 'Vertex Wholesale',
        transactions: 782,
        queries: 93,
        queryRate: '11.9%',
        context: 'Low transaction volume relative to query load. Prioritise root-cause review.',
        tone: 'critical'
      },
      {
        sender: 'Northwind Components',
        transactions: 2140,
        queries: 146,
        queryRate: '6.8%',
        context: 'Material workload driver with repeat invoice and remittance questions.',
        tone: 'high'
      },
      {
        sender: 'Blue Peak Supply',
        transactions: 10480,
        queries: 118,
        queryRate: '1.1%',
        context: 'High transaction volume but low query rate. Lower priority for intervention.',
        tone: 'good'
      },
      {
        sender: 'Southgate Foods',
        transactions: 396,
        queries: 31,
        queryRate: '7.8%',
        context: 'Smaller sender base with disproportionate contact levels.',
        tone: 'high'
      }
    ],
    '90d': [
      {
        sender: 'Vertex Wholesale',
        transactions: 2316,
        queries: 286,
        queryRate: '12.3%',
        context: 'Persistent hotspot across the quarter. Needs targeted improvement plan.',
        tone: 'critical'
      },
      {
        sender: 'Northwind Components',
        transactions: 6480,
        queries: 402,
        queryRate: '6.2%',
        context: 'Still above target and responsible for a significant share of the queue.',
        tone: 'high'
      },
      {
        sender: 'Southgate Foods',
        transactions: 1142,
        queries: 92,
        queryRate: '8.1%',
        context: 'Small sender with elevated query dependency.',
        tone: 'high'
      },
      {
        sender: 'Blue Peak Supply',
        transactions: 30840,
        queries: 356,
        queryRate: '1.2%',
        context: 'Large-volume sender performing relatively cleanly.',
        tone: 'good'
      }
    ]
  };

  const receiverAiIntelligence = {
    '7d': {
      selfServed: { value: '42', change: '18 were resolved in a single message exchange', tone: 'good' },
      escalated: { value: '17', change: 'Converted into tracked queries after AI could not close them', tone: 'high' },
      avgMessages: { value: '2.3', change: 'Average sender messages before self-service answer was found', tone: 'medium' },
      promoteCount: { value: '6', change: 'Closed-query resolutions ready to be reused in future AI answers', tone: 'good' },
      categories: [
        { label: 'High-friction escalations', value: 'Tax mismatches and POD disputes', detail: '11 queries', tone: 'critical' },
        { label: 'Best automation opportunity', value: 'Dispatch ETA and delivery proof requests', detail: '6 resolutions to promote', tone: 'high' },
        { label: 'Next knowledge update', value: 'Supplier bank-detail validation and payment release guidance could have answered 4 queries automatically', detail: '4 queries point to the same missing guidance', tone: 'medium' },
        { label: 'Teach EVA from closed query resolutions', value: '3 escalated journeys were resolved manually with answers that can be reused automatically next time', detail: 'Ready for assisted learning', tone: 'good' }
      ]
    },
    '30d': {
      selfServed: { value: '367', change: '184 were resolved in a single message exchange', tone: 'good' },
      escalated: { value: '71', change: 'Converted into tracked queries after AI could not close them', tone: 'high' },
      avgMessages: { value: '2.8', change: 'Average sender messages before escalation or answer', tone: 'medium' },
      promoteCount: { value: '23', change: 'Closed-query resolutions ready to be reused in future AI answers', tone: 'good' },
      categories: [
        { label: 'High-friction escalations', value: 'Pricing disputes, tax mismatches, and POD gaps', detail: '38 queries', tone: 'critical' },
        { label: 'Best automation opportunity', value: 'Expected delivery windows and approval progress', detail: '23 resolutions to promote', tone: 'high' },
        { label: 'Next knowledge update', value: 'Beneficiary checks and payment release steps could have answered 11 queries automatically', detail: '11 queries point to the same missing guidance', tone: 'medium' },
        { label: 'Teach EVA from closed query resolutions', value: '19 escalated journeys were answered manually and could be replayed by EVA if the same question is asked again', detail: 'Resolution-led learning opportunity', tone: 'good' }
      ]
    },
    '90d': {
      selfServed: { value: '492', change: '241 were resolved in a single message exchange', tone: 'good' },
      escalated: { value: '208', change: 'Converted into tracked queries after AI could not close them', tone: 'high' },
      avgMessages: { value: '3.1', change: 'Average sender messages before escalation or answer', tone: 'medium' },
      promoteCount: { value: '58', change: 'Closed-query resolutions ready to be reused in future AI answers', tone: 'good' },
      categories: [
        { label: 'High-friction escalations', value: 'Multi-party disputes and missing document evidence', detail: '97 queries', tone: 'critical' },
        { label: 'Best automation opportunity', value: 'Dispatch exceptions and invoice approval blockers', detail: '58 resolutions to promote', tone: 'high' },
        { label: 'Next knowledge update', value: 'Bank-detail validation and payment release guidance could have answered 22 queries automatically', detail: '22 queries point to the same missing guidance', tone: 'medium' },
        { label: 'Teach EVA from closed query resolutions', value: '46 escalated journeys ended with reusable manual answers that could be surfaced automatically next time', detail: 'Resolution-led learning opportunity', tone: 'good' }
      ]
    }
  };

  const receiverUserBreakdown = {
    '7d': [
      {
        user: 'Holly Bennett',
        assigned: 22,
        closed: 18,
        responseSla: '95%',
        resolutionSla: '89%',
        avgResponse: '2.9h',
        avgResolution: '1.4d',
        outstanding: 4,
        nearBreach: 2
      },
      {
        user: 'Marcus Dean',
        assigned: 19,
        closed: 14,
        responseSla: '91%',
        resolutionSla: '84%',
        avgResponse: '3.5h',
        avgResolution: '1.8d',
        outstanding: 5,
        nearBreach: 2
      },
      {
        user: 'Priya Shah',
        assigned: 17,
        closed: 13,
        responseSla: '88%',
        resolutionSla: '82%',
        avgResponse: '3.8h',
        avgResolution: '1.9d',
        outstanding: 4,
        nearBreach: 1
      }
    ],
    '30d': [
      {
        user: 'Holly Bennett',
        assigned: 128,
        closed: 103,
        responseSla: '93%',
        resolutionSla: '87%',
        avgResponse: '3.2h',
        avgResolution: '1.6d',
        outstanding: 25,
        nearBreach: 7
      },
      {
        user: 'Marcus Dean',
        assigned: 116,
        closed: 89,
        responseSla: '89%',
        resolutionSla: '81%',
        avgResponse: '4.3h',
        avgResolution: '2.1d',
        outstanding: 27,
        nearBreach: 8
      },
      {
        user: 'Priya Shah',
        assigned: 97,
        closed: 76,
        responseSla: '91%',
        resolutionSla: '85%',
        avgResponse: '3.9h',
        avgResolution: '1.9d',
        outstanding: 21,
        nearBreach: 6
      },
      {
        user: 'Daniel Price',
        assigned: 84,
        closed: 58,
        responseSla: '84%',
        resolutionSla: '78%',
        avgResponse: '4.8h',
        avgResolution: '2.4d',
        outstanding: 26,
        nearBreach: 9
      }
    ],
    '90d': [
      {
        user: 'Holly Bennett',
        assigned: 366,
        closed: 298,
        responseSla: '92%',
        resolutionSla: '86%',
        avgResponse: '3.4h',
        avgResolution: '1.7d',
        outstanding: 68,
        nearBreach: 18
      },
      {
        user: 'Marcus Dean',
        assigned: 341,
        closed: 262,
        responseSla: '88%',
        resolutionSla: '80%',
        avgResponse: '4.5h',
        avgResolution: '2.3d',
        outstanding: 79,
        nearBreach: 22
      },
      {
        user: 'Priya Shah',
        assigned: 294,
        closed: 228,
        responseSla: '90%',
        resolutionSla: '84%',
        avgResponse: '4.0h',
        avgResolution: '2.0d',
        outstanding: 66,
        nearBreach: 17
      },
      {
        user: 'Daniel Price',
        assigned: 257,
        closed: 191,
        responseSla: '83%',
        resolutionSla: '77%',
        avgResponse: '5.0h',
        avgResolution: '2.6d',
        outstanding: 66,
        nearBreach: 19
      }
    ]
  };

  const receiverInsightData = {
    '7d': {
      overview: [
        { label: 'Queries needing manual handling', value: '58', note: '41% of logged queries still required team input' },
        { label: 'Repeat sender themes', value: '4', note: 'Senders driving recurring avoidable contact' },
        { label: 'AI answer gaps identified', value: '12', note: 'Resolution patterns suitable for knowledge updates' }
      ],
      themes: [
        { key: 'payment-date', label: 'Payment date and remittance timing', count: 18, share: '31%', trend: 'Peaks in the final three working days of the month', automation: 'Promote payment-run and remittance coverage into AI answers.' },
        { key: 'dispatch-status', label: 'Order and dispatch status', count: 14, share: '24%', trend: 'Concentrated on Mondays and post-cut-off dispatch days', automation: 'Answer from delivery milestones and promise dates before a query is logged.' },
        { key: 'documents', label: 'Document and POD requests', count: 10, share: '17%', trend: 'Mostly follow-up contact after an initial status answer', automation: 'Offer document retrieval paths directly in self-service.' }
      ],
      aiOpportunities: [
        { key: 'payment-run', label: 'Payment-run timing and remittance availability', count: 9, note: 'Most escalations only needed the latest payment-run or remittance position.' },
        { key: 'proof-of-delivery', label: 'Proof of delivery and missing attachments', count: 7, note: 'AI could deflect these when the right document links are available.' },
        { key: 'dispatch-promise', label: 'Dispatch promise and late-order follow-up', count: 6, note: 'Queries are often raised before the latest milestone has been surfaced clearly.' }
      ],
      senderPatterns: [
        { key: 'stonebridge', sender: 'Stonebridge Wholesale', rate: '12.5%', detail: '25 queries from 200 transactions', theme: 'Heavy POD and status chasing after delivery windows move.' },
        { key: 'vertex', sender: 'Vertex Industrial', rate: '3.1%', detail: '31 queries from 1,004 transactions', theme: 'Mostly payment-date and remittance visibility.' },
        { key: 'northwind', sender: 'Northwind Components', rate: '2.4%', detail: '18 queries from 742 transactions', theme: 'Beneficiary detail and payment-release checks.' }
      ],
      signals: [
        'Missed response SLAs cluster on Monday mornings and the first working day after month end.',
        'Document-related queries take the highest average message count before closure.',
        'Two sender themes account for most manual escalations: payment timing and POD requests.'
      ],
      knowledgeCandidates: [
        {
          key: 'next-knowledge-update',
          title: 'Supplier bank-detail validation and payment release guidance',
          count: 4,
          detail: 'Could have answered 4 queries automatically before they reached the team.',
          actionLabel: 'Publish knowledge update'
        },
        {
          key: 'teach-eva-from-closed-query-resolutions',
          title: 'Closed query answers ready for EVA reuse',
          count: 3,
          detail: '3 manual resolutions can be approved and replayed automatically next time the same question is asked.',
          actionLabel: 'Review closed resolutions'
        },
        {
          key: 'conversation-repair',
          title: 'Long conversations before escalation',
          count: 6,
          detail: '6 journeys crossed four or more messages before the team had to step in.',
          actionLabel: 'Review queries'
        }
      ]
    },
    '30d': {
      overview: [
        { label: 'Queries needing manual handling', value: '362', note: '66% of logged queries required team input or review' },
        { label: 'Repeat sender themes', value: '9', note: 'Common contact patterns concentrated in a small sender group' },
        { label: 'AI answer gaps identified', value: '41', note: 'Resolution types that could be promoted into future answers' }
      ],
      themes: [
        { key: 'payment-date', label: 'Payment date and remittance timing', count: 74, share: '20%', trend: 'Sharp rise in the final week of the month and after weekend payment runs', automation: 'Broaden AI coverage with payment-run calendars, remittance timings, and current settlement status.' },
        { key: 'dispatch-status', label: 'Order and dispatch status', count: 61, share: '17%', trend: 'Peaks on Mondays and around carrier cut-off times', automation: 'Surface the latest milestone and revised promise dates before users need to ask.' },
        { key: 'documents', label: 'Document and POD requests', count: 51, share: '14%', trend: 'More frequent after partial deliveries and invoice disputes', automation: 'Use document availability and retrieval links to answer without manual handling.' },
        { key: 'beneficiary', label: 'Beneficiary and bank detail checks', count: 33, share: '9%', trend: 'Spikes before payment releases and supplier master changes', automation: 'Guide users through validation steps and pre-release checks.' }
      ],
      aiOpportunities: [
        { key: 'payment-run', label: 'Payment-run timing and remittance availability', count: 22, note: 'These escalations usually only needed current payment timing and whether remittance had been issued.' },
        { key: 'proof-of-delivery', label: 'Proof of delivery and missing attachments', count: 19, note: 'The answer exists in attached evidence or document stores but is not yet easy to self-serve.' },
        { key: 'dispatch-promise', label: 'Dispatch promise and carrier exception follow-up', count: 17, note: 'Many users escalate after two or more back-and-forth messages on delayed shipments.' },
        { key: 'account-validation', label: 'Beneficiary validation and release checks', count: 11, note: 'A guided answer path would prevent unnecessary manual approvals.' }
      ],
      senderPatterns: [
        { key: 'stonebridge', sender: 'Stonebridge Wholesale', rate: '12.5%', detail: '25 queries from 200 transactions', theme: 'Disproportionate POD and short-shipment queries compared with transaction volume.' },
        { key: 'bluepeak', sender: 'Blue Peak Supply', rate: '7.2%', detail: '36 queries from 500 transactions', theme: 'Repeated follow-up on dispatch changes and incomplete document packs.' },
        { key: 'vertex', sender: 'Vertex Industrial', rate: '3.1%', detail: '31 queries from 1,004 transactions', theme: 'Mainly payment-date and remittance tracking.' }
      ],
      signals: [
        'Red response SLA misses are highest between 08:00 and 10:00 on Mondays.',
        'Payment-timing queries rise consistently in the last five calendar days of the month.',
        'Senders with low volume but high query rate are more likely to raise document and exception-related contact.',
        'Escalated AI journeys average 4.8 messages before manual intervention.'
      ],
      knowledgeCandidates: [
        {
          key: 'next-knowledge-update',
          title: 'Beneficiary checks and payment release steps',
          count: 11,
          detail: 'Could have answered 11 queries automatically before they reached manual handling.',
          actionLabel: 'Publish knowledge update'
        },
        {
          key: 'teach-eva-from-closed-query-resolutions',
          title: 'Closed query answers ready for EVA reuse',
          count: 19,
          detail: '19 manual resolutions can be approved and replayed automatically against the same question pattern.',
          actionLabel: 'Review closed resolutions'
        },
        {
          key: 'conversation-repair',
          title: 'Long conversations before escalation',
          count: 18,
          detail: '18 journeys crossed six or more messages before a user stepped in, suggesting missing guidance or weak answer confidence.',
          actionLabel: 'Review queries'
        }
      ]
    },
    '90d': {
      overview: [
        { label: 'Queries needing manual handling', value: '990', note: '64% of logged queries required team input or review' },
        { label: 'Repeat sender themes', value: '14', note: 'Established patterns by sender, timing, and query category' },
        { label: 'AI answer gaps identified', value: '96', note: 'Resolution patterns suitable for knowledge updates' }
      ],
      themes: [
        { key: 'payment-date', label: 'Payment date and remittance timing', count: 201, share: '20%', trend: 'Persistent month-end spike across all three months', automation: 'Prioritise payment and remittance visibility as a core AI answer path.' },
        { key: 'dispatch-status', label: 'Order and dispatch status', count: 164, share: '17%', trend: 'Steady weekly pattern with Monday and Friday pressure points', automation: 'Use promise-date changes and carrier milestones to answer before escalation.' },
        { key: 'documents', label: 'Document and POD requests', count: 127, share: '13%', trend: 'Most likely to escalate when document retrieval is not immediate', automation: 'Improve attachment indexing and answer links.' },
        { key: 'beneficiary', label: 'Beneficiary and bank detail checks', count: 84, share: '8%', trend: 'Clusters around payment release cycles and vendor master maintenance', automation: 'Provide guided validation and release status self-service.' }
      ],
      aiOpportunities: [
        { key: 'payment-run', label: 'Payment-run timing and remittance availability', count: 51, note: 'Largest long-run opportunity for deflection and faster answer confidence.' },
        { key: 'proof-of-delivery', label: 'Proof of delivery and missing attachments', count: 38, note: 'High-frequency repeat theme with clear document-backed answers.' },
        { key: 'dispatch-promise', label: 'Dispatch promise and carrier exception follow-up', count: 34, note: 'Most often escalated during weekly order peaks and late-afternoon chasing.' },
        { key: 'account-validation', label: 'Beneficiary validation and release checks', count: 22, note: 'Good candidate for guided workflows rather than manual handling.' }
      ],
      senderPatterns: [
        { key: 'stonebridge', sender: 'Stonebridge Wholesale', rate: '11.9%', detail: '71 queries from 596 transactions', theme: 'Consistent outlier for proof-of-delivery and short-shipment follow-up.' },
        { key: 'bluepeak', sender: 'Blue Peak Supply', rate: '7.4%', detail: '95 queries from 1,287 transactions', theme: 'High dispatch-change and missing-document volume.' },
        { key: 'southgate', sender: 'Southgate Foods', rate: '4.8%', detail: '62 queries from 1,281 transactions', theme: 'Payment timing and statement reconciliation themes.' }
      ],
      signals: [
        'Query pressure builds at month end, then carries into the first two working days of the new month.',
        'Document-related journeys are the most likely to move from self-service into manual handling.',
        'High-query senders are not always high-volume senders; outliers are mostly driven by process quality, not scale.',
        'Resolution themes reused by the team are stable enough to promote into AI knowledge safely.'
      ],
      knowledgeCandidates: [
        {
          key: 'next-knowledge-update',
          title: 'Bank-detail validation and payment release guidance',
          count: 22,
          detail: 'Could have answered 22 queries automatically before they reached manual handling.',
          actionLabel: 'Publish knowledge update'
        },
        {
          key: 'teach-eva-from-closed-query-resolutions',
          title: 'Closed query answers ready for EVA reuse',
          count: 46,
          detail: '46 manual resolutions can be approved and replayed automatically against the same question pattern.',
          actionLabel: 'Review closed resolutions'
        },
        {
          key: 'conversation-repair',
          title: 'Long conversations before escalation',
          count: 31,
          detail: '31 journeys crossed six or more messages before manual handling, indicating uncertainty in the current AI path.',
          actionLabel: 'Review queries'
        }
      ]
    }
  };

  const receiverAiDataSettings = {
    overview: [
      { label: 'Knowledge files available to EVA', value: '8', note: 'Approved guidance, process notes, and customer-specific playbooks' },
      { label: 'Transactional feeds enabled', value: '2', note: 'Live data sources already available to answer status, hold, and remittance questions' },
      { label: 'Closed resolutions ready to reuse', value: '19', note: 'Approved manual answers suitable for future AI responses in the current period' }
    ],
    sources: [
      {
        key: 'transactional-data',
        title: 'Transactional data',
        status: 'Live',
        summary: 'Allow EVA to use invoice, order, approval, hold, remittance, and dispatch data when answering sender questions.',
        detail: 'Currently includes live invoice status, approval state, payment hold flags, remittance issue status, and dispatch milestones.',
        actions: ['Manage scope', 'Preview fields']
      },
      {
        key: 'query-resolution-data',
        title: 'Query resolution data',
        status: 'Enabled for approved answers',
        summary: 'Allow EVA to learn from closed manual query resolutions once they have been reviewed and approved.',
        detail: 'Uses the original question, the human resolution, and the closure note so repeat journeys can be answered automatically next time.',
        actions: ['Review approvals', 'Set promotion rules']
      },
      {
        id: 'sender-query-1084',
        queryReference: 'QRY-1084',
        customer: 'Apex Retail UK',
        linkedInvoice: 'INV-24118',
        amount: '£6,840',
        status: 'With customer',
        statusTone: 'medium',
        issue: 'Invoice has failed matching and the customer needs to review the value against the matched PO.',
        channel: 'EVA escalated',
        openedAt: 'Today • 12:32',
        lastUpdated: 'Today • 12:33',
        waitingOn: 'Customer',
        owner: 'Apex Retail UK AP',
        sla: 'Customer review in progress',
        transactionStatus: 'Failed matching',
        nextStep: 'Waiting for the customer to confirm the additional product and why the invoice has not progressed.',
        submittedAt: '22 May 2026',
        documents: ['Query summary', 'Source invoice PDF'],
        actions: ['View thread', 'Add update', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24118', type: 'Invoice', status: 'Failed matching', amount: '£6,840', note: 'Invoice has failed matching while the customer reviews the invoice value against the currently matched PO value of £6,120.' }
        ],
        messages: [
          { author: 'You', time: 'Today • 12:32', text: 'I need help with an invoice for amount £6,840.' },
          { author: 'EVA', time: 'Today • 12:32', text: 'I found invoice INV-24118 and can see it is currently Failed matching with a currently matched PO value of £6,120.' },
          { author: 'You', time: 'Today • 12:33', text: 'Yes, the invoice value is correct. They asked for an extra product after the original order.' },
          { author: 'You', time: 'Today • 12:33', text: 'Please raise this with Apex Retail UK and ask them to confirm why it has not progressed.' }
        ],
        timeline: [
          { step: 'Query raised from EVA', at: 'Today • 12:32', state: 'done' },
          { step: 'Linked to invoice INV-24118', at: 'Today • 12:32', state: 'done' },
          { step: 'Additional product context added', at: 'Today • 12:33', state: 'done' },
          { step: 'Customer review requested', at: 'Today • 12:33', state: 'active' }
        ]
      },
      {
        id: 'sender-query-1091',
        queryReference: 'QRY-1091',
        customer: 'Apex Retail UK',
        linkedInvoice: 'INV-24118',
        amount: '£6,840',
        status: 'With customer',
        statusTone: 'medium',
        issue: 'Invoice has failed matching and has been raised for customer review after the sender confirmed the invoice value is correct.',
        channel: 'EVA escalated',
        openedAt: 'Today • 12:32',
        lastUpdated: 'Today • 12:34',
        waitingOn: 'Customer',
        owner: 'Apex Retail UK AP',
        sla: 'Customer review in progress',
        transactionStatus: 'Failed matching',
        nextStep: 'Waiting for Apex Retail UK to review the invoice against the matched PO and the additional product context.',
        submittedAt: '22 May 2026',
        documents: ['Query summary', 'Source invoice PDF'],
        actions: ['View thread', 'Add update', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24118', type: 'Invoice', status: 'Failed matching', amount: '£6,840', note: 'Invoice has failed matching while the customer reviews the invoice value against the currently matched PO value of £6,120.' }
        ],
        messages: [
          { author: 'You', time: 'Today • 12:32', text: 'I need help with an invoice for amount £6,840.' },
          { author: 'EVA', time: 'Today • 12:32', text: 'In the last couple of months I can only see 1 invoice for £6,840, invoice number INV-24118, that you sent to Apex Retail UK. It was received on 22 May and its current status is Failed matching. What would you like to know about it?' },
          { author: 'You', time: 'Today • 12:32', text: 'Why has it not moved on?' },
          { author: 'EVA', time: 'Today • 12:33', text: 'The invoice value is £6,840, but the matched PO value currently available is £6,120. I cannot tell from the transaction data alone whether this is an agreed change, a partial receipt, or an error. Do you believe the invoice value is correct?' },
          { author: 'You', time: 'Today • 12:33', text: 'Yes, the value is correct, they asked for an extra product after they ordered.' },
          { author: 'System', time: 'Today • 12:34', text: 'Query raised to Apex Retail UK with the linked transaction and summary from the EVA conversation.' }
        ],
        timeline: [
          { step: 'Query raised from EVA', at: 'Today • 12:32', state: 'done' },
          { step: 'Linked to invoice INV-24118', at: 'Today • 12:32', state: 'done' },
          { step: 'Additional product context added', at: 'Today • 12:33', state: 'done' },
          { step: 'Customer review requested', at: 'Today • 12:34', state: 'active' }
        ]
      }
    ],
    uploads: [
      { name: 'Payment release and beneficiary checks.pdf', type: 'Knowledge file', updated: 'Updated 2 days ago', status: 'Approved for EVA' },
      { name: 'Dispatch exception handling.docx', type: 'Knowledge file', updated: 'Updated 5 days ago', status: 'Approved for EVA' },
      { name: 'POD retrieval guide.pdf', type: 'Knowledge file', updated: 'Updated 1 week ago', status: 'Approved for EVA' },
      { name: 'Closed query resolution pack - payment timing', type: 'Query resolution data', updated: 'Synced this morning', status: '19 reusable answers in scope' }
    ]
  };

  const senderInsightData = {
    '7d': {
      overview: [
        { label: 'Queries raised', value: '12', note: 'Questions that still needed customer follow-up this week' },
        { label: 'Customers queried', value: '3', note: 'Community customers with at least one open or recent query' },
        { label: 'Most queried customer', value: 'Apex Retail UK', note: '4 queries raised this week' },
        { label: 'Average time between queries', value: '14h', note: 'How often a new query is being raised' }
      ],
      customerHotspots: [
        { customer: 'Apex Retail UK', count: '4', rate: '44% of queries', detail: '4 queries from 9 invoices submitted', note: 'Mostly approval and value-mismatch follow-up.' },
        { customer: 'Metro Builders Group', count: '3', rate: '33% of queries', detail: '3 queries from 6 invoices submitted', note: 'Most issues linked to POD and matching evidence.' },
        { customer: 'Greenline Wholesale', count: '2', rate: '22% of queries', detail: '2 queries from 5 invoices submitted', note: 'Queries are mainly about payment timing.' }
      ],
      themes: [
        { label: 'Invoice approval and PO mismatch', count: 4, note: 'Most common reason for a sender-raised query this week', help: 'Include agreed change-order detail or additional references when invoice values differ from the original PO.' },
        { label: 'Payment timing and remittances', count: 3, note: 'Often raised once invoices are already approved', help: 'Use the remittance and expected-cash views before raising a manual query.' },
        { label: 'Supporting document requests', count: 3, note: 'Usually linked to POD or missing proof', help: 'Attach delivery evidence earlier where possible to reduce matching delays.' }
      ],
      patterns: [
        'Most sender-raised queries this week came from two customers rather than being evenly spread.',
        'Value or approval-related questions tend to become manual queries faster than payment-date checks.',
        'Queries raised after a missing document message are the quickest opportunity to reduce chasing.'
      ],
      actions: [
        { title: 'Add more order-change context', detail: 'Where invoice values differ from the original PO, include a clear note about approved extras or amended scope.' },
        { title: 'Attach proof earlier', detail: 'POD and delivery evidence are still one of the fastest routes into manual query handling.' },
        { title: 'Use remittance visibility first', detail: 'Payment-date and remittance journeys are already strong self-service paths and should be checked before raising a query.' }
      ]
    },
    '30d': {
      overview: [
        { label: 'Queries raised', value: '54', note: 'Manual queries still raised in the selected period' },
        { label: 'Customers queried', value: '4', note: 'Community customers where follow-up was needed' },
        { label: 'Most queried customer', value: 'Greenline Wholesale', note: '11 queries raised this period' },
        { label: 'Average time between queries', value: '2.1d', note: 'How often a new query is being raised' }
      ],
      customerHotspots: [
        { customer: 'Greenline Wholesale', count: '11', rate: '42 per 100 invoices', detail: '11 queries from 26 invoices submitted', note: 'Highest query rate in the selected period.' },
        { customer: 'Apex Retail UK', count: '9', rate: '24 per 100 invoices', detail: '9 queries from 38 invoices submitted', note: 'Largest total volume of invoice and value-driven follow-up.' },
        { customer: 'Northgate Services', count: '6', rate: '33 per 100 invoices', detail: '6 queries from 18 invoices submitted', note: 'Pricing and approval questions are overrepresented here.' }
      ],
      themes: [
        { label: 'Invoice approval and PO mismatch', count: 18, note: 'Most common theme behind manual sender queries', help: 'Where orders change after submission, include the agreed delta so AP can see why the invoice is higher.' },
        { label: 'Payment timing and remittance follow-up', count: 14, note: 'Often raised late in the invoice lifecycle', help: 'Check expected cash and remittance availability first to avoid unnecessary chasing.' },
        { label: 'Missing POD or supporting documents', count: 11, note: 'Still a repeat reason for manual handling', help: 'Push supporting documents earlier into the process to shorten matching and approval time.' }
      ],
      patterns: [
        'A small number of customers generate most of the sender query volume.',
        'Approval and mismatch-related questions are more likely to become tracked queries than payment-date checks.',
        'Query volume increases where invoices move into processing without enough supporting context.'
      ],
      actions: [
        { title: 'Focus on your highest-query customers', detail: 'Start with Greenline Wholesale and Apex Retail UK, where the highest sender effort is currently concentrated.' },
        { title: 'Tighten invoice submission quality', detail: 'Clearer references, agreed change notes, and supporting evidence should reduce invoice-to-query conversion.' },
        { title: 'Use Community before chasing manually', detail: 'Payment timing, remittance, and basic status checks should move through EVA and self-service before a query is raised.' }
      ]
    },
    '90d': {
      overview: [
        { label: 'Queries raised', value: '138', note: 'Manual queries raised over the last 90 days' },
        { label: 'Customers queried', value: '4', note: 'Customers contributing to sender support workload' },
        { label: 'Most queried customer', value: 'Greenline Wholesale', note: '28 queries raised over 90 days' },
        { label: 'Average time between queries', value: '15h', note: 'How frequently a new query is being raised' }
      ],
      customerHotspots: [
        { customer: 'Greenline Wholesale', count: '28', rate: '39 per 100 invoices', detail: '28 queries from 72 invoices submitted', note: 'Most sustained source of sender query effort.' },
        { customer: 'Northgate Services', count: '14', rate: '32 per 100 invoices', detail: '14 queries from 44 invoices submitted', note: 'High level of pricing and review-related follow-up.' },
        { customer: 'Apex Retail UK', count: '24', rate: '25 per 100 invoices', detail: '24 queries from 96 invoices submitted', note: 'Largest absolute volume across the period.' }
      ],
      themes: [
        { label: 'Invoice approval and change-order mismatches', count: 43, note: 'Biggest long-run manual query driver', help: 'Where invoice values legitimately exceed the original PO, give that context earlier so AP does not have to query it later.' },
        { label: 'Payment timing, remittance, and expected cash', count: 36, note: 'High-volume but often avoidable if self-service is used first', help: 'Use the remittance and expected-cash tools more consistently before escalating to a tracked query.' },
        { label: 'Document and proof requests', count: 29, note: 'Still one of the most repeatable friction themes', help: 'Earlier attachment of POD, delivery evidence, or supporting notes should reduce repeat follow-up.' }
      ],
      patterns: [
        'Most sender effort is concentrated in a few customer relationships rather than across the whole portfolio.',
        'Invoice quality and supporting context are the biggest controllable drivers of query volume.',
        'Payment-date questions remain common, but they are also the clearest opportunity to avoid manual chasing through Community.'
      ],
      actions: [
        { title: 'Prioritise the noisiest customer relationships', detail: 'Review where your query rate is highest relative to invoice volume and tackle those workflows first.' },
        { title: 'Reduce invoice-to-query conversion', detail: 'Where invoices regularly move into query, improve the submission pack rather than accepting the same follow-up each month.' },
        { title: 'Lean on self-service for routine answers', detail: 'Expected cash, remittances, and status updates should continue moving away from manual query handling.' }
      ]
    }
  };

  const missingInvoiceSenderQuery = {
    id: 'sender-query-1098',
    queryReference: 'QRY-1098',
    customer: 'Apex Retail UK',
    linkedInvoice: 'INV-24142',
    amount: '£9,460',
    status: 'Awaiting your response',
    statusTone: 'high',
    issue: 'Apex Retail UK cannot locate the original invoice PDF and needs the sender to upload it before matching can continue.',
    channel: 'AP request',
    openedAt: 'Today • 09:42',
    lastUpdated: 'Today • 09:44',
    waitingOn: 'You',
    owner: 'Apex Retail UK AP',
    sla: 'Waiting for your upload',
    transactionStatus: 'Missing invoice',
    nextStep: 'Upload the invoice PDF so AP can validate the document and continue matching.',
    submittedAt: 'Missing from AP document store',
    documents: ['Query summary', 'Purchase order PO-7714'],
    actions: ['Upload invoice', 'View thread', 'Open PO'],
    uploadRequest: {
      title: 'Upload missing invoice',
      detail: 'Apex Retail UK has asked for the original invoice PDF before this query can move forward.',
      acceptedTypes: '.pdf,.doc,.docx,.jpg,.png'
    },
    relatedTransactions: [
      {
        reference: 'INV-24142',
        type: 'Invoice',
        status: 'Missing invoice',
        amount: '£9,460',
        note: 'AP has the PO and goods receipt but no source invoice document, so matching cannot continue until the supplier uploads it.'
      }
    ],
    messages: [
      { author: 'Apex Retail UK AP', time: 'Today • 09:42', text: 'We cannot locate the original invoice PDF for INV-24142. Please upload the invoice so we can continue matching.' },
      { author: 'EVA', time: 'Today • 09:43', text: 'This query is waiting for you to upload the missing invoice document.' }
    ],
    timeline: [
      { step: 'Missing invoice identified by AP', at: 'Today • 09:42', state: 'done' },
      { step: 'Query raised to sender', at: 'Today • 09:43', state: 'active' }
    ]
  };

  const missingInvoiceReceiverQuery = {
    id: 'receiver-query-1098',
    reference: 'QRY-1098',
    party: 'Northwind Components',
    counterparty: 'Apex Retail UK AP',
    type: 'Invoice',
    amount: '£9,460',
    status: 'Missing invoice',
    statusTone: 'high',
    issue: 'Original invoice PDF missing from AP document store',
    channel: 'Portal',
    openedAt: 'Today • 09:42',
    lastUpdated: 'Today • 09:44',
    waitingExternal: true,
    urgent: true,
    assignee: 'Amelia Clarke',
    nextMilestone: 'Waiting for sender invoice upload',
    nextEta: 'Due today',
    responseElapsed: '1h 12m',
    closureElapsed: '1h 12m',
    documents: ['Query summary', 'Purchase order PO-7714'],
    actions: ['Review upload request', 'Message sender', 'Open PO'],
    messages: [
      { author: 'Apex Retail UK AP', time: 'Today • 09:42', text: 'We cannot locate the original invoice PDF for INV-24142. Please upload the invoice so we can continue matching.' },
      { author: 'EVA', time: 'Today • 09:43', text: 'The sender has been asked to upload the missing invoice document.' }
    ],
    timeline: [
      { step: 'Missing invoice identified by AP', at: 'Today • 09:42', state: 'done' },
      { step: 'Query raised to sender', at: 'Today • 09:43', state: 'active' }
    ]
  };

  const automatedPaymentChaseQuery = {
    id: 'receiver-auto-query-1104',
    reference: 'QRY-1104',
    party: 'Riverside Foods',
    counterparty: 'Apex Retail UK Credit Control',
    type: 'Payment',
    amount: '£8,760',
    status: 'Automated chase active',
    statusTone: 'medium',
    issue: 'Payment for INV-24062 is overdue and the payment chase workflow has opened an automated query.',
    channel: 'Workflow sequence',
    openedAt: 'Today • 08:05',
    lastUpdated: 'Today • 08:07',
    waitingExternal: true,
    urgent: false,
    assignee: 'Automation',
    nextMilestone: 'Sequence 2 email sent to sender',
    nextEta: 'Escalate to AP Query Team if unpaid after 10 days',
    responseElapsed: '2h 18m',
    closureElapsed: '2h 18m',
    documents: ['Invoice INV-24062', 'Statement copy', 'Payment chase email log'],
    actions: ['Pause automation', 'Escalate manually', 'View invoice'],
    automatedSequence: {
      workflowName: 'Overdue payment chase',
      currentStep: 2,
      totalSteps: 3,
      status: 'Running',
      selfCloseCondition: 'Self-closes when payment is received or remittance confirms settlement.',
      lastAction: 'Second payment chase email sent',
      nextAction: 'Escalate to AP Query Team if still unpaid after 10 days'
    },
    messages: [
      { author: 'Workflow automation', time: '1 Jun 2026 • 08:05', text: 'Query opened because invoice INV-24062 was 1 day overdue and no payment confirmation had been received.' },
      { author: 'Workflow automation', time: '1 Jun 2026 • 08:06', text: 'Sequence 1 sent the first overdue reminder 1 day after the payment due date.' },
      { author: 'Workflow automation', time: 'Today • 08:07', text: 'Sequence 2 sent the second payment chase email 5 days after the payment due date using template "Second payment chase".' }
    ],
    timeline: [
      { step: 'Payment due date passed', at: '31 May 2026', state: 'done' },
      { step: 'Sequence 1 reminder sent', at: '1 Jun 2026 • 08:06', state: 'done' },
      { step: 'Sequence 2 chase sent', at: 'Today • 08:07', state: 'active' },
      { step: 'Sequence 3 escalation', at: '10 Jun 2026', state: 'next' },
      { step: 'Self-close on payment received', at: 'Pending', state: 'next' }
    ]
  };

  const automatedWorkflowQueries = [
    {
      id: 'receiver-auto-query-1107',
      reference: 'QRY-1107',
      party: 'Greenline Packaging',
      counterparty: 'Apex Retail UK Credit Control',
      type: 'Payment',
      amount: '£3,640',
      status: 'EVA checking remittance response',
      statusTone: 'medium',
      issue: 'The sender replied to the first automated chase and EVA is checking the remittance reference before the next sequence runs.',
      channel: 'Workflow sequence',
      openedAt: '4 Jun 2026 • 09:10',
      lastUpdated: 'Today • 10:34',
      waitingExternal: false,
      urgent: false,
      assignee: 'Automation',
      nextMilestone: 'EVA will check the remittance feed again tomorrow',
      nextEta: 'Send sequence 2 only if the remittance still cannot be matched',
      responseElapsed: '1d 01h',
      closureElapsed: '1d 01h',
      documents: ['Invoice INV-24094', 'Sender email reply', 'EVA handling transcript'],
      actions: ['Review EVA transcript', 'Take over conversation', 'View invoice'],
      automatedSequence: {
        workflowName: 'Overdue payment chase',
        currentStep: 1,
        totalSteps: 3,
        status: 'EVA checking inbound response',
        selfCloseCondition: 'Self-closes when payment is received or EVA confirms remittance against the invoice.',
        lastAction: 'EVA checked remittance reference GRP-88421 but could not yet see it in the cash allocation feed',
        nextAction: 'EVA will check again tomorrow before allowing the second chase to run'
      },
      messages: [
        { author: 'Workflow automation', time: '4 Jun 2026 • 09:10', text: 'Query opened because invoice INV-24094 was 1 day overdue and no payment confirmation had been received.' },
        { author: 'Workflow automation', time: '4 Jun 2026 • 09:11', text: 'Sequence 1 sent the first overdue reminder using template "Payment overdue reminder".' },
        { author: 'Greenline Packaging', time: 'Today • 10:12', text: 'We believe this was paid in yesterday\'s payment run. Can you check your bank receipts?' },
        { author: 'EVA', time: 'Today • 10:13', text: 'I checked the open cash allocation feed and cannot yet see a confirmed receipt for INV-24094. Please send the remittance reference or payment value and I will try to match it automatically.' },
        { author: 'Greenline Packaging', time: 'Today • 10:22', text: 'The remittance reference should be GRP-88421 for £3,640.' },
        { author: 'EVA', time: 'Today • 10:34', text: 'I have checked for remittance reference GRP-88421 and cannot see it in the cash allocation feed yet. I will check again tomorrow before sending any further chase.' }
      ],
      timeline: [
        { step: 'Payment due date passed', at: '3 Jun 2026', state: 'done' },
        { step: 'Sequence 1 reminder sent', at: '4 Jun 2026 • 09:11', state: 'done' },
        { step: 'Sender replied to automated chase', at: 'Today • 10:12', state: 'done' },
        { step: 'EVA checked remittance reference', at: 'Today • 10:34', state: 'active' },
        { step: 'EVA re-checks cash allocation feed', at: 'Tomorrow', state: 'next' },
        { step: 'Sequence 2 chase if still unmatched', at: '8 Jun 2026', state: 'next' }
      ]
    },
    automatedPaymentChaseQuery,
    {
      id: 'receiver-auto-query-1105',
      reference: 'QRY-1105',
      party: 'Northwind Components',
      counterparty: 'Apex Retail UK Credit Control',
      type: 'Payment',
      amount: '£4,920',
      status: 'Automated chase active',
      statusTone: 'medium',
      issue: 'Payment for INV-24088 is overdue and the first workflow reminder has been sent.',
      channel: 'Workflow sequence',
      openedAt: '4 Jun 2026 • 07:35',
      lastUpdated: '4 Jun 2026 • 07:36',
      waitingExternal: true,
      urgent: false,
      assignee: 'Automation',
      nextMilestone: 'Sequence 1 email sent to sender',
      nextEta: 'Send second reminder if unpaid after 5 days',
      responseElapsed: '3h 01m',
      closureElapsed: '3h 01m',
      documents: ['Invoice INV-24088', 'Statement copy', 'Payment chase email log'],
      actions: ['Pause automation', 'Escalate manually', 'View invoice'],
      automatedSequence: {
        workflowName: 'Overdue payment chase',
        currentStep: 1,
        totalSteps: 3,
        status: 'Running',
        selfCloseCondition: 'Self-closes when payment is received or remittance confirms settlement.',
        lastAction: 'First overdue payment reminder sent',
        nextAction: 'Send second payment chase if still unpaid after 5 days'
      },
      messages: [
        { author: 'Workflow automation', time: '4 Jun 2026 • 07:35', text: 'Query opened because invoice INV-24088 is overdue by 1 day and no remittance has been received.' },
        { author: 'Workflow automation', time: '4 Jun 2026 • 07:36', text: 'Sequence 1 sent the first overdue reminder using template "Payment overdue reminder".' }
      ],
      timeline: [
        { step: 'Payment due date passed', at: '3 Jun 2026', state: 'done' },
        { step: 'Sequence 1 reminder sent', at: '4 Jun 2026 • 07:36', state: 'active' },
        { step: 'Sequence 2 chase', at: '8 Jun 2026', state: 'next' },
        { step: 'Sequence 3 escalation', at: '13 Jun 2026', state: 'next' },
        { step: 'Self-close on payment received', at: 'Pending', state: 'next' }
      ]
    },
    {
      id: 'receiver-auto-query-1106',
      reference: 'QRY-1106',
      party: 'Stonebridge Wholesale',
      counterparty: 'Apex Retail UK Credit Control',
      type: 'Payment',
      amount: '£12,430',
      status: 'Escalated from automation',
      statusTone: 'high',
      issue: 'Payment for INV-24071 remains overdue after two automated chasers and now needs human review.',
      channel: 'Workflow sequence',
      openedAt: '27 May 2026 • 16:20',
      lastUpdated: 'Today • 09:05',
      waitingExternal: false,
      urgent: true,
      assignee: 'Amelia Clarke',
      nextMilestone: 'Human review required',
      nextEta: 'Confirm payment position with sender today',
      responseElapsed: '18h 45m',
      closureElapsed: '18h 45m',
      documents: ['Invoice INV-24071', 'Statement copy', 'Payment chase email log', 'Escalation summary'],
      actions: ['Review escalation', 'Message sender', 'View invoice'],
      automatedSequence: {
        workflowName: 'Overdue payment chase',
        currentStep: 3,
        totalSteps: 3,
        status: 'Escalated',
        selfCloseCondition: 'Self-closes when payment is received or remittance confirms settlement.',
        lastAction: 'Escalated to Amelia Clarke after the second chase received no payment confirmation',
        nextAction: 'Human owner to decide whether to pause, extend, or close the sequence'
      },
      messages: [
        { author: 'Workflow automation', time: '27 May 2026 • 16:20', text: 'Query opened because invoice INV-24071 was 1 day overdue and no payment confirmation had been received.' },
        { author: 'Workflow automation', time: '27 May 2026 • 16:21', text: 'Sequence 1 sent the first overdue reminder.' },
        { author: 'Workflow automation', time: '31 May 2026 • 08:15', text: 'Sequence 2 sent the second payment chase 5 days after the due date.' },
        { author: 'Workflow automation', time: 'Today • 09:05', text: 'Sequence 3 escalated this query to Amelia Clarke 10 days after the due date for manual intervention.' }
      ],
      timeline: [
        { step: 'Payment due date passed', at: '26 May 2026', state: 'done' },
        { step: 'Sequence 1 reminder sent', at: '27 May 2026 • 16:21', state: 'done' },
        { step: 'Sequence 2 chase sent', at: '31 May 2026 • 08:15', state: 'done' },
        { step: 'Sequence 3 human escalation', at: 'Today • 09:05', state: 'active' }
      ]
    }
  ];

  const senderQueryData = {
    '7d': [
      {
        id: 'sender-query-1048',
        queryReference: 'QRY-1048',
        customer: 'Apex Retail UK',
        linkedInvoice: 'INV-24076',
        amount: '£4,286',
        status: 'Awaiting your response',
        statusTone: 'high',
        issue: 'Customer needs an updated shipment date before releasing payment.',
        channel: 'EVA escalated',
        openedAt: '19 May 2026 • 09:12',
        lastUpdated: 'Today • 09:26',
        waitingOn: 'You',
        owner: 'Apex Retail UK AP',
        sla: 'Waiting for shipment update',
        transactionStatus: 'On hold',
        nextStep: 'Confirm when the replacement shipment will be sent.',
        submittedAt: '14 May 2026',
        documents: ['Invoice PDF', 'Delivery schedule', 'Query summary'],
        actions: ['Reply in query', 'Upload shipment update', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24076', type: 'Invoice', status: 'On hold', amount: '£4,286', note: 'Payment hold remains until the revised shipment date is confirmed.' },
          { reference: 'INV-24078', type: 'Invoice', status: 'Processing', amount: '£1,940', note: 'Second shipment is still moving through matching.' }
        ],
        messages: [
          { author: 'EVA', time: 'Today • 09:12', text: 'I found an open query linked to invoice INV-24076. The latest note asks when the replacement shipment will be sent.' },
          { author: 'Apex Retail UK AP', time: 'Today • 09:26', text: 'Please confirm the revised shipment date so we can reassess the payment hold.' }
        ],
        timeline: [
          { step: 'Query raised from EVA', at: '19 May 2026 • 09:12', state: 'done' },
          { step: 'Linked to invoice on hold', at: '19 May 2026 • 09:13', state: 'done' },
          { step: 'Customer requested shipment update', at: 'Today • 09:26', state: 'active' }
        ]
      },
      {
        id: 'sender-query-1054',
        queryReference: 'QRY-1054',
        customer: 'Greenline Wholesale',
        linkedInvoice: 'INV-24091',
        amount: '£7,180',
        status: 'With customer',
        statusTone: 'medium',
        issue: 'Payment timing query awaiting confirmation from AP.',
        channel: 'Email inbox',
        openedAt: '18 May 2026 • 14:08',
        lastUpdated: 'Yesterday • 16:42',
        waitingOn: 'Customer',
        owner: 'Greenline Wholesale AP',
        sla: 'With customer',
        transactionStatus: 'Approved',
        nextStep: 'Waiting for the confirmed payment run date.',
        submittedAt: '13 May 2026',
        documents: ['Invoice PDF', 'Approval trail'],
        actions: ['View thread', 'Send reminder', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24091', type: 'Invoice', status: 'Approved', amount: '£7,180', note: 'Approved and waiting for the next payment run date.' }
        ],
        messages: [
          { author: 'You', time: '18 May • 14:08', text: 'Can you confirm when invoice INV-24091 is due for payment?' },
          { author: 'Greenline Wholesale AP', time: 'Yesterday • 16:42', text: 'We are checking the next payment run and will update you shortly.' }
        ],
        timeline: [
          { step: 'Query created from inbox', at: '18 May 2026 • 14:08', state: 'done' },
          { step: 'Customer acknowledged query', at: 'Yesterday • 16:42', state: 'active' }
        ]
      },
      {
        id: 'sender-query-1059',
        queryReference: 'QRY-1059',
        customer: 'Metro Builders Group',
        linkedInvoice: 'INV-24108',
        amount: '£5,960',
        status: 'Closed',
        statusTone: 'good',
        issue: 'Three-way match delay resolved after GRN update.',
        channel: 'Portal',
        openedAt: '17 May 2026 • 11:40',
        lastUpdated: 'Yesterday • 10:14',
        waitingOn: 'Closed',
        owner: 'Metro Builders Group AP',
        sla: 'Closed',
        transactionStatus: 'Matching complete',
        nextStep: 'No further action needed.',
        submittedAt: '17 May 2026',
        documents: ['Invoice PDF', 'GRN reference'],
        actions: ['Open invoice', 'Download resolution'],
        relatedTransactions: [
          { reference: 'INV-24108', type: 'Invoice', status: 'Matching complete', amount: '£5,960', note: 'The final GRN was added and matching is complete.' }
        ],
        messages: [
          { author: 'You', time: '17 May • 11:40', text: 'Can you confirm whether INV-24108 is still matching?' },
          { author: 'Metro Builders Group AP', time: 'Yesterday • 10:14', text: 'GRN is now in and the invoice has moved forward.' }
        ],
        timeline: [
          { step: 'Query opened', at: '17 May 2026 • 11:40', state: 'done' },
          { step: 'Customer confirmed GRN update', at: 'Yesterday • 10:14', state: 'done' },
          { step: 'Query closed', at: 'Yesterday • 10:15', state: 'done' }
        ]
      },
      {
        id: 'sender-query-1084',
        queryReference: 'QRY-1084',
        customer: 'Apex Retail UK',
        linkedInvoice: 'INV-24118',
        amount: '£6,840',
        status: 'With customer',
        statusTone: 'medium',
        issue: 'Invoice has failed matching and the customer needs to review the value against the matched PO.',
        channel: 'EVA escalated',
        openedAt: 'Today • 12:32',
        lastUpdated: 'Today • 12:33',
        waitingOn: 'Customer',
        owner: 'Apex Retail UK AP',
        sla: 'Customer review in progress',
        transactionStatus: 'Failed matching',
        nextStep: 'Waiting for the customer to confirm the additional product and why the invoice has not progressed.',
        submittedAt: '22 May 2026',
        documents: ['Query summary', 'Source invoice PDF'],
        actions: ['View thread', 'Add update', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24118', type: 'Invoice', status: 'Failed matching', amount: '£6,840', note: 'Invoice has failed matching while the customer reviews the invoice value against the currently matched PO value of £6,120.' }
        ],
        messages: [
          { author: 'You', time: 'Today • 12:32', text: 'I need help with an invoice for amount £6,840.' },
          { author: 'EVA', time: 'Today • 12:32', text: 'I found invoice INV-24118 and can see it is currently Failed matching with a currently matched PO value of £6,120.' },
          { author: 'You', time: 'Today • 12:33', text: 'Yes, the invoice value is correct. They asked for an extra product after the original order.' },
          { author: 'You', time: 'Today • 12:33', text: 'Please raise this with Apex Retail UK and ask them to confirm why it has not progressed.' }
        ],
        timeline: [
          { step: 'Query raised from EVA', at: 'Today • 12:32', state: 'done' },
          { step: 'Linked to invoice INV-24118', at: 'Today • 12:32', state: 'done' },
          { step: 'Additional product context added', at: 'Today • 12:33', state: 'done' },
          { step: 'Customer review requested', at: 'Today • 12:33', state: 'active' }
        ]
      }
    ],
    '30d': [
      {
        id: 'sender-query-1048',
        queryReference: 'QRY-1048',
        customer: 'Apex Retail UK',
        linkedInvoice: 'INV-24076',
        amount: '£4,286',
        status: 'Awaiting your response',
        statusTone: 'high',
        issue: 'Customer needs an updated shipment date before releasing payment.',
        channel: 'EVA escalated',
        openedAt: '19 May 2026 • 09:12',
        lastUpdated: 'Today • 09:26',
        waitingOn: 'You',
        owner: 'Apex Retail UK AP',
        sla: 'Waiting for shipment update',
        transactionStatus: 'On hold',
        nextStep: 'Confirm when the replacement shipment will be sent.',
        submittedAt: '14 May 2026',
        documents: ['Invoice PDF', 'Delivery schedule', 'Query summary'],
        actions: ['Reply in query', 'Upload shipment update', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24076', type: 'Invoice', status: 'On hold', amount: '£4,286', note: 'Payment hold remains until the revised shipment date is confirmed.' },
          { reference: 'INV-24078', type: 'Invoice', status: 'Processing', amount: '£1,940', note: 'Second shipment is still moving through matching.' }
        ],
        messages: [
          { author: 'EVA', time: 'Today • 09:12', text: 'I found an open query linked to invoice INV-24076. The latest note asks when the replacement shipment will be sent.' },
          { author: 'Apex Retail UK AP', time: 'Today • 09:26', text: 'Please confirm the revised shipment date so we can reassess the payment hold.' }
        ],
        timeline: [
          { step: 'Query raised from EVA', at: '19 May 2026 • 09:12', state: 'done' },
          { step: 'Linked to invoice on hold', at: '19 May 2026 • 09:13', state: 'done' },
          { step: 'Customer requested shipment update', at: 'Today • 09:26', state: 'active' }
        ]
      },
      {
        id: 'sender-query-1054',
        queryReference: 'QRY-1054',
        customer: 'Greenline Wholesale',
        linkedInvoice: 'INV-24091',
        amount: '£7,180',
        status: 'With customer',
        statusTone: 'medium',
        issue: 'Payment timing query awaiting confirmation from AP.',
        channel: 'Email inbox',
        openedAt: '18 May 2026 • 14:08',
        lastUpdated: 'Yesterday • 16:42',
        waitingOn: 'Customer',
        owner: 'Greenline Wholesale AP',
        sla: 'With customer',
        transactionStatus: 'Approved',
        nextStep: 'Waiting for the confirmed payment run date.',
        submittedAt: '13 May 2026',
        documents: ['Invoice PDF', 'Approval trail'],
        actions: ['View thread', 'Send reminder', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24091', type: 'Invoice', status: 'Approved', amount: '£7,180', note: 'Approved and waiting for the next payment run date.' }
        ],
        messages: [
          { author: 'You', time: '18 May • 14:08', text: 'Can you confirm when invoice INV-24091 is due for payment?' },
          { author: 'Greenline Wholesale AP', time: 'Yesterday • 16:42', text: 'We are checking the next payment run and will update you shortly.' }
        ],
        timeline: [
          { step: 'Query created from inbox', at: '18 May 2026 • 14:08', state: 'done' },
          { step: 'Customer acknowledged query', at: 'Yesterday • 16:42', state: 'active' }
        ]
      },
      {
        id: 'sender-query-1061',
        queryReference: 'QRY-1061',
        customer: 'Northgate Services',
        linkedInvoice: 'INV-24099',
        amount: '£9,560',
        status: 'In review',
        statusTone: 'medium',
        issue: 'Pricing difference flagged by the AP team.',
        channel: 'Portal',
        openedAt: '16 May 2026 • 15:03',
        lastUpdated: 'Today • 08:11',
        waitingOn: 'Customer',
        owner: 'Northgate Services AP',
        sla: 'Updated this morning',
        transactionStatus: 'In query',
        nextStep: 'Customer is comparing the price to the PO.',
        submittedAt: '16 May 2026',
        documents: ['Invoice PDF', 'PO copy', 'Rate card'],
        actions: ['View thread', 'Upload supporting file', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24099', type: 'Invoice', status: 'In query', amount: '£9,560', note: 'The invoice is under pricing review.' },
          { reference: 'INV-24100', type: 'Invoice', status: 'Processing', amount: '£2,180', note: 'A second invoice on the same PO is still moving through validation.' }
        ],
        messages: [
          { author: 'Northgate Services AP', time: '16 May • 15:03', text: 'We have a pricing variance on INV-24099 and are reviewing it against the PO.' },
          { author: 'You', time: '16 May • 15:24', text: 'The invoice follows the agreed rate card. I have attached the latest copy.' },
          { author: 'Northgate Services AP', time: 'Today • 08:11', text: 'Thanks, this is back with the buyer for confirmation.' }
        ],
        timeline: [
          { step: 'Query opened', at: '16 May 2026 • 15:03', state: 'done' },
          { step: 'Supporting document added', at: '16 May 2026 • 15:24', state: 'done' },
          { step: 'Buyer review in progress', at: 'Today • 08:11', state: 'active' }
        ]
      },
      {
        id: 'sender-query-1068',
        queryReference: 'QRY-1068',
        customer: 'Metro Builders Group',
        linkedInvoice: 'INV-24096',
        amount: '£4,920',
        status: 'Awaiting your response',
        statusTone: 'high',
        issue: 'Customer has asked for a copy POD to complete matching.',
        channel: 'Email inbox',
        openedAt: '15 May 2026 • 10:17',
        lastUpdated: 'Today • 07:54',
        waitingOn: 'You',
        owner: 'Metro Builders Group AP',
        sla: 'Waiting for delivery update',
        transactionStatus: 'Matching in progress',
        nextStep: 'Upload the POD for the final delivery.',
        submittedAt: '15 May 2026',
        documents: ['Invoice PDF', 'Delivery note'],
        actions: ['Upload POD', 'Reply in query', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24096', type: 'Invoice', status: 'Matching in progress', amount: '£4,920', note: 'POD is still needed to complete matching.' }
        ],
        messages: [
          { author: 'Metro Builders Group AP', time: '15 May • 10:17', text: 'Please upload the POD for the final delivery against INV-24096.' },
          { author: 'You', time: '15 May • 11:01', text: 'We are retrieving the POD from the carrier.' },
          { author: 'Metro Builders Group AP', time: 'Today • 07:54', text: 'Please share the POD today if available so the match can be completed.' }
        ],
        timeline: [
          { step: 'Query created from email', at: '15 May 2026 • 10:17', state: 'done' },
          { step: 'Sender acknowledged request', at: '15 May 2026 • 11:01', state: 'done' },
          { step: 'POD still outstanding', at: 'Today • 07:54', state: 'active' }
        ]
      },
      {
        id: 'sender-query-1091',
        queryReference: 'QRY-1091',
        customer: 'Apex Retail UK',
        linkedInvoice: 'INV-24118',
        amount: '£6,840',
        status: 'With customer',
        statusTone: 'medium',
        issue: 'Invoice has failed matching and has been raised for customer review after the sender confirmed the invoice value is correct.',
        channel: 'EVA escalated',
        openedAt: 'Today • 12:32',
        lastUpdated: 'Today • 12:34',
        waitingOn: 'Customer',
        owner: 'Apex Retail UK AP',
        sla: 'Customer review in progress',
        transactionStatus: 'Failed matching',
        nextStep: 'Waiting for Apex Retail UK to review the invoice against the matched PO and the additional product context.',
        submittedAt: '22 May 2026',
        documents: ['Query summary', 'Source invoice PDF'],
        actions: ['View thread', 'Add update', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24118', type: 'Invoice', status: 'Failed matching', amount: '£6,840', note: 'Invoice has failed matching while the customer reviews the invoice value against the currently matched PO value of £6,120.' }
        ],
        messages: [
          { author: 'You', time: 'Today • 12:32', text: 'I need help with an invoice for amount £6,840.' },
          { author: 'EVA', time: 'Today • 12:32', text: 'In the last couple of months I can only see 1 invoice for £6,840, invoice number INV-24118, that you sent to Apex Retail UK. It was received on 22 May and its current status is Failed matching. What would you like to know about it?' },
          { author: 'You', time: 'Today • 12:32', text: 'Why has it not moved on?' },
          { author: 'EVA', time: 'Today • 12:33', text: 'The invoice value is £6,840, but the matched PO value currently available is £6,120. I cannot tell from the transaction data alone whether this is an agreed change, a partial receipt, or an error. Do you believe the invoice value is correct?' },
          { author: 'You', time: 'Today • 12:33', text: 'Yes, the value is correct, they asked for an extra product after they ordered.' },
          { author: 'System', time: 'Today • 12:34', text: 'Query raised to Apex Retail UK with the linked transaction and summary from the EVA conversation.' }
        ],
        timeline: [
          { step: 'Query raised from EVA', at: 'Today • 12:32', state: 'done' },
          { step: 'Linked to invoice INV-24118', at: 'Today • 12:32', state: 'done' },
          { step: 'Additional product context added', at: 'Today • 12:33', state: 'done' },
          { step: 'Customer review requested', at: 'Today • 12:34', state: 'active' }
        ]
      }
    ],
    '90d': [
      {
        id: 'sender-query-1048',
        queryReference: 'QRY-1048',
        customer: 'Apex Retail UK',
        linkedInvoice: 'INV-24076',
        amount: '£4,286',
        status: 'Awaiting your response',
        statusTone: 'high',
        issue: 'Customer needs an updated shipment date before releasing payment.',
        channel: 'EVA escalated',
        openedAt: '19 May 2026 • 09:12',
        lastUpdated: 'Today • 09:26',
        waitingOn: 'You',
        owner: 'Apex Retail UK AP',
        sla: 'Waiting for shipment update',
        transactionStatus: 'On hold',
        nextStep: 'Confirm when the replacement shipment will be sent.',
        submittedAt: '14 May 2026',
        documents: ['Invoice PDF', 'Delivery schedule', 'Query summary'],
        actions: ['Reply in query', 'Upload shipment update', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24076', type: 'Invoice', status: 'On hold', amount: '£4,286', note: 'Payment hold remains until the revised shipment date is confirmed.' },
          { reference: 'INV-24078', type: 'Invoice', status: 'Processing', amount: '£1,940', note: 'Second shipment is still moving through matching.' }
        ],
        messages: [
          { author: 'EVA', time: 'Today • 09:12', text: 'I found an open query linked to invoice INV-24076. The latest note asks when the replacement shipment will be sent.' },
          { author: 'Apex Retail UK AP', time: 'Today • 09:26', text: 'Please confirm the revised shipment date so we can reassess the payment hold.' }
        ],
        timeline: [
          { step: 'Query raised from EVA', at: '19 May 2026 • 09:12', state: 'done' },
          { step: 'Linked to invoice on hold', at: '19 May 2026 • 09:13', state: 'done' },
          { step: 'Customer requested shipment update', at: 'Today • 09:26', state: 'active' }
        ]
      },
      {
        id: 'sender-query-1054',
        queryReference: 'QRY-1054',
        customer: 'Greenline Wholesale',
        linkedInvoice: 'INV-24091',
        amount: '£7,180',
        status: 'With customer',
        statusTone: 'medium',
        issue: 'Payment timing query awaiting confirmation from AP.',
        channel: 'Email inbox',
        openedAt: '18 May 2026 • 14:08',
        lastUpdated: 'Yesterday • 16:42',
        waitingOn: 'Customer',
        owner: 'Greenline Wholesale AP',
        sla: 'With customer',
        transactionStatus: 'Approved',
        nextStep: 'Waiting for the confirmed payment run date.',
        submittedAt: '13 May 2026',
        documents: ['Invoice PDF', 'Approval trail'],
        actions: ['View thread', 'Send reminder', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24091', type: 'Invoice', status: 'Approved', amount: '£7,180', note: 'Approved and waiting for the next payment run date.' }
        ],
        messages: [
          { author: 'You', time: '18 May • 14:08', text: 'Can you confirm when invoice INV-24091 is due for payment?' },
          { author: 'Greenline Wholesale AP', time: 'Yesterday • 16:42', text: 'We are checking the next payment run and will update you shortly.' }
        ],
        timeline: [
          { step: 'Query created from inbox', at: '18 May 2026 • 14:08', state: 'done' },
          { step: 'Customer acknowledged query', at: 'Yesterday • 16:42', state: 'active' }
        ]
      },
      {
        id: 'sender-query-1061',
        queryReference: 'QRY-1061',
        customer: 'Northgate Services',
        linkedInvoice: 'INV-24099',
        amount: '£9,560',
        status: 'In review',
        statusTone: 'medium',
        issue: 'Pricing difference flagged by the AP team.',
        channel: 'Portal',
        openedAt: '16 May 2026 • 15:03',
        lastUpdated: 'Today • 08:11',
        waitingOn: 'Customer',
        owner: 'Northgate Services AP',
        sla: 'Updated this morning',
        transactionStatus: 'In query',
        nextStep: 'Customer is comparing the price to the PO.',
        submittedAt: '16 May 2026',
        documents: ['Invoice PDF', 'PO copy', 'Rate card'],
        actions: ['View thread', 'Upload supporting file', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24099', type: 'Invoice', status: 'In query', amount: '£9,560', note: 'The invoice is under pricing review.' },
          { reference: 'INV-24100', type: 'Invoice', status: 'Processing', amount: '£2,180', note: 'A second invoice on the same PO is still moving through validation.' }
        ],
        messages: [
          { author: 'Northgate Services AP', time: '16 May • 15:03', text: 'We have a pricing variance on INV-24099 and are reviewing it against the PO.' },
          { author: 'You', time: '16 May • 15:24', text: 'The invoice follows the agreed rate card. I have attached the latest copy.' },
          { author: 'Northgate Services AP', time: 'Today • 08:11', text: 'Thanks, this is back with the buyer for confirmation.' }
        ],
        timeline: [
          { step: 'Query opened', at: '16 May 2026 • 15:03', state: 'done' },
          { step: 'Supporting document added', at: '16 May 2026 • 15:24', state: 'done' },
          { step: 'Buyer review in progress', at: 'Today • 08:11', state: 'active' }
        ]
      },
      {
        id: 'sender-query-1068',
        queryReference: 'QRY-1068',
        customer: 'Metro Builders Group',
        linkedInvoice: 'INV-24096',
        amount: '£4,920',
        status: 'Awaiting your response',
        statusTone: 'high',
        issue: 'Customer has asked for a copy POD to complete matching.',
        channel: 'Email inbox',
        openedAt: '15 May 2026 • 10:17',
        lastUpdated: 'Today • 07:54',
        waitingOn: 'You',
        owner: 'Metro Builders Group AP',
        sla: 'Waiting for delivery update',
        transactionStatus: 'Matching in progress',
        nextStep: 'Upload the POD for the final delivery.',
        submittedAt: '15 May 2026',
        documents: ['Invoice PDF', 'Delivery note'],
        actions: ['Upload POD', 'Reply in query', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24096', type: 'Invoice', status: 'Matching in progress', amount: '£4,920', note: 'POD is still needed to complete matching.' }
        ],
        messages: [
          { author: 'Metro Builders Group AP', time: '15 May • 10:17', text: 'Please upload the POD for the final delivery against INV-24096.' },
          { author: 'You', time: '15 May • 11:01', text: 'We are retrieving the POD from the carrier.' },
          { author: 'Metro Builders Group AP', time: 'Today • 07:54', text: 'Please share the POD today if available so the match can be completed.' }
        ],
        timeline: [
          { step: 'Query created from email', at: '15 May 2026 • 10:17', state: 'done' },
          { step: 'Sender acknowledged request', at: '15 May 2026 • 11:01', state: 'done' },
          { step: 'POD still outstanding', at: 'Today • 07:54', state: 'active' }
        ]
      },
      {
        id: 'sender-query-1072',
        queryReference: 'QRY-1072',
        customer: 'Riverside Foods',
        linkedInvoice: 'INV-24062',
        amount: '£8,760',
        status: 'Closed',
        statusTone: 'good',
        issue: 'Remittance timing confirmed and query closed.',
        channel: 'EVA escalated',
        openedAt: '08 May 2026 • 10:22',
        lastUpdated: '10 May 2026 • 13:18',
        waitingOn: 'Closed',
        owner: 'Riverside Foods AP',
        sla: 'Closed',
        transactionStatus: 'Remittance issued',
        nextStep: 'No further action needed.',
        submittedAt: '07 May 2026',
        documents: ['Invoice PDF', 'Remittance advice'],
        actions: ['Open invoice', 'Download resolution'],
        relatedTransactions: [
          { reference: 'INV-24062', type: 'Invoice', status: 'Remittance issued', amount: '£8,760', note: 'Payment is aligned to the latest remittance advice.' }
        ],
        messages: [
          { author: 'You', time: '08 May • 10:22', text: 'Can you confirm when remittance will be issued for INV-24062?' },
          { author: 'Riverside Foods AP', time: '10 May • 13:18', text: 'Remittance was issued today and payment is due in the next run.' }
        ],
        timeline: [
          { step: 'Query opened', at: '08 May 2026 • 10:22', state: 'done' },
          { step: 'Payment timing confirmed', at: '10 May 2026 • 13:18', state: 'done' },
          { step: 'Query closed', at: '10 May 2026 • 13:19', state: 'done' }
        ]
      },
      {
        id: 'sender-query-1084',
        queryReference: 'QRY-1084',
        customer: 'Riverside Foods',
        linkedInvoice: 'INV-24114',
        amount: '£6,180',
        status: 'In review',
        statusTone: 'medium',
        issue: 'First processing update is still under review after submission.',
        channel: 'Email inbox',
        openedAt: '19 May 2026 • 10:18',
        lastUpdated: 'Today • 11:06',
        waitingOn: 'Customer',
        owner: 'Riverside Foods AP',
        sla: 'Updated this morning',
        transactionStatus: 'Sent',
        nextStep: 'Waiting for the customer to confirm when processing will begin.',
        submittedAt: '19 May 2026',
        documents: ['Invoice PDF', 'Submission confirmation'],
        actions: ['View thread', 'Send reminder', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24114', type: 'Invoice', status: 'Sent', amount: '£6,180', note: 'Invoice has been received but is still awaiting its first processing update.' }
        ],
        messages: [
          { author: 'You', time: '19 May • 10:18', text: 'Can you confirm whether INV-24114 has started processing yet?' },
          { author: 'Riverside Foods AP', time: 'Today • 11:06', text: 'We have the invoice and are checking why the first processing step has not updated yet.' }
        ],
        timeline: [
          { step: 'Query created from inbox', at: '19 May 2026 • 10:18', state: 'done' },
          { step: 'Linked to invoice INV-24114', at: '19 May 2026 • 10:19', state: 'done' },
          { step: 'Customer review in progress', at: 'Today • 11:06', state: 'active' }
        ]
      },
      {
        id: 'sender-query-1091',
        queryReference: 'QRY-1091',
        customer: 'Apex Retail UK',
        linkedInvoice: 'INV-24118',
        amount: '£6,840',
        status: 'With customer',
        statusTone: 'medium',
        issue: 'Invoice has failed matching and has been raised for customer review after the sender confirmed the invoice value is correct.',
        channel: 'EVA escalated',
        openedAt: 'Today • 12:32',
        lastUpdated: 'Today • 12:34',
        waitingOn: 'Customer',
        owner: 'Apex Retail UK AP',
        sla: 'Customer review in progress',
        transactionStatus: 'Failed matching',
        nextStep: 'Waiting for Apex Retail UK to review the invoice against the matched PO and the additional product context.',
        submittedAt: '22 May 2026',
        documents: ['Query summary', 'Source invoice PDF'],
        actions: ['View thread', 'Add update', 'Open invoice'],
        relatedTransactions: [
          { reference: 'INV-24118', type: 'Invoice', status: 'Failed matching', amount: '£6,840', note: 'Invoice has failed matching while the customer reviews the invoice value against the currently matched PO value of £6,120.' }
        ],
        messages: [
          { author: 'You', time: 'Today • 12:32', text: 'I need help with an invoice for amount £6,840.' },
          { author: 'EVA', time: 'Today • 12:32', text: 'In the last couple of months I can only see 1 invoice for £6,840, invoice number INV-24118, that you sent to Apex Retail UK. It was received on 22 May and its current status is Failed matching. What would you like to know about it?' },
          { author: 'You', time: 'Today • 12:32', text: 'Why has it not moved on?' },
          { author: 'EVA', time: 'Today • 12:33', text: 'The invoice value is £6,840, but the matched PO value currently available is £6,120. I cannot tell from the transaction data alone whether this is an agreed change, a partial receipt, or an error. Do you believe the invoice value is correct?' },
          { author: 'You', time: 'Today • 12:33', text: 'Yes, the value is correct, they asked for an extra product after they ordered.' },
          { author: 'System', time: 'Today • 12:34', text: 'Query raised to Apex Retail UK with the linked transaction and summary from the EVA conversation.' }
        ],
        timeline: [
          { step: 'Query raised from EVA', at: 'Today • 12:32', state: 'done' },
          { step: 'Linked to invoice INV-24118', at: 'Today • 12:32', state: 'done' },
          { step: 'Additional product context added', at: 'Today • 12:33', state: 'done' },
          { step: 'Customer review requested', at: 'Today • 12:34', state: 'active' }
        ]
      }
    ]
  };

  function toneClass(tone) {
    if (tone === 'critical') return 'critical';
    if (tone === 'high') return 'high';
    if (tone === 'medium') return 'medium';
    return 'good';
  }

  function amountValue(value) {
    return Number(String(value).replace(/[^0-9.]/g, '')) || 0;
  }

  function getApClerkProfile(name = selectedApClerk) {
    return apClerkProfiles.find((profile) => profile.name === name) || apClerkProfiles[0];
  }

  function getSenderOwner(sender) {
    return senderOwnerOverrides[sender] || apClerkProfiles.find((profile) => profile.senders.includes(sender))?.name || 'AP Query Team';
  }

  function updateSenderOwner(sender, owner) {
    senderOwnerOverrides = {
      ...senderOwnerOverrides,
      [sender]: owner
    };
  }

  function togglePrioritySender(sender) {
    prioritySenderIds = prioritySenderIds.includes(sender)
      ? prioritySenderIds.filter((item) => item !== sender)
      : [...prioritySenderIds, sender];
  }

  function openReceiverSender(sender) {
    selectedReceiverSender = sender.name;
    workspaceItemsOverride = sender.items;
    workspaceOperationalContext = null;
    workspaceSummary = `${sender.name} queries`;
    selectedTransactionId = sender.items[0]?.id || selectedTransactionId;
    transactionFilter = 'All';
    statusFilter = 'All';
    pressureFocus = 'all';
    queryDetailTab = 'conversation';
  }

  function viewReceiverSenderQueries(sender) {
    openReceiverSender(sender);
    activeTab = 'queries';
  }

  function getCommunityQueryReference(item) {
    if (!item) return 'QRY-0000';
    if (String(item.reference).startsWith('QRY-')) return item.reference;

    const digitsFromReference = String(item.reference).match(/(\d{3,4})$/)?.[1];
    if (digitsFromReference) {
      return `QRY-${digitsFromReference.padStart(4, '0')}`;
    }

    const index = communityTransactions.findIndex((entry) => entry.id === item.id);
    if (index >= 0) {
      return `QRY-${String(1041 + index).padStart(4, '0')}`;
    }

    return 'QRY-0000';
  }

  function formatCurrency(value) {
    return `\u00A3${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  function senderQueryStatusTone(status) {
    if (status === 'Awaiting your response') return 'high';
    if (status === 'With customer' || status === 'In review') return 'medium';
    return 'good';
  }

  function senderQueryStatusLabel(status) {
    if (status === 'Awaiting your response') return 'Needs your input';
    if (status === 'With customer') return 'With customer';
    return status;
  }

  function senderTransactionStatusTone(status) {
    if (status === 'On hold' || status === 'In query') return 'high';
    if (status === 'Processing' || status === 'Matching in progress') return 'medium';
    return 'good';
  }

  function receiverQueryStatus(item) {
    if (!item) return 'Open';
    if (item.waitingExternal) return 'Awaiting external response';
    if (item.statusTone === 'critical' || item.statusTone === 'high' || item.statusTone === 'medium') {
      return 'In review';
    }
    return 'Closed';
  }

  function receiverQueryStatusTone(status) {
    if (status === 'Awaiting external response') return 'high';
    if (status === 'In review') return 'medium';
    return 'good';
  }

  function receiverQueryAssignee(item) {
    if (!item) return '';
    if (receiverRole === 'clerk' && (!item.assignee || item.assignee === 'Automation' || item.assignee === 'AP Query Team')) {
      return selectedApClerk;
    }
    return item.assignee || getSenderOwner(item.party);
  }

  function buildSlaGroupsForItems(items) {
    const buildBuckets = (groupKey) => {
      const total = Math.max(items.length, 1);
      return ['Green', 'Amber', 'Red'].map((label) => {
        const tone = label === 'Green' ? 'good' : label === 'Amber' ? 'high' : 'critical';
        const value = items.filter((item) => receiverQuerySla(item)[groupKey].label === label).length;
        return {
          label,
          value: String(value),
          share: `${Math.round((value / total) * 100)}%`,
          tone
        };
      });
    };

    return [
      { title: 'Responded within 4 hours', buckets: buildBuckets('response') },
      { title: 'Resolved within 2 days', buckets: buildBuckets('closure') }
    ];
  }

  function currentQueryTimestamp() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return `Today • ${time}`;
  }

  function applyReceiverQueryStatus(item, nextStatus) {
    if (!item) return;
    if (nextStatus === 'Awaiting external response') {
      item.waitingExternal = true;
      item.statusTone = 'high';
      item.nextEta = 'Waiting for supplier response';
    } else if (nextStatus === 'In review') {
      item.waitingExternal = false;
      item.statusTone = 'medium';
      item.nextEta = 'Under active review';
    } else {
      item.waitingExternal = false;
      item.statusTone = 'good';
      item.nextEta = 'Closed';
    }
  }

  function updateReceiverQuery(action = 'reply') {
    if (!selectedTransaction) return;

    const trimmedReply = receiverReplyText.trim();
    const nextStatus = receiverStatusDraft;
    const nextTimestamp = currentQueryTimestamp();

    const target = workspaceItems.find((item) => item.id === selectedTransaction.id);
    if (!target) return;

    if (trimmedReply) {
      target.messages = [
        ...(target.messages || []),
        {
          author: 'AP Team',
          time: nextTimestamp,
          text: trimmedReply,
          evaExcluded: receiverExcludeFromEva
        }
      ];
    }

    applyReceiverQueryStatus(target, nextStatus);
    target.lastUpdated = nextTimestamp;

    if (action === 'close') {
      target.timeline = [
        ...(target.timeline || []),
        { step: 'Query closed by AP team', at: nextTimestamp, state: 'done' }
      ];
    } else if (trimmedReply) {
      target.timeline = [
        ...(target.timeline || []),
        { step: 'Response sent to external party', at: nextTimestamp, state: 'active' }
      ];
    }

    workspaceItemsOverride = [...workspaceItems];
    receiverReplyText = '';
    receiverExcludeFromEva = false;
    queryInteractionVersion += 1;
  }

  function updateReceiverQueryAssignee(nextAssignee) {
    if (!selectedTransaction || !nextAssignee) return;

    const target = workspaceItems.find((item) => item.id === selectedTransaction.id);
    if (!target) return;

    target.assignee = nextAssignee;
    target.lastUpdated = currentQueryTimestamp();
    workspaceItemsOverride = [...workspaceItems];
    queryInteractionVersion += 1;
  }

  function toggleAutomationFilter(nextFilter) {
    automationFilter = automationFilter === nextFilter ? 'All' : nextFilter;
  }

  function automatedSequenceLabel(item) {
    return item?.automatedSequence
      ? `Auto ${item.automatedSequence.currentStep}/${item.automatedSequence.totalSteps}`
      : '';
  }

  function setWorkflowStepCount(value) {
    const nextCount = Math.max(1, Math.min(6, Number(value) || 1));
    workflowStepCount = nextCount;
    workflowSequenceSteps = Array.from({ length: nextCount }, (_, index) => {
      const existing = workflowSequenceSteps[index];
      return existing || {
        sequence: index + 1,
        triggerDays: index === 0 ? 1 : index * 5,
        action: index === nextCount - 1 ? 'Escalate to human' : 'Send email template',
        template: index === nextCount - 1 ? 'Credit control escalation' : 'Payment overdue reminder',
        owner: index === nextCount - 1 ? 'AP Query Team' : 'Automation'
      };
    }).map((step, index) => ({ ...step, sequence: index + 1 }));
  }

  function updateSenderQuery(action = 'reply') {
    if (!selectedSenderQuery) return;

    const trimmedReply = senderReplyText.trim();
    const nextStatus = senderStatusDraft;
    const nextTimestamp = currentQueryTimestamp();

    const target = currentSenderQueries.find((item) => item.id === selectedSenderQuery.id);
    if (!target) return;

    if (trimmedReply) {
      target.messages = [
        ...(target.messages || []),
        {
          author: 'You',
          time: nextTimestamp,
          text: trimmedReply,
          evaExcluded: senderExcludeFromEva
        }
      ];
    }

    target.status = nextStatus;
    target.statusTone =
      nextStatus === 'Awaiting your response'
        ? 'high'
        : nextStatus === 'Closed'
          ? 'good'
          : 'medium';
    target.waitingOn =
      nextStatus === 'Awaiting your response'
        ? 'You'
        : nextStatus === 'Closed'
          ? 'Closed'
          : 'Customer';
    target.lastUpdated = nextTimestamp;
    target.sla =
      nextStatus === 'Closed'
        ? 'Closed just now'
        : nextStatus === 'Awaiting your response'
          ? 'Waiting for your update'
          : 'Customer review in progress';
    target.nextStep =
      nextStatus === 'Closed'
        ? 'No further action needed.'
        : nextStatus === 'Awaiting your response'
          ? 'An update or supporting information is needed from you.'
          : 'Waiting for the customer to respond to your latest update.';

    if (action === 'close') {
      target.timeline = [
        ...(target.timeline || []),
        { step: 'Query closed by sender', at: nextTimestamp, state: 'done' }
      ];
    } else if (trimmedReply) {
      target.timeline = [
        ...(target.timeline || []),
        { step: 'Sender update added', at: nextTimestamp, state: 'active' }
      ];
    }

    senderQueryData[selectedPeriod] = [...currentSenderQueries];
    senderReplyText = '';
    senderExcludeFromEva = false;
    queryInteractionVersion += 1;
  }

  function submitSenderDetailChange() {
    const proposed = senderDetailChangeValue.trim();
    if (!proposed) return;

    const nextReference = `SUP-CHG-${String(1043 + senderDetailChangeRequests.length).padStart(4, '0')}`;
    senderDetailChangeRequests = [
      {
        reference: nextReference,
        area: senderDetailChangeArea,
        field: senderDetailChangeField,
        proposed,
        customer: senderDetailChangeCustomer,
        status: 'Submitted to customer',
        submitted: 'Today'
      },
      ...senderDetailChangeRequests
    ];
    senderDetailChangeValue = '';
    senderDetailChangeReason = '';
    senderDetailChangeSubmitted = true;
  }

  function handleInvoiceUpload(event) {
    const file = event.currentTarget.files?.[0];
    uploadedInvoiceFileName = file?.name || 'invoice-upload.pdf';
  }

  function submitMissingInvoiceUpload() {
    if (!selectedSenderQuery || !uploadedInvoiceFileName) return;

    const nextTimestamp = currentQueryTimestamp();
    selectedSenderQuery.documents = [...(selectedSenderQuery.documents || []), uploadedInvoiceFileName];
    selectedSenderQuery.messages = [
      ...(selectedSenderQuery.messages || []),
      {
        author: 'You',
        time: nextTimestamp,
        text: `Uploaded missing invoice ${uploadedInvoiceFileName} for AP review.`
      }
    ];
    selectedSenderQuery.timeline = [
      ...(selectedSenderQuery.timeline || []),
      { step: 'Missing invoice uploaded', at: nextTimestamp, state: 'active' }
    ];
    selectedSenderQuery.status = 'In review';
    selectedSenderQuery.statusTone = 'medium';
    selectedSenderQuery.waitingOn = 'Customer';
    selectedSenderQuery.nextStep = 'Invoice uploaded and waiting for AP to validate and continue matching.';
    senderStatusDraft = selectedSenderQuery.status;
    uploadedInvoiceFileName = '';
    queryInteractionVersion += 1;
  }

  function summariseReceiverQueryParties(items) {
    if (!items.length) return 'No queries in this status';

    const counts = items.reduce((acc, item) => {
      acc[item.party] = (acc[item.party] || 0) + 1;
      return acc;
    }, {});

    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const lead = entries
      .slice(0, 2)
      .map(([party, count]) => `${party} ${count}`)
      .join(' • ');

    return entries.length > 2 ? `${lead} • +${entries.length - 2} more` : lead;
  }

  const receiverQuerySlaMap = {
    'COM-24018': {
      response: { tone: 'high', label: '42m left' },
      closure: { tone: 'medium', label: '0.6d left' }
    },
    'COM-24027': {
      response: { tone: 'critical', label: 'Missed by 18m' },
      closure: { tone: 'high', label: '0.3d left' }
    },
    'COM-24039': {
      response: { tone: 'high', label: '1.2h left' },
      closure: { tone: 'high', label: '0.8d left' }
    },
    'COM-24044': {
      response: { tone: 'good', label: 'Met in 2.1h' },
      closure: { tone: 'medium', label: '1.1d left' }
    },
    'COM-24051': {
      response: { tone: 'high', label: '24m left' },
      closure: { tone: 'high', label: '0.4d left' }
    },
    'COM-24063': {
      response: { tone: 'good', label: 'Met in 1.7h' },
      closure: { tone: 'medium', label: '1.3d left' }
    },
    'COM-24072': {
      response: { tone: 'good', label: 'Met in 2.8h' },
      closure: { tone: 'high', label: '0.5d left' }
    },
    'COM-24088': {
      response: { tone: 'good', label: 'Met in 2.4h' },
      closure: { tone: 'medium', label: '1.0d left' }
    },
    'COM-88104': {
      response: { tone: 'critical', label: 'Missed by 33m' },
      closure: { tone: 'high', label: '0.4d left' }
    },
    'COM-88116': {
      response: { tone: 'high', label: '36m left' },
      closure: { tone: 'medium', label: '1.2d left' }
    },
    'COM-88122': {
      response: { tone: 'high', label: '58m left' },
      closure: { tone: 'high', label: '0.7d left' }
    },
    'COM-88131': {
      response: { tone: 'critical', label: 'Missed by 11m' },
      closure: { tone: 'high', label: '0.2d left' }
    },
    'COM-88147': {
      response: { tone: 'good', label: 'Met in 3.0h' },
      closure: { tone: 'medium', label: '1.4d left' }
    },
    'COM-55219': {
      response: { tone: 'good', label: 'Met in 1.3h' },
      closure: { tone: 'good', label: 'Met in 1.1d' }
    },
    'COM-55228': {
      response: { tone: 'high', label: '1.5h left' },
      closure: { tone: 'good', label: 'Met in 1.4d' }
    },
    'COM-55243': {
      response: { tone: 'medium', label: '2.4h left' },
      closure: { tone: 'medium', label: '1.5d left' }
    },
    'COM-11472': {
      response: { tone: 'good', label: 'Met in 1.0h' },
      closure: { tone: 'good', label: 'Met in 0.7d' }
    },
    'COM-11488': {
      response: { tone: 'high', label: '48m left' },
      closure: { tone: 'medium', label: '1.0d left' }
    },
    'COM-11495': {
      response: { tone: 'critical', label: 'Missed by 22m' },
      closure: { tone: 'high', label: '0.5d left' }
    }
  };

  function receiverQuerySla(item) {
    return (
      receiverQuerySlaMap[item?.id] || {
        response: { tone: 'medium', label: '1.8h left' },
        closure: { tone: 'medium', label: '1.0d left' }
      }
    );
  }

  function hasReceiverSla(item) {
    return !item?.automatedSequence;
  }

  function summariseSenderQueryCustomers(items) {
    if (!items.length) return 'No queries in this status';

    const counts = items.reduce((acc, item) => {
      acc[item.customer] = (acc[item.customer] || 0) + 1;
      return acc;
    }, {});

    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const lead = entries
      .slice(0, 2)
      .map(([customer, count]) => `${customer} ${count}`)
      .join(' • ');

    return entries.length > 2 ? `${lead} • +${entries.length - 2} more` : lead;
  }

  function parseExpectedCashNames(detail) {
    return String(detail)
      .replace(/\sand\s/g, ', ')
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function buildExpectedCashCustomerBreakdown(day) {
    const total = amountValue(day.total);
    const names = parseExpectedCashNames(day.detail);
    if (!names.length) return [];

    const baseAmount = Math.floor((total / names.length) * 100) / 100;
    let running = 0;

    return names.map((name, index) => {
      const amount = index === names.length - 1 ? Number((total - running).toFixed(2)) : baseAmount;
      running = Number((running + amount).toFixed(2));

      return {
        customer: name,
        amount,
        date: day.label,
        reference: `EC-${day.label.replace(/\s+/g, '').toUpperCase()}-${index + 1}`
      };
    });
  }

  function getExpectedCashDays() {
    if (!expectedCashSelection || expectedCashSelection.level === 'month') {
      return currentSenderExpectedCash.months.flatMap((month) => month.weeks.flatMap((week) => week.days));
    }

    if (expectedCashSelection.level === 'week') {
      return expectedCashSelection.item.weeks.flatMap((week) => week.days);
    }

    if (expectedCashSelection.level === 'day') {
      return expectedCashSelection.item.days;
    }

    return expectedCashSelection?.item ? [expectedCashSelection.item] : [];
  }

  function pressureBandClass(label) {
    if (label === 'High') return 'high-risk';
    if (label === 'Watchlist') return 'watchlist';
    return 'healthy';
  }

  function buildSlaCases(period, groupKey, bucketLabel, count) {
    const type = groupKey === 'response' ? 'Response' : 'Closure';
    const issueMap = {
      Green: 'Routine question completed within target.',
      Amber: 'Borderline query that approached the target before resolution.',
      Red: 'Target missed and manual follow-up was required.'
    };

    return Array.from({ length: count }, (_, index) => {
      const sequence = index + 1;
      const isResponse = groupKey === 'response';
      const responseHours = bucketLabel === 'Green' ? 1 + (sequence % 3) : bucketLabel === 'Amber' ? 4 + (sequence % 3) : 7 + (sequence % 6);
      const closureDays = bucketLabel === 'Green' ? 1 : bucketLabel === 'Amber' ? 2 + (sequence % 2) : 4 + (sequence % 4);
      return {
        id: `SLA-${period}-${groupKey}-${bucketLabel}-${String(sequence).padStart(3, '0')}`,
        type: 'Query',
        party: ['Vertex Wholesale', 'Northwind Components', 'Southgate Foods', 'Blue Peak Supply'][sequence % 4],
        counterparty: 'Community Service Desk',
        reference: `${type.slice(0, 3).toUpperCase()}-${bucketLabel[0]}-${String(sequence).padStart(4, '0')}`,
        status: `${bucketLabel} ${type} SLA`,
        statusTone: bucketLabel === 'Green' ? 'good' : bucketLabel === 'Amber' ? 'high' : 'critical',
        channel: 'Supplier',
        amount: 'Query record',
        nextMilestone: isResponse ? 'Review response history' : 'Review closure history',
        nextEta: bucketLabel === 'Red' ? 'Requires attention' : 'Closed',
        issue: issueMap[bucketLabel],
        assignee: ['AP Query Team', 'Operations Support', 'Service Desk'][sequence % 3],
        waitingExternal: false,
        subscribed: true,
        actions: ['Open thread', 'Review SLA history', 'Flag for process review'],
        documents: ['Conversation log', 'Status timeline', 'Resolution notes'],
        responseElapsed: `${responseHours}h`,
        closureElapsed: `${closureDays}d`,
        slaBucket: bucketLabel,
        timeline: [
          { step: 'Query logged', at: `Day ${1 + (sequence % 28)} 09:${String((sequence * 7) % 60).padStart(2, '0')}`, state: 'done' },
          { step: 'First response', at: `${responseHours}h after logging`, state: 'done' },
          { step: 'Closed', at: `${closureDays}d after logging`, state: bucketLabel === 'Red' ? 'current' : 'done' }
        ],
        messages: [
          {
            author: 'Sender',
            time: `Day ${1 + (sequence % 28)} 09:${String((sequence * 7) % 60).padStart(2, '0')}`,
            text: bucketLabel === 'Red' ? 'Still waiting for an update on this query.' : 'Can you confirm the current status of this query?'
          }
        ]
      };
    });
  }

  function buildOperationalCases(period, metricKey, count, urgentOnly = false, urgentCount = 0) {
    return Array.from({ length: count }, (_, index) => {
      const sequence = index + 1;
      const awaiting = metricKey === 'awaiting-response';
      const isUrgent = urgentOnly || (!urgentOnly && sequence <= urgentCount);
      const responseHours = isUrgent ? 6 + (sequence % 5) : awaiting ? 2 + (sequence % 4) : 3 + (sequence % 6);
      const closureDays = awaiting ? 1 + (sequence % 3) : isUrgent ? 4 + (sequence % 5) : 2 + (sequence % 4);

      return {
        id: `OPS-${period}-${metricKey}-${urgentOnly ? 'urgent' : 'all'}-${String(sequence).padStart(3, '0')}`,
        type: 'Query',
        party: ['Vertex Wholesale', 'Northwind Components', 'Southgate Foods', 'Blue Peak Supply'][sequence % 4],
        counterparty: 'Community Service Desk',
        reference: `${metricKey === 'awaiting-response' ? 'RESP' : 'OPEN'}-${String(sequence).padStart(4, '0')}`,
        status: awaiting ? 'Awaiting team response' : 'Outstanding query',
        statusTone: isUrgent ? 'critical' : 'high',
        channel: 'Supplier',
        amount: 'Query record',
        nextMilestone: awaiting ? 'Team response due' : 'Resolution due',
        nextEta: isUrgent ? 'Needs attention now' : 'In active queue',
        issue: awaiting
          ? 'Sender is waiting for a first team response.'
          : 'Query remains open and needs further action before closure.',
        assignee: ['AP Query Team', 'Operations Support', 'Service Desk'][sequence % 3],
        waitingExternal: false,
        subscribed: true,
        actions: ['Open thread', 'Assign owner', 'Escalate'],
        documents: ['Conversation log', 'SLA history', 'Resolution notes'],
        responseElapsed: `${responseHours}h`,
        closureElapsed: `${closureDays}d`,
        urgent: isUrgent,
        timeline: [
          { step: 'Query logged', at: `Day ${1 + (sequence % 28)} 10:${String((sequence * 9) % 60).padStart(2, '0')}`, state: 'done' },
          { step: awaiting ? 'Awaiting response' : 'In progress', at: `${responseHours}h elapsed`, state: 'current' },
          { step: 'Closed', at: 'Pending', state: 'next' }
        ],
        messages: [
          {
            author: 'Sender',
            time: `Day ${1 + (sequence % 28)} 10:${String((sequence * 9) % 60).padStart(2, '0')}`,
            text: awaiting ? 'Can someone respond to this query?' : 'This is still unresolved and needs an update.'
          }
        ]
      };
    });
  }

  function percentageCount(percentage, base) {
    return Math.max(1, Math.round((Number(String(percentage).replace('%', '')) / 100) * base));
  }

  function buildTeamCases(period, row, metricKey, count) {
    const issueMap = {
      assigned: 'Assigned to this user and currently in their working queue.',
      closed: 'Closed by this user during the selected period.',
      responseSla: 'Handled within the response target for this user.',
      resolutionSla: 'Resolved within the resolution target for this user.',
      outstanding: 'Still open and assigned to this user.',
      nearBreach: 'Close to breaching either response or resolution target.'
    };

    return Array.from({ length: count }, (_, index) => {
      const sequence = index + 1;
      const urgent = metricKey === 'nearBreach' || (metricKey === 'outstanding' && sequence <= Math.max(1, Math.round(count / 3)));
      const responseHours =
        metricKey === 'responseSla'
          ? 1 + (sequence % 3)
          : metricKey === 'nearBreach'
            ? 5 + (sequence % 3)
            : 2 + (sequence % 5);
      const closureDays =
        metricKey === 'resolutionSla'
          ? 1 + (sequence % 2)
          : metricKey === 'nearBreach'
            ? 2 + (sequence % 2)
            : 1 + (sequence % 4);

      return {
        id: `TEAM-${period}-${row.user.replace(/\s+/g, '-').toUpperCase()}-${metricKey}-${String(sequence).padStart(3, '0')}`,
        type: 'Query',
        party: ['Stonebridge Wholesale', 'Blue Peak Supply', 'Vertex Industrial', 'Northwind Components'][sequence % 4],
        counterparty: 'Community Service Desk',
        reference: `TM-${String(sequence).padStart(4, '0')}`,
        status:
          metricKey === 'closed'
            ? 'Closed'
            : metricKey === 'nearBreach'
              ? 'Close to SLA'
              : metricKey === 'outstanding'
                ? 'Outstanding'
                : 'In progress',
        statusTone: metricKey === 'nearBreach' ? 'critical' : metricKey === 'outstanding' ? 'high' : 'medium',
        channel: 'Supplier',
        amount: 'Query record',
        nextMilestone: metricKey === 'closed' ? 'Review closure' : 'Review current handling',
        nextEta: urgent ? 'Needs attention soon' : 'In active handling',
        issue: issueMap[metricKey],
        assignee: row.user,
        waitingExternal: false,
        subscribed: true,
        actions: ['Open thread', 'Review assignment', 'Check SLA history'],
        documents: ['Conversation log', 'SLA history', 'Resolution notes'],
        responseElapsed: `${responseHours}h`,
        closureElapsed: `${closureDays}d`,
        urgent,
        timeline: [
          { step: 'Query logged', at: `Day ${1 + (sequence % 28)} 09:${String((sequence * 8) % 60).padStart(2, '0')}`, state: 'done' },
          { step: 'Assigned to user', at: `${1 + (sequence % 6)}h after logging`, state: 'done' },
          { step: metricKey === 'closed' ? 'Closed' : 'In progress', at: metricKey === 'closed' ? `${closureDays}d after logging` : `${responseHours}h elapsed`, state: 'current' }
        ],
        messages: [
          {
            author: 'Sender',
            time: `Day ${1 + (sequence % 28)} 09:${String((sequence * 8) % 60).padStart(2, '0')}`,
            text: metricKey === 'nearBreach' ? 'Need an update before this misses target.' : 'Can you confirm the latest position on this query?'
          }
        ]
      };
    });
  }

  function buildInsightCases(period, insightKey, label, count) {
    const senderThemes = ['Stonebridge Wholesale', 'Blue Peak Supply', 'Vertex Industrial', 'Northwind Components'];
    const issueMap = {
      'payment-date': 'Payment date and remittance timing',
      'payment-run': 'Payment-run timing and remittance availability',
      'dispatch-status': 'Order and dispatch status',
      'dispatch-promise': 'Dispatch promise and carrier exception follow-up',
      documents: 'Document and POD requests',
      'proof-of-delivery': 'Proof of delivery and missing attachments',
      beneficiary: 'Beneficiary and bank detail checks',
      'account-validation': 'Beneficiary validation and release checks',
      'next-knowledge-update': 'Knowledge gap for beneficiary checks and payment release steps',
      'teach-eva-from-closed-query-resolutions': 'Closed manual answer suitable for EVA reuse',
      'high-friction-escalations': 'Escalated AI journey with repeat manual handling',
      'best-automation-opportunity': 'Repeat answer pattern suitable for automation',
      'conversation-repair': 'Long conversation before escalation'
    };

    return Array.from({ length: count }, (_, index) => {
      const sequence = index + 1;
      const responseHours =
        insightKey === 'payment-date' || insightKey === 'payment-run'
          ? 2 + (sequence % 4)
          : insightKey === 'documents' || insightKey === 'proof-of-delivery'
            ? 4 + (sequence % 5)
            : insightKey === 'teach-eva-from-closed-query-resolutions'
              ? 3 + (sequence % 3)
              : insightKey === 'high-friction-escalations' || insightKey === 'conversation-repair'
                ? 5 + (sequence % 4)
          : 3 + (sequence % 6);
      const closureDays =
        insightKey === 'documents' || insightKey === 'proof-of-delivery'
          ? 2 + (sequence % 3)
          : insightKey === 'dispatch-status' || insightKey === 'dispatch-promise'
            ? 1 + (sequence % 3)
            : insightKey === 'teach-eva-from-closed-query-resolutions'
              ? 2 + (sequence % 2)
            : 1 + (sequence % 2);
      const party = senderThemes[sequence % 4];
      const issue = issueMap[insightKey] || label;
      const isKnowledgeGap = insightKey === 'next-knowledge-update' || insightKey === 'teach-eva-from-closed-query-resolutions';
      const documents =
        insightKey === 'teach-eva-from-closed-query-resolutions'
          ? ['Conversation log', 'Resolution notes', 'Approved final response']
          : isKnowledgeGap
            ? ['Conversation log', 'AI answer trace', 'Knowledge gap summary']
            : ['Conversation log', 'Resolution notes', 'AI answer trace'];
      const actions =
        insightKey === 'teach-eva-from-closed-query-resolutions'
          ? ['Review final response', 'Approve for EVA reuse', 'View similar queries']
          : insightKey === 'next-knowledge-update'
            ? ['Draft knowledge update', 'Open AI data settings', 'View similar queries']
            : ['Open thread', 'Review AI answer path', 'Mark for knowledge update'];

      return {
        id: `INS-${period}-${insightKey}-${String(sequence).padStart(3, '0')}`,
        type: 'Query',
        party,
        counterparty: 'Community Service Desk',
        reference: `QRY-${String(sequence).padStart(4, '0')}`,
        status: 'Insight review',
        statusTone: responseHours > 4 ? 'high' : 'medium',
        channel: 'Supplier',
        amount: 'Query record',
        nextMilestone: 'Review conversation and resolution',
        nextEta: 'Available now',
        issue,
        assignee: ['AP Query Team', 'Operations Support', 'Service Desk'][sequence % 3],
        waitingExternal: false,
        subscribed: true,
        actions,
        documents,
        responseElapsed: `${responseHours}h`,
        closureElapsed: `${closureDays}d`,
        timeline: [
          { step: 'Query logged', at: `Day ${1 + (sequence % 28)} 09:${String((sequence * 5) % 60).padStart(2, '0')}`, state: 'done' },
          { step: 'First response', at: `${responseHours}h after logging`, state: 'done' },
          { step: 'Closed', at: `${closureDays}d after logging`, state: 'done' }
        ],
        messages: [
          {
            author: 'Sender',
            time: `Day ${1 + (sequence % 28)} 09:${String((sequence * 5) % 60).padStart(2, '0')}`,
            text:
              insightKey === 'teach-eva-from-closed-query-resolutions'
                ? `This was previously escalated and closed manually. Can the same answer be reused for ${party}?`
                : insightKey === 'next-knowledge-update'
                  ? `Need help with ${label.toLowerCase()} - this journey looks like it should have been answered automatically.`
                  : `Need help with ${label.toLowerCase()}.`
          }
        ]
      };
    });
  }

  function getAiOpportunityKey(label) {
    if (label === 'High-friction escalations') return 'high-friction-escalations';
    if (label === 'Best automation opportunity') return 'best-automation-opportunity';
    if (label === 'Next knowledge update') return 'next-knowledge-update';
    if (label === 'Teach EVA from closed query resolutions') return 'teach-eva-from-closed-query-resolutions';
    return null;
  }

  function getReceiverInsightFocusMeta() {
    return aiInsightFocusMeta[receiverInsightsFocus] || null;
  }

  function getReceiverInsightFocusCard() {
    return getReceiverInsightFocusMeta() || defaultReceiverInsightFocusMeta;
  }

  function clearReceiverInsightsFocus() {
    receiverInsightsFocus = null;
  }

  function openReceiverInsightsFocus(focusKey) {
    receiverInsightsFocus = focusKey;
    aiOpportunityDetailOpen = false;
    activeTab = 'insights';
  }

  function openAiDataSettings(section = 'knowledge-files') {
    aiSettingsFocus = section;
    receiverInsightsFocus = null;
    aiOpportunityDetailOpen = false;
    activeTab = 'settings';
  }

  function openReceiverKnowledgeCandidate(item) {
    if (item.key === 'next-knowledge-update') {
      openAiDataSettings('knowledge-files');
      return;
    }

    if (item.key === 'teach-eva-from-closed-query-resolutions') {
      openAiDataSettings('query-resolution-data');
      return;
    }

    openInsightTransactions(item.key, item.title, item.count, `${item.count} ${item.title.toLowerCase()} queries`);
  }

  function openAllTransactions({ summary, count = '', contextKey = '', reference = '', customer = '' }) {
    const params = new URLSearchParams();
    params.set('source', 'community');
    params.set('summary', summary);
    if (count) params.set('count', String(count));
    if (contextKey) params.set('context', contextKey);
    if (reference) params.set('reference', reference);
    if (customer) params.set('customer', customer);
    goto(`/transactions?${params.toString()}`);
  }

  function openCommunityTransactionContext(item) {
    openAllTransactions({
      summary: `${item.reference} for ${item.party}`,
      count: 1,
      contextKey: 'community-reference',
      reference: item.reference,
      customer: item.customer || item.counterparty
    });
  }

  function openCommunityPriorityQueue(queue) {
    if (queue.title === 'Queries awaiting external response') {
      const metric = currentReceiverServiceMetrics.metrics.find((item) => item.key === 'awaiting-response');
      if (metric) {
        openOperationalTransactions(metric, false);
        return;
      }
    }

    openAllTransactions({
      summary: queue.title,
      count: queue.count,
      contextKey:
        queue.title === 'Invoices on payment hold'
          ? 'community-payment-holds'
          : queue.title === 'Orders delayed after dispatch promise'
            ? 'community-dispatch-delays'
            : 'community-awaiting-external'
    });
  }

  function selectTransaction(id) {
    workspaceItemsOverride = null;
    workspaceOperationalContext = null;
    workspaceSummary = 'All tracked Community queries';
    selectedTransactionId = id;
    queryDetailTab = 'conversation';
    activeTab = 'queries';
  }

  function openEvaAssistant(mode = 'question', prompt = '', scenario = '') {
    if (!browser) return;

        window.dispatchEvent(
          new CustomEvent('open-eva', {
            detail: {
              customer: senderAssistantCustomer,
              mode,
              prompt,
              scenario
            }
          })
        );
      }

  function openSenderInvoiceRecord(record) {
    openAllTransactions({
      summary: `${record.reference} for ${record.customer}`,
      count: 1,
      contextKey: 'community-reference',
      reference: record.reference,
      customer: record.customer
    });
  }

  function openInsightTransactions(insightKey, label, count, summary) {
    const cases = buildInsightCases(selectedPeriod, insightKey, label, count);
    workspaceItemsOverride = cases;
    workspaceOperationalContext = null;
    selectedTransactionId = cases[0]?.id || selectedTransactionId;
    transactionFilter = 'All';
    statusFilter = 'All';
    pressureFocus = 'all';
    workspaceSummary = summary;
    queryDetailTab = 'conversation';
    activeTab = 'queries';
  }

  function openTeamMetricTransactions(row, metricKey) {
    const metricLabels = {
      assigned: 'assigned queries',
      closed: 'closed queries',
      responseSla: 'response SLA queries',
      resolutionSla: 'resolution SLA queries',
      outstanding: 'outstanding queries',
      nearBreach: 'queries close to SLA'
    };
    const countMap = {
      assigned: row.assigned,
      closed: row.closed,
      responseSla: percentageCount(row.responseSla, row.closed),
      resolutionSla: percentageCount(row.resolutionSla, row.closed),
      outstanding: row.outstanding,
      nearBreach: row.nearBreach
    };
    const count = countMap[metricKey];
    const cases = buildTeamCases(selectedPeriod, row, metricKey, count);
    workspaceItemsOverride = cases;
    workspaceOperationalContext = null;
    selectedTransactionId = cases[0]?.id || selectedTransactionId;
    transactionFilter = 'All';
    statusFilter = 'All';
    pressureFocus = 'all';
    workspaceSummary = `${count} ${metricLabels[metricKey]} for ${row.user}`;
    queryDetailTab = 'conversation';
    activeTab = 'queries';
  }

  function openTeamMetricDetail(row, metricKey) {
    const isResponse = metricKey === 'avgResponse';
    selectedTeamMetricDetail = {
      user: row.user,
      title: isResponse ? 'Average first response' : 'Average resolution',
      value: isResponse ? row.avgResponse : row.avgResolution,
      summary: isResponse
        ? `Calculated from ${row.closed} closed queries handled by ${row.user} in the selected period.`
        : `Calculated from ${row.closed} closed queries where ${row.user} completed the full journey in the selected period.`,
      breakdown: isResponse
        ? [
            `Fastest quartile is landing in roughly ${Math.max(1, Number.parseFloat(row.avgResponse) - 1.1).toFixed(1)}h.`,
            `Longer response times are mostly driven by document and exception-related queries.`,
            `${row.nearBreach} currently assigned queries are at risk of pushing this average up further.`
          ]
        : [
            `Straightforward queries are typically closing in ${Math.max(1, Number.parseFloat(row.avgResolution) - 0.5).toFixed(1)}d.`,
            `Multi-step document and payment queries are the main contributors to longer closure times.`,
            `${row.outstanding} queries remain open in ${row.user}'s queue and will affect the next period if not closed.`
          ],
      comparison: isResponse
        ? `Measured against the current response target of ${responseTarget}.`
        : `Measured against the current resolution target of ${closureTarget}.`
    };
    teamMetricDetailOpen = true;
  }

  function closeTeamMetricDetail() {
    teamMetricDetailOpen = false;
    selectedTeamMetricDetail = null;
  }

  function openPressureHelper() {
    pressureHelperOpen = true;
  }

  function closePressureHelper() {
    pressureHelperOpen = false;
  }

  function togglePressureDetail() {
    pressureDetailOpen = !pressureDetailOpen;
  }

  function openSlaDetail(groupKey, bucketLabel) {
    selectedSlaInsight = receiverSlaInsights[selectedPeriod]?.[groupKey]?.[bucketLabel] || null;
    selectedSlaContext = { groupKey, bucketLabel };
    slaDetailOpen = Boolean(selectedSlaInsight);
  }

  function closeSlaDetail() {
    slaDetailOpen = false;
    selectedSlaInsight = null;
    selectedSlaContext = null;
  }

  function openSlaTransactions() {
    if (!selectedSlaContext) return;
    const bucket = currentReceiverServiceMetrics.slaGroups
      .flatMap((group) =>
        group.buckets.map((entry) => ({
          groupKey: group.title.includes('Responded') ? 'response' : 'closure',
          ...entry
        }))
      )
      .find((entry) => entry.groupKey === selectedSlaContext.groupKey && entry.label === selectedSlaContext.bucketLabel);

    if (!bucket) return;

    const cases = buildSlaCases(selectedPeriod, selectedSlaContext.groupKey, selectedSlaContext.bucketLabel, Number(bucket.value.replace(/,/g, '')));
    workspaceItemsOverride = cases;
    workspaceOperationalContext = null;
    selectedTransactionId = cases[0]?.id || selectedTransactionId;
    transactionFilter = 'All';
    statusFilter = 'All';
    pressureFocus = 'all';
    workspaceSummary = `${bucket.value} ${selectedSlaContext.bucketLabel.toLowerCase()} ${selectedSlaContext.groupKey === 'response' ? 'response' : 'closure'} SLA queries`;
    closeSlaDetail();
    queryDetailTab = 'conversation';
    activeTab = 'queries';
  }

  function openOperationalTransactions(metric, urgentOnly = false) {
    const count = Number((urgentOnly ? metric.urgentValue : metric.value).replace(/,/g, ''));
    const urgentCount = Number(metric.urgentValue.replace(/,/g, ''));
    const cases = buildOperationalCases(selectedPeriod, metric.key, count, urgentOnly, urgentCount);
    workspaceItemsOverride = cases;
    workspaceOperationalContext = {
      metric,
      urgentOnly,
      totalCount: Number(metric.value.replace(/,/g, '')),
      urgentCount
    };
    selectedTransactionId = cases[0]?.id || selectedTransactionId;
    transactionFilter = 'All';
    statusFilter = 'All';
    pressureFocus = 'all';
    workspaceSummary = urgentOnly
      ? `${metric.urgentValue} queries that ${metric.urgentLabel}`
      : `${metric.value} ${metric.title.toLowerCase()} queries`;
    queryDetailTab = 'conversation';
    activeTab = 'queries';
  }

  function setPersona(nextPersona) {
    persona = nextPersona;
    if (nextPersona === 'email') {
      activeTab = 'email';
    } else if (nextPersona === 'sender') {
      activeTab = ['dashboard', 'queries', 'insights', 'settings'].includes(activeTab) ? activeTab : 'dashboard';
    } else if (receiverRole === 'clerk' && (activeTab === 'settings' || activeTab === 'senders')) {
      activeTab = 'dashboard';
    }
    if (activeTab === 'dashboard') {
      pressureDetailOpen = false;
    }
  }

  function setReceiverRole(nextRole) {
    receiverRole = nextRole;
    workspaceItemsOverride = null;
    workspaceOperationalContext = null;
    workspaceSummary = nextRole === 'clerk' ? `${selectedApClerk}'s assigned supplier queries` : 'All tracked Community queries';
    transactionFilter = 'All';
    statusFilter = 'All';
    pressureFocus = 'all';
    if (nextRole === 'clerk' && (activeTab === 'settings' || activeTab === 'senders')) {
      activeTab = 'dashboard';
    }
  }

  function openExpectedCashDetail(level = 'month', item = null, trail = []) {
    expectedCashSelection = { level, item, trail };
    expectedCashView = 'timeline';
    expectedCashDetailOpen = true;
  }

  function closeExpectedCashDetail() {
    expectedCashDetailOpen = false;
    expectedCashSelection = null;
    expectedCashView = 'timeline';
  }

  function selectExpectedCashMonth(month) {
    openExpectedCashDetail('week', month, [month.label]);
  }

  function selectExpectedCashWeek(week) {
    openExpectedCashDetail('day', week, [...(expectedCashSelection?.trail || []), week.label]);
  }

  function selectExpectedCashDay(day) {
    openExpectedCashDetail('detail', day, [...(expectedCashSelection?.trail || []), day.label]);
  }

  function backExpectedCashLevel() {
    if (!expectedCashSelection || expectedCashSelection.level === 'month') {
      closeExpectedCashDetail();
      return;
    }

    if (expectedCashSelection.level === 'detail') {
      const month = currentSenderExpectedCash.months.find((item) => item.label === expectedCashSelection.trail[0]);
      const week = month?.weeks.find((item) => item.label === expectedCashSelection.trail[1]);
      if (week) {
        openExpectedCashDetail('day', week, expectedCashSelection.trail.slice(0, 2));
        return;
      }
    }

    if (expectedCashSelection.level === 'day') {
      const month = currentSenderExpectedCash.months.find((item) => item.label === expectedCashSelection.trail[0]);
      openExpectedCashDetail('week', month, expectedCashSelection.trail.slice(0, 1));
      return;
    }

    openExpectedCashDetail('month', null, []);
  }

  function openPressureDriver(driverKey) {
    workspaceItemsOverride = null;
    workspaceOperationalContext = null;
    const targets = {
      'payment-holds': {
        summary: 'Invoices currently on payment hold',
        count: 8,
        global: true
      },
      'dispatch-delays': {
        summary: 'Orders currently delayed after dispatch promise',
        count: 5,
        global: true
      },
      'open-queries': {
        id: communityTransactions.find((item) => item.waitingExternal)?.id || communityTransactions[0].id,
        type: 'All',
        status: 'All',
        focus: 'waitingExternal',
        summary: 'Transactions waiting on customer or supplier response'
      }
    };

    const senderInvoiceActivity = {
      '7d': {
        submitted: { value: '28', note: 'Invoices submitted into Community customers this week' },
        submittedValue: { value: '£118.4k', note: 'Total value of recently sent invoices' },
        awaitingPayment: { value: '14', note: 'Invoices still awaiting approval or payment' },
        rows: [
          { reference: 'INV-24102', customer: 'Apex Retail UK', submittedAt: '16 May', amount: '£8,420', status: 'Approved for payment', note: 'Expected in the week of 20 May', tone: 'good' },
          { reference: 'INV-24108', customer: 'Metro Builders Group', submittedAt: '17 May', amount: '£5,960', status: 'Matching in progress', note: 'Three-way match still in progress', tone: 'medium' },
          { reference: 'INV-24111', customer: 'Greenline Wholesale', submittedAt: '18 May', amount: '£3,740', status: 'Query raised', note: 'Quantity variance under review', tone: 'high' },
          { reference: 'INV-24114', customer: 'Riverside Foods', submittedAt: '19 May', amount: '£6,180', status: 'Sent', note: 'Awaiting first processing update', tone: 'medium' }
        ]
      },
      '30d': {
        submitted: { value: '124', note: 'Invoices submitted across Community customers' },
        submittedValue: { value: '£512.8k', note: 'Total value sent into the selected period' },
        awaitingPayment: { value: '46', note: 'Invoices still awaiting approval, payment, or clarification' },
        rows: [
          { reference: 'INV-24084', customer: 'Apex Retail UK', submittedAt: '12 May', amount: '£12,640', status: 'Approved for payment', note: 'Expected settlement in the week of 27 May', tone: 'good' },
          { reference: 'INV-24091', customer: 'Greenline Wholesale', submittedAt: '13 May', amount: '£7,180', status: 'Scheduled for payment', note: 'Remittance expected before payment release', tone: 'good' },
          { reference: 'INV-24096', customer: 'Metro Builders Group', submittedAt: '15 May', amount: '£4,920', status: 'Matching in progress', note: 'Awaiting GRN confirmation', tone: 'medium' },
          { reference: 'INV-24099', customer: 'Northgate Services', submittedAt: '16 May', amount: '£9,560', status: 'Query raised', note: 'Pricing difference flagged by AP team', tone: 'high' },
          { reference: 'INV-24101', customer: 'South Coast Distribution', submittedAt: '17 May', amount: '£3,480', status: 'Sent', note: 'No exception currently shown', tone: 'medium' }
        ]
      },
      '90d': {
        submitted: { value: '358', note: 'Invoices submitted across Community customers' },
        submittedValue: { value: '£1.46m', note: 'Total invoice value sent into the selected period' },
        awaitingPayment: { value: '118', note: 'Invoices still awaiting approval, payment, or clarification' },
        rows: [
          { reference: 'INV-23984', customer: 'Apex Retail UK', submittedAt: '08 Apr', amount: '£16,280', status: 'Approved for payment', note: 'Settlement timing available from remittance data', tone: 'good' },
          { reference: 'INV-24007', customer: 'Metro Builders Group', submittedAt: '18 Apr', amount: '£6,940', status: 'Matching in progress', note: 'Still waiting on delivery confirmation', tone: 'medium' },
          { reference: 'INV-24031', customer: 'Vertex Industrial', submittedAt: '29 Apr', amount: '£4,180', status: 'Query raised', note: 'Beneficiary detail confirmation requested', tone: 'high' },
          { reference: 'INV-24062', customer: 'Riverside Foods', submittedAt: '07 May', amount: '£8,760', status: 'Scheduled for payment', note: 'Expected in the next remittance batch', tone: 'good' },
          { reference: 'INV-24099', customer: 'Northgate Services', submittedAt: '16 May', amount: '£9,560', status: 'Query raised', note: 'Pricing difference still under review', tone: 'high' }
        ]
      }
    };

    const senderCustomerBreakdown = {
      '7d': [
        { customer: 'Apex Retail UK', invoices: '9', value: '£34.6k', queries: '3', expectedCash: '£12.2k', note: 'Largest current expected payment position' },
        { customer: 'Metro Builders Group', invoices: '6', value: '£18.4k', queries: '2', expectedCash: '£9.5k', note: 'Most activity still in matching' },
        { customer: 'Greenline Wholesale', invoices: '5', value: '£14.9k', queries: '2', expectedCash: '£6.0k', note: 'Highest query rate this week' }
      ],
      '30d': [
        { customer: 'Apex Retail UK', invoices: '38', value: '£142.6k', queries: '9', expectedCash: '£26.4k', note: 'Your biggest Community customer in the selected period' },
        { customer: 'Greenline Wholesale', invoices: '26', value: '£94.1k', queries: '11', expectedCash: '£18.5k', note: 'Highest query volume relative to invoice count' },
        { customer: 'Metro Builders Group', invoices: '24', value: '£82.8k', queries: '7', expectedCash: '£22.7k', note: 'Strong near-term expected cash position' },
        { customer: 'Northgate Services', invoices: '18', value: '£66.2k', queries: '6', expectedCash: '£10.8k', note: 'Most recent manual query raised' }
      ],
      '90d': [
        { customer: 'Apex Retail UK', invoices: '96', value: '£381.4k', queries: '24', expectedCash: '£54.2k', note: 'Largest long-term payment relationship in view' },
        { customer: 'Greenline Wholesale', invoices: '72', value: '£248.9k', queries: '28', expectedCash: '£39.1k', note: 'Most query-heavy account relative to invoice volume' },
        { customer: 'Metro Builders Group', invoices: '63', value: '£221.8k', queries: '19', expectedCash: '£47.3k', note: 'Most stable expected cash cadence' },
        { customer: 'Northgate Services', invoices: '44', value: '£156.7k', queries: '14', expectedCash: '£24.8k', note: 'Largest unresolved invoice value today' }
      ]
    };

    const senderRemittanceOpportunity = {
      '7d': {
        available: { value: '9', note: 'Remittances available for invoices in this period' },
        coveredValue: { value: '£22.4k', note: 'Payment value already supported by remittance detail' },
        erpReady: { value: '6', note: 'Could be fed directly into your ERP automatically' },
        benefits: [
          'Receive remittance detail directly into your ERP instead of downloading and keying it manually.',
          'Improve cash application by matching remittance information earlier in the payment cycle.',
          'Use the same remittance data to strengthen your expected cash visibility.'
        ]
      },
      '30d': {
        available: { value: '43', note: 'Remittances available for invoices in this period' },
        coveredValue: { value: '£118.9k', note: 'Payment value already supported by remittance detail' },
        erpReady: { value: '31', note: 'Could be fed directly into your ERP automatically' },
        benefits: [
          'Send remittance detail straight into your ERP to reduce manual cash allocation effort.',
          'Give finance teams earlier confirmation of what has been paid and how it should be matched.',
          'Turn remittance visibility on this screen into an operational feed that supports reconciliation.'
        ]
      },
      '90d': {
        available: { value: '134', note: 'Remittances available for invoices in this period' },
        coveredValue: { value: '£346.7k', note: 'Payment value already supported by remittance detail' },
        erpReady: { value: '96', note: 'Could be fed directly into your ERP automatically' },
        benefits: [
          'Automate a larger share of remittance handling across multiple customers using the same ERP feed.',
          'Reduce manual reconciliation effort across high-volume paying customers.',
          'Create a clearer audit trail from remittance receipt through to cash posting.'
        ]
      }
    };

    const target = targets[driverKey];
    if (!target) return;

    if (target.global) {
      pressureHelperOpen = false;
      openAllTransactions({
        summary: target.summary,
        count: target.count,
        contextKey: driverKey === 'payment-holds' ? 'community-payment-holds' : 'community-dispatch-delays'
      });
      return;
    }

    selectedTransactionId = target.id;
    transactionFilter = target.type;
    statusFilter = target.status;
    pressureFocus = target.focus;
    workspaceSummary = target.summary;
    queryDetailTab = 'conversation';
    activeTab = 'queries';
    pressureHelperOpen = false;
  }

  function openAiOpportunityDetail(item) {
    const focusKey = getAiOpportunityKey(item.label);
    if (item.label === 'High-friction escalations') {
      selectedAiOpportunity = {
        ...item,
        actionLabel: 'Open improvement detail',
        summary: 'These are the journeys where EVA did not answer well enough and the team had to step in.',
        guidance: [
          'Review the repeated queries first to confirm whether the issue is missing knowledge, weak answer confidence, or genuinely complex handling.',
          'Prioritise themes that combine high volume with repeatable answers before changing the wider knowledge base.'
        ],
        onAction: () => openReceiverInsightsFocus(focusKey)
      };
      aiOpportunityDetailOpen = true;
      return;
    }

    if (item.label === 'Best automation opportunity') {
      selectedAiOpportunity = {
        ...item,
        actionLabel: 'Open improvement detail',
        summary: 'These themes already have repeatable outcomes and are the best place to reduce future manual workload.',
        guidance: [
          'Open the matching queries and compare how often the final answer follows the same pattern.',
          'Where the answer is consistent, promote that answer path into EVA and the knowledge base.'
        ],
        onAction: () => openReceiverInsightsFocus(focusKey)
      };
      aiOpportunityDetailOpen = true;
      return;
    }

    if (item.label === 'Next knowledge update') {
      selectedAiOpportunity = {
        ...item,
        actionLabel: 'Open improvement detail',
        summary: 'This is a proactive knowledge gap: the same topic is reaching manual handling often enough that focused guidance could stop future queries getting that far.',
        guidance: [
          'Create a focused knowledge update on this topic so EVA can answer the question before it needs to be raised as a tracked query.',
          'Use the repeated manual journeys as evidence of the gap, then publish the approved guidance into EVA for inbox and chat use.'
        ],
        onAction: () => openReceiverInsightsFocus(focusKey)
      };
      aiOpportunityDetailOpen = true;
      return;
    }

    if (item.label === 'Teach EVA from closed query resolutions') {
      selectedAiOpportunity = {
        ...item,
        actionLabel: 'Open improvement detail',
        summary: 'These are the strongest assisted-learning candidates: EVA missed them, a human resolved them, and the resolution can now be reused automatically.',
        guidance: [
          'Start with the closed queries where the final response is clear, consistent, and not customer-specific.',
          'Link the resolved answer back to the original question context so EVA can replay the same logic next time the journey appears.'
        ],
        onAction: () => openReceiverInsightsFocus(focusKey)
      };
      aiOpportunityDetailOpen = true;
      return;
    }
  }

  function closeAiOpportunityDetail() {
    aiOpportunityDetailOpen = false;
    selectedAiOpportunity = null;
  }

  $: activeTabs =
    persona === 'email'
      ? []
      : persona === 'receiver'
      ? receiverRole === 'manager'
        ? receiverManagerTabs
        : receiverClerkTabs
      : baseTabs;
  $: if (activeTabs.length && !activeTabs.some((tab) => tab.id === activeTab)) {
    activeTab = 'dashboard';
  }
  $: currentClerkProfile = getApClerkProfile();
  $: receiverBaseItems = [...automatedWorkflowQueries, missingInvoiceReceiverQuery, ...communityTransactions];
  $: receiverRoleItems =
    receiverRole === 'clerk'
      ? receiverBaseItems.filter((item) => currentClerkProfile.senders.includes(item.party))
      : receiverBaseItems;
  $: receiverSenderPortfolio = [...new Set(receiverBaseItems.map((item) => item.party))]
    .map((sender) => {
      const items = receiverBaseItems.filter((item) => item.party === sender);
      const openItems = items.filter((item) => receiverQueryStatus(item) !== 'Closed');
      const closedItems = items.filter((item) => receiverQueryStatus(item) === 'Closed');
      const slaMeasuredItems = items.filter(hasReceiverSla);
      const slaHitItems = slaMeasuredItems.filter(
        (item) => receiverQuerySla(item).response.tone === 'good' && receiverQuerySla(item).closure.tone === 'good'
      );
      return {
        name: sender,
        items,
        queries: items.length,
        open: openItems.length,
        closed: closedItems.length,
        transactions: items.length * 18 + sender.length,
        owner: getSenderOwner(sender),
        priority: prioritySenderIds.includes(sender),
        slaRate: slaMeasuredItems.length ? Math.round((slaHitItems.length / slaMeasuredItems.length) * 100) : 100,
        latest: items[0]?.nextMilestone || 'No recent query activity'
      };
    })
    .sort((a, b) => Number(b.priority) - Number(a.priority) || b.open - a.open || b.queries - a.queries);
  $: senderPortfolioSearchTerm = senderPortfolioSearch.trim().toLowerCase();
  $: receiverSenderPortfolioScope =
    receiverRole === 'clerk' && clerkSenderScope === 'assigned'
      ? receiverSenderPortfolio.filter((sender) => currentClerkProfile.senders.includes(sender.name))
      : receiverSenderPortfolio;
  $: filteredReceiverSenderPortfolio = senderPortfolioSearchTerm
    ? receiverSenderPortfolioScope.filter((sender) =>
        [sender.name, sender.owner, sender.latest].some((value) => String(value).toLowerCase().includes(senderPortfolioSearchTerm))
      )
    : receiverSenderPortfolioScope;
  $: selectedReceiverSenderRow =
    receiverSenderPortfolio.find((sender) => sender.name === selectedReceiverSender) || receiverSenderPortfolio[0];
  $: selectedVisibleReceiverSenderRow =
    filteredReceiverSenderPortfolio.find((sender) => sender.name === selectedReceiverSender) || filteredReceiverSenderPortfolio[0];
  $: clerkSenderRows = receiverSenderPortfolio.filter((sender) => currentClerkProfile.senders.includes(sender.name));
  $: clerkOpenQueryCount = receiverRoleItems.filter((item) => receiverQueryStatus(item) !== 'Closed').length;
  $: clerkSlaRiskCount = receiverRoleItems.filter(
    (item) =>
      hasReceiverSla(item) &&
      (receiverQuerySla(item).response.tone !== 'good' || receiverQuerySla(item).closure.tone !== 'good')
  ).length;
  $: clerkAwaitingExternalCount = receiverRoleItems.filter((item) => receiverQueryStatus(item) === 'Awaiting external response').length;
  $: clerkSlaGroups = buildSlaGroupsForItems(receiverRoleItems.filter(hasReceiverSla));
  $: clerkFocusQueries = [...receiverRoleItems]
    .sort(
      (a, b) =>
        Number(hasReceiverSla(b) && (receiverQuerySla(b).response.tone === 'critical' || receiverQuerySla(b).closure.tone === 'critical')) -
          Number(hasReceiverSla(a) && (receiverQuerySla(a).response.tone === 'critical' || receiverQuerySla(a).closure.tone === 'critical')) ||
        Number(Boolean(b.urgent)) - Number(Boolean(a.urgent))
    )
    .slice(0, 5);
  $: currentReceiverMetrics = receiverPeriodMetrics[selectedPeriod];
  $: currentReceiverServiceMetrics = receiverServiceMetrics[selectedPeriod];
  $: currentHeatmap = receiverQueryHeatmaps[selectedPeriod][heatmapMode];
  $: currentHeatmapValues = currentHeatmap.values.flat();
  $: currentHeatmapMin = Math.min(...currentHeatmapValues);
  $: currentHeatmapMax = Math.max(...currentHeatmapValues);
  $: currentReceiverSenderMix = receiverSenderMix[selectedPeriod];
  $: currentReceiverAiIntelligence = receiverAiIntelligence[selectedPeriod];
  $: currentReceiverUserBreakdown = receiverUserBreakdown[selectedPeriod];
  $: currentReceiverInsights = receiverInsightData[selectedPeriod];
  $: currentSenderMetrics = senderPeriodMetrics[selectedPeriod];
  $: currentSenderInboxAssistant = senderInboxAssistant[selectedPeriod];
  $: currentSenderInvoiceActivity = senderInvoiceActivity[selectedPeriod];
  $: currentSenderCustomerBreakdown = senderCustomerBreakdown[selectedPeriod];
  $: currentSenderRemittanceOpportunity = senderRemittanceOpportunity[selectedPeriod];
  $: currentSenderInsights = senderInsightData[selectedPeriod];
  $: currentSenderExpectedCash = senderExpectedCashBreakdown[selectedPeriod];
  $: queryInteractionVersion;
  $: currentSenderQueries = [missingInvoiceSenderQuery, ...senderQueryData[selectedPeriod]];
  $: senderQueryCustomerOptions = ['All', ...new Set(currentSenderQueries.map((item) => item.customer))];
  $: senderQueryStatusOptions = ['All', ...new Set(currentSenderQueries.map((item) => item.status))];
  $: filteredSenderQueries = currentSenderQueries.filter((item) => {
    if (senderQueryCustomerFilter !== 'All' && item.customer !== senderQueryCustomerFilter) return false;
    if (senderQueryStatusFilter !== 'All' && item.status !== senderQueryStatusFilter) return false;
    return true;
  });
  $: senderQuerySummarySource =
    senderQueryCustomerFilter === 'All'
      ? currentSenderQueries
      : currentSenderQueries.filter((item) => item.customer === senderQueryCustomerFilter);
  $: senderQueryStatusSummary = ['Awaiting your response', 'With customer', 'In review', 'Closed'].map((status) => {
    const matches = senderQuerySummarySource.filter((item) => item.status === status);
    return {
      status,
      count: matches.length,
      tone: senderQueryStatusTone(status),
      breakdown: summariseSenderQueryCustomers(matches)
    };
  });
  $: if (filteredSenderQueries.length && !filteredSenderQueries.some((item) => item.id === selectedSenderQueryId)) {
    selectedSenderQueryId = filteredSenderQueries[0].id;
  }
  $: if (pendingSenderQueryReference && currentSenderQueries.length) {
    const matchedQuery = currentSenderQueries.find(
      (item) => item.id === pendingSenderQueryReference || item.queryReference === pendingSenderQueryReference
    );
    if (matchedQuery) {
      persona = 'sender';
      activeTab = 'queries';
      selectedSenderQueryId = matchedQuery.id;
      senderQueryCustomerFilter = 'All';
      senderQueryStatusFilter = 'All';
      pendingSenderQueryReference = null;
    }
  }
  $: selectedSenderQuery =
    currentSenderQueries.find((item) => item.id === selectedSenderQueryId) || currentSenderQueries[0];
  $: selectedSenderQueryMessages = selectedSenderQuery?.messages || [];
  $: senderOpenQueryCount = currentSenderQueries.filter((item) => item.status !== 'Closed').length;
  $: senderAwaitingYourResponseCount = currentSenderQueries.filter((item) => item.waitingOn === 'You').length;
  $: if (selectedSenderQuery && senderStatusDraftFor !== selectedSenderQuery.id) {
    senderStatusDraft = selectedSenderQuery.status;
    senderStatusDraftFor = selectedSenderQuery.id;
    senderReplyText = '';
    senderExcludeFromEva = false;
    uploadedInvoiceFileName = '';
  }
  $: if (!currentSenderCustomerBreakdown.some((row) => row.customer === senderAssistantCustomer)) {
    senderAssistantCustomer = currentSenderCustomerBreakdown[0]?.customer || '';
  }
  $: expectedCashDays = getExpectedCashDays();
  $: expectedCashCustomerRows = Object.values(
    expectedCashDays
      .flatMap((day) => buildExpectedCashCustomerBreakdown(day))
      .reduce((acc, row) => {
        if (!acc[row.customer]) {
          acc[row.customer] = { customer: row.customer, amount: 0, days: new Set() };
        }
        acc[row.customer].amount += row.amount;
        acc[row.customer].days.add(row.date);
        return acc;
      }, {})
  )
    .map((row) => ({ ...row, amount: Number(row.amount.toFixed(2)), dayCount: row.days.size }))
    .sort((a, b) => b.amount - a.amount);
  $: expectedCashTransactions = expectedCashDays
    .flatMap((day) => buildExpectedCashCustomerBreakdown(day))
    .map((row, index) => ({
      id: `${row.reference}-${index + 1}`,
      reference: row.reference,
      customer: row.customer,
      expectedDate: row.date,
      amount: row.amount
    }));
  $: queryInteractionVersion;
  $: workspaceItems = workspaceItemsOverride || receiverRoleItems;
  $: workspaceSlaItems = workspaceItems.filter(hasReceiverSla);
  $: receiverQueryStatusOptions = ['All', ...new Set(workspaceItems.map((item) => receiverQueryStatus(item)))];
  $: receiverQueryStatusSummary = ['Awaiting external response', 'In review', 'Closed'].map((status) => {
    const matches = workspaceItems.filter((item) => receiverQueryStatus(item) === status);
    return {
      status,
      count: matches.length,
      tone: receiverQueryStatusTone(status),
      breakdown: summariseReceiverQueryParties(matches)
    };
  });
  $: receiverResponseSlaSummary = {
    total: workspaceSlaItems.filter((item) => receiverQuerySla(item).response.tone !== 'good').length,
    missed: workspaceSlaItems.filter((item) => receiverQuerySla(item).response.tone === 'critical').length,
    close: workspaceSlaItems.filter((item) => receiverQuerySla(item).response.tone === 'high').length
  };
  $: receiverClosureSlaSummary = {
    total: workspaceSlaItems.filter((item) => receiverQuerySla(item).closure.tone !== 'good').length,
    missed: workspaceSlaItems.filter((item) => receiverQuerySla(item).closure.tone === 'critical').length,
    close: workspaceSlaItems.filter((item) => receiverQuerySla(item).closure.tone === 'high').length
  };
  $: transactionTypes = ['All', ...new Set(workspaceItems.map((item) => item.type))];
  $: selectedTransaction =
    workspaceItems.find((item) => item.id === selectedTransactionId) || workspaceItems[0];
  $: filteredTransactions = workspaceItems.filter((item) => {
    if (transactionFilter !== 'All' && item.type !== transactionFilter) return false;
    if (statusFilter !== 'All' && receiverQueryStatus(item) !== statusFilter) return false;
    if (automationFilter === 'Only automated' && !item.automatedSequence) return false;
    if (automationFilter === 'Exclude automated' && item.automatedSequence) return false;
    if (pressureFocus === 'waitingExternal' && !item.waitingExternal) return false;
    return true;
  });
  $: displayedTransactions = [...filteredTransactions].sort((a, b) => Number(Boolean(b.urgent)) - Number(Boolean(a.urgent)));
  $: openMessages = communityTransactions.filter((item) => item.messages.length);
  $: selectedQueryMessages = selectedTransaction?.messages || [];
  $: if (selectedTransaction && receiverStatusDraftFor !== selectedTransaction.id) {
    receiverStatusDraft = receiverQueryStatus(selectedTransaction);
    receiverStatusDraftFor = selectedTransaction.id;
    receiverReplyText = '';
    receiverExcludeFromEva = false;
  }
  $: maxCashflow = Math.max(...communityCashflowForecast.map((item) => amountValue(item.total)));
  $: maxOutstanding = Math.max(...communityOutstandingInvoices.statuses.map((item) => amountValue(item.amount)));
  $: communityPressure = pressureDrivers.reduce((total, driver) => total + driver.points, 0);
  $: communityPressureBand =
    pressureBands.find((band) => {
      const [min, max] = band.range.split('-').map(Number);
      return communityPressure >= min && communityPressure <= max;
    }) || pressureBands[pressureBands.length - 1];
</script>

<div class="page-header">
  <div class="page-header-main">
    <span class="icon-tile">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 5h16v10H7l-3 3z" />
        <path d="M8 9h8M8 12h5" />
      </svg>
    </span>
    <h1>Community</h1>

    {#if persona === 'sender' && !senderMandateBannerDismissed}
      <aside class="sender-mandate-banner" aria-label="2029 eInvoicing mandate">
        <div class="sender-mandate-copy">
          <span class="sender-mandate-kicker">UK Government 2029 eInvoicing mandate</span>
          <p>
            Are you ready to comply with the Government's 2029 eInvoicing mandate for both the invoices you
            send and the invoices you receive?
          </p>
        </div>

        <div class="sender-mandate-actions">
          <button type="button" class="ghost-btn">Read More</button>
          <button type="button" class="ghost-btn solid">Get In Touch</button>
        </div>

        <button
          type="button"
          class="sender-mandate-close"
          aria-label="Dismiss 2029 eInvoicing mandate message"
          on:click={() => (senderMandateBannerDismissed = true)}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </aside>
    {/if}
  </div>

  <div class="persona-switch">
    {#each personas as option}
      <button class:active={persona === option.id} class="persona-btn" on:click={() => setPersona(option.id)}>
        {option.label}
      </button>
    {/each}
  </div>
</div>

<section class="panel main-card">
  {#if persona !== 'email'}
    <div class="tabs-row primary">
      <div class="tabs-group">
        {#each activeTabs as tab}
          <button class:active={activeTab === tab.id} class="tab" on:click={() => (activeTab = tab.id)}>
            {tab.label}
          </button>
        {/each}
      </div>

      {#if persona === 'sender'}
        <button type="button" class="ghost-btn solid topbar-cta" on:click={() => openEvaAssistant('query', '', 'raise-query-demo')}>
          Raise Query
        </button>
      {:else}
        <div class="receiver-role-tools">
          <div class="role-switch" aria-label="Receiver role">
            {#each receiverRoles as role}
              <button class:active={receiverRole === role.id} class="role-switch-btn" on:click={() => setReceiverRole(role.id)}>
                {role.label}
              </button>
            {/each}
          </div>
          {#if receiverRole === 'clerk'}
            <label class="control-field clerk-select">
              <select bind:value={selectedApClerk} on:change={() => setReceiverRole('clerk')}>
                {#each apClerkProfiles as profile}
                  <option value={profile.name}>{profile.name}</option>
                {/each}
              </select>
            </label>
          {/if}
        </div>
      {/if}
    </div>
  {/if}

  {#if persona === 'email'}
    <div class="email-demo-shell">
      <div class="email-demo-header">
        <div>
          <span class="section-kicker">Email automation</span>
          <h2 class="dashboard-title">Sender email answered automatically by EVA</h2>
        </div>
        <span class="status-pill good">No human handling required</span>
      </div>

      <section class="email-thread">
        <article class="email-card inbound">
          <div class="email-card-head">
            <div>
              <span class="email-label">Incoming sender email</span>
              <h3>{emailPortalDemo.subject}</h3>
            </div>
            <span>{emailPortalDemo.receivedAt}</span>
          </div>
          <dl class="email-meta-grid">
            <div>
              <dt>From</dt>
              <dd>{emailPortalDemo.sender} • {emailPortalDemo.senderEmail}</dd>
            </div>
            <div>
              <dt>To</dt>
              <dd>{emailPortalDemo.recipient}</dd>
            </div>
          </dl>
          <div class="email-body">
            <p>Hi AP team,</p>
            <p>
              Could you confirm when invoice <strong>{emailPortalDemo.invoice}</strong> for
              <strong>{emailPortalDemo.amount}</strong> is due to be paid? We cannot see a remittance yet and need to update our cash forecast.
            </p>
            <p>Thanks,<br />{emailPortalDemo.sender}</p>
          </div>
        </article>

        {#if !emailEvaResponseVisible}
          <div class="email-reveal-panel">
            <button class="ghost-btn solid" on:click={() => (emailEvaResponseVisible = true)}>
              Show EVA response
            </button>
          </div>
        {:else}
          <article class="email-card eva-response">
            <div class="email-card-head">
              <div>
                <span class="email-label">Automatic EVA response</span>
                <h3>Re: {emailPortalDemo.subject}</h3>
              </div>
              <span>Today • 09:15</span>
            </div>
            <dl class="email-meta-grid">
              <div>
                <dt>From</dt>
                <dd>EVA for Open ECX AP • eva@openecx.example</dd>
              </div>
              <div>
                <dt>To</dt>
                <dd>{emailPortalDemo.senderEmail}</dd>
              </div>
            </dl>
            <div class="email-body">
              <p>Hi {emailPortalDemo.sender.split(' ')[0]},</p>
              <p>
                I found invoice <strong>{emailPortalDemo.invoice}</strong>. It has been approved for payment and is scheduled
                for the next payment run on <strong>Friday 5 June 2026</strong>. The expected payment amount is
                <strong>{emailPortalDemo.amount}</strong>.
              </p>
              <p>
                No action is needed from you. A remittance notification will be available in the portal once the payment run is released.
              </p>
            </div>
            <footer class="eva-email-footer">
              <img src="/eva/EVA-Circle.png" alt="EVA" />
              <div>
                <strong>This response was sent automatically by EVA using live Community data.</strong>
                <p>
                  You can <a href={emailPortalDemo.portalLink}>log in to the portal</a> to view invoice status, remittances, and related queries.
                  If you need a human response, reply with <b>{emailPortalDemo.bypassWord}</b> and this will be logged as a query for the AP team.
                </p>
              </div>
            </footer>
            <aside class="email-mandate-callout" aria-label="UK eInvoicing mandate">
              <div class="sender-mandate-copy">
                <span class="sender-mandate-kicker">UK Government 2029 eInvoicing mandate</span>
                <p>
                  Community can help both senders and receivers move invoice queries, status updates, and supporting documents into a digital workflow ready for eInvoicing change.
                </p>
              </div>
              <div class="sender-mandate-actions">
                <button type="button" class="ghost-btn">Read More</button>
                <button type="button" class="ghost-btn solid">Get In Touch</button>
              </div>
            </aside>
            <div class="email-reveal-panel">
              <button class="ghost-btn" on:click={() => (emailEvaResponseVisible = false)}>
                Hide EVA response
              </button>
            </div>
          </article>
        {/if}
      </section>
    </div>
  {:else if activeTab === 'dashboard'}
    <div class="dashboard-shell">
      <div class="dashboard-toolbar">
        <div>
          <span class="section-kicker">Dashboard</span>
          <h2 class="dashboard-title">
            {persona === 'receiver'
              ? 'Query performance and service control'
              : 'Status visibility, remittances, and expected cash'}
          </h2>
        </div>

        <label class="control-field period-field">
          <span>Time period</span>
          <select bind:value={selectedPeriod}>
            {#each periodOptions as period}
              <option value={period.id}>{period.label}</option>
            {/each}
          </select>
        </label>
      </div>

      {#if persona === 'receiver'}
        {#if receiverRole === 'clerk'}
          <section class="clerk-focus-panel">
            <div>
              <span class="section-kicker">AP Clerk workspace</span>
              <h3>{selectedApClerk}'s assigned sender queue</h3>
              <p>{currentClerkProfile.focus}</p>
            </div>
            <div class="clerk-focus-stats">
              <article>
                <span>Assigned senders</span>
                <strong>{currentClerkProfile.senders.length}</strong>
              </article>
              <article>
                <span>Open queries</span>
                <strong>{clerkOpenQueryCount}</strong>
              </article>
              <article>
                <span>SLA risk</span>
                <strong>{clerkSlaRiskCount}</strong>
              </article>
              <article>
                <span>Awaiting sender</span>
                <strong>{clerkAwaitingExternalCount}</strong>
              </article>
            </div>
          </section>
        {/if}

        {#if receiverRole === 'manager'}
        <section class="content-grid receiver-layout">
          <div class="receiver-grid-guide" aria-hidden="true">
            {#each Array.from({ length: 12 }, (_, index) => index + 1) as column}
              <span>C{column}</span>
            {/each}
          </div>
          {#each Array.from({ length: 6 }, (_, index) => index + 1) as row}
            <div class="receiver-row-guide row-{row}" aria-hidden="true">
              <span>R{row}</span>
            </div>
          {/each}
          <div class="stack">
            <article class="subpanel">
              <span class="grid-ref">R1 C1-7</span>
              <div class="section-head">
                <div>
                  <span class="section-kicker">Immediate focus</span>
                  <h3>Queries and exceptions needing attention</h3>
                </div>
              </div>

              <div class="receiver-pressure-layout">
                <div class="hero-score {pressureBandClass(communityPressureBand.label)}">
                  <span class="hero-label">Community pressure</span>
                  <strong>{communityPressure}</strong>
                  <span class="hero-note">{communityPressureBand.label} pressure: {communityPressureBand.note}</span>
                  <div class="hero-actions-row">
                    <button class="helper-trigger" on:click={openPressureHelper}>What this means</button>
                    <button class="helper-trigger" on:click={togglePressureDetail}>
                      {pressureDetailOpen ? 'Hide detail' : 'Detail'}
                    </button>
                  </div>

                  {#if pressureDetailOpen}
                    <div class="helper-breakdown">
                      {#each pressureDrivers as driver}
                        <button class="driver-row" on:click={() => openPressureDriver(driver.key)}>
                          <div>
                            <strong>{driver.label}</strong>
                            <span>{driver.basis}</span>
                          </div>
                          <span class="driver-points">+{driver.points}</span>
                        </button>
                      {/each}
                    </div>
                  {/if}
                </div>

                <div class="queue-grid">
                  {#each communityPriorityQueues as queue}
                    <button class="queue-card {queue.severity}" on:click={() => openCommunityPriorityQueue(queue)}>
                      <div class="queue-top">
                        <span class="severity-pill {queue.severity}">{queue.severity}</span>
                        <strong>{queue.count}</strong>
                      </div>
                      <h4>{queue.title}</h4>
                      <p>{queue.detail}</p>
                      <span class="queue-action">{queue.action}</span>
                    </button>
                  {/each}
                </div>
              </div>
            </article>

            <section class="receiver-lower-right">
              <article class="subpanel">
                <span class="grid-ref">R4 C8-12</span>
                <div class="section-head">
                  <div>
                    <span class="section-kicker">Tracked activity</span>
                    <h3>Latest transactions and exceptions</h3>
                  </div>
                </div>

                <div class="transaction-grid">
                  {#each communityTransactions.slice(0, 3) as item}
                    <button class="transaction-card compact-activity-card" on:click={() => openCommunityTransactionContext(item)}>
                      <div class="activity-type-row">
                        <span class="card-type">{item.type}</span>
                        <span class="activity-party-chip">{item.party}</span>
                      </div>
                      <h4>{item.reference}</h4>
                      <div class="transaction-footer compact-activity-footer">
                        <span class="activity-summary">{item.amount} • {item.nextMilestone} • {item.nextEta}</span>
                        <span class="status-pill {toneClass(item.statusTone)}">{item.status}</span>
                      </div>
                    </button>
                  {/each}
                </div>
              </article>

              <article class="subpanel heatmap-panel">
                <span class="grid-ref">R4 C8-12</span>
                <div class="section-head">
                  <div>
                    <span class="section-kicker">Query demand</span>
                    <h3>When queries are typically logged</h3>
                  </div>
                  <div class="mini-switch">
                    <button class:active={heatmapMode === 'weekday'} class="mini-switch-btn" on:click={() => (heatmapMode = 'weekday')}>
                      Day / hour
                    </button>
                    <button class:active={heatmapMode === 'monthday'} class="mini-switch-btn" on:click={() => (heatmapMode = 'monthday')}>
                      Month pattern
                    </button>
                  </div>
                </div>

                <div class="heatmap-shell">
                  <div class="heatmap-header" style={`grid-template-columns: 72px repeat(${currentHeatmap.columns.length}, minmax(0, 1fr));`}>
                    <span></span>
                    {#each currentHeatmap.columns as column}
                      <span>{column}</span>
                    {/each}
                  </div>

                  {#each currentHeatmap.values as row, rowIndex}
                    <div class="heatmap-row" style={`grid-template-columns: 72px repeat(${currentHeatmap.columns.length}, minmax(0, 1fr));`}>
                      <span class="heatmap-label">{currentHeatmap.labels[rowIndex]}</span>
                      {#each row as value}
                        <div
                          class="heatmap-cell"
                          style={`background: hsl(${120 * (1 - ((value - currentHeatmapMin) / Math.max(1, currentHeatmapMax - currentHeatmapMin)))} 72% 48%);`}
                          title={`${value} queries`}
                        >
                          {value}
                        </div>
                      {/each}
                    </div>
                  {/each}
                </div>

                <p class="heatmap-note">
                  Use this to spot repeat demand windows and plan cover for month end, weekday peaks, and late-afternoon escalation periods.
                </p>
              </article>
            </section>

            <article class="subpanel">
              <span class="grid-ref">R2 C1-7</span>
              <div class="section-head">
                <div>
                  <span class="section-kicker">Query outcomes</span>
                  <h3>Self-service and workflow performance</h3>
                </div>
              </div>

              <section class="top-summary-row receiver-top">
                <div class="value-card">
                  <span class="hero-label">Self-managed queries</span>
                  <div class="hero-statline">
                    <strong>{currentReceiverMetrics.selfManaged.value}</strong>
                    <span class="hero-ratio">({currentReceiverMetrics.selfManaged.change.split(' ')[0]} of all queries)</span>
                  </div>
                  <span class="hero-note">{currentReceiverMetrics.valueSummary}</span>
                </div>

                <div class="metric-grid top-metrics">
                  <article class="metric-card">
                    <span class="metric-title">Managed through Community</span>
                    <strong class="metric-value">{currentReceiverMetrics.managedInSystem.value}</strong>
                    <span class="metric-change medium">{currentReceiverMetrics.managedInSystem.change}</span>
                  </article>
                  <article class="metric-card accent-high">
                    <span class="metric-title">Outstanding queries</span>
                    <strong class="metric-value">{currentReceiverMetrics.outstanding.value}</strong>
                    <span class="metric-change high">{currentReceiverMetrics.outstanding.change}</span>
                  </article>
                  <article class="metric-card">
                    <span class="metric-title">Average first response</span>
                    <strong class="metric-value">{currentReceiverMetrics.avgResponse.value}</strong>
                    <span class="metric-change good">{currentReceiverMetrics.avgResponse.change}</span>
                  </article>
                </div>
              </section>
            </article>

            <article class="subpanel">
              <span class="grid-ref">R6 C1-4</span>
              <div class="section-head">
                <div>
                  <span class="section-kicker">Team breakdown</span>
                  <h3>Assigned workload and SLA performance</h3>
                </div>
              </div>

              <div class="team-breakdown-list">
                {#each currentReceiverUserBreakdown as row}
                  <article class="team-member-card">
                    <div class="team-member-head">
                      <div>
                        <strong>{row.user}</strong>
                        <span>{row.assigned} assigned • {row.closed} closed</span>
                      </div>
                      <span class="status-pill {row.nearBreach > 7 ? 'critical' : row.nearBreach > 4 ? 'high' : 'good'}">
                        {row.nearBreach} near breach
                      </span>
                    </div>

                    <div class="team-stats-grid">
                      <button class="team-stat-button" on:click={() => openTeamMetricTransactions(row, 'responseSla')}>
                        <span class="metric-title">Response SLA</span>
                        <strong>{row.responseSla}</strong>
                      </button>
                      <button class="team-stat-button" on:click={() => openTeamMetricTransactions(row, 'resolutionSla')}>
                        <span class="metric-title">Resolution SLA</span>
                        <strong>{row.resolutionSla}</strong>
                      </button>
                      <button class="team-stat-button" on:click={() => openTeamMetricDetail(row, 'avgResponse')}>
                        <span class="metric-title">Avg response</span>
                        <strong>{row.avgResponse}</strong>
                      </button>
                      <button class="team-stat-button" on:click={() => openTeamMetricDetail(row, 'avgResolution')}>
                        <span class="metric-title">Avg resolution</span>
                        <strong>{row.avgResolution}</strong>
                      </button>
                      <button class="team-stat-button" on:click={() => openTeamMetricTransactions(row, 'outstanding')}>
                        <span class="metric-title">Outstanding</span>
                        <strong>{row.outstanding}</strong>
                      </button>
                      <button class="team-stat-button" on:click={() => openTeamMetricTransactions(row, 'nearBreach')}>
                        <span class="metric-title">Close to SLA</span>
                        <strong>{row.nearBreach}</strong>
                      </button>
                    </div>
                  </article>
                {/each}
              </div>
            </article>

            <section class="receiver-left-lower">
              <article class="subpanel">
                <span class="grid-ref">R5 C1-4</span>
                <div class="section-head">
                  <div>
                    <span class="section-kicker">Sender hotspots</span>
                    <h3>Who is creating the most avoidable workload</h3>
                  </div>
                </div>

                <div class="sender-hotspot-list">
                  {#each currentReceiverSenderMix as row}
                    <article class="sender-hotspot-card">
                      <div class="sender-hotspot-head">
                        <div>
                          <strong>{row.sender}</strong>
                          <span>{row.transactions} transactions • {row.queries} queries raised</span>
                        </div>
                        <span class="status-pill {row.tone}">{row.queryRate}</span>
                      </div>
                      <p>{row.context}</p>
                    </article>
                  {/each}
                </div>
              </article>

              <article class="subpanel">
                <span class="grid-ref">R5 C1-4</span>
                <div class="section-head">
                  <div>
                    <span class="section-kicker">Insight signals</span>
                    <h3>Operational analytics in view</h3>
                  </div>
                </div>

                <section class="analytics-grid">
                  {#each communityInsights as insight}
                    <article class="metric-card">
                      <span class="metric-title">{insight.label}</span>
                      <strong class="metric-value">{insight.value}</strong>
                    </article>
                  {/each}
                </section>
              </article>
            </section>

            <article class="subpanel">
              <span class="grid-ref">R5 C5-12</span>
              <div class="section-head">
                <div>
                  <span class="section-kicker">AI improvement</span>
                  <h3>What can be answered automatically next time</h3>
                </div>
              </div>

              <div class="metric-grid compact-metrics">
                <article class="metric-card accent-good">
                  <span class="metric-title">Resolved through inbox AI or self-service</span>
                  <strong class="metric-value">{currentReceiverAiIntelligence.selfServed.value}</strong>
                  <span class="metric-change {currentReceiverAiIntelligence.selfServed.tone}">
                    {currentReceiverAiIntelligence.selfServed.change}
                  </span>
                </article>
                <article class="metric-card accent-high">
                  <span class="metric-title">Escalated into tracked queries</span>
                  <strong class="metric-value">{currentReceiverAiIntelligence.escalated.value}</strong>
                  <span class="metric-change {currentReceiverAiIntelligence.escalated.tone}">
                    {currentReceiverAiIntelligence.escalated.change}
                  </span>
                </article>
                <article class="metric-card">
                  <span class="metric-title">Average messages before answer</span>
                  <strong class="metric-value">{currentReceiverAiIntelligence.avgMessages.value}</strong>
                  <span class="metric-change {currentReceiverAiIntelligence.avgMessages.tone}">
                    {currentReceiverAiIntelligence.avgMessages.change}
                  </span>
                </article>
                <article class="metric-card accent-good">
                  <span class="metric-title">Ready to promote into AI answers</span>
                  <strong class="metric-value">{currentReceiverAiIntelligence.promoteCount.value}</strong>
                  <span class="metric-change {currentReceiverAiIntelligence.promoteCount.tone}">
                    {currentReceiverAiIntelligence.promoteCount.change}
                  </span>
                </article>
              </div>

              <div class="automation-list">
                {#each currentReceiverAiIntelligence.categories as item}
                  <button type="button" class="automation-card actionable-card" on:click={() => openAiOpportunityDetail(item)}>
                    <div class="automation-head">
                      <strong>{item.label}</strong>
                      <span class="status-pill {item.tone}">{item.detail}</span>
                    </div>
                    <p>{item.value}</p>
                  </button>
                {/each}
              </div>
            </article>

          </div>

          <section class="right-stack">
            <span class="grid-ref">R1-3 C8-12</span>
            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Operational overview</span>
                  <h3>Query service levels and workload</h3>
                </div>
              </div>

              <div class="sla-group-stack">
                {#each currentReceiverServiceMetrics.slaGroups as group}
                  <div class="sla-group">
                    <div class="sla-group-head">
                      <strong>{group.title}</strong>
                    </div>
                    <div class="service-level-grid">
                      {#each group.buckets as bucket}
                        <button
                          class="service-level-card {bucket.tone}"
                          on:click={() => openSlaDetail(group.title.includes('Responded') ? 'response' : 'closure', bucket.label)}
                        >
                          <div class="service-level-topline">
                            <span class="service-level-state {bucket.tone}">{bucket.label}</span>
                            <span class="service-level-detail">{bucket.share}</span>
                          </div>
                          <strong class="service-level-value">{bucket.value}</strong>
                        </button>
                      {/each}
                    </div>
                  </div>
                {/each}
              </div>

              <div class="metric-grid compact-metrics">
                {#each currentReceiverServiceMetrics.metrics.filter((metric) => metric.key) as metric}
                  <article class="metric-card operational-card">
                    <span class="metric-title">{metric.title}</span>
                    <div class="operational-statline">
                      <button class="metric-link" on:click={() => openOperationalTransactions(metric)}>
                        <strong class="metric-value">{metric.value}</strong>
                      </button>
                      <button class="metric-subaction {metric.tone}" on:click={() => openOperationalTransactions(metric, true)}>
                        <span>({metric.urgentValue} {metric.urgentLabel})</span>
                      </button>
                    </div>
                    <span class="metric-summary">{metric.summary}</span>
                  </article>
                {/each}
              </div>

              <div class="metric-grid compact-metrics compact-secondary">
                {#each currentReceiverServiceMetrics.metrics.filter((metric) => !metric.key) as metric}
                  <article class="metric-card">
                    <span class="metric-title">{metric.title}</span>
                    <strong class="metric-value">{metric.value}</strong>
                    <span class="metric-change {metric.tone}">{metric.change}</span>
                  </article>
                {/each}
              </div>
            </article>

            <article class="embedded-widget">
              <div class="section-head operational-subsection">
                <div>
                  <span class="section-kicker">Value breakdown</span>
                  <h3>Top self-service categories</h3>
                </div>
              </div>

              <div class="reason-grid">
                {#each currentReceiverMetrics.topReasons as reason}
                  <article class="reason-card">
                    <strong>{reason.count}</strong>
                    <span>{reason.label}</span>
                  </article>
                {/each}
              </div>
            </article>
          </section>
        </section>
        {:else}
          <section class="clerk-dashboard-layout">
            <article class="subpanel clerk-sla-panel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">My SLA performance</span>
                  <h3>Response and resolution across my assigned senders</h3>
                </div>
              </div>

              <div class="sla-group-stack">
                {#each clerkSlaGroups as group}
                  <div class="sla-group">
                    <div class="sla-group-head">
                      <strong>{group.title}</strong>
                    </div>
                    <div class="service-level-grid">
                      {#each group.buckets as bucket}
                        <button
                          class="service-level-card {bucket.tone}"
                          on:click={() => openSlaDetail(group.title.includes('Responded') ? 'response' : 'closure', bucket.label)}
                        >
                          <div class="service-level-topline">
                            <span class="service-level-state {bucket.tone}">{bucket.label}</span>
                            <span class="service-level-detail">{bucket.share}</span>
                          </div>
                          <strong class="service-level-value">{bucket.value}</strong>
                        </button>
                      {/each}
                    </div>
                  </div>
                {/each}
              </div>
            </article>

            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Focus now</span>
                  <h3>Queries needing my attention</h3>
                </div>
              </div>

              <div class="list-stack">
                {#each clerkFocusQueries as item}
                  <button class="list-item" on:click={() => { selectedTransactionId = item.id; activeTab = 'queries'; }}>
                    <div class="list-top">
                      <strong>{getCommunityQueryReference(item)}</strong>
                      <span class="status-pill {toneClass(receiverQueryStatusTone(receiverQueryStatus(item)))}">{receiverQueryStatus(item)}</span>
                    </div>
                    <span class="list-meta">{item.party} • {item.issue}</span>
                    {#if hasReceiverSla(item)}
                      <div class="workspace-sla-row">
                        <span class="sla-chip {receiverQuerySla(item).response.tone}">Response {receiverQuerySla(item).response.label}</span>
                        <span class="sla-chip {receiverQuerySla(item).closure.tone}">Resolution {receiverQuerySla(item).closure.label}</span>
                      </div>
                    {/if}
                  </button>
                {/each}
              </div>
            </article>

            <article class="subpanel clerk-suppliers-panel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Assigned senders</span>
                  <h3>Sender queues I look after</h3>
                </div>
              </div>

              <div class="clerk-supplier-grid">
                {#each clerkSenderRows as sender}
                  <button class="clerk-supplier-card" on:click={() => viewReceiverSenderQueries(sender)}>
                    <div class="list-top">
                      <strong>{sender.name}</strong>
                      <span class="status-pill {sender.open > 1 ? 'high' : 'good'}">{sender.open} open</span>
                    </div>
                    <span>{sender.queries} queries • {sender.transactions} transactions</span>
                    <span>SLA hit rate {sender.slaRate}%</span>
                  </button>
                {/each}
              </div>
            </article>
          </section>
        {/if}
      {:else}
        <article class="subpanel sender-assistant-panel">
          <div class="eva-brand-col">
            <img src="/eva/EVA-Circle.png" alt="EVA" class="eva-circle" />
            <span class="section-kicker">Ask EVA</span>
          </div>

          <div class="sender-assistant-main">
            <h3 class="sender-assistant-heading">Ask a question, chase an invoice, or raise a query</h3>
            <p class="assistant-copy">
              Use EVA to ask about invoice status, payment timing, remittances, or supporting documents. EVA will
              try to answer from the live data available across your customers. If an answer is not available, EVA
              will summarise the conversation so you can raise a query without repeating yourself.
            </p>

            <div class="chip-list">
              <button type="button" class="ghost-btn solid" on:click={() => openEvaAssistant('question')}>Open EVA</button>
              <button type="button" class="ghost-btn solid" on:click={() => openEvaAssistant('query', '', 'raise-query-demo')}>Raise a Query</button>
              <button type="button" class="pill-chip" on:click={() => openEvaAssistant('question', 'Where is invoice INV-24084?')}>Where is invoice INV-24084?</button>
              <button type="button" class="pill-chip" on:click={() => openEvaAssistant('question', 'When can I expect payment for invoice INV-24091?')}>When can I expect payment for invoice INV-24091?</button>
              <button type="button" class="pill-chip" on:click={() => openEvaAssistant('question', 'Why is invoice INV-24076 on hold?')}>Why is invoice INV-24076 on hold?</button>
            </div>
          </div>

          <div class="assistant-sidecard">
            <span class="hero-label">Current query destination</span>
            <label class="assistant-customer-select">
              <select bind:value={senderAssistantCustomer}>
                {#each currentSenderCustomerBreakdown as item}
                  <option value={item.customer}>{item.customer}</option>
                {/each}
              </select>
            </label>
            <span class="hero-note">If EVA cannot close the journey, the summary can be raised straight to this customer.</span>
          </div>
        </article>

        <section class="sender-top-layout">
          <div
            class="sender-hero clickable-hero"
            role="button"
            tabindex="0"
            aria-label="Open expected cash breakdown"
            on:click={() => openExpectedCashDetail('month', null, [])}
            on:keydown={(event) => (event.key === 'Enter' || event.key === ' ' ? openExpectedCashDetail('month', null, []) : null)}
          >
            <span class="hero-label">Expected cash</span>
            <strong>{`\u00A3${String(currentSenderMetrics.expectedCash.value).replace(/[^0-9.]/g, '')}k`}</strong>
            <span class="hero-note">Expected receipts for the selected period</span>
            <p>{currentSenderMetrics.summary}</p>
          </div>

          <article class="metric-card accent-high sender-top-card sender-response-card">
            <span class="metric-title">Needs your input</span>
            <strong class="metric-value">{currentSenderMetrics.awaitingResponse.value}</strong>
            <span class="metric-change high">Queries where the customer is waiting for information from you</span>
          </article>

          <article class="metric-card sender-top-card sender-query-card">
            <span class="metric-title">Queries raised in Community</span>
            <strong class="metric-value">{currentSenderMetrics.queriesRaised.value}</strong>
            <span class="metric-change medium">{currentSenderMetrics.queriesRaised.change}</span>
          </article>

          <article class="sender-remittance-promo">
            <div class="sender-remittance-top">
              <div class="sender-remittance-head">
                <span class="hero-label">Remittances received</span>
                <strong>{currentSenderMetrics.remittances.value}</strong>
                <span class="hero-note">{currentSenderMetrics.remittances.change}</span>
                <div class="sender-remittance-stats">
                  <div class="sender-remittance-stat">
                    <span>Value covered</span>
                    <strong>{currentSenderRemittanceOpportunity.coveredValue.value}</strong>
                  </div>
                  <div class="sender-remittance-stat">
                    <span>Approved, remittance expected</span>
                    <strong>{currentSenderRemittanceOpportunity.expectedNext.value}</strong>
                  </div>
                </div>
              </div>
              <div class="sender-remittance-download compact">
                <span>Manual download</span>
                <div class="mini-switch">
                  <button type="button" class="mini-switch-btn active">Today</button>
                  <button type="button" class="mini-switch-btn">This week</button>
                </div>
                <button type="button" class="ghost-btn">Download remittances</button>
              </div>
            </div>

            <div class="sender-remittance-footer">
              <p>
                Turn the remittance detail already visible in Community into an automated ERP feed, so payment
                information arrives without download, chasing, or manual keying.
              </p>
              <button type="button" class="ghost-btn">Read more</button>
              <button type="button" class="ghost-btn solid">Integrate to ERP</button>
            </div>
          </article>
        </section>
        <section class="content-grid">
          <div class="stack">
            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Customer coverage</span>
                  <h3>Where your invoice activity is sitting</h3>
                </div>
              </div>

              <div class="sender-hotspot-list">
                {#each currentSenderCustomerBreakdown as item}
                  <article class="sender-hotspot-card">
                    <div class="sender-hotspot-head">
                      <div>
                        <strong>{item.customer}</strong>
                        <span>{item.note}</span>
                      </div>
                      <span class="status-pill medium">{item.queries} queries</span>
                    </div>

                    <div class="team-stats-grid">
                      <div class="team-stat-card">
                        <span>Invoices</span>
                        <strong>{item.invoices} ({item.value})</strong>
                      </div>
                      <div class="team-stat-card">
                        <span>Processing</span>
                        <strong>{item.processing} ({item.processingValue})</strong>
                      </div>
                      <div class="team-stat-card">
                        <span>In query</span>
                        <strong>{item.inQuery} ({item.inQueryValue})</strong>
                      </div>
                      <div class="team-stat-card">
                        <span>On hold</span>
                        <strong>{item.onHold} ({item.onHoldValue})</strong>
                      </div>
                      <div class="team-stat-card">
                        <span>Approved</span>
                        <strong>{item.approved} ({item.approvedValue})</strong>
                      </div>
                      <div class="team-stat-card">
                        <span>Remittance issued</span>
                        <strong>{item.remittanceIssued} ({item.remittanceIssuedValue})</strong>
                      </div>
                    </div>
                  </article>
                {/each}
              </div>
            </article>

            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Invoice activity</span>
                  <h3>Recently sent invoices across your customers</h3>
                </div>
              </div>

              <section class="analytics-grid sender-analytics-grid">
                <article class="metric-card">
                  <span class="metric-title">Invoices recently sent</span>
                  <strong class="metric-value">{currentSenderInvoiceActivity.submitted.value}</strong>
                  <span class="metric-summary">{currentSenderInvoiceActivity.submitted.note}</span>
                </article>
                <article class="metric-card accent-good">
                  <span class="metric-title">Invoice value sent</span>
                  <strong class="metric-value">{currentSenderInvoiceActivity.submittedValue.value}</strong>
                  <span class="metric-summary">{currentSenderInvoiceActivity.submittedValue.note}</span>
                </article>
                <article class="metric-card accent-high">
                  <span class="metric-title">Still awaiting payment</span>
                  <strong class="metric-value">{currentSenderInvoiceActivity.awaitingPayment.value}</strong>
                  <span class="metric-summary">{currentSenderInvoiceActivity.awaitingPayment.note}</span>
                </article>
              </section>

              <div class="transaction-grid sender-invoice-list">
                {#each currentSenderInvoiceActivity.rows as item}
                  <button class="transaction-card" on:click={() => openSenderInvoiceRecord(item)}>
                    <div class="transaction-top">
                      <div>
                        <span class="card-type">Invoice</span>
                        <h4>{item.reference}</h4>
                      </div>
                      <span class="status-pill {toneClass(item.tone)}">{item.status}</span>
                    </div>
                    <p>{item.customer}</p>
                    <div class="transaction-meta">
                      <span>{item.amount}</span>
                      <span>Submitted {item.submittedAt}</span>
                      <span>{item.note}</span>
                    </div>
                  </button>
                {/each}
              </div>
            </article>

            {#if false}
            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Remittance service</span>
                  <h3>Available now and ready to feed your ERP</h3>
                </div>
              </div>

              <section class="analytics-grid sender-analytics-grid">
                <article class="metric-card accent-good">
                  <span class="metric-title">Remittances available</span>
                  <strong class="metric-value">{currentSenderRemittanceOpportunity.available.value}</strong>
                  <span class="metric-summary">{currentSenderRemittanceOpportunity.available.note}</span>
                </article>
                <article class="metric-card">
                  <span class="metric-title">Value covered</span>
                  <strong class="metric-value">{currentSenderRemittanceOpportunity.coveredValue.value}</strong>
                  <span class="metric-summary">{currentSenderRemittanceOpportunity.coveredValue.note}</span>
                </article>
                <article class="metric-card">
                  <span class="metric-title">ERP feed opportunity</span>
                  <strong class="metric-value">{currentSenderRemittanceOpportunity.erpReady.value}</strong>
                  <span class="metric-summary">{currentSenderRemittanceOpportunity.erpReady.note}</span>
                </article>
              </section>

              <div class="focus-list">
                {#each currentSenderRemittanceOpportunity.benefits as item}
                  <div class="focus-item">{item}</div>
                {/each}
              </div>

              <div class="remittance-list">
                {#each communityRemittanceFeed as item}
                  <article class="remittance-card">
                    <div class="message-head">
                      <div>
                        <strong>{item.reference}</strong>
                        <span>{item.supplier} • {item.customer}</span>
                      </div>
                      <span class="status-pill medium">{item.status}</span>
                    </div>
                    <div class="transaction-meta">
                      <span>{item.amount}</span>
                      <span>Remittance {item.remittanceAt}</span>
                      <span>Settlement {item.settlementDate}</span>
                    </div>
                  </article>
                {/each}
              </div>
            </article>
            {/if}
          </div>

          <article class="subpanel">
            <div class="section-head">
              <div>
                <span class="section-kicker">Cashflow visibility</span>
                <h3>Expected receipts across customers</h3>
              </div>
            </div>

            <div class="chart-card">
              <div class="chart-head">
                <strong>Expected money into account</strong>
                <span>Based on current remittance and payment status</span>
              </div>
              <div class="cashflow-chart">
                {#each communityCashflowForecast as bucket}
                  <div class="cashflow-column">
                    <div class="cashflow-bar-wrap">
                      <div
                        class="cashflow-bar"
                        style={`height: ${Math.max(16, (amountValue(bucket.total) / maxCashflow) * 180)}px`}
                      ></div>
                    </div>
                    <strong>{bucket.window}</strong>
                    <span>{bucket.total}</span>
                  </div>
                {/each}
              </div>
            </div>

            <div class="cashflow-board">
              {#each communityCashflowForecast as bucket}
                <article class="cashflow-card">
                  <div class="message-head">
                  <div>
                    <strong>{bucket.window}</strong>
                    <span>Expected funds in this window</span>
                  </div>
                    <span class="detail-amount">{bucket.total}</span>
                  </div>
                  <div class="cashflow-bars">
                    {#each bucket.customers as customer}
                      <div class="cashflow-row">
                        <span>{customer.name}</span>
                        <strong>{customer.amount}</strong>
                      </div>
                    {/each}
                  </div>
                </article>
              {/each}
            </div>

            <div class="message-list supplementary-feed">
              {#each openMessages.filter((item) => item.channel === 'Supplier').slice(0, 2) as item}
                <article class="message-card">
                  <div class="message-head">
                    <div>
                      <strong>{item.reference}</strong>
                      <span>{item.party}</span>
                    </div>
                    <button class="ghost-btn" on:click={() => selectTransaction(item.id)}>Open</button>
                  </div>
                  <p>{item.messages[0].text}</p>
                  <span class="message-foot">{item.messages[0].author} • {item.messages[0].time}</span>
                </article>
              {/each}
            </div>

            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Inbox assistant</span>
                  <h3>Answers returned from your email queries</h3>
                </div>
              </div>

                <section class="analytics-grid">
                  <article class="metric-card accent-good">
                    <span class="metric-title">Answered automatically</span>
                    <strong class="metric-value">{currentSenderInboxAssistant.autoAnswered.value}</strong>
                    <span class="metric-summary">{currentSenderInboxAssistant.autoAnswered.note}</span>
                  </article>
                  <article class="metric-card">
                    <span class="metric-title">Created as tracked queries</span>
                    <strong class="metric-value">{currentSenderInboxAssistant.converted.value}</strong>
                    <span class="metric-summary">{currentSenderInboxAssistant.converted.note}</span>
                  </article>
                </section>

              <div class="insight-list">
                {#each currentSenderInboxAssistant.themes as item}
                  <article class="insight-card">
                    <div class="insight-card-head">
                      <div>
                        <strong>{item.label}</strong>
                      </div>
                    </div>
                    <p>{item.detail}</p>
                  </article>
                {/each}
              </div>
            </article>
          </article>
        </section>
      {/if}
    </div>
  {:else if activeTab === 'my-details' && persona === 'sender'}
    <div class="dashboard-shell">
      <div class="dashboard-toolbar">
        <div>
          <span class="section-kicker">Supplier onboarding</span>
          <h2 class="dashboard-title">My Details</h2>
        </div>
        <span class="status-pill good">{senderProfileDetails.onboardingStatus}</span>
      </div>

      <section class="analytics-grid sender-analytics-grid">
        <article class="metric-card accent-good">
          <span class="metric-title">Supplier ID</span>
          <strong class="metric-value">{senderProfileDetails.supplierId}</strong>
          <span class="metric-summary">Used by customers to identify your supplier account.</span>
        </article>
        <article class="metric-card">
          <span class="metric-title">Last verified</span>
          <strong class="metric-value">{senderProfileDetails.lastVerified}</strong>
          <span class="metric-summary">Latest customer-approved supplier detail review.</span>
        </article>
        <article class="metric-card">
          <span class="metric-title">Payment terms</span>
          <strong class="metric-value">{senderProfileDetails.paymentTerms}</strong>
          <span class="metric-summary">Current terms visible to connected Community customers.</span>
        </article>
      </section>

      <section class="dual-grid">
        <article class="detail-card">
          <div class="section-head compact">
            <div>
              <span class="section-kicker">Company profile</span>
              <h3>Details customers hold for you</h3>
            </div>
          </div>

          <div class="role-list">
            <div class="role-row">
              <div>
                <strong>Legal and trading name</strong>
                <p>{senderProfileDetails.legalName} • Trading as {senderProfileDetails.tradingName}</p>
              </div>
              <span class="status-pill good">Verified</span>
            </div>
            <div class="role-row">
              <div>
                <strong>Registration and VAT</strong>
                <p>Company number {senderProfileDetails.registrationNumber} • VAT {senderProfileDetails.vatNumber}</p>
              </div>
              <span class="status-pill good">Verified</span>
            </div>
            <div class="role-row">
              <div>
                <strong>Bank and remittance</strong>
                <p>Bank account {senderProfileDetails.bankAccount} • {senderProfileDetails.remittanceEmail}</p>
              </div>
              <span class="status-pill neutral">Change controlled</span>
            </div>
            <div class="role-row">
              <div>
                <strong>Primary contacts</strong>
                <p>{senderProfileDetails.primaryContact} ({senderProfileDetails.primaryEmail}) • {senderProfileDetails.financeContact} ({senderProfileDetails.financeEmail})</p>
              </div>
              <span class="status-pill good">Active</span>
            </div>
            <div class="role-row">
              <div>
                <strong>Addresses</strong>
                <p>Registered: {senderProfileDetails.registeredAddress}</p>
                <p>Invoice correspondence: {senderProfileDetails.invoiceAddress}</p>
              </div>
              <span class="status-pill good">Verified</span>
            </div>
          </div>
        </article>

        <article class="detail-card">
          <div class="section-head compact">
            <div>
              <span class="section-kicker">Request a change</span>
              <h3>Notify customers when your supplier details change</h3>
            </div>
          </div>

          <div class="settings-grid">
            <label class="control-field">
              <span>Customer affected</span>
              <select bind:value={senderDetailChangeCustomer}>
                <option>All Community customers</option>
                {#each currentSenderCustomerBreakdown as item}
                  <option>{item.customer}</option>
                {/each}
              </select>
            </label>
            <label class="control-field">
              <span>Change area</span>
              <select bind:value={senderDetailChangeArea}>
                {#each senderDetailChangeAreas as area}
                  <option>{area}</option>
                {/each}
              </select>
            </label>
            <label class="control-field">
              <span>Field to change</span>
              <select bind:value={senderDetailChangeField}>
                {#each senderDetailChangeFields as field}
                  <option>{field}</option>
                {/each}
              </select>
            </label>
            <label class="control-field">
              <span>Proposed new value</span>
              <input bind:value={senderDetailChangeValue} placeholder="Enter the corrected detail" />
            </label>
            <label class="control-field query-reply-field">
              <span>Reason and supporting context</span>
              <textarea bind:value={senderDetailChangeReason} rows="4" placeholder="Explain what has changed and when it should take effect"></textarea>
            </label>
          </div>

          <div class="modal-summary">
            <strong>Customer approval required</strong>
            <span>Submitting a change creates a structured supplier detail request for the selected customer to review before their records are updated.</span>
          </div>

          <div class="action-row">
            <button class="ghost-btn solid" disabled={!senderDetailChangeValue.trim()} on:click={submitSenderDetailChange}>
              Submit change request
            </button>
            <button class="ghost-btn" on:click={() => { senderDetailChangeValue = ''; senderDetailChangeReason = ''; senderDetailChangeSubmitted = false; }}>
              Clear
            </button>
          </div>

          {#if senderDetailChangeSubmitted}
            <span class="status-pill good">Change request submitted</span>
          {/if}
        </article>
      </section>

      <section class="detail-card">
        <div class="section-head compact">
          <div>
            <span class="section-kicker">Change requests</span>
            <h3>Supplier detail changes in progress</h3>
          </div>
        </div>

        <div class="role-list">
          {#each senderDetailChangeRequests as request}
            <div class="role-row">
              <div>
                <strong>{request.reference} • {request.field}</strong>
                <p>{request.area} change for {request.customer}: {request.proposed}</p>
                <p>Submitted {request.submitted}</p>
              </div>
              <span class="status-pill medium">{request.status}</span>
            </div>
          {/each}
        </div>
      </section>
    </div>
  {:else if activeTab === 'insights'}
    <div class="dashboard-shell">
      {#if persona === 'receiver'}
        <section class="insights-shell">
          <section class="insights-summary-grid receiver-top">
            <article class="detail-card insight-focus-banner">
              <div>
                <span class="section-kicker">Insight focus</span>
                <strong>{getReceiverInsightFocusCard().title}</strong>
                <p>{getReceiverInsightFocusCard().summary}</p>
              </div>
              {#if getReceiverInsightFocusMeta()}
                <button class="ghost-btn" on:click={clearReceiverInsightsFocus}>Clear focus</button>
              {/if}
            </article>
            {#each currentReceiverInsights.overview as item}
              <article class="metric-card">
                <span class="metric-title">{item.label}</span>
                <strong class="metric-value">{item.value}</strong>
                <span class="metric-summary">{item.note}</span>
              </article>
            {/each}
          </section>

          <section class="insights-grid">
            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Query themes</span>
                  <h3>What users are asking about most</h3>
                </div>
              </div>

              <div class="insight-list">
                {#each currentReceiverInsights.themes as theme}
                  <article class:active={receiverInsightsFocus === theme.key} class="insight-card">
                    <div class="insight-card-head">
                      <div>
                        <strong>{theme.label}</strong>
                        <span>{theme.count} queries • {theme.share} of manual volume</span>
                      </div>
                    </div>
                    <p>{theme.trend}</p>
                    <span class="insight-note">{theme.automation}</span>
                    <div class="insight-actions">
                      <button class="ghost-btn" on:click={() => openInsightTransactions(theme.key, theme.label, theme.count, `${theme.count} ${theme.label.toLowerCase()} queries`)}>
                        View matching queries
                      </button>
                      <button class="ghost-btn" on:click={() => openAiDataSettings('transactional-data')}>
                        Improve answer path
                      </button>
                    </div>
                  </article>
                {/each}
              </div>
            </article>

            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">AI improvements</span>
                  <h3>Where better answers would reduce workload</h3>
                </div>
              </div>

              <div class="insight-list">
                {#each currentReceiverAiIntelligence.categories as item}
                  <article class:active={receiverInsightsFocus === getAiOpportunityKey(item.label)} class="insight-card">
                    <div class="insight-card-head">
                      <div>
                        <strong>{item.label}</strong>
                        <span>{item.detail}</span>
                      </div>
                    </div>
                    <p>{item.value}</p>
                    <span class="insight-note">
                      {item.label === 'High-friction escalations'
                        ? 'Review the escalated journeys that are still pushing work to the team.'
                        : item.label === 'Best automation opportunity'
                          ? 'Promote the most repeatable answers into EVA to reduce manual handling next time.'
                          : item.label === 'Next knowledge update'
                            ? 'Publish focused guidance so EVA can answer this before a tracked query is needed.'
                            : 'Approve closed manual resolutions so EVA can replay them automatically next time.'}
                    </span>
                    <div class="insight-actions">
                      <button class="ghost-btn" on:click={() => openInsightTransactions(getAiOpportunityKey(item.label), item.label, Number(String(item.detail).match(/\d+/)?.[0] || 0), `${item.detail} behind ${item.label.toLowerCase()}`)}>
                        View matching queries
                      </button>
                      <button class="ghost-btn" on:click={() => item.label === 'High-friction escalations' || item.label === 'Best automation opportunity' ? openAiDataSettings('transactional-data') : item.label === 'Next knowledge update' ? openAiDataSettings('knowledge-files') : openAiDataSettings('query-resolution-data')}>
                        {item.label === 'High-friction escalations' || item.label === 'Best automation opportunity'
                          ? 'Improve with data'
                          : item.label === 'Next knowledge update'
                            ? 'Publish guidance'
                            : 'Review reusable answers'}
                      </button>
                    </div>
                  </article>
                {/each}
              </div>
            </article>
          </section>

          <section class="insights-grid narrow-right">
            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Problem senders</span>
                  <h3>Disproportionate query demand by sender</h3>
                </div>
              </div>

              <div class="sender-hotspot-list">
                {#each currentReceiverInsights.senderPatterns as item}
                  <article class="sender-hotspot-card">
                    <div class="sender-hotspot-head">
                      <div>
                        <strong>{item.sender}</strong>
                        <span>{item.detail}</span>
                      </div>
                      <span class="status-pill high">{item.rate}</span>
                    </div>
                    <p>{item.theme}</p>
                    <div class="action-row">
                      <button class="ghost-btn" on:click={() => openInsightTransactions(item.key, `${item.sender} query analysis`, Number(item.detail.split(' ')[0]), `${item.sender} queries`)}>
                        View queries
                      </button>
                      <button class="ghost-btn" on:click={() => openAiDataSettings('transactional-data')}>
                        Review setup
                      </button>
                    </div>
                  </article>
                {/each}
              </div>
            </article>

            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Signals</span>
                  <h3>Recurring patterns worth acting on</h3>
                </div>
              </div>

              <div class="trend-list">
                {#each currentReceiverInsights.signals as signal}
                  <span>{signal}</span>
                {/each}
              </div>
            </article>
          </section>

          <section class="insights-grid wide-left">
            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Knowledge updates</span>
                  <h3>What should feed future AI answers</h3>
                </div>
              </div>

              <div class="insight-list">
                {#each currentReceiverInsights.knowledgeCandidates as item}
                  <article class:active={receiverInsightsFocus === item.key} class="insight-card">
                    <div class="insight-card-head">
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.count} opportunities</span>
                      </div>
                    </div>
                    <p>{item.detail}</p>
                    <div class="insight-actions">
                      <button class="ghost-btn" on:click={() => openInsightTransactions(item.key, item.title, item.count, `${item.count} ${item.title.toLowerCase()} queries`)}>
                        View matching queries
                      </button>
                      <button class="ghost-btn" on:click={() => openReceiverKnowledgeCandidate(item)}>
                        {item.actionLabel}
                      </button>
                    </div>
                  </article>
                {/each}
              </div>
            </article>

            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Current signals</span>
                  <h3>High-level measures in view</h3>
                </div>
              </div>

              <section class="analytics-grid">
                {#each communityInsights as insight}
                  <article class="metric-card">
                    <span class="metric-title">{insight.label}</span>
                    <strong class="metric-value">{insight.value}</strong>
                  </article>
                {/each}
              </section>
            </article>
          </section>
        </section>
      {:else}
        <section class="insights-shell">
          <section class="top-summary-row sender-top">
            {#each currentSenderInsights.overview as item}
              <article class="metric-card">
                <span class="metric-title">{item.label}</span>
                <strong class="metric-value">{item.value}</strong>
                <span class="metric-summary">{item.note}</span>
              </article>
            {/each}
          </section>

          <section class="insights-grid">
            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Customer hotspots</span>
                  <h3>Where you are raising the most queries</h3>
                </div>
              </div>

              <div class="sender-hotspot-list">
                {#each currentSenderInsights.customerHotspots as item}
                  <article class="sender-hotspot-card">
                    <div class="sender-hotspot-head">
                      <div>
                        <strong>{item.customer}</strong>
                        <span>{item.detail}</span>
                      </div>
                      <span class="status-pill high">{item.count}</span>
                    </div>
                    <p>{item.note}</p>
                    <span class="insight-note">{item.rate}</span>
                  </article>
                {/each}
              </div>
            </article>

            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Query themes</span>
                  <h3>What you are most often raising queries about</h3>
                </div>
              </div>

              <div class="insight-list">
                {#each currentSenderInsights.themes as theme}
                  <article class="insight-card">
                    <div class="insight-card-head">
                      <div>
                        <strong>{theme.label}</strong>
                        <span>{theme.count} queries</span>
                      </div>
                    </div>
                    <p>{theme.note}</p>
                    <span class="insight-note">{theme.help}</span>
                  </article>
                {/each}
              </div>
            </article>
          </section>

          <section class="insights-grid narrow-right">
            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Query patterns</span>
                  <h3>What the query data is telling you</h3>
                </div>
              </div>

              <div class="trend-list">
                {#each currentSenderInsights.patterns as signal}
                  <span>{signal}</span>
                {/each}
              </div>
            </article>

            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">What will help</span>
                  <h3>Ways to reduce future chasing</h3>
                </div>
              </div>

              <div class="insight-list">
                {#each currentSenderInsights.actions as item}
                  <article class="insight-card">
                    <div class="insight-card-head">
                      <div>
                        <strong>{item.title}</strong>
                      </div>
                    </div>
                    <p>{item.detail}</p>
                  </article>
                {/each}
              </div>
            </article>
          </section>
        </section>
      {/if}
    </div>
  {:else if activeTab === 'queries'}
    {#if persona === 'receiver'}
      <div class="dashboard-shell">
        <section class="insights-summary-grid sender-query-summary-grid receiver-query-sla-grid">
          <article class="metric-card sender-query-summary-card">
            <span class="metric-title">Response SLA</span>
            <strong class="metric-value">{receiverResponseSlaSummary.total}</strong>
            <span class="metric-summary">{receiverResponseSlaSummary.close} close to breach • {receiverResponseSlaSummary.missed} missed</span>
          </article>
          <article class="metric-card sender-query-summary-card">
            <span class="metric-title">Resolution SLA</span>
            <strong class="metric-value">{receiverClosureSlaSummary.total}</strong>
            <span class="metric-summary">{receiverClosureSlaSummary.close} close to breach • {receiverClosureSlaSummary.missed} missed</span>
          </article>
          {#each receiverQueryStatusSummary as item}
            <button class="metric-card sender-query-summary-card" on:click={() => (statusFilter = item.status)}>
              <span class="metric-title">{senderQueryStatusLabel(item.status)}</span>
              <strong class="metric-value">{item.count}</strong>
              <span class="metric-summary">{item.breakdown}</span>
            </button>
          {/each}
        </section>

        <div class="workspace-shell">
        <aside class="workspace-list">
          <div class="toolbar-row">
            <label class="control-field slim">
              <span>Type</span>
              <select bind:value={transactionFilter}>
                {#each transactionTypes as type}
                  <option value={type}>{type}</option>
                {/each}
              </select>
            </label>
            <label class="control-field slim">
              <span>Query status</span>
              <select bind:value={statusFilter}>
                {#each receiverQueryStatusOptions as status}
                  <option value={status}>{senderQueryStatusLabel(status)}</option>
                {/each}
              </select>
            </label>
          </div>

          <div class="automation-filter-row" aria-label="Automation query filter">
            <span class="automation-stage-cog automation-filter-cog" aria-hidden="true">
              <span>A</span>
            </span>
            <div class="automation-filter-options">
              <button
                type="button"
                class:active={automationFilter === 'Only automated'}
                class="automation-filter-btn tick"
                title="Only automated"
                aria-label="Show only automated queries"
                on:click={() => toggleAutomationFilter('Only automated')}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button
                type="button"
                class:active={automationFilter === 'Exclude automated'}
                class="automation-filter-btn cross"
                title="Exclude automated"
                aria-label="Exclude automated queries"
                on:click={() => toggleAutomationFilter('Exclude automated')}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 7l10 10M17 7L7 17" />
                </svg>
              </button>
            </div>
          </div>

          <div class="workspace-summary">
            <strong>{filteredTransactions.length}</strong>
            <span>{workspaceSummary}</span>
          </div>

          {#if workspaceOperationalContext && !workspaceOperationalContext.urgentOnly}
            <div class="workspace-priority">
              <button class="priority-chip" on:click={() => openOperationalTransactions(workspaceOperationalContext.metric, false)}>
                <strong>{workspaceOperationalContext.totalCount}</strong>
                <span>{workspaceOperationalContext.metric.title}</span>
              </button>
              <button class="priority-chip urgent" on:click={() => openOperationalTransactions(workspaceOperationalContext.metric, true)}>
                <strong>{workspaceOperationalContext.urgentCount}</strong>
                <span>{workspaceOperationalContext.metric.urgentLabel}</span>
              </button>
            </div>
          {/if}

          <div class="list-stack">
            {#each displayedTransactions as item}
              <button class:active={selectedTransaction.id === item.id} class="list-item" on:click={() => (selectedTransactionId = item.id)}>
                <div class="list-top">
                  <strong>{getCommunityQueryReference(item)}</strong>
                  <span class="list-top-badges">
                    {#if item.automatedSequence}
                      <span class="automation-stage-cog" aria-label={`Automated workflow sequence ${item.automatedSequence.currentStep} of ${item.automatedSequence.totalSteps}`}>
                        <span>{item.automatedSequence.currentStep}</span>
                      </span>
                    {/if}
                    <span class="status-pill {toneClass(receiverQueryStatusTone(receiverQueryStatus(item)))}">{receiverQueryStatus(item)}</span>
                  </span>
                </div>
                <span class="list-meta">Query • {item.party}</span>
                <span class="list-meta">{item.issue} • {item.reference} • {item.type}</span>
                {#if hasReceiverSla(item)}
                  <div class="workspace-sla-row">
                    <span class="sla-chip {receiverQuerySla(item).response.tone}">Response {receiverQuerySla(item).response.label}</span>
                    <span class="sla-chip {receiverQuerySla(item).closure.tone}">Resolution {receiverQuerySla(item).closure.label}</span>
                  </div>
                {/if}
              </button>
            {/each}
          </div>
        </aside>

        <div class="workspace-detail">
          {#if selectedTransaction.automatedSequence}
            <section class="detail-hero workflow-query-hero">
              <div class="workflow-query-id">
                <span class="section-kicker">Workflow sequence query</span>
                <h2>{getCommunityQueryReference(selectedTransaction)}</h2>
                <p>{selectedTransaction.party}</p>
              </div>
              <div class="workflow-query-summary">
                <span class="section-kicker">Summary</span>
                <strong>{selectedTransaction.issue}</strong>
              </div>
              <div class="workflow-query-actions">
                <div class="detail-badges">
                  <span class="automation-detail-pill">
                    <span>{selectedTransaction.automatedSequence.currentStep}</span>
                    {automatedSequenceLabel(selectedTransaction)}
                  </span>
                  <span class="status-pill {toneClass(receiverQueryStatusTone(receiverQueryStatus(selectedTransaction)))}">{receiverQueryStatus(selectedTransaction)}</span>
                  <span class="detail-amount">{selectedTransaction.amount}</span>
                </div>
                <label class="control-field inline-assignee-field workflow-assignee-field">
                  <span>Assigned user</span>
                  <select
                    value={receiverQueryAssignee(selectedTransaction)}
                    on:change={(event) => updateReceiverQueryAssignee(event.currentTarget.value)}
                  >
                    {#each apClerkProfiles as profile}
                      <option value={profile.name}>{profile.name}</option>
                    {/each}
                    <option value="AP Query Team">AP Query Team</option>
                    <option value="Automation">Automation</option>
                  </select>
                </label>
              </div>
            </section>

            <section class="automation-sequence-panel">
              <div>
                <span class="section-kicker">Workflow sequence</span>
                <h3>{selectedTransaction.automatedSequence.workflowName}</h3>
                <p>{selectedTransaction.automatedSequence.selfCloseCondition}</p>
              </div>
              <div class="automation-sequence-status">
                <span>Stage</span>
                <strong>{selectedTransaction.automatedSequence.currentStep} of {selectedTransaction.automatedSequence.totalSteps}</strong>
                <p>{selectedTransaction.automatedSequence.lastAction}</p>
              </div>
              <div class="automation-sequence-status">
                <span>Next action</span>
                <strong>{selectedTransaction.automatedSequence.status}</strong>
                <p>{selectedTransaction.automatedSequence.nextAction}</p>
              </div>
              <div class="action-row">
                <button class="ghost-btn">Pause automation</button>
                <button class="ghost-btn solid">Intervene manually</button>
              </div>
            </section>
          {:else}
            <section class="detail-hero standard-query-hero">
              <div class="standard-query-id">
                <span class="section-kicker">{selectedTransaction.channel} query</span>
                <h2>{getCommunityQueryReference(selectedTransaction)}</h2>
                <p>{selectedTransaction.party}</p>
              </div>
              <div class="standard-query-summary">
                <span class="section-kicker">Summary</span>
                <strong>{selectedTransaction.issue}</strong>
              </div>
              <div class="standard-query-actions">
                <div class="detail-badges">
                  <span class="status-pill {toneClass(receiverQueryStatusTone(receiverQueryStatus(selectedTransaction)))}">{receiverQueryStatus(selectedTransaction)}</span>
                  <span class="detail-amount">{selectedTransaction.amount}</span>
                </div>
                <label class="control-field inline-assignee-field standard-assignee-field">
                  <span>Assigned user</span>
                  <select
                    value={receiverQueryAssignee(selectedTransaction)}
                    on:change={(event) => updateReceiverQueryAssignee(event.currentTarget.value)}
                  >
                    {#each apClerkProfiles as profile}
                      <option value={profile.name}>{profile.name}</option>
                    {/each}
                    <option value="AP Query Team">AP Query Team</option>
                    <option value="Automation">Automation</option>
                  </select>
                </label>
              </div>
            </section>
          {/if}

          {#if hasReceiverSla(selectedTransaction)}
            <section class="standard-sla-strip">
              <article class="standard-sla-item">
                <span class="section-kicker">Response SLA</span>
                <strong>{receiverQuerySla(selectedTransaction).response.label}</strong>
              </article>
              <article class="standard-sla-item">
                <span class="section-kicker">Resolution SLA</span>
                <strong>{receiverQuerySla(selectedTransaction).closure.label}</strong>
              </article>
              {#if selectedTransaction.responseElapsed}
                <article class="standard-sla-item">
                  <span class="section-kicker">Response elapsed</span>
                  <strong>{selectedTransaction.responseElapsed}</strong>
                </article>
              {/if}
              {#if selectedTransaction.closureElapsed}
                <article class="standard-sla-item">
                  <span class="section-kicker">Resolution elapsed</span>
                  <strong>{selectedTransaction.closureElapsed}</strong>
                </article>
              {/if}
            </section>
          {/if}

          <div class="tabs-row secondary">
            <button class="tab" class:active={queryDetailTab === 'conversation'} on:click={() => (queryDetailTab = 'conversation')}>
              Conversation
            </button>
            <button class="tab" class:active={queryDetailTab === 'related'} on:click={() => (queryDetailTab = 'related')}>
              Related transaction
            </button>
          </div>

          {#if queryDetailTab === 'conversation'}
            <section class="timeline-card">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Conversation</span>
                  <h3>Query thread</h3>
                </div>
              </div>

              <div class="thread-list">
                {#if selectedQueryMessages.length}
                  {#each selectedQueryMessages as message}
                    <div class="thread-item">
                      <strong>{message.author}</strong>
                      <span>{message.time}</span>
                      <p>{message.text}</p>
                      {#if message.evaExcluded}
                        <span class="thread-flag">Excluded from EVA</span>
                      {/if}
                    </div>
                  {/each}
                {:else}
                  <div class="thread-item">
                    <strong>No messages yet</strong>
                    <span>Ready for the first response</span>
                    <p>This query has been raised but does not yet have a conversation thread.</p>
                  </div>
                {/if}
              </div>

              <section class="query-management-panel">
                <div class="section-head compact">
                  <div>
                    <span class="section-kicker">Manage query</span>
                    <h3>Reply and update status</h3>
                  </div>
                </div>

                <div class="query-management-grid">
                  <label class="control-field query-reply-field">
                    <span>Reply</span>
                    <textarea bind:value={receiverReplyText} rows="4" placeholder="Add your response or update to this query"></textarea>
                  </label>

                  <label class="control-field">
                    <span>Status</span>
                    <select bind:value={receiverStatusDraft}>
                      {#each receiverQueryStatusOptions.filter((item) => item !== 'All') as status}
                        <option value={status}>{status}</option>
                      {/each}
                    </select>
                  </label>
                </div>

                <label class="checkbox-row">
                  <input type="checkbox" bind:checked={receiverExcludeFromEva} />
                  <span>Exclude this note from EVA</span>
                </label>

                <div class="action-row">
                  <button class="ghost-btn solid" on:click={() => updateReceiverQuery('reply')}>Send response</button>
                  <button class="ghost-btn" on:click={() => updateReceiverQuery('update')}>Save status</button>
                  <button class="ghost-btn" on:click={() => { receiverStatusDraft = 'Closed'; updateReceiverQuery('close'); }}>Close query</button>
                </div>
              </section>
            </section>
          {:else}
            <section class="timeline-card">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Related transaction</span>
                  <h3>Linked transaction context</h3>
                </div>
              </div>

              <section class="detail-grid">
                <article class="detail-card">
                  <span class="section-kicker">Related transaction</span>
                  <strong>{selectedTransaction.amount}</strong>
                  <p>{selectedTransaction.reference} • {selectedTransaction.type} • {selectedTransaction.status}</p>
                </article>
                <article class="detail-card">
                  <span class="section-kicker">Transaction status</span>
                  <strong>{selectedTransaction.status}</strong>
                  <p>{selectedTransaction.nextEta}</p>
                </article>
              </section>

              <section class="dual-grid">
                <article class="detail-card">
                  <div class="section-head compact">
                    <div>
                      <span class="section-kicker">Documents</span>
                      <h3>Access and interaction</h3>
                    </div>
                  </div>
                  <div class="chip-list">
                    {#each selectedTransaction.documents as document}
                      <span class="signal-chip">{document}</span>
                    {/each}
                  </div>
                  <div class="action-row">
                    <button class="ghost-btn solid">Open document</button>
                    <button class="ghost-btn">Upload revision</button>
                  </div>
                </article>

                <article class="detail-card">
                  <div class="section-head compact">
                    <div>
                      <span class="section-kicker">Actions</span>
                      <h3>What the user can do</h3>
                    </div>
                  </div>
                  <div class="action-row stacked">
                    {#each selectedTransaction.actions as action}
                      <button class="ghost-btn">{action}</button>
                    {/each}
                  </div>
                </article>
              </section>
            </section>
          {/if}

          <section class="timeline-card">
            <div class="section-head">
              <div>
                <span class="section-kicker">History</span>
                <h3>Query timeline</h3>
              </div>
            </div>
            <div class="timeline">
              {#each selectedTransaction.timeline as step}
                <div class="timeline-item {step.state}">
                  <span class="timeline-dot"></span>
                  <div>
                    <strong>{step.step}</strong>
                    <p>{step.at}</p>
                  </div>
                </div>
              {/each}
            </div>
          </section>
        </div>
        </div>
      </div>
    {:else}
      <div class="dashboard-shell">
        <section class="insights-summary-grid sender-query-summary-grid">
          {#each senderQueryStatusSummary as item}
            <button class="metric-card sender-query-summary-card" on:click={() => (senderQueryStatusFilter = item.status)}>
              <span class="metric-title">{senderQueryStatusLabel(item.status)}</span>
              <strong class="metric-value">{item.count}</strong>
              <span class="metric-summary">{item.breakdown}</span>
            </button>
          {/each}
        </section>

        <div class="workspace-shell">
        <aside class="workspace-list">
          <div class="toolbar-row">
            <label class="control-field slim">
              <span>Customer</span>
              <select bind:value={senderQueryCustomerFilter}>
                {#each senderQueryCustomerOptions as customer}
                  <option value={customer}>{customer}</option>
                {/each}
              </select>
            </label>
            <label class="control-field slim">
              <span>Query status</span>
              <select bind:value={senderQueryStatusFilter}>
                {#each senderQueryStatusOptions as status}
                  <option value={status}>{senderQueryStatusLabel(status)}</option>
                {/each}
              </select>
            </label>
          </div>

        <div class="workspace-summary">
          <div class="workspace-summary-head">
            <div>
              <strong>{filteredSenderQueries.length}</strong>
              <span>Queries raised across your Community customers</span>
            </div>
          </div>
        </div>

          <div class="workspace-priority">
            <button class="priority-chip" on:click={() => (senderQueryStatusFilter = 'Awaiting your response')}>
              <strong>{senderAwaitingYourResponseCount}</strong>
              <span>Needs your input</span>
            </button>
            <button class="priority-chip" on:click={() => (senderQueryStatusFilter = 'All')}>
              <strong>{senderOpenQueryCount}</strong>
              <span>Open queries</span>
            </button>
          </div>

          <div class="list-stack">
            {#each filteredSenderQueries as item}
              <button class:active={selectedSenderQuery?.id === item.id} class="list-item" on:click={() => (selectedSenderQueryId = item.id)}>
                <div class="list-top">
                  <strong>{item.queryReference}</strong>
                  <span class="status-pill {toneClass(item.statusTone)}">{senderQueryStatusLabel(item.status)}</span>
                </div>
                <span class="list-meta">Query • {item.customer}</span>
                <span class="list-meta">{item.issue} • {item.relatedTransactions.length} related transaction{item.relatedTransactions.length === 1 ? '' : 's'}</span>
              </button>
            {/each}
          </div>
        </aside>

        <div class="workspace-detail">
          <section class="detail-hero">
            <div>
              <span class="section-kicker">{selectedSenderQuery.channel} query</span>
              <h2>{selectedSenderQuery.queryReference}</h2>
              <p>{selectedSenderQuery.customer} • {selectedSenderQuery.relatedTransactions.length} related transaction{selectedSenderQuery.relatedTransactions.length === 1 ? '' : 's'}</p>
            </div>
            <div class="detail-badges">
              <span class="status-pill {toneClass(selectedSenderQuery.statusTone)}">{senderQueryStatusLabel(selectedSenderQuery.status)}</span>
              <span class="detail-amount">{selectedSenderQuery.amount}</span>
            </div>
          </section>

          <section class="detail-grid">
            <article class="detail-card">
              <span class="section-kicker">Ownership</span>
              <strong>{selectedSenderQuery.owner}</strong>
              <p>{selectedSenderQuery.waitingOn === 'You' ? 'Waiting for your input' : selectedSenderQuery.waitingOn === 'Closed' ? 'Closed' : 'Waiting for the customer'}</p>
            </article>
            <article class="detail-card issue-card">
              <span class="section-kicker">Status and context</span>
              <strong>{selectedSenderQuery.issue}</strong>
              <p>{selectedSenderQuery.nextStep}</p>
            </article>
          </section>

          <section class="detail-grid">
            <article class="detail-card">
              <span class="section-kicker">Opened</span>
              <strong>{selectedSenderQuery.openedAt}</strong>
              <p>Latest update {selectedSenderQuery.lastUpdated}</p>
            </article>
            <article class="detail-card">
              <span class="section-kicker">Query status</span>
              <strong>{senderQueryStatusLabel(selectedSenderQuery.status)}</strong>
              <p>{selectedSenderQuery.sla}</p>
            </article>
          </section>

          <div class="tabs-row secondary">
            <button class="tab" class:active={queryDetailTab === 'conversation'} on:click={() => (queryDetailTab = 'conversation')}>
              Conversation
            </button>
            <button class="tab" class:active={queryDetailTab === 'related'} on:click={() => (queryDetailTab = 'related')}>
              Related transaction
            </button>
          </div>

          {#if queryDetailTab === 'conversation'}
            <section class="timeline-card">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Conversation</span>
                  <h3>Query thread</h3>
                </div>
              </div>

              <div class="thread-list">
                {#each selectedSenderQueryMessages as message}
                  <div class="thread-item">
                    <strong>{message.author}</strong>
                    <span>{message.time}</span>
                    <p>{message.text}</p>
                    {#if message.evaExcluded}
                      <span class="thread-flag">Excluded from EVA</span>
                    {/if}
                  </div>
                {/each}
              </div>

              {#if selectedSenderQuery.uploadRequest}
                <section class="upload-request-panel">
                  <div>
                    <span class="section-kicker">Document requested</span>
                    <h3>{selectedSenderQuery.uploadRequest.title}</h3>
                    <p>{selectedSenderQuery.uploadRequest.detail}</p>
                  </div>
                  <div class="upload-control-row">
                    <label class="upload-dropzone">
                      <input type="file" accept={selectedSenderQuery.uploadRequest.acceptedTypes} on:change={handleInvoiceUpload} />
                      <strong>{uploadedInvoiceFileName || 'Choose invoice file'}</strong>
                      <span>PDF or image files accepted</span>
                    </label>
                    <button class="ghost-btn solid" disabled={!uploadedInvoiceFileName} on:click={submitMissingInvoiceUpload}>
                      Upload invoice
                    </button>
                  </div>
                </section>
              {/if}

              <section class="query-management-panel">
                <div class="section-head compact">
                  <div>
                    <span class="section-kicker">Manage query</span>
                    <h3>Update query</h3>
                  </div>
                </div>

                <div class="query-management-grid">
                  <label class="control-field query-reply-field">
                    <span>Update</span>
                    <textarea bind:value={senderReplyText} rows="4" placeholder="Add an update or supporting information"></textarea>
                  </label>

                  <label class="control-field">
                    <span>Status</span>
                    <select bind:value={senderStatusDraft}>
                      {#each senderQueryStatusOptions.filter((item) => item !== 'All') as status}
                        <option value={status}>{senderQueryStatusLabel(status)}</option>
                      {/each}
                    </select>
                  </label>
                </div>

                <label class="checkbox-row">
                  <input type="checkbox" bind:checked={senderExcludeFromEva} />
                  <span>Exclude this note from EVA</span>
                </label>

                <div class="action-row">
                  <button class="ghost-btn solid" on:click={() => updateSenderQuery('reply')}>Send update</button>
                  <button class="ghost-btn" on:click={() => updateSenderQuery('update')}>Save status</button>
                  <button class="ghost-btn" on:click={() => { senderStatusDraft = 'Closed'; updateSenderQuery('close'); }}>Close query</button>
                </div>
              </section>
            </section>
          {:else}
            <section class="timeline-card">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Related transaction</span>
                  <h3>Transaction context linked to this query</h3>
                </div>
              </div>

              <section class="detail-grid">
                <article class="detail-card">
                  <span class="section-kicker">Transactions linked</span>
                  <strong>{selectedSenderQuery.relatedTransactions.length}</strong>
                  <p>{selectedSenderQuery.relatedTransactions.map((item) => `${item.reference} (${item.status})`).join(' • ')}</p>
                </article>
                <article class="detail-card">
                  <span class="section-kicker">Next step</span>
                  <strong>{selectedSenderQuery.nextStep}</strong>
                  <p>{selectedSenderQuery.customer}</p>
                </article>
              </section>

              <section class="dual-grid">
                <article class="detail-card">
                  <div class="section-head compact">
                    <div>
                      <span class="section-kicker">Related transactions</span>
                      <h3>Status of the transactions behind this query</h3>
                    </div>
                  </div>
                  <div class="sender-related-transaction-list">
                    {#each selectedSenderQuery.relatedTransactions as transaction}
                      <div class="sender-related-transaction-card">
                        <div class="sender-related-transaction-head">
                          <div>
                            <strong>{transaction.reference}</strong>
                            <span>{transaction.type} • {transaction.amount}</span>
                          </div>
                          <span class="status-pill {toneClass(senderTransactionStatusTone(transaction.status))}">{transaction.status}</span>
                        </div>
                        <p>{transaction.note}</p>
                      </div>
                    {/each}
                  </div>
                </article>

                <article class="detail-card">
                  <div class="section-head compact">
                    <div>
                      <span class="section-kicker">Documents and actions</span>
                      <h3>Files available to support the query</h3>
                    </div>
                  </div>
                  <div class="chip-list">
                    {#each selectedSenderQuery.documents as document}
                      <span class="signal-chip">{document}</span>
                    {/each}
                  </div>
                  <div class="action-row stacked">
                    {#each selectedSenderQuery.actions as action}
                      <button class="ghost-btn">{action}</button>
                    {/each}
                  </div>
                </article>
              </section>
            </section>
          {/if}

          <section class="timeline-card">
            <div class="section-head">
              <div>
                <span class="section-kicker">History</span>
                <h3>Query timeline</h3>
              </div>
            </div>
            <div class="timeline">
              {#each selectedSenderQuery.timeline as step}
                <div class="timeline-item {step.state}">
                  <span class="timeline-dot"></span>
                  <div>
                    <strong>{step.step}</strong>
                    <p>{step.at}</p>
                  </div>
                </div>
              {/each}
            </div>
          </section>
        </div>
      </div>
      </div>
    {/if}
  {:else if activeTab === 'senders' && persona === 'receiver'}
    <div class="dashboard-shell">
      <div class="dashboard-toolbar">
        <div>
          <span class="section-kicker">Sender portfolio</span>
          <h2 class="dashboard-title">
            {receiverRole === 'clerk' ? `${selectedApClerk}'s Community senders` : 'Community senders and AP ownership'}
          </h2>
        </div>
        {#if receiverRole === 'clerk'}
          <div class="mini-switch">
            <button class:active={clerkSenderScope === 'assigned'} class="mini-switch-btn" on:click={() => (clerkSenderScope = 'assigned')}>
              Assigned to me
            </button>
            <button class:active={clerkSenderScope === 'all'} class="mini-switch-btn" on:click={() => (clerkSenderScope = 'all')}>
              All senders
            </button>
          </div>
        {/if}
      </div>

      <section class="sender-portfolio-layout">
        <article class="subpanel sender-portfolio-panel">
          <div class="section-head">
            <div>
              <span class="section-kicker">All senders</span>
              <h3>Query volume, transaction activity, and owner</h3>
            </div>
          </div>

          <label class="control-field sender-search-field">
            <span>Search senders</span>
            <input bind:value={senderPortfolioSearch} type="search" placeholder="Search by sender, owner, or latest activity" />
          </label>

          <div class="sender-portfolio-grid">
            <div class="sender-portfolio-row sender-portfolio-head">
              <span>Sender</span>
              <span>Queries</span>
              <span>Transactions</span>
              <span>SLA hit</span>
              <span>Primary owner</span>
              <span>Priority</span>
            </div>
            {#each filteredReceiverSenderPortfolio as sender}
              <div class:active={selectedVisibleReceiverSenderRow?.name === sender.name} class="sender-portfolio-row">
                <button class="sender-row-select" on:click={() => (selectedReceiverSender = sender.name)}>
                  <span>
                    <strong>{sender.name}</strong>
                    <small>{sender.open} open • {sender.closed} closed</small>
                  </span>
                  <span>{sender.queries}</span>
                  <span>{sender.transactions}</span>
                  <span class="status-pill {sender.slaRate < 70 ? 'high' : 'good'}">{sender.slaRate}%</span>
                  <span>{sender.owner}</span>
                </button>
                <span>
                  <button
                    type="button"
                    class:active={sender.priority}
                    class="priority-star"
                    aria-label={sender.priority ? `Remove ${sender.name} priority` : `Prioritise ${sender.name}`}
                    on:click={() => togglePrioritySender(sender.name)}
                  >
                    ★
                  </button>
                </span>
              </div>
            {/each}
            {#if !filteredReceiverSenderPortfolio.length}
              <div class="sender-portfolio-empty">
                No senders match “{senderPortfolioSearch}”.
              </div>
            {/if}
          </div>
        </article>

        {#if selectedVisibleReceiverSenderRow}
          <aside class="subpanel sender-detail-panel">
            <div class="section-head">
              <div>
                <span class="section-kicker">Sender detail</span>
                <h3 class="sender-detail-title">
                  {selectedVisibleReceiverSenderRow.name}
                  <button
                    type="button"
                    class:active={selectedVisibleReceiverSenderRow.priority}
                    class="priority-star inline-star"
                    aria-label={selectedVisibleReceiverSenderRow.priority ? `Remove ${selectedVisibleReceiverSenderRow.name} priority` : `Prioritise ${selectedVisibleReceiverSenderRow.name}`}
                    on:click={() => togglePrioritySender(selectedVisibleReceiverSenderRow.name)}
                  >
                    ★
                  </button>
                </h3>
              </div>
              <button class="ghost-btn solid" on:click={() => viewReceiverSenderQueries(selectedVisibleReceiverSenderRow)}>
                Open in Queries
              </button>
            </div>

            <section class="insights-summary-grid sender-detail-stats">
              <article class="metric-card">
                <span class="metric-title">Queries logged</span>
                <strong class="metric-value">{selectedVisibleReceiverSenderRow.queries}</strong>
                <span class="metric-summary">{selectedVisibleReceiverSenderRow.open} outstanding</span>
              </article>
              <article class="metric-card">
                <span class="metric-title">Transactions processed</span>
                <strong class="metric-value">{selectedVisibleReceiverSenderRow.transactions}</strong>
                <span class="metric-summary">Selected period estimate</span>
              </article>
              <article class="metric-card">
                <span class="metric-title">SLA hit rate</span>
                <strong class="metric-value">{selectedVisibleReceiverSenderRow.slaRate}%</strong>
                <span class="metric-summary">{selectedVisibleReceiverSenderRow.priority ? 'Priority sender' : 'Standard queue'}</span>
              </article>
            </section>

            <article class="owner-assignment-row">
              <label class="control-field owner-picker">
                <span>Primary owner</span>
                <input
                  list="sender-owner-options"
                  value={selectedVisibleReceiverSenderRow.owner}
                  on:input={(event) => updateSenderOwner(selectedVisibleReceiverSenderRow.name, event.currentTarget.value)}
                  aria-label={`Primary owner for ${selectedVisibleReceiverSenderRow.name}`}
                />
              </label>
              <datalist id="sender-owner-options">
                {#each apClerkProfiles as profile}
                  <option value={profile.name}></option>
                {/each}
                <option value="AP Query Team"></option>
              </datalist>
            </article>

            <div class="sender-query-detail-list">
              {#each selectedVisibleReceiverSenderRow.items as item}
                <button class="sender-query-detail-card" on:click={() => { viewReceiverSenderQueries(selectedVisibleReceiverSenderRow); selectedTransactionId = item.id; }}>
                  <div class="list-top">
                    <strong>{getCommunityQueryReference(item)}</strong>
                    <span class="list-top-badges">
                      {#if item.automatedSequence}
                        <span class="automation-stage-cog" aria-label={`Automated workflow sequence ${item.automatedSequence.currentStep} of ${item.automatedSequence.totalSteps}`}>
                          <span>{item.automatedSequence.currentStep}</span>
                        </span>
                      {/if}
                      <span class="status-pill {toneClass(receiverQueryStatusTone(receiverQueryStatus(item)))}">{receiverQueryStatus(item)}</span>
                    </span>
                  </div>
                  <span class="list-meta">{item.issue}</span>
                  {#if hasReceiverSla(item)}
                    <div class="workspace-sla-row">
                      <span class="sla-chip {receiverQuerySla(item).response.tone}">Response {receiverQuerySla(item).response.label}</span>
                      <span class="sla-chip {receiverQuerySla(item).closure.tone}">Resolution {receiverQuerySla(item).closure.label}</span>
                    </div>
                  {/if}
                </button>
              {/each}
            </div>
          </aside>
        {/if}
      </section>
    </div>
  {:else}
    <div class="dashboard-shell">
      {#if persona === 'receiver'}
        <section class="dual-grid">
          <article class="detail-card">
            <div class="section-head compact">
              <div>
                <span class="section-kicker">Targets</span>
                <h3>Service level targets</h3>
              </div>
            </div>

            <div class="settings-grid">
              <label class="control-field">
                <span>Response target</span>
                <select bind:value={responseTarget}>
                  <option>2 hours</option>
                  <option>4 hours</option>
                  <option>8 hours</option>
                  <option>1 business day</option>
                </select>
              </label>

              <label class="control-field">
                <span>Resolution target</span>
                <select bind:value={closureTarget}>
                  <option>1 day</option>
                  <option>2 days</option>
                  <option>3 days</option>
                  <option>5 days</option>
                </select>
              </label>
            </div>

            <div class="modal-summary">
              <strong>Current targets</strong>
              <span>Response target is set to <b>{responseTarget}</b> and resolution target is set to <b>{closureTarget}</b>.</span>
            </div>
          </article>

          <article class="detail-card">
            <div class="section-head compact">
              <div>
                <span class="section-kicker">Access</span>
                <h3>Roles and notifications</h3>
              </div>
            </div>
            <div class="role-list">
              {#each communityRoleProfiles as profile}
                <div class="role-row">
                  <div>
                    <strong>{profile.role}</strong>
                    <p>{profile.access}</p>
                  </div>
                  <span class="status-pill neutral">{profile.users} users</span>
                </div>
              {/each}
            </div>
          </article>
        </section>

        <section class="settings-stack">
          <article class="detail-card workflow-config-card">
            <div class="section-head compact">
              <div>
                <span class="section-kicker">Workflows</span>
                <h3>Automated sender chasing sequences</h3>
              </div>
              <label class="workflow-enabled-toggle">
                <input type="checkbox" bind:checked={workflowAutomationEnabled} />
                <span>{workflowAutomationEnabled ? 'Enabled' : 'Disabled'}</span>
              </label>
            </div>

            <section class="workflow-config-hero">
              <div>
                <strong>Overdue payment chase</strong>
                <p>
                  Opens a query automatically when a payment is overdue, records every chase step, allows manual intervention,
                  and self-closes when payment is received.
                </p>
              </div>
              <label class="control-field workflow-step-count">
                <span>Steps in sequence</span>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={workflowStepCount}
                  on:change={(event) => setWorkflowStepCount(event.currentTarget.value)}
                />
              </label>
            </section>

            <div class="workflow-step-list">
              {#each workflowSequenceSteps as step, index}
                <article class="workflow-step-card">
                  <div class="workflow-step-number">{step.sequence}</div>
                  <label class="control-field">
                    <span>Trigger</span>
                    <div class="workflow-inline-input">
                      <input type="number" min="0" bind:value={step.triggerDays} />
                      <span>days after due date</span>
                    </div>
                  </label>
                  <label class="control-field">
                    <span>Action</span>
                    <select bind:value={step.action}>
                      <option>Send email template</option>
                      <option>Open portal notification</option>
                      <option>Escalate to human</option>
                      <option>Pause for review</option>
                    </select>
                  </label>
                  <label class="control-field">
                    <span>Template</span>
                    <select bind:value={step.template}>
                      <option>Payment overdue reminder</option>
                      <option>Second payment chase</option>
                      <option>Final reminder before escalation</option>
                      <option>Credit control escalation</option>
                    </select>
                  </label>
                  <label class="control-field">
                    <span>Owner</span>
                    <select bind:value={step.owner}>
                      <option>Automation</option>
                      <option>AP Query Team</option>
                      {#each apClerkProfiles as profile}
                        <option>{profile.name}</option>
                      {/each}
                    </select>
                  </label>
                </article>
              {/each}
            </div>

            <div class="modal-summary">
              <strong>Self-closing rule</strong>
              <span>If the linked invoice is paid, the workflow closes the query automatically and records the settlement event in the timeline.</span>
            </div>
          </article>

          <article class="detail-card ai-data-card">
            <div class="section-head compact">
              <div>
                <span class="section-kicker">AI knowledge and data</span>
                <h3>What EVA can use and how you manage it</h3>
              </div>
              <div class="action-row">
                <button class="ghost-btn solid">Upload knowledge file</button>
                <button class="ghost-btn">Manage approvals</button>
              </div>
            </div>

            <section class="analytics-grid">
              {#each receiverAiDataSettings.overview as item}
                <article class="metric-card">
                  <span class="metric-title">{item.label}</span>
                  <strong class="metric-value">{item.value}</strong>
                  <span class="metric-summary">{item.note}</span>
                </article>
              {/each}
            </section>

            <div class="ai-data-grid">
              {#each receiverAiDataSettings.sources as source}
                <article class:active={aiSettingsFocus === source.key} class="insight-card ai-source-card">
                  <div class="insight-card-head">
                    <div>
                      <strong>{source.title}</strong>
                      <span>{source.status}</span>
                    </div>
                  </div>
                  <p>{source.summary}</p>
                  <span class="insight-note">{source.detail}</span>
                  <div class="action-row">
                    {#each source.actions as action}
                      <button class="ghost-btn" on:click={() => (aiSettingsFocus = source.key)}>{action}</button>
                    {/each}
                  </div>
                </article>
              {/each}
            </div>

            <article class="detail-card ai-upload-card">
              <div class="section-head compact">
                <div>
                  <span class="section-kicker">Current sources</span>
                  <h3>Files and approved answer packs already available</h3>
                </div>
              </div>

              <div class="role-list">
                {#each receiverAiDataSettings.uploads as item}
                  <div class="role-row">
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.type} • {item.updated}</p>
                    </div>
                    <span class="status-pill neutral">{item.status}</span>
                  </div>
                {/each}
              </div>
            </article>
          </article>
        </section>
      {:else}
        <section class="dual-grid">
          <article class="detail-card">
            <div class="section-head compact">
              <div>
                <span class="section-kicker">Notifications</span>
                <h3>How and when you want to be updated</h3>
              </div>
            </div>

            <div class="settings-grid">
              <label class="control-field">
                <span>Customer update received</span>
                <select bind:value={senderResponseNotification}>
                  <option>Instant</option>
                  <option>Hourly digest</option>
                  <option>Daily digest</option>
                  <option>Off</option>
                </select>
              </label>

              <label class="control-field">
                <span>Needs your input</span>
                <select bind:value={senderAwaitingNotification}>
                  <option>Instant</option>
                  <option>Hourly digest</option>
                  <option>Daily digest</option>
                  <option>Off</option>
                </select>
              </label>

              <label class="control-field">
                <span>Invoice placed on hold</span>
                <select bind:value={senderHoldNotification}>
                  <option>Instant</option>
                  <option>Hourly digest</option>
                  <option>Daily digest</option>
                  <option>Off</option>
                </select>
              </label>

              <label class="control-field">
                <span>Remittance issued</span>
                <select bind:value={senderRemittanceNotification}>
                  <option>Instant</option>
                  <option>Hourly digest</option>
                  <option>Daily digest</option>
                  <option>Off</option>
                </select>
              </label>
            </div>

            <div class="modal-summary">
              <strong>Current notification profile</strong>
              <span>Customer updates and query actions are set to <b>instant</b>, while remittance updates are grouped into a <b>{senderRemittanceNotification.toLowerCase()}</b>.</span>
            </div>
          </article>

          <article class="detail-card">
            <div class="section-head compact">
              <div>
                <span class="section-kicker">Delivery</span>
                <h3>How Community should send updates</h3>
              </div>
            </div>

            <div class="settings-grid">
              <label class="control-field">
                <span>Delivery channel</span>
                <select bind:value={senderDeliveryChannel}>
                  <option>Email and in-platform</option>
                  <option>Email only</option>
                  <option>In-platform only</option>
                </select>
              </label>

              <label class="control-field">
                <span>Daily digest time</span>
                <select bind:value={senderDigestTime}>
                  <option>08:00</option>
                  <option>12:00</option>
                  <option>17:00</option>
                </select>
              </label>

              <label class="control-field">
                <span>Default customer view</span>
                <select bind:value={senderDefaultCustomerView}>
                  <option>All Community customers</option>
                  {#each currentSenderCustomerBreakdown as customer}
                    <option>{customer.customer}</option>
                  {/each}
                </select>
              </label>
            </div>

            <div class="role-list">
              <div class="role-row">
                <div>
                  <strong>Inbox and EVA</strong>
                  <p>Query emails and EVA escalations will keep using the selected customer context by default.</p>
                </div>
                <span class="status-pill neutral">{senderDeliveryChannel}</span>
              </div>
              <div class="role-row">
                <div>
                  <strong>Digest timing</strong>
                  <p>Daily summaries are grouped into one update so invoice and remittance changes are easier to scan.</p>
                </div>
                <span class="status-pill neutral">{senderDigestTime}</span>
              </div>
            </div>
          </article>
        </section>
      {/if}
    </div>
  {/if}
</section>

{#if pressureHelperOpen}
  <button class="modal-backdrop" on:click={closePressureHelper} aria-label="Close pressure helper"></button>
  <div class="modal-shell" role="dialog" aria-modal="true" aria-labelledby="pressure-helper-title">
    <div class="modal-card">
      <div class="modal-head">
        <div>
          <span class="section-kicker">Community pressure</span>
          <h3 id="pressure-helper-title">What this means</h3>
        </div>
        <button class="modal-close" on:click={closePressureHelper} aria-label="Close pressure helper">Close</button>
      </div>

      <p class="modal-copy">
        Community pressure is a simple headline score showing how much friction external users are likely feeling across
        holds, delays, and open conversations.
      </p>

      <div class="helper-scale modal-scale">
        {#each pressureBands as band}
          <div class:active={communityPressureBand.label === band.label} class="scale-band modal-band">
            <strong>{band.label}</strong>
            <span>{band.range}</span>
            <p>{band.note}</p>
          </div>
        {/each}
      </div>

      <div class="modal-summary">
        <strong>Current score: {communityPressure}</strong>
        <span>
          This places the dashboard in <b>{communityPressureBand.label}</b>, which suggests external users are likely
          seeing meaningful delay, uncertainty, or follow-up effort.
        </span>
      </div>
    </div>
  </div>
{/if}

{#if slaDetailOpen && selectedSlaInsight}
  <button class="modal-backdrop" on:click={closeSlaDetail} aria-label="Close SLA detail"></button>
  <div class="modal-shell" role="dialog" aria-modal="true" aria-labelledby="sla-detail-title">
    <div class="modal-card">
      <div class="modal-head">
        <div>
          <span class="section-kicker">SLA detail</span>
          <h3 id="sla-detail-title">{selectedSlaInsight.title} • {selectedSlaInsight.status}</h3>
        </div>
        <button class="modal-close" on:click={closeSlaDetail} aria-label="Close SLA detail">Close</button>
      </div>

      <div class="modal-summary">
        <strong>{selectedSlaInsight.count}</strong>
        <span>{selectedSlaInsight.summary}</span>
      </div>

      <div class="detail-grid">
        <article class="detail-card">
          <span class="section-kicker">Recurring patterns</span>
          <div class="trend-list">
            {#each selectedSlaInsight.patterns as pattern}
              <span>{pattern}</span>
            {/each}
          </div>
        </article>

        <article class="detail-card">
          <span class="section-kicker">Typical query types</span>
          <div class="chip-list">
            {#each selectedSlaInsight.examples as example}
              <span class="signal-chip">{example}</span>
            {/each}
          </div>
          <div class="action-row">
            <button class="ghost-btn solid" on:click={closeSlaDetail}>Keep reviewing</button>
            <button class="ghost-btn" on:click={openSlaTransactions}>Open queries</button>
          </div>
        </article>
      </div>
    </div>
  </div>
{/if}

{#if teamMetricDetailOpen && selectedTeamMetricDetail}
  <button class="modal-backdrop" on:click={closeTeamMetricDetail} aria-label="Close team metric detail"></button>
  <div class="modal-shell" role="dialog" aria-modal="true" aria-labelledby="team-metric-title">
    <div class="modal-card">
      <div class="modal-head">
        <div>
          <span class="section-kicker">Team metric</span>
          <h3 id="team-metric-title">{selectedTeamMetricDetail.title} • {selectedTeamMetricDetail.user}</h3>
        </div>
        <button class="modal-close" on:click={closeTeamMetricDetail} aria-label="Close team metric detail">Close</button>
      </div>

      <div class="modal-summary">
        <strong>{selectedTeamMetricDetail.value}</strong>
        <span>{selectedTeamMetricDetail.summary}</span>
      </div>

      <div class="detail-grid">
        <article class="detail-card">
          <span class="section-kicker">How it is calculated</span>
          <div class="trend-list">
            {#each selectedTeamMetricDetail.breakdown as item}
              <span>{item}</span>
            {/each}
          </div>
        </article>

        <article class="detail-card">
          <span class="section-kicker">Current target</span>
          <p>{selectedTeamMetricDetail.comparison}</p>
          <div class="action-row">
            <button class="ghost-btn solid" on:click={closeTeamMetricDetail}>Keep reviewing</button>
          </div>
        </article>
      </div>
    </div>
  </div>
{/if}

{#if expectedCashDetailOpen}
  <button class="modal-backdrop" on:click={closeExpectedCashDetail} aria-label="Close expected cash breakdown"></button>
  <div class="modal-shell" role="dialog" aria-modal="true" aria-labelledby="expected-cash-title">
    <div class="modal-card">
      <div class="modal-head">
        <div>
            <span class="section-kicker">Expected cash</span>
            <h3 id="expected-cash-title">
              {expectedCashSelection?.level === 'detail'
                ? `${expectedCashSelection.item.label} expected receipts`
                : expectedCashSelection?.level === 'day'
                ? 'Daily receipt view'
                : expectedCashSelection?.level === 'week'
                  ? 'Weekly receipt view'
                  : currentSenderExpectedCash.title}
            </h3>
        </div>
        <button class="modal-close" on:click={closeExpectedCashDetail} aria-label="Close expected cash breakdown">Close</button>
      </div>

      <div class="modal-summary">
        <strong>
          {expectedCashSelection?.item?.total || currentSenderMetrics.expectedCash.value}
        </strong>
        <span>
          {expectedCashSelection?.trail?.length
            ? `Viewing ${expectedCashSelection.trail.join(' • ')}`
            : currentSenderExpectedCash.summary}
        </span>
      </div>

      <div class="expected-cash-controls">
        <div class="view-toggle">
          <button class:active={expectedCashView === 'timeline'} class="toggle-btn" on:click={() => (expectedCashView = 'timeline')}>Timeline</button>
          <button class:active={expectedCashView === 'customer'} class="toggle-btn" on:click={() => (expectedCashView = 'customer')}>By customer</button>
          <button class:active={expectedCashView === 'transactions'} class="toggle-btn" on:click={() => (expectedCashView = 'transactions')}>See transactions</button>
        </div>
      </div>

      <div class="detail-grid">
        <article class="detail-card">
          <span class="section-kicker">
            {expectedCashView === 'customer'
              ? 'Customer totals'
              : expectedCashView === 'transactions'
                ? 'Underlying transactions'
                : expectedCashSelection?.level === 'day'
                  ? 'Expected days'
                  : expectedCashSelection?.level === 'week'
                    ? 'Expected weeks'
                    : 'Expected months'}
          </span>

          <div class="cash-drill-list">
            {#if expectedCashView === 'customer'}
              {#each expectedCashCustomerRows as row}
                <div class="cash-drill-item static">
                  <div>
                    <strong>{row.customer}</strong>
                    <span>{row.dayCount} expected receipt day{row.dayCount === 1 ? '' : 's'}</span>
                  </div>
                  <strong>{formatCurrency(row.amount)}</strong>
                </div>
              {/each}
            {:else if expectedCashView === 'transactions'}
              {#each expectedCashTransactions as row}
                <div class="cash-drill-item static">
                  <div>
                    <strong>{row.reference}</strong>
                    <span>{row.customer} • Expected {row.expectedDate}</span>
                  </div>
                  <strong>{formatCurrency(row.amount)}</strong>
                </div>
              {/each}
            {:else if !expectedCashSelection || expectedCashSelection.level === 'month'}
              {#each currentSenderExpectedCash.months as month}
                <button class="cash-drill-item" on:click={() => selectExpectedCashMonth(month)}>
                  <div>
                    <strong>{month.label}</strong>
                    <span>{month.weeks.length} weekly windows</span>
                  </div>
                  <strong>{formatCurrency(amountValue(month.total))}</strong>
                </button>
              {/each}
            {:else if expectedCashSelection.level === 'week'}
                {#each expectedCashSelection.item.weeks as week}
                  <button class="cash-drill-item" on:click={() => selectExpectedCashWeek(week)}>
                    <div>
                      <strong>{week.label}</strong>
                      <span>{week.days.length} expected receipt days</span>
                    </div>
                    <strong>{formatCurrency(amountValue(week.total))}</strong>
                  </button>
                {/each}
              {:else if expectedCashSelection.level === 'day'}
                {#each expectedCashSelection.item.days as day}
                  <button class="cash-drill-item" on:click={() => selectExpectedCashDay(day)}>
                    <div>
                      <strong>{day.label}</strong>
                      <span>{day.detail}</span>
                    </div>
                    <strong>{formatCurrency(amountValue(day.total))}</strong>
                  </button>
                {/each}
              {:else}
                <div class="cash-drill-item static">
                  <div>
                    <strong>{expectedCashSelection.item.label}</strong>
                    <span>{expectedCashSelection.item.detail}</span>
                  </div>
                  <strong>{formatCurrency(amountValue(expectedCashSelection.item.total))}</strong>
                </div>
              {/if}
            </div>
          </article>

        <article class="detail-card">
          <span class="section-kicker">Drill path</span>
          <div class="trend-list">
            <span>Month view shows the headline expected receipt position.</span>
            <span>Week view groups the month into cash arrival windows.</span>
            <span>Day view shows the expected receipt dates and contributing customers.</span>
          </div>
          <div class="action-row">
            {#if expectedCashSelection?.level && expectedCashSelection.level !== 'month'}
              <button class="ghost-btn" on:click={backExpectedCashLevel}>Back one level</button>
            {/if}
            <button class="ghost-btn solid" on:click={closeExpectedCashDetail}>Close</button>
          </div>
        </article>
      </div>
    </div>
  </div>
{/if}

{#if aiOpportunityDetailOpen && selectedAiOpportunity}
  <button class="modal-backdrop" on:click={closeAiOpportunityDetail} aria-label="Close AI improvement detail"></button>
  <div class="modal-shell" role="dialog" aria-modal="true" aria-labelledby="ai-opportunity-title">
    <div class="modal-card">
      <div class="modal-head">
        <div>
          <span class="section-kicker">AI improvement</span>
          <h3 id="ai-opportunity-title">{selectedAiOpportunity.label}</h3>
        </div>
        <button class="modal-close" on:click={closeAiOpportunityDetail} aria-label="Close AI improvement detail">Close</button>
      </div>

      <div class="modal-summary">
        <strong>{selectedAiOpportunity.detail}</strong>
        <span>{selectedAiOpportunity.summary}</span>
      </div>

      <div class="detail-grid">
        <article class="detail-card">
          <span class="section-kicker">Opportunity in view</span>
          <p>{selectedAiOpportunity.value}</p>
        </article>

        <article class="detail-card">
          <span class="section-kicker">Recommended next step</span>
          <div class="trend-list">
            {#each selectedAiOpportunity.guidance as line}
              <span>{line}</span>
            {/each}
          </div>
          <div class="action-row">
            <button class="ghost-btn solid" on:click={selectedAiOpportunity.onAction}>{selectedAiOpportunity.actionLabel}</button>
            <button class="ghost-btn" on:click={closeAiOpportunityDetail}>Keep reviewing</button>
          </div>
        </article>
      </div>
    </div>
  </div>
{/if}

<style>
  .main-card { padding: 0; overflow: hidden; }
  .page-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .page-header-main { display: flex; align-items: center; gap: 12px; flex: 1 1 auto; min-width: 0; }
  .persona-switch { display: inline-flex; align-items: center; gap: 8px; padding: 4px; border-radius: 999px; background: #fff; border: 1px solid var(--border); }
  .persona-btn { min-height: 34px; padding: 0 14px; border: none; border-radius: 999px; background: transparent; color: var(--text-dim); font-size: 12px; font-weight: 700; }
  .persona-btn.active { background: #0b7f77; color: #fff; }
  .sender-mandate-banner {
    position: relative;
    display: flex;
    align-items: center;
    gap: 18px;
    margin: 0 auto;
    padding: 14px 48px 14px 16px;
    border: 1px solid rgba(180, 83, 9, 0.22);
    border-radius: 18px;
    background:
      radial-gradient(circle at top right, rgba(245, 158, 11, 0.26), transparent 34%),
      linear-gradient(135deg, rgba(180, 83, 9, 0.12), rgba(217, 119, 6, 0.08)),
      #fff8eb;
    box-shadow: 0 14px 30px rgba(180, 83, 9, 0.14);
  }
  .sender-mandate-copy {
    display: grid;
    gap: 6px;
    min-width: 0;
  }
  .sender-mandate-kicker {
    color: #9a3412;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .sender-mandate-copy p {
    margin: 0;
    color: #7c2d12;
    font-size: 13px;
    line-height: 1.45;
  }
  .sender-mandate-actions {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    flex: 0 0 auto;
  }
  .sender-mandate-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 28px;
    height: 28px;
    border: 1px solid rgba(16, 58, 106, 0.1);
    border-radius: 999px;
    background: rgba(255, 248, 235, 0.94);
    color: #9a3412;
    font-size: 18px;
    line-height: 1;
  }

  .tabs-row.primary { display: flex; align-items: center; gap: 28px; padding: 0 20px; border-bottom: 1px solid var(--border); }
  .tabs-group { display: flex; align-items: center; gap: 28px; }
  .topbar-cta { margin-left: auto; }
  .tabs-row.secondary { display: flex; align-items: center; gap: 18px; padding: 0 0 8px; border-bottom: 1px solid var(--border); margin: 2px 0 18px; }
  .tab { background: transparent; border: none; padding: 16px 0 14px; font-size: 14px; font-weight: 500; color: var(--text-dim); border-bottom: 2px solid transparent; margin-bottom: -1px; }
  .tab.active { color: #0b7f77; border-bottom-color: #0b7f77; font-weight: 600; }
  .receiver-role-tools { margin-left: auto; display: flex; align-items: center; gap: 12px; }
  .role-switch { display: inline-flex; align-items: center; gap: 4px; padding: 4px; border-radius: 999px; background: #f6faf9; border: 1px solid var(--border); }
  .role-switch-btn { min-height: 30px; padding: 0 12px; border: none; border-radius: 999px; background: transparent; color: var(--text-dim); font-size: 12px; font-weight: 700; }
  .role-switch-btn.active { background: #0b7f77; color: #fff; }
  .clerk-select { min-width: 170px; gap: 4px; }
  .clerk-select select { min-height: 34px; padding: 7px 10px; }

  .dashboard-shell, .workspace-shell { padding: 20px; }
  .dashboard-toolbar { display: flex; align-items: end; justify-content: space-between; gap: 18px; margin-bottom: 18px; }
  .dashboard-title { margin: 6px 0 0; color: var(--navy); font-size: 24px; line-height: 1.15; }
  .period-field { min-width: 180px; }
  .email-demo-shell { padding: 20px; background: linear-gradient(180deg, #f8fbfb 0%, #fff 100%); }
  .email-demo-header { display: flex; align-items: center; justify-content: space-between; gap: 18px; margin-bottom: 18px; }
  .email-thread { display: grid; gap: 16px; max-width: 980px; margin: 0 auto; }
  .email-card {
    display: grid;
    gap: 16px;
    padding: 20px;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: #fff;
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
  }
  .email-card.inbound { border-left: 4px solid #64748b; }
  .email-card.eva-response { border-left: 4px solid #0b7f77; }
  .email-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
  .email-card-head h3 { margin: 5px 0 0; color: var(--navy); font-size: 20px; line-height: 1.2; }
  .email-card-head > span { color: var(--text-dim); font-size: 12px; white-space: nowrap; }
  .email-label { color: #0b7f77; font-size: 11px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; }
  .email-meta-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 0; }
  .email-meta-grid div { padding: 10px 12px; border-radius: 10px; background: var(--panel-alt); border: 1px solid var(--border); }
  .email-meta-grid dt { color: var(--text-dim); font-size: 11px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; }
  .email-meta-grid dd { margin: 4px 0 0; color: var(--navy); font-size: 13px; }
  .email-body { color: var(--text); font-size: 14px; line-height: 1.65; }
  .email-body p { margin: 0 0 12px; }
  .email-body p:last-child { margin-bottom: 0; }
  .email-reveal-panel { display: flex; justify-content: center; padding: 8px 0 4px; }
  .eva-email-footer {
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr);
    gap: 14px;
    align-items: center;
    padding: 14px;
    border-radius: 14px;
    background: linear-gradient(135deg, #eef8f6 0%, #fff 100%);
    border: 1px solid #cfe8e4;
  }
  .eva-email-footer img { width: 48px; height: 48px; }
  .eva-email-footer strong { display: block; color: var(--navy); margin-bottom: 4px; }
  .eva-email-footer p { margin: 0; color: var(--text-dim); line-height: 1.55; }
  .eva-email-footer a { color: #0b7f77; font-weight: 700; }
  .email-mandate-callout {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 14px 16px;
    border: 1px solid rgba(180, 83, 9, 0.22);
    border-radius: 18px;
    background:
      radial-gradient(circle at top right, rgba(245, 158, 11, 0.26), transparent 34%),
      linear-gradient(135deg, rgba(180, 83, 9, 0.12), rgba(217, 119, 6, 0.08)),
      #fff8eb;
    box-shadow: 0 14px 30px rgba(180, 83, 9, 0.14);
  }
  .clerk-focus-panel {
    display: grid;
    grid-template-columns: minmax(280px, 0.9fr) minmax(0, 1.1fr);
    gap: 16px;
    align-items: stretch;
    margin-bottom: 18px;
    padding: 18px;
    border-radius: 16px;
    border: 1px solid #cfe8e4;
    background: linear-gradient(135deg, #f4fbfa 0%, #fff 100%);
  }
  .clerk-focus-panel h3 { margin: 6px 0 8px; color: var(--navy); }
  .clerk-focus-panel p { margin: 0; color: var(--text-dim); line-height: 1.55; }
  .clerk-focus-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
  .clerk-focus-stats article { padding: 12px; border-radius: 12px; background: #fff; border: 1px solid var(--border); }
  .clerk-focus-stats span { display: block; color: var(--text-dim); font-size: 12px; }
  .clerk-focus-stats strong { display: block; margin-top: 8px; color: var(--navy); font-size: 24px; line-height: 1; }
  .clerk-dashboard-layout { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(320px, 0.75fr); gap: 18px; align-items: start; }
  .clerk-sla-panel { grid-column: 1 / -1; }
  .clerk-supplier-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
  .clerk-supplier-card {
    display: grid;
    gap: 8px;
    padding: 14px;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: #fff;
    text-align: left;
    cursor: pointer;
  }
  .clerk-supplier-card:hover { border-color: #0b7f77; box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08); }
  .clerk-supplier-card span { color: var(--text-dim); font-size: 12px; line-height: 1.45; }
  .top-summary-row { display: grid; grid-template-columns: 320px minmax(0, 1fr); gap: 14px; align-items: stretch; }
  .receiver-top { margin-bottom: 18px; }
  .sender-top-layout {
    display: grid;
    grid-template-columns: minmax(250px, 0.72fr) minmax(250px, 0.72fr) minmax(360px, 1.56fr);
    grid-template-rows: repeat(2, minmax(0, 1fr));
    gap: 14px;
    margin-bottom: 18px;
    align-items: stretch;
  }
  .sender-top-layout .sender-hero {
    grid-column: 1;
    grid-row: 1 / span 2;
  }
  .sender-top-card { padding: 16px; gap: 8px; }
  .sender-response-card { grid-column: 2; grid-row: 1; }
  .sender-query-card { grid-column: 2; grid-row: 2; }
  .sender-remittance-promo {
    grid-column: 3;
    grid-row: 1 / span 2;
    border-radius: 16px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: #fff;
    background: linear-gradient(140deg, #123a7a 0%, #2459c7 48%, #0f7bdc 100%);
    box-shadow: 0 18px 40px rgba(23, 72, 170, 0.24);
  }
  .sender-remittance-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }
  .sender-remittance-head {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .sender-remittance-top strong { display: block; margin-top: 8px; font-size: 48px; line-height: 1; }
  .sender-remittance-stats {
    display: grid;
    grid-template-columns: repeat(2, minmax(120px, max-content));
    gap: 10px;
    align-content: start;
    align-items: start;
    margin-top: 12px;
  }
  .sender-remittance-stat {
    padding: 12px 12px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.16);
  }
  .sender-remittance-stat span {
    display: block;
    color: rgba(255,255,255,0.82);
    font-size: 12px;
    font-weight: 600;
  }
  .sender-remittance-stat strong {
    display: block;
    margin-top: 8px;
    color: #fff;
    font-size: 22px;
    line-height: 1.05;
  }
  .sender-remittance-promo .hero-label,
  .sender-remittance-promo .hero-note,
  .sender-remittance-promo .metric-title,
  .sender-remittance-promo .metric-summary {
    color: rgba(255, 255, 255, 0.88);
  }
  .sender-remittance-download {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: 12px;
    padding: 14px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.14);
  }
  .sender-remittance-download.compact {
    align-items: flex-start;
    width: fit-content;
    min-width: 0;
    padding: 12px;
    gap: 10px;
    flex: 0 0 auto;
    margin-top: 0;
  }
  .sender-remittance-download .mini-switch {
    display: flex;
    align-self: flex-start;
  }
  .sender-remittance-download > span {
    color: rgba(255,255,255,0.88);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .sender-remittance-download .ghost-btn {
    align-self: flex-start;
  }
  .sender-remittance-promo .mini-switch {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.16);
  }
  .sender-remittance-promo .mini-switch-btn {
    color: rgba(255,255,255,0.76);
  }
  .sender-remittance-promo .mini-switch-btn.active {
    background: #fff;
    color: #123a7a;
  }
  .sender-remittance-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-top: 2px;
  }
  .sender-remittance-footer p {
    margin: 0;
    color: rgba(255,255,255,0.92);
    line-height: 1.55;
    flex: 1;
  }
  .sender-remittance-footer .ghost-btn {
    flex: 0 0 auto;
  }

  .value-card,
  .sender-hero,
  .hero-score {
    border-radius: 16px;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    color: #fff;
  }

  .value-card {
    background: linear-gradient(135deg, #103a6a 0%, #0b7f77 58%, #134154 100%);
    box-shadow: 0 18px 40px rgba(16, 41, 79, 0.18);
  }

  .sender-hero {
    background: linear-gradient(135deg, #0f5b68 0%, #0b7f77 55%, #134154 100%);
    box-shadow: 0 18px 40px rgba(16, 41, 79, 0.18);
  }
  .clickable-hero { cursor: pointer; transition: transform 160ms ease, box-shadow 160ms ease; }
  .clickable-hero:hover,
  .clickable-hero:focus-visible { transform: translateY(-1px); box-shadow: 0 22px 46px rgba(16, 41, 79, 0.22); }
  .expected-cash-controls { margin-bottom: 14px; }
  .view-toggle {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 4px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: var(--panel-alt);
  }
  .toggle-btn {
    min-height: 34px;
    padding: 0 14px;
    border: none;
    border-radius: 999px;
    background: transparent;
    color: var(--text-dim);
    font-size: 12px;
    font-weight: 700;
  }
  .toggle-btn.active {
    background: #0b7f77;
    color: #fff;
  }

  .value-card strong,
  .sender-hero strong,
  .hero-score strong { font-size: 52px; line-height: 1; }
  .hero-statline { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
  .hero-ratio { color: rgba(255,255,255,0.82); font-size: 18px; font-weight: 700; }

  .value-card p,
  .sender-hero p { margin: 0; color: rgba(255,255,255,0.82); line-height: 1.55; }

  .hero-score { border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 18px 40px rgba(16, 41, 79, 0.18); }
  .hero-score.healthy { background: linear-gradient(135deg, #0f5b68 0%, #0b7f77 55%, #134154 100%); }
  .hero-score.watchlist { background: linear-gradient(135deg, #8a4b08 0%, #d17a10 52%, #7c3211 100%); box-shadow: 0 18px 40px rgba(168, 92, 18, 0.24); }
  .hero-score.high-risk { background: linear-gradient(135deg, #741515 0%, #b42318 50%, #5f1322 100%); box-shadow: 0 18px 44px rgba(148, 27, 42, 0.28); }
  .hero-label, .hero-note, .metric-title, .metric-change, .list-meta, .settings-copy { color: var(--text-dim); }
  .value-card .hero-label, .value-card .hero-note, .sender-hero .hero-label, .sender-hero .hero-note, .hero-score .hero-label, .hero-score .hero-note { color: rgba(255,255,255,0.82); }
  .hero-actions-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .helper-trigger { align-self: flex-start; border: 1px solid rgba(255,255,255,0.22); border-radius: 999px; background: rgba(255,255,255,0.08); color: #fff; padding: 8px 12px; font-size: 12px; font-weight: 700; }
  .mini-switch { display: inline-flex; align-items: center; gap: 6px; padding: 4px; border-radius: 999px; background: #f5f8fb; border: 1px solid var(--border); }
  .mini-switch-btn { min-height: 32px; padding: 0 12px; border: none; border-radius: 999px; background: transparent; color: var(--text-dim); font-size: 12px; font-weight: 700; }
  .mini-switch-btn.active { background: #0b7f77; color: #fff; }
  .driver-row strong, .scale-band strong { font-size: 13px; }
  .driver-row span, .scale-band span { color: rgba(255,255,255,0.82); font-size: 12px; line-height: 1.45; }
  .helper-scale { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
  .scale-band { border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 10px; background: rgba(255,255,255,0.06); display: grid; gap: 4px; }
  .scale-band.active { background: rgba(255,255,255,0.16); border-color: rgba(255,255,255,0.3); }
  .helper-breakdown { display: grid; gap: 10px; }
  .driver-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 10px 12px; background: rgba(255,255,255,0.05); text-align: left; color: #fff; width: 100%; }
  .driver-points { color: #fff; font-size: 13px; font-weight: 700; white-space: nowrap; }

  .modal-backdrop { position: fixed; inset: 0; background: rgba(9, 20, 36, 0.48); z-index: 40; border: none; padding: 0; }
  .modal-shell { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; padding: 24px; z-index: 41; }
  .modal-card { width: min(720px, calc(100vw - 32px)); border-radius: 22px; background: #fff; border: 1px solid var(--border); box-shadow: 0 30px 80px rgba(16, 41, 79, 0.2); padding: 22px; display: grid; gap: 18px; }
  .modal-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; }
  .modal-head h3 { margin: 6px 0 0; color: var(--navy); }
  .modal-close { border: 1px solid var(--border); border-radius: 999px; background: #fff; color: var(--navy); padding: 8px 12px; font-size: 12px; font-weight: 700; }
  .modal-copy { margin: 0; color: var(--text-dim); line-height: 1.6; }
  .modal-scale .scale-band { border-color: rgba(16, 58, 106, 0.08); background: var(--panel-alt); }
  .modal-scale .scale-band.active { background: #eaf6f5; border-color: #86cbc4; }
  .modal-scale .scale-band strong { color: var(--navy); }
  .modal-scale .scale-band span,
  .modal-scale .scale-band p { color: var(--text-dim); }
  .modal-scale .scale-band p { margin: 0; font-size: 12px; line-height: 1.45; }
  .modal-summary { display: grid; gap: 6px; padding: 14px 16px; border-radius: 16px; background: linear-gradient(180deg, #f4faf9 0%, #fff 100%); border: 1px solid #d7ebe8; }
  .modal-summary strong { color: var(--navy); }
  .modal-summary span { color: var(--text-dim); font-size: 13px; line-height: 1.5; }

  .metric-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
  .metric-grid.top-metrics { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .compact-metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-bottom: 16px; }
  .sla-group-stack { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-bottom: 14px; }
  .sla-group { display: grid; gap: 10px; }
  .sla-group-head strong { color: var(--navy); font-size: 14px; }
  .service-level-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  .content-grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(330px, 0.9fr); gap: 18px; }
  .stack { display: flex; flex-direction: column; gap: 18px; }
  .receiver-layout {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    align-items: start;
    position: relative;
    padding-top: 0;
    background-image: none;
  }
  .receiver-grid-guide {
    display: none;
  }
  .receiver-grid-guide span {
    min-height: 22px;
    border-radius: 999px;
    background: rgba(11, 127, 119, 0.1);
    color: #0b7f77;
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .receiver-row-guide {
    display: none;
  }
  .receiver-row-guide span {
    position: absolute;
    left: 0;
    top: -11px;
    padding: 2px 8px;
    border-radius: 999px;
    background: #f2f8f7;
    color: #0b7f77;
    font-size: 11px;
    font-weight: 700;
  }
  .receiver-row-guide.row-1 { grid-row: 1; }
  .receiver-row-guide.row-2 { grid-row: 2; }
  .receiver-row-guide.row-3 { grid-row: 3; }
  .receiver-row-guide.row-4 { grid-row: 4; }
  .receiver-row-guide.row-5 { grid-row: 5; }
  .receiver-row-guide.row-6 { grid-row: 6; }
  .receiver-layout > .stack {
    display: contents;
  }
  .receiver-layout > .stack > article:nth-child(1) { grid-column: 1 / span 7; grid-row: 1; }
  .receiver-layout > .right-stack { grid-column: 8 / span 5; grid-row: 1 / span 2; }
  .receiver-layout > .stack > .receiver-lower-right { grid-column: 8 / span 5; grid-row: 4; display: grid; gap: 16px; align-content: start; }
  .receiver-layout > .stack > article:nth-child(3) { grid-column: 1 / span 7; grid-row: 2; }
  .receiver-layout > .stack > article:nth-child(4) { grid-column: 1 / span 7; grid-row: 4; }
  .receiver-layout > .stack > .receiver-left-lower { grid-column: 1 / span 4; grid-row: 5; display: grid; gap: 16px; align-content: start; }
  .receiver-layout > .stack > article:nth-child(6) { grid-column: 5 / span 8; grid-row: 5; }
  .receiver-left-lower { display: grid; gap: 16px; align-content: start; }
  .subpanel, .metric-card, .queue-card, .transaction-card, .message-card, .message-thread, .detail-card, .timeline-card, .list-item, .reason-card, .service-level-card {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(16, 41, 79, 0.06);
  }
  .receiver-layout .subpanel { position: relative; }
  .right-stack {
    position: relative;
    display: grid;
    gap: 16px;
    align-content: start;
  }
  .grid-ref {
    display: none;
  }
  .subpanel, .timeline-card { padding: 18px; }
  .metric-card { padding: 18px; display: flex; flex-direction: column; gap: 10px; }
  .operational-card { gap: 8px; }
  .metric-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
  .service-level-card { padding: 12px; display: grid; gap: 6px; border-width: 2px; align-content: start; }
  .service-level-card.good { border-color: #78c8aa; }
  .service-level-card.high { border-color: #f0b46a; }
  .service-level-card.critical { border-color: #ee8a8a; }
  button.service-level-card { text-align: left; width: 100%; }
  .service-level-state { font-size: 11px; font-weight: 700; }
  .service-level-state.good { color: #117864; }
  .service-level-state.high { color: #b45309; }
  .service-level-state.critical { color: #a61b1b; }
  .service-level-topline { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .service-level-value { color: var(--navy); font-size: 28px; line-height: 1; }
  .service-level-detail { color: var(--text-dim); font-size: 11px; font-weight: 600; line-height: 1; }
  .settings-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; margin-bottom: 16px; }
  .metric-card.accent-good { background: linear-gradient(180deg, #f4fbf9 0%, #fff 100%); border-color: #cfe8e0; }
  .metric-card.accent-high { background: linear-gradient(180deg, #fff8f1 0%, #fff 100%); border-color: #f2dcc0; }
  .metric-title { font-size: 12px; font-weight: 600; }
  .metric-value { color: var(--navy); font-size: 28px; line-height: 1; }
  .metric-change { font-size: 12px; }
  .metric-summary { color: var(--text-dim); font-size: 12px; line-height: 1.5; }
  .operational-statline { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .metric-link { align-self: center; background: transparent; border: none; padding: 0; text-align: left; display: flex; align-items: center; }
  .metric-subaction { display: flex; align-items: center; gap: 8px; align-self: center; border: none; background: transparent; padding: 0; text-align: left; }
  .metric-subaction strong { color: var(--navy); font-size: 18px; line-height: 1; }
  .metric-subaction span { font-size: 12px; }
  .compact-secondary { margin-top: 14px; }

  .metric-change.critical, .severity-pill.critical, .status-pill.critical { color: #a61b1b; }
  .metric-change.high, .severity-pill.high, .status-pill.high { color: #b45309; }
  .metric-change.medium, .severity-pill.medium, .status-pill.medium { color: #1f6d8c; }
  .metric-change.good, .status-pill.good { color: #117864; }
  .embedded-widget {
    margin-top: 16px;
    padding: 18px;
    border-radius: 16px;
    background: #fff;
    border: 1px solid var(--border);
    box-shadow: 0 10px 24px rgba(16, 41, 79, 0.05);
  }
  .operational-subsection { margin-bottom: 16px; }
  .operational-subsection > div {
    display: flex;
    align-items: baseline;
    gap: 8px;
    flex-wrap: nowrap;
  }

  .section-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
  .section-head.compact { margin-bottom: 12px; }
  .heatmap-panel .section-head { align-items: center; }
  .section-kicker, .card-type { display: inline-block; text-transform: uppercase; letter-spacing: 0.08em; font-size: 10px; font-weight: 700; color: #0b7f77; }
  .subpanel .section-head > div {
    display: flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
  }
  .subpanel .section-head h3 {
    margin: 0;
  }
  .embedded-widget .section-head > div {
    display: flex;
    align-items: baseline;
    gap: 10px;
    flex-wrap: wrap;
  }
  .embedded-widget .section-head h3 {
    margin: 0;
  }

  .receiver-pressure-layout { display: grid; grid-template-columns: 320px minmax(0, 1fr); gap: 14px; }
  .queue-grid, .transaction-grid, .message-list, .analytics-grid, .remittance-list, .cashflow-board, .outstanding-grid, .reason-grid, .focus-list, .sender-hotspot-list, .automation-list, .team-breakdown-list, .team-stats-grid { display: grid; gap: 12px; }
  .sender-invoice-list { margin-top: 18px; }
  .insights-shell { display: grid; gap: 18px; }
  .insights-summary-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; align-items: stretch; }
  .insights-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr); gap: 18px; align-items: start; }
  .insights-grid.narrow-right { grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr); }
  .insights-grid.wide-left { grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr); }
  .insight-focus-banner { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .insight-focus-banner strong { display: block; color: var(--navy); font-size: 20px; margin-top: 4px; }
  .insight-focus-banner p { margin: 6px 0 0; color: var(--text-dim); line-height: 1.5; }
  .insight-list { display: grid; gap: 12px; }
  .insight-card { border: 1px solid var(--border); border-radius: 14px; padding: 14px; background: var(--panel-alt); display: grid; gap: 8px; }
  .insight-card.active { border-color: #7fb9ac; box-shadow: 0 12px 28px rgba(11, 127, 119, 0.08); background: linear-gradient(180deg, #f7fcfb 0%, #fff 100%); }
  .insight-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .insight-card-head strong { color: var(--navy); }
  .insight-card-head span { color: var(--text-dim); font-size: 12px; }
  .insight-card p { margin: 0; color: var(--text-dim); line-height: 1.5; }
  .insight-note { color: var(--navy); font-size: 12px; font-weight: 600; }
  .insight-actions { display: flex; flex-wrap: wrap; gap: 10px; padding-top: 4px; }
  .queue-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .reason-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .focus-list { gap: 10px; }
  .focus-item { padding: 14px 16px; border-radius: 14px; background: linear-gradient(180deg, #f6fbfb 0%, #fff 100%); border: 1px solid var(--border); color: var(--navy); font-weight: 600; }
  .sender-assistant-panel {
    margin-bottom: 18px;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) minmax(220px, 0.5fr);
    gap: 20px;
    align-items: center;
    background:
      radial-gradient(circle at top right, rgba(31, 109, 140, 0.08), transparent 34%),
      linear-gradient(135deg, #fbfdff 0%, #f6faff 42%, #fcfeff 100%);
    border-color: #dce9f5;
    box-shadow: 0 12px 26px rgba(31, 86, 140, 0.08);
  }
  .eva-brand-col { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .eva-brand-col .eva-circle { display: block; width: 72px; height: 72px; }
  .sender-assistant-main { min-width: 0; }
  .sender-assistant-heading { margin: 0 0 8px; }
  .sender-assistant-layout { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(260px, 0.75fr); gap: 16px; align-items: stretch; }
  .sender-assistant-panel .section-kicker { color: #1f6d8c; }
  .assistant-copy { margin: 0 0 12px; color: #36526f; line-height: 1.6; }
  .pill-chip {
    display: inline-flex;
    align-items: center;
    min-height: 34px;
    padding: 0 12px;
    border-radius: 999px;
    background: linear-gradient(135deg, #f4fbff 0%, #eef6ff 100%);
    border: 1px solid #cfe0f1;
    color: var(--navy);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }
  .sender-assistant-panel .pill-chip:hover {
    border-color: #9dc2e1;
    background: #fff;
  }
  .assistant-customer-select select {
    min-height: 40px;
    border-radius: 12px;
    border: 1px solid #c7d9eb;
    background: #fff;
    color: var(--navy);
    font-size: 18px;
    font-weight: 700;
    padding: 0 38px 0 12px;
    outline: none;
  }
  .assistant-sidecard {
    display: grid;
    align-content: start;
    gap: 8px;
    padding: 16px;
    border-radius: 16px;
    background: linear-gradient(135deg, #f4fbff 0%, #eef6ff 100%);
    border: 1px solid #cfe0f1;
  }
  .assistant-sidecard strong { color: var(--navy); font-size: 20px; line-height: 1.2; }
  .reason-card { padding: 16px; display: grid; gap: 6px; text-align: center; }
  .reason-card strong { color: var(--navy); font-size: 30px; line-height: 1; }
  .reason-card span { color: var(--text-dim); font-size: 12px; }
  .sender-hotspot-card, .automation-card { padding: 14px 16px; border-radius: 16px; background: linear-gradient(180deg, #f8fbfb 0%, #fff 100%); border: 1px solid var(--border); }
  .sender-hotspot-head, .automation-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
  .sender-hotspot-head strong, .automation-head strong { color: var(--navy); }
  .sender-hotspot-head span, .automation-head span { font-size: 12px; }
  .sender-hotspot-card p, .automation-card p { margin: 0; color: var(--text-dim); line-height: 1.5; }
  .actionable-card { width: 100%; text-align: left; cursor: pointer; box-shadow: 0 10px 24px rgba(16, 41, 79, 0.04); transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease; }
  .actionable-card:hover { transform: translateY(-1px); border-color: rgba(16, 58, 106, 0.16); box-shadow: 0 14px 28px rgba(16, 41, 79, 0.08); }
  .team-member-card { padding: 14px 16px; border-radius: 16px; background: linear-gradient(180deg, #f8fbfb 0%, #fff 100%); border: 1px solid var(--border); }
  .team-member-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
  .team-member-head strong { color: var(--navy); }
  .team-member-head span { font-size: 12px; }
  .team-stats-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
  .sender-hotspot-card .team-stats-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; }
  .sender-hotspot-card .team-stat-card { padding: 10px; }
  .sender-hotspot-card .team-stat-card span { font-size: 11px; }
  .sender-hotspot-card .team-stat-card strong { font-size: 16px; }
  .team-stat-button {
    padding: 10px 12px;
    border-radius: 12px;
    background: #fff;
    border: 1px solid var(--border);
    text-align: left;
    width: 100%;
    display: block;
    transition: border-color 0.16s ease, box-shadow 0.16s ease, transform 0.16s ease;
  }
  .team-stat-button:hover {
    border-color: #bad8d2;
    box-shadow: 0 8px 20px rgba(16, 41, 79, 0.08);
    transform: translateY(-1px);
  }
  .team-stats-grid strong { display: block; margin-top: 6px; color: var(--navy); font-size: 18px; line-height: 1; }
  .analytics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .sender-analytics-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .settings-stack { display: grid; gap: 18px; margin-top: 18px; }
  .workflow-config-card { display: grid; gap: 16px; }
  .workflow-enabled-toggle {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 6px 10px 6px 6px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: #fff;
    color: var(--navy);
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
  }
  .workflow-enabled-toggle input {
    appearance: none;
    width: 38px;
    height: 22px;
    border-radius: 999px;
    background: #cbd5e1;
    position: relative;
    margin: 0;
    transition: background 0.16s ease;
  }
  .workflow-enabled-toggle input::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    top: 3px;
    left: 3px;
    box-shadow: 0 1px 4px rgba(15, 23, 42, 0.24);
    transition: transform 0.16s ease;
  }
  .workflow-enabled-toggle input:checked { background: #117864; }
  .workflow-enabled-toggle input:checked::after { transform: translateX(16px); }
  .workflow-config-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 180px;
    gap: 16px;
    align-items: start;
    padding: 16px;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: var(--panel-alt);
  }
  .workflow-config-hero strong { color: var(--navy); font-size: 20px; }
  .workflow-config-hero p { margin: 6px 0 0; color: var(--text-dim); line-height: 1.5; }
  .workflow-step-count { min-width: 0; }
  .workflow-step-list { display: grid; gap: 12px; }
  .workflow-step-card {
    display: grid;
    grid-template-columns: 42px minmax(160px, 0.9fr) repeat(3, minmax(150px, 1fr));
    gap: 12px;
    align-items: end;
    padding: 14px;
    border-radius: 14px;
    border: 1px solid var(--border);
    background: #fff;
  }
  .workflow-step-number {
    width: 36px;
    height: 36px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--navy);
    color: #fff;
    font-weight: 800;
  }
  .workflow-inline-input {
    display: grid;
    grid-template-columns: 74px minmax(0, 1fr);
    align-items: center;
    gap: 8px;
  }
  .workflow-inline-input span {
    color: var(--text-dim);
    font-size: 12px;
    text-transform: none;
    letter-spacing: 0;
  }
  .ai-data-card { display: grid; gap: 18px; }
  .ai-data-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .ai-source-card,
  .ai-upload-card { background: linear-gradient(180deg, #fbfefd 0%, #fff 100%); }
  .ai-upload-card { padding: 16px; }
  .heatmap-panel { margin-top: 16px; padding-top: 2px; }
  .heatmap-shell { display: grid; gap: 8px; }
  .heatmap-header, .heatmap-row { display: grid; grid-template-columns: 72px repeat(6, minmax(0, 1fr)); gap: 8px; align-items: center; }
  .heatmap-header span { color: var(--text-dim); font-size: 11px; font-weight: 700; text-align: center; }
  .heatmap-label { color: var(--navy); font-size: 12px; font-weight: 700; }
  .heatmap-cell { min-height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--navy); font-size: 12px; font-weight: 700; }
  .heatmap-note { margin: 12px 0 0; color: var(--text-dim); font-size: 12px; line-height: 1.5; }
  .queue-card, .transaction-card { padding: 16px; text-align: left; width: 100%; }
  .remittance-card, .cashflow-card { padding: 16px; border-radius: 16px; background: var(--panel-alt); border: 1px solid var(--border); }
  .cash-drill-list { display: grid; gap: 12px; }
  .cash-drill-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    width: 100%;
    padding: 14px 16px;
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--panel-alt);
    text-align: left;
  }
  .cash-drill-item.static { background: var(--panel-alt); }
  .cash-drill-item strong { color: var(--navy); }
  .cash-drill-item span { display: block; margin-top: 4px; color: var(--text-dim); font-size: 12px; line-height: 1.45; }
  .chart-card { padding: 16px; border-radius: 16px; background: linear-gradient(180deg, #f7fbfb 0%, #fff 100%); border: 1px solid var(--border); margin-bottom: 14px; }
  .chart-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
  .chart-head strong { color: var(--navy); }
  .chart-head span { color: var(--text-dim); font-size: 12px; }
  .queue-card.critical { background: linear-gradient(180deg, #fff 0%, #fff4f4 100%); border-color: #f4c9c9; }
  .queue-card.high { background: linear-gradient(180deg, #fff 0%, #fff8ef 100%); border-color: #f2dcc0; }
  .queue-card.medium { background: linear-gradient(180deg, #fff 0%, #f2fbfa 100%); border-color: #cfe8e4; }
  .queue-top, .transaction-top, .message-head, .list-top, .detail-badges, .toolbar-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .transaction-footer { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 8px; }
  .activity-type-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .queue-card h4, .transaction-card h4, .detail-hero h2 { margin: 8px 0 10px; color: var(--navy); }
  .queue-card p, .transaction-card p, .message-card p, .thread-item p, .detail-card p { margin: 0; color: var(--text-dim); line-height: 1.5; }
  .compact-activity-card { padding: 13px 14px; }
  .sender-query-summary-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-bottom: 18px; }
  .receiver-query-sla-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  .sender-portfolio-layout { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(360px, 0.65fr); gap: 18px; align-items: start; }
  .sender-portfolio-panel, .sender-detail-panel { display: grid; gap: 14px; }
  .sender-search-field input {
    width: 100%;
    min-height: 40px;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px 12px;
    font: inherit;
    background: #fff;
  }
  .sender-portfolio-grid { display: grid; gap: 8px; }
  .sender-portfolio-row {
    display: grid;
    grid-template-columns: minmax(190px, 1.2fr) 80px 110px 90px minmax(140px, 0.8fr) 70px;
    gap: 12px;
    align-items: center;
    padding: 10px 12px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: #fff;
    text-align: left;
  }
  .sender-portfolio-row.active { border-color: #0b7f77; box-shadow: inset 0 0 0 1px #0b7f77; }
  .sender-portfolio-head { background: transparent; border: none; padding: 0 12px 2px; color: var(--text-dim); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
  .sender-row-select { display: contents; border: none; background: transparent; color: inherit; text-align: left; cursor: pointer; }
  .sender-row-select > span:first-child { display: grid; gap: 3px; }
  .sender-row-select strong { color: var(--navy); }
  .sender-row-select small { color: var(--text-dim); font-size: 12px; }
  .sender-portfolio-row:has(.sender-row-select:hover) { border-color: rgba(11, 127, 119, 0.45); }
  .sender-portfolio-empty { padding: 18px; border: 1px dashed var(--border); border-radius: 12px; color: var(--text-dim); text-align: center; background: var(--panel-alt); }
  .priority-star { width: 34px; height: 34px; border-radius: 50%; border: 1px solid var(--border); background: #fff; color: #a0aec0; font-size: 18px; line-height: 1; cursor: pointer; }
  .priority-star.active { color: #d99a00; background: #fff7db; border-color: #f2cf72; }
  .sender-detail-title { display: inline-flex; align-items: center; gap: 8px; }
  .priority-star.inline-star { width: 30px; height: 30px; font-size: 16px; }
  .sender-detail-stats { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .owner-value { font-size: 20px; }
  .owner-assignment-row { padding: 14px; border: 1px solid var(--border); border-radius: 14px; background: var(--panel-alt); }
  .owner-picker input {
    width: 100%;
    min-height: 38px;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 8px 10px;
    color: var(--navy);
    font: inherit;
    font-size: 16px;
    font-weight: 800;
    background: #fff;
  }
  .owner-picker input:focus { outline: 2px solid rgba(11, 127, 119, 0.16); border-color: #0b7f77; }
  .sender-query-detail-list { display: grid; gap: 10px; }
  .sender-query-detail-card { width: 100%; padding: 14px; border-radius: 14px; border: 1px solid var(--border); background: #fff; text-align: left; cursor: pointer; }
  .sender-query-detail-card:hover { border-color: #0b7f77; box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08); }
  .sender-query-summary-card {
    display: grid;
    gap: 8px;
    text-align: left;
    border: 1px solid var(--border);
    cursor: pointer;
    transition: transform 0.16s ease, box-shadow 0.16s ease;
  }
  .sender-query-summary-card:hover { transform: translateY(-1px); box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08); }
  .sender-related-transaction-list { display: grid; gap: 12px; }
  .workspace-sla-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
  .sla-chip {
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.01em;
  }
  .sla-chip.good { background: rgba(13, 148, 136, 0.12); color: #0f766e; }
  .sla-chip.medium { background: rgba(245, 158, 11, 0.14); color: #b45309; }
  .sla-chip.high { background: rgba(249, 115, 22, 0.14); color: #c2410c; }
  .sla-chip.critical { background: rgba(220, 38, 38, 0.14); color: #b91c1c; }
  .sender-related-transaction-card {
    display: grid;
    gap: 8px;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid rgba(148, 163, 184, 0.24);
    background: rgba(248, 250, 252, 0.8);
  }
  .sender-related-transaction-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .sender-related-transaction-head span { color: var(--text-dim); font-size: 12px; }
  .sla-detail-copy.good { color: #0f766e; }
  .sla-detail-copy.medium { color: #b45309; }
  .sla-detail-copy.high { color: #c2410c; }
  .sla-detail-copy.critical { color: #b91c1c; }
  .compact-activity-card h4 { margin: 6px 0 8px; }
  .compact-activity-footer { margin-top: 0; align-items: center; }
  .activity-summary { color: var(--text-dim); font-size: 12px; line-height: 1.4; }
  .activity-party-chip {
    display: inline-flex;
    align-items: center;
    padding: 6px 10px;
    border-radius: 999px;
    background: #eef2f7;
    color: var(--navy);
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    white-space: nowrap;
  }
  .queue-action { display: inline-flex; margin-top: 14px; color: var(--navy); font-size: 12px; font-weight: 700; }

  .status-pill, .severity-pill, .signal-chip {
    display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; font-size: 11px; font-weight: 700; padding: 6px 10px;
  }
  .status-pill.critical, .severity-pill.critical { background: #fbe4e4; }
  .status-pill.high, .severity-pill.high { background: #fff0db; }
  .status-pill.medium, .severity-pill.medium { background: #e1f4f7; }
  .status-pill.good { background: #e4f6ef; }
  .status-pill.neutral, .signal-chip { background: #eef2f7; color: var(--navy); }

  .workspace-shell { display: grid; grid-template-columns: 320px minmax(0, 1fr); gap: 18px; }
  .workspace-list { display: flex; flex-direction: column; gap: 12px; }
  .workspace-summary { border: 1px solid var(--border); border-radius: 14px; background: linear-gradient(180deg, #f4faf9 0%, #fff 100%); padding: 14px; display: grid; gap: 4px; }
  .workspace-summary-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .workspace-summary-head > div { display: grid; gap: 4px; }
  .workspace-summary strong { color: var(--navy); font-size: 28px; line-height: 1; }
  .workspace-summary span { color: var(--text-dim); font-size: 12px; line-height: 1.5; }
  .list-top-badges { display: inline-flex; align-items: center; gap: 6px; }
  .automation-stage-cog {
    width: 34px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex: 0 0 auto;
    color: #fff;
    font-size: 12px;
    font-weight: 800;
    filter: drop-shadow(0 7px 14px rgba(16, 41, 79, 0.22));
  }
  .automation-stage-cog::before,
  .automation-stage-cog::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 9px;
    background: linear-gradient(135deg, #0b1f3d 0%, #146c94 48%, #11a37f 100%);
  }
  .automation-stage-cog::after {
    transform: rotate(45deg);
    background: linear-gradient(135deg, #153a6f 0%, #0f8f99 54%, #6ee7b7 100%);
  }
  .automation-stage-cog span {
    width: 19px;
    height: 19px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    background: #fff;
    color: #10294f;
    line-height: 1;
  }
  .automation-filter-row {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    justify-content: flex-start;
    width: fit-content;
    padding: 5px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: #f8fbfb;
  }
  .automation-filter-cog {
    width: 31px;
    height: 31px;
  }
  .automation-filter-cog::before,
  .automation-filter-cog::after {
    inset: 4px;
    border-radius: 8px;
  }
  .automation-filter-cog span {
    width: 17px;
    height: 17px;
    font-size: 10px;
  }
  .automation-filter-options {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .automation-filter-btn {
    width: 32px;
    height: 32px;
    border: 1px solid #cbd5e1;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #64748b;
    background: transparent;
    cursor: pointer;
    transition: background 0.16s ease, color 0.16s ease, box-shadow 0.16s ease;
  }
  .automation-filter-btn svg {
    width: 17px;
    height: 17px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .automation-filter-btn.active {
    border-color: transparent;
    color: #fff;
    box-shadow: 0 8px 16px rgba(16, 41, 79, 0.18);
  }
  .automation-filter-btn.tick.active { background: linear-gradient(135deg, #117864 0%, #11a37f 100%); }
  .automation-filter-btn.cross.active { background: linear-gradient(135deg, #9f1239 0%, #e11d48 100%); }
  .automation-detail-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px 6px 6px;
    border-radius: 999px;
    border: 1px solid #cfe0f1;
    background: #f4fbff;
    color: var(--navy);
    font-size: 12px;
    font-weight: 800;
  }
  .automation-detail-pill span {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--navy);
    color: #fff;
  }
  .automation-sequence-panel {
    margin: 14px 0 18px;
    padding: 16px;
    border-radius: 14px;
    border: 1px solid #cfe0f1;
    background: linear-gradient(135deg, #f4fbff 0%, #fff 100%);
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) repeat(2, minmax(160px, 0.6fr)) auto;
    gap: 14px;
    align-items: center;
  }
  .automation-sequence-panel h3 { margin: 4px 0 6px; color: var(--navy); }
  .automation-sequence-panel p,
  .automation-sequence-status p { margin: 0; color: var(--text-dim); line-height: 1.45; }
  .automation-sequence-status {
    padding: 12px;
    border-radius: 12px;
    background: #fff;
    border: 1px solid rgba(148, 163, 184, 0.22);
    display: grid;
    gap: 5px;
  }
  .automation-sequence-status span { color: var(--text-dim); font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 700; }
  .automation-sequence-status strong { color: var(--navy); }
  .workspace-priority { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .priority-chip { border: 1px solid var(--border); border-radius: 14px; background: #fff; padding: 12px; display: grid; gap: 4px; text-align: left; }
  .priority-chip.urgent { background: linear-gradient(180deg, #fff6f6 0%, #fff 100%); border-color: #f0c2c2; }
  .priority-chip strong { color: var(--navy); font-size: 20px; line-height: 1; }
  .priority-chip span { color: var(--text-dim); font-size: 12px; line-height: 1.4; }
  .control-field { min-width: 140px; display: flex; flex-direction: column; gap: 8px; }
  .control-field span { display: block; color: var(--text-dim); font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }
  .control-field select,
  .control-field input { width: 100%; border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; font: inherit; background: #fff; }
  .control-field textarea { width: 100%; min-height: 108px; border: 1px solid var(--border); border-radius: 12px; padding: 12px; font: inherit; background: #fff; resize: vertical; }
  .inline-assignee-field { min-width: 0; margin-top: 6px; gap: 6px; }
  .inline-assignee-field select { min-width: 210px; font-weight: 800; color: var(--navy); }
  .query-management-panel { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); display: grid; gap: 14px; }
  .query-management-grid { display: grid; gap: 14px; grid-template-columns: minmax(0, 1.8fr) minmax(220px, 0.8fr); align-items: start; }
  .query-reply-field { min-width: 0; }
  .upload-request-panel {
    margin-top: 16px;
    padding: 16px;
    border-radius: 14px;
    border: 1px solid #cfe8e4;
    background: linear-gradient(135deg, #f4fbfa 0%, #fff 100%);
    display: grid;
    gap: 14px;
  }
  .upload-request-panel h3 { margin: 5px 0 6px; color: var(--navy); }
  .upload-request-panel p { margin: 0; color: var(--text-dim); line-height: 1.5; }
  .upload-control-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .upload-dropzone {
    min-width: 260px;
    flex: 1 1 auto;
    padding: 12px 14px;
    border: 1px dashed #7fb9ac;
    border-radius: 12px;
    background: #fff;
    display: grid;
    gap: 4px;
    cursor: pointer;
  }
  .upload-dropzone input { display: none; }
  .upload-dropzone strong { color: var(--navy); }
  .upload-dropzone span { color: var(--text-dim); font-size: 12px; }
  .checkbox-row { display: inline-flex; align-items: center; gap: 10px; color: var(--text-dim); font-size: 13px; }
  .checkbox-row input { margin: 0; accent-color: var(--teal); }
  .checkbox-row span { color: var(--text); font-size: 13px; }
  .list-stack { display: grid; gap: 10px; }
  .list-item { padding: 14px; text-align: left; width: 100%; }
  .list-item.active { border-color: #0b7f77; box-shadow: inset 0 0 0 1px #0b7f77; }
  .list-meta { display: block; margin-top: 6px; font-size: 12px; }

  .workspace-detail { display: flex; flex-direction: column; gap: 16px; }
  .detail-hero { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 18px; box-shadow: 0 10px 30px rgba(16, 41, 79, 0.06); }
  .detail-hero p { margin: 0; color: var(--text-dim); }
  .workflow-query-hero {
    display: grid;
    grid-template-columns: minmax(170px, 0.65fr) minmax(280px, 1.4fr) minmax(230px, 0.75fr);
    align-items: start;
    gap: 18px;
  }
  .workflow-query-id h2 { margin: 8px 0 8px; color: var(--navy); }
  .workflow-query-summary {
    min-height: 100%;
    padding: 0 18px;
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
  }
  .workflow-query-summary strong { display: block; margin-top: 8px; color: var(--navy); line-height: 1.45; }
  .workflow-query-actions { display: grid; gap: 10px; justify-items: end; }
  .workflow-query-actions .detail-badges { justify-content: flex-end; }
  .workflow-assignee-field { width: 100%; max-width: 240px; margin-top: 0; }
  .standard-query-hero {
    display: grid;
    grid-template-columns: minmax(170px, 0.65fr) minmax(280px, 1.4fr) minmax(230px, 0.75fr);
    align-items: start;
    gap: 18px;
  }
  .standard-query-id h2 { margin: 8px 0 8px; color: var(--navy); }
  .standard-query-summary {
    min-height: 100%;
    padding: 0 18px;
    border-left: 1px solid var(--border);
    border-right: 1px solid var(--border);
  }
  .standard-query-summary strong { display: block; margin-top: 8px; color: var(--navy); line-height: 1.45; }
  .standard-query-actions { display: grid; gap: 10px; justify-items: end; }
  .standard-query-actions .detail-badges { justify-content: flex-end; }
  .standard-assignee-field { width: 100%; max-width: 240px; margin-top: 0; }
  .standard-sla-strip {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 10px;
    padding: 12px 14px;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: #fff;
  }
  .standard-sla-item {
    min-width: 0;
    padding: 6px 12px;
    border-right: 1px solid var(--border);
  }
  .standard-sla-item:last-child { border-right: 0; }
  .standard-sla-item strong { display: block; margin-top: 5px; color: var(--navy); font-size: 18px; line-height: 1.15; }
  .detail-amount { color: var(--navy); font-size: 16px; font-weight: 700; }
  .detail-grid, .dual-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
  .detail-card { padding: 16px; }
  .detail-card strong { display: block; margin: 8px 0 6px; color: var(--navy); }
  .issue-card { background: linear-gradient(180deg, #fff8f1 0%, #fff 100%); border-color: #f2dcc0; }

  .timeline { display: grid; gap: 12px; }
  .timeline-item { display: grid; grid-template-columns: 18px minmax(0, 1fr); gap: 12px; align-items: flex-start; }
  .timeline-dot { width: 12px; height: 12px; border-radius: 50%; background: #d6dde7; margin-top: 4px; }
  .timeline-item.done .timeline-dot { background: #0b7f77; }
  .timeline-item.current .timeline-dot { background: #f59e0b; }
  .timeline-item strong { color: var(--navy); }
  .timeline-item p { margin: 4px 0 0; color: var(--text-dim); }

  .chip-list, .action-row, .role-list, .thread-list { display: flex; flex-wrap: wrap; gap: 10px; }
  .action-row.stacked, .role-list, .thread-list, .message-list { flex-direction: column; }
  .ghost-btn { border: 1px solid var(--border); border-radius: 999px; background: #fff; color: var(--navy); padding: 8px 14px; font-size: 12px; font-weight: 600; }
  .ghost-btn.solid { background: var(--navy); color: #fff; border-color: var(--navy); }
  .message-card, .message-thread { padding: 16px; }
  .message-head strong, .thread-item strong, .role-row strong { color: var(--navy); }
  .message-head span, .message-foot, .thread-item span { color: var(--text-dim); font-size: 12px; }
  .supplementary-feed { margin-top: 14px; }
  .cashflow-chart { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; align-items: end; min-height: 240px; }
  .cashflow-column { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
  .cashflow-bar-wrap { width: 100%; min-height: 190px; display: flex; align-items: end; justify-content: center; padding: 0 10px; }
  .cashflow-bar { width: 100%; max-width: 90px; border-radius: 16px 16px 8px 8px; background: linear-gradient(180deg, #0b7f77 0%, #134154 100%); box-shadow: 0 12px 24px rgba(11, 127, 119, 0.18); }
  .cashflow-column strong { color: var(--navy); }
  .cashflow-column span { color: var(--text-dim); font-size: 12px; }
  .cashflow-bars { display: grid; gap: 8px; margin-top: 12px; }
  .cashflow-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 10px 12px; border-radius: 12px; background: #fff; border: 1px solid var(--border); }
  .cashflow-row span { color: var(--text-dim); font-size: 12px; }
  .cashflow-row strong { color: var(--navy); }
  .thread-item { border: 1px solid var(--border); border-radius: 12px; padding: 12px; background: var(--panel-alt); }
  .thread-flag { display: inline-flex; margin-top: 8px; padding: 4px 8px; border-radius: 999px; background: rgba(230, 90, 42, 0.1); color: #b85024; font-size: 11px; font-weight: 700; }
  .trend-list { display: grid; gap: 10px; }
  .trend-list span { color: var(--text-dim); font-size: 13px; line-height: 1.5; padding: 10px 12px; border-radius: 12px; background: var(--panel-alt); border: 1px solid var(--border); }
  .role-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; border: 1px solid var(--border); border-radius: 12px; padding: 12px; }
  .role-row p { margin: 6px 0 0; color: var(--text-dim); }

  @media (max-width: 1180px) {
    .top-summary-row, .content-grid, .workspace-shell, .receiver-pressure-layout, .queue-grid, .reason-grid, .detail-grid, .dual-grid, .analytics-grid, .service-level-grid, .sla-group-stack, .settings-grid, .insights-grid, .sender-assistant-layout, .sender-top-layout, .sender-portfolio-layout, .clerk-focus-panel, .clerk-dashboard-layout, .clerk-supplier-grid, .automation-sequence-panel, .workflow-query-hero, .standard-query-hero, .standard-sla-strip, .workflow-config-hero, .workflow-step-card {
      grid-template-columns: 1fr;
    }
    .workflow-query-summary,
    .standard-query-summary {
      padding: 14px 0;
      border-left: 0;
      border-right: 0;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }
    .workflow-query-actions,
    .standard-query-actions {
      justify-items: start;
    }
    .workflow-query-actions .detail-badges,
    .standard-query-actions .detail-badges {
      justify-content: flex-start;
    }
    .standard-sla-item {
      border-right: 0;
      border-bottom: 1px solid var(--border);
    }
    .standard-sla-item:last-child { border-bottom: 0; }
    .sender-top-layout {
      grid-template-rows: auto;
    }
    .sender-top-layout .sender-hero,
    .sender-response-card,
    .sender-query-card,
    .sender-remittance-promo {
      grid-column: auto;
      grid-row: auto;
    }
    .receiver-layout > .stack {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .receiver-layout {
      padding-top: 0;
      background-image: none;
    }
    .receiver-grid-guide {
      position: static;
      margin-bottom: 6px;
    }
    .receiver-row-guide {
      display: none;
    }
    .receiver-layout > .stack > article,
    .receiver-layout > .stack > .receiver-left-lower,
    .receiver-layout > .stack > .receiver-lower-right,
    .receiver-layout > .right-stack {
      grid-column: auto;
      grid-row: auto;
    }
    .heatmap-header, .heatmap-row { grid-template-columns: 72px repeat(6, minmax(0, 1fr)); }
  }

  @media (max-width: 760px) {
    .page-header, .dashboard-toolbar, .tabs-row.primary, .detail-hero, .message-head, .transaction-top, .queue-top, .toolbar-row, .receiver-role-tools, .email-demo-header, .email-card-head { flex-wrap: wrap; }
    .page-header-main { flex-wrap: wrap; }
    .metric-grid.top-metrics, .compact-metrics { grid-template-columns: 1fr; }
    .email-meta-grid, .eva-email-footer { grid-template-columns: 1fr; }
    .email-mandate-callout { flex-wrap: wrap; }
    .clerk-focus-stats, .sender-detail-stats { grid-template-columns: 1fr; }
    .sender-portfolio-row { grid-template-columns: minmax(150px, 1fr) repeat(2, 70px); }
    .sender-portfolio-row > span:nth-child(4),
    .sender-portfolio-row > span:nth-child(5),
    .sender-portfolio-row > span:nth-child(6) { display: none; }
    .dashboard-shell, .workspace-shell { padding: 14px; }
    .sender-mandate-banner { width: 100%; margin-left: 0; }
    .sender-mandate-actions { flex-wrap: wrap; }
    .cashflow-chart { grid-template-columns: 1fr; min-height: 0; }
    .cashflow-bar-wrap { min-height: 120px; }
    .helper-scale { grid-template-columns: 1fr; }
    .modal-shell { padding: 14px; align-items: flex-end; }
    .modal-card { width: 100%; }
    .heatmap-header, .heatmap-row { grid-template-columns: 56px repeat(6, minmax(0, 1fr)); gap: 6px; }
    .heatmap-cell { min-height: 36px; font-size: 11px; }
  }
</style>








