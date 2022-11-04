import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './BannerCategory.module.scss';

class BannerCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    render() {
        const categories = [
            { title: 'Khung Giờ Săn Sale', logo: '46a2a2c810622f314d78455da5e5d926' },
            { title: 'Gì Cũng Rẻ - Mua Là Freeship', logo: 'b3535d7e56c58c4ebe9a87672d38cc5e' },
            { title: 'Thứ 4 Freeship - x4 Ưu Đãi', logo: 'a8d76bca057ba0b117dcf8e1ef068d16' },
            { title: 'Bắt Trend - Giá Sốc', logo: 'b15de7d7368673a82583a88333ed23e7' },
            { title: 'Hoàn Xu 6% - Lên Đến 200K', logo: '21a4856d1fecd4eda143748661315dba' },
            { title: 'Hàng Hiệu Giá Tốt', logo: '8d6d5ee795e7675fed39d31ba04c3b92' },
            { title: 'Hàng Quốc Tế', logo: 'a08ab28962514a626195ef0415411585' },
            { title: 'Nạp Thẻ, Hóa Đơn & Phim', logo: '9df57ba80ca225e67c08a8a0d8cc7b85' },
            { title: 'Deal Sốc Từ 1K', logo: '96385a65fa50800e096bb790fa5c1dba' },
        ];

        return (
            <div className={style.wrapper}>
                <div className={`${style.container}`}>
                    {categories.map((category, index) => (
                        <CategoryTag key={index} title={category.title} logo={category.logo} />
                    ))}
                </div>
            </div>
        );
    }
}

const CategoryTag = ({ title, logo }) => {
    return (
        <a href='#'>
            <div style={{ backgroundImage: `url('https://cf.shopee.vn/file/${logo}')` }}></div>
            <div>{title}</div>
        </a>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerCategory);
