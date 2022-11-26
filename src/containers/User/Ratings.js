import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notifications from './Section/Notifications';

class Promotions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notificationArr: [],
        };
    }

    async componentDidMount() {}

    render() {
        return (
            <Notifications
                isViewDetail={true}
                notificationArr={this.state.notificationArr}
                page='ratings'
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Promotions);
