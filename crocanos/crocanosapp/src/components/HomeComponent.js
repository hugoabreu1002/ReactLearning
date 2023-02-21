import React, { Component } from 'react';
import { Loading } from './LoadingComponent';

import { Control, Errors, Form } from 'react-redux-form';
import { Link } from 'react-router-dom';
import {
    Breadcrumb, BreadcrumbItem,
    Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Label, Media, Row
} from 'reactstrap';


function RenderLeader({ leader }) {
    return (
        <div key={leader.id} className="col-12 mt-5">
            <Media>
                <Media body className="col-12">
                    <Media heading>
                        <h1>{leader.name}</h1>
                    </Media>
                    <p>{leader.designation}</p>
                    <p>{leader.description}</p>
                </Media>
            </Media>
        </div>
    );
}


function About({ leaders, isLoading, errMess }) {

    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    else {

        const renderedLeaders = leaders.map((leader) => {
            return (
                <RenderLeader leader={leader} />
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>About Us</h2>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12 col-md-6">
                        <h3>Our History</h3>
                        <p>Mayara, a Brazilian chef and passionate vegetarian, opened her restaurant "Crocanos" in Recife in 2023.
                            Crocanos quickly became a popular destination for both vegetarians and meat-eaters alike, thanks to its creative
                            and delicious vegetarian dishes made with the freshest and highest quality ingredients. Mayara's commitment to using
                            sustainable and environmentally friendly practices in her restaurant helped to set Crocanos apart from the competition.
                            Today, Crocanos is one of the most well-known and respected vegetarian restaurants in Brazil,
                            loved by customers who appreciate its unique and flavorful dishes.</p>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Corporate Leadership</h3>
                    </div>
                    <div className="col-12">
                        <Media list>
                            {renderedLeaders}
                        </Media>
                    </div>
                </div>
            </div>
        );
    }

}

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleSubmit(values) {
        this.props.postFeedback(values);
        this.props.resetFeedbackForm();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    render() {

        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. Number"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 6, offset: 2 }}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree"
                                                className="form-check-input"
                                            /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{ size: 3, offset: 1 }}>
                                    <Control.select model=".contactType" name="contactType"
                                        className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

function RenderFeature({ feature, isLoading, errMess }) {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    else {
        return (
            <Card>
                <CardBody>
                    <CardTitle>{feature.name}</CardTitle>
                    <CardText>{feature.description}</CardText>
                </CardBody>
            </Card>
        );
    }

}

function Home(props) {
    const renderedFeatures = props.features.map((feature) => {
        return (
            <div>
                < RenderFeature feature={feature} isLoading={props.featuresLoading} errMess={props.featuresErrMess} />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row align-items-start">
                <h2>What we do</h2>
                <hr />
                <div>{renderedFeatures}</div>
            </div>
            <div>
                <About leaders={props.leaders} isLoading={props.leadersLoading} errMess={props.leadersErrMess} />
            </div>
            <div>
                <Contact resetFeedbackForm={props.resetFeedbackForm} postFeedback={props.postFeedback} />
            </div>
        </div>
    );
}

export default Home;  