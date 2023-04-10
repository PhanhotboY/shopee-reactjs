import { connect } from 'react-redux';
import { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import style from './ShopInfo.module.scss';
import { userService } from 'services';
import keys from 'config/keys.config';

class ShopInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shopInfo: {},
        };
    }

    async componentDidMount() {
        await this.changeShopInfo(this.props.shopId);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.shopId !== prevProps.shopId) {
            await this.changeShopInfo(this.props.shopId);
        }
    }

    async changeShopInfo(shopId) {
        try {
            const res = await userService.getUser(shopId);

            if (res && !res.errType && res.userInfo) this.setState({ shopInfo: res.userInfo });
            else console.log('some thing wrong from ShopInfo: ', res.message);
        } catch (err) {
            console.log(err);
        }
    }

    redirectToShopPage(id) {
        const redirectPath = `/shops/${id}`;
        const navigate = this.props.navigate;
        navigate(redirectPath);
    }

    render() {
        const { shopInfo } = this.state;

        return (
            <div className={style.wrapper}>
                <Shop shopInfo={shopInfo} redirectToShopPage={this.redirectToShopPage.bind(this)} />

                <Info />
            </div>
        );
    }
}

const Info = () => {
    return (
        <div className={`row ${style.info}`}>
            <div className='col-3'>
                <div>
                    <span>
                        <FormattedMessage id='shop.rating' />
                    </span>
                    <span>330</span>
                </div>

                <div>
                    <span>
                        <FormattedMessage id='shop.products' />
                    </span>
                    <span>111</span>
                </div>
            </div>

            <div className='col-5'>
                <div>
                    <span>
                        <FormattedMessage id='shop.response-rate' />
                    </span>
                    <span>98%</span>
                </div>

                <div>
                    <span>
                        <FormattedMessage id='shop.response-time' />
                    </span>
                    <span>
                        <FormattedMessage id='shop.within-hours' />
                    </span>
                </div>
            </div>

            <div className='col-4'>
                <div>
                    <span>
                        <FormattedMessage id='shop.joined' />
                    </span>
                    <span>
                        4 <FormattedMessage id='shop.years-ago' />
                    </span>
                </div>

                <div>
                    <span>
                        <FormattedMessage id='shop.follower' />
                    </span>
                    <span>296</span>
                </div>
            </div>
        </div>
    );
};

const Shop = ({ shopInfo, redirectToShopPage }) => {
    return (
        <div className={style.shop}>
            <Link to={`/shops/${shopInfo.id}`}>
                <div
                    className={style.avatar}
                    style={{
                        background: `url('${keys.imageURL}/${shopInfo.avatar}') center / cover no-repeat`,
                    }}
                ></div>
            </Link>

            <div>
                <span className={style.shop_name}>
                    {shopInfo.firstName} {shopInfo.lastName}
                </span>

                <span className={style.last_active}>
                    <FormattedMessage id='shop.last-active' values={{ time: 32 }} />
                </span>

                <div className={style.actions}>
                    <button type='button'>
                        <i className='fa-solid fa-cart-plus'></i>
                        <FormattedMessage id='shop.chat-now' />
                    </button>

                    <button type='button' onClick={() => redirectToShopPage(shopInfo.id)}>
                        <i className='fa-solid fa-store'></i>
                        <FormattedMessage id='shop.view-shop' />
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopInfo);
