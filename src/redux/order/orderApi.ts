import { apiSlice } from "../api/apiSlice";
import {
  IOrderAmounts,
  ISalesReport,
  IMostSellingCategory,
  IDashboardRecentOrders,
  IGetAllOrdersRes,
  IUpdateStatusOrderRes,
  Order,
} from "@/types/order-amount-type";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // getUserOrders
    getDashboardAmount: builder.query<IOrderAmounts, void>({
      query: () => `/api/user-order/dashboard-amount`,
      providesTags: ["DashboardAmount"],
      keepUnusedDataFor: 600,
    }),
    // get sales report
    // useGetSalesReportQuery(value.startDate, value.endDate);
    getSalesReport: builder.query<ISalesReport, { startDate: Date; endDate: Date }>({
      query: (value) => {
        return `/api/user-order/sales-report?startDate=${value.startDate}&endDate=${value.endDate}`;
      },
      providesTags: ["DashboardSalesReport"],
      keepUnusedDataFor: 600,
    }),
    // get selling category
    getMostSellingCategory: builder.query<IMostSellingCategory, void>({
      query: () => `/api/user-order/most-selling-category`,
      providesTags: ["DashboardMostSellingCategory"],
      keepUnusedDataFor: 600,
    }),
    // get recent orders
    getRecentOrders: builder.query<IDashboardRecentOrders, void>({
      query: () => `/api/user-order/dashboard-recent-order`,
      providesTags: ["DashboardRecentOrders"],
      keepUnusedDataFor: 600,
    }),
    // get recent orders
    getAllOrders: builder.query<IGetAllOrdersRes, void>({
      query: () => `/api/order/orders`,
      providesTags: ["AllOrders"],
      keepUnusedDataFor: 600,
    }),
    // get recent orders
    getSingleOrder: builder.query<Order, string>({
      query: (id) => `/api/order/${id}`,
      keepUnusedDataFor: 600,
    }),
    // get recent orders
    updateStatus: builder.mutation<IUpdateStatusOrderRes, { id: string, status: { status: string } }>({
      query({ id, status }) {
        return {
          url: `/api/order/update-status/${id}`,
          method: "PATCH",
          body: status,
        };
      },
      invalidatesTags: ["AllOrders","DashboardRecentOrders"],
    }),
  }),
});

export const {
  useGetDashboardAmountQuery,
  useGetSalesReportQuery,
  useGetMostSellingCategoryQuery,
  useGetRecentOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateStatusMutation,
  useGetSingleOrderQuery,
} = authApi;
