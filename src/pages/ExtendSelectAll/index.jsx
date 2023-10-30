import { useRef, useState, useEffect } from 'react';
import { Chip, Grid } from '@mui/material';
import GridTable from '../../components/GridTable/index.jsx';
import { mockRows } from './mockRows';

// 问题：选中行数据后更新状态，会触发表格重新渲染，这时候，表格因为触发重新渲染，选择会消失
export default function ExtendSelectAll() {
  const tableRef = useRef(null);
  const [selectRow, setSelectRow] = useState([]);

  const columns = [
    {
      field: 'name',
      title: 'Name & UUID',
      width: 140,
      render: (rowData) =>
        `${rowData.name} - ${tableRef.current?.state.selectedCount} - ${selectRow.length} - ${rowData.tableData.uuid}`,
      editComponent(props) {
        const { rowData, onChange, columnDef } = props;

        return (
          <input
            value={rowData[columnDef.field]}
            onChange={(e) => onChange(e)}
          />
        );
      },
    },
  ];

  useEffect(() => {
    // 渲染后再次选择
    tableRef.current.$selectAfterRerenderTable(selectRow);
  }, [selectRow]);

  return (
    <>
      <GridTable
        columns={columns}
        data={mockRows}
        options={{
          selection: true,
        }}
        onSelectionChange={(selectRowData) => {
          setSelectRow(selectRowData);
        }}
        tableRef={tableRef}
        editable={{
          onRowUpdate: () =>
            new Promise((resolve) => {
              resolve();
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
        }}
      />

      <Grid container spacing={2}>
        {selectRow.map((item) => (
          <Grid item xl={2} md={3} key={item.tableData.id}>
            <Chip
              label={`${item.tableData.id} - ${item.name} - ${item.tableData.uuid}`}
              color="primary"
              variant="outlined"
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
