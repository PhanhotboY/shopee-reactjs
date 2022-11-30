import { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CustomButton from 'components/CustomButton';

import style from './PriceRangeInput.module.scss';

class PriceRangeInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className={style.input_group}>
                    <FormattedMessage id='search.min-price'>
                        {(trans) => <input type='number' placeholder={trans} />}
                    </FormattedMessage>

                    <div className={style.spliter}></div>

                    <FormattedMessage id='search.max-price'>
                        {(trans) => <input type='number' placeholder={trans} />}
                    </FormattedMessage>
                </div>

                <CustomButton action='search.apply' />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PriceRangeInput);
