import { connect } from 'react-redux';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { push } from 'connected-react-router';

import { CommonUtils } from 'utils';
import { history } from '../../redux';
import style from './index.module.scss';

class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.items,
            filterObj: {},
            sortBy: 'id',
            order: 'asc',
        };
    }

    async componentDidMount() {
        const { order, sortBy, keyword, ...filterObj } = await CommonUtils.splitQueryIntoObj(
            window.location.search
        );
        await this.setState({ filterObj, order: order || 'asc', sortBy: sortBy || 'id' });
        await this.filterItems();

        this.unlisten = history.listen(async (location) => {
            const { order, sortBy, keyword, ...filterObj } = await CommonUtils.splitQueryIntoObj(
                location.search
            );
            this.setState({ filterObj, order: order || 'asc', sortBy: sortBy || 'id' });

            await this.filterItems();
        });
    }

    componentWillUnmount() {
        if (this.unlisten) this.unlisten();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            await this.filterItems();
        }
    }

    async filterItems() {
        this.filteredItems = await filteringItems(this.props.items, this.state.filterObj);
        this.orderedItems = await orderingItems(
            this.filteredItems,
            this.state.sortBy,
            this.state.order
        );

        this.setState({ items: this.orderedItems });
    }

    redirectWithQuery(query) {
        let pathname = history.location.pathname + history.location.search;

        if (pathname.match(query)) {
            const regex0 = /\?order=[a-z]*&/gi;
            const regex = /[&?]order=[a-z]*/gi;

            const order = this.state.order === 'asc' ? 'desc' : 'asc';

            if (pathname.match(regex0)) pathname = pathname.replace(regex0, '?');

            pathname = pathname.replaceAll(regex, '');
            pathname += (pathname.indexOf('?') === -1 ? '?order=' : '&order=') + order;
        }

        const [key] = query.split('=');
        if (pathname.indexOf(key) !== -1) {
            const replace0 = `\\?${key}=[a-z]*&`;
            const regex0 = new RegExp(replace0, 'gi');
            const replace = `[&?]${key}=[a-z]*`;
            const regex = new RegExp(replace, 'gi');

            if (pathname.match(regex0)) pathname = pathname.replace(regex0, '?');
            console.log(pathname);
            pathname = pathname.replaceAll(regex, '');
        }

        const redirectPath = pathname + (pathname.indexOf('?') === -1 ? '?' : '&') + query;

        this.props.navigate(redirectPath);
    }

    render() {
        return (
            <div className={`${style.wrapper} col-${this.props.col || 12}`}>
                {this.props.isDisplayHeader && (
                    <FilterHeader redirectWithQuery={this.redirectWithQuery.bind(this)} />
                )}

                {React.cloneElement(this.props.children, { items: this.state.items })}
            </div>
        );
    }
}

const FilterHeader = ({ redirectWithQuery }) => {
    return (
        <div className={style.header}>
            <div className={style.filter}>
                <span>
                    <FormattedMessage id='shop.sort-by' />
                </span>

                <div onClick={() => redirectWithQuery('sortBy=sold')}>
                    <FormattedMessage id='shop.popular' />
                </div>

                <div onClick={() => redirectWithQuery('sortBy=createdAt')}>
                    <FormattedMessage id='shop.latest' />
                </div>

                <div onClick={() => redirectWithQuery('sortBy=discount')}>
                    <FormattedMessage id='shop.discount' />
                </div>

                <select
                    onChange={(e) => {
                        redirectWithQuery(`sortBy=originPrice`);
                        redirectWithQuery(`order=${e.target.value}`);
                    }}
                    defaultValue='default'
                >
                    <FormattedMessage id='shop.price'>
                        {(trans) => (
                            <option value='default' disabled selected hidden>
                                {trans}
                            </option>
                        )}
                    </FormattedMessage>

                    <FormattedMessage id='shop.price-low-to-high'>
                        {(trans) => <option value='asc'>{trans}</option>}
                    </FormattedMessage>

                    <FormattedMessage id='shop.price-high-to-low'>
                        {(trans) => <option value='desc'>{trans}</option>}
                    </FormattedMessage>
                </select>
            </div>

            <div className={style.pagination}>
                <span>{1}</span>/<span>{3}</span>
                <div>
                    <button>
                        <i className='fa-solid fa-chevron-left'></i>
                    </button>
                    <button>
                        <i className='fa-solid fa-chevron-right'></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

const filteringItems = (items, filterObj) => {
    let filteredItems = [];

    if (!filterObj || Object.keys(filterObj).length === 0) {
        return [...items];
    }

    items.forEach((item) => {
        let isValidItem = true;

        for (const [attribute, value] of Object.entries(filterObj)) {
            if (item[attribute] != value) {
                isValidItem = false;
                break;
            }
        }

        if (isValidItem) filteredItems.push(item);
    });

    return filteredItems;
};

const orderingItems = (items, attribute, order) => {
    if (!items.length || (order !== 'asc' && order !== 'desc')) return [...items];

    const orderedItems = items.sort((a, b) => {
        if (a[attribute] > b[attribute]) {
            return 1;
        }
        if (a[attribute] < b[attribute]) {
            return -1;
        }
        return 0;
    });

    if (order === 'desc') orderedItems.reverse();

    return orderedItems;
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
