import { useEffect } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import {
  Accordion
} from '@chakra-ui/react'
import FAQBlock from "../../components/FAQBlock/FAQBlock";

const FAQ = () => {

  const {tg} = useTelegram()
  useEffect(() => {
    tg.MainButton.hide()
  }, [tg])

  return (
    <div className="FaqMain">
      <Accordion allowToggle bg={"var(--tg-theme-bg-color)"}>
        <FAQBlock title={"1. Как войти в образовательную платформу?"} text={"В правом верхнем углу шапки сайта образовательной платформы есть кнопка Вход, нажимаем на нее, затем вводим данные, которые предоставил преподаватель."}/>
        <FAQBlock title={"2. Как узнать сроки выполнения тестов на моих курсах?"} text={"В странице Личного кабинета есть календарь, показывающий все сроки выполнения необходимых для прохождения тестов."}/>
        <FAQBlock title={"3. Как перейти к моим курсам?"} text={"В шапке сайта образовательной платформы есть навигационная кнопка 'Курсы', нажимая на нее, вас автоматически перекидывает на список ваших курсов."}/>
      </Accordion>
    </div>
  );
};

export default FAQ;
