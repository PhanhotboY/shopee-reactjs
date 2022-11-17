import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';

import {
    userIsNotAuthenticated,
    userAlreadyHaveAccount,
    userIsAnAdminRedir,
} from '../hoc/authentication';

import { PATH } from '../utils';
import * as actions from 'store/actions';

import Home from '../routes/Home';
import Signup from './Auth/Signup';
import Login from './Auth/Login';
import Header from './Header/Header';
import System from '../routes/System';

const SystemAuth = userIsAnAdminRedir(System);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bootstrapped: false,
        };
    }

    // handlePersistorState = () => {
    //     const { persistor } = this.props;
    //     let { bootstrapped } = persistor.getState();
    //     if (bootstrapped) {
    //         if (this.props.onBeforeLift) {
    //             Promise.resolve(this.props.onBeforeLift())
    //                 .then(() => this.setState({ bootstrapped: true }))
    //                 .catch(() => this.setState({ bootstrapped: true }));
    //         } else {
    //             this.setState({ bootstrapped: true });
    //         }
    //     }
    // };

    async componentDidMount() {
        await this.props.appStartUpComplete();
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
                                    component={userAlreadyHaveAccount(Login)}
                                />

                                <Route path={PATH.SYSTEM} component={SystemAuth} />
                            </Switch>
                        </div>

                        <ToastContainer
                            position='top-right'
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme='light'
                        />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        appStartUpComplete: () => dispatch(actions.appStartUpComplete()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
