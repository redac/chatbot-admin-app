import { useQuery } from 'react-query';
import { Button, Container, Grid, Text } from '@nextui-org/react';

import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <Container
      css={{
        height: '100vh',
        placeItems: 'center',
        alignContent: 'center',
      }}
      display="grid"
    >
      <Text h1 css={{ fontFamily: 'Space Grotesk' }}>
        Chatbot Administration App
      </Text>
      <Grid.Container gap={2} css={{ width: 'fit-content' }}>
        <Grid>
          <Button shadow color="gradient" onClick={() => navigate('/admin')}>
            Administration
          </Button>
        </Grid>
        <Grid>
          <Button
            shadow
            color="gradient"
            onClick={() => navigate('/playground')}
          >
            Playground
          </Button>
        </Grid>
      </Grid.Container>
    </Container>
  );
}

export default App;
