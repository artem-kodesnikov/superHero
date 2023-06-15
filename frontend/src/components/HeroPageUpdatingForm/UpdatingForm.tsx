/* eslint-disable react/react-in-jsx-scope */
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import { TextField } from 'formik-mui';
import { ChangeEvent, FC, useRef } from 'react';
import { toast } from 'react-toastify';
import { updateHero } from '../../api/requests';
import { Hero } from '../../types/hero.type';
import { convertToBase64 } from '../../utils/convertImageToBase64';
import { heroValidationSchema } from '../../validation/hero.validator';
import { StyledImagesBox } from '../HeroPage/HeroPage.style';
import { Loader } from '../Loader/Loader';
import { NewHeroFormInput } from '../NewHeroFormInput/NewHeroFormInput';
import { previewImage, previewImageBox, StyledButtonsBox, StyledDescriptionField, StyledLabel } from '../NewHeroPage/NewHeroPage.style';
import { StyledUpdatingForm, UpdatingFormDeleteButton, UpdatingFormSaveButton } from './UpdatingForm.style';

type Props = {
  hero?: Hero,
  setSelectedImage: (val: string) => void,
  setIsUpdating: (val: boolean) => void
}

export const UpdatingForm: FC<Props> = ({ hero, setSelectedImage, setIsUpdating }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClearInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Formik
      initialValues={{
        _id: hero?._id || '',
        nickname: hero?.nickname || '',
        real_name: hero?.real_name || '',
        origin_description: hero?.origin_description || '',
        superpowers: hero?.superpowers || '',
        catch_phrase: hero?.catch_phrase || '',
        images: hero?.images.map((image) => ({ _id: image._id, url: image.url })) || [],
      }}
      validationSchema={heroValidationSchema}
      onSubmit={async (values: Hero, { setSubmitting }) => {
        await updateHero(values);
        handleClearInput();
        toast.success('Hero updated!');
        setSubmitting(false);
        setIsUpdating(false);
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
            <Loader isLoading={isSubmitting} />
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
            <Button variant="contained" component="label" sx={{ mb: 2 }}>
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
                <Box key={image._id} sx={previewImageBox}>
                  <img
                    onClick={() => setSelectedImage(image.url)}
                    src={image.url}
                    alt='hero images'
                    style={previewImage}
                  />
                  <Button sx={UpdatingFormDeleteButton} variant="outlined" color="error" onClick={() => handleRemoveImage(index)}>
                    Remove
                  </Button>
                </Box>
              ))
              }
            </StyledImagesBox>
            <StyledButtonsBox>
              <Button sx={UpdatingFormSaveButton} variant="contained" color="success" onClick={submitForm}>
                Save
              </Button>
            </StyledButtonsBox>
          </StyledUpdatingForm>
        );
      }}
    </Formik>
  );
};