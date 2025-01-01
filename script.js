// 确保页面加载完成后再执行后续操作
window.onload = function () {
    // 获取表格元素
    const tableBody = document.getElementById('player-stats-tbody');
    // 根据线上服务器部署情况，调整读取 Excel 文件的路径，这里假设 Excel 文件和 HTML、JavaScript 文件在服务器同一目录下，使用相对路径读取
    fetch('./player_info.xls')
      .then(response => {
            if (!response.ok) {
                throw new Error(`请求Excel文件失败，状态码: ${response.status}`);
            }
            return response.arrayBuffer();
        })
      .then(data => {
            try {
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // 创建文档片段，提升性能，减少DOM操作次数
                const fragment = document.createDocumentFragment();
                jsonData.forEach(player => {
                    const row = document.createElement('tr');
                    // 使用更安全的方式创建单元格并填充内容，避免XSS攻击
                    const createTableCell = (text) => {
                        const cell = document.createElement('td');
                        cell.textContent = text;
                        return cell;
                    };
                    row.appendChild(createTableCell(player['玩家名称']));
                    row.appendChild(createTableCell(player['本服游玩时长(s)(2025年以来)']));
                    row.appendChild(createTableCell(player['爆头率']));
                    row.appendChild(createTableCell(player['近战击杀数']));
                    row.appendChild(createTableCell(player['普通感染者击杀数']));
                    row.appendChild(createTableCell(player['特感击杀数']));
                    row.appendChild(createTableCell(player['witch击杀数']));
                    row.appendChild(createTableCell(player['坦克击杀数']));
                    row.appendChild(createTableCell(player['黑枪数']));
                    row.appendChild(createTableCell(player['被黑枪数']));
                    row.appendChild(createTableCell(player['保护队友次数']));
                    row.appendChild(createTableCell(player['救活队友次数']));
                    row.appendChild(createTableCell(player['击倒队友次数']));
                    row.appendChild(createTableCell(player['击杀队友次数']));
                    row.appendChild(createTableCell(player['挂边次数']));
                    row.appendChild(createTableCell(player['倒地次数']));
                    row.appendChild(createTableCell(player['死亡次数']));
                    row.appendChild(createTableCell(player['完成战役次数']));
                    row.appendChild(createTableCell(player['团灭次数']));
                    row.appendChild(createTableCell(player['砍舌次数']));
                    row.appendChild(createTableCell(player['SMOKER自救次数']));
                    row.appendChild(createTableCell(player['推开HUNTER次数']));
                    row.appendChild(createTableCell(player['击杀冲锋中的charger次数']));
                    row.appendChild(createTableCell(player['秒妹次数']));
                    row.appendChild(createTableCell(player['打碎石头次数']));
                    row.appendChild(createTableCell(player['吃饼次数']));
                    row.appendChild(createTableCell(player['触发警报的次数']));
                    fragment.appendChild(row);
                });
                tableBody.appendChild(fragment);
            } catch (error) {
                console.error('解析Excel数据失败', error);
            }
        })
      .catch(error => {
            console.error('获取Excel文件出现错误', error);
        });
};