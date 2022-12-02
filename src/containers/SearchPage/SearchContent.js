import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import style from './SearchContent.module.scss';
import Filter from 'components/Filter';
import TagList from 'components/TagList';
import ProductTag from 'containers/HomeContent/Section/ProductTag';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: this.props.products,
            queryObj: this.props.queryObj,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.products !== prevProps.products) {
            this.setState({ products: this.props.products });
        }
        if (this.props.queryObj !== prevProps.queryObj) {
            this.setState({ queryObj: this.props.queryObj });
        }
    }

    render() {
        return (
            <div className={`${style.wrapper} col-10`}>
                <div className={style.notify}>
                    <i className='fa-regular fa-lightbulb'></i>
                    <span>
                        <FormattedMessage id='search.search-result-for' />
                    </span>
                    '<span>{this.state.queryObj.keyword}</span>'
                </div>

                <Filter items={this.state.products} isDisplayHeader={true}>
                    <TagList>
                        <ProductTag col='20pc' isHoverHighLight={true} />
                    </TagList>
                </Filter>
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
