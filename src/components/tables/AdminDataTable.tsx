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

interface AdminDataTableProps<TData, TValue> {
  mainTitle: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const AdminDataTable = <TData, TValue>({
  mainTitle,
  columns,
  data,
}: AdminDataTableProps<TData, TValue>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);

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

  const toggleCollapse = () => setIsOpen(!isOpen);

  return (
    <div className="collapsible-container">
      <button className="collapsible-header" onClick={toggleCollapse}>
        <span className="collapsible-icon">{isOpen ? "▲" : "▼"}</span>
        {mainTitle}
      </button>
      {isOpen && (
        <div className={`collapsible-content ${isOpen ? "open" : ""}`}>
          {/* Render the table */}
          <div className="p-2">
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            className={
                              header.column.getCanSort() ? "cursor-pointer" : ""
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                            {sortingIndicators[
                              header.column.getIsSorted() as SortDirection
                            ] ?? null}
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="h-4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDataTable;
