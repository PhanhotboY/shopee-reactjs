import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import style from './ProductList.module.scss';
import HeaderTitle from './Section/HeaderTitle';
import ProductTag from './Section/ProductTag';

class ProductList extends Component {
    render() {
        const productList = [
            {
                title: 'Áo thun tay lỡ unisex SADTAGRAM TEE haha haha haha',
                originPrice: 6900000,
                discount: 99,
                sold: 12343,
                image: '2a9f3d3a1bd30d41e1bd63d07c7b387f',
                overlay: '54d8a14b882672ba2bd2d2fd33066f02',
                flag: 'db89dfecef669d7a42af1a6be6783789',
            },
            {
                title: 'Áo thun tay lỡ unisex SADTAGRAM TEE',
                originPrice: 69000,
                discount: 99,
                sold: 12343,
                image: '2a9f3d3a1bd30d41e1bd63d07c7b387f',
                overlay: '54d8a14b882672ba2bd2d2fd33066f02',
                flag: 'db89dfecef669d7a42af1a6be6783789',
            },
            {
                title: 'Áo thun tay lỡ unisex SADTAGRAM TEE',
                originPrice: 69000,
                discount: 99,
                sold: 12343,
                image: '2a9f3d3a1bd30d41e1bd63d07c7b387f',
                overlay: '54d8a14b882672ba2bd2d2fd33066f02',
                flag: 'db89dfecef669d7a42af1a6be6783789',
            },
        ];

        return (
            <div className={`content_wrapper ${style.product_list}`}>
                <HeaderTitle propStyles={{ justifyContent: 'center', cursor: 'pointer' }}>
                    <ProductListHeader />

                    <HighLight backgroundColor='currentcolor' width='100%' height={4} />
                </HeaderTitle>

                <ProductContainer products={productList} />

                <SeemoreButton />
            </div>
        );
    }
}

const ProductListHeader = () => {
    return (
        <div className={`${style.header} col-12`}>
            <ul>
                <li>
                    <FormattedMessage id='body.daily-discover' />
                </li>
            </ul>
        </div>
    );
};

const ProductContainer = ({ products }) => {
    return (
        <ul className='row'>
            {products.map((product, index) => (
                <ProductTag key={index} product={product} isHoverHighLight={true} />
            ))}
        </ul>
    );
};

const SeemoreButton = () => {
    return (
        <div className={`${style.seemore_btn} row`}>
            <a href='#'>
                <FormattedMessage id='body.see-more' />
            </a>
        </div>
    );
};

const HighLight = ({ backgroundColor, width, height }) => {
    return <div className={style.highlight} style={{ backgroundColor, width, height }}></div>;
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
