import { Container } from "react-bootstrap";
import CollapsibleSection from "../components/CollapseSection";
import useGetEstablishments from "../hooks/useGetEstablishments";
import useGetSuggestions from "../hooks/useGetSuggestions";
import useGetUsers from "../hooks/useGetUsers";

const AdminDashboardPage = () => {
  const { data: establishments, loading: establishmentLoading } =
    useGetEstablishments();
  const { data: suggestions, loading: suggestionsLoading } =
    useGetSuggestions();

  const { data: users, loading: usersLoading } = useGetUsers();

  return (
    <>
      <Container className="py-3 center-y">
        <h1>Admin Dashboard</h1>

        {establishments && !establishmentLoading && (
          <CollapsibleSection
            title="Establishments"
            children={establishments}
          ></CollapsibleSection>
        )}

        {suggestions && !suggestionsLoading && (
          <CollapsibleSection
            title="User Suggestions"
            children={suggestions}
          ></CollapsibleSection>
        )}

        {users && !usersLoading && (
          <CollapsibleSection
            title="Admin users"
            children={users}
          ></CollapsibleSection>
        )}
      </Container>
    </>
  );
};

export default AdminDashboardPage;
