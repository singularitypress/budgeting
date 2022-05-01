import React, { useState } from "react";
import Head from "next/head";
import { gql } from "graphql-request";
import { Client, createClient } from "graphql-ws";
import { Container, Header } from "@components/atomic";
import { useEffect } from "react";
import { Line, LineCanvas, ResponsiveLine } from "@nivo/line";

interface IData {
  description: string;
  account: string;
  institution: string;
  x: string;
  y: number;
}

interface IMonthlyData {
  transactions: IData[];
  amount: number;
  date: string;
}

export default () => {
  const [data, setData] = useState<IData[]>([]);
  const [client, setClient] = useState<Client>();

  const query = gql`
    {
      transactions(account: ["amex", "visa", "mastercard"], max: 0) {
        description
        account
        institution
        x: date
        y: amount
      }
    }
  `;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (client) {
        client.subscribe(
          { query },
          {
            next: (res) =>
              res.data &&
              setData(
                (res.data.transactions as any as IData[]).map((item) => ({
                  ...item,
                  y: item.y * -1,
                })),
              ),
            error: (e) =>
              console.warn(e, "The subscription didn't work for some reason?"),
            complete: () => client.dispose(),
          },
        );
      } else {
        setClient(
          createClient({
            url: "ws://localhost:4000/graphql",
          }),
        );
      }
    }
  }, [client]);

  return (
    <>
      <Head key="home">
        <title>Home</title>
      </Head>
      <Container>
        <Header variant="h1">Budgeting</Header>
        <div style={{ height: "700px", width: "1536px" }}>
          {typeof window !== "undefined" && data.length > 0 ? (
            <ResponsiveLine
              data={[
                {
                  id: "Visa",
                  data: data
                    .filter((item) => item.account === "visa")
                    .map((item) => ({ x: item.x, y: item.y })),
                },
                {
                  id: "AMEX",
                  data: data
                    .filter((item) => item.account === "amex")
                    .map((item) => ({ x: new Date(item.x), y: item.y })),
                },
                {
                  id: "Mastercard",
                  data: data
                    .filter((item) => item.account === "mastercard")
                    .map((item) => ({ x: new Date(item.x), y: item.y })),
                },
              ]}
              xScale={{
                type: "time",
                format: "%Y-%m-%d",
                precision: "day",
              }}
              xFormat="time:%Y-%m-%d"
              yScale={{
                type: "linear",
                stacked: true,
              }}
              axisLeft={{
                legend: "linear scale",
                legendOffset: 12,
              }}
              axisBottom={{
                format: "%b %d",
                tickValues: "every 2 days",
                legend: "time scale",
                legendOffset: -12,
              }}
              enablePointLabel={true}
              pointSize={16}
              pointBorderWidth={1}
              pointBorderColor={{
                from: "color",
                modifiers: [["darker", 0.3]],
              }}
              useMesh={true}
              enableSlices={false}
            />
          ) : (
            <div></div>
          )}
        </div>
      </Container>
    </>
  );
};
