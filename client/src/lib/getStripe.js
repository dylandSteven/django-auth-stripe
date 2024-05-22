import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe('pk_test_51KuywLDHF0H2ygqdcDtflOvoqolqS8CdZkclWKExP27ZkFmCpkRcl7Xi9QVm2RoiOvumnKLaYDVmfgG03LtcfdlX00uHNyuzSn');
  }
  return stripePromise;
};

export default getStripe;