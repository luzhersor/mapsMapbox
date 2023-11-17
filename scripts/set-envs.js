const { writeFileSync, mkdirSync} = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const envFileContent = `
  mapbox_key: "${process.env['MAPBOX_KEY']}",
  otra: "PROPIEDAD",
};
`;

mkdirSync('./src/environments', {recursive: true});

writeFileSync(targetPath, envFileContent);

