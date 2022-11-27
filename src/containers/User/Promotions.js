import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'store/actions';
import Notifications from './Section/Notifications';

class Promotions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notificationArr: this.props.notifications || [],
        };
    }

    async componentDidMount() {
        await this.props.fetchNotificationsStart(this.props.userInfo.id);

        this.setState({ notificationArr: this.props.notifications });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.notifications !== prevProps.notifications) {
            this.setState({ notificationArr: this.props.notifications });
        }
    }

    render() {
        return (
            <Notifications
                isViewDetail={true}
                notificationArr={this.state.notificationArr}
                page='promotions'
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        notifications: state.user.notifications,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchNotificationsStart: (userId) => dispatch(actions.fetchNotificationsStart(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Promotions);
