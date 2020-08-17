import styled from "styled-components";

export const ItemContainer = styled.div`
  margin: 0.5rem 0;
  padding: 1rem 2rem;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CheckMarkWrapper = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
`;

export const DescriptionWrapper = styled.span<{
  finished: boolean;
}>`
  text-decoration: ${({ finished }) => (finished ? "line-through" : "initial")};
`;

export const DeleteWrapper = styled.span`
  display: inline-block;
  text-align: center;
  font-size: 20px;
  padding: 0 5px;
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    color: #555;
  }
  box-sizing: border-box;
`;
