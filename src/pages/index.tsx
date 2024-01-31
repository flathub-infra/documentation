import React from "react";
import Layout from "@theme/Layout";

import FlathubDocs from "../../static/img/flathub-docs.svg";

export default function Home(): JSX.Element {
  return (
    <Layout title={`Welcome`} description="Flathub documentation">
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <h1>Welcome to the Flathub documentation!</h1>
        <p>
          Flathub is the home of Flatpak applications. It is a community effort
          to provide a central place for people to discover, install and keep up
          to date with Flatpak applications.
        </p>
        <p>
          Flathub is a public repo of Flatpak applications. It is run by the
          community, and is not owned by any single company or individual.
        </p>
        <p>
          If you have any questions, you can ask them on our{" "}
          <a href="https://matrix.to/#/#flathub:matrix.org">Matrix channel</a>.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "24px",
          }}
        >
          <FlathubDocs />
        </div>

        <h2>Getting started</h2>
        <p>
          If you're new to Flatpak and Flathub, you can read our{" "}
          <a href="/docs/category/for-users">user guide</a> to learn how to
          install Flatpak and Flathub on your system.
        </p>
      </main>
    </Layout>
  );
}
