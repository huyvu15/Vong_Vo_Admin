import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
// internal
import OrderActions from "./order-actions";
import { Search } from "@/svg";
import ErrorMsg from "../common/error-msg";
import Pagination from "../ui/Pagination";
import OrderStatusChange from "./status-change";
import { useGetAllOrdersQuery } from "@/redux/order/orderApi";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker";

const OrderTable = () => {
  const { data: orders, isError, isLoading, error } = useGetAllOrdersQuery();
  const [searchVal, setSearchVal] = useState<string>("");
  const [selectVal, setSelectVal] = useState<string>("");
  const [currPage, setCurrPage] = useState(1);
  const [countOfPage, setCountOfPage] = useState(5);
  const [value, setValue] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date(),
  });

  const handleValueChange = (value: DateValueType) => {
    setValue(value as { startDate: Date; endDate: Date; });
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Đang tải....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="Có lỗi xảy ra" />;
  }
  if (!isLoading && !isError && orders?.data.length === 0) {
    content = <ErrorMsg msg="Không tìm thấy đơn hàng" />;
  }

  if (!isLoading && !isError && orders?.success) {
    let orderItems = orders.data;
    const totalPage = Math.ceil(orderItems.length / countOfPage);
    const pageStart = (currPage - 1) * countOfPage;
    if (searchVal) {
      orderItems = orderItems.filter((v) =>
        v._id.toString().includes(searchVal)
      );
    }
    if (selectVal) {
      orderItems = orderItems.filter(
        (v) => v.status.toLowerCase() === selectVal.toLowerCase()
      );
    }

    if (value.startDate && value.endDate) {
      orderItems = orderItems.filter(
        (v) => {
          if(!v.createdAt) return false;
          const date = new Date(v.createdAt);
          return date.getTime() >= new Date(value.startDate).setHours(0, 0, 0, 0) && date.getTime() <= new Date(value.endDate).setHours(23, 59, 59, 999);
        }
      );
    }

    content = (
      <>
        <table className="w-[1500px] 2xl:w-full text-base text-left text-gray-500">
          <thead className="bg-white">
            <tr className="border-b border-gray6 text-tiny">
              <th
                scope="col"
                className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold w-[170px]"
              >
                Mã đơn hàng
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold"
              >
                Khách hàng
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
              >
                Số lượng
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
              >
                Tiền hàng
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
              >
                Trạng thái
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end"
              >
                Ngày đặt hàng
              </th>
              <th
                scope="col"
                className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[14%] text-end"
              >
                Cập nhật
              </th>
              <th
                scope="col"
                className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[4%] text-end"
              >
                Hóa đơn
              </th>
            </tr>
          </thead>
          <tbody>
            {orderItems
              .slice(pageStart, pageStart + countOfPage)
              .map((item) => {
                return (
                  <tr
                    key={item._id}
                    className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                  >
                    <td className="pl-3 pr-16 py-3 font-normal text-[#55585B]">
                      #{item._id}
                    </td>
                    <td className="pr-8 py-5 whitespace-nowrap">
                      <a
                        href="#"
                        className="flex items-center space-x-5 text-hover-primary text-heading"
                      >
                        {item.user?.imageURL && (
                          <Image
                            className="w-[50px] h-[50px] rounded-full"
                            src={item.user.imageURL}
                            alt="user-img"
                            width={50}
                            height={50}
                          />
                        )}
                        <span className="font-medium">{item?.user?.name}</span>
                      </a>
                    </td>

                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.cart.reduce(
                        (acc, curr) => acc + curr.orderQuantity,
                        0
                      )}
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {item.totalAmount.toFixed(0)}đ
                    </td>
                    <td className="px-3 py-3 text-end">
                      <span
                        className={`text-[11px] ${
                          item.status === "pending"
                            ? "text-warning bg-warning/10"
                            : item.status === "delivered"
                            ? "text-success bg-success/10"
                            : item.status === "processing"
                            ? "text-indigo-500 bg-indigo-100"
                            : item.status === "cancel"
                            ? "text-danger bg-danger/10"
                            : item.status === "success"
                            ? "text-warning bg-warning/10"
                            : item.status === "return"
                            ? "text-danger bg-danger/10"
                            : item.status === "returned"
                            ? "text-warning bg-warning/10"
                            : item.status === "reject"
                            ? "text-danger bg-danger/10"
                            : item.status === "failed"
                            ? "text-danger bg-danger/10"
                            : ""
                        } px-3 py-1 rounded-md leading-none font-medium text-end`}
                      >
                        {item.status === "pending"
                          ? "Đang chờ"
                          : item.status === "processing"
                          ? "Đang giao"
                          : item.status === "delivered"
                          ? "Đã giao"
                          : item.status === "failed"
                          ? "Thanh toán thất bại"
                          : item.status === "success"
                          ? "Đã thanh toán"
                          : item.status === "return"
                          ? "Yêu cầu trả hàng"
                          : item.status === "returned"
                          ? "Đã trả hàng"
                          : item.status === "reject"
                          ? "Từ chối trả hàng"
                          : "Đã hủy"}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {dayjs(item.createdAt).format("DD/MM/YYYY")}
                    </td>

                    <td className="px-9 py-3 text-end">
                      <div className="flex items-center justify-end space-x-2">
                        <OrderStatusChange
                          id={item._id}
                          currentStatus={item.status}
                        />
                      </div>
                    </td>
                    {/* order actions */}
                    <OrderActions id={item._id} />
                    {/* order actions */}
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* pagination start */}
        <div className="flex justify-between items-center flex-wrap">
          <p className="mb-0 text-tiny">
            Hiển thị 1-{" "}
            {orderItems?.slice(pageStart, pageStart + countOfPage).length} của{" "}
            {orderItems.length}
          </p>
          {orderItems.length > countOfPage && (
            <div className="pagination py-3 flex justify-end items-center sm:mx-8">
              <Pagination
                currPage={currPage}
                totalPage={totalPage}
                setCurrPage={setCurrPage}
              />
            </div>
          )}
        </div>
        {/* pagination end */}
      </>
    );
  }

  // handle change input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };
  // handle change input
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectVal(e.target.value);
  };
  return (
    <>
      <div className="tp-search-box flex items-center justify-between px-8 py-8 flex-wrap">
        <div className="flex items-center space-x-6">
        <div className="search-input relative">
          <input
            className="input h-[44px] pl-14 w-[300px]"
            type="text"
            placeholder="Tìm kiếm hóa đơn"
            onChange={handleSearchChange}
          />
          <button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
            <Search />
          </button>
        </div>
        <Datepicker
          value={value}
          onChange={handleValueChange}
          classNames={{
            input: () =>
              "border border-gray6 rounded-md px-3 py-2 text-gray-500 text-lg",
          }}
          i18n="vi"
        />
        </div>
        <div className="flex justify-end space-x-6">
          <div className="search-select mr-3 flex items-center space-x-3 ">
            <span className="text-tiny inline-block leading-none -translate-y-[2px]">
              Trạng thái :{" "}
            </span>
            <select onChange={handleSelectChange}>
              <option value="">Trạng thái</option>
              <option value="delivered">Đã giao</option>
              <option value="pending">Đang chờ</option>
              <option value="processing">Đang giao</option>
              <option value="cancelled">Đã hủy</option>
              <option value="success">Đã thanh toán</option>
              <option value="failed">Thanh toán thất bại</option>
              <option value="return">Yêu cầu trả hàng</option>
              <option value="returned">Đã trả hàng</option>
              <option value="reject">Từ chối trả hàng</option>
            </select>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto mx-8">{content}</div>
    </>
  );
};

export default OrderTable;
