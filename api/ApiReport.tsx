import {fetcher} from "./Fetcher";

export interface IItemReport {
  reportId?: number;
  fullName?: string;
  phoneNumber?: string;
  reportTypeDetail?: string;
  detail?: string;
  createAt?: string;
  reportStatus?: string;
}

export interface IGetListReportRes {
  data?: {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
    numberOfElements?: number;
    sortBy?: null;
    content?: IItemReport[];
  };
}

export interface IParamGetAllReport {
  renterName?: string;
  displayAll?: boolean;
  page?: number;
  size?: number;
}

export interface IParamGetReportById {
  reportId?: number;
}

export interface IReport {
  data: {
    reportId: number;
    bookingDetailId: number;
    fullName: string;
    phoneNumber: string;
    reportTypeDetail: string;
    detail: string;
    createAt: string;
    reportStatus: string;
    attachmentResponses: [];
  };
}

export interface IReportRefund {
  reason: string;
  refundPercent: string;
}

export interface IRes {
  status: number;
  message: string;
}

const path = {
  getAllReport: "/report",
  getReportById: "/report/",
  putReportRefund: "/report/",
};

function getAllReport(params: IParamGetAllReport): Promise<IGetListReportRes> {
  return fetcher({
    url: path.getAllReport,
    method: "get",
    params: params,
  });
}

function getReportById(id: number): Promise<IReport> {
  return fetcher({
    url: `${path.getReportById}/${id}`,
    method: "get",
  });
}

function putReportRefund(id: number, body: IReportRefund): Promise<any> {
  return fetcher({
    url: `${path.getReportById}/${id}`,
    method: "put",
    data: body,
  });
}

export {getAllReport, getReportById, putReportRefund};
