import { useState } from "react";
import { Recipe } from "../types/recipe";
// import { Recipe } from "../models/Recipe";

// useForm functional component
export const useSaveForm = (callback: any, initialState: Recipe) => {
    const [values, setValues] = useState(initialState);

    // onChange handle change events whenever 
    // something changes in the input field
    const onChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    // onSubmit
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await callback(); // triggering the callback
    };

    // return values
    return {
        onChange,
        onSubmit,
        values,
    };
}