import React from "react";
import {
  DialogTrigger,
  AlertDialog,
  Text,
  ActionButton,
} from "@adobe/react-spectrum";
import Delete from "@spectrum-icons/workflow/Delete";

const DeleteGameDialog = ({ keys, games, callback }) => {
  const key = keys.values().next().value;
  const game = games.find((game) => game.key === key);

  const deleteGame = async () => {
    console.log(`/games/${game.key}`);
    const response = await fetch(`/games/${game.key}`, {
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
        title="Delete game"
        primaryActionLabel="Delete"
        cancelLabel="Cancel"
        onPrimaryAction={deleteGame}
      >
        This will permanently delete the selected game. Continue?
      </AlertDialog>
    </DialogTrigger>
  );
};

export default DeleteGameDialog;
