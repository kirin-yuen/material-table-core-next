import GridTable from '../../components/GridTable/index.jsx';
import { mockRows } from './mockRows';
import ColSpanTable from '../../components/GridTable/ColSpanTable.jsx';
import RowSpanTable from '../../components/GridTable/RowSpanTable.jsx';

const columns = [
  { field: 'cycle', title: 'Cycle', width: 140 },
  { field: 'refNo', title: 'Reference No.', sorting: true, width: 130 },
  { field: 'programmeTitle', title: 'Programme Title', sorting: true },
  {
    field: 'proposeBy',
    title: 'Proposed By',
    width: 100,
    align: 'center',
  },
  {
    field: 'units',
    title: 'Units',
    width: 200,
    align: 'center',
    cellStyle: {
      padding: 0,
    },
    render(rowData) {
      return (
        <RowSpanTable>
          {rowData.units.map((item, index) => (
            <u key={index} style={{ color: 'orange' }}>
              {item.workflowStatus}
            </u>
          ))}
        </RowSpanTable>
      );
    },
    editComponent(props) {
      const { rowData } = props;

      return (
        <RowSpanTable>
          {rowData.units.map((item, index) => (
            <input
              key={index}
              value={props.value[index].workflowStatus}
              onChange={(e) => {
                const newResult = [...props.value];
                newResult[index].workflowStatus = e.target.value;
                props.onChange(newResult);
              }}
            />
          ))}
        </RowSpanTable>
      );
    },
  },
  {
    field: 'highlight',
    title: 'Highlight',
    cellStyle: {
      padding: 0,
    },
    width: 140,
    render(rowData) {
      return (
        <RowSpanTable>
          {rowData.units.map((item, index) => (
            <u key={index} style={{ color: 'yellowgreen' }}>
              {item[this.field]}
            </u>
          ))}
        </RowSpanTable>
      );
    },
    editComponent(props) {
      const {
        rowData,
        columnDef: { field },
      } = props;

      return (
        <RowSpanTable>
          {rowData.units.map((item, index) => (
            <input
              key={index}
              value={rowData.units[index][field]}
              onChange={(e) => {
                rowData.units[index][field] = e.target.value;

                props.onChange();
              }}
            />
          ))}
        </RowSpanTable>
      );
    },
  },
  {
    field: 'implementingUnit',
    title: 'Implementing Unit',
    width: 80,
    align: 'center',
    cellStyle: {
      padding: 0,
    },
    render(rowData) {
      return (
        <ColSpanTable>
          {rowData.units.map((item, index) => (
            <b key={index} style={{ color: 'pink' }}>
              {item[this.field]}
            </b>
          ))}
        </ColSpanTable>
      );
    },
    editComponent(props) {
      const { rowData, columnDef } = props;

      return (
        <ColSpanTable>
          {rowData.units.map((item, index) => (
            <div key={index}>
              <div>{item[columnDef.field]}</div>
              <input
                type="checkbox"
                onChange={(e) => props.onChange(e.target.value)}
              />
            </div>
          ))}
        </ColSpanTable>
      );
    },
  },
  { field: 'workflowStatus', title: 'Workflow Status' },
  { field: 'programmeStatus', title: 'Programme Status' },
];

export default function ResetColumns() {
  return (
    <>
      <GridTable
        columns={columns}
        data={mockRows}
        editable={{
          onBulkUpdate: () =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
        }}
      />
    </>
  );
}
