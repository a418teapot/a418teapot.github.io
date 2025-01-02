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