import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import UserNavBar from 'containers/User/UserNavBar';
import MyAccount from 'containers/User/MyAccount';
import ChangePassword from 'containers/User/ChangePassword';
import UserDeleted from '../containers/System/UserDeleted';
import UserManage from 'containers/System/UserManage';
import ProductManage from 'containers/System/ProductManage';

class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { userMenuPath } = this.props;
        return (
            <div className='grid user-container'>
                <div className='row mx-0'>
                    <Router>
                        <UserNavBar />

                        <div className='col-10 bg-white'>
                            <Switch>
                                <Route path='/user/account/profile' component={MyAccount} />
                                <Route
                                    path='/user/account/change-password'
                                    component={ChangePassword}
                                />

                                <Route path='/user/purchase' component={ProductManage} />

                                <Route
                                    path='/user/notifications/promotion'
                                    component={UserManage}
                                />

                                <Route path='/user/notifications/rating' component={UserDeleted} />

                                <Route
                                    component={() => {
                                        return <Redirect to={userMenuPath} />;
                                    }}
                                />
                            </Switch>
                        </div>
                    </Router>
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
