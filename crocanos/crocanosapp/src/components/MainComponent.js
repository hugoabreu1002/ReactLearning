import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos, postComment, postFeedback } from '../redux/ActionCreators';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({

    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => { dispatch(fetchDishes()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (feedback) => dispatch(postFeedback(feedback))
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
        this.props.fetchLeaders();
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
                    leaders={this.props.leaders.leaders}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
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
                    postComment={this.props.postComment}
                    commentsErrMess={this.props.comments.errMess}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                />
            );
        };

        console.log(this.props.leaders)

        return (
            < div >
                <Header />
                <TransitionGroup>
                    <CSSTransition classNames="page" timeout={300}>
                        <Routes>
                            <Route path='/home' element={<HomePage leaders={this.props.leaders.leaders} resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                            <Route path='/restaurantmenu' element={<MenuPage />} />
                            <Route path='/restaurantmenu/:dishId' element={<DishWithId />} />
                            <Route exact path='/crockynet' />
                            <Route path='/freemarket' />
                            <Route path="*" element={<Navigate to="/home" replace />} />
                        </Routes>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div >
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))