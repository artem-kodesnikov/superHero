import { Backdrop, Box, Button, Container, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import { Field, Form } from 'formik';

export const StyledContainer = styled(Container)(() => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const StyledField = styled(Field)(() => ({
  marginBottom: '0.5rem'
}));

export const StyledDescriptionField = styled(Field)(() => ({
  width: '100%',
  borderColor: 'gray',
  borderRadius: '1rem',
  marginBottom: '1rem'
}));

export const StyledForm = styled(Form)(() => ({
  width: '100%',
  display: 'flex',
  maxWidth: 400,
  flexDirection: 'column'
}));

export const StyledButtonsBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

export const StyledRegisterButton = styled(Button)(() => ({
  width: 100,
  height: 35,
  margin: 0
}));

export const StyledLabel = styled(InputLabel)(() => ({
  marginBottom: '0.5rem'
}));

export const StyledBackDrop = styled(Backdrop)(() => ({
  color: '#fff',
  zIndex: 999
}));

export const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};