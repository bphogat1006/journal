import { base } from "$app/paths";

export async function load({ fetch, params }) {
    const res = await (await fetch(base+'/api/entries/'+params.slug)).json()
    const entry = res.entry
    return {entry}
}