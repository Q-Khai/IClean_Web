import {fetcher} from "./Fetcher";
export interface ISystemParameter {
  parameterId: number;
  parameterField: string;
  parameterValue: string;
  updateAt: string;
  updateVersion: string;
}

export interface IResSystemParameter {
  data: ISystemParameter[];
}

export interface IBodySystemSetting {
  parameterId: number;
  parameterValue: string;
}

const path = {
  getSystemParameter: "/system-parameter",
  editSystemParameter: "/system-parameter",
};

function getSystemParameter(): Promise<IResSystemParameter> {
  return fetcher({
    url: path.getSystemParameter,
    method: "get",
  });
}

function editSystemParameter(body: IBodySystemSetting[]): Promise<any> {
  return fetcher({
    url: path.getSystemParameter,
    method: "put",
    data: body,
  });
}

export {getSystemParameter, editSystemParameter};
