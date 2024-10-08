"use client";
import { useAdminChangePasswordMutation} from "@/redux/auth/authApi";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ErrorMsg from "../common/error-msg";
import { notifyError, notifySuccess } from "@/utils/toast";

// schema
const schema = Yup.object().shape({
  password: Yup.string().required().min(6).label("Mật khẩu"),
  newPassword: Yup.string().required().min(6).label("Mật khẩu mới"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), undefined],
    "Mật khẩu chưa khớp"
  ),
});

const ProfileChangePass = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [changePassword, {}] = useAdminChangePasswordMutation();
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // on submit
  const onSubmit = async (data: { password: string; newPassword: string }) => {
    if (user) {
     const res =  await changePassword({
        email: user.email,
        oldPass: data.password,
        newPass: data.newPassword,
      });
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      } else {
        notifySuccess("Thay đổi mật khẩu thành công");
        reset();
      }
    }
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">Mật khẩu hiện tại</p>
        <input
          {...register("password", {
            required: `Mật khẩu là bắt buộc!`,
          })}
          name="password"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
          type="password"
          placeholder="Mật khẩu hiện tại"
        />
        <ErrorMsg msg={errors.password?.message as string} />
      </div>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">Mật khẩu mới</p>
        <input
          {...register("newPassword", {
            required: `Mật khẩu mới là bắt buộc!`,
          })}
          name="newPassword"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
          type="password"
          placeholder="Mật khẩu mới"
        />
        <ErrorMsg msg={errors.newPassword?.message as string} />
      </div>
      <div className="mb-5">
        <p className="mb-0 text-base text-black">Nhập lại mật khẩu</p>
        <input
          {...register("confirmPassword")}
          name="confirmPassword"
          className="input w-full h-[49px] rounded-md border border-gray6 px-6 text-base text-black"
          type="password"
          placeholder="Nhập lại mật khẩu"
        />
        <ErrorMsg msg={errors.confirmPassword?.message as string} />
      </div>
      <div className="text-end mt-5">
        <button className="tp-btn px-10 py-2">Lưu</button>
      </div>
    </form>
  );
};

export default ProfileChangePass;
