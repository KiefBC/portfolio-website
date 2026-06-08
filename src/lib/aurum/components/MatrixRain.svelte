<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const glyphs = 'アイウエオカキクケコ0123456789ABCDEF<>/\\#$%'.split('');
		const fontSize = 14;
		let columns = 0;
		let drops: number[] = [];
		let raf = 0;

		function resize() {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			columns = Math.floor(canvas.width / fontSize);
			drops = new Array(columns).fill(0).map(() => Math.random() * -50);
		}

		function frame() {
			if (!ctx) return;
			ctx.fillStyle = 'rgba(10, 10, 10, 0.12)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = 'rgba(212, 175, 55, 0.55)';
			ctx.font = `${fontSize}px 'Fira Code', monospace`;
			for (let i = 0; i < drops.length; i++) {
				const text = glyphs[Math.floor(Math.random() * glyphs.length)];
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);
				if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					drops[i] = 0;
				}
				drops[i]++;
			}
			raf = requestAnimationFrame(frame);
		}

		resize();
		window.addEventListener('resize', resize);
		frame();

		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas bind:this={canvas} class="matrix-rain"></canvas>

<style>
	.matrix-rain {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0.4;
		pointer-events: none;
	}
</style>
