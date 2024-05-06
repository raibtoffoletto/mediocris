interface IParent {
  children: React.ReactNode;
}

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

type RefuelDTO = Omit<Refuel, 'id'>;

interface RequestParams {
  params: Record<string, string>;
}

type Row = Record<string, any>;

type TransformRow<T> = (row: Row) => T;
