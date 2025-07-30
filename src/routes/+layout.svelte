<script lang="ts">
	import '../app.css';
	import '../lib/styles/matrix-theme.css';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	
	injectAnalytics();
	
	let { children } = $props();
</script>

{@render children()}
