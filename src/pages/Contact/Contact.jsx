import {
  Text,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from 'axios';
import { Field, Form, Formik } from "formik";
import "./Contact.css";
import { useTelegram } from "../../hooks/useTelegram";
import { useEffect, useState, useCallback } from "react";

const Contact = () => {

  const { tg, user, queryId, fetchURL } = useTelegram(); 

  const [message, setMessage] = useState();

  const onChangeMessage = (e) => {
    setMessage(e.target.value)
  }

  const onSendData = useCallback(() => {
    const login = user?.username || "testmode"
    const userID = user?.id || "111111"
    const data = {
      message,
      login,
      userID,
      queryId
    }
    axios.post(`${fetchURL}/api/sendrequest`, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Успешно отправлено:', response.data);
    }).catch(error => {
        console.error('Ошибка отправки:', error);
    });
  }, [message, user?.username, user?.id, queryId, fetchURL])

  useEffect(() => {
    tg.onEvent('MainButtonClicked', onSendData)
    return () => {
      tg.offEvent('MainButtonClicked', onSendData)
    }
  }, [tg, onSendData])


  function validateMessage(value) {
    let error;
    if (!value) {
      tg.MainButton.hide()
      error = "Поле обязательно для заполнения";
    } else {
      tg.MainButton.show()
    }
    return error;
  }
  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные"
    })
  }, [tg])

  return (
    <Formik
      initialValues={{ message: "" }}
    >
      <Form className="MainForm">
        <Text fontSize="3xl" align="center" color={"var(--tg-theme-text-color)"}>
          Опишите вашу проблему
        </Text>
        <Field name="message" validate={validateMessage}>
          {({ field, form }) => (
            <FormControl
              isInvalid={form.errors.message && form.touched.message}
            >
              <FormLabel color={"var(--tg-theme-text-color)"}>В этом сообщении</FormLabel>
              <Textarea value={message} onChange={onChangeMessage} color={"var(--tg-theme-text-color)"} {...field} placeholder="Сообщение" />
              <FormErrorMessage>{form.errors.message}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Form>
    </Formik>
  );
};

export default Contact;
