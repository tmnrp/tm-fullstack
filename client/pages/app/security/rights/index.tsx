import { useBreadcrumbs, ICrumb } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  APIRightsDelete,
  APIRightsGet,
} from "../../../../api/security/APIRights";
import { Button } from "../../../../components/button/Button";
import { PageWrap } from "../../../../components/PageWrap";
import { CONST_PAGES, CONST_PAGE_MODE } from "../../../../constants";
import { useZSBreadcrumbRef } from "../../../../utils/store";
import {
  ITableMethods,
  Table,
  ITableColumns,
} from "../../../../components/table/Table";
import { withAuth } from "../../../../hocs/withAuth";

//
const Rights = () => {
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
      const res = await APIRightsGet();
      ref.current?.setData(res.data.items || []);
    })();
  }, [reloadCounter]);

  //
  return (
    <PageWrap
      className="p-2"
      actions={
        <Button.Add
          onClick={() =>
            router.push(
              `${CONST_PAGES.APP.SECURITY.RIGHTS.PATH}/${CONST_PAGE_MODE.NEW}`
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
export default withAuth(Rights);

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
      dataLabel: "Name",
      columnHeaderAttributes: {
        className: "w-24",
      },
      columnBodyAttributes: {},
    },
    {
      id: "label",
      dataIndex: "label",
      label: "Label",
      dataLabel: "Label",
      columnHeaderAttributes: {
        className: "w-24",
      },
      columnBodyAttributes: {},
    },
    {
      id: "description",
      dataIndex: "description",
      label: "Description",
      dataLabel: "Description",
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
                  `${CONST_PAGES.APP.SECURITY.RIGHTS.PATH}/${record?._id}`
                )
              }
            />

            <Button.DeleteIcon
              onClick={async () => {
                await APIRightsDelete(record?._id);
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
    icon: <GoogleMaterialIcons iconName="checklist_rtl" />,
    label: "Rights",
  },
  {
    icon: <GoogleMaterialIcons iconName="view_list" />,
    label: "Overview",
  },
];
