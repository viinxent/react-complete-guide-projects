import React from 'react'

import classes from './PizzaImage.css'

import Image from '../assets/pizza.jpg'

const PizzaImage = () => (
  <div className={classes.PizzaContainer}>
    <img src={Image} alt="pizza" className={classes.PizzaImage} />
  </div>
)

export default PizzaImage
