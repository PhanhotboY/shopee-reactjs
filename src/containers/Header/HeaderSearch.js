import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import HeaderLogo from './Section/HeaderLogo';
import SearchBox from './Section/SearchBox';
import HeaderCart from './Section/HeaderCart';
import style from './HeaderSearch.module.scss';

class HeaderSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isInHomePage:
                window.location.pathname !== '/signup' && window.location.pathname !== '/login',
        };
    }

    render() {
        return (
            <div className={`${style['header_search']} grid`}>
                <HeaderLogo />
                <SearchBox />
                <HeaderCart />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearch);
