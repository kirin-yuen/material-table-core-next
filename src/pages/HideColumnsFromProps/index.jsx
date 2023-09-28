import { Button } from '@mui/material';
import { useRef, useState } from 'react';
import InnerTable from './InnerTable.jsx';

export default function HideColumnsFromProps() {
  const tableRef = useRef(null);
  const [hidden, setHidden] = useState(false);

  const toggleColumnHidden = () => setHidden(!hidden);

  return (
    <>
      <Button onClick={() => toggleColumnHidden(!hidden)}>
        {hidden ? 'Show Column' : 'Hide Column'}
      </Button>
      <InnerTable tableRef={tableRef} hidden={hidden} />
    </>
  );
}
