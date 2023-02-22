import React from 'react';
import {
    Card, CardImg, CardText, CardTitle,
} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';



function RenderPost({ post }) {
    return (<div className="col-12 col-md-5 m-1">
        <Card>
            <CardTitle tag="h5">{post.name}</CardTitle>
            <CardImg width="100%" src={baseUrl + post.image} alt={post.name} />
            <CardText> {post.opnion} </CardText>
        </Card>
    </div >)
}

const CrockyNet = (props) => {

    const crockynet = props.posts.posts.map((post) => {
        if (props.posts.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.posts.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>{props.posts.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <RenderPost post={post} />
            );
        }
    });


    return (

        < div className="container" >
            <div className="row">
                {crockynet}
            </div>
        </div >
    )

}

export default CrockyNet;