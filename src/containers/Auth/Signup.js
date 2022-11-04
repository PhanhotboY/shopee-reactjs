import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import style from './Signup.module.scss';
import { userService } from '../../services';
import Header from 'containers/Header/Header';

const regexCheckPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const regexCheckEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
const regexCheckURL =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
const regexCheckPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signupData: {
                email: '',
                password: '',
                phoneNumber: '',
                gender: '0',
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

    checkInputValue = ({ email, password, phoneNumber, avatarURL }) => {
        const checkingInput = {};

        if (email && !email.match(regexCheckEmail)) {
            checkingInput.email = `Invalid email. Try again!`;
        }

        if (password && !password.match(regexCheckPassword)) {
            checkingInput.password = `Use 8 or more characters with a mix of letters & numbers`;
        }

        if (phoneNumber && !phoneNumber.match(regexCheckPhoneNumber)) {
            checkingInput.phoneNumber = `Invalid phone number. Try again!`;
        }

        if (avatarURL && !avatarURL.match(regexCheckURL)) {
            checkingInput.avatarURL = `Invalid URL. Try again!`;
        }

        return checkingInput;
    };

    isEmptyObj = (obj) => {
        return Object.keys(obj).length ? false : true;
    };

    handleInputOnChange = async (event) => {
        await this.setState({
            signupData: {
                ...this.state.signupData,
                [event.target.name]: event.target.value,
            },
            errMessage: {},
        });

        const { email, password, phoneNumber, firstName, lastName, address, avatarURL } =
            this.state.signupData;

        await this.setState({
            errMessage: this.checkInputValue({
                email,
                password,
                phoneNumber,
                avatarURL,
            }),
        });

        if (
            email &&
            password &&
            phoneNumber &&
            firstName &&
            lastName &&
            address &&
            this.isEmptyObj(this.state.errMessage)
        ) {
            document.querySelector(`.${style.body_form} .${style.form_button}`).style =
                'pointer-events: all; opacity: 1;';
        }

        if (
            !email ||
            !password ||
            !phoneNumber ||
            !firstName ||
            !lastName ||
            !address ||
            !this.isEmptyObj(this.state.errMessage)
        ) {
            document.querySelector(`.${style.body_form} .${style.form_button}`).style = '';
        }
    };

    toggleHiddenPassword = () => {
        this.setState({
            isHiddenPassword: !this.state.isHiddenPassword,
        });
    };

    redirectToLoginPage = () => {
        const { navigate } = this.props;
        const redirectPath = '/login';
        navigate(`${redirectPath}`);
    };

    handleSubmitForm = async (event) => {
        event.preventDefault();
        this.setState({
            errMessage: {},
        });

        try {
            const data = await userService.handleSignup(this.state.signupData);

            if (data && data.errType) {
                this.setState({
                    errMessage: { [data.errType]: data.message },
                });
            } else {
                const signupSuccessAlert = document.querySelector(
                    `.${style.wrapper} .${style.success_alert}`
                );

                signupSuccessAlert.style.display = 'flex';

                setTimeout(() => {
                    this.redirectToLoginPage();
                }, 1000);
            }
        } catch (err) {
            console.log('>>>>something error: ', err);
        }
    };

    render() {
        const {
            email,
            password,
            phoneNumber,
            gender,
            firstName,
            lastName,
            role,
            address,
            avatarURL,
        } = this.state.signupData;

        const errMessage = this.state.errMessage;

        return (
            <div className={style.wrapper}>
                <Header />

                <div className={style.body}>
                    <div
                        className={style.body_wrapper}
                        style={{
                            background: `url('https://cf.shopee.vn/file/000d7f7e293e29de23ddefbaa0e80436') center/ cover no-repeat`,
                        }}
                    >
                        <div className={style.body_form}>
                            <div className={style.form_title}>Đăng ký</div>
                            <form id='signup_form' onSubmit={this.handleSubmitForm}>
                                <div className={`form-row ${style['form-row']}`}>
                                    <div className={`form-group col-7 ${style['form-group']}`}>
                                        <label htmlFor='inputEmail'>
                                            Email
                                            <span className={style['mandatory-field']}>*</span>
                                        </label>
                                        <input
                                            type='email'
                                            className={`form-control ${style['form-control']}`}
                                            id='inputEmail'
                                            value={email}
                                            name='email'
                                            placeholder='Email'
                                            onChange={this.handleInputOnChange}
                                        />

                                        <div className={style['error_message']}>
                                            {errMessage.email || ''}
                                        </div>
                                    </div>
                                    <div className={`form-group col-5 ${style['form-group']}`}>
                                        <label htmlFor='inputPhoneNumber'>
                                            Phone Number
                                            <span className={style['mandatory-field']}>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${style['form-control']}`}
                                            id='inputPhoneNumber'
                                            value={phoneNumber}
                                            name='phoneNumber'
                                            placeholder='Phone Number'
                                            onChange={this.handleInputOnChange}
                                        />

                                        <div className={style['error_message']}>
                                            {errMessage.phoneNumber || ''}
                                        </div>
                                    </div>
                                </div>

                                <div className={`form-row ${style['form-row']}`}>
                                    <div
                                        className={`form-group col-8 position-relative ${style['form-group']}`}
                                    >
                                        <label htmlFor='inputPassword'>
                                            Password
                                            <span className={style['mandatory-field']}>*</span>
                                        </label>
                                        <input
                                            className={`form-control ${style['form-control']}`}
                                            type={this.state.isHiddenPassword ? 'password' : 'text'}
                                            id='inputPassword'
                                            value={password}
                                            name='password'
                                            placeholder='Password'
                                            onChange={this.handleInputOnChange}
                                        />

                                        <div className={style['error_message']}>
                                            {errMessage.password || ''}
                                        </div>

                                        <svg
                                            className={style['hideShowIcon']}
                                            fill='none'
                                            viewBox='0 0 20 10'
                                            onClick={this.toggleHiddenPassword}
                                        >
                                            <path
                                                stroke='none'
                                                fill='#000'
                                                fillOpacity='.54'
                                                d={
                                                    this.state.isHiddenPassword
                                                        ? `M19.834 1.15a.768.768 0 00-.142-1c-.322-.25-.75-.178-1 .143-.035.036-3.997 4.712-8.709 4.712-4.569 0-8.71-4.712-8.745-4.748a.724.724 0 00-1-.071.724.724 0 00-.07 1c.07.106.927 1.07 2.283 2.141L.631 5.219a.69.69 0 00.036 1c.071.142.25.213.428.213a.705.705 0 00.5-.214l1.963-2.034A13.91 13.91 0 006.806 5.86l-.75 2.535a.714.714 0 00.5.892h.214a.688.688 0 00.679-.535l.75-2.535a9.758 9.758 0 001.784.179c.607 0 1.213-.072 1.785-.179l.75 2.499c.07.321.392.535.677.535.072 0 .143 0 .179-.035a.714.714 0 00.5-.893l-.75-2.498a13.914 13.914 0 003.248-1.678L18.3 6.147a.705.705 0 00.5.214.705.705 0 00.499-.214.723.723 0 00.036-1l-1.82-1.891c1.463-1.071 2.32-2.106 2.32-2.106z`
                                                        : `M19.975 5.823V5.81 5.8l-.002-.008v-.011a.078.078 0 01-.002-.011v-.002a.791.791 0 00-.208-.43 13.829 13.829 0 00-1.595-1.64c-1.013-.918-2.123-1.736-3.312-2.368-.89-.474-1.832-.867-2.811-1.093l-.057-.014a2.405 2.405 0 01-.086-.02L11.884.2l-.018-.003A9.049 9.049 0 0010.089 0H9.89a9.094 9.094 0 00-1.78.197L8.094.2l-.016.003-.021.005a1.844 1.844 0 01-.075.017l-.054.012c-.976.226-1.92.619-2.806 1.09-1.189.635-2.3 1.45-3.31 2.371a13.828 13.828 0 00-1.595 1.64.792.792 0 00-.208.43v.002c-.002.007-.002.015-.002.022l-.002.01V5.824l-.002.014a.109.109 0 000 .013L0 5.871a.206.206 0 00.001.055c0 .01 0 .018.002.027 0 .005 0 .009.003.013l.001.011v.007l.002.01.001.013v.002a.8.8 0 00.208.429c.054.067.11.132.165.197a13.9 13.9 0 001.31 1.331c1.043.966 2.194 1.822 3.428 2.48.974.52 2.013.942 3.09 1.154a.947.947 0 01.08.016h.003a8.864 8.864 0 001.596.16h.2a8.836 8.836 0 001.585-.158l.006-.001a.015.015 0 01.005-.001h.005l.076-.016c1.079-.212 2.118-.632 3.095-1.153 1.235-.66 2.386-1.515 3.43-2.48a14.133 14.133 0 001.474-1.531.792.792 0 00.208-.43v-.002c.003-.006.003-.015.003-.022v-.01l.002-.008c0-.004 0-.009.002-.013l.001-.012.001-.015.001-.019.002-.019a.07.07 0 01-.01-.036c0-.009 0-.018-.002-.027zm-6.362.888a3.823 3.823 0 01-1.436 2.12l-.01-.006a3.683 3.683 0 01-2.178.721 3.67 3.67 0 01-2.177-.721l-.009.006a3.823 3.823 0 01-1.437-2.12l.014-.01a3.881 3.881 0 01-.127-.974c0-2.105 1.673-3.814 3.738-3.816 2.065.002 3.739 1.711 3.739 3.816 0 .338-.047.662-.128.975l.011.009zM8.145 5.678a1.84 1.84 0 113.679 0 1.84 1.84 0 01-3.679 0z`
                                                }
                                                fillRule='evenodd'
                                                clipRule='evenodd'
                                            ></path>
                                        </svg>
                                    </div>

                                    <div className={`form-group col-4 ${style['form-group']}`}>
                                        <label htmlFor='inputSex'>Sex</label>
                                        <select
                                            id='inputSex'
                                            className={`form-control ${style['form-control']}`}
                                            name='gender'
                                            onChange={this.handleInputOnChange}
                                            defaultValue={gender}
                                        >
                                            <option value='0'>Male</option>
                                            <option value='1'>Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={`form-row ${style['form-row']}`}>
                                    <div className={`form-group col-5 ${style['form-group']}`}>
                                        <label htmlFor='inputFirstName'>
                                            First Name
                                            <span className={style['mandatory-field']}>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${style['form-control']}`}
                                            id='inputFirstName'
                                            value={firstName}
                                            name='firstName'
                                            onChange={this.handleInputOnChange}
                                        />
                                    </div>

                                    <div className={`form-group col-5 ${style['form-group']}`}>
                                        <label htmlFor='inputLastName'>
                                            Last Name
                                            <span className={style['mandatory-field']}>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${style['form-control']}`}
                                            id='inputLastName'
                                            value={lastName}
                                            name='lastName'
                                            onChange={this.handleInputOnChange}
                                        />
                                    </div>

                                    <div className={`form-group col-2 ${style['form-group']}`}>
                                        <label htmlFor='inputRole'>Role</label>
                                        <select
                                            id='inputRole'
                                            className={`form-control ${style['form-control']}`}
                                            name='role'
                                            onChange={this.handleInputOnChange}
                                            defaultValue={role}
                                        >
                                            <option value='R1'>User</option>
                                            <option value='R2'>Seller</option>
                                            <option value='R3'>Admin</option>
                                            <option value='R4'>Shipper</option>
                                        </select>
                                    </div>
                                </div>

                                <div className={`form-row ${style['form-row']}`}>
                                    <div className={`form-group col-9 ${style['form-group']}`}>
                                        <label htmlFor='inputAvatar'>Avatar URL</label>
                                        <input
                                            type='text'
                                            className={`form-control ${style['form-control']}`}
                                            id='inputAvatar'
                                            value={avatarURL}
                                            name='avatarURL'
                                            onChange={this.handleInputOnChange}
                                        />

                                        <div className={style['error_message']}>
                                            {errMessage.avatarURL || ''}
                                        </div>
                                    </div>

                                    <div className={`form-group col-3 ${style['form-group']}`}>
                                        <label htmlFor='inputCity'>
                                            City
                                            <span className={style['mandatory-field']}>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${style['form-control']}`}
                                            id='inputCity'
                                            value={address}
                                            name='address'
                                            onChange={this.handleInputOnChange}
                                        />
                                    </div>
                                </div>
                            </form>
                            <button
                                className={style['form_button']}
                                form='signup_form'
                                type='submit'
                            >
                                Đăng ký
                            </button>

                            <div className={style['split']}>
                                <span>Hoặc</span>
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
                                Bằng việc đăng kí, bạn đã đồng ý với Shopee về
                                <br />
                                <a href='#'>
                                    <span>Điều khoản dịch vụ </span>
                                </a>{' '}
                                &
                                <a href='#'>
                                    <span> Chính sách bảo mật</span>
                                </a>
                            </div>

                            <div className={style['redirect_login']}>
                                <span>Đã có tài khoản? </span>
                                <span onClick={this.redirectToLoginPage}>Đăng nhập</span>
                            </div>
                        </div>

                        <div className={style['success_alert']}>
                            <img
                                src='https://media1.giphy.com/media/CaS9NNso512WJ4po0t/200w.webp?cid=ecf05e47khma6kwafjoy8ao43ww694vr0ssl8p9ioa1gvn30&rid=200w.webp&ct=s'
                                alt='success mark gif'
                            />
                            <div>Sign up successfully!</div>
                        </div>
                    </div>
                </div>

                <div className={style['footer']}>footer</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
