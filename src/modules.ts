import type { Dictionary } from "./locales/en";

export type ModuleId = keyof Dictionary["nav"]["items"];

export interface ModuleDef {
	id: ModuleId;
	path: string;
}

export const MODULES = [
	{ id: "hotels", path: "/hotels" },
	{ id: "restaurants", path: "/restaurants" },
	{ id: "activities", path: "/activities" },
	{ id: "attractions", path: "/attractions" },
	{ id: "events", path: "/events" },
] as const satisfies readonly ModuleDef[];

export type SearchTabModuleId = keyof Dictionary["search"]["tabs"];

export const SEARCH_TAB_IDS = ["hotels", "restaurants", "activities", "attractions", "events"] as const satisfies readonly SearchTabModuleId[];
