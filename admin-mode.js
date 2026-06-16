/* =========================================================
   LUV WORLD — admin-mode.js
   홈페이지 내부 관리자 모드 (#admin 으로 진입)

   · 일반 방문자에게는 아무것도 보이지 않습니다(#admin 일 때만 동작).
   · 비밀번호는 "편의용 잠금"입니다 — 소스에 적혀 있어 진짜 보안은 아니에요.
     (진짜 로그인은 추후 Sveltia CMS 단계에서)
   · 저장 = data.json 다운로드. 자동 인터넷 반영이 아니라,
     받은 data.json 을 폴더에 덮어써야 반영됩니다.
   · CONTENTS/CHANNELS/SNS 는 이 패널에서 편집하지 않지만,
     저장 시 현재 값을 그대로 보존해 data.json 이 깨지지 않게 합니다.
   ========================================================= */
(function () {
  "use strict";

  /* ⚙️ 관리자 비밀번호 — 여기서 바꾸세요 (편의용 잠금) */
  const ADMIN_PASS = "luv2026";

  const LS_KEY = "luv_admin_draft_v1";
  const HASH = "#admin";

  /* 패널에서 편집하는 6개 영역 (LINKS·NOTICES·SCHEDULE·CLIPS·FAN·SUPPORT) */
  const SECTIONS = {
    LINKS: {
      title: "🔗 링크", kind: "object",
      keys: [
        ["soopLive", "SOOP 방송"], ["ytLuv", "LUV 유튜브"], ["ytNight", "LUV NIGHT"],
        ["ytLittleluv", "LITTLE LUV"], ["ytDance", "LUV DANCE"], ["ytAi", "LUV AI"],
        ["ytBgm", "LUV BGM"], ["tiktok", "TikTok"], ["instagram", "Instagram"],
        ["xiaohongshu", "샤오홍슈"], ["kakao", "카카오톡"], ["fanCafe", "팬카페"],
        ["goods", "굿즈"], ["donate", "후원"], ["email", "이메일"]
      ]
    },
    OFFICIAL_NOTICES: {
      title: "📢 공식 공지 (유튜브·브랜드·굿즈)", kind: "array",
      fields: [["type", "분류", ["all", "youtube", "brand", "event", "update"]], ["label", "배지글자"], ["text", "내용"], ["link", "링크"]]
    },
    LIVE_NOTICES: {
      title: "📢 방송 공지 (방송·휴방·변경·참여)", kind: "array",
      fields: [["type", "분류", ["all", "soop", "rest", "change", "viewer"]], ["label", "배지글자"], ["text", "내용"], ["link", "링크"]]
    },
    SCHEDULE: {
      title: "📅 방송일정", kind: "array",
      fields: [["date", "날짜(2026-07-05)"], ["time", "시간"], ["title", "제목"], ["type", "종류", ["live", "youtube"]]]
    },
    CLIPS: {
      title: "🎬 최신 클립", kind: "array",
      fields: [["img", "썸네일경로"], ["title", "제목"], ["views", "조회수"], ["duration", "길이"], ["link", "링크"]]
    },
    FAN: {
      title: "💌 팬공간", kind: "array",
      fields: [["emoji", "이모지"], ["title", "제목"], ["desc", "설명"], ["ready", "지금 열기?", ["false", "true"]], ["link", "링크"]]
    },
    SUPPORT: {
      title: "🎁 굿즈/후원", kind: "array",
      fields: [["mod", "카드색", ["goods", "donate"]], ["emoji", "이모지"], ["title", "제목"], ["desc", "설명"], ["btn", "버튼글자"], ["link", "링크"]]
    }
  };

  const clone = (x) => JSON.parse(JSON.stringify(x));
  const elx = (t, c) => { const n = document.createElement(t); if (c) n.className = c; return n; };

  /* 유튜브 URL → videoId (watch?v= / youtu.be / shorts / embed 지원) */
  const ytId = (url) => {
    if (!url) return "";
    const m = String(url).match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/)([\w-]{11})/);
    return m ? m[1] : "";
  };
  const monthOf = (d) => (d || "").slice(0, 7);                 // "2026-06-29" → "2026-06"
  const labelMonth = (m) => { const p = String(m).split("-"); return p.length === 2 ? `${p[0]}년 ${Number(p[1])}월` : m; };
  const defaultMonth = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; };

  let baseData = null;     // 패널 진입 시점의 전체 데이터(미편집 3개 보존용)
  let panelOpen = false;
  let usedDraft = false;

  /* script.js 의 전역 데이터(let)를 읽어 전체 스냅샷 */
  function liveData() {
    return {
      LINKS: clone(LINKS),
      OFFICIAL_NOTICES: clone(OFFICIAL_NOTICES),
      LIVE_NOTICES: clone(LIVE_NOTICES),
      SCHEDULE: clone(SCHEDULE),
      CONTENTS: clone(CONTENTS), CHANNELS: clone(CHANNELS), SNS: clone(SNS),
      CLIPS: clone(CLIPS), FAN: clone(FAN), SUPPORT: clone(SUPPORT)
    };
  }

  /* localStorage 임시저장이 있으면 그걸, 없으면 현재 사이트 값 */
  function getBase() {
    const d = localStorage.getItem(LS_KEY);
    if (d) { try { usedDraft = true; return JSON.parse(d); } catch (e) { /* 깨진 draft 무시 */ } }
    usedDraft = false;
    return liveData();
  }

  /* ---------- 스타일 주입 (방문자 CSS 안 건드림) ---------- */
  function injectStyle() {
    if (document.getElementById("lvadm-style")) return;
    const s = elx("style"); s.id = "lvadm-style";
    s.textContent = `
      .lvadm-overlay{position:fixed;inset:0;z-index:10000;display:grid;place-items:center;
        background:rgba(74,59,68,.45);backdrop-filter:blur(3px);font-family:'Gowun Dodum','Malgun Gothic',sans-serif;}
      .lvadm-login{background:#fff;border-radius:22px;padding:1.8rem 1.6rem;width:min(340px,90vw);
        box-shadow:0 24px 60px -20px rgba(241,95,156,.6);text-align:center;}
      .lvadm-login h3{margin:0 0 .3rem;color:#f15f9c;font-size:1.2rem;}
      .lvadm-login p{margin:0 0 1rem;color:#8a7681;font-size:.85rem;}
      .lvadm-login input{width:100%;padding:.7rem .8rem;border:1px solid #ffd6e7;border-radius:12px;
        font-size:1rem;font-family:inherit;text-align:center;}
      .lvadm-login input:focus{outline:2px solid #ff9ec4;}
      .lvadm-err{color:#e0405b;font-size:.82rem;margin:.5rem 0 0;}
      .lvadm-login-btns{display:flex;gap:.5rem;margin-top:1rem;}
      .lvadm-login-btns button{flex:1;padding:.7rem;border:none;border-radius:999px;font-weight:700;
        font-size:.95rem;cursor:pointer;font-family:inherit;}
      .lvadm-cancel{background:#fff0f6;color:#9a5b7a;border:1px solid #ffd6e7 !important;}
      .lvadm-go{background:linear-gradient(120deg,#f15f9c,#ff9ec4);color:#fff;}

      .lvadm-panel{position:fixed;top:0;right:0;height:100%;width:min(400px,92vw);z-index:9999;
        background:#fffafc;box-shadow:-14px 0 40px -16px rgba(241,95,156,.5);
        display:flex;flex-direction:column;transform:translateX(100%);
        transition:transform .32s cubic-bezier(.16,1,.3,1);
        font-family:'Gowun Dodum','Malgun Gothic',sans-serif;color:#4a3b44;}
      .lvadm-panel.open{transform:translateX(0);}
      .lvadm-head{display:flex;align-items:center;justify-content:space-between;
        padding:1rem 1.2rem;border-bottom:1px solid #ffe9f2;background:#fff;}
      .lvadm-head b{color:#f15f9c;font-size:1.05rem;}
      .lvadm-x{background:#ffe9f2;color:#f15f9c;border:none;border-radius:10px;
        width:34px;height:34px;font-size:1rem;cursor:pointer;}
      .lvadm-draftbar{background:#fff7d6;color:#9a7a1e;font-size:.8rem;padding:.5rem 1.2rem;}
      .lvadm-body{flex:1;overflow-y:auto;padding:1rem 1.2rem;}
      .lvadm-note{background:#fff7fb;border:1px solid #ffd6e7;border-radius:12px;
        padding:.7rem .9rem;font-size:.8rem;color:#9a5b7a;margin-bottom:1rem;line-height:1.5;}
      .lvadm-sec{background:#fff;border:1px solid #ffe9f2;border-radius:14px;
        padding:.9rem 1rem;margin-bottom:1rem;}
      .lvadm-sec h4{margin:0 0 .7rem;color:#9a5b7a;font-size:.98rem;}
      .lvadm-grid{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;}
      .lvadm-field{display:grid;gap:.2rem;}
      .lvadm-field label{font-size:.72rem;font-weight:700;color:#9a5b7a;}
      .lvadm-field input,.lvadm-field select{font-family:inherit;font-size:.9rem;color:#4a3b44;
        border:1px solid #ffd6e7;border-radius:9px;padding:.45rem .55rem;background:#fff;width:100%;}
      .lvadm-field input:focus,.lvadm-field select:focus{outline:2px solid #ff9ec4;}
      .lvadm-row{position:relative;background:#fffafc;border:1px solid #ffe9f2;border-radius:11px;
        padding:.75rem .8rem;margin-bottom:.6rem;display:grid;gap:.45rem;}
      .lvadm-del{position:absolute;top:.5rem;right:.5rem;background:#ffe9f2;color:#f15f9c;
        border:none;border-radius:7px;font-size:.72rem;font-weight:700;padding:.2rem .5rem;cursor:pointer;}
      .lvadm-add{background:#fff;color:#f15f9c;border:2px dashed #ffbcd6;border-radius:999px;
        padding:.4rem 1rem;font-weight:700;font-size:.85rem;cursor:pointer;}
      .lvadm-monthbar{display:flex;flex-wrap:wrap;gap:.4rem;align-items:center;margin-bottom:.7rem;}
      .lvadm-monthsel{font-family:inherit;font-size:.9rem;border:1px solid #ffd6e7;border-radius:9px;
        padding:.42rem .6rem;background:#fff;color:#4a3b44;font-weight:700;}
      .lvadm-clip-prev{width:100%;border-radius:9px;margin-top:.3rem;border:1px solid #ffe9f2;display:block;}
      .lvadm-foot{padding:.9rem 1.2rem;border-top:1px solid #ffe9f2;background:#fff;
        display:flex;gap:.5rem;align-items:center;}
      .lvadm-clear{background:#fff0f6;color:#9a5b7a;border:1px solid #ffd6e7;border-radius:999px;
        padding:.6rem .9rem;font-weight:700;font-size:.82rem;cursor:pointer;}
      .lvadm-save{flex:1;background:linear-gradient(120deg,#f15f9c,#ff9ec4);color:#fff;border:none;
        border-radius:999px;padding:.7rem;font-weight:700;font-size:.95rem;cursor:pointer;}
      .lvadm-toast{position:fixed;bottom:1.2rem;left:50%;transform:translateX(-50%);z-index:10001;
        background:#4a3b44;color:#fff;padding:.7rem 1.2rem;border-radius:999px;font-size:.88rem;
        font-family:'Gowun Dodum',sans-serif;opacity:0;transition:opacity .25s;}
      .lvadm-toast.show{opacity:1;}
      @media(max-width:600px){
        .lvadm-panel{width:100%;}
        .lvadm-grid{grid-template-columns:1fr;}
      }
    `;
    document.head.appendChild(s);
  }

  /* ---------- 폼 요소 ---------- */
  function makeInput(key, label, value, opts) {
    const f = elx("div", "lvadm-field");
    const lb = elx("label"); lb.textContent = label; f.appendChild(lb);
    let input;
    if (opts) {
      input = elx("select");
      opts.forEach((o) => { const op = elx("option"); op.value = o; op.textContent = o; input.appendChild(op); });
      input.value = String(value);
    } else {
      input = elx("input"); input.type = "text"; input.value = value == null ? "" : value;
    }
    input.dataset.key = key;
    f.appendChild(input);
    return f;
  }

  function makeRow(def, item, listBox) {
    const row = elx("div", "lvadm-row");
    const del = elx("button", "lvadm-del"); del.type = "button"; del.textContent = "✕ 삭제";
    del.onclick = () => { row.remove(); saveDraft(); };
    row.appendChild(del);
    def.fields.forEach(([key, label, opts]) => {
      const val = key === "ready" ? String(!!item[key]) : (item[key] != null ? item[key] : "");
      row.appendChild(makeInput(key, label, val, opts));
    });
    listBox.appendChild(row);
    return row;
  }

  function buildForms(body) {
    Object.keys(SECTIONS).forEach((name) => {
      const def = SECTIONS[name];
      const sec = elx("div", "lvadm-sec");
      const h = elx("h4"); h.textContent = def.title; sec.appendChild(h);

      if (def.kind === "object") {
        const grid = elx("div", "lvadm-grid"); grid.dataset.box = name;
        const obj = baseData[name] || {};
        def.keys.forEach(([key, label]) => grid.appendChild(makeInput(key, label, obj[key] != null ? obj[key] : "")));
        sec.appendChild(grid);
      } else if (name === "SCHEDULE") {
        buildScheduleSection(sec, def);
      } else if (name === "CLIPS") {
        buildClipsSection(sec, def);
      } else {
        const listBox = elx("div"); listBox.dataset.box = name;
        (baseData[name] || []).forEach((item) => makeRow(def, item, listBox));
        sec.appendChild(listBox);
        const add = elx("button", "lvadm-add"); add.type = "button"; add.textContent = "+ 항목 추가";
        add.onclick = () => { makeRow(def, {}, listBox); saveDraft(); };
        sec.appendChild(add);
      }
      body.appendChild(sec);
    });
  }

  /* ---------- 방송일정: 월별 보기/편집 ----------
     모든 일정 row 를 DOM 에 유지(숨김 포함)해 collect 시 데이터 손실이 없게 합니다. */
  function buildScheduleSection(sec, def) {
    const bar = elx("div", "lvadm-monthbar");
    const sel = elx("select", "lvadm-monthsel");
    const addThis = elx("button", "lvadm-add"); addThis.type = "button"; addThis.textContent = "+ 이 달에 일정";
    const addMonth = elx("button", "lvadm-add"); addMonth.type = "button"; addMonth.textContent = "+ 다른 달";
    bar.append(sel, addThis, addMonth);
    sec.appendChild(bar);

    const listBox = elx("div"); listBox.dataset.box = "SCHEDULE";
    (baseData.SCHEDULE || []).forEach((item) => makeRow(def, item, listBox));
    sec.appendChild(listBox);

    function monthsInData() {
      const set = new Set();
      listBox.querySelectorAll('.lvadm-row [data-key="date"]').forEach((i) => { const m = monthOf(i.value); if (m) set.add(m); });
      return [...set].sort();
    }
    function applyFilter() {
      const m = sel.value;
      listBox.querySelectorAll(".lvadm-row").forEach((row) => {
        const d = row.querySelector('[data-key="date"]').value;
        row.style.display = monthOf(d) === m ? "" : "none";
      });
    }
    function refreshOptions(keepMonth) {
      const ms = monthsInData();
      if (keepMonth && !ms.includes(keepMonth)) ms.push(keepMonth);
      ms.sort();
      if (!ms.length) ms.push(defaultMonth());
      const cur = keepMonth || sel.value || ms[0];
      sel.innerHTML = "";
      ms.forEach((m) => { const o = elx("option"); o.value = m; o.textContent = labelMonth(m); sel.appendChild(o); });
      sel.value = ms.includes(cur) ? cur : ms[0];
      applyFilter();
    }
    sel.addEventListener("change", applyFilter);
    addThis.onclick = () => {
      const m = sel.value || defaultMonth();
      makeRow(def, { date: m + "-01", time: "20:00", title: "", type: "live" }, listBox);
      applyFilter(); saveDraft();
    };
    addMonth.onclick = () => {
      const m = window.prompt("추가할 달을 입력하세요 (예: 2026-08)");
      if (!m) return;
      if (!/^\d{4}-\d{2}$/.test(m)) { toast("형식은 2026-08 처럼 입력하세요"); return; }
      refreshOptions(m); sel.value = m; applyFilter();
    };
    refreshOptions();
  }

  /* ---------- 최신 클립: 유튜브 URL → 썸네일 자동 ---------- */
  function buildClipsSection(sec, def) {
    const listBox = elx("div"); listBox.dataset.box = "CLIPS";
    (baseData.CLIPS || []).forEach((item) => makeClipRow(item, listBox));
    sec.appendChild(listBox);
    const add = elx("button", "lvadm-add"); add.type = "button"; add.textContent = "+ 영상 추가";
    add.onclick = () => { makeClipRow({}, listBox); saveDraft(); };
    sec.appendChild(add);
  }

  function makeClipRow(item, listBox) {
    const row = elx("div", "lvadm-row");
    const del = elx("button", "lvadm-del"); del.type = "button"; del.textContent = "✕ 삭제";
    del.onclick = () => { row.remove(); saveDraft(); };
    row.appendChild(del);

    const fUrl = makeInput("link", "유튜브 영상 URL (붙여넣기)", item.link != null ? item.link : "");
    const fTitle = makeInput("title", "제목 (직접 입력)", item.title || "");
    const fViews = makeInput("views", "조회수", item.views || "");
    const fDur = makeInput("duration", "길이", item.duration || "");
    const fImg = makeInput("img", "썸네일 (URL 넣으면 자동)", item.img || "");
    const imgInput = fImg.querySelector("input"); imgInput.readOnly = true;

    const prev = elx("img", "lvadm-clip-prev");
    prev.alt = "썸네일 미리보기";
    if (item.img) { prev.src = item.img; } else { prev.style.display = "none"; }

    const urlInput = fUrl.querySelector("input");
    urlInput.addEventListener("input", () => {
      const id = ytId(urlInput.value);
      if (id) {
        const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
        imgInput.value = thumb;
        prev.src = thumb; prev.style.display = "";
      }
    });

    row.append(fUrl, fTitle, fViews, fDur, fImg, prev);
    listBox.appendChild(row);
    return row;
  }

  /* ---------- 수집 ---------- */
  function collectSection(name) {
    const def = SECTIONS[name];
    const box = document.querySelector(`.lvadm-panel [data-box="${name}"]`);
    if (def.kind === "object") {
      const obj = {};
      box.querySelectorAll("input,select").forEach((inp) => { obj[inp.dataset.key] = inp.value; });
      return obj;
    }
    const arr = [];
    box.querySelectorAll(".lvadm-row").forEach((row) => {
      const item = {};
      row.querySelectorAll("input,select").forEach((inp) => {
        let v = inp.value;
        if (inp.dataset.key === "ready") v = (v === "true");
        item[inp.dataset.key] = v;
      });
      arr.push(item);
    });
    return arr;
  }

  /* 6개 편집값 + 미편집 3개(보존) = 완전한 data.json */
  function collectAll() {
    return {
      LINKS: collectSection("LINKS"),
      OFFICIAL_NOTICES: collectSection("OFFICIAL_NOTICES"),
      LIVE_NOTICES: collectSection("LIVE_NOTICES"),
      SCHEDULE: collectSection("SCHEDULE"),
      CONTENTS: baseData.CONTENTS,
      CHANNELS: baseData.CHANNELS,
      SNS: baseData.SNS,
      CLIPS: collectSection("CLIPS"),
      FAN: collectSection("FAN"),
      SUPPORT: collectSection("SUPPORT")
    };
  }

  function saveDraft() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(collectAll())); } catch (e) { /* 용량 초과 등 무시 */ }
  }

  function download() {
    const data = collectAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = elx("a");
    a.href = URL.createObjectURL(blob);
    a.download = "data.json";
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(a.href);
    saveDraft();
    toast("data.json 다운로드 완료! 폴더에 덮어쓰면 반영돼요");
  }

  function toast(msg) {
    let t = document.querySelector(".lvadm-toast");
    if (!t) { t = elx("div", "lvadm-toast"); document.body.appendChild(t); }
    t.textContent = msg;
    void t.offsetWidth;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3200);
  }

  /* ---------- 패널 ---------- */
  function openPanel() {
    if (panelOpen) return;
    baseData = getBase();
    injectStyle();

    const panel = elx("div", "lvadm-panel");
    panel.innerHTML =
      '<div class="lvadm-head"><b>⚙️ LUV 관리 패널</b><button class="lvadm-x" type="button" aria-label="닫기">✕</button></div>' +
      (usedDraft ? '<div class="lvadm-draftbar">📝 작성 중이던 내용을 불러왔어요 (임시저장)</div>' : "") +
      '<div class="lvadm-body"></div>' +
      '<div class="lvadm-foot"><button class="lvadm-clear" type="button">임시저장 비우기</button>' +
      '<button class="lvadm-save" type="button">💾 data.json 다운로드</button></div>';

    const body = panel.querySelector(".lvadm-body");
    const note = elx("div", "lvadm-note");
    note.innerHTML =
      "<b>저장 = data.json 다운로드</b> 예요.<br>" +
      "① 받은 <b>data.json</b> 을 <b>luv-website 폴더에 덮어쓰기</b> → 새로고침하면 <b>내 PC</b>에 반영돼요.<br>" +
      "② <b>인터넷 사이트</b>는 수정된 data.json 을 포함해 <b>Netlify에 다시 배포</b>해야 반영돼요.<br>" +
      "(저장만으로 자동 반영되지 않아요)";
    body.appendChild(note);
    buildForms(body);

    document.body.appendChild(panel);
    void panel.offsetWidth;            // 강제 reflow → 슬라이드 transition 보장
    panel.classList.add("open");
    panelOpen = true;

    // 입력할 때마다 임시저장
    body.addEventListener("input", saveDraft);
    panel.querySelector(".lvadm-x").onclick = closePanel;
    panel.querySelector(".lvadm-save").onclick = download;
    panel.querySelector(".lvadm-clear").onclick = () => {
      localStorage.removeItem(LS_KEY);
      closePanel();
      toast("임시저장을 비웠어요");
      setTimeout(openPanel, 350); // 현재 사이트 값으로 다시 열기
    };
  }

  function closePanel() {
    const panel = document.querySelector(".lvadm-panel");
    if (panel) { panel.classList.remove("open"); setTimeout(() => panel.remove(), 320); }
    panelOpen = false;
    if (location.hash === HASH) history.replaceState(null, "", location.pathname + location.search);
  }

  /* ---------- 로그인 ---------- */
  function showLogin() {
    if (panelOpen || document.querySelector(".lvadm-overlay")) return;
    injectStyle();
    const ov = elx("div", "lvadm-overlay");
    ov.innerHTML =
      '<div class="lvadm-login"><h3>🔒 관리자 로그인</h3>' +
      '<p>편의용 잠금이에요</p>' +
      '<input type="password" id="lvadmPw" placeholder="비밀번호" autocomplete="off" />' +
      '<div class="lvadm-err" hidden>비밀번호가 달라요</div>' +
      '<div class="lvadm-login-btns"><button class="lvadm-cancel" type="button">취소</button>' +
      '<button class="lvadm-go" type="button">입장</button></div></div>';
    document.body.appendChild(ov);

    const pw = ov.querySelector("#lvadmPw");
    const err = ov.querySelector(".lvadm-err");
    pw.focus();
    const tryEnter = () => {
      if (pw.value === ADMIN_PASS) { ov.remove(); openPanel(); }
      else { err.hidden = false; pw.value = ""; pw.focus(); }
    };
    const cancel = () => { ov.remove(); if (location.hash === HASH) history.replaceState(null, "", location.pathname + location.search); };
    ov.querySelector(".lvadm-go").onclick = tryEnter;
    ov.querySelector(".lvadm-cancel").onclick = cancel;
    pw.addEventListener("keydown", (e) => { if (e.key === "Enter") tryEnter(); if (e.key === "Escape") cancel(); });
  }

  /* ---------- 진입 ---------- */
  function maybeEnter() { if (location.hash === HASH && !panelOpen) showLogin(); }
  function init() {
    maybeEnter();
    window.addEventListener("hashchange", maybeEnter);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
