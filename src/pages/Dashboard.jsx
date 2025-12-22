import Header from "../components/Header";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";
import { useMemo, useState } from "react";
import useMeta from "../hooks/Meta";
export default function Dashboard() {
  useMeta({ title: "Dashboard | InHerix" });
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card />
      <Card title="Application" subtitle="Dashboard" />
      <Card title="Orders" subtitle="Track and manage your orders" />
    </div>
  );
}
