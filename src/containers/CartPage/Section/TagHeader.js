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
            userInfo: {},
        };
    }

    async componentDidMount() {
        try {
            const res = await userService.handleGetUser(this.props.userId);

            if (res && !res.errType) {
                await this.setState({ userInfo: res.userInfo });
            }
        } catch (error) {
            console.log(error);
        }
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
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TagHeader);
