<script>
  import { onMount, tick } from 'svelte';

  let open = false;
  let contextCustomer = '';
  let contextMode = 'question';
  let promptText = '';
  let inputText = '';
  let textareaEl;
  let conversation = [];
  let isTyping = false;

  const mockReplies = {
    'Where is invoice INV-24084?':
      'INV-24084 has been received by AP at Apex Retail UK, matched successfully, and is currently approved for payment. The next expected payment window is the week of 27 May.',
    'When is payment expected?':
      'Based on the latest status and remittance timing for this customer, the next expected payment window is the week of 27 May. If you need the exact invoice breakdown, ask me for expected cash by invoice.',
    'Can I get the remittance?':
      'Yes. A remittance is available for the latest scheduled payment run. You can view the remittance reference in Community now, and this could also be fed directly into your ERP automatically.'
  };

  function toggle() {
    open = !open;
  }
  function close() {
    open = false;
  }

  function applyContext(detail = {}) {
    contextCustomer = detail.customer || '';
    contextMode = detail.mode || 'question';
    inputText = '';
    conversation = [];
    isTyping = false;
    promptText =
      contextMode === 'query'
        ? `If I cannot answer, I will summarise this and help raise a query with ${contextCustomer || 'the customer'}.`
        : `Ask about invoice status, payment timing, remittances, or supporting documents${contextCustomer ? ` for ${contextCustomer}` : ''}.`;
  }

  async function seedConversation(prompt) {
    if (!prompt) return;

    conversation = [
      {
        role: 'user',
        text: prompt,
        time: '12:32 pm'
      }
    ];
    isTyping = true;
    await tick();
    await new Promise((resolve) => setTimeout(resolve, 650));
    conversation = [
      ...conversation,
      {
        role: 'eva',
        text: mockReplies[prompt] || 'I am checking the available transaction, payment, and remittance data now.',
        time: '12:32 pm'
      }
    ];
    isTyping = false;
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
      <button class="eva-close" on:click={close} aria-label="Close">✖</button>
      <button class="button secondary eva-new-chat-button">New Chat</button>
    </div>

    <div class="eva-conversation">
      <div class="eva-message">
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

      {#if !conversation.length}
        <div class="eva-message">
          <div class="eva-message-content">
            <div class="eva-message-text">{promptText || 'Ask me anything about your transactions.'}</div>
          </div>
          <div class="eva-message-timestamp">12:32 pm</div>
        </div>
      {/if}

      {#each conversation as item}
        <div class:item.role={item.role} class="chat-row" class:user-row={item.role === 'user'} class:eva-row={item.role === 'eva'}>
          <div class:eva-message-content={item.role === 'eva'} class:user-message-content={item.role === 'user'}>
            <div class:eva-message-text={item.role === 'eva'} class:user-message-text={item.role === 'user'}>{item.text}</div>
          </div>
          <div class:eva-message-timestamp={item.role === 'eva'} class:user-message-timestamp={item.role === 'user'}>{item.time}</div>
        </div>
      {/each}

      {#if isTyping}
        <div class="eva-message">
          <div class="eva-message-content typing-bubble">
            <span></span><span></span><span></span>
          </div>
          <div class="eva-message-timestamp">EVA is typing…</div>
        </div>
      {/if}
    </div>

    <div class="eva-input">
      <div class="eva-input-textbox">
        <div class="form-group block">
          <textarea bind:this={textareaEl} bind:value={inputText} placeholder={contextCustomer ? `Ask about ${contextCustomer}...` : 'Ask me anything...'}></textarea>
        </div>
      </div>
      <button class="eva-submit">Send</button>
    </div>
  </div>
</div>

<style>
  /* Overlay dim — fades in */
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

  /* Slide-out container — always mounted, translates off-screen when closed */
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

  /* Floating avatar — sits to the left of the panel and slides with it */
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
    display: grid;
    gap: 5px;
    max-width: 80%;
    width: fit-content;
  }
  .user-row {
    justify-self: end;
    justify-items: end;
    text-align: right;
  }
  .eva-row {
    justify-self: start;
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
