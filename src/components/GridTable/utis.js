// this => tableRef.current
// 将编辑（行编辑 / 批量编辑）的新旧数据
// 格式如下，1 代表当前编辑过第一行记录
// {
//     "1": {
//         "oldData": {}
//         "newData": {}
//     }
// }
// 转换成如下格式，方便遍历并且赋值
// [
//   [
//     '1',
//     {
//       oldData: {},
//       newData: {},
//     },
//   ],
// ];
export function getUpdateChangeRows() {
  return Object.entries(this.dataManager.bulkEditChangedRows);
}

// 开启批量编辑
export function $openBulkUpdate() {
  this.dataManager.changeBulkEditOpen(true);
  this.setState({});
}

export function $clearBulkUpdateDataAndCloseBulkUpdateState() {
  this.dataManager.changeBulkEditOpen(false);
  this.dataManager.clearBulkEditChangedRows(); // 清除编辑过的行数据记录
}

// 关闭批量编辑
export function $closeBulkUpdate(callback) {
  callback
    // resolve 路线
    .then(() => {
      this.$clearBulkUpdateDataAndCloseBulkUpdateState();
      this.setState({});
    })
    // reject 路线
    .catch(() => {});
}

// 批量编辑保存
export function $bulkUpdateSave(callback) {
  this.setState({ isLoading: true });

  callback(this.getUpdateChangeRows())
    // resolve 路线
    .then(() => {})
    // reject 路线
    .catch(() => {})
    // finally
    .finally((e) => {
      this.$clearBulkUpdateDataAndCloseBulkUpdateState();
      this.setState({ isLoading: false });
    });
}

// 设置列
export function $setColumns(columns) {
  this.dataManager.setColumns(columns);
  this.setState({ columns });
}

// 后端存值
// 1 代表 yes
// 0 代表 no
export function getCheckedValue(checked) {
  return checked ? 1 : 0;
}

// 挂载一个对象的所有属性到另一个对象
export function mountedObjTo(mountedObj, targetObj) {
  const srcObjArr = Object.entries(mountedObj);

  srcObjArr.forEach(([key, value]) => {
    targetObj[key] = value;
  });
}
