import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import './CustomButton.scss';

class CustomButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                className='custom_button'
                form={this.props.form}
                disabled={this.props.isDisabled}
                type={this.props.type || 'button'}
                onClick={this.props.onClickHandler}
                style={{
                    cursor: this.props.isDisabled && 'not-allowed',
                }}
            >
                <FormattedMessage id={this.props.action} />
            </button>
        );
    }
}

export default CustomButton;
