import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import UserNavBar from 'containers/User/UserNavBar';
import MyAccount from 'containers/User/MyAccount';
import ChangePassword from 'containers/User/ChangePassword';
import Promotions from 'containers/User/Promotions';
import Ratings from 'containers/User/Ratings';
import Purchase from 'containers/User/Purchase';

class User extends Component {
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
        const { userMenuPath } = this.props;

        return (
            <div className='grid user-container'>
                <div className='row mx-0'>
                    <UserNavBar />

                    <div
                        className='col-10 bg-white'
                        style={{ boxShadow: '0 1px 2px 0 rgba(0 ,0 ,0, .13)' }}
                    >
                        <Switch>
                            <Route path='/user/account/profile' component={MyAccount} />
                            <Route
                                path='/user/account/change-password'
                                component={ChangePassword}
                            />

                            <Route path='/user/purchase' component={Purchase} />

                            <Route path='/user/notifications/promotion' component={Promotions} />

                            <Route path='/user/notifications/rating' component={Ratings} />

                            <Route
                                component={() => {
                                    return <Redirect to={userMenuPath} />;
                                }}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userMenuPath: state.app.userMenuPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
