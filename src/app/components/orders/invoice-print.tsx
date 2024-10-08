import React from "react";
import { Order } from "@/types/order-amount-type";
import dayjs from "dayjs";

// prop type
type IPropType = {
  orderData: Order;
};

const InvoicePrint = ({ orderData }: IPropType) => {
  const total = orderData.subTotal;
  const grand_total = orderData.totalAmount;
  return (
    <>
      {/* top bar start */}
      <div className="flex items-center justify-center flex-wrap px-8 mb-6 bg-white border-b border-slate-200 py-6 text-center">
        <div className="relative">
          <h3 className="font-normal mb-0">Tiemcaivongne</h3>
          <p className="mb-0 text-tiny">HN, VN</p>
          <p className="mb-0 text-tiny">+84 827 590 544</p>
        </div>
      </div>
      {/* top bar end */}

      {/* details table */}
      <div className="grid grid-cols-12 gap-6 px-6">
        <div className="col-span-12">
          <div className="bg-white border border-slate-200 py-8 mb-4">
            <div className="relative overflow-x-auto  mx-8">
              <table className="w-[500px] md:w-full text-base text-left text-gray-500">
                <thead className="bg-white">
                  <tr className="border-b border-gray6 text-tiny">
                    <th
                      scope="col"
                      className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold"
                    >
                      Sản phẩm
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
                      Tổng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.cart.map((p) => (
                    <tr
                      key={p._id}
                      className="bg-white border-b border-gray6 last:border-0 text-start mx-9"
                    >
                      <td className="pr-8 py-5 whitespace-nowrap">
                        <a href="#" className="flex items-center space-x-5">
                          <span className="font-medium text-heading text-hover-primary transition">
                            {p.title}
                          </span>
                        </a>
                      </td>
                      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                        {p.orderQuantity}
                      </td>
                      <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                        {(p.orderQuantity * p.price).toFixed(0)}đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 py-4 px-4">
            <h5 className="text-center mb-0">Thành tiền</h5>
            <div className="relative overflow-x-auto mx-4">
              <table className="w-full text-base text-left text-gray-500">
                <tbody>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 pt-6 font-normal text-[#55585B] text-start">
                      Số phí
                    </td>
                    <td className="px-3 py-3 pt-6 font-normal text-[#55585B] text-end">
                      {total.toFixed(0)}đ
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Phí giao hàng:
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      {orderData.shippingCost.toFixed(0)}đ
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Tổng thanh toán:
                    </td>
                    <td className="px-3 py-3 text-[#55585B] text-end text-lg font-semibold">
                      {grand_total.toFixed(0)}đ
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* details table */}
      
      {/* details table */}
      <div className="grid grid-cols-12 gap-6 px-6 py-6">
        <div className="col-span-12">
          <div className="bg-white border border-slate-200 px-4">
            <div className="relative overflow-x-auto mx-4">
              <table className="w-full text-base text-left text-gray-500">
                <tbody>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 pt-6 font-normal text-[#55585B] text-start">
                      Phương thức thanh toán
                    </td>
                    <td className="px-3 py-3 pt-6 font-normal text-[#55585B] text-end">
                      {orderData.paymentMethod || "THANH TOÁN KHI NHẬN HÀNG"}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Mã hóa đơn:
                    </td>
                    <td className="px-3 py-3 font-normal text-[#55585B] text-end">
                      #{orderData._id}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Số mặt hàng:
                    </td>
                    <td className="px-3 py-3 text-[#55585B] text-end text-lg font-semibold">
                      {orderData.cart.length}
                    </td>
                  </tr>
                  <tr className="bg-white border-b border-gray6 last:border-0 text-start mx-9">
                    <td className="pr-3 py-3 font-normal text-[#55585B] text-start">
                      Ngày:
                    </td>
                    <td className="px-3 py-3 text-[#55585B] text-end text-lg font-semibold">
                      {dayjs(orderData.createdAt).format('DD/MM/YYYY')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* details table */}

      <div className="flex items-center justify-center flex-wrap px-8 mb-6 bg-white rounded-t-md rounded-b-md  py-6 text-center">
          <h3 className="font-normal mb-0">Cảm ơn bạn đã đặt hàng. Hẹn bạn quay lại!</h3>
      </div>
    </>
  );
};

export default InvoicePrint;
