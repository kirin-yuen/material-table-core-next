import { useRef, useState } from 'react';
import GridTable from '../../components/GridTable/index.jsx';
import { mockRows } from './mockRows';

export default function Validation() {
  const tableRef = useRef();
  const [row, setRow] = useState(mockRows);

  // 必填与重复校验
  const validateRequiredAndDuplicated = (rowData, colDef) =>
    tableRef.current.$validateCombination([
      tableRef.current.$validateRequired(rowData, colDef),
      tableRef.current.$validateDuplicated(rowData, colDef),
    ]);

  // 必填与日期校验
  const validateRequiredAndDate = (rowData, colDef) =>
    tableRef.current.$validateCombination([
      tableRef.current.$validateRequired(rowData, colDef),
      tableRef.current.$validateDate(rowData, colDef),
    ]);

  const columns = [
    {
      field: 'name',
      title: 'Name',
      validate(rowData) {
        return validateRequiredAndDuplicated(rowData, this);
      },
    },
    {
      field: 'firstName',
      title: 'First Name',
      validate(rowData) {
        return tableRef.current.$validateRequired(rowData, this);
      },
    },
    {
      field: 'birthday',
      title: 'Birthday',
      type: 'date',
      validate(rowData) {
        return validateRequiredAndDate(rowData, this);
      },
    },
  ];

  return (
    <>
      <GridTable
        tableRef={tableRef}
        columns={columns}
        data={mockRows}
        editable={{
          onRowUpdate: () =>
            new Promise((resolve) => {
              resolve();
            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                setRow([...row, newData]);

                resolve();
              }, 1000);
            }),
        }}
      />
    </>
  );
}
