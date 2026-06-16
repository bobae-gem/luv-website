/* =========================================================
   LUV WORLD — script.js
   ========================================================= */

/* █████████████████████████████████████████████████████████
   ███  운영자가 자주 바꾸는 영역 (여기만 고치면 됩니다)  ███
   █████████████████████████████████████████████████████████
   아래 1~9 번만 수정하면 사이트 내용이 바뀝니다.
   이 영역 아래쪽(렌더링 로직)은 건드리지 마세요.

   ▣ 공통 규칙 (처음 보셔도 따라 하기 쉬워요)
     · 한 줄(항목)은  { ... },  형태예요. 줄 끝의 쉼표(,)를 꼭 남겨두세요.
     · 글자는 반드시 큰따옴표 "이렇게" 감싸요.
     · 항목을 추가하려면 → 비슷한 줄 하나를 복사해서 아래에 붙여넣고 내용만 바꾸세요.
     · 항목을 빼려면 → 그 줄 하나를 통째로 지우세요.
     · 저장한 뒤 브라우저 새로고침(F5) 하면 바로 반영돼요.

   목차
     1) LINKS     — 모든 버튼의 링크(주소)
     2) NOTICES   — 공지사항
     3) SCHEDULE  — 방송일정(캘린더)
     4) CONTENTS  — LUV CONTENT 카드
     5) CHANNELS  — 유튜브 채널 카드
     6) SNS       — SNS 링크
     7) CLIPS     — 최신 클립(최근 영상)
     8) FAN       — 팬공간
     9) SUPPORT   — 굿즈/후원
   ========================================================= */


/* =========================================================
   1) LINKS — 모든 버튼의 링크(주소) 관리

   ▣ 링크 교체 방법
     · 큰따옴표 안의 "#" 를 실제 주소로 바꾸기만 하면 됩니다.
       예) soopLive: "https://www.sooplive.co.kr/내채널",
     · 한 곳만 고치면 사이트의 관련된 모든 버튼에 자동 반영돼요.
     · 아직 주소가 없으면 "#" 그대로 두세요 (버튼이 동작만 안 할 뿐 깨지지 않음).
     · HTML 파일에는 주소를 절대 쓰지 마세요 — 링크는 전부 여기서만 관리합니다.
   ========================================================= */
let LINKS = {

  /* ── 방송 ─────────────────────────────────────── */
  soopLive:    "#",   // SOOP 방송 링크 (러브 라이브 방송)

  /* ── YouTube 채널 (6개) ───────────────────────── */
  ytLuv:       "#",   // LUV 유튜브 (메인 채널)
  ytNight:     "#",   // LUV NIGHT 유튜브 (마음근력 힐링 토크)
  ytLittleluv: "#",   // LITTLE LUV 유튜브 (육아 & 일상)
  ytDance:     "#",   // LUV DANCE 유튜브 (댄스 & 챌린지)
  ytAi:        "#",   // LUV AI 유튜브 (AI 프로젝트 & 자동화)
  ytBgm:       "#",   // LUV BGM 유튜브 (음악 & 플레이리스트)

  /* ── SNS ──────────────────────────────────────── */
  tiktok:      "#",   // TikTok
  instagram:   "#",   // Instagram
  xiaohongshu: "#",   // 샤오홍슈 (小红书)
  kakao:       "#",   // 카카오톡 채널 (향후 사용)
  fanCafe:     "#",   // 팬카페 (푸터·공지에서 사용)

  /* ── 굿즈 / 후원 ──────────────────────────────── */
  goods:       "#",   // 굿즈 (LUV 공식 굿즈샵)
  donate:      "#",   // 후원 (후원 페이지)

  /* ── 기타 ─────────────────────────────────────── */
  email:       "mailto:171_lini@naver.com",   // 문의 이메일
};


/* =========================================================
   2) NOTICES — 공지사항 (히어로 오른쪽 공지 카드)

   · 공지는 두 종류로 나뉩니다:
       OFFICIAL_NOTICES = 공식 홈페이지(index.html) 공지 — 유튜브·채널·브랜드·굿즈
       LIVE_NOTICES     = 방송 홈페이지(live.html) 공지 — 방송·휴방·일정변경·시청자참여
     · 각 항목 형식: { type: "...", label: "배지글자", text: "내용", link: "#" }
     · type 은 필터·배지색을 정해요.
       공식: youtube / brand / event / update
       방송: soop / rest(휴방) / change(일정변경) / viewer(시청자참여)
   ========================================================= */

/* (가) 공식 홈 공지 */
let OFFICIAL_NOTICES = [
  { type: "youtube", label: "YouTube", text: "LUV NIGHT 새 영상 업로드", link: LINKS.ytNight },
  { type: "event",   label: "이벤트",  text: "팬카페 오픈 이벤트 안내",   link: LINKS.fanCafe },
];
const OFFICIAL_NOTICE_FILTERS = [
  { key: "all",     label: "전체" },
  { key: "youtube", label: "YouTube" },
  { key: "event",   label: "이벤트" },
];

/* (나) 방송 홈 공지 — 방송공지 / 컨텐츠공지 */
let LIVE_NOTICES = [
  { type: "broadcast", label: "방송공지",  text: "6월 28일, 방송으로 돌아옵니다! 오랜만에 만나요 ♥", link: LINKS.soopLive },
  { type: "content",   label: "컨텐츠공지", text: "앞으로 콘텐츠에 관련된 공지들은 여기에 올릴 예정입니다.",   link: "#" },
];
const LIVE_NOTICE_FILTERS = [
  { key: "all",       label: "전체" },
  { key: "broadcast", label: "방송공지" },
  { key: "content",   label: "컨텐츠공지" },
];


/* =========================================================
   3) SCHEDULE — 방송일정 (캘린더 + 히어로 요약이 함께 사용)

   ▣ 방송일정 추가 방법
     · 아래 줄 하나를 복사해서 붙여넣고 내용만 바꾸세요.
       { date: "2026-07-05", time: "20:00", title: "방송 제목", type: "live" },
     · date  = 날짜 "YYYY-MM-DD" 형식 (요일은 자동으로 계산돼요)
     · time  = 시작 시간
     · title = 방송 제목
     · type  = "live"(SOOP 방송, 분홍점) 또는 "youtube"(유튜브, 보라점)
     · 캘린더에서 날짜를 누르면 그 날 일정이 아래에 보여요.
   ========================================================= */
let SCHEDULE = [
  { date: "2026-06-28", time: "",         title: "방송 복귀", type: "live" },
  { date: "2026-06-29", time: "AM 10:00", title: "방송",      type: "live" },
  { date: "2026-06-30", time: "AM 10:00", title: "방송",      type: "live" },
];


/* =========================================================
   4) CONTENTS — LUV CONTENT (가로로 넘기는 카드 6개)

   ▣ 카드 내용 바꾸는 방법
     · desc(설명), platform(플랫폼 라벨), link(누르면 갈 곳)만 바꾸면 돼요.
     · btn  = 버튼 글자. 안 적으면 기본 "바로가기 →" 가 표시됩니다.
     · accent/soft = 카드 색(고급 설정). 색을 바꾸고 싶을 때만 손대세요.
   ========================================================= */
let CONTENTS = [
  { emoji: "♥",  name: "LUV",        desc: "종합 라이브 방송",     platform: "SOOP LIVE", link: LINKS.soopLive,  btn: "오늘의 콘텐츠 보러가기", accent: "#ff5f8f", soft: "#ffe1ea" },
  { emoji: "🌙", name: "LUV NIGHT",  desc: "마음근력 힐링 토크",   platform: "YouTube",   link: LINKS.ytNight,   accent: "#9a7bd6", soft: "#ece1fb" },
  { emoji: "👶", name: "LITTLE LUV", desc: "육아 & 일상 이야기",   platform: "YouTube",   link: LINKS.ytLittleluv, accent: "#ff9f68", soft: "#ffe9d6" },
  { emoji: "💃", name: "LUV DANCE",  desc: "댄스 & 챌린지",        platform: "YouTube",   link: LINKS.ytDance,   accent: "#ff5fb0", soft: "#ffe1f1" },
  { emoji: "🤖", name: "LUV AI",     desc: "AI 프로젝트 & 자동화", platform: "YouTube",   link: LINKS.ytAi,      accent: "#4cb8d6", soft: "#d6f0f8" },
  { emoji: "🎵", name: "LUV BGM",    desc: "음악 & 플레이리스트",  platform: "YouTube",   link: LINKS.ytBgm,     accent: "#5fc79a", soft: "#d6f5e7" },
];


/* =========================================================
   5) CHANNELS — 유튜브 채널 프로필 카드 6개

   ▣ 채널 정보 바꾸는 방법
     · desc(한 줄 설명)와 link 만 바꾸면 돼요.
     · img = 프로필 사진 경로. assets 폴더에 사진을 넣으면 자동 표시,
             없으면 이모지가 대신 나와요(깨지지 않음).
   ========================================================= */
let CHANNELS = [
  { emoji: "♥",  name: "LUV",        img: "assets/ch-luv.png",    desc: "러브의 메인 채널",   link: LINKS.ytLuv },
  { emoji: "🌙", name: "LUV NIGHT",  img: "assets/ch-night.png",  desc: "마음근력 힐링 토크", link: LINKS.ytNight },
  { emoji: "👶", name: "LITTLE LUV", img: "assets/ch-little.png", desc: "육아 & 일상 이야기", link: LINKS.ytLittleluv },
  { emoji: "💃", name: "LUV DANCE",  img: "assets/ch-dance.png",  desc: "댄스 & 챌린지",      link: LINKS.ytDance },
  { emoji: "🤖", name: "LUV AI",     img: "assets/ch-ai.png",     desc: "함께 AI 배우기",     link: LINKS.ytAi },
  { emoji: "🎵", name: "LUV BGM",    img: "assets/ch-bgm.png",    desc: "음악 & 플레이리스트", link: LINKS.ytBgm },
];


/* =========================================================
   6) SNS — SNS 링크 버튼

   ▣ SNS 추가/삭제 방법
     · 추가: 아래 줄 하나를 복사해서 붙여넣고 바꾸세요.
       { icon: "🎵", label: "이름", link: LINKS.항목, color: "#색상" },
     · 삭제: 그 줄 하나를 통째로 지우세요.
     · 새 SNS 라면 1) LINKS 에 항목을 먼저 추가한 뒤 여기서 link 로 연결하세요.
   ========================================================= */
let SNS = [
  { icon: "🎵", label: "TikTok",     link: LINKS.tiktok,      color: "#222" },
  { icon: "📷", label: "Instagram",  link: LINKS.instagram,   color: "#e1407a" },
  { icon: "📕", label: "샤오홍슈",    link: LINKS.xiaohongshu, color: "#ff2442" },
  { icon: "💬", label: "카카오톡 채널", link: LINKS.kakao,     color: "#f5c000" },
];


/* =========================================================
   7) CLIPS — 최신 클립 (최근 영상 카드 3개)

   ▣ 최근 영상 교체 방법
     · title(제목), views(조회수), duration(영상 길이), link 를 바꾸세요.
     · img = 썸네일 경로. assets 폴더에 clip-1~3.png 를 넣으면 표시,
             없으면 분홍 placeholder 가 나와요(깨지지 않음).
   ========================================================= */
let CLIPS = [
  { img: "assets/clip-1.png", title: "무너졌던 밤, 다시 일어선 이야기", views: "조회수 1.2만회", duration: "08:14", link: LINKS.ytNight },
  { img: "assets/clip-2.png", title: "오늘의 육아 브이로그 — 작은 행복", views: "조회수 8.6천회", duration: "12:03", link: LINKS.ytLittleluv },
  { img: "assets/clip-3.png", title: "스타 명경기 하이라이트 모음",     views: "조회수 3.4만회", duration: "05:47", link: LINKS.soopLive },
];


/* =========================================================
   8) FAN — 팬공간 (현재 준비중)

   ▣ 팬공간 활성화 방법
     · 준비가 되면 ready 를 false → true 로 바꾸고 link 에 주소를 넣으세요.
       예) { emoji: "📝", title: "팬 게시판", desc: "...", ready: true, link: "https://..." },
     · ready: true 가 되면 "준비중" 대신 "바로가기 →" 버튼이 생깁니다.
     · 카드를 더 만들려면 줄 하나를 복사해 붙여넣으세요.
   ========================================================= */
let FAN = [
  { emoji: "📝", title: "팬 게시판",     desc: "러브에게 남기는 한마디를 모을 공간이에요.", ready: false, link: "#" },
  { emoji: "🎨", title: "팬아트 갤러리", desc: "팬들이 그린 러브를 함께 감상하는 공간이에요.", ready: false, link: "#" },
];


/* =========================================================
   9) SUPPORT — 굿즈 / 후원 카드 2개

   ▣ 굿즈·후원 바꾸는 방법
     · title(제목), desc(설명), btn(버튼 글자), link 를 바꾸세요.
     · link 는 1) LINKS 의 goods / donate 를 그대로 쓰면 됩니다.
     · mod 는 카드 색 종류("goods" 또는 "donate") — 보통 그대로 두세요.
   ========================================================= */
let SUPPORT = [
  { mod: "goods",  emoji: "🛍️", title: "LUV 공식 굿즈", desc: "준비중입니다", btn: "준비중", link: LINKS.goods },
  { mod: "donate", emoji: "💝", title: "LUV 후원하기",   desc: "준비중입니다", btn: "준비중", link: LINKS.donate },
];


/* =========================================================
   10) SIGDANCE — 시그댄스 (엔돌핀이 출 수 있는 춤 목록)
   · 방송 홈(live.html)에만 표시돼요.
   · 항목 추가: { emoji: "💃", name: "춤 이름", desc: "설명(선택)" },
   ========================================================= */
let SIGDANCE = [
  { emoji: "💃", name: "여기에 춤 이름", desc: "(주인님이 목록을 주시면 채울게요)" },
];

/* =========================================================
   ▼▼▼ 아래는 렌더링 로직 — 보통 수정할 필요 없어요 ▼▼▼
   ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const el = (tag, cls) => { const n = document.createElement(tag); if (cls) n.className = cls; return n; };

/* 이미지 로드 실패 시 이모지 placeholder */
function imgWithFallback(src, alt, cls, emoji) {
  const img = el("img", cls);
  img.src = src; img.alt = alt; img.loading = "lazy";
  img.addEventListener("error", () => {
    img.classList.add("img-fallback");
    img.dataset.emoji = emoji;
    img.removeAttribute("src");
  });
  return img;
}

/* ---- 공지 (공식/방송 공용 렌더) ---- */
const noticeState = { official: "all", live: "all" };

function renderNotices(which) {
  const isOfficial = which === "official";
  const notices = isOfficial ? OFFICIAL_NOTICES : LIVE_NOTICES;
  const filters = isOfficial ? OFFICIAL_NOTICE_FILTERS : LIVE_NOTICE_FILTERS;
  const box = $(isOfficial ? "#officialNotice" : "#liveNotice");
  if (!box) return;
  const fbox = $(isOfficial ? "#officialNoticeFilters" : "#liveNoticeFilters");
  const cur = noticeState[which];

  if (fbox) {
    fbox.innerHTML = "";
    filters.forEach((f) => {
      const b = el("button", "notice-filter");
      b.type = "button";
      b.textContent = f.label;
      if (f.key === cur) b.classList.add("active");
      b.addEventListener("click", () => { noticeState[which] = f.key; renderNotices(which); });
      fbox.appendChild(b);
    });
  }

  box.innerHTML = "";
  const list = cur === "all" ? notices : notices.filter((n) => n.type === cur);
  if (!list.length) {
    const li = el("li", "notice-empty");
    li.textContent = "해당 분류의 공지가 아직 없어요.";
    box.appendChild(li);
    return;
  }
  list.forEach((n) => {
    const li = el("li");
    const a = el("a"); a.href = n.link; applyExternal(a, n.link);
    const badge = el("span", `notice-badge badge-${n.type || "update"}`);
    badge.textContent = n.label || "공지";
    a.append(badge, document.createTextNode(n.text));
    li.appendChild(a); box.appendChild(li);
  });
}

/* ---- 오늘 방송 위젯 (공식 홈) ---- */
function renderTodayLive() {
  const box = $("#todayLive");
  if (!box) return;
  box.innerHTML = "";
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const sorted = [...SCHEDULE].sort((a, b) => (a.date < b.date ? -1 : 1));
  const todays = sorted.filter((s) => s.date === todayStr);
  const next = sorted.find((s) => s.date >= todayStr);
  const label = el("span", "today-live-label");
  const text = el("span", "today-live-text");
  if (todays.length) {
    const t = todays[0];
    label.textContent = "오늘 방송";
    text.textContent = t.time ? `${t.time} · ${t.title}` : t.title;
  } else if (next) {
    const d = toDate(next.date);
    const md = `${d.getMonth() + 1}.${d.getDate()}(${WEEKDAYS[d.getDay()]})`;
    label.textContent = "다음 방송";
    text.textContent = next.time ? `${md} ${next.time} · ${next.title}` : `${md} · ${next.title}`;
  } else {
    label.textContent = "방송 안내";
    text.textContent = "예정된 방송이 곧 올라와요";
  }
  box.append(label, text);
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/* "YYYY-MM-DD" → Date (로컬 자정 기준) */
function toDate(dateStr) { return new Date(dateStr + "T00:00:00"); }

function renderSchedule() {
  const box = $("#heroSchedule");
  if (!box) return;
  // 다가오는 일정 순으로 정렬해서 최대 4개만 요약 표시
  const upcoming = [...SCHEDULE].sort((a, b) => (a.date < b.date ? -1 : 1)).slice(0, 4);
  upcoming.forEach((s) => {
    const dObj = toDate(s.date);
    const md = `${String(dObj.getMonth() + 1).padStart(2, "0")}.${String(dObj.getDate()).padStart(2, "0")}`;
    const li = el("li");
    const d = el("span", "sch-date"); d.textContent = `${md} ${WEEKDAYS[dObj.getDay()]}`;
    const tm = el("span", "sch-time"); tm.textContent = s.time;
    const ti = el("span", "sch-title"); ti.textContent = s.title;
    li.append(d, tm, ti); box.appendChild(li);
  });
}

/* ---- LUV CONTENT ---- */
function renderContents() {
  const box = $("#contentCards");
  if (!box) return;
  CONTENTS.forEach((c) => {
    const card = el("article", "content-card reveal");
    card.style.setProperty("--card-accent", c.accent);
    card.style.setProperty("--card-soft", c.soft);
    const emoji = el("div", "content-emoji"); emoji.textContent = c.emoji;
    const h = el("h3"); h.textContent = c.name;
    const pf = el("span", "content-platform"); pf.textContent = c.platform;
    const p = el("p"); p.textContent = c.desc;
    const a = el("a", "card-btn"); a.href = c.link; a.textContent = c.btn || "바로가기 →";
    applyExternal(a, c.link);
    card.append(emoji, h, pf, p, a); box.appendChild(card);
  });
}

/* ---- YouTube Channels ---- */
function renderChannels() {
  const box = $("#channelCards");
  if (!box) return;
  CHANNELS.forEach((c) => {
    const card = el("article", "channel-card reveal");
    const avatar = imgWithFallback(c.img, `${c.name} 채널`, "channel-avatar", c.emoji);
    const h = el("h3"); h.textContent = c.name;
    const p = el("p"); p.textContent = c.desc;
    const a = el("a", "channel-btn"); a.href = c.link; a.textContent = "▶ 바로가기";
    applyExternal(a, c.link);
    card.append(avatar, h, p, a); box.appendChild(card);
  });
}

/* ---- SNS ---- */
function renderSns() {
  const box = $("#snsCards");
  if (!box) return;
  SNS.forEach((s) => {
    const a = el("a", "sns-card reveal"); a.href = s.link;
    applyExternal(a, s.link);
    const ic = el("span", "sns-icon"); ic.textContent = s.icon;
    ic.style.setProperty("--sns-color", s.color);
    const lb = el("span", "sns-label"); lb.textContent = s.label;
    a.append(ic, lb); box.appendChild(a);
  });
}

/* ---- Latest Clip ---- */
function renderClips() {
  const box = $("#clipCards");
  if (!box) return;
  CLIPS.forEach((c) => {
    const card = el("article", "clip-card reveal");
    const a = el("a"); a.href = c.link; applyExternal(a, c.link);
    const thumb = el("div", "clip-thumb");
    const img = imgWithFallback(c.img, c.title, "clip-thumb", "🎬");
    const dur = el("span", "clip-duration"); dur.textContent = c.duration;
    const play = el("span", "clip-play"); play.textContent = "▶";
    thumb.append(img, play, dur);
    const body = el("div", "clip-body");
    const h = el("h3"); h.textContent = c.title;
    const v = el("span", "clip-views"); v.textContent = c.views;
    body.append(h, v);
    a.append(thumb, body); card.appendChild(a); box.appendChild(card);
  });
}

/* ---- 굿즈 / 후원 ---- */
function renderSupport() {
  const box = $("#supportCards");
  if (!box) return;
  SUPPORT.forEach((c) => {
    const card = el("article", `support-card support-card--${c.mod} reveal`);
    const e = el("div", "support-emoji"); e.textContent = c.emoji;
    const h = el("h3"); h.textContent = c.title;
    const p = el("p"); p.textContent = c.desc;
    const a = el("a", "support-btn"); a.href = c.link; a.textContent = c.btn;
    applyExternal(a, c.link);
    card.append(e, h, p, a); box.appendChild(card);
  });
}

/* ---- 팬공간 ---- */
function renderFan() {
  const box = $("#fanCards");
  if (!box) return;
  FAN.forEach((f) => {
    const card = el("article", "fan-card reveal");
    const e = el("div", "fan-emoji"); e.textContent = f.emoji;
    const h = el("h3"); h.textContent = f.title;
    const p = el("p"); p.textContent = f.desc;
    const tag = el("span", "fan-status");
    if (f.ready) {
      tag.classList.add("fan-status--open");
      const a = el("a", "fan-btn"); a.href = f.link; a.textContent = "바로가기 →";
      applyExternal(a, f.link);
      card.append(e, h, p, a);
    } else {
      tag.textContent = "준비중";
      card.append(e, h, p, tag);
    }
    box.appendChild(card);
  });
}

/* ---- 시그댄스 ---- */
function renderSigdance() {
  const box = $("#sigdanceCards");
  if (!box) return;
  box.innerHTML = "";
  if (!SIGDANCE.length) {
    const p = el("p", "sigdance-empty");
    p.textContent = "곧 춤 목록이 올라올 예정이에요 ♥";
    box.appendChild(p);
    return;
  }
  SIGDANCE.forEach((s) => {
    const card = el("article", "sigdance-card reveal");
    const e = el("span", "sigdance-emoji"); e.textContent = s.emoji || "💃";
    const h = el("h3"); h.textContent = s.name;
    card.append(e, h);
    if (s.desc) { const p = el("p"); p.textContent = s.desc; card.appendChild(p); }
    box.appendChild(card);
  });
}

/* =========================================================
   방송일정 캘린더
   ========================================================= */
const calState = { y: null, m: null, selected: null };

function pad2(n) { return String(n).padStart(2, "0"); }
function fmtDate(y, m, d) { return `${y}-${pad2(m + 1)}-${pad2(d)}`; }
function eventsOn(dateStr) { return SCHEDULE.filter((s) => s.date === dateStr); }

function renderCalendar() {
  const grid = $("#calGrid");
  if (!grid) return;
  const { y, m } = calState;

  $("#calTitle").textContent = `${y}년 ${m + 1}월`;

  // 요일 헤더 (한 번만 채워도 되지만 단순하게 매번 재생성)
  const wdBox = $("#calWeekdays");
  wdBox.innerHTML = "";
  WEEKDAYS.forEach((w, i) => {
    const c = el("span", "cal-wd");
    if (i === 0) c.classList.add("sun");
    if (i === 6) c.classList.add("sat");
    c.textContent = w;
    wdBox.appendChild(c);
  });

  // 날짜 그리드
  grid.innerHTML = "";
  const firstDow = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const now = new Date();
  const todayStr = fmtDate(now.getFullYear(), now.getMonth(), now.getDate());

  for (let i = 0; i < firstDow; i++) {
    grid.appendChild(el("span", "cal-cell cal-empty"));
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = fmtDate(y, m, d);
    const cell = el("button", "cal-cell");
    cell.type = "button";
    cell.textContent = d;
    const dow = new Date(y, m, d).getDay();
    if (dow === 0) cell.classList.add("sun");
    if (dow === 6) cell.classList.add("sat");
    const evs = eventsOn(ds);
    if (evs.length) {
      cell.classList.add("has-event");
      cell.appendChild(el("span", `cal-dot ${evs[0].type === "youtube" ? "dot-youtube" : "dot-live"}`));
      cell.setAttribute("aria-label", `${m + 1}월 ${d}일 방송 있음`);
    }
    if (ds === todayStr) cell.classList.add("today");
    if (ds === calState.selected) cell.classList.add("selected");
    cell.addEventListener("click", () => selectDate(ds));
    grid.appendChild(cell);
  }
}

function selectDate(ds) {
  calState.selected = ds;
  renderCalendar();
  renderCalDetail(ds);
}

function renderCalDetail(ds) {
  const box = $("#calDetail");
  if (!box) return;
  box.innerHTML = "";
  const dObj = toDate(ds);
  const head = el("div", "cal-detail-date");
  head.textContent = `${dObj.getMonth() + 1}월 ${dObj.getDate()}일 (${WEEKDAYS[dObj.getDay()]})`;
  box.appendChild(head);

  const evs = eventsOn(ds);
  if (!evs.length) {
    const p = el("p", "cal-detail-empty");
    p.textContent = "이 날은 예정된 방송이 없어요.";
    box.appendChild(p);
    return;
  }
  evs.forEach((ev) => {
    const item = el("div", "cal-detail-item");
    const tm = el("span", "cal-detail-time"); tm.textContent = ev.time;
    const ti = el("span", "cal-detail-title"); ti.textContent = ev.title;
    const tag = el("span", `cal-detail-tag tag-${ev.type || "live"}`);
    tag.textContent = ev.type === "youtube" ? "YouTube" : "LIVE";
    item.append(tm, ti, tag);
    box.appendChild(item);
  });
}

function initCalendar() {
  if (!$("#calGrid")) return;
  const now = new Date();
  calState.y = now.getFullYear();
  calState.m = now.getMonth();

  // 이번 달에 방송이 없고 미래에 방송이 있으면, 가장 가까운 방송 달로 이동
  const inMonth = (s, y, m) => { const d = toDate(s.date); return d.getFullYear() === y && d.getMonth() === m; };
  const hasThisMonth = SCHEDULE.some((s) => inMonth(s, calState.y, calState.m));
  if (!hasThisMonth && SCHEDULE.length) {
    const monthStart = new Date(calState.y, calState.m, 1);
    const future = SCHEDULE.map((s) => toDate(s.date)).filter((d) => d >= monthStart).sort((a, b) => a - b)[0];
    if (future) { calState.y = future.getFullYear(); calState.m = future.getMonth(); }
  }

  // 초기 선택: 표시 월의 첫 방송일 → 없으면 오늘(같은 달) → 없으면 1일
  const monthEvents = SCHEDULE.filter((s) => inMonth(s, calState.y, calState.m)).sort((a, b) => (a.date < b.date ? -1 : 1));
  if (monthEvents.length) calState.selected = monthEvents[0].date;
  else if (now.getFullYear() === calState.y && now.getMonth() === calState.m) calState.selected = fmtDate(calState.y, calState.m, now.getDate());
  else calState.selected = fmtDate(calState.y, calState.m, 1);

  renderCalendar();
  renderCalDetail(calState.selected);

  $("#calPrev").addEventListener("click", () => {
    calState.m--; if (calState.m < 0) { calState.m = 11; calState.y--; }
    renderCalendar();
  });
  $("#calNext").addEventListener("click", () => {
    calState.m++; if (calState.m > 11) { calState.m = 0; calState.y++; }
    renderCalendar();
  });
}

/* ---- data-link 속성을 가진 정적 버튼들에 링크 주입 ---- */
function bindStaticLinks() {
  document.querySelectorAll("[data-link]").forEach((node) => {
    const key = node.dataset.link;
    if (LINKS[key]) { node.href = LINKS[key]; applyExternal(node, LINKS[key]); }
  });
}

/* 외부 링크면 새 탭 + 보안 속성 */
function applyExternal(a, href) {
  if (href && href !== "#" && !href.startsWith("#") && !href.startsWith("mailto:")) {
    a.target = "_blank"; a.rel = "noopener noreferrer";
  }
}

/* ---- 햄버거 메뉴 ---- */
function initHamburger() {
  const btn = $("#hamburger");
  const nav = $("#navLinks");
  if (!btn || !nav) return;
  const toggle = (open) => {
    btn.classList.toggle("open", open);
    nav.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  };
  btn.addEventListener("click", () => toggle(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggle(false)));
}

/* ---- 스크롤 등장 애니메이션 ---- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach((i) => i.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach((i) => io.observe(i));
}

/* ---- data.json 로더 ----
   admin.html 로 만든 data.json 파일이 폴더에 있으면 그 내용으로 덮어씁니다.
   파일이 없으면 위쪽 내장 기본값을 그대로 사용해요(에러 없이 조용히 무시). */
async function loadData() {
  try {
    const res = await fetch("data.json", { cache: "no-store" });
    if (!res.ok) return;
    const j = await res.json();
    if (j.LINKS)    LINKS = j.LINKS;
    if (j.OFFICIAL_NOTICES) OFFICIAL_NOTICES = j.OFFICIAL_NOTICES;
    if (j.LIVE_NOTICES)     LIVE_NOTICES = j.LIVE_NOTICES;
    if (j.NOTICES && !j.OFFICIAL_NOTICES) OFFICIAL_NOTICES = j.NOTICES; // 구버전 호환
    if (j.SCHEDULE) SCHEDULE = j.SCHEDULE;
    if (j.CONTENTS) CONTENTS = j.CONTENTS;
    if (j.CHANNELS) CHANNELS = j.CHANNELS;
    if (j.SNS)      SNS = j.SNS;
    if (j.CLIPS)    CLIPS = j.CLIPS;
    if (j.FAN)      FAN = j.FAN;
    if (j.SUPPORT)  SUPPORT = j.SUPPORT;
    if (j.SIGDANCE) SIGDANCE = j.SIGDANCE;
  } catch (e) {
    /* data.json 이 없거나 형식이 잘못되면 내장 기본값 사용 */
  }
}

/* ---- init ---- */
document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  renderNotices("official");
  renderNotices("live");
  renderTodayLive();
  renderSchedule();
  renderContents();
  renderChannels();
  renderSns();
  renderClips();
  renderFan();
  renderSupport();
  renderSigdance();
  bindStaticLinks();
  initHamburger();
  initCalendar();
  initReveal();
});
