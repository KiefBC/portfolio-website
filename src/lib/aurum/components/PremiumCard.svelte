<script lang="ts">
	import type { Snippet } from 'svelte';
	import { tilt } from '$lib/aurum/actions/tilt';
	import { spotlight } from '$lib/aurum/actions/spotlight';

	interface Props {
		children: Snippet;
		/** Disable the 3D tilt (e.g. for large hero cards). */
		flat?: boolean;
		tiltMax?: number;
		class?: string;
	}

	let { children, flat = false, tiltMax = 6, class: klass = '' }: Props = $props();
</script>

<div
	class="premium-card {klass}"
	use:tilt={{ max: tiltMax, disabled: flat }}
	use:spotlight
	data-cursor="hover"
>
	{@render children()}
</div>
