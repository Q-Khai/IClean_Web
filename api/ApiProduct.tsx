import {fetcher} from "./Fetcher";

interface IParamsGetAllBooking {
  page?: number;
  size?: number;
  statuses?: string[] | string;
  isHelper?: boolean;
  sort?: string[];
  startDate?: string;
  endDate?: string;
}

interface IParamsGetAllApply {
  isAllRequest?: boolean;
  page?: number;
  size?: number;
  sort?: string[];
  statuses?: string;
}

export interface IListItemBooking {
  bookingId?: number;
  bookingCode?: string;
  renterName?: string;
  renterAvatar?: string;
  renterPhoneNumber?: string;
  serviceNames?: string;
  serviceAvatar?: string;
  orderDate?: string;
  requestCount?: number;
  totalPrice?: number;
  totalPriceActual?: number;
  updateAt?: string;
  bookingStatus?: string;
  managerName?: string;
}

export interface IGetAllBookingRes {
  data?: {
    content?: [
      {
        bookingId?: number;
        bookingCode?: string;
        renterName?: string;
        renterAvatar?: string;
        renterPhoneNumber?: string;
        serviceNames?: string;
        serviceAvatar?: string;
        orderDate?: string;
        requestCount?: number;
        totalPrice?: number;
        totalPriceActual?: number;
        updateAt?: string;
        bookingStatus?: string;
        managerName?: string;
      }[]
    ];
  };
}

export interface IItemApplyRes {
  helperInformationId?: number;
  personalAvatar?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  placeOfResidence?: string;
  homeTown?: string;
  fullName?: string;
  status?: string;
}

export interface IGetAllApplyRes {
  data?: {
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
    numberOfElement?: number;
    content?: IItemApplyRes[];
  };
}

export interface IListServiceDetailApply {
  serviceRegistrationId?: number;
  serviceName?: string;
  serviceIcon?: string;
  createAt?: string;
  status?: string;
}
export interface IGetDetailApplyRes {
  data?: {
    helperInformationId?: number;
    personalAvatar?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    placeOfResidence?: string;
    homeTown?: string;
    fullName?: string;
    status?: string;
    attachments?: string[];
    services?: IListServiceDetailApply[];
  };
}

export interface IDetailBookingRes {
  data?: {
    bookingId?: number;
    latitude?: number | string;
    longitude?: number | string;
    locationDescription?: string;
    orderDate?: string;
    totalPrice?: number;
    totalPriceActual?: number;
    requestCount?: number;
    rejectionReasonContent?: string | null;
    rejectionReasonDescription?: string | null;
    bookingCode?: string;
    renterName?: string;
    renterAvatar?: string;
    currentStatus?: string;
    details?: {
      bookingDetailId?: number;
      bookingCode?: string;
      orderDate?: string;
      serviceId?: number;
      serviceUnitId?: number;
      serviceName?: string;
      serviceIcon?: string;
      workDate?: string;
      note?: string;
      workTime?: string;
      value?: string;
      equivalent?: number;
      price?: number;
      status?: string;
    }[];
  };
}

export interface IListRejectReasonRes {
  data?: {
    rejectionReasonContent?: string;
    rejectionReasonId?: number;
  }[];
}

export interface IResSetBooking {
  timestamp: string;
  status: number;
  error: string;
  path: string;
}

const path = {
  getAllBooking: "/booking",
  setBookingForManager: "/booking/setBookingForManager",
  rejectApproveBookingPath: "/booking/manager",
  listRejectReason: "/rejection-reason",
  sendMoney: "money-request/sendMoney/",

  getAllApply: "/helper-registration",
  cancelApplyPath: "/helper-registration/cancellation",
  acceptApplyPath: "/helper-registration/acceptance",
  confirmApplyPath: "/helper-registration/confirmation",
  setApplyForManager: "/helper-registration/setManager",
};

function rejectAproveBooking(params: {
  id: number;
  action: string;
  rejectionReasonId?: number;
  rejectionReasonDetail?: number;
}): Promise<any> {
  return fetcher({
    url: `${path.rejectApproveBookingPath}/${params.id}`,
    method: "put",
    data: {
      action: params.action,
      rejectionReasonId: params.rejectionReasonId,
      rejectionReasonDetail: params.rejectionReasonDetail,
    },
  });
}

function getAllBooking(
  params: IParamsGetAllBooking
): Promise<IGetAllBookingRes> {
  return fetcher({
    url: path.getAllBooking,
    method: "get",
    params: params,
  });
}

function setBookingForManager(): Promise<IResSetBooking> {
  return fetcher({
    url: path.setBookingForManager,
    method: "post",
  });
}

function getDetailBooking(params: {id: number}): Promise<IDetailBookingRes> {
  return fetcher({
    url: `${path.getAllBooking}/${params.id}`,
    method: "get",
  });
}

function getListRejectReason(): Promise<IListRejectReasonRes> {
  return fetcher({
    url: path.listRejectReason,
    method: "get",
  });
}

function getAllApply(params: IParamsGetAllApply): Promise<IGetAllApplyRes> {
  return fetcher({
    url: path.getAllApply,
    method: "get",
    params: params,
  });
}

function getDetailApplyById(params: {id: number}): Promise<IGetDetailApplyRes> {
  return fetcher({
    url: `${path.getAllApply}/${params.id}`,
    method: "get",
  });
}

function cancelApply(params: {id: number; reason: string}): Promise<any> {
  return fetcher({
    url: `${path.cancelApplyPath}/${params.id}`,
    method: "put",
    data: {
      reason: params.reason,
    },
  });
}

function acceptApply(params: {id: number}): Promise<any> {
  return fetcher({
    url: `${path.acceptApplyPath}/${params.id}`,
    method: "post",
  });
}

function confirmApply(params: {
  id: number;
  serviceRegistrationIds: number[];
}): Promise<any> {
  return fetcher({
    url: `${path.confirmApplyPath}/${params.id}`,
    method: "post",
    data: {
      serviceRegistrationIds: params.serviceRegistrationIds,
    },
  });
}

export interface IRes {
  status: string;
  message: string;
  data: null;
}

function setApplyForManager(): Promise<IRes> {
  return fetcher({
    url: path.setApplyForManager,
    method: "post",
  });
}

function sendMoney(id : number | undefined): Promise<IRes> {
  return fetcher({
    url: `${path.sendMoney}/${id}`,
    method: "post",
  });
}

export {
  getAllBooking,
  rejectAproveBooking,
  getDetailBooking,
  getListRejectReason,
  getAllApply,
  cancelApply,
  acceptApply,
  confirmApply,
  getDetailApplyById,
  setBookingForManager,
  setApplyForManager,
  sendMoney,
};
