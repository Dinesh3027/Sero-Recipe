import '../../global.css';
import './save.css';
import { useSaveForm } from '../../hooks/useSaveForm';
import { Recipe } from '../../models/Recipe';
import { useState } from 'react';

export const Save = () => {
    const [notify, setNotify] = useState('');
    // defining the initial state for the form
    const initialState = new Recipe(new Date().getTime(), "", "", "", "");
    const { onChange, onSubmit, setValues, values } = useSaveForm(formCallback, initialState);

    // a submit function that will execute upon form submission
    async function formCallback() {
        // send "values" to database
        // console.log("formCallback", values);
        let recipe: Recipe = new Recipe(values.id, values.name, values.ingredients, values.measurements, values.cook_method);
        if (!recipe.isEmpty()) {
            console.log("Pushing recipe", recipe);
            postRecipeData(recipe);
        } else {
            console.log("Not pushed!", recipe);
        }
    }

    const postRecipeData = async (recipe: Recipe) => {
        const request = {
            method: 'POST',
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(recipe),
        }
        const response = await fetch('http://localhost:3080/api/recipe', request)
        const data = await response.json();
        if (data.status === 0) {
            console.log("Recipe", "Saved", data);
            setNotify('You succesfully added a Recipe.');
            setTimeout(() => {
                setNotify('');
                setValues(initialState);                
            }, 1000);
        } else {
            console.log("Recipe", "Not Saved", data);
        }
    }

    return (
        <>
            <div className='save-flex-center'>
                <form className='save-form' data-testid='add-form' onSubmit={onSubmit}>
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className="d-block w-100 text-center mb-3">
                                    <h1 className='display-5'>Add Recipe</h1>
                                    <p className="lead">Add your new ideas of your new Recipe in our <br /><b>Recipe Book</b>.</p>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className='d-block text-center'>
                                    <p className='lead text-success'>{notify}</p>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className='save-flex-start'>
                                    <div className='form-block'>
                                        <label className='form-label'>Name:</label>
                                        <input type="text" className='form-input recipe-name' name="name" onChange={onChange} required />
                                    </div>
                                </div>
                                <div className='save-flex-start'>
                                    <div className='form-block'>
                                        <label>Ingredients:</label>
                                        <textarea className='form-input form-textarea recipe-ingre' name="ingredients" onChange={onChange} required />
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className='save-flex-start'>
                                    <div className='form-block'>
                                        <label>Measurements:</label>
                                        <input className='form-input recipe-measure' name="measurements" onChange={onChange} required />
                                    </div>
                                </div>
                                <div className='save-flex-start'>
                                    <div className='form-block'>
                                        <label>Cooking Method:</label>
                                        <textarea className='form-input form-textarea recipe-cooking' name="cook_method" onChange={onChange} required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit"  data-testid='save-btn' className='save-btn' value="Submit">Save</button>
                </form>
            </div>
            {/* <ToastContainer /> */}
        </>
    );
};