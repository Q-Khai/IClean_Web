import * as Yup from "yup";

const CompanyMemberManagementValidation = Yup.object().shape({
  username: Yup.string()
    .required("ID công ty không được để trống")
    .max(100, "ID công ty không quá 100 ký tự"),
  password: Yup.string()
    .trim()
    .required("Mật khẩu không được để trống")
    .max(255, "Mật khẩu không quá 255 ký tự")
    .min(6, "Mật khẩu không ít hơn 6 ký tự"),
  company_name: Yup.string()
    .trim()
    .required("Tên công ty không được để trống")
    .max(255, "Tên công ty không quá 255 ký tự"),
  skill_groups: Yup.array()
    .required("Lĩnh vực không được để trống")
    .min(1, "Lĩnh vực không được để trống"),
  city: Yup.string().required("Khu vực không được để trống"),
  company_address: Yup.string()
    .trim()
    .required("Địa chỉ không được để trống")
    .max(255, "Địa chỉ không quá 255 ký tự"),
  fullname: Yup.string()
    .trim()
    .required("Tên người đại diện không được để trống")
    .max(255, "Tên người đại diện không quá 255 ký tự"),
  phone: Yup.string()
    .trim()
    .required("Sđt đại diện không được để trống")
    .matches(/^((\+)|())[0-9]{10,15}$/, "Sđt đại diện không hợp lệ"),
  email: Yup.string()
    .trim()
    .required("Email không được để trống")
    .matches(
      /^\s*([\w.]){6,255}(-)?@([\w]+\.)+[\w]{2,4}\s*$/,
      "Email không hợp lệ"
    ),
});

export {CompanyMemberManagementValidation};
