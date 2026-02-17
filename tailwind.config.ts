import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"; // ✅ Use import

const config: Config = {
  // ...
  plugins: [typography],
};

export default config;