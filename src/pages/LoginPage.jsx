import { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";

function LoginPage() {
    const navigate = useNavigate();

    const [loginOrEmail, setLoginOrEmail] = useState("");
    const [password, setPassword] = useState("");

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            localStorage.setItem("token", data.accessToken);
            navigate("/");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        mutation.mutate({
            loginOrEmail,
            password,
        });
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" mb={3}>
                Login
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <TextField
                    label="Login or Email"
                    value={loginOrEmail}
                    onChange={(e) => setLoginOrEmail(e.target.value)}
                    required
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={mutation.isPending}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default LoginPage;