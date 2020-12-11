import layoutApis from './api'
import layoutSchema from './schema'

// layout.api 可以动态控制布局
layoutSchema.api = layoutApis.getLayoutReqOpt

export default layoutSchema
