import * as signalR from "@microsoft/signalr";


const API_BASE = import.meta.env.VITE_API_BASE;
let connection = null;

export const getConnection = () => connection;


export const startConnection = async (token) => {
  if (connection) return connection;

  connection = new signalR.HubConnectionBuilder()
    .withUrl(`${API_BASE}/orderHub`, {
      accessTokenFactory: () => localStorage.getItem("token") || ""
    })
    .withAutomaticReconnect()
    .build();

  await connection.start();
  return connection;
};