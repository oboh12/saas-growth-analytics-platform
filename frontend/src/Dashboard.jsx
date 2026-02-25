import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Dashboard = () => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchSecureData = async () => {
      const token = await getAccessTokenSilently({
        audience: "https://secure-ai-note-api",
      });

      const res = await fetch("http://localhost:5000/secure-data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log(data);
    };

    fetchSecureData();
  }, [getAccessTokenSilently]);

  return <h1>Dashboard</h1>;
};

export default Dashboard;