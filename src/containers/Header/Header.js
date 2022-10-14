import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import HeaderConnect from './Section/HeaderConnect';
import HeaderSupport from './Section/HeaderSupport';
import './Header.scss';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        return (
            <header>
                <div className='header_wrapper header_navbar'>
                    <HeaderConnect />
                    <HeaderSupport />
                </div>
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
