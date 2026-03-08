import { slugify } from "./utils";

export interface SiloLink {
  label: string;
  href: string;
}

export interface InternalLinks {
  cityLinks: SiloLink[];
  serviceLinks: SiloLink[];
}

/**
 * Generates a clean URL for a city/service silo page
 */
export function generateSiloUrl(city: string, service: string) {
  return `/${slugify(city)}/${slugify(service)}`;
}

/**
 * Generates internal links for a silo page (neighboring cities/services)
 */
export function getInternalLinks(
  currentCity: string, 
  currentService: string, 
  cities: string[], 
  services: string[]
): InternalLinks {
  // 1. Links to the same service in other cities (city-silo linking)
  const cityLinks = cities
    .filter((c) => c !== currentCity)
    .slice(0, 5) // Limit to 5 neighbors
    .map((c) => ({
      label: `${currentService} in ${c}`,
      href: generateSiloUrl(c, currentService),
    }));
  // 2. Links to other services in the same city (service-silo linking)
  const serviceLinks = services
    .filter((s) => s !== currentService)
    .map((s) => ({
      label: `${s} in ${currentCity}`,
      href: generateSiloUrl(currentCity, s),
    }));
  return { cityLinks, serviceLinks };
}
