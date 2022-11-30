import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProductTag from 'containers/HomeContent/Section/ProductTag';

class TagList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items || [],
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.items !== prevProps.items) {
            await this.setState({ items: this.props.items || [] });
        }
    }

    /**Props
     * col: [1-12] (default: 12)
     * items: array object
     * chilren: component format tag
     */
    render() {
        return (
            <div className={`col-${this.props.col || 12}`}>
                <ul className={`row`}>
                    {this.state.items.map((item, index) =>
                        React.cloneElement(this.props.children || <ProductTag />, {
                            key: index,
                            data: item,
                        })
                    )}
                </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(TagList);
