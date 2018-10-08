export const PLATFORM_TYPE_INFO = {
  0: {
    type: PLATFORM_TYPE.AIRBNB,
    name: 'airbnb',
    icon: require('../assets/icon_airbnb.png'),
    icon_color: require('../assets/icon_airbnb_color.png'),
    user_page_url: 'https://www.airbnb.com/users/show/@@@@',
    show: true,
    order: 1
  },
  1: {
    type: PLATFORM_TYPE.TUJIA,
    name: '途家网',
    icon: require('../assets/icon_tujia.png'),
    icon_color: require('../assets/icon_tujia_color.png'),
    user_page_url:
      'https://guanjia.tujia.com/storemanagement/landlordpage/?customerLoginID=@@@@',
    show: true,
    order: 2
  },
  2: {
    type: PLATFORM_TYPE.XIAOZHU,
    name: '小猪短租',
    icon: require('../assets/icon_xiaozhu.png'),
    icon_color: require('../assets/icon_xiaozhu_color.png'),
    user_page_url: 'http://www.xiaozhu.com/fangke/@@@@/',
    show: true,
    order: 6
  },
  3: {
    type: PLATFORM_TYPE.YIJIA,
    name: '一家民宿',
    icon: require('../assets/icon_yijia.png'),
    icon_color: require('../assets/icon_yijia_color.png'),
    user_page_url: 'http://www.onehome.me/user/p_show?id=@@@@',
    show: true,
    order: 5
  },
  5: {
    type: PLATFORM_TYPE.PLATFORM,
    name: '百居易',
    icon: require('../assets/icon_default_platform.png'),
    icon_color: require('../assets/icon_default_platform.png'),
    user_page_url: '',
    show: false,
    order: 100
  },
  7: {
    type: PLATFORM_TYPE.ZHENGUO,
    name: '榛果',
    icon: require('../assets/icon_zhenguo.png'),
    icon_color: require('../assets/icon_zhenguo_color.png'),
    user_page_url: 'https://www.zhenguo.com/user/@@@@/',
    show: true,
    order: 3
  },
  8: {
    type: PLATFORM_TYPE.MUNIAO,
    name: '木鸟',
    icon: require('../assets/icon_muniao.png'),
    icon_color: require('../assets/icon_muniao_color.png'),
    user_page_url: '',
    show: true,
    order: 4
  },
  9: {
    type: PLATFORM_TYPE.BOOKING,
    name: 'booking',
    icon: require('../assets/icon_booking_tem.jpeg'),
    icon_color: require('../assets/icon_booking_tem.jpeg'),
    user_page_url: '',
    show: false,
    order: 7
  }
};
