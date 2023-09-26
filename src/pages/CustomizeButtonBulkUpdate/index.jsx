import { IconButton, Tooltip } from '@mui/material';
import { useRef, useState } from 'react';
import { Check, Edit, Close } from '@mui/icons-material';
import InnerTable from './InnerTable.jsx';

export default function CustomizeButtonBulkUpdate() {
  const tableRef = useRef(null);
  const [isBulkUpdate, setIsBulkUpdate] = useState(false);

  const openBulkUpdate = () => {
    setIsBulkUpdate(true);
    tableRef.current.dataManager.changeBulkEditOpen(true);
    // tableRef.current.setState({}); // 有状态控制可以不主动刷新
  };

  const closeBulkUpdate = () => {
    setIsBulkUpdate(false);
    tableRef.current.dataManager.changeBulkEditOpen(false);
    tableRef.current.dataManager.clearBulkEditChangedRows(); // 清除编辑过的行数据记录
    // tableRef.current.setState({}); // 有状态控制可以不主动刷新
  };

  const sendRequest = () =>
    new Promise((resolve) => {
      tableRef.current.setState({ isLoading: true });

      console.log(tableRef.current.getUpdateChangeRows()); // 变化的数据

      setTimeout(resolve, 2000);
    })
      .then(() => {})
      .finally((e) => {
        setIsBulkUpdate(false);
        tableRef.current.setState({ isLoading: false });
        tableRef.current.dataManager.changeBulkEditOpen(false);
        tableRef.current.dataManager.clearBulkEditChangedRows(); // 清除编辑过的行数据记录
      });

  return (
    <>
      {!isBulkUpdate && (
        <Tooltip title="Open Bulk Update">
          <IconButton onClick={openBulkUpdate}>
            <Edit />
          </IconButton>
        </Tooltip>
      )}
      {isBulkUpdate && (
        <Tooltip title="Save Data">
          <IconButton onClick={sendRequest}>
            <Check />
          </IconButton>
        </Tooltip>
      )}
      {isBulkUpdate && (
        <Tooltip title="Close Bulk Update">
          <IconButton onClick={closeBulkUpdate}>
            <Close />
          </IconButton>
        </Tooltip>
      )}
      <InnerTable tableRef={tableRef} />
    </>
  );
}
