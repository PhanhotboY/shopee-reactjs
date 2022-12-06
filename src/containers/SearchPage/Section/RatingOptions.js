import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';

import { history } from '../../../redux';
import style from './RatingOptions.module.scss';

class Rating extends Component {
    constructor(props) {
        super(props);
    }

    handleOnClick(e, numberOfStars) {
        let filterQuery = `rating=${numberOfStars || 0}`;
        let pathname = history.location.pathname + history.location.search;

        if (pathname.match(`rating=`)) {
            const isSamePath = pathname.indexOf(filterQuery) !== -1;
            const replace = `&rating=[^&]*`;
            const regex = new RegExp(replace, 'gi');

            pathname = pathname.replaceAll(regex, '');
            if (isSamePath) {
                return this.props.navigate(pathname);
            }
        }
        this.props.redirectToFilterPage(pathname, filterQuery);
    }

    render() {
        return (
            <>
                <div className={style.option_wrapper} onClick={(e) => this.handleOnClick(e, 5)}>
                    <CountingStar numberOfStars={5} />
                </div>

                <div className={style.option_wrapper} onClick={(e) => this.handleOnClick(e, 4)}>
                    <CountingStar numberOfStars={4} />
                    <span>
                        <FormattedMessage id='search.and-up' />
                    </span>
                </div>

                <div className={style.option_wrapper} onClick={(e) => this.handleOnClick(e, 3)}>
                    <CountingStar numberOfStars={3} />
                    <span>
                        <FormattedMessage id='search.and-up' />
                    </span>
                </div>

                <div className={style.option_wrapper} onClick={(e) => this.handleOnClick(e, 2)}>
                    <CountingStar numberOfStars={2} />
                    <span>
                        <FormattedMessage id='search.and-up' />
                    </span>
                </div>

                <div className={style.option_wrapper} onClick={(e) => this.handleOnClick(e, 1)}>
                    <CountingStar numberOfStars={1} />
                    <span>
                        <FormattedMessage id='search.and-up' />
                    </span>
                </div>
            </>
        );
    }
}

export const CountingStar = ({ numberOfStars = 0 }) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Rating);
