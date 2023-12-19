import React, {useMemo} from "react";
import {Avatar, Dropdown, Image, Menu} from "antd";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "@app/redux/store";
import {useRouter} from "next/router";
import {openModalConfirm} from "@app/components/ModalConfirm";
import {logoutUser} from "@app/redux/slices/UserSlice";
import RouteList from "@app/routes/RouteList";

export default function Navbar(): JSX.Element {
  const router = useRouter();
  const {pathname} = router;

  const user = useSelector((state: IRootState) => state.user);

  console.log("user", user);
  const dispatch = useDispatch();

  const handleLogout = (): void => {
    openModalConfirm({
      title: "Bạn có muốn đăng xuất?",
      onOK: () => {
        dispatch(logoutUser());
        router.push("/login");
      },
    });
  };

  const menuUser = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <span onClick={handleLogout} role="button">
              Đăng xuất
            </span>
          ),
        },
      ]}
    />
  );

  const nameRouter = useMemo((): string[] => {
    const nameRouter: string[] = [];
    RouteList.forEach(({path, name, children}) => {
      if (path.split("/")[1] === pathname.split("/")[1]) {
        nameRouter.push(name);
        // console.log("path", path)

        children?.forEach(({path, name, children}) => {
          if (path.split("/")[1] === pathname.split("/")[2])
            nameRouter.push(name);

          children?.forEach(({path, name}) => {
            if (path.split("/")[1] === pathname.split("/")[3])
              nameRouter.push(name);
          });
        });
      }
    });

    return nameRouter;
  }, [router]);

  return (
    <div className="navbar">
      <div className="right-content-wrap">
        <span>
          {nameRouter.map((item, index) => {
            if (index === nameRouter.length - 1)
              return (
                <span key={index} className="title title_focus">
                  {item}
                </span>
              );
            return <span key={index} className="title">{`${item} / `}</span>;
          })}
        </span>
      </div>
      <div className="left-content-wrap">
        <Dropdown overlay={menuUser} placement="topLeft" className="user-wrap">
          <div>
            <span className="user-name">
              Hello, {user?.userInformationDto?.fullName}!
            </span>
            <div className="avatar">
              {user?.userInformationDto?.avatar ? (
                <Image
                  preview={false}
                  width={30}
                  height={30}
                  src={
                    user?.userInformationDto.avatar ??
                    "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
                  }
                  style={{borderRadius: "50%"}}
                />
              ) : (
                <Avatar size="default" icon={<UserOutlined />} />
              )}
            </div>
            <DownOutlined className="ml-2" />
          </div>
        </Dropdown>
      </div>
    </div>
  );
}
