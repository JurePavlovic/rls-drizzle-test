import { createHonoApp } from "./src/app.ts";

const app = createHonoApp();
Deno.serve(app.fetch);
