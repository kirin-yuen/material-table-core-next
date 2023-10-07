import { useRef, useState, memo } from 'react';
import { Chip, Grid } from '@mui/material';
import GridTable from '../../components/GridTable/index.jsx';
import { mockRows } from './mockRows';

const columns = [
  {
    field: 'name',
    title: 'Name & UUID',
    width: 140,
    render: (rowData) => `${rowData.name} ---- ${rowData.tableData.uuid}`,
  },
];

const MemoGridTable = memo(({ setSelectRow, ...rest }) => (
  <GridTable
    columns={columns}
    data={mockRows}
    options={{
      selection: true,
    }}
    onSelectionChange={(selectRowData) => setSelectRow(selectRowData)}
    {...rest}
  />
));

export default function ExtendSelectAll() {
  const tableRef = useRef(null);
  const [selectRow, setSelectRow] = useState([]);

  return (
    <>
      <MemoGridTable tableRef={tableRef} setSelectRow={setSelectRow} />

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
