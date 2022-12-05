import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import style from './ProductInfo.module.scss';
import { CommonUtils } from 'utils';

class ProductInfo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, rating, sold, originPrice, discount, address } = this.props.product;

        return (
            <div className={`${style.wrapper}`}>
                <div className={style.title}>
                    <span>{title}</span>
                </div>

                <div className={style.rating}>
                    <div>
                        <div className={style.rating_star}></div>

                        <div className={style.rating}>
                            <span>{rating}</span>
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
                    <div className={style.original_price}>{originPrice}</div>

                    <div className={style.discounted_price}>
                        {CommonUtils.getDiscountedPrice(originPrice, discount)}
                    </div>

                    <div className={style.discount}>
                        {discount}% <FormattedMessage id='product.discount' />
                    </div>
                </div>

                <div className={style.shipping}>
                    <span className={style.topic}>
                        <FormattedMessage id='product.shipping' />
                    </span>

                    <div className={style.body}>
                        <img />

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

                                <div className={style.body}>₫13.500 - ₫22.000</div>
                                <i className='fa-solid fa-chevron-down'></i>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);
