import { useQuery } from "@tanstack/react-query";
import {
    Container,
    Typography,
    Card,
    CardContent,
    Divider,
    CircularProgress,
    Box,
} from "@mui/material";

import { getOrders } from "../api/orderApi.js";

function OrdersPage() {
    const {
        data: orders,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["orders"],
        queryFn: getOrders,
    });

    if (isLoading) {
        return (
            <Container sx={{ mt: 5, textAlign: "center" }}>
                <CircularProgress />
            </Container>
        );
    }

    if (isError) {
        return (
            <Container sx={{ mt: 5 }}>
                <Typography align="center">
                    Failed to load orders
                </Typography>
            </Container>
        );
    }

    if (!orders?.length) {
        return (
            <Container sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom>
                    Orders
                </Typography>

                <Typography>No orders yet.</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>

            {orders.map((order) => (
                <Card
                    key={order._id}
                    sx={{ mb: 3 }}
                >
                    <CardContent>
                        <Typography variant="h6">
                            Order #{order._id}
                        </Typography>

                        <Typography sx={{ mt: 1 }}>
                            Status: {order.status}
                        </Typography>

                        <Typography>
                            Address: {order.deliveryAddress}
                        </Typography>

                        {order.comment && (
                            <Typography>
                                Comment: {order.comment}
                            </Typography>
                        )}

                        <Typography sx={{ mt: 1, fontWeight: "bold" }}>
                            Total: ${order.totalPrice}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        {order.items.map((item, index) => (
                            <Card
                                key={index}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    p: 2,
                                    mb: 2,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={item.product.image}
                                    alt={item.product.name}
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        objectFit: "cover",
                                        borderRadius: 2,
                                    }}
                                />

                                <Box>
                                    <Typography variant="h6">
                                        {item.product.name}
                                    </Typography>

                                    <Typography>
                                        Quantity: {item.quantity}
                                    </Typography>

                                    <Typography>
                                        Price: ${item.price}
                                    </Typography>
                                </Box>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            ))}
        </Container>
    );
}

export default OrdersPage;