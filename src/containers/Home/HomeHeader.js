import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import './HomeHeader.module.scss';

class HomeHeader extends Component {
    render() {
        return <></>;
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
