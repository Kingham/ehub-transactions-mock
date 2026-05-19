<script>
  let open = false;

  function toggle() {
    open = !open;
  }
  function close() {
    open = false;
  }
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
      <div class="user-message">
        <div class="user-message-content">
          <div class="user-message-text">Test</div>
        </div>
        <div class="user-message-timestamp">12:32 pm</div>
      </div>

      <div class="eva-message">
        <div class="eva-message-content">
          <div class="eva-message-text">
            Please provide further details about the information you would
            like to analyse. For example, are you interested in a specific
            document type, transaction status, supplier, or date range?
          </div>
        </div>
        <div class="eva-message-timestamp">12:32 pm</div>
      </div>
    </div>

    <div class="eva-input">
      <div class="eva-input-textbox">
        <div class="form-group block">
          <textarea placeholder="Ask me anything..."></textarea>
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

  .user-message {
    max-width: 300px;
    align-self: flex-end;
  }
  .user-message-content {
    background: var(--navy);
    border-radius: 12px;
    padding: 10px 12px;
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
