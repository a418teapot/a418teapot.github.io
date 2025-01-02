from bs4 import BeautifulSoup
import os
import datetime

with open('basic_raw.html', 'r', encoding='utf-8') as html_file:
    lines = html_file.readlines()

modified_lines = []

for line in lines:
    # 将双引号替换为转义后的单引号
    line = line.replace('"', '\'')
    modified_lines.append(line)

with open('basic.js', 'w', encoding='utf-8') as js_file:
    for line in modified_lines:
        new_line = "document.writeln(\"" + line.strip() + "\");"
        js_file.write(new_line + "\n")

print("basic转换完成\n")


with open('skill_raw.html', 'r', encoding='utf-8') as html_file:
    lines = html_file.readlines()

modified_lines = []
for line in lines:
    # 将双引号替换为转义后的单引号
    line = line.replace('"', '\'')
    modified_lines.append(line)

with open('skill.js', 'w', encoding='utf-8') as js_file:
    for line in modified_lines:
        new_line = "document.writeln(\"" + line.strip() + "\");"
        js_file.write(new_line + "\n")

print("skill转换完成\n")

# 获取当前系统时间并格式化为指定格式
current_time = datetime.datetime.now().strftime('%Y年%m月%d日%H:%M更新')
print(current_time+"\n")

# 拼接文件路径
file_path = os.path.join('..', 'index.html')
# 判断文件是否存在
if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    soup = BeautifulSoup(content, 'html.parser')
    target_text = "L4D2 Server Player Data"
    # 查找包含目标文本的元素
    target_element = soup.find(string=lambda text: text and target_text in text)
    if target_element:
        # 获取括号及括号内的内容（假设格式规范，括号成对出现）
        start_index = target_element.find("(")
        end_index = target_element.find(")")
        if start_index!= -1 and end_index!= -1:
            new_text = target_element[:start_index + 1] + current_time + target_element[end_index:]
            target_element.replace_with(new_text)
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))
else:
    print(f"文件 {file_path} 不存在，请检查路径是否正确。")