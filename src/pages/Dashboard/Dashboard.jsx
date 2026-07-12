import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";

import DashboardCards from "../../components/dashboard/DashboardCards";
import VehicleStatusChart from "../../components/dashboard/VehicleStatusChart";
import RecentTrips from "../../components/dashboard/RecentTrips";
import MaintenanceAlerts from "../../components/dashboard/MaintenanceAlerts";

import { getDashboard } from "../../services/dashboardService";

import "../../assets/styles/dashboard.css";

function Dashboard() {

    const [dashboard,setDashboard]=useState(null);

    useEffect(()=>{

        loadDashboard();

    },[]);

    const loadDashboard=async()=>{

        try{

            const res=await getDashboard();

            setDashboard(res.data);

        }

        catch(error){

            console.log(error);

        }

    }

    if(!dashboard){

        return(
            <MainLayout>
                <h3>Loading Dashboard...</h3>
            </MainLayout>
        )

    }

    return(

        <MainLayout>

            <h2 className="mb-4">
                Dashboard
            </h2>

            <DashboardCards
                kpis={dashboard.kpis}
            />

            <div className="row mb-4">

                <div className="col-lg-6">

                    <VehicleStatusChart
                        kpis={dashboard.kpis}
                    />

                </div>

                <div className="col-lg-6">

                    <div className="card shadow border-0 rounded-4 h-100">

                        <div className="card-body text-center">

                            <h5>Fleet Utilization</h5>

                            <h1 className="display-4 text-primary">

                                {dashboard.kpis.fleet_utilization_pct}%

                            </h1>

                        </div>

                    </div>

                </div>

            </div>

            <div className="row">

                <div className="col-lg-8">

                    <RecentTrips/>

                </div>

                <div className="col-lg-4">

                    <MaintenanceAlerts/>

                </div>

            </div>

        </MainLayout>

    )

}

export default Dashboard;