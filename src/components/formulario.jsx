import React, { useEffect, useState } from "react";

function formulario() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://api.escuelajs.co/api/v1/users";

  useEffect(() => {
  
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginBottom: "20px" }}>
            <img src={user.avatar} alt={user.name} style={{ width: "100px", borderRadius: "50%" }} />
            <h2>{user.name}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default formulario;