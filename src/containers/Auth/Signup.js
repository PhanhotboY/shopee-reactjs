import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';

import style from './Signup.module.scss';
import SignupForm from './Section/SignupForm';
import OtherLoginOptions from './Section/OtherLoginOptions';

class Signup extends Component {
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
                avatarURL: '',
            },
            isHiddenPassword: true,
            errMessage: {},
        };
    }

    componentDidMount() {
        const header = document.querySelector('header');
        header.style.position = 'relative';
    }

    componentWillUnmount() {
        const header = document.querySelector('header');
        header.style.position = '';
    }

    redirectToLoginPage = () => {
        const { navigate } = this.props;
        const redirectPath = '/login';
        navigate(`${redirectPath}`);
    };

    render() {
        const submitOptions = {
            fetchService: 'handleSignup',
            successMessage: 'Create new user successfully!',
            failMessage: 'Create user fail!',
            redirectHandler: this.redirectToLoginPage,
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
                            title='signup.signup'
                            isPasswordInput={true}
                            submitOptions={submitOptions}
                        />

                        <Spliter fontSize='.8rem' />

                        <OtherLoginOptions />

                        <TermsOfService />

                        <RedirectOption
                            redirectHandler={this.redirectToLoginPage}
                            reason='signup.have-an-account'
                            destination='login.login'
                            subStyle={{ margin: '12px 0' }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const TermsOfService = () => {
    return (
        <div className={style.form_abide}>
            <FormattedMessage id='signup.agreement' />
            <br />
            <a href='#'>
                <span>
                    <FormattedMessage id='signup.terms-of-service' />
                </span>
            </a>
            &
            <a href='#'>
                <span>
                    <FormattedMessage id='signup.privacy-policy' />
                </span>
            </a>
        </div>
    );
};

export const RedirectOption = ({ redirectHandler, reason, destination, subStyle }) => {
    return (
        <div className={style.redirect} style={subStyle}>
            <span>
                <FormattedMessage id={reason} />
            </span>

            <span onClick={redirectHandler}>
                <FormattedMessage id={destination} />
            </span>
        </div>
    );
};

export const Spliter = ({ fontSize }) => {
    return (
        <div className={style.split}>
            <span style={{ fontSize }}>
                <FormattedMessage id='signup.or' />
            </span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
