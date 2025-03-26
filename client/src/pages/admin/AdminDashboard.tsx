import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardHeader,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardSummary {
  totalTours: number;
  activeBuses: number;
  totalBookings: number;
  totalRevenue: number;
}

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardSummary | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get("/api/dashboard/summary");
      setDashboardData(response.data.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const revenueChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [
          5000, 7000, 8000, 12000, 15000, 11000, 9000, 10000, 13000, 14000,
          15000, 16000,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginBottom: 3 }}>
        Admin Dashboard
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Total Tours" />
              <CardContent>
                <Typography variant="h4">
                  {dashboardData?.totalTours}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Active Buses" />
              <CardContent>
                <Typography variant="h4">
                  {dashboardData?.activeBuses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Total Bookings" />
              <CardContent>
                <Typography variant="h4">
                  {dashboardData?.totalBookings}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardHeader title="Total Revenue" />
              <CardContent>
                <Typography variant="h4">
                  ${dashboardData?.totalRevenue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 3 }}>
              <Typography variant="h6">Revenue Overview</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <Bar data={revenueChartData} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboard;
