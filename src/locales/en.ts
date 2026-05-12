export const en = {
	meta: {
		siteTitle: "RockyPoint.net — Start your Rocky Point adventure",
		siteDescription: "Hotels, restaurants, attractions, and events in Puerto Peñasco. Book and discover the best of Rocky Point.",
		siteName: "RockyPoint.net",
	},
	common: {
		wordmarkAria: "RockyPoint.net home",
		languageMenuLabel: "Language",
		spanishLabel: "Español",
		englishLabel: "English",
		switchToSpanishAria: "Switch to Spanish",
		switchToEnglishAria: "Switch to English",
	},
	nav: {
		primaryAria: "Primary navigation",
		openMenuAria: "Open navigation menu",
		closeMenuAria: "Close navigation menu",
		items: {
			hotels: "Hotels",
			restaurants: "Restaurants",
			activities: "Activities",
			attractions: "Attractions",
			events: "Events",
		},
	},
	footer: {
		copyright: (year: number) => `© ${year} RockyPoint.net`,
		primary: {
			privacy: "Privacy",
			terms: "Terms of use",
			preferences: "Preferences",
		},
		secondary: {
			suggestRestaurant: "Suggest a restaurant",
			advertise: "Advertise your business",
			about: "About",
			contact: "Contact",
		},
	},
	hero: {
		carouselAria: "Rocky Point carousel",
		slides: {
			welcome: "Start your Rocky Point adventure",
		},
		previousAria: "Previous slide",
		nextAria: "Next slide",
		goToAriaPrefix: "Go to slide",
	},
	explora: {
		heading: "Explore the best places in Rocky Point",
		restaurantTag: "Restaurant",
		places: {
			elMexicano: {
				name: "El Mexicano",
				alt: "Warm interior of El Mexicano restaurant",
			},
			theFishMarket: {
				name: "The Fish Market",
				alt: "View of The Fish Market restaurant",
			},
			palapaAntigua: {
				name: "Palapa Antigua",
				alt: "Palapa Antigua at sunset",
			},
			elMiradorDelSur: {
				name: "El Mirador del Sur",
				alt: "Panoramic view from El Mirador del Sur",
			},
		},
	},
	advertiser: {
		sectionAria: "Advertising space",
		title: "Have a business?",
		subtitle: "And want to be featured here",
		cta: "Advertise with us",
		placeholder: "[Ad banner]",
	},
	events: {
		headingLine1: "Enjoy unique events in",
		headingLine2: "Rocky Point",
		subheading: "Rocky Point is the perfect place for outdoor activities and festivals all year long.",
		seeAll: "See all events",
		list: {
			beachGathering: {
				title: "Beach Gathering at Playa Hermosa",
				imageAlt: "Nighttime beach gathering",
			},
			seafoodFestival: {
				title: "Sea of Cortez Seafood Festival",
				imageAlt: "Visitors at a seafood festival",
			},
			communityEvents: {
				title: "Downtown Community Events",
				imageAlt: "Outdoor community event",
			},
			kayakSunset: {
				title: "Kayak Sunset Tour",
				imageAlt: "Kayaking at sunset on the sea",
			},
		},
		sharedLocation: "Rocky Point Main Beach",
		sharedOrganizer: "RockyPoint Beach Fanatics",
		card: {
			dateLabel: "Date",
			placeLabel: "Place",
			organizerLabel: "Organizer",
			byOrganizer: (name: string) => `by ${name}`,
			ratingSuffix: "Rating",
			ratingAria: (rating: number) => `${rating} out of 5`,
			shareAria: (title: string) => `Share ${title}`,
			favoriteAria: (title: string) => `Save ${title} to favorites`,
		},
	},
	finalCta: {
		titleLine1: "Ready to live",
		titleLine2: "Rocky Point?",
		description: "From a beach picnic to a yacht cruise, Rocky Point has everything for a weekend or an extended stay.",
		cta: "Book now",
		familyImageAlt: "Family enjoying a picnic on a Rocky Point beach",
		friendsImageAlt: "Friends toasting on a yacht at sunset",
	},
	search: {
		sectionAria: "Rocky Point search",
		tabsAria: "Search categories",
		tabs: {
			hotels: "Hotels",
			restaurants: "Restaurants",
			activities: "Activities",
			attractions: "Attractions",
			events: "Events",
		},
		fields: {
			arrival: "Check-in",
			arrivalAria: "Check-in date",
			departure: "Check-out",
			departureAria: "Check-out date",
			rooms: "Rooms",
			adults: "Adults",
			children: "Children",
		},
		submit: "Search",
		decrementAriaPrefix: "Decrease",
		incrementAriaPrefix: "Increase",
	},
};

export type Dictionary = typeof en;
