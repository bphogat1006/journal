<script>
    import { createEventDispatcher } from "svelte";
    export let tag
    export let clickable = true

    const dispatch = createEventDispatcher()
    let clicked = false

    function tagClicked() {
        if (!clickable) return
        clicked = !clicked
        dispatch('click', {tag, clicked})
    }
</script>

<button 
    on:click|preventDefault={tagClicked}
    style="border: solid 1px {clicked ? '#00ff00' : 'black'};">
    {tag}
</button>

<style>
    button {
        font-size: 1rem;
        font-weight: normal;
        display: inline;
        margin-top: 0.5rem;
        margin-right: 0.5rem;
        padding: 0.25rem 0.5rem;
        border-radius: 1rem;
        background-color: white;
    }
    button:hover {
        cursor: pointer;
    }
</style>