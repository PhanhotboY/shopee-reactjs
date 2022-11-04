import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'store/actions';
import './HomeContent.scss';
import Banner from './Section/Banner';
import Category from './Category';
import FlashSale from './FlashSale';
import ShopMall from './ShopMall';
import TopSearch from './TopSearch';
import ProductList from './ProductList';

class HomeContent extends Component {
    render() {
        const linkList = ['#', '/', '#'];
        const topBannerImg = '3bd07c36ac8112697c5c0a44c620a838';
        const subBannerImg = 'b7d2862cf4498bfe9bea57af959983fe';

        return (
            <>
                <Banner linkList={linkList} image={topBannerImg} />

                <Category />

                <FlashSale />

                <Banner linkList={linkList} image={subBannerImg} />

                <ShopMall />

                <TopSearch />

                <ProductList />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
