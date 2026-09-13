// Mock data for development
export interface Disease {
  id: string;
  name: string;
  commonNames: string[];
  summary: string;
  lastUpdated: string;
  author: string;
  reviewer: string;
  quickInfo: {
    prevalence: string;
    ageGroup: string;
    gender: string;
  };
  symptoms: string[];
  causes: string[];
  ayurvedicPerspective: string;
  desiNuskhe: Remedy[];
  diet: string[];
  lifestyle: string[];
  precautions: string[];
  whenToSeekMedicalCare: string;
  faq: {
    question: string;
    answer: string;
  }[];
  references: string[];
  relatedDiseases: string[];
  relatedRemedies: string[];
  relatedIngredients: string[];
}

export interface Remedy {
  id: string;
  name: string;
  purpose: string;
  ingredients: {
    item: string;
    quantity: string;
  }[];
  preparation: string;
  howToUse: string;
  timing: string;
  frequency: string;
  duration: string;
  precautions: string[];
  whoShouldAvoid: string[];
  references: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  commonNames: string[];
  hindiName: string;
  punjabiName: string;
  description: string;
  traditionalUses: string[];
  preparation: string[];
  precautions: string[];
  relatedRemedies: string[];
  relatedDiseases: string[];
}

// Sample data
export const mockDiseases: Disease[] = [
  {
    id: "diabetes-type2",
    name: "Type 2 Diabetes",
    commonNames: ["Madhumeha", "Adult-onset diabetes"],
    summary:
      "Type 2 diabetes is a chronic condition that affects the way the body processes blood sugar (glucose).",
    lastUpdated: "September 10, 2026",
    author: "Dr. Anjali Sharma",
    reviewer: "Dr. Vikram Singh",
    quickInfo: {
      prevalence: "1 in 10 adults",
      ageGroup: "45+ years",
      gender: "Both",
    },
    symptoms: [
      "Increased thirst",
      "Frequent urination",
      "Increased hunger",
      "Unexplained weight loss",
      "Fatigue",
      "Blurred vision",
      "Slow-healing sores",
    ],
    causes: [
      "Insulin resistance",
      "Obesity",
      "Sedentary lifestyle",
      "Unhealthy diet",
      "Genetic factors",
    ],
    ayurvedicPerspective:
      "In Ayurveda, diabetes is known as Madhumeha and is considered a Kapha-type disorder where Agni (digestive fire) is impaired.",
    desiNuskhe: [
      {
        id: "fenugreek-water",
        name: "Fenugreek Water",
        purpose: "Helps regulate blood sugar levels",
        ingredients: [
          { item: "Fenugreek seeds", quantity: "1 teaspoon" },
          { item: "Water", quantity: "1 cup" },
        ],
        preparation: "Soak fenugreek seeds in water overnight. Drink the water in the morning on an empty stomach.",
        howToUse: "Drink daily",
        timing: "Morning",
        frequency: "Daily",
        duration: "Continued use",
        precautions: ["Monitor blood sugar levels", "Consult doctor if on medication"],
        whoShouldAvoid: ["Pregnant women", "Those with hypoglycemia"],
        references: [
          "Journal of Ayurveda and Integrative Medicine, 2021",
          "International Journal of Molecular Sciences, 2020",
        ],
      },
    ],
    diet: [
      "Eat high-fiber foods",
      "Choose whole grains over refined carbohydrates",
      "Include lean proteins",
      "Limit sugary foods and beverages",
    ],
    lifestyle: [
      "Regular exercise (30 minutes daily)",
      "Maintain healthy weight",
      "Monitor blood sugar regularly",
      "Get adequate sleep",
    ],
    precautions: [
      "Monitor blood sugar regularly",
      "Follow prescribed medication",
      "Regular medical check-ups",
    ],
    whenToSeekMedicalCare:
      "If blood sugar levels remain consistently high or if you experience symptoms like extreme fatigue, blurred vision, or slow-healing wounds.",
    faq: [
      {
        question: "Can type 2 diabetes be reversed?",
        answer:
          "While type 2 diabetes is a chronic condition, significant lifestyle changes can help manage blood sugar levels and sometimes achieve remission.",
      },
      {
        question: "Is type 2 diabetes hereditary?",
        answer:
          "Genetics play a role in type 2 diabetes, but lifestyle factors are equally important.",
      },
    ],
    references: [
      "American Diabetes Association. Standards of Medical Care in Diabetes—2026",
      "National Institute of Diabetes and Digestive and Kidney Diseases",
    ],
    relatedDiseases: ["hypertension", "heart-disease"],
    relatedRemedies: ["cinnamon-tea", "bitter-gourd-juice"],
    relatedIngredients: ["fenugreek", "turmeric"],
  },
];

export const mockRemedies: Remedy[] = [
  {
    id: "turmeric-milk",
    name: "Turmeric Milk (Golden Milk)",
    purpose: "Anti-inflammatory, boosts immunity, promotes better sleep",
    ingredients: [
      { item: "Milk (dairy or plant-based)", quantity: "1 cup" },
      { item: "Turmeric powder", quantity: "1/2 teaspoon" },
      { item: "Black pepper", quantity: "a pinch" },
      { item: "Honey or jaggery (optional)", quantity: "1 teaspoon" },
      { item: "Cardamom (optional)", quantity: "1 pod" },
    ],
    preparation:
      "Heat milk in a saucepan. Add turmeric, black pepper, and cardamom. Simmer for 5 minutes. Strain and add sweetener if desired.",
    howToUse: "Drink warm",
    timing: "Before bedtime",
    frequency: "Daily",
    duration: "Continued use",
    precautions: ["May interact with blood thinners", "Consult doctor if pregnant"],
    whoShouldAvoid: ["People with gallbladder issues", "Those on anticoagulant medication"],
    references: [
      "Journal of Medicinal Food, 2020",
      "Phytotherapy Research, 2021",
    ],
  },
];

export const mockIngredients: Ingredient[] = [
  {
    id: "turmeric",
    name: "Turmeric",
    commonNames: ["Haldi", "Indian saffron"],
    hindiName: "हल्दी",
    punjabiName: "ਹਲਦੀ",
    description:
      "Turmeric is a bright yellow spice derived from the root of the Curcuma longa plant. It has been used for centuries in Ayurvedic medicine for its anti-inflammatory and antioxidant properties.",
    traditionalUses: [
      "Anti-inflammatory",
      "Antioxidant",
      "Supports digestion",
      "Promotes skin health",
      "Boosts immunity",
    ],
    preparation: ["Fresh root can be grated", "Dried powder can be used in cooking"],
    precautions: [
      "May cause stomach upset in large doses",
      "May interact with certain medications",
    ],
    relatedRemedies: ["turmeric-milk", "turmeric-honey"],
    relatedDiseases: ["arthritis", "diabetes-type2"],
  },
  {
    id: "fenugreek",
    name: "Fenugreek",
    commonNames: ["Methi", "Greek hay"],
    hindiName: "मेथी",
    punjabiName: "ਮੇਥੀ",
    description:
      "Fenugreek is an annual plant in the family Fabaceae, with leaves consisting of three small obovate to oblong leaflets. It is cultivated worldwide as a semiarid crop, and its seeds are a common ingredient in dishes from the Indian subcontinent.",
    traditionalUses: [
      "Helps regulate blood sugar",
      "Increases breast milk production",
      "Reduces inflammation",
      "Aids digestion",
      "Enhances hair health",
    ],
    preparation: [
      "Seeds can be soaked overnight and consumed",
      "Leaves can be used fresh or dried in cooking",
      "Seeds can be ground into powder for use in spices",
    ],
    precautions: [
      "May cause digestive issues in large doses",
      "May interact with diabetes medications",
      "Not recommended in large amounts during pregnancy",
    ],
    relatedRemedies: ["fenugreek-water", "fenugreek-tea"],
    relatedDiseases: ["diabetes-type2", "high-cholesterol"],
  },
];