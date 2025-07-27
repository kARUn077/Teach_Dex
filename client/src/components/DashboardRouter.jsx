// src/components/DashboardRouter.jsx
import { useAuth } from "@/context/AuthContext";
import Dashboard from "@/pages/admin/Dashboard";
import { Loader2 } from "lucide-react";

const DashboardRouter = () => {
  const { auth, loading } = useAuth();
  console.log(auth.user?.role);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#537D5D]" />
      </div>
    );
  }

   if (!auth?.user) {
    return <div>Please login to view dashboard</div>;
  }

  return <Dashboard />;
};

export default DashboardRouter;