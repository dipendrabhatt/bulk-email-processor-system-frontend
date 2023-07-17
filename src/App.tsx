import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Homepage } from "./ui/pages/Homepage"
import { UserLoginPage } from "./ui/pages/UserLoginPage"
import { UserSignUpPage } from "./ui/pages/UserSignUpPage"
import { VerifyEmailPage } from "./ui/pages/VerifyEmailPage"


function App() {
  return (
    <>
      <div>

        <Routes>
          <Route path="/" element={<UserLoginPage />} />
          <Route path="/sign-up" element={<UserSignUpPage />} />
          <Route path="/verify-email/" element={<VerifyEmailPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <ToastContainer position="bottom-left" className="toast-container" />
      </div>
    </>
  )
}

export default App
