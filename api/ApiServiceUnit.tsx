import {fetcher} from "./Fetcher";
import axios from "axios";
import store from "@app/redux/store";

export interface IResGetUnit {
  data: IUnit[];
}

export interface IUnit {
  unitId: number;
  unitDetail: string;
  unitValue: string;
  isDeleted: boolean;
  createAt: string;
}

export interface IServicePrice {
  id: number;
  price: number;
  employeeCommission: number;
}

export interface IServiceUnitDetail {
  defaultPrice: number;
  helperCommission: number;
  unitId: number;
  serviceId?: number;
  servicePrices: IServicePrice[];
}

export interface IServiceUnitDetail1 {
  data(data: any): unknown;
  defaultPrice: number;
  helperCommission: number;
  unitId: number;
  serviceId: number;
  servicePrices: IServicePrice1[];
}

export interface IServicePrice1 {
  id: number;
  price: number;
  employeeCommission: number;
  startTime: string;
  endTime: string;
}

export interface IServiceUnit {
  serviceUnitId: number;
  unitId: number;
  unitDetail: string;
  unitValue: number;
  defaultPrice: number;
  helperCommission: number;
}

interface IResGetServiceUnit {
  data: IServiceUnit[];
}

interface IRes {
  status: string;
  message: string;
  data: null;
}

export interface IServiceData {
  serviceName: string;
  description: string;
  serviceAvatar: any;
  serviceFileImages: any[];
}

const path = {
  getUnit: "/unit",
  createServiceUnit: "/service-unit",
  getAllServiceUnit: "/service-unit",
  getServiceUnitDetail: "/service-unit/",
  editServceUnit: "/service-unit/",
};

function getUnit(): Promise<IResGetUnit> {
  return fetcher({
    url: path.getUnit,
    method: "get",
  });
}

export interface IParamGetServiceUnit {
  serviceId: number;
}

export interface IGetServiceUnitDetail {
  data: IServiceUnitDetail1;
}

export interface IEditServceUnit {
  defaultPrice: number;
  helperCommission: number;
  servicePriceRequests?: {
    id: number;
    price: number;
    employeeCommission: number;
  }[];
}

function getAllServiceUnit(
  param: IParamGetServiceUnit
): Promise<IResGetServiceUnit> {
  return fetcher({
    url: path.getAllServiceUnit,
    method: "get",
    params: param,
  });
}

function getServiceUnitDetail(id: number): Promise<IGetServiceUnitDetail> {
  return fetcher({
    url: `${path.getServiceUnitDetail}/${id}`,
    method: "get",
  });
}

function createServiceUnit(body: IServiceUnitDetail): Promise<IRes> {
  return fetcher({
    url: path.createServiceUnit,
    method: "post",
    data: body,
  });
}

function editServceUnit(id: number, body: IEditServceUnit): Promise<IRes> {
  return fetcher({
    url: `${path.editServceUnit}${id}`,
    method: "put",
    data: body,
  });
}

function createService(formData: FormData) {
  const state = store.getState();
  const token = state.user?.accessToken;
  // Cấu hình header
  console.log(token);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`,
    },
  };
  console.log(config.headers);
  axios
    .post("https://iclean.azurewebsites.net/api/v1/service", formData, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });
}

export {
  getUnit,
  createServiceUnit,
  createService,
  getAllServiceUnit,
  getServiceUnitDetail,
  editServceUnit,
};
