import * as Yup from "yup";

const ManagerPersonalMemberValidation = Yup.object().shape({
  joinstatus: Yup.string().required("Trang đăng ký không được để trống"),
  usergroup: Yup.string().required("Loại tài khoản không được để trống"),
  username: Yup.string()
    .trim()
    .required("ID người dùng không được để trống")
    .max(100, "ID người dùng không quá 100 ký tự"),
  fullname: Yup.string()
    .trim()
    .required("Họ và tên không được để trống")
    .max(255, "Họ và tên không quá 255 ký tự"),
  sex: Yup.string().required("Giới tính không được để trống"),
  // password: Yup.string()
  //   .trim()
  //   .required("Mật khẩu không được để trống")
  //   .max(255, "Mật khẩu không quá 255 ký tự")
  //   .min(6, "Mật khẩu không ít hơn 6 ký tự"),
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
    .required("Sđt không được để trống")
    .matches(/^((\+)|())[0-9]{10,15}$/, "Sđt không hợp lệ"),
  address: Yup.string()
    .trim()
    .required("Địa chỉ không được để trống")
    .max(255, "Địa chỉ không quá 255 ký tự"),
});

export {ManagerPersonalMemberValidation};
