import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';

type Props = {
  selectedImage: string,
  setSelectedImage: (val: string) => void;
}

export const ImageModal: FC<Props> = ({ selectedImage, setSelectedImage }) => {
  return (
    <Modal open={!!selectedImage} onClose={() => setSelectedImage('')} aria-labelledby="image-modal">
      <Box onClick={() => setSelectedImage('')} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img
          style={{ maxWidth: '90%', maxHeight: '90%' }}
          src={selectedImage}
          alt='selected img'
        />
      </Box>
    </Modal>
  );
};
