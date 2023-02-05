import React, { Component } from 'react';
import Home from './HomeComponent';
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import DishDetail from './DishdetailComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutUsComponent';
import { addComment } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({

    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class Main extends Component {

    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
        const MenuPage = () => {
            return (
                <div>
                    < Menu dishes={this.props.dishes} />
                </div>
            );
        }

        const DishWithId = () => {
            const routeParams = useParams();
            const dishToDetail = this.props.dishes.find(({ id }) => id === parseInt(routeParams.dishId, 10));
            const commentsToDetail = this.props.comments.filter(({ dishId }) => dishId === parseInt(routeParams.dishId, 10));
            return (
                <DishDetail dish={dishToDetail} comments={commentsToDetail} addComment={this.props.addComment} />
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
                    <Route path='/aboutus' element={<About leaders={this.props.leaders} />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))