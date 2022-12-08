import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import style from './ProductRating.module.scss';
import RatingStar from './Section/RatingStar';
import RatingContainer from './Section/RatingContainer';

class ProductRating extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currOption: 0,
        };
    }

    handleOnClickOption(index) {
        this.setState({ currOption: index });
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

                <div className={`${style.rating_option}`}>
                    <div className={`${style.rating_star}`}>
                        <div>
                            <span>{product.rating || 4.4}</span>

                            <span>
                                <FormattedMessage id='product.out-of-5' />
                            </span>
                        </div>

                        <RatingStar rating={product.rating || 4.4} height={20} />
                    </div>

                    <RatingOptions
                        currOption={this.state.currOption}
                        onClickHandler={this.handleOnClickOption.bind(this)}
                    />
                </div>

                <RatingContainer />
            </div>
        );
    }
}

const RatingOptions = ({ currOption, onClickHandler }) => {
    const options = [
        { name: 'product.all', values: {} },
        { name: 'product.star', values: { star: 5, count: 0 } },
        { name: 'product.star', values: { star: 4, count: 0 } },
        { name: 'product.star', values: { star: 3, count: 0 } },
        { name: 'product.star', values: { star: 2, count: 0 } },
        { name: 'product.star', values: { star: 1, count: 0 } },
        { name: 'product.with-comments', values: { count: 0 } },
        { name: 'product.with-media', values: { count: 0 } },
    ];

    return (
        <div className={`${style.options}`}>
            {options.map((option, index) => (
                <div
                    key={index}
                    className={`${style.option} ${
                        currOption === index ? style['option--active'] : ''
                    }`}
                    onClick={() => onClickHandler(index)}
                >
                    <span>
                        <FormattedMessage id={option.name} values={option.values} />
                    </span>
                </div>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductRating);
