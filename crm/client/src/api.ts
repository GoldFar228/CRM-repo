// client/src/api.ts
export const fetchUsers = async () => {
    const response = await fetch("/api/User/GetUsers"); // Будет проксировано на http://localhost:5000/api/users
    return await response.json();
  };