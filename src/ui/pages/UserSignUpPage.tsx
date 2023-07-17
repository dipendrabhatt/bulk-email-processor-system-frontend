import { Formik } from "formik";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AxiosInstance from "../../api";


interface SignUp {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    password: string;
}

export const UserSignUpPage = () => {
    const navigate = useNavigate()
    const [isValidateOn, setIsValidateOn] = useState(false);
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const handleSubmit = async (values: SignUp) => {
        setIsLoading(true)


        const response = await AxiosInstance.post("/auth/sign-up", values)

        if (response.data.success) {
            console.log(response.data.message, '>>>>>>>>>>>>>>')
            toast.success(response.data.message)
            setIsLoading(false)
            navigate("/")
        }
        else {
            console.log(response.data.message, '>>>>>>>>>>>>>>')
            setIsLoading(false)
            toast.error(response.data.message)
        }
    }

    return (
        <>
            <div className="flex-1 flex items-center justify-center h-screen">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                    <div className="">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
                            <p className="">Already have an account? <a
                                onClick={() => {
                                    navigate("/")
                                }}
                                className="font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer">Log in</a></p>
                        </div>
                    </div>

                    <Formik
                        initialValues={{ firstName: "", middleName: "", lastName: "", email: "", password: "" }}
                        validateOnChange={isValidateOn}
                        validateOnBlur={isValidateOn}
                        validationSchema={Yup.object().shape({
                            firstName: Yup.string().required("First Name is required"),
                            middleName: Yup.string(),
                            lastName: Yup.string().required("Last Name is required"),
                            email: Yup.string().email().required("Email is required"),
                            password: Yup.string().min(8)
                                .max(30)
                                .matches(
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                                )
                                .required("Password is required field"),
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, errors, handleBlur, handleSubmit }) => (


                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5"
                            >
                                <div className="flex space-x-2">
                                    <div className="w-1/3">
                                        <label className="font-medium">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            onChange={handleChange}
                                            value={values.firstName}
                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                        />
                                        <small className="input_suggestion_error text-red-500">
                                            {errors.firstName}
                                        </small>
                                    </div>
                                    <div className="w-1/3">
                                        <label className="font-medium">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            name="middleName"
                                            onChange={handleChange}
                                            value={values.middleName}
                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                        />

                                    </div>
                                    <div className="w-1/3">
                                        <label className="font-medium">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            onChange={handleChange}
                                            value={values.lastName}
                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                        />
                                        <small className="input_suggestion_error text-red-500">
                                            {errors.lastName}
                                        </small>
                                    </div>
                                </div>
                                <div>
                                    <label className="font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
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
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Loading..." : "Sign up"}

                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
