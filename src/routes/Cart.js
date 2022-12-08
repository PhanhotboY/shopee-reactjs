import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { PATH } from 'utils';

import CartPage from 'containers/CartPage';

class Cart extends Component {
    constructor(props) {
        super(props);
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
        return (
            <div className='user-container'>
                <Switch>
                    <Route path='/cart' exact component={CartPage} />

                    <Route
                        component={() => {
                            return <Redirect to={PATH.CART} />;
                        }}
                    />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
