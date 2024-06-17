import { i18n as I18N } from 'i18next';
import { createContext } from 'react';

type Ii18nContext = {
  i18n: I18N | null;
};

const I18nContext = createContext<Ii18nContext>({ i18n: null });

export default I18nContext;
