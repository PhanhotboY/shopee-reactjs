import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import style from './UserHeader.module.scss';

class UserHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {}

    redirectToCreateUserPage = () => {
        const { navigate } = this.props;
        const redirectPath = `/system/manage-user/create`;
        navigate(`${redirectPath}`);
    };

    render() {
        return <div className={style.wrapper}>{this.props.children}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.app.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
