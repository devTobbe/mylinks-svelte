<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Pfp from '$lib/Pfp.svelte';
	import Panel from '$lib/Panel.svelte';
	import buttondata from '$lib/data/buttondata.json';

	import { M } from 'svelte-motion';

	let buttoncontents = buttondata;
</script>

<Pfp />

<div id="threejs-contrainer" class="block justify-end items-end"></div>
<h1 class="font-header font-black text-3xl text-base03 text-center mb-4 -mt-10">@devTobbe</h1>

<div id="threejs-panel" class="relative rounded-full">
	<div class="absolute inset-x-0 flex flex-col items-center justify-center rounded-full">
		<Panel />
		<div>
			{#each buttoncontents as buttoncontent}
				<Button {buttoncontent} />
			{/each}
		</div>
		<footer>Test</footer>
	</div>
</div>
