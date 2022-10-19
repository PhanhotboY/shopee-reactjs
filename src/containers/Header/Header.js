import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import HeaderConnect from './Section/HeaderConnect';
import HeaderSupport from './Section/HeaderSupport';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInHomePage:
                window.location.pathname !== '/signup' && window.location.pathname !== '/login',
        };
    }

    componentDidMount() {
        const targetNode = document.querySelector('.content-container');
        const config = { childList: true, subtree: true };

        const callback = (mutationsList, observer) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    this.setState({
                        isInHomePage:
                            window.location.pathname !== '/signup' &&
                            window.location.pathname !== '/login',
                    });
                }
            }
        };
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }

    render() {
        return (
            <header>
                {this.state.isInHomePage && (
                    <div className='header_wrapper header_navbar'>
                        <HeaderConnect />
                        <HeaderSupport />
                    </div>
                )}
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
