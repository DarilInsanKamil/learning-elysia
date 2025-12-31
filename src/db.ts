import pg from "pg";
export const pool = new pg.Pool({
    host: Bun.env.PGHOST,
    port: 5432,
    user: Bun.env.PGUSER,
    password: Bun.env.PGPASSWORD,
    database: Bun.env.PGDATABASE,
});
// Optional tiny wrapper
export const query = <T extends pg.QueryResultRow>(text: string, params?: any[]) =>
    pool.query<T>(text, params);