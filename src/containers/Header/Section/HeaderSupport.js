import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

import * as actions from 'store/actions';
import style from './HeaderSupport.module.scss';

class HeaderSupport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isUserPopup: false,
            isLanguagePopup: false,
            isNotificationPopup: false,
        };
    }

    componentDidMount() {}

    handleHighlight() {
        const selectedLanguage =
            document.querySelector(`header .${style.navbar_language_selected} span`) || '';
        document.querySelectorAll(`header .${style.popover_language}`).forEach((element) => {
            element.style =
                element.innerText === selectedLanguage.innerText ? 'color: #fb5533' : '';
        });
    }

    handleUndoHighlight() {
        document.querySelectorAll(`header .${style.popover_language}`).forEach((element) => {
            element.style = '';
        });
    }

    redirectToSignupPage = () => {
        const { navigate } = this.props;
        const redirectPath = '/signup';
        navigate(`${redirectPath}`);
    };

    redirectToLoginPage = () => {
        const { navigate } = this.props;
        const redirectPath = '/login';
        navigate(`${redirectPath}`);
    };

    redirectToUserPage = () => {
        const { navigate } = this.props;
        const redirectPath = '/user';
        navigate(`${redirectPath}`);
    };

    redirectToPurchasePage = () => {
        const { navigate } = this.props;
        const redirectPath = '/user/purchase';
        navigate(`${redirectPath}`);
    };

    redirectToNotificationPage = () => {
        const { navigate } = this.props;
        const redirectPath = '/user/notifications/promotion';
        navigate(`${redirectPath}`);
    };

    render() {
        const { processLogout, isLoggedIn, userInfo, changeLanguage } = this.props;

        return (
            <div className={style.header_navbar_supports}>
                <ul>
                    <li
                        className={style.navbar_supports_notification}
                        onMouseOver={() => this.setState({ isNotificationPopup: true })}
                        onMouseLeave={() => this.setState({ isNotificationPopup: false })}
                    >
                        <div className='hover_eff--blur'>
                            <Link to='/user/notifications/promotion'>
                                <BellIcon />

                                <SpanTag id='header.notification' />
                            </Link>
                        </div>

                        {this.state.isNotificationPopup && (
                            <NotificationPopup
                                isLoggedIn={isLoggedIn}
                                avatar={userInfo && userInfo.avatar}
                                redirectToLoginPage={this.redirectToLoginPage}
                                redirectToSignupPage={this.redirectToSignupPage}
                            />
                        )}
                    </li>

                    <li className='hover_eff--blur d-flex'>
                        <QuestionIcon />

                        <SpanTag id='header.help' />
                    </li>

                    <li
                        className={`${style.navbar_supports_languages}`}
                        onMouseOver={() => this.setState({ isLanguagePopup: true })}
                        onMouseLeave={() => this.setState({ isLanguagePopup: false })}
                    >
                        <div
                            className={`${style.navbar_language_selected} hover_eff--blur`}
                            onMouseOver={this.handleHighlight}
                            onMouseLeave={this.handleUndoHighlight}
                        >
                            <a>
                                <GlobeIcon />

                                <SpanTag id='header.language' />

                                <ChevronDownIcon />
                            </a>
                        </div>

                        {this.state.isLanguagePopup && (
                            <LanguagePopup changeLanguage={changeLanguage} />
                        )}
                    </li>

                    <li
                        className={isLoggedIn ? style.user_options : style.login_options}
                        onMouseOver={() => this.setState({ isUserPopup: true })}
                        onMouseLeave={() => this.setState({ isUserPopup: false })}
                        onClick={isLoggedIn ? this.redirectToPurchasePage : ''}
                    >
                        {isLoggedIn ? (
                            <UserOptions
                                isUserPopup={this.state.isUserPopup}
                                firstName={userInfo.firstName}
                                lastName={userInfo.lastName}
                                avatar={userInfo.avatar}
                            >
                                <UserOptionsPopup processLogout={processLogout} />
                            </UserOptions>
                        ) : (
                            <LoginOptions
                                redirectToLoginPage={this.redirectToLoginPage}
                                redirectToSignupPage={this.redirectToSignupPage}
                            />
                        )}
                    </li>
                </ul>
            </div>
        );
    }
}

const NotificationPopup = ({ isLoggedIn, avatar, redirectToLoginPage, redirectToSignupPage }) => {
    const popOver = isLoggedIn ? (
        <div className={`${style.loggedIn_notification_popover} ${style.notification_popover}`}>
            <div className='popover_anchor'></div>

            <div className={style.notification_popover_wrapper}>
                <div className={style.notification_popover_title}>
                    <SpanTag id='header.recently-received-notifications' />
                </div>

                <div className={style.popover_content_container}>
                    <NotificationTag avatar={avatar} />
                    <NotificationTag avatar={avatar} />
                    <NotificationTag avatar={avatar} />
                    <NotificationTag avatar={avatar} />
                    <NotificationTag avatar={avatar} />
                </div>

                <Link to='/user/notifications/promotion'>
                    <button className={style.notification_popover_seemore}>
                        <FormattedMessage id='header.viewall' />
                    </button>
                </Link>
            </div>
        </div>
    ) : (
        <div className={` ${style.notification_popover}`}>
            <div className='popover_anchor'></div>

            <div className={style.notification_popover_wrapper}>
                <div className={style.popover_content_wrapper}>
                    <img
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/99e561e3944805a023e87a81d4869600.png'
                        alt='virtual avatar'
                    />
                    <SpanTag id='header.login-to-view-notifications' />
                </div>

                <div className={style.notification_popover_sign}>
                    <div onClick={redirectToSignupPage}>
                        <FormattedMessage id='header.signup' />
                    </div>
                    <div onClick={redirectToLoginPage}>
                        <FormattedMessage id='header.login' />
                    </div>
                </div>
            </div>
        </div>
    );

    return popOver;
};

const NotificationTag = ({ avatar }) => {
    return (
        <div className={style.notification_content_wrapper}>
            <div
                className={style.notification_popover_thumbnail}
                style={{ background: `url(${avatar}) center/contain no-repeat` }}
            ></div>
            <div>
                <div className={style.notification_content_title}>Đóng góp cho Shopee</div>
                <div className={style.notification_content_content}>
                    hi em anh la phan dep trai den tu binh thuan
                </div>
            </div>
        </div>
    );
};

const GlobeIcon = () => {
    return (
        <svg className={style.navbar_supports_globe} viewBox='0 0 16 16' fill='none'>
            <path
                d='M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00004C14.6673 4.31814 11.6825 1.33337 8.00065 1.33337C4.31875 1.33337 1.33398 4.31814 1.33398 8.00004C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
            ></path>
            <path
                d='M5.33464 8.00004C5.33464 11.6819 6.52854 14.6667 8.0013 14.6667C9.47406 14.6667 10.668 11.6819 10.668 8.00004C10.668 4.31814 9.47406 1.33337 8.0013 1.33337C6.52854 1.33337 5.33464 4.31814 5.33464 8.00004Z'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
            ></path>
            <path
                d='M1.33398 8H14.6673'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
            ></path>
        </svg>
    );
};

const BellIcon = () => {
    return (
        <svg viewBox='3 2.5 14 14' x='0' y='0' className={style.navbar_supports_bell}>
            <path d='m17 15.6-.6-1.2-.6-1.2v-7.3c0-.2 0-.4-.1-.6-.3-1.2-1.4-2.2-2.7-2.2h-1c-.3-.7-1.1-1.2-2.1-1.2s-1.8.5-2.1 1.3h-.8c-1.5 0-2.8 1.2-2.8 2.7v7.2l-1.2 2.5-.2.4h14.4zm-12.2-.8.1-.2.5-1v-.1-7.6c0-.8.7-1.5 1.5-1.5h6.1c.8 0 1.5.7 1.5 1.5v7.5.1l.6 1.2h-10.3z'></path>
            <path d='m10 18c1 0 1.9-.6 2.3-1.4h-4.6c.4.9 1.3 1.4 2.3 1.4z'></path>
        </svg>
    );
};

const QuestionIcon = () => {
    return (
        <svg height='16' viewBox='0 0 16 16' width='16' className={style.navbar_supports_help}>
            <g fill='none' fillRule='evenodd' transform='translate(1)'>
                <circle cx='7' cy='8' r='7' stroke='currentColor'></circle>
                <path
                    fill='currentColor'
                    d='m6.871 3.992c-.814 0-1.452.231-1.914.704-.462.462-.693 1.089-.693 1.892h1.155c0-.484.099-.858.297-1.122.22-.319.583-.473 1.078-.473.396 0 .715.11.935.33.209.22.319.517.319.902 0 .286-.11.55-.308.803l-.187.209c-.682.605-1.1 1.056-1.243 1.364-.154.286-.22.638-.22 1.045v.187h1.177v-.187c0-.264.055-.506.176-.726.099-.198.253-.396.462-.572.517-.451.825-.737.924-.858.275-.352.418-.803.418-1.342 0-.66-.22-1.188-.66-1.573-.44-.396-1.012-.583-1.716-.583zm-.198 6.435c-.22 0-.418.066-.572.22-.154.143-.231.33-.231.561 0 .22.077.407.231.561s.352.231.572.231.418-.077.572-.22c.154-.154.242-.341.242-.572s-.077-.418-.231-.561c-.154-.154-.352-.22-.583-.22z'
                ></path>
            </g>
        </svg>
    );
};

const ChevronDownIcon = () => {
    return (
        <svg className={style.navbar_supports_chevron} viewBox='0 0 12 12'>
            <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z'
                fill='currentColor'
            ></path>
        </svg>
    );
};

const UserOptionsPopup = ({ processLogout }) => {
    return (
        <div className={style.user_popover}>
            <div className='popover_anchor'></div>

            <ul>
                <li className={style['hover_eff--blur']}>
                    <Link to='/user'>
                        <FormattedMessage id='header.my-account' />
                    </Link>
                </li>
                <li className={style['hover_eff--blur']}>
                    <Link to='/user/purchase'>
                        <FormattedMessage id='header.my-purchase' />
                    </Link>
                </li>
                <li className={style['hover_eff--blur']} onClick={processLogout}>
                    <a>
                        <FormattedMessage id='header.logout' />
                    </a>
                </li>
            </ul>
        </div>
    );
};

const LanguagePopup = ({ changeLanguage }) => {
    return (
        <div className={style.supports_languages_popver}>
            <div className='popover_anchor'></div>

            <div className={style.languages_popover_wrapper}>
                <div className={style.popover_language} onClick={() => changeLanguage('vi')}>
                    Tiếng Việt
                </div>
                <div className={style.popover_language} onClick={() => changeLanguage('en')}>
                    English
                </div>
            </div>
        </div>
    );
};

const UserOptions = ({ isUserPopup, firstName, lastName, avatar, children }) => {
    return (
        <>
            <div className='hover_eff--blur'>
                <Link to='/user/account/purchase'>
                    <div
                        style={{
                            background: `url(${avatar}) center/cover no-repeat`,
                        }}
                    ></div>
                    <span>{`${firstName} ${lastName}`}</span>
                </Link>
            </div>

            {isUserPopup && children}
        </>
    );
};

const LoginOptions = ({ redirectToSignupPage, redirectToLoginPage }) => {
    return (
        <>
            <span className='hover_eff--blur' onClick={redirectToSignupPage}>
                <FormattedMessage id='header.signup' />
            </span>
            <span className='hover_eff--blur' onClick={redirectToLoginPage}>
                <FormattedMessage id='header.login' />
            </span>
        </>
    );
};

const SpanTag = ({ id }) => {
    return (
        <span>
            <FormattedMessage id={id} />
        </span>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSupport);
