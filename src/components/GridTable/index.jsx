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
  $selectAfterRerenderTable,
  mountedObjTo,
} from './utis';
import ExtendSelection from './ExtendSelection.jsx';
import * as $validation from './validation';
import * as $processData from './processData';

const defaultOptions = {
  searchFieldVariant: 'outlined',
  showTitle: false,
  emptyRowsWhenPaging: false,
  draggable: false,
  search: true,
  columnsButton: true,
  selection: false,
};

export default function MTableNext(props) {
  const { data, options, columns, tableRef } = props;

  const columnsRef = useRef([]);

  const mergeOptions = {
    ...defaultOptions,
    // 行选择列头的 checkbox 属性
    headerSelectionProps: {
      onChange: (e) => tableRef.current.$setAnchorEl(e.target),
    },
    ...options,
    editRowUpdate: props.editable?.onRowUpdate, // editable.onRowUpdate 无法通过状态变更触发表格渲染，因此需要通过加入到 option， 用 option 触发其渲染
  };

  useEffect(() => {
    columnsRef.current = columns.map((item) => ({ ...item }));
  }, []);

  useEffect(() => {
    if (tableRef) {
      tableRef.current.getUpdateChangeRows = getUpdateChangeRows;
      tableRef.current.$openBulkUpdate = $openBulkUpdate;
      tableRef.current.$closeBulkUpdate = $closeBulkUpdate;
      tableRef.current.$bulkUpdateSave = $bulkUpdateSave;
      tableRef.current.$clearBulkUpdateDataAndCloseBulkUpdateState =
        $clearBulkUpdateDataAndCloseBulkUpdateState;
      tableRef.current.$setColumns = $setColumns;
      tableRef.current.$selectAfterRerenderTable = $selectAfterRerenderTable;

      // 挂载校验方法到表格实例里
      mountedObjTo($validation, tableRef.current);

      // 挂载校验方法到表格实例里
      mountedObjTo($processData, tableRef.current);
    }
  }, [data]);

  return (
    <div className="grid-container">
      {mergeOptions.selection && <ExtendSelection tableRef={tableRef} />}
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
    </div>
  );
}
