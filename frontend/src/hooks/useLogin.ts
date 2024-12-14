import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

interface LoginData {
    username: string;
    password: string;
}



const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext()

    const login = async (username: string, password: string) => {
        const success = handleInputErrors({ username, password })
        if (!success) return;


        setLoading(true)

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })

            })
            const data = await res.json();
            if (data.success === false) {
                throw new Error(data.message);
            }

            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)


            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }


    return { login, loading };

}

export default useLogin


function handleInputErrors({ username, password }: LoginData): boolean {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }


    if (password.length < 6) {
        toast.error("Passwords must be atleast 6 characters");
        return false;
    }

    return true;
}
