import React from 'react';
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle
} from 'reactstrap';

class DishDetail extends React.Component {

    renderDetailedDishCard() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <Card>
                            <CardImg width="100%" src={this.props.image} alt={this.props.name} />
                            <CardBody>
                                <CardTitle>{this.props.name}</CardTitle>
                                <CardText>{this.props.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                </div>

            </div>)
    }

    renderComments() {
        const commentsText = this.props.comments?.map((comment) => {
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

    render() {
        console.log(this.props);
        return (
            <div className='row'>
                <div className="col-12 col-md-5 m-1">
                    {this.renderDetailedDishCard()}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments()}
                </div>
            </div>
        );
    }
}

export default DishDetail;