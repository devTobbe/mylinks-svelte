/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				sm: '640px',
				// => @media (min-width: 640px) { ... }

				md: '768px',
				// => @media (min-width: 768px) { ... }

				lg: '1024px',
				// => @media (min-width: 1024px) { ... }

				xl: '1280px',
				// => @media (min-width: 1280px) { ... }

				'2xl': '1536px'
				// => @media (min-width: 1536px) { ... }
			},
			colors: {
				base03: '#002b36',
				base02: '#073642',
				base01: '#586e75',
				base00: '#657b83',
				base0: '#839496',
				base1: '#93a1a1',
				base2: '#eee8d5',
				base3: '#fdf6e3',
				base385: '#fdf6e3D9',
				base350: '#fdf6e380',
				yellow: '#b58900',
				orange: '#cb4b16',
				red: '#dc322f',
				magenta: '#d33682',
				violet: '#6c71c4',
				blue: '#268bd2',
				cyan: '#2aa198',
				green: '#859900'
			},
			fontFamily: {
				header: ['Open Sans', 'sans-serif'],
				body: ['Roboto']
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
			}
		}
	},
	plugins: []
};
