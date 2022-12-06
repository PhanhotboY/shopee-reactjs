import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import style from './ProductImages.module.scss';
import ThumbnailImages from './ThumbnailImages';
import ReviewModal from './ReviewModal';

class ProductImages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: this.props.product,
            reviewingImage: 0,
            displayModal: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.product !== prevProps.product) {
            this.setState({ product: this.props.product });
        }

        if (this.state.displayModal !== prevState.displayModal) {
            document.body.style.overflow = this.state.displayModal ? 'hidden' : 'unset';
        }
    }

    handleHover(imageIndex) {
        this.setState({ reviewingImage: imageIndex });
    }

    render() {
        const { product, reviewingImage } = this.state;

        return (
            <div className={`${style.wrapper}`}>
                <ReviewImage
                    images={product.images}
                    overlay={product.overlay}
                    reviewingImage={reviewingImage}
                    toggleModalHandler={() => this.setState({ displayModal: true })}
                />

                <ThumbnailImages
                    images={product.images}
                    overlay={product.overlay}
                    reviewingImage={reviewingImage}
                    hoverHandler={this.handleHover.bind(this)}
                    toggleModalHandler={() => this.setState({ displayModal: true })}
                />

                <Interaction liked={product.like} />

                {this.state.displayModal && (
                    <div
                        className={style.modal_wrapper}
                        onClick={() => this.setState({ displayModal: false })}
                    >
                        <ReviewModal
                            images={product.images}
                            title={product.title}
                            reviewingImage={reviewingImage}
                        />
                    </div>
                )}
            </div>
        );
    }
}

const ReviewImage = ({ images, reviewingImage, overlay, toggleModalHandler }) => {
    return (
        <div
            className={style.review_img}
            style={{
                background: `url('https://cf.shopee.vn/file/${images[reviewingImage]}') center / contain no-repeat`,
            }}
            onClick={toggleModalHandler}
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

const Interaction = ({ liked = 0 }) => {
    return (
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
                        <FormattedMessage id='product.liked' value={{ like: liked }} />
                    </span>
                </label>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductImages);
