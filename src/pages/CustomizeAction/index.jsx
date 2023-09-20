import { useRef } from 'react';
import { Check } from '@mui/icons-material';
import GridTable from '../../components/GridTable/index.jsx';
import { mockRows } from './mockRows';

const columns = [
  { field: 'name', title: 'Name', width: 140, highLightHeader: true },
  { field: 'birthday', title: 'Birthday', type: 'date', width: 130 },
  {
    field: 'sex',
    title: 'Sex',
    lookup: { m: 'Male', f: 'Female' },
    width: 130,
  },
];

export default function CustomizeAction() {
  const tableRef = useRef(null);

  return (
    <>
      <GridTable
        tableRef={tableRef}
        columns={columns}
        data={mockRows}
        actions={[
          (rowData) => ({
            icon: () => <Check color="success" />,
            hidden: rowData.tableData.id !== 1,
            tooltip: 'Tooltip',
            onClick: () => {
              // 使用 api 打开行编辑状态
              tableRef.current.dataManager.changeRowEditing(rowData, 'update');
              tableRef.current.setState({});
            },
          }),
        ]}
        editable={{
          isEditHidden: (rowData) => rowData.tableData.id !== 1,
          onRowUpdate: () =>
            new Promise((resolve) => {
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
