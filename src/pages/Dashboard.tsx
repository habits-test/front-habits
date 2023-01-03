import { useEffect } from "react";
import useAppStore from "../store/appStore";
import useAuthStore from "../store/authStore";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Calendar from "../components/Calendar";

const Dashboard = () => {
  const { test, setTest } = useAppStore();
  const { userData } = useAuthStore();
  useEffect(() => {
    setTest();
  }, []);

  return (
    <div>
      {/* <div className="text-xl font-bold text-center">Dashboard - {test}</div>
      <div className="text-xl font-bold text-center">
        email : {userData.email}
      </div>
      <div className="text-xl font-bold text-center">
        firstName : {userData.firstName}
      </div>
      <div className="text-xl font-bold text-center">
        lastName : {userData.lastName}
      </div> */}
      <div>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Calendar />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
