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


const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        leaders: state.leaders,
        comments: state.comments,
        promotions: state.promotions
    }
}

class Main extends Component{

    constructor(props){
        super(props);
    }

    render() {

        const HomePage = () => {
            return (
                <Home 
                    dish = {this.props.dishes.filter((dish) => dish.featured)[0]}
                    leader = {this.props.leaders.filter((leader) => leader.featured)[0]}
                    promotion = {this.props.promotions.filter((promotion) => promotion.featured)[0]}
                />
            )
        }

        const DishWIthId = ({match}) => {
            return (
                <DishDetail 
                    dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                /> //10 is a base 10 integer
            );
        }

        return (
            <div>
                <Header />

                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders}/>} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes}/>} />
                    <Route path='/menu/:dishId' component={DishWIthId}/>
                    <Route exact path='/contactus' component={Contact} />
                    <Redirect to='/home' />
                </Switch>

                <Footer />
            </div>
        );
    }
}

//This connects the component to the react router and the store
export default withRouter(connect(mapStateToProps)(Main));