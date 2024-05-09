import { Lato, Sedan } from 'next/font/google';

export const lato = Lato({
  display: 'swap',
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

export const sedan = Sedan({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400'],
});
