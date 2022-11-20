import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import style from './UserManage.module.scss';
import UserList from './Section/UserList';
import userService from '../../services/userService';
import GoToTopBtn from './Section/GoToTopBtn';

class UserDeleted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userArray: [],
            isDeleteModal: 0,
        };
    }

    async componentDidMount() {
        try {
            const allDeletedUser = await userService.handleGetDeletedUser();

            if (allDeletedUser && !allDeletedUser.errType) {
                this.setState({
                    userArray: allDeletedUser.userInfo,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async handleRestoreItem(id) {
        try {
            const data = await userService.handleRestoreUser(id);

            if (data && !data.errType) {
                const allDeletedUser = await userService.handleGetDeletedUser();

                if (allDeletedUser && !allDeletedUser.errType) {
                    this.setState({
                        userArray: allDeletedUser.userInfo,
                    });
                }
            } else {
                toast.error(`EEROR: ${data.errType}: ${data.message}`);
            }
        } catch (err) {
            console.log('>>>something error: ', err);
        }
    }

    handleToggleModal(id) {
        this.setState({ isDeleteModal: id });
    }

    async handlePermanentlyDeleteUser(id) {
        try {
            const data = await userService.handlePermanentlyDeleteUser(id);

            if (data && !data.errType) {
                const allDeletedUser = await this.getDeletedUser();
                toast.success('Delete user successfully!');

                this.setState({ userArray: allDeletedUser });
            } else {
                toast.error(`ERROR: ${data.errType}: ${data.message}`);
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
        }
    }

    renderModal() {
        return (
            <div className={style.modal} onClick={() => this.setState({ isDeleteModal: 0 })}>
                <div className={style.modal_content} onClick={(event) => event.stopPropagation()}>
                    <div className={style.modal_header}>
                        <h4>Confirm delete</h4>
                        <button
                            className='btn-close'
                            onClick={() => this.setState({ isDeleteModal: 0 })}
                        ></button>
                    </div>

                    <div className={style.modal_body}>
                        Do you want to delete this user permanently?
                    </div>

                    <div className={style.modal_footer}>
                        <button
                            className='btn btn-danger'
                            onClick={async () => {
                                await this.handlePermanentlyDeleteUser(this.state.isDeleteModal);

                                this.setState({ isDeleteModal: 0 });
                            }}
                        >
                            Delete
                        </button>
                        <button
                            className='btn btn-secondary'
                            onClick={() => this.setState({ isDeleteModal: 0 })}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className={`grid ${style.wrapper}`}>
                <UserList
                    userArray={this.state.userArray}
                    tagOnClickHandler={this.handleRestoreItem.bind(this)}
                    deleteHandler={this.handleToggleModal.bind(this)}
                />

                {(this.state.isDeleteModal || false) && this.renderModal()}

                <div className={`row ${style.items_seemore}`}>
                    <button type='button' onClick={this.props.history.goBack}>
                        Back
                    </button>
                </div>

                <GoToTopBtn />
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
