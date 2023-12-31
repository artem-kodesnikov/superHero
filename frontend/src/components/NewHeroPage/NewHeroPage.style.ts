import { Backdrop, Box, Button, Container, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import { Field, Form } from 'formik';

export const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '50px'
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
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const previewImagesBox = {
  mb: 3, 
  display: 'flex', 
  flexWrap: 'wrap', 
  justifyContent: 'center'
};
export const previewImageBox = {
  display: 'flex', 
  alignItems: 'center', 
  flexDirection: 'column', 
  marginRight: '20px',
  '& img': {
    height: '100px',
    border: '2px solid',
    padding: '5px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
};

export const previewImage = {
  height: '100px', 
  marginBottom: '20px',
  '&:hover': {
    cursor: 'pointer',
  },
};

export const NewHeroPageBackButton = {
  position: 'absolute', 
  top: '10px', 
  left: '20px'
};

export const NewHeroPageSaveButton = {
  mb: 5
};

export const NewHeroPageSaveImageButton = {
  mb: 5
};