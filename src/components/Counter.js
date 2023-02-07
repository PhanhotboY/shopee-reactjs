import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import style from './Counter.module.scss';

class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({ value: this.props.value });
        }
    }

    handleUpDownQuantity(action) {
        let value = this.state.value;
        const total = this.props.max;

        if (action === 'add') value = ++value - (value === total + 1);
        if (action === 'sub') value = --value + !value;

        this.props.onChangeHandler(value);
    }

    handleAdjustQuantity(e) {
        let value = e.target.value;
        const total = this.props.max;

        if (value > total) value = total;
        if (value < 1) value = '';

        this.props.onChangeHandler(value);
    }

    handleOnBlur(e) {
        let value = e.target.value;

        if (value < 1 || value === '') value = 1;

        this.props.onChangeHandler(value);
    }

    render() {
        return (
            <div className={style.counter}>
                <button type='button' onClick={() => this.handleUpDownQuantity('sub')}>
                    -
                </button>
                <input
                    type='number'
                    value={this.state.value}
                    onChange={this.handleAdjustQuantity.bind(this)}
                    onBlur={this.handleOnBlur.bind(this)}
                />
                <button type='button' onClick={() => this.handleUpDownQuantity('add')}>
                    +
                </button>
            </div>
        );
    }
}

export default Counter;
