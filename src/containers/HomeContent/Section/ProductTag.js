import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { CommonUtils } from 'utils';
import DiscountFlag from './DiscountFlag';
import style from './ProductTag.module.scss';

class ProductTag extends Component {
    constructor(props) {
        super(props);

        this.state = { isHover: false };
    }

    render() {
        const product = this.props.product;

        return (
            <li className={`${style.wrapper} col-2`}>
                <div
                    className={style.container}
                    onMouseOver={() => this.setState({ isHover: true })}
                    onMouseLeave={() => this.setState({ isHover: false })}
                >
                    <a className={style.main} href='#'>
                        <ProductImage
                            image={product.image}
                            overlay={product.overlay}
                            flag={product.flag}
                        />

                        <DiscountFlag discount={product.discount} />

                        <ProductDetail
                            title={product.title}
                            promotion={product.promotion}
                            price={(product.originPrice * product.discount) / 100}
                            sold={product.sold}
                        />
                    </a>

                    {this.state.isHover && <SimilarBtn />}
                </div>
            </li>
        );
    }
}

const ProductImage = ({ image, overlay, flag }) => {
    return (
        <div
            className={style.product_image}
            style={{ backgroundImage: `url('https://cf.shopee.vn/file/${image}')` }}
        >
            <div
                className={style.overlay}
                style={{ backgroundImage: `url('https://cf.shopee.vn/file/${overlay}')` }}
            ></div>

            <img className={style.flag} src={`https://cf.shopee.vn/file/${flag}`} />
        </div>
    );
};

const ProductDetail = ({ title, promotion, price, sold }) => {
    return (
        <div className={style.product_detail}>
            <div className={style.product_title}>{title}</div>

            <div
                className={style.product_promotion}
                style={{ backgroundImage: `url('https://cf.shopee.vn/file/${promotion}')` }}
            ></div>

            <div className={style.product_info}>
                <div className={style.product_price}>{CommonUtils.toCurrencyString(price)}</div>

                <div className={style.sold}>
                    <FormattedMessage
                        id='body.sold'
                        values={{ sold: CommonUtils.toThousandUnitString(sold, 1) }}
                    />
                </div>
            </div>
        </div>
    );
};

const SimilarBtn = () => {
    return (
        <div className={style.similar}>
            <a href='#'>
                <FormattedMessage id='body.find-similar' />
            </a>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductTag);
