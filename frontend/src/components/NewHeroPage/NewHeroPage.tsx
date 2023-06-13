import { Button, CircularProgress, Container } from '@mui/material';
import { TextField } from 'formik-mui';
import React, { ChangeEvent } from 'react';
import { StyledBackDrop, StyledButtonsBox, StyledDescriptionField, StyledField, StyledForm, StyledLabel } from './NewHeroPage.style';
import { Hero } from '../../types/hero.type';
import { Formik } from 'formik';

export const NewHeroPage = () => {

  const convertToBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 5 }} maxWidth="lg">
      <Formik
        initialValues={{
          nickname: '',
          real_name: '',
          origin_description: '',
          superpowers: '',
          catch_phrase: '',
          images: []
        }}
        onSubmit={async (values: Hero, { setSubmitting, resetForm }) => {
          console.log(values)
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting, setFieldValue }) => {
          return (
            <StyledForm>
              <StyledBackDrop open={isSubmitting}>
                <CircularProgress color="inherit" />
              </StyledBackDrop>
              <StyledLabel htmlFor="nickname">Nickname</StyledLabel>
              <StyledField
                id="nickname"
                component={TextField}
                name="nickname"
                type="text"
                placeholder="Enter your nickname"
              />
              <StyledLabel htmlFor="real_name">Real name</StyledLabel>
              <StyledField
                id="real_name"
                component={TextField}
                name="real_name"
                type="text"
                placeholder="Enter your real name"
              />
              <StyledLabel htmlFor="superpowers">Superpowers</StyledLabel>
              <StyledField
                id="superpowers"
                component={TextField}
                name="superpowers"
                type="text"
                placeholder="Enter your real name"
              />
              <StyledLabel htmlFor="catch_phrase">Catch phrase</StyledLabel>
              <StyledField
                id="catch_phrase"
                component={TextField}
                name="catch_phrase"
                type="text"
                placeholder="Enter your catch phrase"
              />
              <StyledLabel htmlFor="origin_description">Origin description</StyledLabel>
              <StyledDescriptionField
                component={TextField}
                name="origin_description"
                type="text"
                multiline
                rows={6}
                placeholder="Enter your origin description"
              />
              <Button
                variant="contained"
                component="label"
                sx={{ mb: 2 }}
              >
                Upload File
                <input
                  id="images"
                  name="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const files = event.target.files;
                    if (files) {
                      const fileArray = Array.from(files);
                      Promise.all(fileArray.map((file) => convertToBase64(file)))
                        .then((base64Images) => {
                          setFieldValue("images", base64Images);
                        })
                        .catch((error) => {
                          console.error("Error converting files to Base64:", error);
                        });
                    }
                  }}
                // hidden
                />
              </Button>
              <StyledButtonsBox>
                <Button variant="contained" color="success" onClick={submitForm}>
                  Save
                </Button>
              </StyledButtonsBox>
            </StyledForm>
          );
        }}
      </Formik>
    </Container>
  );
};
