import {
  Text,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import "./Contact.css";
import { useTelegram } from "../../hooks/useTelegram";
import { useEffect, useState, useCallback } from "react";

const Contact = () => {
  const { tg, user, queryId, fetchURL, onClose } = useTelegram();
  const [message, setMessage] = useState("");

  const onSendData = useCallback(() => {
    console.log("Кнопка была нажата");
    const data = {
      message: message,
      login: user?.username || "testmode",
      queryId: queryId,
    };
    console.log("Отправляются данные: ", data);
    axios.post(`${fetchURL}/api/sendrequest/${user?.id || "666666"}`, data, {
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true'
        },
      })
      .catch((error) => {
        console.error("Ошибка отправки: ", error);
      });

    onClose();
  }, [onClose, message, user?.username, user?.id, queryId, fetchURL]);

  useEffect(() => {
    if (tg) {
      tg.onEvent("mainButtonClicked", onSendData);
    }
    return () => {
      if (tg) {
        tg.offEvent("mainButtonClicked", onSendData);
      }
    };
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
    if (tg) {
      tg.MainButton.setParams({
        text: "Отправить данные",
      });
    }
  }, [tg]);

  return (
    <Formik initialValues={{ message: "" }} onSubmit={onSendData}>
      {({ setFieldValue }) => (
        <Form className="MainForm">
          <Text
            fontSize="2xl"
            align="center"
            color={"var(--tg-theme-text-color)"}
          >
            Опишите вашу проблему
          </Text>
          <Field name="message"  validate={validateMessage}>
            {({ field, form }) => (
              <FormControl
                mt={"20px"}
                isInvalid={form.errors.message && form.touched.message}
              >
                <FormLabel color={"var(--tg-theme-text-color)"}>
                  Сообщение
                </FormLabel>
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
