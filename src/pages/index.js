import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Docs`}
      description="Flatpak documentation"
    >
      <main
        style={{ display: "flex", flexDirection: "column", padding: "24px" }}
      >
        <h1>Welcome to Flatpak's documentation!</h1>
        <p>
          These docs cover everything you need to know to build and distribute
          applications using Flatpak. They begin with a basic introduction to
          Flatpak, background information on basic concepts, and a guide to the
          Flatpak command line interface. Later sections provide detailed
          information on building and distributing applications.
        </p>
        <p>
          The docs are primarily intended for application developers and
          distributors. Their content is also relevant to those who have a
          general interest in Flatpak.
        </p>
        <p>
          If you are looking for information about how to use Flatpak to install
          and run applications, please refer to{" "}
          <a href="http://flatpak.org">the Flatpak website</a>.
        </p>
      </main>
    </Layout>
  );
}
