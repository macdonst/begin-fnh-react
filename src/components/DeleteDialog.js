import React from "react";
import {
  DialogTrigger,
  AlertDialog,
  Text,
  ActionButton,
} from "@adobe/react-spectrum";
import Delete from "@spectrum-icons/workflow/Delete";

const DeleteDialog = ({ route, type, keys, data, callback }) => {
  const key = keys.values().next().value;
  const item = data.find((item) => item.key === key);

  const deleteItem = async () => {
    console.log(`${route}/${item.key}`);
    const response = await fetch(`${route}/${item.key}`, {
      method: "DELETE",
    });
    console.log(response);
    if (response.status === 204) {
      callback();
    }
  };

  return (
    <DialogTrigger>
      <ActionButton isDisabled={keys.size === 0}>
        <Delete />
        <Text>Delete</Text>
      </ActionButton>
      <AlertDialog
        variant="destructive"
        title={`Delete ${type}`}
        primaryActionLabel="Delete"
        cancelLabel="Cancel"
        onPrimaryAction={deleteItem}
      >
        This will permanently delete the selected {type}. Continue?
      </AlertDialog>
    </DialogTrigger>
  );
};

export default DeleteDialog;
