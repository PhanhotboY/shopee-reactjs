import { connect } from 'react-redux';
import { Component } from 'react';

import { CommonUtils } from 'utils';
import SearchSideBar from './SearchSideBar';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {
        const search = window.location.search;
        this.searchObj = CommonUtils.splitQueryIntoObj(search);
    }

    render() {
        return (
            <div className='row'>
                <SearchSideBar />

                <i className='fa-regular fa-lightbulb'></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
