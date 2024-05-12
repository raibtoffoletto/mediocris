import { Lato, Sedan, Ubuntu_Mono } from 'next/font/google';

export const lato = Lato({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400'],
});

export const sedan = Sedan({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400'],
});

export const ubuntu = Ubuntu_Mono({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400', '700'],
});
