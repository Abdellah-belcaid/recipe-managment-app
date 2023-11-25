export class Recipe {
    id?: number;
    name: string = "";
    ingredients: string[] = [];
    preparationSteps: string[] = [];
    preparationTime: number = 0;
    photo?: string;
}
