import styled from "styled-components";
export const InputField = styled.input`
  padding: 0.5rem 2rem;
  box-sizing: border-box;
  outline: none;
  border: 1px solid black;
  transition: border 500ms ease;
  border-radius: 5px;
  width: 100%;
  &:focus {
    border: 1px solid red;
    outline: none;
  }
`;
