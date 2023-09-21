import ResetColumns from '../pages/ResetColumns/index.jsx';
import CustomizeAction from '../pages/CustomizeAction/index.jsx';
import OverrideEditField from '../pages/OverrideEditField/index.jsx';

export const routesMapping = [
  {
    path: 'reset-column',
    element: <ResetColumns />,
  },
  {
    path: 'customize-action',
    element: <CustomizeAction />,
  },
  {
    path: 'override-editfield',
    element: <OverrideEditField />,
  },
];
