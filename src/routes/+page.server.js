import { base } from "$app/paths";
import { localeDateString } from "$lib/date.js";

export async function load({ fetch }) {
    let endDate = localeDateString(new Date())
    let startDate = new Date()
    const dateRangeYears = 1
    startDate.setFullYear(startDate.getFullYear() - dateRangeYears);
    startDate = localeDateString(startDate)
    const params = new URLSearchParams()
    params.append('start', startDate)
    params.append('end', endDate)
    const res = await (await fetch(base+'/api/entries?'+params)).json()
    return {
        entries: res.entries,
        tags: res.tags,
        startDate,
        endDate
    }
}