import os
import re

dirs = [
    os.path.join(os.path.dirname(__file__), '../src/pages/Inicio'),
    os.path.join(os.path.dirname(__file__), '../src/components')
]

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content

    def button_repl(m):
        before = m.group(1)
        quote1 = m.group(2)
        classes = m.group(3)
        quote2 = m.group(4)
        if 'transform-gpu' not in classes:
            return f'<button{before}className={quote1}{classes} transform-gpu{quote2}'
        return m.group(0)

    content = re.sub(r'<button([^>]*)className=(["\'{`])([^"\'{`]*)(["\'{`])', button_repl, content)

    def class_repl(m):
        classes = m.group(1)
        new_classes = classes

        if ('hover:scale' in new_classes or 'translate-x' in new_classes or 'translate-y' in new_classes or '-translate' in new_classes) and 'transform-gpu' not in new_classes:
            new_classes += ' transform-gpu'
            
        if 'transition-all' in new_classes:
            if 'scale' in new_classes or 'translate' in new_classes:
                replacement = 'transition-transform duration-200 ease-out'
            elif 'opacity-0' in new_classes and 'opacity-100' in new_classes:
                replacement = 'transition-opacity duration-200 ease-out'
            elif 'h-full' in new_classes and 'rounded-full' in new_classes and ('bg-primary' in new_classes or 'bg-emerald' in new_classes):
                replacement = 'transition-[width] duration-500 ease-out'
            elif 'max-w-0' in new_classes or 'max-w-xs' in new_classes:
                replacement = 'transition-all duration-300 ease-out'
            else:
                replacement = 'transition-colors duration-150'
                
            new_classes = new_classes.replace('transition-all', replacement)
            
            if 'duration-' in replacement:
                rep_duration = re.search(r'duration-\d+', replacement).group(0)
                new_classes = re.sub(r'duration-\d+', lambda match: match.group(0) if match.group(0) == rep_duration else '', new_classes)
            if 'ease-' in replacement:
                rep_ease = re.search(r'ease-[a-z-]+', replacement).group(0)
                new_classes = re.sub(r'ease-(in|out|in-out)', lambda match: match.group(0) if match.group(0) == rep_ease else '', new_classes)

        new_classes = re.sub(r'\s+', ' ', new_classes).strip()
        return m.group(0).replace(classes, new_classes)

    content = re.sub(r'className=(?:\{`|["\'])(.*?)(?:`\}|["\'])', class_repl, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Updated:', filepath)

for d in dirs:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.jsx') or file.endswith('.ts') or file.endswith('.js'):
                process_file(os.path.join(root, file))
