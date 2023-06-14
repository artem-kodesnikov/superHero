import { TextField } from 'formik-mui';
import React, { FC } from 'react';
import { StyledField, StyledLabel } from '../NewHeroPage/NewHeroPage.style';

type Props = {
  name: string,
  content?: string
}

export const NewHeroFormInput: FC<Props> = ({ name, content }) => {
  return (
    <>
      <StyledLabel htmlFor={name}>{content}</StyledLabel>
      <StyledField
        id={name}
        component={TextField}
        name={name}
        type="text"
        placeholder={`Enter your ${content}`}
      />
    </>
  );
};
