import { IconButton, Tooltip } from '@mui/material';

export default function CancelButton(props) {
  const { tooltip, onClick } = props.action;
  const { tableRef } = props;

  return (
    <Tooltip title={tooltip} placement="bottom">
      <IconButton
        onClick={() => {
          const differentRowArr = tableRef.current
            .getUpdateChangeRows()
            .filter(([, { newData, oldData }]) => {
              if (JSON.stringify(newData) === JSON.stringify(oldData)) {
                return false;
              }

              return true;
            });

          if (differentRowArr.length > 0) {
            alert('Row is updated, please check');
          } else {
            tableRef.current.dataManager.clearBulkEditChangedRows(); // 清除编辑过的行数据记录
            onClick();
          }
        }}
      >
        <props.action.icon />
      </IconButton>
    </Tooltip>
  );
}
