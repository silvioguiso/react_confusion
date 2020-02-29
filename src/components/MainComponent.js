import React, {Component} from 'react';
//Components
import Home from './HomeComponent'
import Menu from './MenuComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Contact from './ContactComponent'
import DishDetail from './DishdetailComponent'

//Data
import { DISHES } from '../shared/dishes'
import { PROMOTIONS }  from '../shared/promotions'
import { LEADERS } from '../shared/leaders'
import { COMMENTS } from '../shared/comments'

//Libraries
import { Switch, Route, Redirect} from 'react-router-dom'

class Main extends Component{

    constructor(props){
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            leaders: LEADERS,
            promotions: PROMOTIONS
        };
    }

    render() {

        const HomePage = () => {
            return (
                <Home 
                    dish = {this.state.dishes.filter((dish) => dish.featured)[0]}
                    leader = {this.state.leaders.filter((leader) => leader.featured)[0]}
                    promotion = {this.state.promotions.filter((promotion) => promotion.featured)[0]}
                />
            )
        }

        const DishWIthId = ({match}) => {
            return (
                <DishDetail 
                    dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                /> //10 is a base 10 integer
            );
        }

        return (
            <div>
                <Header />

                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes}/>} />
                    <Route path='/menu/:dishId' component={DishWIthId}/>
                    <Route exact path='/contactus' component={Contact} />
                    <Redirect to='/home' />
                </Switch>

                <Footer />
            </div>
        );
    }
}

export default Main;