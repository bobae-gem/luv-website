# LUV WORLD 공식 홈페이지

러브(LUV)의 방송·유튜브 6채널·SNS·공지사항·방송일정을 한 곳에서 보는 공식 허브 사이트입니다.
프레임워크 없이 순수 **HTML / CSS / JavaScript** 로 제작된 정적 사이트예요.

> 마음근력을 키우는 공간, 러브와 함께해요 ♥

---

## 📁 파일 구조

```
luv-website/
├── index.html        # 공식 홈 (브랜드 허브: 유튜브·SNS·콘텐츠·굿즈)
├── live.html         # 방송 홈 (SOOP 라이브·방송일정·방송공지)
├── style.css         # 파스텔 핑크+화이트 / 둥근 카드 / 반응형 (공통)
├── script.js         # ★ 링크·공지·일정·채널 데이터 (여기만 수정)
├── admin/            # ★ Sveltia CMS (GitHub+Netlify 연동 후 사용)
│   ├── index.html    #   CMS 로더 (/admin 으로 접속)
│   └── config.yml    #   CMS 편집 항목 정의
├── admin-mode.js     # 내부 관리자 모드 (#admin 진입, 백업용)
├── admin.html        # 별도 관리자 페이지 (백업용, 여전히 작동)
├── data.json         # 사이트 내용 데이터 (CMS·관리자가 이 파일을 수정)
├── robots.txt        # 검색엔진 크롤링 허용 (admin 숨김)
├── sitemap.xml       # 사이트맵 (공식·방송 홈)
├── netlify.toml      # Netlify 배포 설정
├── .nojekyll         # GitHub Pages 정상 게시용
├── README.md         # 이 문서
├── CMS설계안.md       # CMS 전환 설계 문서
└── assets/           # 이미지 폴더 (로고·프로필·클립 썸네일)
    └── README.txt    # 어떤 이미지를 넣어야 하는지 안내
```

---

## 🖥️ 관리자 모드로 수정하기 (제일 쉬운 방법, 코딩 0)

홈페이지를 **따로 떠나지 않고**, 주소 뒤에 `#admin` 만 붙이면 관리 패널이 열려요.

### 사용 순서
1. 브라우저 주소창에서 사이트 주소 뒤에 **`#admin`** 을 붙여 들어갑니다.
   - 로컬: `http://localhost:8090/#admin`
   - 인터넷 배포 후: `https://(내사이트주소)/#admin`
2. **비밀번호**를 입력하면 오른쪽에 **관리 패널**이 열립니다.
   - 기본 비밀번호: **`luv2026`**
3. 패널에서 **링크 · 공지사항 · 방송일정 · 최신클립 · 팬공간 · 굿즈/후원**을 고치거나,
   **+ 항목 추가** / **✕ 삭제** 버튼으로 항목을 늘리고 줄입니다.
4. 맨 아래 **💾 data.json 다운로드** 버튼을 누르면 `data.json` 파일이 받아집니다.
5. 그 **`data.json` 파일을 `luv-website` 폴더에 넣습니다.** (기존 파일 덮어쓰기)
6. 사이트를 새로고침(F5)하면 바뀐 내용이 보여요.

> 작성 중 내용은 **자동으로 임시저장**돼요 — 실수로 새로고침해도 다시 들어오면 이어서 작업할 수 있어요.
> 처음부터 다시 하려면 패널의 **임시저장 비우기** 를 누르세요.
> (콘텐츠 카드·유튜브 채널·SNS는 이 패널에 없지만, 저장 시 기존 값이 그대로 보존돼요.)

### 🔑 비밀번호 바꾸기 / ⚠️ 편의용 잠금
- 비밀번호는 **`admin-mode.js` 맨 위 `ADMIN_PASS = "luv2026"`** 에서 바꾸면 됩니다.
- ⚠️ 이 비밀번호는 **"편의용 잠금"** 이에요. 코드(소스)를 볼 줄 아는 사람은 비밀번호를 알아낼 수 있어
  진짜 보안은 아닙니다. 남에게 `#admin` 주소·비번을 알려주지 않는 선에서 "실수 방지용"으로 쓰세요.
  **진짜 로그인 잠금은 추후 Sveltia CMS 단계**에서 생깁니다. (`CMS설계안.md` 참고)

### ⚠️ 자동반영이 아니에요 (중요)
- 관리 패널에서 저장(다운로드)한다고 **인터넷 사이트가 저절로 바뀌지 않아요.**
- 받은 `data.json` 을 **폴더에 덮어쓰고**(로컬) 새로고침해야 보이고,
- **인터넷 반영은** 그 폴더를 **Netlify에 다시 드래그&드롭**해야 합니다.
- 즉 흐름은 항상 **수정 → data.json 다운로드 → 폴더 덮어쓰기 → (인터넷이면) 재배포** 예요.

### 🙈 일반 방문자에게는 안 보여요
- `#admin` 을 붙이지 않으면 관리 버튼·패널이 **전혀 나타나지 않아요.**
- 일반 방문자는 평범한 홈페이지만 봅니다.

### (참고) admin.html 도 그대로 작동
- 예전 방식인 별도 페이지 **`admin.html`** 도 여전히 쓸 수 있어요(9개 항목 전부 편집).
  내부 관리자 모드(`#admin`)와 사용법·결과(`data.json` 다운로드)는 동일합니다.

---

## ✏️ 내용 수정 방법 — 코드로 직접 (코딩 몰라도 OK)

> 관리자 화면 대신 파일을 직접 고치고 싶을 때 보는 방법이에요.

모든 내용은 **`script.js` 한 파일**에서 관리됩니다. HTML은 건드릴 필요가 없어요.

### 1) 링크 바꾸기 — `LINKS` 객체
파일 맨 위 `LINKS` 에서 `"#"` 를 실제 주소로 바꾸면, 사이트의 모든 관련 버튼에 자동 반영됩니다.

```js
const LINKS = {
  soopLive:    "#",   // SOOP 방송 링크
  ytLuv:       "#",   // LUV 유튜브 (메인 채널)
  ytNight:     "#",   // LUV NIGHT 유튜브
  // ... 생략
};
```

예) `soopLive: "https://www.sooplive.co.kr/내채널",`

| 구분 | 키 |
|------|-----|
| 방송(SOOP) | `soopLive` |
| 유튜브 6채널 | `ytLuv` `ytNight` `ytLittleluv` `ytDance` `ytAi` `ytBgm` |
| SNS | `tiktok` `instagram` `xiaohongshu` `naverBlog` `fanCafe` `kakao` |
| 굿즈·후원 | `goods` `donate` |
| 문의 | `email` |

### 2) 공지사항 바꾸기 — `NOTICES` 배열
### 3) 방송일정 바꾸기 — `SCHEDULE` 배열
### 4) 최신 클립 바꾸기 — `CLIPS` 배열

각 배열에 항목을 추가/삭제하면 화면에 바로 반영됩니다.

---

## 🖼️ 이미지 넣기

`assets/` 폴더에 아래 이름으로 이미지를 넣으면 자동 표시됩니다.
**없어도 사이트는 깨지지 않고** 귀여운 이모지 placeholder가 대신 나옵니다.

- `logo.png`, `profile-luv.png` ~ `profile-bgm.png`, `clip-1.png` ~ `clip-3.png`
- `og-image.png` (1200×630, SNS 공유 썸네일 — 선택)
- `favicon.png` (탭 아이콘 직접 쓸 때 — 선택, 기본은 인라인 하트 아이콘)

자세한 규격은 `assets/README.txt` 참고.

---

## 🚀 배포 방법

> 빌드 과정이 없는 정적 사이트라 **파일만 올리면 바로 배포**됩니다.

### 방법 A — Netlify 드래그&드롭 (첫 배포 추천, 코딩 0)

> 준비물: `luv-website` 폴더 하나면 끝. 회원가입 외에 설치할 것 없음.

**1단계. Netlify 가입 (무료)**
- 브라우저에서 [app.netlify.com](https://app.netlify.com) 접속 → **Sign up**
- 이메일 또는 GitHub 계정으로 가입 (둘 중 편한 것)

**2단계. 드래그&드롭 화면 열기**
- 로그인하면 나오는 화면에서 상단 **Sites** 탭 클릭
- 화면 아래쪽에 점선 박스가 보임:
  *"Drag and drop your site output folder here"* (또는 **Add new site → Deploy manually**)

**3단계. 폴더를 통째로 끌어다 놓기**
- 파일 탐색기에서 `C:\Users\user\Desktop\클로드\luv-website` **폴더 자체**를 선택
- 점선 박스 위로 **드래그&드롭**
- ⚠️ 주의: 폴더 *안의 파일들*을 따로 올리지 말고, **`luv-website` 폴더 통째로** 올리세요.
  (index.html이 최상단에 있어야 하므로 폴더째 올리는 게 안전합니다.)

**4단계. 자동 배포 (몇 초~1분)**
- 업로드가 끝나면 Netlify가 알아서 게시합니다. (빌드 과정 없음)
- `netlify.toml` 이 함께 올라가 보안 헤더까지 자동 적용됩니다.

**5단계. 주소 확인**
- `https://(랜덤이름).netlify.app` 형태의 주소가 생깁니다.
- **Site settings → Change site name** 에서 `랜덤이름` 을 원하는 이름으로 바꿀 수 있어요.
  예: `luvworld` → `https://luvworld.netlify.app`

**6단계. (배포 후) 임시주소를 실제주소로 교체**
- 위에서 받은 실제 주소를 아래 "⚙️ 배포 후 꼭 바꿀 것" 의 **3곳**에 반영하고,
  그 폴더를 다시 같은 박스에 드래그&드롭하면 갱신됩니다.

**다음 배포(수정 후 재업로드)**
- 내용을 고친 뒤 같은 사이트의 **Deploys** 탭에 `luv-website` 폴더를 다시 드래그&드롭하면 끝.
- 또는 나중에 GitHub 연결로 바꾸면 push만 해도 자동 배포됩니다.

### 방법 B — GitHub Pages
1. GitHub에 새 저장소를 만들고 이 폴더 내용을 push
2. 저장소 **Settings → Pages → Branch: `main` / `/ (root)`** 선택 후 Save
3. `.nojekyll` 파일이 있어 `assets` 등 모든 파일이 정상 게시됩니다.
4. `https://(아이디).github.io/(저장소명)/` 주소로 열립니다.

✅ **두 방식 모두 현재 상태로 배포 가능합니다.**

---

## ⚙️ 배포 후 꼭 바꿀 것 — 실제 도메인 반영

도메인(또는 배포 주소)이 정해지면, 아래 **3개 파일**의 임시 주소
`https://luv-world.netlify.app` 를 실제 주소로 바꿔주세요. (현재 줄 번호 기준)

1. **`index.html`** — 2곳
   - 15번째 줄: `<link rel="canonical" href="...">`
   - 29번째 줄: `<meta property="og:url" content="...">`
2. **`robots.txt`** — 7번째 줄: `Sitemap: .../sitemap.xml`
3. **`sitemap.xml`** — 9번째 줄: `<loc>...</loc>`

> 💡 팁: 메모장으로 열어 `luv-world.netlify.app` 를 **찾기→모두 바꾸기**(Ctrl+H)로
> 새 주소로 한 번에 바꾸면 가장 빠릅니다. (이 README 파일의 안내문 줄은 안 바꿔도 됩니다.)

---

## 🔄 자동반영 CMS (Sveltia) — ⚠️ GitHub + Netlify 연동 후 사용 가능

화면에서 수정 → 저장하면 **인터넷 사이트에 자동 반영**되는 관리자예요.
**CMS 파일은 이미 준비돼 있어요** (`admin/index.html`, `admin/config.yml`).
다만 ⚠️ **GitHub + Netlify 연동을 마쳐야 실제로 로그인·저장이 작동합니다.**
(지금은 준비만 된 상태 — 로컬에서는 아직 안 됨)

### 준비된 것 (0단계 완료)
- `admin/index.html` — `/admin` 으로 접속하면 뜨는 Sveltia 관리자 화면
- `admin/config.yml` — 편집 항목 정의 (아래 10개, `data.json` 구조 그대로)
  - LINKS · OFFICIAL_NOTICES · LIVE_NOTICES · SCHEDULE · CONTENTS · CHANNELS · SNS · CLIPS · FAN · SUPPORT

### 실제로 켜려면 (다음 단계)
1. **GitHub** 가입 → 저장소 생성 → `luv-website` 업로드
2. **Netlify** 를 드래그&드롭 → **GitHub 연동 배포**로 전환
3. `admin/config.yml` 의 `backend.repo` 를 **실제 저장소(예: 내아이디/luv-website)** 로 교체
4. **GitHub 로그인** 연결 (관리자 잠금)
5. `사이트주소/admin` 접속 → 로그인 → 수정 → 저장 → 자동 반영 확인

### 그러면
`/admin` 에서 수정 → 저장 → Sveltia가 `data.json`을 GitHub에 자동 커밋 →
Netlify가 자동 재배포 → **인터넷 사이트에 자동 반영**됩니다.
본문(`script.js`)은 `data.json`을 읽게 되어 있어 **바꿀 필요가 없어요.**

> 비용: Sveltia·GitHub·Netlify 무료 (추가 비용 0).
> 기존 `admin.html` / `#admin` 방식은 **백업용으로 그대로 남겨뒀어요.**
> 진행하려면 "CMS 연동 시작" 이라고 말씀해 주세요 — GitHub 가입부터 함께 진행합니다.

---

## 🔍 로컬에서 미리보기

```powershell
# 이 폴더에서 실행 (Python 설치돼 있으면)
python -m http.server 8090
```
브라우저에서 `http://localhost:8090` 접속.

---

## 🧱 기술 메모

- 의존성 0 (외부 라이브러리 없음), 비용 0
- 폰트만 Google Fonts CDN 사용 (Jua, Gowun Dodum, Poppins)
- 모바일 우선 반응형 — 390px / 1440px 기준 최적화
- 링크는 **전부 `script.js` 의 `LINKS` 객체에서만 관리** (HTML에 URL 직접 작성 안 함)

Copyright © 2026 LUV. All rights reserved.
