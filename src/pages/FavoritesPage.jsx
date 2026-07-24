import {
    Container,
    Typography,
    Grid,
    CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { getFavorites } from "../api/authApi.js";
import ProductCard from "../components/ProductCard.jsx";

function FavoritesPage() {
    const {
        data: favorites,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites,
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
                    Failed to load favorites
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
                Favorites
            </Typography>

            {favorites?.length === 0 ? (
                <Typography align="center">
                    You don't have favorite products yet.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {favorites?.map((product) => (
                        <Grid
                            key={product._id}
                            size={{ xs: 12, sm: 6, md: 4 }}
                        >
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default FavoritesPage;