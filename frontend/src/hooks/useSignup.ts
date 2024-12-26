import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


interface SignupData {
    fullName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
}


const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async (formData: SignupData) => {
        const { fullName, username, email, password, confirmPassword, gender } = formData;
        const success = handleInputErrors(formData)
        if (!success) return;

        setLoading(true)
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, email, password, confirmPassword, gender })
            })

            const data = await res.json();
            // console.log(data);

            if (data.success === false) {
                console.log("dkjfn")
                throw new Error(data.message);
            }

            //localstorage
            localStorage.setItem("chat-user", JSON.stringify(data))

            // context
            setAuthUser(data);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log("error in use signup ", error)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { signup, loading };
}
export default useSignup

function handleInputErrors({ fullName, username, email, password, confirmPassword, gender }: SignupData): boolean {
    if (!fullName || !username || !email || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match.Passowrd and confirm password must be same.");
        return false;
    }

    if (password.length < 6) {
        toast.error("Passwords must be atleast 6 characters");
        return false;
    }

    return true;
}
