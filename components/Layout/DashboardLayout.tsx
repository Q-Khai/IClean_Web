import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import Content from "./Content/Content";
import Main from "./Main/Main";
import LoadingLayout from "./LoadingLayout";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): JSX.Element {
  return (
    <div className="wrapper">
      <Sidebar />
      <Main>
        <Navbar />
        <LoadingLayout>
          <Content>{children}</Content>
        </LoadingLayout>
      </Main>
    </div>
  );
}
