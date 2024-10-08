import React from "react";
import { IProduct } from "@/types/product-type";
import Link from "next/link";
import { Edit } from "@/svg";

const TableItem = (props: { product: IProduct }) => {
  const { product } = props;
  // const p_method =
  //   order.paymentMethod === "COD"
  //     ? "Cash"
  //     : order.paymentMethod === "Card"
  //     ? "Card"
  //     : order.paymentMethod;
  return (
    <tr className="bg-white border-b border-gray6 last:border-0 text-start">
      <td className="px-3 py-3">#{product.sku}</td>

      <td className="px-3 py-3">{product.title}</td>
      <td className="px-3 py-3">{product.quantity}</td>
      <td className="px-3 py-3">
        <div className="relative">
          <Link href={`/edit-product/${product._id}`}>
            <button
              className="w-10 h-10 leading-10 text-tiny bg-success text-white rounded-md hover:bg-green-600"
            >
              <Edit />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default TableItem;
