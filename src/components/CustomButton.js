import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import './CustomButton.scss';

class CustomButton extends Component {
    constructor(props) {
        super(props);
    }

    /**props:
     * form
     * disabled
     * type
     * onClick
     * action
     */
    render() {
        const { form, disabled, onClick, type } = this.props;

        return (
            <button
                className='custom_button'
                form={form}
                disabled={disabled}
                type={type || 'button'}
                onClick={disabled ? () => {} : onClick}
                style={
                    disabled
                        ? {
                              opacity: 0.5,
                              pointerEvents: 'none',
                          }
                        : {}
                }
            >
                <FormattedMessage id={this.props.action} />
            </button>
        );
    }
}

export default CustomButton;
