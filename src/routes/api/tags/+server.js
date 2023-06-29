import { json } from '@sveltejs/kit'
import { query } from '$lib/server/db.js'

export async function GET() {
    const allTagsQuery = await query('SELECT tags FROM entries where CHAR_LENGTH(tags) > 0')
    const allTags = []
    for (let entry of allTagsQuery) {
        const tags = entry.tags.split(',')
        for (const tag of tags) {
            if (!allTags.includes(tag)) {
                allTags.push(tag)
            }
        }
    }
    allTags.sort()
    return json({tags: allTags});
}