/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				matrix: {
					50: '#f0fff0',
					100: '#dcffdc',
					200: '#bbffbb',
					300: '#86ff86',
					400: '#4ade4a',
					500: '#00ff00',
					600: '#00e600',
					700: '#00cc00',
					800: '#00a000',
					900: '#008000',
					950: '#004400',
					bg: '#000000',
					'bg-secondary': '#001100',
					'text-primary': '#00ff00',
					'text-secondary': '#00cc00',
					'accent': '#39ff14',
					'glow': '#00ff88',
				},
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'bounce-subtle': 'bounceSubtle 2s infinite',
				'matrix-glow': 'matrixGlow 2s ease-in-out infinite alternate',
				'digital-rain': 'digitalRain 3s linear infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				slideUp: {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				bounceSubtle: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				matrixGlow: {
					'0%': { textShadow: '0 0 5px #00ff00, 0 0 10px #00ff00, 0 0 15px #00ff00' },
					'100%': { textShadow: '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00' },
				},
				digitalRain: {
					'0%': { transform: 'translateY(-100%)', opacity: '0' },
					'10%': { opacity: '1' },
					'90%': { opacity: '1' },
					'100%': { transform: 'translateY(100vh)', opacity: '0' },
				},
			},
			boxShadow: {
				'matrix': '0 0 20px rgba(0, 255, 0, 0.3)',
				'matrix-lg': '0 0 40px rgba(0, 255, 0, 0.4)',
			},
		},
	},
	plugins: [
		function({ addVariant }) {
			addVariant('matrix', '.matrix &');
		}
	],
};