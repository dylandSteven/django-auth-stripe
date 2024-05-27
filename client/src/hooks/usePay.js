import useAuth from "./useAuth"
import getStripe from '../lib/getStripe'

export default function usePay() {

    const { isLoggedIn, user } = useAuth()

    async function pay(subType, appType) {
        if (!isLoggedIn) {
            return
        }

        let price = '';
        if (subType === 'individual' && appType === 'world') {
            price = 'price_1PILWwDHF0H2ygqdYcDDcpnk';
        }

        if (subType === 'group' && appType === 'world') {
            price = 'price_1PILXCDHF0H2ygqdR3WAxtFu';
        }

        if (subType === 'business' && appType === 'world') {
            price = 'price_1PILXQDHF0H2ygqdKH6cUkUx';
        }

        if (subType === 'individual' && appType === 'universe') {
            price = 'price_1PKsDrDHF0H2ygqdyz1vr86V';
        }

        if (subType === 'group' && appType === 'universe') {
            price = 'price_1PKsE8DHF0H2ygqdex0sVGd0';
        }

        if (subType === 'business' && appType === 'universe') {
            price = 'price_1PKsELDHF0H2ygqdPcLRi2to';
        }

        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
            lineItems: [
                {
                    price,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            successUrl: `http://localhost:3000/success?subType=${subType}`,
            cancelUrl: `http://localhost:3000/cancel?subType=${subType}`,
            customerEmail: user.email,
        });

        console.warn(error.message);
    }

    return pay
}
