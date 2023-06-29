<script>
    import { base } from "$app/paths";
    import EditEntry from './EditEntry.svelte';
    import Entry from './Entry.svelte'
    import Tag from './Tag.svelte';
    
    export let data

    let startDate = data.startDate
    let endDate = data.endDate

    const selectedTags = []

    function tagClicked(e) {
        if (e.detail.clicked) {
            selectedTags.push(e.detail.tag)
        } else {
            selectedTags.splice(selectedTags.indexOf(e.detail.tag), 1);
        }
    }

    async function filterEntries() {
        const params = new URLSearchParams()
        if (selectedTags.length) {
            params.append('tags', selectedTags.join(','))
        }
        params.append('start', startDate)
        params.append('end', endDate)
        const res = await (await fetch(base+'/api/entries?'+params, {method: 'get'})).json()
        data.entries = res.entries
    }
</script>

<EditEntry on:submit={filterEntries}/>

<br>
<br>

<h3>Showing {data.entries.length} entr{data.entries.length > 1 ? 'ies' : 'y'} with the filters below</h3>

<form on:submit|preventDefault={filterEntries}>
    <input type="date" name="start" bind:value={startDate}>
    to
    <input type="date" name="end" bind:value={endDate}>
    <div id="tagContainer">
        {#each data.tags as tag}
            <Tag on:click={(e) => tagClicked(e)} tag={tag}/>
        {/each}
    </div>
    <input type="submit" value="Click To Filter">
</form>

<br>

{#each data.entries as entry (entry)}
    <Entry entry="{entry}"/>
{/each}

<style>
    #tagContainer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0;
        margin-top: 0.5rem;
    }
    form > * {
        border-radius: 2rem;
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
        font-family: 'Roboto', sans-serif;
    }
    input[type=submit] {
        cursor: pointer;
        background-color: white;
        border: solid 1px black;
        margin-top: 1rem;
    }
    input[type=date] {
        width: min-content;
    }
</style>