import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';

import { userIsNotAuthenticated, userIsAuthenticated, userIsAnAdmin } from '../hoc/authentication';

import { PATH } from '../utils';
import * as actions from 'store/actions';

import Home from '../routes/Home';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Header from './Header';
import Footer from './Footer/Footer';
import System from '../routes/System';
import User from 'routes/User';
import Shop from 'routes/Shop';
import Search from 'routes/Search';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bootstrapped: false,
        };
    }

    async componentDidMount() {
        await this.props.appStartUpComplete();
        await this.props.fetchGendersStart();
        await this.props.fetchRolesStart();
        await this.props.fetchNotificationsStart(
            (this.props.userInfo && this.props.userInfo.id) || 0
        );

        this.setState({ bootstrapped: this.props.started });
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className='main-container'>
                        <Header location={history.location} />

                        <div className='content-container'>
                            <Switch>
                                <Route path={PATH.HOME} exact component={Home} />

                                <Route
                                    path={PATH.SIGNUP}
                                    component={userIsNotAuthenticated(Signup)}
                                />

                                <Route
                                    path={PATH.LOGIN}
                                    component={userIsNotAuthenticated(Login)}
                                />

                                <Route path={PATH.SYSTEM} component={userIsAnAdmin(System)} />

                                <Route path={PATH.USER} component={userIsAuthenticated(User)} />

                                <Route path={PATH.SHOP} component={Shop} />

                                <Route path={PATH.SEARCH} component={Search} />

                                <Route
                                    component={() => {
                                        return <Redirect to='/' />;
                                    }}
                                />
                            </Switch>
                        </div>

                        <ToastContainer
                            position='top-right'
                            autoClose={1500}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme='light'
                        />

                        <Footer />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        appStartUpComplete: () => dispatch(actions.appStartUpComplete()),
        fetchGendersStart: () => dispatch(actions.fetchGendersStart()),
        fetchRolesStart: () => dispatch(actions.fetchRolesStart()),
        fetchNotificationsStart: (userId) => dispatch(actions.fetchNotificationsStart(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
