import { connect } from 'react-redux';
import { Component } from 'react';
import { push } from 'connected-react-router';

import style from './ProductDetail.module.scss';
import ProductInfo from './Section/ProductInfo';
import ProductImages from './Section/ProductImages';

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: this.props.product,
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {
        if (this.props.product !== prevProps.product) {
            this.setState({ product: this.props.product });
        }
    }

    render() {
        const { product } = this.state;

        return (
            <div className={style.wrapper}>
                <ProductImages product={product} />

                <ProductInfo product={product} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
