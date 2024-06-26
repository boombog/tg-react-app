import { useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import { Text } from '@chakra-ui/react'
import "./MainPage.css";
import { motion } from "framer-motion"
import {animationVariants} from '../../constants/animationList'

const MainPage = () => {

  const {tg} = useTelegram()
  useEffect(() => {
    tg.MainButton.hide()
  }, [tg])

  return (
    <motion.div className='mainPage'>
      <motion.div variants={animationVariants.fadeRight} initial="initial" animate="animate"><Text fontSize='3xl' color='var(--tg-theme-text-color)'>Добро пожаловать!</Text></motion.div>
      <motion.div variants={animationVariants.fadeLeft} initial="initial" animate="animate"><Text fontSize="lg" color='var(--tg-theme-text-color)'>на Cartech academy</Text></motion.div>
    </motion.div>
  )
}

export default MainPage