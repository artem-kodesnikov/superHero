import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';


export const StyledImagesBox = styled(Box)(() => ({
  display: 'flex',
  margin: '10px',
  flexWrap: 'wrap',
  gap: '20px',
  '& img': {
    height: '100px',
    border: '2px solid',
    padding: '5px',
    transition: 'transform 0.3s',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export const StyledHeroPageBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > :not(style)': {
    m: 1,
  },
  height: "80vh",
  width: '100%',
}));

export const StyledHeroPageContainer = styled(Container)(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '80px'
}));


export const StyledHeroPageTitle = styled(Typography)(() => ({
  textAlign: 'center',
  fontSize: '32px'
}));

export const StyledHeroPagePaper = styled(Paper)(() => ({
  width: '100%',
  padding: '20px'
}));

export const StyledHeroPageBackButton = styled(Button)(() => ({
  position: 'absolute',
  top: "10px",
  left: '20px'
}));