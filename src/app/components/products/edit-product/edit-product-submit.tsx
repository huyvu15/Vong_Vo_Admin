"use client";
import React from "react";
import useProductSubmit from "@/hooks/useProductSubmit";
import ErrorMsg from "../../common/error-msg";
import FormField from "../form-field";
import DescriptionTextarea from "../add-product/description-textarea";
import { useGetProductQuery } from "@/redux/product/productApi";
import ProductTypeBrand from "../add-product/product-type-brand";
import ProductVariants from "../add-product/product-variants";
import ProductImgUpload from "../add-product/product-img-upload";
import Tags from "../add-product/tags";
import ProductCategory from "../../category/product-category";
import { TagsInput } from "react-tag-input-component";

const EditProductSubmit = ({ id }: { id: string }) => {
  const { data: product, isError, isLoading } = useGetProductQuery(id);
  const {
    handleSubmit,
    register,
    errors,
    tags,
    setTags,
    control,
    setCategory,
    setParent,
    setChildren,
    setImg,
    img,
    setBrand,
    setItemInfo,
    isSubmitted,
    relatedImages,
    setRelatedImages,
    setColors,
    colors,
    handleEditProduct,
  } = useProductSubmit();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Đang tải....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="Có lỗi xảy ra" />;
  }
  if (!isLoading && !isError && product) {
    content = (
      <form onSubmit={handleSubmit((data) => {
        handleEditProduct(data, id)
      })}>
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* left side */}
          <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
            <div className="mb-6 bg-white px-8 py-8 rounded-md">
              <h4 className="text-[22px]">Sản phẩm</h4>
              <FormField
                label="Tên"
                title="title"
                isRequired={true}
                placeHolder="Tên sản phẩm"
                register={register}
                errors={errors}
                defaultValue={product.title}
              />
              <DescriptionTextarea
                register={register}
                errors={errors}
                defaultValue={product.description}
              />
            </div>

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-6">
                <FormField
                  label="Giá"
                  title="price"
                  isRequired={true}
                  placeHolder="Giá sản phẩm"
                  bottomTitle="Đặt giá cho sản phẩm."
                  type="number"
                  defaultValue={product.price}
                  register={register}
                  errors={errors}
                />
                <FormField
                  label="Mã hàng"
                  title="sku"
                  isRequired={true}
                  placeHolder="Mã hàng"
                  bottomTitle="Nhập mã hàng."
                  defaultValue={product.sku}
                  register={register}
                  errors={errors}
                />
                <FormField
                  label="Số lượng kho"
                  title="quantity"
                  isRequired={true}
                  placeHolder="Số lượng kho"
                  bottomTitle="Nhập số lượng trong kho."
                  type="number"
                  defaultValue={product.quantity}
                  register={register}
                  errors={errors}
                />
                <FormField
                  label="Giảm giá"
                  title="discount"
                  type="number"
                  isRequired={false}
                  placeHolder="Giảm giá"
                  bottomTitle="Đặt phần trăm giảm giá."
                  defaultValue={product.discount}
                  register={register}
                  errors={errors}
                />
                <div>
                  <p className="mb-0 text-base text-black">Màu sắc</p>
                  <TagsInput
                    value={product.colors}
                    name="colors"
                    onChange={(tags) => setColors(tags)}
                    placeHolder="Nhập màu"
                  />
                </div>
                {/* <div>
                  <p className="mb-0 text-base text-black">Phân loại sản phẩm</p>
                  <select
                    {...register("itemInfo")}
                    className="input w-full h-[44px] rounded-md border border-gray6 px-6 text-base"
                    defaultValue={product.itemInfo}
                    name="itemInfo"
                    onChange={(e) => setItemInfo(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="best-selling">Bán chạy</option>
                    <option value="latest-product">Mới nhất</option>
                    <option value="top-rated">Xếp hạng cao</option>
                  </select>
                </div> */}
              </div>
            </div>

            {/* product type and brands start */}
            <ProductTypeBrand
              register={register}
              errors={errors}
              control={control}
              setSelectBrand={setBrand}
              default_value={{
                brand: product.brand.name,
                unit: product.unit,
              }}
            />
            {/* product type and brands end */}

            {/* product variations start */}
            <ProductVariants
              isSubmitted={isSubmitted}
              setImageURLs={setRelatedImages}
              relatedImages={relatedImages}
              default_value={product.relatedImages}
            />
            {/* product variations end */}
          </div>

          {/* right side */}
          <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
            <ProductImgUpload
              imgUrl={img}
              setImgUrl={setImg}
              default_img={product.image}
              isSubmitted={isSubmitted}
            />

            <div className="bg-white px-8 py-8 rounded-md mb-6">
              <p className="mb-5 text-base text-black">Thể loại</p>
              {/* category start */}
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-3 mb-5">
                <ProductCategory
                  setCategory={setCategory}
                  setParent={setParent}
                  setChildren={setChildren}
                  default_value={{
                    parent: product.category.name,
                    id: product.category.id,
                    children: product.children,
                  }}
                />
                <Tags
                  tags={tags}
                  setTags={setTags}
                  default_value={product.tags}
                />
              </div>
            </div>
          </div>
        </div>
        <button className="tp-btn px-5 py-2 mt-5" type="submit">
          Cập nhật
        </button>
      </form>
    );
  }

  return <>{content}</>;
};

export default EditProductSubmit;
