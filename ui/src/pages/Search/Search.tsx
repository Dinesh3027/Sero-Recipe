
import '../../global.css';
import './search.css';
import { useState } from 'react';
import { Recipe } from '@models/Recipe';
import { useSearchForm } from '../../hooks/useSearchForm';

export const Search = () => {

    const { onChange, onSubmit, values } = useSearchForm(formCallback, '');
    const [recipes, setRecipes] = useState<Array<Recipe>>([]);
    const [type, setType] = useState("0");

    async function formCallback() {
        // console.log("Search", values);
        if (values.search != null) {
            searchRecipe(values.search);
        }
    }

     // onSelectChange handle change events whenever 
    // something changes in the Select
    const onTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setType(event.target.value);
    };

    const searchRecipe = async (searchWord: any) => {
        const response = await fetch('http://localhost:3080/api/recipe/'+type+'/' + searchWord)
        const searchResult = await response.json();
        if (searchResult.status === 0) {
            // console.log("Search Result with data", searchResult);
            setRecipes(searchResult.data);
        } else {
            // console.log("Search Result no data", searchResult);
            setRecipes([]);
        }
    }

    const formatDate = (timeStr: number) => {
        let dt = new Date();
        dt.setTime(timeStr);
        return dt.toUTCString();
    }

    return (
        <>
            <div className='container'>
                <div className='row mb-3'>
                    <div className='col-sm-12'>
                        <div className="d-block w-100 text-center mb-3">
                            <h1 className='display-5'>Search</h1>
                            <p className="lead mb-0">Find your Recipe by Name or Ingredient</p>
                            <p className="lead mb-0">Select Search option and enter word to search your Cook Book.</p>
                            <p className="lead">By default it will search with Name, chamnge the select option to search with Ingredient if you want.</p>
                        </div>
                    </div>
                </div>
                <div className='row mb-3'>
                    <div className='col-sm-12'>
                        <div className='d-block w-50 mx-auto'>
                            <form className="d-flex form-search-recipe" onSubmit={onSubmit} data-testid="search-form">
                                <select className="form-select" aria-label="Select Search type" onChange={onTypeChange}>
                                    <option value="0">Name</option>
                                    <option value="1">Ingredient</option>
                                </select>
                                <input className="form-control me-2" type="search" data-testid="search-input" name="search" placeholder="Search" onChange={onChange} />
                                <button className="btn btn-outline-success search-btn" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='table-responsive text-center'>
                            <table className="table table-borderless align-middle">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Ingredients</th>
                                        <th scope="col">Measurements</th>
                                        <th scope="col">Cook Method</th>
                                        <th scope="col">Date of Entry</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recipes.map((it, index) =>
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td><p className='lead'>{it.name}</p></td>
                                            <td><p className='lead'>{it.ingredients}</p></td>
                                            <td><p className='lead'>{it.measurements}</p></td>
                                            <td><p className='lead'>{it.cook_method}</p></td>
                                            <td><p className='lead'>{formatDate(it.id)}</p></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

