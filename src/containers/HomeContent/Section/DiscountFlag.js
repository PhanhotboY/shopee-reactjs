import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import style from './DiscountFlag.module.scss';

class DiscountFlag extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { discount } = this.props;

        return (
            <div className={style.discount_flag}>
                {discount}%{' '}
                <span>
                    <FormattedMessage id='body.discount' />
                </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscountFlag);
