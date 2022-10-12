import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import style from './UserManage.module.scss';

import userService from '../../services/userService';
class UserDeleted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
            errMessage: {},
            idDeleteModal: 0,
        };
    }

    async componentDidMount() {
        try {
            const allDeletedUser = await userService.handleGetDeletedUser();

            if (allDeletedUser && !allDeletedUser.errType) {
                this.setState({
                    userArray: allDeletedUser.userInfo.rows,
                });
            }
        } catch (err) {
            console.log(err);
        }

        const recommendItems = document.querySelectorAll(
            `.${style.wrapper} .${style.item_wrapper}`
        );

        recommendItems.forEach((item) => {
            item.onmouseover = () => {
                item.querySelector(`.${style.item_more}`).style.opacity = 1;
            };

            item.onmouseout = () => {
                item.querySelector(`.${style.item_more}`).style.opacity = 0;
            };
        });
    }

    async handleRestoreItem(id) {
        try {
            const data = await userService.handleRestoreItem(id);

            if (data && data.errType) {
                this.setState({
                    errMessage: { [data.errType]: data.message },
                });
                console.log(data);
            } else {
                this.setState({
                    userArray: this.state.userArray.filter(
                        (element) => element.user_id !== id
                    ),
                });
            }
        } catch (err) {
            console.log('>>>something error: ', err);
        }
    }

    async handleDeletePermanentlyItem(id) {
        try {
            const data = await userService.handleDeletePermanentlyUser(id);

            if (data && data.errType) {
                this.setState({
                    errMessage: { [data.errType]: data.message },
                });
            } else {
                this.setState({
                    userArray: this.state.userArray.filter(
                        (element) => element.user_id !== id
                    ),
                });
            }
        } catch (err) {
            console.log('>>>something error: ', err);
        }
    }

    renderModal() {
        return (
            <div
                className={style.modal}
                onClick={() => this.setState({ idDeleteModal: 0 })}
            >
                <div
                    className={style.modal_content}
                    onClick={(event) => {
                        event.stopPropagation();
                    }}
                >
                    <div className={style.modal_header}>
                        <h4>Confirm delete</h4>
                        <button
                            className='btn-close'
                            onClick={() => this.setState({ idDeleteModal: 0 })}
                        ></button>
                    </div>

                    <div className={style.modal_body}>
                        Do you want to delete this user permanently?
                    </div>

                    <div className={style.modal_footer}>
                        <button
                            className='btn btn-danger'
                            onClick={async () => {
                                await this.handleDeletePermanentlyItem(
                                    this.state.idDeleteModal
                                );
                                this.setState({ idDeleteModal: 0 });
                            }}
                        >
                            Delete
                        </button>
                        <button
                            className='btn btn-secondary'
                            onClick={() => this.setState({ idDeleteModal: 0 })}
                        >
                            Cancle
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    /** Life cycle
     *  Run component:
     * 1. Constructor -> init state
     * 2. Did mount (set state) -> call API -> get data -> set state
     * 3. Render
     *
     */
    render() {
        return (
            <div className={`${style.grid} ${style.wrapper}`}>
                <ul className='row'>
                    {this.state.userArray.map((user, index) => (
                        <li className='col-2' key={index}>
                            <div className={style.item_wrapper}>
                                <div>
                                    <div
                                        className={style.item_image}
                                        style={{
                                            backgroundImage: `url('${user.avatar}')`,
                                        }}
                                        onClick={() =>
                                            this.handleRestoreItem(user.user_id)
                                        }
                                    ></div>

                                    <div className={style.item_detail}>
                                        <div className={style.item_title}>
                                            <span>{user.email}</span>
                                            <span>{user.phone_number}</span>
                                        </div>

                                        <div className={style.item_moreDetail}>
                                            <span
                                                style={{
                                                    color:
                                                        user.role_id === 'R1'
                                                            ? 'black'
                                                            : user.role_id ===
                                                              'R2'
                                                            ? '#1ddf1d'
                                                            : 'red',
                                                }}
                                            >
                                                {user.role_id === 'R1'
                                                    ? 'User'
                                                    : user.role_id === 'R2'
                                                    ? 'Seller'
                                                    : 'Admin'}
                                            </span>
                                            {' - '}
                                            <span
                                                style={{
                                                    color: user.gender
                                                        ? 'violet'
                                                        : 'rgb(55, 158, 255)',
                                                }}
                                            >
                                                {user.gender
                                                    ? 'female'
                                                    : 'male'}
                                            </span>
                                        </div>

                                        <div className={style.item_info}>
                                            <div
                                                className={style.item_prominent}
                                            >
                                                {user.first_name}{' '}
                                                {user.last_name}
                                            </div>

                                            <div className={style.item_subInfo}>
                                                {user.address}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className={style.item_more}
                                    type='button'
                                    onClick={() =>
                                        this.setState({
                                            idDeleteModal: user.user_id,
                                        })
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {(this.state.idDeleteModal || false) && this.renderModal()}

                <div className={`row ${style.items_seemore}`}>
                    <button type='button' onClick={this.props.history.goBack}>
                        Back
                    </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDeleted);
