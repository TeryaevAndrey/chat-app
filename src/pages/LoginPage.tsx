import { FC } from "react";
import LoginForm from "../components/Auth/LoginForm";

const LoginPage: FC = () => {
  return(
    <div className="max-w-[1200px] mx-[auto] flex justify-center items-center h-full">
      <LoginForm />
    </div>
  )
}

export default LoginPage;