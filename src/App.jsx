import { RouterProvider } from 'react-router-dom';
import router from './router';
import AppTheme from './theme';

function App() {
  return (
    <AppTheme>
      <RouterProvider router={router} />
    </AppTheme>
  );
}
export default App;
