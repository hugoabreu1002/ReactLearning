import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle
} from 'reactstrap';

class DishDetail extends React.Component {


    renderDetailedDishCard() {
        if (this.props.dish != null) {
            return (
                <Card>
                    <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>)
        }
    }

    renderComments() {
        //console.log(this.props.dish);
        if (this.props.dish != null) {
            const commentsText = this.props.dish.comments?.map((comment) => {
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>--{comment.author},
                            &nbsp;
                            {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: "2-digit"
                            }).format(new Date(comment.date))}
                        </p>
                    </li>
                );
            });


            return (
                <div className="container">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {commentsText}
                    </ul>
                </div>)
        }

    }

    render() {
        return (
            <div className="container">
                <div className='row'>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDetailedDishCard()}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments()}
                    </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;