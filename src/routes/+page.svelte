<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  onMount(() => goto('/transactions', { replaceState: true }));
</script>

<p style="padding:20px">Redirecting to /transactions …</p>
