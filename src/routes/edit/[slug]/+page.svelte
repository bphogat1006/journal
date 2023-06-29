<script>
    import { base } from "$app/paths";
    import EditEntry from "../../EditEntry.svelte";

    export let data

    function submit() {
        window.location = base
    }
</script>

<EditEntry on:submit={submit} entry={data?.entry}/>