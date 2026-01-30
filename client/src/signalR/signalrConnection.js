import * as signalR from "@microsoft/signalr";

let connection = null;

export const getConnection = () => connection;

export const startConnection = async (token) => {
  if (connection) return connection;

  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://jolly-water-023db5f00.6.azurestaticapps.net/orderHub", {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();

  await connection.start();
  return connection;
};