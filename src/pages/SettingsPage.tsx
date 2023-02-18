import axios, { AxiosResponse } from "axios";
import { useStore } from "effector-react";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { setAlertErrorInfo } from "../store/alerts/alertError";
import { setAlertSuccessInfo } from "../store/alerts/alertSuccess";
import { $userInfo } from "../store/userInfo";
import getUserData from "../utils/getMyData";

const SettingsPage: FC = () => {
  const userInfo = useStore($userInfo);
  const [avatar, setAvatar] = React.useState<any>(undefined);
  const [newUserName, setNewUserName] = React.useState<string>("");
  const [oldPassword, setOldPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");

  React.useEffect(() => {
    getUserData();
  }, []);

  const avatarPreview = userInfo.avatar ? userInfo.avatar : "/img/avatar.png";

  const onChangeNewUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(e.target.value);
  };

  const onChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };

  const onChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const formHandler = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    if (avatar) {
      formData.append("avatar", avatar);
    }
    if (newUserName) {
      formData.append("newUserName", newUserName);
    }
    if (oldPassword) {
      formData.append("oldPassword", oldPassword);
    }

    if (newPassword) {
      formData.append("newPassword", newPassword);
    }

    if (userInfo.userId) {
      formData.append("userId", userInfo.userId);
    }

    await axios
      .post(process.env.REACT_APP_PROXY + "/api/users/update-data", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res: AxiosResponse) => {
        setAlertSuccessInfo({
          isSuccess: true,
          title: res.data.message,
        });

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
    <div className="flex justify-center items-center h-screen">
      <div className="w-[400px] h-[80%] bg-white rounded-[7px] py-[40px] px-[20px]">
        <Link
          className="flex items-center opacity-[0.5] hover:opacity-[1] ease-linear duration-200"
          to={`/${userInfo.userId}/empty`}
        >
          <img
            className="w-[30px] h-[30px]"
            src="/img/back-arrow.svg"
            alt="back"
          />
          Назад
        </Link>

        <form
          className="flex flex-col items-center w-full h-full pt-[30px]"
          encType="multipart/form-data"
        >
          <label
            htmlFor="upload-photo"
            className="settings-avatar w-[150px] h-[150px] rounded-[50%] overflow-hidden relative cursor-pointer"
          >
            <img
              className="w-full h-full"
              src={avatar ? URL.createObjectURL(avatar) : avatarPreview}
              alt="avatar"
            />
            <div className="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex flex-col justify-center items-center opacity-[0] ease-linear duration-100">
              <img
                className="w-[30px] h-[30px]"
                src="/img/photo.svg"
                alt="photo"
              />
              <span className="text-center text-white">Загрузить фото</span>
            </div>
          </label>
          <input
            className="hidden"
            type="file"
            name="avatar"
            id="upload-photo"
            onChange={(e) => {
              if (e.target.files) {
                setAvatar(e.target.files[0]);
              }
            }}
          />
          <div className="flex flex-col w-full mt-[40px] gap-[15px]">
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Новое имя"
              onChange={onChangeNewUserName}
              value={newUserName}
            />
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Старый пароль"
              onChange={onChangeOldPassword}
              value={oldPassword}
            />
            <input
              type="text"
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Новый пароль"
              onChange={onChangeNewPassword}
              value={newPassword}
            />
          </div>

          <button
            onClick={formHandler}
            className="w-full min-h-[50px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-[auto] ease-linear duration-200 mb-[30px]"
          >
            Сохранить изменения
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
