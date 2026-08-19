const git = require('isomorphic-git');
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');

async function runGitInitAndCommit() {
  console.log('Initializing Git repository at:', dir);

  // 1. Initialize Git Repo
  await git.init({ fs, dir });

  // 2. Read gitignore patterns
  const ignoredPatterns = ['.git', 'node_modules', '.next', '.env.local', 'build', 'out'];

  function shouldIgnore(relativePath) {
    return ignoredPatterns.some(p => relativePath === p || relativePath.startsWith(p + '/'));
  }

  function getAllFiles(currentDir, relativeDir = '') {
    let results = [];
    const list = fs.readdirSync(currentDir);
    list.forEach(file => {
      const relPath = relativeDir ? relativeDir + '/' + file : file;
      if (shouldIgnore(relPath)) return;
      const fullPath = path.join(currentDir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getAllFiles(fullPath, relPath));
      } else {
        results.push(relPath);
      }
    });
    return results;
  }

  console.log('Staging files...');
  const files = getAllFiles(dir);

  for (const file of files) {
    await git.add({ fs, dir, filepath: file });
  }

  console.log(`Successfully staged ${files.length} files into Git repository.`);

  // 3. Commit
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'HARSHAN-7',
      email: 'harshan@factorygpt.app',
    },
    message: 'feat: FactoryGPT complete production release (Phases 1-7)',
  });

  console.log('Successfully created initial commit SHA:', sha);
}

runGitInitAndCommit().catch(err => {
  console.error('Git script error:', err);
  process.exit(1);
});
