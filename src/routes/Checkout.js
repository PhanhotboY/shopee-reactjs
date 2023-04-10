import { PATH } from 'utils';
import { connect } from 'react-redux';
import React, { Component, createContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Redirect, Route, Switch } from 'react-router-dom';

import keys from '../config/keys.config';
import CheckoutPage from 'containers/Checkout';
import PaymentMethod from 'containers/Checkout/PaymentMethod';
import SelectPaymentMethod from 'containers/Checkout/SelectPaymentMethod';

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.props.location.state,
        };
    }

    componentDidMount() {
        const header = document.querySelector('header');
        header.style.position = 'relative';
    }

    componentWillUnmount() {
        const header = document.querySelector('header');
        header.style.position = '';
    }

    render() {
        const locationState = this.props.location.state;
        return (
            <div className='user-container'>
                <Elements
                    stripe={stripePromise}
                    options={{ clientSecret: locationState?.intent?.client_secret }}
                >
                    <Switch>
                        <Route
                            path={PATH.CHECKOUT}
                            exact
                            component={() => <CheckoutPage {...locationState} />}
                        />

                        <Route
                            path={PATH.CHECKOUT + PATH.PAYMENT + '/add'}
                            component={() => (
                                <PaymentMethod
                                    isRedirectedFromCart={this.state.isRedirectedFromCart}
                                />
                            )}
                        />

                        <Route
                            path={PATH.CHECKOUT + PATH.PAYMENT + '/select'}
                            component={SelectPaymentMethod}
                        />

                        <Route
                            component={() => {
                                return <Redirect to={PATH.CHECKOUT} />;
                            }}
                        />
                    </Switch>
                </Elements>
            </div>
        );
    }
}

const stripePromise = loadStripe(keys.stripePublishableKey);

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
