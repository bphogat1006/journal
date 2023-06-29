import { json } from "@sveltejs/kit";
import { base } from "$app/paths";
import { query } from '$lib/server/db.js'

export async function GET({ url, fetch }) {
    // get all tags
    const res = await (await fetch(base+'/api/tags')).json()
    const tags = res.tags

    // get entries
    let queryString = 'SELECT * FROM entries WHERE 1'
    const queryInputs = []

    const params = url.searchParams
    if (params.has('start') && params.has('end')) {
        queryInputs.push(params.get('start'))
        queryInputs.push(params.get('end'))
        queryString += ' AND date BETWEEN ? AND ?'
    }
    if (params.has('tags')) {
        const tagsString = params.get('tags').replaceAll(',', '|')
        const tagsRegex = `(^|,)(${tagsString})(,|$)`
        queryInputs.push(tagsRegex)
        queryString += ' AND tags REGEXP ?'
    }
    queryString += ' ORDER BY date DESC, id DESC'
    if (params.has('limit')) {
        queryInputs.push(params.get('limit'))
        queryString += ' LIMIT ?'
    }
    
    const entries = await query(queryString, queryInputs)
    for (let i=0; i < entries.length; i++) {
        entries[i].date = entries[i].date.toISOString().substring(0,10)
    }
    return json({entries, tags})
}

export async function POST({ request }) {
    const formData = await request.formData()
    const content = formData.get('content').trim()
    let tags = formData.get('tags')
    const date = formData.get('date')

    tags = tags.split(',')
    tags.sort()
    tags = tags.join(',')

    await query('INSERT INTO entries (content, tags, date) VALUES (?, ?, ?)', [content, tags, date])
    return new Response()
}