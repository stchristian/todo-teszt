import React, { FunctionComponent } from "react";
import {
  ItemContainer,
  CheckMarkWrapper,
  DeleteWrapper,
  ActionWrapper,
  DescriptionWrapper,
} from "./TodoItemAtoms";

type TodoItemProps = {
  description: string;
  finished: boolean;
  onCheckToggled: () => void;
  onDelete: () => void;
};
const TodoItem: FunctionComponent<TodoItemProps> = ({
  description,
  finished,
  onCheckToggled,
  onDelete,
}) => {
  return (
    <ItemContainer>
      <DescriptionWrapper finished={finished}>{description}</DescriptionWrapper>

      <ActionWrapper>
        <CheckMarkWrapper
          onClick={() => {
            onCheckToggled();
          }}
        >
          {finished && <>&#10004;</>}
        </CheckMarkWrapper>
        <DeleteWrapper
          onClick={() => {
            onDelete();
          }}
        >
          &#215;
        </DeleteWrapper>
      </ActionWrapper>
    </ItemContainer>
  );
};

export default TodoItem;
