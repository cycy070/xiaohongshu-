/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './docs/**/*.html'],
  theme: {
    extend: {
      colors: {
        linen: '#E5E1DA',
        terracotta: '#B3A394',
        charcoal: '#4A4947',
        dusk: {
          100: '#EAE5DE',
          300: '#C8BBAF',
          500: '#9E8C7C',
          700: '#6C6159',
          900: '#3F3D3B',
        },
      },
      fontFamily: {
        serifDisplay: ['"Playfair Display"', '"Lora"', 'serif'],
        sansBody: ['Inter', '"PingFang SC"', '"HarmonyOS Sans"', 'sans-serif'],
      },
      letterSpacing: {
        airy: '0.04em',
      },
      boxShadow: {
        glass: '0 10px 30px rgba(74,73,71,0.12)',
      },
      backdropBlur: {
        luxe: '14px',
      },
    },
  },
  plugins: [],
};
