import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './FlashSale.module.scss';
import CountDown from '../../components/CountDown';
import Carousel from '../../components/Carousel';
import HeaderTitle from './Section/HeaderTitle';
import FlashSaleTag from './Section/FlashSaleTag';

class FlashSale extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        const catList = [
            {
                originPrice: '13400000',
                images: ['8ca5f728754cfc74526f550586f07357'],
                overlay: '86e4196ee16efe4b43e45d65cac2397c',
                discount: 49,
                sold: 30,
                maxQuantity: 99,
            },
            {
                originPrice: '13400000',
                images: ['8ca5f728754cfc74526f550586f07357'],
                overlay: '86e4196ee16efe4b43e45d65cac2397c',
                discount: 49,
                sold: 31,
                maxQuantity: 99,
            },
            {
                originPrice: '13400000',
                images: ['8ca5f728754cfc74526f550586f07357'],
                overlay: '86e4196ee16efe4b43e45d65cac2397c',
                discount: 49,
                sold: 32,
                maxQuantity: 99,
            },
            {
                originPrice: '13400000',
                images: ['8ca5f728754cfc74526f550586f07357'],
                overlay: '86e4196ee16efe4b43e45d65cac2397c',
                discount: 49,
                sold: 33,
                maxQuantity: 99,
            },
            {
                originPrice: '13400000',
                images: ['8ca5f728754cfc74526f550586f07357'],
                overlay: '86e4196ee16efe4b43e45d65cac2397c',
                discount: 49,
                sold: 34,
                maxQuantity: 99,
            },
            {
                originPrice: '13400000',
                images: ['8ca5f728754cfc74526f550586f07357'],
                overlay: '86e4196ee16efe4b43e45d65cac2397c',
                discount: 49,
                sold: 35,
                maxQuantity: 99,
            },
            {
                originPrice: '13400000',
                images: ['8ca5f728754cfc74526f550586f07357'],
                overlay: '86e4196ee16efe4b43e45d65cac2397c',
                discount: 49,
                sold: 36,
                maxQuantity: 99,
            },
            {
                originPrice: '13400000',
                images: ['8ca5f728754cfc74526f550586f07357'],
                overlay: '86e4196ee16efe4b43e45d65cac2397c',
                discount: 49,
                sold: 37,
                maxQuantity: 99,
            },
            {
                originPrice: '13400000',
                images: ['8ca5f728754cfc74526f550586f07357'],
                overlay: '86e4196ee16efe4b43e45d65cac2397c',
                discount: 49,
                sold: 38,
                maxQuantity: 99,
            },
            {
                originPrice: '13400000',
                images: ['8ca5f728754cfc74526f550586f07357'],
                overlay: '86e4196ee16efe4b43e45d65cac2397c',
                discount: 49,
                sold: 39,
                maxQuantity: 99,
            },
            {
                originPrice: '13400000',
                images: ['8ca5f728754cfc74526f550586f07357'],
                overlay: '86e4196ee16efe4b43e45d65cac2397c',
                discount: 49,
                sold: 40,
                maxQuantity: 99,
            },
            {
                originPrice: '13400000',
                images: ['8ca5f728754cfc74526f550586f07357'],
                overlay: '86e4196ee16efe4b43e45d65cac2397c',
                discount: 49,
                sold: 41,
                maxQuantity: 99,
            },
        ];

        return (
            <div className={`content_wrapper ${style.flashsale}`}>
                <HeaderTitle
                    image='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/flashsale/fb1088de81e42c4e538967ec12cb5caa.png'
                    color='#ee4d2d'
                    call='1'
                    border='none'
                >
                    <CountDown duration={415} />
                </HeaderTitle>

                <Carousel
                    wrapper={style.flashsale}
                    col='12'
                    catList={catList}
                    horizontalDisplay={6}
                    verticalDisplay={1}
                    height='248px'
                >
                    <FlashSaleTag />
                </Carousel>
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

export default connect(mapStateToProps, mapDispatchToProps)(FlashSale);
