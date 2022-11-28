const formatterCurrencyString = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'VND',
});

const CommonUtils = {
    toCurrencyString(number) {
        return formatterCurrencyString.format(number).replace(/,/g, '.');
    },

    toThousandUnitString(number = 0, precision = 0) {
        if ((Number(number) || 0) < 1000) return number;

        return (
            (Math.floor(((Number(number) || 0) * 10 ** precision) / 1000) / (10 ** precision || 1))
                .toString()
                .replace('.', ',') + 'k'
        );
    },

    getPercentNumber(percentString) {
        return Number(percentString.slice(0, -1)) / 100;
    },

    getDiscountedPrice(origin, discount) {
        const discountedPrice = origin - origin * discount;
        return discountedPrice >= 0 ? discountedPrice : 0;
    },
};

export default CommonUtils;
