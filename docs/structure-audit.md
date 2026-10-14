# 프로젝트 구조 전수 점검

점검일: 2026-10-14 (Asia/Seoul). 기준: `prompt/structure-prompt.md`와 연결된 `structure-guide.md`.
기준 커밋: `2a51b79`. 작업 브랜치: `develop`에서 분기한 `feature/fix`.

## 조사 결과와 수정

- 공개 화면 17개 경로를 조사했다. 실제 화면 15개는 서버 `page → View → client Panel → ui`로 연결하고, 리다이렉트 2개는 화면 계층을 만들지 않았다.
- 공개 `page.tsx`를 `app/(site)`로 이동했다. URL, 동적 slug, static params, notFound, 리다이렉트, 기존 feed 주소는 유지했다.
- `/`는 `views/home`과 `widgets/home`, 나머지는 URL 세그먼트와 같은 경로를 사용한다. 동적 라우트는 `[slug]` 디렉터리로 대응한다.
- 페이지에 있던 화면 JSX와 가이드의 `Shell` 조립을 각 Panel로 이동했다. Panel은 `Layer.*`로 제목, 목록, 본문, 사이드바 등을 직접 조립한다. 전체 페이지를 대신 조립하는 `*Page`/`*Sections` UI 프록시는 두지 않았다.
- 가이드 목록과 데모 화면의 기존 JSX를 목적별 섹션으로 분리했다. 기존 레이아웃 요소, 클래스, 문구, 링크, `data-report-id`는 유지했다.
- 여러 화면이 쓰는 문서 UI/관찰 상태는 `features/readDocumentation`, 데모 shell/모달 동작은 `features/reviewDemo`, 본문 표시는 `features/readContent`로 이동했다.
- 데모 공통 shell은 `widgets/layout/Example01Layout`에서 구성한다. 페이지 Panel을 감싸는 새 추상 레이아웃은 만들지 않았다.
- 변경 이력 필터/목록은 `ChangelogPageProvider`, 모달 실험실 버튼/인라인 호스트는 `Example01ModalsPageProvider`에서 상태를 공유한다. 섹션 안에는 그 섹션만 사용하는 로컬 상태만 둔다.
- 모든 화면 라우트에 `ui/Modal`, `modal/TestModal`, `model/useConfirmModalStore`, 검색 훅 scaffold를 구성했다. 신규 정적 화면 scaffold는 Provider 없이 모달 섹션이 상태를 소유하며, 공통 구현을 재사용해 상태 인스턴스는 분리한다.
- 콘텐츠 JSON과 타입은 `entities/content`로 이동했다. 화면 문구와 `useMessages`는 `shared/i18n`, SEO/사이트 설정/날짜 유틸은 `shared/lib`, 범용 아이콘은 `shared/ui`로 이동해 하위 레이어의 `app`/`widgets` 역참조를 제거했다.
- `shared/lib/api/server.ts`, `client.ts`, 공통 응답 처리기를 추가했다. JSON/텍스트/빈 응답, HTTP 오류를 공통 처리하고, 클라이언트는 인증 만료/오류와 동시 변경 요청 loading 이벤트를 제공한다.
- 라우트 그룹 이동으로 생긴 홈 title template 중복은 홈의 absolute title로 보정했다.
- 문서 브라우저 검사 중 Prism 자동 스캔이 React의 코드 토큰 DOM을 다시 써 hydration 오류를 만드는 경로를 확인했다. `CodeBlock`에서 `Prism.manual = true`로 자동 스캔을 차단하고 React의 토큰 렌더링을 유지했다.
- `check:structure`, `check:api` 명령과 README 구조 설명을 추가했다.

## 라우트별 준수 표

`entities 경유`의 “해당 없음”은 HTTP/API가 없거나 정적 UI 문구만 사용하는 화면이다. 정적 콘텐츠 도메인만 `entities/content`를 사용한다.
아래 모든 화면은 기본 모달/검색 scaffold와 서버 page 조건도 충족한다.

| 라우트 | page→view→panel | Panel 직접 섹션 조립 | model/Provider | ui 섹션 분리 | entities 경유 | 비고 |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 충족 | 19개 섹션 | HomePageProvider | 충족 | 해당 없음 | home 별칭, 기존 모달 유지 |
| `/guides` | 충족 | 9개 섹션 | 로컬 scaffold, Provider 선택 생략 | 충족 | 해당 없음 | 정적 문서 안내 |
| `/guides/[slug]` | 충족 | Sidebar/MobileNav/Document/TableOfContents | GuidesDetailPageProvider | 충족 | 해당 없음 | 공유 문서 Provider 재사용, slug 전환 시 상태 초기화 |
| `/docs/[slug]` | 충족 | Sidebar/MobileNav/Document/TableOfContents | DocsDetailPageProvider | 충족 | 해당 없음 | 공유 문서 Provider 재사용 |
| `/changelog` | 충족 | Heading/Toolbar/EntryList | ChangelogPageProvider | 충족 | 콘텐츠 도메인 | 필터/복사/목록 상태 공유 |
| `/changelog/[slug]` | 충족 | BackLink/Summary/Body/Metadata | 로컬 scaffold, Provider 선택 생략 | 충족 | 콘텐츠 도메인 | 서버에서 데이터 확인 후 props 전달 |
| `/newsletter` | 충족 | Heading/Grid | 로컬 scaffold, Provider 선택 생략 | 충족 | 콘텐츠 도메인 | 정적 목록 |
| `/newsletter/[slug]` | 충족 | BackLink/Heading/Body | 로컬 scaffold, Provider 선택 생략 | 충족 | 콘텐츠 도메인 | 서버에서 데이터 확인 후 props 전달 |
| `/roadmap` | 충족 | Heading/Board | 로컬 scaffold, Provider 선택 생략 | 충족 | 콘텐츠 도메인 | 정적 보드 |
| `/example/01` | 충족 | Summary/IssueBoard/Activity | Example01PageProvider | 충족 | 해당 없음 | 공통 데모 기능은 features 경유 |
| `/example/01/issues` | 충족 | Heading/ModalActions/IssueList | 로컬 scaffold + 공유 데모 store | 충족 | 해당 없음 | 라우트 전용 공유 상태 없음 |
| `/example/01/reviews` | 충족 | Heading/ReviewActions/ReviewQueue | 로컬 scaffold + 공유 데모 store | 충족 | 해당 없음 | 라우트 전용 공유 상태 없음 |
| `/example/01/releases` | 충족 | Heading/ReleaseList | 로컬 scaffold + 공유 데모 store | 충족 | 해당 없음 | 데모 모달 동작 재사용 |
| `/example/01/settings` | 충족 | Heading/WorkspaceSettings | 로컬 scaffold, Provider 선택 생략 | 충족 | 해당 없음 | 데모 설정 화면 |
| `/example/01/modals` | 충족 | Heading/Cases/InlineHost | Example01ModalsPageProvider | 충족 | 해당 없음 | 인라인 모달 상태 공유 |
| `/docs` | 리다이렉트 예외 | 해당 없음 | 해당 없음 | 해당 없음 | 해당 없음 | `/docs/setup`으로 이동 |
| `/guide` | 리다이렉트 예외 | 해당 없음 | 해당 없음 | 해당 없음 | 해당 없음 | 기존 next.config 리다이렉트 유지 |

## 조건부 비적용 항목과 남은 사항

- 로그인/관리자 화면이 없으므로 `(login)`, admin Provider, 인증 가드를 추가하지 않았다.
- 외부 HTTP API, 서버 액션, query 라이브러리 사용이 없다. 따라서 도메인 `*.api.ts`/`*.query.ts`와 요청 `Payload`/응답 `Response`를 빈 파일로 만들지 않았다. 기존 정적 데이터 타입은 API 요청/응답 타입이 아니다.
- 토큰/cookie/refresh/HMAC/Slack tracking의 실제 연동은 없다. 서버 인증 정책과 refresh 재시도는 연결할 백엔드 계약이 생길 때 `shared/lib/api/server.ts`에 구현해야 한다. 임의 인증 정책이나 외부 전송을 도입하지 않았다.
- 현재 공통 API wrapper 사용처가 없어 client loading 이벤트를 소비하는 화면도 없다. mutation은 `api:loading`의 pending 수, 만료는 `api:auth-expired`, 실패는 `api:error`를 발생시키며 미래의 공통 UX 연결점으로 둔다. 실제 서비스의 인증/loading UX가 구현 완료된 것은 아니다.
- 기존 `/changelog.md`, `/changelog/feed.xml`은 공개 피드 응답 주소이므로 `app/api`로 옮기지 않았다. 서버 route handler에는 page UI 규칙을 적용하지 않는다. robots/sitemap/루트 layout도 화면 page 점검 대상과 구분했다.
- 기존 ESLint 경고 6개는 남아 있다: Reveal의 사용하지 않는 타입/인자 2개, Shimmer effect 의존성 1개, IntroSection의 `<img>` 1개, MegaMenu의 사용하지 않는 상수/변수 2개. 이번 구조 변경에서 새 경고는 추가하지 않았다.
- 구조 검사 스크립트는 모든 로컬 import, 라우트 어댑터, Panel 섹션/기본 scaffold, fetch 위치를 검사한다. Provider 공유 범위나 UI 섹션의 의미까지 자동 판정하지는 않아 해당 부분은 소스 검토와 브라우저 동작 검사로 확인했다.

## 검증

| 검사 | 최종 결과 | 근거/범위 |
| --- | --- | --- |
| `npm run check:structure` | 통과 | TypeScript/TSX 소스 256개, 실제 화면 15개 + 리다이렉트 2개, 구조 위반 0개 |
| `npm run check:api` | 통과 | JSON/텍스트/빈 응답, HTTP/파싱/네트워크 오류, 401/419 이벤트, 동시 mutation loading, GET |
| `npx tsc --noEmit --incremental false` | 통과 | 별도 타입 검사 수행. 라우트 이동 전 경로를 참조하던 생성 캐시 `.next/dev/types/validator.ts`는 삭제 후 확인 |
| `npm run lint` | 통과 | 오류 0개, 기존 경고 6개 |
| `npm run build` | 통과 | Next.js 프로덕션 컴파일 및 정적 페이지 52개 생성 |
| 변경 전후 HTTP 회귀 비교 | 통과 | 56개 URL의 상태, 최종 URL, 본문, 링크, metadata 비교. sitemap의 생성 시각만 정규화 |
| 브라우저 대표 화면 검사 | 통과 | 15개 화면 라우트의 대표 URL에서 hydration과 기본 모달 열기/닫기 확인, 신규 검색 scaffold 초기화 확인 |
| 브라우저 공유 상태 검사 | 통과 | 변경 이력 필터/목록, 데모 인라인 모달, 공통 create-issue 모달, 여러 라우트가 쓰는 모달 store, 문서 목차 observer |
| 문서 hydration 회귀 검사 | 통과 | 수정 전 `/docs/api`, `/docs/setup`에서 React #418 관측. Prism 자동 DOM 변경 차단 후 최종 전체 검사에서 런타임/hydration 오류 0개, code innerHTML 직접 변경 0개 |

전체 slug의 HTTP 응답을 검사했지만, 브라우저 인터랙션은 라우트별 대표 slug를 대상으로 수행했다. 브라우저/HTTP 비교 도구와 응답 스냅샷은 이번 작업의 임시 검증 자료이며, 저장소에는 재실행 가능한 구조/API 검사 두 개를 포함했다.
기존 `next.config.mjs`의 `ignoreBuildErrors` 설정은 유지했으며, 빌드 성공과 별도로 위 TypeScript 검사를 통과했다.

## 구조 요약

```text
src/
  app/
    (site)/                  # 공개 UI 라우트 17개와 데모 layout
    changelog.md/            # 기존 Markdown 응답
    changelog/feed.xml/      # 기존 RSS 응답
    providers/               # 전역 오류/스크롤 Provider
    layout.tsx, JsonLd.tsx, robots.ts, sitemap.ts
  views/
    home/, guides/[slug]/, docs/[slug]/
    changelog/[slug]/, newsletter/[slug]/, roadmap/
    example/01/{issues,reviews,releases,settings,modals}/
  widgets/
    # views와 동일한 URL 구조: Panel + index + ui + model + modal
    home/, guides/[slug]/, docs/[slug]/
    changelog/[slug]/, newsletter/[slug]/, roadmap/
    example/01/{issues,reviews,releases,settings,modals}/
    layout/                  # 공통 shell, Main, Header/Footer
  features/
    readDocumentation/       # 여러 문서 라우트의 UI/공유 상태
    readContent/             # 콘텐츠 본문 UI
    reviewDemo/              # 데모 shell/피드백/공유 모달
    manageTestModal/         # 기본 scaffold의 테스트 모달 기능
  entities/
    content/{data,model,constants,lib,ui}/
  shared/
    i18n/                    # 문구, 문서 데이터, useMessages
    lib/{api,hooks}/          # 공통 요청과 기본 검색 훅
    lib/                     # SEO, 사이트 설정, 날짜/기타 유틸
    ui/, styles/, utils/
```

## 변경·생성·삭제 파일 목록

Git rename 판정 기준 총 264개 변경 항목: 수정 14개, 생성 149개, 이동/이름 변경 80개, 삭제 21개.

| 구분 | 경로 | 이동 후 경로 |
| --- | --- | --- |
| 수정 | `README.md` | — |
| 생성 | `docs/structure-audit.md` | — |
| 수정 | `package.json` | — |
| 생성 | `scripts/check-api.mjs` | — |
| 생성 | `scripts/check-structure.mjs` | — |
| 생성 | `src/app/(site)/changelog/[slug]/page.tsx` | — |
| 생성 | `src/app/(site)/changelog/page.tsx` | — |
| 이동/이름 변경 | `src/app/docs/[slug]/page.tsx` | `src/app/(site)/docs/[slug]/page.tsx` |
| 이동/이름 변경 | `src/app/docs/page.tsx` | `src/app/(site)/docs/page.tsx` |
| 이동/이름 변경 | `src/app/example/01/issues/page.tsx` | `src/app/(site)/example/01/issues/page.tsx` |
| 생성 | `src/app/(site)/example/01/layout.tsx` | — |
| 이동/이름 변경 | `src/app/example/01/modals/page.tsx` | `src/app/(site)/example/01/modals/page.tsx` |
| 이동/이름 변경 | `src/app/example/01/page.tsx` | `src/app/(site)/example/01/page.tsx` |
| 이동/이름 변경 | `src/app/example/01/releases/page.tsx` | `src/app/(site)/example/01/releases/page.tsx` |
| 이동/이름 변경 | `src/app/example/01/reviews/page.tsx` | `src/app/(site)/example/01/reviews/page.tsx` |
| 이동/이름 변경 | `src/app/example/01/settings/page.tsx` | `src/app/(site)/example/01/settings/page.tsx` |
| 이동/이름 변경 | `src/app/guide/page.tsx` | `src/app/(site)/guide/page.tsx` |
| 이동/이름 변경 | `src/app/guides/[slug]/page.tsx` | `src/app/(site)/guides/[slug]/page.tsx` |
| 이동/이름 변경 | `src/app/guides/page.tsx` | `src/app/(site)/guides/page.tsx` |
| 생성 | `src/app/(site)/newsletter/[slug]/page.tsx` | — |
| 생성 | `src/app/(site)/newsletter/page.tsx` | — |
| 이동/이름 변경 | `src/app/page.tsx` | `src/app/(site)/page.tsx` |
| 생성 | `src/app/(site)/roadmap/page.tsx` | — |
| 수정 | `src/app/JsonLd.tsx` | — |
| 수정 | `src/app/changelog.md/route.ts` | — |
| 삭제 | `src/app/changelog/[slug]/page.tsx` | — |
| 수정 | `src/app/changelog/feed.xml/route.ts` | — |
| 삭제 | `src/app/changelog/page.tsx` | — |
| 삭제 | `src/app/example/01/layout.tsx` | — |
| 수정 | `src/app/layout.tsx` | — |
| 삭제 | `src/app/newsletter/[slug]/page.tsx` | — |
| 삭제 | `src/app/newsletter/page.tsx` | — |
| 삭제 | `src/app/roadmap/page.tsx` | — |
| 수정 | `src/app/robots.ts` | — |
| 수정 | `src/app/sitemap.ts` | — |
| 생성 | `src/entities/content/constants/content.ts` | — |
| 이동/이름 변경 | `src/content/changelog.json` | `src/entities/content/data/changelog.json` |
| 이동/이름 변경 | `src/content/newsletter.json` | `src/entities/content/data/newsletter.json` |
| 이동/이름 변경 | `src/content/roadmap.json` | `src/entities/content/data/roadmap.json` |
| 생성 | `src/entities/content/index.ts` | — |
| 생성 | `src/entities/content/lib/toMarkdown.ts` | — |
| 이동/이름 변경 | `src/lib/content.ts` | `src/entities/content/model/content.type.ts` |
| 이동/이름 변경 | `src/widgets/content/ChangelogTypeBadge.tsx` | `src/entities/content/ui/ChangelogTypeBadge.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/model/useConfirmModalStore.ts` | `src/features/manageTestModal/model/useConfirmModalStore.ts` |
| 생성 | `src/features/manageTestModal/ui/TestModal.tsx` | — |
| 이동/이름 변경 | `src/widgets/content/ContentSections.tsx` | `src/features/readContent/ui/ContentSections.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/modal/TestModal.tsx` | `src/features/readDocumentation/modal/TestModal.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/model/GuideContext.tsx` | `src/features/readDocumentation/model/GuideContext.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/model/useConfirmModalStore.ts` | `src/features/readDocumentation/model/useConfirmModalStore.ts` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/model/useGuideSectionObserver.ts` | `src/features/readDocumentation/model/useGuideSectionObserver.ts` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/model/useSearch.ts` | `src/features/readDocumentation/model/useSearch.ts` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/Callout.tsx` | `src/features/readDocumentation/ui/Callout.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/CodeBlock.tsx` | `src/features/readDocumentation/ui/CodeBlock.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/CopyBlock.tsx` | `src/features/readDocumentation/ui/CopyBlock.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/CustomSetupBuilder.tsx` | `src/features/readDocumentation/ui/CustomSetupBuilder.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/DocTable.tsx` | `src/features/readDocumentation/ui/DocTable.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/Document.tsx` | `src/features/readDocumentation/ui/Document.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/GuideStep.tsx` | `src/features/readDocumentation/ui/GuideStep.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/GuideTabs.tsx` | `src/features/readDocumentation/ui/GuideTabs.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/MobileNav.tsx` | `src/features/readDocumentation/ui/MobileNav.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/Modal.tsx` | `src/features/readDocumentation/ui/Modal.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/QuickStartHero.tsx` | `src/features/readDocumentation/ui/QuickStartHero.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/Sidebar.tsx` | `src/features/readDocumentation/ui/Sidebar.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/OnThisPage.tsx` | `src/features/readDocumentation/ui/TableOfContents.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/index.ts` | `src/features/readDocumentation/ui/index.ts` |
| 이동/이름 변경 | `src/widgets/example/01/model/dashboardNav.ts` | `src/features/reviewDemo/model/dashboardNav.ts` |
| 이동/이름 변경 | `src/widgets/example/01/model/useModalLabStore.ts` | `src/features/reviewDemo/model/useModalLabStore.ts` |
| 이동/이름 변경 | `src/widgets/example/01/dialogs/CreateIssueModal.tsx` | `src/features/reviewDemo/ui/CreateIssueModal.tsx` |
| 이동/이름 변경 | `src/widgets/example/01/ui/DashboardShell.tsx` | `src/features/reviewDemo/ui/DashboardShell.tsx` |
| 이동/이름 변경 | `src/widgets/example/01/FivePixelsProvider.tsx` | `src/features/reviewDemo/ui/FivePixelsProvider.tsx` |
| 이동/이름 변경 | `src/widgets/example/01/ui/InstallCommand.tsx` | `src/features/reviewDemo/ui/InstallCommand.tsx` |
| 이동/이름 변경 | `src/widgets/example/01/dialogs/ModalLabModals.tsx` | `src/features/reviewDemo/ui/ModalLabModals.tsx` |
| 삭제 | `src/i18n/index.ts` | — |
| 이동/이름 변경 | `src/i18n/en.ts` | `src/shared/i18n/en.ts` |
| 이동/이름 변경 | `src/i18n/example/en.ts` | `src/shared/i18n/example/en.ts` |
| 이동/이름 변경 | `src/i18n/fivepixels/en.ts` | `src/shared/i18n/fivepixels/en.ts` |
| 이동/이름 변경 | `src/i18n/guide/en.ts` | `src/shared/i18n/guide/en.ts` |
| 이동/이름 변경 | `src/i18n/guide/snippets.ts` | `src/shared/i18n/guide/snippets.ts` |
| 이동/이름 변경 | `src/i18n/guide/types.ts` | `src/shared/i18n/guide/types.ts` |
| 생성 | `src/shared/i18n/index.ts` | — |
| 이동/이름 변경 | `src/i18n/landing/types.ts` | `src/shared/i18n/landing/types.ts` |
| 이동/이름 변경 | `src/i18n/layout/en.ts` | `src/shared/i18n/layout/en.ts` |
| 이동/이름 변경 | `src/i18n/types.ts` | `src/shared/i18n/types.ts` |
| 이동/이름 변경 | `src/app/providers/LocaleProvider.tsx` | `src/shared/i18n/useMessages.ts` |
| 생성 | `src/shared/lib/api/client.ts` | — |
| 생성 | `src/shared/lib/api/request.ts` | — |
| 생성 | `src/shared/lib/api/server.ts` | — |
| 생성 | `src/shared/lib/formatContentDate.ts` | — |
| 이동/이름 변경 | `src/widgets/fivepixels/model/useSearch.ts` | `src/shared/lib/hooks/useSearch.ts` |
| 이동/이름 변경 | `src/lib/json-ld.ts` | `src/shared/lib/json-ld.ts` |
| 이동/이름 변경 | `src/lib/seo.ts` | `src/shared/lib/seo.ts` |
| 이동/이름 변경 | `src/lib/site.ts` | `src/shared/lib/site.ts` |
| 이동/이름 변경 | `src/widgets/layout/MaterialIcon.tsx` | `src/shared/ui/MaterialIcon.tsx` |
| 생성 | `src/views/changelog/ChangelogView.tsx` | — |
| 생성 | `src/views/changelog/[slug]/ChangelogDetailView.tsx` | — |
| 생성 | `src/views/docs/[slug]/DocsDetailView.tsx` | — |
| 생성 | `src/views/example/01/Example01View.tsx` | — |
| 생성 | `src/views/example/01/issues/Example01IssuesView.tsx` | — |
| 생성 | `src/views/example/01/modals/Example01ModalsView.tsx` | — |
| 생성 | `src/views/example/01/releases/Example01ReleasesView.tsx` | — |
| 생성 | `src/views/example/01/reviews/Example01ReviewsView.tsx` | — |
| 생성 | `src/views/example/01/settings/Example01SettingsView.tsx` | — |
| 삭제 | `src/views/fivepixels/FivepixelsView.tsx` | — |
| 삭제 | `src/views/fivepixels/guide/FivepixelsGuideView.tsx` | — |
| 생성 | `src/views/guides/GuidesView.tsx` | — |
| 생성 | `src/views/guides/[slug]/GuidesDetailView.tsx` | — |
| 생성 | `src/views/home/HomeView.tsx` | — |
| 생성 | `src/views/newsletter/NewsletterView.tsx` | — |
| 생성 | `src/views/newsletter/[slug]/NewsletterDetailView.tsx` | — |
| 생성 | `src/views/roadmap/RoadmapView.tsx` | — |
| 생성 | `src/widgets/changelog/Panel.tsx` | — |
| 생성 | `src/widgets/changelog/[slug]/Panel.tsx` | — |
| 생성 | `src/widgets/changelog/[slug]/index.ts` | — |
| 생성 | `src/widgets/changelog/[slug]/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/changelog/[slug]/model/useChangelogDetailSearch.ts` | — |
| 생성 | `src/widgets/changelog/[slug]/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/changelog/[slug]/ui/ChangelogArticle.tsx` | — |
| 생성 | `src/widgets/changelog/[slug]/ui/Modal.tsx` | — |
| 생성 | `src/widgets/changelog/[slug]/ui/index.ts` | — |
| 생성 | `src/widgets/changelog/index.ts` | — |
| 생성 | `src/widgets/changelog/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/changelog/model/ChangelogContext.tsx` | — |
| 생성 | `src/widgets/changelog/model/useChangelogFeed.ts` | — |
| 생성 | `src/widgets/changelog/model/useChangelogSearch.ts` | — |
| 생성 | `src/widgets/changelog/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/changelog/ui/ChangelogHeading.tsx` | — |
| 생성 | `src/widgets/changelog/ui/Feed.tsx` | — |
| 생성 | `src/widgets/changelog/ui/Modal.tsx` | — |
| 생성 | `src/widgets/changelog/ui/index.ts` | — |
| 삭제 | `src/widgets/content/ChangelogFeed.tsx` | — |
| 생성 | `src/widgets/docs/[slug]/Panel.tsx` | — |
| 생성 | `src/widgets/docs/[slug]/index.ts` | — |
| 생성 | `src/widgets/docs/[slug]/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/docs/[slug]/model/DocsDetailContext.tsx` | — |
| 생성 | `src/widgets/docs/[slug]/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/docs/[slug]/model/useDocsDetailSearch.ts` | — |
| 생성 | `src/widgets/docs/[slug]/ui/Modal.tsx` | — |
| 생성 | `src/widgets/docs/[slug]/ui/index.ts` | — |
| 생성 | `src/widgets/example/01/Panel.tsx` | — |
| 생성 | `src/widgets/example/01/index.ts` | — |
| 생성 | `src/widgets/example/01/issues/Panel.tsx` | — |
| 생성 | `src/widgets/example/01/issues/index.ts` | — |
| 생성 | `src/widgets/example/01/issues/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/example/01/issues/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/example/01/issues/model/useExample01IssuesSearch.ts` | — |
| 생성 | `src/widgets/example/01/issues/ui/Issues.tsx` | — |
| 이동/이름 변경 | `src/widgets/example/01/ui/ListDemo.tsx` | `src/widgets/example/01/issues/ui/ListDemo.tsx` |
| 생성 | `src/widgets/example/01/issues/ui/Modal.tsx` | — |
| 생성 | `src/widgets/example/01/issues/ui/index.ts` | — |
| 이동/이름 변경 | `src/widgets/example/01/dialogs/TestModal.tsx` | `src/widgets/example/01/modal/TestModal.tsx` |
| 생성 | `src/widgets/example/01/modals/Panel.tsx` | — |
| 생성 | `src/widgets/example/01/modals/index.ts` | — |
| 생성 | `src/widgets/example/01/modals/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/example/01/modals/model/Example01ModalsContext.tsx` | — |
| 생성 | `src/widgets/example/01/modals/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/example/01/modals/model/useExample01ModalsSearch.ts` | — |
| 생성 | `src/widgets/example/01/modals/model/useInlineModal.ts` | — |
| 생성 | `src/widgets/example/01/modals/ui/Modal.tsx` | — |
| 생성 | `src/widgets/example/01/modals/ui/ModalsLab.tsx` | — |
| 생성 | `src/widgets/example/01/modals/ui/index.ts` | — |
| 생성 | `src/widgets/example/01/releases/Panel.tsx` | — |
| 생성 | `src/widgets/example/01/releases/index.ts` | — |
| 생성 | `src/widgets/example/01/releases/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/example/01/releases/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/example/01/releases/model/useExample01ReleasesSearch.ts` | — |
| 생성 | `src/widgets/example/01/releases/ui/Modal.tsx` | — |
| 생성 | `src/widgets/example/01/releases/ui/Releases.tsx` | — |
| 생성 | `src/widgets/example/01/releases/ui/index.ts` | — |
| 생성 | `src/widgets/example/01/reviews/Panel.tsx` | — |
| 생성 | `src/widgets/example/01/reviews/index.ts` | — |
| 생성 | `src/widgets/example/01/reviews/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/example/01/reviews/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/example/01/reviews/model/useExample01ReviewsSearch.ts` | — |
| 생성 | `src/widgets/example/01/reviews/ui/Modal.tsx` | — |
| 생성 | `src/widgets/example/01/reviews/ui/Reviews.tsx` | — |
| 생성 | `src/widgets/example/01/reviews/ui/index.ts` | — |
| 생성 | `src/widgets/example/01/settings/Panel.tsx` | — |
| 생성 | `src/widgets/example/01/settings/index.ts` | — |
| 생성 | `src/widgets/example/01/settings/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/example/01/settings/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/example/01/settings/model/useExample01SettingsSearch.ts` | — |
| 생성 | `src/widgets/example/01/settings/ui/Modal.tsx` | — |
| 생성 | `src/widgets/example/01/settings/ui/Settings.tsx` | — |
| 생성 | `src/widgets/example/01/settings/ui/index.ts` | — |
| 수정 | `src/widgets/example/01/ui/Modal.tsx` | — |
| 생성 | `src/widgets/example/01/ui/Overview.tsx` | — |
| 수정 | `src/widgets/example/01/ui/index.ts` | — |
| 삭제 | `src/widgets/example/01/ui/sections/IssuesContent.tsx` | — |
| 삭제 | `src/widgets/example/01/ui/sections/ModalsLabContent.tsx` | — |
| 삭제 | `src/widgets/example/01/ui/sections/OverviewContent.tsx` | — |
| 삭제 | `src/widgets/example/01/ui/sections/ReleasesContent.tsx` | — |
| 삭제 | `src/widgets/example/01/ui/sections/ReviewsContent.tsx` | — |
| 삭제 | `src/widgets/example/01/ui/sections/SettingsContent.tsx` | — |
| 삭제 | `src/widgets/fivepixels/guide/Panel.tsx` | — |
| 삭제 | `src/widgets/fivepixels/guide/index.ts` | — |
| 삭제 | `src/widgets/fivepixels/guide/ui/Shell.tsx` | — |
| 삭제 | `src/widgets/fivepixels/index.ts` | — |
| 삭제 | `src/widgets/fivepixels/model/FivepixelsContext.tsx` | — |
| 생성 | `src/widgets/guides/Panel.tsx` | — |
| 생성 | `src/widgets/guides/[slug]/Panel.tsx` | — |
| 생성 | `src/widgets/guides/[slug]/index.ts` | — |
| 생성 | `src/widgets/guides/[slug]/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/guides/[slug]/model/GuidesDetailContext.tsx` | — |
| 생성 | `src/widgets/guides/[slug]/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/guides/[slug]/model/useGuidesDetailSearch.ts` | — |
| 생성 | `src/widgets/guides/[slug]/ui/Modal.tsx` | — |
| 생성 | `src/widgets/guides/[slug]/ui/index.ts` | — |
| 생성 | `src/widgets/guides/index.ts` | — |
| 생성 | `src/widgets/guides/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/guides/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/guides/model/useGuidesSearch.ts` | — |
| 이동/이름 변경 | `src/widgets/fivepixels/guide/ui/GuideHome.tsx` | `src/widgets/guides/ui/GuideResources.tsx` |
| 생성 | `src/widgets/guides/ui/Modal.tsx` | — |
| 생성 | `src/widgets/guides/ui/index.ts` | — |
| 이동/이름 변경 | `src/widgets/fivepixels/Panel.tsx` | `src/widgets/home/Panel.tsx` |
| 생성 | `src/widgets/home/index.ts` | — |
| 이동/이름 변경 | `src/widgets/fivepixels/modal/TestModal.tsx` | `src/widgets/home/modal/TestModal.tsx` |
| 생성 | `src/widgets/home/model/HomeContext.tsx` | — |
| 생성 | `src/widgets/home/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/home/model/useSearch.ts` | — |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/AudienceSection.tsx` | `src/widgets/home/ui/AudienceSection.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/CompareSection.tsx` | `src/widgets/home/ui/CompareSection.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/DeveloperReliefSection.tsx` | `src/widgets/home/ui/DeveloperReliefSection.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/FAQSection.tsx` | `src/widgets/home/ui/FAQSection.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/FeatureSection.tsx` | `src/widgets/home/ui/FeatureSection.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/HeroImageSection.tsx` | `src/widgets/home/ui/HeroImageSection.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/HowItWorksSection.tsx` | `src/widgets/home/ui/HowItWorksSection.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/IntroSection.tsx` | `src/widgets/home/ui/IntroSection.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/Modal.tsx` | `src/widgets/home/ui/Modal.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/OpenSourceSection.tsx` | `src/widgets/home/ui/OpenSourceSection.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/PainSection.tsx` | `src/widgets/home/ui/PainSection.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/TitleSection.tsx` | `src/widgets/home/ui/TitleSection.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/UiEditSection.tsx` | `src/widgets/home/ui/UiEditSection.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/WeightWaveText.tsx` | `src/widgets/home/ui/WeightWaveText.tsx` |
| 이동/이름 변경 | `src/widgets/fivepixels/ui/index.ts` | `src/widgets/home/ui/index.ts` |
| 생성 | `src/widgets/layout/Example01Layout.tsx` | — |
| 수정 | `src/widgets/layout/Footer.tsx` | — |
| 수정 | `src/widgets/layout/Header.tsx` | — |
| 수정 | `src/widgets/layout/MegaMenu.tsx` | — |
| 수정 | `src/widgets/layout/SiteBanner.tsx` | — |
| 생성 | `src/widgets/newsletter/Panel.tsx` | — |
| 생성 | `src/widgets/newsletter/[slug]/Panel.tsx` | — |
| 생성 | `src/widgets/newsletter/[slug]/index.ts` | — |
| 생성 | `src/widgets/newsletter/[slug]/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/newsletter/[slug]/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/newsletter/[slug]/model/useNewsletterDetailSearch.ts` | — |
| 생성 | `src/widgets/newsletter/[slug]/ui/Modal.tsx` | — |
| 생성 | `src/widgets/newsletter/[slug]/ui/NewsletterArticle.tsx` | — |
| 생성 | `src/widgets/newsletter/[slug]/ui/index.ts` | — |
| 생성 | `src/widgets/newsletter/index.ts` | — |
| 생성 | `src/widgets/newsletter/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/newsletter/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/newsletter/model/useNewsletterSearch.ts` | — |
| 생성 | `src/widgets/newsletter/ui/Modal.tsx` | — |
| 생성 | `src/widgets/newsletter/ui/Newsletter.tsx` | — |
| 생성 | `src/widgets/newsletter/ui/index.ts` | — |
| 생성 | `src/widgets/roadmap/Panel.tsx` | — |
| 생성 | `src/widgets/roadmap/index.ts` | — |
| 생성 | `src/widgets/roadmap/modal/TestModal.tsx` | — |
| 생성 | `src/widgets/roadmap/model/useConfirmModalStore.ts` | — |
| 생성 | `src/widgets/roadmap/model/useRoadmapSearch.ts` | — |
| 생성 | `src/widgets/roadmap/ui/Modal.tsx` | — |
| 생성 | `src/widgets/roadmap/ui/Roadmap.tsx` | — |
| 생성 | `src/widgets/roadmap/ui/index.ts` | — |
