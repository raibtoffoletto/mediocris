interface RefuelDate {
  year: number;
  month: number;
  day: number;
}

interface Refuel {
  id: number;
  banner: string;
  date: RefuelDate;
  odometer: number;
  liters: number;
  price: number;
  full: boolean;
}

type Row = Record<string, any>;

type TransformRow<T> = (row: Row) => T;

type RefuelDTO = Omit<Refuel, 'id'>;

interface RequestParams {
  params: Record<string, string>;
}
