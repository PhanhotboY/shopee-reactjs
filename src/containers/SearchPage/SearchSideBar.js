import { connect } from 'react-redux';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { CommonUtils } from 'utils';
import { history } from '../../redux';
import { push } from 'connected-react-router';
import style from './SearchSideBar.module.scss';
import CustomButton from 'components/CustomButton';
import RatingOptions from './Section/RatingOptions';
import PriceRangeInput from './Section/PriceRangeInput';

class SearchSideBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            queryObj: this.props.queryObj,
        };
    }

    async componentDidMount() {
        await handleDropDown();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.queryObj !== prevProps.queryObj) {
            await this.setState({ queryObj: this.props.queryObj });
        }
    }

    clearFilterHandler() {
        const { keyword, order, sortBy } = this.state.queryObj;

        const nonFilterQueryString = CommonUtils.toQueryString({
            keyword,
            [order ? 'order' : '']: order ?? '',
            [sortBy ? 'sortBy' : '']: sortBy ?? '',
        });

        this.props.navigate('/search' + nonFilterQueryString);
    }

    handleOnChange(e) {
        let filterQuery = `${e.target.name}=${encodeURIComponent(e.target.value)}`;
        let pathname = history.location.pathname + history.location.search;

        if (pathname.match(`${e.target.name}=`)) {
            const isSamePath = pathname.indexOf(filterQuery) !== -1;
            const replace = `&${e.target.name}=[^&]*`;
            const regex = new RegExp(replace, 'gi');

            pathname = pathname.replaceAll(regex, '');
            if (isSamePath) {
                return this.props.navigate(pathname);
            }
        }
        this.redirectToFilterPage(pathname, filterQuery);
    }

    redirectToFilterPage(pathname, filterQuery) {
        const redirectPath = pathname + (pathname.indexOf('?') === -1 ? '?' : '&') + filterQuery;

        this.props.navigate(redirectPath);
    }

    render() {
        Category.queryObj = this.state.queryObj;
        Category.onChangeHandler = this.handleOnChange.bind(this);

        return (
            <div className={`${style.wrapper}`}>
                <div className={style.header}>
                    <i className='fa-solid fa-filter'></i>
                    <span>
                        <FormattedMessage id='search.search-filter' />
                    </span>
                </div>

                <div className={style.body}>
                    <Category
                        title='search.by-category'
                        name='category'
                        options={this.props.categoryOptions}
                    />

                    <Category
                        title='search.shipped-from'
                        name='address'
                        options={this.props.addressOptions}
                    />

                    <Category
                        title='search.brands'
                        name='brand'
                        options={this.props.brandOptions}
                    />

                    <Category title='search.price-range'>
                        <PriceRangeInput
                            queryObj={this.state.queryObj}
                            redirectToFilterPage={this.redirectToFilterPage.bind(this)}
                        />
                    </Category>

                    <Category
                        title='search.shop-type'
                        name='shopType'
                        options={this.props.shopTypeOptions}
                    />

                    <Category title='search.rating' name='rating'>
                        <RatingOptions
                            redirectToFilterPage={this.redirectToFilterPage.bind(this)}
                        />
                    </Category>

                    <CustomButton
                        action='search.clear-all'
                        onClick={this.clearFilterHandler.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

const Category = ({ title, name, options = [], children }) => {
    return (
        <div className={style.category}>
            <span>
                <FormattedMessage id={title} />
            </span>

            <div className={style.options}>
                {options.map((option, index) => (
                    <label key={index}>
                        <input
                            name={name}
                            value={option}
                            type='checkbox'
                            checked={Category.queryObj && Category.queryObj[name] === option}
                            onChange={Category.onChangeHandler}
                        />
                        <span>{option}</span>
                    </label>
                ))}

                {children}
            </div>

            <DropDownBtn />
        </div>
    );
};

const DropDownBtn = ({}) => {
    return (
        <div className={style.dropdown}>
            <span>
                <FormattedMessage id='search.more' />
            </span>
            <i className='fa-solid fa-chevron-down'></i>
        </div>
    );
};

const handleDropDown = () => {
    const optionContainers = document.querySelectorAll(`.${style.category} .${style.options}`);

    optionContainers.forEach((optionContainer) => {
        const options = optionContainer.querySelectorAll(`:scope > *`);

        if (options.length > 4) {
            for (let i = 4; i < options.length; i++) {
                options[i].classList.add('d-none');
            }

            const dropDownBtn = optionContainer.nextElementSibling;
            dropDownBtn.classList.add('d-block');
            dropDownBtn.onclick = () => {
                options.forEach((option) => {
                    option.classList.remove('d-none');
                    dropDownBtn.classList.remove('d-block');
                });
            };
        }
    });
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchSideBar);
