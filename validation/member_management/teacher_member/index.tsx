import * as Yup from "yup";

const ManagerTeacherMemberValidation = Yup.object().shape({
  username: Yup.string()
    .trim()
    .required("ID giảng viên không được để trống")
    .max(100, "ID giảng viên không quá 100 ký tự"),
  fullname: Yup.string()
    .trim()
    .required("Tên giảng viên không được để trống")
    .max(255, "Tên giảng viên không quá 255 ký tự"),
  birthday: Yup.string().required("Ngày sinh không được để trống"),
  sex: Yup.string().required("Giới tính không được để trống"),
  phone1: Yup.string()
    .trim()
    .required("Sđt không được để trống")
    .matches(/^((\+)|())[0-9]{10,15}$/, "Sđt không hợp lệ"),
  email: Yup.string()
    .trim()
    .required("Email không được để trống")
    .matches(
      /^\s*([\w.]){6,255}(-)?@([\w]+\.)+[\w]{2,4}\s*$/,
      "Email không hợp lệ"
    ),
  nationality: Yup.string().required("Quốc tịch không được để trống"),
  teachingtype: Yup.array()
    .required("Loại hình giảng dạy không được để trống")
    .min(1, "Loại hình giảng dạy không được để trống"),
  teaching_level: Yup.array()
    .required("Cấp độ giảng viên không được để trống")
    .min(1, "Cấp độ giảng viên không được để trống"),
});

export {ManagerTeacherMemberValidation};
