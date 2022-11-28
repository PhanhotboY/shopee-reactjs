import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { CommonUtils } from 'utils';
import style from './Receipt.module.scss';
import ReceiptProductTag from './ReceiptProductTag';
import { Form } from 'reactstrap';

class Purchase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currPage: '0',
            isFocus: false,
        };
    }

    async componentDidMount() {
        const wrapper = document.querySelector('.user-container .row .col-10');

        wrapper.classList.remove('bg-white');
        wrapper.style.boxShadow = 'none';

        const links = document.querySelectorAll(`.${style.header} a`);
        links.forEach((link) => {
            link.onclick = () => {
                this.setState({ currPage: link.getAttribute('href').slice(-1) });
            };
        });
    }

    async componentWillUnmount() {
        const wrapper = document.querySelector('.user-container .row .col-10');

        wrapper.classList.add('bg-white');
        wrapper.style.boxShadow = '';
    }

    handleFocus() {
        this.setState({ isFocus: true });
    }

    handleBlur() {
        this.setState({ isFocus: false });
    }

    render() {
        return (
            <div className={style.receipt}>
                <div className={style.receipt_body}>
                    <div className={style.receipt_header}>
                        <div className={style.shop_info}>
                            <div className={style.shop_type}>{shopInfo.shopType}</div>

                            <div className={style.shop_name}>
                                {shopInfo.name + ' ' + this.props.receipt}
                            </div>

                            <button type='button'>
                                <i className='fa-regular fa-message'></i>
                                <span>
                                    <FormattedMessage id='common.chat' />
                                </span>
                            </button>

                            <Link to={`/shops/${1}`}>
                                <i className='fa-solid fa-store'></i>
                                <span>
                                    <FormattedMessage id='user.puschase.view-shop' />
                                </span>
                            </Link>
                        </div>

                        <div className={style.status}>
                            <div className={style.delivery_stat}>
                                <i className='fa-solid fa-truck'></i>
                                <span>Completed Delivery</span>
                                <i className='fa-regular fa-circle-question'></i>
                            </div>

                            <span>completed</span>
                        </div>
                    </div>

                    {products.map((product, index) => (
                        <ReceiptProductTag key={index} product={product} />
                    ))}
                </div>

                <ReceiptFooter products={products} />
            </div>
        );
    }
}

const ReceiptFooter = ({ products }) => {
    return (
        <div className={style.receipt_footer}>
            <div className={style.order_total}>
                <span>
                    <FormattedMessage id='user.purchase.order-total' />
                </span>

                <span>
                    {CommonUtils.toCurrencyString(
                        products.reduce(
                            (prevPrice, currProduct) =>
                                prevPrice +
                                CommonUtils.getDiscountedPrice(
                                    currProduct.originPrice,
                                    CommonUtils.getPercentNumber(currProduct.discount)
                                ),
                            0
                        )
                    )}
                </span>
            </div>

            <div className={style.subinfo}>
                <span>
                    <FormattedMessage id='user.purchase.no-rating' />
                </span>

                <div className={style.buttons}>
                    <button type='button'>
                        <FormattedMessage id='user.purchase.buy-again' />
                    </button>

                    <button type='button'>
                        <FormattedMessage id='user.purchase.contact-seller' />
                    </button>
                </div>
            </div>
        </div>
    );
};

const products = [
    {
        title: '[Giao sống tận nơi] Cua hoàng đế Alaska đỏ, size to 2 - hơn 3kg/con, hàng cao cấp (giá đã tính tiền nguyên con)',
        originPrice: 4845000,
        discount: '10%',
        quantity: 353,
        image: ['c2a0cbf4cfc2c3a01f749af6c3a48dfc'],
    },
    {
        title: '[Giao sống tận nơi] Cua hoàng đế Alaska đỏ, size to 2 - hơn 3kg/con, hàng cao cấp (giá đã tính tiền nguyên con)',
        originPrice: 4845000,
        discount: '10%',
        quantity: 353,
        image: ['c2a0cbf4cfc2c3a01f749af6c3a48dfc'],
    },
    {
        title: '[Giao sống tận nơi] Cua hoàng đế Alaska đỏ, size to 2 - hơn 3kg/con, hàng cao cấp (giá đã tính tiền nguyên con)',
        originPrice: 4845000,
        discount: '10%',
        quantity: 353,
        image: ['c2a0cbf4cfc2c3a01f749af6c3a48dfc'],
    },
    {
        title: '[Giao sống tận nơi] Cua hoàng đế Alaska đỏ, size to 2 - hơn 3kg/con, hàng cao cấp (giá đã tính tiền nguyên con)',
        originPrice: 4845000,
        discount: '10%',
        quantity: 353,
        image: ['c2a0cbf4cfc2c3a01f749af6c3a48dfc'],
    },
];

const shopInfo = {
    name: 'Phan',
    shopType: 'Prefered',
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
