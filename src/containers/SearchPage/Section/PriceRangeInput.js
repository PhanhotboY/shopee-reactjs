import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CustomButton from 'components/CustomButton';

import { history } from '../../../redux';
import style from './PriceRangeInput.module.scss';

class PriceRangeInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            minPrice: Number(this.props.queryObj.minPrice) || '',
            maxPrice: Number(this.props.queryObj.maxPrice) || '',
        };
    }

    handlerOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleOnClick() {
        let filterQuery;
        let filterQueryMin = this.state.minPrice !== '' ? `minPrice=${this.state.minPrice}` : '';
        let filterQueryMax = this.state.maxPrice !== '' ? `maxPrice=${this.state.maxPrice}` : '';
        let pathname = history.location.pathname + history.location.search;

        const regex = /(&minPrice=[^&]*)|(&maxPrice=[^&]*)/gi;
        if (pathname.match(regex)) {
            pathname = pathname.replaceAll(regex, '');
            pathname = pathname.replaceAll(/&+/gi, '&');
        }

        filterQuery = filterQueryMin || filterQueryMax;
        if (filterQueryMax !== '' && filterQueryMin !== '')
            filterQuery = filterQueryMin + '&' + filterQueryMax;

        this.props.redirectToFilterPage(pathname, filterQuery);
    }

    render() {
        return (
            <>
                <div className={style.input_group}>
                    <FormattedMessage id='search.min-price'>
                        {(trans) => (
                            <input
                                type='number'
                                name='minPrice'
                                value={this.state.minPrice}
                                placeholder={trans}
                                onChange={this.handlerOnChange.bind(this)}
                            />
                        )}
                    </FormattedMessage>

                    <div className={style.spliter}></div>

                    <FormattedMessage id='search.max-price'>
                        {(trans) => (
                            <input
                                type='number'
                                name='maxPrice'
                                value={this.state.maxPrice}
                                placeholder={trans}
                                onChange={this.handlerOnChange.bind(this)}
                            />
                        )}
                    </FormattedMessage>
                </div>

                <CustomButton
                    action='search.apply'
                    isDisabled={!this.state.minPrice && !this.state.maxPrice}
                    onClickHandler={this.handleOnClick.bind(this)}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceRangeInput);
