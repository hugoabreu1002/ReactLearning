import React, { Component } from 'react';
import Home from './HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import DishDetail from './DishdetailComponent';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { useParams } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
        const MenuPage = () => {
            return (
                <div>
                    < Menu dishes={this.state.dishes} />
                </div>
            );
        }

        const DishWithId = () => {
            const routeParams = useParams();
            const dishToDetail = this.state.dishes.find(({ id }) => id === parseInt(routeParams.dishId, 10));
            const commentsToDetail = this.state.comments.filter(({ dishId }) => dishId === parseInt(routeParams.dishId, 10));
            return (
                <DishDetail dish={dishToDetail} comments={commentsToDetail} />
            );
        };

        return (
            <div>
                <Header />
                <Routes>
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/menu' element={<MenuPage />} />
                    <Route path='/menu/:dishId' element={<DishWithId />} />
                    <Route path='/contactus' element={<Contact />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default Main;