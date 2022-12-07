import { connect } from 'react-redux';
import { Component } from 'react';
import { push } from 'connected-react-router';

import style from './index.module.scss';
import ShopInfo from './ShopInfo';
import ProductDetail from './ProductDetail';
import BreadCrumbs from 'components/BreadCrumbs';
import GoToTopBtn from 'containers/System/Section/GoToTopBtn';
import Description from './Description';
import ProductRating from './ProductRating';

class ProductPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                id: 1,
                title: 'Sen đá kim cương tím bụi nhiều đầu 9-10cm, Hàng Đà Lạt, Lỗi 1 đổi 1',
                originPrice: 150000,
                discount: 32,
                sold: 51,
                liked: 3234,
                images: [
                    '08de791de968e016c6d9a72d1d08318b',
                    'ab3d611ac64aeb0f2e969b506830a9f7',
                    'cc0a807949dcb5646ea50cb6f5d4e6ba',
                    'b71e161a325e8fb686e8ec675acf40a5',
                    '9ba8944f34697652e04b79c550734342',
                    'bc77b8af10947265603fe3be21b3dd40',
                    'bc77b8af10947265603fe3be21b3dd40',
                ],
                overlay: '3266b2eebb590e79bd377b8e75181914',
                flag: '',
                address: 'Ho Chi Minh',
                totalRemainder: 20,
                category: 'Sen da',
                userId: 5,
                description: 'hello everyone, i am PhanhotboY',
            },
        };
    }

    render() {
        const product = this.state.product;

        return (
            <div className={style.wrapper}>
                <BreadCrumbs
                    breadcrumbs={[
                        { name: 'Home', link: '/' },
                        { name: 'Sen da', link: `/search?keyword=${product.category}` },
                        { name: product.title },
                    ]}
                />

                <ProductDetail product={product} />

                <ShopInfo shopId={product.userId} />

                <Description product={product} />

                <ProductRating product={product} />

                <GoToTopBtn />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
