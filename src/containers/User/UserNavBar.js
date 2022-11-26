import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';

import style from './UserNavBar.module.scss';
import UserHeader from './Section/UserHeader';

class UserNavBar extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        const { firstName, lastName } = this.props.userInfo;

        return (
            <div className={`${style.wrapper} col-2`}>
                <UserHeader>
                    <div className='d-flex'>
                        <Link to='/user/account/profile'>
                            <img className={style.user_avatar} src={this.props.userInfo.avatar} />
                        </Link>

                        <div className={style.user_name}>
                            <span>
                                <b>{firstName + ' ' + lastName}</b>
                            </span>

                            <Link to='/user/account/profile'>
                                <i className='fa-solid fa-pen'></i>
                                <FormattedMessage id='user.account.edit-profile' />
                            </Link>
                        </div>
                    </div>
                </UserHeader>

                <nav>
                    <nav className='nav nav-pills'>
                        <Link className='nav-link ps-0' to='/user/account/profile'>
                            <img
                                className={style.nav_image}
                                src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4'
                            />
                            <FormattedMessage id='user.account.my-account' />
                        </Link>

                        <nav className='nav nav-pills'>
                            <HighLightMenuLink label='account.profile' to='/user/account/profile' />

                            <HighLightMenuLink
                                label='account.change-password'
                                to='/user/account/change-password'
                            />
                        </nav>
                    </nav>

                    <HighLightMenuLink
                        label='purchase.my-purchase'
                        to='/user/purchase'
                        isNav={true}
                    >
                        <img
                            className={style.nav_image}
                            src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078'
                        />
                    </HighLightMenuLink>

                    <nav className='nav nav-pills'>
                        <Link to='/user/notifications/promotion' className='nav-link ps-0'>
                            <img
                                className={style.nav_image}
                                src='https://cf.shopee.vn/file/e10a43b53ec8605f4829da5618e0717c'
                            />
                            <FormattedMessage id='user.notification.notifications' />
                        </Link>

                        <nav className='nav nav-pills'>
                            <HighLightMenuLink
                                label='notification.promotions'
                                to='/user/notifications/promotion'
                            />

                            <HighLightMenuLink
                                label='notification.ratings'
                                to='/user/notifications/rating'
                            />
                        </nav>
                    </nav>
                </nav>
            </div>
        );
    }
}

const HighLightMenuLink = ({ label, to, isNav, children }) => {
    const isMatch = useRouteMatch({ path: to, exact: true });

    return (
        <Link
            className={`nav-link ${isNav ? 'ps-0' : 'ms-4'} ${isMatch ? style.active : ''}`}
            to={to}
        >
            {children}
            <FormattedMessage id={`user.${label}`} />
        </Link>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(UserNavBar);
