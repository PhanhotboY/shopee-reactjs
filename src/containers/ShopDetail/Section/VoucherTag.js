import { FormattedMessage } from 'react-intl';

import style from './VoucherTag.module.scss';

const VoucherTag = ({ data }) => {
    return (
        <div className={style.voucher_tag}>
            <div className={style.voucher_info}>
                <span>{data.name}</span>

                <span>Min. Spend 0d</span>

                <span>Specific Product(s)</span>

                <div className={style.total}>
                    <div className={style.process}></div>
                </div>

                <div>
                    <span>64% used</span>
                    <span>Valid Till: 30.11.2022</span>
                </div>
            </div>

            <div className={style.voucher_claim}>
                <button>
                    <FormattedMessage id='shop.claim' />
                </button>
            </div>
        </div>
    );
};

export default VoucherTag;
