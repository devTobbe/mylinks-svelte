<script>
    export let buttoncontent = {
        text: 'text',
        link: 'http://localhost',
        src: 'route to image',
        srcalt: 'alt here'
    }
</script>

<div class="flex align-normal">
    <a href="{buttoncontent.link}" class="bg-base2 m-6 px-24 py-6 rounded-xl bg-opacity-50 backdrop-blur-md" target="_blank">
        <div class="flex justify-normal">
            <img src={buttoncontent.src} alt={buttoncontent.srcalt} class="mx-2">
            <p class="font-body">{buttoncontent.text}</p>
        </div>
    </a>
</div>