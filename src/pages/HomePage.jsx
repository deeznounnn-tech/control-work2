import { Container, Grid, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/productApi.js";
import ProductCard from "../components/ProductCard.jsx";

function HomePage() {
    const {
        data: products,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
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
                    Failed to load products
                </Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 4 }}>
            <Typography
                variant="h4"
                fontWeight={700}
                mb={4}
            >
                Products
            </Typography>

            <Grid container spacing={3}>
                {products?.map((product) => (
                    <Grid
                        key={product._id}
                        size={{ xs: 12, sm: 6, md: 4 }}
                    >
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default HomePage;