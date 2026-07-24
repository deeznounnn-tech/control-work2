import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import useCartStore from "../../store/cartStore.js";
import { queryClient } from "../queryClient.js";
import {
    addToFavorites,
    removeFromFavorites,
} from "../api/authApi.js";

function ProductCard({ product }) {
    const addToCart = useCartStore((state) => state.addToCart);

    const favoriteMutation = useMutation({
        mutationFn: async () => {
            if (product.isFavorite) {
                return removeFromFavorites(product._id);
            }

            return addToFavorites(product._id);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });

            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            });
        },

        onError: (error) => {
            if (error.response?.status === 401) {
                alert(
                    "Пожалуйста, войдите в систему или зарегистрируйтесь"
                );
                return;
            }

            alert("Произошла ошибка");
        },
    });

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            }}
        >
            <IconButton
                onClick={() => favoriteMutation.mutate()}
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "white",
                    "&:hover": {
                        backgroundColor: "#f5f5f5",
                    },
                }}
            >
                {product.isFavorite ? (
                    <FavoriteIcon color="error" />
                ) : (
                    <FavoriteBorderIcon />
                )}
            </IconButton>

            <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                height="220"
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                    gutterBottom
                    variant="h6"
                    fontWeight={600}
                >
                    {product.name}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        height: 60,
                        overflow: "hidden",
                    }}
                >
                    {product.description}
                </Typography>

                <Typography
                    variant="h6"
                    color="primary"
                    fontWeight={700}
                >
                    ${product.price}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                >
                    Stock: {product.stock}
                </Typography>
            </CardContent>

            <CardActions>
                <Button
                    variant="contained"
                    onClick={() => addToCart(product)}
                >
                    Add to cart
                </Button>

                <Button
                    component={Link}
                    to={`/product/${product._id}`}
                >
                    Details
                </Button>
            </CardActions>
        </Card>
    );
}

export default ProductCard;