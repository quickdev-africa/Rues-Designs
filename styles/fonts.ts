
import { Inter, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
export const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

// Add SF Pro Display (local import)
export const sfPro = localFont({
	src: [
		{
			path: '../public/fonts/SF-Pro-Display-Regular.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../public/fonts/SF-Pro-Display-Medium.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../public/fonts/SF-Pro-Display-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
	],
	variable: '--font-sfpro',
	display: 'swap',
});
