const officialHeroes = window.OFFICIAL_HEROES || [];
const officialItems = window.OFFICIAL_ITEMS || [];

const heroTypeNames = {
  1: "战士",
  2: "法师",
  3: "坦克",
  4: "刺客",
  5: "射手",
  6: "辅助"
};

const roleNames = {
  1: "对抗路",
  2: "打野",
  3: "中路",
  4: "发育路",
  5: "游走"
};

const itemTypeNames = {
  1: "攻击",
  2: "法术",
  3: "防御",
  4: "移动",
  5: "打野",
  6: "特殊",
  7: "游走"
};

const manualProfiles = {
  妲己: { threats: ["爆发", "控制", "蹲草"], tags: ["法术爆发", "单点控制"], note: "怕被开视野和净化类技能化解一套爆发。" },
  安琪拉: { threats: ["爆发", "控制", "阵地"], tags: ["法术爆发", "站桩输出"], note: "技能命中后伤害极高，怕灵活英雄绕后。" },
  貂蝉: { threats: ["持续输出", "回血", "位移"], tags: ["持续法伤", "团战拉扯"], note: "怕重伤、强控和爆发集火。" },
  后羿: { threats: ["持续输出", "开团", "站桩"], tags: ["站桩射手", "全图控制"], note: "无位移，怕突脸和强开。" },
  鲁班七号: { threats: ["持续输出", "扫射", "站桩"], tags: ["高伤射手", "无位移"], note: "输出高但自保弱，怕刺客和硬控。" },
  兰陵王: { threats: ["隐身", "突进", "秒后排"], tags: ["刺客", "视野压力"], note: "需要保护后排和提前探草。" },
  宫本武藏: { threats: ["突进", "锁定", "重伤"], tags: ["战士刺客", "切后限制"], note: "大招能锁定核心并限制回复，后排要注意站位和净化时机。" },
  程咬金: { threats: ["回血", "带线", "前排"], tags: ["回复坦边", "牵制"], note: "需要重伤和清线能力。" },
  吕布: { threats: ["真实伤害", "开团", "前排"], tags: ["真伤战士", "团战"], note: "怕灵活拉扯和风筝。" },
  蔡文姬: { threats: ["回血", "保护", "控制"], tags: ["回复辅助", "保护"], note: "需要重伤，优先打断保护阵型。" },
  东皇太一: { threats: ["压制", "开团", "换命"], tags: ["硬控", "反突进"], note: "进场英雄要注意大招压制。" },
  张飞: { threats: ["保护", "开团", "护盾"], tags: ["坦辅", "反打"], note: "要等变身或护盾交掉再强开。" },
  牛魔: { threats: ["控制", "开团", "坦度"], tags: ["坦辅", "团控"], note: "需要站位分散，避免被连控。" }
};

const refinedPlans = {
  宫本武藏: {
    counters: ["蔡文姬", "程咬金", "貂蝉", "后羿", "鲁班七号", "孙尚香"],
    answers: ["回复阵容", "脆皮后排", "站桩输出"],
    build: ["贪婪之噬", "抵抗之靴", "暗影战斧", "冰痕之握", "纯净苍穹", "魔女斗篷"],
    tips: ["大招优先给敌方最关键的输出或回复核心。", "敌方控制很多时，等关键控制交出后再锁后排。"]
  },
  赵云: {
    counters: ["后羿", "鲁班七号", "妲己", "安琪拉", "蔡文姬"],
    answers: ["无位移射手", "脆皮法师", "回复阵容"],
    build: ["贪婪之噬", "抵抗之靴", "暗影战斧", "宗师之力", "反伤刺甲", "魔女斗篷"],
    tips: ["敌方法师爆发高时尽快补魔抗。", "打回复阵容时提醒队友补制裁或梦魇。"]
  },
  张良: {
    counters: ["韩信", "李白", "镜", "澜", "貂蝉", "公孙离"],
    answers: ["高机动刺客", "多位移核心", "持续进场"],
    build: ["冷静之靴", "痛苦面具", "凝冰之息", "博学者之怒", "虚无法杖", "辉月"],
    tips: ["大招优先留给敌方最能切后排的人。", "对面刺客多时辉月可提前出。"]
  },
  狄仁杰: {
    counters: ["妲己", "安琪拉", "东皇太一", "牛魔", "花木兰"],
    answers: ["控制爆发", "近身战士", "前排阵容"],
    build: ["急速战靴", "末世", "无尽战刃", "仁者破晓", "逐日之弓", "魔女斗篷"],
    tips: ["对面控制很多时，净化和魔女斗篷优先级更高。", "不要单独压塔，等辅助给视野。"]
  },
  吕布: {
    counters: ["程咬金", "夏侯惇", "张飞", "牛魔", "蔡文姬"],
    answers: ["高回复前排", "坦克阵容", "站桩保护"],
    build: ["抵抗之靴", "暴烈之甲", "强者破军", "纯净苍穹", "魔女斗篷", "不祥征兆"],
    tips: ["对线回复英雄要尽早配合重伤装备。", "大招优先封走位和保护后排。"]
  },
  王昭君: {
    counters: ["后羿", "鲁班七号", "黄忠", "蔡文姬", "张飞", "牛魔"],
    answers: ["站桩输出", "抱团推进", "保护阵容"],
    build: ["冷静之靴", "痛苦面具", "凝冰之息", "博学者之怒", "虚无法杖", "辉月"],
    tips: ["技能多用于封路，不必强求先手命中。", "对面刺客多时站位要靠后。"]
  },
  庄周: {
    counters: ["妲己", "安琪拉", "牛魔", "花木兰", "东皇太一"],
    answers: ["控制链", "法术爆发", "强开阵容"],
    build: ["近卫·救赎", "抵抗之靴", "旭日初光", "不祥征兆", "魔女斗篷", "霸者重装"],
    tips: ["庄周不能解除东皇压制，但能减少其他控制链影响。", "己方缺开团时要搭配主动进场边野。"]
  },
  虞姬: {
    counters: ["兰陵王", "韩信", "李白", "赵云", "花木兰"],
    answers: ["物理刺客", "突脸战士", "切后阵容"],
    build: ["急速战靴", "暗影战斧", "无尽战刃", "仁者破晓", "逐日之弓", "魔女斗篷"],
    tips: ["对面法刺强时二技能保护价值下降。", "二技能留给刺客进场，不要随便赶路。"]
  },
  廉颇: {
    counters: ["后羿", "鲁班七号", "王昭君", "妲己", "蔡文姬"],
    answers: ["站桩输出", "脆皮阵容", "软辅体系"],
    build: ["近卫·救赎", "抵抗之靴", "红莲斗篷", "不祥征兆", "魔女斗篷", "霸者重装"],
    tips: ["强开前确认队友能跟上输出。", "对面拉扯强时优先卡视野再进场。"]
  },
  马可波罗: {
    counters: ["吕布", "程咬金", "夏侯惇", "张飞", "牛魔"],
    answers: ["前排坦克", "高回复边路", "笨重阵容"],
    build: ["急速战靴", "末世", "闪电匕首", "仁者破晓", "魔女斗篷", "不祥征兆"],
    tips: ["大招进场前确认敌方关键控制是否交掉。", "遇到强控刺客时净化优先级很高。"]
  }
};

const skillBriefs = {
  宫本武藏: {
    style: "锁定切后、限制回复、半肉进场",
    skills: ["被动强化普攻，技能后衔接普攻提升持续作战。", "一技能可抵挡飞行物并造成伤害，适合拆对面消耗。", "二技能位移并获得护盾，用来贴近或拉开。", "大招锁定目标突进并造成重伤，优先压制射手、法师或回复核心。"]
  },
  马可波罗: {
    style: "灵活拉扯、真实伤害、打前排",
    skills: ["普攻和技能叠印记，叠满后触发真实伤害。", "一技能远程扫射，核心消耗与叠印记手段。", "二技能位移调整距离，附近有敌人时获得提示。", "大招范围弹幕爆发，进场前要确认关键控制已交。"]
  },
  庄周: {
    style: "解控保护、反控制、持续消耗",
    skills: ["被动周期性免控并减伤，适合探视野。", "一技能减速消耗，限制敌方追击。", "二技能持续叠加伤害和移速，贴身作战更强。", "大招为队友解控并减伤，克制控制链阵容。"]
  },
  张良: {
    style: "稳定压制、反刺客、阵地控制",
    skills: ["被动叠加真实伤害，持续命中收益更高。", "一技能形成法术壁垒，分割走位并控制。", "二技能放置法阵持续输出，清线和封路都好用。", "大招压制单体目标，优先留给刺客或进场核心。"]
  },
  吕布: {
    style: "真实伤害、团战分割、后期前排",
    skills: ["一技能命中后附魔，普攻和技能造成真实伤害。", "二技能吸取护盾，提升对线和团战承伤。", "大招跳跃开团或封走位，适合分割阵型。", "附魔状态下输出质量高，注意先命中再打正面。"]
  },
  王昭君: {
    style: "范围控制、守塔清线、阵地压制",
    skills: ["技能造成冰冷效果，降低目标移速和攻速。", "一技能范围消耗并减速，便于接控制。", "二技能延迟冰冻，适合封路和反手。", "大招大范围持续伤害，强守塔和分割战场。"]
  },
  狄仁杰: {
    style: "稳定射手、解控反打、持续输出",
    skills: ["普攻叠攻速移速，持续输出稳定。", "一技能牌令范围伤害，用于清线消耗。", "二技能解除负面效果并短暂无敌，是核心保命技能。", "大招黄牌控制并降低双抗，命中后方便集火。"]
  },
  虞姬: {
    style: "物理免疫、反刺客、远程消耗",
    skills: ["被动强化普攻并减速，适合拉扯。", "一技能远距离消耗，压低血线。", "二技能免疫物理伤害并加速，克制物理刺客。", "大招跳跃控制并拉开距离，能反手保命。"]
  },
  廉颇: {
    style: "霸体开团、前排承伤、多段控制",
    skills: ["释放技能时霸体并减伤，适合强开。", "一技能位移击飞，常用作先手。", "二技能蓄力伤害和减速，配合控制链。", "大招多段砸地控制，能冲散站桩阵容。"]
  },
  赵云: {
    style: "半肉突进、切后反打、稳定开团",
    skills: ["被动低血量获得免伤，残血容错高。", "一技能位移强化普攻，用于追击和拉扯。", "二技能多段伤害并回复，提升持续作战。", "大招击飞并标记目标，是切后和开团关键。"]
  }
};

const quickComps = [
  { label: "草丛爆发", value: "妲己 后羿 兰陵王 程咬金 蔡文姬" },
  { label: "宫本切后", value: "宫本 后羿 张飞 王昭君 吕布" },
  { label: "高机动刺客", value: "镜 澜 公孙离 不知火舞 张飞" },
  { label: "回复坦阵", value: "程咬金 蔡文姬 吕布 夏侯惇 貂蝉" }
];

const heroByName = new Map(officialHeroes.map((hero) => [hero.name, hero]));
const itemByName = new Map(officialItems.map((item) => [item.name, item]));

const input = document.querySelector("#enemyInput");
const heroSearchInput = document.querySelector("#heroSearchInput");
const selectedEnemyChips = document.querySelector("#selectedEnemyChips");
const heroSuggestions = document.querySelector("#heroSuggestions");
const analyzeBtn = document.querySelector("#analyzeBtn");
const clearBtn = document.querySelector("#clearBtn");
const quickList = document.querySelector("#quickList");
const roleFilter = document.querySelector("#roleFilter");
const recommendations = document.querySelector("#recommendations");
const enemyGrid = document.querySelector("#enemyGrid");
const enemyCount = document.querySelector("#enemyCount");
const heroTotal = document.querySelector("#heroTotal");
const itemTotal = document.querySelector("#itemTotal");
const coverageNote = document.querySelector("#coverageNote");
const threatSummary = document.querySelector("#threatSummary");
const planSummary = document.querySelector("#planSummary");
const riskSummary = document.querySelector("#riskSummary");
const battleMode = document.querySelector("#battleMode");
const battleDeckText = document.querySelector("#battleDeckText");
const heroSpotlight = document.querySelector("#heroSpotlight");
const lineupStrip = document.querySelector("#lineupStrip");
const focusRecommendBtn = document.querySelector("#focusRecommendBtn");
const focusItemsBtn = document.querySelector("#focusItemsBtn");
const focusHeroGuideBtn = document.querySelector("#focusHeroGuideBtn");
const openItemsBtn = document.querySelector("#openItemsBtn");
const openHeroGuideBtn = document.querySelector("#openHeroGuideBtn");
const backToStrategyBtn = document.querySelector("#backToStrategyBtn");
const backFromHeroGuideBtn = document.querySelector("#backFromHeroGuideBtn");
const strategyView = document.querySelector("#strategyView");
const itemsView = document.querySelector("#itemsView");
const heroGuideView = document.querySelector("#heroGuideView");
const itemSearch = document.querySelector("#itemSearch");
const itemFilter = document.querySelector("#itemFilter");
const itemGrid = document.querySelector("#itemGrid");
const heroGuideSearch = document.querySelector("#heroGuideSearch");
const heroGuideSuggestions = document.querySelector("#heroGuideSuggestions");
const heroGuideCard = document.querySelector("#heroGuideCard");

let currentResults = [];
let currentEnemies = [];
let selectedEnemies = [];
let highlightedItemId = null;
let selectedGuideHero = "宫本武藏";

function normalizeName(name) {
  const aliases = {
    鲁班: "鲁班七号",
    香香: "孙尚香",
    火舞: "不知火舞",
    马可: "马可波罗",
    阿离: "公孙离",
    宫本: "宫本武藏",
    婉儿: "上官婉儿",
    昭君: "王昭君",
    东皇: "东皇太一"
  };
  if (aliases[name]) return aliases[name];
  if (heroByName.has(name)) return name;
  return officialHeroes.find((hero) => hero.name.includes(name) && name.length >= 2)?.name || name;
}

function getHeroRole(hero) {
  const role = hero.roles?.[0] || roleByType(hero.type);
  return roleNames[role] || "灵活位";
}

function roleByType(type) {
  if (type === 2) return 3;
  if (type === 4) return 2;
  if (type === 5) return 4;
  if (type === 6) return 5;
  return 1;
}

function getHeroTypeText(hero) {
  const types = [hero.type, hero.type2].filter(Boolean).map((type) => heroTypeNames[type]);
  return [...new Set(types)].join("/") || "综合";
}

function getHeroImageUrl(name) {
  const hero = heroByName.get(name);
  if (!hero) return "";
  return `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${hero.id}/${hero.id}.jpg`;
}

function getItemImageUrl(item) {
  return `https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.id}.jpg`;
}

function imageMarkup(name, className, url, alt) {
  const fallback = name.slice(0, 1);
  if (!url) return `<div class="${className} fallback">${fallback}</div>`;
  return `
    <div class="${className}" title="${name}">
      <img src="${url}" alt="${alt}" loading="lazy" onerror="this.remove();this.parentElement.classList.add('fallback');this.parentElement.textContent='${fallback}';" />
    </div>
  `;
}

function getProfile(name) {
  const hero = heroByName.get(name);
  if (!hero) return null;
  const manual = manualProfiles[name] || {};
  const generic = createGenericProfile(hero);
  return {
    role: getHeroRole(hero),
    threats: manual.threats || generic.threats,
    tags: manual.tags || generic.tags,
    note: manual.note || generic.note
  };
}

function getHeroSkillBrief(name) {
  const hero = heroByName.get(name);
  if (!hero) return null;
  if (skillBriefs[name]) return skillBriefs[name];

  const role = getHeroRole(hero);
  const type = hero.type;
  if (type === 5) {
    return {
      style: "持续输出、发育成型、后排核心",
      skills: ["核心能力集中在普攻和输出技能，依赖安全站位。", "通常需要辅助提供视野和保护。", "中后期装备成型后持续输出能力更强。", "面对刺客时优先保留位移、净化或保命装备。"]
    };
  }
  if (type === 4) {
    return {
      style: "突进爆发、切入收割、节奏带动",
      skills: ["技能组通常包含位移或爆发，适合压制后排。", "依赖进场时机，先等关键控制交出更稳。", "前中期节奏价值高，适合配合队友抓边。", "团战目标优先选择射手、法师或残血核心。"]
    };
  }
  if (type === 2) {
    return {
      style: "法术消耗、控制封路、清线支援",
      skills: ["技能多用于清线、消耗或控制区域。", "中路清线后可以支援边路和野区。", "面对突进阵容时要保留控制技能自保。", "装备成型后能提供高额法术伤害或团队控制。"]
    };
  }
  if (type === 3) {
    return {
      style: "前排承伤、控制开团、阵型保护",
      skills: ["技能偏承伤、控制或开团，适合站在阵型前侧。", "团战中优先吸收第一波技能并限制敌方后排。", "不要独自追击，重点是卡位置和保护输出。", "防御装备越完整，容错和开团质量越高。"]
    };
  }
  if (type === 6) {
    return {
      style: "视野保护、团队增益、开团反打",
      skills: ["技能多提供控制、护盾、治疗、加速或视野价值。", "重点判断是保护己方核心还是主动开团。", "前期多跟打野或中路建立节奏。", "团战中站位要覆盖己方输出位。"]
    };
  }
  return {
    style: `${role}作战、边线牵制、进场承伤`,
    skills: ["技能通常兼具伤害、位移或生存能力。", "对线期处理兵线，团战期寻找侧翼进场。", "可根据局势选择半肉或输出装备。", "进场前确认队友位置，避免孤立开团。"]
  };
}

function renderHeroGuide(name = selectedGuideHero) {
  const heroName = normalizeName(name);
  const hero = heroByName.get(heroName);
  if (!hero) {
    heroGuideCard.innerHTML = `<div class="empty-state">没有找到该英雄。</div>`;
    return;
  }

  selectedGuideHero = hero.name;
  const profile = getProfile(hero.name);
  const brief = getHeroSkillBrief(hero.name);
  heroGuideSearch.value = hero.name;
  heroGuideCard.innerHTML = `
    <div class="guide-hero-head">
      ${imageMarkup(hero.name, "guide-avatar", getHeroImageUrl(hero.name), `${hero.name}头像`)}
      <div>
        <span>${getHeroRole(hero)} · ${getHeroTypeText(hero)}</span>
        <strong>${hero.name}</strong>
        <p>${hero.title || brief.style}</p>
      </div>
    </div>
    <div class="guide-tags">
      ${profile.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
    <p class="guide-style">${brief.style}</p>
    <ul class="guide-skill-list">
      ${brief.skills.map((skill) => `<li>${skill}</li>`).join("")}
    </ul>
  `;
}

function renderGuideSuggestions(query) {
  const trimmed = query.trim();
  heroGuideSuggestions.innerHTML = "";
  if (!trimmed) {
    heroGuideSuggestions.classList.remove("is-open");
    return;
  }

  const normalized = normalizeName(trimmed);
  const matches = officialHeroes
    .filter((hero) => hero.name.includes(trimmed) || hero.name.includes(normalized))
    .slice(0, 8);

  if (!matches.length) {
    heroGuideSuggestions.innerHTML = `<div class="suggestion-empty">没有匹配英雄</div>`;
    heroGuideSuggestions.classList.add("is-open");
    return;
  }

  matches.forEach((hero) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion-item";
    button.innerHTML = `
      ${imageMarkup(hero.name, "suggestion-avatar", getHeroImageUrl(hero.name), `${hero.name}头像`)}
      <span>${hero.name}</span>
      <small>${getHeroRole(hero)} · ${getHeroTypeText(hero)}</small>
    `;
    button.addEventListener("click", () => {
      renderHeroGuide(hero.name);
      heroGuideSuggestions.classList.remove("is-open");
    });
    heroGuideSuggestions.append(button);
  });
  heroGuideSuggestions.classList.add("is-open");
}

function createGenericProfile(hero) {
  const role = getHeroRole(hero);
  const type = hero.type;
  if (type === 5) return { threats: ["持续输出", "后排", "物理输出"], tags: ["射手", role], note: "主要威胁来自持续输出，优先用视野、强开或突进限制输出空间。" };
  if (type === 4) return { threats: ["突进", "爆发", "切后"], tags: ["刺客", role], note: "需要保护后排，避免单人清线和无视野走河道。" };
  if (type === 2) return { threats: ["法术伤害", "消耗", "控制"], tags: ["法师", role], note: "注意技能范围和草丛视野，必要时提前补魔抗。" };
  if (type === 3) return { threats: ["前排", "控制", "开团"], tags: ["坦克", role], note: "不要把关键技能全部交给前排，优先分割阵型或处理后排。" };
  if (type === 6) return { threats: ["保护", "控制", "团队增益"], tags: ["辅助", role], note: "优先判断其保护对象，针对敌方核心输出而不是只打辅助。" };
  return { threats: ["突进", "带线", "前排"], tags: ["战士", role], note: "注意边线牵制和进场时机，团战中优先拉扯其第一波技能。" };
}

function parseEnemies(text) {
  const parts = text
    .split(/[\s,，、;；/|]+/)
    .map((item) => normalizeName(item.trim()))
    .filter(Boolean);
  return [...new Set(parts)].map((name) => ({ name, profile: getProfile(name) }));
}

function addEnemyHero(rawName) {
  const name = normalizeName(rawName.trim());
  if (!heroByName.has(name) || selectedEnemies.includes(name) || selectedEnemies.length >= 5) return;
  selectedEnemies.push(name);
  syncEnemyInput();
  heroSearchInput.value = "";
  renderHeroSuggestions("");
  analyze();
}

function removeEnemyHero(name) {
  selectedEnemies = selectedEnemies.filter((heroName) => heroName !== name);
  syncEnemyInput();
  analyze();
}

function setEnemyHeroesFromText(text) {
  const names = parseEnemies(text)
    .filter((enemy) => enemy.profile)
    .map((enemy) => enemy.name);
  selectedEnemies = [...new Set(names)].slice(0, 5);
  syncEnemyInput();
  renderHeroSuggestions("");
  analyze();
}

function syncEnemyInput() {
  input.value = selectedEnemies.join(" ");
  renderSelectedEnemies();
}

function renderSelectedEnemies() {
  selectedEnemyChips.innerHTML = "";
  if (!selectedEnemies.length) {
    selectedEnemyChips.innerHTML = `<span class="empty-chip">尚未添加敌方英雄</span>`;
    return;
  }

  selectedEnemies.forEach((name) => {
    const button = document.createElement("button");
    button.className = "enemy-chip";
    button.type = "button";
    button.innerHTML = `
      ${imageMarkup(name, "chip-avatar", getHeroImageUrl(name), `${name}头像`)}
      <span>${name}</span>
      <b aria-hidden="true">×</b>
    `;
    button.addEventListener("click", () => removeEnemyHero(name));
    selectedEnemyChips.append(button);
  });
}

function renderHeroSuggestions(query) {
  const trimmed = query.trim();
  if (!trimmed) {
    heroSuggestions.innerHTML = "";
    heroSuggestions.classList.remove("is-open");
    return;
  }

  const normalized = normalizeName(trimmed);
  const matches = officialHeroes
    .filter((hero) => !selectedEnemies.includes(hero.name))
    .filter((hero) => hero.name.includes(trimmed) || hero.name.includes(normalized))
    .slice(0, 8);

  heroSuggestions.innerHTML = "";
  if (!matches.length) {
    heroSuggestions.innerHTML = `<div class="suggestion-empty">没有匹配英雄</div>`;
    heroSuggestions.classList.add("is-open");
    return;
  }

  matches.forEach((hero) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion-item";
    button.innerHTML = `
      ${imageMarkup(hero.name, "suggestion-avatar", getHeroImageUrl(hero.name), `${hero.name}头像`)}
      <span>${hero.name}</span>
      <small>${getHeroRole(hero)} · ${getHeroTypeText(hero)}</small>
    `;
    button.addEventListener("click", () => addEnemyHero(hero.name));
    heroSuggestions.append(button);
  });
  heroSuggestions.classList.add("is-open");
}

function createCandidate(hero) {
  const plan = refinedPlans[hero.name] || {};
  return {
    name: hero.name,
    role: getHeroRole(hero),
    type: getHeroTypeText(hero),
    counters: plan.counters || [],
    answers: plan.answers || [],
    build: plan.build || defaultBuildForHero(hero),
    tips: plan.tips || defaultTipsForHero(hero),
    refined: Boolean(refinedPlans[hero.name])
  };
}

function defaultBuildForHero(hero) {
  const role = getHeroRole(hero);
  if (role === "打野") {
    if (hero.type === 2) return ["符文大剑", "抵抗之靴", "回响之杖", "博学者之怒", "虚无法杖", "辉月"];
    if (hero.type === 3) return ["巨人之握", "抵抗之靴", "红莲斗篷", "不祥征兆", "魔女斗篷", "霸者重装"];
    return ["贪婪之噬", "抵抗之靴", "暗影战斧", "宗师之力", "纯净苍穹", "魔女斗篷"];
  }
  if (role === "中路" || hero.type === 2) return ["冷静之靴", "痛苦面具", "回响之杖", "博学者之怒", "虚无法杖", "辉月"];
  if (role === "发育路" || hero.type === 5) return ["急速战靴", "末世", "无尽战刃", "仁者破晓", "逐日之弓", "魔女斗篷"];
  if (role === "游走" || hero.type === 6) return ["近卫·救赎", "抵抗之靴", "旭日初光", "不祥征兆", "魔女斗篷", "霸者重装"];
  if (hero.type === 3) return ["抵抗之靴", "红莲斗篷", "不祥征兆", "魔女斗篷", "霸者重装", "血魔之怒"];
  return ["抵抗之靴", "暗影战斧", "冰痕之握", "纯净苍穹", "魔女斗篷", "不祥征兆"];
}

function defaultTipsForHero(hero) {
  const role = getHeroRole(hero);
  if (role === "打野") return ["优先通过视野和节奏压缩敌方核心发育。", "切后前确认敌方关键控制是否交出。"];
  if (role === "游走") return ["先做视野，再决定开团或保护。", "己方缺前排时优先选择更肉的游走装备。"];
  if (role === "发育路") return ["不要单独带深线，等辅助或打野给视野。", "敌方刺客强时保命装优先级提高。"];
  if (role === "中路") return ["清线后优先支援边路或保护野区。", "面对强突进阵容时保留控制技能自保。"];
  return ["处理边线后再参团，避免被牵制。", "团战中先卡位置，不要孤立追击。"];
}

function scoreHero(candidate, enemies) {
  const enemyNames = enemies.map((enemy) => enemy.name);
  const enemyThreats = enemies.flatMap((enemy) => enemy.profile?.threats || []);
  const enemyRoles = enemies.map((enemy) => enemy.profile?.role).filter(Boolean);
  const candidateHero = heroByName.get(candidate.name);
  const candidateTypes = [candidateHero?.type, candidateHero?.type2].filter(Boolean);
  let score = 42 + (candidate.refined ? 3 : 0);
  const reasons = [];

  candidate.counters.forEach((name) => {
    if (enemyNames.includes(name)) {
      score += 12;
      reasons.push(`针对 ${name}：${counterReason(enemyThreats, candidate.role)}。`);
    }
  });

  const profile = getProfile(candidate.name);
  if (enemyThreats.some((threat) => ["回血", "前排", "坦度"].includes(threat))) {
    if (candidateTypes.includes(5) || candidate.role === "发育路") {
      score += 9;
      reasons.push("敌方前排或回复较多，持续输出位可以更稳定地处理正面。");
    }
    if (["宫本武藏", "吕布", "哪吒", "马可波罗"].includes(candidate.name)) {
      score += 9;
      reasons.push("敌方回复或坦度高，适合用重伤、真伤或锁定进场限制收益。");
    }
  }

  if (enemyThreats.some((threat) => ["持续输出", "站桩", "后排"].includes(threat))) {
    if (candidate.role === "打野" || candidateTypes.includes(4)) {
      score += 10;
      reasons.push("敌方后排输出压力高，突进或刺客位能直接压缩输出环境。");
    }
    if (candidate.role === "中路") {
      score += 6;
      reasons.push("中路控制和消耗可以限制敌方站桩输出的推进节奏。");
    }
    if (candidate.role === "游走") {
      score += 5;
      reasons.push("游走位能用先手开团或视野压制帮助队伍处理后排。");
    }
  }

  if (enemyThreats.some((threat) => ["突进", "隐身", "切后", "爆发"].includes(threat))) {
    if (candidate.role === "游走") {
      score += 12;
      reasons.push("敌方切后强，游走位的视野、保护和反手控制优先级更高。");
    }
    if (candidate.role === "对抗路" || candidateTypes.includes(3)) {
      score += 8;
      reasons.push("前排或坦边能吸收第一波进场，降低后排被秒风险。");
    }
    if (candidate.role === "发育路" && !["虞姬", "狄仁杰"].includes(candidate.name)) {
      score -= 4;
    }
  }

  if (enemyThreats.includes("控制") && (candidate.name === "庄周" || candidate.role === "游走")) {
    score += candidate.name === "庄周" ? 12 : 6;
    reasons.push("敌方控制多，解控、护盾和反手保护的价值更高。");
  }

  if (enemyRoles.includes("游走") && candidate.role === "中路") {
    score += 3;
  }
  if (enemyRoles.includes("对抗路") && candidate.role === "发育路") {
    score += 3;
  }
  if (enemyRoles.includes("发育路") && ["打野", "中路"].includes(candidate.role)) {
    score += 4;
  }

  if (profile?.tags.includes("刺客") && enemyThreats.some((threat) => ["后排", "持续输出"].includes(threat))) {
    score += 5;
    reasons.push("刺客位可以针对敌方后排核心，压低其输出环境。");
  }

  if (!reasons.length) {
    reasons.push(`${candidate.role}位可补足阵容功能，适合按当前威胁调整打法。`);
    reasons.push(`英雄类型为${candidate.type}，可根据对局承担对应职责。`);
  }

  return { ...candidate, score: Math.min(score, 99), reasons: [...new Set(reasons)].slice(0, 4) };
}

function diversifyCandidates(scored, limit = 24) {
  const selected = [];
  const roleCounts = new Map();
  const typeCounts = new Map();
  const maxPerRole = 4;

  scored.forEach((candidate) => {
    const roleCount = roleCounts.get(candidate.role) || 0;
    const primaryType = candidate.type.split("/")[0];
    const typeCount = typeCounts.get(primaryType) || 0;
    if (selected.length < limit && roleCount < maxPerRole && typeCount < 6) {
      selected.push(candidate);
      roleCounts.set(candidate.role, roleCount + 1);
      typeCounts.set(primaryType, typeCount + 1);
    }
  });

  scored.forEach((candidate) => {
    if (selected.length < limit && !selected.some((picked) => picked.name === candidate.name)) {
      selected.push(candidate);
    }
  });

  return selected;
}

function counterReason(threats, role) {
  if (threats.includes("回血")) return "能压制回复节奏，迫使敌方核心提前交技能";
  if (threats.includes("突进") || threats.includes("隐身")) return role === "游走" ? "能保护后排并反手留人" : "能用控制或承伤降低切后收益";
  if (threats.includes("持续输出")) return "能打断站桩输出或直接威胁后排";
  if (threats.includes("控制")) return "能用生存、解控或远距离输出降低控制链收益";
  return "能覆盖该英雄的主要打法";
}

function analyze() {
  currentEnemies = parseEnemies(input.value);
  const enemyNames = new Set(currentEnemies.map((enemy) => enemy.name));
  const scored = officialHeroes
    .filter((hero) => !enemyNames.has(hero.name))
    .map(createCandidate)
    .map((hero) => scoreHero(hero, currentEnemies))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "zh-CN"));
  currentResults = diversifyCandidates(scored, 30);
  render();
}

function render() {
  renderBattleDeck();
  renderSummary();
  renderEnemies();
  renderRecommendations();
}

function renderBattleDeck() {
  const topPick = currentResults[0];
  const threats = currentEnemies.flatMap((enemy) => enemy.profile?.threats || []);

  if (!currentEnemies.length || !topPick) {
    battleMode.textContent = "等待输入敌方阵容";
    battleDeckText.textContent = "输入 1 到 5 个对面英雄后，平台会优先给出首选英雄、备选位置和出装方向。";
    heroSpotlight.innerHTML = `<div class="spotlight-empty">等待生成首推英雄</div>`;
    lineupStrip.innerHTML = "";
    return;
  }

  battleMode.textContent = buildPlanText([...new Set(threats)]);
  battleDeckText.textContent = `当前首推 ${topPick.name}，推荐度 ${topPick.score}，适合以${topPick.role}位应对这套敌方阵容。`;
  heroSpotlight.innerHTML = `
    <div class="spotlight-glow"></div>
    ${imageMarkup(topPick.name, "spotlight-avatar", getHeroImageUrl(topPick.name), `${topPick.name}头像`)}
    <div class="spotlight-info">
      <span>${topPick.refined ? "精细策略" : "通用策略"}</span>
      <strong>${topPick.name}</strong>
      <p>${topPick.role} · ${topPick.type}</p>
    </div>
  `;

  lineupStrip.innerHTML = currentResults
    .slice(0, 3)
    .map((hero, index) => `
      <div class="lineup-chip">
        ${imageMarkup(hero.name, "lineup-avatar", getHeroImageUrl(hero.name), `${hero.name}头像`)}
        <div>
          <strong>${index + 1}. ${hero.name}</strong>
          <span>${hero.role} · ${hero.score}</span>
        </div>
      </div>
    `)
    .join("");
}

function renderSummary() {
  const known = currentEnemies.filter((enemy) => enemy.profile);
  enemyCount.textContent = known.length;
  heroTotal.textContent = officialHeroes.length;
  itemTotal.textContent = officialItems.length;
  coverageNote.textContent = `已内置 ${officialHeroes.length} 个官方英雄和 ${officialItems.length} 件装备。`;

  if (!currentEnemies.length) {
    threatSummary.textContent = "等待输入";
    planSummary.textContent = "先输入对面英雄";
    riskSummary.textContent = "暂无";
    return;
  }

  const threatCounts = {};
  known.forEach((enemy) => {
    enemy.profile.threats.forEach((threat) => {
      threatCounts[threat] = (threatCounts[threat] || 0) + 1;
    });
  });

  const threats = Object.entries(threatCounts).sort((a, b) => b[1] - a[1]).map(([name]) => name);
  threatSummary.textContent = threats.slice(0, 4).join("、") || "有未识别英雄";
  planSummary.textContent = buildPlanText(threats);
  riskSummary.textContent = buildRiskText(known);
}

function buildPlanText(threats) {
  if (threats.includes("突进") || threats.includes("隐身")) return "优先补保护、前排和反手控制";
  if (threats.includes("回血")) return "补重伤、真伤、锁定进场或持续输出";
  if (threats.includes("持续输出")) return "强开后排，避免拖成正面站桩";
  if (threats.includes("控制")) return "提高解控、霸体、魔抗和保命装优先级";
  return "按敌方核心位选择针对方案";
}

function buildRiskText(known) {
  const roles = known.map((enemy) => enemy.profile.role);
  if (known.some((enemy) => enemy.profile.threats.includes("隐身"))) return "视野压力高，后排不要单独清线";
  if (roles.filter((role) => role === "中路" || role === "发育路" || role === "打野").length >= 3) return "敌方伤害位多，先手和保命装都很关键";
  if (roles.includes("游走") && roles.includes("对抗路")) return "敌方正面团较稳，需要拉扯和分割阵型";
  return "注意关键控制和核心输出位置";
}

function renderEnemies() {
  enemyGrid.innerHTML = "";
  if (!currentEnemies.length) {
    enemyGrid.innerHTML = `<div class="empty-state">输入敌方英雄后，这里会显示识别结果。</div>`;
    return;
  }

  currentEnemies.forEach((enemy) => {
    const card = document.createElement("article");
    card.className = "enemy-card";
    if (!enemy.profile) {
      card.innerHTML = `<strong>${enemy.name}</strong><span>暂未匹配到官方英雄，请检查名称。</span>`;
    } else {
      card.innerHTML = `
        <div class="enemy-head">
          ${imageMarkup(enemy.name, "enemy-avatar", getHeroImageUrl(enemy.name), `${enemy.name}头像`)}
          <div>
            <strong>${enemy.name}</strong>
            <span>${enemy.profile.role} · ${enemy.profile.tags.join(" · ")}</span>
          </div>
        </div>
        <p>${enemy.profile.note}</p>
      `;
    }
    enemyGrid.append(card);
  });
}

function renderRecommendations() {
  recommendations.innerHTML = "";
  const role = roleFilter.value;
  const filtered = currentResults
    .filter((hero) => role === "all" || hero.role === role)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "zh-CN"))
    .slice(0, 18);

  if (!filtered.length) {
    recommendations.innerHTML = `<div class="empty-state">没有符合当前筛选的位置方案，切换位置或增加敌方英雄再试。</div>`;
    return;
  }

  filtered.forEach((hero, index) => {
    const card = document.createElement("details");
    card.className = "hero-card hero-accordion";
    if (index === 0) card.open = true;
    const brief = getHeroSkillBrief(hero.name);
    const buildItems = hero.build.map((name, itemIndex) => buildItemChip(name, itemIndex + 1)).join("");
    card.innerHTML = `
      <summary class="hero-summary">
        <div class="hero-head hero-guide-trigger" data-hero-name="${hero.name}" title="查看 ${hero.name} 英雄介绍">
          ${imageMarkup(hero.name, "avatar", getHeroImageUrl(hero.name), `${hero.name}头像`)}
          <div>
            <h4>${index + 1}. ${hero.name}</h4>
            <div class="hero-role">${hero.role} · ${hero.type}</div>
          </div>
        </div>
        <div class="summary-score">
          <span>推荐度 ${hero.score}</span>
          <b>${index === 0 ? "首推" : "展开"}</b>
        </div>
      </summary>
      <div class="hero-skill-popover">
        <strong>${hero.name} 技能效果</strong>
        <p>${brief.style}</p>
        <ul>${brief.skills.slice(0, 3).map((skill) => `<li>${skill}</li>`).join("")}</ul>
      </div>
      <div class="score-row">
        <div class="tag-row">
          <span class="tag">推荐度 ${hero.score}</span>
          <span class="tag warn">${hero.refined ? "精细策略" : "通用策略"}</span>
        </div>
        <div class="score-bar"><div class="score-fill" style="width:${hero.score}%"></div></div>
      </div>
      <ul class="reason-list">${hero.reasons.map((reason) => `<li>${reason}</li>`).join("")}</ul>
      <div class="build-block">
        <span class="build-label">推荐出装</span>
        <div class="build-list item-build-list">${buildItems}</div>
      </div>
      <div class="build-block">
        <span class="build-label">对局提醒</span>
        <ul class="tip-list">${hero.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>
      </div>
    `;
    recommendations.append(card);
  });
}

function buildItemChip(name, order) {
  const item = itemByName.get(name);
  if (!item) return `<span class="build-chip">${name}</span>`;
  const effectText = item.desc || `${item.name} 的装备效果暂无描述`;
  return `
    <button
      class="build-chip build-chip-action"
      type="button"
      data-item-id="${item.id}"
      data-item-name="${item.name}"
      title="${item.name}：${effectText}"
    >
      <b>${order}</b>
      <img src="${getItemImageUrl(item)}" alt="${item.name}" loading="lazy" />
      <span>${item.name}</span>
      <small>${effectText}</small>
    </button>
  `;
}

function renderItems() {
  const query = itemSearch.value.trim();
  const type = itemFilter.value;
  const items = officialItems.filter((item) => {
    const matchesQuery = !query || item.name.includes(query) || item.desc.includes(query);
    const matchesType = type === "all" || String(item.type) === type;
    return matchesQuery && matchesType;
  });

  itemGrid.innerHTML = "";
  if (!items.length) {
    itemGrid.innerHTML = `<div class="empty-state">没有匹配的装备。</div>`;
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "item-card";
    card.id = `item-${item.id}`;
    card.classList.toggle("is-highlighted", highlightedItemId === item.id);
    card.innerHTML = `
      <img class="item-icon" src="${getItemImageUrl(item)}" alt="${item.name}" loading="lazy" />
      <div>
        <div class="item-head">
          <strong>${item.name}</strong>
          <span>${itemTypeNames[item.type] || "装备"}</span>
        </div>
        <p>${item.desc || "暂无描述"}</p>
        <div class="item-price">售价 ${item.price} · 总价 ${item.totalPrice}</div>
      </div>
    `;
    itemGrid.append(card);
  });
}

function showStrategyView() {
  strategyView.classList.add("is-active");
  itemsView.classList.remove("is-active");
  heroGuideView.classList.remove("is-active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showItemsView() {
  strategyView.classList.remove("is-active");
  heroGuideView.classList.remove("is-active");
  itemsView.classList.add("is-active");
  renderItems();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHeroGuideView(heroName = selectedGuideHero) {
  strategyView.classList.remove("is-active");
  itemsView.classList.remove("is-active");
  heroGuideView.classList.add("is-active");
  renderHeroGuide(heroName);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openItemDetail(itemId, itemName) {
  highlightedItemId = Number(itemId);
  itemSearch.value = itemName;
  itemFilter.value = "all";
  showItemsView();
  window.setTimeout(() => {
    const card = document.querySelector(`#item-${highlightedItemId}`);
    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 60);
}

quickComps.forEach((comp) => {
  const button = document.createElement("button");
  button.textContent = comp.label;
  button.addEventListener("click", () => {
    setEnemyHeroesFromText(comp.value);
  });
  quickList.append(button);
});

analyzeBtn.addEventListener("click", () => {
  if (heroSearchInput.value.trim()) {
    setEnemyHeroesFromText(`${input.value} ${heroSearchInput.value}`);
  } else {
    analyze();
  }
});
clearBtn.addEventListener("click", () => {
  selectedEnemies = [];
  heroSearchInput.value = "";
  syncEnemyInput();
  renderHeroSuggestions("");
  analyze();
});
roleFilter.addEventListener("change", renderRecommendations);
heroSearchInput.addEventListener("input", () => renderHeroSuggestions(heroSearchInput.value));
heroSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const firstSuggestion = heroSuggestions.querySelector(".suggestion-item");
    if (firstSuggestion) {
      firstSuggestion.click();
    } else if (heroSearchInput.value.trim()) {
      setEnemyHeroesFromText(`${input.value} ${heroSearchInput.value}`);
    }
  }
  if (event.key === "Backspace" && !heroSearchInput.value && selectedEnemies.length) {
    removeEnemyHero(selectedEnemies[selectedEnemies.length - 1]);
  }
});
heroSearchInput.addEventListener("paste", () => {
  window.setTimeout(() => {
    if (/[\s,，、;；/|]+/.test(heroSearchInput.value)) {
      setEnemyHeroesFromText(`${input.value} ${heroSearchInput.value}`);
      heroSearchInput.value = "";
    } else {
      renderHeroSuggestions(heroSearchInput.value);
    }
  }, 0);
});
heroGuideSearch.addEventListener("input", () => renderGuideSuggestions(heroGuideSearch.value));
heroGuideSearch.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  const firstSuggestion = heroGuideSuggestions.querySelector(".suggestion-item");
  if (firstSuggestion) {
    firstSuggestion.click();
  } else if (heroGuideSearch.value.trim()) {
    renderHeroGuide(heroGuideSearch.value);
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".hero-picker")) renderHeroSuggestions("");
  if (!event.target.closest(".guide-search")) heroGuideSuggestions.classList.remove("is-open");
});
itemSearch.addEventListener("input", () => {
  highlightedItemId = null;
  renderItems();
});
itemFilter.addEventListener("change", () => {
  highlightedItemId = null;
  renderItems();
});
recommendations.addEventListener("click", (event) => {
  const chip = event.target.closest(".build-chip-action");
  if (chip) {
    openItemDetail(chip.dataset.itemId, chip.dataset.itemName);
    return;
  }
  const heroTrigger = event.target.closest(".hero-guide-trigger");
  if (heroTrigger) {
    showHeroGuideView(heroTrigger.dataset.heroName);
  }
});
focusRecommendBtn.addEventListener("click", () => {
  document.querySelector("#recommendations").scrollIntoView({ behavior: "smooth", block: "start" });
});
focusItemsBtn.addEventListener("click", showItemsView);
focusHeroGuideBtn.addEventListener("click", () => showHeroGuideView());
openItemsBtn.addEventListener("click", showItemsView);
openHeroGuideBtn.addEventListener("click", () => showHeroGuideView());
backToStrategyBtn.addEventListener("click", showStrategyView);
backFromHeroGuideBtn.addEventListener("click", showStrategyView);
setEnemyHeroesFromText(quickComps[1].value);
renderHeroGuide(selectedGuideHero);
renderItems();
