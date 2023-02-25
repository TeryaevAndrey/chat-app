import React, { FC } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { setAlertSuccessInfo } from "../../store/alerts/alertSuccess";
import { setAlertErrorInfo } from "../../store/alerts/alertError";
import { $userInfo, setUserInfo } from "../../store/userInfo";
import { useStore } from "effector-react";
import { cookies } from "../../core/cookies";

const RegForm: FC = () => {
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
    await axios
      .post(process.env.REACT_APP_PROXY + "/api/auth/reg", {
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

        navigate(`/${res.data.userInfo.userId}/empty`);

        setTimeout(() => {
          setAlertSuccessInfo({
            isSuccess: false,
            title: undefined,
          });
        }, 3000);
      })
      .catch((err) => {
        console.log(err);

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
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Имя пользователя"
                  onChange={onChangeUserName}
                  value={userName}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Пароль"
                  onChange={onChangePassword}
                  value={password}
                />
              </div>

              <div className="text-center lg:text-left">
                <button
                  onClick={formHandler}
                  type="button"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  Зарегистрироваться
                </button>
                <div className="flex items-center text-sm font-semibold mt-2 pt-1 mb-0">
                  <p>Уже есть аккаунт?</p>
                  <p
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-[10px] cursor-pointer"
                    onClick={() => navigate("/auth/entrance")}
                  >
                    Войти
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

export default RegForm;
