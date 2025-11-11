module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    colors: {
      primary: "#E7E7E7",
      secondary: "#B2B9C2",
      white: "#FFFFFF",
      black: "#000000",
      blue:'#172C48',
      textBlue:'#2274E0',
      lightBlue:'#e9f2fc',
      red:'#EA725B',
      disableColor:'#f0fff0',
      gray: {
        100: "#707070",
        200: "#8F92A1",
        300: "#E6E8EC",
        400: "#F5F5F5",
        600: "#4A5568",
        700: "#2D3748",
        800: "#616161",
        900: "#808191",
        1000: "#8C8C8C",
        1100: "#555758",
        1200: "#989BA1",
      },
      success: "#27A647",
      warning: "#E19500",
      danger: "#FF3B45",
    },
    fontFamily: {
      openSans: ["Open Sans", "sans-serif"],
      playfairDisplay: ["Playfair Display", "serif"],
      caveat: ["Caveat", "sans-serif"],
      outfit: ["Outfit", "outfit"],
      lobster: ["Lobster", "lobster"],
      montserrat: ["Montserrat", "Montserrat"],
    },
    extend: {
      colors:{
        "brand-primary":"#93288E",
        "brand-secondary":"#F16F5B",
        "brand-green":"#009821",
        "brand-orange":"#FF6B00",
        "brand-blue":"#1573FF",
        "brand-sky":"#079bb5",
        "brand-yellow":"#FBC900",
        "brand-green-text":"#2B9921",
        "brand-violet":"#92278F",
        "brand-orange-text":"#F3694E",
        "brand-purple":"#081A51",
        "brand-blue-2":"#2275df",
        "brand-tertiary":"#da666f",
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(99.72deg, #92278F -17.25%, #D1527D 40%, #EA725B 105.93%)',
      },
      minWidth: {
        '15': '15px',
      },
      fontSize: {
        xxs: '0.65rem',
        xxxs: '0.45rem',
      },
      borderWidth:{
        '1': '1.5px'
      },
      borderRadius: {
        large: "1.5rem",
      },
      dropShadow: {
        large: "0 40px 64px rgba(15, 15, 15, 0.1)",
        infoCard: '0 1px 20px rgba(0, 0, 0, 0.18)'
      },
      boxShadow: {
        outline: "1px 0px 0px rgba(192, 192, 192, 0.25);",
        sidebar: "inset -1px 0px 0px rgba(228, 228, 228, 0.1);",
        outlineTop: "inset 0px 1px 0px rgba(255, 255, 255, 0.1);",
        allSide: "0px 0.996px 20.6px 3px rgba(0, 0, 0, 0.06)",
        box: '0px 0px 15px -3px rgba(0,0,0,0.1)'
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-40px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        flickerBlue: {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px #2A4DFE) drop-shadow(0 0 8px #2A4DFE) drop-shadow(0 0 20px #2A4DFE)' },
          '20%': { filter: 'none' },
          '40%': { filter: 'drop-shadow(0 0 2px #2A4DFE)' },
          '60%': { filter: 'drop-shadow(0 0 8px #2A4DFE) drop-shadow(0 0 16px #2A4DFE)' },
          '80%': { filter: 'drop-shadow(0 0 4px #2A4DFE)' },
        },
        flickerYellow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px rgb(235, 163, 17)) drop-shadow(0 0 8px rgb(235, 163, 17)) drop-shadow(0 0 20px rgb(235, 163, 17))' },
          '20%': { filter: 'none' },
          '40%': { filter: 'drop-shadow(0 0 2px rgb(235, 163, 17))' },
          '60%': { filter: 'drop-shadow(0 0 8px rgb(235, 163, 17)) drop-shadow(0 0 16px rgb(235, 163, 17))' },
          '80%': { filter: 'drop-shadow(0 0 4px rgb(235, 163, 17))' },
        },
        flickerGreen: {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px rgb(70, 193, 88)) drop-shadow(0 0 8px rgb(70, 193, 88)) drop-shadow(0 0 20px rgb(70, 193, 88))' },
          '20%': { filter: 'none' },
          '40%': { filter: 'drop-shadow(0 0 2px rgb(70, 193, 88))' },
          '60%': { filter: 'drop-shadow(0 0 8px rgb(70, 193, 88)) drop-shadow(0 0 16px rgb(70, 193, 88))' },
          '80%': { filter: 'drop-shadow(0 0 4px rgb(70, 193, 88))' },
        },
        blink: {
          '0%, 100%': {
            boxShadow: 'inset 0 0 0 #FF725D, 0 0 1px #FF725D, 0 0 6px #FF725D, 0 0 12px #FF725D',
          },
          '50%': {
            boxShadow: 'inset 0 0 0 #FF725D, 0 0 1px #FF725D, 0 0 3px #FF725D, 0 0 6px #FF725D',
          }
        },
        blinkBubble: {
          '0%': { 'opacity': 0.8 },
          '50%': { 'opacity': 0.4 },
          '100%': { 'opacity': 0.8 },
        }
      },
      animation: {
        "fade-in-down-notification": "fade-in-down 0.7s ease-in-out",
        flickerBlue: 'flickerBlue 2s infinite',
        flickerYellow: 'flickerYellow 2s infinite',
        flickerGreen: 'flickerGreen 2s infinite',
        blink: 'blink 2s infinite',
        blinkBubble: 'blinkBubble 2s infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('@tailwindcss/line-clamp'),
  ],
};
