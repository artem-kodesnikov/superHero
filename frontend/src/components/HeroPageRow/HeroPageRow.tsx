import { Divider, Typography } from '@mui/material';
import React, { FC } from 'react';
import { HeroPageRowContent, HeroPageRowTitle } from './HeroPageRow.style';

type Props = {
  title: string,
  content?: string
}

export const HeroPageRow: FC<Props> = ({ title, content }) => {
  return (
    <>
      <Typography sx={HeroPageRowTitle}>
        {title}:
        <br />
        <Typography sx={HeroPageRowContent}>
          {content}
        </Typography>
      </Typography>
      <Divider />
    </>
  );
};
