import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { setAlertSuccessInfo } from "../../store/alerts/alertSuccess";
import { $userInfo, setUserInfo } from "../../store/userInfo";
import Cookies, { Cookie } from "universal-cookie";
import { setAlertErrorInfo } from "../../store/alerts/alertError";
import { useStore } from "effector-react";

const LoginForm: FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const userInfo = useStore($userInfo);

  const onChangeUserName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const formHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const cookies: Cookie = new Cookies();

    await axios
      .post(process.env.REACT_APP_PROXY + "/api/auth/entrance", {
        userName,
        password,
      })
      .then(async (res: AxiosResponse) => {
        await cookies.set("token", res.data.userInfo.token);

        localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));

        setAlertSuccessInfo({
          isSuccess: true,
          title: res.data.message,
        });

        setUserInfo(res.data.userInfo);

        if(userInfo.userId) {
          navigate(`/${userInfo.userId}/empty`)
        }

        setTimeout(() => {
          setAlertSuccessInfo({
            isSuccess: false,
            title: undefined,
          });
        }, 3000);
      })
      .catch((err) => {
        setAlertErrorInfo({
          isError: true,
          title: err.response.data.message,
        });

        setTimeout(() => {
          setAlertErrorInfo({
            isError: false,
            title: undefined,
          });
        }, 3000);
      });
  };

  return (
    <section className="flex justify-center items-center h-screen">
      <div className="px-6 text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
              <div className="mb-6">
                <input
                  onChange={onChangeUserName}
                  value={userName}
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Имя пользователя"
                />
              </div>

              <div className="mb-6">
                <input
                  onChange={onChangePassword}
                  value={password}
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Пароль"
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck2"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="exampleCheck2"
                  >
                    Запомнить меня
                  </label>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <button
                  onClick={formHandler}
                  type="button"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Войти
                </button>
                <div className="flex items-center text-sm font-semibold mt-2 pt-1 mb-0">
                  <p>Нет аккаунта?</p>
                  <p
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-[10px] cursor-pointer"
                    onClick={() => navigate("/auth/reg")}
                  >
                    Зарегистрироваться
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
