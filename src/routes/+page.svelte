<script lang="ts">
	import Button from '$lib/Button.svelte'
	let buttoncontents = [
		{text: 'Website', link: 'https://github.com/devTobbe', src: 'home.svg', srcalt: 'Little house icon'},
		{text: 'Github', link: 'https://github.com/devTobbe', src: 'github.svg', srcalt: 'Github icon'},
		{text: 'Website', link: 'https://github.com/devTobbe', src: 'home.svg', srcalt: 'Little house icon'},
		{text: 'Website', link: 'https://github.com/devTobbe', src: 'home.svg', srcalt: 'Little house icon'},
		{text: 'Website', link: 'https://github.com/devTobbe', src: 'home.svg', srcalt: 'Little house icon'}
	]

	
</script>
<h1>@devTobbe</h1>

<p >Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
		{#each buttoncontents as buttoncontent}
  			<Button {buttoncontent}/>
		{/each}		