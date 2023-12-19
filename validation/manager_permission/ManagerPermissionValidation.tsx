import * as Yup from "yup";

const ManagerPermissionValidation = Yup.object().shape({
  href: Yup.string()
    .trim()
    .required("URL không được để trống")
    .max(1000, "URL không quá 1000 ký tự"),
  txt_vi: Yup.string()
    .trim()
    .required("Tên Tiếng Việt không được để trống")
    .max(100, "Tên Tiếng Việt không quá 100 ký tự"),
  txt_ko: Yup.string()
    .trim()
    .required("Tên Tiếng Hàn không được để trống")
    .max(100, "Tên Tiếng Hàn không quá 100 ký tự"),
  description: Yup.string()
    .trim()
    .required("Mô tả không được để trống")
    .max(1000, "Mô tả không quá 1000 ký tự"),
});

export {ManagerPermissionValidation};
