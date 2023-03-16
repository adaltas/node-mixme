import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default {
  input: 'lib/index.js',
  output: [
    {
      file: `dist/umd/index.js`,
      name: 'mixme',
      format: 'umd'
    },
    {
      file: `dist/cjs/index.cjs`,
      format: 'cjs'
    },
    {
      file: `dist/esm/index.js`,
      format: 'esm'
    }
  ],
  plugins: [
    babel(),
  ]
};
