"use client";
import React, { useEffect, useState } from "react";
import ErrorMsg from "../common/error-msg";
import TableItem from "./table-item";
import TableHead from "./table-head";
import Pagination from "../ui/Pagination";
import { useGetLowInStockQuery } from "@/redux/product/productApi";

const LowStockProducts = () => {
  const [currPage, setCurrPage] = useState(1);
  const [countOfPage, setCountOfPage] = useState(5);
  const [sortType, setSortType] = useState(1); // 1: low stock, 2: high stock
  const { data: products, isError, isLoading } = useGetLowInStockQuery(sortType);


  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Đang tải....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="Có lỗi xảy ra" />;
  }

  if (!isLoading && !isError && products?.lowStockProduct) {
    const totalPage = Math.ceil(products?.lowStockProduct.length / countOfPage);
    const pageStart = (currPage - 1) * countOfPage;
    content = (
      <>
        <table className="w-full text-base text-left text-gray-500">
          <TableHead />
          <tbody>
            {products?.lowStockProduct
              .slice(pageStart, pageStart + countOfPage)
              .map((product) => (
                <TableItem key={product._id} product={product} />
              ))}
          </tbody>
        </table>
        {/*  */}
        {products.lowStockProduct.length > countOfPage && (
          <div className="px-4 pt-6 border-t border-gray6">
            <div className="flex flex-col justify-between sm:flex-row">
              <span className="flex items-center uppercase">
                Hiển thị 1-
                {
                  products?.lowStockProduct.slice(pageStart, pageStart + countOfPage)
                    .length
                }{" "}
                của {products?.lowStockProduct.length}
              </span>
              <Pagination
                currPage={currPage}
                totalPage={totalPage}
                setCurrPage={setCurrPage}
              />
            </div>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-6 mb-6">
        <div className="bg-white p-8 col-span-12 xl:col-span-12 2xl:col-span-12 rounded-md">
          {/* <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium tracking-wide text-slate-700 text-lg mb-0 leading-none">
              Đơn hàng gần đây
            </h3>
            <Link
              href="/orders"
              className="leading-none text-base text-info border-b border-info border-dotted capitalize font-medium hover:text-info/60 hover:border-info/60"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="overflow-scroll 2xl:overflow-visible">
            <div className="w-[700px] 2xl:w-full">{content}</div>
          </div> */}
          {/* Sản phẩm sắp hết hàng */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium tracking-wide text-slate-700 text-lg mb-0 leading-none">
              Sản phẩm sắp hết hàng
            </h3>
            {/* <Link
              href="/orders"
              className="leading-none text-base text-info border-b border-info border-dotted capitalize font-medium hover:text-info/60 hover:border-info/60"
            >
              Xem tất cả
            </Link> */}
            {/* Tồn kho ít nhất, nhiều nhất */}
            <select
              className="border border-gray6 rounded-md px-3 py-2 text-gray-500 text-lg"
              name="stock"
              id="stock"
              value={sortType}
              onChange={(e) => setSortType(Number(e.target.value))}
            >
              <option value="1">Tồn kho ít nhất</option>
              <option value="2">Tồn kho nhiều nhất</option>
            </select>
          </div>
          <div className="overflow-scroll 2xl:overflow-visible">
            <div className="w-[700px] 2xl:w-full">{content}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LowStockProducts;
