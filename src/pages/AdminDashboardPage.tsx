import { Container } from "react-bootstrap";
import CollapsibleSection from "../components/CollapseSection";
import useGetEstablishments from "../hooks/useGetEstablishments";
import useGetSuggestions from "../hooks/useGetSuggestions";

const AdminDashboardPage = () => {
  const { data: establishments, loading: establishmentLoading } =
    useGetEstablishments();
  const { data: suggestions, loading: suggestionsLoading } =
    useGetSuggestions();

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

        {/* <h2>All Users</h2>
      <ul>
        {usersLoading ? (
          <li>Loading users...</li>
        ) : (
          users.map((user) => <li key={user.uid}>{user.name || user.email}</li>)
        )}
      </ul> */}
      </Container>
    </>
  );
};

export default AdminDashboardPage;
