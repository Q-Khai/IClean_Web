import * as Yup from "yup";

const LoginValidation = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(5, "Tên đăng nhập phải trên 5 ký tự")
    .max(100, "Tên đăng nhập không quá 100 ký tự")
    .required("Tên đăng nhập không được để trống"),
  password: Yup.string()
    .trim()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu phải trên 6 ký tự")
    .max(255, "Mật khẩu không quá 255 ký tự")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{0,}$/g,
      "Mật khẩu phải chứa ít nhất 1 chữ cái thường, 1 ký tự đặc biệt và 1 số"
    ),
});

export {LoginValidation};
