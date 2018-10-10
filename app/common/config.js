export const PLATFORM_TYPE_INFO = {
  0: {
    type: 0,
    name: 'airbnb',
    icon: require('../assets/icon_airbnb.png'),
    icon_color: require('../assets/icon_airbnb_color.png'),
    user_page_url: 'https://www.airbnb.com/users/show/@@@@',
    show: true,
    order: 1
  },
  1: {
    type: 1,
    name: '途家网',
    icon: require('../assets/icon_tujia.png'),
    icon_color: require('../assets/icon_tujia_color.png'),
    user_page_url:
      'https://guanjia.tujia.com/storemanagement/landlordpage/?customerLoginID=@@@@',
    show: true,
    order: 2
  },
  2: {
    type: 2,
    name: '小猪短租',
    icon: require('../assets/icon_xiaozhu.png'),
    icon_color: require('../assets/icon_xiaozhu_color.png'),
    user_page_url: 'http://www.xiaozhu.com/fangke/@@@@/',
    show: true,
    order: 6
  },
  3: {
    type: 3,
    name: '一家民宿',
    icon: require('../assets/icon_yijia.png'),
    icon_color: require('../assets/icon_yijia_color.png'),
    user_page_url: 'http://www.onehome.me/user/p_show?id=@@@@',
    show: true,
    order: 5
  },
  5: {
    type: 5,
    name: '百居易',
    icon: require('../assets/icon_default_platform.png'),
    icon_color: require('../assets/icon_default_platform.png'),
    user_page_url: '',
    show: false,
    order: 100
  },
  6: {
    type: 6,
    name: '微店',
    icon: require('../assets/icon_shop.svg'),
    icon_color: require('../assets/icon_shop_color.svg'),
    user_page_url: '',
    show: false,
    order: 100
  },
  7: {
    type: 7,
    name: '榛果',
    icon: require('../assets/icon_zhenguo.png'),
    icon_color: require('../assets/icon_zhenguo_color.png'),
    user_page_url: 'https://www.zhenguo.com/user/@@@@/',
    show: true,
    order: 3
  },
  8: {
    type: 8,
    name: '木鸟',
    icon: require('../assets/icon_muniao.png'),
    icon_color: require('../assets/icon_muniao_color.png'),
    user_page_url: '',
    show: true,
    order: 4
  },
  9: {
    type: 9,
    name: 'booking',
    icon: require('../assets/icon_booking_tem.jpeg'),
    icon_color: require('../assets/icon_booking_tem.jpeg'),
    user_page_url: '',
    show: false,
    order: 7
  }
};

export const SpaceTypes = {
  0: '未知',
  1: '整套房源',
  2: '独立房间',
  3: '合住房间'
};

export const EmitterEvents = {
  SELECT_QUICK_REPLY: 'SELECT_QUICK_REPLY',
  SELECT_RECOMMEND_HOUSE: 'SELECT_RECOMMEND_HOUSE'
};
