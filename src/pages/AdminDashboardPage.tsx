import useGetEstablishments from "../hooks/useGetEstablishments";
import useGetSuggestions from "../hooks/useGetSuggestions";

const AdminDashboardPage = () => {
  const { data: establishments, loading: establishmentLoading } =
    useGetEstablishments();
  const { data: suggestions, loading: suggestionsLoading } =
    useGetSuggestions();

  return (
    <>
      <h1>Admin Dashboard</h1>
      <h2>Establishments</h2>
      <ul>
        {establishments &&
          !establishmentLoading &&
          establishments.map((establishment) => {
            return <li key={establishment._id}>{establishment.name}</li>;
          })}
      </ul>
      <h2>User suggestions</h2>
      <ul>
        {suggestions &&
          !suggestionsLoading &&
          suggestions.map((suggestion) => {
            return <li key={suggestion._id}>{suggestion.name}</li>;
          })}
      </ul>
      {/* <h2>Admins</h2>
      <ul>
        {admins &&
          !adminsLoading &&
          admins.map((admin) => {
            return <li key={admin._id}>{admin.name}</li>;
          })}
      </ul> */}
    </>
  );
};

export default AdminDashboardPage;
