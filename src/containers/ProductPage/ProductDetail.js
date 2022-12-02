import { connect } from 'react-redux';
import { Component } from 'react';
import { push } from 'connected-react-router';

import style from './ProductDetail.module.scss';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

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
        const product = this.state.product;

        return (
            <div className={style.wrapper}>
                <div className={`${style.images} col-5`}>
                    <div
                        className={style.preview_img}
                        style={{
                            background: `url('https://cf.shopee.vn/file/${product.images[0]}') center / contain no-repeat`,
                        }}
                    >
                        <div className={style.overlay}></div>
                    </div>

                    <div className={style.thumbnails}>
                        <ul>
                            <li></li>
                        </ul>
                    </div>

                    <div className={style.interactions}>
                        <div className={style.share}>
                            <span>
                                <FormattedMessage id='product.share' />
                            </span>
                            <div className={style.app_icon}></div>
                        </div>

                        <div className={style.liked}>
                            <i className='fa-regular fa-heart'></i>

                            <span>
                                <FormattedMessage
                                    id='product.liked'
                                    value={{ like: product.like || 0 }}
                                />
                            </span>
                        </div>
                    </div>
                </div>

                <div className={`${style.details} col-7`}>hello</div>
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
