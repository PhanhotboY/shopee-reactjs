import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import style from './ReceiptProductTag.module.scss';
import { CommonUtils } from 'utils';

class ReceiptProductTag extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {}

    render() {
        const product = this.props.product;

        return (
            <div className={style.product_tag}>
                <img src={`https://cf.shopee.vn/file/${product.image[0]}`}></img>

                <div className={`${style.product_info}`}>
                    <span className={style.product_title}>{product.title}</span>

                    <span className={style.variation}>variation: 2 10</span>

                    <span className={style.quantity}>x{product.quantity}</span>
                </div>

                <div>
                    <span className={style.original_price}>
                        {CommonUtils.toCurrencyString(product.originPrice)}
                    </span>

                    <span className={style.discounted_price}>
                        {CommonUtils.toCurrencyString(
                            CommonUtils.getDiscountedPrice(
                                product.originPrice,
                                CommonUtils.getPercentNumber(product.discount)
                            )
                        )}
                    </span>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptProductTag);
