import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';

import style from './Login.module.scss';
import LoginForm from './Section/LoginForm';
import OtherLoginOptions from './Section/OtherLoginOptions';
import { RedirectOption, Spliter } from './Signup';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        const header = document.querySelector('header');
        header.style.position = 'relative';
    }

    componentWillUnmount() {
        const header = document.querySelector('header');
        header.style.position = '';
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

                        <Spliter fontSize='.875rem' />

                        <OtherLoginOptions />

                        <RedirectOption
                            redirectHandler={this.redirectToSignupPage}
                            reason='login.new-to-shop'
                            destination='signup.signup'
                            subStyle={{ marginTop: 25, fontSize: '1rem' }}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
