import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import './index.scss';
import BannerImages from './Section/BannerImages';
import BannerCategory from './Section/BannerCategory';

class HomeBanner extends Component {
    render() {
        return (
            <div className='banner_wrapper row'>
                <BannerImages />
                <BannerCategory />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);
