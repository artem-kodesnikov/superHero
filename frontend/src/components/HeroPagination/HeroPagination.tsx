import { Pagination, Stack } from '@mui/material';
import React, { FC } from 'react';

type Props = {
  setCurrentPage: (num: number) => void,
  currentPage: number,
  totalPages: number
}

export const HeroPagination: FC<Props> = ({ setCurrentPage, currentPage, totalPages }) => {

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Stack sx={{ mb: 5 }} spacing={2}>
      <Pagination
        sx={{ display: 'flex', justifyContent: 'center'}}
        color='primary'
        onChange={handlePageChange}
        page={currentPage}
        count={totalPages}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};
