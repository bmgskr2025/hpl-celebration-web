# 허벌라이프 프리미어 리그 셀러브레이션 사이트

허벌라이프 디스트리뷰터의 허벌라이프 프리미어 리그(HPL) 자격 취득을 축하하는 웹사이트입니다.

## 페이지 구성

| 페이지 | 파일 | 설명 |
|--------|------|------|
| 축하의 벽 | `index.html` | 월별 자격취득자 이름·팀위치를 티어별(트리플/더블/자격취득자)로 소개 |
| 인증서 다운로드 | `certificate.html` | 이름 입력 → 공식 인증서 PNG/PDF 다운로드 |
| 레커니션 플라이어 | `flyer.html` | 다운라인 사진·이름을 넣어 감사 플라이어 제작 (템플릿 3종) |
| 사이트 소개 | `about.html` | 비개발자·관리자용 안내 — 비용(0원)·개인정보·브랜드 규정·운영 방법 FAQ |

## 프라이버시

- 서버·데이터베이스·로그인이 없는 **순수 정적 사이트**입니다.
- 인증서 이름, 플라이어 사진·이름은 **사용자 브라우저 안에서만 처리**되며 어디에도 저장·전송되지 않습니다.
- 사이트에 게시되는 정보는 `data/qualifiers.json`에 적힌 월별 자격취득자 명단(이름·팀위치)뿐입니다.

## 월별 명단 업데이트 방법 (비개발자용)

1. GitHub에서 `data/qualifiers.json` 파일을 엽니다
2. 연필 아이콘(Edit)을 눌러 아래 형식으로 월을 추가합니다 (최신 월을 **맨 위에**):

```json
{
  "id": "2026-07",
  "label": "2026년 7월",
  "qualifiers": [
    { "name": "홍길동", "team": "월드팀", "tier": "first" },
    { "name": "김철수 & 이영희", "team": "프레지던트팀", "tier": "triple" }
  ]
}
```

- `team`: `프레지던트팀` / `밀리어네어팀` / `글로벌 익스팬션팀` / `월드팀` / `에스피`
- `tier`: `first`(첫 취득) / `double`(2회) / `triple`(3년 연속)

3. **Commit changes**를 누르면 잠시 후 사이트에 반영됩니다

또는 Claude 채팅에 "7월 명단이야: …"라고 붙여넣으면 대신 반영해 드립니다.

## 브랜드

- 색상·폰트는 Herbalife Brand Book(`brand/`)을 따릅니다
  (Garden Green `#007044`, Night Sky `#101921`, Laguna Light `#B1E4F1`, 한국어는 Noto Sans 사용 규정)
- 원본 디자인 에셋: `brand/`(브랜드 북·로고), `assets/`(인증서 배경·HPL 배지 등 추출본)

## 호스팅 (GitHub Pages)

저장소 **Settings → Pages → Build and deployment**에서
Source: *Deploy from a branch*, Branch: 배포할 브랜치 + `/ (root)` 선택.
몇 분 후 `https://<계정명>.github.io/hpl-celebration-web/` 주소로 접속할 수 있습니다.
