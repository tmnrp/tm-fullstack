import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AxiosRequest } from "../../../../api";
import { IRights } from "../../../../api/security/APIRights";
import { APIRolesDelete, APIRolesGet } from "../../../../api/security/APIRoles";
import { Button } from "../../../../components/button/Button";
import { PageWrap } from "../../../../components/PageWrap";
import { CONST_PAGES, CONST_PAGE_MODE } from "../../../../constants";
import { useZustantStoreBreadcrumbRef } from "../../../../utils/store";
import {
  ITableMethods,
  Table,
  ITableColumns,
} from "../../../../components/table/Table";
import { utilBSIsUserLoggedIn } from "../../../../utils/browserStorage";

//
const Roles = () => {
  utilBSIsUserLoggedIn();
  const breadcrumbRef = useZustantStoreBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs });

  //
  const router = useRouter();
  const ref = useRef<ITableMethods>(null);

  //
  const [reloadCounter, setReloadCounter] = useState(0);
  useEffect(() => {
    APIRolesGet((res) => {
      !AxiosRequest.isAxiosError(res) &&
        ref.current?.setData(res.data.items || []);
    });
  }, [reloadCounter]);

  //
  return (
    <PageWrap
      className="px-2"
      actions={
        <Button.Add
          onClick={() =>
            router.push(
              `${CONST_PAGES.APP.SECURITY.ROLES.PATH}/${CONST_PAGE_MODE.NEW}`
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
export default Roles;

//
const getColumns = (
  router: NextRouter,
  setReloadCounter: React.Dispatch<React.SetStateAction<number>>
): Array<ITableColumns> => {
  return [
    {
      id: "name",
      dataIndex: "name",
      label: "Name",
      dataLabel: "name",
      columnHeaderAttributes: {
        className: "w-24",
      },
      columnBodyAttributes: {},
    },
    {
      id: "rightsID",
      dataIndex: "rightsID",
      label: "Rights",
      dataLabel: "Rights",
      columnHeaderAttributes: {},
      columnBodyAttributes: {},
      renderer: ({ record }: { record: { rightsID: Array<IRights> } }) => {
        const rights = record?.rightsID?.map((right) => right.name).join(", ");
        return (
          <div className="italic text-right whitespace-pre-wrap sm:text-left">
            {rights.length > 0 ? rights : "-"}
          </div>
        );
      },
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
                  `${CONST_PAGES.APP.SECURITY.ROLES.PATH}/${record?._id}`
                )
              }
            />

            <Button.DeleteIcon
              onClick={() => {
                APIRolesDelete(record?._id, (res) => {
                  !AxiosRequest.isAxiosError(res) &&
                    setReloadCounter((reloadCounter) => ++reloadCounter);
                });
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
    label: "Roles",
  },
  {
    icon: <GoogleMaterialIcons iconName="view_list" />,
    label: "Overview",
  },
];
