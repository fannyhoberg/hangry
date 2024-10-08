import { useState } from "react";
import "../../assets/scss/App.scss";
import {
  ColumnDef,
  SortDirection,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link } from "react-router-dom";

interface BaseData {
  _id: string;
}

interface AdminDataTableProps<TData extends BaseData, TValue> {
  mainTitle: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const AdminDataTable = <TData extends BaseData, TValue>({
  mainTitle,
  columns,
  data,
}: AdminDataTableProps<TData, TValue>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);

  const toggleCollapse = () => setIsOpen(!isOpen);

  const sortingIndicators = {
    asc: "▼",
    desc: "▲",
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const getLinkPath = (id: string) => {
    switch (mainTitle) {
      case "Establishments":
        return `/update/${id}`;
      case "Suggestions":
        return `/manage-suggestions/${id}`;
      case "Admins":
        return null;
      default:
        return `/establishments`;
    }
  };

  return (
    <div className="collapsible-container">
      <button className="collapsible-header" onClick={toggleCollapse}>
        <span className="collapsible-icon">{isOpen ? "▲" : "▼"}</span>
        {mainTitle}
      </button>
      {isOpen && (
        <div className={`collapsible-content ${isOpen ? "open" : ""}`}>
          {/* Render the table */}
          <div className="table-container">
            {" "}
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={header.column.getCanSort() ? "cursor-pointer" : ""}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}

                            {sortingIndicators[header.column.getIsSorted() as SortDirection] ??
                              null}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {cell.column.id === "name" && mainTitle !== "Admins" ? (
                          getLinkPath(row.original._id) ? (
                            <Link to={getLinkPath(row.original._id) || ""} className="table-link">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Link>
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDataTable;
