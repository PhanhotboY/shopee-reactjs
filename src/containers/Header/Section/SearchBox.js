import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './SearchBox.module.scss';

class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFocusInput: false,
            searchInputText: '',
        };
    }

    componentDidMount() {}

    handleSubmitForm(event) {
        event.preventDefault();
    }

    handleOnChangeInput(event) {
        this.setState({ searchInputText: event.target.value });
    }

    toggleRecentList() {
        document.getElementById('search_form').classList.toggle(style.input_outline);
        this.setState({ isFocusInput: !this.state.isFocusInput });
    }

    render() {
        return (
            <div className={style.search_container}>
                <div className={style['searchBox']}>
                    <SearchInput
                        searchInputText={this.state.searchInputText}
                        handleOnChangeInput={this.handleOnChangeInput.bind(this)}
                        handleSubmitForm={this.handleSubmitForm}
                        toggleRecentList={this.toggleRecentList.bind(this)}
                    />

                    <button type='submit' form='search_form'>
                        <i className='fa-solid fa-magnifying-glass'></i>
                    </button>

                    {this.state.isFocusInput && <RecentSearchList />}
                </div>

                <TrendingSearchList />
            </div>
        );
    }
}

const SearchInput = ({
    searchInputText,
    handleOnChangeInput,
    handleSubmitForm,
    toggleRecentList,
}) => {
    return (
        <form id='search_form' onSubmit={handleSubmitForm}>
            <input
                type='text'
                name='search'
                placeholder='Đăng ký và nhận voucher bạn mới đến 70k!'
                autoComplete='off'
                value={searchInputText}
                onChange={handleOnChangeInput}
                onFocus={toggleRecentList}
                onBlur={toggleRecentList}
            />
        </form>
    );
};

const RecentSearchList = ({ keywords = ['PhanhotboY'] }) => {
    return (
        <div className={style.recent_search_list}>
            <a href='/?search=Đăng ký và nhận voucher bạn mới đến 70k!'>
                <span>Đăng ký và nhận voucher bạn mới đến 70k!</span>
                <img src='https://cf.shopee.vn/file/e92ab33ccea0695b22219c8a152d9f61' height='24' />
            </a>
            {keywords.map((keyword, index) => {
                if (index >= 10) return;
                return <RecentSearchKeyword keyword={keyword} key={index} />;
            })}
        </div>
    );
};

const RecentSearchKeyword = ({ keyword }) => {
    return (
        <a href='/?search=PhanhotboY'>
            <span>{keyword}</span>
        </a>
    );
};

const TrendingSearchList = ({ trendingSearches = ['phan dep trai', 'deo co gi de cai'] }) => {
    return (
        <div className={style['trending_search_list']}>
            {trendingSearches.map((keyword, index) => (
                <a href='#' key={index}>
                    {keyword}
                </a>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
