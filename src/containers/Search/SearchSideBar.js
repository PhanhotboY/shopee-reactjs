import { connect } from 'react-redux';
import { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import style from './SearchSideBar.module.scss';

class SearchSideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${style.wrapper} col-2`}>
                <div className={style.header}>
                    <i className='fa-solid fa-filter'></i>
                    <span>
                        <FormattedMessage id='search.search-filter' />
                    </span>
                </div>

                <div className={style.body}>
                    <div className={style.category}>
                        <span>
                            <FormattedMessage id='search.by-category' />
                        </span>

                        <div className={style.options}>
                            <label>
                                <input type='checkbox' />
                                <span>keyboard</span>
                            </label>

                            <label>
                                <input type='checkbox' />
                                <span>keyboard</span>
                            </label>
                        </div>
                    </div>

                    <div className={style.category}>
                        <span>
                            <FormattedMessage id='search.by-category' />
                        </span>

                        <div className={style.options}>
                            <label>
                                <input type='checkbox' />
                                <span>keyboard</span>
                            </label>

                            <label>
                                <input type='checkbox' />
                                <span>keyboard</span>
                            </label>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchSideBar);
