import { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import style from './TagHeader.module.scss';
import CustomCheckbox from 'components/CustomCheckbox';
import { userService } from 'services';

class TagHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInfo: this.props.userInfo,
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userInfo !== this.props.userInfo)
            this.setState({ userInfo: this.props.userInfo });
    }

    render() {
        const { firstName, lastName, id } = this.state.userInfo;
        const { isCheckedAll, onChangeHandler } = this.props;

        return (
            <div className={style.tag_header}>
                <CustomCheckbox checked={isCheckedAll} onChange={(e) => onChangeHandler(e, id)} />

                <Link to={`/shops/${id}`}>
                    <i className='fa-solid fa-store'></i>

                    <span>
                        {firstName} {lastName}
                    </span>
                </Link>

                <i className='fa-solid fa-comments'></i>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TagHeader);
