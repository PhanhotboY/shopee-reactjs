import { connect } from 'react-redux';
import { Component } from 'react';

import style from './CartTag.module.scss';
import TagHeader from './TagHeader';
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from 'utils';
import ProductTag from './ProductTag';

class CartTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: this.props.products,
            isCheckedAll: false,
            selectedProducts: [],
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.products !== prevProps.products) {
            this.setState({ products: this.props.products });
        }

        if (this.props.isCheckedAll !== prevProps.isCheckedAll) {
            this.handleOnChangeAll(this.props.isCheckedAll);
        }

        if (this.state.selectedProducts !== prevState.selectedProducts) {
            const { products, selectedProducts } = this.state;

            if (selectedProducts.length === products.length) {
                this.setState({ isCheckedAll: true });
            } else {
                this.setState({ isCheckedAll: false });
            }

            this.props.onChangeHandler(this.state.isCheckedAll, products[0].userId);
        }
    }

    handleOnChangeSelect(checked, id) {
        const selectedProducts = [...this.state.selectedProducts];

        if (checked && selectedProducts.indexOf(id) === -1) selectedProducts.push(id);

        if (!checked && selectedProducts.indexOf(id) !== -1)
            selectedProducts.splice(selectedProducts.indexOf(id), 1);

        this.setState({ selectedProducts });
    }

    handleOnChangeAll(checked) {
        let { selectedProducts, products } = this.state;

        if (checked) {
            selectedProducts = products.reduce((prevArr, currProduct) => {
                prevArr.push(currProduct.id);
                return prevArr;
            }, []);
        } else {
            selectedProducts = [];
        }

        this.setState({ isCheckedAll: checked, selectedProducts: [...selectedProducts] });
    }

    render() {
        const { isCheckedAll, products } = this.state;

        return (
            <div className={style.wrapper}>
                <TagHeader
                    userId={products[0] && products[0].userId}
                    isCheckedAll={isCheckedAll}
                    onChangeHandler={(e) => this.handleOnChangeAll(e.target.checked)}
                />

                <div className={style.body}>
                    {products.map((product, index) => (
                        <ProductTag
                            key={index}
                            product={product}
                            onChangeHandler={(e) => this.handleOnChangeSelect(e, product.id)}
                        />
                    ))}
                </div>

                <ShippingInfo />
            </div>
        );
    }
}

const ShippingInfo = () => {
    return (
        <div className={style.shipping}>
            <i className='fa-solid fa-truck'></i>

            <span>
                <FormattedMessage
                    id='cart.off-shipping'
                    values={{
                        off: CommonUtils.toCurrencyString(25000),
                        from: CommonUtils.toCurrencyString(99000),
                    }}
                />
            </span>

            <span>
                <FormattedMessage id='cart.learn-more' />
            </span>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CartTag);
