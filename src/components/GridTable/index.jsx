import MaterialTable from '@material-table/core';
import { Button } from '@mui/material';
import { useRef, useEffect } from 'react';
import './style.scss';
import { tableIcons } from './tableIcons';
import { OverrideComponents } from './OverrideComponents/index.jsx';
import {
  getUpdateChangeRows,
  $openBulkUpdate,
  $closeBulkUpdate,
  $bulkUpdateSave,
  $clearBulkUpdateDataAndCloseBulkUpdateState,
  $setColumns,
} from './utis';

const defaultOptions = {
  searchFieldVariant: 'outlined',
  showTitle: false,
  emptyRowsWhenPaging: false,
  draggable: false,
  search: true,
  columnsButton: true,
};

export default function MTableNext(props) {
  const { data, options, columns, tableRef } = props;

  const columnsRef = useRef([]);

  const mergeOptions = {
    ...defaultOptions,
    ...options,
    editRowUpdate: props.editable?.onRowUpdate, // editable.onRowUpdate 无法通过状态变更触发表格渲染，因此需要通过加入到 option， 用 option 触发其渲染
  };

  useEffect(() => {
    columnsRef.current = columns.map((item) => ({ ...item }));

    if (tableRef) {
      tableRef.current.getUpdateChangeRows = getUpdateChangeRows;
      tableRef.current.$openBulkUpdate = $openBulkUpdate;
      tableRef.current.$closeBulkUpdate = $closeBulkUpdate;
      tableRef.current.$bulkUpdateSave = $bulkUpdateSave;
      tableRef.current.$clearBulkUpdateDataAndCloseBulkUpdateState =
        $clearBulkUpdateDataAndCloseBulkUpdateState;
      tableRef.current.$setColumns = $setColumns;
    }
  }, []);

  return (
    <div className="grid-container">
      <MaterialTable
        {...props}
        data={data}
        options={mergeOptions}
        icons={tableIcons}
        components={{
          ...props.components,
          ...OverrideComponents(tableRef),
        }}
        editable={{
          ...props.editable,
        }}
        localization={{
          toolbar: {
            searchPlaceholder: 'Filter Result',
            addRemoveColumns: (
              <Button
                sx={{
                  'pointer-events': 'initial',
                }}
                onClick={() => {
                  // 打散原来的引用，否则电鸡重置按钮第二次会失效
                  const newColumns = columnsRef.current.map((item) => ({
                    ...item,
                  }));

                  tableRef.current.$setColumns(newColumns);
                }}
              >
                Restore Column
              </Button>
            ),
          },
        }}
      />
      ;
    </div>
  );
}
