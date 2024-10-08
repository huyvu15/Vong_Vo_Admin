import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import OrderArea from "../components/orders/order-area";

const OrdersPage = () => {
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Đơn đặt hàng" subtitle="Danh sách đơn hàng" />
        {/* breadcrumb end */}

        {/* order area start */}
        <OrderArea />
        {/* order area end */}
      </div>
    </Wrapper>
  );
};

export default OrdersPage;
