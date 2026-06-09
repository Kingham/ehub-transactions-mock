import { h as head, e as ensure_array_like, b as attr_class, c as escape_html, j as attr_style } from "../../../chunks/renderer.js";
import { a as fraudFeatureCatalog, j as communityFeatureCatalog } from "../../../chunks/data.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const fraudMap = [
      {
        title: "Detection signals",
        color: "orange",
        points: fraudFeatureCatalog[0].features.slice(0, 6).map((feature) => feature.name)
      },
      {
        title: "Protected areas",
        color: "navy",
        points: [
          "Suppliers and onboarding",
          "Invoices and duplicates",
          "Payments before release",
          "Customer orders",
          "Delivery and address changes"
        ]
      },
      {
        title: "Operating model",
        color: "slate",
        points: [
          "Standalone investigation workspace",
          "Embedded inside live workflows",
          "Case management and escalation",
          "Explainable scoring and thresholds",
          "Full audit trail and controls"
        ]
      },
      {
        title: "Platform intelligence",
        color: "teal",
        points: [
          "Cross-customer pattern detection",
          "Shared risky accounts or entities",
          "Behavioural profiling",
          "Approval anomaly monitoring",
          "Intervention before payment or fulfilment"
        ]
      }
    ];
    const communityMap = [
      {
        title: "Self-service visibility",
        color: "teal",
        points: communityFeatureCatalog[0].features.map((feature) => feature.name)
      },
      {
        title: "Interaction flows",
        color: "navy",
        points: communityFeatureCatalog[1].features.map((feature) => feature.name)
      },
      {
        title: "Control and insight",
        color: "slate",
        points: communityFeatureCatalog[2].features.slice(0, 3).map((feature) => feature.name)
      },
      {
        title: "AI and roadmap",
        color: "orange",
        points: [
          "AI-powered assistant",
          "Email queries routed through AI with automatic responses when an appropriate answer is available",
          "Customer-uploaded knowledge for FAQs",
          "Answers beyond status updates",
          "Role-based collaboration",
          "Future analytics and service insights"
        ]
      }
    ];
    const aiUtilisationMap = [
      {
        title: "Project Delivery & Onboarding",
        color: "teal",
        points: [
          {
            text: "GuideCX 2.0 rollout with AI-driven project risk, delay prediction, and proactive notifications",
            status: "amber"
          },
          {
            text: "Weekly RAG project reporting and intelligent task chasing across delivery stakeholders",
            status: "amber"
          },
          {
            text: "Onboarding journeys and implementation support",
            status: "green"
          }
        ]
      },
      {
        title: "Support & Service Management",
        color: "slate",
        points: [
          {
            text: "Customer service packs with bundle, transaction, and onboarding utilisation reporting",
            status: "green"
          },
          {
            text: "Executive-ready summaries for customer stakeholder and board updates",
            status: "green"
          },
          {
            text: "Suspense and support-report analysis to identify configuration and process improvements",
            status: "amber"
          },
          {
            text: "Zoho support analysis to identify recurring issues and improvement opportunities",
            status: "amber"
          },
          {
            text: "EVA-assisted support and self-service to answer customer queries and reduce manual burden",
            status: "red"
          }
        ]
      },
      {
        title: "Commercial",
        color: "orange",
        points: [
          {
            text: "Content creation and research support across the commercial function",
            status: "amber"
          },
          {
            text: "Drafting and refining emails, proposals, and wider sales content",
            status: "amber"
          },
          {
            text: "Competitive research and market investigation",
            status: "amber"
          },
          {
            text: "Prospect research and account lookups",
            status: "amber"
          },
          {
            text: "HubSpot analysis to advise on campaigns and track SDR performance",
            status: "amber"
          },
          {
            text: "Future use for SDR data cleansing and list improvement",
            status: "red"
          },
          {
            text: "Future use of agentic AI within commercial workflows",
            status: "red"
          },
          {
            text: "Controlled ECX GPT setup in Claude to support content creation and data management",
            status: "amber"
          }
        ]
      },
      {
        title: "Product / Development",
        color: "navy",
        points: [
          {
            text: "AI-assisted productisation for new solution design",
            status: "green"
          },
          { text: "AI-assisted development", status: "green" },
          { text: "Transaction processing", status: "green" },
          { text: "ECX's Virtual Assistant (EVA)", status: "green" }
        ]
      }
    ];
    const frenchOutboundFlow = [
      {
        step: "1",
        title: "Deliver e-invoice",
        code: "Outbound invoice",
        initiatedBy: "Supplier / PAe",
        starts: "PAe",
        ends: "PAr",
        detail: "The supplier-side accredited platform sends the e-invoice to the buyer-side platform."
      },
      {
        step: "2",
        title: "Send tax data subset",
        code: "Flow 1 tax data",
        initiatedBy: "PAe",
        starts: "PAe",
        ends: "PPF",
        detail: "The tax-relevant invoice data is sent to the public invoicing portal in parallel with delivery."
      },
      {
        step: "3",
        title: "PPF acknowledgement",
        code: "Status 250 / 500",
        initiatedBy: "PPF",
        starts: "PPF",
        ends: "PAe",
        detail: "The public platform responds to confirm acceptance or signal a technical issue."
      },
      {
        step: "4",
        title: "Submission status",
        code: "Status 200",
        initiatedBy: "PAe",
        starts: "PAe",
        ends: "PPF and customer C1",
        detail: "PAe records submission to the PPF and can also notify the supplier customer that the invoice has been submitted."
      },
      {
        step: "5",
        title: "Buyer-side lifecycle update",
        code: "Status 202",
        initiatedBy: "PAr",
        starts: "PAr",
        ends: "PAe",
        detail: "The buyer-side platform confirms the invoice has been received."
      },
      {
        step: "6",
        title: "Made available update",
        code: "Status 203",
        initiatedBy: "PAr",
        starts: "PAr",
        ends: "PAe",
        detail: "The buyer-side platform confirms the invoice has been made available to the buyer."
      },
      {
        step: "7",
        title: "Payment status update",
        code: "Status 212",
        initiatedBy: "PAe",
        starts: "PAe",
        ends: "PPF and PAr",
        detail: "If the supplier is on VAT on payments, payment receipt status is sent back into the French network."
      }
    ];
    const frenchInboundFlow = [
      {
        step: "1",
        title: "Receive e-invoice",
        code: "Inbound receipt",
        initiatedBy: "PAr",
        starts: "PAr",
        ends: "Buyer / receiving platform",
        detail: "The inbound flow starts when the buyer-side accredited platform receives the e-invoice."
      },
      {
        step: "2",
        title: "Report international B2B purchase data",
        code: "e-reporting 10.1",
        initiatedBy: "PAr",
        starts: "PAr",
        ends: "PPF",
        detail: "Where applicable, inbound purchase tax reporting is sent from the buyer-side platform to the public portal."
      },
      {
        step: "3",
        title: "Received confirmation",
        code: "Status 202",
        initiatedBy: "PAr",
        starts: "PAr",
        ends: "PAe",
        detail: "The buyer-side platform notifies the supplier-side platform that the invoice has been received."
      },
      {
        step: "4",
        title: "Made available confirmation",
        code: "Status 203",
        initiatedBy: "PAr",
        starts: "PAr",
        ends: "PAe",
        detail: "The buyer-side platform confirms the invoice is available to the buyer."
      },
      {
        step: "5",
        title: "Technical rejection",
        code: "Status 213",
        initiatedBy: "PAr",
        starts: "PAr",
        ends: "PAe and PPF",
        detail: "If there is a technical issue with the invoice, a rejection is sent back to both the supplier-side platform and the public portal.",
        optional: true
      },
      {
        step: "6",
        title: "Business refusal",
        code: "Status 210",
        initiatedBy: "PAr",
        starts: "PAr",
        ends: "PAe and PPF",
        detail: "If there is a business issue with the invoice, a refusal is sent back to both the supplier-side platform and the public portal.",
        optional: true
      }
    ];
    const frenchActors = ["Supplier", "PAe", "PPF", "PAr", "Buyer"];
    const frenchProcessLanes = [
      {
        title: "Outbound process",
        subtitle: "Seller issues invoice to buyer",
        chargeSummary: "Commercial charge: 4 outbound transactions per invoice",
        tone: "outbound",
        steps: [
          {
            title: "Supplier creates invoice",
            generatedBy: "Supplier",
            from: 1,
            to: 2,
            note: "Commercial instruction begins when the seller asks its accredited platform to issue the invoice."
          },
          {
            title: "e-invoice sent to buyer platform",
            generatedBy: "PAe",
            from: 2,
            to: 4,
            note: "The core invoice delivery from seller-side accredited platform to buyer-side accredited platform.",
            chargeable: true,
            chargeLabel: "Chargeable outbound event"
          },
          {
            title: "Tax data subset sent to PPF",
            generatedBy: "PAe",
            from: 2,
            to: 3,
            note: "The invoice tax data is reported to the public portal in parallel with delivery.",
            chargeable: true,
            chargeLabel: "Chargeable outbound event"
          },
          {
            title: "PPF returns acknowledgement",
            generatedBy: "PPF",
            from: 3,
            to: 2,
            note: "Technical acknowledgement or issue response back to the seller-side platform."
          },
          {
            title: "Buyer platform confirms receipt",
            generatedBy: "PAr",
            from: 4,
            to: 2,
            note: "Status 202 confirms the invoice has been received by the buyer-side platform.",
            chargeable: true,
            chargeLabel: "Chargeable outbound event"
          },
          {
            title: "Buyer platform confirms availability",
            generatedBy: "PAr",
            from: 4,
            to: 2,
            note: "Status 203 confirms the invoice has been made available to the buyer.",
            chargeable: true,
            chargeLabel: "Chargeable outbound event"
          },
          {
            title: "Buyer receives invoice",
            generatedBy: "PAr / Buyer",
            from: 4,
            to: 5,
            note: "The invoice is now visible to the buyer and ready for downstream processing."
          }
        ]
      },
      {
        title: "Inbound process",
        subtitle: "Buyer receives invoice from seller",
        chargeSummary: "Commercial charge: 2 inbound transactions per invoice",
        tone: "inbound",
        steps: [
          {
            title: "Buyer platform receives invoice",
            generatedBy: "PAr",
            from: 4,
            to: 5,
            note: "Inbound commercial receipt starts when the buyer-side platform receives and presents the invoice.",
            chargeable: true,
            chargeLabel: "Chargeable inbound event"
          },
          {
            title: "International B2B purchase reporting",
            generatedBy: "PAr",
            from: 4,
            to: 3,
            note: "Where applicable, buyer-side reporting is sent from the receiving platform to the public portal.",
            chargeable: true,
            chargeLabel: "Chargeable inbound event"
          },
          {
            title: "Receipt confirmation sent back",
            generatedBy: "PAr",
            from: 4,
            to: 2,
            note: "Status 202 is returned to the seller-side platform to confirm receipt."
          },
          {
            title: "Made available confirmation sent back",
            generatedBy: "PAr",
            from: 4,
            to: 2,
            note: "Status 203 is returned to confirm the invoice has been made available to the buyer."
          },
          {
            title: "Technical rejection, if needed",
            generatedBy: "PAr",
            from: 4,
            to: 2,
            note: "Status 213 can be raised for a technical issue and also reported to the PPF.",
            optional: true
          },
          {
            title: "Business refusal, if needed",
            generatedBy: "PAr",
            from: 4,
            to: 2,
            note: "Status 210 can be raised for a business issue and also reported to the PPF.",
            optional: true
          }
        ]
      }
    ];
    const frenchTransmissionFlows = [
      {
        title: "Outbound invoice route",
        subtitle: "From seller issue through to buyer receipt",
        tone: "outbound",
        transmissions: [
          {
            label: "Invoice issue request",
            document: "Seller instruction",
            generatedBy: "Supplier",
            from: 1,
            to: 2,
            note: "Seller asks its accredited platform to prepare and send the invoice."
          },
          {
            label: "e-invoice delivery",
            document: "Invoice",
            generatedBy: "PAe",
            from: 2,
            to: 4,
            note: "Core invoice transmission from seller-side accredited platform to buyer-side accredited platform.",
            chargeable: "Chargeable outbound"
          },
          {
            label: "Tax reporting flow",
            document: "Invoice tax data subset",
            generatedBy: "PAe",
            from: 2,
            to: 3,
            note: "Parallel tax data submission to the public portal.",
            chargeable: "Chargeable outbound"
          },
          {
            label: "PPF acknowledgement",
            document: "Status 250 / 500",
            generatedBy: "PPF",
            from: 3,
            to: 2,
            note: "Public platform acknowledgement or technical error response."
          },
          {
            label: "Receipt confirmation",
            document: "Status 202",
            generatedBy: "PAr",
            from: 4,
            to: 2,
            note: "Buyer-side platform confirms the invoice has been received.",
            chargeable: "Chargeable outbound"
          },
          {
            label: "Made available confirmation",
            document: "Status 203",
            generatedBy: "PAr",
            from: 4,
            to: 2,
            note: "Buyer-side platform confirms the invoice has been made available to the buyer.",
            chargeable: "Chargeable outbound"
          },
          {
            label: "Buyer processing start",
            document: "Invoice available",
            generatedBy: "PAr",
            from: 4,
            to: 5,
            note: "Buyer can now process the invoice in its natural business system."
          }
        ]
      },
      {
        title: "Inbound and exception route",
        subtitle: "What the buyer-side platform sends back into the network",
        tone: "inbound",
        transmissions: [
          {
            label: "Inbound commercial receipt",
            document: "Invoice received",
            generatedBy: "PAr",
            from: 4,
            to: 5,
            note: "Inbound commercial event when the buyer-side platform receives and presents the invoice.",
            chargeable: "Chargeable inbound"
          },
          {
            label: "Inbound purchase reporting",
            document: "e-reporting 10.1",
            generatedBy: "PAr",
            from: 4,
            to: 3,
            note: "Where applicable, inbound reporting is sent to the public portal.",
            chargeable: "Chargeable inbound"
          },
          {
            label: "Technical rejection",
            document: "Status 213",
            generatedBy: "PAr",
            from: 4,
            to: 2,
            note: "Optional technical rejection back to the seller-side platform and also reported to the PPF.",
            optional: true
          },
          {
            label: "Business refusal",
            document: "Status 210",
            generatedBy: "PAr",
            from: 4,
            to: 2,
            note: "Optional business refusal back to the seller-side platform and also reported to the PPF.",
            optional: true
          },
          {
            label: "Payment update",
            document: "Status 212",
            generatedBy: "PAe",
            from: 2,
            to: 3,
            note: "If VAT on payments applies, payment receipt status is sent into the public flow.",
            optional: true
          },
          {
            label: "Payment visibility",
            document: "Status 212 onward",
            generatedBy: "PAe",
            from: 2,
            to: 4,
            note: "Payment receipt status is also passed to the buyer-side platform where applicable.",
            optional: true
          }
        ]
      }
    ];
    const frenchCornerMessages = [
      {
        num: 1,
        from: "Seller",
        to: "PAe",
        label: "Seller issues invoice",
        sublabel: "Invoice prepared in the natural business system",
        charge: null,
        detail: "The supplier instructs its accredited platform (PAe) to prepare and send the e-invoice."
      },
      {
        num: 2,
        from: "PAe",
        to: "PAr",
        label: "e-invoice delivered to buyer platform",
        sublabel: "Primary invoice transmission",
        charge: "both",
        detail: "PAe transmits the e-invoice directly across to the buyer-side accredited platform PAr. Counts as 1 outbound (delivery) and 1 inbound (invoice receipt from PAe)."
      },
      {
        num: 3,
        from: "PAe",
        to: "PPF",
        label: "Tax data sent to public portal",
        sublabel: "Flow 1 - tax data subset",
        charge: "outbound",
        detail: "In parallel with delivery, PAe reports the invoice tax data subset to the PPF."
      },
      {
        num: 4,
        from: "PPF",
        to: "PAe",
        label: "Receipt message from PPF",
        sublabel: "Status 250 accepted, or 500 technical error",
        charge: "outbound",
        detail: "PPF returns a receipt/status message to PAe. Several messages may be exchanged but the bundle is charged as 1 outbound transaction."
      },
      {
        num: 5,
        from: "PAr",
        to: "PAe",
        label: "Receipt and status messages",
        sublabel: "Status 202 received and 203 made available",
        charge: "both",
        detail: "PAr returns lifecycle statuses to the seller-side platform. Several messages may go back and forth - charged as 1 outbound and 1 inbound transaction."
      },
      {
        num: 6,
        from: "PAr",
        to: "Buyer",
        label: "Invoice made available to buyer",
        sublabel: "Buyer receipt",
        charge: null,
        detail: "PAr presents the invoice to the buyer's natural business system for downstream processing. Not separately charged - covered by the inbound charge on transaction 2."
      },
      {
        num: 7,
        from: "PAr",
        to: "PPF",
        label: "Inbound purchase reporting",
        sublabel: "e-reporting 10.1 - international B2B purchases",
        charge: null,
        detail: "Where applicable, PAr reports inbound purchase data into the PPF on behalf of the buyer. Not separately charged."
      }
    ];
    head("12id1yf", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Open ECX Mind Maps</title>`);
      });
    });
    $$renderer2.push(`<div class="maps-shell svelte-12id1yf"><header class="hero svelte-12id1yf"><div class="hero-bar svelte-12id1yf"><div class="hero-brand svelte-12id1yf"><img class="hero-logo svelte-12id1yf" src="https://openecxcdn.blob.core.windows.net/live/missioncontrol/Customer%20Images/Open%20ECX/Open-ECX-Logo.svg" alt="Open ECX"/> <nav class="module-switch svelte-12id1yf"><a class="switch-link svelte-12id1yf" href="/">Fraud</a> <a class="switch-link svelte-12id1yf" href="/community-info">Community</a> <a class="switch-link active svelte-12id1yf" href="/module-maps">Mind maps</a></nav></div></div> <div class="hero-copy svelte-12id1yf"><span class="eyebrow svelte-12id1yf">Module idea maps</span> <h1 class="svelte-12id1yf">Three visual concept maps to pressure-test the proposition and AI story.</h1> <p class="svelte-12id1yf">This page groups the main ideas from each module overview into a customer-facing mind-map format, so the shape
        of each proposition and internal AI narrative is easier to assess before we refine the copy further.</p></div></header> <main class="maps-stack svelte-12id1yf"><section class="map-panel fraud-panel svelte-12id1yf"><div class="panel-head svelte-12id1yf"><div><span class="panel-kicker svelte-12id1yf">Fraud</span> <h2 class="svelte-12id1yf">Risk detection and intervention across the platform</h2></div> <p class="svelte-12id1yf">Fraud Analysis helps customers detect, investigate, and control potentially fraudulent activity across suppliers, invoices, payments, customers, and orders.</p></div> <div class="mind-map svelte-12id1yf"><div class="branch-column left svelte-12id1yf"><!--[-->`);
    const each_array = ensure_array_like(fraudMap.slice(0, 2));
    for (let $$index_1 = 0, $$length = each_array.length; $$index_1 < $$length; $$index_1++) {
      let branch = each_array[$$index_1];
      $$renderer2.push(`<article${attr_class(`branch-card ${branch.color}`, "svelte-12id1yf")}><h3 class="svelte-12id1yf">${escape_html(branch.title)}</h3> <ul class="svelte-12id1yf"><!--[-->`);
      const each_array_1 = ensure_array_like(branch.points);
      for (let $$index = 0, $$length2 = each_array_1.length; $$index < $$length2; $$index++) {
        let point = each_array_1[$$index];
        $$renderer2.push(`<li${attr_class("svelte-12id1yf", void 0, { "status-item": typeof point !== "string" })}><span class="svelte-12id1yf">${escape_html(typeof point === "string" ? point : point.text)}</span> `);
        if (typeof point !== "string") {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span${attr_class(`status-dot ${point.status}`, "svelte-12id1yf")} aria-hidden="true"></span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></li>`);
      }
      $$renderer2.push(`<!--]--></ul></article>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="core-card fraud-core svelte-12id1yf"><span class="svelte-12id1yf">Fraud</span> <strong class="svelte-12id1yf">Protect payments, orders, and supplier activity before risk becomes loss.</strong></div> <div class="branch-column right svelte-12id1yf"><!--[-->`);
    const each_array_2 = ensure_array_like(fraudMap.slice(2));
    for (let $$index_3 = 0, $$length = each_array_2.length; $$index_3 < $$length; $$index_3++) {
      let branch = each_array_2[$$index_3];
      $$renderer2.push(`<article${attr_class(`branch-card ${branch.color}`, "svelte-12id1yf")}><h3 class="svelte-12id1yf">${escape_html(branch.title)}</h3> <ul class="svelte-12id1yf"><!--[-->`);
      const each_array_3 = ensure_array_like(branch.points);
      for (let $$index_2 = 0, $$length2 = each_array_3.length; $$index_2 < $$length2; $$index_2++) {
        let point = each_array_3[$$index_2];
        $$renderer2.push(`<li${attr_class("svelte-12id1yf", void 0, { "status-item": typeof point !== "string" })}><span class="svelte-12id1yf">${escape_html(typeof point === "string" ? point : point.text)}</span> `);
        if (typeof point !== "string") {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span${attr_class(`status-dot ${point.status}`, "svelte-12id1yf")} aria-hidden="true"></span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></li>`);
      }
      $$renderer2.push(`<!--]--></ul></article>`);
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="map-panel community-panel svelte-12id1yf"><div class="panel-head svelte-12id1yf"><div><span class="panel-kicker svelte-12id1yf">Community</span> <h2 class="svelte-12id1yf">Shared visibility, self-service, and guided resolution</h2></div> <p class="svelte-12id1yf">Community gives senders and receivers shared visibility, self-service access, and faster issue resolution across invoices, orders, payments, and delivery events.</p></div> <div class="mind-map svelte-12id1yf"><div class="branch-column left svelte-12id1yf"><!--[-->`);
    const each_array_4 = ensure_array_like(communityMap.slice(0, 2));
    for (let $$index_5 = 0, $$length = each_array_4.length; $$index_5 < $$length; $$index_5++) {
      let branch = each_array_4[$$index_5];
      $$renderer2.push(`<article${attr_class(`branch-card ${branch.color}`, "svelte-12id1yf")}><h3 class="svelte-12id1yf">${escape_html(branch.title)}</h3> <ul class="svelte-12id1yf"><!--[-->`);
      const each_array_5 = ensure_array_like(branch.points);
      for (let $$index_4 = 0, $$length2 = each_array_5.length; $$index_4 < $$length2; $$index_4++) {
        let point = each_array_5[$$index_4];
        $$renderer2.push(`<li>${escape_html(point)}</li>`);
      }
      $$renderer2.push(`<!--]--></ul></article>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="core-card community-core svelte-12id1yf"><span class="svelte-12id1yf">Community</span> <strong class="svelte-12id1yf">Reduce chasing by giving users the right information, context, and help in one place.</strong></div> <div class="branch-column right svelte-12id1yf"><!--[-->`);
    const each_array_6 = ensure_array_like(communityMap.slice(2));
    for (let $$index_7 = 0, $$length = each_array_6.length; $$index_7 < $$length; $$index_7++) {
      let branch = each_array_6[$$index_7];
      $$renderer2.push(`<article${attr_class(`branch-card ${branch.color}`, "svelte-12id1yf")}><h3 class="svelte-12id1yf">${escape_html(branch.title)}</h3> <ul class="svelte-12id1yf"><!--[-->`);
      const each_array_7 = ensure_array_like(branch.points);
      for (let $$index_6 = 0, $$length2 = each_array_7.length; $$index_6 < $$length2; $$index_6++) {
        let point = each_array_7[$$index_6];
        $$renderer2.push(`<li>${escape_html(point)}</li>`);
      }
      $$renderer2.push(`<!--]--></ul></article>`);
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="map-panel ai-panel svelte-12id1yf"><div class="panel-head svelte-12id1yf"><div><span class="panel-kicker svelte-12id1yf">AI - Powering Open ECX</span> <h2 class="svelte-12id1yf">How AI is being used across the business</h2></div> <p class="svelte-12id1yf">AI is being used across the business to improve customer reporting, project delivery, product design, development, onboarding, and automated support journeys.</p></div> <div class="mind-map ai-map svelte-12id1yf"><div class="branch-column left svelte-12id1yf"><!--[-->`);
    const each_array_8 = ensure_array_like(aiUtilisationMap.slice(0, 2));
    for (let $$index_9 = 0, $$length = each_array_8.length; $$index_9 < $$length; $$index_9++) {
      let branch = each_array_8[$$index_9];
      $$renderer2.push(`<article${attr_class(`branch-card ${branch.color}`, "svelte-12id1yf")}><h3 class="svelte-12id1yf">${escape_html(branch.title)}</h3> <ul class="svelte-12id1yf"><!--[-->`);
      const each_array_9 = ensure_array_like(branch.points);
      for (let $$index_8 = 0, $$length2 = each_array_9.length; $$index_8 < $$length2; $$index_8++) {
        let point = each_array_9[$$index_8];
        $$renderer2.push(`<li${attr_class("svelte-12id1yf", void 0, { "status-item": typeof point !== "string" })}><span class="svelte-12id1yf">${escape_html(typeof point === "string" ? point : point.text)}</span> `);
        if (typeof point !== "string") {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span${attr_class(`status-dot ${point.status}`, "svelte-12id1yf")} aria-hidden="true"></span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></li>`);
      }
      $$renderer2.push(`<!--]--></ul></article>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="core-card ai-core svelte-12id1yf"><span class="svelte-12id1yf">AI - Powering Open ECX</span> <strong class="svelte-12id1yf">We've adopted an AI-first approach to enhancing processes and reporting data insights across operations, commercial, and product.</strong></div> <div class="branch-column right svelte-12id1yf"><!--[-->`);
    const each_array_10 = ensure_array_like(aiUtilisationMap.slice(2));
    for (let $$index_11 = 0, $$length = each_array_10.length; $$index_11 < $$length; $$index_11++) {
      let branch = each_array_10[$$index_11];
      $$renderer2.push(`<article${attr_class(`branch-card ${branch.color}`, "svelte-12id1yf")}><h3 class="svelte-12id1yf">${escape_html(branch.title)}</h3> <ul class="svelte-12id1yf"><!--[-->`);
      const each_array_11 = ensure_array_like(branch.points);
      for (let $$index_10 = 0, $$length2 = each_array_11.length; $$index_10 < $$length2; $$index_10++) {
        let point = each_array_11[$$index_10];
        $$renderer2.push(`<li${attr_class("svelte-12id1yf", void 0, { "status-item": typeof point !== "string" })}><span class="svelte-12id1yf">${escape_html(typeof point === "string" ? point : point.text)}</span> `);
        if (typeof point !== "string") {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span${attr_class(`status-dot ${point.status}`, "svelte-12id1yf")} aria-hidden="true"></span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></li>`);
      }
      $$renderer2.push(`<!--]--></ul></article>`);
    }
    $$renderer2.push(`<!--]--></div></div></section> <section class="map-panel france-panel svelte-12id1yf"><div class="panel-head svelte-12id1yf"><div><span class="panel-kicker svelte-12id1yf">French eInvoicing</span> <h2 class="svelte-12id1yf">Inbound and outbound transaction flow</h2></div> <p class="svelte-12id1yf">Based on the French eInvoicing mandate flow shown in the Arratech document, this view maps where each transaction is initiated, where it starts, where it ends, and how the outbound and inbound paths fit together.</p></div> <div class="flow-stack svelte-12id1yf"><article class="flow-lane outbound-lane svelte-12id1yf"><div class="flow-head svelte-12id1yf"><div><span class="flow-kicker svelte-12id1yf">Outbound</span> <h3 class="svelte-12id1yf">Invoice issued by supplier</h3></div> <div class="flow-badge svelte-12id1yf">Commercially treated as 4 outbound transactions per invoice</div></div> <div class="actor-strip svelte-12id1yf"><span class="svelte-12id1yf">Supplier</span> <span class="svelte-12id1yf">PAe</span> <span class="svelte-12id1yf">PPF</span> <span class="svelte-12id1yf">PAr</span> <span class="svelte-12id1yf">Buyer</span></div> <div class="flow-grid svelte-12id1yf"><!--[-->`);
    const each_array_12 = ensure_array_like(frenchOutboundFlow);
    for (let $$index_12 = 0, $$length = each_array_12.length; $$index_12 < $$length; $$index_12++) {
      let item = each_array_12[$$index_12];
      $$renderer2.push(`<article${attr_class(`flow-step ${item.optional ? "optional" : ""}`, "svelte-12id1yf")}><div class="flow-step-top svelte-12id1yf"><span class="step-number svelte-12id1yf">${escape_html(item.step)}</span> <div><strong class="svelte-12id1yf">${escape_html(item.title)}</strong> <small class="svelte-12id1yf">${escape_html(item.code)}</small></div></div> <div class="flow-meta svelte-12id1yf"><span class="svelte-12id1yf"><b class="svelte-12id1yf">Instigated by</b> ${escape_html(item.initiatedBy)}</span> <span class="svelte-12id1yf"><b class="svelte-12id1yf">Starts</b> ${escape_html(item.starts)}</span> <span class="svelte-12id1yf"><b class="svelte-12id1yf">Ends</b> ${escape_html(item.ends)}</span></div> <p class="svelte-12id1yf">${escape_html(item.detail)}</p></article>`);
    }
    $$renderer2.push(`<!--]--></div></article> <article class="flow-lane inbound-lane svelte-12id1yf"><div class="flow-head svelte-12id1yf"><div><span class="flow-kicker svelte-12id1yf">Inbound</span> <h3 class="svelte-12id1yf">Invoice received by buyer</h3></div> <div class="flow-badge svelte-12id1yf">Commercially treated as 2 inbound transactions per invoice</div></div> <div class="actor-strip svelte-12id1yf"><span class="svelte-12id1yf">Supplier</span> <span class="svelte-12id1yf">PAe</span> <span class="svelte-12id1yf">PPF</span> <span class="svelte-12id1yf">PAr</span> <span class="svelte-12id1yf">Buyer</span></div> <div class="flow-grid svelte-12id1yf"><!--[-->`);
    const each_array_13 = ensure_array_like(frenchInboundFlow);
    for (let $$index_13 = 0, $$length = each_array_13.length; $$index_13 < $$length; $$index_13++) {
      let item = each_array_13[$$index_13];
      $$renderer2.push(`<article${attr_class(`flow-step ${item.optional ? "optional" : ""}`, "svelte-12id1yf")}><div class="flow-step-top svelte-12id1yf"><span class="step-number svelte-12id1yf">${escape_html(item.step)}</span> <div><strong class="svelte-12id1yf">${escape_html(item.title)}</strong> <small class="svelte-12id1yf">${escape_html(item.code)}</small></div></div> <div class="flow-meta svelte-12id1yf"><span class="svelte-12id1yf"><b class="svelte-12id1yf">Instigated by</b> ${escape_html(item.initiatedBy)}</span> <span class="svelte-12id1yf"><b class="svelte-12id1yf">Starts</b> ${escape_html(item.starts)}</span> <span class="svelte-12id1yf"><b class="svelte-12id1yf">Ends</b> ${escape_html(item.ends)}</span></div> <p class="svelte-12id1yf">${escape_html(item.detail)}</p></article>`);
    }
    $$renderer2.push(`<!--]--></div></article></div> <p class="flow-note svelte-12id1yf">Optional status updates such as refusal and rejection are shown separately. The billable transaction grouping is
        taken from the Arratech slide; the step-by-step start and end points above are inferred from that flow and the
        standard French Y-model roles.</p> <div class="ptp-panel svelte-12id1yf"><div class="ptp-head svelte-12id1yf"><div><span class="flow-kicker svelte-12id1yf">Process flow</span> <h3 class="svelte-12id1yf">Seller-to-buyer swimlane showing who generates each step and what is commercially chargeable</h3></div> <p class="svelte-12id1yf">This view follows the actual hand-off path across the French model. Each box shows who generated the step,
            where it travels, and whether it contributes to the commercially chargeable transaction bundle.</p></div> <div class="swimlane-stack svelte-12id1yf"><!--[-->`);
    const each_array_14 = ensure_array_like(frenchProcessLanes);
    for (let $$index_17 = 0, $$length = each_array_14.length; $$index_17 < $$length; $$index_17++) {
      let lane = each_array_14[$$index_17];
      $$renderer2.push(`<section${attr_class(`swimlane-panel ${lane.tone}`, "svelte-12id1yf")}><div class="swimlane-head svelte-12id1yf"><div><h3 class="svelte-12id1yf">${escape_html(lane.title)}</h3> <p class="svelte-12id1yf">${escape_html(lane.subtitle)}</p></div> <div class="flow-badge svelte-12id1yf">${escape_html(lane.chargeSummary)}</div></div> <div class="swimlane-actors svelte-12id1yf"><!--[-->`);
      const each_array_15 = ensure_array_like(frenchActors);
      for (let $$index_14 = 0, $$length2 = each_array_15.length; $$index_14 < $$length2; $$index_14++) {
        let actor = each_array_15[$$index_14];
        $$renderer2.push(`<span class="svelte-12id1yf">${escape_html(actor)}</span>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="swimlane-body svelte-12id1yf"><!--[-->`);
      const each_array_16 = ensure_array_like(frenchActors);
      for (let index = 0, $$length2 = each_array_16.length; index < $$length2; index++) {
        each_array_16[index];
        $$renderer2.push(`<div class="lane-guide svelte-12id1yf"${attr_style(`grid-column:${index + 1}`)}></div>`);
      }
      $$renderer2.push(`<!--]--> <!--[-->`);
      const each_array_17 = ensure_array_like(lane.steps);
      for (let stepIndex = 0, $$length2 = each_array_17.length; stepIndex < $$length2; stepIndex++) {
        let step = each_array_17[stepIndex];
        $$renderer2.push(`<article${attr_class(`swimlane-step ${step.chargeable ? "chargeable" : ""} ${step.optional ? "optional" : ""}`, "svelte-12id1yf")}${attr_style(`grid-column:${step.from} / ${step.to + 1}; grid-row:${stepIndex + 1};`)}><div class="swimlane-step-head svelte-12id1yf"><div><strong class="svelte-12id1yf">${escape_html(step.title)}</strong> <small class="svelte-12id1yf">Generated by ${escape_html(step.generatedBy)}</small></div> `);
        if (step.chargeable) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="charge-pill svelte-12id1yf">${escape_html(step.chargeLabel)}</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div> <div class="swimlane-route svelte-12id1yf"><span class="svelte-12id1yf">${escape_html(frenchActors[step.from - 1])}</span> <span class="route-arrow svelte-12id1yf" aria-hidden="true"></span> <span class="svelte-12id1yf">${escape_html(frenchActors[step.to - 1])}</span></div> <p class="svelte-12id1yf">${escape_html(step.note)}</p></article>`);
      }
      $$renderer2.push(`<!--]--></div></section>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="sequence-stack svelte-12id1yf"><div class="ptp-head svelte-12id1yf"><div><span class="flow-kicker svelte-12id1yf">Process flow</span> <h3 class="svelte-12id1yf">Participant diagram with messages moving between the parties</h3></div> <p class="svelte-12id1yf">This is the visual process-flow version: each party sits on the canvas and the messages show exactly who
              sends what to whom, with the commercial charge called out on the relevant transmission.</p></div> <section class="corner-flow-card svelte-12id1yf"><div class="corner-diagram-frame svelte-12id1yf"><svg class="corner-diagram-svg svelte-12id1yf" viewBox="0 0 1000 620" role="img" aria-label="French e-invoicing participant flow diagram"><defs><marker id="cf-arrow-out" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L12,6 L0,12 z" fill="#eb6028"></path></marker><marker id="cf-arrow-in" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L12,6 L0,12 z" fill="#0b7f77"></path></marker><marker id="cf-arrow-ack" markerWidth="12" markerHeight="12" refX="11" refY="6" orient="auto" markerUnits="userSpaceOnUse"><path d="M0,0 L12,6 L0,12 z" fill="#103a6a"></path></marker><linearGradient id="cf-split-fill" x1="0" y1="0" x2="1" y2="0"><stop offset="50%" stop-color="#eb6028"></stop><stop offset="50%" stop-color="#0b7f77"></stop></linearGradient></defs><rect x="160" y="95" width="680" height="430" rx="14" fill="none" stroke="#103a6a" stroke-opacity="0.06" stroke-dasharray="4 6"></rect><g><rect x="340" y="5" width="320" height="230" rx="18" fill="#ffffff" stroke="#103a6a" stroke-opacity="0.18" stroke-width="1.5"></rect><circle cx="362" cy="27" r="12" fill="#fff5ef" stroke="#eb6028" stroke-width="2"></circle><text x="362" y="32" text-anchor="middle" fill="#eb6028" font-size="13" font-weight="900">£</text><text x="382" y="31" font-size="11" font-weight="800" fill="#103a6a" letter-spacing="1.4">CHARGEABLE TRANSACTIONS</text><line x1="358" y1="45" x2="642" y2="45" stroke="#103a6a" stroke-opacity="0.08" stroke-width="1"></line><text x="360" y="63" font-size="10" font-weight="800" fill="#a94917" letter-spacing="1.4">OUTBOUND · 4 PER INVOICE</text><circle cx="370" cy="81" r="10" fill="#eb6028"></circle><text x="370" y="85" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">2</text><text x="390" y="85" font-size="13" fill="#103a6a">e-invoice delivered to buyer platform</text><text x="650" y="85" text-anchor="end" font-size="12" font-weight="800" fill="#eb6028">x1</text><circle cx="370" cy="101" r="10" fill="#eb6028"></circle><text x="370" y="105" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">3</text><text x="390" y="105" font-size="13" fill="#103a6a">Tax data sent to public portal</text><text x="650" y="105" text-anchor="end" font-size="12" font-weight="800" fill="#eb6028">x1</text><circle cx="370" cy="121" r="10" fill="#eb6028"></circle><text x="370" y="125" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">4</text><text x="390" y="125" font-size="13" fill="#103a6a">Receipt message from PPF</text><text x="650" y="125" text-anchor="end" font-size="12" font-weight="800" fill="#eb6028">x1</text><circle cx="370" cy="141" r="10" fill="#eb6028"></circle><text x="370" y="145" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">5</text><text x="390" y="145" font-size="13" fill="#103a6a">Receipt and status messages</text><text x="650" y="145" text-anchor="end" font-size="12" font-weight="800" fill="#eb6028">x1</text><text x="360" y="171" font-size="10" font-weight="800" fill="#0b7f77" letter-spacing="1.4">INBOUND · 2 PER INVOICE</text><circle cx="370" cy="189" r="10" fill="#0b7f77"></circle><text x="370" y="193" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">2</text><text x="390" y="193" font-size="13" fill="#103a6a">Invoice receipt from PAe</text><text x="650" y="193" text-anchor="end" font-size="12" font-weight="800" fill="#0b7f77">x1</text><circle cx="370" cy="209" r="10" fill="#0b7f77"></circle><text x="370" y="213" text-anchor="middle" fill="#fff" font-size="11" font-weight="800">5</text><text x="390" y="213" font-size="13" fill="#103a6a">Receipt message from PAr to PAe</text><text x="650" y="213" text-anchor="end" font-size="12" font-weight="800" fill="#0b7f77">x1</text></g><line x1="160" y1="155" x2="160" y2="445" stroke="#eb6028" stroke-width="3" marker-end="url(#cf-arrow-out)"></line><line x1="285" y1="510" x2="715" y2="510" stroke="#eb6028" stroke-width="3" marker-end="url(#cf-arrow-out)"></line><path d="M 260 450 Q 300 400 405 360" fill="none" stroke="#eb6028" stroke-width="3" marker-end="url(#cf-arrow-out)"></path><path d="M 440 360 Q 360 440 280 490" fill="none" stroke="#eb6028" stroke-width="3" marker-end="url(#cf-arrow-out)"></path><line x1="715" y1="555" x2="285" y2="555" stroke="#eb6028" stroke-width="3" marker-end="url(#cf-arrow-out)"></line><line x1="840" y1="445" x2="840" y2="155" stroke="#0b7f77" stroke-width="3" marker-end="url(#cf-arrow-in)"></line><path d="M 740 450 Q 700 400 595 360" fill="none" stroke="#0b7f77" stroke-width="3" marker-end="url(#cf-arrow-in)"></path><g><circle cx="160" cy="300" r="18" fill="#eb6028"></circle><text x="160" y="306" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">1</text></g><g><circle cx="500" cy="510" r="18" fill="#eb6028"></circle><text x="500" y="516" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">2</text><circle cx="514" cy="496" r="11" fill="#fff" stroke="url(#cf-split-fill)" stroke-width="2"></circle><text x="514" y="501" text-anchor="middle" fill="url(#cf-split-fill)" font-size="14" font-weight="900">£</text></g><g><circle cx="316" cy="403" r="18" fill="#eb6028"></circle><text x="316" y="409" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">3</text><circle cx="330" cy="389" r="11" fill="#fff" stroke="#eb6028" stroke-width="2"></circle><text x="330" y="394" text-anchor="middle" fill="#eb6028" font-size="14" font-weight="900">£</text></g><g><circle cx="360" cy="433" r="18" fill="#eb6028"></circle><text x="360" y="439" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">4</text><circle cx="374" cy="419" r="11" fill="#fff" stroke="#eb6028" stroke-width="2"></circle><text x="374" y="424" text-anchor="middle" fill="#eb6028" font-size="14" font-weight="900">£</text></g><g><circle cx="500" cy="555" r="18" fill="#eb6028"></circle><text x="500" y="561" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">5</text><circle cx="514" cy="541" r="11" fill="#fff" stroke="url(#cf-split-fill)" stroke-width="2"></circle><text x="514" y="546" text-anchor="middle" fill="url(#cf-split-fill)" font-size="14" font-weight="900">£</text></g><g><circle cx="840" cy="300" r="18" fill="#0b7f77"></circle><text x="840" y="306" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">6</text></g><g><circle cx="684" cy="403" r="18" fill="#0b7f77"></circle><text x="684" y="409" text-anchor="middle" fill="#fff" font-size="15" font-weight="800">7</text></g><g><rect x="40" y="35" width="240" height="120" rx="20" fill="#ffffff" stroke="#eb6028" stroke-opacity="0.35" stroke-width="1.5"></rect><text x="60" y="62" font-size="10" font-weight="800" fill="#a94917" letter-spacing="1.5">OUTBOUND</text><text x="60" y="92" font-size="20" font-weight="800" fill="#103a6a">Seller</text><text x="60" y="115" font-size="13" fill="#5b6573">Natural business system -</text><text x="60" y="132" font-size="13" fill="#5b6573">issues the invoice</text></g><g><rect x="40" y="445" width="240" height="140" rx="20" fill="#ffffff" stroke="#eb6028" stroke-opacity="0.35" stroke-width="1.5"></rect><text x="60" y="472" font-size="10" font-weight="800" fill="#a94917" letter-spacing="1.5">SELLER-SIDE PA</text><text x="60" y="502" font-size="20" font-weight="800" fill="#103a6a">PAe</text><text x="60" y="525" font-size="13" fill="#5b6573">Sends e-invoice to PAr and</text><text x="60" y="542" font-size="13" fill="#5b6573">reports tax data to PPF</text><text x="60" y="568" font-size="12" font-weight="700" fill="#a94917">4 outbound transactions / invoice</text></g><g><rect x="720" y="445" width="240" height="140" rx="20" fill="#ffffff" stroke="#0b7f77" stroke-opacity="0.35" stroke-width="1.5"></rect><text x="740" y="472" font-size="10" font-weight="800" fill="#0b7f77" letter-spacing="1.5">BUYER-SIDE PA</text><text x="740" y="502" font-size="20" font-weight="800" fill="#103a6a">PAr</text><text x="740" y="525" font-size="13" fill="#5b6573">Receives the invoice and</text><text x="740" y="542" font-size="13" fill="#5b6573">issues lifecycle statuses</text><text x="740" y="568" font-size="12" font-weight="700" fill="#0b7f77">2 inbound transactions / invoice</text></g><g><rect x="720" y="35" width="240" height="120" rx="20" fill="#ffffff" stroke="#0b7f77" stroke-opacity="0.35" stroke-width="1.5"></rect><text x="740" y="62" font-size="10" font-weight="800" fill="#0b7f77" letter-spacing="1.5">INBOUND</text><text x="740" y="92" font-size="20" font-weight="800" fill="#103a6a">Buyer</text><text x="740" y="115" font-size="13" fill="#5b6573">Natural business system -</text><text x="740" y="132" font-size="13" fill="#5b6573">processes the invoice</text></g><g><rect x="380" y="240" width="240" height="120" rx="20" fill="#f5f7fb" stroke="#103a6a" stroke-opacity="0.3" stroke-width="1.5"></rect><text x="400" y="267" font-size="10" font-weight="800" fill="#103a6a" letter-spacing="1.5">CENTRAL HUB · PUBLIC PORTAL</text><text x="400" y="297" font-size="20" font-weight="800" fill="#103a6a">PPF</text><text x="400" y="320" font-size="13" fill="#5b6573">Receives tax data and</text><text x="400" y="337" font-size="13" fill="#5b6573">e-reporting, returns acks</text></g></svg></div> <ol class="corner-legend svelte-12id1yf"><!--[-->`);
    const each_array_18 = ensure_array_like(frenchCornerMessages);
    for (let $$index_18 = 0, $$length = each_array_18.length; $$index_18 < $$length; $$index_18++) {
      let msg = each_array_18[$$index_18];
      $$renderer2.push(`<li class="corner-legend-item svelte-12id1yf"><span${attr_class(`legend-num ${msg.charge ?? "ack"}`, "svelte-12id1yf")}>${escape_html(msg.num)}</span> <div class="legend-body svelte-12id1yf"><div class="legend-head svelte-12id1yf"><span class="legend-route svelte-12id1yf">${escape_html(msg.from)} → ${escape_html(msg.to)}</span> `);
      if (msg.charge === "outbound" || msg.charge === "both") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="charge-pill svelte-12id1yf">Chargeable outbound</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (msg.charge === "inbound" || msg.charge === "both") {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="charge-pill inbound svelte-12id1yf">Chargeable inbound</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></div> <strong class="svelte-12id1yf">${escape_html(msg.label)}</strong> <small class="svelte-12id1yf">${escape_html(msg.sublabel)}</small> <p class="svelte-12id1yf">${escape_html(msg.detail)}</p></div></li>`);
    }
    $$renderer2.push(`<!--]--></ol> <p class="corner-footnote svelte-12id1yf">Numbered arrows show the seven main messages. Transactions 2 and 5 carry both an outbound and an inbound charge on the same flow - shown by the split-colour £ badge. Optional flows (status 213 rejection, 210 refusal, 212 payment) are covered in the transmission diagram below.</p></section> <div class="ptp-head svelte-12id1yf"><div><span class="flow-kicker svelte-12id1yf">Transmission diagram</span> <h3 class="svelte-12id1yf">Point-to-point participant view with charge points shown on the document transmission</h3></div> <p class="svelte-12id1yf">This is the closest view to a classic process diagram: the parties stay fixed, the transmissions move
              between them, and the commercial charge is called out on the relevant message.</p></div> <!--[-->`);
    const each_array_19 = ensure_array_like(frenchTransmissionFlows);
    for (let $$index_22 = 0, $$length = each_array_19.length; $$index_22 < $$length; $$index_22++) {
      let flow = each_array_19[$$index_22];
      $$renderer2.push(`<section${attr_class(`sequence-panel ${flow.tone}`, "svelte-12id1yf")}><div class="swimlane-head svelte-12id1yf"><div><h3 class="svelte-12id1yf">${escape_html(flow.title)}</h3> <p class="svelte-12id1yf">${escape_html(flow.subtitle)}</p></div></div> <div class="sequence-actors svelte-12id1yf"><!--[-->`);
      const each_array_20 = ensure_array_like(frenchActors);
      for (let $$index_19 = 0, $$length2 = each_array_20.length; $$index_19 < $$length2; $$index_19++) {
        let actor = each_array_20[$$index_19];
        $$renderer2.push(`<span class="svelte-12id1yf">${escape_html(actor)}</span>`);
      }
      $$renderer2.push(`<!--]--></div> <div class="sequence-body svelte-12id1yf"><!--[-->`);
      const each_array_21 = ensure_array_like(frenchActors);
      for (let index = 0, $$length2 = each_array_21.length; index < $$length2; index++) {
        each_array_21[index];
        $$renderer2.push(`<div class="sequence-guide svelte-12id1yf"${attr_style(`grid-column:${index + 1}`)}></div>`);
      }
      $$renderer2.push(`<!--]--> <!--[-->`);
      const each_array_22 = ensure_array_like(flow.transmissions);
      for (let itemIndex = 0, $$length2 = each_array_22.length; itemIndex < $$length2; itemIndex++) {
        let item = each_array_22[itemIndex];
        $$renderer2.push(`<article${attr_class(`sequence-row ${item.optional ? "optional" : ""}`, "svelte-12id1yf")}${attr_style(`grid-row:${itemIndex + 1};`)}><div${attr_class(`sequence-arrow ${item.from > item.to ? "reverse" : "forward"}`, "svelte-12id1yf")}${attr_style(`grid-column:${Math.min(item.from, item.to)} / ${Math.max(item.from, item.to) + 1};`)}><div class="sequence-line svelte-12id1yf"></div> <div class="sequence-label svelte-12id1yf"><strong class="svelte-12id1yf">${escape_html(item.label)}</strong> <small class="svelte-12id1yf">${escape_html(item.document)} · Generated by ${escape_html(item.generatedBy)}</small> `);
        if (item.chargeable) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<span class="charge-pill svelte-12id1yf">${escape_html(item.chargeable)}</span>`);
        } else {
          $$renderer2.push("<!--[-1-->");
        }
        $$renderer2.push(`<!--]--></div></div> <p class="svelte-12id1yf">${escape_html(item.note)}</p></article>`);
      }
      $$renderer2.push(`<!--]--></div></section>`);
    }
    $$renderer2.push(`<!--]--></div></div></section></main></div>`);
  });
}
export {
  _page as default
};
