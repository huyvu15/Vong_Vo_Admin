import { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
// internal
import ErrorMsg from "../common/error-msg";
import { useGetSalesReportQuery } from "@/redux/order/orderApi";
Chart.register(CategoryScale);

// type
type TActiveBtnType = {
  title: string;
  color: string;
};

const LineChart = ({
  value,
}: {
  value: { startDate: Date; endDate: Date };
}) => {
  const [activeButton, setActiveButton] = useState<TActiveBtnType>({
    title: "Sales",
    color: "green",
  });

  const handleClick = ({ title, color }: TActiveBtnType) => {
    setActiveButton({ title, color });
  };

  const { data: sales, isError, isLoading } = useGetSalesReportQuery(value);

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Đang tải....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="Có lỗi xảy ra" />;
  }

  if (!isLoading && !isError && sales?.salesReport) {
    const salesReport = sales?.salesReport;

    const barOptions = {
      data: {
        labels: salesReport
          ?.slice()
          ?.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          ?.map((or) => or.date),
        datasets: [
          activeButton.title === "Sales"
            ? {
                label: "Tổng tiền",
                data: salesReport
                  ?.slice()
                  ?.sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  )
                  ?.map((or) => or.total),
                borderColor: "#10B981",
                backgroundColor: "#10B981",
                borderWidth: 3,
                yAxisID: "y",
              }
            : {
                label: "Tiền hàng",
                data: salesReport
                  ?.slice()
                  ?.sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  )
                  ?.map((or) => or.order),
                borderColor: "#F97316",
                backgroundColor: "#F97316",
                borderWidth: 3,
                yAxisID: "y",
              },
        ],
      },
      options: {
        responsive: true,
      },
      legend: {
        display: false,
      },
    };

    content = (
      <div className="h-full w-full">
        <Line {...barOptions} />
      </div>
    );
  }

  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-slate-200 mb-4">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <button
              onClick={() => handleClick({ title: "Sales", color: "green" })}
              type="button"
              className={`chart-tab-btn inline-block p-2 rounded-t-lg border-transparent text-lg focus:border-0 focus-visible:border-0 focus-visible:shadow-white focus-visible:outline-0 ${
                activeButton.title === "Sales"
                  ? "text-green-600"
                  : "hover:text-gray-600"
              }   focus:outline-none focus:border-none`}
            >
              Tổng tiền
            </button>
          </li>

          <li className="mr-2">
            <button
              onClick={() => handleClick({ title: "Orders", color: "red" })}
              type="button"
              className={`chart-tab-btn inline-block p-2 rounded-t-lg border-transparent text-lg focus:border-0 focus-visible:border-0 focus-visible:shadow-white focus-visible:outline-0 ${
                activeButton.title === "Orders"
                  ? "text-orange-500"
                  : "hover:text-gray-600"
              }  focus:outline-none focus:border-none`}
            >
              Tiền hàng
            </button>
          </li>
        </ul>
      </div>

      {/* chart start */}
      {content}
      {/* chart end */}
    </>
  );
};

export default LineChart;
