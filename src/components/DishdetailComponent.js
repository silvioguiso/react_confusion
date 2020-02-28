import React, { Component } from 'react'
import { Card , CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{

    renderDish(dish){
        return(
            <Card>
                <CardImg width='100%' src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    render(){

        const dish = this.props.selectedDish;

        if(dish == null){
            return <div></div>
        }        

        return (
            <div className="col-12 col-md-5 m-1">
                {this.renderDish(dish)}
            </div>
        );
    }
}

export default DishDetail;