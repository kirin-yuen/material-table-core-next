import OverrideDatePicker from './OverrideDatePicker.jsx';
import OverrideSelect from './OverrideSelect.jsx';
import OverrideTextField from './OverrideTextField.jsx';

const DEFAULT_PROPS = {
  size: 'small',
  fullWidth: true,
};

export default function EditField(props) {
  const {
    columnDef: { type, lookup },
  } = props;

  const mergeProps = {
    ...DEFAULT_PROPS,
    ...props,
  };

  if (type === 'date') {
    return <OverrideDatePicker {...mergeProps} />;
  }

  if (lookup) {
    return <OverrideSelect {...mergeProps} />;
  }

  return <OverrideTextField {...mergeProps} />;
}
