import { Box, Container, Divider, Paper, Typography } from '@mui/material';
import React from 'react'
// import { useParams } from 'react-router-dom';

export const HeroPage = () => {
  // const { id } = useParams();

  return (
    <>
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
        maxWidth="lg"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
            },
            height: "80vh",
            width: '100%',
          }}
        >
          <Paper sx={{ width: '100%', p: 4 }} elevation={3}>
            <Typography sx={{
              textAlign: 'center',
              fontSize: 32,
              fontWeight: 700
            }}>
              nickname:
              <br />
              <Typography sx={{ fontSize: 24, color: 'gray' }}>
                hero nickname
              </Typography>
            </Typography>
            <Divider />
            <Typography sx={{ fontSize: 24 }}>
              real_name:
              <br />
              <Typography sx={{ fontSize: 18, color: 'gray', wordWrap: 'break-word' }}>
                hero real name
              </Typography>
            </Typography>
            <Divider />
            <Typography sx={{ fontSize: 24 }}>
              superpowers:
              <br />
              <Typography sx={{ fontSize: 18, color: 'gray', wordWrap: 'break-word' }}>
                hero superpowers
              </Typography>
            </Typography>
            <Divider />
            <Typography sx={{ fontSize: 24 }}>
              catch_phrase
              <br />
              <Typography sx={{ fontSize: 18, color: 'gray', wordWrap: 'break-word' }}>
                hero catch_phrase
              </Typography>
            </Typography>
            <Typography sx={{ fontSize: 24 }}>
              origin_description
              <br />
              <Typography sx={{ fontSize: 18, color: 'gray', wordWrap: 'break-word' }}>
                hero origin_description
              </Typography>
            </Typography>
            <Divider />
          </Paper>
        </Box>
      </Container>
    </>
  )
}
