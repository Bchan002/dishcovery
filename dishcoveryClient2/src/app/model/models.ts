export interface userDetails {
    username: string
    password: string
}


export interface SignUpDetails {
    username: string
    email: string
    password: string
}

export interface Recipe {
    recipeId: number;
    title: string;
    category: string;
    readyInMinutes: number;
    servings: number;
    image: string;
    summary: string;
    instructions: string;
    ingredients: Ingredient[];
}

export interface Ingredient {
    name: string;
    amount: number;
    unit: string;
}

export interface SearchRecipe {
    recipeId: number;  // Match API key
    title: string;
    readyInMinutes: number;
    servings: number;
    image: string;
    sourceUrl: string; // Add source URL from API
    spoonacularScore: number; // Add missing field
    instructions: string;
    ingredients: string[]; // API returns `string[]`
    dishTypes: string[]; // API includes dish types
}

export interface AddGroceryItem {
    itemName: string
    quantity:number
    category: string
    expirationDate: string
}



export interface GroceryItems {
    itemId?: string
    userId?: string
    itemName: string
    quantity:number
    category: string
    expirationDate: string
    last_notified?: string
    created_at?: string
}