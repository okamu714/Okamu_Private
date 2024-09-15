import React from 'react';
import { Button, Container } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="sm">
      <h1>シフト自動入力アプリ</h1>
      <Button variant="contained" color="primary">
        シフト入力開始
      </Button>
    </Container>
  );
}

export default Home;
