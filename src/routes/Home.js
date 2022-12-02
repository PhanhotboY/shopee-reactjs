import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeBanner from '../containers/HomeBanner';
import HomeContent from '../containers/HomeContent';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='wrapper'>
                <div className='grid'>
                    <HomeBanner />
                    <HomeContent />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
