import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import style from './MyAccount.module.scss';
import UserHeader from './Section/UserHeader';
import SignupForm from 'containers/Auth/Section/SignupForm';

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {
        this.submitOptions = {
            fetchService: 'handleUpdateUser',
            successMessage: 'Update user successfully!',
            failMessage: 'Updata user fail!',
        };
    }

    redirectToCreateUserPage = () => {
        const { navigate } = this.props;
        const redirectPath = `/system/manage-user/create`;
        navigate(`${redirectPath}`);
    };

    render() {
        return (
            <div className={style.wrapper}>
                <UserHeader>
                    <h5>
                        <FormattedMessage id='user.account.change-password' />
                    </h5>
                    <span>
                        <FormattedMessage id='user.account.password-header-content' />
                    </span>
                </UserHeader>

                <div className={`${style.body} row col-9`}>
                    <form className='col-9'>
                        <div className='row mb-3'>
                            <label htmlFor='inputPassword3' className='col-3 pe-0'>
                                <FormattedMessage id='user.account.curr-pass' />
                            </label>
                            <div className='col-9'>
                                <input
                                    type='password'
                                    className='form-control'
                                    id='inputPassword3'
                                />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='inputPassword3' className='col-3 pe-0'>
                                <FormattedMessage id='user.account.new-pass' />
                            </label>
                            <div className='col-9'>
                                <input
                                    type='password'
                                    className='form-control'
                                    id='inputPassword3'
                                />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <label htmlFor='inputPassword3' className='col-3 pe-0'>
                                <FormattedMessage id='user.account.confirm-pass' />
                            </label>
                            <div className='col-9'>
                                <input
                                    type='password'
                                    className='form-control'
                                    id='inputPassword3'
                                />
                            </div>
                        </div>

                        <button className={`${style.form_button}`} form='' type='submit'>
                            <FormattedMessage id='common.confirm' />
                        </button>
                    </form>

                    <div className='col-3'>
                        <a className='text-decoration-none text-reset' href='#'>
                            <FormattedMessage id='login.forgot-pass' />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
