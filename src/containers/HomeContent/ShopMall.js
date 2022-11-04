import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import style from './ShopMall.module.scss';
import Carousel from 'components/Carousel';
import Slider from 'components/Slider';
import HeaderTitle from './Section/HeaderTitle';

class ShopMall extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        const catList = [
            {
                promoText: 'Thời Trang Nam',
                image: '57cd2e3c8f6b33302f0edc8663784d60',
            },
            {
                promoText: 'Thời Trang Nữ',
                image: '75ea42f9eca124e9cb3cde744c060e4d',
            },
            {
                promoText: 'Điện Thoại & Phụ Kiện',
                image: '31234a27876fb89cd522d7e3db1ba5ca',
            },
            { promoText: 'Mẹ & Bé', image: '099edde1ab31df35bc255912bab54a5e' },
            {
                promoText: 'Thiết Bị Điện Tử',
                image: '978b9e4cb61c611aaaf58664fae133c5',
            },
            {
                promoText: 'Nhà Cửa & Đời Sống',
                image: '24b194a695ea59d384768b7b471d563f',
            },
            {
                promoText: 'Máy Tính & Laptop',
                image: 'c3f3edfaa9f6dafc4825b77d8449999d',
            },
            { promoText: 'Sắc Đẹp', image: 'ef1f336ecc6f97b790d5aae9916dcb72' },
            {
                promoText: 'Máy Ảnh & Máy Quay Phim',
                image: 'ec14dd4fc238e676e43be2a911414d4d',
            },
            {
                promoText: 'Sức Khỏe',
                image: '49119e891a44fa135f5f6f5fd4cfc747',
            },
            { promoText: 'Đồng Hồ', image: '86c294aae72ca1db5f541790f7796260' },
        ];

        const deals = [
            {
                image: '6c502a2641457578b0d5f5153b53dd5d',
                promoText: <FormattedMessage id='body.15-days-return' />,
            },
            {
                image: '511aca04cc3ba9234ab0e4fcf20768a2',
                promoText: <FormattedMessage id='body.100percent-authentic' />,
            },
            {
                image: '16ead7e0a68c3cff9f32910e4be08122',
                promoText: <FormattedMessage id='body.free-shipping' />,
            },
        ];

        return (
            <div className={`content_wrapper ${style.shopmall}`}>
                <HeaderTitle
                    title={<a href='#'>shopee mall</a>}
                    color='inherit'
                    call={<HeaderSeemore />}
                >
                    <DealList deals={deals} />
                </HeaderTitle>

                <div className={`${style.body}`}>
                    <div className={`${style.slider} col-4`}>
                        <Slider
                            wrapper={style.shopmall}
                            images={[
                                '7a04392be6eda9be9f997c37549b3a77',
                                'd4349d053bf9963b0f0e3ad7c0de1759',
                                '7d7d054ae3b707796dd873f52483bc89',
                                'd5db572e0cbaccd4dd37505de6da07f7',
                                '774428de5186ae16480f62965b52278b',
                                '6084b032ac24dea245c7a4d0a81605fd',
                                '94560c74d3c3dbfea724fc5eb6e8a800',
                                '43d7f5b5623cb0cbc06569ec84bca84e',
                            ]}
                            height={462}
                            col='12'
                        />
                    </div>

                    <Carousel
                        wrapper={style.shopmall}
                        col='8'
                        catList={catList}
                        length={catList.length + 1}
                        horizontalDisplay={4}
                        verticalDisplay={2}
                        height={472}
                    >
                        <ShopMallTag />

                        <li>
                            <HeaderSeemore />
                        </li>
                    </Carousel>
                </div>
            </div>
        );
    }
}

const ShopMallTag = ({ data }) => {
    return (
        <a href='#'>
            <div
                style={{
                    background: `url('https://cf.shopee.vn/file/${data.image}') center/ contain no-repeat`,
                    height: '100%',
                }}
            >
                <div>{data.promoText}</div>
            </div>
        </a>
    );
};

const DealList = ({ deals }) => {
    return (
        <ul className={style.deal_list}>
            {deals.map((deal, index) => (
                <DealTag key={index} deal={deal} />
            ))}
        </ul>
    );
};

const DealTag = ({ deal }) => {
    return (
        <li>
            <img
                src={`https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepage/${deal.image}.png`}
                alt='100% Genuine'
            />
            <span>{deal.promoText}</span>
        </li>
    );
};

const HeaderSeemore = () => {
    return (
        <a className={style.header_seeall} href='#'>
            <span>
                <FormattedMessage id='body.seeall' />
            </span>

            <SeeallIcon />
        </a>
    );
};

const SeeallIcon = () => {
    return (
        <div className={style.seeall_icon}>
            <svg enableBackground='new 0 0 11 11' viewBox='0 0 11 11' x='0' y='0'>
                <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z'></path>
            </svg>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopMall);
