import pg from 'pg';

pg.types.setTypeParser(1082, (value) => value);

export const pool = new pg.Pool();

export const query = (text, params) => pool.query(text, params);

export const close = () => pool.end();
