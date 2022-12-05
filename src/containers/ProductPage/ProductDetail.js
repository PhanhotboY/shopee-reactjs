import { connect } from 'react-redux';
import { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';

import style from './ProductDetail.module.scss';
import { Link } from 'react-router-dom';
import ThumbnailImages from './Section/ThumbnailImages';
import ProductInfo from './Section/ProductInfo';

class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: this.props.product,
            reviewingImage: 0,
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {
        if (this.props.product !== prevProps.product) {
            this.setState({ product: this.props.product });
        }
    }

    handleHover(imageIndex) {
        this.setState({ reviewingImage: imageIndex });
    }

    render() {
        const { product, reviewingImage } = this.state;

        return (
            <div className={style.wrapper}>
                <div className={`${style.images}`}>
                    <ReviewImage
                        images={product.images}
                        overlay={product.overlay}
                        reviewingImage={reviewingImage}
                    />

                    <ThumbnailImages
                        images={product.images}
                        overlay={product.overlay}
                        reviewingImage={reviewingImage}
                        hoverHandler={this.handleHover.bind(this)}
                    />

                    <div className={style.interactions}>
                        <div className={style.share}>
                            <span>
                                <FormattedMessage id='product.share' />
                            </span>

                            <div className={`${style.app_icon} ${style.fm_icon}`}></div>
                            <div className={`${style.app_icon} ${style.fb_icon}`}></div>
                            <div className={`${style.app_icon} ${style.pinter_icon}`}></div>
                            <div className={`${style.app_icon} ${style.twit_icon}`}></div>
                        </div>

                        <div className={style.liked}>
                            <label>
                                <input type='checkbox' />
                                <i className='fa-solid fa-heart'></i>
                                <i className='fa-regular fa-heart'></i>

                                <span>
                                    <FormattedMessage
                                        id='product.liked'
                                        value={{ like: product.like || 0 }}
                                    />
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <ProductInfo product={product} />
            </div>
        );
    }
}

const ReviewImage = ({ images, reviewingImage, overlay }) => {
    return (
        <div
            className={style.review_img}
            style={{
                background: `url('https://cf.shopee.vn/file/${images[reviewingImage]}') center / contain no-repeat`,
            }}
        >
            {reviewingImage === 0 && (
                <div
                    className={style.overlay}
                    style={{
                        background: `url('https://cf.shopee.vn/file/${overlay}') center / contain no-repeat`,
                    }}
                ></div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
