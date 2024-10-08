import React from 'react';

const ProductTableHead = () => {
  return (
    <thead className="bg-white">
      <tr className="border-b border-gray6 text-tiny">
        <th scope="col" className="pr-8 py-3 text-tiny text-text2 uppercase font-semibold">
          Sản phẩm
        </th>
        <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
          Mã hàng
        </th>
        <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
          Số lượng kho
        </th>
        <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
          Giá
        </th>
        <th scope="col" className="px-3 py-3 text-tiny text-text2 uppercase font-semibold w-[170px] text-end">
          Trạng thái
        </th>
        <th scope="col" className="px-9 py-3 text-tiny text-text2 uppercase  font-semibold w-[12%] text-end">
          Cập nhật
        </th>
      </tr>
    </thead>
  );
};

export default ProductTableHead;