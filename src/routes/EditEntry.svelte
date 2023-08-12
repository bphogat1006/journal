<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { base } from "$app/paths";
    import { localeDateString } from "$lib/date.js";

    export let entry = null

    const dispatch = createEventDispatcher()
    
    let entryID = -1
    let contentValue
    let contentTextColor
    let tagValue
    let tagTextColor
    let submitButton
    let date = localeDateString(new Date())

    if (entry) {
        entryID = entry.id
        contentValue = entry.content
        tagValue = entry.tags
        date = entry.date
    }

    let ready = false
    onMount(async () => {
        submitButton.disabled = !entry
        ready = true
    })

    function validEntryContent(content) {
        // also if content is empty, add confirmation for page reload
        window.onbeforeunload = (content == '') ? null : event => ""
        // check if characters are all ASCII
        return /^[\x00-\x7F]*$/.test(content) && content != ''
    }
    function validTags(tags) {
        // check if tags are a lowercase comma-delimited list or empty
        return /(^([a-z]+)(,[a-z]+)*$|^$)/.test(tags)
    }
    function validateForm(content, tags) {
        if (!ready) return
        const contentIsValid = validEntryContent(content)
        const tagsAreValid = validTags(tags)
        const formIsValid = contentIsValid && tagsAreValid
        submitButton.disabled = !formIsValid
        contentTextColor = contentIsValid ? 'black' : 'red'
        tagTextColor = tagsAreValid ? 'black' : 'red'
    }
    $: validateForm(contentValue, tagValue)

    async function postEntry(e) {
        const formData = new FormData(e.target)
        const url = base + '/api/entries' + ((entryID===-1) ? '' : ('/'+entryID))
        await fetch(url, {
            method: 'POST',
            body: formData
        })
        dispatch('submit')
        contentValue = ''
        tagValue = ''
    }

    async function deleteEntry() {
        await fetch(base+'/api/entries/'+entryID, {
            method: 'DELETE'
        })
        dispatch('submit')
    }
</script>

<form on:submit|preventDefault={postEntry} autocomplete="off">
    <textarea 
        bind:value={contentValue}
        style="color: {contentTextColor};"
        id="content"
        type="text"
        name="content"
        placeholder="Type your entry here!"
        required
    />
    <input
        bind:value={tagValue}
        style="color: {tagTextColor};"
        id="tags"
        type="text"
        name="tags"
        placeholder="lowercase,comma,separated,tags"
    >
    <input id="date" type="date" name="date" bind:value={date} required>
    <input id="date" type="hidden" name="id" bind:value={entryID}>
    <input bind:this={submitButton} id="submit" type="submit" value="Submit">
</form>

{#if entry}
    <br>
    <form on:submit|preventDefault={deleteEntry}>
        <input id="delete" type="submit" value="Delete">
    </form>
{/if}

<style>
    form {
        display: flex;
        flex-direction: column;
    }
    form > * {
        margin: 0.5rem auto;
        border: solid 1px black;
        font-size: 1rem;
        font-family: 'Roboto', sans-serif;
        background-color: white;
        transition: box-shadow .3s;
    }
    form > *:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
    }
    #content {
        margin: 0.5rem 0;
        padding: 1rem;
        height: 15rem;
        border-radius: 1rem;
        resize: vertical;
    }
    #tags {
        margin: 0.5rem auto;
        width: 20rem;
        padding: 0.75rem 1rem;
        border-radius: 2rem;
    }
    #date {
        width: min-content;
        border-radius: 2rem;
        padding: 0.5rem 0.75rem;
    }
    #submit, #delete {
        padding: 0.5rem 0.75rem;
        border-radius: 2rem;
        cursor: pointer;
    }
    #delete {
        background-color: #fbb;
    }
</style>