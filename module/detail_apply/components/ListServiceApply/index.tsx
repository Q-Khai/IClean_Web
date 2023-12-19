import React from "react";
import "./style.scss";
import {Image} from "antd";
import {IListServiceDetailApply} from "@app/api/ApiProduct";

interface IProps {
  listService?: IListServiceDetailApply[];
  setListServiceConfirmed: any;
  listServiceConfirmed: any;
}
export function ListServiceApply(props: IProps): JSX.Element {
  const {listService, setListServiceConfirmed, listServiceConfirmed} = props;

  const checkIncludeServiceSelected = (id: number) => {
    return listServiceConfirmed.includes(id);
  };
  const getListServiceConfirm = (id: number): void => {
    if (!listServiceConfirmed.includes(id)) {
      setListServiceConfirmed([...listServiceConfirmed, id]);
    } else {
      const newArray = listServiceConfirmed.filter((item: any) => item !== id);
      setListServiceConfirmed(newArray);
    }
  };

  // console.log("listServiceSelectedTmp", listServiceConfirmed);
  return (
    <div className="list-service-apply-container">
      {listService?.map((item, index) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          onClick={() =>
            item.serviceRegistrationId &&
            getListServiceConfirm(item.serviceRegistrationId)
          }
          key={index}
          className="item-service"
          style={{
            backgroundColor: checkIncludeServiceSelected(
              item.serviceRegistrationId ?? 1
            )
              ? "#a29b9b"
              : "white",
          }}
        >
          <div className="row1">
            <div className="service">
              <Image
                width="30px"
                height="30px"
                src={item?.serviceIcon}
                preview={false}
              />
              <span>{item?.serviceName}</span>
            </div>
            {/* <div style={{marginLeft: 40}}> */}
            {/*  <span>Trạng thái: </span> */}
            {/*  <Tag style={{paddingTop: 4}} color="green"> */}
            {/*    {item?.status} */}
            {/*  </Tag> */}
            {/* </div> */}
          </div>
          {/* {isChangeStatus === "WAITING_FOR_CONFIRM" && ( */}
          {/*  <Button */}
          {/*    onClick={() => handleAcceptApply(item.serviceRegistrationId)} */}
          {/*    shape="round" */}
          {/*    type="primary" */}
          {/*    loading={ */}
          {/*      isService === item.serviceRegistrationId && */}
          {/*      confirmApplyMutate.isLoading */}
          {/*    } */}
          {/*  > */}
          {/*    Xác nhận */}
          {/*  </Button> */}
          {/* )} */}
        </div>
      ))}
    </div>
  );
}
