import * as Yup from "yup";

const ManagerPopupValidation = Yup.object().shape({
  title: Yup.string()
    .required("Tên không được để trống")
    .max(255, "Tên không quá 255 ký tự"),
  time_range: Yup.array().required("Thời gian đăng bài không được để trống"),
  link_embed: Yup.string()
    .required("Link nhúng không được để trống")
    .max(255, "Link nhúng không quá 255 ký tự"),
  popupwidth: Yup.number()
    .typeError("Chiều rộng hàng phải là một số")
    .required("Chiều rộng hàng không được để trống")
    .max(32767, "Chiều rộng hàng không lớn hơn 32767")
    .min(1, "Chiều rộng hàng phải là số nguyên dương"),
  popupheight: Yup.number()
    .typeError("Chiều cao hàng phải là một số")
    .required("Chiều cao hàng không được để trống")
    .max(32767, "Chiều cao hàng không lớn hơn 32767")
    .min(1, "Chiều cao hàng phải là số nguyên dương"),
  popupx: Yup.number()
    .typeError("Vị trí X hàng phải là một số")
    .required("Vị trí X hàng không được để trống")
    .max(32767, "Vị trí X hàng không lớn hơn 32767")
    .min(1, "Vị trí X phải là số nguyên dương"),
  popupy: Yup.number()
    .typeError("Vị trí Y hàng phải là một số")
    .required("Vị trí Y hàng không được để trống")
    .max(32767, "Vị trí Y hàng không lớn hơn 32767")
    .min(1, "Vị trí Y phải là số nguyên dương"),
});

export {ManagerPopupValidation};
