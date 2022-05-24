export class Recipe {
    id: number;
    name: string;
    ingredients: string;
    measurements: string;
    cook_method: string;

    constructor(
        id: number,
        name: string,
        ingredients: string,
        measurements: string,
        cook_method: string) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.measurements = measurements;
        this.cook_method = cook_method;
    }
}