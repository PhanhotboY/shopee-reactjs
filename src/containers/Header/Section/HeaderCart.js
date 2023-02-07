import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import CommonUtils from 'utils/CommonUtils';
import style from './HeaderCart.module.scss';

class HeaderCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCartPopover: false,
            productList: [
                {
                    productId: 1,
                    title: 'Ghe xinh nhat Sai Gon',
                    image: ['46f4283d964fce5b21e89d1b83748120'],
                    originPrice: 9999000,
                    discount: '33',
                },
                {
                    productId: 1,
                    title: 'Ghe xinh nhat Sai Gon',
                    image: ['46f4283d964fce5b21e89d1b83748120'],
                    originPrice: 9999000,
                    discount: '33',
                },
            ],
        };
    }

    componentDidMount() {}

    render() {
        return (
            <div className={style['header_cart']}>
                <div
                    className={style.cart_wrapper}
                    onMouseOver={() => this.setState({ isCartPopover: true })}
                    onMouseLeave={() => this.setState({ isCartPopover: false })}
                >
                    <CartButon />

                    {this.state.isCartPopover && (
                        <CartPopover productList={this.state.productList} />
                    )}
                </div>
            </div>
        );
    }
}

const CartButon = ({}) => {
    return (
        <Link to='/cart'>
            <CartIcon />
        </Link>
    );
};

const CartPopover = ({ productList }) => {
    return (
        <div className={style.cart_popover}>
            <div className={`${style.popover_anchor} popover_anchor`}></div>

            <div className={style.cart_popover_wrapper}>
                {Boolean(productList.length) && <CartPopoverHeader />}

                <CartPopoverBody productList={productList} />

                {Boolean(productList.length) && <CartPopoverFooter />}
            </div>
        </div>
    );
};

const CartPopoverHeader = () => {
    return (
        <div className={style.cart_popover_header}>
            <span>
                <FormattedMessage id='header.recently-added-product' />
            </span>
        </div>
    );
};

const CartPopoverFooter = () => {
    return (
        <div className={style.cart_popover_footer}>
            <span>
                1 <FormattedMessage id='header.more-products-in-cart' />
            </span>

            <Link to='/cart'>
                <button type='button'>
                    <FormattedMessage id='header.view-my-shopping-cart' />
                </button>
            </Link>
        </div>
    );
};

const CartPopoverBody = ({ productList }) => {
    return (
        <div
            className={style.cart_popover_body}
            style={{ height: productList.length ? '100%' : '260px' }}
        >
            {productList.length ? (
                productList.map((product, index) => {
                    if (index >= 5) return;

                    return <CartPopoverContent productInfo={product} key={index} />;
                })
            ) : (
                <CartPopoverContentEmpty />
            )}
        </div>
    );
};

const CartPopoverContent = ({ productInfo }) => {
    return (
        <div className={style.product_tag}>
            <img src={`https://cf.shopee.vn/file/${productInfo.image}`} />

            <div className={style.product_brief_info}>
                <span>{productInfo.title}</span>

                <span>
                    {CommonUtils.toCurrencyString(
                        productInfo.originPrice * Number(productInfo.discount)
                    )}
                </span>
            </div>
        </div>
    );
};

const CartPopoverContentEmpty = () => {
    return (
        <>
            <img
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png'
                alt='empty_cart_icon'
            />
            <span>
                <FormattedMessage id='header.no-product-yet' />
            </span>
        </>
    );
};

const CartIcon = () => {
    return (
        <svg viewBox='0 0 26.6 25.6'>
            <polyline
                fill='none'
                points='2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
                strokeWidth={2.5}
            ></polyline>
            <circle cx='10.7' cy='23' r='2.2' stroke='none'></circle>
            <circle cx='19.7' cy='23' r='2.2' stroke='none'></circle>
        </svg>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCart);
