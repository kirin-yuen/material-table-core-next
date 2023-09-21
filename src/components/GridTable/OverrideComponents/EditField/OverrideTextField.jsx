import { TextField } from '@mui/material';

export default function OverrideTextField(props) {
  const { onChange } = props;

  const mergeProps = {
    ...props,
    onChange: (e) => onChange(e.target.value),
  };

  return <TextField {...mergeProps} />;
}
