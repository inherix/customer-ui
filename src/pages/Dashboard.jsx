import Header from "../components/Header";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card />
      <Card title="Application" subtitle="Dashboard" />
      <Card title="Orders" subtitle="Track and manage your orders" />
    </div>
  );
}
