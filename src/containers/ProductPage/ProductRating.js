import { connect } from 'react-redux';
import { Component } from 'react';

import style from './ProductRating.module.scss';
import { FormattedMessage } from 'react-intl';
import RatingStar from './Section/RatingStar';

class ProductRating extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const product = this.props.product;

        return (
            <div className={style.wrapper}>
                <div className={style.header}>
                    <span>
                        <FormattedMessage id='product.product-ratings' />
                    </span>
                </div>

                <div className={`row ${style.rating_option}`}>
                    <div className={`${style.rating_star} col-2`}>
                        <div>
                            <span>{product.rating || 4.4}</span>

                            <span>
                                <FormattedMessage id='product.out-of-5' />
                            </span>
                        </div>

                        <RatingStar rating={product.rating || 4.4} height={20} />
                    </div>

                    <div className={`${style.options} col-10`}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductRating);
