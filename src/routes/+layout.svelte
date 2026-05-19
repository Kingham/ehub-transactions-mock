<script>
  import '../app.css';
  import { page } from '$app/stores';
  import Sidebar from '$lib/components/Sidebar.svelte';
</script>

{#if $page.url.pathname === '/' || $page.url.pathname === '/community-info' || $page.url.pathname === '/module-maps'}
  <slot />
{:else}
  <div class="app-shell">
    <Sidebar />
    <main class="main">
      <slot />
    </main>
  </div>
{/if}
