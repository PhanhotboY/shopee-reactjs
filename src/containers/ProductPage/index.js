import { connect } from 'react-redux';
import { Component } from 'react';
import { push } from 'connected-react-router';

import { history } from '../../redux';
import style from './index.module.scss';
import GoToTopBtn from 'containers/System/Section/GoToTopBtn';
import { Link } from 'react-router-dom';
import ProductDetail from './ProductDetail';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {
                id: 1,
                title: 'Sen đá kim cương tím bụi nhiều đầu 9-10cm, Hàng Đà Lạt, Lỗi 1 đổi 1',
                originPrice: 150000,
                discount: 0,
                sold: 51,
                images: [
                    '08de791de968e016c6d9a72d1d08318b',
                    'ab3d611ac64aeb0f2e969b506830a9f7',
                    'cc0a807949dcb5646ea50cb6f5d4e6ba',
                    'b71e161a325e8fb686e8ec675acf40a5',
                    '9ba8944f34697652e04b79c550734342',
                    'bc77b8af10947265603fe3be21b3dd40',
                ],
                overlay: '3266b2eebb590e79bd377b8e75181914',
                flag: '',
                address: 'Ho Chi Minh',
                totalRemainder: 20,
                category: 'Sen da',
            },
        };
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <div className={style.wrapper}>
                <div className={style.breadcrumbs}>
                    <Link to='/'>Home</Link>
                    <i className='fa-solid fa-chevron-right'></i>

                    <Link to={`/search?keyword=${this.state.product.category}`}>
                        {this.state.product.category}
                    </Link>

                    <i className='fa-solid fa-chevron-right'></i>

                    <span>
                        {this.state.product.title}
                        {this.state.product.title}
                        {this.state.product.title}
                    </span>
                </div>

                <ProductDetail product={this.state.product} />

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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
