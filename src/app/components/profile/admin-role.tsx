"use client"
import React,{useEffect} from 'react';
import ReactSelect from "react-select";

// prop type 
type IPropType = {
  handleChange: (value: string | number | undefined) => void;
  default_value?:string;
  setRole?:React.Dispatch<React.SetStateAction<string>>;
}
const AdminRole = ({handleChange,default_value,setRole}:IPropType) => {
  let defaultValue = default_value === 'Manager' ? 'Quản lý' : default_value === 'Super Admin' ? "Quản trị viên cấp cao" : default_value === 'CEO' ? "Giám đốc" : "Quản trị viên"
  useEffect(() => {
    if(default_value && setRole){
      setRole(default_value)
    }
  },[default_value, setRole])
  return (
    <ReactSelect
    isDisabled
    onChange={(value) => handleChange(value?.value)}
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
    options={[
      { value: "Admin", label: "Quản trị viên" },
      { value: "Super Admin", label: "Quản trị viên cấp cao" },
      { value: "Manager", label: "Quản lý" },
      { value: "CEO", label: "Giám đốc" },
    ]}
  />
  );
};

export default AdminRole;