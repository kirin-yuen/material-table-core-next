import { MTableAction } from '@material-table/core';
import CancelButton from './CancelButton.jsx';

export default function Action(tableRef) {
  return (props) => {
    const { tooltip } = props.action;

    const cancelTooltip = tableRef
      ? tableRef.current.props.localization.body.editRow.cancelTooltip
      : 'Cancel';

    if (tooltip === cancelTooltip) {
      return <CancelButton {...props} tableRef={tableRef} />;
    }

    return <MTableAction {...props} />;
  };
}
