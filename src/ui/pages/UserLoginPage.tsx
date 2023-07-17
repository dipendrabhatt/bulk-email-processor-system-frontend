import { Formik } from "formik"
import { useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import * as Yup from "yup"
import AxiosInstance from "../../api"
import logo from "../../assets/images/logo.png"



interface SignIn {
    email: string;
    password: string;
}

export const UserLoginPage = () => {
    const navigate = useNavigate()
    const [isValidateOn, setIsValidateOn] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (values: SignIn) => {
        setIsLoading(true)

        const result = await AxiosInstance.post("/auth/login", values)


        if (result.data.success) {
            toast.success(result.data.message)
            localStorage.setItem("token", result?.data?.data?.token)
            localStorage.setItem("user", JSON.stringify(result?.data?.data?.user))
            setIsLoading(false)

            navigate("/home")
        }
        else {
            setIsLoading(false)
            toast.error(result.data.message)

        }
    }

    return (
        <>
            <div className="w-full h-screen flex flex-col items-center justify-center px-4">
                <div className="max-w-sm w-full text-gray-600">
                    <div className="text-center">
                        <div className="flex flex-col items-center justify-center">
                            <div>Mail Processing System</div>
                            <img src={logo} width={100} className="mx-auto" />
                        </div>

                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Log in to your account</h3>
                            <p className="">Don't have an account? <a
                                onClick={() => {
                                    navigate("/sign-up")

                                }}
                                className="font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">Sign up</a></p>
                        </div>
                    </div>
                    <Formik initialValues={{ email: "", password: "" }}
                        validateOnChange={isValidateOn}
                        validateOnBlur={isValidateOn}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email().required("Email is required"),
                            password: Yup.string().required("Password is required")
                        })}

                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, errors, handleBlur, handleSubmit }) => (
                            <form
                                onSubmit={handleSubmit}
                                className="mt-8 space-y-5"
                            >
                                <div>
                                    <label className="font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        name="email"
                                        onChange={handleChange}
                                        value={values.email}
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    />
                                    <small className="input_suggestion_error text-red-500">
                                        {errors.email}
                                    </small>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            onChange={handleChange}
                                            value={values.password}
                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1/2 mt-1 right-3 transform -translate-y-1/2 text-gray-500"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </button>
                                    </div>
                                    <small className="input_suggestion_error text-red-500">
                                        {errors.password}
                                    </small>
                                </div>
                                <button
                                    type="submit"
                                    onClick={() => setIsValidateOn(true)}
                                    className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                                    disabled={isLoading} // Disable the button while loading
                                >
                                    {isLoading ? "Loading..." : "Sign in"}
                                </button>

                            </form>

                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
