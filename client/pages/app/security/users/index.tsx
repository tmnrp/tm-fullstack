import { NextRouter, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { CONST_PAGES, CONST_PAGE_MODE } from "../../../../constants";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { useZSBreadcrumbRef } from "../../../../utils/store";
import {
  ITableColumns,
  ITableMethods,
  Table,
} from "../../../../components/table/Table";
import { AxiosRequest } from "../../../../api";
import { Button } from "../../../../components/button/Button";
import { PageWrap } from "../../../../components/PageWrap";
import { APIUsersDelete, APIUsersGet } from "../../../../api/security/APIUsers";
import { IRoles } from "../../../../api/security/APIRoles";
import { utilBSIsUserLoggedIn } from "../../../../utils/browserStorage";

//
const Users = () => {
  utilBSIsUserLoggedIn();

  //
  const breadcrumbRef = useZSBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs });

  //
  const router = useRouter();
  const ref = useRef<ITableMethods>(null);

  //
  const [reloadCounter, setReloadCounter] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await APIUsersGet();
      !AxiosRequest.isAxiosError(res) &&
        ref.current?.setData(res.data.items || []);
    })();
  }, [reloadCounter]);

  //
  return (
    <PageWrap
      className="px-2"
      actions={
        <Button.Add
          onClick={() =>
            router.push(
              `${CONST_PAGES.APP.SECURITY.USERS.PATH}/${CONST_PAGE_MODE.NEW}`
            )
          }
        />
      }
    >
      <div className="flex items-center justify-center">
        <div className="w-full">
          <Table
            ref={ref}
            className="w-full"
            initialColumns={getColumns(router, setReloadCounter)}
          />
        </div>
      </div>
    </PageWrap>
  );
};
export default Users;

//
const getColumns = (
  router: NextRouter,
  setReloadCounter: React.Dispatch<React.SetStateAction<number>>
): Array<ITableColumns> => {
  return [
    {
      id: "username",
      dataIndex: "username",
      label: "Username",
      dataLabel: "Username",
      columnHeaderAttributes: {
        className: "w-24",
      },
      columnBodyAttributes: {},
    },
    {
      id: "rolesID",
      dataIndex: "rolesID",
      label: "Role",
      dataLabel: "Role",
      columnHeaderAttributes: {
        className: "w-24",
      },
      columnBodyAttributes: {},
      renderer: ({ record }: { record: { rolesID: IRoles } }) =>
        record?.rolesID?.name,
    },
    {
      id: "surName",
      dataIndex: "surName",
      label: "Sur name",
      dataLabel: "Sur name",
      columnHeaderAttributes: {
        className: "w-24",
      },
      columnBodyAttributes: {},
    },
    {
      id: "firstName",
      dataIndex: "firstName",
      label: "First name",
      dataLabel: "First name",
      columnHeaderAttributes: {
        className: "w-24",
      },
      columnBodyAttributes: {},
    },
    {
      id: "lastName",
      dataIndex: "lastName",
      label: "Last name",
      dataLabel: "Last name",
      columnHeaderAttributes: {},
      columnBodyAttributes: {},
    },
    {
      id: "actions",
      label: <div className="text-center">Actions</div>,
      dataLabel: "Actions",
      columnHeaderAttributes: {
        className: "w-16",
      },
      renderer: ({ record }) => {
        return (
          <div className="flex justify-center space-x-2">
            <Button.EditIcon
              onClick={() =>
                router.push(
                  `${CONST_PAGES.APP.SECURITY.USERS.PATH}/${record?._id}`
                )
              }
            />

            <Button.DeleteIcon
              onClick={async () => {
                const res = await APIUsersDelete(record?._id);
                !AxiosRequest.isAxiosError(res) &&
                  setReloadCounter((reloadCounter) => ++reloadCounter);
              }}
            />
          </div>
        );
      },
    },
  ];
};

//
const crumbs: Array<ICrumb> = [
  {
    icon: <GoogleMaterialIcons iconName="home" />,
    label: "Home",
  },
  {
    icon: <GoogleMaterialIcons iconName="interests" />,
    label: "Users",
  },
  {
    icon: <GoogleMaterialIcons iconName="view_list" />,
    label: "Overview",
  },
];
