// 单行更新表格实例数据中心数据
export function $updateRowDataBy(id, rowData) {
  const { clearBulkEditChangedRows, data } = this.dataManager;

  const foundIndex = data.findIndex((item) => item[id] === rowData[id]);

  if (foundIndex > -1) {
    data[foundIndex] = {
      ...data[foundIndex],
      ...rowData,
    };

    data[foundIndex].tableData.editing = undefined; // 清除行编辑状态，才能关闭行编辑状态

    this.dataManager.setData(data);

    clearBulkEditChangedRows(); // 清除编辑过的行数据记录
  }
}
