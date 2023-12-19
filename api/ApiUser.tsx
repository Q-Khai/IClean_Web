import {fetcher} from "./Fetcher";
import store from "../redux/store";

export interface ILoginBody {
  username: string;
  password: string;
  // has_role: boolean;
}
export interface ILoginResponse {
  response: {
    accessToken: string;
    expires_in: number;
    pass_jwt: string;
  };
  role: any;
}

export interface IParamsGetUser {
  sort?: string[];
  searchFields?: string[];
  pageSize?: number;
  pageNumber?: number;
  disablePagination?: boolean;
  search?: string;
  searchType?: string;
}

export interface IGetUserResponse {
  response?: {
    data?: {
      id?: number;
      firstname?: string;
      email?: string;
      url_image?: string;
    };
  };
}

interface IParamsGetAllUser {
  page?: number;
  size?: number;
  role?: string;
  sort?: string[];
}
export interface IItemUser {
  userId?: number;
  fullName?: string;
  phoneNumber?: string;
  roleName?: string;
  dateOfBirth?: string;
  defaultAddress?: string;
  avatar?: string;
  isLocked?: boolean;
  email?: string;
}

export interface IGetListUser {
  data?: {
    offset?: number;
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
    numberOfElements?: number;
    sortBy?: null;
    content?: IItemUser[];
  };
}

const path = {
  getUser: "/auth/get-user",
  login: "/auth",
  getAllUser: "/user",
};

function getAllUser(params: IParamsGetAllUser): Promise<IGetListUser> {
  return fetcher({
    url: path.getAllUser,
    method: "get",
    params: params,
  });
}

function banOrUnbanUser(params: {userId: number}): Promise<any> {
  return fetcher({
    url: `${path.getAllUser}/${params.userId}`,
    method: "put",
    // params: {
    //   userId: params.userId,
    // },
  });
}

function login(body: ILoginBody): Promise<ILoginResponse> {
  return fetcher({url: path.login, method: "post", data: body});
}

function getUser(): Promise<IGetUserResponse> {
  return fetcher({url: path.getUser, method: "get"});
}

function isLogin(): boolean {
  const {user} = store.getState();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return !!user?.accessToken;
}

export default {
  login,
  isLogin,
  getUser,
  getAllUser,
  banOrUnbanUser,
};
