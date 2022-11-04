import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { CommonUtils } from 'utils';
import style from './TopSearch.module.scss';
import Carousel from 'components/Carousel';
import HeaderTitle from './Section/HeaderTitle';

class TopSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        const catList = [
            {
                content: 'Thời Trang Nam',
                image: '687f3967b7c2fe6a134a2c11894eea4b',
                sold: 13224,
            },
            {
                content: 'Thời Trang Nữ',
                image: '75ea42f9eca124e9cb3cde744c060e4d',
                sold: 8989,
            },
            {
                content: 'Điện Thoại & Phụ Kiện',
                image: '31234a27876fb89cd522d7e3db1ba5ca',
                sold: 123132,
            },
            { content: 'Mẹ & Bé', image: '099edde1ab31df35bc255912bab54a5e', sold: 33 },
            {
                content: 'Thiết Bị Điện Tử',
                image: '978b9e4cb61c611aaaf58664fae133c5',
                sold: 23,
            },
            {
                content: 'Nhà Cửa & Đời Sống',
                image: '24b194a695ea59d384768b7b471d563f',
                sold: 2,
            },
            {
                content: 'Máy Tính & Laptop',
                image: 'c3f3edfaa9f6dafc4825b77d8449999d',
                sold: 2343,
            },
            { content: 'Sắc Đẹp', image: 'ef1f336ecc6f97b790d5aae9916dcb72', sold: 23 },
            {
                content: 'Máy Ảnh & Máy Quay Phim',
                image: 'ec14dd4fc238e676e43be2a911414d4d',
                sold: 22,
            },
            {
                content: 'Sức Khỏe',
                image: '49119e891a44fa135f5f6f5fd4cfc747',
                sold: 133,
            },
            { content: 'Đồng Hồ', image: '86c294aae72ca1db5f541790f7796260', sold: 222222 },
            {
                content: 'Giày Dép Nữ',
                image: '48630b7c76a7b62bc070c9e227097847',
                sold: 1,
            },
            {
                content: 'Giày Dép Nam',
                image: '74ca517e1fa74dc4d974e5d03c3139de',
                sold: 1000111,
            },
            {
                content: 'Túi Ví Nữ',
                image: 'fa6ada2555e8e51f369718bbc92ccc52',
                sold: 2332,
            },
            {
                content: 'Thiết Bị Điện Gia Dụng',
                image: '7abfbfee3c4844652b4a8245e473d857',
                sold: 11323,
            },
        ];

        return (
            <div className={`content_wrapper ${style.topsearch}`}>
                <HeaderTitle
                    title={<FormattedMessage id='body.top-product' />}
                    color='inherit'
                    call='1'
                ></HeaderTitle>

                <Carousel
                    wrapper={style.topsearch}
                    col='12'
                    catList={catList}
                    horizontalDisplay={6}
                    verticalDisplay={1}
                    height={290}
                >
                    <TopSearchTag />
                </Carousel>
            </div>
        );
    }
}

const TopSearchTag = ({ data }) => {
    return (
        <a href='#'>
            <TopSearchImage image={data.image} sold={data.sold} />

            <span className={style.title}>{data.content}</span>
        </a>
    );
};

const TopSearchImage = ({ image, sold }) => {
    return (
        <div
            className={style.image}
            style={{ backgroundImage: `url('https://cf.shopee.vn/file/${image}')` }}
        >
            <div
                className={style.flag}
                style={{
                    background:
                        "url('https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/homepage/06720e49514cbd94b7552496b4de454a.png') center/cover no-repeat",
                }}
            ></div>
            <div className={style.sold}>
                <FormattedMessage
                    id='body.monthly-sales'
                    values={{
                        sold:
                            CommonUtils.toThousandUnitString(sold) + (Number(sold) >= 1000 && '+'),
                    }}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(TopSearch);
