import { connect } from 'react-redux';
import { Component } from 'react';

import style from './SearchContent.module.scss';
import TagList from 'components/TagList';
import ProductTag from 'containers/HomeContent/Section/ProductTag';
import { FormattedMessage } from 'react-intl';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: this.props.products,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.products !== prevProps.products) {
            this.setState({ products: this.props.products });
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
                    '<span>{this.props.keyword}</span>'
                </div>

                <TagList items={this.state.products}>
                    <ProductTag col='20pc' isHoverHighLight={true} />
                </TagList>
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
