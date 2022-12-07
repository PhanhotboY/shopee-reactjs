import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import style from './ProductInfo.module.scss';
import { CommonUtils } from 'utils';
import RatingStar from './RatingStar';

class ProductInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantity: 1,
        };
    }

    handleUpDownQuantity(action) {
        let quantity = this.state.quantity;
        const total = this.props.product.totalRemainder;

        if (action === 'add') quantity = ++quantity - (quantity === total + 1);
        if (action === 'sub') quantity = --quantity + !quantity;

        this.setState({ quantity });
    }

    handleAdjustQuantity(e) {
        let quantity = e.target.value;
        const total = this.props.product.totalRemainder;

        if (quantity > total) quantity = total;

        this.setState({ quantity });
    }

    render() {
        const {
            title,
            rating = 4.3,
            sold,
            originPrice,
            discount,
            address,
            totalRemainder,
        } = this.props.product;

        return (
            <div className={`${style.wrapper}`}>
                <div className={style.title}>{title}</div>

                <div className={style.rating}>
                    <div>
                        <div className={style.rating_star}>
                            <span>{rating}</span>

                            <RatingStar rating={rating} />
                        </div>

                        <div className={style.rating_count}>
                            <span>{123}</span>

                            <span>
                                <FormattedMessage id='product.ratings' />
                            </span>
                        </div>

                        <div className={style.sold}>
                            <span>{sold}</span>
                            <span>
                                <FormattedMessage id='product.sold' />
                            </span>
                        </div>
                    </div>

                    <span>
                        <FormattedMessage id='product.report' />
                    </span>
                </div>

                <div className={style.price}>
                    {discount !== 0 && (
                        <div className={style.original_price}>
                            {CommonUtils.toCurrencyString(originPrice)}
                        </div>
                    )}

                    <div className={style.discounted_price}>
                        {CommonUtils.toCurrencyString(
                            CommonUtils.getDiscountedPrice(originPrice, discount)
                        )}
                    </div>

                    {discount !== 0 && (
                        <div className={style.discount}>
                            {discount}% <FormattedMessage id='product.discount' />
                        </div>
                    )}
                </div>

                <DealOptions
                    address={address}
                    totalRemainder={totalRemainder}
                    quantity={this.state.quantity}
                    upDownHandler={this.handleUpDownQuantity.bind(this)}
                    onChangeQuantityHandler={this.handleAdjustQuantity.bind(this)}
                />

                <div className={style.actions}>
                    <button type='button'>
                        <i className='fa-solid fa-cart-plus'></i>
                        <FormattedMessage id='product.add-to-cart' />
                    </button>
                    <button type='button'>
                        <FormattedMessage id='product.buy-now' />
                    </button>
                </div>
            </div>
        );
    }
}

const DealOptions = ({
    address,
    totalRemainder,
    quantity,
    upDownHandler,
    onChangeQuantityHandler,
}) => {
    return (
        <div className={style.deals}>
            <div className={style.body}>
                <span className={`${style.topic} align-self-start`}>
                    <FormattedMessage id='product.shipping' />
                </span>

                <div className={style.body}>
                    <i className='fa-solid fa-truck'></i>

                    <div className={style.content}>
                        <div>
                            <span className={style.topic}>
                                <FormattedMessage id='product.shipping-to' />
                            </span>

                            <div className={style.body}>
                                <span>{address}</span>

                                <i className='fa-solid fa-chevron-down'></i>
                            </div>
                        </div>

                        <div>
                            <span className={style.topic}>
                                <FormattedMessage id='product.shipping-fee' />
                            </span>

                            <div className={style.body}>
                                <span>₫13.500 - ₫22.000</span>
                                <i className='fa-solid fa-chevron-down'></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.body}>
                <span className={style.topic}>
                    <FormattedMessage id='product.quantity' />
                </span>

                <div className={style.body}>
                    <div className={style.counter}>
                        <button type='button' onClick={() => upDownHandler('sub')}>
                            -
                        </button>
                        <input
                            type='number'
                            name='quantity'
                            value={quantity}
                            onChange={onChangeQuantityHandler}
                        />
                        <button type='button' onClick={() => upDownHandler('add')}>
                            +
                        </button>
                    </div>

                    <span className={style.piece_available}>
                        {totalRemainder} <FormattedMessage id='product.pieces-available' />
                    </span>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);
