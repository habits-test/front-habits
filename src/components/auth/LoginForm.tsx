import CircularProgress from "@mui/material/CircularProgress";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

type LoginFormProps = {
  updateSigninFormData: (e: any) => void;
  signinformData: { email: string; password: string };
  handleSubmit: (e: any) => void;
  loading: boolean;
};

const theme = createTheme();

const LoginForm = ({
  updateSigninFormData,
  signinformData,
  handleSubmit,
  loading,
}: LoginFormProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={signinformData.email}
              onChange={updateSigninFormData}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={signinformData.password}
              onChange={updateSigninFormData}
            />
            <Box sx={{ position: "relative" }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign In
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: "primary",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-6px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
            <Grid container>
              <Grid item>
                <Link
                  to="/signup"
                  className="text-sm underline text-blue-700 hover:text-blue-400"
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
