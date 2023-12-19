import {fetcher} from "@app/api/Fetcher";

export interface IMoneyResponse {
  status?: string;
  message?: string;
  data?: null;
}

export interface IMoneyRequest {
  userPhoneNumber?: string;
  balance?: number;
  moneyRequestType?: string;
}

export interface IMoneyRequestValidated {
  phoneNumber?: string;
  otpToken?: string;
}

const path = {
  sendRequest: "/money-request",
  confirmOtp: "/money-request/validated",
};

function moneyRequest(body: IMoneyRequest): Promise<IMoneyResponse> {
  return fetcher({
    url: path.sendRequest,
    method: "post",
    data: body,
  });
}

export interface IGetTransactionHistory {
  data?: {
    userId?: number;
    phoneNumber?: number;
    fullName?: number;
    roleName?: number;
    dateOfBirth?: number;
    email?: number;
    facebookUid?: null;
    data?: IGetListTransactionHistory;
  };
}

export interface IGetListTransactionHistory {
  requestId?: number;
  pageNumber?: number;
  pageSize?: number;
  totalElements?: number;
  totalPages?: number;
  numberOfElements?: number;
  sortBy?: null;
  content?: IItemTransactionHistory[];
}

export interface IItemTransactionHistory {
  requestId?: number;
  requestDate?: string;
  balance?: number;
  requestStatus?: string;
  processDate?: null;
  requestType?: string;
}

function moneyRequestValidated(
  body: IMoneyRequestValidated
): Promise<IMoneyResponse> {
  return fetcher({
    url: path.confirmOtp,
    method: "post",
    data: body,
  });
}

export interface IParamsGetAllTransactionHistory {
  page?: number;
  size?: number;
  phoneNumber?: string;
}

function transactionHistory(
  params: IParamsGetAllTransactionHistory
): Promise<IGetTransactionHistory> {
  return fetcher({
    url: path.sendRequest,
    method: "get",
    params: params,
  });
}

export {moneyRequest, moneyRequestValidated, transactionHistory};
