import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="en">
			<link rel="stylesheet" href="https://css.hackclub.com/theme.css" />
			{/* <link rel="stylesheet" href="https://css.hackclub.com/fonts.css" /> */}
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
