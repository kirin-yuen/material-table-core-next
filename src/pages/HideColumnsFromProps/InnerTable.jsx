import { useEffect } from 'react';
import { mockRows } from './mockRows';
import GridTable from '../../components/GridTable/index.jsx';

export default function InnerTable({ tableRef, hidden }) {
  const columns = [
    {
      field: 'name',
      title: 'Name',
      width: 140,
      hidden,
    },
    {
      field: 'birthday',
      title: 'Birthday',
      type: 'date',
      width: 130,
    },
    {
      field: 'sex',
      title: 'Sex',
      lookup: { m: 'Male', f: 'Female' },
      width: 130,
    },
  ];

  useEffect(() => {
    const newColumns = tableRef.current.dataManager.columns.map(
      (item, index) => ({
        ...item,
        ...columns[index],
      })
    );

    tableRef.current.$setColumns(newColumns);
  }, [hidden]);

  return <GridTable tableRef={tableRef} columns={columns} data={mockRows} />;
}
