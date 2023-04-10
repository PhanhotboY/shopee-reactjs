export default function getCardImage(type) {
    switch (type) {
        case 'visa':
            return '/visa.png';
        case 'mastercard':
            return '/mastercard.png';
        // case "amex":
        //   return americanexpress;
        // case "diners club":
        //   return dinersclub;
        // case "discover":
        //   return discover;
        // case "jcb":
        //   return jcb;
        // case "unionpay":
        //   return unionpay;
        // case "maestro":
        //   return mastercard;
        // case "mir":
        //   return mir;
        // case "elo":
        //   return elo;
        // case "hiper":
        //   return hiper;
        // case "hipercard":
        //   return hiper;
        default:
            return 'visa.png';
    }
}
