<script lang="ts">
	import Button from '$lib/Button.svelte'
	import Pfp from '$lib/Pfp.svelte'
	import Panel from '$lib/Panel.svelte';

	let buttoncontents = [
		{text: 'Website', link: 'https://github.com/devTobbe', src: 'home.svg', srcalt: 'Little house icon'},
		{text: 'Github', link: 'https://github.com/devTobbe', src: 'github.svg', srcalt: 'Github icon'},
		{text: 'Website', link: 'https://github.com/devTobbe', src: 'home.svg', srcalt: 'Little house icon'},
		{text: 'Website', link: 'https://github.com/devTobbe', src: 'home.svg', srcalt: 'Little house icon'},
		{text: 'Website', link: 'https://github.com/devTobbe', src: 'home.svg', srcalt: 'Little house icon'}
	]



</script>
<div class="inset-x-0 flex flex-col items-center justify-center">
	<div id="threejs-contrainer" class=" block w-full h-full">
		<div class="absolute inset-x-0 flex flex-col items-center justify-center">
			<Pfp/>
			<h1 class="font-header font-black text-3xl text-base03">@devTobbe</h1>
		</div>
	</div>
</div>
<div id="threejs-panel" class="relative w-full h-full">
    <div class="absolute inset-x-0 flex flex-col items-center justify-center">
        <Panel />
        <div class="">
            {#each buttoncontents as buttoncontent}
                <Button {buttoncontent}/>
            {/each}    
        </div>
    </div>
</div>
	
	