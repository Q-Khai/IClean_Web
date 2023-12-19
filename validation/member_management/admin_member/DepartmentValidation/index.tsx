import * as Yup from "yup";

const DepartmentValidation = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required("Tên phòng ban không được để trống")
    .max(255, "Tên phòng ban không quá 255 ký tự"),
  phone: Yup.string()
    .trim()
    .matches(/^((\+)|())[0-9]{10,15}$/, "SĐT không hợp lệ"),
  email: Yup.string()
    .trim()
    .matches(
      /^\s*([\w.]){6,255}(-)?@([\w]+\.)+[\w]{2,4}\s*$/,
      "Email không hợp lệ"
    ),
});

export {DepartmentValidation};
