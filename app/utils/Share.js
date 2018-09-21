import * as WeChat from 'react-native-wechat';
import ToastUtil from './ToastUtil';

WeChat.addListener('SendMessageToWX.Resp', response => {
  if (parseInt(response.errCode) === 0) {
    ToastUtil.showShort('分享成功');
  } else {
    ToastUtil.showShort('分享失败');
  }
});

const share = (config: {
  target: string, // session | timeline
  title: string,
  description: string,
  thumbImage: string,
  type: string, // news|text|image|video|audio|file
  webpageUrl: ?string,
  imageUrl: ?string,
  videoUrl: ?string,
  musicUrl: ?string
}) => {
  WeChat.isWXAppInstalled().then(isInstalled => {
    if (isInstalled) {
      const { title, description, thumbImage, type } = config;
      const configs = { title, description, thumbImage, type };
      switch (type) {
        case 'news':
          Object.assign(configs, { webpageUrl: config.webpageUrl });
          break;
        case 'image':
          Object.assign(configs, { imageUrl: config.imageUrl });
          break;
        case 'video':
          Object.assign(configs, { videoUrl: config.videoUrl });
          break;
        case 'music':
          Object.assign(configs, { musicUrl: config.musicUrl });
          break;
      }
      const shareFn =
        config.target === 'session'
          ? WeChat.shareToSession
          : WeChat.shareToTimeline;

      shareFn &&
        shareFn(configs)
          .then(res => {
            // ToastUtil.showShort('分享成功');
          })
          .catch(err => {
            ToastUtil.showShort(err.message, true);
          });
    } else {
      ToastUtil.showShort('您没有安装微信，请安装微信之后再试', true);
    }
  });
};

const shareToSession = config => {
  share({ ...config, target: 'session' });
};

const shareToTimeline = config => {
  share({ ...config, target: 'timeline' });
};

const WeChatUtil = {
  shareToSession,
  shareToTimeline
};

export default WeChatUtil;
