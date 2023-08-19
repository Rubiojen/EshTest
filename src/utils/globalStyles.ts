import {
  Dimensions,
  LayoutAnimation,
  PixelRatio,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Expense, ExpenseFilters, Sheet, User} from './types';

const baseScreenWidth = 414; // iPhone 11 - 414x896
const baseScreenHeight = 896;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

export const widthScaleFactor =
  screenWidth / baseScreenWidth < 1 ? 1 : screenWidth / baseScreenWidth;
export const heightScaleFactor =
  screenHeight / baseScreenHeight < 1 ? 1 : screenHeight / baseScreenHeight;
export const maxScale = Math.max(widthScaleFactor, heightScaleFactor);
export const minScale = Math.min(widthScaleFactor, heightScaleFactor);

const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

const androidMenuHeight =
  StatusBar.currentHeight! > 24
    ? 0
    : screenHeight - windowHeight - StatusBar.currentHeight!;

export const normalizeWidth = (width: number) => {
  return PixelRatio.roundToNearestPixel(
    width * (windowWidth / baseScreenWidth),
  );
};

export const normalizeSize = (size: number) => {
  const widthRatio = windowWidth / baseScreenWidth;
  const heightRatio = windowHeight / baseScreenHeight;
  const averageRatio = (widthRatio + heightRatio) / 2;

  return PixelRatio.roundToNearestPixel(size * averageRatio);
};

export const normalizeHeight = (height: number) => {
  return PixelRatio.roundToNearestPixel(
    height * (windowHeight / baseScreenHeight),
  );
};

export const AnimateLayout = () =>
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

export const Consts = {
  emptyUser: {
    userName: '',
    isLoggedIn: false,
  } as User,
  emptyExpense: {
    title: '',
    date: '',
    amount: 0,
  } as Expense,
  emptyExpenseFilters: {
    title: '',
    date: '',
    amount: undefined,
  } as ExpenseFilters,
  closedSheet: {
    isOpen: false,
    finishCloseAnimation: true,
  } as Sheet,
  imageSize: 'w500',
  hapticsOptions: {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: true,
  },
  plusButtonSize: normalizeSize(56),
  sectionPadding: normalizeWidth(12),
  androidMenuHeight: isAndroid ? androidMenuHeight : 0,
  androidStatusBar: isAndroid ? StatusBar.currentHeight || 0 : 0,
  sheetHandleHeight: 24,
  windowWidth,
  windowHeight,
  screenHeight,
  screenWidth,
  isIos,
  isAndroid,
  platform: Platform.OS,
  hitSlop10: {top: 10, right: 10, bottom: 10, left: 10},
  hitSlop20: {top: 20, right: 20, bottom: 20, left: 20},
  hitSlop30: {top: 30, right: 30, bottom: 30, left: 30},
  sliderWidth: normalizeWidth(300),
  knobWidth: normalizeWidth(40),
  initBoxSize: {width: 0, height: 0},
  maxFontWeight: 9,
  maxFontSize: 100,
  maxShadow: 24,
  emptyStringInput: {
    value: '',
    errorMessage: '',
  },
};

export const LottieFiles = {
  SPLASH: require('../assets/lottie/bank.json'),
};

const FontRegular = 'Urbanist-Regular';
const FontMedium = 'Urbanist-Medium';
const FontSemiBold = 'Urbanist-SemiBold';
const FontBold = 'Urbanist-Bold';

export const GS = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  fullModalHeight: {
    height: normalizeHeight(800),
  },
  filterModalHeight: {
    height: normalizeHeight(650),
  },
  screenWidth: {
    width: Consts.screenWidth,
  },
  screenHeight: {
    height: Consts.screenHeight,
  },
  noBorder: {
    borderWidth: 0,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayNone: {
    display: 'none',
  },
  displayFlex: {
    display: 'flex',
  },
  overFlowHide: {
    overflow: 'hidden',
  },
  flexZero: {
    flex: 0,
  },
  flexOne: {
    flex: 1,
  },
  flexTwo: {
    flex: 2,
  },
  flexThee: {
    flex: 3,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  flexShrink: {
    flexShrink: 1,
  },
  noWrap: {
    flexWrap: 'nowrap',
  },
  absolute: {
    position: 'absolute',
  },
  width32: {
    width: normalizeWidth(32),
  },
  right8: {
    right: normalizeWidth(8),
  },
  left8: {
    left: normalizeWidth(8),
  },
  right16: {
    right: normalizeWidth(16),
  },
  left16: {
    left: normalizeWidth(16),
  },
  leftZero: {
    left: 0,
  },
  rightZero: {
    right: 0,
  },
  opacityZero: {
    opacity: 0,
  },
  opacity05: {
    opacity: 0.5,
  },
  sheetOpacity: {
    opacity: 1,
  },
  // borders
  borderRadius12: {
    borderRadius: 12,
  },
  borderRadius16: {
    borderRadius: 16,
  },
  borderRadius32: {
    borderRadius: 32,
  },
  borderRadius50: {
    borderRadius: 50,
  },
  borderRadiusMax: {
    borderRadius: 999,
  },
  border1: {
    borderWidth: 1,
  },
  borderTop1: {
    borderTopWidth: 1,
  },
  borderBottom1: {
    borderBottomWidth: 1,
  },
  // justify/align
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifySpaceAround: {
    justifyContent: 'space-around',
  },
  justifySpaceEvenly: {
    justifyContent: 'space-evenly',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  // paddings
  padding8: {padding: normalizeWidth(8)},
  padding12: {padding: normalizeWidth(12)},
  padding16: {padding: normalizeWidth(16)},
  paddingHorizontalZero: {paddingHorizontal: 0},
  paddingHorizontal20: {paddingHorizontal: normalizeWidth(20)},
  paddingHorizontal24: {paddingHorizontal: normalizeWidth(24)},
  paddingHorizontal32: {paddingHorizontal: normalizeWidth(32)},
  paddingVerticalZero: {paddingVertical: 0},
  paddingVertical4: {paddingVertical: normalizeHeight(4)},
  paddingVertical8: {paddingVertical: normalizeHeight(8)},
  paddingVertical12: {paddingVertical: normalizeHeight(12)},
  paddingVertical16: {paddingVertical: normalizeHeight(16)},
  paddingHorizontal64: {paddingHorizontal: normalizeWidth(64)},
  paddingLeft4: {
    paddingLeft: normalizeWidth(4),
  },
  paddingLeft8: {
    paddingLeft: normalizeWidth(8),
  },
  paddingLeft12: {
    paddingLeft: normalizeWidth(12),
  },
  paddingLeft16: {
    paddingLeft: normalizeWidth(16),
  },
  paddingLeft24: {
    paddingLeft: normalizeWidth(24),
  },
  paddingRight8: {
    paddingRight: normalizeWidth(8),
  },
  paddingRight12: {
    paddingRight: normalizeWidth(12),
  },
  paddingRight16: {
    paddingRight: normalizeWidth(16),
  },
  paddingRight24: {
    paddingRight: normalizeWidth(24),
  },
  paddingTop8: {paddingTop: normalizeHeight(8)},
  paddingTop16: {paddingTop: normalizeHeight(16)},
  paddingTop24: {paddingTop: normalizeHeight(24)},
  paddingBottom8: {paddingBottom: normalizeHeight(8)},
  paddingBottom4: {paddingBottom: normalizeHeight(4)},
  paddingBottom16: {paddingBottom: normalizeHeight(16)},
  paddingBottom24: {paddingBottom: normalizeHeight(24)},
  paddingBottom32: {paddingBottom: normalizeHeight(32)},
  paddingHorizontal8: {
    paddingHorizontal: normalizeWidth(8),
  },
  paddingHorizontal12: {
    paddingHorizontal: normalizeWidth(12),
  },
  paddingHorizontal16: {
    paddingHorizontal: normalizeWidth(16),
  },
  // Margin
  marginVertical5: {marginVertical: normalizeHeight(5)},
  marginVertical4: {marginVertical: normalizeHeight(4)},
  marginVertical8: {marginVertical: normalizeHeight(8)},
  marginVertical16: {marginVertical: normalizeHeight(16)},
  marginTopAuto: {
    marginTop: 'auto',
  },
  marginLeftAuto: {
    marginLeft: 'auto',
  },
  marginRightAuto: {
    marginRight: 'auto',
  },
  marginSide8: {
    marginHorizontal: normalizeWidth(8),
  },
  marginLeft4: {
    marginLeft: normalizeWidth(4),
  },
  marginLeft8: {
    marginLeft: normalizeWidth(8),
  },
  marginLeft12: {
    marginLeft: normalizeWidth(12),
  },
  marginLeft16: {
    marginLeft: normalizeWidth(16),
  },
  marginLeft24: {
    marginLeft: normalizeWidth(24),
  },
  marginLeft32: {
    marginLeft: normalizeWidth(32),
  },
  marginRight8: {
    marginRight: normalizeWidth(8),
  },
  marginRight16: {
    marginRight: normalizeHeight(16),
  },
  marginRight24: {
    marginRight: normalizeHeight(24),
  },
  marginRight32: {
    marginRight: normalizeHeight(32),
  },
  marginHorizontal8: {
    marginHorizontal: normalizeWidth(8),
  },
  marginHorizontal16: {
    marginHorizontal: normalizeWidth(16),
  },
  marginHorizontal24: {
    marginHorizontal: normalizeWidth(24),
  },
  marginBottom2: {
    marginBottom: normalizeHeight(2),
  },
  marginBottom4: {
    marginBottom: normalizeHeight(4),
  },
  marginBottom8: {
    marginBottom: normalizeHeight(8),
  },
  marginBottom12: {
    marginBottom: normalizeHeight(12),
  },
  marginBottom16: {
    marginBottom: normalizeHeight(16),
  },
  marginBottom24: {
    marginBottom: normalizeHeight(24),
  },
  marginBottom32: {
    marginBottom: normalizeHeight(32),
  },
  marginBottom40: {
    marginBottom: normalizeHeight(40),
  },
  marginTop8: {
    marginTop: normalizeHeight(8),
  },
  marginTop16: {
    marginTop: normalizeHeight(16),
  },
  marginTop24: {
    marginTop: normalizeHeight(24),
  },
  marginTop32: {
    marginTop: normalizeHeight(32),
  },
  marginTop64: {
    marginTop: normalizeHeight(64),
  },
  // texts
  removeFontPadding: {
    includeFontPadding: false,
    padding: 0,
    paddingHorizontal: 0,
  },
  monospace: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Regular' : 'monospace',
    fontVariant: ['tabular-nums'],
  },
  underline: {textDecorationLine: 'underline'},
  textAlignVerticalCenter: {
    textAlignVertical: 'center',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  textAlignLeft: {
    textAlign: 'left',
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  text14: {
    fontSize: normalizeSize(14),
  },
  text16: {
    fontSize: normalizeSize(16),
  },
  text18: {
    fontSize: normalizeSize(18),
  },
  text19: {
    fontSize: normalizeSize(19),
  },
  text20: {
    fontSize: normalizeSize(20),
  },
  text21: {
    fontSize: normalizeSize(21),
  },
  text22: {
    fontSize: normalizeSize(22),
  },
  text24: {
    fontSize: normalizeSize(24),
  },
  text28: {
    fontSize: normalizeSize(28),
  },
  text32: {
    fontSize: normalizeSize(32),
  },
  fontSemiBold: {
    fontFamily: FontSemiBold,
  },
  fontBold: {
    fontFamily: FontBold,
  },
  fontMedium: {
    fontFamily: FontMedium,
  },
  fontRegular: {
    fontFamily: FontRegular,
  },
  title48: {
    fontFamily: FontBold,
    fontSize: normalizeSize(48),
  },
  title40: {
    fontFamily: FontBold,
    fontSize: normalizeSize(40),
  },
  title36: {
    fontFamily: FontBold,
    fontSize: normalizeSize(36),
  },
  title32: {
    fontFamily: FontBold,
    fontSize: normalizeSize(32),
  },
  title24: {
    fontFamily: FontBold,
    fontSize: normalizeSize(24),
  },
  title20: {
    fontFamily: FontBold,
    fontSize: normalizeSize(20),
  },
  title18: {
    fontFamily: FontBold,
    fontSize: normalizeSize(18),
  },
  bodyRegular20: {
    fontFamily: FontRegular,
    fontSize: normalizeSize(20),
  },
  bodyRegular18: {
    fontFamily: FontRegular,
    fontSize: normalizeSize(18),
  },
  bodyRegular16: {
    fontFamily: FontRegular,
    fontSize: normalizeSize(16),
  },
  bodyRegular14: {
    fontFamily: FontRegular,
    fontSize: normalizeSize(14),
  },
  bodyRegular12: {
    fontFamily: FontRegular,
    fontSize: normalizeSize(12),
  },
  bodyRegular10: {
    fontFamily: FontRegular,
    fontSize: normalizeSize(10),
  },
  bodyMedium20: {
    fontFamily: FontMedium,
    fontSize: normalizeSize(20),
  },
  bodyMedium18: {
    fontFamily: FontMedium,
    fontSize: normalizeSize(18),
  },
  bodyMedium16: {
    fontFamily: FontMedium,
    fontSize: normalizeSize(16),
  },
  bodyMedium14: {
    fontFamily: FontMedium,
    fontSize: normalizeSize(14),
  },
  bodyMedium12: {
    fontFamily: FontMedium,
    fontSize: normalizeSize(12),
  },
  bodyMedium10: {
    fontFamily: FontMedium,
    fontSize: normalizeSize(10),
  },
  bodySemibold20: {
    fontFamily: FontSemiBold,
    fontSize: normalizeSize(20),
  },
  bodySemibold18: {
    fontFamily: FontSemiBold,
    fontSize: normalizeSize(18),
  },
  bodySemibold16: {
    fontFamily: FontSemiBold,
    fontSize: normalizeSize(16),
  },
  bodySemibold14: {
    fontFamily: FontSemiBold,
    fontSize: normalizeSize(14),
  },
  bodySemibold12: {
    fontFamily: FontSemiBold,
    fontSize: normalizeSize(12),
  },
  bodySemibold10: {
    fontFamily: FontSemiBold,
    fontSize: normalizeSize(10),
  },
  bodyBold20: {
    fontFamily: FontBold,
    fontSize: normalizeSize(20),
  },
  bodyBold18: {
    fontFamily: FontBold,
    fontSize: normalizeSize(18),
  },
  bodyBold16: {
    fontFamily: FontBold,
    fontSize: normalizeSize(16),
  },
  bodyBold14: {
    fontFamily: FontBold,
    fontSize: normalizeSize(14),
  },
  bodyBold12: {
    fontFamily: FontBold,
    fontSize: normalizeSize(12),
  },
  bodyBold10: {
    fontFamily: FontBold,
    fontSize: normalizeSize(10),
  },
  bold: {
    fontWeight: 'bold',
  },
  weight500: {
    fontWeight: '500',
  },
  weight400: {
    fontWeight: '400',
  },
  baseShadow: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    // elevation: 14,
  },
  // colors
  bgBlack: {
    backgroundColor: 'black',
  },
  modalBg: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bgRed: {
    backgroundColor: 'red',
  },
  bgTrans: {
    backgroundColor: 'transparent',
  },
  bgBlue: {
    backgroundColor: 'blue',
  },
  zIndex100: {
    zIndex: 100,
  },
});

export const Colors = {
  White: '#FFF',
  Black: '#000',
  Error: '#dc2626',
  Green: '#00FF00',
};

export const colorsTheme = {
  DARK: {
    ...Colors,
    PrimaryColor: '#1F69FE',
    SecondaryColor: '#5B58AD',
    PrimaryBG: '#18181B',
    SecondaryBG: '#292525',
    ThirdBG: '#35383F',
    InvertBG: '#F9F7F7',
    InvertSecondBG: '#F6F6F6',
    MainText: '#040404',
    SecondaryText: '#524A42',
    InvertText: '#EDF2F5',
    InvertSecondText: '#ADB5BD',
    Error: '#dc2626',
    Border: '#343A40',
    LoaderColor: '#efefee',
    BrushColor: '#fff',
  },
  LIGHT: {
    ...Colors,
    PrimaryColor: '#3D71FF',
    SecondaryColor: '#9455FF',
    PrimaryBG: '#F9F7F7',
    SecondaryBG: '#F4EEEE',
    ThirdBG: '#ADB5BD',
    InvertBG: '#18181A',
    InvertSecondBG: '#35383F',
    MainText: '#EDF2F5',
    SecondaryText: '#ADB5BD',
    InvertText: '#040404',
    InvertSecondText: '#524A42',
    Error: '#dc2626',
    Border: '#D9D9D9',
    LoaderColor: '#efefee',
    BrushColor: '#fff',
  },
};
