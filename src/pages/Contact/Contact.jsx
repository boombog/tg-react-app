import {
  Text,
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
  Button
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
    const data = {
      message: message,
      login: user?.username || "testmode",
      queryId: queryId,
    };
    axios
      .post(`${fetchURL}/api/sendrequest/${user?.id || "666666"}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => response.json())
      .then((response) => {
        console.log("Успешно отправлено:", response.data);
      })
      .catch((error) => {
        console.error("Ошибка отправки:", error);
      });

    onClose()
  }, [onClose, message, user?.username, user?.id, queryId, fetchURL]);

  useEffect(() => {
    tg.onEvent("MainButtonClicked", onSendData);
    return () => {
      tg.offEvent("MainButtonClicked", onSendData);
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
    tg.MainButton.setParams({
      text: "Отправить данные",
    });
  }, [tg]);

  return (
    <Formik initialValues={{ message: "" }} onSubmit={onSendData}>
      {({ setFieldValue }) => (
        <Form className="MainForm">
          <Text
            fontSize="3xl"
            align="center"
            color={"var(--tg-theme-text-color)"}
          >
            Опишите вашу проблему
          </Text>
          <Field name="message" validate={validateMessage}>
            {({ field, form }) => (
              <FormControl
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
          <Button
            mt={4}
            colorScheme='teal'
            type='submit'
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Contact;
