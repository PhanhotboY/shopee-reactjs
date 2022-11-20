import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderNavbar from './HeaderNavbar';
import HeaderSearch from './HeaderSearch';
import HeaderSign from './HeaderSign';
import HeaderSystem from './HeaderSystem';
import './Header.scss';
class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInSignPage:
                window.location.pathname === '/signup' || window.location.pathname === '/login',
            isInSystemPage: Boolean(window.location.pathname.match(/\/system.*/g)),
        };
    }

    componentDidMount() {
        const targetNode = document.querySelector('.content-container');
        const config = { childList: true, subtree: true };

        const callback = (mutationsList, observer) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    this.setState({
                        isInSignPage:
                            window.location.pathname === '/signup' ||
                            window.location.pathname === '/login',
                        isInSystemPage: Boolean(window.location.pathname.match(/\/system\/.*/g)),
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
                {this.state.isInSignPage || this.state.isInSystemPage || (
                    <>
                        <HeaderNavbar />
                        <HeaderSearch />
                    </>
                )}

                {this.state.isInSignPage && <HeaderSign />}

                {this.state.isInSystemPage && <HeaderSystem />}
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
