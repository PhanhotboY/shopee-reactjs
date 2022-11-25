import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import style from './MyAccount.module.scss';
import UserHeader from './UserHeader';
import SignupForm from 'containers/Auth/Section/SignupForm';

class MyAccount extends Component {
    constructor(props) {
        super(props);

        this.submitOptions = {
            fetchService: 'handleUpdateUser',
            successMessage: 'Update user successfully!',
            failMessage: 'Updata user fail!',
        };
    }

    async componentDidMount() {}

    redirectToCreateUserPage = () => {
        const { navigate } = this.props;
        const redirectPath = `/system/manage-user/create`;
        navigate(`${redirectPath}`);
    };

    render() {
        console.log(this.submitOptions);
        return (
            <div className={style.wrapper}>
                <UserHeader>
                    <h5>
                        <FormattedMessage id='user.account.my-profile' />
                    </h5>
                    <span>
                        <FormattedMessage id='user.account.profile-header-content' />
                    </span>
                </UserHeader>

                <div className={`row ${style.body}`}>
                    <div className='col-8'>
                        <SignupForm
                            defaultValue={this.props.userInfo}
                            submitBtn='common.update'
                            isDisableEmail={true}
                            submitOptions={this.submitOptions}
                        />
                    </div>

                    <div className={`col-3 ${style.upload_img}`}>
                        <img src={this.props.userInfo.avatar} />

                        <button type='button'>
                            <FormattedMessage id='user.account.select-img' />
                        </button>

                        <span>
                            <FormattedMessage id='user.account.file-size' />
                        </span>
                        <span>
                            <FormattedMessage id='user.account.file-extension' />
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
