import React, { useEffect } from "react";
import { TagsInput } from "react-tag-input-component";
import ErrorMsg from "../common/error-msg";

type IPropType = {
  categoryChildren: string[];
  setCategoryChildren: React.Dispatch<React.SetStateAction<string[]>>;
  default_value?: string[];
  error?: string;
};
const CategoryChildren = ({
  categoryChildren,
  setCategoryChildren,
  default_value,
  error,
}: IPropType) => {
  useEffect(() => {
    if (default_value) {
      setCategoryChildren(default_value);
    }
  }, [default_value, setCategoryChildren]);
  return (
    <div className="mb-6">
      <p className="mb-0 text-base text-black">Chi tiết thể loại</p>
      <TagsInput
        value={categoryChildren}
        onChange={setCategoryChildren}
        name="children"
        placeHolder="Nhập tên"
      />
      {error && <ErrorMsg msg={error} />}
    </div>
  );
};

export default CategoryChildren;
