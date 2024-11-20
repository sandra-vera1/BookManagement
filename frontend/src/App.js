import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; //handle react routers

//pages:
import Collection from './pages/Collection';
import Create from './pages/Create';
import Details from './pages/Details';
import Edit from './pages/Edit';
import Login from './pages/Login';

//components:
//import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Switch>
            <Route exact path="/">
            <Collection />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/Details/:id"> 
              <Details />
            </Route>
            <Route path="/Create"> 
              <Create />
            </Route>
            <Route path="/Edit/:id"> 
              <Edit />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
