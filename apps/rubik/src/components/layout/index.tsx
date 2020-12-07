import layoutSchema from './schema'
import layoutApis from './api'

// layout.api 可以动态控制布局
layoutSchema.api = layoutApis.getLayoutReqOpt

export default layoutSchema
