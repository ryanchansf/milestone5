import React, {useState, useEffect} from "react"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/navbar.jsx';
import About from './components/about.jsx';
import Home from './components/home.jsx';
import Recipe from './components/recipePage.jsx';
// import recipes from './recipeData.js';

function App() {

  let [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const loadRecipes = () => {
      fetch("/api/recipe")
      .then(res => res.json())
      .then(jsondata => setRecipes(jsondata))
    }
    loadRecipes()
  }, []);

  return (  
    <Router>
      <div className="App">
        <Navbar />
        <Switch>

          <Route exact path= '/'>
            <Home />
          </Route>

          <Route path='/about'>
            <About />
          </Route>
          



            {recipes.map((recipe) => {
              return (
                <Route path={`/recipe/${recipe.recipeName}`}> 
                  <Recipe
                    name = {recipe.recipeName}
                    image = {recipe.recipeImage}
                    ingredients = {recipe.ingredientList}
                    instructions = {recipe.steps}
                  /> { /*calling the component*/}
                </Route>
              )})}

          {/* <Route path='/recipe/Chinese Cabbage and Pork Belly Stir Fry'>
            <Recipe 
              name={recipes[0].recipeName} 
              image={recipes[0].recipeImage} 
              ingredients={recipes[0].ingredientList}
              instructions={recipes[0].steps}
            />
          </Route>

          <Route path='/recipe/Pork Siu Mai'>
            <Recipe 
              name={recipes[1].recipeName}
              image={recipes[1].recipeImage}
              ingredients={recipes[1].ingredientList}
              instructions={recipes[1].steps}
            />
          </Route>

          <Route path='/recipe/Signature Crispy Pork Belly'>
            <Recipe 
              name={recipes[2].recipeName}
              image={recipes[2].recipeImage}
              ingredients={recipes[2].ingredientList}
              instructions={recipes[2].steps}
            />
          </Route> */}

        </Switch>
      </div>
    </Router>
  );
}

export default App;
