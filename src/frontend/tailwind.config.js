/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // App Router 사용 시
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Pages Router 사용 시 (App Router와 같이 사용 가능)
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // src 디렉토리를 사용하는 경우 추가
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}