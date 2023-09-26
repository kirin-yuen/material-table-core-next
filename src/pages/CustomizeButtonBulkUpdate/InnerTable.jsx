import { mockRows } from './mockRows';
import GridTable from '../../components/GridTable/index.jsx';

const columns = [
  {
    field: 'name',
    title: 'Name',
    width: 140,
    highLightHeader: true,
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

export default function InnerTable({ tableRef }) {
  return <GridTable tableRef={tableRef} columns={columns} data={mockRows} />;
}
