import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { CommonUtils } from 'utils';
import DiscountFlag from './DiscountFlag';
import style from './ProductTag.module.scss';
import { Link } from 'react-router-dom';

class ProductTag extends Component {
    constructor(props) {
        super(props);

        this.state = { isHover: false };
    }

    /**Props:
     * data: obj
     * col: number
     * isHoverHighLight: boolean
     */
    render() {
        const product = this.props.data;

        return (
            <li className={`${style.wrapper} col-${this.props.col || 2}`}>
                <div
                    className={style.container}
                    style={{
                        borderColor: this.props.isHoverHighLight && this.state.isHover && '#ee4d2d',
                    }}
                    onMouseOver={() => this.setState({ isHover: true })}
                    onMouseLeave={() => this.setState({ isHover: false })}
                >
                    <Link className={style.main} to={`/products/${product.id}`}>
                        <ProductImage
                            images={product.images}
                            overlay={product.overlay}
                            flag={product.flag}
                        />

                        {product.discount ? <DiscountFlag discount={product.discount} /> : ''}

                        <ProductDetail
                            title={product.title}
                            promotion={product.promotion}
                            price={CommonUtils.getDiscountedPrice(
                                product.originPrice,
                                product.discount / 100
                            )}
                            sold={product.sold}
                            address={product.address}
                        />
                    </Link>

                    {this.props.isHoverHighLight && this.state.isHover && <SimilarBtn />}
                </div>
            </li>
        );
    }
}

const ProductImage = ({ images, overlay, flag }) => {
    return (
        <div
            className={style.product_image}
            style={{ backgroundImage: `url('https://cf.shopee.vn/file/${images && images[0]}')` }}
        >
            {overlay ? (
                <div
                    className={style.overlay}
                    style={{ backgroundImage: `url('https://cf.shopee.vn/file/${overlay}')` }}
                ></div>
            ) : (
                ''
            )}

            {flag ? <img className={style.flag} src={`https://cf.shopee.vn/file/${flag}`} /> : ''}
        </div>
    );
};

const ProductDetail = ({ title, promotion, price, sold, address }) => {
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

            <span className={style.address}>{address || ''}</span>
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
