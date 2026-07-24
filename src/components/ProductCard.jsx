import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import useCartStore from "../../store/cartStore.js";

function ProductCard({ product }) {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
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