import { ISidebarMenus } from "./../types/menu-types";
import {
  Dashboard,
  Categories,
  Coupons,
  Orders,
  Pages,
  Products,
  Profile,
  Reviews,
  Setting,
  Leaf,
  StuffUser,
} from "@/svg";

const sidebar_menu: Array<ISidebarMenus> = [
  {
    id: 1,
    icon: Dashboard,
    link: "/dashboard",
    title: "Tổng quan",
  },
  {
    id: 2,
    icon: Products,
    link: "/product-list",
    title: "Sản phẩm",
    subMenus: [
      { title: "Danh sách sản phẩm", link: "/product-list" },
      { title: "Lưới sản phẩm", link: "/product-grid" },
      { title: "Thêm sản phẩm", link: "/add-product" }
    ],
  },
  {
    id: 3,
    icon: Categories,
    link: "/category",
    title: "Thể loại",
  },
  {
    id: 4,
    icon: Orders,
    link: "/orders",
    title: "Đơn đặt hàng",
  },
  {
    id: 5,
    icon: Leaf,
    link: "/brands",
    title: "Thương hiệu",
  },
  {
    id: 6,
    icon: Coupons,
    link: "/coupon",
    title: "Mã giảm giá",
  },
  {
    id: 7,
    icon: Profile,
    link: "/profile",
    title: "Hồ sơ",
  }
];

export default sidebar_menu;
