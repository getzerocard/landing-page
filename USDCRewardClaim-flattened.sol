An unexpected error occurred:

Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: Package subpath './common/bigInt' is not defined by "exports" in /Users/mac/landing-page/node_modules/hardhat/package.json
    at exportsNotFound (node:internal/modules/esm/resolve:313:10)
    at packageExportsResolve (node:internal/modules/esm/resolve:661:9)
    at resolveExports (node:internal/modules/cjs/loader:678:36)
    at Module._findPath (node:internal/modules/cjs/loader:745:31)
    at node:internal/modules/cjs/loader:1405:27
    at m._resolveFilename (file:///Users/mac/landing-page/node_modules/tsx/dist/register-B7jrtLTO.mjs:1:789)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1058:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1063:22)
    at Module._load (node:internal/modules/cjs/loader:1226:37)
    at TracingChannel.traceSync (node:diagnostics_channel:328:14) {
  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
}

If you think this is a bug in Hardhat, please report it here: https://hardhat.org/report-bug
