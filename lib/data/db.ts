import type { Database, RunResult } from 'better-sqlite3';
import sqlite3 from 'better-sqlite3';
import { access, writeFile } from 'fs/promises';
import { join } from 'path';

let _db: Database | undefined = undefined;

async function migrate(db: Database) {
  db.prepare(
    `CREATE TABLE IF NOT EXISTS refuels (
      banner TEXT NOT NULL,
      date TEXT NOT NULL,
      odometer INTEGER NOT NULL,
      liters REAL NOT NULL,
      price REAL NOT NULL,
      full NUMERIC NOT NULL
    );`
  ).run();
}

async function getDb(): Promise<Database> {
  if (!_db) {
    const dbPath = join(
      process.env.NODE_ENV !== 'production'
        ? '.'
        : process.env['DB_PATH'] || '.',
      'app-data.db'
    );

    try {
      await access(dbPath);
    } catch {
      await writeFile(dbPath, '');
    }

    _db = new sqlite3(dbPath, {
      verbose: (...args: any[]) =>
        process.env.NODE_ENV === 'production'
          ? undefined
          : console.debug(...args),
    });

    await migrate(_db);
  }

  return _db;
}

export async function query<T>(
  stmt: string,
  args: any[] = [],
  transform?: TransformRow<T>
) {
  const db = await getDb();

  return new Promise<T[]>((res) => {
    const query = db.prepare(stmt);

    const rows = query.all(...args) as Row[];

    res(!!transform ? rows.map(transform) : (rows as T[]));
  });
}

export async function get<T>(
  stmt: string,
  args: any[] = [],
  transform?: TransformRow<T>
) {
  const db = await getDb();

  return new Promise<T | null>((res) => {
    const query = db.prepare(stmt);

    const first = query.get(...args) as Row;

    res(!first ? null : !!transform ? transform(first) : (first as T));
  });
}

export async function exec(stmt: string, args: any[] = []) {
  const db = await getDb();

  return new Promise<RunResult>((res) => {
    const result = db.prepare(stmt).run(...args);

    res(result);
  });
}
