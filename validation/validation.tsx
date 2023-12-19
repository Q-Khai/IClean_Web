import * as Yup from "yup";

// Mẫu code một số validate dùng nhiều
// Check trong file validate tester gửi

const phoneReg = /^((\+)|())[0-9]{10,15}$/;
const emailReg = /^\s*([\w.]){6,255}(-)?@([\w]+\.)+[\w]{2,4}\s*$/;

const TestValidation = Yup.object().shape({
  // đối với chuỗi string
  string: Yup.string()
    .trim() // bỏ cách đầu cuối
    .required("...không được để trống") // trường bắt buộc
    .max(255, "...không quá 255 ký tự") // max bao nhiêu kí tự
    .min(0, "...ít nhất 0 kí tự") // min bao nhiêu ký tự
    .matches(phoneReg, "Số điện thoại không hợp lệ") // số điện thoại (có thể có dấu + đầu dòng, số nguyên 10 - 15 kí tự)
    .matches(emailReg, "Email không hợp lệ"), // email

  // đối với số number
  number: Yup.number()
    .typeError("...phải là một số") // thông báo sai kiểu dữ liệu (bắt buộc phải có)
    .required("...không được để trống") // trường bắt buộc
    .max(128, "...không lớn hơn 128") // max
    .min(0, "...không lớn hơn 128"), // min

  // đối với mảng array
  array: Yup.array().required("...không được để trống"), // trường bắt buộc
});

export {TestValidation};
