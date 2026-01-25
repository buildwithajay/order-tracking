import * as signalR from "@microsoft/signalr";

let connection = null;

export const getConnection = () => connection;

export const startConnection = async (token) => {
  if (connection) return connection;

  connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5132/orderHub", {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();

  await connection.start();
  return connection;
};