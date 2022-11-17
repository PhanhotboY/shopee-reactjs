import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import style from './Login.module.scss';
import LoginForm from './Section/LoginForm';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    redirectToSignupPage = () => {
        const { navigate } = this.props;
        const redirectPath = '/signup';
        navigate(`${redirectPath}`);
    };

    render() {
        return (
            <div className={style['login_body']}>
                <div
                    className={style['login_body_wrapper']}
                    style={{
                        background: `url('https://cf.shopee.vn/file/000d7f7e293e29de23ddefbaa0e80436') center/ cover no-repeat`,
                    }}
                >
                    <div className={style.login_form}>
                        <div className={style['login_form_title']}>
                            <FormattedMessage id='login.login' />
                        </div>

                        <LoginForm />

                        <a className={style['login_form_forgot']} href='#'>
                            <FormattedMessage id='login.forgot-pass' />
                        </a>

                        <div className={style['split']}>
                            <span>
                                <FormattedMessage id='signup.or' />
                            </span>
                        </div>

                        <div className={style['login_form_otherOptions']}>
                            <a href='#'>
                                <div className={style['icon_facebook']}></div>
                                <span>Facebook</span>
                            </a>

                            <a href='#'>
                                <div className={style['icon_google']}></div>
                                <span>Google</span>
                            </a>
                        </div>

                        <div className={style['redirect_signup']}>
                            <span>
                                <FormattedMessage id='login.new-to-shop' />
                            </span>
                            <span onClick={this.redirectToSignupPage}>
                                <FormattedMessage id='signup.signup' />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
