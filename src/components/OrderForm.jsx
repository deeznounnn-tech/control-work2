import { useState } from "react";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { createOrder } from "../api/orderApi.js";
import { queryClient } from "../queryClient";
import useCartStore from "../../store/cartStore.js";

function OrderForm() {
    const navigate = useNavigate();

    const { cart, clearCart } = useCartStore();

    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [comment, setComment] = useState("");

    const mutation = useMutation({
        mutationFn: createOrder,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });

            clearCart();

            navigate("/orders");
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!deliveryAddress.trim()) {
            alert("Enter delivery address");
            return;
        }

        const order = {
            items: cart.map((item) => ({
                productId: item._id,
                quantity: item.quantity,
                price: item.price,
            })),
            deliveryAddress,
            comment,
        };

        mutation.mutate(order);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" mb={3}>
                Checkout
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap={2}
            >
                <TextField
                    label="Delivery address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required
                />

                <TextField
                    label="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    multiline
                    rows={4}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={mutation.isPending}
                >
                    Place order
                </Button>
            </Box>
        </Container>
    );
}

export default OrderForm;