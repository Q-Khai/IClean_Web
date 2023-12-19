function formatMoney(inputMoney: any) {
  if (inputMoney === undefined) return "";
  return inputMoney.toLocaleString("vi-VN") + "đ";
}

export {formatMoney};
