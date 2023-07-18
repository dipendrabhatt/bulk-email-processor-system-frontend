import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AxiosInstance from "../../api";

export const VerifyEmailPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    useEffect(() => {
        // Simulating API call to verify email
        setTimeout(async () => {
            // Assume the response from the backend contains the verification status
            const response = await AxiosInstance.get(`/auth/verify-email/${token}`)
            if (response.data.success) {
                toast.success(response.data.message)
                //clear local storage first
                localStorage.clear();
                localStorage.setItem("token", response?.data?.data?.token)
                localStorage.setItem("user", JSON.stringify(response?.data?.data?.user))
                navigate("/home")
            }
            else {
                toast.error(response.data.message)
                navigate("/");
            }
            setLoading(false);
        }, 10000); // Simulating 2 seconds delay for API response
    }, []);

    return (
        <div className="flex items-center justify-center h-screen">
            {loading ? (
                <div className="text-center">
                    <p className="text-gray-600">Verifying email...</p>
                    <div className="mt-4">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
                    </div>
                </div>
            ) : (
                <div>VerifyEmailPage</div>
            )}
        </div>
    );
};
