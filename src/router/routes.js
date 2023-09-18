import { Route, createRoutesFromElements } from 'react-router-dom';
import MainLayout from '../Layout/index.jsx';
import { routesMapping } from './routesMapping';

const routes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<MainLayout />}>
      {routesMapping.map((routeProps) => (
        <Route key={routeProps.path} {...routeProps} />
      ))}
    </Route>
  </Route>
);

export default routes;
