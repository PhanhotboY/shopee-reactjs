import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import HeaderNavbar from './HeaderNavbar';
import HeaderSearch from './HeaderSearch';
import HeaderSign from './HeaderSign';
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
                    <>
                        <HeaderNavbar />
                        <HeaderSearch />{' '}
                    </>
                )}

                {this.state.isInHomePage || <HeaderSign />}
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
