import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import "./Main.css";
import { useEffect, useState } from "react";

export default function Main() {
  const [products, setProducts] = useState([]);

  async function getProducts() {
    const response = await fetch('https://fakestoreapi.com/products'); // fetch the products
    const data = await response.json(); // convert the response to json
    setProducts(data); // set the products in the state to the products we fetched
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="product-container">
      {products.map(product => (
        <Card key={product.id} className="cool" sx={{ width: 320, maxWidth: '100%', boxShadow: 'lg', margin: '1rem' }}>
          <CardOverflow>
            <AspectRatio sx={{ minWidth: 200 }}>
              <img
                src={product.image}
                alt={product.title}
                loading="lazy"
              />
            </AspectRatio>
          </CardOverflow>
          <CardContent>
            <Typography level="body-xs">{product.category}</Typography>
            <Link
              href="#product-card"
              fontWeight="md"
              color="neutral"
              textColor="text.primary"
              overlay
              endDecorator={<ArrowOutwardIcon />}
            >
              {product.title}
            </Link>
            <Typography
              level="title-lg"
              sx={{ mt: 1, fontWeight: 'xl' }}
              endDecorator={
                <Chip component="span" size="sm" variant="soft" color="success">
                  {`$${product.price}`}
                </Chip>
              }
            >
              {`$${product.price}`}
            </Typography>
            <Typography level="body-sm">
              {product.description}
            </Typography>
          </CardContent>
          <CardOverflow>
            <Button variant="solid" color="danger" size="lg">
              Add to cart
            </Button>
          </CardOverflow>
        </Card>
      ))}
    </div>
  );
}
