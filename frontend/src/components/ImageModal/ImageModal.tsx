import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC } from 'react';
import { ModalImage, ModalImageBox } from './ImageModal.style';

type Props = {
  selectedImage: string,
  setSelectedImage: (val: string) => void;
}

export const ImageModal: FC<Props> = ({ selectedImage, setSelectedImage }) => {
  return (
    <Modal open={!!selectedImage} onClose={() => setSelectedImage('')} aria-labelledby="image-modal">
      <Box onClick={() => setSelectedImage('')} sx={ModalImageBox}>
        <img
          style={ModalImage}
          src={selectedImage}
          alt='selected img'
        />
      </Box>
    </Modal>
  );
};
