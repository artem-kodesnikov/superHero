/* eslint-disable react/react-in-jsx-scope */
import { Box, Button, CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import { TextField } from 'formik-mui';
import { ChangeEvent, FC, useRef } from 'react';
import { Hero } from '../../types/hero.type';
import { convertToBase64 } from '../../utils/convertImageToBase64';
import { heroValidationSchema } from '../../validation/hero.validator';
import { StyledImagesBox } from '../HeroPage/HeroPage.style';
import { NewHeroFormInput } from '../NewHeroFormInput/NewHeroFormInput';
import { previewImage, previewImageBox, StyledBackDrop, StyledButtonsBox, StyledDescriptionField, StyledLabel } from '../NewHeroPage/NewHeroPage.style';
import { StyledUpdatingForm } from './UpdatingForm.style';

type Props = {
  hero?: Hero,
  setSelectedImage: (val: string) => void
}

export const UpdatingForm: FC<Props> = ({ hero, setSelectedImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClearInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Formik
      initialValues={{
        _id: '',
        nickname: hero?.nickname || '',
        real_name: hero?.real_name || '',
        origin_description: hero?.origin_description || '',
        superpowers: hero?.superpowers || '',
        catch_phrase: hero?.catch_phrase || '',
        images: hero?.images.map((image) => ({ url: image.url })) || [],
      }}
      validationSchema={heroValidationSchema}
      onSubmit={async (values: Hero, { setSubmitting, resetForm }) => {
        handleClearInput();
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting, setFieldValue, values }) => {
        const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          if (files) {
            const fileArray = Array.from(files);
            Promise.all(fileArray.map((file) => convertToBase64(file) as Promise<string>))
              .then((base64Images) => {
                const updatedImages = [...values.images];
                const newImages = base64Images.map((base64) => ({ url: base64 as string }));
                updatedImages.push(...newImages);
                setFieldValue('images', updatedImages);
              })

              .catch((error) => {
                console.error('Error converting files to Base64:', error);
              });
          }
        };

        const handleRemoveImage = (index: number) => {
          const updatedImages = [...values.images];
          updatedImages.splice(index, 1);
          setFieldValue('images', updatedImages);
        };

        return (
          <StyledUpdatingForm>
            <StyledBackDrop open={isSubmitting}>
              <CircularProgress color="inherit" />
            </StyledBackDrop>
            <NewHeroFormInput name={'nickname'} content={'Nickname'} />
            <NewHeroFormInput name={'real_name'} content={'Real name'} />
            <NewHeroFormInput name={'superpowers'} content={'Superpowers'} />
            <NewHeroFormInput name={'catch_phrase'} content={'Catch phrase'} />
            <StyledLabel htmlFor={'origin_description'}>{'Origin description'}</StyledLabel>
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
            <StyledImagesBox>
              {values?.images.map((image, index) => (
                <Box key={index} sx={previewImageBox}>
                  <img
                    onClick={() => setSelectedImage(image.url)}
                    src={image.url}
                    alt='hero images'
                    key={image.url}
                    style={previewImage}
                  />
                  <Button sx={{ marginBottom: '20px' }} variant="outlined" color="error" onClick={() => handleRemoveImage(index)}>
                    Remove
                  </Button>
                </Box>
              ))
              }
            </StyledImagesBox>
            <StyledButtonsBox>
              <Button sx={{ mb: 5 }} variant="contained" color="success" onClick={submitForm}>
                Save
              </Button>
            </StyledButtonsBox>
          </StyledUpdatingForm>
        );
      }}
    </Formik>
  );
};