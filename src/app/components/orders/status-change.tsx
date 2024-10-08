import React from "react";
import ReactSelect from "react-select";
import { notifySuccess } from "@/utils/toast";
import { useUpdateStatusMutation } from "@/redux/order/orderApi";

// option
const options = [
  { value: "delivered", label: "Đã giao" },
  { value: "processing", label: "Đang giao" },
  { value: "pending", label: "Đang chờ" },
  { value: "cancelled", label: "Đã hủy" },
];

const options_return = [
  { value: "returned", label: "Đã trả hàng" },
  { value: "reject", label: "Từ chối trả hàng" },
];

const OrderStatusChange = ({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) => {
  const [updateStatus, { data: updateStatusData }] = useUpdateStatusMutation();
  const handleChange = async (value: string | undefined, id: string) => {
    if (value) {
      const res = await updateStatus({ id, status: { status: value } });
      if ("data" in res) {
        if ("message" in res.data) {
          notifySuccess(res.data.message);
        }
      }
    }
  };
  return (
    <>
      <div
        style={
          currentStatus === "delivered" ||
          currentStatus === "cancelled" ||
          currentStatus === "failed" ||
          currentStatus === "return" ||
          currentStatus === "returned" ||
          currentStatus === "reject"
            ? { display: "none" }
            : {}
        }
      >
        <ReactSelect
          onChange={(value) => handleChange(value?.value, id)}
          options={options}
        />
      </div>
      <div
      style={
        currentStatus !== "return"
          ? { display: "none" }
          : {}
      }
      >
        <ReactSelect
          onChange={(value) => handleChange(value?.value, id)}
          options={options_return}
        />
      </div>
    </>
  );
};

export default OrderStatusChange;
