import React from "react";
import {
  Accordion
} from '@chakra-ui/react'
import FAQBlock from "../../components/FAQBlock/FAQBlock";

const FAQ = () => {
  return (
    <div>
      <Accordion allowToggle bg={"var(--tg-theme-bg-color)"}>
        <FAQBlock title={"1. Почему вход на сайт сейчас недоступен?"} text={"Потому что хост еще не оплачен, пожалуйста, подождите"}/>
        <FAQBlock title={"2. Что случилось с платформой?"} text={"С ней все хорошо, ведутся технические работы, скоро все починим, и вы снова сможете приступать к работе"}/>
        <FAQBlock title={"3. Как зарегистрироваться?"} text={"Нужно всего лишь на ссылку под названием 'Авторизация', после чего зарегистрироваться, выбрав вариант 'Зарегистрироваться'."}/>
      </Accordion>
    </div>
  );
};

export default FAQ;
