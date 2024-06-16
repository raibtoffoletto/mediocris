export const primaryColor = '#259358';

export const secondaryColor = '#932560';

export enum Routes {
  main = '/',
  charts = '/charts',
  signIn = '/signIn',
}

export enum ApiRoutes {
  auth = '/api/auth',
  banners = '/api/banner',
  refuels = '/api/refuel',
}

export const RowsPerPage = 6;

export enum URLParams {
  key = 'action',
  edit = 'edit',
  add = 'add',
}

export enum Input {
  pass = 'password',
  text = 'text',
}

export const LANG = Object.freeze({
  EN: 'en',
  PT: 'pt',
});

export const i18nNS = Object.freeze({
  App: 'app',
  Charts: 'charts',
  Main: 'main',
});

export const languageLabel = Object.freeze({
  [LANG.EN]: 'English',
  [LANG.PT]: 'Português',
});

export const defaultLang = LANG.EN;

export const defaultNS = i18nNS.App;

export const languages = [LANG.EN, LANG.PT];
