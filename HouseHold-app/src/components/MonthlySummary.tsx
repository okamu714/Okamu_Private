import {
  Card,
  CardContent,
  Grid,
  Grid2,
  Stack,
  Typography,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';

import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const MonthlySummary = () => {
  return (
    <Grid2 container>
      <Grid2 item>
        <Card>
          <CardContent>
            <Stack>
              <ArrowUpwardIcon />
              <Typography>収入</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default MonthlySummary;
