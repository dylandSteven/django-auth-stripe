import useAuth from "./useAuth"
import useAxiosPrivate from "./usePrivate"

export default function useStripe() {

    const { isLoggedIn, setSubscriptions } = useAuth()
    const axiosPrivateInstance = useAxiosPrivate()

    async function getSubscriptionId() {
        if (!isLoggedIn) {
            return
        }

        try {
            const { data } = await axiosPrivateInstance.get('auth/subscriptions')
            const { subscriptions } = data;
            setSubscriptions(subscriptions);
        } catch (error) {
            console.log("===", error.response)
        }
    }

    return getSubscriptionId
}
