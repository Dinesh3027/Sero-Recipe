import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Edit } from "../pages/Edit/Edit";
import { Home } from "../pages/Home/Home";
import { Save } from "../pages/Save/Save";
import { Search } from "../pages/Search/Search";

export const RecipeRoute = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/add-recipe" component={Save} />
                <Route exact path="/edit-recipe" component={Edit} />
                <Route exact path="/search-recipe" component={Search} />
            </Switch>
        </Router>
    );
}