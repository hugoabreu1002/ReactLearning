import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { fetchComments, fetchDishes, fetchPosts, fetchItems, fetchFeatures, fetchLeaders, postComment, postFeedback } from '../redux/ActionCreators';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import FreeMarket from './FreeMarketComponent';
import CrockyNet from './CrokyNetComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';

const mapStateToProps = state => {
    return {
        items: state.items,
        posts: state.posts,
        dishes: state.dishes,
        features: state.features,
        comments: state.comments,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({

    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchItems: () => { dispatch(fetchItems()) },
    fetchPosts: () => { dispatch(fetchPosts()) },
    fetchDishes: () => { dispatch(fetchDishes()) },
    fetchFeatures: () => { dispatch(fetchFeatures()) },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
    fetchComments: () => dispatch(fetchComments()),
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
        this.props.fetchPosts();
        this.props.fetchItems();
        this.props.fetchDishes();
        this.props.fetchFeatures();
        this.props.fetchComments();
        this.props.fetchLeaders();
    }

    render() {
        console.log(this.props.features)
        const HomePage = () => {
            return (
                <Home
                    features={this.props.features.features}
                    featuresLoading={this.props.features.isLoading}
                    featuresErrMess={this.props.features.errMess}
                    leaders={this.props.leaders.leaders}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                />
            );
        }

        const CrockyNetPage = () => {
            return (
                <div>
                    < CrockyNet posts={this.props.posts} />
                </div>
            );
        }

        const FreeMarketPage = () => {
            return (
                <div>
                    < FreeMarket items={this.props.items} />
                </div>
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
                            <Route exact path='/crockynet' element={<CrockyNetPage />} />
                            <Route path='/freemarket' element={<FreeMarketPage />} />
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