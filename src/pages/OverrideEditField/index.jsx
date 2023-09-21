import { useRef } from 'react';
import GridTable from '../../components/GridTable/index.jsx';
import { mockRows } from './mockRows';

const columns = [
  {
    field: 'name',
    title: 'Name',
    width: 140,
    highLightHeader: true,
    validate(rowData) {
      return rowData[this.field] === ''
        ? {
            isValid: false,
            helperText: 'empty',
          }
        : true;
    },
  },
  {
    field: 'birthday',
    title: 'Birthday',
    type: 'date',
    width: 130,
    validate(rowData) {
      return rowData[this.field] !== '13/09/1997';
    },
  },
  {
    field: 'sex',
    title: 'Sex',
    lookup: { m: 'Male', f: 'Female' },
    width: 130,
    validate(rowData) {
      return rowData[this.field] === 'f';
    },
  },
];

export default function OverrideEditField() {
  const tableRef = useRef(null);

  return (
    <>
      <GridTable
        tableRef={tableRef}
        columns={columns}
        data={mockRows}
        editable={{
          isEditHidden: (rowData) => rowData.tableData.id !== 1,
          onRowUpdate: () =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const changedRows = Object.entries(
                  tableRef.current.dataManager.bulkEditChangedRows
                );

                changedRows.forEach((item) => {
                  const [index, { newData }] = item;

                  tableRef.current.dataManager.data[index] = newData;
                  tableRef.current.dataManager.data[index].tableData.editing =
                    undefined; // 清除行编辑状态，才能关闭行编辑状态
                });

                // 同步行数据
                tableRef.current.dataManager.setData(
                  tableRef.current.dataManager.data
                );

                tableRef.current.dataManager.clearBulkEditChangedRows(); // 清除编辑过的行数据记录

                resolve();
              }, 1000);
            }),
        }}
      />
    </>
  );
}
