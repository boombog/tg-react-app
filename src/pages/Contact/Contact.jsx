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
import { useEffect } from "react";

const Contact = () => {

  const { tg } = useTelegram()
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
      onSubmit={(values) => {
        console.log(values);
      }}
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
              <Textarea color={"var(--tg-theme-text-color)"} {...field} placeholder="Сообщение" />
              <FormErrorMessage>{form.errors.message}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Form>
    </Formik>
  );
};

export default Contact;
