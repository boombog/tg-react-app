import {
  Text,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import "./Contact.css";
import { useTelegram } from "../../hooks/useTelegram";
import { useEffect, useState, useCallback } from "react";

const Contact = () => {
  const { tg, user, queryId, fetchURL } = useTelegram(); 
  const [message, setMessage] = useState("");

  const onSendData = useCallback(() => {
    const data = {
      message: message,
      login: user?.username || "testmode",
      userID: user?.id || "111111",
      queryId: queryId
    }
    fetch(`${fetchURL}/api/sendrequest`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log("Успешно отправлено", data))
    .catch((error) => {
      console.error("Ошибка отправки: ", error)
    })
  }, [message, user?.username, user?.id, queryId, fetchURL]);

  useEffect(() => {
    tg.onEvent('MainButtonClicked', onSendData);
    return () => {
      tg.offEvent('MainButtonClicked', onSendData);
    }
  }, [tg, onSendData]);

  function validateMessage(value) {
    let error;
    if (!value) {
      tg.MainButton.hide();
      error = "Поле обязательно для заполнения";
    } else {
      tg.MainButton.show();
    }
    return error;
  }

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Отправить данные"
    });
  }, [tg]);

  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={onSendData}
    >
      {({ setFieldValue }) => (
        <Form className="MainForm">
          <Text fontSize="3xl" align="center" color={"var(--tg-theme-text-color)"}>
            Опишите вашу проблему
          </Text>
          <Field name="message" validate={validateMessage}>
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors.message && form.touched.message}
              >
                <FormLabel color={"var(--tg-theme-text-color)"}>Сообщение</FormLabel>
                <Textarea
                  {...field}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setFieldValue("message", e.target.value);
                  }}
                  color={"var(--tg-theme-text-color)"}
                  placeholder="Сообщение"
                />
                <FormErrorMessage>{form.errors.message}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default Contact;
