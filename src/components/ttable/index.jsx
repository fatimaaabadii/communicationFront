"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { Button } from "/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
} from "/src/components/ui/dropdown-menu";
import { Input } from "/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "/src/components/ui/table";

export function DataTable({
  title,
  columns,
  data,
  filterCols,
  canAdd = false,
  setOpenModal,
  settypeOfSubmit,
}) {
  const [sorting, setSorting] = React.useState([{ id: 'id', desc: true }]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({ id: false });
  const [rowSelection, setRowSelection] = React.useState({});

   const typeActivites = [
    "Toutes les activités",
    "Activités du Directeur",
    "Activités de la Ministre",
    "Visites",
    "Rencontres",
    "Jours et fêtes nationales",
    "Jours et fêtes internationales",
    "Inaugurations",
    "Partenariats",
    "Formations",
    "Journées portes ouvertes",
    "Examens des centres de formation",
    "Distribution des diplômes",
    "Distribution des aides",
    "Anniversaire de la création de l'Entraide Nationale",
    "Activités parallèles",
    "championnats",
    "Opération Ramadan",
    "Expositions",
    "Solidarité" ];

  const extendedColumns = React.useMemo(() => [
    {
      id: 'id',
      header: 'ID',
      accessorKey: 'id',
      enableSorting: true,
      sortDescFirst: true,
    },
    ...columns,
  ], [columns]);

  const table = useReactTable({
    data,
    columns: extendedColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

   const selectStyle = {
    padding: '8px 12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    width: '300px',
    backgroundColor: 'white',
    cursor: 'pointer',
  };

  const renderFilterInput = (col) => {
    if (col === "Type d'activité") {
      return (
        <select
          key={col}
          value={(table.getColumn(col)?.getFilterValue() ?? "")}
          onChange={(event) =>
            table.getColumn(col)?.setFilterValue(
              event.target.value === "Toutes les activités" ? "" : event.target.value
            )
          }
          style={selectStyle}
        >
          {typeActivites.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      );
    }

    return (
      <Input
        key={col}
        placeholder={`Rechercher dans ${col}`}
        value={(table.getColumn(col)?.getFilterValue() ?? "")}
        onChange={(event) =>
          table.getColumn(col)?.setFilterValue(event.target.value)
        }
        style={{
          padding: '8px 12px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          width: '300px',
        }}
      />
    );
  };

  return (
    <div className="w-full my-6">
      <h1 style={{ fontFamily: 'Roboto, sans-serif', fontSize: '1.5rem', fontWeight: 'bold', color: '#333', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)', paddingBottom: '10px', borderBottom: '2px solid #ccc' }}>
        {title}
      </h1>

      <div className="flex items-center py-4">
        <div className="flex-grow flex items-center space-x-4">
          {filterCols.map((col) => renderFilterInput(col))}
           
          <DropdownMenu>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table className="custom-table" style={{ background: '#f2f2f2', backgroundSize: '200% 100%', animation: 'backgroundAnimation 10s linear infinite' }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} style={{ backgroundColor: 'transparent' }}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ color: '#333', fontSize: '16px', fontWeight: 'bold', fontFamily: 'Nunito, sans-serif', textAlign: 'right' }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ color: '#333' }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun résultat trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          
          <select
            value={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
          >
            {[...Array(table.getPageCount())].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}