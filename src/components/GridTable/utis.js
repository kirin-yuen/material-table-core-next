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
