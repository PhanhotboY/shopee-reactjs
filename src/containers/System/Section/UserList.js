import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { LANGUAGES, GENDERS, ROLES } from 'utils';
import style from './UserList.module.scss';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userArray: [],
            idDeleteModal: 0,
        };
    }

    async componentDidMount() {
        await this.setState({
            userArray: this.props.userArray || [],
        });

        handleToggleDeleteBtn();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.userArray !== prevProps.userArray) {
            await this.setState({ userArray: this.props.userArray || [] });
            handleToggleDeleteBtn();
        }
    }

    render() {
        return (
            <ul className={`row`}>
                {this.state.userArray.map((user, index) => (
                    <li className='col-2 mt-2' key={index}>
                        <div className={style.item_wrapper}>
                            <div>
                                <div
                                    className={style.item_image}
                                    style={{
                                        backgroundImage: `url('${user.avatar}')`,
                                    }}
                                    onClick={() => this.props.tagOnClickHandler(user.id)}
                                ></div>

                                <div className={style.item_detail}>
                                    <div className={style.item_title}>
                                        <span>{user.email}</span>
                                        <span>{user.phoneNumber}</span>
                                    </div>

                                    <div className={style.item_moreDetail}>
                                        <span
                                            style={{
                                                color:
                                                    user.roleId === ROLES.ADMIN
                                                        ? 'red'
                                                        : user.roleId === ROLES.SELLER
                                                        ? '#1ddf1d'
                                                        : user.roleId === ROLES.BUYER
                                                        ? 'black'
                                                        : 'blueviolet',
                                            }}
                                        >
                                            {getValue(
                                                user.roleId || '',
                                                this.props.language,
                                                this.props.roleIds
                                            )}
                                        </span>
                                        {' - '}
                                        <span
                                            style={{
                                                color:
                                                    user.gender === GENDERS.FEMALE
                                                        ? '#fab'
                                                        : user.gender === GENDERS.MALE
                                                        ? '#0475e0'
                                                        : '#f600f6',
                                            }}
                                        >
                                            {getValue(
                                                user.gender || '',
                                                this.props.language,
                                                this.props.genders
                                            )}
                                        </span>
                                    </div>

                                    <div className={style.item_info}>
                                        <div className={style.item_prominent}>
                                            {user.firstName} {user.lastName}
                                        </div>

                                        <div className={style.item_subInfo}>{user.address}</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                className={style.item_more}
                                type='button'
                                onClick={() => this.props.deleteHandler(user.id)}
                            >
                                <FormattedMessage id='common.delete' />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
}

const handleToggleDeleteBtn = () => {
    const userTags = document.querySelectorAll(`.${style.wrapper} .${style.item_wrapper}`);

    userTags.forEach((userTag) => {
        userTag.onmouseover = () => {
            userTag.querySelector(`.${style.item_more}`).style.opacity = 1;
        };

        userTag.onmouseout = () => {
            userTag.querySelector(`.${style.item_more}`).style.opacity = 0;
        };
    });
};

const getValue = (valueIn, language, values) => {
    const value = values.filter((value) => value.key === valueIn);

    if (value.length) return language === LANGUAGES.VI ? value[0].valueVi : value[0].valueEn;

    return '';
};

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.app.genders,
        roleIds: state.app.roleIds,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
