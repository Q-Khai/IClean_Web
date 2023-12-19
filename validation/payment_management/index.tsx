import * as Yup from "yup";

const PaymentManagementValidation = Yup.object().shape({
  userid: Yup.string().required("ID người dùng không được để trống"),
  category_id: Yup.string().required("Danh mục học không được để trống"),
  class_id: Yup.string().required("Khóa học không được để trống"),
  timemodified: Yup.string().required("Ngày mua khóa học không được để trống"),
  paymethod: Yup.string().required(
    "Phương thức thanh toán không được để trống"
  ),
  profit: Yup.number()
    .typeError("Doanh thu phải là số nguyên dương")
    .required("Doanh thu không được để trống")
    .min(1, "Doanh thu phải là số nguyên dương"),
});

export {PaymentManagementValidation};
