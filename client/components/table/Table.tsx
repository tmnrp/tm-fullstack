/* eslint-disable react/display-name */
import { forwardRef, Ref, useImperativeHandle, useState } from "react";

export const Table = forwardRef(
  (
    {
      initialData = [],
      initialColumns = [],
      className = "",
      emptyText = "-",
    }: ITable,
    ref: Ref<ITableMethods>
  ) => {
    const [columns, setColumns] =
      useState<Array<ITableColumns>>(initialColumns);
    const [data, setData] = useState(initialData);

    //
    useImperativeHandle(ref, () => ({ setColumns, setData }), []);

    //
    return (
      <table className={`tm-table ${className}`}>
        <thead>
          <tr>
            {columns.map((column, ci) => {
              return (
                <th
                  key={`key-${ci}`}
                  {...column.columnHeaderAttributes}
                  className={`${column.columnHeaderAttributes?.className}`}
                >
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.map((record, ri) => {
            return (
              <tr
                key={ri}
                className="hover:bg-white hover:bg-opacity-50 dark:hover:bg-navbar dark:hover:bg-opacity-50"
              >
                {columns.map((column, ci) => (
                  <td
                    key={`key-${ci}`}
                    data-label={column.dataLabel}
                    {...column.columnBodyAttributes}
                    className={`whitespace-nowrap px-3 ${
                      column.columnBodyAttributes?.className || ""
                    }`}
                  >
                    {column.renderer
                      ? column.renderer({ record })
                      : column.dataIndex &&
                        (record[column.dataIndex] || emptyText)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
);

export interface ITable
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  initialColumns?: Array<any>;
  initialData?: Array<any>;
  emptyText?: string;
}
export interface ITableMethods {
  setColumns: React.Dispatch<React.SetStateAction<ITableColumns[]>>;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

export interface ITableColumns {
  id: string;
  dataIndex?: string;
  label: React.ReactNode;
  dataLabel: string;
  columnHeaderAttributes?: React.DetailedHTMLProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >;
  columnBodyAttributes?: React.DetailedHTMLProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >;
  renderer?: (record: any) => React.ReactNode;
}
