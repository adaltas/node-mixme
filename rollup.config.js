import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default {
  input: 'lib/index.js',
  output: [
    {
      file: `dist/umd/${pkg.name}.js`,
      name: 'mixme',
      format: 'umd'
    },
    {
      file: `dist/cjs/${pkg.name}.js`,
      format: 'cjs'
    },
    {
      file: `dist/esm/${pkg.name}..js`,
      format: 'esm'
    }
  ],
  plugins: [
    babel(),
  ]
};
