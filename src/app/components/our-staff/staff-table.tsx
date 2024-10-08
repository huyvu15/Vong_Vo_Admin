"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Pagination from '../ui/Pagination';
import ErrorMsg from '../common/error-msg';
import { useGetAllStaffQuery } from '@/redux/auth/authApi';
import StaffAction from './staff-action';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const StaffTables = () => {
  const { data: staffData, isError, isLoading } = useGetAllStaffQuery();
  const { user } = useSelector((state: RootState) => state.auth);
  const [currPage, setCurrPage] = useState(1);
  const [countOfPage, setCountOfPage] = useState(5);
  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Đang tải....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="Có lỗi xảy ra" />;
  }
  if (!isLoading && !isError && staffData?.data.length === 0) {
    content = <ErrorMsg msg="Không có quản lý" />;
  }

  if (!isLoading && !isError && staffData?.status) {
    const allStaff = [...staffData?.data].reverse();;
    const totalPage = Math.ceil(allStaff.length / countOfPage);
    const pageStart = (currPage - 1) * countOfPage;

    content = (
      <>
        <div className="overflow-scroll 2xl:overflow-visible">
          <div className="w-[975px] 2xl:w-full">
            <table className="w-full text-base text-left text-gray-500 ">

              <thead>
                <tr className="border-b border-gray6 text-tiny">
                  <th scope="col" className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">
                    Tên
                  </th>
                  <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px]">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end">
                    Số điện thoại
                  </th>
                  <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[150px] text-end">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
                    Quyền
                  </th>
                  {user?.role === "CEO" &&
                  <th scope="col" className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-end">
                    Cập nhật
                  </th>}
                </tr>
              </thead>
              <tbody>
                {allStaff.slice(pageStart, pageStart + countOfPage).map(item => (
                  <tr key={item._id} className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-8 py-5 whitespace-nowrap">
                      <a href="#" className="flex items-center space-x-5">
                        {item.image && <Image className="w-10 h-10 rounded-full" src={item.image} alt="image" width={40} height={40} />}
                        <span className="font-medium text-heading text-hover-primary transition">{item.name}</span>
                      </a>
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.email}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item?.phone}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.status === "Inactive" ? "Không hoạt động" : "Hoạt động"}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.role === 'Manager' ? 'Quản lý' : item.role === 'Super Admin' ? "Quản trị viên cấp cao" : item.role === 'CEO' ? "Giám đốc" : "Quản trị viên"}
                    </td>
                    {user?.role === "CEO" &&
                    <td className="px-9 py-3 text-end">
                      <div className="flex items-center justify-end space-x-2">
                        <StaffAction id={item._id} role={user?.role}/>
                      </div>
                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap">
          <p className="mb-0 text-tiny">Hiển thị 1-{allStaff?.slice(pageStart, pageStart + countOfPage).length} của {allStaff.length}</p>
          <div className="pagination py-3 flex justify-end items-center">
            {allStaff.length > countOfPage && 
            <Pagination
              currPage={currPage}
              totalPage={totalPage}
              setCurrPage={setCurrPage}
            />}
          </div>
        </div>
      </>
    )
  }
  return (
    <div className="relative overflow-x-auto bg-white px-8 py-4 rounded-md">
      {content}
    </div>
  );
};

export default StaffTables;