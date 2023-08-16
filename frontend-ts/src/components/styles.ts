import { styled } from '@mui/system';
import { Theme } from '@mui/material';

// interface StyleProps {
//   root: string;
//   buttonGroup: string;
//   input: string;
// }

// export default styled('div')({
//   root: {
//     textAlign: 'center',
//     padding: '1rem',
//   },
//   buttonGroup: {
//     margin: '1rem 0',
//     '& > *': {
//       margin: '0 1rem',
//     },
//   },
//   input: {
//     display: 'none',
//   },
// });

export const Root = styled('div')(() => ({
  textAlign: 'center',
  padding: '1rem',
}));

export const ButtonGroup = styled('div')(() => ({
  margin: '1rem 0',
  '& > *': {
    margin: '0 1rem',
  },
}));

export const HiddenInput = styled('input')(() => ({
  display: 'none',
}));