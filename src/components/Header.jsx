import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Badge,
    Box,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import useCartStore from "../../store/cartStore.js";

function Header() {
    const cart = useCartStore((state) => state.cart);

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (
        <>
            <AppBar
                position="static"
                color="inherit"
                elevation={4}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={700}
                        color="primary"
                    >
                        Market
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                        }}
                    >
                        <Button component={Link} to="/">
                            Home
                        </Button>

                        <Button component={Link} to="/orders">
                            Orders
                        </Button>

                        <Button component={Link} to="/cart">
                            Cart
                        </Button>

                        <Button component={Link} to="/favorites">
                            Favorites
                        </Button>

                        <Button component={Link} to="/login">
                            Login
                        </Button>
                    </Box>

                    <Button
                        component={Link}
                        to="/cart"
                        variant="contained"
                    >
                        <Badge
                            badgeContent={totalItems}
                            color="error"
                        >
                            Cart
                        </Badge>
                    </Button>
                </Toolbar>
            </AppBar>

            <Outlet />
        </>
    );
}

export default Header;