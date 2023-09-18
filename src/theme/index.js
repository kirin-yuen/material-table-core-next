import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ComponentsOverride from './override';

const defaultTheme = {};

export default function AppTheme({ children }) {
  const customTheme = createTheme(defaultTheme);
  customTheme.components = ComponentsOverride(customTheme);

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
