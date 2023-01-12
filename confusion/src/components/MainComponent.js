import React, { Component } from 'react';
import Home from './HomeComponent';
import { Routes, Route } from 'react-router-dom';
import DishDetail from './DishdetailComponent';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }

    render() {
        const dishToDetail = this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0];
        const HomePage = () => {
            return (
                <Home
                />
            );
        }
        const MenuPage = () => {
            return (
                <div>
                    < Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} />
                    <DishDetail dish={dishToDetail} />
                </div>
            );
        }
        return (
            <div>
                <Header />
                <Routes>
                    <Route path='/home' element={<HomePage />} />
                    <Route exact path='/menu' element={<MenuPage />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;