# 🐧 학교 앞 포장/픽업 주문 앱, 패패오더

## 📖 프로젝트 소개
- 패패오더는 미리 주문하고 예약하는 기능으로 공강시간을 지키고싶은 대학생과 사장님을 연결해주는 주문 앱입니다.
- 지도에서 주문 가능한 가게를 음식 카테고리 별로 볼 수 있습니다.
- 자주 주문하는 메뉴를 메인 화면에서 원터치로 주문이 가능합니다.
- 사장님용 포스 앱을 통해 사장님이 주문 정보를 빠르게 받아볼 수 있습니다.

## 👤 팀원 구성
| 김민경 | 도소라 | 이종원 | 김선후 | 정유민 | 김도훈 |
|-----|-----|-----|-----|-----|-----|
|`PHOTO HERE`|![image](https://github.com/user-attachments/assets/be28aabf-95b5-4053-a439-a479439fbaf8)|`PHOTO HERE`|![image](https://github.com/user-attachments/assets/bd46897b-67c6-4e00-9d99-c460294b97a4)|`PHOTO HERE`|`PHOTO HERE`|

## 🛠️ 개발 환경

### 🔍 프레임워크 및 언어
- Front-end: React Native(0.78.0), TypeScript(2.0.4)
- Back-end: Django (x.x.x)

### 🔧 개발 도구
- Android Studio: 2024.2.2
- Xcode: 15.2

### 📱 테스트 환경
- iOS 시뮬레이터: iPhone (iOS x.x.x) `EDIT HERE`
- iOS 실제 기기: iPhone11 (iOS 18.1.1) 
- Android 에뮬레이터: API 레벨 xx (Android x.x) `EDIT HERE`
- Android 실제 기기: API 레벨 29 (Android 10.0)

### 📚 주요 라이브러리 및 API
- react-native-naver-map: 1.5.10
- Firebase Cloud Messaging (FCM): 21.4.0
- react-native-async-storage: 2.0.0

### 🔖 버전 및 이슈 관리
- Git: 2.39.3

### 👥 협업 툴
- 커뮤니케이션: Discord
- 문서 관리: Notion

### ☁️ 서비스 배포 환경
- 백엔드 서버: `EDIT HERE`

### 🎨 디자인
- Figma

## ▶️ 프로젝트 실행 방법

### ⬇️ 필수 설치 사항

#### 기본 환경
- Node.js (v18.0.0 이상)
- npm (v8.0.0 이상) 또는 yarn (v1.22.0 이상)
- JDK (Java Development Kit) 17
- Android Studio (최신 버전)
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device
- Xcode 15.0 이상 (iOS 개발용, macOS 필요)
- CocoaPods 1.12.0 이상 (iOS 의존성 관리, macOS 필요)
- Watchman (파일 시스템 변경 감지 도구)

#### 필수 의존성 패키지
- react v18.3.1
- react-native v0.75.4
- @react-navigation/native v6.1.18
- @react-navigation/stack v6.4.1
- @react-navigation/bottom-tabs v6.6.1
- @react-native-firebase/app v21.4.0 (푸시 알림용)
- @react-native-firebase/messaging v21.4.0 (푸시 알림용)
- @mj-studio/react-native-naver-map v1.5.10 (네이버 지도)
- @react-native-async-storage/async-storage v2.0.0 (로컬 저장소)
- react-native-gesture-handler v2.20.0
- react-native-reanimated v3.15.5
- react-native-safe-area-context v4.11.0
- react-native-screens v3.34.0
- react-native-svg v15.7.1
- react-native-vector-icons v10.2.0
- react-native-webview v13.12.3
- axios v1.7.7 (네트워크 요청)
- TypeScript 5.0.4 (타입 안정성)

### ⿻ 프로젝트 클론 및 설정
- 프로젝트 클론
```bash
git clone https://github.com/FastOrderApp/FastOrderApp.git
```
- 의존성 설치
```bash
npm install
```

### 🌐 개발 서버 실행
```bash
# iOS
npx react-native run-ios

# Android
npx react-native run-android
```

## 🌿 브랜치 전략
- 작업자의 이름으로 브랜치 생성(sora, jongwon, ...)

## 📁 프로젝트 구조
```
src/
├─ assets/       # 아이콘, 이미지 리소스
├─ components/   # 공통 UI 컴포넌트 (NaverMap, BottomSheet 등)
├─ consts/       # 상수 정의
├─ navigation/   # 네비게이션 설정
├─ pages/        # 주요 화면 (Main, Login, Store 등)
└─ styles/       # 컴포넌트별 스타일 정의
```

## 🎭 개발 분담

### 🐚 도소라
- 페이지: 지도 메인, 주문내역, 찜 목록, 마이페이지
- 기능
  - 네이버 지도 API 연동
  - 바텀 시트 제스처, 칩그룹 카테고리 필터링, 가게 상태에 따른 마커 표출
  - FCM 푸시 알림 연동 및 구현
  - 주문내역 불러오기, 찜 기능 구현

### 이종원 `EDIT HERE`
### 김선후 `EDIT HERE`
### 정유민 `EDIT HERE`
### 김도훈 `EDIT HERE`

## 📅 개발 기간
2024.09.xx ~ 2024.12.xx

## 📄 손님용 앱 화면별 기능
### <<회원가입>>
### <<로그인>>
### <<메인>>
### <<주문내역>>
### <<찜 목록>>
### <<마이페이지>>
### <<`EDIT HERE`>>

## 📄 사장님용 앱 화면별 기능
### <<`EDIT HERE`>>

## 💥 트러블 슈팅
### <<`EDIT HERE`>>

## 🎯 개선 목표
### <<`EDIT HERE`>>