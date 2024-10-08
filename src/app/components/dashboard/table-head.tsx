import React from "react";

function ThItem({ title,cls }: { title: string,cls?:string }): React.JSX.Element {
  return (
    <th
      scope="col"
      className={`px-3 py-3 text-tiny text-text2 uppercase font-semibold ${cls}`}
    >
      {title}
    </th>
  );
}

const TableHead = () => {
  return (
    <thead className="bg-white">
      <tr className="border-b border-gray6 text-tiny">
        <ThItem title="Mã sản phẩm" />
        <ThItem title="Tên sản phẩm" />
        <ThItem title="Tồn kho" />
        <ThItem title="Cập nhật" />
      </tr>
    </thead>
  );
};

export default TableHead;
