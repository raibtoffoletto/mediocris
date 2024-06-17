'use client';

import { ApiRoutes, RowsPerPage, i18nNS } from '@constants';
import alertDialog from '@lib/alert';
import { useTranslation } from '@lib/i18n/client';
import snackbar from '@lib/snackbar';
import useApi from '@lib/useApi';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import useSWR from 'swr';

const DataContext = createContext<IDataContext>({
  isLoading: false,
  page: 0,
  total: 0,
  pageData: [],
  changePage: () => undefined,
  changeSelected: () => undefined,
  deleteSelected: async () => undefined,
  saveRecord: async () => undefined,
});

export const useData = () => useContext(DataContext);

export function DataProvider({ children, params: { lang } }: IParams<IParent>) {
  const t = useTranslation(lang, i18nNS.Main);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Refuel | undefined>();
  const { callApi, fetcher } = useApi();
  const { data, isLoading, isValidating, mutate } = useSWR<IEconomy<Refuel>[]>(
    ApiRoutes.refuels,
    fetcher
  );

  const pageData = useMemo(
    () =>
      (data ?? []).slice(page * RowsPerPage, page * RowsPerPage + RowsPerPage),
    [page, data]
  );

  const { lastOdometer, lastPrice } = useMemo(() => {
    const recent = (data ?? [])?.[0] as IEconomy<Refuel> | undefined;

    return {
      lastOdometer: recent?.odometer,
      lastPrice: recent?.price,
    };
  }, [data]);

  const changePage = useCallback((_: any, p: number) => {
    setPage(p);
    setSelected(undefined);
  }, []);

  const changeSelected = useCallback(
    (value?: Refuel) =>
      setSelected((_selected) => {
        if (!value || value.id === _selected?.id) {
          return undefined;
        }

        return value;
      }),
    []
  );

  const deleteSelected = useCallback(async () => {
    try {
      if (!selected) {
        return;
      }

      if (
        !(await alertDialog({
          message: `${t('provider.alert', 'This action cannot be undone.')}`,
        }))
      ) {
        return;
      }

      setLoading(true);

      await callApi(`${ApiRoutes.refuels}/${selected.id}`, 'DELETE');

      await mutate();

      snackbar(`${t('provider.deleted', 'Record deleted!')}`);

      setSelected(undefined);

      if (pageData.length < 2) {
        setPage(0);
      }
    } catch (e: any) {
      snackbar(e.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [selected, pageData, mutate, callApi]);

  const saveRecord = useCallback(
    async (_record: Refuel) => {
      try {
        setLoading(true);

        const isNew = !_record.id;

        if (isNew) {
          await callApi(ApiRoutes.refuels, 'PUT', _record);
        } else {
          await callApi(`${ApiRoutes.refuels}/${_record.id}`, 'PATCH', _record);
        }

        await mutate();

        snackbar(`${t('provider.saved', 'Record saved!')}`);

        setSelected(undefined);

        if (isNew) {
          setPage(0);
        }
      } catch (e: any) {
        snackbar(e.message, 'error');
      } finally {
        setLoading(false);
      }
    },
    [mutate, callApi]
  );

  return (
    <DataContext.Provider
      value={{
        isLoading: isLoading || isValidating || loading,
        total: data?.length ?? 0,
        page,
        pageData,
        changePage,
        selected,
        changeSelected,
        deleteSelected,
        saveRecord,
        lastOdometer,
        lastPrice,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
