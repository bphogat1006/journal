import { createPool } from 'mariadb'
import { env } from '$env/dynamic/private';

const db_config = {
    host: env.MARIADB_HOST,
    user: env.MARIADB_USER,
    password: env.MARIADB_PASSWORD,
    database: env.DATABASE,
    connectionLimit: 2
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
