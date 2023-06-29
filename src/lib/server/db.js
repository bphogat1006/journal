import { createPool } from 'mariadb'
import { MARIADB_HOST, MARIADB_USER, MARIADB_PASSWORD, DATABASE } from '$env/static/private'

const db_config = {
    host: MARIADB_HOST,
    user: MARIADB_USER,
    password: MARIADB_PASSWORD,
    database: DATABASE,
    connectionLimit: 15
}
const pool = createPool(db_config)

export async function query(query, data=[], log = false) {
    let conn = null
    try {
        conn = await pool.getConnection()
        if (log) console.log(`${conn.threadId}: QUERY: ${query}`)
        const res = await conn.query(query, data)
        if (log) console.log(`${conn.threadId}: RESULT:`)
        if (log) console.log(res)
        return res
    } catch (err) {
        console.log('ERROR in query: '+query)
        throw err
    } finally {
        if (log) console.log(conn.threadId+": RELEASING")
        if (conn) conn.release()
    }
}

export function sanitizeInput() {
    
}