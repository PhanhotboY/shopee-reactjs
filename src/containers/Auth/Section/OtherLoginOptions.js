import React, { Component } from 'react';
import { connect } from 'react-redux';

import keys from 'config/keys.config';
import * as actions from 'store/actions';
import style from './OtherLoginOptions.module.scss';

class OtherLoginOptions extends Component {
    constructor(props) {
        super(props);

        // const oauthForm = document.querySelector(`.${style.wrapper}`);
        // const oauthFormInput = document.querySelector(`.${style.wrapper} > input`);

        // oauthFormInput && oauthForm.removeChild(oauthFormInput);
    }

    async handleOAuthLogin(event) {
        event.preventDefault();

        //submit endpoint depends on which button is clicked
        event.target.action = event.nativeEvent.submitter.formAction;

        /**
        add redirect to form body
         * const hiddenField = document.createElement('input');
         * hiddenField.type = 'hidden';
         * hiddenField.name = 'redirect';
         * hiddenField.value = encodeURIComponent(document.URL);
    
         * event.target.appendChild(hiddenField);
        */

        await event.target.submit();
    }

    render() {
        return (
            <form
                id='oauth'
                method='GET'
                className={style.wrapper}
                onSubmit={this.handleOAuthLogin}
            >
                {options.map((option, index) => (
                    <button key={index} type='submit' formAction={option.link}>
                        <div
                            className={style.icon}
                            style={{
                                backgroundSize: option.bgSize,
                                backgroundPosition: option.bgPosition,
                            }}
                        ></div>

                        <span>{option.name}</span>
                    </button>
                ))}
            </form>
        );
    }
}

const options = [
    {
        name: 'Facebook',
        link: `#`,
        bgSize: '325% 287.5%',
        bgPosition: '5.55556% 62.666667%',
    },
    {
        name: 'Google',
        link: `${keys.backendURL}/api/auth/google`,
        bgSize: '722.22222% 638.88889%',
        bgPosition: '83.92857% 5.15464%',
    },
];

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherLoginOptions);
