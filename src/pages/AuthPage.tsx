import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { Cookie } from "universal-cookie/cjs/types";
import TextField from "../components/Auth/TextField";
import Btn from "../components/Btn";
import { $userInfo, updateUserInfo } from "../store/userInfo";

const AuthPage: FC = () => {
  const cookies: Cookie = new Cookies();
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const userInfo = useStore($userInfo);
  const navigate = useNavigate();

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  React.useEffect(() => {
    if(userInfo.userId !== undefined) {
      navigate(`/${userInfo.userId}`);
    }
  }, [userInfo, navigate]);

  const formHandlerReg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:4000/api/auth/reg", {
          name,
          password,
        })
        .then(async (res: AxiosResponse) => {
          await cookies.set("token", res.data.userInfo.token);

          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              name: res.data.userInfo.name,
              userId: res.data.userInfo.userId,
            })
          );

          await updateUserInfo({
            token: res.data.userInfo.token,
            userId: res.data.userInfo.userId,
            name: res.data.userInfo.name
          });
        });

      alert("Успешно");
    } catch (err) {
      alert("Ошибка");
    }
  };

  const formHandlerEntrance = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      await axios
        .post(`http://localhost:4000/api/auth/entrance`, {
          name,
          password,
        })
        .then(async (res: AxiosResponse) => {
          await cookies.set("token", res.data.token);

          localStorage.setItem(
            "userInfo",
            JSON.stringify({
              name: res.data.name,
              userId: res.data.userId,
            })
          );

          await updateUserInfo({
            token: res.data.token,
            userId: res.data.userId,
            name: res.data.name
          });
        });

      alert("Успешно");
    } catch (err) {
      alert("Ошибка");
      console.log(err);
    }
  };

  return (
    <form className="flex flex-col items-center">
      <h2 className="text-lg text-[#000]">Регистрация и вход</h2>
      <div className="flex flex-col gap-3 w-[100%] mt-3">
        <TextField
          type="text"
          placeholder="Имя пользователя"
          onChange={onChangeName}
          value={name}
        />
        <TextField
          type="password"
          placeholder="Пароль"
          onChange={onChangePassword}
          value={password}
        />
      </div>
      <div className="flex gap-5">
        <Btn onClick={formHandlerReg} title="Зарегистрироваться" />
        <Btn onClick={formHandlerEntrance} title="Войти" />
      </div>
    </form>
  );
};

export default AuthPage;
