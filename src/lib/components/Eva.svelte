<script>
  import { onMount, tick } from 'svelte';

  let open = false;
  let contextCustomer = '';
  let contextMode = 'question';
  let promptText = '';
  let inputText = '';
  let textareaEl;
  let conversationEl;
  let conversation = [];
  let isTyping = false;
  let activeScenario = '';
  let scenarioStep = '';
  let queryDraft = null;
  let transactionSearch = '';
  let transactionSearchOpen = false;
  let raiseQueryConversationSummary =
    'Invoice has failed matching and needs customer review.';

  const mockReplies = {
    'Where is invoice INV-24084?':
      'INV-24084 has been received by AP at Apex Retail UK, matched successfully, and is currently approved for payment. The next expected payment window is the week of 27 May.',
    'When can I expect payment for invoice INV-24091?':
      'INV-24091 is approved and currently scheduled for payment in the week of 27 May. If you need more detail, I can also show the expected cash breakdown by date or customer.',
    'Why is invoice INV-24076 on hold?':
      'INV-24076 is on hold because the customer has queried the delivery quantity against the invoice submitted. Query QRY-1048 is open, and the latest note is asking when the replacement shipment will be sent.'
  };

  const raiseQueryDraft = {
    customer: 'Apex Retail UK',
    transaction: 'INV-24118',
    linkedTransaction: 'INV-24118',
    subject: 'Invoice failed matching due to PO mismatch',
    category: 'Invoice approval and matching',
    priority: 'Medium',
    summary:
      'Invoice INV-24118 for £6,840 has failed matching. Based on the transaction data available, the invoice value appears higher than the currently matched PO value of £6,120. Please review and confirm why the invoice has not progressed.'
  };

  const availableTransactions = [
    {
      id: 'INV-24118',
      customer: 'Apex Retail UK',
      status: 'Failed matching',
      note: 'Received on 22 May • failed matching • matched value in view £6,120'
    },
    {
      id: 'INV-24091',
      customer: 'Apex Retail UK',
      status: 'Approved',
      note: 'Approved for payment • expected in the week of 27 May • value £4,120'
    },
    {
      id: 'INV-24084',
      customer: 'Apex Retail UK',
      status: 'Approved',
      note: 'Matched successfully • approved for payment • value £2,860'
    },
    {
      id: 'INV-24076',
      customer: 'Apex Retail UK',
      status: 'On hold',
      note: 'Hold linked to open query QRY-1048 • awaiting replacement shipment detail'
    }
  ];

  const timeLabel = '12:32 pm';

  function toggle() {
    open = !open;
  }
  function close() {
    open = false;
  }

  function transactionHref(reference, customer = '') {
    const transactionId = reference.startsWith('community-') ? reference : `community-${reference}`;
    return `/transactions/${transactionId}`;
  }

  function openTransaction(reference, customer = '') {
    if (!reference || typeof window === 'undefined') return;
    window.open(transactionHref(reference, customer), '_blank', 'noopener');
  }

  function queryHref(reference) {
    const params = new URLSearchParams({
      persona: 'sender',
      tab: 'queries',
      query: reference
    });
    return `/community?${params.toString()}`;
  }

  function openQuery(reference) {
    if (!reference || typeof window === 'undefined') return;
    window.open(queryHref(reference), '_blank', 'noopener');
  }

  function getTransactionSummary(reference) {
    return availableTransactions.find((item) => item.id === reference) || null;
  }

  function updateDraftConversation(nextDraft) {
    conversation = conversation.map((item) =>
      item.queryDraft ? { ...item, queryDraft: nextDraft } : item
    );
  }

  function setDraftTransaction(reference) {
    if (!queryDraft) return;
    const summary = getTransactionSummary(reference);
    queryDraft = {
      ...queryDraft,
      transaction: reference,
      linkedTransaction: summary?.id || reference,
      linkedTransactionSummary: summary || {
        id: reference,
        customer: queryDraft.customer,
        status: 'Selected transaction',
        note: 'Open the transaction to review the latest available detail.'
      }
    };
    transactionSearch = reference;
    transactionSearchOpen = false;
    updateDraftConversation(queryDraft);
  }

  function handleDraftTransactionInput(event) {
    const value = event.currentTarget.value;
    transactionSearch = value;
    transactionSearchOpen = true;
    if (queryDraft) {
      queryDraft = {
        ...queryDraft,
        transaction: value
      };
      updateDraftConversation(queryDraft);
    }
  }

  function handleDraftTransactionBlur() {
    setTimeout(() => {
      transactionSearchOpen = false;
    }, 120);
  }

  function applyContext(detail = {}) {
    contextCustomer = detail.customer || '';
    contextMode = detail.mode || 'question';
    inputText = '';
    conversation = [];
    isTyping = false;
    activeScenario = detail.scenario || '';
    scenarioStep = activeScenario === 'raise-query-demo' ? 'awaiting-first-message' : '';
    queryDraft = null;
    transactionSearch = '';
    transactionSearchOpen = false;
    raiseQueryConversationSummary =
      'Invoice has failed matching and needs customer review.';
    promptText =
      contextMode === 'query'
        ? `If I cannot answer, I will summarise this and help raise a query with ${contextCustomer || 'the customer'}.`
        : `Ask about invoice status, payment timing, remittances, or supporting documents${contextCustomer ? ` for ${contextCustomer}` : ''}.`;
  }

  function pushConversationItem(item) {
    conversation = [...conversation, item];
  }

  $: filteredTransactions =
    transactionSearch.trim().length === 0
      ? availableTransactions
      : availableTransactions.filter((item) =>
          `${item.id} ${item.customer} ${item.status}`.toLowerCase().includes(transactionSearch.toLowerCase())
        );

  async function scrollConversationToBottom() {
    await tick();
    if (conversationEl) {
      conversationEl.scrollTo({
        top: conversationEl.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  async function showTypingReply(item, delay = 650) {
    isTyping = true;
    await scrollConversationToBottom();
    await new Promise((resolve) => setTimeout(resolve, delay));
    pushConversationItem(item);
    isTyping = false;
    await scrollConversationToBottom();
  }

  async function seedConversation(prompt) {
    if (!prompt) return;

    conversation = [
      {
        role: 'user',
        text: prompt,
        time: timeLabel
      }
    ];
    activeScenario =
      activeScenario ||
      (prompt === 'Why is invoice INV-24076 on hold?'
        ? 'hold-query'
        : prompt === 'I need help with invoice INV-24118'
          ? 'raise-query-demo'
          : '');
    scenarioStep = activeScenario === 'raise-query-demo' ? 'invoice-found' : '';
    await showTypingReply({
      role: 'eva',
      text:
        prompt === 'I need help with invoice INV-24118'
          ? 'I can see invoice INV-24118 that you sent to Apex Retail UK for £6,840. It was received on 22 May and its current status is Failed matching. What would you like to know about it?'
          : mockReplies[prompt] || 'I am checking the available transaction, payment, and remittance data now.',
      time: timeLabel,
      querySummary:
        prompt === 'Why is invoice INV-24076 on hold?'
          ? {
              id: 'QRY-1048',
              status: 'Open',
              note: 'Please confirm when the replacement shipment will be sent so the invoice can be released.'
            }
          : null
      ,
      actions:
        prompt === 'I need help with invoice INV-24118'
          ? [
              { id: 'rq-why-not-moved', label: 'Why has it not moved on?' },
              { id: 'rq-show-notes', label: 'Show the latest processing notes' },
              { id: 'rq-write-own', label: 'Write my own response' }
            ]
          : null
    });
  }

  async function sendMessage() {
    const message = inputText.trim();
    if (!message) return;

    pushConversationItem({
      role: 'user',
      text: message,
      time: timeLabel
    });
    inputText = '';
    await scrollConversationToBottom();

    if (activeScenario === 'hold-query') {
      await showTypingReply(
        {
          role: 'eva',
          text: `I can add that as a note to Query QRY-1048 for ${contextCustomer || 'the customer'}. Would you like me to do that now?`,
          time: timeLabel,
          actions: [
            { id: 'confirm-note', label: 'Yes, add note' },
            { id: 'dismiss-note', label: 'No thanks' }
          ]
        },
        500
      );
      return;
    }

    if (activeScenario === 'raise-query-demo') {
      await handleRaiseQueryScenarioInput(message);
      return;
    }

    await showTypingReply(
      {
        role: 'eva',
        text: 'I am checking the available transaction, payment, and remittance data now.',
        time: timeLabel
      },
      500
    );
  }

  async function handleAction(actionId, actionLabel = '') {
    conversation = conversation.map((item) =>
      item.actions?.length
        ? { ...item, actions: item.actions.map((action) => ({ ...action, disabled: true })) }
        : item
    );

    if (actionId !== 'rq-write-own' && actionId !== 'rq-try-amount' && actionLabel) {
      pushConversationItem({
        role: 'user',
        text: actionLabel,
        time: timeLabel
      });
      await scrollConversationToBottom();
    }

    if (actionId === 'confirm-note') {
      await showTypingReply(
        {
          role: 'eva',
          text: 'Note added to Query QRY-1048. Anything else I can help with?',
          time: timeLabel
        },
        350
      );
      activeScenario = '';
      return;
    }

    if (actionId.startsWith('rq-')) {
      await handleRaiseQueryScenarioAction(actionId);
      return;
    }

    await showTypingReply(
      {
        role: 'eva',
        text: 'No problem. I have not updated the query. If you want, I can still help you draft a response or raise a new query.',
        time: timeLabel
      },
      350
    );
  }

  async function handleRaiseQueryScenarioInput(message) {
    const normalised = message.toLowerCase();

    if (scenarioStep === 'awaiting-first-message') {
      scenarioStep = 'invoice-found';
      await showTypingReply(
        {
          role: 'eva',
          text: 'In the last couple of months I can only see 1 invoice for £6,840, invoice number INV-24118, that you sent to Apex Retail UK. It was received on 22 May and its current status is Failed matching. What would you like to know about it?',
          time: timeLabel,
          querySummary: {
            id: 'INV-24118',
            status: 'Failed matching',
            note: 'Received on 22 May • failed matching • matched value in view £6,120'
          },
          actions: [
            { id: 'rq-why-not-moved', label: 'Why has it not moved on?' },
            { id: 'rq-not-that-invoice', label: "It's not that invoice" },
            { id: 'rq-write-own', label: 'Write my own response' }
          ]
        },
        500
      );
      return;
    }

    if (scenarioStep === 'invoice-found') {
      if (normalised.includes('why') || normalised.includes('moved') || normalised.includes('approved')) {
        await handleRaiseQueryScenarioAction('rq-why-not-moved');
        return;
      }
      if (normalised.includes('not that') || normalised.includes('wrong invoice')) {
        await handleRaiseQueryScenarioAction('rq-not-that-invoice');
        return;
      }
    }

    if (
      scenarioStep === 'processing-explained' ||
      scenarioStep === 'processing-notes' ||
      scenarioStep === 'awaiting-value-confirmation'
    ) {
      if (normalised.includes('detail') || normalised.includes('more')) {
        await handleRaiseQueryScenarioAction('rq-explain-more');
        return;
      }
      if (
        normalised.includes('extra product') ||
        normalised.includes('additional product') ||
        normalised.includes('value is correct') ||
        normalised.includes('yes it is') ||
        normalised.includes('invoice is correct')
      ) {
        await handleRaiseQueryScenarioAction('rq-value-correct-extra-product');
        return;
      }
      if (normalised.includes('review it') || normalised.includes('need to review')) {
        await handleRaiseQueryScenarioAction('rq-review-my-side');
        return;
      }
      if (normalised.includes('ask') || normalised.includes('review') || normalised.includes('wrong')) {
        await handleRaiseQueryScenarioAction('rq-ask-review');
        return;
      }
    }

    if (scenarioStep === 'ready-to-raise') {
      if (normalised.includes('yes') || normalised.includes('raise')) {
        await handleRaiseQueryScenarioAction('rq-confirm-raise');
        return;
      }
      if (normalised.includes('no') || normalised.includes('leave')) {
        await handleRaiseQueryScenarioAction('rq-leave-for-now');
        return;
      }
    }

    await showTypingReply(
      {
        role: 'eva',
        text: 'I can keep helping with this invoice, or I can prepare a query for the customer if you want me to escalate it.',
        time: timeLabel,
        actions:
          scenarioStep === 'ready-to-raise'
            ? [
                { id: 'rq-confirm-raise', label: 'Yes, raise it' },
                { id: 'rq-leave-for-now', label: 'No, leave it for now' },
                { id: 'rq-write-own', label: 'Write my own response' }
              ]
            : [
                { id: 'rq-explain-more', label: 'Explain in more detail' },
                { id: 'rq-ask-review', label: 'Ask them to review it' },
                { id: 'rq-write-own', label: 'Write my own response' }
              ]
      },
      350
    );
  }

  async function handleRaiseQueryScenarioAction(actionId) {
    if (actionId === 'rq-write-own') {
      await tick();
      textareaEl?.focus();
      return;
    }

    if (actionId === 'rq-why-not-moved') {
      scenarioStep = 'processing-explained';
      await showTypingReply(
        {
          role: 'eva',
          text: 'I can see it has not yet reached approval. I cannot see a payment hold or an existing query currently linked to it. The transaction status is Failed matching because the latest processing note shows a mismatch against the purchase order. Do you want me to explain that in more detail?',
          time: timeLabel,
          actions: [
            { id: 'rq-explain-more', label: 'Yes, explain more' },
            { id: 'rq-ask-review', label: 'Can you ask them to review it?' },
            { id: 'rq-write-own', label: 'Write my own response' }
          ]
        },
        500
      );
      return;
    }

    if (actionId === 'rq-show-notes') {
      scenarioStep = 'processing-notes';
      await showTypingReply(
        {
          role: 'eva',
          text: 'The latest processing note says the invoice value is £6,840, but the matched PO value currently available is £6,120. The transaction status is Failed matching, which is why it has not moved forward yet.',
          time: timeLabel,
          actions: [
            { id: 'rq-explain-more', label: 'Explain in more detail' },
            { id: 'rq-ask-review', label: 'Can you ask them to review it?' },
            { id: 'rq-write-own', label: 'Write my own response' }
          ]
        },
        500
      );
      return;
    }

    if (actionId === 'rq-not-that-invoice') {
      scenarioStep = 'awaiting-first-message';
      await showTypingReply(
        {
          role: 'eva',
          text: 'No problem. If you can give me another amount, invoice number, or approximate date, I will narrow it down again.',
          time: timeLabel,
          actions: [
            { id: 'rq-write-own', label: 'Write my own response' },
            { id: 'rq-try-amount', label: 'Try another amount' }
          ]
        },
        400
      );
      return;
    }

    if (actionId === 'rq-try-amount') {
      await tick();
      textareaEl?.focus();
      return;
    }

    if (actionId === 'rq-explain-more') {
      scenarioStep = 'awaiting-value-confirmation';
      await showTypingReply(
        {
          role: 'eva',
          text: 'The invoice value is £6,840, but the matched PO value currently available is £6,120. I cannot tell from the transaction data alone whether this is an agreed change, a partial receipt, or an error. Do you believe the invoice value is correct?',
          time: timeLabel,
          actions: [
            { id: 'rq-value-correct-extra-product', label: 'Yes, the value is correct' },
            { id: 'rq-review-my-side', label: 'No, I need to review it first' },
            { id: 'rq-write-own', label: 'Write my own response' }
          ]
        },
        500
      );
      return;
    }

    if (actionId === 'rq-value-correct-extra-product') {
      scenarioStep = 'ready-to-raise';
      raiseQueryConversationSummary =
        'The sender confirmed the invoice value is correct and advised that the customer asked for an extra product after the original order.';
      await showTypingReply(
        {
          role: 'eva',
          text: `Understood. I will include that the invoice value is correct and that the customer asked for an extra product after the original order. I can now raise a query to ${contextCustomer || raiseQueryDraft.customer} and include a summary of what we have discussed so you do not need to repeat it.`,
          time: timeLabel,
          actions: [
            { id: 'rq-confirm-raise', label: 'Yes, raise it' },
            { id: 'rq-leave-for-now', label: 'No, leave it for now' },
            { id: 'rq-write-own', label: 'Write my own response' }
          ]
        },
        500
      );
      return;
    }

    if (actionId === 'rq-review-my-side') {
      scenarioStep = 'processing-explained';
      raiseQueryConversationSummary =
        'The sender wants to review the invoice value internally before deciding whether to raise a query.';
      await showTypingReply(
        {
          role: 'eva',
          text: 'No problem. Review it on your side first. If you still need help afterwards, I can pick this up again and prepare the query for you.',
          time: timeLabel
        },
        350
      );
      activeScenario = '';
      return;
    }

    if (actionId === 'rq-what-next') {
      scenarioStep = 'ready-to-raise';
      await showTypingReply(
        {
          role: 'eva',
          text: `I can raise a query to ${contextCustomer || raiseQueryDraft.customer} and include a summary of what we have discussed so you do not need to repeat it.`,
          time: timeLabel,
          actions: [
            { id: 'rq-confirm-raise', label: 'Yes, raise it' },
            { id: 'rq-leave-for-now', label: 'No, leave it for now' },
            { id: 'rq-write-own', label: 'Write my own response' }
          ]
        },
        500
      );
      return;
    }

    if (actionId === 'rq-ask-review') {
      scenarioStep = 'ready-to-raise';
      await showTypingReply(
        {
          role: 'eva',
          text: `I can raise a query to ${contextCustomer || raiseQueryDraft.customer} and include a summary of what we have discussed so you do not need to repeat it.`,
          time: timeLabel,
          actions: [
            { id: 'rq-confirm-raise', label: 'Yes, raise it' },
            { id: 'rq-leave-for-now', label: 'No, leave it for now' },
            { id: 'rq-write-own', label: 'Write my own response' }
          ]
        },
        500
      );
      return;
    }

    if (actionId === 'rq-confirm-raise') {
      scenarioStep = 'draft-ready';
      queryDraft = {
        ...raiseQueryDraft,
        customer: contextCustomer || raiseQueryDraft.customer,
        transaction: raiseQueryDraft.transaction,
        linkedTransaction: raiseQueryDraft.linkedTransaction,
        summary:
          raiseQueryConversationSummary ===
          'The sender confirmed the invoice value is correct and advised that the customer asked for an extra product after the original order.'
            ? 'Invoice INV-24118 for £6,840 has failed matching. Based on the transaction data available, the invoice value appears higher than the currently matched PO value of £6,120. The sender has confirmed the invoice value is correct and advised that the customer asked for an extra product after the original order. Please review and confirm why the invoice has not progressed.'
            : raiseQueryDraft.summary,
        linkedTransactionSummary: getTransactionSummary(raiseQueryDraft.linkedTransaction)
      };
      transactionSearch = queryDraft.transaction;
      transactionSearchOpen = false;
      pushConversationItem({
        role: 'eva',
        text: 'I have prepared the query for you. You can review the details below before sending it.',
        time: timeLabel,
        queryDraft,
        actions: [
          { id: 'rq-submit-query', label: 'Raise query' },
          { id: 'rq-leave-for-now', label: 'Cancel' }
        ]
      });
      await scrollConversationToBottom();
      return;
    }

    if (actionId === 'rq-submit-query') {
      await showTypingReply(
        {
          role: 'eva',
          text: `Query raised to ${queryDraft?.customer || contextCustomer}. Reference QRY-1091. Anything else I can help with?`,
          time: timeLabel,
          querySummary: {
            id: 'QRY-1091',
            status: 'Raised',
            note: 'Linked to transaction INV-24118 (Failed matching) and ready for follow-up in Community.'
          },
          queryLink: {
            id: 'QRY-1091',
            note: 'Open this query in the Sender Queries workspace.'
          }
        },
        350
      );
      activeScenario = '';
      scenarioStep = '';
      queryDraft = null;
      return;
    }

    if (actionId === 'rq-leave-for-now') {
      await showTypingReply(
        {
          role: 'eva',
          text: 'No problem. I have left the query unraised. If you want, I can still help you refine the question or prepare it later.',
          time: timeLabel
        },
        350
      );
      return;
    }
  }

  onMount(() => {
    const handleOpen = async (event) => {
      applyContext(event.detail);
      open = true;
      await tick();
      textareaEl?.focus();
      if (inputText) {
        textareaEl?.setSelectionRange(inputText.length, inputText.length);
      }
      if (event.detail?.prompt) {
        seedConversation(event.detail.prompt);
      }
    };

    window.addEventListener('open-eva', handleOpen);
    return () => window.removeEventListener('open-eva', handleOpen);
  });
</script>

<div class="eva-overlay" class:is-open={open} on:click={close} role="presentation"></div>

<div class="eva-container" class:is-open={open}>
  <div class="eva-float">
    <img src="/eva/EVA-Float.png" alt="EVA" on:click={toggle} />
  </div>

  <div class="eva-container-inner">
    <div class="eva-header">
      <img src="/eva/EVA-Header.png" alt="EVA Header" />
      <button class="eva-close" on:click={close} aria-label="Close">&times;</button>
      <button class="button secondary eva-new-chat-button">New Chat</button>
    </div>

    <div class="eva-conversation" bind:this={conversationEl}>
      <div class="chat-row eva-row">
        <img class="chat-avatar eva-avatar" src="/eva/EVA-Circle.png" alt="EVA" />
        <div class="chat-bubble-stack">
          <div class="eva-message-content">
            <div class="eva-message-text">
              {#if contextCustomer}
                You are asking about activity with <strong>{contextCustomer}</strong>.
              {/if}
              Ask your question and I will try to answer it from the invoice, payment, remittance, and query data
              available in Community.
            </div>
          </div>
          <div class="eva-message-timestamp">12:32 pm</div>
        </div>
      </div>

      {#if !conversation.length}
        <div class="chat-row eva-row">
          <img class="chat-avatar eva-avatar" src="/eva/EVA-Circle.png" alt="EVA" />
          <div class="chat-bubble-stack">
            <div class="eva-message-content">
              <div class="eva-message-text">{promptText || 'Ask me anything about your transactions.'}</div>
            </div>
            <div class="eva-message-timestamp">12:32 pm</div>
          </div>
        </div>
      {/if}

      {#each conversation as item}
        <div class:item.role={item.role} class="chat-row" class:user-row={item.role === 'user'} class:eva-row={item.role === 'eva'}>
          {#if item.role === 'eva'}
            <img class="chat-avatar eva-avatar" src="/eva/EVA-Circle.png" alt="EVA" />
          {/if}
          <div class="chat-bubble-stack">
            <div class:eva-message-content={item.role === 'eva'} class:user-message-content={item.role === 'user'}>
              <div class:eva-message-text={item.role === 'eva'} class:user-message-text={item.role === 'user'}>{item.text}</div>
              {#if item.querySummary}
                <div class="query-summary-card">
                  <div class="query-summary-top">
                    {#if item.queryLink}
                      <button
                        type="button"
                        class="query-summary-link"
                        on:click={() => openQuery(item.queryLink.id)}
                      >
                        {item.querySummary.id}
                      </button>
                    {:else}
                      <button
                        type="button"
                        class="query-summary-link"
                        on:click={() => openTransaction(item.querySummary.id, contextCustomer || raiseQueryDraft.customer)}
                      >
                        {item.querySummary.id}
                      </button>
                    {/if}
                    <span class="query-summary-status">{item.querySummary.status}</span>
                  </div>
                  <div class="query-summary-note">{item.queryLink ? item.queryLink.note : item.querySummary.note}</div>
                </div>
              {/if}
              {#if item.queryDraft}
                <div class="query-draft-card">
                  <div class="query-draft-grid">
                    <label>
                      <span>Customer</span>
                      <input value={(queryDraft || item.queryDraft).customer} readonly />
                    </label>
                    <label>
                      <span>Transaction</span>
                      <div class="transaction-search-wrap">
                        <input
                          value={transactionSearch}
                          on:input={handleDraftTransactionInput}
                          on:focus={() => (transactionSearchOpen = true)}
                          on:blur={handleDraftTransactionBlur}
                          placeholder="Search by transaction number"
                        />
                        {#if (queryDraft || item.queryDraft).linkedTransactionSummary && (queryDraft || item.queryDraft).linkedTransactionSummary.status !== 'Failed matching'}
                          <span class="transaction-selected-status">
                            Status: {(queryDraft || item.queryDraft).linkedTransactionSummary.status}
                          </span>
                        {/if}
                        {#if transactionSearchOpen && filteredTransactions.length}
                          <div class="transaction-search-results">
                            {#each filteredTransactions as transaction}
                              <button
                                type="button"
                                class="transaction-search-result"
                                on:click={() => setDraftTransaction(transaction.id)}
                              >
                                <strong>{transaction.id}</strong>
                                <span>{transaction.customer} • {transaction.status}</span>
                              </button>
                            {/each}
                          </div>
                        {/if}
                      </div>
                    </label>
                    <label class="wide">
                      <span>Subject</span>
                      <input value={(queryDraft || item.queryDraft).subject} readonly />
                    </label>
                    <label>
                      <span>Category</span>
                      <input value={(queryDraft || item.queryDraft).category} readonly />
                    </label>
                    <label>
                      <span>Priority</span>
                      <input value={(queryDraft || item.queryDraft).priority} readonly />
                    </label>
                    <label class="wide">
                      <span>Summary</span>
                      <textarea readonly>{(queryDraft || item.queryDraft).summary}</textarea>
                    </label>
                  </div>
                  {#if (queryDraft || item.queryDraft).linkedTransactionSummary}
                    <div class="query-summary-card query-draft-summary">
                      <div class="query-summary-top">
                        <button
                          type="button"
                          class="query-summary-link"
                          on:click={() =>
                            openTransaction(
                              (queryDraft || item.queryDraft).linkedTransactionSummary.id,
                              (queryDraft || item.queryDraft).customer
                            )}
                        >
                          {(queryDraft || item.queryDraft).linkedTransactionSummary.id}
                        </button>
                        {#if (queryDraft || item.queryDraft).linkedTransactionSummary.status !== 'Failed matching'}
                          <span class="query-summary-status">
                            {(queryDraft || item.queryDraft).linkedTransactionSummary.status}
                          </span>
                        {/if}
                      </div>
                      <div class="query-summary-note">
                        {(queryDraft || item.queryDraft).linkedTransactionSummary.note}
                      </div>
                    </div>
                  {/if}
                </div>
              {/if}
              {#if item.actions?.length}
                <div class="chat-actions">
                  {#each item.actions as action}
                    <button type="button" class="chat-action-btn" disabled={action.disabled} on:click={() => handleAction(action.id, action.label)}>
                      {action.label}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
            <div class:eva-message-timestamp={item.role === 'eva'} class:user-message-timestamp={item.role === 'user'}>{item.time}</div>
          </div>
          {#if item.role === 'user'}
            <span class="chat-avatar user-avatar" aria-hidden="true">AF</span>
          {/if}
        </div>
      {/each}

      {#if isTyping}
        <div class="chat-row eva-row">
          <img class="chat-avatar eva-avatar" src="/eva/EVA-Circle.png" alt="EVA" />
          <div class="chat-bubble-stack">
            <div class="eva-message-content typing-bubble">
              <span></span><span></span><span></span>
            </div>
            <div class="eva-message-timestamp">EVA is typing...</div>
          </div>
        </div>
      {/if}
    </div>

    <div class="eva-input">
      <div class="eva-input-textbox">
        <div class="form-group block">
          <textarea
            bind:this={textareaEl}
            bind:value={inputText}
            placeholder={contextCustomer ? `Ask about ${contextCustomer}...` : 'Ask me anything...'}
            on:keydown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
              }
            }}
          ></textarea>
        </div>
      </div>
      <button class="eva-submit" on:click={sendMessage}>Send</button>
    </div>
  </div>
</div>

<style>
  /* Overlay dim - fades in */
  .eva-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: opacity 320ms ease, visibility 0s linear 320ms;
  }
  .eva-overlay.is-open {
    opacity: 1;
    visibility: visible;
    transition: opacity 320ms ease, visibility 0s linear 0s;
  }

  /* Slide-out container - always mounted, translates off-screen when closed */
  .eva-container {
    position: fixed;
    bottom: 0;
    right: 0;
    height: 100vh;
    z-index: 1001;
    display: flex;
    transform: translateX(600px);
    transition: transform 360ms cubic-bezier(0.22, 0.61, 0.36, 1);
    will-change: transform;
  }
  .eva-container.is-open {
    transform: translateX(0);
  }

  /* Floating avatar - sits to the left of the panel and slides with it */
  .eva-float {
    width: 1px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .eva-float img {
    width: 100px;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
    pointer-events: auto;
    transition: transform 200ms ease;
  }
  .eva-float img:hover {
    transform: scale(1.04);
  }

  .eva-container-inner {
    width: 600px;
    background: var(--bg);
    display: flex;
    flex-direction: column;
    border-left: 1px solid var(--border);
    box-shadow: 0 -5px 20px 0 rgba(26, 51, 96, 0.15);
  }

  /* Header */
  .eva-header {
    position: relative;
  }
  .eva-header img {
    width: 100%;
    display: block;
  }
  .eva-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: var(--bg);
    border: 1px solid var(--border);
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 6px;
    font-size: 12px;
    line-height: 1;
  }
  .eva-close:hover {
    background: var(--navy);
    color: #fff;
  }
  .eva-new-chat-button {
    position: absolute;
    top: 65px;
    right: 20px;
    background: #fff;
    border: 1px solid var(--border-strong);
    color: var(--navy);
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  /* Conversation */
  .eva-conversation {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 16px;
    flex: 1;
    overflow: auto;
  }

  .eva-message {
    align-self: flex-start;
    max-width: 80%;
  }
  .chat-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    max-width: 85%;
    width: fit-content;
  }
  .user-row {
    align-self: flex-end;
    flex-direction: row;
    text-align: right;
  }
  .eva-row {
    align-self: flex-start;
  }
  .chat-bubble-stack {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
  }
  .user-row .chat-bubble-stack {
    align-items: flex-end;
  }
  .chat-avatar {
    flex: 0 0 auto;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    object-fit: cover;
  }
  .user-avatar {
    background: var(--navy);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
  }
  .eva-message-content {
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 10px 12px;
  }
  .eva-message-text {
    color: #222;
    line-height: 1.4;
  }
  .query-summary-card {
    margin-top: 12px;
    padding: 12px 14px;
    border-radius: 14px;
    border: 1px solid rgba(214, 149, 61, 0.28);
    background: linear-gradient(180deg, rgba(255, 247, 232, 0.95), rgba(255, 241, 214, 0.92));
  }
  .query-summary-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 6px;
    font-size: 12px;
    color: var(--navy);
  }
  .query-summary-link {
    appearance: none;
    border: 0;
    background: transparent;
    padding: 0;
    margin: 0;
    color: var(--navy);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 0.18em;
  }
  .query-summary-status {
    padding: 4px 8px;
    border-radius: 999px;
    background: rgba(214, 149, 61, 0.18);
    color: #9a5d10;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .query-summary-note {
    font-size: 13px;
    line-height: 1.45;
    color: rgba(16, 41, 79, 0.82);
  }
  .query-draft-card {
    margin-top: 12px;
    padding: 14px;
    border-radius: 14px;
    border: 1px solid rgba(31, 109, 140, 0.18);
    background: linear-gradient(180deg, rgba(245, 250, 255, 0.98), rgba(255, 255, 255, 0.98));
  }
  .query-draft-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 12px;
  }
  .query-draft-grid label {
    display: grid;
    gap: 6px;
    font-size: 11px;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .query-draft-grid label.wide {
    grid-column: 1 / -1;
  }
  .transaction-search-wrap {
    position: relative;
  }
  .transaction-selected-status {
    display: block;
    margin-top: 6px;
    color: #0b7f77;
    font-size: 12px;
    font-weight: 700;
    text-transform: none;
    letter-spacing: 0;
  }
  .query-draft-grid input,
  .query-draft-grid textarea {
    width: 100%;
    border: 1px solid rgba(148, 163, 184, 0.3);
    border-radius: 10px;
    background: #fff;
    color: var(--navy);
    font: inherit;
    font-size: 13px;
    padding: 10px 12px;
    box-sizing: border-box;
  }
  .transaction-search-results {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    display: grid;
    gap: 6px;
    padding: 8px;
    border-radius: 12px;
    border: 1px solid rgba(148, 163, 184, 0.25);
    background: #fff;
    box-shadow: 0 14px 30px rgba(16, 41, 79, 0.14);
    z-index: 4;
  }
  .transaction-search-result {
    appearance: none;
    border: 1px solid rgba(219, 228, 239, 0.95);
    background: rgba(245, 249, 255, 0.92);
    color: var(--navy);
    border-radius: 10px;
    padding: 10px 12px;
    text-align: left;
    display: grid;
    gap: 3px;
    cursor: pointer;
  }
  .transaction-search-result strong {
    font-size: 13px;
  }
  .transaction-search-result span {
    font-size: 11px;
    color: var(--text-dim);
  }
  .query-draft-summary {
    margin-top: 14px;
  }
  .query-draft-grid textarea {
    min-height: 110px;
    resize: none;
    line-height: 1.5;
  }
  .eva-message-timestamp {
    color: var(--text-soft);
    font-size: 10px;
    padding: 5px;
  }
  .user-message-content {
    background: var(--navy);
    border-radius: 12px;
    padding: 10px 12px;
    width: fit-content;
    max-width: 100%;
  }
  .user-message-text {
    color: #fff;
    line-height: 1.4;
  }
  .user-message-timestamp {
    color: var(--text-soft);
    font-size: 10px;
    padding: 5px;
    text-align: right;
  }
  .chat-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 12px;
  }
  .chat-action-btn {
    border: 1px solid rgba(16, 41, 79, 0.12);
    background: #fff;
    color: var(--navy);
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }
  .chat-action-btn:disabled {
    opacity: 0.55;
    cursor: default;
  }
  .typing-bubble {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 54px;
  }
  .typing-bubble span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #9db2c8;
    animation: evaPulse 1s infinite ease-in-out;
  }
  .typing-bubble span:nth-child(2) {
    animation-delay: 0.15s;
  }
  .typing-bubble span:nth-child(3) {
    animation-delay: 0.3s;
  }
  @keyframes evaPulse {
    0%, 80%, 100% { opacity: 0.35; transform: translateY(0); }
    40% { opacity: 1; transform: translateY(-2px); }
  }

  /* Input area */
  .eva-input {
    padding: 10px;
    box-sizing: border-box;
    gap: 5px;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .eva-input-textbox .block {
    padding: 0;
    width: 80%;
  }
  .eva-input textarea {
    width: 100%;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 10px;
    min-height: 70px;
    resize: none;
    font-family: inherit;
    font-size: 13px;
    color: var(--text);
    outline: none;
  }
  .eva-input textarea:focus {
    border-color: var(--navy);
  }
  .eva-submit {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: var(--navy);
    color: #fff;
    padding: 8px 16px;
    border: 0;
    border-radius: 6px;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
  }
  .eva-submit:hover {
    background: var(--navy-deep);
  }
</style>
