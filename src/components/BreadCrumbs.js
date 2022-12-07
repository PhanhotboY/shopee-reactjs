import { connect } from 'react-redux';
import { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import style from './BreadCrumbs.module.scss';

class BreadCrumbs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            breadcrumbs: this.props.breadcrumbs,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.breadcrumbs !== prevProps.breadcrumbs) {
            this.setState({ breadcrumbs: this.props.breadcrumbs });
        }
    }

    render() {
        const breadcrumbs = this.state.breadcrumbs;

        return (
            <div className={style.wrapper}>
                {breadcrumbs.map((breadcrumb, index) => (
                    <Fragment key={index}>
                        {index !== 0 && <i className='fa-solid fa-chevron-right'></i>}

                        {breadcrumb.link ? (
                            <Link key={index} to={breadcrumb.link}>
                                {breadcrumb.name}
                            </Link>
                        ) : (
                            <span>{breadcrumb.name}</span>
                        )}
                    </Fragment>
                ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumbs);
