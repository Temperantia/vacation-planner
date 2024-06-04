import { Grid, Card, CardContent } from "@mui/material";
import AuthForm from "../../components/AuthForm";

const Login = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <AuthForm type="login" />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <AuthForm type="register" />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
