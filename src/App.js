import React, { Component } from 'react';
import './App.css';

import Form from './components/Form';
import Recipes from './components/Recipes';

class App extends Component {
  state = {
    recipes: []
  }

  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();

    // Trick the Access-Control-Allow-Origin
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/https://forkify-api.herokuapp.com/api/search?q=${recipeName}`);

    const data = await api_call.json();
    this.setState({recipes: data.recipes });
  }

  // Will fire as soon as the component loads on the screen
  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes });
  }

  //  will fire as soon as state is updated
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Joyceeey's Kitchen Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={ this.state.recipes } />
      </div>
    );
  }
}

export default App;