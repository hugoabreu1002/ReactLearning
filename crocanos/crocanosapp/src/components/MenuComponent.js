import React from 'react';
import {
    Card, CardImg, CardImgOverlay, CardTitle,
} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';



function RenderMenuItem({ dish }) {
    return (<div className="col-12 col-md-5 m-1">
        <Card>
            <Link to={`/restaurantmenu/${dish.id}`} >
                <CardTitle tag="h5">{dish.name}</CardTitle>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
            </Link>
        </Card>
    </div >)
}

const Menu = (props) => {

    const menu = props.dishes.dishes.map((dish) => {
        if (props.dishes.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.dishes.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>{props.dishes.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <RenderMenuItem dish={dish} />
            );
        }
    });


    return (

        < div className="container" >
            <div className="row">
                {menu}
            </div>
        </div >
    )

}

export default Menu;