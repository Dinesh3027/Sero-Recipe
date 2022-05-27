export interface AddRecipeProps {
    isFormSubmitted: boolean;
    onNameChange: (name: string) => void;
    onIngredientChange: (ingredient: string) => void;
    onMeasurementsChange: (measurement: string) => void;
    onCookMethodChange: (cookmethod: string) => void;
    onSubmit: (name: string, ingredient: string, measurement: boolean, cookmethod: string) => void;
}