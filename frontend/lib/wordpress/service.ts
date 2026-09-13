import { Disease, Remedy, Ingredient } from "@/lib/mockData";

const API_URL = process.env.NEXT_PUBLIC_WP_API_URL || "https://patientscure.ddev.site/wp-json";

function normalizeScalar(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return "";
}

function normalizeArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => {
      if (typeof item === "string") {
        return [item];
      }

      if (item && typeof item === "object") {
        const text = Object.values(item as Record<string, unknown>).join(" ");
        return text ? [text] : [];
      }

      return [];
    });
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return normalizeArray(parsed);
    } catch {
      return value ? [value] : [];
    }
  }

  return [];
}

function normalizeObjectArray(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) {
    return value.filter((item) => item && typeof item === "object") as Record<string, unknown>[];
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return normalizeObjectArray(parsed);
    } catch {
      return [];
    }
  }

  return [];
}

function readMeta(post: any, key: string, fallback: any) {
  const acfValue = post?.acf?.[key];
  if (acfValue !== undefined && acfValue !== null && acfValue !== "") {
    return acfValue;
  }

  const metaValue = post?.meta?.[key];
  if (metaValue !== undefined && metaValue !== null && metaValue !== "") {
    return metaValue;
  }

  return fallback;
}

async function fetchWP<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch from WP API: ${response.statusText}`);
  }
  return response.json();
}

function mapToDisease(post: any): Disease {
  const quickInfo = readMeta(post, "quick_info", {
    prevalence: readMeta(post, "prevalence", ""),
    age_group: readMeta(post, "age_group", ""),
    gender: readMeta(post, "gender", ""),
  });

  return {
    id: post.id.toString(),
    name: post.title?.rendered || post.title || "",
    commonNames: normalizeArray(readMeta(post, "common_names", [])),
    summary: normalizeScalar(readMeta(post, "summary", post.excerpt?.rendered || "")),
    lastUpdated: normalizeScalar(readMeta(post, "last_updated", post.modified || "")),
    author: normalizeScalar(readMeta(post, "author", "")),
    reviewer: normalizeScalar(readMeta(post, "reviewer", "")),
    quickInfo: {
      prevalence: normalizeScalar(quickInfo?.prevalence || quickInfo?.prevalence_value || readMeta(post, "prevalence", "")),
      ageGroup: normalizeScalar(quickInfo?.age_group || readMeta(post, "age_group", "")),
      gender: normalizeScalar(quickInfo?.gender || readMeta(post, "gender", "")),
    },
    symptoms: normalizeArray(readMeta(post, "symptoms", [])),
    causes: normalizeArray(readMeta(post, "causes", [])),
    ayurvedicPerspective: normalizeScalar(readMeta(post, "ayurvedic_perspective", "")),
    desiNuskhe: normalizeObjectArray(readMeta(post, "desi_nuskhe", [])).map((item) => ({
      id: `wp-${post.id}-${Math.random().toString(16).slice(2)}`,
      name: normalizeScalar((item as any)?.name || ""),
      purpose: normalizeScalar((item as any)?.purpose || ""),
      ingredients: normalizeObjectArray((item as any)?.ingredients || []).map((ingredient) => ({
        item: normalizeScalar((ingredient as any)?.item || ""),
        quantity: normalizeScalar((ingredient as any)?.quantity || ""),
      })),
      preparation: normalizeScalar((item as any)?.preparation || ""),
      howToUse: normalizeScalar((item as any)?.how_to_use || ""),
      timing: normalizeScalar((item as any)?.timing || ""),
      frequency: normalizeScalar((item as any)?.frequency || ""),
      duration: normalizeScalar((item as any)?.duration || ""),
      precautions: normalizeArray((item as any)?.precautions || []),
      whoShouldAvoid: normalizeArray((item as any)?.who_should_avoid || []),
      references: normalizeArray((item as any)?.references || []),
    })),
    diet: normalizeArray(readMeta(post, "diet", [])),
    lifestyle: normalizeArray(readMeta(post, "lifestyle", [])),
    precautions: normalizeArray(readMeta(post, "precautions", [])),
    whenToSeekMedicalCare: normalizeScalar(readMeta(post, "when_to_seek_medical_care", "")),
    faq: normalizeObjectArray(readMeta(post, "faq", [])).map((item) => ({
      question: normalizeScalar((item as any)?.question || ""),
      answer: normalizeScalar((item as any)?.answer || ""),
    })),
    references: normalizeArray(readMeta(post, "references", [])),
    relatedDiseases: normalizeArray(readMeta(post, "related_diseases", [])),
    relatedRemedies: normalizeArray(readMeta(post, "related_remedies", [])),
    relatedIngredients: normalizeArray(readMeta(post, "related_ingredients", [])),
  };
}

function mapToRemedy(post: any): Remedy {
  return {
    id: post.id.toString(),
    name: post.title?.rendered || post.title || "",
    purpose: normalizeScalar(readMeta(post, "purpose", post.excerpt?.rendered || "")),
    ingredients: normalizeObjectArray(readMeta(post, "ingredients", [])).map((item) => ({
      item: normalizeScalar((item as any)?.item || ""),
      quantity: normalizeScalar((item as any)?.quantity || ""),
    })),
    preparation: normalizeScalar(readMeta(post, "preparation", "")),
    howToUse: normalizeScalar(readMeta(post, "how_to_use", "")),
    timing: normalizeScalar(readMeta(post, "timing", "")),
    frequency: normalizeScalar(readMeta(post, "frequency", "")),
    duration: normalizeScalar(readMeta(post, "duration", "")),
    precautions: normalizeArray(readMeta(post, "precautions", [])),
    whoShouldAvoid: normalizeArray(readMeta(post, "who_should_avoid", [])),
    references: normalizeArray(readMeta(post, "references", [])),
  };
}

function mapToIngredient(post: any): Ingredient {
  return {
    id: post.id.toString(),
    name: post.title?.rendered || post.title || "",
    commonNames: normalizeArray(readMeta(post, "common_names", [])),
    hindiName: normalizeScalar(readMeta(post, "hindi_name", "")),
    punjabiName: normalizeScalar(readMeta(post, "punjabi_name", "")),
    description: normalizeScalar(readMeta(post, "description", post.excerpt?.rendered || "")),
    traditionalUses: normalizeArray(readMeta(post, "traditional_uses", [])),
    preparation: normalizeArray(readMeta(post, "preparation", [])),
    precautions: normalizeArray(readMeta(post, "precautions", [])),
    relatedRemedies: normalizeArray(readMeta(post, "related_remedies", [])),
    relatedDiseases: normalizeArray(readMeta(post, "related_diseases", [])),
  };
}

export const wordpressService = {
  async getDiseases(): Promise<Disease[]> {
    const posts = await fetchWP<any[]>("/wp/v2/disease?per_page=100");
    return posts.map(mapToDisease);
  },

  async getDiseaseById(id: string): Promise<Disease | null> {
    const post = await fetchWP<any>(`/wp/v2/disease/${id}`);
    return mapToDisease(post);
  },

  async getRemedies(): Promise<Remedy[]> {
    const posts = await fetchWP<any[]>("/wp/v2/remedy?per_page=100");
    return posts.map(mapToRemedy);
  },

  async getRemedyById(id: string): Promise<Remedy | null> {
    const post = await fetchWP<any>(`/wp/v2/remedy/${id}`);
    return mapToRemedy(post);
  },

  async getIngredients(): Promise<Ingredient[]> {
    const posts = await fetchWP<any[]>("/wp/v2/ingredient?per_page=100");
    return posts.map(mapToIngredient);
  },

  async getIngredientById(id: string): Promise<Ingredient | null> {
    const post = await fetchWP<any>(`/wp/v2/ingredient/${id}`);
    return mapToIngredient(post);
  },
};