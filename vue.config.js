// module.exports = {
//     chainWebpack: config => {
//         config.resolve.alias.set(
//             'assets' , '@/assets',
//             'common' , '@/common',
//             'components' , '@/components',
//             'network' , '@/network',
//             'views' , '@/views'   
//         )
//     }
// }

module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          'assets': '@/assets',
          'common': '@/common',
          'components': '@/components',
          'network': '@/network',
          'views': '@/views',
        }
      }
    }
  }
  
  