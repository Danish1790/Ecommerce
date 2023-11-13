"use client"
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div style={{display:"flex",alignItems:'center',justifyContent:"space-between"}}>
        <span>Redux toolkit with Next JS</span>
        <div>
            <Link href="/" className='navlink' style={{fontWeight:"bolder"}}>
                Home
            </Link>
            <Link href="/" className='navlink' style={{fontWeight:"bolder",marginRight:"7px"}}>
                Cart
            </Link>
            <span style={{fontWeight:"bolder"}}>items:0</span>
        </div>
    </div>
  )
}

export default Navbar