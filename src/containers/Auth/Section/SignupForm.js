import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';

import { GENDERS, LANGUAGES, ROLES } from 'utils';
import * as actions from 'store/actions';
import style from './SignupForm.module.scss';
import { userService } from 'services';
import keys from 'config/keys.config';

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            submitData: {
                email: '',
                password: '',
                phoneNumber: '',
                gender: GENDERS.MALE,
                firstName: '',
                lastName: '',
                roleId: ROLES.BUYER,
                address: '',
                avatar: '',
            },
            genders: this.props.genders,
            roleIds: this.props.roleIds,
            isHiddenPassword: true,
            errMessage: {},
        };
    }

    async componentDidMount() {
        if (this.props.defaultValue && !isEmptyObj(this.props.defaultValue))
            this.setState({ submitData: { ...this.props.defaultValue } });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== prevProps.genders) {
            this.setState({ genders: this.props.genders });
        }

        if (prevProps.roleIds !== prevProps.roleIds) {
            this.setState({ roleIds: this.props.roleIds });
        }

        if (prevProps.defaultValue !== this.props.defaultValue) {
            this.setState({ submitData: { ...this.props.defaultValue } });
        }

        if (prevProps.defaultValue.uploadConfig !== this.props.defaultValue.uploadConfig) {
            this.setState({ submitData: { ...this.props.defaultValue } });

            handleDisableBtn(
                this.state.submitData,
                this.props.isDisableEmail,
                this.state.errMessage,
                this.handleSubmitForm.bind(this)
            );
        }
    }

    handleInputOnChange = async (event) => {
        await this.setState({
            submitData: {
                ...this.state.submitData,
                [event.target.name]: event.target.value,
            },
            errMessage: {},
        });

        const { email, password, phoneNumber } = this.state.submitData;

        await this.setState({
            errMessage: checkInputValue({
                email,
                password,
                phoneNumber,
            }),
        });

        handleDisableBtn(
            this.state.submitData,
            this.props.isDisableEmail,
            this.state.errMessage,
            this.handleSubmitForm.bind(this)
        );
    };

    toggleHiddenPassword = () => {
        this.setState({
            isHiddenPassword: !this.state.isHiddenPassword,
        });
    };

    handleSubmitForm = async (event) => {
        event.preventDefault();

        this.setState({
            errMessage: {},
        });

        try {
            const res = await userService[this.props.submitOptions.fetchService](
                this.state.submitData
            );

            if (res && !res.errType) {
                toast.success(this.props.submitOptions.successMessage);

                if (res.userInfo && res.userInfo.id === this.props.userInfo.id) {
                    this.props.userUpdateSuccess(res.userInfo);
                }

                setTimeout(() => {
                    this.props.submitOptions.redirectHandler &&
                        this.props.submitOptions.redirectHandler();
                }, 200);
            } else {
                await this.setState({ errMessage: { [res.errType]: res.message } });

                toast.warn(this.props.submitOptions.failMessage);
            }
        } catch (err) {
            toast.warn(this.props.submitOptions.failMessage);
            console.log(err);
        }
    };

    /**props:
     * title: string
     * defaultValue: obj
     * submitOptions: obj {
     * --fetchService: string
     * --successMessage: string
     * --failMessage: string
     * --redirectHandler: func
     * }
     * submitBtn: string
     * isDisableEmail: bool
     * isCancelBtn: bool
     * isPasswordInput || isRoleInput: bool
     */
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
        } = this.state.submitData;
        const errMessage = this.state.errMessage;
        const { title, submitBtn, isDisableEmail, isPasswordInput, isCancelBtn, isRoleInput } =
            this.props;

        return (
            <form id='create_form' onSubmit={(event) => event.preventDefault()}>
                {title && (
                    <div className={style.form_title}>
                        <FormattedMessage id={title} />
                    </div>
                )}

                <div className={`form-row ${style['form-row']}`}>
                    <KeyboardInput
                        col='7'
                        id='inputEmail'
                        translate='signup.email'
                        type='email'
                        value={email}
                        isDisable={isDisableEmail}
                        name='email'
                        isMandatory={true}
                        onChangeHandler={this.handleInputOnChange}
                        errMessage={errMessage.email}
                    />

                    {isPasswordInput && (
                        <KeyboardInput
                            col='5 position-relative'
                            id='inputPassword'
                            translate='signup.password'
                            type={this.state.isHiddenPassword ? 'password' : 'text'}
                            value={password}
                            name='password'
                            isMandatory={true}
                            onChangeHandler={this.handleInputOnChange}
                            errMessage={errMessage.password}
                        >
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
                        </KeyboardInput>
                    )}

                    {isRoleInput && (
                        <SelectInput
                            col='4'
                            id='inputRole'
                            name='roleId'
                            onChangeHandler={this.handleInputOnChange}
                            value={roleId}
                            options={this.props.roleIds}
                            language={this.props.language}
                        />
                    )}
                </div>

                <div className={`form-row ${style['form-row']}`}>
                    <KeyboardInput
                        col='5'
                        id='inputPhoneNumber'
                        translate='signup.phone-number'
                        type='text'
                        value={phoneNumber}
                        name='phoneNumber'
                        isMandatory={true}
                        onChangeHandler={this.handleInputOnChange}
                        errMessage={errMessage.phoneNumber}
                    />

                    <KeyboardInput
                        col='7'
                        id='inputCity'
                        translate='signup.address'
                        type='text'
                        value={address}
                        name='address'
                        isMandatory={true}
                        onChangeHandler={this.handleInputOnChange}
                    />
                </div>

                <div className={`form-row ${style['form-row']}`}>
                    <KeyboardInput
                        col='4'
                        id='inputFirstName'
                        translate='signup.first-name'
                        type='text'
                        value={firstName}
                        name='firstName'
                        isMandatory={true}
                        onChangeHandler={this.handleInputOnChange}
                    />

                    <KeyboardInput
                        col='5'
                        id='inputLastName'
                        translate='signup.last-name'
                        type='text'
                        value={lastName}
                        name='lastName'
                        isMandatory={true}
                        onChangeHandler={this.handleInputOnChange}
                    />

                    <SelectInput
                        col='3'
                        id='inputSex'
                        name='gender'
                        onChangeHandler={this.handleInputOnChange}
                        value={gender}
                        options={this.props.genders}
                        language={this.props.language}
                    />
                </div>

                <button className={`col-12 ${style.form_button}`} form='create_form' type='submit'>
                    <FormattedMessage id={submitBtn || title} />
                </button>

                {isCancelBtn && (
                    <button
                        className={`col-12 ${style.form_cancle_button}`}
                        type='button'
                        onClick={() => window.history.back()}
                    >
                        <FormattedMessage id='common.cancel' />
                    </button>
                )}

                <div className={style.review_img}>
                    <img src={`${keys.imageURL}/${avatar}`} alt='review' />
                </div>
            </form>
        );
    }
}

export const SelectInput = ({ col, id, name, onChangeHandler, value, options, language }) => {
    return (
        <div className={`form-group col-${col} ${style['form-group']}`}>
            <label htmlFor={id}>
                <FormattedMessage id={`signup.${name}`} />
            </label>
            <select
                id={id}
                className={`form-control ${style['form-control']}`}
                name={name}
                onChange={onChangeHandler}
                value={value || (options[0] && options[0].key)}
            >
                {options?.map((option, index) => (
                    <option key={index} value={option.key}>
                        {language === LANGUAGES.VI ? option.valueVi : option.valueEn}
                    </option>
                ))}
            </select>
        </div>
    );
};

export const KeyboardInput = ({
    col,
    id,
    translate,
    isMandatory,
    value,
    isDisable,
    name,
    type,
    placeholder,
    onChangeHandler,
    errMessage,
    children,
}) => {
    return (
        <div className={`form-group col-${col} ${style['form-group']}`}>
            <FormattedMessage id={translate}>
                {(trans) => (
                    <>
                        <label htmlFor={id}>
                            {trans}
                            {isMandatory && <span className={style['mandatory-field']}>*</span>}
                        </label>

                        <input
                            type={type}
                            className={`form-control ${style['form-control']}`}
                            id={id}
                            {...{ [isDisable ? 'defaultValue' : 'value']: value || '' }}
                            disabled={isDisable}
                            name={name}
                            placeholder={trans}
                            onChange={onChangeHandler}
                        />
                    </>
                )}
            </FormattedMessage>
            <div className={style['error_message']}>{errMessage || ''}</div>

            {children}
        </div>
    );
};

const handleDisableBtn = (data, isDisableEmail, err, submitHandler) => {
    const isCheckPassword = isDisableEmail || data.password;

    if (
        data.email &&
        isCheckPassword &&
        data.phoneNumber &&
        data.firstName &&
        data.lastName &&
        data.address &&
        isEmptyObj(err)
    ) {
        document.querySelector(`#create_form .${style.form_button}`).style =
            'pointer-events: all; opacity: 1;';

        document.getElementById('create_form').onsubmit = submitHandler;
    }

    if (
        !data.email ||
        !isCheckPassword ||
        !data.phoneNumber ||
        !data.firstName ||
        !data.lastName ||
        !data.address ||
        !isEmptyObj(err)
    ) {
        document.querySelector(`#create_form .${style.form_button}`).style = '';

        document.getElementById('create_form').removeEventListener('submit', submitHandler);
    }
};

const regexCheckPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const regexCheckEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
const regexCheckPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const checkInputValue = ({ email, password, phoneNumber }) => {
    const checkingInput = {};

    if (email && !email.match(regexCheckEmail)) {
        checkingInput.email = <FormattedMessage id='signup.useremail-wrong' />;
    }

    if (password && !password.match(regexCheckPassword)) {
        checkingInput.password = <FormattedMessage id='signup.userpass-wrong' />;
    }

    if (phoneNumber && !phoneNumber.match(regexCheckPhoneNumber)) {
        checkingInput.phoneNumber = <FormattedMessage id='signup.usermobile-wrong' />;
    }

    return checkingInput;
};

export const isEmptyObj = (obj) => {
    return !!obj && Object.keys(obj).length ? false : true;
};

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.app.genders,
        roleIds: state.app.roleIds,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        userUpdateSuccess: (userInfo) => dispatch(actions.userUpdateSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
