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

const AddGameDialog = ({ callback }) => {
  const [facility, setFacility] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const addGame = async (facility, date, time) => {
    const response = await fetch("/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ facility, date, time }),
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
          <Heading>Add Game</Heading>
          <Divider />
          <Content>
            <Text>Add a new game to Friday Night Hockey</Text>
            <Form
              maxWidth="size-3600"
              isRequired
              necessityIndicator="label"
              onSubmit={(ack) => console.log(ack)}
            >
              <TextField
                label="Facility"
                placeholder="Kanata Rec Centre"
                onChange={(data) => setFacility(data)}
              />
              <TextField
                label="Date"
                placeholder="2021-07-30"
                onChange={(data) => setDate(data)}
              />
              <TextField
                label="Time"
                placeholder="10:00 PM"
                onChange={(data) => setTime(data)}
              />
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
                  await addGame(facility, date, time);
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

export default AddGameDialog;
