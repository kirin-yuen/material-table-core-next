import { mockRows } from './mockRows';
import GridTable from '../../components/GridTable/index.jsx';

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

export default function InnerTable({ tableRef }) {
  return <GridTable tableRef={tableRef} columns={columns} data={mockRows} />;
}
