import * as Yup from "yup";

const ManagerBannerValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Tên không được để trống")
    .max(255, "Tên không quá 255 ký tự"),
  category: Yup.string().trim().required("Vị trí không được để trống"),
  colorcode: Yup.string()
    .trim()
    .required("Mã màu không được để trống")
    .max(255, "Mã màu không quá 255 ký tự"),
  orderby: Yup.number()
    .typeError("Số đặt hàng phải là một số")
    .required("Số đặt hàng không được để trống")
    .max(127, "Số đặt hàng không lớn hơn 127"),
  search: Yup.string()
    .trim()
    .required("Chức năng tìm kiếm không được để trống"),
  time_range: Yup.array().required("Thời gian đăng bài không được để trống"),
  isused: Yup.string()
    .trim()
    .required("Trạng thái sử dụng không được để trống"),
  linkurl: Yup.string()
    .trim()
    .required("Link nhúng không được để trống")
    .max(255, "Link nhúng không quá 255 ký tự"),
});

export {ManagerBannerValidation};
