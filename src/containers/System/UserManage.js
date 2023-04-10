import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import style from './UserManage.module.scss';
import userService from 'services/userService';
import UserList from './Section/UserList';
import GoToTopBtn from './Section/GoToTopBtn';
import Filter from './Section/Filter';

class UserManage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {},
            userArray: [],
            errMessage: {},
            idDeleteModal: 0,
            countDeletedUser: 0,
        };
    }

    async componentDidMount() {
        try {
            const allUser = await userService.getAllUser();
            const allDeletedUser = await userService.getDeletedUser();

            if (allUser && !allUser.errType) {
                await this.setState({
                    userArray: allUser.userInfo,
                    countDeletedUser: allDeletedUser.userInfo.length,
                });
            }
        } catch (err) {
            console.log(err);
        }
    }

    async deleteUser(id) {
        try {
            const data = await userService.deleteUser(id);

            if (data && !data.errType) {
                const allDeletedUser = await userService.getDeletedUser();
                const allUser = await userService.getAllUser();

                if (allUser && allDeletedUser && !allUser.errType && !allDeletedUser.errType) {
                    await this.setState({
                        userArray: allUser.userInfo,
                        countDeletedUser: allDeletedUser.userInfo.length,
                    });
                } else toast.error(`ERROR: ${data.errType}: ${data.message}`);
            } else {
                toast.error(`ERROR: ${data.errType}: ${data.message}`);
            }
        } catch (err) {
            console.log('>>>something error: ', err);
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

    redirectToCreateUserPage = () => {
        const { navigate } = this.props;
        const redirectPath = `/system/manage-user/create`;
        navigate(`${redirectPath}`);
    };

    /** Life cycle
     *  Run component:
     * 1. Constructor -> init state
     * 2. Did mount (set state) -> call API -> get data -> set state
     * 3. Render
     *
     */
    render() {
        return (
            <div className={`grid ${style.wrapper}`}>
                <Filter userArray={this.state.userArray}>
                    <UserList
                        tagonClick={this.redirectToEditPage.bind(this)}
                        deleteHandler={this.deleteUser.bind(this)}
                    />
                </Filter>

                <div
                    className={`row ${style.user_deleted}`}
                    onClick={this.redirectToUserDeletedPage}
                >
                    <i className='fa-solid fa-trash-can'></i>
                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning'>
                        {this.state.countDeletedUser || '0'}
                    </span>
                </div>

                <div className={style.add_btn} onClick={this.redirectToCreateUserPage}>
                    <i className='fa-solid fa-plus'></i>
                </div>

                <GoToTopBtn />
            </div>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
