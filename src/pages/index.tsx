import React from "react";
import Layout from "@theme/Layout";

export default function Home(): JSX.Element {
  return (
    <Layout title={`Welcome`} description="Flathub documentation">
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <h1>Welcome to the Flathub documentation!</h1>
        <p>
          These docs cover everything you need to know to get started with Flathub. They are separated into different sections, depending on your role:
          <ul>
            <li>For users</li>
            <li>For app authors</li>
            <li>For team members</li>
          </ul>
        </p>
      </main>
    </Layout>
  );
}
