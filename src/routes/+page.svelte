<script lang="ts">
	import Button from '$lib/Button.svelte'
	import Pfp from '$lib/Pfp.svelte'
	let buttoncontents = [
		{text: 'Website', link: 'https://github.com/devTobbe', src: 'home.svg', srcalt: 'Little house icon'},
		{text: 'Github', link: 'https://github.com/devTobbe', src: 'github.svg', srcalt: 'Github icon'},
		{text: 'Website', link: 'https://github.com/devTobbe', src: 'home.svg', srcalt: 'Little house icon'},
		{text: 'Website', link: 'https://github.com/devTobbe', src: 'home.svg', srcalt: 'Little house icon'},
		{text: 'Website', link: 'https://github.com/devTobbe', src: 'home.svg', srcalt: 'Little house icon'}
	]
</script>

<div class="mx-auto max-w-fit my-6">
	<div id="threejs-contrainer" class=" flex flex-col items-center mx-auto max-w-fit">
		<Pfp/>
		<h1 class="font-header font-black text-3xl">@devTobbe</h1>
	</div>
</div>
	<div class="bg-base02">
		<div class="mx-auto max-w-fit">
		{#each buttoncontents as buttoncontent}
			<Button {buttoncontent}/>
		{/each}	
		</div>
	</div>
	
	