document.documentElement.classList.add("js");

const dimensions = {
  recoverySpeed: "情绪恢复速度",
  boundaryClarity: "关系边界清晰度",
  attributionStyle: "归因与自我评价",
  supportAbility: "支持系统调用力",
  growthTransform: "成长转化能力",
};

const questions = [
  {
    id: 1,
    dimension: "recoverySpeed",
    title: "一段关系结束后的前三天，你最常见的状态是？",
    options: [
      ["几乎整天陷在回忆里，难以正常生活", 1],
      ["情绪很重，但还能勉强维持节奏", 2],
      ["会难过，但能安排一些让自己稳定下来的事", 3],
      ["允许自己难过，同时很快建立新的恢复安排", 4],
    ],
  },
  {
    id: 2,
    dimension: "boundaryClarity",
    title: "当对方反复越过你的底线时，你通常会？",
    options: [
      ["先忍着，担心说出来关系会更糟", 1],
      ["会不舒服，但表达时常常很犹豫", 2],
      ["会明确表达一次，看对方是否愿意调整", 3],
      ["能及时指出问题，也能接受不合适的人离开", 4],
    ],
  },
  {
    id: 3,
    dimension: "attributionStyle",
    title: "被喜欢的人冷淡对待时，你脑海里最先出现的是？",
    options: [
      ["是不是我哪里不够好", 1],
      ["可能是我做错了什么", 2],
      ["我会先难受，再看是不是双方都有问题", 3],
      ["我会区分事实和感受，不急着把问题全归到自己身上", 4],
    ],
  },
  {
    id: 4,
    dimension: "supportAbility",
    title: "当你情绪明显失衡时，你更可能怎么做？",
    options: [
      ["谁都不说，自己硬扛", 1],
      ["想求助，但最后还是忍住", 2],
      ["会找一两个信任的人聊聊", 3],
      ["会主动寻求支持，也会说明自己需要怎样被陪伴", 4],
    ],
  },
  {
    id: 5,
    dimension: "growthTransform",
    title: "回看过去受伤的关系，你更接近哪种感受？",
    options: [
      ["只觉得遗憾和后悔，很少真正整理过", 1],
      ["知道受了伤，但还没想清楚学到了什么", 2],
      ["已经能看见一些模式和提醒", 3],
      ["能清楚总结经验，也会据此调整下一次选择", 4],
    ],
  },
  {
    id: 6,
    dimension: "recoverySpeed",
    title: "当你忍不住反复想起过去的争吵时，你会？",
    options: [
      ["越想越难受，停不下来", 1],
      ["知道要停，但经常被情绪带走", 2],
      ["会用散步、写字或做事帮助自己抽离", 3],
      ["能快速识别触发点，并把注意力拉回当下", 4],
    ],
  },
  {
    id: 7,
    dimension: "boundaryClarity",
    title: "别人让你做一件你并不想做的事时，你通常会？",
    options: [
      ["先答应，再默默委屈", 1],
      ["嘴上答应，心里一直别扭", 2],
      ["会婉转拒绝，但有时仍会心虚", 3],
      ["会明确拒绝，并尊重彼此边界", 4],
    ],
  },
  {
    id: 8,
    dimension: "attributionStyle",
    title: "关系里出现冲突后，你通常最先复盘的是？",
    options: [
      ["我是不是又把事情搞砸了", 1],
      ["主要是我哪里没处理好", 2],
      ["我和对方各自做了什么", 3],
      ["事实、需求与边界是否匹配", 4],
    ],
  },
  {
    id: 9,
    dimension: "supportAbility",
    title: "情绪低谷期收到朋友关心时，你会？",
    options: [
      ["说没事，不想麻烦别人", 1],
      ["很想倾诉，但怕被看轻", 2],
      ["会简单说出近况", 3],
      ["能具体说出自己需要陪伴、倾听还是建议", 4],
    ],
  },
  {
    id: 10,
    dimension: "growthTransform",
    title: "如果你发现自己总在同一种关系模式里受伤，你更可能？",
    options: [
      ["觉得这是命，不太会改变", 1],
      ["知道不对，但不知道从哪改", 2],
      ["会尝试记录和调整一些习惯", 3],
      ["会系统复盘，并主动建立新的关系规则", 4],
    ],
  },
  {
    id: 11,
    dimension: "recoverySpeed",
    title: "被否定后，你恢复到能正常工作学习通常需要多久？",
    options: [
      ["很久，常常影响几天以上", 1],
      ["要一整天才能慢慢好一点", 2],
      ["几个小时内能慢慢稳定", 3],
      ["能接住情绪，同时较快回到生活节奏", 4],
    ],
  },
  {
    id: 12,
    dimension: "boundaryClarity",
    title: "你对“我不舒服”这件事的态度更像？",
    options: [
      ["常常忽略，怕显得矫情", 1],
      ["能感觉到，但不太敢说", 2],
      ["会提醒自己重视感受", 3],
      ["会把不舒服当作重要信号，及时处理", 4],
    ],
  },
  {
    id: 13,
    dimension: "attributionStyle",
    title: "当别人误解你时，你更容易？",
    options: [
      ["先怀疑是不是自己表达不好", 1],
      ["会内耗很久，反复想怎么补救", 2],
      ["会尝试解释，也允许对方未必马上理解", 3],
      ["既会澄清，也知道误解不等于自己的价值被否定", 4],
    ],
  },
  {
    id: 14,
    dimension: "supportAbility",
    title: "如果最近状态持续不好，你更可能采取哪一步？",
    options: [
      ["先扛着，等自己慢慢过去", 1],
      ["想找资源，但总拖着没行动", 2],
      ["会问朋友或搜索一些靠谱方法", 3],
      ["会主动建立支持计划，比如倾诉、练习或专业帮助", 4],
    ],
  },
  {
    id: 15,
    dimension: "growthTransform",
    title: "一次关系挫折过后，你最可能产生的是？",
    options: [
      ["以后还是别投入了", 1],
      ["我是不是就不适合亲密关系", 2],
      ["我需要重新认识自己在关系里的习惯", 3],
      ["这次受伤提醒了我该升级自己的选择标准", 4],
    ],
  },
  {
    id: 16,
    dimension: "recoverySpeed",
    title: "触景生情时，你通常如何让自己从情绪漩涡里出来？",
    options: [
      ["基本出不来，只能一直沉浸", 1],
      ["会刷手机分散注意力，但没太大用", 2],
      ["会换环境、找事做，让自己缓一缓", 3],
      ["有一套有效的安抚方式，能逐步恢复稳定", 4],
    ],
  },
  {
    id: 17,
    dimension: "boundaryClarity",
    title: "当你已经察觉一段关系很消耗时，你通常会？",
    options: [
      ["继续忍，希望对方能自己变好", 1],
      ["想离开，但总会被拉回去", 2],
      ["会逐步拉开距离，观察变化", 3],
      ["能坚定退出不适合的关系", 4],
    ],
  },
  {
    id: 18,
    dimension: "attributionStyle",
    title: "别人情绪不好时，你是否容易自动觉得和自己有关？",
    options: [
      ["非常容易，几乎会立刻自责", 1],
      ["有点容易，会暗自猜测", 2],
      ["偶尔会，但能提醒自己先别下结论", 3],
      ["很少会，我会先确认事实再判断", 4],
    ],
  },
  {
    id: 19,
    dimension: "supportAbility",
    title: "你身边是否有一套稳定的情绪支持资源？",
    options: [
      ["几乎没有，我总是一个人消化", 1],
      ["有人可找，但我不太会使用", 2],
      ["有几个可以联系的人或方式", 3],
      ["我知道什么时候找谁、用什么方式帮助自己", 4],
    ],
  },
  {
    id: 20,
    dimension: "growthTransform",
    title: "如果明天重新进入一段关系，你最想带着什么进去？",
    options: [
      ["只希望别再受伤", 1],
      ["希望自己别那么在意", 2],
      ["希望更懂得照顾自己的感受", 3],
      ["希望带着更清晰的边界和更成熟的选择进入", 4],
    ],
  },
];

const quizGroups = [
  {
    label: "第 1 组｜情绪回稳",
    shortLabel: "情绪回稳",
    start: 0,
    end: 3,
    support: "先按最近的真实状态来选，不需要把自己表现得很坚强。",
  },
  {
    label: "第 2 组｜边界感",
    shortLabel: "边界感",
    start: 4,
    end: 7,
    support: "做到这里时，如果有点刺痛感，说明你已经开始看见真正卡住的地方了。",
  },
  {
    label: "第 3 组｜自我归因",
    shortLabel: "自我归因",
    start: 8,
    end: 11,
    support: "这一组更像在看你平时怎么对待自己，别急着选“更正确”的答案。",
  },
  {
    label: "第 4 组｜支持系统",
    shortLabel: "支持系统",
    start: 12,
    end: 15,
    support: "已经过半了，继续往下，你会更清楚自己是怎么一个人扛住很多事的。",
  },
  {
    label: "第 5 组｜成长转化",
    shortLabel: "成长转化",
    start: 16,
    end: 19,
    support: "最后一组了，看看这些经历有没有正在慢慢变成你的力量。",
  },
];

const stageProfiles = [
  {
    max: 34,
    name: "敏感防御期",
    tagline: "你不是不在乎关系，而是太容易先受伤、再自我保护。",
    summary: "你对关系中的风吹草动非常敏感，受挫后容易陷入自责或回避，更需要先把安全感拉回自己身上。",
    pattern: "你可能习惯先猜测自己哪里不够好，再决定要不要表达感受。关系一有波动，内心就会迅速启动防御。",
    strength: "你的敏锐度很高，能很快察觉关系中的细微变化。这份敏感如果被好好照顾，会成为很珍贵的直觉。",
    actions: [
      "连续 3 天写下让你起波动的事件，只记录事实，不评价自己。",
      "暂停查看会触发你情绪的人或内容 72 小时，给自己一个缓冲区。",
      "练习一句边界表达：我现在需要一点时间整理感受，晚点再回复你。",
    ],
  },
  {
    max: 48,
    name: "情绪淤积期",
    tagline: "你已经在觉察问题，只是很多情绪还堆在心里没有出口。",
    summary: "你已经开始意识到关系问题，但情绪常常堆积在心里，知道该调整，却还没找到稳定的方法。",
    pattern: "你能察觉到不舒服，却常常在表达和忍耐之间摇摆。很多情绪被你留在心里，最后变成反复内耗。",
    strength: "你并不是没有力量，而是正在形成自己的节奏。一旦找到适合的恢复方式，会进步得很快。",
    actions: [
      "这周做 1 次“触发点复盘”：写下事件、感受、需要，而不是只写委屈。",
      "挑一个最信任的人，具体说出你现在最需要的是倾听还是建议。",
      "列出 3 条你在关系里最不能接受的相处方式，反复提醒自己。",
    ],
  },
  {
    max: 62,
    name: "觉察启动期",
    tagline: "你正在从“反复受伤”走向“看懂自己并开始改写模式”。",
    summary: "你已经能看见自己在关系中的惯性反应，也愿意开始调整，正处在从“看见问题”到“形成新习惯”的阶段。",
    pattern: "你开始分得清哪些情绪来自自己，哪些问题来自关系不匹配。虽然偶尔还是会被旧模式拉回去，但已不再完全失控。",
    strength: "你有很强的自我反思能力，也愿意为成长付出行动，这是建立稳定复原力的关键底座。",
    actions: [
      "挑一个高频触发场景，提前写好你的新回应方式。",
      "每次想自责时，补一句：我先确认事实，再决定要不要怪自己。",
      "给自己安排一个固定恢复动作，比如散步 20 分钟、写 10 分钟记录。",
    ],
  },
  {
    max: 72,
    name: "稳定重建期",
    tagline: "你已经不是靠硬撑在恢复，而是在慢慢建立稳定的关系底盘。",
    summary: "你已经建立了较好的恢复节奏，能处理大部分关系波动，也开始更坚定地守住自己的边界和价值感。",
    pattern: "你通常不会把所有问题都背在自己身上，能在情绪和理性之间找到平衡，也知道怎样重新把自己安顿好。",
    strength: "你的稳定感和反思能力都在线，这会让你在关系中更少被消耗，也更容易筛选出真正合适的人。",
    actions: [
      "继续优化你的支持系统，明确哪类问题可以找谁帮助。",
      "复盘一段过去的关系，提炼 3 条你以后会坚持的选择标准。",
      "练习在舒服的关系里也表达需求，而不是只在出问题后才开口。",
    ],
  },
  {
    max: Infinity,
    name: "高复原力期",
    tagline: "你已经能把经历变成力量，而不是继续被旧伤定义。",
    summary: "你已经具备较成熟的关系恢复能力，能快速识别问题、照顾情绪、守住边界，并把经历转化为更清晰的选择。",
    pattern: "你通常能把关系中的波动视为信息，而不是对自我价值的审判。你知道如何修复自己，也知道什么时候该离开不合适的关系。",
    strength: "你最大的优势是稳定而清醒，这会让你在关系里更自由，也更有能力建立真正相互尊重的连接。",
    actions: [
      "把你最有效的恢复方式写成一张“个人情绪说明书”，以后持续迭代。",
      "继续练习在关系稳定时表达感谢和边界，让健康模式更加巩固。",
      "把一次重要经历整理成故事，提醒自己你是如何一步步成长到现在的。",
    ],
  },
];

const state = {
  currentQuestionIndex: 0,
  answers: Array(questions.length).fill(null),
};

const quizIntro = document.querySelector("[data-quiz-intro]");
const quizSection = document.querySelector("[data-quiz-section]");
const unlockOverlay = document.querySelector("[data-unlock-overlay]");
const quizCard = document.querySelector("[data-quiz-card]");
const resultCard = document.querySelector("[data-result-card]");
const progressGroup = document.querySelector("[data-progress-group]");
const progressRemaining = document.querySelector("[data-progress-remaining]");
const progressText = document.querySelector("[data-progress-text]");
const progressFill = document.querySelector("[data-progress-fill]");
const progressSupport = document.querySelector("[data-progress-support]");
const questionDimension = document.querySelector("[data-question-dimension]");
const questionTitle = document.querySelector("[data-question-title]");
const answersContainer = document.querySelector("[data-answers]");
const prevButton = document.querySelector("[data-prev]");
const resetButtons = document.querySelectorAll("[data-reset]");
const startButtons = document.querySelectorAll("[data-start-test]");
const radarCanvas = document.querySelector("[data-radar-canvas]");
const resultStage = document.querySelector("[data-result-stage]");
const resultTagline = document.querySelector("[data-result-tagline]");
const resultEmbrace = document.querySelector("[data-result-embrace]");
const resultSummary = document.querySelector("[data-result-summary]");
const resultSnapshotTitle = document.querySelector("[data-result-snapshot-title]");
const resultSnapshotBody = document.querySelector("[data-result-snapshot-body]");
const resultSnapshotStrong = document.querySelector("[data-result-snapshot-strong]");
const resultSnapshotFocus = document.querySelector("[data-result-snapshot-focus]");
const resultPattern = document.querySelector("[data-result-pattern]");
const resultStrength = document.querySelector("[data-result-strength]");
const resultBlindspot = document.querySelector("[data-result-blindspot]");
const resultNextStep = document.querySelector("[data-result-next-step]");
const resultActions = document.querySelector("[data-result-actions]");
const resultBadges = document.querySelector("[data-result-badges]");
const dimensionGrid = document.querySelector("[data-dimension-grid]");
const resultQuoteTitle = document.querySelector("[data-result-quote-title]");
const resultQuoteBody = document.querySelector("[data-result-quote-body]");
const resultShareTag = document.querySelector("[data-result-share-tag]");
const resultTitleList = document.querySelector("[data-result-title-list]");
const shareButton = document.querySelector("[data-share-card]");
const shareOutput = document.querySelector("[data-share-output]");
const redeemForm = document.querySelector("[data-redeem-form]");
const redeemInput = document.querySelector("#redeemCode");
const redeemFeedback = document.querySelector("[data-redeem-feedback]");
const deliveryTemplate = document.querySelector("[data-delivery-template]");
const copyDeliveryButton = document.querySelector("[data-copy-delivery]");
const demoCode = "YJ-2026-8888";

let activeRedeem = null;
document.body.classList.add("overlay-open");

function applyComfortCopy() {
  const unlockTag = document.querySelector(".unlock-card .section-tag");
  const unlockTitle = document.querySelector(".unlock-card h2");
  const unlockDescription = document.querySelector(".unlock-card .hero-description");
  const unlockLabel = document.querySelector(".unlock-card label[for='redeemCode']");
  const unlockButton = document.querySelector(".unlock-card .primary-button");
  const helperItems = document.querySelectorAll(".unlock-card .helper-list li");

  const heroTag = document.querySelector(".hero .section-tag");
  const heroTitle = document.querySelector(".hero h2");
  const heroDescription = document.querySelector(".hero .hero-description");
  const heroPrimaryButton = document.querySelector(".hero .primary-button");
  const heroSecondaryButton = document.querySelector(".hero .secondary-button");

  const redeemHeadingTag = document.querySelector("#redeem .section-heading .section-tag");
  const redeemHeadingTitle = document.querySelector("#redeem .section-heading h3");
  const redeemHeadingBody = document.querySelector("#redeem .section-heading p:last-child");
  const redeemCardTag = document.querySelector(".redeem-card .mini-tag");
  const redeemCardTitle = document.querySelector(".redeem-card h3");
  const redeemCardItems = document.querySelectorAll(".redeem-card .helper-list li");
  const deliveryTag = document.querySelector(".delivery-card .mini-tag");
  const deliveryTitle = document.querySelector(".delivery-card h3");
  const deliveryItems = document.querySelectorAll(".delivery-card .helper-list li");
  const deliveryNote = document.querySelector(".delivery-card .helper-note");

  if (unlockTag) unlockTag.textContent = "兑换码验证";
  if (unlockTitle) unlockTitle.textContent = "请输入兑换码";
  if (unlockDescription) {
    unlockDescription.textContent = "这是已购用户专属入口。输入兑换码后，我们就陪你慢慢看清这段关系里的卡点与恢复方式。";
    unlockDescription.classList.add("soft");
  }
  if (unlockLabel) unlockLabel.textContent = "兑换码";
  if (unlockButton) unlockButton.textContent = "验证并进入测试";
  if (helperItems[0]) helperItems[0].textContent = "建议复制链接到浏览器打开后，再输入兑换码。";
  if (helperItems[1]) helperItems[1].textContent = "如兑换失败或次数用完，请联系店铺客服补发。";

  if (heroTag) heroTag.textContent = "已购后使用";
  if (heroTitle) heroTitle.textContent = "输入兑换码，开始你的情感复原力测试。";
  if (heroDescription) {
    heroDescription.textContent = "这不是一份冷冰冰的测试表，而是一段帮你重新看懂自己关系恢复方式的小旅程。共 20 道题，约 3-5 分钟完成。";
    heroDescription.classList.add("soft");
  }
  if (heroPrimaryButton) heroPrimaryButton.textContent = "立即输入兑换码";
  if (heroSecondaryButton) heroSecondaryButton.textContent = "查看说明";

  if (redeemHeadingTag) redeemHeadingTag.textContent = "兑换码入口";
  if (redeemHeadingTitle) redeemHeadingTitle.textContent = "先验证兑换码，再开始测试。";
  if (redeemHeadingBody) redeemHeadingBody.textContent = "如果你是从小红书下单后打开这个页面，把收到的兑换码填在这里，就可以进入完整测试。";
  if (redeemCardTag) redeemCardTag.textContent = "使用路径";
  if (redeemCardTitle) redeemCardTitle.textContent = "这一页只做一件事：帮你顺利进入测试。";
  if (redeemCardItems[0]) redeemCardItems[0].textContent = "进入页面后，先输入兑换码。";
  if (redeemCardItems[1]) redeemCardItems[1].textContent = "验证成功后，系统才会解锁测试。";
  if (redeemCardItems[2]) redeemCardItems[2].textContent = "没有兑换码时，暂时无法进入题目页。";
  if (deliveryTag) deliveryTag.textContent = "使用说明";
  if (deliveryTitle) deliveryTitle.textContent = "手机上这样用会更顺。";
  if (deliveryItems[0]) deliveryItems[0].textContent = "复制链接到浏览器打开，不要直接在聊天窗口里使用。";
  if (deliveryItems[1]) deliveryItems[1].textContent = "输入兑换码后，完成 20 道题就可以查看结果。";
  if (deliveryItems[2]) deliveryItems[2].textContent = "建议按最近一段时间的真实状态作答。";
  if (deliveryNote) deliveryNote.textContent = "如果兑换异常或页面打不开，直接联系小红书店铺客服处理就可以。";
}

function getQuizGroup(index) {
  return quizGroups.find((group) => index >= group.start && index <= group.end) || quizGroups[0];
}

function setRedeemState(status, message) {
  redeemForm.classList.remove("is-loading", "is-success", "is-error");
  redeemFeedback.classList.remove("is-loading", "is-success", "is-error");

  if (status) {
    redeemForm.classList.add(`is-${status}`);
    redeemFeedback.classList.add(`is-${status}`);
  }

  redeemFeedback.textContent = message || "";
}

function syncRedeemStateFromMessage(message) {
  const normalized = String(message || "");

  if (!normalized) {
    redeemForm.classList.remove("is-loading", "is-success", "is-error");
    redeemFeedback.classList.remove("is-loading", "is-success", "is-error");
    return;
  }

  redeemForm.classList.remove("is-loading", "is-success", "is-error");
  redeemFeedback.classList.remove("is-loading", "is-success", "is-error");

  if (normalized.includes("成功") || normalized.includes("解锁")) {
    redeemForm.classList.add("is-success");
    redeemFeedback.classList.add("is-success");
    return;
  }

  if (normalized.includes("正在") || normalized.includes("稍等")) {
    redeemForm.classList.add("is-loading");
    redeemFeedback.classList.add("is-loading");
    return;
  }

  if (normalized.includes("失败") || normalized.includes("无效") || normalized.includes("先输入") || normalized.includes("仅支持")) {
    redeemForm.classList.add("is-error");
    redeemFeedback.classList.add("is-error");
    return;
  }
}

function unlockQuiz() {
  quizSection?.classList.remove("hidden");
  unlockOverlay?.classList.add("hidden");
  document.body.classList.remove("overlay-open");
}

function renderQuestion() {
  const question = questions[state.currentQuestionIndex];
  const group = getQuizGroup(state.currentQuestionIndex);
  const remaining = questions.length - (state.currentQuestionIndex + 1);
  progressText.textContent = `第 ${state.currentQuestionIndex + 1} / ${questions.length} 题`;
  progressGroup.textContent = group.label;
  progressRemaining.textContent = remaining === 0 ? "最后 1 题" : `还剩 ${remaining} 题`;
  progressFill.style.width = `${((state.currentQuestionIndex + 1) / questions.length) * 100}%`;
  progressSupport.textContent = group.support;
  questionDimension.textContent = dimensions[question.dimension];
  questionTitle.textContent = question.title;
  prevButton.disabled = state.currentQuestionIndex === 0;
  answersContainer.innerHTML = "";

  question.options.forEach(([label], optionIndex) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    if (state.answers[state.currentQuestionIndex] === optionIndex) {
      button.classList.add("active");
    }
    button.textContent = label;
    button.addEventListener("click", () => {
      state.answers[state.currentQuestionIndex] = optionIndex;
      if (state.currentQuestionIndex < questions.length - 1) {
        state.currentQuestionIndex += 1;
        renderQuestion();
      } else {
        renderResult();
      }
    });
    answersContainer.appendChild(button);
  });
}

function getScores() {
  const totals = {
    recoverySpeed: 0,
    boundaryClarity: 0,
    attributionStyle: 0,
    supportAbility: 0,
    growthTransform: 0,
  };

  questions.forEach((question, index) => {
    const selectedIndex = state.answers[index];
    const score = question.options[selectedIndex]?.[1] ?? 0;
    totals[question.dimension] += score;
  });

  return totals;
}

function getProfile(totalScore) {
  return stageProfiles.find((profile) => totalScore <= profile.max);
}

function getDimensionInsight(key, value) {
  const band = value <= 7 ? "low" : value <= 11 ? "mid" : "high";
  const copyMap = {
    recoverySpeed: {
      low: "你在关系波动后容易被情绪拖住，需要更明确的恢复动作与生活节奏支撑自己。",
      mid: "你已经有一些恢复办法，但在高触发时仍可能被旧情绪拉回去。",
      high: "你能比较快地接住情绪，并逐步把自己带回稳定状态。",
    },
    boundaryClarity: {
      low: "你更容易先忍耐再委屈自己，边界需要被更认真地看见和表达。",
      mid: "你已经能感觉到不舒服，但在说出来这一步上还会犹豫。",
      high: "你对关系边界比较清晰，也更知道什么样的人和关系适合自己。",
    },
    attributionStyle: {
      low: "你容易把关系问题先归到自己身上，这会加重反复内耗。",
      mid: "你开始练习区分事实和情绪，但偶尔还是会先责怪自己。",
      high: "你能较好地区分事实、感受和责任，不轻易把所有问题都揽过来。",
    },
    supportAbility: {
      low: "你习惯独自消化情绪，后面更需要建立可以被调用的支持系统。",
      mid: "你知道自己不是不能求助，而是还需要更具体地练习怎么开口。",
      high: "你拥有比较稳定的支持资源，也知道何时该向谁发出求助信号。",
    },
    growthTransform: {
      low: "你还在伤口里，暂时很难把经历转化成经验，这很正常。",
      mid: "你已经开始从关系经历中提炼线索，离真正形成新选择标准只差一步。",
      high: "你能把关系挫折转化为更清晰的选择标准，这会让你越走越稳。",
    },
  };

  return copyMap[key][band];
}

function getResultEmbrace(profile, weakest) {
  const embraceMap = {
    recoverySpeed: "你不是走不出来，只是每次情绪翻涌时，都还缺一个能稳稳接住自己的方式。",
    boundaryClarity: "你不是不会拒绝，只是太习惯先顾全关系，最后把自己放到了后面。",
    attributionStyle: "你不是太敏感，而是遇到波动时，总会下意识先反过来责怪自己。",
    supportAbility: "你不是不够坚强，你只是一个人撑了太久，还没习惯把难过交给别人一起分担。",
    growthTransform: "你不是没有成长，只是有些经历还停留在痛里，暂时还没被整理成真正保护你的经验。",
  };

  return `${profile.name} 这一阶段更想让你先记住：${embraceMap[weakest[0]]}`;
}

function getSnapshotCopy(profile, strongest, weakest) {
  return {
    title: "现在的你，最需要的不是更懂事，而是更会照顾自己。",
    body: `${profile.name} 说明你已经有一部分力量在慢慢长出来了。真正值得继续照顾的，是别再让 ${dimensions[weakest[0]]} 反复拖住你。`,
    strong: `当前优势：${dimensions[strongest[0]]}`,
    focus: `接下来更适合先照顾：${dimensions[weakest[0]]}`,
  };
}

function renderResult() {
  const scores = getScores();
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const profile = getProfile(total);
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  quizIntro.classList.add("hidden");
  quizCard.classList.add("hidden");
  resultCard.classList.remove("hidden");

  resultStage.textContent = `${profile.name} | 总分 ${total} / 80`;
  resultTagline.textContent = profile.tagline;
  resultEmbrace.textContent = getResultEmbrace(profile, weakest);
  resultSummary.textContent = profile.summary;
  const snapshot = getSnapshotCopy(profile, strongest, weakest);
  resultSnapshotTitle.textContent = snapshot.title;
  resultSnapshotBody.textContent = snapshot.body;
  resultSnapshotStrong.textContent = snapshot.strong;
  resultSnapshotFocus.textContent = snapshot.focus;
  resultPattern.textContent = profile.pattern;
  resultStrength.textContent = profile.strength;
  const narrative = getResultNarrative(profile, strongest, weakest);
  resultBlindspot.textContent = narrative.blindspot;
  resultNextStep.textContent = narrative.nextStep;
  resultActions.innerHTML = "";
  resultBadges.innerHTML = "";
  dimensionGrid.innerHTML = "";
  resultTitleList.innerHTML = "";

  [
    `当前阶段：${profile.name}`,
    `优势维度：${dimensions[strongest[0]]}`,
    `优先提升：${dimensions[weakest[0]]}`,
  ].forEach((label) => {
    const badge = document.createElement("span");
    badge.className = "result-badge";
    badge.textContent = label;
    resultBadges.appendChild(badge);
  });

  profile.actions.forEach((action) => {
    const item = document.createElement("li");
    item.textContent = action;
    resultActions.appendChild(item);
  });

  const sharePack = createShareAssets(profile, strongest, weakest);
  resultQuoteTitle.textContent = sharePack.quoteTitle;
  resultQuoteBody.textContent = sharePack.quoteBody;
  resultShareTag.textContent = sharePack.shareTag;

  sharePack.titles.forEach((title) => {
    const item = document.createElement("li");
    item.textContent = title;
    resultTitleList.appendChild(item);
  });

  Object.entries(scores).forEach(([key, value]) => {
    const card = document.createElement("article");
    card.className = "dimension-card";

    const title = document.createElement("h5");
    title.textContent = dimensions[key];

    const score = document.createElement("div");
    score.className = "dimension-score";
    score.textContent = `${value} / 16`;

    const body = document.createElement("p");
    body.textContent = getDimensionInsight(key, value);

    card.appendChild(title);
    card.appendChild(score);
    card.appendChild(body);
    dimensionGrid.appendChild(card);
  });

  drawRadar(scores);
  shareOutput.classList.add("hidden");
  shareOutput.value = createShareCopy(profile, scores);
  saveSubmission({
    code: activeRedeem?.code || "",
    totalScore: total,
    stage: profile.name,
    scores,
  });
}

function createShareAssets(profile, strongest, weakest) {
  const strongestLabel = dimensions[strongest[0]];
  const weakestLabel = dimensions[weakest[0]];

  return {
    quoteTitle: `${profile.name} | 你现在最需要的不是硬撑，而是更会照顾自己的恢复节奏。`,
    quoteBody: `你最突出的部分是${strongestLabel}，这说明你并不是没有力量。真正拖住你的，更可能是${weakestLabel}这一环还没有被认真照顾。`,
    shareTag: `分享关键词：${profile.name}`,
    titles: [
      `测完才知道，我的问题不是不会爱，是${weakestLabel}太弱`,
      `原来我一直走不出来，不是矫情，是卡在了${profile.name}`,
      `这份测试最戳我的一句话：我该先照顾自己，再处理关系`,
    ],
  };
}

function getResultNarrative(profile, strongest, weakest) {
  const strongestLabel = dimensions[strongest[0]];
  const weakestLabel = dimensions[weakest[0]];

  const blindspotMap = {
    recoverySpeed: `你不是没有感受能力，而是每次关系一受挫，都会先被情绪拖住，导致后面的判断和选择都慢半拍。`,
    boundaryClarity: `你真正容易吃亏的地方，不是不会爱，而是太晚承认“我已经不舒服了”，于是一步步把自己让了出去。`,
    attributionStyle: `你最容易卡住的不是事情本身，而是习惯先把问题往自己身上收，这会让你在关系里反复内耗。`,
    supportAbility: `你已经撑了太多次，但真正拖住你的，往往是情绪来了以后没有及时调用外部支持，只能一个人硬消化。`,
    growthTransform: `你未必不知道自己受了伤，只是还没有把这些经历真正整理成新的选择标准，所以旧模式容易重复出现。`,
  };

  const nextStepMap = {
    recoverySpeed: `先别急着想清楚关系本身，这一周更值得做的是先固定一套“情绪落地动作”，让自己每次波动时都有地方可回。`,
    boundaryClarity: `这阶段最值得练的不是强硬，而是更早说出那句“这让我不舒服”，把边界从心里搬到关系里。`,
    attributionStyle: `接下来先练习把“我是不是不够好”换成“先看事实”，只要这一步稳住，你的关系感受会轻很多。`,
    supportAbility: `现在最有效的动作不是继续扛，而是先搭一个最小支持系统，明确难受时第一时间可以找谁、做什么。`,
    growthTransform: `先别急着开启下一段关系，把这次经历写成 3 条你以后不会再忽略的提醒，它会比硬逼自己释怀更有用。`,
  };

  return {
    blindspot: `${profile.name}里，你的高分来自${strongestLabel}，但真正拉住你的短板更可能是${weakestLabel}。${blindspotMap[weakest[0]]}`,
    nextStep: nextStepMap[weakest[0]],
  };
}

function drawRadar(scores) {
  const ctx = radarCanvas.getContext("2d");
  const labels = Object.values(dimensions);
  const values = Object.keys(dimensions).map((key) => scores[key]);
  const centerX = radarCanvas.width / 2;
  const centerY = radarCanvas.height / 2;
  const radius = 120;
  const maxScore = 16;
  ctx.clearRect(0, 0, radarCanvas.width, radarCanvas.height);

  for (let level = 1; level <= 4; level += 1) {
    const levelRadius = (radius / 4) * level;
    ctx.beginPath();
    labels.forEach((_, index) => {
      const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
      const x = centerX + Math.cos(angle) * levelRadius;
      const y = centerY + Math.sin(angle) * levelRadius;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.closePath();
    ctx.strokeStyle = "rgba(96, 68, 50, 0.12)";
    ctx.stroke();
  }

  labels.forEach((label, index) => {
    const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "rgba(96, 68, 50, 0.12)";
    ctx.stroke();

    const textX = centerX + Math.cos(angle) * (radius + 26);
    const textY = centerY + Math.sin(angle) * (radius + 26);
    ctx.fillStyle = "#7a6659";
    ctx.font = "14px 'Noto Serif SC'";
    ctx.textAlign = textX < centerX - 10 ? "right" : textX > centerX + 10 ? "left" : "center";
    ctx.fillText(label, textX, textY);
  });

  ctx.beginPath();
  values.forEach((value, index) => {
    const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
    const pointRadius = (value / maxScore) * radius;
    const x = centerX + Math.cos(angle) * pointRadius;
    const y = centerY + Math.sin(angle) * pointRadius;
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(191, 125, 104, 0.28)";
  ctx.strokeStyle = "#bf7d68";
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();

  values.forEach((value, index) => {
    const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2;
    const pointRadius = (value / maxScore) * radius;
    const x = centerX + Math.cos(angle) * pointRadius;
    const y = centerY + Math.sin(angle) * pointRadius;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#9e5d49";
    ctx.fill();
  });
}

function createShareCopy(profile, scores) {
  const strongest = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return `我刚做完「愈见」情感复原力测试，结果是：${profile.name}

我最高的一项是：${dimensions[strongest[0]]}
这次最戳我的一句话是：
${profile.summary}

最近也想重新看懂自己关系模式的人，可以来测一版。`;
}

function startQuiz() {
  if (!activeRedeem) {
    redeemFeedback.textContent = "请先输入兑换码，验证成功后才可以开始测试。";
    document.querySelector("#redeem")?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  unlockQuiz();
  quizIntro.classList.add("hidden");
  resultCard.classList.add("hidden");
  quizCard.classList.remove("hidden");
  renderQuestion();
  document.querySelector("#quiz").scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetQuiz() {
  state.currentQuestionIndex = 0;
  state.answers = Array(questions.length).fill(null);
  quizIntro.classList.remove("hidden");
  quizCard.classList.add("hidden");
  resultCard.classList.add("hidden");
  shareOutput.classList.add("hidden");
  unlockQuiz();
}

function fillDeliveryTemplate() {
  if (!deliveryTemplate) {
    return;
  }

  deliveryTemplate.textContent = `宝，你的「愈见 · 情感复原力测试」兑换信息如下：

测试入口：
${window.location.origin || "https://your-domain.com"}${window.location.pathname}#redeem

兑换码：
${demoCode}

使用次数：
当前 Demo 版本可使用 5 次，超过次数后自动失效。

操作步骤：
1. 复制测试入口并在浏览器打开
2. 下滑到“兑换码入口”
3. 输入兑换码后点击验证
4. 开始完成完整版测试并查看结果

温馨提示：
1. 本产品仅用于自我觉察与成长参考
2. 建议按真实状态完成，不要代答
3. 如遇页面问题，可联系客服补发兑换码

小福利：
收货后若愿意带图分享你的体验，可领取 1 份 7 天微练习手册加赠版。`;
}

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({ ok: false, message: "服务响应异常。" }));
  if (!response.ok) {
    throw new Error(payload.message || "请求失败。");
  }

  return payload;
}

async function verifyRedeemCode(code) {
  const payload = await apiRequest(`/api/redeem/check?code=${encodeURIComponent(code)}`);
  return payload.payload;
}

async function consumeRedeemCode(code) {
  const payload = await apiRequest("/api/redeem/consume", {
    method: "POST",
    body: JSON.stringify({ code }),
  });
  return payload.payload;
}

async function saveSubmission(result) {
  if (!window.location.protocol.startsWith("http")) {
    return;
  }

  try {
    await apiRequest("/api/submissions", {
      method: "POST",
      body: JSON.stringify(result),
    });
  } catch {
    // Ignore submission failures in this MVP.
  }
}

applyComfortCopy();

if (redeemInput && document.body.classList.contains("overlay-open")) {
  window.setTimeout(() => redeemInput.focus(), 120);
}

if (redeemFeedback) {
  const feedbackObserver = new MutationObserver(() => {
    syncRedeemStateFromMessage(redeemFeedback.textContent);
  });

  feedbackObserver.observe(redeemFeedback, {
    childList: true,
    characterData: true,
    subtree: true,
  });
}

startButtons.forEach((button) => button.addEventListener("click", startQuiz));

prevButton.addEventListener("click", () => {
  state.currentQuestionIndex -= 1;
  renderQuestion();
});

resetButtons.forEach((button) => button.addEventListener("click", resetQuiz));

shareButton.addEventListener("click", async () => {
  shareOutput.classList.remove("hidden");
  shareOutput.select();
  try {
    await navigator.clipboard.writeText(shareOutput.value);
  } catch {
    // Keep textarea visible for manual copy.
  }
});

redeemForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(redeemForm);
  const code = String(formData.get("redeemCode") || "").trim().toUpperCase();

  if (!code) {
    redeemFeedback.textContent = "先输入兑换码，我们再帮你解锁完整版。";
    return;
  }

  redeemFeedback.textContent = "正在验证兑换码，请稍候...";

  if (!window.location.protocol.startsWith("http")) {
    if (code === demoCode) {
      activeRedeem = {
        code: demoCode,
        plan: "完整版",
        remainingUses: 4,
        maxUses: 5,
      };
      redeemFeedback.textContent = "兑换成功，当前已解锁测试，你可以直接开始。";
      unlockQuiz();
      startQuiz();
    } else {
      redeemFeedback.textContent = "本地直开模式下仅内置演示兑换码：YJ-2026-8888";
    }
    return;
  }

  try {
    const checked = await verifyRedeemCode(code);
    const consumed = await consumeRedeemCode(code);
    activeRedeem = consumed;
    redeemFeedback.textContent = `兑换成功，已开始当前测试，剩余可用 ${consumed.remainingUses} 次。`;
    unlockQuiz();
    startQuiz();
  } catch (error) {
    redeemFeedback.textContent = error.message || "兑换失败，请稍后重试。";
  }
});

if (copyDeliveryButton && deliveryTemplate) {
  copyDeliveryButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(deliveryTemplate.textContent);
      copyDeliveryButton.textContent = "已复制";
      window.setTimeout(() => {
        copyDeliveryButton.textContent = "复制发货文案";
      }, 1800);
    } catch {
      copyDeliveryButton.textContent = "复制失败，请手动复制";
    }
  });
}

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.getAttribute("data-scroll"));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

fillDeliveryTemplate();
