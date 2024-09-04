import { Container, Image } from "react-bootstrap";
import useGetEstablishments from "../hooks/useGetEstablishments";
import useGetSuggestions from "../hooks/useGetSuggestions";
import useGetUsers from "../hooks/useGetUsers";
import AdminDataTable from "../components/tables/AdminDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Establishment } from "../types/Establishment.types";
import { User } from "../types/User.types";

const AdminDashboardPage = () => {
  const { data: establishments, loading: establishmentLoading } =
    useGetEstablishments();
  const { data: suggestions, loading: suggestionsLoading } =
    useGetSuggestions();

  const { data: users, loading: usersLoading } = useGetUsers();

  console.log("establishments data", establishments);

  const isValidUrl = (url: string | undefined): boolean => {
    if (!url) return false; // Handle undefined or empty strings
    try {
      new URL(url);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Invalid URL");
      }
    }
  };
  const establishmentColumns: ColumnDef<Establishment>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
  ];

  const usersColumns: ColumnDef<User>[] = [
    {
      accessorKey: "photoUrls",
      header: "Photo",
      cell: (info) => {
        const url = info.getValue() as string | undefined;
        return url && isValidUrl(url) ? (
          <Image
            src={url}
            alt="User Photo"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        ) : (
          <Image
            src={"https://via.placeholder.com/200"}
            alt="User Photo"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
  ];

  return (
    <>
      <Container className="py-3 center-y">
        <h1>Admin Dashboard</h1>

        {establishments && !establishmentLoading && (
          <AdminDataTable
            mainTitle={"Establishments"}
            columns={establishmentColumns}
            data={establishments}
          ></AdminDataTable>
        )}

        {suggestions && !suggestionsLoading && (
          <AdminDataTable
            mainTitle={"Suggestions"}
            columns={establishmentColumns}
            data={suggestions}
          ></AdminDataTable>
        )}

        {users && !usersLoading && (
          <AdminDataTable
            mainTitle={"Admins"}
            columns={usersColumns}
            data={users}
          ></AdminDataTable>
        )}
      </Container>
    </>
  );
};

export default AdminDashboardPage;
