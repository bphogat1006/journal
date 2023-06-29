import { json } from "@sveltejs/kit";
import { query } from '$lib/server/db.js'

export async function GET({ params }) {
    const entry = (await query('SELECT * FROM entries WHERE id=?', [params.slug]))[0]
    entry.date = entry.date.toISOString().substring(0,10)
    return json({entry})
}

export async function POST({ request, params }) {
    const formData = await request.formData()
    const content = formData.get('content').trim()
    let tags = formData.get('tags')
    const date = formData.get('date')

    tags = tags.split(',')
    tags.sort()
    tags = tags.join(',')

    await query('UPDATE entries SET content=?, tags=?, date=? WHERE id=?', [content, tags, date, params.slug])
    return new Response()
}

export async function DELETE({ params }) {
    await query('DELETE FROM entries WHERE id=?', [params.slug])
    return new Response()
}