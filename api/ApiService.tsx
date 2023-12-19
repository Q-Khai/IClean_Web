import {fetcher} from "./Fetcher";

export interface IItemService {
  serviceId?: number;
  serviceName?: string;
  serviceImage?: string;
  isDeleted?: boolean;
  createAt?: string;
}

export interface IGetListServiceRes {
  data?: IItemService[];
}

export interface IResGetService {
  data: IService;
}

export interface IService {
  serviceId: number;
  serviceName: string;
  description: string;
  serviceIcon: string;
  createAt: string;
  images: {serviceImage: string}[];
}

const path = {
  getUser: "/auth/get-user",
  login: "/auth",
  getAllService: "/service/inactive",
  getServiceById: "/service",
};

function getAllService(): Promise<IGetListServiceRes> {
  return fetcher({
    url: path.getAllService,
    method: "get",
  });
}

function getServiceById(id: number | undefined): Promise<IResGetService> {
  return fetcher({
    url: `${path.getServiceById}/${id}`,
    method: "get",
  });
}

export {getAllService, getServiceById};
