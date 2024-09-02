import { Container } from "react-bootstrap";
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

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const establishmentColumns: ColumnDef<Establishment>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "adress",
      header: "Adress",
    },
    {
      accessorKey: "postalcode",
      header: "Postal code",
    },
    {
      accessorKey: "city",
      header: "City",
    },
  ];

  const usersColumns: ColumnDef<User>[] = [
    {
      accessorKey: "photoUrl",
      header: "Photo",
      cell: (info) => {
        const url = info.getValue() as string;
        return isValidUrl(url) ? (
          <img
            src={url}
            alt="User Photo"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        ) : (
          url
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

        {/* {establishments && !establishmentLoading && (
          <CollapsibleSection
            title="Establishments"
            children={establishments}
          ></CollapsibleSection>
        )} */}

        {suggestions && !suggestionsLoading && (
          <AdminDataTable
            mainTitle={"Suggestions"}
            columns={establishmentColumns}
            data={suggestions}
          ></AdminDataTable>
        )}

        {/* {suggestions && !suggestionsLoading && (
          <CollapsibleSection
            title="User Suggestions"
            children={suggestions}
          ></CollapsibleSection>
        )} */}

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
