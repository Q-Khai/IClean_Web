import * as Yup from "yup";

const AdminAccountValidation = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("ID người dùng không được để trống")
    .max(100, "ID người dùng không quá 100 ký tự"),
  password: Yup.string()
    .trim()
    .required("Mật khẩu không được để trống")
    .max(255, "Mật khẩu không quá 255 ký tự")
    .min(6, "Mật khẩu không ít hơn 6 ký tự"),
  department: Yup.array()
    .required("PB & CV không được để trống")
    .min(1, "PB & CV không được để trống"),
  sex: Yup.string().trim().required("Giới tính không được để trống"),
  fullname: Yup.string()
    .required("Họ và tên không được để trống")
    .max(255, "Họ và tên không quá 255 ký tự"),
  birthday: Yup.string().required("Ngày sinh không được để trống"),
  email: Yup.string()
    .trim()
    .required("Email không được để trống")
    .matches(
      /^\s*([\w.]){6,255}(-)?@([\w]+\.)+[\w]{2,4}\s*$/,
      "Email không hợp lệ"
    ),
  phone: Yup.string()
    .trim()
    .required("SĐT không được để trống")
    .matches(/^((\+)|())[0-9]{10,15}$/, "Sđt không hợp lệ"),
});

export {AdminAccountValidation};
