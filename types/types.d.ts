type IParent = {
  children?: React.ReactNode;
};

type PageTitleProps = IParent & { accent?: string; isLoading?: boolean };

type IDataContext = {
  isLoading: boolean;
  page: number;
  total: number;
  pageData: Refuel[];
  changePage: (
    e: MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
};

type DataTableProps = { data: Refuel[] };
