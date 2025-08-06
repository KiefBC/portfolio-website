<script lang="ts">
	import type { ProjectLinkType } from './types/project';

	export let type: ProjectLinkType;
	export let url: string | null = null;
	export let className: string = '';
	export let subtext: string | undefined = undefined;

	const linkConfigs = {
		github: {
			text: 'Public Project',
			colorClasses: 'text-green-400 opacity-70 hover:opacity-100 hover:text-green-300',
			icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
			iconType: 'fill'
		},
		preview: {
			text: 'Preview',
			colorClasses: 'text-yellow-400 opacity-70 hover:opacity-100 hover:text-yellow-300',
			icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
			iconType: 'stroke'
		},
		private: {
			text: 'Private Project',
			colorClasses: 'text-red-400 opacity-60',
			icon: 'M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z',
			iconType: 'fill'
		}
	};

	$: config = linkConfigs[type];
	$: hasUrl = type !== 'private' && url;
</script>

{#if hasUrl}
	<div class="flex flex-col">
		<a 
			href={url} 
			target="_blank"
			class="flex items-center {config.colorClasses} transition-all duration-200 project-link {className}"
		>
			{#if config.iconType === 'fill'}
				<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
					<path d={config.icon}></path>
				</svg>
			{:else}
				<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#each config.icon.split(' M') as pathData, i}
						{#if i === 0}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={pathData}></path>
						{:else}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M{pathData}"></path>
						{/if}
					{/each}
				</svg>
			{/if}
			{config.text}
		</a>
		{#if subtext}
			<span class="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-7 opacity-75">
				{subtext}
			</span>
		{/if}
	</div>
{:else if type === 'private'}
	<div class="flex flex-col">
		<span class="flex items-center {config.colorClasses} project-private {className}">
			<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
				<path d={config.icon}></path>
			</svg>
			{config.text}
		</span>
		{#if subtext}
			<span class="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-7 opacity-75">
				{subtext}
			</span>
		{/if}
	</div>
{/if}