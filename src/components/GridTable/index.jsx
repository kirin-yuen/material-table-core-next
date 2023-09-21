import MaterialTable from '@material-table/core';
import { Button } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import './style.scss';
import { tableIcons } from './tableIcons';
import { OverrideComponents } from './OverrideComponents/index.jsx';

const defaultOptions = {
  searchFieldVariant: 'outlined',
  showTitle: false,
  emptyRowsWhenPaging: false,
  draggable: false,
  search: true,
  columnsButton: true,
};

export default function MTableNext(props) {
  const { data, options, columns } = props;
  const [columnsDef, setColumnsDef] = useState(columns);

  const columnsRef = useRef([]);

  const mergeOptions = {
    ...defaultOptions,
    ...options,
  };

  useEffect(() => {
    columnsRef.current = columns.map((item) => ({ ...item }));
  }, []);

  return (
    <div className="grid-container">
      <MaterialTable
        {...props}
        data={data}
        options={mergeOptions}
        columns={columnsDef}
        icons={tableIcons}
        components={{
          ...props.components,
          ...OverrideComponents,
        }}
        editable={{
          ...props.editable,
        }}
        localization={{
          toolbar: {
            searchPlaceholder: 'Filter Result',
            addRemoveColumns: (
              <Button
                sx={{
                  'pointer-events': 'initial',
                }}
                onClick={() => {
                  const json1Str = JSON.stringify(
                    columnsRef.current.map((item) => item.hidden)
                  );
                  const json2Str = JSON.stringify(
                    columnsDef.map((item) => item.hidden)
                  );

                  if (json1Str !== json2Str) {
                    setColumnsDef(
                      columnsRef.current.map((item) => ({ ...item }))
                    );
                  }
                }}
              >
                Restore Column
              </Button>
            ),
          },
        }}
      />
      ;
    </div>
  );
}
