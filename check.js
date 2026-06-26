const fs = require('fs');
const path = require('path');

function walk(dir, fileList) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walk(filePath, fileList);
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const files = walk('./src', []);
let errors = 0;

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const importRegex = /from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        if (importPath.startsWith('.')) {
            const dir = path.dirname(file);
            let targetPath = path.resolve(dir, importPath);
            
            // Try different extensions
            let foundPath = null;
            for (const ext of ['.tsx', '.ts', '.js', '.jsx', '/index.tsx', '/index.ts']) {
                if (fs.existsSync(targetPath + ext)) {
                    foundPath = targetPath + ext;
                    break;
                }
            }
            if (!foundPath && fs.existsSync(targetPath)) foundPath = targetPath;
            
            if (foundPath) {
                // Check case sensitivity
                const basename = path.basename(foundPath);
                const dirFiles = fs.readdirSync(path.dirname(foundPath));
                if (!dirFiles.includes(basename)) {
                    console.log('CASE MISMATCH in ' + file + ': import ' + importPath + ' (Resolved to ' + basename + ' but exact casing is ' + dirFiles.find(f => f.toLowerCase() === basename.toLowerCase()) + ')');
                    errors++;
                }
            }
        }
    }
}
if (errors === 0) console.log('No casing mismatches found.');
