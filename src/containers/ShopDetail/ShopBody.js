import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import style from './ShopBody.module.scss';
import Carousel from 'components/Carousel';
import GoToTopBtn from 'containers/System/Section/GoToTopBtn';
import VoucherTag from './Section/VoucherTag';
import UserHeader from 'containers/User/Section/UserHeader';
import HeaderTitle from 'containers/HomeContent/Section/HeaderTitle';
import ProductList from './Section/ProductList';
import ProductTag from 'containers/HomeContent/Section/ProductTag';
import Filter from 'components/Filter';
import TagList from 'components/TagList';

class ShopBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: this.props.userInfo,
        };
    }

    async componentDidMount() {
        this.setState({ userInfo: this.props.userInfo });
    }

    componentDidUpdate(prevProps) {
        if (this.props.userInfo !== prevProps.userInfo) {
            this.setState({ userInfo: this.props.userInfo });
        }
    }

    render() {
        return (
            <div className={`grid ${style.body}`}>
                <div className={style.vouchers}>
                    <HeaderTitle title={<FormattedMessage id='shop.shop-vouchers' />} border={0} />

                    <Carousel
                        wrapper={style.body}
                        col='12'
                        catList={voucherList}
                        horizontalDisplay={3}
                        verticalDisplay={1}
                        height={121}
                    >
                        <VoucherTag />
                    </Carousel>
                </div>

                <div id='product-list' className={`row ${style.product_list}`}>
                    <CategorySideBar />

                    <Filter items={products} isDisplayHeader={true} col='10'>
                        <TagList>
                            <ProductTag col='20pc' isHoverHighLight={true} />
                        </TagList>
                    </Filter>
                </div>

                <Link to='#'>
                    <GoToTopBtn />
                </Link>
            </div>
        );
    }
}

const ProductListHeader = () => {
    return (
        <div className={style.product_list_header}>
            <div className={style.product_filter}>
                <span>
                    <FormattedMessage id='shop.sort-by' />
                </span>

                <div>
                    <FormattedMessage id='shop.popular' />
                </div>
                <div>
                    <FormattedMessage id='shop.latest' />
                </div>
                <div>
                    <FormattedMessage id='shop.top-sales' />
                </div>

                <select>
                    <FormattedMessage id='shop.price'>
                        {(trans) => (
                            <option disabled selected hidden>
                                {trans}
                            </option>
                        )}
                    </FormattedMessage>

                    <FormattedMessage id='shop.price-low-to-high'>
                        {(trans) => <option>{trans}</option>}
                    </FormattedMessage>

                    <FormattedMessage id='shop.price-high-to-low'>
                        {(trans) => <option>{trans}</option>}
                    </FormattedMessage>
                </select>
            </div>

            <div className={style.product_pagination}>
                <span>{1}</span>/<span>{3}</span>
                <div>
                    <button>
                        <i className='fa-solid fa-chevron-left'></i>
                    </button>
                    <button>
                        <i className='fa-solid fa-chevron-right'></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

const CategorySideBar = () => {
    return (
        <div className={`${style.sidebar} col-2`}>
            <UserHeader>
                <div className={style.sidebar_header}>
                    <i className='fa-solid fa-list-ul'></i>
                    <span>
                        <FormattedMessage id='shop.category' />
                    </span>
                </div>
            </UserHeader>

            <div className={style.sidebar_container}>
                <span className={style['sidebar--active']}>
                    <i className='fa-solid fa-play'></i>

                    <FormattedMessage id='shop.all-products' />
                </span>
            </div>
        </div>
    );
};

const products = [
    {
        title: 'Sen đá sỏi hường SONDA GARDEN size mini 2.5-4cm, cây cảnh trang trí nhà cửa, lỗi 1 đổi 1',
        originPrice: 15000,
        discount: 33,
        sold: 2403,
        images: ['5af81d807bdf38c386c8507248ef68b3'],
        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
        flag: 'db89dfecef669d7a42af1a6be6783789',
    },
    {
        title: 'Sen đá bắp cải aurora purple Đà Lạt size bé cây cảnh trang trí nhà cửa Lolita garden',
        originPrice: 25000,
        discount: 24,
        sold: 798,
        images: ['c6c46b364a61740a5f03c99a1dbaa846'],
        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
        flag: 'db89dfecef669d7a42af1a6be6783789',
    },
    {
        title: 'Sen đá kim cương tím Đà Lạt size mini cây cảnh trang trí nhà cửa Lolita garden',
        originPrice: 13000,
        discount: 33,
        sold: 619,
        images: ['49d948af70514597ff4648e70e249de8'],
        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
        flag: 'db89dfecef669d7a42af1a6be6783789',
    },
    {
        title: 'Sen đá dù hồng Đà Lạt size mini cây cảnh trang trí nhà cửa Lolita garden',
        originPrice: 10000,
        discount: 10,
        sold: 312,
        images: ['ee5dddd0bfa4044e7ed7ca7a3f37f18a'],
        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
        flag: 'db89dfecef669d7a42af1a6be6783789',
    },
    {
        title: 'Sen đá sedum huyết rồng Đà Lạt size mini cây cảnh trang trí nhà cửa Toro garden',
        originPrice: 10000,
        discount: 10,
        sold: 641,
        images: ['e056ac7d016a7478d43994aa95849b1f'],
        overlay: '54d8a14b882672ba2bd2d2fd33066f02',
        flag: 'db89dfecef669d7a42af1a6be6783789',
    },
];

const voucherList = [
    { name: 'discount 1' },
    { name: 'discount 12' },
    { name: 'discount 123' },
    { name: 'discount 1234' },
    { name: 'discount 12345' },
    { name: 'discount 123456' },
];

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopBody);
