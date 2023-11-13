"use client"
import { cardActionAreaClasses } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { add, remove } from "../../redux/CartSlice"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';


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


const page = () => {

    const [likeBtnClr, setLikeBtnClr] = useState("#d8af8a")

    const dispatch = useDispatch()
    const productsInCart = useSelector((state) => state.cart)
    console.log("cartItem", productsInCart)

    const handleRemove = (id) => {
        dispatch(remove(id))
    }
    return (
        <div>
            <Grid container spacing={2}>
                {
                    productsInCart ?
                        productsInCart.map((product) => (
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
                                    <CardActions style={{ display: 'flex', justifyContent: "space-between" }}>
                                        <div style={{ width: '200px', display: 'flex', justifyContent: "space-between" }}>
                                            <Button size="small" sx={{ backgroundColor: "#da7517", color: "white" }}>{product.price}</Button>
                                            <Button
                                                size="small"
                                                sx={{ backgroundColor: "#693500", color: 'white', alignSelf: 'center' }}
                                                onClick={() => { handleRemove(product.id) }}
                                            >Remove</Button>
                                        </div>
                                        <FavoriteIcon sx={{ color: likeBtnClr }} />
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))
                        :
                        <Grid item xs={8} sm={6} md={4} lg={4} xl={3} key={product.id}>
                            <h2>No Products in Cart</h2>
                        </Grid>
                }
            </Grid>
        </div>
    )
}

export default page