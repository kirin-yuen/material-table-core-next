import EditField from './EditField/index.jsx';
import Action from './Action/index.jsx';

export const OverrideComponents = (tableRef) => ({
  EditField,
  Action: Action(tableRef),
});
