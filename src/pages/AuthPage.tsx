import React, { FC } from "react";
import { v4 } from "uuid";
import TextField from "../components/Auth/TextField";
import Btn from "../components/Btn";

const AuthPage: FC = () => {
  const [name, setName] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg">Регистрация и вход</h2>
      <div className="flex flex-col gap-3 w-[100%] mt-3">
        <TextField
          type="text"
          placeholder="Имя пользователя"
          onChange={onChangeName}
          value={name}
        />
        <TextField
          type="text"
          placeholder="Пароль"
          onChange={onChangePassword}
          value={password}
        />
      </div>
      <div className="flex gap-5">
        <Btn title="Зарегистрироваться" />
        <Btn title="Войти" />
      </div>
    </div>
  );
};

export default AuthPage;
