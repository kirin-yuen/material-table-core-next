import ResetColumns from '../pages/ResetColumns/index.jsx';
import CustomizeAction from '../pages/CustomizeAction/index.jsx';
import OverrideEditField from '../pages/OverrideEditField/index.jsx';
import OverrideRowUpdateCancel from '../pages/OverrideRowUpdateCancel/index.jsx';
import CustomizeButtonBulkUpdate from '../pages/CustomizeButtonBulkUpdate/index.jsx';

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
  {
    path: 'override-row-update-cancel',
    element: <OverrideRowUpdateCancel />,
  },
  {
    path: 'customize-button-bulk-update',
    element: <CustomizeButtonBulkUpdate />,
  },
];
