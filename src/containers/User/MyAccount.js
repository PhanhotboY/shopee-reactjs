import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import style from './MyAccount.module.scss';
import { appService } from 'services';
import UserHeader from './Section/UserHeader';
import SignupForm from 'containers/Auth/Section/SignupForm';
import keys from 'config/keys.config';

class MyAccount extends Component {
    constructor(props) {
        super(props);

        this.submitOptions = {
            fetchService: 'handleUpdateUser',
            successMessage: 'Update user successfully!',
            failMessage: 'Updata user fail!',
        };

        this.state = {
            userInfo: { ...this.props.userInfo },
        };
    }

    async componentDidMount() {}

    async handleChangeImage(e) {
        const file = e.target.files[0];

        try {
            const uploadConfig = await appService.handleGetSignedUrl(this.props.userInfo.id, file);

            this.setState({
                userInfo: {
                    ...this.state.userInfo,
                    uploadConfig: { ...uploadConfig, file },
                },
            });
        } catch (error) {
            console.log('Cannot get signed URL: ', error.message);
        }
    }

    redirectToCreateUserPage = () => {
        const { navigate } = this.props;
        const redirectPath = `/system/manage-user/create`;
        navigate(`${redirectPath}`);
    };

    render() {
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
                            defaultValue={this.state.userInfo}
                            submitBtn='common.update'
                            isDisableEmail={true}
                            submitOptions={this.submitOptions}
                        />
                    </div>

                    <div className={`col-3 ${style.upload_img}`}>
                        <label className='rounded-circle' htmlFor='uploadAvatar'>
                            <img src={`${keys.imageURL}/${this.props.userInfo.avatar}`} />
                        </label>

                        <label className={style.upload_file_btn} htmlFor='uploadAvatar'>
                            <FormattedMessage id='user.account.select-img' />
                        </label>

                        <input
                            id='uploadAvatar'
                            className='d-none'
                            type='file'
                            accept='.jpg, .png, .jpeg'
                            onChange={this.handleChangeImage.bind(this)}
                        />

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
