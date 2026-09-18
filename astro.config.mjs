// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// El dominio es obligatorio para que Astro pueda generar URLs absolutas:
// canonical, Open Graph y sitemap. Debe coincidir con site.url en src/config/site.ts.
// https://astro.build/config
export default defineConfig({
	site: 'https://codefactory.lat',
	integrations: [sitemap()],
});
