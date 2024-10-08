import React from "react";
import ErrorMsg from "../common/error-msg";
import { FieldErrors, UseFormRegister } from "react-hook-form";

// prop type
type IPropType = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  default_value?: string;
};

const CategoryParent = ({ register, errors, default_value }: IPropType) => {
  return (
    <div className="mb-6">
      <p className="mb-0 text-base text-black">Thể loại</p>
      <input
        {...register("parent", {
          required: `Thể loại là bắt buộc!`,
        })}
        className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
        type="text"
        name="parent"
        placeholder="Tên"
        defaultValue={default_value && default_value}
      />
      <ErrorMsg msg={(errors?.parent?.message as string) || ""} />
    </div>
  );
};

export default CategoryParent;