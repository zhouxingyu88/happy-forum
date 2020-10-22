

//性别转换
export function formatSex (row, column) {
    return row.sex == 0 ? '男' : '女';
}

//用户状态转换
export function formatUserShield (row, column) {
    return row.shield == 0 ? '已拉黑' : '未拉黑';
}

//问题 回答屏蔽状态转换
export function formatShield (row, column) {
    return row.shield == 0 ? '已屏蔽' : '未屏蔽';
}

//问题终结状态转换
export function formatEnd (row, column) {
    return row.end == 0 ? '已终结' : '未终结';
}
