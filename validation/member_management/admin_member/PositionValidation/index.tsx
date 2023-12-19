import * as Yup from "yup";

const PositionValidation = Yup.object().shape({
  id_depart: Yup.string()
    .trim()
    .required("Tên phòng ban không được để trống")
    .max(255, "Tên phòng ban không quá 255 ký tự"),
});

export {PositionValidation};
