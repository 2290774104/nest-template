import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'lodash-es';

const YAML_CONFIG_FILE = 'config.yml';
const filePath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../config',
  YAML_CONFIG_FILE,
);
const envPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '../config',
  `config.${process.env.NODE_ENV ?? 'development'}.yml`,
);

const commonConfig = yaml.load(readFileSync(filePath, 'utf-8')) as Record<
  string,
  unknown
>;
const envConfig = yaml.load(readFileSync(envPath, 'utf-8')) as Record<
  string,
  unknown
>;

export default () => {
  return merge(commonConfig, envConfig);
};
