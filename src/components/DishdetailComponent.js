import React, {Component } from 'react'
import { Card , CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Button, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom'
import { LocalForm, Control, Errors } from 'react-redux-form'

const maxLength = (len) => (val) => !(val) || val.length <= len;
const minLength = (len) => (val) => (val) && val.length >= len;

class CommentForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <div className='row'>
                <Button outline onClick={this.toggleModal}>
                    <span className='fa fa-pencil fa-lg'> Submit Feedback</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className='form-group'>
                                    <Label className='form-group' htmlFor='rating'>Rating</Label>
                                </Row>
                                <Row className='form-group'>
                                    <Control.select 
                                        name='rating'
                                        model='.rating'
                                        className='form-control'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='author'>Your Name</Label>
                                </Row>
                                <Row className='form-group'>
                                    <Control.text 
                                        id='author'
                                        name='author'
                                        model='.author'
                                        className='form-control'
                                        validators={{
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors 
                                        className='text-danger'
                                        model='.author'
                                        show='touched'
                                        messages={{
                                            minLength: 'Minimum length is 3 characters',
                                            maxLength: 'Maximum length is 15 characters'
                                        }}/>
                                </Row>
                                <Row className='form-group'>
                                    <Label htmlFor='comment'>Comment</Label>
                                </Row>
                                <Row className='form-group'>
                                    <Control.textarea
                                        id='comment'
                                        name='comment'
                                        model='.comment'
                                        className='form-control'
                                        rows='6'/>
                                </Row>
                                <Row className='form-group'>
                                    <Button type='submit' color='primary'>Submit</Button>
                                </Row>
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function RenderDish({dish}){
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

function RenderComments({comments, addComment, dishId}){

    if(comments == null){
        return <div></div>
    }

    const commentsAsListItems = comments.map((comment) => {
        return (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
            </li>
        )
    })

    return <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentsAsListItems}
                    <CommentForm 
                        dishId={dishId}
                        addComment={addComment} />
                </ul>
            </div>

}

const DishDetail = (props) => {

    const dish = props.dish;

    if(dish == null){
        return <div></div>
    }

    return (
        <div className="container">
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className='row'>
                <div className='col-12 col-md-5 m-1'>
                    <RenderDish dish={props.dish} />
                </div>
                <div className='col-12 col-md-5 m-1'>
                    <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id} />
                </div>
            </div>
        </div>
    );

}

export default DishDetail;