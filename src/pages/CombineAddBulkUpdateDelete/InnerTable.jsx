import { Button } from '@mui/material';
import { mockRows } from './mockRows';
import GridTable from '../../components/GridTable/index.jsx';

export default function InnerTable({ tableRef }) {
  const columns = [
    {
      field: 'action',
      title: 'Action',
      width: 50,
      editComponent: (editProps) => (
        <Button
          onClick={() => {
            const { rowData } = editProps;
            const currentId = rowData.id;

            const { renderData: data } = tableRef.current.state;

            const foundIndex = data.findIndex((item) => item.id === currentId);

            if (foundIndex > -1) {
              data.splice(foundIndex, 1); // 删除表格实例的数据
              delete tableRef.current.dataManager.bulkEditChangedRows[
                currentId
              ]; // 删除批量编辑记录的信息
              delete tableRef.current.$bulkUpdateValidation[currentId]; // 删除记录校结果记录的信息

              // 同步表格数据
              tableRef.current.dataManager.setData(data);

              // 同步表格 UI
              tableRef.current.setState(
                tableRef.current.dataManager.getRenderState()
              );
            }
          }}
        >
          Delete
        </Button>
      ),
    },
    {
      field: 'name',
      title: 'Name',
      width: 140,
      highLightHeader: true,
      validate(rowData) {
        return tableRef.current.$validateRequired(rowData, this);
      },
    },
    {
      field: 'birthday',
      title: 'Birthday',
      type: 'date',
      width: 130,
      validate(rowData) {
        return tableRef.current.$validateDate(rowData, this);
      },
    },
    {
      field: 'sex',
      title: 'Sex',
      lookup: { m: 'Male', f: 'Female' },
      width: 130,
    },
  ];

  return (
    <>
      <Button
        onClick={() => {
          const { renderData: data } = tableRef.current.state;
          const ids = data.map((item) => item.id);

          let nextId = 0;
          if (ids.length) {
            ids.sort();
            nextId = ids[ids.length - 1];
          }

          data.push({
            id: nextId + 1,
            tableData: { id: nextId + 1, isAdd: true },
          });

          tableRef.current.dataManager.setData(data);
          tableRef.current.setState(
            tableRef.current.dataManager.getRenderState()
          );
        }}
      >
        Add
      </Button>
      <Button
        onClick={() => {
          const validationArr = Object.values(
            tableRef.current.$bulkUpdateValidation
          );

          const isNotPass = validationArr.find((item) =>
            Object.values(item).includes(true)
          );

          if (isNotPass) {
            alert('invalid');
            return;
          }
          const changeData = tableRef.current.getUpdateChangeRows();

          changeData.forEach(([dataId, { newData }]) => {
            const foundIndex = tableRef.current.state.renderData.findIndex(
              (item) => item.tableData.id === Number(dataId)
            );

            if (foundIndex > -1) {
              tableRef.current.state.renderData[foundIndex] = newData;
            }
          });
        }}
      >
        Update
      </Button>
      <GridTable
        tableRef={tableRef}
        columns={columns.map((item) => {
          item.sorting = false;

          return item;
        })}
        data={mockRows}
        options={{
          columnResizable: true,
          paging: false,
          sorting: false,
        }}
      />
    </>
  );
}
