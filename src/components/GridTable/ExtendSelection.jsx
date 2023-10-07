import { useEffect, useState } from 'react';
import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popover,
} from '@mui/material';

// 获取选择或是不选择的前缀字符串
const getPrefixStr = (isSelect) => (isSelect ? 'Unselect' : 'Select');

// 表格选择扩展成弹窗选择
export default function ExtendSelection({ tableRef }) {
  const [anchorEl, setAnchorEl] = useState(null);

  // 全选数据
  const selectAllData = (isSelectAllData) =>
    tableRef.current.onAllSelected(isSelectAllData);

  // 选择当前页面数据
  const selectThisPageData = (isSelectThisPageData) => {
    const { dataManager, onAllSelected } = tableRef.current;
    // 部分方法不能结构，因依赖引用的对象
    const { pageSize, currentPage, pagedData, getRenderState } = dataManager;
    onAllSelected(false);

    // 遍历当前页面数据
    pagedData.forEach((item, index) => {
      const selectIndex = currentPage * pageSize + index;

      tableRef.current.dataManager.changeRowSelected(!isSelectThisPageData, [
        selectIndex,
      ]);
    });

    tableRef.current.setState(getRenderState());
  };

  // 是否选中当前页面
  const isSelectThisPage = () => {
    if (tableRef.current) {
      const { pagedData } = tableRef.current.dataManager;

      const rowCheckLength = pagedData.filter(
        (item) => item.tableData.checked
      ).length;

      return rowCheckLength >= pagedData.length;
    }

    return false;
  };

  // 全选数据与当前页数据按钮组
  const buttons = [
    {
      onClick: () => selectThisPageData(isSelectThisPage()),
      text: () => {
        const prefix = getPrefixStr(isSelectThisPage());

        return `${prefix} This Page`;
      },
      count: tableRef.current?.dataManager.pagedData.length,
    },
    {
      onClick: () => {
        const { selectedCount, data } = tableRef.current.dataManager;

        selectAllData(!(selectedCount >= data.length));
      },
      text: () => {
        let prefix = '';

        if (tableRef.current) {
          const { selectedCount, data } = tableRef.current.dataManager;
          prefix = getPrefixStr(selectedCount >= data.length);
        }

        return `${prefix} All`;
      },
      count: tableRef.current?.dataManager.data.length,
    },
  ];

  useEffect(() => {
    // 将关闭方法绑定到表格实例
    tableRef.current.$setAnchorEl = setAnchorEl;
  }, []);

  return (
    <Popover
      open={!!anchorEl}
      onClose={() => setAnchorEl(false)}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      <Paper>
        <List>
          {buttons.map(({ text, onClick, count }) => (
            <ListItemButton
              dense
              key={text()}
              onClick={() => {
                onClick();
                setAnchorEl(false);
              }}
            >
              <ListItemText primary={`${text()} (${count})`} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Popover>
  );
}
