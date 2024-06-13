module.exports = {
	// content: ["./src/**/*.{html,js}"],
	content: [
		"./src/**/*.{html,js}",
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			screens: {
				'tablet': "990px",
			},
			colors: {
				themeColor: "#274d5a",
				themeDark: "#18353e",
				themeColor2: "#f7c17b"
			}
		}
	},
	plugins: []
};
