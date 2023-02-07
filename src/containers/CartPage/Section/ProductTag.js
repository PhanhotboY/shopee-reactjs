import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { CommonUtils } from 'utils';
import style from './ProductTag.module.scss';
import CustomCheckbox from 'components/CustomCheckbox';
import Counter from 'components/Counter';
import { Link } from 'react-router-dom';

class CartTag extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: this.props.product,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.product !== prevProps.product) {
            this.setState({ product: this.props.product });
        }
    }

    render() {
        const { product } = this.state;

        return (
            <div className={style.wrapper}>
                <div>
                    <CustomCheckbox onChange={this.props.onChangeHandler} />

                    <Link to={`/products/${product.id}`}>
                        <img src={`https://cf.shopee.vn/file/${product.images[0]}`} />
                    </Link>

                    <Link to={`/products/${product.id}`}>
                        <div className={style.title}>
                            <span>{product.title}</span>
                        </div>
                    </Link>
                </div>

                <div>
                    <div className={style.price}>
                        {Boolean(product.discount) && (
                            <div className={style.original_price}>
                                {CommonUtils.toCurrencyString(product.originPrice)}
                            </div>
                        )}

                        <div>
                            {CommonUtils.toCurrencyString(
                                CommonUtils.getDiscountedPrice(
                                    product.originPrice,
                                    product.discount
                                )
                            )}
                        </div>
                    </div>

                    <Counter
                        value={product.quantity}
                        max={product.totalRamainder}
                        onChangeHandler={(value) => {
                            product.quantity = value;
                        }}
                    />

                    <div className={style.total_price}>
                        {CommonUtils.toCurrencyString(
                            product.quantity *
                                CommonUtils.getDiscountedPrice(
                                    product.originPrice,
                                    product.discount
                                )
                        )}
                    </div>

                    <div className={style.actions}>
                        <span>
                            <FormattedMessage id='common.delete' />
                        </span>

                        <span>
                            <FormattedMessage id='cart.find-similar' />

                            <i className='fa-solid fa-caret-down'></i>
                        </span>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartTag);
