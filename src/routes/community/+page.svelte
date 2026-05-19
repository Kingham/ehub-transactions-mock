<script>
  import { browser } from '$app/environment';
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
  let selectedPeriod = '30d';
  let selectedTransactionId = communityTransactions[0].id;
  let transactionFilter = 'All';
  let statusFilter = 'All';
  let pressureFocus = 'all';
  let workspaceSummary = 'All tracked Community transactions';
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

  const personas = [
    { id: 'sender', label: 'Sender' },
    { id: 'receiver', label: 'Receiver' }
  ];
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'messages', label: 'Messages' },
    { id: 'insights', label: 'Insights' },
    { id: 'settings', label: 'Settings' }
  ];
  const periodOptions = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '90d', label: 'Last 90 days' }
  ];

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
          title: 'Closed within 2 days',
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
          title: 'Closed within 2 days',
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
          title: 'Closed within 2 days',
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
          title: 'Closed within 2 days',
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
          title: 'Closed within 2 days',
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
          title: 'Closed within 2 days',
          status: 'Red',
          count: '11 queries',
          summary: 'These are the slowest to resolve and usually depend on repeated follow-up or internal exceptions.',
          patterns: [
            'Repeat issue around month end and payment-run cut-off.',
            'Strong concentration in Vertex Wholesale cases.',
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
          title: 'Closed within 2 days',
          status: 'Green',
          count: '351 queries',
          summary: 'Most quickly closed cases are repeatable question types that should continue shifting into self-service.',
          patterns: [
            'Remittance and payment-date questions dominate.',
            'Often resolved in one response when the right document is available.',
            'Higher closure success on Tuesdays through Thursdays.'
          ],
          examples: ['Remittance shared', 'Payment timing confirmed', 'Dispatch milestone explained']
        },
        Amber: {
          title: 'Closed within 2 days',
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
          title: 'Closed within 2 days',
          status: 'Red',
          count: '85 queries',
          summary: 'These are the cases most likely to cause repeat chasing and should be used for targeted process improvement.',
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
          summary: 'Borderline response cases show where resourcing starts to slip during known busy periods.',
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
          title: 'Closed within 2 days',
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
          title: 'Closed within 2 days',
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
          title: 'Closed within 2 days',
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
      remittances: { value: '9', change: 'Remittances received into the period view' },
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
      remittances: { value: '43', change: 'Remittances received into the period view' },
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
      remittances: { value: '134', change: 'Remittances received into the period view' },
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
      promoteCount: { value: '6', change: 'Resolutions ready to add into future AI answers', tone: 'good' },
      categories: [
        { label: 'Handled by AI from inbox or chat', value: 'Payment dates and remittance copies', detail: '24 queries', tone: 'good' },
        { label: 'High-friction escalations', value: 'Tax mismatches and POD disputes', detail: '11 queries', tone: 'critical' },
        { label: 'Best automation opportunity', value: 'Dispatch ETA and delivery proof requests', detail: '6 resolutions to promote', tone: 'high' },
        { label: 'Next knowledge update', value: 'Supplier bank-detail validation and payment release guidance', detail: '4 answers to seed', tone: 'medium' }
      ]
    },
    '30d': {
      selfServed: { value: '367', change: '184 were resolved in a single message exchange', tone: 'good' },
      escalated: { value: '71', change: 'Converted into tracked queries after AI could not close them', tone: 'high' },
      avgMessages: { value: '2.8', change: 'Average sender messages before escalation or answer', tone: 'medium' },
      promoteCount: { value: '23', change: 'Resolutions ready to add into future AI answers', tone: 'good' },
      categories: [
        { label: 'Handled by AI from inbox or chat', value: 'Payment timing, remittances, and status copy', detail: '112 queries', tone: 'good' },
        { label: 'High-friction escalations', value: 'Pricing disputes, tax mismatches, and POD gaps', detail: '38 queries', tone: 'critical' },
        { label: 'Best automation opportunity', value: 'Expected delivery windows and approval progress', detail: '23 resolutions to promote', tone: 'high' },
        { label: 'Next knowledge update', value: 'Beneficiary checks and payment release steps', detail: '11 answers to seed', tone: 'medium' }
      ]
    },
    '90d': {
      selfServed: { value: '492', change: '241 were resolved in a single message exchange', tone: 'good' },
      escalated: { value: '208', change: 'Converted into tracked queries after AI could not close them', tone: 'high' },
      avgMessages: { value: '3.1', change: 'Average sender messages before escalation or answer', tone: 'medium' },
      promoteCount: { value: '58', change: 'Resolutions ready to add into future AI answers', tone: 'good' },
      categories: [
        { label: 'Handled by AI from inbox or chat', value: 'Routine status, payment date, and remittance requests', detail: '304 queries', tone: 'good' },
        { label: 'High-friction escalations', value: 'Multi-party disputes and missing document evidence', detail: '97 queries', tone: 'critical' },
        { label: 'Best automation opportunity', value: 'Dispatch exceptions and invoice approval blockers', detail: '58 resolutions to promote', tone: 'high' },
        { label: 'Next knowledge update', value: 'Bank-detail validation and payment release guidance', detail: '22 answers to seed', tone: 'medium' }
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
        { title: 'Use approved resolutions to improve AI answers', detail: '27 recently closed queries match repeat themes and could be promoted into future AI responses.' },
        { title: 'Flag unresolved journeys with high message counts', detail: '14 open cases have already exceeded five messages and should be reviewed for missing guidance.' }
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
        { title: 'Promote closed resolutions into AI', detail: '41 closed queries map cleanly to repeat themes and are ready to seed future AI answers.' },
        { title: 'Target the highest-friction sender journeys', detail: 'Three sender groups account for most manual contact on document and dispatch-related topics.' },
        { title: 'Tune the assistant for long conversations', detail: '18 escalated journeys exceeded six messages before a user stepped in, suggesting weak answer confidence or missing guidance.' }
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
        { title: 'Create a rolling knowledge update queue', detail: '96 repeat resolutions over the last 90 days can be reviewed and approved for future AI use.' },
        { title: 'Review senders with high query rate, not just high volume', detail: 'The biggest opportunities sit with smaller sender groups generating disproportionate friction.' },
        { title: 'Target conversations that bounce before escalation', detail: '31 journeys crossed six messages before manual handling, indicating uncertainty in the current AI path.' }
      ]
    }
  };

  const senderInsightData = {
    '7d': {
      overview: [
        { label: 'Queries avoided through self-service', value: '42', note: 'Status, remittance, and document answers found without logging a query' },
        { label: 'Queries raised', value: '16', note: 'Questions that still needed follow-up or clarification' },
        { label: 'Average messages before answer', value: '2.2', note: 'How quickly users reached an answer in the assistant' }
      ],
      themes: [
        { label: 'Payment dates and remittances', count: 18, note: 'Most-used self-service journey this week' },
        { label: 'Dispatch and delivery status', count: 14, note: 'Often answered from milestone updates' },
        { label: 'Document requests', count: 10, note: 'Usually resolved after document links are shown' }
      ]
    },
    '30d': {
      overview: [
        { label: 'Queries avoided through self-service', value: '186', note: 'Users found answers without needing a team response' },
        { label: 'Queries raised', value: '54', note: 'Cases where follow-up still needed to be logged' },
        { label: 'Average messages before answer', value: '2.8', note: 'Measured across assisted and escalated journeys' }
      ],
      themes: [
        { label: 'Payment dates and remittances', count: 74, note: 'Largest source of self-service demand' },
        { label: 'Dispatch and delivery status', count: 61, note: 'Often answered from tracking milestones' },
        { label: 'Document requests', count: 51, note: 'Good candidate for better attachment visibility' }
      ]
    },
    '90d': {
      overview: [
        { label: 'Queries avoided through self-service', value: '492', note: 'Users found answers without needing a team response' },
        { label: 'Queries raised', value: '138', note: 'Issues still needing manual follow-up' },
        { label: 'Average messages before answer', value: '3.0', note: 'Longer journeys usually involved documents or exceptions' }
      ],
      themes: [
        { label: 'Payment dates and remittances', count: 201, note: 'Most common ongoing support theme' },
        { label: 'Dispatch and delivery status', count: 164, note: 'Regular weekly operational query type' },
        { label: 'Document requests', count: 127, note: 'Most likely to escalate when documents are not easy to retrieve' }
      ]
    }
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

  function formatCurrency(value) {
    return `\u00A3${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
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
      Amber: 'Borderline case that approached the target before resolution.',
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
      resolutionSla: 'Closed within the resolution target for this user.',
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
    return Array.from({ length: count }, (_, index) => {
      const sequence = index + 1;
      const responseHours =
        insightKey === 'payment-date' || insightKey === 'payment-run'
          ? 2 + (sequence % 4)
          : insightKey === 'documents' || insightKey === 'proof-of-delivery'
            ? 4 + (sequence % 5)
            : 3 + (sequence % 6);
      const closureDays =
        insightKey === 'documents' || insightKey === 'proof-of-delivery'
          ? 2 + (sequence % 3)
          : insightKey === 'dispatch-status' || insightKey === 'dispatch-promise'
            ? 1 + (sequence % 3)
            : 1 + (sequence % 2);

      return {
        id: `INS-${period}-${insightKey}-${String(sequence).padStart(3, '0')}`,
        type: 'Query',
        party: ['Stonebridge Wholesale', 'Blue Peak Supply', 'Vertex Industrial', 'Northwind Components'][sequence % 4],
        counterparty: 'Community Service Desk',
        reference: `QRY-${String(sequence).padStart(4, '0')}`,
        status: 'Insight review',
        statusTone: responseHours > 4 ? 'high' : 'medium',
        channel: 'Supplier',
        amount: 'Query record',
        nextMilestone: 'Review conversation and resolution',
        nextEta: 'Available now',
        issue: label,
        assignee: ['AP Query Team', 'Operations Support', 'Service Desk'][sequence % 3],
        waitingExternal: false,
        subscribed: true,
        actions: ['Open thread', 'Review AI answer path', 'Mark for knowledge update'],
        documents: ['Conversation log', 'Resolution notes', 'AI answer trace'],
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
            text: `Need help with ${label.toLowerCase()}.`
          }
        ]
      };
    });
  }

  function selectTransaction(id) {
    workspaceItemsOverride = null;
    workspaceOperationalContext = null;
    workspaceSummary = 'All tracked Community transactions';
    selectedTransactionId = id;
    activeTab = 'transactions';
  }

  function openEvaAssistant(mode = 'question', prompt = '') {
    if (!browser) return;

      window.dispatchEvent(
        new CustomEvent('open-eva', {
          detail: {
            customer: senderAssistantCustomer,
            mode,
            prompt
          }
        })
      );
    }

  function openSenderInvoiceRecord(record) {
    const match =
      communityTransactions.find((item) => item.reference === record.reference) ||
      communityTransactions.find((item) => item.party === record.customer) ||
      communityTransactions.find((item) => item.channel === 'Supplier') ||
      communityTransactions[0];

    workspaceItemsOverride = null;
    workspaceOperationalContext = null;
    workspaceSummary = `${record.reference} for ${record.customer}`;
    selectedTransactionId = match.id;
    activeTab = 'transactions';
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
    activeTab = 'transactions';
  }

  function openTeamMetricTransactions(row, metricKey) {
    const metricLabels = {
      assigned: 'assigned queries',
      closed: 'closed queries',
      responseSla: 'response SLA cases',
      resolutionSla: 'resolution SLA cases',
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
    activeTab = 'transactions';
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
            `Multi-step document and payment cases are the main contributors to longer closure times.`,
            `${row.outstanding} queries remain open in ${row.user}'s queue and will affect the next period if not closed.`
          ],
      comparison: isResponse
        ? `Measured against the current response target of ${responseTarget}.`
        : `Measured against the current closure target of ${closureTarget}.`
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
    workspaceSummary = `${bucket.value} ${selectedSlaContext.bucketLabel.toLowerCase()} ${selectedSlaContext.groupKey === 'response' ? 'response' : 'closure'} SLA cases`;
    closeSlaDetail();
    activeTab = 'transactions';
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
      : `${metric.value} ${metric.title.toLowerCase()} cases`;
    activeTab = 'transactions';
  }

  function setPersona(nextPersona) {
    persona = nextPersona;
    if (activeTab === 'dashboard') {
      pressureDetailOpen = false;
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
        id: communityTransactions.find((item) => item.status === 'Payment hold')?.id || communityTransactions[0].id,
        type: 'Invoice',
        status: 'Payment hold',
        focus: 'all',
        summary: 'Invoices currently on payment hold'
      },
      'dispatch-delays': {
        id: communityTransactions.find((item) => item.status === 'Dispatch delay')?.id || communityTransactions[0].id,
        type: 'Order',
        status: 'Dispatch delay',
        focus: 'all',
        summary: 'Orders currently delayed after dispatch promise'
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

    selectedTransactionId = target.id;
    transactionFilter = target.type;
    statusFilter = target.status;
    pressureFocus = target.focus;
    workspaceSummary = target.summary;
    activeTab = 'transactions';
    pressureHelperOpen = false;
  }

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
  $: workspaceItems = workspaceItemsOverride || communityTransactions;
  $: statusOptions = ['All', ...new Set(workspaceItems.map((item) => item.status))];
  $: transactionTypes = ['All', ...new Set(workspaceItems.map((item) => item.type))];
  $: selectedTransaction =
    workspaceItems.find((item) => item.id === selectedTransactionId) || workspaceItems[0];
  $: filteredTransactions = workspaceItems.filter((item) => {
    if (transactionFilter !== 'All' && item.type !== transactionFilter) return false;
    if (statusFilter !== 'All' && item.status !== statusFilter) return false;
    if (pressureFocus === 'waitingExternal' && !item.waitingExternal) return false;
    return true;
  });
  $: displayedTransactions = [...filteredTransactions].sort((a, b) => Number(Boolean(b.urgent)) - Number(Boolean(a.urgent)));
  $: openMessages = communityTransactions.filter((item) => item.messages.length);
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
            Have you started planning how your business will be compliant with the Government’s 2029 eInvoicing
            mandate?
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
          ×
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
  <div class="tabs-row primary">
    {#each tabs as tab}
      <button class:active={activeTab === tab.id} class="tab" on:click={() => (activeTab = tab.id)}>
        {tab.label}
      </button>
    {/each}
  </div>

  {#if activeTab === 'dashboard'}
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
                    <button class="queue-card {queue.severity}" on:click={() => (activeTab = 'transactions')}>
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
                    <button class="transaction-card compact-activity-card" on:click={() => selectTransaction(item.id)}>
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
                  <article class="automation-card">
                    <div class="automation-head">
                      <strong>{item.label}</strong>
                      <span class="status-pill {item.tone}">{item.detail}</span>
                    </div>
                    <p>{item.value}</p>
                  </article>
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
              <button type="button" class="pill-chip" on:click={() => openEvaAssistant('question', 'Where is invoice INV-24084?')}>Where is invoice INV-24084?</button>
              <button type="button" class="pill-chip" on:click={() => openEvaAssistant('question', 'When is payment expected?')}>When is payment expected?</button>
              <button type="button" class="pill-chip" on:click={() => openEvaAssistant('question', 'Can I get the remittance?')}>Can I get the remittance?</button>
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

        <section class="top-summary-row sender-top">
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

          <div class="metric-grid top-metrics sender-top-metrics">
            <article class="metric-card accent-high">
              <span class="metric-title">Awaiting your response</span>
              <strong class="metric-value">{currentSenderMetrics.awaitingResponse.value}</strong>
              <span class="metric-change high">{currentSenderMetrics.awaitingResponse.change}</span>
            </article>
            <article class="metric-card">
              <span class="metric-title">Queries raised in Community</span>
              <strong class="metric-value">{currentSenderMetrics.queriesRaised.value}</strong>
              <span class="metric-change medium">{currentSenderMetrics.queriesRaised.change}</span>
            </article>
            <article class="metric-card accent-good">
              <span class="metric-title">Remittances received</span>
              <strong class="metric-value">{currentSenderMetrics.remittances.value}</strong>
              <span class="metric-change good">{currentSenderMetrics.remittances.change}</span>
            </article>
          </div>
        </section>

        <section class="content-grid">
          <div class="stack">
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

              <div class="transaction-grid">
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
                        <strong>{item.invoices}</strong>
                      </div>
                      <div class="team-stat-card">
                        <span>Value sent</span>
                        <strong>{item.value}</strong>
                      </div>
                      <div class="team-stat-card">
                        <span>Expected cash</span>
                        <strong>{item.expectedCash}</strong>
                      </div>
                    </div>
                  </article>
                {/each}
              </div>
            </article>

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
  {:else if activeTab === 'insights'}
    <div class="dashboard-shell">
      {#if persona === 'receiver'}
        <section class="insights-shell">
          <section class="top-summary-row receiver-top">
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
                  <article class="insight-card">
                    <div class="insight-card-head">
                      <div>
                        <strong>{theme.label}</strong>
                        <span>{theme.count} queries • {theme.share} of manual volume</span>
                      </div>
                      <button class="ghost-btn" on:click={() => openInsightTransactions(theme.key, theme.label, theme.count, `${theme.count} ${theme.label.toLowerCase()} queries`)}>
                        View queries
                      </button>
                    </div>
                    <p>{theme.trend}</p>
                    <span class="insight-note">{theme.automation}</span>
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
                {#each currentReceiverInsights.aiOpportunities as item}
                  <article class="insight-card">
                    <div class="insight-card-head">
                      <div>
                        <strong>{item.label}</strong>
                        <span>{item.count} escalations</span>
                      </div>
                      <button class="ghost-btn" on:click={() => openInsightTransactions(item.key, item.label, item.count, `${item.count} escalated ${item.label.toLowerCase()} journeys`)}>
                        Review cases
                      </button>
                    </div>
                    <p>{item.note}</p>
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
                      <button class="ghost-btn" on:click={() => openInsightTransactions(item.key, `${item.sender} query analysis`, Number(item.detail.split(' ')[0]), `${item.sender} query cases`)}>
                        View queries
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
                  <span class="section-kicker">Support themes</span>
                  <h3>What people are most often checking</h3>
                </div>
              </div>

              <div class="insight-list">
                {#each currentSenderInsights.themes as theme}
                  <article class="insight-card">
                    <div class="insight-card-head">
                      <div>
                        <strong>{theme.label}</strong>
                        <span>{theme.count} journeys</span>
                      </div>
                    </div>
                    <p>{theme.note}</p>
                  </article>
                {/each}
              </div>
            </article>

            <article class="subpanel">
              <div class="section-head">
                <div>
                  <span class="section-kicker">Assistant performance</span>
                  <h3>How self-service is being used</h3>
                </div>
              </div>

              <div class="trend-list">
                <span>Payment and remittance answers are the strongest self-service journey for the selected period.</span>
                <span>Document-related questions are the most likely to move from self-service into a logged query.</span>
                <span>Longer message trails usually happen when supporting documents are missing or unclear.</span>
              </div>
            </article>
          </section>
        </section>
      {/if}
    </div>
  {:else if activeTab === 'transactions'}
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
            <span>Status</span>
            <select bind:value={statusFilter}>
              {#each statusOptions as status}
                <option value={status}>{status}</option>
              {/each}
            </select>
          </label>
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
                <strong>{item.reference}</strong>
                <span class="status-pill {toneClass(item.statusTone)}">{item.status}</span>
              </div>
              <span class="list-meta">{item.type} • {item.party}</span>
              <span class="list-meta">{item.amount} • {item.nextMilestone}</span>
            </button>
          {/each}
        </div>
      </aside>

      <div class="workspace-detail">
        <section class="detail-hero">
          <div>
            <span class="section-kicker">{selectedTransaction.channel} transaction</span>
            <h2>{selectedTransaction.reference}</h2>
            <p>{selectedTransaction.party} • {selectedTransaction.counterparty}</p>
          </div>
          <div class="detail-badges">
            <span class="status-pill {toneClass(selectedTransaction.statusTone)}">{selectedTransaction.status}</span>
            <span class="detail-amount">{selectedTransaction.amount}</span>
          </div>
        </section>

        <section class="detail-grid">
          <article class="detail-card">
            <span class="section-kicker">Next milestone</span>
            <strong>{selectedTransaction.nextMilestone}</strong>
            <p>{selectedTransaction.nextEta}</p>
          </article>
          <article class="detail-card issue-card">
            <span class="section-kicker">Issue / context</span>
            <strong>{selectedTransaction.issue}</strong>
            <p>Owner: {selectedTransaction.assignee}</p>
          </article>
        </section>

        {#if selectedTransaction.responseElapsed || selectedTransaction.closureElapsed}
          <section class="detail-grid">
            <article class="detail-card">
              <span class="section-kicker">Response elapsed</span>
              <strong>{selectedTransaction.responseElapsed || 'N/A'}</strong>
              <p>Measured against the current response target of {responseTarget}</p>
            </article>
            <article class="detail-card">
              <span class="section-kicker">Closure elapsed</span>
              <strong>{selectedTransaction.closureElapsed || 'N/A'}</strong>
              <p>Measured against the current closure target of {closureTarget}</p>
            </article>
          </section>
        {/if}

        <section class="timeline-card">
          <div class="section-head">
            <div>
              <span class="section-kicker">Lifecycle</span>
              <h3>Transaction timeline</h3>
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
      </div>
    </div>
  {:else if activeTab === 'messages'}
    <div class="dashboard-shell">
      <section class="message-board">
        {#each openMessages as item}
          <article class="message-thread">
            <div class="message-head">
              <div>
                <span class="section-kicker">{item.type}</span>
                <h3>{item.reference}</h3>
              </div>
              <button class="ghost-btn" on:click={() => selectTransaction(item.id)}>Open transaction</button>
            </div>

            <div class="thread-list">
              {#each item.messages as message}
                <div class="thread-item">
                  <strong>{message.author}</strong>
                  <span>{message.time}</span>
                  <p>{message.text}</p>
                </div>
              {/each}
            </div>
          </article>
        {/each}
      </section>
    </div>
  {:else}
    <div class="dashboard-shell">
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
              <span>Closure target</span>
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
            <span>Response target is set to <b>{responseTarget}</b> and closure target is set to <b>{closureTarget}</b>.</span>
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
            <button class="ghost-btn" on:click={openSlaTransactions}>Open transactions</button>
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
  .tab { background: transparent; border: none; padding: 16px 0 14px; font-size: 14px; font-weight: 500; color: var(--text-dim); border-bottom: 2px solid transparent; margin-bottom: -1px; }
  .tab.active { color: #0b7f77; border-bottom-color: #0b7f77; font-weight: 600; }

  .dashboard-shell, .workspace-shell { padding: 20px; }
  .dashboard-toolbar { display: flex; align-items: end; justify-content: space-between; gap: 18px; margin-bottom: 18px; }
  .dashboard-title { margin: 6px 0 0; color: var(--navy); font-size: 24px; line-height: 1.15; }
  .period-field { min-width: 180px; }
  .top-summary-row { display: grid; grid-template-columns: 320px minmax(0, 1fr); gap: 14px; align-items: stretch; }
  .receiver-top { margin-bottom: 18px; }
  .sender-top { margin-bottom: 18px; grid-template-columns: 420px minmax(0, 1fr); }
  .sender-top-metrics { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .sender-top-metrics .metric-card { padding: 16px; gap: 8px; }

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
  .insights-shell { display: grid; gap: 18px; }
  .insights-grid { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(320px, 0.8fr); gap: 18px; align-items: start; }
  .insights-grid.narrow-right { grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr); }
  .insights-grid.wide-left { grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr); }
  .insight-list { display: grid; gap: 12px; }
  .insight-card { border: 1px solid var(--border); border-radius: 14px; padding: 14px; background: var(--panel-alt); display: grid; gap: 8px; }
  .insight-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; }
  .insight-card-head strong { color: var(--navy); }
  .insight-card-head span { color: var(--text-dim); font-size: 12px; }
  .insight-card p { margin: 0; color: var(--text-dim); line-height: 1.5; }
  .insight-note { color: var(--navy); font-size: 12px; font-weight: 600; }
  .queue-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .reason-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .focus-list { gap: 10px; }
  .focus-item { padding: 14px 16px; border-radius: 14px; background: linear-gradient(180deg, #f6fbfb 0%, #fff 100%); border: 1px solid var(--border); color: var(--navy); font-weight: 600; }
  .sender-assistant-panel { margin-bottom: 18px; display: grid; grid-template-columns: auto minmax(0, 1fr) minmax(220px, 0.5fr); gap: 20px; align-items: center; }
  .eva-brand-col { display: flex; flex-direction: column; align-items: center; gap: 8px; }
  .eva-brand-col .eva-circle { display: block; width: 72px; height: 72px; }
  .sender-assistant-main { min-width: 0; }
  .sender-assistant-heading { margin: 0 0 8px; }
  .sender-assistant-layout { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(260px, 0.75fr); gap: 16px; align-items: stretch; }
  .assistant-copy { margin: 0 0 12px; color: var(--text-dim); line-height: 1.6; }
  .pill-chip {
    display: inline-flex;
    align-items: center;
    min-height: 34px;
    padding: 0 12px;
    border-radius: 999px;
    background: #eef7f6;
    border: 1px solid #cfe8e4;
    color: var(--navy);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }
  .assistant-customer-select select {
    min-height: 40px;
    border-radius: 12px;
    border: 1px solid var(--border);
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
    background: linear-gradient(180deg, #f7fbfb 0%, #fff 100%);
    border: 1px solid var(--border);
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
  .team-member-card { padding: 14px 16px; border-radius: 16px; background: linear-gradient(180deg, #f8fbfb 0%, #fff 100%); border: 1px solid var(--border); }
  .team-member-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; }
  .team-member-head strong { color: var(--navy); }
  .team-member-head span { font-size: 12px; }
  .team-stats-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
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
  .queue-card h4, .transaction-card h4, .message-thread h3, .detail-hero h2 { margin: 8px 0 10px; color: var(--navy); }
  .queue-card p, .transaction-card p, .message-card p, .thread-item p, .detail-card p { margin: 0; color: var(--text-dim); line-height: 1.5; }
  .compact-activity-card { padding: 13px 14px; }
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
  .workspace-summary strong { color: var(--navy); font-size: 28px; line-height: 1; }
  .workspace-summary span { color: var(--text-dim); font-size: 12px; line-height: 1.5; }
  .workspace-priority { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
  .priority-chip { border: 1px solid var(--border); border-radius: 14px; background: #fff; padding: 12px; display: grid; gap: 4px; text-align: left; }
  .priority-chip.urgent { background: linear-gradient(180deg, #fff6f6 0%, #fff 100%); border-color: #f0c2c2; }
  .priority-chip strong { color: var(--navy); font-size: 20px; line-height: 1; }
  .priority-chip span { color: var(--text-dim); font-size: 12px; line-height: 1.4; }
  .control-field { min-width: 140px; display: flex; flex-direction: column; gap: 8px; }
  .control-field span { display: block; color: var(--text-dim); font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; }
  .control-field select { width: 100%; border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; font: inherit; background: #fff; }
  .list-stack { display: grid; gap: 10px; }
  .list-item { padding: 14px; text-align: left; width: 100%; }
  .list-item.active { border-color: #0b7f77; box-shadow: inset 0 0 0 1px #0b7f77; }
  .list-meta { display: block; margin-top: 6px; font-size: 12px; }

  .workspace-detail { display: flex; flex-direction: column; gap: 16px; }
  .detail-hero { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 18px; box-shadow: 0 10px 30px rgba(16, 41, 79, 0.06); }
  .detail-hero p { margin: 0; color: var(--text-dim); }
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
  .trend-list { display: grid; gap: 10px; }
  .trend-list span { color: var(--text-dim); font-size: 13px; line-height: 1.5; padding: 10px 12px; border-radius: 12px; background: var(--panel-alt); border: 1px solid var(--border); }
  .role-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; border: 1px solid var(--border); border-radius: 12px; padding: 12px; }
  .role-row p { margin: 6px 0 0; color: var(--text-dim); }

  @media (max-width: 1180px) {
    .top-summary-row, .content-grid, .workspace-shell, .receiver-pressure-layout, .queue-grid, .reason-grid, .detail-grid, .dual-grid, .analytics-grid, .service-level-grid, .sla-group-stack, .settings-grid, .insights-grid, .sender-assistant-layout {
      grid-template-columns: 1fr;
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
    .page-header, .dashboard-toolbar, .tabs-row.primary, .detail-hero, .message-head, .transaction-top, .queue-top, .toolbar-row { flex-wrap: wrap; }
    .page-header-main { flex-wrap: wrap; }
    .metric-grid.top-metrics, .compact-metrics { grid-template-columns: 1fr; }
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
