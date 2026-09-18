// Datos de contacto de CodeFactory en un solo lugar.
// Cualquier cambio de correo o telefono se hace aqui y se propaga a todo el sitio.
export const site = {
	// Dominio canonico. Debe coincidir con `site` en astro.config.mjs.
	url: "https://codefactory.lat",
	name: "CodeFactory",
	// Imagen que se muestra al compartir el enlace en WhatsApp, Facebook, etc.
	ogImage: "/img/og-codefactory.jpg",
	email: "soporte@codefactory.lat",
	phone: {
		display: "+503 7875-4199",
		href: "tel:+50378754199",
	},
	whatsapp: {
		number: "50378754199",
		url: "https://wa.me/50378754199",
	},
	location: "San Miguel, El Salvador",
	social: {
		facebook: "https://www.facebook.com/profile.php?id=61575564206638",
		instagram: "https://www.instagram.com/codefactorysv",
	},
} as const;

// Cifras que se repiten en varias paginas. Cambiarlas aqui las actualiza
// en todas y evita que una quede desfasada.
export const trackRecord = {
	years: 2,
	clients: 4,
} as const;

// Clave de Web3Forms. Si esta definida en .env, el formulario envia los leads
// por correo a site.email. Si no, cae al envio por WhatsApp (ver ContactForm.astro).
export const contactKey = import.meta.env.PUBLIC_WEB3FORMS_KEY ?? "";
