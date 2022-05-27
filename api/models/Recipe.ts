export default class Recipe {
    id: number;
    name: string;
    ingredients: string;
    measurements: string;
    cookmethod: string;

    deserialize(input: any){
        Object.assign(this, input);
        return this;
    }

    set _id(recipeid: number){ this.id = recipeid; }
    set _name(name: string){ this.name = name; }
    set _ingredients(ingredients: string){ this.ingredients = ingredients; }
    set _measurements(measurements: string){ this.measurements = measurements; }
    set _cookmethod(cookmethod: string){ this.cookmethod = cookmethod; }
    
    get _id(): number{ return this.id; }
    get _name(): string{ return this.name; }
    get _ingredients(): string{ return this.ingredients; }
    get _measurements(): string{ return this.measurements; }
    get _cookmethod(): string{ return this.cookmethod; }
}