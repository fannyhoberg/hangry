import useGetEstablishments from "../hooks/useGetEstablishments";

const AdminDashboardPage = () => {
  const { data: establishments, loading: establishmentLoading } =
    useGetEstablishments();

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
    </>
  );
};

export default AdminDashboardPage;
