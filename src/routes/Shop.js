import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import ShopDetail from 'containers/ShopDetail';

class Shop extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='shop-container'>
                <Switch>
                    <Route path='/shops/:shopId' component={ShopDetail} />

                    <Route
                        component={() => {
                            return <Redirect to='/' />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
