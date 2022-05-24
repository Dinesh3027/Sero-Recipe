import { MdDining } from "react-icons/md";
import { BrowserRouter } from "react-router-dom";
import { RecipeRoute } from "../routers/router";
import { AppConstants } from "../utils/AppConstants";

export const Header = () => {
    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="d-flex align-items-center justify-content-center m-3">
                        <MdDining fontSize={28} color={'white'} />
                        <a className="navbar-brand mx-3" href="/">Recipe Book</a>
                    </div>
                    <div className="navbar-nav ml-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a href={AppConstants.HOME} className='nav-link active'>
                                Home
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href={AppConstants.ADD} className='nav-link active'>
                                Add
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href={AppConstants.EDIT} className="nav-link active">
                                Edit
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href={AppConstants.SEARCH} className="nav-link active">
                                Search
                            </a>
                        </li>
                    </div>
                </div>
            </nav>
            <div className="container m-3">
                <div className="row p-3">
                    <RecipeRoute />
                </div>
            </div>
        </BrowserRouter>
    );
}