import React from 'react';
import {
    Card, CardImg, CardText, CardTitle,
} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';



function RenderMenuItem({ item }) {
    return (<div className="col-12 col-md-5 m-1">
        <Card>
            <CardTitle tag="h5">{item.name}</CardTitle>
            <CardImg width="100%" src={baseUrl + item.image} alt={item.name} />
            <CardText> {item.description} </CardText>
            <CardText> {item.price} </CardText>
        </Card>
    </div >)
}

const FreeMarket = (props) => {

    const freemarket = props.items.items.map((item) => {
        if (props.items.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.items.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>{props.items.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <RenderMenuItem item={item} />
            );
        }
    });


    return (

        < div className="container" >
            <div className="row">
                {freemarket}
            </div>
        </div >
    )

}

export default FreeMarket;