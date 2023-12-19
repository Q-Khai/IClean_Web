import {fetcher} from "./Fetcher";

export interface IDashboardRes {
  data: {
    sumOfAllUserWithoutAdmin: number;
    sumOfNewUserInCurrentWeek: number;
    sumOfAllBooking: number;
    sumOfAllServiceRegistration: number;
    getSumOfIncome: number;
    topEmployees: [
      {
        helperInformationId: number;
        fullName: string;
        counter: number;
      }
    ];
  };
}

export interface ICountBookingRes {
  data: [
    {
      dayOfMonth: string;
      bookingCounter: number;
      bookingSalesInMonth: number;
    }
  ];
}

export interface IParamCountBooking {
  month: number;
  year: number;
}

const path = {
  getDashboardHome: "/dashboard/home",
  getCountBooking: "/dashboard/count-booking-per-day",
};

function getDashboardHome(): Promise<IDashboardRes> {
  return fetcher({
    url: path.getDashboardHome,
    method: "get",
  });
}

function getCountBooking(
  params: IParamCountBooking
): Promise<ICountBookingRes> {
  return fetcher({
    url: path.getCountBooking,
    method: "get",
    params: params,
  });
}

export {getDashboardHome, getCountBooking};
