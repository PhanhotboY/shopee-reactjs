import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';

import style from './Signup.module.scss';
import SignupForm from './Section/SignupForm';

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

    redirectToLoginPage = () => {
        const { navigate } = this.props;
        const redirectPath = '/login';
        navigate(`${redirectPath}`);
    };

    render() {
        return (
            <div className={style.body}>
                <div
                    className={style.body_wrapper}
                    style={{
                        background: `url('https://cf.shopee.vn/file/000d7f7e293e29de23ddefbaa0e80436') center/ cover no-repeat`,
                    }}
                >
                    <div className={style.body_form}>
                        <div className={style.form_title}>
                            <FormattedMessage id='signup.signup' />
                        </div>

                        <SignupForm />

                        <div className={style['split']}>
                            <span>
                                <FormattedMessage id='signup.or' />
                            </span>
                        </div>

                        <div className={style['form_otherOptions']}>
                            <a href='#'>
                                <div className={style['icon_facebook']}></div>
                                <span>Facebook</span>
                            </a>

                            <a href='#'>
                                <div className={style['icon_google']}></div>
                                <span>Google</span>
                            </a>
                        </div>

                        <div className={style['form_abide']}>
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

                        <div className={style['redirect_login']}>
                            <span>
                                <FormattedMessage id='signup.have-an-account' />
                            </span>
                            <span onClick={this.redirectToLoginPage}>
                                <FormattedMessage id='login.login' />
                            </span>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
