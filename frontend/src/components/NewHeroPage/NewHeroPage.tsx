import { Box, Button, CircularProgress } from '@mui/material';
import { TextField } from 'formik-mui';
import React, { ChangeEvent, useRef } from 'react';
import { previewImage, previewImageBox, previewImagesBox, StyledBackDrop, StyledButtonsBox, StyledContainer, StyledDescriptionField, StyledForm, StyledLabel } from './NewHeroPage.style';
import { Hero } from '../../types/hero.type';
import { Formik } from 'formik';
import { createNewHero } from '../../api/requests';
import { Link } from 'react-router-dom';
import { NewHeroFormInput } from '../NewHeroFormInput/NewHeroFormInput';
import { heroValidationSchema } from '../../validation/hero.validator';

export const NewHeroPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertToBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const handleClearInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Link to='/'>
        <Button sx={{ position: 'absolute', top: "10px", left: '20px' }} variant='contained'>
          Back to home page
        </Button>
      </Link>
      <StyledContainer maxWidth="lg">
        <Formik
          initialValues={{
            _id: '',
            nickname: '',
            real_name: '',
            origin_description: '',
            superpowers: '',
            catch_phrase: '',
            images: []
          }}
          validationSchema={heroValidationSchema}
          onSubmit={async (values: Hero, { setSubmitting, resetForm }) => {
            console.log(values)
            createNewHero(values);
            handleClearInput();
            resetForm();
            setSubmitting(false);
          }}
        >
          {({ submitForm, isSubmitting, setFieldValue, values }) => {

            const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
              console.log(values);
              const files = event.target.files;
              if (files) {
                const fileArray = Array.from(files);
                Promise.all(fileArray.map((file) => convertToBase64(file) as Promise<string>))
                  .then((base64Images) => {
                    const updatedImages = [...values.images];
                    const newImages = base64Images.map((base64) => ({ url: base64 as string }));
                    updatedImages.push(...newImages);
                    setFieldValue("images", updatedImages);
                  })

                  .catch((error) => {
                    console.error("Error converting files to Base64:", error);
                  });
              }
            };

            const handleRemoveImage = (index: number) => {
              const updatedImages = [...values.images];
              updatedImages.splice(index, 1);
              setFieldValue("images", updatedImages);
            };
            return (
              <StyledForm>
                <StyledBackDrop open={isSubmitting}>
                  <CircularProgress color="inherit" />
                </StyledBackDrop>
                <NewHeroFormInput name={'nickname'} content={'Nickname'} />
                <NewHeroFormInput name={'real_name'} content={'Real name'} />
                <NewHeroFormInput name={'superpowers'} content={'Superpowers'} />
                <NewHeroFormInput name={'catch_phrase'} content={'Catch phrase'} />
                <StyledLabel htmlFor="origin_description">Origin description</StyledLabel>
                <StyledDescriptionField
                  component={TextField}
                  name="origin_description"
                  type="text"
                  multiline
                  rows={6}
                  placeholder="Enter your origin description" />
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mb: 2 }}
                >
                  Add some photos of the hero
                  <input
                    ref={fileInputRef}
                    id="images"
                    name="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleUploadImage(e)}
                    hidden
                  />
                </Button>
                <Box sx={previewImagesBox}>
                  {values.images && values.images.map((image, index) =>
                    <Box key={index} sx={previewImageBox}>
                      <img style={previewImage} src={image.url} alt='preview' />
                      <Button sx={{ marginBottom: '20px' }} variant="outlined" color="error" onClick={() => handleRemoveImage(index)}>Remove</Button>
                    </Box>
                  )}
                </Box>
                <StyledButtonsBox>
                  <Button sx={{ mb: 5 }} variant="contained" color="success" onClick={submitForm}>
                    Save
                  </Button>
                </StyledButtonsBox>
              </StyledForm>
            );
          }}
        </Formik>
      </StyledContainer>
    </>
  );
};
