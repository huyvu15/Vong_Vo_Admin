"use client";
import React, { useState } from "react";
import LineChart from "../chart/line-chart";
import PieChart from "../chart/pie-chart";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker";

const SalesReport = () => {
  // 7 day ago
  const [value, setValue] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    endDate: new Date(),
  });

  const handleValueChange = (value: DateValueType) => {
    setValue(value as { startDate: Date; endDate: Date; });
  };
  return (
    <>
      <div className="chart-main-wrapper mb-6 grid grid-cols-12 gap-6">
        <div className=" col-span-12 2xl:col-span-7">
          <div className="chart-single bg-white py-3 px-3 sm:py-10 sm:px-10 h-fit rounded-md">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl">Thống kê bán hàng</h3>
              {/* light mode */}
              <div className="w-[300px]">
              <Datepicker
                value={value}
                onChange={handleValueChange}
                classNames={{ input: () => "border border-gray6 rounded-md px-3 py-2 text-gray-500 text-lg" }}
                i18n="vi"
              />
              </div>
            </div>
            <LineChart value={value}/>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 2xl:col-span-5 space-y-6">
          <div className="chart-widget bg-white p-4 sm:p-10 rounded-md">
            <h3 className="text-xl mb-8">Danh mục bán chạy nhất</h3>
            {/* <div className="md:h-[252px] 2xl:h-[398px] w-full">
              <canvas
                className="mx-auto md:!w-[240px] md:!h-[240px] 2xl:!w-[360px] 2xl:!h-[360px] "
                id="earningStatics"
              ></canvas>
            </div> */}
            <PieChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesReport;
