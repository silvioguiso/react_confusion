import React, {Component} from 'react';

//Components
import Home from './HomeComponent'
import Menu from './MenuComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Contact from './ContactComponent'
import DishDetail from './DishdetailComponent'
import About from './AboutComponent'

//Libraries
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators'
import { actions } from 'react-redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        leaders: state.leaders,
        comments: state.comments,
        promotions: state.promotions
    }
}

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => {dispatch(fetchLeaders())}
})

class Main extends Component{

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {

        const HomePage = () => {
            return (
                <Home 
                    dish = {this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading = {this.props.dishes.isLoading}
                    dishesErrMsg = {this.props.dishes.errMsg}
                    leader = {this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading = {this.props.leaders.isLoading}
                    leadersErrMsg = {this.props.leaders.errMsg}
                    promotion = {this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                    promosLoading = {this.props.promotions.isLoading}
                    promosErrMsg = {this.props.promotions.errMsg}
                />
            )
        }

        const DishWIthId = ({match}) => {
            return (
                <DishDetail 
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading = {this.props.dishes.isLoading}
                    errMsg = {this.props.dishes.errMsg}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMsg = {this.props.comments.errMsg}
                    postComment={this.props.postComment}
                /> //10 is a base 10 integer
            );
        }

        return (
            <div>
                <Header />

                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders}/>} />
                            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes}/>} />
                            <Route path='/menu/:dishId' component={DishWIthId}/>
                            <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                            <Redirect to='/home' />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                
                <Footer />
            </div>
        );
    }
}

//This connects the component to the react router and the store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));