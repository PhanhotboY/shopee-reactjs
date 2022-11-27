import { connect } from 'react-redux';
import { Component } from 'react';

import style from './ShopAvatar.module.scss';
import { FormattedMessage } from 'react-intl';

class ShopAvatar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: this.props.userInfo,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.userInfo !== prevProps.userInfo) {
            this.setState({ userInfo: this.props.userInfo });
        }
    }

    render() {
        const userInfo = this.state.userInfo;

        return (
            <div
                className={`${style.avatar} col-4`}
                style={{
                    background: `url('${userInfo.avatar}') center top /cover no-repeat`,
                }}
            >
                <div className={style.background_layer}>
                    <div>
                        <img src={userInfo.avatar} />
                        <div className={style.shop_name}>
                            <h1>{userInfo.firstName + ' ' + userInfo.lastName}</h1>
                            <span>
                                <FormattedMessage id='shop.last-active' values={{ time: 40 }} />
                            </span>
                        </div>
                    </div>

                    <div className={style.header_btns}>
                        <button type='button'>
                            <i className='fa-solid fa-plus'></i>
                            <FormattedMessage id='shop.follow' />
                        </button>
                        <button type='button'>
                            <i className='fa-regular fa-message'></i>
                            <FormattedMessage id='shop.chat' />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopAvatar);
