"use client";

import {
  Box,
  Button,
  Flex,
  Input,
  List,
  ListItem,
  Text,
} from "@/components/chakra";
import FormField from "@/components/FormField";
import { BoxProps } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

type CreateClassFormProps = BoxProps & {
  onClassCreated?: (createdClass: string) => void;
};

const initialValues = {
  name: "",
};

export default function CreateClassForm({
  onClassCreated,
  ...rest
}: CreateClassFormProps) {
  const validateName = (value: string) => {
    let error;
    if (value.length === 0) error = "Nimi ei saa olla tyhjä";
    return error;
  };

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Submitting form with data: ", values);
  };

  return (
    <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
      {() => (
        <Flex as={Form} flexDirection="column" bg="white" {...rest}>
          <FormField name="name" label="Luokan nimi" validate={validateName} />
          {/* <Field as={Input} type="text" name="name" /> */}
          <Button type="submit" marginTop="auto">
            Luo luokka
          </Button>
        </Flex>
      )}
    </Formik>
  );
}
