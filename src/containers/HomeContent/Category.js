import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import style from './Category.module.scss';
import Carousel from '../../components/Carousel';
import HeaderTitle from './Section/HeaderTitle';

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        const catList = [
            {
                name: 'Thời Trang Nam',
                image: '687f3967b7c2fe6a134a2c11894eea4b',
            },
            {
                name: 'Thời Trang Nữ',
                image: '75ea42f9eca124e9cb3cde744c060e4d',
            },
            {
                name: 'Điện Thoại & Phụ Kiện',
                image: '31234a27876fb89cd522d7e3db1ba5ca',
            },
            { name: 'Mẹ & Bé', image: '099edde1ab31df35bc255912bab54a5e' },
            {
                name: 'Thiết Bị Điện Tử',
                image: '978b9e4cb61c611aaaf58664fae133c5',
            },
            {
                name: 'Nhà Cửa & Đời Sống',
                image: '24b194a695ea59d384768b7b471d563f',
            },
            {
                name: 'Máy Tính & Laptop',
                image: 'c3f3edfaa9f6dafc4825b77d8449999d',
            },
            { name: 'Sắc Đẹp', image: 'ef1f336ecc6f97b790d5aae9916dcb72' },
            {
                name: 'Máy Ảnh & Máy Quay Phim',
                image: 'ec14dd4fc238e676e43be2a911414d4d',
            },
            {
                name: 'Sức Khỏe',
                image: '49119e891a44fa135f5f6f5fd4cfc747',
            },
            { name: 'Đồng Hồ', image: '86c294aae72ca1db5f541790f7796260' },
            {
                name: 'Giày Dép Nữ',
                image: '48630b7c76a7b62bc070c9e227097847',
            },
            {
                name: 'Giày Dép Nam',
                image: '74ca517e1fa74dc4d974e5d03c3139de',
            },
            {
                name: 'Túi Ví Nữ',
                image: 'fa6ada2555e8e51f369718bbc92ccc52',
            },
            {
                name: 'Thiết Bị Điện Gia Dụng',
                image: '7abfbfee3c4844652b4a8245e473d857',
            },
            {
                name: 'Phụ Kiện & Trang Sức Nữ',
                image: '8e71245b9659ea72c1b4e737be5cf42e',
            },
            {
                name: 'Thể Thao & Du Lịch',
                image: '6cb7e633f8b63757463b676bd19a50e4',
            },
            {
                name: 'Bách Hóa Online',
                image: 'c432168ee788f903f1ea024487f2c889',
            },
            {
                name: 'Ô Tô & Xe Máy & Xe Đạp',
                image: '3fb459e3449905545701b418e8220334',
            },
            {
                name: 'Nhà Sách Online',
                image: '36013311815c55d303b0e6c62d6a8139',
            },
            {
                name: 'Balo & Túi Ví Nam',
                image: '18fd9d878ad946db2f1bf4e33760c86f',
            },
            {
                name: 'Thời Trang Trẻ Em',
                image: '4540f87aa3cbe99db739f9e8dd2cdaf0',
            },
            { name: 'Đồ Chơi', image: 'ce8f8abc726cafff671d0e5311caa684' },
            {
                name: 'Giặt Giũ & Chăm Sóc Nhà Cửa',
                image: 'cd8e0d2e6c14c4904058ae20821d0763',
            },
            {
                name: 'Chăm Sóc Thú Cưng',
                image: 'cdf21b1bf4bfff257efe29054ecea1ec',
            },
            {
                name: 'Deal Gần Bạn',
                image: '05a94dadbddcf5414668f1ebabf9d33c',
            },
            {
                name: 'Voucher & Dịch Vụ',
                image: 'b0f78c3136d2d78d49af71dd1c3f38c1',
            },
        ];

        return (
            <div className={`content_wrapper ${style.category}`}>
                <HeaderTitle
                    title={<FormattedMessage id='body.category' />}
                    color='rgba(0,0,0,0.54)'
                ></HeaderTitle>

                <Carousel
                    wrapper={style.category}
                    col='12'
                    catList={catList}
                    horizontalDisplay={10}
                    verticalDisplay={2}
                    height='302px'
                >
                    <CarouselTagContent />
                </Carousel>
            </div>
        );
    }
}

const CarouselTagContent = ({ data }) => {
    return (
        <a href={data.link}>
            <div
                style={{ backgroundImage: `url('https://cf.shopee.vn/file/${data.image}')` }}
            ></div>
            <span>{data.name}</span>
        </a>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
