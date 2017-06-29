const Version = "v0.1.0621.001"
const AVAppData = {
  appId: '__APPID__',
  appKey: '__APPKEY__'
}
const GlobalData = {
  loading: 0,
  baseInfo: {
    config: {
      urlPrefix: '__URLPREFIX__',
      whitelist: false,
      debug: true,
      needVerifyId: false,
      needVerifyPhone: true
    },
    message: {
      hasMessage: false
    }
  },
  location: null,
  userInfo: null,
  systemInfo: null,
  AVStoragePrefix: 'AV/' + AVAppData.appId + '/',
  posts: []
}

module.exports = {
  Version, AVAppData, GlobalData
}
