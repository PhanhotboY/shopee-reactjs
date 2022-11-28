import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import style from './ProductList.module.scss';
import ProductTag from 'containers/HomeContent/Section/ProductTag';

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
            <ul className={`row ${style.wrapper}`}>
                {this.state.products.map((product, index) => (
                    <ProductTag
                        key={index}
                        product={product}
                        col='col-20pc'
                        address={this.props.address}
                    />
                ))}
            </ul>
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
