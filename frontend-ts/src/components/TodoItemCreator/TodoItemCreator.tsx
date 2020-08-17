import React, { useState, FunctionComponent } from "react";
import { InputField, Button, CreatorContainer } from "./TodoItemCreatorAtoms";
import TextInput from "../TextInput";

interface TodoItemCreatorProps {
  onItemSubmitted: (description: string) => void;
}

const TodoItemCreator: FunctionComponent<TodoItemCreatorProps> = ({ onItemSubmitted }) => {
  const [description, setDescription] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      submitForm();
    }
  };

  const submitForm = () => {
    onItemSubmitted(description);
    setDescription("");
  };

  return (
    <CreatorContainer>
      <TextInput
        value={description}
        onKeyUp={handleKeyUp}
        onChange={onChange}
        placeholder="Add todo..."
      />
      <Button
        onClick={() => {
          submitForm();
        }}
      >
        Create
      </Button>
    </CreatorContainer>
  );
};

export default TodoItemCreator;
