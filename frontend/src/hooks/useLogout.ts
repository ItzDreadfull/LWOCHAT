import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";



const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })

            const data = await res.json();
            console.log(data);

            if (data.success === false) {
                throw new Error(data.message);
            }

            //localstorage
            localStorage.removeItem("chat-user")

            // context
            setAuthUser(null);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("error in use logout ", error)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { logout, loading };
}
export default useLogout


