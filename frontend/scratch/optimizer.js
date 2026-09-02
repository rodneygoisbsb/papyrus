const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, '../../src/pages/Inicio'),
  path.join(__dirname, '../../src/components')
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // 1. Add transform-gpu to <button>
  content = content.replace(/<button([^>]*)className=(["'{`])([^"'{`]*)(["'{`])/g, (match, before, quote1, classes, quote2) => {
    if (!classes.includes('transform-gpu')) {
      return `<button${before}className=${quote1}${classes} transform-gpu${quote2}`;
    }
    return match;
  });

  // 2. Add transform-gpu to elements with hover:scale-* or hover:-translate-* or translate-x-*
  // A bit complex with template literals, let's just do a global replace for className="..." or className={...}
  const classRegex = /className=(?:\{`|["'])(.*?)(?:`\}|["'])/g;
  
  content = content.replace(classRegex, (match, classes) => {
    let newClasses = classes;
    
    // Add transform-gpu if it has hover:scale-* or translate-x-* or translate-y-*
    if ((newClasses.includes('hover:scale') || newClasses.includes('translate-x') || newClasses.includes('translate-y') || newClasses.includes('-translate')) && !newClasses.includes('transform-gpu')) {
      newClasses += ' transform-gpu';
    }

    // Replace transition-all based on context
    if (newClasses.includes('transition-all')) {
      let replacement = '';
      if (newClasses.includes('scale') || newClasses.includes('translate')) {
        replacement = 'transition-transform duration-200 ease-out';
      } else if (newClasses.includes('opacity-0') && newClasses.includes('opacity-100')) {
        replacement = 'transition-opacity duration-200 ease-out';
      } else if (newClasses.includes('w-') || newClasses.includes('h-full')) {
        // Maybe progress bar, but let's check for specific files or class combinations
        if (newClasses.includes('h-full') && newClasses.includes('rounded-full') && (newClasses.includes('bg-primary') || newClasses.includes('bg-emerald'))) {
          replacement = 'transition-[width] duration-500 ease-out'; // Specific to TopKpiCards progress bars
        } else if (newClasses.includes('max-w-0') || newClasses.includes('max-w-xs')) {
           replacement = 'transition-all duration-300 ease-out'; // keep as is for max-w since transition-[max-width] might be needed, or just transition-all
           replacement = 'transition-[max-width,opacity] duration-300 ease-out';
        } else {
           replacement = 'transition-colors duration-150';
        }
      } else {
        replacement = 'transition-colors duration-150';
      }
      
      // Cleanup existing durations if we added new ones
      newClasses = newClasses.replace('transition-all', replacement);
      // Remove old durations if we added new ones from the replacement, to avoid duplicates
      if (replacement.includes('duration-')) {
         newClasses = newClasses.replace(/duration-\d+/g, (match) => {
             return match === replacement.match(/duration-\d+/)[0] ? match : '';
         });
      }
      if (replacement.includes('ease-')) {
         newClasses = newClasses.replace(/ease-(in|out|in-out)/g, (match) => {
             return match === replacement.match(/ease-[a-z-]+/)[0] ? match : '';
         });
      }
    }

    // Clean up multiple spaces
    newClasses = newClasses.replace(/\s+/g, ' ').trim();
    
    // Replace the classes in the match string
    return match.replace(classes, newClasses);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log('Updated:', filePath);
  }
}

function walk(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx') || filePath.endsWith('.ts') || filePath.endsWith('.js')) {
      processFile(filePath);
    }
  }
}

dirs.forEach(walk);
