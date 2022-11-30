import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductTag from 'containers/HomeContent/Section/ProductTag';
import TagList from 'components/TagList';

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
        };
    }

    async componentDidMount() {
        await this.setState({
            products: this.props.products || [],
        });
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.products !== prevProps.products) {
            await this.setState({ products: this.props.products || [] });
        }
    }

    render() {
        return (
            <TagList items={this.state.products}>
                <ProductTag col='20pc' address={this.props.address} />
            </TagList>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
