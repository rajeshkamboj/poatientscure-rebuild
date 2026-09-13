import { mockDiseases, mockRemedies, mockIngredients } from "@/lib/mockData";
import { wordpressService } from "@/lib/wordpress/service";

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

async function safeFetch<T>(
  fn: () => Promise<T>,
  fallback: T,
  label: string
): Promise<T> {
  if (USE_MOCK_DATA) {
    return fallback;
  }

  try {
    return await fn();
  } catch (error) {
    console.warn(`Falling back to mock data for ${label}:`, error);
    return fallback;
  }
}

export const dataService = {
  // Diseases
  getDiseases: async () => {
    return safeFetch(wordpressService.getDiseases, mockDiseases, "diseases");
  },

  getDiseaseById: async (id: string) => {
    if (USE_MOCK_DATA) {
      return mockDiseases.find((d) => d.id === id) || null;
    }

    try {
      return await wordpressService.getDiseaseById(id);
    } catch (error) {
      console.warn(`Falling back to mock disease for ${id}:`, error);
      return mockDiseases.find((d) => d.id === id) || null;
    }
  },

  // Remedies
  getRemedies: async () => {
    return safeFetch(wordpressService.getRemedies, mockRemedies, "remedies");
  },

  getRemedyById: async (id: string) => {
    if (USE_MOCK_DATA) {
      return mockRemedies.find((r) => r.id === id) || null;
    }

    try {
      return await wordpressService.getRemedyById(id);
    } catch (error) {
      console.warn(`Falling back to mock remedy for ${id}:`, error);
      return mockRemedies.find((r) => r.id === id) || null;
    }
  },

  // Ingredients
  getIngredients: async () => {
    return safeFetch(wordpressService.getIngredients, mockIngredients, "ingredients");
  },

  getIngredientById: async (id: string) => {
    if (USE_MOCK_DATA) {
      return mockIngredients.find((i) => i.id === id) || null;
    }

    try {
      return await wordpressService.getIngredientById(id);
    } catch (error) {
      console.warn(`Falling back to mock ingredient for ${id}:`, error);
      return mockIngredients.find((i) => i.id === id) || null;
    }
  },
};