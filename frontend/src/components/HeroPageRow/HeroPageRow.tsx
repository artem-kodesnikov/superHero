import { Divider, Typography } from '@mui/material'
import React, { FC } from 'react'

type Props = {
  title: string,
  content?: string
}

export const HeroPageRow: FC<Props> = ({ title, content }) => {
  return (
    <>
      <Typography sx={{ fontSize: 24 }}>
        {title}:
        <br />
        <Typography sx={{ fontSize: 18, color: 'gray', wordWrap: 'break-word' }}>
          {content}
        </Typography>
      </Typography>
      <Divider />
    </>
  )
}
