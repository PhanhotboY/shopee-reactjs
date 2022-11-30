import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import style from './RatingOptions.module.scss';

class Rating extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className={style.option_wrapper}>
                    <CountingStar numberOfStars={5} />
                </div>

                <div className={style.option_wrapper}>
                    <CountingStar numberOfStars={4} />
                    <span>
                        <FormattedMessage id='search.and-up' />
                    </span>
                </div>

                <div className={style.option_wrapper}>
                    <CountingStar numberOfStars={3} />
                    <span>
                        <FormattedMessage id='search.and-up' />
                    </span>
                </div>

                <div className={style.option_wrapper}>
                    <CountingStar numberOfStars={2} />
                    <span>
                        <FormattedMessage id='search.and-up' />
                    </span>
                </div>

                <div className={style.option_wrapper}>
                    <CountingStar numberOfStars={1} />
                    <span>
                        <FormattedMessage id='search.and-up' />
                    </span>
                </div>
            </>
        );
    }
}

const CountingStar = ({ numberOfStars = 0 }) => {
    const stars = [];

    for (let i = 0; i < numberOfStars; i++) {
        stars.push(<i key={i} className='fa-solid fa-star'></i>);
    }

    return (
        <div className={style.star_container}>
            {stars}

            <i className='fa-regular fa-star'></i>
            <i className='fa-regular fa-star'></i>
            <i className='fa-regular fa-star'></i>
            <i className='fa-regular fa-star'></i>
            <i className='fa-regular fa-star'></i>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
