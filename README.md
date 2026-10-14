# fivepixels Website

React 라이브러리 fivepixels를 소개하는 웹사이트입니다.
사용 방법을 정리한 문서와 라이브러리를 써볼 수 있는 데모 화면도 함께 만들었습니다.

[서비스 바로가기](https://library.codi-agit.com/) · [데모](https://library.codi-agit.com/example/01) · [라이브러리 저장소](https://github.com/kimsangjunv1/fivepixels)

## 소개

fivepixels는 웹 화면에서 버튼이나 문구 같은 요소를 선택해 피드백을 남기는 라이브러리예요.
스타일과 배치를 직접 바꿔 보면서 어떤 모습으로 수정하고 싶은지 보여줄 수도 있습니다.

라이브러리가 어떻게 동작하는지 직접 살펴볼 수 있도록 이 사이트를 만들었으며,
데모에서 피드백을 남겨 보고, 프로젝트에 적용할 때 필요한 설치와 설정 방법은 가이드에서 찾아볼 수 있습니다.

라이브러리를 개발하며 추가하거나 수정한 내용과 앞으로 작업할 내용도 함께 정리하고 있습니다.

## 사용 기술

| 구분 | 기술 | 사용한 곳 |
| --- | --- | --- |
| 프레임워크 | Next.js 16 · React 19 | 페이지 구성, 서버 렌더링과 메타데이터 |
| 언어 | TypeScript | 컴포넌트와 콘텐츠 데이터의 타입 정의 |
| 스타일 | Tailwind CSS 4 · SCSS | 반응형 화면과 공통 스타일 |
| 상태 관리 | Zustand | 모달과 데모 화면의 상태 관리 |
| 인터랙션 | Motion · Lenis | 화면 애니메이션과 부드러운 스크롤 |
| 코드 표시 | prism-react-renderer · Prism.js | 가이드와 문서의 코드 구문 강조 |
| 피드백 | @fivepixels-js/react | 데모 화면의 요소 선택과 피드백 작성 |
| 방문 분석 | Vercel Analytics | 배포 사이트의 방문 통계 |
| 코드 검사 | ESLint | 코드 규칙 검사 |

## 프로젝트 구조

페이지, 화면 구성, 콘텐츠, 공통 코드를 아래 폴더로 나누었습니다.

```text
src/
├── app/        # (site) 공개 라우팅, 전역 레이아웃과 Provider
├── views/      # URL별 서버 page → 클라이언트 Panel 연결
├── widgets/    # URL별 Panel, UI 섹션, 페이지 상태와 공통 레이아웃
├── features/   # 문서 읽기, 데모 리뷰, 테스트 모달 등 재사용 기능
├── entities/   # 콘텐츠 도메인 타입과 JSON 데이터
└── shared/     # 공통 UI, API, SEO, 문구(i18n), 유틸리티와 스타일
```

`npm run check:structure`로 라우트 구조와 import 방향을,
`npm run check:api`로 공통 fetch 동작을 확인할 수 있습니다.
라우트별 점검 결과는 [구조 점검 보고서](docs/structure-audit.md)에 정리했습니다.

## 참고 사항

- 사이트는 현재 영어로 제공됩니다.
