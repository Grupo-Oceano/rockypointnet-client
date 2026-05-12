import type { Dictionary } from "./en";

export const es: Dictionary = {
	meta: {
		siteTitle: "RockyPoint.net — Comienza tu aventura en Rocky Point",
		siteDescription: "Hoteles, restaurantes, atracciones y eventos en Puerto Peñasco. Reserva y descubre lo mejor de Rocky Point.",
		siteName: "RockyPoint.net",
	},
	common: {
		wordmarkAria: "RockyPoint.net inicio",
		languageMenuLabel: "Idioma",
		spanishLabel: "Español",
		englishLabel: "English",
		switchToSpanishAria: "Cambiar a español",
		switchToEnglishAria: "Cambiar a inglés",
	},
	nav: {
		primaryAria: "Navegación principal",
		openMenuAria: "Abrir menú de navegación",
		closeMenuAria: "Cerrar menú de navegación",
		items: {
			hotels: "Hoteles",
			restaurants: "Restaurantes",
			activities: "Actividades",
			attractions: "Atracciones",
			events: "Eventos",
		},
	},
	footer: {
		copyright: (year: number) => `© ${year} RockyPoint.net`,
		primary: {
			privacy: "Privacidad",
			terms: "Términos de uso",
			preferences: "Preferencias",
		},
		secondary: {
			suggestRestaurant: "Sugerir un restaurante",
			advertise: "Anuncia tu negocio",
			about: "Acerca de",
			contact: "Contacto",
		},
	},
	hero: {
		carouselAria: "Carrusel de Rocky Point",
		slides: {
			welcome: "Comienza tu aventura en Rocky Point",
		},
		previousAria: "Diapositiva anterior",
		nextAria: "Diapositiva siguiente",
		goToAriaPrefix: "Ir a la diapositiva",
	},
	explora: {
		heading: "Explora los mejores lugares en Rocky Point",
		restaurantTag: "Restaurante",
		places: {
			elMexicano: {
				name: "El Mexicano",
				alt: "Interior cálido del restaurante El Mexicano",
			},
			theFishMarket: {
				name: "The Fish Market",
				alt: "Vista del restaurante The Fish Market",
			},
			palapaAntigua: {
				name: "Palapa Antigua",
				alt: "Palapa Antigua al atardecer",
			},
			elMiradorDelSur: {
				name: "El Mirador del Sur",
				alt: "Vista panorámica desde El Mirador del Sur",
			},
		},
	},
	advertiser: {
		sectionAria: "Espacio publicitario",
		title: "¿Tienes un negocio?",
		subtitle: "Y te gustaría aparecer aquí",
		cta: "Anúnciate con nosotros",
		placeholder: "[Banner publicitario]",
	},
	events: {
		headingLine1: "Disfruta de eventos únicos en",
		headingLine2: "Rocky Point",
		subheading: "Rocky Point es el lugar ideal para realizar actividades al aire libre y descubrir festivales todo el año.",
		seeAll: "Ver todos los eventos",
		list: {
			beachGathering: {
				title: "Beach Gathering en Playa Hermosa",
				imageAlt: "Reunión nocturna en la playa",
			},
			seafoodFestival: {
				title: "Festival de Mariscos del Mar de Cortés",
				imageAlt: "Visitantes en festival de mariscos",
			},
			communityEvents: {
				title: "Community Events del Centro",
				imageAlt: "Evento comunitario al aire libre",
			},
			kayakSunset: {
				title: "Kayak Sunset Tour",
				imageAlt: "Kayak al atardecer en el mar",
			},
		},
		sharedLocation: "Rocky Point Main Beach",
		sharedOrganizer: "RockyPoint Beach Fanatics",
		card: {
			dateLabel: "Fecha",
			placeLabel: "Lugar",
			organizerLabel: "Organizador",
			byOrganizer: (name: string) => `por ${name}`,
			ratingSuffix: "Rating",
			ratingAria: (rating: number) => `${rating} de 5`,
			shareAria: (title: string) => `Compartir ${title}`,
			favoriteAria: (title: string) => `Guardar ${title} en favoritos`,
		},
	},
	finalCta: {
		titleLine1: "¿Listo para vivir",
		titleLine2: "Rocky Point?",
		description: "Desde un picnic en la playa hasta un paseo en yate, Rocky Point tiene todo para disfrutar un fin de semana o una estadía larga.",
		cta: "Reserva ahora",
		familyImageAlt: "Familia disfrutando un picnic en la playa de Rocky Point",
		friendsImageAlt: "Amigos brindando en un yate al atardecer",
	},
	search: {
		sectionAria: "Búsqueda de Rocky Point",
		tabsAria: "Categorías de búsqueda",
		tabs: {
			hotels: "Hoteles",
			restaurants: "Restaurantes",
			activities: "Actividades",
			attractions: "Atracciones",
			events: "Eventos",
		},
		fields: {
			arrival: "Llegada",
			arrivalAria: "Fecha de llegada",
			departure: "Salida",
			departureAria: "Fecha de salida",
			rooms: "Habitaciones",
			adults: "Adultos",
			children: "Niños",
		},
		submit: "Buscar",
		decrementAriaPrefix: "Disminuir",
		incrementAriaPrefix: "Aumentar",
	},
};
