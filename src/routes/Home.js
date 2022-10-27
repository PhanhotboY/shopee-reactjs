import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from '../containers/Home/HomeHeader';
import UserManage from '../containers/System/UserManage';

class Home extends Component {
    render() {
        const { isLoggedIn } = this.props;

        return (
            <div>
                {/* <HomeHeader /> */}
                <UserManage />
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
