<script>
  import '../app.css';
  import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<div class="app-shell">
  <Sidebar />
  <main class="main">
    <slot />
  </main>
</div>
