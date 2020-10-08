/* @flow */

import { baseOptions } from './options'
import { createCompiler } from 'compiler/index'

// createCompiler(baseOptions) = {
//   compile,
//   compileToFunctions: createCompileToFunctionFn(compile)
// }
const { compile, compileToFunctions } = createCompiler(baseOptions)

export { compile, compileToFunctions }
