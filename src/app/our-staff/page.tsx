import Wrapper from "@/layout/wrapper";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
import AddStaffArea from "../components/our-staff/staff-area";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const CategoryPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <Wrapper>
      <div className="body-content px-8 py-8 bg-slate-100">
        {/* breadcrumb start */}
        <Breadcrumb title="Quản lý" subtitle="Nhân viên quản lý" />
        {/* breadcrumb end */}

        {/*staff area start */}
        <AddStaffArea role={user?.role}/>
        {/*staff area end */}
      </div>
    </Wrapper>
  );
};

export default CategoryPage;
