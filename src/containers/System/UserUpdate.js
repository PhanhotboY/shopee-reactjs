import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import formStyle from '../Auth/Signup.module.scss';
import { userService } from '../../services';
import * as actions from '../../store/actions';
import SignupForm from 'containers/Auth/Section/SignupForm';

class UserUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {},
        };
    }

    async componentDidMount() {
        const userId = new URLSearchParams(this.props.location.search).get('id');
        try {
            const res = await userService.handleGetUser(userId);

            if (res && !res.errType) {
                this.setState({ userInfo: res.userInfo });
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const submitOptions = {
            fetchService: 'handleUpdateUser',
            successMessage: 'Update user successfully!',
            failMessage: 'Updata user fail!',
            redirectHandler: () => window.history.back(),
        };

        return (
            <div className={formStyle.body}>
                <div
                    className={formStyle.body_wrapper}
                    style={{
                        background: `url('https://cf.shopee.vn/file/000d7f7e293e29de23ddefbaa0e80436') center/ cover no-repeat`,
                    }}
                >
                    <div className={formStyle.body_form} style={{ height: 490 }}>
                        <SignupForm
                            title='system.update-user'
                            submitBtn='common.update'
                            submitOptions={submitOptions}
                            defaultValue={this.state.userInfo}
                            isDisableEmail={true}
                            isCancelBtn={true}
                            isRoleInput={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate);
