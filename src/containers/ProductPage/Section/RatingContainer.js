import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import style from './RatingContainer.module.scss';
import RatingStar from './RatingStar';

class RatingContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ratings: [
                {
                    avatar: '234fe1c1600b2ef0b00e1a7f0619de72',
                    firstName: 'Phan',
                    lastName: 'Hot Boy',
                    rating: 1,
                    createdAt: '2022-12-08 09:23',
                    content: 'Very good!',
                    images: [
                        '1968c3bc14d8eb9aafb9532b30be713a',
                        '3485b745b73adcd2e076f1a748eb7811',
                    ],
                    reply: [{}],
                },
            ],
        };
    }

    render() {
        const ratings = this.state.ratings;

        return (
            <div className={style.wrapper}>
                {ratings.length ? <RatingList ratings={ratings} /> : <RatingEmpty />}
            </div>
        );
    }
}

const RatingList = ({ ratings }) => {
    return (
        <ul className={`row`}>
            {ratings.map((rating, index) => (
                <RatingTag key={index} rating={rating} />
            ))}
        </ul>
    );
};

const RatingTag = ({ rating }) => {
    return (
        <li className={`${style.rating_tag} col-12`}>
            <div
                className={style.avatar}
                style={{
                    background: `url('https://cf.shopee.vn/file/${rating.avatar}') center / cover no-repeat`,
                }}
            ></div>

            <div className={style.body}>
                <span>
                    {rating.firstName} {rating.lastName}
                </span>

                <div className={style.rating_star}>
                    <RatingStar rating={rating.rating} />
                </div>

                <span>{rating.createdAt}</span>

                {rating.content && <p>{rating.content}</p>}

                {rating.images && rating.images[0] && (
                    <div className={`row ${style.review_image}`}>
                        {rating.images.map((image, index) => (
                            <div
                                key={index}
                                className='col-1'
                                style={{
                                    background: `url('https://cf.shopee.vn/file/${image}') center / cover no-repeat`,
                                }}
                            ></div>
                        ))}
                    </div>
                )}

                {rating.reply && rating.reply[0] && (
                    <div className={`row ${style.reply}`}>
                        {rating.reply.map((rep, index) => (
                            <div key={index} className='col-12'>
                                <span>
                                    <FormattedMessage id='product.seller-response' />
                                </span>

                                <p>Thank you for using our service!</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className={style.helpful}>
                    <i className='fa-solid fa-thumbs-up'></i>

                    <span>
                        <FormattedMessage id='product.helpful' />
                    </span>
                </div>
            </div>
        </li>
    );
};

const RatingEmpty = () => {
    return (
        <div className={style.rating_empty}>
            <img src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/eac95a8ac896158642c2761a9e9cd52e.png' />

            <span>
                <FormattedMessage id='product.no-rating-yet' />
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

export default connect(mapStateToProps, mapDispatchToProps)(RatingContainer);
