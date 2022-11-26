import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import style from './Notifications.module.scss';

class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notificationArr: [],
        };
    }

    async componentDidMount() {
        this.setState({ notificationArr: this.props.notificationArr });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.notificationArr !== prevProps.notificationArr) {
            this.setState({ notificationArr: this.props.notificationArr });
        }
    }

    render() {
        const { isViewDetail, page } = this.props;
        const { notificationArr } = this.state;

        return (
            <div className={style.wrapper}>
                {notificationArr.length !== 0 ? (
                    <div>
                        <Header />

                        <NotificationContainer
                            notificationArr={notificationArr}
                            isViewDetail={isViewDetail}
                        />
                    </div>
                ) : (
                    <NotificationEmpty page={page} />
                )}
            </div>
        );
    }
}

const NotificationContainer = ({ notificationArr, isViewDetail }) => {
    return (
        <ul>
            {notificationArr.map((notification, index) => (
                <NotificationTag
                    key={index}
                    notification={notification}
                    isViewDetail={isViewDetail}
                />
            ))}
        </ul>
    );
};

const NotificationTag = ({ notification, isViewDetail }) => {
    return (
        <li>
            <img
                className={style.notification_img}
                src={`https://cf.shopee.vn/file/${notification.thumbnail}`}
            ></img>

            <div className={style.notification_body}>
                <h5>{notification.title}</h5>
                <p>{notification.content}</p>
            </div>

            {isViewDetail && (
                <button>
                    <FormattedMessage id='user.notification.view-details' />
                </button>
            )}
        </li>
    );
};

const Header = () => {
    return (
        <div className={style.header}>
            <span>
                <FormattedMessage id='user.notification.mark-all-as-read' />
            </span>
        </div>
    );
};

const NotificationEmpty = ({ page }) => {
    return (
        <div className={style.notification_empty}>
            <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/fa4e2b534c2928596a6deded9c730a21.png'></img>

            <span>
                <FormattedMessage id={`user.notification.${page}`}>
                    {(trans) => (
                        <FormattedMessage
                            id={`user.notification.not-update`}
                            values={{ page: trans }}
                        />
                    )}
                </FormattedMessage>
            </span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
