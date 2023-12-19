import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "./style.scss";
import {HelperInfo} from "@app/module/detail_apply/components/HelperInfo";
import {ListServiceApply} from "@app/module/detail_apply/components/ListServiceApply";
import {
  acceptApply,
  confirmApply,
  getDetailApplyById,
  IGetDetailApplyRes,
} from "@app/api/ApiProduct";
import {useMutation, useQuery} from "react-query";
import {Button, notification} from "antd";
import {ModalDeleteApply} from "@app/module/detail_apply/components/ModalDeleteApply";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

export function DetailApply(): JSX.Element {
  const router = useRouter();
  const [dataInit, setDataInit] = useState<any | undefined>(undefined);
  const [isOpenModalDeleteApply, setIsOpenModalDeleteApply] =
    useState<boolean>(false);
  const [listServiceConfirmed, setListServiceConfirmed] = useState<number[]>(
    []
  );
  const getDataDetailApply = (): Promise<IGetDetailApplyRes> =>
    getDetailApplyById({
      id: router?.query?.id ? parseInt(router.query.id as string, 10) : 1,
    });

  const {refetch} = useQuery(["GET_DETAIL_APPLY"], getDataDetailApply, {
    onSuccess: (res) => {
      console.log("Ré", res);
      setDataInit(res?.data);
    },
  });

  const checkStatusNotFinish = (value: string) => {
    return value !== "ONLINE" && value !== "DISABLED";
  };

  const handleCancel = (): void => {
    setIsOpenModalDeleteApply(false);
  };

  const showModalDeleteApply = (id: number) => {
    setIsOpenModalDeleteApply(true);
  };
  const acceptApplyMutate = useMutation(acceptApply);

  const handleAcceptApply = () => {
    if (router.query.id) {
      acceptApplyMutate.mutate(
        {
          id: parseInt(router.query.id as string, 10),
        },
        {
          onSuccess: () => {
            notification.success({
              message: "Phê duyệt thành công!",
            });
            refetch();
            // dataListApply.refetch();
          },
        }
      );
    }
  };

  const confirmApplyMutate = useMutation(confirmApply);

  const handleConfirmApply = (): void => {
    console.log("listServiceConfirmed", listServiceConfirmed.length);
    if (listServiceConfirmed.length > 0) {
      confirmApplyMutate.mutate(
        {
          id: parseInt(router.query.id as string, 10),
          serviceRegistrationIds: listServiceConfirmed,
        },
        {
          onSuccess: () => {
            refetch();
            notification.success({
              message: "Phê duyệt thành công!",
            });
            router.push("/list_apply");
            // setIsService(undefined);
          },
        }
      );
    } else
      notification.error({
        message: "Vui lòng chọn dịch vụ!",
      });
  };

  useEffect(() => {
    refetch();
  }, []);

  console.log("dataInit", dataInit);
  return (
    <div className="detail-apply-container">
      <div className="button-reject">
        {checkStatusNotFinish(dataInit?.status) && (
          <>
            {dataInit?.status !== "WAITING_FOR_CONFIRM" ? (
              <Button
                loading={acceptApplyMutate.isLoading}
                style={{
                  borderRadius: 12,
                  backgroundColor: "blue",
                  color: "white",
                  borderColor: "blue",
                  marginRight: 8,
                }}
                onClick={handleAcceptApply}
                icon={<CheckOutlined />}
              >
                Phê duyệt
              </Button>
            ) : (
              <Button
                loading={acceptApplyMutate.isLoading}
                style={{
                  borderRadius: 12,
                  backgroundColor: "blue",
                  color: "white",
                  borderColor: "blue",
                  marginRight: 8,
                }}
                onClick={handleConfirmApply}
                icon={<CheckOutlined />}
              >
                Xác nhận
              </Button>
            )}

            {/* )} */}
            <Button
              loading={acceptApplyMutate.isLoading}
              style={{
                borderRadius: 12,
                backgroundColor: "red",
                color: "white",
                borderColor: "red",
              }}
              onClick={() => showModalDeleteApply(1)}
              icon={<CloseOutlined />}
            >
              Từ chối
            </Button>
          </>
        )}
      </div>
      <div className="detail-apply-main">
        <div className="info-helper">
          <HelperInfo dataInfoHelper={dataInit} />
        </div>
        <div className="list-service">
          <div>
            <h2>Dịch vụ đăng kí</h2>
          </div>
          <ListServiceApply
            listService={dataInit?.services}
            listServiceConfirmed={listServiceConfirmed}
            setListServiceConfirmed={setListServiceConfirmed}
          />
        </div>
      </div>
      <ModalDeleteApply
        isRefetch={refetch}
        idApply={parseInt(router.query.id as string, 10)}
        isModalDeleteApply={isOpenModalDeleteApply}
        handleCancel={handleCancel}
      />
    </div>
  );
}
