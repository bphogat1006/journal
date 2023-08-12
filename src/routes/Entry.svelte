<script>
    import { base } from "$app/paths";
    import Tag from './Tag.svelte';

    export let entry

    let tags = entry.tags ? entry.tags.split(',') : []

    function clicked() {
        window.location = base+'/edit/'+entry.id
    }
</script>

<div id="container" on:mouseup={clicked}>
    <p id="date"><strong>{entry.date}</strong></p>
    <p id="content">{@html entry.content}</p>
    <div>
        {#each tags as tag}
            <Tag tag={tag} clickable={false}/>
        {/each}
    </div>
</div>

<style>
    #container {
        width: auto;
        border-radius: 0.75rem;
        background-color: white;
        margin-bottom: 2rem;
        padding: 1rem;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s;
        cursor: pointer;
    }
    #container:hover {
        box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.15), 0 6px 20px 2px rgba(0, 0, 0, 0.15);
    }
    p {
        line-height: 1rem;
        margin: 0;
    }
    #date {
        white-space: nowrap;
        margin-bottom: 0.5rem;
    }
    #content {
        white-space: pre-wrap;
    }
</style>