import React, { Component } from 'react';
import Home from './HomeComponent';
import { Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import DishDetail from './DishdetailComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import About from './AboutUsComponent';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({

    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos())

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

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {

        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErrMess={this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promoLoading={this.props.promotions.isLoading}
                    promoErrMess={this.props.promotions.errMess}
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
            const dishToDetail = this.props.dishes.dishes.find(({ id }) => id === parseInt(routeParams.dishId, 10));
            const commentsToDetail = this.props.comments.comments.filter(({ dishId }) => dishId === parseInt(routeParams.dishId, 10));
            return (
                <DishDetail
                    dish={dishToDetail}
                    comments={commentsToDetail}
                    addComment={this.props.addComment}
                    commentsErrMess={this.props.comments.errMess}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                />
            );
        };

        return (
            <div>
                <Header />
                <Routes>
                    <Route path='/home' element={<HomePage />} />
                    <Route path='/menu' element={<MenuPage />} />
                    <Route path='/menu/:dishId' element={<DishWithId />} />
                    <Route exact path='/contactus' element={<Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Route path='/aboutus' element={<About leaders={this.props.leaders} />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))