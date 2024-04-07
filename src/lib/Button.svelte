<script>
    export let buttoncontent = {
        text: 'text',
        link: 'http://localhost',
        src: 'route to image',
        srcalt: 'alt here'
    }
</script>

<button class="bg-base2 m-11 flex align-normal px-24 py-6">
    <a href="{buttoncontent.link}">
        <div class="flex justify-normal">
            <img src={buttoncontent.src} alt={buttoncontent.srcalt} class="mx-2">
            <p>{buttoncontent.text}</p>
        </div>
    </a>
</button>