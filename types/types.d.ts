type IParent = {
  children?: React.ReactNode;
};

type PageTitleProps = IParent & {
  accent?: string;
  isLoading?: boolean;
  dense?: boolean;
};

type IDataContext = {
  isLoading: boolean;
  page: number;
  total: number;
  pageData: IEconomy<Refuel>[];
  changePage: (
    e: MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) => void;
  selected?: Refuel;
  changeSelected: (value?: Refuel) => void;
  deleteSelected: () => Promise<void>;
  saveRecord: (data: Refuel) => Promise<void>;
  lastOdometer?: number;
  lastPrice?: number;
};

type DataTableProps = { data: IEconomy<Refuel>[] };

type InfoCardProps = IEconomy<Refuel> & { shade: boolean };

type TCProps = TableCellProps & { align?: React.CSSProperties['textAlign'] };

type AlertDialogArgs =
  | {
      title: string;
      message?: string;
    }
  | {
      title?: string;
      message: string;
    };

type AlertDialogProps = AlertDialogArgs & {
  open: boolean;
  resolve?: (val: boolean) => void;
};

type RefuelFormProps = { record?: Partial<Refuel> };

type MenuItemProps = {
  onClick: () => void;
  label: string;
  Icon: React.ReactNode;
};
