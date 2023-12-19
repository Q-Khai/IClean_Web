import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {notification} from "antd";
import _ from "lodash";
import Config from "../config";
import store from "../redux/store";

export interface IDataError {
  errorCode?: string | number;
  errorMessageArr?: any[];
}

export interface IMetadata {
  time?: string;
  totalPages: number;
  totalItems: number;
  currentPage: number;
  pageSize?: number;
}

export interface IDataWithMeta<T> {
  meta: IMetadata;
  data: T;
}

export interface IResponseDTO {
  status: boolean;
  headerCode: number;
  errorCode: number;
  responses?: any;
}
interface IErrorDTO {
  status?: boolean;
  headerCode?: number;
  response: {
    message: any;
  };
}

interface IFetcherOptions {
  token?: string;
  withToken?: boolean;
  withMetadata?: boolean;
  displayError?: boolean;
  displaySuccess?: boolean;
  typeSuccess?: "delete" | "add" | "update" | "default" | string;
}

export interface IRefreshToken {
  accessToken: string;
  refreshToken: string;
}

function displayError(dataError: IDataError): void {
  try {
    let errorMessage;
    const {errorMessageArr} = dataError;
    if (errorMessageArr) {
      errorMessage = Object.values(errorMessageArr);
    } else {
      errorMessage = "Có lỗi xảy ra.Vui lòng liên hệ bộ phận kĩ thuật";
    }

    notification.error({
      message: errorMessageArr ? errorMessage[0] : errorMessage,
      duration: 3,
    });
  } catch (e) {
    notification.error({
      message: "Có lỗi xảy ra",
      description: _.toString(e) || "Vui lòng liên hệ bộ phận kĩ thuật",
      duration: 3,
    });
  }
}
function displaySuccess(typeSuccess: string): void {
  let sucessMessage;
  if (typeSuccess) {
    if (typeSuccess === "delete") sucessMessage = "Xóa thành công";
    else if (typeSuccess === "add") sucessMessage = "Thêm thành công";
    else sucessMessage = "Cập nhật thành công";
    notification.success({
      message: sucessMessage,
      duration: 3,
    });
  } else {
    notification.error({
      message: "Có lỗi xảy ra.Vui lòng liên hệ bộ phận kĩ thuật",
      duration: 3,
    });
  }
}
export async function fetcher<T>(
  config: AxiosRequestConfig,
  options: IFetcherOptions = {}
): Promise<T> {
  const defaultOptions: IFetcherOptions = {
    withToken: Config.NETWORK_CONFIG.USE_TOKEN,
    withMetadata: Config.NETWORK_CONFIG.WITH_METADATA,
    displayError: Config.NETWORK_CONFIG.DISPLAY_ERROR,
    displaySuccess: Config.NETWORK_CONFIG.DISPLAY_SUCCESS,
    typeSuccess: Config.NETWORK_CONFIG.TYPE_SUCCESS,
    ...options,
  };

  const apiClient = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: Config.NETWORK_CONFIG.API_BASE_URL,
    timeout: Config.NETWORK_CONFIG.TIMEOUT,
  });

  // Access Tokenp
  if (defaultOptions.token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${defaultOptions.token}`;
  } else {
    if (defaultOptions.withToken) {
      const state = store.getState();
      const token = state.user?.accessToken;
      if (token) {
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
      }
    }
  }

  return new Promise<T>((resolve, reject) => {
    apiClient
      .request<T, AxiosResponse<IResponseDTO>>(config)
      .then(async (response) => {
        if (response) {
          if (response.data === undefined) {
            const dataEmpty: IDataError = {
              errorCode: "ERROR???",
              errorMessageArr: [{err: ["Không có dữ liệu"]}],
            };
            if (defaultOptions.displayError) {
              displayError(dataEmpty);
            }
            reject(dataEmpty);
            return;
          }
          if (defaultOptions.displaySuccess) {
            displaySuccess(defaultOptions.typeSuccess as string);
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          resolve(response.data);
        }
        // const dataError: any = {
        //   errorCode: response?.data?.headerCode,
        //   errorMessageArr: response?.data?.responses?.message,
        // };
        // if (defaultOptions.displayError) {
        //   displayError(dataError);
        // }
        // reject(dataError);
      })
      .catch((error: AxiosError<IErrorDTO>) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            notification.error({
              message: "Phiên đăng nhập đã hết hạn",
              description: "Vui lòng đăng nhập lại",
            });
            window.location.href = "/login";
          } else {
            const dataError: IDataError = {
              errorCode: error.response?.data?.headerCode,
              errorMessageArr: error.response?.data?.response?.message,
            };

            if (defaultOptions.displayError) {
              displayError(dataError);
            }
          }
        } else {
          // Native error
          notification.error({
            message: "Something is wrong. Please try again",
            description: _.toString(error),
          });
        }

        return reject(error);
      });
  });
}

export async function downloadFile({
  url,
  params,
}: {
  url: string;
  params?: any;
}): Promise<unknown> {
  const apiClient = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: Config.NETWORK_CONFIG.API_BASE_URL,
    timeout: Config.NETWORK_CONFIG.TIMEOUT,
  });

  // Access Token
  const state = store.getState();
  const token = state.user?.data?.accessToken;
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    apiClient
      .request<unknown, AxiosResponse<Blob>>({
        url: url,
        method: "GET",
        responseType: "blob",
        params: params,
      })
      .then((response) => {
        const href = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", `${url}.xlsx`);
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(href);
        notification.success({
          message: "File đang được tải về",
        });

        resolve("OK");
      })
      .catch(() => {
        notification.error({
          message: "Tải file không thành công",
        });
        reject();
      });
  });
}
