import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import style from './HeaderNavbar.module.scss';
import HeaderConnect from './Section/HeaderConnect';
import HeaderSupport from './Section/HeaderSupport';

class HeaderNavbar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div className={`${style.navbar} grid`} style={this.props.style || {}}>
                <HeaderConnect />
                <HeaderSupport />
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavbar);
