import React from 'react'
import { Text } from '@chakra-ui/react'
import "./MainPage.css";
import { motion } from "framer-motion"
import {animationVariants} from '../../constants/animationList'

const MainPage = () => {

  return (
    <motion.div className='mainPage'>
      <motion.div variants={animationVariants.fadeRight} initial="initial" animate="animate"><Text fontSize='3xl' pt={"225px"} color='var(--tg-theme-text-color)'>Добро пожаловать!</Text></motion.div>
      <motion.div variants={animationVariants.fadeLeft} initial="initial" animate="animate"><Text fontSize="lg" pb={"225px"} color='var(--tg-theme-text-color)'>на Carfix academy</Text></motion.div>
    </motion.div>
  )
}

export default MainPage