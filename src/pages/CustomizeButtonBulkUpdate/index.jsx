import { IconButton, Tooltip } from '@mui/material';
import { useRef, useState } from 'react';
import { Check, Edit, Close } from '@mui/icons-material';
import InnerTable from './InnerTable.jsx';

export default function CustomizeButtonBulkUpdate() {
  const tableRef = useRef(null);
  const [isBulkUpdate, setIsBulkUpdate] = useState(false);

  const openBulkUpdate = () => {
    setIsBulkUpdate(true);
    tableRef.current.$openBulkUpdate();
  };

  const closeBulkUpdate = () => {
    tableRef.current.$closeBulkUpdate(
      new Promise((resolve, reject) => {
        if (true) {
          setIsBulkUpdate(false);
          resolve();
        } else {
          reject();
        }
      })
    );
  };

  const sendRequest = () => {
    tableRef.current.$bulkUpdateSave(
      (changes) =>
        new Promise((resolve, reject) => {
          console.log(changes);
          if (true) {
            setTimeout(() => {
              resolve();
              setIsBulkUpdate(false);
            }, 2000);
          } else {
            reject();
          }
        })
    );
  };

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
