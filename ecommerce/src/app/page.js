"use client"
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add } from "../redux/CartSlice"
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
import Box from '@mui/material/Box';
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


const HomePage = () => {

  const productInState = useSelector((state)=>state.cart)
  const [products, setProducts] = useState([]);
  const [likeBtnClr,setLikeBtnClr] = useState("#d8af8a")
  const [tabState,setTabState] = useState(true)

  const dispatch = useDispatch()

  const getProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products")
    const data = await res.json()
    setProducts(data);
  }

  const handleAdd = (product) => {
    console.log("products in state after add product",productInState)
    dispatch(add(product))
  }

  const handleClickHomeTab = () =>{
    setTabState(true)
  }
  const handleClickLikeTab = () =>{
    setTabState(false)
  }

  const handleClickLikeBtn = () => {
    setLikeBtnClr("red")
  }
  

  useEffect(() => {
    getProducts();
  }, [])



  return (

    <div>

      <Box sx={{ width: '100%', typography: 'body1',display:'flex',justifyContent:'space-around',flexDirection:"row",margin:'20px 0' }}>
        <HomeIcon  sx={{ cursor: "pointer", color:tabState?"Orange":"#d8af8a", fontSize: '40px', margin: 'auto' }} 
          onClick={handleClickHomeTab}
        />
        <FavoriteIcon  sx={{ cursor: "pointer",color:tabState?"#d8af8a":"Orange", fontSize: '40px', margin: 'auto' }} 
          onClick={handleClickLikeTab}
        />
      </Box>

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
                <CardActions style={{display:'flex',justifyContent:"space-between"}}>
                <div style={{width:'200px',display:'flex',justifyContent:"space-between"}}>
                  <Button size="small" sx={{ backgroundColor: "#da7517", color: "white" }}>{product.price}</Button>
                  <Button
                    size="small"
                    sx={{ backgroundColor: "#693500", color: 'white',alignSelf:'center' }}
                    onClick={() => { handleAdd(product) }}
                  >Add to cart</Button>
                  </div>
                  <FavoriteIcon  sx={{color:likeBtnClr,cursor:'pointer'}}/>
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