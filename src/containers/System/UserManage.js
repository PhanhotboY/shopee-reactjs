import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import style from './UserManage.module.scss';
import userService from '../../services/userService';
class UserManage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userArray: [],
            errMessage: {},
            idDeleteModal: 0,
            countDeletedUser: 0,
        };
    }

    async componentDidMount() {
        try {
            const allUser = await userService.handleGetAllUser();
            const allDeletedUser = await this.getDeletedUser();

            if (allUser && !allUser.errType) {
                this.setState({
                    userArray: allUser.userInfo,
                    countDeletedUser: allDeletedUser.length,
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

    async handleDeleteItem(id) {
        try {
            const data = await userService.handleDeleteUser(id);

            if (data && data.errType) {
                this.setState({
                    errMessage: { [data.errType]: data.message },
                });
            } else {
                const allDeletedUser = await this.getDeletedUser();

                await this.setState({
                    userArray: this.state.userArray.filter((element) => element.id !== id),
                    countDeletedUser: allDeletedUser.count + 1,
                });
            }
        } catch (err) {
            console.log('>>>something error: ', err);
        }
    }

    async getDeletedUser() {
        try {
            const allDeletedUser = await userService.handleGetDeletedUser();

            if (allDeletedUser && !allDeletedUser.errType) {
                return allDeletedUser.userInfo;
            }
        } catch (err) {
            console.log(err);
            return 0;
        }
    }

    redirectToEditPage = (id) => {
        const { navigate } = this.props;
        const redirectPath = `/system/manage-user/update?id=${id}`;
        navigate(`${redirectPath}`);
    };

    redirectToUserDeletedPage = () => {
        const { navigate } = this.props;
        const redirectPath = `/system/manage-user/deleted-user`;
        navigate(`${redirectPath}`);
    };

    renderModal() {
        return (
            <div className={style.modal} onClick={() => this.setState({ idDeleteModal: 0 })}>
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

                    <div className={style.modal_body}>Do you want to delete this user?</div>

                    <div className={style.modal_footer}>
                        <button
                            className='btn btn-danger'
                            onClick={() => {
                                this.handleDeleteItem(this.state.idDeleteModal);
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
                                        onClick={() => this.redirectToEditPage(user.id)}
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
                                                        user.roleId === 'R1'
                                                            ? 'black'
                                                            : user.roleId === 'R2'
                                                            ? '#1ddf1d'
                                                            : user.roleId === 'R3'
                                                            ? 'red'
                                                            : 'blueviolet',
                                                }}
                                            >
                                                {user.roleId === 'R1'
                                                    ? 'User'
                                                    : user.roleId === 'R2'
                                                    ? 'Seller'
                                                    : user.roleId === 'R3'
                                                    ? 'Admin'
                                                    : 'Shipper'}
                                            </span>
                                            {' - '}
                                            <span
                                                style={{
                                                    color: user.gender
                                                        ? 'violet'
                                                        : 'rgb(55, 158, 255)',
                                                }}
                                            >
                                                {user.gender ? 'female' : 'male'}
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
                                    onClick={() =>
                                        this.setState({
                                            idDeleteModal: user.id,
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
                    <button type='button' onClick={this.redirectToUserDeletedPage}>
                        Deleted user{'  '}
                        <span className='badge bg-danger'>
                            {this.state.countDeletedUser || '0'}
                        </span>
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAdmin: state.user.isAdmin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
