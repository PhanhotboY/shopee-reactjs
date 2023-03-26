import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';

import style from '../Auth/Signup.module.scss';
import SignupForm from '../Auth/Section/SignupForm';

class UserCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signupData: {
                email: '',
                password: '',
                phoneNumber: '',
                gender: 'G1',
                firstName: '',
                lastName: '',
                role: 'R1',
                address: '',
                avatar: '',
            },
            isHiddenPassword: true,
            errMessage: {},
        };
    }

    render() {
        const submitOptions = {
            fetchService: 'handleSignup',
            successMessage: 'Create new user successfully!',
            failMessage: 'Create user fail!',
            redirectHandler: () => window.history.back(),
        };

        return (
            <div className={style.body}>
                <div
                    className={style.body_wrapper}
                    style={{
                        background: `url('https://cf.shopee.vn/file/000d7f7e293e29de23ddefbaa0e80436') center/ cover no-repeat`,
                    }}
                >
                    <div className={style.body_form}>
                        <SignupForm
                            title='system.create-user'
                            submitBtn='common.create'
                            isPasswordInput={true}
                            submitOptions={submitOptions}
                            isCancelBtn={true}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);
