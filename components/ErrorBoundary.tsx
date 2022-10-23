/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Text, Center } from '@chakra-ui/react';

/**
 * Default Error boundary. Use in JSX declarative statements.
 * As per docs, Error Boundaries are not supported in functional components.
 */
export default class ErrorBoundary extends React.Component<
  { page?: string },
  { hasError: boolean }
> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log('message = ', error.message);
    console.log('name = ', error.name);
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('error fired from ErrorBoundary', error.name, error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center mt={8}>
          <Text fontSize='sm'>Something went wrong :(</Text>
        </Center>
      );
    }
    return this.props.children;
  }
}
