import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import formStyle from '../Auth/Signup.module.scss';
import style from './UserUpdate.module.scss';
import { userService } from '../../services';
import * as actions from '../../store/actions';
import SignupForm, { isEmptyObj, checkInputValue } from 'containers/Auth/Section/SignupForm';

class UserUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updateData: {
                email: '',
                password: '',
                phoneNumber: '',
                gender: '0',
                firstName: '',
                lastName: '',
                roleId: 'R1',
                address: '',
                avatar: '',
            },
            isHiddenPassword: true,
            errMessage: {},
        };
    }

    async componentDidMount() {
        const userId = new URLSearchParams(this.props.location.search).get('id');
        try {
            const userData = await userService.handleGetUser(userId);

            if (userData && !userData.errType) {
                this.setState({
                    updateData: {
                        ...userData.userInfo,
                        password: userData.userInfo.password || '',
                    },
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    handleInputOnChange = async (event) => {
        await this.setState({
            updateData: {
                ...this.state.updateData,
                [event.target.name]: event.target.value,
            },
            errMessage: {},
        });

        const { password, phoneNumber, firstName, lastName, address, avatar } =
            this.state.updateData;

        await this.setState({
            errMessage: checkInputValue({
                password,
                phoneNumber,
                avatar,
            }),
        });

        if (phoneNumber && firstName && lastName && address && isEmptyObj(this.state.errMessage)) {
            document.querySelector(`.${formStyle.body_form} .${formStyle.form_button}`).style =
                'pointer-events: all; opacity: 1;';
        }

        if (
            !phoneNumber ||
            !firstName ||
            !lastName ||
            !address ||
            !isEmptyObj(this.state.errMessage)
        ) {
            document.querySelector(`.${formStyle.body_form} .${formStyle.form_button}`).style = '';
        }
    };

    toggleHiddenPassword = () => {
        this.setState({
            isHiddenPassword: !this.state.isHiddenPassword,
        });
    };

    handleSubmitForm = async (event) => {
        this.setState({
            errMessage: {},
        });

        event.preventDefault();

        try {
            const data = await userService.handleUpdateUser(this.state.updateData);

            if (data && data.errType) {
                this.setState({
                    errMessage: { [data.errType]: data.message },
                });
            } else {
                console.log(this.props.userInfo);
                if (this.props.userInfo.email === data.userInfo.email)
                    this.props.userUpdateSuccess(data.userInfo);

                const updateSuccessAlert = document.querySelector(
                    `.${formStyle.wrapper} .${style.banner}:last-child`
                );

                updateSuccessAlert.style.display = 'flex';

                setTimeout(() => {
                    this.props.history.goBack();
                }, 900);
            }
        } catch (err) {
            console.log(err.response);
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
            roleId,
            address,
            avatar,
        } = this.state.updateData;

        const errMessage = this.state.errMessage;

        return (
            <div className={formStyle.wrapper}>
                <div className={formStyle.body}>
                    <div
                        className={formStyle.body_wrapper}
                        style={{
                            background: `url('https://cf.shopee.vn/file/000d7f7e293e29de23ddefbaa0e80436') center/ cover no-repeat`,
                        }}
                    >
                        {/* <form
                            id='update_user_form'
                            className={formStyle.body_form}
                            onSubmit={this.handleSubmitForm}
                        >
                            <div className={formStyle.form_title}>Thay đổi thông tin</div>

                            <div className={`form-row ${formStyle['form-row']}`}>
                                <div className={`form-group col-7 ${formStyle['form-group']}`}>
                                    <label htmlFor='inputEmail'>
                                        Email
                                        <span className={formStyle['mandatory-field']}>*</span>
                                    </label>
                                    <input
                                        type='email'
                                        className={`form-control ${formStyle['form-control']}`}
                                        id='inputEmail'
                                        defaultValue={email}
                                        name='email'
                                        placeholder='Email'
                                        disabled
                                    />

                                    <div className={formStyle['error_message']}>
                                        {errMessage.email || ''}
                                    </div>
                                </div>
                                <div className={`form-group col-5 ${formStyle['form-group']}`}>
                                    <label htmlFor='inputphoneNumber'>
                                        Phone Number
                                        <span className={formStyle['mandatory-field']}>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`form-control ${formStyle['form-control']}`}
                                        id='inputphoneNumber'
                                        value={phoneNumber}
                                        name='phoneNumber'
                                        placeholder='Phone Number'
                                        onChange={this.handleInputOnChange}
                                    />

                                    <div className={formStyle['error_message']}>
                                        {errMessage.phoneNumber || ''}
                                    </div>
                                </div>
                            </div>

                            <div className={`form-row ${formStyle['form-row']}`}>
                                <div
                                    className={`form-group col-8 position-relative ${formStyle['form-group']}`}
                                >
                                    <label htmlFor='inputPassword'>Password</label>
                                    <input
                                        className={`form-control ${formStyle['form-control']}`}
                                        type={this.state.isHiddenPassword ? 'password' : 'text'}
                                        id='inputPassword'
                                        value={password}
                                        name='password'
                                        placeholder='Password'
                                        onChange={this.handleInputOnChange}
                                    />

                                    <div className={formStyle['error_message']}>
                                        {errMessage.password || ''}
                                    </div>

                                    <svg
                                        className={formStyle['hideShowIcon']}
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

                                <div className={`form-group col-4 ${formStyle['form-group']}`}>
                                    <label htmlFor='inputSex'>Sex</label>
                                    <select
                                        id='inputSex'
                                        className={`form-control ${formStyle['form-control']}`}
                                        name='gender'
                                        onChange={this.handleInputOnChange}
                                        value={gender == true || gender == '1' ? '1' : '0'}
                                    >
                                        <option value='0'>Male</option>
                                        <option value='1'>Female</option>
                                    </select>
                                </div>
                            </div>

                            <div className={`form-row ${formStyle['form-row']}`}>
                                <div className={`form-group col-5 ${formStyle['form-group']}`}>
                                    <label htmlFor='inputFirstName'>
                                        First Name
                                        <span className={formStyle['mandatory-field']}>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`form-control ${formStyle['form-control']}`}
                                        id='inputFirstName'
                                        value={firstName}
                                        name='firstName'
                                        onChange={this.handleInputOnChange}
                                    />
                                </div>

                                <div className={`form-group col-5 ${formStyle['form-group']}`}>
                                    <label htmlFor='inputLastName'>
                                        Last Name
                                        <span className={formStyle['mandatory-field']}>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`form-control ${formStyle['form-control']}`}
                                        id='inputLastName'
                                        value={lastName}
                                        name='lastName'
                                        onChange={this.handleInputOnChange}
                                    />
                                </div>

                                <div className={`form-group col-2 ${formStyle['form-group']}`}>
                                    <label htmlFor='inputRole'>Role</label>
                                    <select
                                        id='inputRole'
                                        className={`form-control ${formStyle['form-control']}`}
                                        name='roleId'
                                        onChange={this.handleInputOnChange}
                                        value={roleId}
                                    >
                                        <option value='R1'>User</option>
                                        <option value='R2'>Seller</option>
                                        <option value='R3'>Admin</option>
                                        <option value='R4'>Shipper</option>
                                    </select>
                                </div>
                            </div>

                            <div className={`form-row ${formStyle['form-row']}`}>
                                <div className={`form-group col-9 ${formStyle['form-group']}`}>
                                    <label htmlFor='inputAvatar'>Avatar URL</label>
                                    <input
                                        type='text'
                                        className={`form-control ${formStyle['form-control']}`}
                                        id='inputAvatar'
                                        value={avatar}
                                        name='avatar'
                                        onChange={this.handleInputOnChange}
                                    />

                                    <div className={formStyle['error_message']}>
                                        {errMessage.avatar || ''}
                                    </div>
                                </div>

                                <div className={`form-group col-3 ${formStyle['form-group']}`}>
                                    <label htmlFor='inputCity'>
                                        City
                                        <span className={formStyle['mandatory-field']}>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        className={`form-control ${formStyle['form-control']}`}
                                        id='inputCity'
                                        value={address}
                                        name='address'
                                        onChange={this.handleInputOnChange}
                                    />
                                </div>
                            </div>

                            <button
                                className={formStyle['form_button']}
                                form='update_user_form'
                                type='submit'
                            >
                                Thay đổi
                            </button>

                            <div className={formStyle['split']}>
                                <span>Hoặc</span>
                            </div>

                            <button
                                className={style['form_cancle_button']}
                                type='button'
                                onClick={this.props.history.goBack}
                            >
                                Hủy
                            </button>
                        </form> */}
                        <div className={style.form_container}>
                            <SignupForm />
                        </div>

                        <div className={style['banner']} style={{ display: 'flex' }}>
                            <img src={avatar} alt='preview' />
                        </div>

                        <div className={style['banner']}>
                            <img
                                src='https://media1.giphy.com/media/CaS9NNso512WJ4po0t/200w.webp?cid=ecf05e47khma6kwafjoy8ao43ww694vr0ssl8p9ioa1gvn30&rid=200w.webp&ct=s'
                                alt='success mark gif'
                            />
                            <div>Update user data successfully!</div>
                        </div>
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
        userUpdateSuccess: (userInfo) => dispatch(actions.userUpdateSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate);
