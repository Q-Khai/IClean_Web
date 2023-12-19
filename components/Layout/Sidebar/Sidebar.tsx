import React, {memo, useEffect, useMemo, useState} from "react";
import {Image, Menu, MenuProps} from "antd";
import {useRouter} from "next/router";
import RouteList from "../../../routes/RouteList";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "@app/redux/store";
import "./index.scss";
import {openMenu, closeMenu} from "@app/redux/slices/MenuSlice";
import {useWindowDimensions} from "@app/utils/hooks/layout/get-window";
import CONFIG from "@app/config";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const RenderMenu = memo(() => {
  const router = useRouter();
  const pathName = router.route;

  const {isOpen} = useSelector((state: IRootState) => state.menu);
  const user = useSelector((state: IRootState) => state.user);

  const openKeysDefault = useMemo(() => {
    const arrIndexPath = [];
    for (let i = 0; i < pathName.length; i++) {
      if (pathName[i] === "/") {
        arrIndexPath.push(i);
      }
    }
    const path1 = pathName.slice(arrIndexPath[0], arrIndexPath[1]);
    const path2 = pathName.slice(arrIndexPath[1], arrIndexPath[2]);
    return [
      path1 === "/" ? "/general" : path1,
      path2 === "/" ? "/general/manager_permission" : path2,
      pathName,
    ];
  }, []);

  const [openKeys, setOpenKeys] = useState(openKeysDefault);

  const convertItemSidebar = (): MenuProps["items"] => {
    const itemsTmp: MenuProps["items"] = [];
    RouteList.forEach((item) => {
      if (item.children) {
        const tmpChidren: MenuProps["items"] = [];
        item.children.forEach((child) => {
          if (child.children) {
            const tmpGrandchildren: MenuProps["items"] = [];
            child.children.forEach((grandchildren) => {
              tmpGrandchildren.push(
                getItem(
                  grandchildren.name,
                  item.path + child.path + grandchildren.path
                )
              );
            });
            tmpChidren.push(
              getItem(child.name, child.path, child.icon, tmpGrandchildren)
            );
          } else if (child.isSidebar) {
            tmpChidren.push(getItem(child.name, item.path + child.path));
          }
        });
        itemsTmp.push(getItem(item.name, item.path, item.icon, tmpChidren));
      } else if (item.isSidebar) {
        if (item.isRole) {
          if (user.userInformationDto?.roleName === item.isRole) {
            itemsTmp.push(getItem(item.name, item.path, item.icon));
          }
        } else itemsTmp.push(getItem(item.name, item.path, item.icon));
      }
    });

    return itemsTmp;
  };
  const rootSubmenuKeys = RouteList.filter((item) => item.isSidebar).map(
    (item2) => item2.path
  );

  // action sidebar
  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      onClick={onClick}
      mode={isOpen ? "inline" : "vertical"}
      theme="dark"
      openKeys={openKeys}
      style={{paddingLeft: 12, paddingRight: 15}}
      defaultSelectedKeys={openKeys}
      defaultOpenKeys={openKeys}
      items={convertItemSidebar()}
      onOpenChange={onOpenChange}
    />
  );
});
RenderMenu.displayName = "RenderMenu";

function Sidebar(): JSX.Element {
  const dispatch = useDispatch();

  const {isOpen} = useSelector((state: IRootState) => state.menu);
  const {width} = useWindowDimensions();

  const sidebarClass = `sidebar sidebar_custom ${
    isOpen ? "sidebar_show" : "sidebar_hide"
  }`;

  useEffect(() => {
    if (width < CONFIG.LAYOUT_CONFIG.minWidthWindow) {
      dispatch(closeMenu());
    } else dispatch(openMenu());
  }, [width]);

  return (
    <div className={sidebarClass}>
      <div
        style={{
          height: 150,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 15,
        }}
      >
        <Image width={160} height={160} src="/logo_none.png" preview={false} />
      </div>
      <hr style={{color: "#BDBDBD", marginBottom: 15}} />
      <RenderMenu />
    </div>
  );
}

export default memo(Sidebar);
