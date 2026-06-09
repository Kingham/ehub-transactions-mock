import { e as ensure_array_like, b as attr_class, c as escape_html, i as stringify, j as attr_style, a as attr } from "../../../chunks/renderer.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import { c as communityTransactions, b as communityCashflowForecast, d as communityOutstandingInvoices, e as communityPriorityQueues, g as communityInsights, h as communityRoleProfiles } from "../../../chunks/data.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let currentSenderQueries, activeTabs, currentClerkProfile, receiverBaseItems, receiverRoleItems, receiverSenderPortfolio, senderPortfolioSearchTerm, receiverSenderPortfolioScope, filteredReceiverSenderPortfolio, selectedVisibleReceiverSenderRow, currentReceiverMetrics, currentReceiverServiceMetrics, currentHeatmap, currentHeatmapValues, currentHeatmapMin, currentHeatmapMax, currentReceiverSenderMix, currentReceiverAiIntelligence, currentReceiverUserBreakdown, currentReceiverInsights, currentSenderCustomerBreakdown, currentSenderExpectedCash, filteredSenderQueries, senderQuerySummarySource, selectedSenderQuery, expectedCashDays, workspaceItems, workspaceSlaItems, receiverQueryStatusOptions, receiverQueryStatusSummary, receiverResponseSlaSummary, receiverClosureSlaSummary, transactionTypes, selectedTransaction, filteredTransactions, displayedTransactions, selectedQueryMessages, communityPressure, communityPressureBand;
    let activeTab = "dashboard";
    let persona = "receiver";
    let receiverRole = "manager";
    let selectedApClerk = "Amelia Clarke";
    let selectedPeriod = "30d";
    let selectedTransactionId = communityTransactions[0].id;
    let selectedReceiverSender = communityTransactions[0].party;
    let queryDetailTab = "conversation";
    let transactionFilter = "All";
    let statusFilter = "All";
    let automationFilter = "All";
    let workspaceSummary = "All tracked Community queries";
    let heatmapMode = "weekday";
    let responseTarget = "4 hours";
    let closureTarget = "2 days";
    let senderAssistantCustomer = "Apex Retail UK";
    let receiverInsightsFocus = null;
    let aiSettingsFocus = "knowledge-files";
    let selectedSenderQueryId = "sender-query-1048";
    let receiverReplyText = "";
    let receiverExcludeFromEva = false;
    let receiverStatusDraft = "In review";
    let receiverStatusDraftFor = "";
    let senderStatusDraftFor = "";
    let prioritySenderIds = ["Stonebridge Wholesale", "Northwind Components"];
    let senderPortfolioSearch = "";
    let senderOwnerOverrides = {};
    let workflowAutomationEnabled = true;
    let workflowStepCount = 3;
    let workflowSequenceSteps = [
      {
        sequence: 1,
        triggerDays: 1,
        action: "Send email template",
        template: "Payment overdue reminder",
        owner: "Automation"
      },
      {
        sequence: 2,
        triggerDays: 5,
        action: "Send email template",
        template: "Second payment chase",
        owner: "Automation"
      },
      {
        sequence: 3,
        triggerDays: 10,
        action: "Escalate to human",
        template: "Credit control escalation",
        owner: "AP Query Team"
      }
    ];
    const personas = [
      { id: "email", label: "Email" },
      { id: "sender", label: "Sender" },
      { id: "receiver", label: "Receiver" }
    ];
    const receiverManagerTabs = [
      { id: "dashboard", label: "Dashboard" },
      { id: "queries", label: "Queries" },
      { id: "senders", label: "Senders" },
      { id: "insights", label: "Insights" },
      { id: "settings", label: "Settings" }
    ];
    const receiverRoles = [
      { id: "manager", label: "AP Manager" },
      { id: "clerk", label: "AP Clerk" }
    ];
    const apClerkProfiles = [
      {
        name: "Amelia Clarke",
        senders: [
          "Northwind Components",
          "Stonebridge Wholesale",
          "Harbor Freight Services",
          "Summit Electrical"
        ],
        focus: "invoice holds, missing evidence, and payment-release queries"
      },
      {
        name: "Priya Shah",
        senders: [
          "Vertex Industrial",
          "Greenline Packaging",
          "Central Trade Supply",
          "Riverside Foods"
        ],
        focus: "pricing mismatches, payment timing, and remittance follow-up"
      },
      {
        name: "Marcus Reed",
        senders: [
          "Bluewave Retail",
          "Aptus Utilities",
          "Metro Builders Group",
          "Northgate Services",
          "Greenline Wholesale"
        ],
        focus: "fulfilment exceptions, dispatch changes, and POD queries"
      }
    ];
    const periodOptions = [
      { id: "7d", label: "Last 7 days" },
      { id: "30d", label: "Last 30 days" },
      { id: "90d", label: "Last 90 days" }
    ];
    const aiInsightFocusMeta = {
      "high-friction-escalations": {
        title: "High-friction escalations in focus",
        summary: "These are the repeat AI journeys where manual intervention is still doing too much of the work."
      },
      "best-automation-opportunity": {
        title: "Best automation opportunity in focus",
        summary: "These queries already have a consistent answer pattern and are the best place to reduce manual workload next."
      },
      "next-knowledge-update": {
        title: "Next knowledge update in focus",
        summary: "This is a repeated guidance gap that can be closed with targeted EVA knowledge before a query needs team handling."
      },
      "teach-eva-from-closed-query-resolutions": {
        title: "Teach EVA from closed resolutions",
        summary: "These are closed manual answers that can be safely reused when the same question comes back again."
      },
      "payment-date": {
        title: "Payment date queries in focus",
        summary: "This theme is surfacing often enough to justify a clearer payment and remittance answer path."
      },
      "dispatch-status": {
        title: "Dispatch status queries in focus",
        summary: "These journeys need stronger milestone visibility before they become tracked queries."
      },
      documents: {
        title: "Document requests in focus",
        summary: "The answer usually exists already but is not being surfaced quickly enough to the sender."
      },
      beneficiary: {
        title: "Beneficiary checks in focus",
        summary: "These questions point to a repeat validation gap that should be handled with guided EVA content."
      },
      "knowledge-update": {
        title: "Knowledge update opportunities in focus",
        summary: "These are the next topics that should be approved and published into EVA."
      }
    };
    const defaultReceiverInsightFocusMeta = {
      title: "Receiver insight focus",
      summary: "Use this area to move from dashboard signals into the specific themes, queries, and data changes that will reduce future manual workload."
    };
    const pressureDrivers = [
      {
        key: "payment-holds",
        label: "Payment holds",
        points: 32,
        basis: "8 critical held invoices with suppliers waiting on release"
      },
      {
        key: "dispatch-delays",
        label: "Dispatch delays",
        points: 20,
        basis: "5 high-priority orders beyond promised dispatch timing"
      },
      {
        key: "open-queries",
        label: "Open external queries",
        points: 22,
        basis: "11 medium-priority conversations waiting on customer or supplier response"
      }
    ];
    const pressureBands = [
      {
        label: "Healthy",
        range: "0-39",
        note: "Low backlog, limited chasing, and exceptions moving quickly."
      },
      {
        label: "Watchlist",
        range: "40-69",
        note: "Some friction is building and teams should intervene early."
      },
      {
        label: "High",
        range: "70-100",
        note: "External users are likely feeling delay, uncertainty, or increased chasing."
      }
    ];
    const receiverPeriodMetrics = {
      "7d": {
        selfManaged: {
          value: "42",
          change: "31% of incoming queries closed through self-service"
        },
        managedInSystem: {
          value: "94",
          change: "Portal and inbox queries tracked through Community"
        },
        outstanding: {
          value: "18",
          change: "Still open at the end of the selected period"
        },
        avgResponse: {
          value: "3.4h",
          change: "Average first response time for queries needing team follow-up"
        },
        valueSummary: "Resolved through self-service or automatic inbox answers before your team needed to step in.",
        topReasons: [
          { label: "Inbox status and remittance answers", count: 18 },
          { label: "Order and dispatch updates", count: 14 },
          { label: "Document and POD requests", count: 10 }
        ]
      },
      "30d": {
        selfManaged: {
          value: "367",
          change: "67% of incoming queries closed through self-service"
        },
        managedInSystem: {
          value: "548",
          change: "Portal and inbox queries tracked through Community"
        },
        outstanding: {
          value: "37",
          change: "Still open and waiting for action or response"
        },
        avgResponse: {
          value: "4.1h",
          change: "Average first response time for queries needing team follow-up"
        },
        valueSummary: "Resolved through self-service or automatic inbox answers before your team needed to step in.",
        topReasons: [
          { label: "Inbox status and remittance answers", count: 74 },
          { label: "Order and dispatch updates", count: 61 },
          { label: "Document and POD requests", count: 51 }
        ]
      },
      "90d": {
        selfManaged: {
          value: "492",
          change: "36% of incoming queries closed through self-service"
        },
        managedInSystem: {
          value: "1,482",
          change: "Portal and inbox queries tracked through Community"
        },
        outstanding: {
          value: "52",
          change: "Current open balance after three months of activity"
        },
        avgResponse: {
          value: "4.6h",
          change: "Average first response time for queries needing team follow-up"
        },
        valueSummary: "Resolved through self-service or automatic inbox answers before your team needed to step in.",
        topReasons: [
          { label: "Inbox status and remittance answers", count: 201 },
          { label: "Order and dispatch updates", count: 164 },
          { label: "Document and POD requests", count: 127 }
        ]
      }
    };
    const receiverServiceMetrics = {
      "7d": {
        slaGroups: [
          {
            title: "Responded within 4 hours",
            buckets: [
              { label: "Green", value: "71", share: "78%", tone: "good" },
              { label: "Amber", value: "11", share: "12%", tone: "high" },
              { label: "Red", value: "9", share: "10%", tone: "critical" }
            ]
          },
          {
            title: "Resolved within 2 days",
            buckets: [
              { label: "Green", value: "64", share: "72%", tone: "good" },
              { label: "Amber", value: "14", share: "16%", tone: "high" },
              { label: "Red", value: "11", share: "12%", tone: "critical" }
            ]
          }
        ],
        metrics: [
          {
            title: "Awaiting team response",
            value: "9",
            urgentValue: "4",
            urgentLabel: "need attention in the next hour",
            summary: "Queries waiting for a first team response",
            tone: "high",
            key: "awaiting-response"
          },
          {
            title: "Still outstanding",
            value: "18",
            urgentValue: "7",
            urgentLabel: "need attention today",
            summary: "Queries still open and not yet fully resolved",
            tone: "high",
            key: "outstanding"
          },
          {
            title: "Average first response",
            value: "3.4h",
            change: "Down 0.6h over the last 30 days",
            tone: "good"
          },
          {
            title: "Average resolution time",
            value: "1.5d",
            change: "Down 0.3d over the last 30 days",
            tone: "good"
          }
        ]
      },
      "30d": {
        slaGroups: [
          {
            title: "Responded within 4 hours",
            buckets: [
              { label: "Green", value: "402", share: "73%", tone: "good" },
              { label: "Amber", value: "89", share: "16%", tone: "high" },
              { label: "Red", value: "57", share: "11%", tone: "critical" }
            ]
          },
          {
            title: "Resolved within 2 days",
            buckets: [
              { label: "Green", value: "351", share: "64%", tone: "good" },
              { label: "Amber", value: "112", share: "20%", tone: "high" },
              { label: "Red", value: "85", share: "16%", tone: "critical" }
            ]
          }
        ],
        metrics: [
          {
            title: "Awaiting team response",
            value: "17",
            urgentValue: "8",
            urgentLabel: "need attention in the next hour",
            summary: "Queries waiting for a first team response",
            tone: "high",
            key: "awaiting-response"
          },
          {
            title: "Still outstanding",
            value: "37",
            urgentValue: "14",
            urgentLabel: "need attention today",
            summary: "Queries still open and not yet fully resolved",
            tone: "high",
            key: "outstanding"
          },
          {
            title: "Average first response",
            value: "4.1h",
            change: "Down 0.4h over the last 30 days",
            tone: "good"
          },
          {
            title: "Average resolution time",
            value: "1.8d",
            change: "Down 0.4d over the last 30 days",
            tone: "good"
          }
        ]
      },
      "90d": {
        slaGroups: [
          {
            title: "Responded within 4 hours",
            buckets: [
              { label: "Green", value: "1,028", share: "69%", tone: "good" },
              { label: "Amber", value: "278", share: "19%", tone: "high" },
              { label: "Red", value: "176", share: "12%", tone: "critical" }
            ]
          },
          {
            title: "Resolved within 2 days",
            buckets: [
              { label: "Green", value: "894", share: "60%", tone: "good" },
              { label: "Amber", value: "346", share: "23%", tone: "high" },
              { label: "Red", value: "242", share: "17%", tone: "critical" }
            ]
          }
        ],
        metrics: [
          {
            title: "Awaiting team response",
            value: "24",
            urgentValue: "10",
            urgentLabel: "need attention in the next hour",
            summary: "Queries waiting for a first team response",
            tone: "high",
            key: "awaiting-response"
          },
          {
            title: "Still outstanding",
            value: "52",
            urgentValue: "21",
            urgentLabel: "need attention today",
            summary: "Queries still open and not yet fully resolved",
            tone: "high",
            key: "outstanding"
          },
          {
            title: "Average first response",
            value: "4.6h",
            change: "Down 0.2h over the last 30 days",
            tone: "good"
          },
          {
            title: "Average resolution time",
            value: "2.1d",
            change: "Down 0.2d over the last 30 days",
            tone: "good"
          }
        ]
      }
    };
    const receiverQueryHeatmaps = {
      "7d": {
        weekday: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          columns: ["08-10", "10-12", "12-14", "14-16", "16-18", "18+"],
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
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          columns: ["1-7", "8-14", "15-21", "22-31"],
          values: [[10, 7, 0, 0], [0, 11, 8, 0], [0, 0, 9, 7], [0, 0, 0, 12]]
        }
      },
      "30d": {
        weekday: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          columns: ["08-10", "10-12", "12-14", "14-16", "16-18", "18+"],
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
          labels: ["Month start", "Week 2", "Week 3", "Month end"],
          columns: ["1-7", "8-14", "15-21", "22-31"],
          values: [[31, 0, 0, 0], [0, 24, 0, 0], [0, 0, 22, 0], [0, 0, 0, 36]]
        }
      },
      "90d": {
        weekday: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          columns: ["08-10", "10-12", "12-14", "14-16", "16-18", "18+"],
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
          labels: ["Month 1", "Month 2", "Month 3", "Month-end"],
          columns: ["1-7", "8-14", "15-21", "22-31"],
          values: [[86, 0, 0, 0], [0, 71, 0, 0], [0, 0, 66, 0], [0, 0, 0, 98]]
        }
      }
    };
    const senderCustomerBreakdown = {
      "7d": [
        {
          customer: "Apex Retail UK",
          invoices: "9",
          value: "£34.6k",
          queries: "3",
          processing: "1",
          processingValue: "£4.6k",
          approved: "2",
          approvedValue: "£8.9k",
          remittanceIssued: "3",
          remittanceIssuedValue: "£12.2k",
          onHold: "1",
          onHoldValue: "£3.7k",
          inQuery: "2",
          inQueryValue: "£5.2k",
          note: "Largest current invoice flow in view"
        },
        {
          customer: "Metro Builders Group",
          invoices: "6",
          value: "£18.4k",
          queries: "2",
          processing: "1",
          processingValue: "£3.4k",
          approved: "1",
          approvedValue: "£4.8k",
          remittanceIssued: "1",
          remittanceIssuedValue: "£2.9k",
          onHold: "2",
          onHoldValue: "£4.7k",
          inQuery: "1",
          inQueryValue: "£2.6k",
          note: "Most activity still in matching"
        },
        {
          customer: "Greenline Wholesale",
          invoices: "5",
          value: "£14.9k",
          queries: "2",
          processing: "1",
          processingValue: "£3.2k",
          approved: "1",
          approvedValue: "£2.9k",
          remittanceIssued: "1",
          remittanceIssuedValue: "£3.1k",
          onHold: "1",
          onHoldValue: "£2.4k",
          inQuery: "1",
          inQueryValue: "£3.3k",
          note: "Highest query rate this week"
        }
      ],
      "30d": [
        {
          customer: "Apex Retail UK",
          invoices: "38",
          value: "£142.6k",
          queries: "9",
          processing: "6",
          processingValue: "£20.4k",
          approved: "8",
          approvedValue: "£31.2k",
          remittanceIssued: "12",
          remittanceIssuedValue: "£45.8k",
          onHold: "4",
          onHoldValue: "£14.6k",
          inQuery: "8",
          inQueryValue: "£30.6k",
          note: "Your biggest Community customer in the selected period"
        },
        {
          customer: "Greenline Wholesale",
          invoices: "26",
          value: "£94.1k",
          queries: "11",
          processing: "3",
          processingValue: "£11.2k",
          approved: "5",
          approvedValue: "£18.4k",
          remittanceIssued: "8",
          remittanceIssuedValue: "£27.1k",
          onHold: "3",
          onHoldValue: "£9.8k",
          inQuery: "7",
          inQueryValue: "£27.6k",
          note: "Highest query volume relative to invoice count"
        },
        {
          customer: "Metro Builders Group",
          invoices: "24",
          value: "£82.8k",
          queries: "7",
          processing: "3",
          processingValue: "£10.4k",
          approved: "6",
          approvedValue: "£19.6k",
          remittanceIssued: "6",
          remittanceIssuedValue: "£21.3k",
          onHold: "4",
          onHoldValue: "£13.1k",
          inQuery: "5",
          inQueryValue: "£18.4k",
          note: "Strong throughput with some holds still in view"
        },
        {
          customer: "Northgate Services",
          invoices: "18",
          value: "£66.2k",
          queries: "6",
          processing: "2",
          processingValue: "£8.7k",
          approved: "4",
          approvedValue: "£14.9k",
          remittanceIssued: "5",
          remittanceIssuedValue: "£18.8k",
          onHold: "2",
          onHoldValue: "£7.4k",
          inQuery: "5",
          inQueryValue: "£16.4k",
          note: "Most recent manual query raised"
        }
      ],
      "90d": [
        {
          customer: "Apex Retail UK",
          invoices: "96",
          value: "£381.4k",
          queries: "24",
          processing: "14",
          processingValue: "£49.8k",
          approved: "20",
          approvedValue: "£78.6k",
          remittanceIssued: "34",
          remittanceIssuedValue: "£138.2k",
          onHold: "10",
          onHoldValue: "£36.9k",
          inQuery: "18",
          inQueryValue: "£77.9k",
          note: "Largest long-term payment relationship in view"
        },
        {
          customer: "Greenline Wholesale",
          invoices: "72",
          value: "£248.9k",
          queries: "28",
          processing: "10",
          processingValue: "£31.8k",
          approved: "14",
          approvedValue: "£47.6k",
          remittanceIssued: "21",
          remittanceIssuedValue: "£73.4k",
          onHold: "9",
          onHoldValue: "£30.9k",
          inQuery: "18",
          inQueryValue: "£65.2k",
          note: "Most query-heavy account relative to invoice volume"
        },
        {
          customer: "Metro Builders Group",
          invoices: "63",
          value: "£221.8k",
          queries: "19",
          processing: "8",
          processingValue: "£24.9k",
          approved: "16",
          approvedValue: "£55.8k",
          remittanceIssued: "18",
          remittanceIssuedValue: "£66.7k",
          onHold: "8",
          onHoldValue: "£27.3k",
          inQuery: "13",
          inQueryValue: "£47.1k",
          note: "Most stable processing pattern across the period"
        },
        {
          customer: "Northgate Services",
          invoices: "44",
          value: "£156.7k",
          queries: "14",
          processing: "5",
          processingValue: "£16.8k",
          approved: "11",
          approvedValue: "£39.6k",
          remittanceIssued: "12",
          remittanceIssuedValue: "£45.2k",
          onHold: "5",
          onHoldValue: "£17.4k",
          inQuery: "11",
          inQueryValue: "£37.7k",
          note: "Largest unresolved invoice value today"
        }
      ]
    };
    const senderExpectedCashBreakdown = {
      "7d": {
        title: "Expected cash breakdown",
        summary: "Drill from month into week and day level receipt timing.",
        months: [
          {
            label: "May 2026",
            total: "GBP 27,600.00",
            weeks: [
              {
                label: "Week of 04 May",
                total: "GBP 27,600.00",
                days: [
                  {
                    label: "06 May",
                    total: "GBP 12,180.00",
                    detail: "Apex Retail UK, Greenline Wholesale, and Northgate Services"
                  },
                  {
                    label: "07 May",
                    total: "GBP 9,460.00",
                    detail: "Metro Builders Group, Riverside Foods, and Apex Retail UK"
                  },
                  {
                    label: "08 May",
                    total: "GBP 5,960.00",
                    detail: "Greenline Wholesale, Central Trade Supply, and Metro Builders Group"
                  }
                ]
              }
            ]
          }
        ]
      },
      "30d": {
        title: "Expected cash breakdown",
        summary: "Drill from month into week and day level receipt timing.",
        months: [
          {
            label: "May 2026",
            total: "GBP 84,700.00",
            weeks: [
              {
                label: "Week of 04 May",
                total: "GBP 27,600.00",
                days: [
                  {
                    label: "06 May",
                    total: "GBP 12,180.00",
                    detail: "Apex Retail UK, Greenline Wholesale, and Northgate Services"
                  },
                  {
                    label: "07 May",
                    total: "GBP 9,460.00",
                    detail: "Metro Builders Group, Riverside Foods, and Apex Retail UK"
                  },
                  {
                    label: "08 May",
                    total: "GBP 5,960.00",
                    detail: "Greenline Wholesale, Central Trade Supply, and Metro Builders Group"
                  }
                ]
              },
              {
                label: "Week of 11 May",
                total: "GBP 24,800.00",
                days: [
                  {
                    label: "12 May",
                    total: "GBP 8,900.00",
                    detail: "Apex Retail UK and South Coast Distribution"
                  },
                  {
                    label: "14 May",
                    total: "GBP 7,740.00",
                    detail: "Metro Builders Group and Vertex Industrial"
                  },
                  {
                    label: "16 May",
                    total: "GBP 8,160.00",
                    detail: "Greenline Wholesale and Riverside Foods"
                  }
                ]
              },
              {
                label: "Week of 18 May",
                total: "GBP 18,900.00",
                days: [
                  {
                    label: "19 May",
                    total: "GBP 6,250.00",
                    detail: "Northgate Services and Blue Peak Supply"
                  },
                  {
                    label: "21 May",
                    total: "GBP 5,480.00",
                    detail: "Apex Retail UK and Metro Builders Group"
                  },
                  {
                    label: "23 May",
                    total: "GBP 7,170.00",
                    detail: "Central Trade Supply and Riverside Foods"
                  }
                ]
              },
              {
                label: "Week of 25 May",
                total: "GBP 13,400.00",
                days: [
                  {
                    label: "27 May",
                    total: "GBP 4,960.00",
                    detail: "Greenline Wholesale and Vertex Industrial"
                  },
                  {
                    label: "28 May",
                    total: "GBP 3,880.00",
                    detail: "South Coast Distribution"
                  },
                  {
                    label: "30 May",
                    total: "GBP 4,560.00",
                    detail: "Apex Retail UK and Northgate Services"
                  }
                ]
              }
            ]
          }
        ]
      },
      "90d": {
        title: "Expected cash breakdown",
        summary: "Drill from month into week and day level receipt timing.",
        months: [
          {
            label: "May 2026",
            total: "GBP 84,700.00",
            weeks: [
              {
                label: "Week of 04 May",
                total: "GBP 27,600.00",
                days: [
                  {
                    label: "06 May",
                    total: "GBP 12,180.00",
                    detail: "Apex Retail UK, Greenline Wholesale, and Northgate Services"
                  },
                  {
                    label: "07 May",
                    total: "GBP 9,460.00",
                    detail: "Metro Builders Group, Riverside Foods, and Apex Retail UK"
                  },
                  {
                    label: "08 May",
                    total: "GBP 5,960.00",
                    detail: "Greenline Wholesale, Central Trade Supply, and Metro Builders Group"
                  }
                ]
              }
            ]
          },
          {
            label: "June 2026",
            total: "GBP 79,600.00",
            weeks: [
              {
                label: "Week of 01 June",
                total: "GBP 21,400.00",
                days: [
                  {
                    label: "02 June",
                    total: "GBP 7,240.00",
                    detail: "Northgate Services and Blue Peak Supply"
                  },
                  {
                    label: "04 June",
                    total: "GBP 6,980.00",
                    detail: "Apex Retail UK and Riverside Foods"
                  },
                  {
                    label: "05 June",
                    total: "GBP 7,180.00",
                    detail: "Vertex Industrial and Greenline Wholesale"
                  }
                ]
              }
            ]
          },
          {
            label: "July 2026",
            total: "GBP 77,000.00",
            weeks: [
              {
                label: "Week of 06 July",
                total: "GBP 20,600.00",
                days: [
                  {
                    label: "07 July",
                    total: "GBP 6,840.00",
                    detail: "Apex Retail UK and Central Trade Supply"
                  },
                  {
                    label: "09 July",
                    total: "GBP 7,120.00",
                    detail: "Metro Builders Group and Riverside Foods"
                  },
                  {
                    label: "10 July",
                    total: "GBP 6,640.00",
                    detail: "Greenline Wholesale and Northgate Services"
                  }
                ]
              }
            ]
          }
        ]
      }
    };
    const receiverSenderMix = {
      "7d": [
        {
          sender: "Vertex Wholesale",
          transactions: 184,
          queries: 26,
          queryRate: "14.1%",
          context: "Highest query rate in the period with repeat POD and dispatch issues.",
          tone: "critical"
        },
        {
          sender: "Northwind Components",
          transactions: 612,
          queries: 39,
          queryRate: "6.4%",
          context: "Moderate volume but still above the expected query rate.",
          tone: "high"
        },
        {
          sender: "Blue Peak Supply",
          transactions: 1280,
          queries: 41,
          queryRate: "3.2%",
          context: "Higher query count but relatively low against transaction volume.",
          tone: "good"
        }
      ],
      "30d": [
        {
          sender: "Vertex Wholesale",
          transactions: 782,
          queries: 93,
          queryRate: "11.9%",
          context: "Low transaction volume relative to query load. Prioritise root-cause review.",
          tone: "critical"
        },
        {
          sender: "Northwind Components",
          transactions: 2140,
          queries: 146,
          queryRate: "6.8%",
          context: "Material workload driver with repeat invoice and remittance questions.",
          tone: "high"
        },
        {
          sender: "Blue Peak Supply",
          transactions: 10480,
          queries: 118,
          queryRate: "1.1%",
          context: "High transaction volume but low query rate. Lower priority for intervention.",
          tone: "good"
        },
        {
          sender: "Southgate Foods",
          transactions: 396,
          queries: 31,
          queryRate: "7.8%",
          context: "Smaller sender base with disproportionate contact levels.",
          tone: "high"
        }
      ],
      "90d": [
        {
          sender: "Vertex Wholesale",
          transactions: 2316,
          queries: 286,
          queryRate: "12.3%",
          context: "Persistent hotspot across the quarter. Needs targeted improvement plan.",
          tone: "critical"
        },
        {
          sender: "Northwind Components",
          transactions: 6480,
          queries: 402,
          queryRate: "6.2%",
          context: "Still above target and responsible for a significant share of the queue.",
          tone: "high"
        },
        {
          sender: "Southgate Foods",
          transactions: 1142,
          queries: 92,
          queryRate: "8.1%",
          context: "Small sender with elevated query dependency.",
          tone: "high"
        },
        {
          sender: "Blue Peak Supply",
          transactions: 30840,
          queries: 356,
          queryRate: "1.2%",
          context: "Large-volume sender performing relatively cleanly.",
          tone: "good"
        }
      ]
    };
    const receiverAiIntelligence = {
      "7d": {
        selfServed: {
          value: "42",
          change: "18 were resolved in a single message exchange",
          tone: "good"
        },
        escalated: {
          value: "17",
          change: "Converted into tracked queries after AI could not close them",
          tone: "high"
        },
        avgMessages: {
          value: "2.3",
          change: "Average sender messages before self-service answer was found",
          tone: "medium"
        },
        promoteCount: {
          value: "6",
          change: "Closed-query resolutions ready to be reused in future AI answers",
          tone: "good"
        },
        categories: [
          {
            label: "High-friction escalations",
            value: "Tax mismatches and POD disputes",
            detail: "11 queries",
            tone: "critical"
          },
          {
            label: "Best automation opportunity",
            value: "Dispatch ETA and delivery proof requests",
            detail: "6 resolutions to promote",
            tone: "high"
          },
          {
            label: "Next knowledge update",
            value: "Supplier bank-detail validation and payment release guidance could have answered 4 queries automatically",
            detail: "4 queries point to the same missing guidance",
            tone: "medium"
          },
          {
            label: "Teach EVA from closed query resolutions",
            value: "3 escalated journeys were resolved manually with answers that can be reused automatically next time",
            detail: "Ready for assisted learning",
            tone: "good"
          }
        ]
      },
      "30d": {
        selfServed: {
          value: "367",
          change: "184 were resolved in a single message exchange",
          tone: "good"
        },
        escalated: {
          value: "71",
          change: "Converted into tracked queries after AI could not close them",
          tone: "high"
        },
        avgMessages: {
          value: "2.8",
          change: "Average sender messages before escalation or answer",
          tone: "medium"
        },
        promoteCount: {
          value: "23",
          change: "Closed-query resolutions ready to be reused in future AI answers",
          tone: "good"
        },
        categories: [
          {
            label: "High-friction escalations",
            value: "Pricing disputes, tax mismatches, and POD gaps",
            detail: "38 queries",
            tone: "critical"
          },
          {
            label: "Best automation opportunity",
            value: "Expected delivery windows and approval progress",
            detail: "23 resolutions to promote",
            tone: "high"
          },
          {
            label: "Next knowledge update",
            value: "Beneficiary checks and payment release steps could have answered 11 queries automatically",
            detail: "11 queries point to the same missing guidance",
            tone: "medium"
          },
          {
            label: "Teach EVA from closed query resolutions",
            value: "19 escalated journeys were answered manually and could be replayed by EVA if the same question is asked again",
            detail: "Resolution-led learning opportunity",
            tone: "good"
          }
        ]
      },
      "90d": {
        selfServed: {
          value: "492",
          change: "241 were resolved in a single message exchange",
          tone: "good"
        },
        escalated: {
          value: "208",
          change: "Converted into tracked queries after AI could not close them",
          tone: "high"
        },
        avgMessages: {
          value: "3.1",
          change: "Average sender messages before escalation or answer",
          tone: "medium"
        },
        promoteCount: {
          value: "58",
          change: "Closed-query resolutions ready to be reused in future AI answers",
          tone: "good"
        },
        categories: [
          {
            label: "High-friction escalations",
            value: "Multi-party disputes and missing document evidence",
            detail: "97 queries",
            tone: "critical"
          },
          {
            label: "Best automation opportunity",
            value: "Dispatch exceptions and invoice approval blockers",
            detail: "58 resolutions to promote",
            tone: "high"
          },
          {
            label: "Next knowledge update",
            value: "Bank-detail validation and payment release guidance could have answered 22 queries automatically",
            detail: "22 queries point to the same missing guidance",
            tone: "medium"
          },
          {
            label: "Teach EVA from closed query resolutions",
            value: "46 escalated journeys ended with reusable manual answers that could be surfaced automatically next time",
            detail: "Resolution-led learning opportunity",
            tone: "good"
          }
        ]
      }
    };
    const receiverUserBreakdown = {
      "7d": [
        {
          user: "Holly Bennett",
          assigned: 22,
          closed: 18,
          responseSla: "95%",
          resolutionSla: "89%",
          avgResponse: "2.9h",
          avgResolution: "1.4d",
          outstanding: 4,
          nearBreach: 2
        },
        {
          user: "Marcus Dean",
          assigned: 19,
          closed: 14,
          responseSla: "91%",
          resolutionSla: "84%",
          avgResponse: "3.5h",
          avgResolution: "1.8d",
          outstanding: 5,
          nearBreach: 2
        },
        {
          user: "Priya Shah",
          assigned: 17,
          closed: 13,
          responseSla: "88%",
          resolutionSla: "82%",
          avgResponse: "3.8h",
          avgResolution: "1.9d",
          outstanding: 4,
          nearBreach: 1
        }
      ],
      "30d": [
        {
          user: "Holly Bennett",
          assigned: 128,
          closed: 103,
          responseSla: "93%",
          resolutionSla: "87%",
          avgResponse: "3.2h",
          avgResolution: "1.6d",
          outstanding: 25,
          nearBreach: 7
        },
        {
          user: "Marcus Dean",
          assigned: 116,
          closed: 89,
          responseSla: "89%",
          resolutionSla: "81%",
          avgResponse: "4.3h",
          avgResolution: "2.1d",
          outstanding: 27,
          nearBreach: 8
        },
        {
          user: "Priya Shah",
          assigned: 97,
          closed: 76,
          responseSla: "91%",
          resolutionSla: "85%",
          avgResponse: "3.9h",
          avgResolution: "1.9d",
          outstanding: 21,
          nearBreach: 6
        },
        {
          user: "Daniel Price",
          assigned: 84,
          closed: 58,
          responseSla: "84%",
          resolutionSla: "78%",
          avgResponse: "4.8h",
          avgResolution: "2.4d",
          outstanding: 26,
          nearBreach: 9
        }
      ],
      "90d": [
        {
          user: "Holly Bennett",
          assigned: 366,
          closed: 298,
          responseSla: "92%",
          resolutionSla: "86%",
          avgResponse: "3.4h",
          avgResolution: "1.7d",
          outstanding: 68,
          nearBreach: 18
        },
        {
          user: "Marcus Dean",
          assigned: 341,
          closed: 262,
          responseSla: "88%",
          resolutionSla: "80%",
          avgResponse: "4.5h",
          avgResolution: "2.3d",
          outstanding: 79,
          nearBreach: 22
        },
        {
          user: "Priya Shah",
          assigned: 294,
          closed: 228,
          responseSla: "90%",
          resolutionSla: "84%",
          avgResponse: "4.0h",
          avgResolution: "2.0d",
          outstanding: 66,
          nearBreach: 17
        },
        {
          user: "Daniel Price",
          assigned: 257,
          closed: 191,
          responseSla: "83%",
          resolutionSla: "77%",
          avgResponse: "5.0h",
          avgResolution: "2.6d",
          outstanding: 66,
          nearBreach: 19
        }
      ]
    };
    const receiverInsightData = {
      "7d": {
        overview: [
          {
            label: "Queries needing manual handling",
            value: "58",
            note: "41% of logged queries still required team input"
          },
          {
            label: "Repeat sender themes",
            value: "4",
            note: "Senders driving recurring avoidable contact"
          },
          {
            label: "AI answer gaps identified",
            value: "12",
            note: "Resolution patterns suitable for knowledge updates"
          }
        ],
        themes: [
          {
            key: "payment-date",
            label: "Payment date and remittance timing",
            count: 18,
            share: "31%",
            trend: "Peaks in the final three working days of the month",
            automation: "Promote payment-run and remittance coverage into AI answers."
          },
          {
            key: "dispatch-status",
            label: "Order and dispatch status",
            count: 14,
            share: "24%",
            trend: "Concentrated on Mondays and post-cut-off dispatch days",
            automation: "Answer from delivery milestones and promise dates before a query is logged."
          },
          {
            key: "documents",
            label: "Document and POD requests",
            count: 10,
            share: "17%",
            trend: "Mostly follow-up contact after an initial status answer",
            automation: "Offer document retrieval paths directly in self-service."
          }
        ],
        aiOpportunities: [
          {
            key: "payment-run",
            label: "Payment-run timing and remittance availability",
            count: 9,
            note: "Most escalations only needed the latest payment-run or remittance position."
          },
          {
            key: "proof-of-delivery",
            label: "Proof of delivery and missing attachments",
            count: 7,
            note: "AI could deflect these when the right document links are available."
          },
          {
            key: "dispatch-promise",
            label: "Dispatch promise and late-order follow-up",
            count: 6,
            note: "Queries are often raised before the latest milestone has been surfaced clearly."
          }
        ],
        senderPatterns: [
          {
            key: "stonebridge",
            sender: "Stonebridge Wholesale",
            rate: "12.5%",
            detail: "25 queries from 200 transactions",
            theme: "Heavy POD and status chasing after delivery windows move."
          },
          {
            key: "vertex",
            sender: "Vertex Industrial",
            rate: "3.1%",
            detail: "31 queries from 1,004 transactions",
            theme: "Mostly payment-date and remittance visibility."
          },
          {
            key: "northwind",
            sender: "Northwind Components",
            rate: "2.4%",
            detail: "18 queries from 742 transactions",
            theme: "Beneficiary detail and payment-release checks."
          }
        ],
        signals: [
          "Missed response SLAs cluster on Monday mornings and the first working day after month end.",
          "Document-related queries take the highest average message count before closure.",
          "Two sender themes account for most manual escalations: payment timing and POD requests."
        ],
        knowledgeCandidates: [
          {
            key: "next-knowledge-update",
            title: "Supplier bank-detail validation and payment release guidance",
            count: 4,
            detail: "Could have answered 4 queries automatically before they reached the team.",
            actionLabel: "Publish knowledge update"
          },
          {
            key: "teach-eva-from-closed-query-resolutions",
            title: "Closed query answers ready for EVA reuse",
            count: 3,
            detail: "3 manual resolutions can be approved and replayed automatically next time the same question is asked.",
            actionLabel: "Review closed resolutions"
          },
          {
            key: "conversation-repair",
            title: "Long conversations before escalation",
            count: 6,
            detail: "6 journeys crossed four or more messages before the team had to step in.",
            actionLabel: "Review queries"
          }
        ]
      },
      "30d": {
        overview: [
          {
            label: "Queries needing manual handling",
            value: "362",
            note: "66% of logged queries required team input or review"
          },
          {
            label: "Repeat sender themes",
            value: "9",
            note: "Common contact patterns concentrated in a small sender group"
          },
          {
            label: "AI answer gaps identified",
            value: "41",
            note: "Resolution types that could be promoted into future answers"
          }
        ],
        themes: [
          {
            key: "payment-date",
            label: "Payment date and remittance timing",
            count: 74,
            share: "20%",
            trend: "Sharp rise in the final week of the month and after weekend payment runs",
            automation: "Broaden AI coverage with payment-run calendars, remittance timings, and current settlement status."
          },
          {
            key: "dispatch-status",
            label: "Order and dispatch status",
            count: 61,
            share: "17%",
            trend: "Peaks on Mondays and around carrier cut-off times",
            automation: "Surface the latest milestone and revised promise dates before users need to ask."
          },
          {
            key: "documents",
            label: "Document and POD requests",
            count: 51,
            share: "14%",
            trend: "More frequent after partial deliveries and invoice disputes",
            automation: "Use document availability and retrieval links to answer without manual handling."
          },
          {
            key: "beneficiary",
            label: "Beneficiary and bank detail checks",
            count: 33,
            share: "9%",
            trend: "Spikes before payment releases and supplier master changes",
            automation: "Guide users through validation steps and pre-release checks."
          }
        ],
        aiOpportunities: [
          {
            key: "payment-run",
            label: "Payment-run timing and remittance availability",
            count: 22,
            note: "These escalations usually only needed current payment timing and whether remittance had been issued."
          },
          {
            key: "proof-of-delivery",
            label: "Proof of delivery and missing attachments",
            count: 19,
            note: "The answer exists in attached evidence or document stores but is not yet easy to self-serve."
          },
          {
            key: "dispatch-promise",
            label: "Dispatch promise and carrier exception follow-up",
            count: 17,
            note: "Many users escalate after two or more back-and-forth messages on delayed shipments."
          },
          {
            key: "account-validation",
            label: "Beneficiary validation and release checks",
            count: 11,
            note: "A guided answer path would prevent unnecessary manual approvals."
          }
        ],
        senderPatterns: [
          {
            key: "stonebridge",
            sender: "Stonebridge Wholesale",
            rate: "12.5%",
            detail: "25 queries from 200 transactions",
            theme: "Disproportionate POD and short-shipment queries compared with transaction volume."
          },
          {
            key: "bluepeak",
            sender: "Blue Peak Supply",
            rate: "7.2%",
            detail: "36 queries from 500 transactions",
            theme: "Repeated follow-up on dispatch changes and incomplete document packs."
          },
          {
            key: "vertex",
            sender: "Vertex Industrial",
            rate: "3.1%",
            detail: "31 queries from 1,004 transactions",
            theme: "Mainly payment-date and remittance tracking."
          }
        ],
        signals: [
          "Red response SLA misses are highest between 08:00 and 10:00 on Mondays.",
          "Payment-timing queries rise consistently in the last five calendar days of the month.",
          "Senders with low volume but high query rate are more likely to raise document and exception-related contact.",
          "Escalated AI journeys average 4.8 messages before manual intervention."
        ],
        knowledgeCandidates: [
          {
            key: "next-knowledge-update",
            title: "Beneficiary checks and payment release steps",
            count: 11,
            detail: "Could have answered 11 queries automatically before they reached manual handling.",
            actionLabel: "Publish knowledge update"
          },
          {
            key: "teach-eva-from-closed-query-resolutions",
            title: "Closed query answers ready for EVA reuse",
            count: 19,
            detail: "19 manual resolutions can be approved and replayed automatically against the same question pattern.",
            actionLabel: "Review closed resolutions"
          },
          {
            key: "conversation-repair",
            title: "Long conversations before escalation",
            count: 18,
            detail: "18 journeys crossed six or more messages before a user stepped in, suggesting missing guidance or weak answer confidence.",
            actionLabel: "Review queries"
          }
        ]
      },
      "90d": {
        overview: [
          {
            label: "Queries needing manual handling",
            value: "990",
            note: "64% of logged queries required team input or review"
          },
          {
            label: "Repeat sender themes",
            value: "14",
            note: "Established patterns by sender, timing, and query category"
          },
          {
            label: "AI answer gaps identified",
            value: "96",
            note: "Resolution patterns suitable for knowledge updates"
          }
        ],
        themes: [
          {
            key: "payment-date",
            label: "Payment date and remittance timing",
            count: 201,
            share: "20%",
            trend: "Persistent month-end spike across all three months",
            automation: "Prioritise payment and remittance visibility as a core AI answer path."
          },
          {
            key: "dispatch-status",
            label: "Order and dispatch status",
            count: 164,
            share: "17%",
            trend: "Steady weekly pattern with Monday and Friday pressure points",
            automation: "Use promise-date changes and carrier milestones to answer before escalation."
          },
          {
            key: "documents",
            label: "Document and POD requests",
            count: 127,
            share: "13%",
            trend: "Most likely to escalate when document retrieval is not immediate",
            automation: "Improve attachment indexing and answer links."
          },
          {
            key: "beneficiary",
            label: "Beneficiary and bank detail checks",
            count: 84,
            share: "8%",
            trend: "Clusters around payment release cycles and vendor master maintenance",
            automation: "Provide guided validation and release status self-service."
          }
        ],
        aiOpportunities: [
          {
            key: "payment-run",
            label: "Payment-run timing and remittance availability",
            count: 51,
            note: "Largest long-run opportunity for deflection and faster answer confidence."
          },
          {
            key: "proof-of-delivery",
            label: "Proof of delivery and missing attachments",
            count: 38,
            note: "High-frequency repeat theme with clear document-backed answers."
          },
          {
            key: "dispatch-promise",
            label: "Dispatch promise and carrier exception follow-up",
            count: 34,
            note: "Most often escalated during weekly order peaks and late-afternoon chasing."
          },
          {
            key: "account-validation",
            label: "Beneficiary validation and release checks",
            count: 22,
            note: "Good candidate for guided workflows rather than manual handling."
          }
        ],
        senderPatterns: [
          {
            key: "stonebridge",
            sender: "Stonebridge Wholesale",
            rate: "11.9%",
            detail: "71 queries from 596 transactions",
            theme: "Consistent outlier for proof-of-delivery and short-shipment follow-up."
          },
          {
            key: "bluepeak",
            sender: "Blue Peak Supply",
            rate: "7.4%",
            detail: "95 queries from 1,287 transactions",
            theme: "High dispatch-change and missing-document volume."
          },
          {
            key: "southgate",
            sender: "Southgate Foods",
            rate: "4.8%",
            detail: "62 queries from 1,281 transactions",
            theme: "Payment timing and statement reconciliation themes."
          }
        ],
        signals: [
          "Query pressure builds at month end, then carries into the first two working days of the new month.",
          "Document-related journeys are the most likely to move from self-service into manual handling.",
          "High-query senders are not always high-volume senders; outliers are mostly driven by process quality, not scale.",
          "Resolution themes reused by the team are stable enough to promote into AI knowledge safely."
        ],
        knowledgeCandidates: [
          {
            key: "next-knowledge-update",
            title: "Bank-detail validation and payment release guidance",
            count: 22,
            detail: "Could have answered 22 queries automatically before they reached manual handling.",
            actionLabel: "Publish knowledge update"
          },
          {
            key: "teach-eva-from-closed-query-resolutions",
            title: "Closed query answers ready for EVA reuse",
            count: 46,
            detail: "46 manual resolutions can be approved and replayed automatically against the same question pattern.",
            actionLabel: "Review closed resolutions"
          },
          {
            key: "conversation-repair",
            title: "Long conversations before escalation",
            count: 31,
            detail: "31 journeys crossed six or more messages before manual handling, indicating uncertainty in the current AI path.",
            actionLabel: "Review queries"
          }
        ]
      }
    };
    const receiverAiDataSettings = {
      overview: [
        {
          label: "Knowledge files available to EVA",
          value: "8",
          note: "Approved guidance, process notes, and customer-specific playbooks"
        },
        {
          label: "Transactional feeds enabled",
          value: "2",
          note: "Live data sources already available to answer status, hold, and remittance questions"
        },
        {
          label: "Closed resolutions ready to reuse",
          value: "19",
          note: "Approved manual answers suitable for future AI responses in the current period"
        }
      ],
      sources: [
        {
          key: "transactional-data",
          title: "Transactional data",
          status: "Live",
          summary: "Allow EVA to use invoice, order, approval, hold, remittance, and dispatch data when answering sender questions.",
          detail: "Currently includes live invoice status, approval state, payment hold flags, remittance issue status, and dispatch milestones.",
          actions: ["Manage scope", "Preview fields"]
        },
        {
          key: "query-resolution-data",
          title: "Query resolution data",
          status: "Enabled for approved answers",
          summary: "Allow EVA to learn from closed manual query resolutions once they have been reviewed and approved.",
          detail: "Uses the original question, the human resolution, and the closure note so repeat journeys can be answered automatically next time.",
          actions: ["Review approvals", "Set promotion rules"]
        },
        {
          id: "sender-query-1084",
          queryReference: "QRY-1084",
          customer: "Apex Retail UK",
          linkedInvoice: "INV-24118",
          amount: "£6,840",
          status: "With customer",
          statusTone: "medium",
          issue: "Invoice has failed matching and the customer needs to review the value against the matched PO.",
          channel: "EVA escalated",
          openedAt: "Today • 12:32",
          lastUpdated: "Today • 12:33",
          waitingOn: "Customer",
          owner: "Apex Retail UK AP",
          sla: "Customer review in progress",
          transactionStatus: "Failed matching",
          nextStep: "Waiting for the customer to confirm the additional product and why the invoice has not progressed.",
          submittedAt: "22 May 2026",
          documents: ["Query summary", "Source invoice PDF"],
          actions: ["View thread", "Add update", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24118",
              type: "Invoice",
              status: "Failed matching",
              amount: "£6,840",
              note: "Invoice has failed matching while the customer reviews the invoice value against the currently matched PO value of £6,120."
            }
          ],
          messages: [
            {
              author: "You",
              time: "Today • 12:32",
              text: "I need help with an invoice for amount £6,840."
            },
            {
              author: "EVA",
              time: "Today • 12:32",
              text: "I found invoice INV-24118 and can see it is currently Failed matching with a currently matched PO value of £6,120."
            },
            {
              author: "You",
              time: "Today • 12:33",
              text: "Yes, the invoice value is correct. They asked for an extra product after the original order."
            },
            {
              author: "You",
              time: "Today • 12:33",
              text: "Please raise this with Apex Retail UK and ask them to confirm why it has not progressed."
            }
          ],
          timeline: [
            {
              step: "Query raised from EVA",
              at: "Today • 12:32",
              state: "done"
            },
            {
              step: "Linked to invoice INV-24118",
              at: "Today • 12:32",
              state: "done"
            },
            {
              step: "Additional product context added",
              at: "Today • 12:33",
              state: "done"
            },
            {
              step: "Customer review requested",
              at: "Today • 12:33",
              state: "active"
            }
          ]
        },
        {
          id: "sender-query-1091",
          queryReference: "QRY-1091",
          customer: "Apex Retail UK",
          linkedInvoice: "INV-24118",
          amount: "£6,840",
          status: "With customer",
          statusTone: "medium",
          issue: "Invoice has failed matching and has been raised for customer review after the sender confirmed the invoice value is correct.",
          channel: "EVA escalated",
          openedAt: "Today • 12:32",
          lastUpdated: "Today • 12:34",
          waitingOn: "Customer",
          owner: "Apex Retail UK AP",
          sla: "Customer review in progress",
          transactionStatus: "Failed matching",
          nextStep: "Waiting for Apex Retail UK to review the invoice against the matched PO and the additional product context.",
          submittedAt: "22 May 2026",
          documents: ["Query summary", "Source invoice PDF"],
          actions: ["View thread", "Add update", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24118",
              type: "Invoice",
              status: "Failed matching",
              amount: "£6,840",
              note: "Invoice has failed matching while the customer reviews the invoice value against the currently matched PO value of £6,120."
            }
          ],
          messages: [
            {
              author: "You",
              time: "Today • 12:32",
              text: "I need help with an invoice for amount £6,840."
            },
            {
              author: "EVA",
              time: "Today • 12:32",
              text: "In the last couple of months I can only see 1 invoice for £6,840, invoice number INV-24118, that you sent to Apex Retail UK. It was received on 22 May and its current status is Failed matching. What would you like to know about it?"
            },
            {
              author: "You",
              time: "Today • 12:32",
              text: "Why has it not moved on?"
            },
            {
              author: "EVA",
              time: "Today • 12:33",
              text: "The invoice value is £6,840, but the matched PO value currently available is £6,120. I cannot tell from the transaction data alone whether this is an agreed change, a partial receipt, or an error. Do you believe the invoice value is correct?"
            },
            {
              author: "You",
              time: "Today • 12:33",
              text: "Yes, the value is correct, they asked for an extra product after they ordered."
            },
            {
              author: "System",
              time: "Today • 12:34",
              text: "Query raised to Apex Retail UK with the linked transaction and summary from the EVA conversation."
            }
          ],
          timeline: [
            {
              step: "Query raised from EVA",
              at: "Today • 12:32",
              state: "done"
            },
            {
              step: "Linked to invoice INV-24118",
              at: "Today • 12:32",
              state: "done"
            },
            {
              step: "Additional product context added",
              at: "Today • 12:33",
              state: "done"
            },
            {
              step: "Customer review requested",
              at: "Today • 12:34",
              state: "active"
            }
          ]
        }
      ],
      uploads: [
        {
          name: "Payment release and beneficiary checks.pdf",
          type: "Knowledge file",
          updated: "Updated 2 days ago",
          status: "Approved for EVA"
        },
        {
          name: "Dispatch exception handling.docx",
          type: "Knowledge file",
          updated: "Updated 5 days ago",
          status: "Approved for EVA"
        },
        {
          name: "POD retrieval guide.pdf",
          type: "Knowledge file",
          updated: "Updated 1 week ago",
          status: "Approved for EVA"
        },
        {
          name: "Closed query resolution pack - payment timing",
          type: "Query resolution data",
          updated: "Synced this morning",
          status: "19 reusable answers in scope"
        }
      ]
    };
    const missingInvoiceSenderQuery = {
      id: "sender-query-1098",
      queryReference: "QRY-1098",
      customer: "Apex Retail UK",
      linkedInvoice: "INV-24142",
      amount: "£9,460",
      status: "Awaiting your response",
      statusTone: "high",
      issue: "Apex Retail UK cannot locate the original invoice PDF and needs the sender to upload it before matching can continue.",
      channel: "AP request",
      openedAt: "Today • 09:42",
      lastUpdated: "Today • 09:44",
      waitingOn: "You",
      owner: "Apex Retail UK AP",
      sla: "Waiting for your upload",
      transactionStatus: "Missing invoice",
      nextStep: "Upload the invoice PDF so AP can validate the document and continue matching.",
      submittedAt: "Missing from AP document store",
      documents: ["Query summary", "Purchase order PO-7714"],
      actions: ["Upload invoice", "View thread", "Open PO"],
      uploadRequest: {
        title: "Upload missing invoice",
        detail: "Apex Retail UK has asked for the original invoice PDF before this query can move forward.",
        acceptedTypes: ".pdf,.doc,.docx,.jpg,.png"
      },
      relatedTransactions: [
        {
          reference: "INV-24142",
          type: "Invoice",
          status: "Missing invoice",
          amount: "£9,460",
          note: "AP has the PO and goods receipt but no source invoice document, so matching cannot continue until the supplier uploads it."
        }
      ],
      messages: [
        {
          author: "Apex Retail UK AP",
          time: "Today • 09:42",
          text: "We cannot locate the original invoice PDF for INV-24142. Please upload the invoice so we can continue matching."
        },
        {
          author: "EVA",
          time: "Today • 09:43",
          text: "This query is waiting for you to upload the missing invoice document."
        }
      ],
      timeline: [
        {
          step: "Missing invoice identified by AP",
          at: "Today • 09:42",
          state: "done"
        },
        {
          step: "Query raised to sender",
          at: "Today • 09:43",
          state: "active"
        }
      ]
    };
    const missingInvoiceReceiverQuery = {
      id: "receiver-query-1098",
      reference: "QRY-1098",
      party: "Northwind Components",
      counterparty: "Apex Retail UK AP",
      type: "Invoice",
      amount: "£9,460",
      status: "Missing invoice",
      statusTone: "high",
      issue: "Original invoice PDF missing from AP document store",
      channel: "Portal",
      openedAt: "Today • 09:42",
      lastUpdated: "Today • 09:44",
      waitingExternal: true,
      urgent: true,
      assignee: "Amelia Clarke",
      nextMilestone: "Waiting for sender invoice upload",
      nextEta: "Due today",
      responseElapsed: "1h 12m",
      closureElapsed: "1h 12m",
      documents: ["Query summary", "Purchase order PO-7714"],
      actions: ["Review upload request", "Message sender", "Open PO"],
      messages: [
        {
          author: "Apex Retail UK AP",
          time: "Today • 09:42",
          text: "We cannot locate the original invoice PDF for INV-24142. Please upload the invoice so we can continue matching."
        },
        {
          author: "EVA",
          time: "Today • 09:43",
          text: "The sender has been asked to upload the missing invoice document."
        }
      ],
      timeline: [
        {
          step: "Missing invoice identified by AP",
          at: "Today • 09:42",
          state: "done"
        },
        {
          step: "Query raised to sender",
          at: "Today • 09:43",
          state: "active"
        }
      ]
    };
    const automatedPaymentChaseQuery = {
      id: "receiver-auto-query-1104",
      reference: "QRY-1104",
      party: "Riverside Foods",
      counterparty: "Apex Retail UK Credit Control",
      type: "Payment",
      amount: "£8,760",
      status: "Automated chase active",
      statusTone: "medium",
      issue: "Payment for INV-24062 is overdue and the payment chase workflow has opened an automated query.",
      channel: "Workflow sequence",
      openedAt: "Today • 08:05",
      lastUpdated: "Today • 08:07",
      waitingExternal: true,
      urgent: false,
      assignee: "Automation",
      nextMilestone: "Sequence 2 email sent to sender",
      nextEta: "Escalate to AP Query Team if unpaid after 10 days",
      responseElapsed: "2h 18m",
      closureElapsed: "2h 18m",
      documents: [
        "Invoice INV-24062",
        "Statement copy",
        "Payment chase email log"
      ],
      actions: ["Pause automation", "Escalate manually", "View invoice"],
      automatedSequence: {
        workflowName: "Overdue payment chase",
        currentStep: 2,
        totalSteps: 3,
        status: "Running",
        selfCloseCondition: "Self-closes when payment is received or remittance confirms settlement.",
        lastAction: "Second payment chase email sent",
        nextAction: "Escalate to AP Query Team if still unpaid after 10 days"
      },
      messages: [
        {
          author: "Workflow automation",
          time: "1 Jun 2026 • 08:05",
          text: "Query opened because invoice INV-24062 was 1 day overdue and no payment confirmation had been received."
        },
        {
          author: "Workflow automation",
          time: "1 Jun 2026 • 08:06",
          text: "Sequence 1 sent the first overdue reminder 1 day after the payment due date."
        },
        {
          author: "Workflow automation",
          time: "Today • 08:07",
          text: 'Sequence 2 sent the second payment chase email 5 days after the payment due date using template "Second payment chase".'
        }
      ],
      timeline: [
        {
          step: "Payment due date passed",
          at: "31 May 2026",
          state: "done"
        },
        {
          step: "Sequence 1 reminder sent",
          at: "1 Jun 2026 • 08:06",
          state: "done"
        },
        {
          step: "Sequence 2 chase sent",
          at: "Today • 08:07",
          state: "active"
        },
        {
          step: "Sequence 3 escalation",
          at: "10 Jun 2026",
          state: "next"
        },
        {
          step: "Self-close on payment received",
          at: "Pending",
          state: "next"
        }
      ]
    };
    const automatedWorkflowQueries = [
      {
        id: "receiver-auto-query-1107",
        reference: "QRY-1107",
        party: "Greenline Packaging",
        counterparty: "Apex Retail UK Credit Control",
        type: "Payment",
        amount: "£3,640",
        status: "EVA checking remittance response",
        statusTone: "medium",
        issue: "The sender replied to the first automated chase and EVA is checking the remittance reference before the next sequence runs.",
        channel: "Workflow sequence",
        openedAt: "4 Jun 2026 • 09:10",
        lastUpdated: "Today • 10:34",
        waitingExternal: false,
        urgent: false,
        assignee: "Automation",
        nextMilestone: "EVA will check the remittance feed again tomorrow",
        nextEta: "Send sequence 2 only if the remittance still cannot be matched",
        responseElapsed: "1d 01h",
        closureElapsed: "1d 01h",
        documents: [
          "Invoice INV-24094",
          "Sender email reply",
          "EVA handling transcript"
        ],
        actions: [
          "Review EVA transcript",
          "Take over conversation",
          "View invoice"
        ],
        automatedSequence: {
          workflowName: "Overdue payment chase",
          currentStep: 1,
          totalSteps: 3,
          status: "EVA checking inbound response",
          selfCloseCondition: "Self-closes when payment is received or EVA confirms remittance against the invoice.",
          lastAction: "EVA checked remittance reference GRP-88421 but could not yet see it in the cash allocation feed",
          nextAction: "EVA will check again tomorrow before allowing the second chase to run"
        },
        messages: [
          {
            author: "Workflow automation",
            time: "4 Jun 2026 • 09:10",
            text: "Query opened because invoice INV-24094 was 1 day overdue and no payment confirmation had been received."
          },
          {
            author: "Workflow automation",
            time: "4 Jun 2026 • 09:11",
            text: 'Sequence 1 sent the first overdue reminder using template "Payment overdue reminder".'
          },
          {
            author: "Greenline Packaging",
            time: "Today • 10:12",
            text: "We believe this was paid in yesterday's payment run. Can you check your bank receipts?"
          },
          {
            author: "EVA",
            time: "Today • 10:13",
            text: "I checked the open cash allocation feed and cannot yet see a confirmed receipt for INV-24094. Please send the remittance reference or payment value and I will try to match it automatically."
          },
          {
            author: "Greenline Packaging",
            time: "Today • 10:22",
            text: "The remittance reference should be GRP-88421 for £3,640."
          },
          {
            author: "EVA",
            time: "Today • 10:34",
            text: "I have checked for remittance reference GRP-88421 and cannot see it in the cash allocation feed yet. I will check again tomorrow before sending any further chase."
          }
        ],
        timeline: [
          {
            step: "Payment due date passed",
            at: "3 Jun 2026",
            state: "done"
          },
          {
            step: "Sequence 1 reminder sent",
            at: "4 Jun 2026 • 09:11",
            state: "done"
          },
          {
            step: "Sender replied to automated chase",
            at: "Today • 10:12",
            state: "done"
          },
          {
            step: "EVA checked remittance reference",
            at: "Today • 10:34",
            state: "active"
          },
          {
            step: "EVA re-checks cash allocation feed",
            at: "Tomorrow",
            state: "next"
          },
          {
            step: "Sequence 2 chase if still unmatched",
            at: "8 Jun 2026",
            state: "next"
          }
        ]
      },
      automatedPaymentChaseQuery,
      {
        id: "receiver-auto-query-1105",
        reference: "QRY-1105",
        party: "Northwind Components",
        counterparty: "Apex Retail UK Credit Control",
        type: "Payment",
        amount: "£4,920",
        status: "Automated chase active",
        statusTone: "medium",
        issue: "Payment for INV-24088 is overdue and the first workflow reminder has been sent.",
        channel: "Workflow sequence",
        openedAt: "4 Jun 2026 • 07:35",
        lastUpdated: "4 Jun 2026 • 07:36",
        waitingExternal: true,
        urgent: false,
        assignee: "Automation",
        nextMilestone: "Sequence 1 email sent to sender",
        nextEta: "Send second reminder if unpaid after 5 days",
        responseElapsed: "3h 01m",
        closureElapsed: "3h 01m",
        documents: [
          "Invoice INV-24088",
          "Statement copy",
          "Payment chase email log"
        ],
        actions: ["Pause automation", "Escalate manually", "View invoice"],
        automatedSequence: {
          workflowName: "Overdue payment chase",
          currentStep: 1,
          totalSteps: 3,
          status: "Running",
          selfCloseCondition: "Self-closes when payment is received or remittance confirms settlement.",
          lastAction: "First overdue payment reminder sent",
          nextAction: "Send second payment chase if still unpaid after 5 days"
        },
        messages: [
          {
            author: "Workflow automation",
            time: "4 Jun 2026 • 07:35",
            text: "Query opened because invoice INV-24088 is overdue by 1 day and no remittance has been received."
          },
          {
            author: "Workflow automation",
            time: "4 Jun 2026 • 07:36",
            text: 'Sequence 1 sent the first overdue reminder using template "Payment overdue reminder".'
          }
        ],
        timeline: [
          {
            step: "Payment due date passed",
            at: "3 Jun 2026",
            state: "done"
          },
          {
            step: "Sequence 1 reminder sent",
            at: "4 Jun 2026 • 07:36",
            state: "active"
          },
          { step: "Sequence 2 chase", at: "8 Jun 2026", state: "next" },
          {
            step: "Sequence 3 escalation",
            at: "13 Jun 2026",
            state: "next"
          },
          {
            step: "Self-close on payment received",
            at: "Pending",
            state: "next"
          }
        ]
      },
      {
        id: "receiver-auto-query-1106",
        reference: "QRY-1106",
        party: "Stonebridge Wholesale",
        counterparty: "Apex Retail UK Credit Control",
        type: "Payment",
        amount: "£12,430",
        status: "Escalated from automation",
        statusTone: "high",
        issue: "Payment for INV-24071 remains overdue after two automated chasers and now needs human review.",
        channel: "Workflow sequence",
        openedAt: "27 May 2026 • 16:20",
        lastUpdated: "Today • 09:05",
        waitingExternal: false,
        urgent: true,
        assignee: "Amelia Clarke",
        nextMilestone: "Human review required",
        nextEta: "Confirm payment position with sender today",
        responseElapsed: "18h 45m",
        closureElapsed: "18h 45m",
        documents: [
          "Invoice INV-24071",
          "Statement copy",
          "Payment chase email log",
          "Escalation summary"
        ],
        actions: ["Review escalation", "Message sender", "View invoice"],
        automatedSequence: {
          workflowName: "Overdue payment chase",
          currentStep: 3,
          totalSteps: 3,
          status: "Escalated",
          selfCloseCondition: "Self-closes when payment is received or remittance confirms settlement.",
          lastAction: "Escalated to Amelia Clarke after the second chase received no payment confirmation",
          nextAction: "Human owner to decide whether to pause, extend, or close the sequence"
        },
        messages: [
          {
            author: "Workflow automation",
            time: "27 May 2026 • 16:20",
            text: "Query opened because invoice INV-24071 was 1 day overdue and no payment confirmation had been received."
          },
          {
            author: "Workflow automation",
            time: "27 May 2026 • 16:21",
            text: "Sequence 1 sent the first overdue reminder."
          },
          {
            author: "Workflow automation",
            time: "31 May 2026 • 08:15",
            text: "Sequence 2 sent the second payment chase 5 days after the due date."
          },
          {
            author: "Workflow automation",
            time: "Today • 09:05",
            text: "Sequence 3 escalated this query to Amelia Clarke 10 days after the due date for manual intervention."
          }
        ],
        timeline: [
          {
            step: "Payment due date passed",
            at: "26 May 2026",
            state: "done"
          },
          {
            step: "Sequence 1 reminder sent",
            at: "27 May 2026 • 16:21",
            state: "done"
          },
          {
            step: "Sequence 2 chase sent",
            at: "31 May 2026 • 08:15",
            state: "done"
          },
          {
            step: "Sequence 3 human escalation",
            at: "Today • 09:05",
            state: "active"
          }
        ]
      }
    ];
    const senderQueryData = {
      "7d": [
        {
          id: "sender-query-1048",
          queryReference: "QRY-1048",
          customer: "Apex Retail UK",
          linkedInvoice: "INV-24076",
          amount: "£4,286",
          status: "Awaiting your response",
          statusTone: "high",
          issue: "Customer needs an updated shipment date before releasing payment.",
          channel: "EVA escalated",
          openedAt: "19 May 2026 • 09:12",
          lastUpdated: "Today • 09:26",
          waitingOn: "You",
          owner: "Apex Retail UK AP",
          sla: "Waiting for shipment update",
          transactionStatus: "On hold",
          nextStep: "Confirm when the replacement shipment will be sent.",
          submittedAt: "14 May 2026",
          documents: ["Invoice PDF", "Delivery schedule", "Query summary"],
          actions: ["Reply in query", "Upload shipment update", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24076",
              type: "Invoice",
              status: "On hold",
              amount: "£4,286",
              note: "Payment hold remains until the revised shipment date is confirmed."
            },
            {
              reference: "INV-24078",
              type: "Invoice",
              status: "Processing",
              amount: "£1,940",
              note: "Second shipment is still moving through matching."
            }
          ],
          messages: [
            {
              author: "EVA",
              time: "Today • 09:12",
              text: "I found an open query linked to invoice INV-24076. The latest note asks when the replacement shipment will be sent."
            },
            {
              author: "Apex Retail UK AP",
              time: "Today • 09:26",
              text: "Please confirm the revised shipment date so we can reassess the payment hold."
            }
          ],
          timeline: [
            {
              step: "Query raised from EVA",
              at: "19 May 2026 • 09:12",
              state: "done"
            },
            {
              step: "Linked to invoice on hold",
              at: "19 May 2026 • 09:13",
              state: "done"
            },
            {
              step: "Customer requested shipment update",
              at: "Today • 09:26",
              state: "active"
            }
          ]
        },
        {
          id: "sender-query-1054",
          queryReference: "QRY-1054",
          customer: "Greenline Wholesale",
          linkedInvoice: "INV-24091",
          amount: "£7,180",
          status: "With customer",
          statusTone: "medium",
          issue: "Payment timing query awaiting confirmation from AP.",
          channel: "Email inbox",
          openedAt: "18 May 2026 • 14:08",
          lastUpdated: "Yesterday • 16:42",
          waitingOn: "Customer",
          owner: "Greenline Wholesale AP",
          sla: "With customer",
          transactionStatus: "Approved",
          nextStep: "Waiting for the confirmed payment run date.",
          submittedAt: "13 May 2026",
          documents: ["Invoice PDF", "Approval trail"],
          actions: ["View thread", "Send reminder", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24091",
              type: "Invoice",
              status: "Approved",
              amount: "£7,180",
              note: "Approved and waiting for the next payment run date."
            }
          ],
          messages: [
            {
              author: "You",
              time: "18 May • 14:08",
              text: "Can you confirm when invoice INV-24091 is due for payment?"
            },
            {
              author: "Greenline Wholesale AP",
              time: "Yesterday • 16:42",
              text: "We are checking the next payment run and will update you shortly."
            }
          ],
          timeline: [
            {
              step: "Query created from inbox",
              at: "18 May 2026 • 14:08",
              state: "done"
            },
            {
              step: "Customer acknowledged query",
              at: "Yesterday • 16:42",
              state: "active"
            }
          ]
        },
        {
          id: "sender-query-1059",
          queryReference: "QRY-1059",
          customer: "Metro Builders Group",
          linkedInvoice: "INV-24108",
          amount: "£5,960",
          status: "Closed",
          statusTone: "good",
          issue: "Three-way match delay resolved after GRN update.",
          channel: "Portal",
          openedAt: "17 May 2026 • 11:40",
          lastUpdated: "Yesterday • 10:14",
          waitingOn: "Closed",
          owner: "Metro Builders Group AP",
          sla: "Closed",
          transactionStatus: "Matching complete",
          nextStep: "No further action needed.",
          submittedAt: "17 May 2026",
          documents: ["Invoice PDF", "GRN reference"],
          actions: ["Open invoice", "Download resolution"],
          relatedTransactions: [
            {
              reference: "INV-24108",
              type: "Invoice",
              status: "Matching complete",
              amount: "£5,960",
              note: "The final GRN was added and matching is complete."
            }
          ],
          messages: [
            {
              author: "You",
              time: "17 May • 11:40",
              text: "Can you confirm whether INV-24108 is still matching?"
            },
            {
              author: "Metro Builders Group AP",
              time: "Yesterday • 10:14",
              text: "GRN is now in and the invoice has moved forward."
            }
          ],
          timeline: [
            {
              step: "Query opened",
              at: "17 May 2026 • 11:40",
              state: "done"
            },
            {
              step: "Customer confirmed GRN update",
              at: "Yesterday • 10:14",
              state: "done"
            },
            { step: "Query closed", at: "Yesterday • 10:15", state: "done" }
          ]
        },
        {
          id: "sender-query-1084",
          queryReference: "QRY-1084",
          customer: "Apex Retail UK",
          linkedInvoice: "INV-24118",
          amount: "£6,840",
          status: "With customer",
          statusTone: "medium",
          issue: "Invoice has failed matching and the customer needs to review the value against the matched PO.",
          channel: "EVA escalated",
          openedAt: "Today • 12:32",
          lastUpdated: "Today • 12:33",
          waitingOn: "Customer",
          owner: "Apex Retail UK AP",
          sla: "Customer review in progress",
          transactionStatus: "Failed matching",
          nextStep: "Waiting for the customer to confirm the additional product and why the invoice has not progressed.",
          submittedAt: "22 May 2026",
          documents: ["Query summary", "Source invoice PDF"],
          actions: ["View thread", "Add update", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24118",
              type: "Invoice",
              status: "Failed matching",
              amount: "£6,840",
              note: "Invoice has failed matching while the customer reviews the invoice value against the currently matched PO value of £6,120."
            }
          ],
          messages: [
            {
              author: "You",
              time: "Today • 12:32",
              text: "I need help with an invoice for amount £6,840."
            },
            {
              author: "EVA",
              time: "Today • 12:32",
              text: "I found invoice INV-24118 and can see it is currently Failed matching with a currently matched PO value of £6,120."
            },
            {
              author: "You",
              time: "Today • 12:33",
              text: "Yes, the invoice value is correct. They asked for an extra product after the original order."
            },
            {
              author: "You",
              time: "Today • 12:33",
              text: "Please raise this with Apex Retail UK and ask them to confirm why it has not progressed."
            }
          ],
          timeline: [
            {
              step: "Query raised from EVA",
              at: "Today • 12:32",
              state: "done"
            },
            {
              step: "Linked to invoice INV-24118",
              at: "Today • 12:32",
              state: "done"
            },
            {
              step: "Additional product context added",
              at: "Today • 12:33",
              state: "done"
            },
            {
              step: "Customer review requested",
              at: "Today • 12:33",
              state: "active"
            }
          ]
        }
      ],
      "30d": [
        {
          id: "sender-query-1048",
          queryReference: "QRY-1048",
          customer: "Apex Retail UK",
          linkedInvoice: "INV-24076",
          amount: "£4,286",
          status: "Awaiting your response",
          statusTone: "high",
          issue: "Customer needs an updated shipment date before releasing payment.",
          channel: "EVA escalated",
          openedAt: "19 May 2026 • 09:12",
          lastUpdated: "Today • 09:26",
          waitingOn: "You",
          owner: "Apex Retail UK AP",
          sla: "Waiting for shipment update",
          transactionStatus: "On hold",
          nextStep: "Confirm when the replacement shipment will be sent.",
          submittedAt: "14 May 2026",
          documents: ["Invoice PDF", "Delivery schedule", "Query summary"],
          actions: ["Reply in query", "Upload shipment update", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24076",
              type: "Invoice",
              status: "On hold",
              amount: "£4,286",
              note: "Payment hold remains until the revised shipment date is confirmed."
            },
            {
              reference: "INV-24078",
              type: "Invoice",
              status: "Processing",
              amount: "£1,940",
              note: "Second shipment is still moving through matching."
            }
          ],
          messages: [
            {
              author: "EVA",
              time: "Today • 09:12",
              text: "I found an open query linked to invoice INV-24076. The latest note asks when the replacement shipment will be sent."
            },
            {
              author: "Apex Retail UK AP",
              time: "Today • 09:26",
              text: "Please confirm the revised shipment date so we can reassess the payment hold."
            }
          ],
          timeline: [
            {
              step: "Query raised from EVA",
              at: "19 May 2026 • 09:12",
              state: "done"
            },
            {
              step: "Linked to invoice on hold",
              at: "19 May 2026 • 09:13",
              state: "done"
            },
            {
              step: "Customer requested shipment update",
              at: "Today • 09:26",
              state: "active"
            }
          ]
        },
        {
          id: "sender-query-1054",
          queryReference: "QRY-1054",
          customer: "Greenline Wholesale",
          linkedInvoice: "INV-24091",
          amount: "£7,180",
          status: "With customer",
          statusTone: "medium",
          issue: "Payment timing query awaiting confirmation from AP.",
          channel: "Email inbox",
          openedAt: "18 May 2026 • 14:08",
          lastUpdated: "Yesterday • 16:42",
          waitingOn: "Customer",
          owner: "Greenline Wholesale AP",
          sla: "With customer",
          transactionStatus: "Approved",
          nextStep: "Waiting for the confirmed payment run date.",
          submittedAt: "13 May 2026",
          documents: ["Invoice PDF", "Approval trail"],
          actions: ["View thread", "Send reminder", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24091",
              type: "Invoice",
              status: "Approved",
              amount: "£7,180",
              note: "Approved and waiting for the next payment run date."
            }
          ],
          messages: [
            {
              author: "You",
              time: "18 May • 14:08",
              text: "Can you confirm when invoice INV-24091 is due for payment?"
            },
            {
              author: "Greenline Wholesale AP",
              time: "Yesterday • 16:42",
              text: "We are checking the next payment run and will update you shortly."
            }
          ],
          timeline: [
            {
              step: "Query created from inbox",
              at: "18 May 2026 • 14:08",
              state: "done"
            },
            {
              step: "Customer acknowledged query",
              at: "Yesterday • 16:42",
              state: "active"
            }
          ]
        },
        {
          id: "sender-query-1061",
          queryReference: "QRY-1061",
          customer: "Northgate Services",
          linkedInvoice: "INV-24099",
          amount: "£9,560",
          status: "In review",
          statusTone: "medium",
          issue: "Pricing difference flagged by the AP team.",
          channel: "Portal",
          openedAt: "16 May 2026 • 15:03",
          lastUpdated: "Today • 08:11",
          waitingOn: "Customer",
          owner: "Northgate Services AP",
          sla: "Updated this morning",
          transactionStatus: "In query",
          nextStep: "Customer is comparing the price to the PO.",
          submittedAt: "16 May 2026",
          documents: ["Invoice PDF", "PO copy", "Rate card"],
          actions: ["View thread", "Upload supporting file", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24099",
              type: "Invoice",
              status: "In query",
              amount: "£9,560",
              note: "The invoice is under pricing review."
            },
            {
              reference: "INV-24100",
              type: "Invoice",
              status: "Processing",
              amount: "£2,180",
              note: "A second invoice on the same PO is still moving through validation."
            }
          ],
          messages: [
            {
              author: "Northgate Services AP",
              time: "16 May • 15:03",
              text: "We have a pricing variance on INV-24099 and are reviewing it against the PO."
            },
            {
              author: "You",
              time: "16 May • 15:24",
              text: "The invoice follows the agreed rate card. I have attached the latest copy."
            },
            {
              author: "Northgate Services AP",
              time: "Today • 08:11",
              text: "Thanks, this is back with the buyer for confirmation."
            }
          ],
          timeline: [
            {
              step: "Query opened",
              at: "16 May 2026 • 15:03",
              state: "done"
            },
            {
              step: "Supporting document added",
              at: "16 May 2026 • 15:24",
              state: "done"
            },
            {
              step: "Buyer review in progress",
              at: "Today • 08:11",
              state: "active"
            }
          ]
        },
        {
          id: "sender-query-1068",
          queryReference: "QRY-1068",
          customer: "Metro Builders Group",
          linkedInvoice: "INV-24096",
          amount: "£4,920",
          status: "Awaiting your response",
          statusTone: "high",
          issue: "Customer has asked for a copy POD to complete matching.",
          channel: "Email inbox",
          openedAt: "15 May 2026 • 10:17",
          lastUpdated: "Today • 07:54",
          waitingOn: "You",
          owner: "Metro Builders Group AP",
          sla: "Waiting for delivery update",
          transactionStatus: "Matching in progress",
          nextStep: "Upload the POD for the final delivery.",
          submittedAt: "15 May 2026",
          documents: ["Invoice PDF", "Delivery note"],
          actions: ["Upload POD", "Reply in query", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24096",
              type: "Invoice",
              status: "Matching in progress",
              amount: "£4,920",
              note: "POD is still needed to complete matching."
            }
          ],
          messages: [
            {
              author: "Metro Builders Group AP",
              time: "15 May • 10:17",
              text: "Please upload the POD for the final delivery against INV-24096."
            },
            {
              author: "You",
              time: "15 May • 11:01",
              text: "We are retrieving the POD from the carrier."
            },
            {
              author: "Metro Builders Group AP",
              time: "Today • 07:54",
              text: "Please share the POD today if available so the match can be completed."
            }
          ],
          timeline: [
            {
              step: "Query created from email",
              at: "15 May 2026 • 10:17",
              state: "done"
            },
            {
              step: "Sender acknowledged request",
              at: "15 May 2026 • 11:01",
              state: "done"
            },
            {
              step: "POD still outstanding",
              at: "Today • 07:54",
              state: "active"
            }
          ]
        },
        {
          id: "sender-query-1091",
          queryReference: "QRY-1091",
          customer: "Apex Retail UK",
          linkedInvoice: "INV-24118",
          amount: "£6,840",
          status: "With customer",
          statusTone: "medium",
          issue: "Invoice has failed matching and has been raised for customer review after the sender confirmed the invoice value is correct.",
          channel: "EVA escalated",
          openedAt: "Today • 12:32",
          lastUpdated: "Today • 12:34",
          waitingOn: "Customer",
          owner: "Apex Retail UK AP",
          sla: "Customer review in progress",
          transactionStatus: "Failed matching",
          nextStep: "Waiting for Apex Retail UK to review the invoice against the matched PO and the additional product context.",
          submittedAt: "22 May 2026",
          documents: ["Query summary", "Source invoice PDF"],
          actions: ["View thread", "Add update", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24118",
              type: "Invoice",
              status: "Failed matching",
              amount: "£6,840",
              note: "Invoice has failed matching while the customer reviews the invoice value against the currently matched PO value of £6,120."
            }
          ],
          messages: [
            {
              author: "You",
              time: "Today • 12:32",
              text: "I need help with an invoice for amount £6,840."
            },
            {
              author: "EVA",
              time: "Today • 12:32",
              text: "In the last couple of months I can only see 1 invoice for £6,840, invoice number INV-24118, that you sent to Apex Retail UK. It was received on 22 May and its current status is Failed matching. What would you like to know about it?"
            },
            {
              author: "You",
              time: "Today • 12:32",
              text: "Why has it not moved on?"
            },
            {
              author: "EVA",
              time: "Today • 12:33",
              text: "The invoice value is £6,840, but the matched PO value currently available is £6,120. I cannot tell from the transaction data alone whether this is an agreed change, a partial receipt, or an error. Do you believe the invoice value is correct?"
            },
            {
              author: "You",
              time: "Today • 12:33",
              text: "Yes, the value is correct, they asked for an extra product after they ordered."
            },
            {
              author: "System",
              time: "Today • 12:34",
              text: "Query raised to Apex Retail UK with the linked transaction and summary from the EVA conversation."
            }
          ],
          timeline: [
            {
              step: "Query raised from EVA",
              at: "Today • 12:32",
              state: "done"
            },
            {
              step: "Linked to invoice INV-24118",
              at: "Today • 12:32",
              state: "done"
            },
            {
              step: "Additional product context added",
              at: "Today • 12:33",
              state: "done"
            },
            {
              step: "Customer review requested",
              at: "Today • 12:34",
              state: "active"
            }
          ]
        }
      ],
      "90d": [
        {
          id: "sender-query-1048",
          queryReference: "QRY-1048",
          customer: "Apex Retail UK",
          linkedInvoice: "INV-24076",
          amount: "£4,286",
          status: "Awaiting your response",
          statusTone: "high",
          issue: "Customer needs an updated shipment date before releasing payment.",
          channel: "EVA escalated",
          openedAt: "19 May 2026 • 09:12",
          lastUpdated: "Today • 09:26",
          waitingOn: "You",
          owner: "Apex Retail UK AP",
          sla: "Waiting for shipment update",
          transactionStatus: "On hold",
          nextStep: "Confirm when the replacement shipment will be sent.",
          submittedAt: "14 May 2026",
          documents: ["Invoice PDF", "Delivery schedule", "Query summary"],
          actions: ["Reply in query", "Upload shipment update", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24076",
              type: "Invoice",
              status: "On hold",
              amount: "£4,286",
              note: "Payment hold remains until the revised shipment date is confirmed."
            },
            {
              reference: "INV-24078",
              type: "Invoice",
              status: "Processing",
              amount: "£1,940",
              note: "Second shipment is still moving through matching."
            }
          ],
          messages: [
            {
              author: "EVA",
              time: "Today • 09:12",
              text: "I found an open query linked to invoice INV-24076. The latest note asks when the replacement shipment will be sent."
            },
            {
              author: "Apex Retail UK AP",
              time: "Today • 09:26",
              text: "Please confirm the revised shipment date so we can reassess the payment hold."
            }
          ],
          timeline: [
            {
              step: "Query raised from EVA",
              at: "19 May 2026 • 09:12",
              state: "done"
            },
            {
              step: "Linked to invoice on hold",
              at: "19 May 2026 • 09:13",
              state: "done"
            },
            {
              step: "Customer requested shipment update",
              at: "Today • 09:26",
              state: "active"
            }
          ]
        },
        {
          id: "sender-query-1054",
          queryReference: "QRY-1054",
          customer: "Greenline Wholesale",
          linkedInvoice: "INV-24091",
          amount: "£7,180",
          status: "With customer",
          statusTone: "medium",
          issue: "Payment timing query awaiting confirmation from AP.",
          channel: "Email inbox",
          openedAt: "18 May 2026 • 14:08",
          lastUpdated: "Yesterday • 16:42",
          waitingOn: "Customer",
          owner: "Greenline Wholesale AP",
          sla: "With customer",
          transactionStatus: "Approved",
          nextStep: "Waiting for the confirmed payment run date.",
          submittedAt: "13 May 2026",
          documents: ["Invoice PDF", "Approval trail"],
          actions: ["View thread", "Send reminder", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24091",
              type: "Invoice",
              status: "Approved",
              amount: "£7,180",
              note: "Approved and waiting for the next payment run date."
            }
          ],
          messages: [
            {
              author: "You",
              time: "18 May • 14:08",
              text: "Can you confirm when invoice INV-24091 is due for payment?"
            },
            {
              author: "Greenline Wholesale AP",
              time: "Yesterday • 16:42",
              text: "We are checking the next payment run and will update you shortly."
            }
          ],
          timeline: [
            {
              step: "Query created from inbox",
              at: "18 May 2026 • 14:08",
              state: "done"
            },
            {
              step: "Customer acknowledged query",
              at: "Yesterday • 16:42",
              state: "active"
            }
          ]
        },
        {
          id: "sender-query-1061",
          queryReference: "QRY-1061",
          customer: "Northgate Services",
          linkedInvoice: "INV-24099",
          amount: "£9,560",
          status: "In review",
          statusTone: "medium",
          issue: "Pricing difference flagged by the AP team.",
          channel: "Portal",
          openedAt: "16 May 2026 • 15:03",
          lastUpdated: "Today • 08:11",
          waitingOn: "Customer",
          owner: "Northgate Services AP",
          sla: "Updated this morning",
          transactionStatus: "In query",
          nextStep: "Customer is comparing the price to the PO.",
          submittedAt: "16 May 2026",
          documents: ["Invoice PDF", "PO copy", "Rate card"],
          actions: ["View thread", "Upload supporting file", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24099",
              type: "Invoice",
              status: "In query",
              amount: "£9,560",
              note: "The invoice is under pricing review."
            },
            {
              reference: "INV-24100",
              type: "Invoice",
              status: "Processing",
              amount: "£2,180",
              note: "A second invoice on the same PO is still moving through validation."
            }
          ],
          messages: [
            {
              author: "Northgate Services AP",
              time: "16 May • 15:03",
              text: "We have a pricing variance on INV-24099 and are reviewing it against the PO."
            },
            {
              author: "You",
              time: "16 May • 15:24",
              text: "The invoice follows the agreed rate card. I have attached the latest copy."
            },
            {
              author: "Northgate Services AP",
              time: "Today • 08:11",
              text: "Thanks, this is back with the buyer for confirmation."
            }
          ],
          timeline: [
            {
              step: "Query opened",
              at: "16 May 2026 • 15:03",
              state: "done"
            },
            {
              step: "Supporting document added",
              at: "16 May 2026 • 15:24",
              state: "done"
            },
            {
              step: "Buyer review in progress",
              at: "Today • 08:11",
              state: "active"
            }
          ]
        },
        {
          id: "sender-query-1068",
          queryReference: "QRY-1068",
          customer: "Metro Builders Group",
          linkedInvoice: "INV-24096",
          amount: "£4,920",
          status: "Awaiting your response",
          statusTone: "high",
          issue: "Customer has asked for a copy POD to complete matching.",
          channel: "Email inbox",
          openedAt: "15 May 2026 • 10:17",
          lastUpdated: "Today • 07:54",
          waitingOn: "You",
          owner: "Metro Builders Group AP",
          sla: "Waiting for delivery update",
          transactionStatus: "Matching in progress",
          nextStep: "Upload the POD for the final delivery.",
          submittedAt: "15 May 2026",
          documents: ["Invoice PDF", "Delivery note"],
          actions: ["Upload POD", "Reply in query", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24096",
              type: "Invoice",
              status: "Matching in progress",
              amount: "£4,920",
              note: "POD is still needed to complete matching."
            }
          ],
          messages: [
            {
              author: "Metro Builders Group AP",
              time: "15 May • 10:17",
              text: "Please upload the POD for the final delivery against INV-24096."
            },
            {
              author: "You",
              time: "15 May • 11:01",
              text: "We are retrieving the POD from the carrier."
            },
            {
              author: "Metro Builders Group AP",
              time: "Today • 07:54",
              text: "Please share the POD today if available so the match can be completed."
            }
          ],
          timeline: [
            {
              step: "Query created from email",
              at: "15 May 2026 • 10:17",
              state: "done"
            },
            {
              step: "Sender acknowledged request",
              at: "15 May 2026 • 11:01",
              state: "done"
            },
            {
              step: "POD still outstanding",
              at: "Today • 07:54",
              state: "active"
            }
          ]
        },
        {
          id: "sender-query-1072",
          queryReference: "QRY-1072",
          customer: "Riverside Foods",
          linkedInvoice: "INV-24062",
          amount: "£8,760",
          status: "Closed",
          statusTone: "good",
          issue: "Remittance timing confirmed and query closed.",
          channel: "EVA escalated",
          openedAt: "08 May 2026 • 10:22",
          lastUpdated: "10 May 2026 • 13:18",
          waitingOn: "Closed",
          owner: "Riverside Foods AP",
          sla: "Closed",
          transactionStatus: "Remittance issued",
          nextStep: "No further action needed.",
          submittedAt: "07 May 2026",
          documents: ["Invoice PDF", "Remittance advice"],
          actions: ["Open invoice", "Download resolution"],
          relatedTransactions: [
            {
              reference: "INV-24062",
              type: "Invoice",
              status: "Remittance issued",
              amount: "£8,760",
              note: "Payment is aligned to the latest remittance advice."
            }
          ],
          messages: [
            {
              author: "You",
              time: "08 May • 10:22",
              text: "Can you confirm when remittance will be issued for INV-24062?"
            },
            {
              author: "Riverside Foods AP",
              time: "10 May • 13:18",
              text: "Remittance was issued today and payment is due in the next run."
            }
          ],
          timeline: [
            {
              step: "Query opened",
              at: "08 May 2026 • 10:22",
              state: "done"
            },
            {
              step: "Payment timing confirmed",
              at: "10 May 2026 • 13:18",
              state: "done"
            },
            {
              step: "Query closed",
              at: "10 May 2026 • 13:19",
              state: "done"
            }
          ]
        },
        {
          id: "sender-query-1084",
          queryReference: "QRY-1084",
          customer: "Riverside Foods",
          linkedInvoice: "INV-24114",
          amount: "£6,180",
          status: "In review",
          statusTone: "medium",
          issue: "First processing update is still under review after submission.",
          channel: "Email inbox",
          openedAt: "19 May 2026 • 10:18",
          lastUpdated: "Today • 11:06",
          waitingOn: "Customer",
          owner: "Riverside Foods AP",
          sla: "Updated this morning",
          transactionStatus: "Sent",
          nextStep: "Waiting for the customer to confirm when processing will begin.",
          submittedAt: "19 May 2026",
          documents: ["Invoice PDF", "Submission confirmation"],
          actions: ["View thread", "Send reminder", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24114",
              type: "Invoice",
              status: "Sent",
              amount: "£6,180",
              note: "Invoice has been received but is still awaiting its first processing update."
            }
          ],
          messages: [
            {
              author: "You",
              time: "19 May • 10:18",
              text: "Can you confirm whether INV-24114 has started processing yet?"
            },
            {
              author: "Riverside Foods AP",
              time: "Today • 11:06",
              text: "We have the invoice and are checking why the first processing step has not updated yet."
            }
          ],
          timeline: [
            {
              step: "Query created from inbox",
              at: "19 May 2026 • 10:18",
              state: "done"
            },
            {
              step: "Linked to invoice INV-24114",
              at: "19 May 2026 • 10:19",
              state: "done"
            },
            {
              step: "Customer review in progress",
              at: "Today • 11:06",
              state: "active"
            }
          ]
        },
        {
          id: "sender-query-1091",
          queryReference: "QRY-1091",
          customer: "Apex Retail UK",
          linkedInvoice: "INV-24118",
          amount: "£6,840",
          status: "With customer",
          statusTone: "medium",
          issue: "Invoice has failed matching and has been raised for customer review after the sender confirmed the invoice value is correct.",
          channel: "EVA escalated",
          openedAt: "Today • 12:32",
          lastUpdated: "Today • 12:34",
          waitingOn: "Customer",
          owner: "Apex Retail UK AP",
          sla: "Customer review in progress",
          transactionStatus: "Failed matching",
          nextStep: "Waiting for Apex Retail UK to review the invoice against the matched PO and the additional product context.",
          submittedAt: "22 May 2026",
          documents: ["Query summary", "Source invoice PDF"],
          actions: ["View thread", "Add update", "Open invoice"],
          relatedTransactions: [
            {
              reference: "INV-24118",
              type: "Invoice",
              status: "Failed matching",
              amount: "£6,840",
              note: "Invoice has failed matching while the customer reviews the invoice value against the currently matched PO value of £6,120."
            }
          ],
          messages: [
            {
              author: "You",
              time: "Today • 12:32",
              text: "I need help with an invoice for amount £6,840."
            },
            {
              author: "EVA",
              time: "Today • 12:32",
              text: "In the last couple of months I can only see 1 invoice for £6,840, invoice number INV-24118, that you sent to Apex Retail UK. It was received on 22 May and its current status is Failed matching. What would you like to know about it?"
            },
            {
              author: "You",
              time: "Today • 12:32",
              text: "Why has it not moved on?"
            },
            {
              author: "EVA",
              time: "Today • 12:33",
              text: "The invoice value is £6,840, but the matched PO value currently available is £6,120. I cannot tell from the transaction data alone whether this is an agreed change, a partial receipt, or an error. Do you believe the invoice value is correct?"
            },
            {
              author: "You",
              time: "Today • 12:33",
              text: "Yes, the value is correct, they asked for an extra product after they ordered."
            },
            {
              author: "System",
              time: "Today • 12:34",
              text: "Query raised to Apex Retail UK with the linked transaction and summary from the EVA conversation."
            }
          ],
          timeline: [
            {
              step: "Query raised from EVA",
              at: "Today • 12:32",
              state: "done"
            },
            {
              step: "Linked to invoice INV-24118",
              at: "Today • 12:32",
              state: "done"
            },
            {
              step: "Additional product context added",
              at: "Today • 12:33",
              state: "done"
            },
            {
              step: "Customer review requested",
              at: "Today • 12:34",
              state: "active"
            }
          ]
        }
      ]
    };
    function toneClass(tone) {
      if (tone === "critical") return "critical";
      if (tone === "high") return "high";
      if (tone === "medium") return "medium";
      return "good";
    }
    function amountValue(value) {
      return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
    }
    function getApClerkProfile(name = selectedApClerk) {
      return apClerkProfiles.find((profile) => profile.name === name) || apClerkProfiles[0];
    }
    function getSenderOwner(sender) {
      return senderOwnerOverrides[sender] || apClerkProfiles.find((profile) => profile.senders.includes(sender))?.name || "AP Query Team";
    }
    function getCommunityQueryReference(item) {
      if (!item) return "QRY-0000";
      if (String(item.reference).startsWith("QRY-")) return item.reference;
      const digitsFromReference = String(item.reference).match(/(\d{3,4})$/)?.[1];
      if (digitsFromReference) {
        return `QRY-${digitsFromReference.padStart(4, "0")}`;
      }
      const index = communityTransactions.findIndex((entry) => entry.id === item.id);
      if (index >= 0) {
        return `QRY-${String(1041 + index).padStart(4, "0")}`;
      }
      return "QRY-0000";
    }
    function senderQueryStatusTone(status) {
      if (status === "Awaiting your response") return "high";
      if (status === "With customer" || status === "In review") return "medium";
      return "good";
    }
    function senderQueryStatusLabel(status) {
      if (status === "Awaiting your response") return "Needs your input";
      if (status === "With customer") return "With customer";
      return status;
    }
    function receiverQueryStatus(item) {
      if (!item) return "Open";
      if (item.waitingExternal) return "Awaiting external response";
      if (item.statusTone === "critical" || item.statusTone === "high" || item.statusTone === "medium") {
        return "In review";
      }
      return "Closed";
    }
    function receiverQueryStatusTone(status) {
      if (status === "Awaiting external response") return "high";
      if (status === "In review") return "medium";
      return "good";
    }
    function receiverQueryAssignee(item) {
      if (!item) return "";
      return item.assignee || getSenderOwner(item.party);
    }
    function buildSlaGroupsForItems(items) {
      const buildBuckets = (groupKey) => {
        const total = Math.max(items.length, 1);
        return ["Green", "Amber", "Red"].map((label) => {
          const tone = label === "Green" ? "good" : label === "Amber" ? "high" : "critical";
          const value = items.filter((item) => receiverQuerySla(item)[groupKey].label === label).length;
          return {
            label,
            value: String(value),
            share: `${Math.round(value / total * 100)}%`,
            tone
          };
        });
      };
      return [
        {
          title: "Responded within 4 hours",
          buckets: buildBuckets("response")
        },
        {
          title: "Resolved within 2 days",
          buckets: buildBuckets("closure")
        }
      ];
    }
    function automatedSequenceLabel(item) {
      return item?.automatedSequence ? `Auto ${item.automatedSequence.currentStep}/${item.automatedSequence.totalSteps}` : "";
    }
    function summariseReceiverQueryParties(items) {
      if (!items.length) return "No queries in this status";
      const counts = items.reduce(
        (acc, item) => {
          acc[item.party] = (acc[item.party] || 0) + 1;
          return acc;
        },
        {}
      );
      const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const lead = entries.slice(0, 2).map(([party, count]) => `${party} ${count}`).join(" • ");
      return entries.length > 2 ? `${lead} • +${entries.length - 2} more` : lead;
    }
    const receiverQuerySlaMap = {
      "COM-24018": {
        response: { tone: "high", label: "42m left" },
        closure: { tone: "medium", label: "0.6d left" }
      },
      "COM-24027": {
        response: { tone: "critical", label: "Missed by 18m" },
        closure: { tone: "high", label: "0.3d left" }
      },
      "COM-24039": {
        response: { tone: "high", label: "1.2h left" },
        closure: { tone: "high", label: "0.8d left" }
      },
      "COM-24044": {
        response: { tone: "good", label: "Met in 2.1h" },
        closure: { tone: "medium", label: "1.1d left" }
      },
      "COM-24051": {
        response: { tone: "high", label: "24m left" },
        closure: { tone: "high", label: "0.4d left" }
      },
      "COM-24063": {
        response: { tone: "good", label: "Met in 1.7h" },
        closure: { tone: "medium", label: "1.3d left" }
      },
      "COM-24072": {
        response: { tone: "good", label: "Met in 2.8h" },
        closure: { tone: "high", label: "0.5d left" }
      },
      "COM-24088": {
        response: { tone: "good", label: "Met in 2.4h" },
        closure: { tone: "medium", label: "1.0d left" }
      },
      "COM-88104": {
        response: { tone: "critical", label: "Missed by 33m" },
        closure: { tone: "high", label: "0.4d left" }
      },
      "COM-88116": {
        response: { tone: "high", label: "36m left" },
        closure: { tone: "medium", label: "1.2d left" }
      },
      "COM-88122": {
        response: { tone: "high", label: "58m left" },
        closure: { tone: "high", label: "0.7d left" }
      },
      "COM-88131": {
        response: { tone: "critical", label: "Missed by 11m" },
        closure: { tone: "high", label: "0.2d left" }
      },
      "COM-88147": {
        response: { tone: "good", label: "Met in 3.0h" },
        closure: { tone: "medium", label: "1.4d left" }
      },
      "COM-55219": {
        response: { tone: "good", label: "Met in 1.3h" },
        closure: { tone: "good", label: "Met in 1.1d" }
      },
      "COM-55228": {
        response: { tone: "high", label: "1.5h left" },
        closure: { tone: "good", label: "Met in 1.4d" }
      },
      "COM-55243": {
        response: { tone: "medium", label: "2.4h left" },
        closure: { tone: "medium", label: "1.5d left" }
      },
      "COM-11472": {
        response: { tone: "good", label: "Met in 1.0h" },
        closure: { tone: "good", label: "Met in 0.7d" }
      },
      "COM-11488": {
        response: { tone: "high", label: "48m left" },
        closure: { tone: "medium", label: "1.0d left" }
      },
      "COM-11495": {
        response: { tone: "critical", label: "Missed by 22m" },
        closure: { tone: "high", label: "0.5d left" }
      }
    };
    function receiverQuerySla(item) {
      return receiverQuerySlaMap[item?.id] || {
        response: { tone: "medium", label: "1.8h left" },
        closure: { tone: "medium", label: "1.0d left" }
      };
    }
    function hasReceiverSla(item) {
      return !item?.automatedSequence;
    }
    function summariseSenderQueryCustomers(items) {
      if (!items.length) return "No queries in this status";
      const counts = items.reduce(
        (acc, item) => {
          acc[item.customer] = (acc[item.customer] || 0) + 1;
          return acc;
        },
        {}
      );
      const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const lead = entries.slice(0, 2).map(([customer, count]) => `${customer} ${count}`).join(" • ");
      return entries.length > 2 ? `${lead} • +${entries.length - 2} more` : lead;
    }
    function parseExpectedCashNames(detail) {
      return String(detail).replace(/\sand\s/g, ", ").split(",").map((item) => item.trim()).filter(Boolean);
    }
    function buildExpectedCashCustomerBreakdown(day) {
      const total = amountValue(day.total);
      const names = parseExpectedCashNames(day.detail);
      if (!names.length) return [];
      const baseAmount = Math.floor(total / names.length * 100) / 100;
      let running = 0;
      return names.map((name, index) => {
        const amount = index === names.length - 1 ? Number((total - running).toFixed(2)) : baseAmount;
        running = Number((running + amount).toFixed(2));
        return {
          customer: name,
          amount,
          date: day.label,
          reference: `EC-${day.label.replace(/\s+/g, "").toUpperCase()}-${index + 1}`
        };
      });
    }
    function getExpectedCashDays() {
      {
        return currentSenderExpectedCash.months.flatMap((month) => month.weeks.flatMap((week) => week.days));
      }
    }
    function pressureBandClass(label) {
      if (label === "High") return "high-risk";
      if (label === "Watchlist") return "watchlist";
      return "healthy";
    }
    function getAiOpportunityKey(label) {
      if (label === "High-friction escalations") return "high-friction-escalations";
      if (label === "Best automation opportunity") return "best-automation-opportunity";
      if (label === "Next knowledge update") return "next-knowledge-update";
      if (label === "Teach EVA from closed query resolutions") return "teach-eva-from-closed-query-resolutions";
      return null;
    }
    function getReceiverInsightFocusMeta() {
      return aiInsightFocusMeta[receiverInsightsFocus] || null;
    }
    function getReceiverInsightFocusCard() {
      return getReceiverInsightFocusMeta() || defaultReceiverInsightFocusMeta;
    }
    currentSenderQueries = [
      missingInvoiceSenderQuery,
      ...senderQueryData[selectedPeriod]
    ];
    activeTabs = receiverManagerTabs;
    if (activeTabs.length && !activeTabs.some((tab) => tab.id === activeTab)) {
      activeTab = "dashboard";
    }
    currentClerkProfile = getApClerkProfile();
    receiverBaseItems = [
      ...automatedWorkflowQueries,
      missingInvoiceReceiverQuery,
      ...communityTransactions
    ];
    receiverRoleItems = receiverBaseItems;
    receiverSenderPortfolio = [...new Set(receiverBaseItems.map((item) => item.party))].map((sender) => {
      const items = receiverBaseItems.filter((item) => item.party === sender);
      const openItems = items.filter((item) => receiverQueryStatus(item) !== "Closed");
      const closedItems = items.filter((item) => receiverQueryStatus(item) === "Closed");
      const slaMeasuredItems = items.filter(hasReceiverSla);
      const slaHitItems = slaMeasuredItems.filter((item) => receiverQuerySla(item).response.tone === "good" && receiverQuerySla(item).closure.tone === "good");
      return {
        name: sender,
        items,
        queries: items.length,
        open: openItems.length,
        closed: closedItems.length,
        transactions: items.length * 18 + sender.length,
        owner: getSenderOwner(sender),
        priority: prioritySenderIds.includes(sender),
        slaRate: slaMeasuredItems.length ? Math.round(slaHitItems.length / slaMeasuredItems.length * 100) : 100,
        latest: items[0]?.nextMilestone || "No recent query activity"
      };
    }).sort((a, b) => Number(b.priority) - Number(a.priority) || b.open - a.open || b.queries - a.queries);
    senderPortfolioSearchTerm = senderPortfolioSearch.trim().toLowerCase();
    receiverSenderPortfolioScope = receiverSenderPortfolio;
    filteredReceiverSenderPortfolio = senderPortfolioSearchTerm ? receiverSenderPortfolioScope.filter((sender) => [sender.name, sender.owner, sender.latest].some((value) => String(value).toLowerCase().includes(senderPortfolioSearchTerm))) : receiverSenderPortfolioScope;
    receiverSenderPortfolio.find((sender) => sender.name === selectedReceiverSender) || receiverSenderPortfolio[0];
    selectedVisibleReceiverSenderRow = filteredReceiverSenderPortfolio.find((sender) => sender.name === selectedReceiverSender) || filteredReceiverSenderPortfolio[0];
    receiverSenderPortfolio.filter((sender) => currentClerkProfile.senders.includes(sender.name));
    receiverRoleItems.filter((item) => receiverQueryStatus(item) !== "Closed").length;
    receiverRoleItems.filter((item) => hasReceiverSla(item) && (receiverQuerySla(item).response.tone !== "good" || receiverQuerySla(item).closure.tone !== "good")).length;
    receiverRoleItems.filter((item) => receiverQueryStatus(item) === "Awaiting external response").length;
    buildSlaGroupsForItems(receiverRoleItems.filter(hasReceiverSla));
    [...receiverRoleItems].sort((a, b) => Number(hasReceiverSla(b) && (receiverQuerySla(b).response.tone === "critical" || receiverQuerySla(b).closure.tone === "critical")) - Number(hasReceiverSla(a) && (receiverQuerySla(a).response.tone === "critical" || receiverQuerySla(a).closure.tone === "critical")) || Number(Boolean(b.urgent)) - Number(Boolean(a.urgent))).slice(0, 5);
    currentReceiverMetrics = receiverPeriodMetrics[selectedPeriod];
    currentReceiverServiceMetrics = receiverServiceMetrics[selectedPeriod];
    currentHeatmap = receiverQueryHeatmaps[selectedPeriod][heatmapMode];
    currentHeatmapValues = currentHeatmap.values.flat();
    currentHeatmapMin = Math.min(...currentHeatmapValues);
    currentHeatmapMax = Math.max(...currentHeatmapValues);
    currentReceiverSenderMix = receiverSenderMix[selectedPeriod];
    currentReceiverAiIntelligence = receiverAiIntelligence[selectedPeriod];
    currentReceiverUserBreakdown = receiverUserBreakdown[selectedPeriod];
    currentReceiverInsights = receiverInsightData[selectedPeriod];
    currentSenderCustomerBreakdown = senderCustomerBreakdown[selectedPeriod];
    currentSenderExpectedCash = senderExpectedCashBreakdown[selectedPeriod];
    [
      "All",
      ...new Set(currentSenderQueries.map((item) => item.customer))
    ];
    [
      "All",
      ...new Set(currentSenderQueries.map((item) => item.status))
    ];
    filteredSenderQueries = currentSenderQueries.filter((item) => {
      return true;
    });
    senderQuerySummarySource = currentSenderQueries;
    [
      "Awaiting your response",
      "With customer",
      "In review",
      "Closed"
    ].map((status) => {
      const matches = senderQuerySummarySource.filter((item) => item.status === status);
      return {
        status,
        count: matches.length,
        tone: senderQueryStatusTone(status),
        breakdown: summariseSenderQueryCustomers(matches)
      };
    });
    if (filteredSenderQueries.length && !filteredSenderQueries.some((item) => item.id === selectedSenderQueryId)) {
      selectedSenderQueryId = filteredSenderQueries[0].id;
    }
    selectedSenderQuery = currentSenderQueries.find((item) => item.id === selectedSenderQueryId) || currentSenderQueries[0];
    selectedSenderQuery?.messages || [];
    currentSenderQueries.filter((item) => item.status !== "Closed").length;
    currentSenderQueries.filter((item) => item.waitingOn === "You").length;
    if (selectedSenderQuery && senderStatusDraftFor !== selectedSenderQuery.id) {
      selectedSenderQuery.status;
      senderStatusDraftFor = selectedSenderQuery.id;
    }
    if (!currentSenderCustomerBreakdown.some((row) => row.customer === senderAssistantCustomer)) {
      senderAssistantCustomer = currentSenderCustomerBreakdown[0]?.customer || "";
    }
    expectedCashDays = getExpectedCashDays();
    Object.values(expectedCashDays.flatMap((day) => buildExpectedCashCustomerBreakdown(day)).reduce(
      (acc, row) => {
        if (!acc[row.customer]) {
          acc[row.customer] = { customer: row.customer, amount: 0, days: /* @__PURE__ */ new Set() };
        }
        acc[row.customer].amount += row.amount;
        acc[row.customer].days.add(row.date);
        return acc;
      },
      {}
    )).map((row) => ({
      ...row,
      amount: Number(row.amount.toFixed(2)),
      dayCount: row.days.size
    })).sort((a, b) => b.amount - a.amount);
    expectedCashDays.flatMap((day) => buildExpectedCashCustomerBreakdown(day)).map((row, index) => ({
      id: `${row.reference}-${index + 1}`,
      reference: row.reference,
      customer: row.customer,
      expectedDate: row.date,
      amount: row.amount
    }));
    workspaceItems = receiverRoleItems;
    workspaceSlaItems = workspaceItems.filter(hasReceiverSla);
    receiverQueryStatusOptions = [
      "All",
      ...new Set(workspaceItems.map((item) => receiverQueryStatus(item)))
    ];
    receiverQueryStatusSummary = ["Awaiting external response", "In review", "Closed"].map((status) => {
      const matches = workspaceItems.filter((item) => receiverQueryStatus(item) === status);
      return {
        status,
        count: matches.length,
        tone: receiverQueryStatusTone(status),
        breakdown: summariseReceiverQueryParties(matches)
      };
    });
    receiverResponseSlaSummary = {
      total: workspaceSlaItems.filter((item) => receiverQuerySla(item).response.tone !== "good").length,
      missed: workspaceSlaItems.filter((item) => receiverQuerySla(item).response.tone === "critical").length,
      close: workspaceSlaItems.filter((item) => receiverQuerySla(item).response.tone === "high").length
    };
    receiverClosureSlaSummary = {
      total: workspaceSlaItems.filter((item) => receiverQuerySla(item).closure.tone !== "good").length,
      missed: workspaceSlaItems.filter((item) => receiverQuerySla(item).closure.tone === "critical").length,
      close: workspaceSlaItems.filter((item) => receiverQuerySla(item).closure.tone === "high").length
    };
    transactionTypes = ["All", ...new Set(workspaceItems.map((item) => item.type))];
    selectedTransaction = workspaceItems.find((item) => item.id === selectedTransactionId) || workspaceItems[0];
    filteredTransactions = workspaceItems.filter((item) => {
      return true;
    });
    displayedTransactions = [...filteredTransactions].sort((a, b) => Number(Boolean(b.urgent)) - Number(Boolean(a.urgent)));
    communityTransactions.filter((item) => item.messages.length);
    selectedQueryMessages = selectedTransaction?.messages || [];
    if (selectedTransaction && receiverStatusDraftFor !== selectedTransaction.id) {
      receiverStatusDraft = receiverQueryStatus(selectedTransaction);
      receiverStatusDraftFor = selectedTransaction.id;
      receiverReplyText = "";
      receiverExcludeFromEva = false;
    }
    Math.max(...communityCashflowForecast.map((item) => amountValue(item.total)));
    Math.max(...communityOutstandingInvoices.statuses.map((item) => amountValue(item.amount)));
    communityPressure = pressureDrivers.reduce((total, driver) => total + driver.points, 0);
    communityPressureBand = pressureBands.find((band) => {
      const [min, max] = band.range.split("-").map(Number);
      return communityPressure >= min && communityPressure <= max;
    }) || pressureBands[pressureBands.length - 1];
    $$renderer2.push(`<div class="page-header svelte-131htjm"><div class="page-header-main svelte-131htjm"><span class="icon-tile"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v10H7l-3 3z"></path><path d="M8 9h8M8 12h5"></path></svg></span> <h1>Community</h1> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="persona-switch svelte-131htjm"><!--[-->`);
    const each_array = ensure_array_like(personas);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      $$renderer2.push(`<button${attr_class("persona-btn svelte-131htjm", void 0, { "active": persona === option.id })}>${escape_html(option.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <section class="panel main-card svelte-131htjm">`);
    {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="tabs-row primary svelte-131htjm"><div class="tabs-group svelte-131htjm"><!--[-->`);
      const each_array_1 = ensure_array_like(activeTabs);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let tab = each_array_1[$$index_1];
        $$renderer2.push(`<button${attr_class("tab svelte-131htjm", void 0, { "active": activeTab === tab.id })}>${escape_html(tab.label)}</button>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      {
        $$renderer2.push("<!--[-1-->");
        $$renderer2.push(`<div class="receiver-role-tools svelte-131htjm"><div class="role-switch svelte-131htjm" aria-label="Receiver role"><!--[-->`);
        const each_array_2 = ensure_array_like(receiverRoles);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let role = each_array_2[$$index_2];
          $$renderer2.push(`<button${attr_class("role-switch-btn svelte-131htjm", void 0, { "active": receiverRole === role.id })}>${escape_html(role.label)}</button>`);
        }
        $$renderer2.push(`<!--]--></div> `);
        {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (activeTab === "dashboard") {
      $$renderer2.push("<!--[1-->");
      $$renderer2.push(`<div class="dashboard-shell svelte-131htjm"><div class="dashboard-toolbar svelte-131htjm"><div><span class="section-kicker svelte-131htjm">Dashboard</span> <h2 class="dashboard-title svelte-131htjm">${escape_html(
        "Query performance and service control"
      )}</h2></div> <label class="control-field period-field svelte-131htjm"><span class="svelte-131htjm">Time period</span> `);
      $$renderer2.select(
        { value: selectedPeriod, class: "" },
        ($$renderer3) => {
          $$renderer3.push(`<!--[-->`);
          const each_array_4 = ensure_array_like(periodOptions);
          for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
            let period = each_array_4[$$index_4];
            $$renderer3.option({ value: period.id }, ($$renderer4) => {
              $$renderer4.push(`${escape_html(period.label)}`);
            });
          }
          $$renderer3.push(`<!--]-->`);
        },
        "svelte-131htjm"
      );
      $$renderer2.push(`</label></div> `);
      {
        $$renderer2.push("<!--[0-->");
        {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> `);
        {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<section class="content-grid receiver-layout svelte-131htjm"><div class="receiver-grid-guide svelte-131htjm" aria-hidden="true"><!--[-->`);
          const each_array_5 = ensure_array_like(Array.from({ length: 12 }, (_, index) => index + 1));
          for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
            let column = each_array_5[$$index_5];
            $$renderer2.push(`<span class="svelte-131htjm">C${escape_html(column)}</span>`);
          }
          $$renderer2.push(`<!--]--></div> <!--[-->`);
          const each_array_6 = ensure_array_like(Array.from({ length: 6 }, (_, index) => index + 1));
          for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
            let row = each_array_6[$$index_6];
            $$renderer2.push(`<div${attr_class(`receiver-row-guide row-${stringify(row)}`, "svelte-131htjm")} aria-hidden="true"><span class="svelte-131htjm">R${escape_html(row)}</span></div>`);
          }
          $$renderer2.push(`<!--]--> <div class="stack svelte-131htjm"><article class="subpanel svelte-131htjm"><span class="grid-ref svelte-131htjm">R1 C1-7</span> <div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Immediate focus</span> <h3 class="svelte-131htjm">Queries and exceptions needing attention</h3></div></div> <div class="receiver-pressure-layout svelte-131htjm"><div${attr_class(`hero-score ${stringify(pressureBandClass(communityPressureBand.label))}`, "svelte-131htjm")}><span class="hero-label svelte-131htjm">Community pressure</span> <strong class="svelte-131htjm">${escape_html(communityPressure)}</strong> <span class="hero-note svelte-131htjm">${escape_html(communityPressureBand.label)} pressure: ${escape_html(communityPressureBand.note)}</span> <div class="hero-actions-row svelte-131htjm"><button class="helper-trigger svelte-131htjm">What this means</button> <button class="helper-trigger svelte-131htjm">${escape_html("Detail")}</button></div> `);
          {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--></div> <div class="queue-grid svelte-131htjm"><!--[-->`);
          const each_array_8 = ensure_array_like(communityPriorityQueues);
          for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
            let queue = each_array_8[$$index_8];
            $$renderer2.push(`<button${attr_class(`queue-card ${stringify(queue.severity)}`, "svelte-131htjm")}><div class="queue-top svelte-131htjm"><span${attr_class(`severity-pill ${stringify(queue.severity)}`, "svelte-131htjm")}>${escape_html(queue.severity)}</span> <strong class="svelte-131htjm">${escape_html(queue.count)}</strong></div> <h4 class="svelte-131htjm">${escape_html(queue.title)}</h4> <p class="svelte-131htjm">${escape_html(queue.detail)}</p> <span class="queue-action svelte-131htjm">${escape_html(queue.action)}</span></button>`);
          }
          $$renderer2.push(`<!--]--></div></div></article> <section class="receiver-lower-right svelte-131htjm"><article class="subpanel svelte-131htjm"><span class="grid-ref svelte-131htjm">R4 C8-12</span> <div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Tracked activity</span> <h3 class="svelte-131htjm">Latest transactions and exceptions</h3></div></div> <div class="transaction-grid svelte-131htjm"><!--[-->`);
          const each_array_9 = ensure_array_like(communityTransactions.slice(0, 3));
          for (let $$index_9 = 0, $$length = each_array_9.length; $$index_9 < $$length; $$index_9++) {
            let item = each_array_9[$$index_9];
            $$renderer2.push(`<button class="transaction-card compact-activity-card svelte-131htjm"><div class="activity-type-row svelte-131htjm"><span class="card-type svelte-131htjm">${escape_html(item.type)}</span> <span class="activity-party-chip svelte-131htjm">${escape_html(item.party)}</span></div> <h4 class="svelte-131htjm">${escape_html(item.reference)}</h4> <div class="transaction-footer compact-activity-footer svelte-131htjm"><span class="activity-summary svelte-131htjm">${escape_html(item.amount)} • ${escape_html(item.nextMilestone)} • ${escape_html(item.nextEta)}</span> <span${attr_class(`status-pill ${stringify(toneClass(item.statusTone))}`, "svelte-131htjm")}>${escape_html(item.status)}</span></div></button>`);
          }
          $$renderer2.push(`<!--]--></div></article> <article class="subpanel heatmap-panel svelte-131htjm"><span class="grid-ref svelte-131htjm">R4 C8-12</span> <div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Query demand</span> <h3 class="svelte-131htjm">When queries are typically logged</h3></div> <div class="mini-switch svelte-131htjm"><button${attr_class("mini-switch-btn svelte-131htjm", void 0, { "active": heatmapMode === "weekday" })}>Day / hour</button> <button${attr_class("mini-switch-btn svelte-131htjm", void 0, { "active": heatmapMode === "monthday" })}>Month pattern</button></div></div> <div class="heatmap-shell svelte-131htjm"><div class="heatmap-header svelte-131htjm"${attr_style(`grid-template-columns: 72px repeat(${currentHeatmap.columns.length}, minmax(0, 1fr));`)}><span class="svelte-131htjm"></span> <!--[-->`);
          const each_array_10 = ensure_array_like(currentHeatmap.columns);
          for (let $$index_10 = 0, $$length = each_array_10.length; $$index_10 < $$length; $$index_10++) {
            let column = each_array_10[$$index_10];
            $$renderer2.push(`<span class="svelte-131htjm">${escape_html(column)}</span>`);
          }
          $$renderer2.push(`<!--]--></div> <!--[-->`);
          const each_array_11 = ensure_array_like(currentHeatmap.values);
          for (let rowIndex = 0, $$length = each_array_11.length; rowIndex < $$length; rowIndex++) {
            let row = each_array_11[rowIndex];
            $$renderer2.push(`<div class="heatmap-row svelte-131htjm"${attr_style(`grid-template-columns: 72px repeat(${currentHeatmap.columns.length}, minmax(0, 1fr));`)}><span class="heatmap-label svelte-131htjm">${escape_html(currentHeatmap.labels[rowIndex])}</span> <!--[-->`);
            const each_array_12 = ensure_array_like(row);
            for (let $$index_11 = 0, $$length2 = each_array_12.length; $$index_11 < $$length2; $$index_11++) {
              let value = each_array_12[$$index_11];
              $$renderer2.push(`<div class="heatmap-cell svelte-131htjm"${attr_style(`background: hsl(${120 * (1 - (value - currentHeatmapMin) / Math.max(1, currentHeatmapMax - currentHeatmapMin))} 72% 48%);`)}${attr("title", `${value} queries`)}>${escape_html(value)}</div>`);
            }
            $$renderer2.push(`<!--]--></div>`);
          }
          $$renderer2.push(`<!--]--></div> <p class="heatmap-note svelte-131htjm">Use this to spot repeat demand windows and plan cover for month end, weekday peaks, and late-afternoon escalation periods.</p></article></section> <article class="subpanel svelte-131htjm"><span class="grid-ref svelte-131htjm">R2 C1-7</span> <div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Query outcomes</span> <h3 class="svelte-131htjm">Self-service and workflow performance</h3></div></div> <section class="top-summary-row receiver-top svelte-131htjm"><div class="value-card svelte-131htjm"><span class="hero-label svelte-131htjm">Self-managed queries</span> <div class="hero-statline svelte-131htjm"><strong class="svelte-131htjm">${escape_html(currentReceiverMetrics.selfManaged.value)}</strong> <span class="hero-ratio svelte-131htjm">(${escape_html(currentReceiverMetrics.selfManaged.change.split(" ")[0])} of all queries)</span></div> <span class="hero-note svelte-131htjm">${escape_html(currentReceiverMetrics.valueSummary)}</span></div> <div class="metric-grid top-metrics svelte-131htjm"><article class="metric-card svelte-131htjm"><span class="metric-title svelte-131htjm">Managed through Community</span> <strong class="metric-value svelte-131htjm">${escape_html(currentReceiverMetrics.managedInSystem.value)}</strong> <span class="metric-change medium svelte-131htjm">${escape_html(currentReceiverMetrics.managedInSystem.change)}</span></article> <article class="metric-card accent-high svelte-131htjm"><span class="metric-title svelte-131htjm">Outstanding queries</span> <strong class="metric-value svelte-131htjm">${escape_html(currentReceiverMetrics.outstanding.value)}</strong> <span class="metric-change high svelte-131htjm">${escape_html(currentReceiverMetrics.outstanding.change)}</span></article> <article class="metric-card svelte-131htjm"><span class="metric-title svelte-131htjm">Average first response</span> <strong class="metric-value svelte-131htjm">${escape_html(currentReceiverMetrics.avgResponse.value)}</strong> <span class="metric-change good svelte-131htjm">${escape_html(currentReceiverMetrics.avgResponse.change)}</span></article></div></section></article> <article class="subpanel svelte-131htjm"><span class="grid-ref svelte-131htjm">R6 C1-4</span> <div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Team breakdown</span> <h3 class="svelte-131htjm">Assigned workload and SLA performance</h3></div></div> <div class="team-breakdown-list svelte-131htjm"><!--[-->`);
          const each_array_13 = ensure_array_like(currentReceiverUserBreakdown);
          for (let $$index_13 = 0, $$length = each_array_13.length; $$index_13 < $$length; $$index_13++) {
            let row = each_array_13[$$index_13];
            $$renderer2.push(`<article class="team-member-card svelte-131htjm"><div class="team-member-head svelte-131htjm"><div><strong class="svelte-131htjm">${escape_html(row.user)}</strong> <span class="svelte-131htjm">${escape_html(row.assigned)} assigned • ${escape_html(row.closed)} closed</span></div> <span${attr_class(`status-pill ${stringify(row.nearBreach > 7 ? "critical" : row.nearBreach > 4 ? "high" : "good")}`, "svelte-131htjm")}>${escape_html(row.nearBreach)} near breach</span></div> <div class="team-stats-grid svelte-131htjm"><button class="team-stat-button svelte-131htjm"><span class="metric-title svelte-131htjm">Response SLA</span> <strong class="svelte-131htjm">${escape_html(row.responseSla)}</strong></button> <button class="team-stat-button svelte-131htjm"><span class="metric-title svelte-131htjm">Resolution SLA</span> <strong class="svelte-131htjm">${escape_html(row.resolutionSla)}</strong></button> <button class="team-stat-button svelte-131htjm"><span class="metric-title svelte-131htjm">Avg response</span> <strong class="svelte-131htjm">${escape_html(row.avgResponse)}</strong></button> <button class="team-stat-button svelte-131htjm"><span class="metric-title svelte-131htjm">Avg resolution</span> <strong class="svelte-131htjm">${escape_html(row.avgResolution)}</strong></button> <button class="team-stat-button svelte-131htjm"><span class="metric-title svelte-131htjm">Outstanding</span> <strong class="svelte-131htjm">${escape_html(row.outstanding)}</strong></button> <button class="team-stat-button svelte-131htjm"><span class="metric-title svelte-131htjm">Close to SLA</span> <strong class="svelte-131htjm">${escape_html(row.nearBreach)}</strong></button></div></article>`);
          }
          $$renderer2.push(`<!--]--></div></article> <section class="receiver-left-lower svelte-131htjm"><article class="subpanel svelte-131htjm"><span class="grid-ref svelte-131htjm">R5 C1-4</span> <div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Sender hotspots</span> <h3 class="svelte-131htjm">Who is creating the most avoidable workload</h3></div></div> <div class="sender-hotspot-list svelte-131htjm"><!--[-->`);
          const each_array_14 = ensure_array_like(currentReceiverSenderMix);
          for (let $$index_14 = 0, $$length = each_array_14.length; $$index_14 < $$length; $$index_14++) {
            let row = each_array_14[$$index_14];
            $$renderer2.push(`<article class="sender-hotspot-card svelte-131htjm"><div class="sender-hotspot-head svelte-131htjm"><div><strong class="svelte-131htjm">${escape_html(row.sender)}</strong> <span class="svelte-131htjm">${escape_html(row.transactions)} transactions • ${escape_html(row.queries)} queries raised</span></div> <span${attr_class(`status-pill ${stringify(row.tone)}`, "svelte-131htjm")}>${escape_html(row.queryRate)}</span></div> <p class="svelte-131htjm">${escape_html(row.context)}</p></article>`);
          }
          $$renderer2.push(`<!--]--></div></article> <article class="subpanel svelte-131htjm"><span class="grid-ref svelte-131htjm">R5 C1-4</span> <div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Insight signals</span> <h3 class="svelte-131htjm">Operational analytics in view</h3></div></div> <section class="analytics-grid svelte-131htjm"><!--[-->`);
          const each_array_15 = ensure_array_like(communityInsights);
          for (let $$index_15 = 0, $$length = each_array_15.length; $$index_15 < $$length; $$index_15++) {
            let insight = each_array_15[$$index_15];
            $$renderer2.push(`<article class="metric-card svelte-131htjm"><span class="metric-title svelte-131htjm">${escape_html(insight.label)}</span> <strong class="metric-value svelte-131htjm">${escape_html(insight.value)}</strong></article>`);
          }
          $$renderer2.push(`<!--]--></section></article></section> <article class="subpanel svelte-131htjm"><span class="grid-ref svelte-131htjm">R5 C5-12</span> <div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">AI improvement</span> <h3 class="svelte-131htjm">What can be answered automatically next time</h3></div></div> <div class="metric-grid compact-metrics svelte-131htjm"><article class="metric-card accent-good svelte-131htjm"><span class="metric-title svelte-131htjm">Resolved through inbox AI or self-service</span> <strong class="metric-value svelte-131htjm">${escape_html(currentReceiverAiIntelligence.selfServed.value)}</strong> <span${attr_class(`metric-change ${stringify(currentReceiverAiIntelligence.selfServed.tone)}`, "svelte-131htjm")}>${escape_html(currentReceiverAiIntelligence.selfServed.change)}</span></article> <article class="metric-card accent-high svelte-131htjm"><span class="metric-title svelte-131htjm">Escalated into tracked queries</span> <strong class="metric-value svelte-131htjm">${escape_html(currentReceiverAiIntelligence.escalated.value)}</strong> <span${attr_class(`metric-change ${stringify(currentReceiverAiIntelligence.escalated.tone)}`, "svelte-131htjm")}>${escape_html(currentReceiverAiIntelligence.escalated.change)}</span></article> <article class="metric-card svelte-131htjm"><span class="metric-title svelte-131htjm">Average messages before answer</span> <strong class="metric-value svelte-131htjm">${escape_html(currentReceiverAiIntelligence.avgMessages.value)}</strong> <span${attr_class(`metric-change ${stringify(currentReceiverAiIntelligence.avgMessages.tone)}`, "svelte-131htjm")}>${escape_html(currentReceiverAiIntelligence.avgMessages.change)}</span></article> <article class="metric-card accent-good svelte-131htjm"><span class="metric-title svelte-131htjm">Ready to promote into AI answers</span> <strong class="metric-value svelte-131htjm">${escape_html(currentReceiverAiIntelligence.promoteCount.value)}</strong> <span${attr_class(`metric-change ${stringify(currentReceiverAiIntelligence.promoteCount.tone)}`, "svelte-131htjm")}>${escape_html(currentReceiverAiIntelligence.promoteCount.change)}</span></article></div> <div class="automation-list svelte-131htjm"><!--[-->`);
          const each_array_16 = ensure_array_like(currentReceiverAiIntelligence.categories);
          for (let $$index_16 = 0, $$length = each_array_16.length; $$index_16 < $$length; $$index_16++) {
            let item = each_array_16[$$index_16];
            $$renderer2.push(`<button type="button" class="automation-card actionable-card svelte-131htjm"><div class="automation-head svelte-131htjm"><strong class="svelte-131htjm">${escape_html(item.label)}</strong> <span${attr_class(`status-pill ${stringify(item.tone)}`, "svelte-131htjm")}>${escape_html(item.detail)}</span></div> <p class="svelte-131htjm">${escape_html(item.value)}</p></button>`);
          }
          $$renderer2.push(`<!--]--></div></article></div> <section class="right-stack svelte-131htjm"><span class="grid-ref svelte-131htjm">R1-3 C8-12</span> <article class="subpanel svelte-131htjm"><div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Operational overview</span> <h3 class="svelte-131htjm">Query service levels and workload</h3></div></div> <div class="sla-group-stack svelte-131htjm"><!--[-->`);
          const each_array_17 = ensure_array_like(currentReceiverServiceMetrics.slaGroups);
          for (let $$index_18 = 0, $$length = each_array_17.length; $$index_18 < $$length; $$index_18++) {
            let group = each_array_17[$$index_18];
            $$renderer2.push(`<div class="sla-group svelte-131htjm"><div class="sla-group-head svelte-131htjm"><strong class="svelte-131htjm">${escape_html(group.title)}</strong></div> <div class="service-level-grid svelte-131htjm"><!--[-->`);
            const each_array_18 = ensure_array_like(group.buckets);
            for (let $$index_17 = 0, $$length2 = each_array_18.length; $$index_17 < $$length2; $$index_17++) {
              let bucket = each_array_18[$$index_17];
              $$renderer2.push(`<button${attr_class(`service-level-card ${stringify(bucket.tone)}`, "svelte-131htjm")}><div class="service-level-topline svelte-131htjm"><span${attr_class(`service-level-state ${stringify(bucket.tone)}`, "svelte-131htjm")}>${escape_html(bucket.label)}</span> <span class="service-level-detail svelte-131htjm">${escape_html(bucket.share)}</span></div> <strong class="service-level-value svelte-131htjm">${escape_html(bucket.value)}</strong></button>`);
            }
            $$renderer2.push(`<!--]--></div></div>`);
          }
          $$renderer2.push(`<!--]--></div> <div class="metric-grid compact-metrics svelte-131htjm"><!--[-->`);
          const each_array_19 = ensure_array_like(currentReceiverServiceMetrics.metrics.filter((metric) => metric.key));
          for (let $$index_19 = 0, $$length = each_array_19.length; $$index_19 < $$length; $$index_19++) {
            let metric = each_array_19[$$index_19];
            $$renderer2.push(`<article class="metric-card operational-card svelte-131htjm"><span class="metric-title svelte-131htjm">${escape_html(metric.title)}</span> <div class="operational-statline svelte-131htjm"><button class="metric-link svelte-131htjm"><strong class="metric-value svelte-131htjm">${escape_html(metric.value)}</strong></button> <button${attr_class(`metric-subaction ${stringify(metric.tone)}`, "svelte-131htjm")}><span class="svelte-131htjm">(${escape_html(metric.urgentValue)} ${escape_html(metric.urgentLabel)})</span></button></div> <span class="metric-summary svelte-131htjm">${escape_html(metric.summary)}</span></article>`);
          }
          $$renderer2.push(`<!--]--></div> <div class="metric-grid compact-metrics compact-secondary svelte-131htjm"><!--[-->`);
          const each_array_20 = ensure_array_like(currentReceiverServiceMetrics.metrics.filter((metric) => !metric.key));
          for (let $$index_20 = 0, $$length = each_array_20.length; $$index_20 < $$length; $$index_20++) {
            let metric = each_array_20[$$index_20];
            $$renderer2.push(`<article class="metric-card svelte-131htjm"><span class="metric-title svelte-131htjm">${escape_html(metric.title)}</span> <strong class="metric-value svelte-131htjm">${escape_html(metric.value)}</strong> <span${attr_class(`metric-change ${stringify(metric.tone)}`, "svelte-131htjm")}>${escape_html(metric.change)}</span></article>`);
          }
          $$renderer2.push(`<!--]--></div></article> <article class="embedded-widget svelte-131htjm"><div class="section-head operational-subsection svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Value breakdown</span> <h3 class="svelte-131htjm">Top self-service categories</h3></div></div> <div class="reason-grid svelte-131htjm"><!--[-->`);
          const each_array_21 = ensure_array_like(currentReceiverMetrics.topReasons);
          for (let $$index_21 = 0, $$length = each_array_21.length; $$index_21 < $$length; $$index_21++) {
            let reason = each_array_21[$$index_21];
            $$renderer2.push(`<article class="reason-card svelte-131htjm"><strong class="svelte-131htjm">${escape_html(reason.count)}</strong> <span class="svelte-131htjm">${escape_html(reason.label)}</span></article>`);
          }
          $$renderer2.push(`<!--]--></div></article></section></section>`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else if (activeTab === "insights") {
      $$renderer2.push("<!--[3-->");
      $$renderer2.push(`<div class="dashboard-shell svelte-131htjm">`);
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<section class="insights-shell svelte-131htjm"><section class="insights-summary-grid receiver-top svelte-131htjm"><article class="detail-card insight-focus-banner svelte-131htjm"><div><span class="section-kicker svelte-131htjm">Insight focus</span> <strong class="svelte-131htjm">${escape_html(getReceiverInsightFocusCard().title)}</strong> <p class="svelte-131htjm">${escape_html(getReceiverInsightFocusCard().summary)}</p></div> `);
        if (getReceiverInsightFocusMeta()) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<button class="ghost-btn svelte-131htjm">Clear focus</button>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></article> <!--[-->`);
        const each_array_40 = ensure_array_like(currentReceiverInsights.overview);
        for (let $$index_40 = 0, $$length = each_array_40.length; $$index_40 < $$length; $$index_40++) {
          let item = each_array_40[$$index_40];
          $$renderer2.push(`<article class="metric-card svelte-131htjm"><span class="metric-title svelte-131htjm">${escape_html(item.label)}</span> <strong class="metric-value svelte-131htjm">${escape_html(item.value)}</strong> <span class="metric-summary svelte-131htjm">${escape_html(item.note)}</span></article>`);
        }
        $$renderer2.push(`<!--]--></section> <section class="insights-grid svelte-131htjm"><article class="subpanel svelte-131htjm"><div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Query themes</span> <h3 class="svelte-131htjm">What users are asking about most</h3></div></div> <div class="insight-list svelte-131htjm"><!--[-->`);
        const each_array_41 = ensure_array_like(currentReceiverInsights.themes);
        for (let $$index_41 = 0, $$length = each_array_41.length; $$index_41 < $$length; $$index_41++) {
          let theme = each_array_41[$$index_41];
          $$renderer2.push(`<article${attr_class("insight-card svelte-131htjm", void 0, { "active": receiverInsightsFocus === theme.key })}><div class="insight-card-head svelte-131htjm"><div><strong class="svelte-131htjm">${escape_html(theme.label)}</strong> <span class="svelte-131htjm">${escape_html(theme.count)} queries • ${escape_html(theme.share)} of manual volume</span></div></div> <p class="svelte-131htjm">${escape_html(theme.trend)}</p> <span class="insight-note svelte-131htjm">${escape_html(theme.automation)}</span> <div class="insight-actions svelte-131htjm"><button class="ghost-btn svelte-131htjm">View matching queries</button> <button class="ghost-btn svelte-131htjm">Improve answer path</button></div></article>`);
        }
        $$renderer2.push(`<!--]--></div></article> <article class="subpanel svelte-131htjm"><div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">AI improvements</span> <h3 class="svelte-131htjm">Where better answers would reduce workload</h3></div></div> <div class="insight-list svelte-131htjm"><!--[-->`);
        const each_array_42 = ensure_array_like(currentReceiverAiIntelligence.categories);
        for (let $$index_42 = 0, $$length = each_array_42.length; $$index_42 < $$length; $$index_42++) {
          let item = each_array_42[$$index_42];
          $$renderer2.push(`<article${attr_class("insight-card svelte-131htjm", void 0, {
            "active": receiverInsightsFocus === getAiOpportunityKey(item.label)
          })}><div class="insight-card-head svelte-131htjm"><div><strong class="svelte-131htjm">${escape_html(item.label)}</strong> <span class="svelte-131htjm">${escape_html(item.detail)}</span></div></div> <p class="svelte-131htjm">${escape_html(item.value)}</p> <span class="insight-note svelte-131htjm">${escape_html(item.label === "High-friction escalations" ? "Review the escalated journeys that are still pushing work to the team." : item.label === "Best automation opportunity" ? "Promote the most repeatable answers into EVA to reduce manual handling next time." : item.label === "Next knowledge update" ? "Publish focused guidance so EVA can answer this before a tracked query is needed." : "Approve closed manual resolutions so EVA can replay them automatically next time.")}</span> <div class="insight-actions svelte-131htjm"><button class="ghost-btn svelte-131htjm">View matching queries</button> <button class="ghost-btn svelte-131htjm">${escape_html(item.label === "High-friction escalations" || item.label === "Best automation opportunity" ? "Improve with data" : item.label === "Next knowledge update" ? "Publish guidance" : "Review reusable answers")}</button></div></article>`);
        }
        $$renderer2.push(`<!--]--></div></article></section> <section class="insights-grid narrow-right svelte-131htjm"><article class="subpanel svelte-131htjm"><div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Problem senders</span> <h3 class="svelte-131htjm">Disproportionate query demand by sender</h3></div></div> <div class="sender-hotspot-list svelte-131htjm"><!--[-->`);
        const each_array_43 = ensure_array_like(currentReceiverInsights.senderPatterns);
        for (let $$index_43 = 0, $$length = each_array_43.length; $$index_43 < $$length; $$index_43++) {
          let item = each_array_43[$$index_43];
          $$renderer2.push(`<article class="sender-hotspot-card svelte-131htjm"><div class="sender-hotspot-head svelte-131htjm"><div><strong class="svelte-131htjm">${escape_html(item.sender)}</strong> <span class="svelte-131htjm">${escape_html(item.detail)}</span></div> <span class="status-pill high svelte-131htjm">${escape_html(item.rate)}</span></div> <p class="svelte-131htjm">${escape_html(item.theme)}</p> <div class="action-row svelte-131htjm"><button class="ghost-btn svelte-131htjm">View queries</button> <button class="ghost-btn svelte-131htjm">Review setup</button></div></article>`);
        }
        $$renderer2.push(`<!--]--></div></article> <article class="subpanel svelte-131htjm"><div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Signals</span> <h3 class="svelte-131htjm">Recurring patterns worth acting on</h3></div></div> <div class="trend-list svelte-131htjm"><!--[-->`);
        const each_array_44 = ensure_array_like(currentReceiverInsights.signals);
        for (let $$index_44 = 0, $$length = each_array_44.length; $$index_44 < $$length; $$index_44++) {
          let signal = each_array_44[$$index_44];
          $$renderer2.push(`<span class="svelte-131htjm">${escape_html(signal)}</span>`);
        }
        $$renderer2.push(`<!--]--></div></article></section> <section class="insights-grid wide-left svelte-131htjm"><article class="subpanel svelte-131htjm"><div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Knowledge updates</span> <h3 class="svelte-131htjm">What should feed future AI answers</h3></div></div> <div class="insight-list svelte-131htjm"><!--[-->`);
        const each_array_45 = ensure_array_like(currentReceiverInsights.knowledgeCandidates);
        for (let $$index_45 = 0, $$length = each_array_45.length; $$index_45 < $$length; $$index_45++) {
          let item = each_array_45[$$index_45];
          $$renderer2.push(`<article${attr_class("insight-card svelte-131htjm", void 0, { "active": receiverInsightsFocus === item.key })}><div class="insight-card-head svelte-131htjm"><div><strong class="svelte-131htjm">${escape_html(item.title)}</strong> <span class="svelte-131htjm">${escape_html(item.count)} opportunities</span></div></div> <p class="svelte-131htjm">${escape_html(item.detail)}</p> <div class="insight-actions svelte-131htjm"><button class="ghost-btn svelte-131htjm">View matching queries</button> <button class="ghost-btn svelte-131htjm">${escape_html(item.actionLabel)}</button></div></article>`);
        }
        $$renderer2.push(`<!--]--></div></article> <article class="subpanel svelte-131htjm"><div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Current signals</span> <h3 class="svelte-131htjm">High-level measures in view</h3></div></div> <section class="analytics-grid svelte-131htjm"><!--[-->`);
        const each_array_46 = ensure_array_like(communityInsights);
        for (let $$index_46 = 0, $$length = each_array_46.length; $$index_46 < $$length; $$index_46++) {
          let insight = each_array_46[$$index_46];
          $$renderer2.push(`<article class="metric-card svelte-131htjm"><span class="metric-title svelte-131htjm">${escape_html(insight.label)}</span> <strong class="metric-value svelte-131htjm">${escape_html(insight.value)}</strong></article>`);
        }
        $$renderer2.push(`<!--]--></section></article></section></section>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else if (activeTab === "queries") {
      $$renderer2.push("<!--[4-->");
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="dashboard-shell svelte-131htjm"><section class="insights-summary-grid sender-query-summary-grid receiver-query-sla-grid svelte-131htjm"><article class="metric-card sender-query-summary-card svelte-131htjm"><span class="metric-title svelte-131htjm">Response SLA</span> <strong class="metric-value svelte-131htjm">${escape_html(receiverResponseSlaSummary.total)}</strong> <span class="metric-summary svelte-131htjm">${escape_html(receiverResponseSlaSummary.close)} close to breach • ${escape_html(receiverResponseSlaSummary.missed)} missed</span></article> <article class="metric-card sender-query-summary-card svelte-131htjm"><span class="metric-title svelte-131htjm">Resolution SLA</span> <strong class="metric-value svelte-131htjm">${escape_html(receiverClosureSlaSummary.total)}</strong> <span class="metric-summary svelte-131htjm">${escape_html(receiverClosureSlaSummary.close)} close to breach • ${escape_html(receiverClosureSlaSummary.missed)} missed</span></article> <!--[-->`);
        const each_array_52 = ensure_array_like(receiverQueryStatusSummary);
        for (let $$index_52 = 0, $$length = each_array_52.length; $$index_52 < $$length; $$index_52++) {
          let item = each_array_52[$$index_52];
          $$renderer2.push(`<button class="metric-card sender-query-summary-card svelte-131htjm"><span class="metric-title svelte-131htjm">${escape_html(senderQueryStatusLabel(item.status))}</span> <strong class="metric-value svelte-131htjm">${escape_html(item.count)}</strong> <span class="metric-summary svelte-131htjm">${escape_html(item.breakdown)}</span></button>`);
        }
        $$renderer2.push(`<!--]--></section> <div class="workspace-shell svelte-131htjm"><aside class="workspace-list svelte-131htjm"><div class="toolbar-row svelte-131htjm"><label class="control-field slim svelte-131htjm"><span class="svelte-131htjm">Type</span> `);
        $$renderer2.select(
          { value: transactionFilter, class: "" },
          ($$renderer3) => {
            $$renderer3.push(`<!--[-->`);
            const each_array_53 = ensure_array_like(transactionTypes);
            for (let $$index_53 = 0, $$length = each_array_53.length; $$index_53 < $$length; $$index_53++) {
              let type = each_array_53[$$index_53];
              $$renderer3.option({ value: type }, ($$renderer4) => {
                $$renderer4.push(`${escape_html(type)}`);
              });
            }
            $$renderer3.push(`<!--]-->`);
          },
          "svelte-131htjm"
        );
        $$renderer2.push(`</label> <label class="control-field slim svelte-131htjm"><span class="svelte-131htjm">Query status</span> `);
        $$renderer2.select(
          { value: statusFilter, class: "" },
          ($$renderer3) => {
            $$renderer3.push(`<!--[-->`);
            const each_array_54 = ensure_array_like(receiverQueryStatusOptions);
            for (let $$index_54 = 0, $$length = each_array_54.length; $$index_54 < $$length; $$index_54++) {
              let status = each_array_54[$$index_54];
              $$renderer3.option({ value: status }, ($$renderer4) => {
                $$renderer4.push(`${escape_html(senderQueryStatusLabel(status))}`);
              });
            }
            $$renderer3.push(`<!--]-->`);
          },
          "svelte-131htjm"
        );
        $$renderer2.push(`</label></div> <div class="automation-filter-row svelte-131htjm" aria-label="Automation query filter"><span class="automation-stage-cog automation-filter-cog svelte-131htjm" aria-hidden="true"><span class="svelte-131htjm">A</span></span> <div class="automation-filter-options svelte-131htjm"><button type="button"${attr_class("automation-filter-btn tick svelte-131htjm", void 0, { "active": automationFilter === "Only automated" })} title="Only automated" aria-label="Show only automated queries"><svg viewBox="0 0 24 24" aria-hidden="true" class="svelte-131htjm"><path d="M5 13l4 4L19 7"></path></svg></button> <button type="button"${attr_class("automation-filter-btn cross svelte-131htjm", void 0, { "active": automationFilter === "Exclude automated" })} title="Exclude automated" aria-label="Exclude automated queries"><svg viewBox="0 0 24 24" aria-hidden="true" class="svelte-131htjm"><path d="M7 7l10 10M17 7L7 17"></path></svg></button></div></div> <div class="workspace-summary svelte-131htjm"><strong class="svelte-131htjm">${escape_html(filteredTransactions.length)}</strong> <span class="svelte-131htjm">${escape_html(workspaceSummary)}</span></div> `);
        {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <div class="list-stack svelte-131htjm"><!--[-->`);
        const each_array_55 = ensure_array_like(displayedTransactions);
        for (let $$index_55 = 0, $$length = each_array_55.length; $$index_55 < $$length; $$index_55++) {
          let item = each_array_55[$$index_55];
          $$renderer2.push(`<button${attr_class("list-item svelte-131htjm", void 0, { "active": selectedTransaction.id === item.id })}><div class="list-top svelte-131htjm"><strong>${escape_html(getCommunityQueryReference(item))}</strong> <span class="list-top-badges svelte-131htjm">`);
          if (item.automatedSequence) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<span class="automation-stage-cog svelte-131htjm"${attr("aria-label", `Automated workflow sequence ${item.automatedSequence.currentStep} of ${item.automatedSequence.totalSteps}`)}><span class="svelte-131htjm">${escape_html(item.automatedSequence.currentStep)}</span></span>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--> <span${attr_class(`status-pill ${stringify(toneClass(receiverQueryStatusTone(receiverQueryStatus(item))))}`, "svelte-131htjm")}>${escape_html(receiverQueryStatus(item))}</span></span></div> <span class="list-meta svelte-131htjm">Query • ${escape_html(item.party)}</span> <span class="list-meta svelte-131htjm">${escape_html(item.issue)} • ${escape_html(item.reference)} • ${escape_html(item.type)}</span> `);
          if (hasReceiverSla(item)) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<div class="workspace-sla-row svelte-131htjm"><span${attr_class(`sla-chip ${stringify(receiverQuerySla(item).response.tone)}`, "svelte-131htjm")}>Response ${escape_html(receiverQuerySla(item).response.label)}</span> <span${attr_class(`sla-chip ${stringify(receiverQuerySla(item).closure.tone)}`, "svelte-131htjm")}>Resolution ${escape_html(receiverQuerySla(item).closure.label)}</span></div>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--></button>`);
        }
        $$renderer2.push(`<!--]--></div></aside> <div class="workspace-detail svelte-131htjm">`);
        if (selectedTransaction.automatedSequence) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<section class="detail-hero workflow-query-hero svelte-131htjm"><div class="workflow-query-id svelte-131htjm"><span class="section-kicker svelte-131htjm">Workflow sequence query</span> <h2 class="svelte-131htjm">${escape_html(getCommunityQueryReference(selectedTransaction))}</h2> <p class="svelte-131htjm">${escape_html(selectedTransaction.party)}</p></div> <div class="workflow-query-summary svelte-131htjm"><span class="section-kicker svelte-131htjm">Summary</span> <strong class="svelte-131htjm">${escape_html(selectedTransaction.issue)}</strong></div> <div class="workflow-query-actions svelte-131htjm"><div class="detail-badges svelte-131htjm"><span class="automation-detail-pill svelte-131htjm"><span class="svelte-131htjm">${escape_html(selectedTransaction.automatedSequence.currentStep)}</span> ${escape_html(automatedSequenceLabel(selectedTransaction))}</span> <span${attr_class(`status-pill ${stringify(toneClass(receiverQueryStatusTone(receiverQueryStatus(selectedTransaction))))}`, "svelte-131htjm")}>${escape_html(receiverQueryStatus(selectedTransaction))}</span> <span class="detail-amount svelte-131htjm">${escape_html(selectedTransaction.amount)}</span></div> <label class="control-field inline-assignee-field workflow-assignee-field svelte-131htjm"><span class="svelte-131htjm">Assigned user</span> `);
          $$renderer2.select(
            { value: receiverQueryAssignee(selectedTransaction), class: "" },
            ($$renderer3) => {
              $$renderer3.push(`<!--[-->`);
              const each_array_56 = ensure_array_like(apClerkProfiles);
              for (let $$index_56 = 0, $$length = each_array_56.length; $$index_56 < $$length; $$index_56++) {
                let profile = each_array_56[$$index_56];
                $$renderer3.option({ value: profile.name }, ($$renderer4) => {
                  $$renderer4.push(`${escape_html(profile.name)}`);
                });
              }
              $$renderer3.push(`<!--]-->`);
              $$renderer3.option({ value: "AP Query Team" }, ($$renderer4) => {
                $$renderer4.push(`AP Query Team`);
              });
              $$renderer3.option({ value: "Automation" }, ($$renderer4) => {
                $$renderer4.push(`Automation`);
              });
            },
            "svelte-131htjm"
          );
          $$renderer2.push(`</label></div></section> <section class="automation-sequence-panel svelte-131htjm"><div><span class="section-kicker svelte-131htjm">Workflow sequence</span> <h3 class="svelte-131htjm">${escape_html(selectedTransaction.automatedSequence.workflowName)}</h3> <p class="svelte-131htjm">${escape_html(selectedTransaction.automatedSequence.selfCloseCondition)}</p></div> <div class="automation-sequence-status svelte-131htjm"><span class="svelte-131htjm">Stage</span> <strong class="svelte-131htjm">${escape_html(selectedTransaction.automatedSequence.currentStep)} of ${escape_html(selectedTransaction.automatedSequence.totalSteps)}</strong> <p class="svelte-131htjm">${escape_html(selectedTransaction.automatedSequence.lastAction)}</p></div> <div class="automation-sequence-status svelte-131htjm"><span class="svelte-131htjm">Next action</span> <strong class="svelte-131htjm">${escape_html(selectedTransaction.automatedSequence.status)}</strong> <p class="svelte-131htjm">${escape_html(selectedTransaction.automatedSequence.nextAction)}</p></div> <div class="action-row svelte-131htjm"><button class="ghost-btn svelte-131htjm">Pause automation</button> <button class="ghost-btn solid svelte-131htjm">Intervene manually</button></div></section>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<section class="detail-hero standard-query-hero svelte-131htjm"><div class="standard-query-id svelte-131htjm"><span class="section-kicker svelte-131htjm">${escape_html(selectedTransaction.channel)} query</span> <h2 class="svelte-131htjm">${escape_html(getCommunityQueryReference(selectedTransaction))}</h2> <p class="svelte-131htjm">${escape_html(selectedTransaction.party)}</p></div> <div class="standard-query-summary svelte-131htjm"><span class="section-kicker svelte-131htjm">Summary</span> <strong class="svelte-131htjm">${escape_html(selectedTransaction.issue)}</strong></div> <div class="standard-query-actions svelte-131htjm"><div class="detail-badges svelte-131htjm"><span${attr_class(`status-pill ${stringify(toneClass(receiverQueryStatusTone(receiverQueryStatus(selectedTransaction))))}`, "svelte-131htjm")}>${escape_html(receiverQueryStatus(selectedTransaction))}</span> <span class="detail-amount svelte-131htjm">${escape_html(selectedTransaction.amount)}</span></div> <label class="control-field inline-assignee-field standard-assignee-field svelte-131htjm"><span class="svelte-131htjm">Assigned user</span> `);
          $$renderer2.select(
            { value: receiverQueryAssignee(selectedTransaction), class: "" },
            ($$renderer3) => {
              $$renderer3.push(`<!--[-->`);
              const each_array_57 = ensure_array_like(apClerkProfiles);
              for (let $$index_57 = 0, $$length = each_array_57.length; $$index_57 < $$length; $$index_57++) {
                let profile = each_array_57[$$index_57];
                $$renderer3.option({ value: profile.name }, ($$renderer4) => {
                  $$renderer4.push(`${escape_html(profile.name)}`);
                });
              }
              $$renderer3.push(`<!--]-->`);
              $$renderer3.option({ value: "AP Query Team" }, ($$renderer4) => {
                $$renderer4.push(`AP Query Team`);
              });
              $$renderer3.option({ value: "Automation" }, ($$renderer4) => {
                $$renderer4.push(`Automation`);
              });
            },
            "svelte-131htjm"
          );
          $$renderer2.push(`</label></div></section>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (hasReceiverSla(selectedTransaction)) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<section class="standard-sla-strip svelte-131htjm"><article class="standard-sla-item svelte-131htjm"><span class="section-kicker svelte-131htjm">Response SLA</span> <strong class="svelte-131htjm">${escape_html(receiverQuerySla(selectedTransaction).response.label)}</strong></article> <article class="standard-sla-item svelte-131htjm"><span class="section-kicker svelte-131htjm">Resolution SLA</span> <strong class="svelte-131htjm">${escape_html(receiverQuerySla(selectedTransaction).closure.label)}</strong></article> `);
          if (selectedTransaction.responseElapsed) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<article class="standard-sla-item svelte-131htjm"><span class="section-kicker svelte-131htjm">Response elapsed</span> <strong class="svelte-131htjm">${escape_html(selectedTransaction.responseElapsed)}</strong></article>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (selectedTransaction.closureElapsed) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<article class="standard-sla-item svelte-131htjm"><span class="section-kicker svelte-131htjm">Resolution elapsed</span> <strong class="svelte-131htjm">${escape_html(selectedTransaction.closureElapsed)}</strong></article>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--></section>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--> <div class="tabs-row secondary svelte-131htjm"><button${attr_class("tab svelte-131htjm", void 0, { "active": queryDetailTab === "conversation" })}>Conversation</button> <button${attr_class("tab svelte-131htjm", void 0, { "active": queryDetailTab === "related" })}>Related transaction</button></div> `);
        {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<section class="timeline-card svelte-131htjm"><div class="section-head svelte-131htjm"><div><span class="section-kicker svelte-131htjm">Conversation</span> <h3>Query thread</h3></div></div> <div class="thread-list svelte-131htjm">`);
          if (selectedQueryMessages.length) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<!--[-->`);
            const each_array_58 = ensure_array_like(selectedQueryMessages);
            for (let $$index_58 = 0, $$length = each_array_58.length; $$index_58 < $$length; $$index_58++) {
              let message = each_array_58[$$index_58];
              $$renderer2.push(`<div class="thread-item svelte-131htjm"><strong class="svelte-131htjm">${escape_html(message.author)}</strong> <span class="svelte-131htjm">${escape_html(message.time)}</span> <p class="svelte-131htjm">${escape_html(message.text)}</p> `);
              if (message.evaExcluded) {
                $$renderer2.push("<!--[0-->");
                $$renderer2.push(`<span class="thread-flag svelte-131htjm">Excluded from EVA</span>`);
              } else {
                $$renderer2.push("<!--[-1-->");
              }
              $$renderer2.push(`<!--]--></div>`);
            }
            $$renderer2.push(`<!--]-->`);
          } else {
            $$renderer2.push("<!--[-1-->");
            $$renderer2.push(`<div class="thread-item svelte-131htjm"><strong class="svelte-131htjm">No messages yet</strong> <span class="svelte-131htjm">Ready for the first response</span> <p class="svelte-131htjm">This query has been raised but does not yet have a conversation thread.</p></div>`);
          }
          $$renderer2.push(`<!--]--></div> <section class="query-management-panel svelte-131htjm"><div class="section-head compact svelte-131htjm"><div><span class="section-kicker svelte-131htjm">Manage query</span> <h3>Reply and update status</h3></div></div> <div class="query-management-grid svelte-131htjm"><label class="control-field query-reply-field svelte-131htjm"><span class="svelte-131htjm">Reply</span> <textarea rows="4" placeholder="Add your response or update to this query" class="svelte-131htjm">`);
          const $$body_1 = escape_html(receiverReplyText);
          if ($$body_1) {
            $$renderer2.push(`${$$body_1}`);
          }
          $$renderer2.push(`</textarea></label> <label class="control-field svelte-131htjm"><span class="svelte-131htjm">Status</span> `);
          $$renderer2.select(
            { value: receiverStatusDraft, class: "" },
            ($$renderer3) => {
              $$renderer3.push(`<!--[-->`);
              const each_array_59 = ensure_array_like(receiverQueryStatusOptions.filter((item) => item !== "All"));
              for (let $$index_59 = 0, $$length = each_array_59.length; $$index_59 < $$length; $$index_59++) {
                let status = each_array_59[$$index_59];
                $$renderer3.option({ value: status }, ($$renderer4) => {
                  $$renderer4.push(`${escape_html(status)}`);
                });
              }
              $$renderer3.push(`<!--]-->`);
            },
            "svelte-131htjm"
          );
          $$renderer2.push(`</label></div> <label class="checkbox-row svelte-131htjm"><input type="checkbox"${attr("checked", receiverExcludeFromEva, true)} class="svelte-131htjm"/> <span class="svelte-131htjm">Exclude this note from EVA</span></label> <div class="action-row svelte-131htjm"><button class="ghost-btn solid svelte-131htjm">Send response</button> <button class="ghost-btn svelte-131htjm">Save status</button> <button class="ghost-btn svelte-131htjm">Close query</button></div></section></section>`);
        }
        $$renderer2.push(`<!--]--> <section class="timeline-card svelte-131htjm"><div class="section-head svelte-131htjm"><div><span class="section-kicker svelte-131htjm">History</span> <h3>Query timeline</h3></div></div> <div class="timeline svelte-131htjm"><!--[-->`);
        const each_array_62 = ensure_array_like(selectedTransaction.timeline);
        for (let $$index_62 = 0, $$length = each_array_62.length; $$index_62 < $$length; $$index_62++) {
          let step = each_array_62[$$index_62];
          $$renderer2.push(`<div${attr_class(`timeline-item ${stringify(step.state)}`, "svelte-131htjm")}><span class="timeline-dot svelte-131htjm"></span> <div class="svelte-131htjm"><strong class="svelte-131htjm">${escape_html(step.step)}</strong> <p class="svelte-131htjm">${escape_html(step.at)}</p></div></div>`);
        }
        $$renderer2.push(`<!--]--></div></section></div></div></div>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else if (activeTab === "senders" && persona === "receiver") {
      $$renderer2.push("<!--[5-->");
      $$renderer2.push(`<div class="dashboard-shell svelte-131htjm"><div class="dashboard-toolbar svelte-131htjm"><div><span class="section-kicker svelte-131htjm">Sender portfolio</span> <h2 class="dashboard-title svelte-131htjm">${escape_html("Community senders and AP ownership")}</h2></div> `);
      {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div> <section class="sender-portfolio-layout svelte-131htjm"><article class="subpanel sender-portfolio-panel svelte-131htjm"><div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">All senders</span> <h3 class="svelte-131htjm">Query volume, transaction activity, and owner</h3></div></div> <label class="control-field sender-search-field svelte-131htjm"><span class="svelte-131htjm">Search senders</span> <input${attr("value", senderPortfolioSearch)} type="search" placeholder="Search by sender, owner, or latest activity" class="svelte-131htjm"/></label> <div class="sender-portfolio-grid svelte-131htjm"><div class="sender-portfolio-row sender-portfolio-head svelte-131htjm"><span class="svelte-131htjm">Sender</span> <span class="svelte-131htjm">Queries</span> <span class="svelte-131htjm">Transactions</span> <span class="svelte-131htjm">SLA hit</span> <span class="svelte-131htjm">Primary owner</span> <span class="svelte-131htjm">Priority</span></div> <!--[-->`);
      const each_array_73 = ensure_array_like(filteredReceiverSenderPortfolio);
      for (let $$index_73 = 0, $$length = each_array_73.length; $$index_73 < $$length; $$index_73++) {
        let sender = each_array_73[$$index_73];
        $$renderer2.push(`<div${attr_class("sender-portfolio-row svelte-131htjm", void 0, {
          "active": selectedVisibleReceiverSenderRow?.name === sender.name
        })}><button class="sender-row-select svelte-131htjm"><span class="svelte-131htjm"><strong class="svelte-131htjm">${escape_html(sender.name)}</strong> <small class="svelte-131htjm">${escape_html(sender.open)} open • ${escape_html(sender.closed)} closed</small></span> <span class="svelte-131htjm">${escape_html(sender.queries)}</span> <span class="svelte-131htjm">${escape_html(sender.transactions)}</span> <span${attr_class(`status-pill ${stringify(sender.slaRate < 70 ? "high" : "good")}`, "svelte-131htjm")}>${escape_html(sender.slaRate)}%</span> <span class="svelte-131htjm">${escape_html(sender.owner)}</span></button> <span class="svelte-131htjm"><button type="button"${attr_class("priority-star svelte-131htjm", void 0, { "active": sender.priority })}${attr("aria-label", sender.priority ? `Remove ${sender.name} priority` : `Prioritise ${sender.name}`)}>★</button></span></div>`);
      }
      $$renderer2.push(`<!--]--> `);
      if (!filteredReceiverSenderPortfolio.length) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<div class="sender-portfolio-empty svelte-131htjm">No senders match “${escape_html(senderPortfolioSearch)}”.</div>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div></article> `);
      if (selectedVisibleReceiverSenderRow) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<aside class="subpanel sender-detail-panel svelte-131htjm"><div class="section-head svelte-131htjm"><div class="svelte-131htjm"><span class="section-kicker svelte-131htjm">Sender detail</span> <h3 class="sender-detail-title svelte-131htjm">${escape_html(selectedVisibleReceiverSenderRow.name)} <button type="button"${attr_class("priority-star inline-star svelte-131htjm", void 0, { "active": selectedVisibleReceiverSenderRow.priority })}${attr("aria-label", selectedVisibleReceiverSenderRow.priority ? `Remove ${selectedVisibleReceiverSenderRow.name} priority` : `Prioritise ${selectedVisibleReceiverSenderRow.name}`)}>★</button></h3></div> <button class="ghost-btn solid svelte-131htjm">Open in Queries</button></div> <section class="insights-summary-grid sender-detail-stats svelte-131htjm"><article class="metric-card svelte-131htjm"><span class="metric-title svelte-131htjm">Queries logged</span> <strong class="metric-value svelte-131htjm">${escape_html(selectedVisibleReceiverSenderRow.queries)}</strong> <span class="metric-summary svelte-131htjm">${escape_html(selectedVisibleReceiverSenderRow.open)} outstanding</span></article> <article class="metric-card svelte-131htjm"><span class="metric-title svelte-131htjm">Transactions processed</span> <strong class="metric-value svelte-131htjm">${escape_html(selectedVisibleReceiverSenderRow.transactions)}</strong> <span class="metric-summary svelte-131htjm">Selected period estimate</span></article> <article class="metric-card svelte-131htjm"><span class="metric-title svelte-131htjm">SLA hit rate</span> <strong class="metric-value svelte-131htjm">${escape_html(selectedVisibleReceiverSenderRow.slaRate)}%</strong> <span class="metric-summary svelte-131htjm">${escape_html(selectedVisibleReceiverSenderRow.priority ? "Priority sender" : "Standard queue")}</span></article></section> <article class="owner-assignment-row svelte-131htjm"><label class="control-field owner-picker svelte-131htjm"><span class="svelte-131htjm">Primary owner</span> <input list="sender-owner-options"${attr("value", selectedVisibleReceiverSenderRow.owner)}${attr("aria-label", `Primary owner for ${selectedVisibleReceiverSenderRow.name}`)} class="svelte-131htjm"/></label> <datalist id="sender-owner-options"><!--[-->`);
        const each_array_74 = ensure_array_like(apClerkProfiles);
        for (let $$index_74 = 0, $$length = each_array_74.length; $$index_74 < $$length; $$index_74++) {
          let profile = each_array_74[$$index_74];
          $$renderer2.option({ value: profile.name }, ($$renderer3) => {
          });
        }
        $$renderer2.push(`<!--]-->`);
        $$renderer2.option({ value: "AP Query Team" }, ($$renderer3) => {
        });
        $$renderer2.push(`</datalist></article> <div class="sender-query-detail-list svelte-131htjm"><!--[-->`);
        const each_array_75 = ensure_array_like(selectedVisibleReceiverSenderRow.items);
        for (let $$index_75 = 0, $$length = each_array_75.length; $$index_75 < $$length; $$index_75++) {
          let item = each_array_75[$$index_75];
          $$renderer2.push(`<button class="sender-query-detail-card svelte-131htjm"><div class="list-top svelte-131htjm"><strong>${escape_html(getCommunityQueryReference(item))}</strong> <span class="list-top-badges svelte-131htjm">`);
          if (item.automatedSequence) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<span class="automation-stage-cog svelte-131htjm"${attr("aria-label", `Automated workflow sequence ${item.automatedSequence.currentStep} of ${item.automatedSequence.totalSteps}`)}><span class="svelte-131htjm">${escape_html(item.automatedSequence.currentStep)}</span></span>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--> <span${attr_class(`status-pill ${stringify(toneClass(receiverQueryStatusTone(receiverQueryStatus(item))))}`, "svelte-131htjm")}>${escape_html(receiverQueryStatus(item))}</span></span></div> <span class="list-meta svelte-131htjm">${escape_html(item.issue)}</span> `);
          if (hasReceiverSla(item)) {
            $$renderer2.push("<!--[0-->");
            $$renderer2.push(`<div class="workspace-sla-row svelte-131htjm"><span${attr_class(`sla-chip ${stringify(receiverQuerySla(item).response.tone)}`, "svelte-131htjm")}>Response ${escape_html(receiverQuerySla(item).response.label)}</span> <span${attr_class(`sla-chip ${stringify(receiverQuerySla(item).closure.tone)}`, "svelte-131htjm")}>Resolution ${escape_html(receiverQuerySla(item).closure.label)}</span></div>`);
          } else {
            $$renderer2.push("<!--[-1-->");
          }
          $$renderer2.push(`<!--]--></button>`);
        }
        $$renderer2.push(`<!--]--></div></aside>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></section></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<div class="dashboard-shell svelte-131htjm">`);
      {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<section class="dual-grid svelte-131htjm"><article class="detail-card svelte-131htjm"><div class="section-head compact svelte-131htjm"><div><span class="section-kicker svelte-131htjm">Targets</span> <h3>Service level targets</h3></div></div> <div class="settings-grid svelte-131htjm"><label class="control-field svelte-131htjm"><span class="svelte-131htjm">Response target</span> `);
        $$renderer2.select(
          { value: responseTarget, class: "" },
          ($$renderer3) => {
            $$renderer3.option({}, ($$renderer4) => {
              $$renderer4.push(`2 hours`);
            });
            $$renderer3.option({}, ($$renderer4) => {
              $$renderer4.push(`4 hours`);
            });
            $$renderer3.option({}, ($$renderer4) => {
              $$renderer4.push(`8 hours`);
            });
            $$renderer3.option({}, ($$renderer4) => {
              $$renderer4.push(`1 business day`);
            });
          },
          "svelte-131htjm"
        );
        $$renderer2.push(`</label> <label class="control-field svelte-131htjm"><span class="svelte-131htjm">Resolution target</span> `);
        $$renderer2.select(
          { value: closureTarget, class: "" },
          ($$renderer3) => {
            $$renderer3.option({}, ($$renderer4) => {
              $$renderer4.push(`1 day`);
            });
            $$renderer3.option({}, ($$renderer4) => {
              $$renderer4.push(`2 days`);
            });
            $$renderer3.option({}, ($$renderer4) => {
              $$renderer4.push(`3 days`);
            });
            $$renderer3.option({}, ($$renderer4) => {
              $$renderer4.push(`5 days`);
            });
          },
          "svelte-131htjm"
        );
        $$renderer2.push(`</label></div> <div class="modal-summary svelte-131htjm"><strong class="svelte-131htjm">Current targets</strong> <span class="svelte-131htjm">Response target is set to <b>${escape_html(responseTarget)}</b> and resolution target is set to <b>${escape_html(closureTarget)}</b>.</span></div></article> <article class="detail-card svelte-131htjm"><div class="section-head compact svelte-131htjm"><div><span class="section-kicker svelte-131htjm">Access</span> <h3>Roles and notifications</h3></div></div> <div class="role-list svelte-131htjm"><!--[-->`);
        const each_array_76 = ensure_array_like(communityRoleProfiles);
        for (let $$index_76 = 0, $$length = each_array_76.length; $$index_76 < $$length; $$index_76++) {
          let profile = each_array_76[$$index_76];
          $$renderer2.push(`<div class="role-row svelte-131htjm"><div><strong class="svelte-131htjm">${escape_html(profile.role)}</strong> <p class="svelte-131htjm">${escape_html(profile.access)}</p></div> <span class="status-pill neutral svelte-131htjm">${escape_html(profile.users)} users</span></div>`);
        }
        $$renderer2.push(`<!--]--></div></article></section> <section class="settings-stack svelte-131htjm"><article class="detail-card workflow-config-card svelte-131htjm"><div class="section-head compact svelte-131htjm"><div><span class="section-kicker svelte-131htjm">Workflows</span> <h3>Automated sender chasing sequences</h3></div> <label class="workflow-enabled-toggle svelte-131htjm"><input type="checkbox"${attr("checked", workflowAutomationEnabled, true)} class="svelte-131htjm"/> <span>${escape_html("Enabled")}</span></label></div> <section class="workflow-config-hero svelte-131htjm"><div><strong class="svelte-131htjm">Overdue payment chase</strong> <p class="svelte-131htjm">Opens a query automatically when a payment is overdue, records every chase step, allows manual intervention,
                  and self-closes when payment is received.</p></div> <label class="control-field workflow-step-count svelte-131htjm"><span class="svelte-131htjm">Steps in sequence</span> <input type="number" min="1" max="6"${attr("value", workflowStepCount)} class="svelte-131htjm"/></label></section> <div class="workflow-step-list svelte-131htjm"><!--[-->`);
        const each_array_77 = ensure_array_like(workflowSequenceSteps);
        for (let index = 0, $$length = each_array_77.length; index < $$length; index++) {
          let step = each_array_77[index];
          $$renderer2.push(`<article class="workflow-step-card svelte-131htjm"><div class="workflow-step-number svelte-131htjm">${escape_html(step.sequence)}</div> <label class="control-field svelte-131htjm"><span class="svelte-131htjm">Trigger</span> <div class="workflow-inline-input svelte-131htjm"><input type="number" min="0"${attr("value", step.triggerDays)} class="svelte-131htjm"/> <span class="svelte-131htjm">days after due date</span></div></label> <label class="control-field svelte-131htjm"><span class="svelte-131htjm">Action</span> `);
          $$renderer2.select(
            { value: step.action, class: "" },
            ($$renderer3) => {
              $$renderer3.option({}, ($$renderer4) => {
                $$renderer4.push(`Send email template`);
              });
              $$renderer3.option({}, ($$renderer4) => {
                $$renderer4.push(`Open portal notification`);
              });
              $$renderer3.option({}, ($$renderer4) => {
                $$renderer4.push(`Escalate to human`);
              });
              $$renderer3.option({}, ($$renderer4) => {
                $$renderer4.push(`Pause for review`);
              });
            },
            "svelte-131htjm"
          );
          $$renderer2.push(`</label> <label class="control-field svelte-131htjm"><span class="svelte-131htjm">Template</span> `);
          $$renderer2.select(
            { value: step.template, class: "" },
            ($$renderer3) => {
              $$renderer3.option({}, ($$renderer4) => {
                $$renderer4.push(`Payment overdue reminder`);
              });
              $$renderer3.option({}, ($$renderer4) => {
                $$renderer4.push(`Second payment chase`);
              });
              $$renderer3.option({}, ($$renderer4) => {
                $$renderer4.push(`Final reminder before escalation`);
              });
              $$renderer3.option({}, ($$renderer4) => {
                $$renderer4.push(`Credit control escalation`);
              });
            },
            "svelte-131htjm"
          );
          $$renderer2.push(`</label> <label class="control-field svelte-131htjm"><span class="svelte-131htjm">Owner</span> `);
          $$renderer2.select(
            { value: step.owner, class: "" },
            ($$renderer3) => {
              $$renderer3.option({}, ($$renderer4) => {
                $$renderer4.push(`Automation`);
              });
              $$renderer3.option({}, ($$renderer4) => {
                $$renderer4.push(`AP Query Team`);
              });
              $$renderer3.push(`<!--[-->`);
              const each_array_78 = ensure_array_like(apClerkProfiles);
              for (let $$index_77 = 0, $$length2 = each_array_78.length; $$index_77 < $$length2; $$index_77++) {
                let profile = each_array_78[$$index_77];
                $$renderer3.option({}, profile.name);
              }
              $$renderer3.push(`<!--]-->`);
            },
            "svelte-131htjm"
          );
          $$renderer2.push(`</label></article>`);
        }
        $$renderer2.push(`<!--]--></div> <div class="modal-summary svelte-131htjm"><strong class="svelte-131htjm">Self-closing rule</strong> <span class="svelte-131htjm">If the linked invoice is paid, the workflow closes the query automatically and records the settlement event in the timeline.</span></div></article> <article class="detail-card ai-data-card svelte-131htjm"><div class="section-head compact svelte-131htjm"><div><span class="section-kicker svelte-131htjm">AI knowledge and data</span> <h3>What EVA can use and how you manage it</h3></div> <div class="action-row svelte-131htjm"><button class="ghost-btn solid svelte-131htjm">Upload knowledge file</button> <button class="ghost-btn svelte-131htjm">Manage approvals</button></div></div> <section class="analytics-grid svelte-131htjm"><!--[-->`);
        const each_array_79 = ensure_array_like(receiverAiDataSettings.overview);
        for (let $$index_79 = 0, $$length = each_array_79.length; $$index_79 < $$length; $$index_79++) {
          let item = each_array_79[$$index_79];
          $$renderer2.push(`<article class="metric-card svelte-131htjm"><span class="metric-title svelte-131htjm">${escape_html(item.label)}</span> <strong class="metric-value svelte-131htjm">${escape_html(item.value)}</strong> <span class="metric-summary svelte-131htjm">${escape_html(item.note)}</span></article>`);
        }
        $$renderer2.push(`<!--]--></section> <div class="ai-data-grid svelte-131htjm"><!--[-->`);
        const each_array_80 = ensure_array_like(receiverAiDataSettings.sources);
        for (let $$index_81 = 0, $$length = each_array_80.length; $$index_81 < $$length; $$index_81++) {
          let source = each_array_80[$$index_81];
          $$renderer2.push(`<article${attr_class("insight-card ai-source-card svelte-131htjm", void 0, { "active": aiSettingsFocus === source.key })}><div class="insight-card-head svelte-131htjm"><div><strong class="svelte-131htjm">${escape_html(source.title)}</strong> <span class="svelte-131htjm">${escape_html(source.status)}</span></div></div> <p class="svelte-131htjm">${escape_html(source.summary)}</p> <span class="insight-note svelte-131htjm">${escape_html(source.detail)}</span> <div class="action-row svelte-131htjm"><!--[-->`);
          const each_array_81 = ensure_array_like(source.actions);
          for (let $$index_80 = 0, $$length2 = each_array_81.length; $$index_80 < $$length2; $$index_80++) {
            let action = each_array_81[$$index_80];
            $$renderer2.push(`<button class="ghost-btn svelte-131htjm">${escape_html(action)}</button>`);
          }
          $$renderer2.push(`<!--]--></div></article>`);
        }
        $$renderer2.push(`<!--]--></div> <article class="detail-card ai-upload-card svelte-131htjm"><div class="section-head compact svelte-131htjm"><div><span class="section-kicker svelte-131htjm">Current sources</span> <h3>Files and approved answer packs already available</h3></div></div> <div class="role-list svelte-131htjm"><!--[-->`);
        const each_array_82 = ensure_array_like(receiverAiDataSettings.uploads);
        for (let $$index_82 = 0, $$length = each_array_82.length; $$index_82 < $$length; $$index_82++) {
          let item = each_array_82[$$index_82];
          $$renderer2.push(`<div class="role-row svelte-131htjm"><div><strong class="svelte-131htjm">${escape_html(item.name)}</strong> <p class="svelte-131htjm">${escape_html(item.type)} • ${escape_html(item.updated)}</p></div> <span class="status-pill neutral svelte-131htjm">${escape_html(item.status)}</span></div>`);
        }
        $$renderer2.push(`<!--]--></div></article></article></section>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></section> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};
