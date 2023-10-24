// 重复判断
export function $validateDuplicated(
  rowData,
  colDef,
  helperText = 'Duplicated'
) {
  let isDuplicated = false;
  const { field } = colDef;

  const {
    dataManager: { data },
  } = this;

  for (let i = 0; i < data.length; i += 1) {
    // 新增行记录模式，行数据没有 tableData
    if (!this.state.showAddRow) {
      // 跳过当前行数据
      if (rowData.tableData.id === data[i].tableData.id)
        // eslint-disable-next-line no-continue
        continue;
    }

    // 找到重复数据
    if (data[i][field] === rowData[field]) {
      isDuplicated = true;
    }
  }

  return isDuplicated ? helperText : true;
}

// 必填判断
export function $validateRequired(rowData, colDef, helperText = 'Required') {
  const { field } = colDef;
  const fieldValue = rowData[field] || '';

  return fieldValue.trim() === '' ? helperText : true;
}

// 校验组合
export function $validateCombination(validationFunArr) {
  let result;

  for (let i = 0; i < validationFunArr.length; i += 1) {
    result = validationFunArr[i];

    if (typeof result === 'string') {
      break;
    }
  }

  return result;
}

const INVALID_DATE = 'Invalid Date';
// 日期校验
export function $validateDate(rowData, colDef, helperText = INVALID_DATE) {
  const { field } = colDef;

  return rowData[field] === INVALID_DATE ? helperText : true;
}
