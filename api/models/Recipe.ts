export default class Recipe {
    private _id: number;
    private _name: string;
    private _ingredients: string;
    private _measurements: string;
    private _cook_method: string;

    set id(recipe_id: number){ this._id = recipe_id; }
    set name(name: string){ this._name = name; }
    set ingredients(ingredients: string){ this._ingredients = ingredients; }
    set measurements(measurements: string){ this._measurements = measurements; }
    set cook_method(cook_method: string){ this._cook_method = cook_method; }
    
    get id(): number{ return this._id; }
    get name(): string{ return this._name; }
    get ingredients(): string{ return this._ingredients; }
    get measurements(): string{ return this._measurements; }
    get cook_method(): string{ return this._cook_method; }
}