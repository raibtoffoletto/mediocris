import { exec, get, query } from '@lib/data/db';

function mapRefuel(row: Row) {
  const [year, month, day] = String(row['date']).split('-');

  const date: RefuelDate = {
    year: Number(year),
    month: Number(month) - 1, // Using JS month index
    day: Number(day),
  };

  return {
    id: Number(row['rowid']),
    banner: String(row['banner']),
    date,
    odometer: Number(row['odometer']),
    liters: Number(row['liters']),
    price: Number(row['price']),
    full: !!Number(row['full']),
  };
}

function getStringDate({ year, month, day }: RefuelDate) {
  const pad = (n: number) => `${n}`.padStart(2, '0');

  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function mapRefuelRow({
  banner: _banner,
  date: _date,
  full: _full,
  liters,
  odometer,
  price,
}: RefuelDTO) {
  const banner = _banner.trim();
  const full = _full ? 1 : 0;
  const date = getStringDate(_date);

  if (banner.length < 2) {
    throw new Error('Banner name is too short');
  }

  if (liters <= 0) {
    throw new Error('Liters cannot be empty');
  }

  if (odometer <= 0) {
    throw new Error('Odometer cannot be empty');
  }

  if (price <= 0) {
    throw new Error('Price cannot be empty');
  }

  return {
    banner,
    date,
    full,
    liters,
    odometer,
    price,
  };
}

function mapEconomy(row: Refuel, index: number, table: Refuel[]) {
  if (!row.full) {
    return { ...row, economy: null };
  }

  const olders = table.slice(index + 1);
  const nextFull = olders.findIndex((x) => !!x.full);
  const range = olders.slice(0, nextFull >= 0 ? nextFull + 1 : -1);

  if (!range.length) {
    return { ...row, economy: null };
  }

  const sum = range.reduce(
    (a, b) => ({
      odometer: Math.min(a.odometer, b.odometer),
      liters: a.liters + (b.full ? 0 : b.liters),
    }),
    {
      odometer: range[0].odometer,
      liters: 0,
    }
  );

  return {
    ...row,
    economy: (row.odometer - sum.odometer) / (row.liters + sum.liters),
  };
}

export async function listRefuels(): Promise<IEconomy<Refuel>[]> {
  const records = await query<Refuel>(
    'SELECT rowid, * FROM refuels ORDER BY date DESC;',
    [],
    mapRefuel
  );

  return records.map(mapEconomy);
}

export function getRefuel(id: number) {
  return get<Refuel>(
    'SELECT rowid, * FROM refuels WHERE rowid = ?;',
    [id],
    mapRefuel
  );
}

export async function putRefuel(refuel: RefuelDTO) {
  const { banner, date, full, liters, odometer, price } = mapRefuelRow(refuel);

  const insertSql = `INSERT INTO refuels
    (banner, date, full, liters, odometer, price)
    VALUES (?, ?, ?, ?, ?, ?);`;

  await exec(insertSql, [banner, date, full, liters, odometer, price]);

  const getSql =
    'SELECT rowid, * FROM refuels WHERE date = ? AND odometer = ? AND liters = ?;';

  return get<Refuel>(getSql, [date, odometer, liters], mapRefuel);
}

export async function patchRefuel(refuel: Refuel) {
  const { banner, date, full, liters, odometer, price } = mapRefuelRow(refuel);

  const sql = `UPDATE refuels
    SET banner = ?,
        date = ?,
        full = ?,
        liters = ?,
        odometer = ?,
        price = ?
    WHERE rowid = ?;`;

  await exec(sql, [banner, date, full, liters, odometer, price, refuel.id]);

  return refuel;
}

export function removeRefuel(id: number) {
  return exec('DELETE FROM refuels WHERE rowid = ?;', [id]);
}

export function listBanners(): Promise<string[]> {
  return query<string>(
    'SELECT DISTINCT banner FROM refuels ORDER BY banner;',
    [],
    (row) => String(row['banner'])
  );
}
