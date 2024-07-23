const fs = require('fs');
const path = require('path');

const projectStructure = {
  'components': [
    'Header.tsx',
    'Footer.tsx',
    'PropertyCard.tsx',
    'PropertyList.tsx',
    'Pagination.tsx',
    'AuthForm.tsx'
  ],
  'context': [
    'AuthContext.tsx'
  ],
  'pages': {
    'api': [
      'auth.ts'
    ],
    '': [
      '_app.tsx',
      'index.tsx',
      '[id].tsx',
      'login.tsx',
      'signup.tsx',
      'my-listings.tsx'
    ]
  },
  'public': {
    'images': []
  },
  'styles': [
    'globals.css',
    'tailwind.css'
  ],
  'utils': [
    'api.ts',
    'fetcher.ts'
  ],
  '': [
    '.env.local',
    '.eslintrc.js',
    '.gitignore',
    '.prettierrc',
    'next-env.d.ts',
    'next.config.js',
    'package.json',
    'postcss.config.js',
    'README.md',
    'tailwind.config.js',
    'tsconfig.json'
  ]
};

function createFile(filePath) {
  fs.writeFileSync(filePath, '', 'utf8');
  console.log(`Created file: ${filePath}`);
}

function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
    console.log(`Created directory: ${dirPath}`);
  }
}

function createProjectStructure(basePath, structure) {
  for (const key in structure) {
    const currentPath = path.join(basePath, key);
    if (typeof structure[key] === 'object') {
      createDirectory(currentPath);
      if (Array.isArray(structure[key])) {
        structure[key].forEach(file => createFile(path.join(currentPath, file)));
      } else {
        createProjectStructure(currentPath, structure[key]);
      }
    } else {
      createFile(currentPath);
    }
  }
}

const currentLocation = process.cwd();
createProjectStructure(currentLocation, projectStructure);

console.log('Project structure created successfully!');
