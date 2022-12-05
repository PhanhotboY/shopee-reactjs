import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import style from '../Purchase.module.scss';

const PurchaseHeader = ({ currPage }) => {
    return (
        <div className={style.header}>
            <Link className={currPage === '0' ? style['link--active'] : undefined} to='?type=0'>
                <span>
                    <FormattedMessage id='common.all' />
                </span>
            </Link>
            <Link className={currPage === '1' ? style['link--active'] : undefined} to='?type=1'>
                <span>
                    <FormattedMessage id='user.purchase.to-pay' />
                </span>
            </Link>
            <Link className={currPage === '2' ? style['link--active'] : undefined} to='?type=2'>
                <span>
                    <FormattedMessage id='user.purchase.to-ship' />
                </span>
            </Link>
            <Link className={currPage === '3' ? style['link--active'] : undefined} to='?type=3'>
                <span>
                    <FormattedMessage id='user.purchase.to-receive' />
                </span>
            </Link>
            <Link className={currPage === '4' ? style['link--active'] : undefined} to='?type=4'>
                <span>
                    <FormattedMessage id='user.purchase.completed' />
                </span>
            </Link>
            <Link className={currPage === '5' ? style['link--active'] : undefined} to='?type=5'>
                <span>
                    <FormattedMessage id='user.purchase.canceled' />
                </span>
            </Link>
            <Link className={currPage === '6' ? style['link--active'] : undefined} to='?type=6'>
                <span>
                    <FormattedMessage id='user.purchase.return-refund' />
                </span>
            </Link>
        </div>
    );
};

export default PurchaseHeader;
