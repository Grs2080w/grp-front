/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		extend: {
			keyframes: {
				"caret-blink": {
					"0%,70%,100%": { opacity: "1" },
					"20%,50%": { opacity: "0" },
				},
				"slideDown": {
					"0%": { opacity: "0", transform: "translateY(-2rem)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
			animation: {
				"caret-blink": "caret-blink 1.25s ease-out infinite",
				"slide-down": "slideDown 0.8s ease-out forwards",
			},
		},
	},
	darkMode: ["class"], // ← obrigatório
	content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
}
