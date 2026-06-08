<script lang="ts">
	import { cryptoReveal } from '$lib/aurum/actions/cryptoReveal';

	interface Props {
		text: string;
		duration?: number;
		class?: string;
		as?: 'span' | 'h1' | 'h2' | 'h3' | 'p';
	}

	let { text, duration = 900, class: klass = '', as = 'span' }: Props = $props();
	const SvelteTag = $derived(as);
</script>

<svelte:element this={SvelteTag} class="mono {klass}" use:cryptoReveal={{ duration }}>
	{text}
</svelte:element>
