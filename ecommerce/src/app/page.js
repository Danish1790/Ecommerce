"use client"
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));


const HomePage = () => {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products")
    const data = await res.json()
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, [])

  return (

    <div>
      <Grid container spacing={2}>
        {
          products.map((product) => (
            <Grid item xs={8} sm={6} md={4} lg={4} xl={3} key={product.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="500"
                  sx={{ height: "150px" }}
                  image={product.image}
                />
                <CardContent>
                  <BootstrapTooltip title={product.title}>
                    <Typography gutterBottom variant="h6" component="div">
                      {
                        (product.title).length >= 12 ? `${product.title.slice(0, 25)}...` : product.title
                      }
                    </Typography>
                  </BootstrapTooltip>
                  {/* <Typography variant="body2" color="text.secondary" sx={{maxHeight:10}}>
                      {product.description}
                    </Typography> */}
                </CardContent>
                <CardActions>
                  <Button size="small" sx={{ backgroundColor: "#da7517", color: "white" }}>{product.price}</Button>
                  <Button size="small" sx={{ backgroundColor: "#693500", color: 'white' }}>Add to cart</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </div>
  )
}

export default HomePage