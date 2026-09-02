import os
import re

dirs = [
    os.path.join(os.path.dirname(__file__), '../src')
]

for d in dirs:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.jsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                # Fix { transform-gpu` -> {`transform-gpu 
                content = content.replace('{ transform-gpu`', '{`transform-gpu ')

                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print('Fixed:', filepath)
