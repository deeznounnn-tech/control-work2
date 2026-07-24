import {
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Button,
    Box,
} from "@mui/material";

import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore.js";

function CartPage() {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCartStore();

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <Container sx={{ mt: 5 }}>
                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Cart
                </Typography>

                <Typography>Your cart is empty.</Typography>

                <Button
                    component={Link}
                    to="/"
                    sx={{ mt: 3 }}
                    variant="contained"
                >
                    Go shopping
                </Button>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
            >
                Cart
            </Typography>

            {cart.map((item) => (
                <Card
                    key={item._id}
                    sx={{
                        display: "flex",
                        mb: 3,
                    }}
                >
                    <CardMedia
                        component="img"
                        image={item.image}
                        sx={{
                            width: 180,
                        }}
                    />

                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h6">
                            {item.name}
                        </Typography>

                        <Typography sx={{ my: 1 }}>
                            ${item.price}
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mt: 2,
                            }}
                        >
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    decreaseQuantity(item._id)
                                }
                            >
                                -
                            </Button>

                            <Typography>
                                {item.quantity}
                            </Typography>

                            <Button
                                variant="outlined"
                                onClick={() =>
                                    increaseQuantity(item._id)
                                }
                            >
                                +
                            </Button>

                            <Button
                                color="error"
                                variant="contained"
                                onClick={() =>
                                    removeFromCart(item._id)
                                }
                            >
                                Remove
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            ))}

            <Typography
                variant="h5"
                fontWeight={700}
                sx={{ mt: 4 }}
            >
                Total: ${totalPrice}
            </Typography>

            <Button
                component={Link}
                to="/checkout"
                variant="contained"
                size="large"
                sx={{ mt: 3 }}
            >
                Checkout
            </Button>
        </Container>
    );
}

export default CartPage;