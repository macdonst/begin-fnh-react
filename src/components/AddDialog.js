import React, { useState } from "react";
import {
  DialogTrigger,
  Dialog,
  Content,
  Form,
  Divider,
  Text,
  Heading,
  ButtonGroup,
  Button,
  ActionButton,
  TextField,
} from "@adobe/react-spectrum";
import Add from "@spectrum-icons/workflow/Add";

const AddDialog = ({ route, type, fields, callback }) => {
  const [state, setState] = useState({ facility: "", date: "", time: "" });

  const add = async (state) => {
    const response = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });
    console.log(response);
    if (response.status === 201) {
      callback();
    }
  };

  return (
    <DialogTrigger type="modal">
      <ActionButton>
        <Add />
        <Text>Add</Text>
      </ActionButton>
      {(close) => (
        <Dialog>
          <Heading>Add {type}</Heading>
          <Divider />
          <Content>
            <Text>Add a new {type} to Friday Night Hockey</Text>
            <Form maxWidth="size-3600" isRequired necessityIndicator="label">
              {fields.map((field) => (
                <TextField
                  label={field.label}
                  placeholder={field.placeholder}
                  onChange={(data) =>
                    setState({ ...state, ...{ [field.type]: data } })
                  }
                />
              ))}
            </Form>
          </Content>
          <ButtonGroup>
            <Button variant="secondary" onPress={close}>
              Cancel
            </Button>
            <Button
              variant="cta"
              onPress={async () => {
                try {
                  await add(state);
                } catch (err) {
                  console.log(err);
                }
                close();
              }}
              autoFocus
            >
              Add
            </Button>
          </ButtonGroup>
        </Dialog>
      )}
    </DialogTrigger>
  );
};

export default AddDialog;
