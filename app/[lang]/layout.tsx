import { languages } from '@constants';
import Theme from '@contexts/Theme';
import { dir } from 'i18next';

export { default as metadata } from '@lib/infrastructure/metadata';

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default function RootLayout({
  children,
  params: { lang },
}: IParams<IParent>) {
  return (
    <html lang={lang} dir={dir(lang)}>
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
