/** 다른 화면으로 이동하는 기능을 정의함
 * navigation은 객체 속성,
 * navigate는 메서드 */
export interface NavigationProp {
  navigation: {
    navigate: (screen: string, params?: Record<string, any>) => void; // params를 추가하여 데이터 전달 가능
    goBack: () => void;
  };
}

// RouteProp 정의
export interface RouteProp {
  route: {
    params: {
      menuId: number;
      storeId : number;
      orderId : number;
      storeName : string;
    };
  };
}