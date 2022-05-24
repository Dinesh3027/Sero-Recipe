import "./App.css";
import { Route, BrowserRouter as Router, Switch, BrowserRouter } from "react-router-dom";

import { MdDining } from 'react-icons/md';
import { Home } from "./pages/Home/Home";
import { Save } from "./pages/Save/Save";
import { Search } from "./pages/Search/Search";
import { Header } from "./components/header";

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
          <Header />
      </div>
    </div>
    
      
  );
};

export default App;
