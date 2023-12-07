import OverrideDatePicker from './OverrideDatePicker.jsx';
import OverrideSelect from './OverrideSelect.jsx';
import OverrideTextField from './OverrideTextField.jsx';

const DEFAULT_PROPS = {
  size: 'small',
  fullWidth: true,
};

const bindDataToBulkUpdateValidation = ({ tableRef, key, field, error }) => {
  tableRef.current.$bulkUpdateValidation[key] = {
    ...tableRef.current.$bulkUpdateValidation[key],
  };

  tableRef.current.$bulkUpdateValidation[key][field] = error;
};

export default function EditField(tableRef) {
  return (props) => {
    const {
      columnDef: { type, lookup, field },
      rowData,
      error,
    } = props;

    const mergeProps = {
      ...DEFAULT_PROPS,
      ...props,
    };

    const { id, isAdd } = rowData.tableData;

    if (isAdd) {
      bindDataToBulkUpdateValidation({ tableRef, key: id, field, error });
    }

    const bulkUpdateIndexArr = Object.keys(
      tableRef.current.dataManager.bulkEditChangedRows
    );

    if (bulkUpdateIndexArr.length) {
      bulkUpdateIndexArr.forEach((item) => {
        bindDataToBulkUpdateValidation({
          tableRef,
          key: String(item),
          field,
          error,
        });
      });
    }

    if (type === 'date') {
      return <OverrideDatePicker {...mergeProps} />;
    }

    if (lookup) {
      return <OverrideSelect {...mergeProps} />;
    }

    return <OverrideTextField {...mergeProps} />;
  };
}
