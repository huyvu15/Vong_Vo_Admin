import React from "react";
import ReactSelect from "react-select";

// type
type IPropType = {
  handleChange: (value: string | undefined | number) => void;
  default_value?:string
};

const BrandStatus = ({ handleChange ,default_value}: IPropType) => {
  let defaultValue = default_value === "active" ? "Hoạt động" : "Không hoạt động"
  return (
    <div className="mb-5">
      <p className="mb-0 text-base text-black">Trạng thái</p>
      <ReactSelect
        onChange={(value) => handleChange(value?.value)}
        options={[
          { value: "active", label: "Hoạt động" },
          { value: "inactive", label: "Không hoạt động" },
        ]}
        defaultValue={
          default_value
            ? {
                label: defaultValue,
                value: default_value,
              }
            : {
                label: "Chọn..",
                value: 0,
              }
        }
      />
    </div>
  );
};

export default BrandStatus;
