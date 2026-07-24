import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getProductById } from "../api/productApi.js";
import useCartStore from "../../store/cartStore.js";

function ProductPage() {
    const { id } = useParams();

    const addToCart = useCartStore((state) => state.addToCart);

    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
    });

    if (isLoading) {
        return (
            <Container sx={{ textAlign: "center", mt: 5 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (isError) {
        return (
            <Container sx={{ mt: 5 }}>
                <Typography align="center">
                    Product not found
                </Typography>
            </Container>
        );
    }

    return (
        <Container
            maxWidth="md"
            sx={{ py: 5 }}
        >
            <Card>
                <CardMedia
                    component="img"
                    height="450"
                    image={product.image}
                    alt={product.name}
                />

                <CardContent>
                    <Typography
                        variant="h4"
                        gutterBottom
                    >
                        {product.name}
                    </Typography>

                    <Typography
                        variant="body1"
                        color="text.secondary"
                        mb={3}
                    >
                        {product.description}
                    </Typography>

                    <Typography
                        variant="h5"
                        color="primary"
                        fontWeight={700}
                        mb={2}
                    >
                        ${product.price}
                    </Typography>

                    <Typography mb={3}>
                        Stock: {product.stock}
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => addToCart(product)}
                    >
                        Add to cart
                    </Button>
                </CardContent>
            </Card>
        </Container>
    );
}

export default ProductPage;