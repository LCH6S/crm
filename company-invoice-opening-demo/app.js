const app = document.getElementById("app");
const modalRoot = document.getElementById("modalRoot");
const toastNode = document.getElementById("toast");

const COUNTRY_META = {
  CN: { label: "中国大陆", registrationLabel: "统一社会信用代码" },
  MY: { label: "马来西亚", registrationLabel: "商业注册号码（BRN）" },
};

const MODE_META = {
  rpa: { label: "RPA", channel: "企享云 RPA", icon: "R" },
  joint: { label: "乐企联用", channel: "腾讯乐企联用", icon: "乐" },
  self: { label: "乐企自用", channel: "企享云乐企自用", icon: "自" },
};

const MODE_STATUS_META = {
  pending: { label: "待开通", className: "" },
  opening: { label: "开通中", className: "processing" },
  success: { label: "开通成功", className: "success" },
  failed: { label: "开通失败", className: "error" },
};

const ABILITY_LABELS = {
  basic: "基础开票能力",
  estate: "不动产租赁开票能力",
  oil: "成品油开票能力",
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function taxInfo(overrides = {}) {
  return {
    taxpayerType: "general",
    taxMethod: "general",
    rate: "",
    address: "上海市浦东新区世纪大道 1000 号",
    phone: "021-58880001",
    bank: "中国建设银行上海浦东支行",
    bankAccount: "31001588900050123456",
    ...overrides,
  };
}

function emptyModes() {
  return {
    rpa: { status: "pending", accounts: [] },
    joint: { status: "pending", defaultWxMerchantNo: "", records: [] },
    self: { status: "pending" },
  };
}

function rpaAccount(name = "张珺", account = "13812346801") {
  return {
    name,
    taxAccount: "-",
    email: `${name === "张珺" ? "invoice" : "tax"}@demo.cn`,
    role: "办税员",
    loginMode: "手机号",
    loginAccount: account,
    createdAt: "2026-07-20 14:30",
    updatedAt: "2026-08-21 15:18",
  };
}

function wxRecord({
  id,
  merchantId,
  merchantName,
  wxMerchantNo,
  payment = "微信支付",
  purpose = "BSC/CSB/WAP",
  abilities = ["basic"],
  status = "success",
  channelStatus = "success",
  errorReason = "",
  updatedAt = "2026-08-24 16:20",
}) {
  return {
    id,
    merchantId,
    merchantName,
    wxMerchantNo,
    payment,
    purpose,
    abilities,
    status,
    channelStatus,
    errorReason,
    updatedAt,
    inviteUrl: `https://demo.tencent.example/invite/${id}`,
  };
}

function merchantCatalog(seed) {
  return [
    {
      id: `16024773${seed}01`,
      name: "集团直营授权商户",
      licenseName: "演示集团商业有限公司",
      wxAccounts: [
        { no: `154179${seed}11`, payment: "微信支付", purpose: "BSC/CSB/WAP", institution: "微信直连" },
        { no: `160870${seed}30`, payment: "微信支付", purpose: "小程序支付", institution: "微信直连" },
      ],
    },
    {
      id: `16024773${seed}02`,
      name: "集团电商授权商户",
      licenseName: "演示集团商业有限公司",
      wxAccounts: [{ no: `190086${seed}66`, payment: "微信支付", purpose: "APP/小程序", institution: "微信直连" }],
    },
  ];
}

function makeCompany({
  id,
  name,
  registrationNo,
  country = "CN",
  customer = "可可臻选跨国零售演示客户",
  customerNo = "160247797573",
  type = "Branch",
  parent = "上海悦投资有限公司",
  openStatus = "pending",
  enabled = false,
  currentMode = "",
  modes = emptyModes(),
  tax = taxInfo(),
  customerProductOpen = true,
  selfUseConfigured = true,
  failureReason = "",
  openingMode = "",
  licenses = {},
  address = "上海市浦东新区世纪大道 1000 号",
  phone = "021-58880001",
  createdAt = "2026-08-20 10:30",
  seed = "01",
}) {
  const city = country === "MY" ? "Kuala Lumpur" : name.slice(0, 2);
  return {
    id,
    name,
    registrationNo,
    country,
    customer,
    customerNo,
    type,
    parent: type === "Head" ? "-" : parent,
    openStatus,
    enabled,
    currentMode,
    modes: clone(modes),
    tax: clone(tax),
    customerProductOpen,
    selfUseConfigured,
    failureReason,
    openingMode,
    licenses: clone(licenses),
    address,
    phone,
    createdAt,
    merchantCatalog: merchantCatalog(seed),
    stores: [
      { id: `${id}-S01`, name: `${city}中心店`, storeNo: `${id.slice(-3)}-01`, status: "营业中" },
      { id: `${id}-S02`, name: `${city}万象城店`, storeNo: `${id.slice(-3)}-02`, status: "营业中" },
      { id: `${id}-S03`, name: `${city}机场店`, storeNo: `${id.slice(-3)}-03`, status: "停业" },
    ],
  };
}

const jointSuccessModes = () => {
  const modes = emptyModes();
  modes.joint = {
    status: "success",
    defaultWxMerchantNo: "1541796111",
    records: [
      wxRecord({
        id: "WX-REC-001",
        merchantId: "16024773063801",
        merchantName: "集团直营授权商户",
        wxMerchantNo: "1541796111",
        abilities: ["basic", "estate"],
      }),
      wxRecord({
        id: "WX-REC-002",
        merchantId: "16024773063801",
        merchantName: "集团直营授权商户",
        wxMerchantNo: "1608708930",
        purpose: "小程序支付",
        abilities: ["basic"],
      }),
      wxRecord({
        id: "WX-REC-003",
        merchantId: "16024773063802",
        merchantName: "集团电商授权商户",
        wxMerchantNo: "1900862366",
        purpose: "APP/小程序",
        abilities: ["basic", "oil"],
      }),
    ],
  };
  return modes;
};

const rpaSuccessModes = () => {
  const modes = emptyModes();
  modes.rpa = { status: "success", accounts: [rpaAccount()] };
  return modes;
};

const allSuccessModes = () => {
  const modes = jointSuccessModes();
  modes.rpa = { status: "success", accounts: [rpaAccount("李敏", "13900001234")] };
  modes.self = { status: "success" };
  return modes;
};

const initialCompanies = [
  makeCompany({ id: "G-COMP-001", name: "上海澄明零售有限公司", registrationNo: "91310000MA1CLEAR01", type: "Head", parent: "-", seed: "01" }),
  makeCompany({
    id: "G-COMP-002",
    name: "华南嘉品供应链有限公司",
    registrationNo: "91440300MA1OPENR01",
    openStatus: "opening",
    openingMode: "rpa",
    modes: { ...emptyModes(), rpa: { status: "opening", accounts: [rpaAccount("王欣", "13700002345")] } },
    seed: "02",
  }),
  makeCompany({
    id: "G-COMP-003",
    name: "北京衡川商业管理有限公司",
    registrationNo: "91110108MA1RPA0001",
    openStatus: "success",
    enabled: true,
    currentMode: "rpa",
    modes: rpaSuccessModes(),
    seed: "03",
  }),
  makeCompany({
    id: "G-COMP-004",
    name: "杭州云际生活服务有限公司",
    registrationNo: "91330106MA1LEQI001",
    openStatus: "opening",
    openingMode: "joint",
    modes: {
      ...emptyModes(),
      joint: {
        status: "opening",
        defaultWxMerchantNo: "",
        records: [wxRecord({ id: "WX-PENDING-001", merchantId: "16024773040401", merchantName: "云际直营授权商户", wxMerchantNo: "1541790404", status: "opening", channelStatus: "pending", updatedAt: "2026-08-25 09:20" })],
      },
    },
    seed: "04",
  }),
  makeCompany({
    id: "G-COMP-005",
    name: "成都嘉木百货有限公司",
    registrationNo: "91510100MA1ERROR01",
    openStatus: "opening",
    openingMode: "joint",
    modes: {
      ...emptyModes(),
      joint: {
        status: "opening",
        defaultWxMerchantNo: "",
        records: [wxRecord({ id: "WX-ERROR-001", merchantId: "16024773050501", merchantName: "嘉木授权商户", wxMerchantNo: "1608700505", status: "opening", channelStatus: "failed", errorReason: "微信商户号对应的主体资料待商家补充，请处理后重新扫描原二维码。", updatedAt: "2026-08-25 11:42" })],
      },
    },
    seed: "05",
  }),
  makeCompany({
    id: "G-COMP-006",
    name: "深圳万象零售有限公司",
    registrationNo: "91440300MA1JOINT01",
    openStatus: "success",
    enabled: true,
    currentMode: "joint",
    modes: jointSuccessModes(),
    seed: "06",
  }),
  makeCompany({
    id: "G-COMP-007",
    name: "上海悦然贸易有限公司",
    registrationNo: "91310120MA1MULTI01",
    openStatus: "success",
    enabled: true,
    currentMode: "joint",
    modes: (() => {
      const modes = jointSuccessModes();
      modes.rpa = { status: "failed", accounts: [rpaAccount()], failureReason: "开票人税局登录信息校验未通过，请修改开票人信息后重新提交。" };
      modes.self = { status: "opening" };
      return modes;
    })(),
    seed: "07",
  }),
  makeCompany({
    id: "G-COMP-008",
    name: "苏州启辰商业有限公司",
    registrationNo: "91320594MA1SELF001",
    openStatus: "success",
    enabled: true,
    currentMode: "self",
    modes: { ...emptyModes(), self: { status: "success" } },
    seed: "08",
  }),
  makeCompany({
    id: "G-COMP-009",
    name: "广州星瀚品牌管理有限公司",
    registrationNo: "91440101MA1ALL0001",
    openStatus: "success",
    enabled: true,
    currentMode: "rpa",
    modes: allSuccessModes(),
    seed: "09",
  }),
  makeCompany({
    id: "G-COMP-010",
    name: "南京新禾科技有限公司",
    registrationNo: "91320115MA1DISAB01",
    openStatus: "success",
    enabled: false,
    currentMode: "joint",
    modes: jointSuccessModes(),
    seed: "10",
  }),
  makeCompany({
    id: "G-COMP-011",
    name: "天津华晟商贸有限公司",
    registrationNo: "91120116MA1FAIL001",
    openStatus: "failed",
    openingMode: "rpa",
    modes: {
      ...emptyModes(),
      rpa: {
        status: "failed",
        accounts: [rpaAccount("赵敏", "13612340011")],
        failureReason: "开票人税局登录信息校验未通过，请修改开票人信息后重新提交。",
      },
    },
    seed: "11",
  }),
  makeCompany({
    id: "G-COMP-012",
    name: "武汉锐新零售有限公司",
    registrationNo: "91420100MA1BLOCK01",
    customer: "新锐零售待开通演示客户",
    customerNo: "160247795682",
    customerProductOpen: false,
    selfUseConfigured: false,
    seed: "12",
  }),
  makeCompany({
    id: "G-COMP-MY01",
    name: "Meridian Retail Malaysia Sdn. Bhd.",
    registrationNo: "202401018821",
    country: "MY",
    type: "Head",
    parent: "-",
    licenses: { TIN: "C25881234010", SST: "W10-2405-32000123" },
    address: "Bukit Bintang, Kuala Lumpur",
    phone: "+60 3-2148 8818",
    seed: "21",
  }),
  makeCompany({
    id: "G-COMP-MY02",
    name: "Northstar Dining Malaysia Sdn. Bhd.",
    registrationNo: "202501019902",
    country: "MY",
    licenses: { TIN: "", SST: "" },
    address: "George Town, Pulau Pinang",
    phone: "+60 4-228 8118",
    seed: "22",
  }),
  makeCompany({
    id: "G-COMP-MY03",
    name: "Aurora Lifestyle Malaysia Sdn. Bhd.",
    registrationNo: "202301014403",
    country: "MY",
    openStatus: "success",
    enabled: true,
    licenses: { TIN: "C23114403010", SST: "W10-2306-32004403" },
    address: "Petaling Jaya, Selangor",
    phone: "+60 3-7728 4403",
    seed: "23",
  }),
  makeCompany({
    id: "G-COMP-MY04",
    name: "Pacific Home Malaysia Sdn. Bhd.",
    registrationNo: "202201015504",
    country: "MY",
    openStatus: "success",
    enabled: false,
    licenses: { TIN: "C22115504010", SST: "B16-2208-32005504" },
    address: "Johor Bahru, Johor",
    phone: "+60 7-331 5504",
    seed: "24",
  }),
];

let companies = clone(initialCompanies);

const customerProfiles = [
  { no: "160247797573", name: "可可臻选跨国零售演示客户", shortName: "可可臻选跨国", sales: "芳雨晴", type: "KA客户", createdAt: "2026-07-18 10:20:18", customerProductOpen: true },
  { no: "160247795679", name: "寰宇生活中国业务演示客户", shortName: "寰宇中国业务", sales: "Stanley", type: "KA客户", createdAt: "2026-07-21 09:30:26", customerProductOpen: true },
  { no: "160247795680", name: "南洋餐饮马来西亚业务演示客户", shortName: "南洋餐饮马来", sales: "芳雨晴", type: "KA客户", createdAt: "2026-07-23 08:30:00", customerProductOpen: true },
  { no: "160247795681", name: "星港生活跨境业务演示客户", shortName: "星港跨境", sales: "Stanley", type: "KA客户", createdAt: "2026-07-24 08:30:00", customerProductOpen: true },
  { no: "160247795682", name: "新锐零售待开通演示客户", shortName: "新锐待开通", sales: "芳雨晴", type: "ISV客户", createdAt: "2026-07-25 08:30:00", customerProductOpen: false },
];

const state = {
  view: "customer-detail",
  customerNo: "160247797573",
  customerTab: "companies",
  companyId: "",
  companyTab: "basic",
  filters: { name: "", registration: "", type: "", status: "" },
  page: 1,
  pageSize: 10,
  opening: null,
  result: null,
  modal: null,
};

function currentCompany() {
  return companies.find((company) => company.id === state.companyId);
}

function currentCustomer() {
  return customerProfiles.find((customer) => customer.no === state.customerNo);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  toastNode.textContent = message;
  toastNode.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toastNode.classList.remove("show"), 2200);
}

function statusMarkup(key, labelOverride = "") {
  const meta = MODE_STATUS_META[key] || MODE_STATUS_META.pending;
  return `<span class="status ${meta.className}">${escapeHtml(labelOverride || meta.label)}</span>`;
}

function invoiceModeStatuses(company) {
  if (company.country === "MY") {
    const status = company.openStatus === "success" ? "success" : "pending";
    return [{ label: "马来西亚电子发票", status, statusLabel: status === "success" ? "已开通" : "未开通" }];
  }
  return ["rpa", "joint", "self"].map((key) => {
    const status = company.modes?.[key]?.status || "pending";
    return { label: MODE_META[key].label, status, statusLabel: MODE_STATUS_META[status]?.label || "待开通" };
  });
}

function invoiceOpeningMarkup(company) {
  const visibleItems = invoiceModeStatuses(company).filter((item) => company.country === "MY" || item.status !== "pending");
  if (!visibleItems.length) return '<span class="muted">-</span>';
  const colorClass = { opening: "blue", success: "green", failed: "red" };
  return `<div class="invoice-mode-tags">${visibleItems
    .map((item) => `<span class="tag invoice-mode-tag ${colorClass[item.status] || ""}">${escapeHtml(item.label)} ${escapeHtml(item.statusLabel)}</span>`)
    .join("")}</div>`;
}

function matchesInvoiceStatus(company, status) {
  return !status || invoiceModeStatuses(company).some((item) => item.status === status);
}

function availabilityMarkup(company) {
  if (company.openStatus !== "success") return '<span class="muted">-</span>';
  return statusMarkup(company.enabled ? "success" : "pending", company.enabled ? "启用" : "禁用");
}

function modeLabel(mode) {
  return MODE_META[mode]?.label || "-";
}

function modeStatus(mode) {
  return MODE_STATUS_META[mode?.status || "pending"];
}

function abilityTags(abilities = [], pendingAbilities = []) {
  const opened = abilities.map((ability) => `<span class="tag blue">${escapeHtml(ABILITY_LABELS[ability])}</span>`);
  const pending = pendingAbilities.map((ability) => `<span class="tag orange">${escapeHtml(ABILITY_LABELS[ability])}开通中</span>`);
  return opened.length || pending.length ? [...opened, ...pending].join(" ") : '<span class="muted">-</span>';
}

function breadcrumb(items) {
  return `<nav class="breadcrumb" aria-label="面包屑">${items
    .map((item, index) => {
      if (index === items.length - 1) return `<strong>${escapeHtml(item.label)}</strong>`;
      return `<button type="button" data-action="${item.action}">${escapeHtml(item.label)}</button><span aria-hidden="true">/</span>`;
    })
    .join("")}</nav>`;
}

function render() {
  if (state.view === "customers") renderCustomerList();
  else if (state.view === "detail") renderCompanyDetail();
  else if (state.view === "opening-cn") renderChinaOpening();
  else if (state.view === "opening-my") renderMalaysiaOpening();
  else if (state.view === "opening-result") renderOpeningResult();
  else renderCompanyList();
  renderModal();
}

function filteredCompanies() {
  const filters = state.filters;
  return companies.filter((company) => {
    const name = company.name.toLowerCase();
    const registration = company.registrationNo.toLowerCase();
    return (
      company.customerNo === state.customerNo &&
      (!filters.name || name.includes(filters.name.toLowerCase())) &&
      (!filters.registration || registration === filters.registration.toLowerCase()) &&
      (!filters.type || company.type === filters.type) &&
      matchesInvoiceStatus(company, filters.status)
    );
  });
}

function renderCustomerList() {
  const rows = customerProfiles
    .map((customer) => {
      return `<tr><td>${escapeHtml(customer.createdAt)}</td><td><strong>${escapeHtml(customer.name)}</strong></td><td>${escapeHtml(customer.shortName)}</td><td>${escapeHtml(customer.sales)}</td><td>${escapeHtml(customer.type)}</td><td>${escapeHtml(customer.no)}</td><td class="action-col"><button class="button link" type="button" data-action="open-customer" data-customer="${escapeHtml(customer.no)}">详情</button></td></tr>`;
    })
    .join("");
  app.innerHTML = `${breadcrumb([{ label: "主页", action: "back-customers" }, { label: "我的客户" }])}
    <section class="panel page-title"><div><h1>我的客户</h1><p>查看当前销售负责的集团客户</p></div></section>
    <section class="panel list-panel"><div class="panel-heading"><div><h2>客户列表</h2></div></div><div class="table-scroll"><table class="data-table" style="min-width:1040px" aria-label="客户列表"><colgroup><col style="width:180px" /><col style="width:250px" /><col style="width:170px" /><col style="width:130px" /><col style="width:110px" /><col style="width:150px" /><col style="width:70px" /></colgroup><thead><tr><th>创建时间</th><th>客户名称</th><th>客户简称</th><th>所属销售</th><th>客户类型</th><th>客户编号</th><th class="action-col">操作</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
}

function customerSummary(customer) {
  return `<section class="panel customer-summary-card"><h1>${escapeHtml(customer.name)}</h1><span>客户编号：${escapeHtml(customer.no)}</span></section>`;
}

function customerDetailTab(key, label) {
  return `<button class="tab-button ${state.customerTab === key ? "active" : ""}" type="button" role="tab" aria-selected="${state.customerTab === key}" data-action="customer-tab" data-tab="${key}">${label}</button>`;
}

function renderCompanyList() {
  const customer = currentCustomer();
  if (!customer) {
    state.view = "customers";
    return renderCustomerList();
  }
  const filtered = filteredCompanies();
  const pageCount = Math.max(1, Math.ceil(filtered.length / state.pageSize));
  state.page = Math.min(state.page, pageCount);
  const start = (state.page - 1) * state.pageSize;
  const pageRows = filtered.slice(start, start + state.pageSize);
  const tableRows = pageRows.length
    ? pageRows
        .map(
          (company) => `<tr>
            <td class="company-name-cell" title="${escapeHtml(company.name)}"><strong>${escapeHtml(company.name)}</strong><small>${escapeHtml(company.id)}</small></td>
            <td title="${escapeHtml(company.registrationNo)}">${escapeHtml(company.registrationNo)}</td>
            <td><span class="tag ${company.type === "Head" ? "blue" : "green"}">${company.type === "Head" ? "总公司" : "分公司"}</span></td>
            <td title="${escapeHtml(company.parent)}">${escapeHtml(company.parent)}</td>
            <td>${invoiceOpeningMarkup(company)}</td>
            <td class="action-col"><button class="button link" type="button" data-action="open-detail" data-id="${company.id}">详情</button></td>
          </tr>`,
        )
        .join("")
    : '<tr><td class="empty-table" colspan="6">未找到符合条件的数据</td></tr>';
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)
    .map((page) => `<button class="page-button ${page === state.page ? "active" : ""}" type="button" data-action="page" data-page="${page}">${page}</button>`)
    .join("");

  const companyTabContent = `<div class="customer-company-content"><div class="customer-company-query"><div class="query-grid">
      <label class="field"><span>公司名称</span><input class="semi-input" id="filterName" value="${escapeHtml(state.filters.name)}" placeholder="请输入公司名称" /></label>
      <label class="field"><span>统一社会信用代码</span><input class="semi-input" id="filterRegistration" value="${escapeHtml(state.filters.registration)}" placeholder="请输入统一社会信用代码" /></label>
      <label class="field"><span>公司类型</span><select class="semi-select" id="filterType"><option value="">请选择公司类型</option><option value="Head" ${state.filters.type === "Head" ? "selected" : ""}>总公司</option><option value="Branch" ${state.filters.type === "Branch" ? "selected" : ""}>分公司</option></select></label>
      <label class="field"><span>发票状态</span><select class="semi-select" id="filterStatus"><option value="">全部状态</option><option value="opening" ${state.filters.status === "opening" ? "selected" : ""}>开通中</option><option value="success" ${state.filters.status === "success" ? "selected" : ""}>开通成功</option><option value="failed" ${state.filters.status === "failed" ? "selected" : ""}>开通失败</option></select></label>
      <div class="query-actions"><button class="button primary" type="button" data-action="search">查询</button><button class="button link" type="button" data-action="reset-filters">重置</button></div>
    </div></div><div class="customer-company-list"><div class="table-scroll"><table class="data-table company-table" style="min-width:880px" aria-label="公司列表">
      <colgroup><col style="width:190px" /><col style="width:180px" /><col style="width:90px" /><col style="width:145px" /><col style="width:215px" /><col style="width:70px" /></colgroup>
      <thead><tr><th>公司名称</th><th>注册证照号码</th><th>公司类型</th><th>上级公司</th><th>发票开通</th><th class="action-col">操作</th></tr></thead><tbody>${tableRows}</tbody>
    </table></div><div class="pagination"><span class="total">共 ${filtered.length} 条</span>${pages}<select class="semi-select" style="width:96px;height:30px" id="pageSize"><option value="10" ${state.pageSize === 10 ? "selected" : ""}>10 条/页</option><option value="20" ${state.pageSize === 20 ? "selected" : ""}>20 条/页</option></select></div></div></div>`;
  const tabContent = state.customerTab === "companies" ? companyTabContent : '<div class="customer-tab-placeholder" aria-hidden="true"></div>';
  app.innerHTML = `${breadcrumb([{ label: "主页", action: "back-customers" }, { label: "客户详情" }])}${customerSummary(customer)}
    <section class="panel tabs-panel customer-detail-panel"><div class="tabs" role="tablist" aria-label="客户详情">
      ${customerDetailTab("basic", "基础信息")}${customerDetailTab("companies", "公司列表")}${customerDetailTab("brands", "品牌列表")}${customerDetailTab("products", "产品管理")}${customerDetailTab("agreements", "协议确认管理")}
    </div><div class="tab-content" role="tabpanel">${tabContent}</div></section>`;
}

function companySummary(company) {
  return `<section class="panel detail-summary">
    <div class="detail-summary-main">
      <div class="detail-summary-title"><h1>${escapeHtml(company.name)}</h1><span class="tag ${company.country === "CN" ? "blue" : "orange"}">${escapeHtml(COUNTRY_META[company.country].label)}</span><span class="tag ${company.type === "Head" ? "blue" : "green"}">${company.type === "Head" ? "总公司" : "分公司"}</span></div>
      <div class="detail-summary-meta"><span>${escapeHtml(COUNTRY_META[company.country].registrationLabel)}：${escapeHtml(company.registrationNo)}</span><span>公司 ID：${escapeHtml(company.id)}</span></div>
    </div>
  </section>`;
}

function renderCompanyDetail() {
  const company = currentCompany();
  if (!company) {
    state.view = "customer-detail";
    render();
    return;
  }
  app.innerHTML = `
    ${breadcrumb([{ label: "主页", action: "back-customers" }, { label: "我的客户", action: "back-customers" }, { label: "客户详情", action: "back-customer-detail" }, { label: "公司详情" }])}
    ${companySummary(company)}
    <section class="panel tabs-panel">
      <div class="tabs" role="tablist" aria-label="公司详情">
        ${detailTab("basic", "基础信息")}
        ${detailTab("stores", "门店管理")}
        ${detailTab("invoice", "电子发票")}
      </div>
      <div class="tab-content" role="tabpanel">${renderCompanyTab(company)}</div>
    </section>`;
}

function detailTab(key, label) {
  return `<button class="tab-button ${state.companyTab === key ? "active" : ""}" type="button" role="tab" aria-selected="${state.companyTab === key}" data-action="tab" data-tab="${key}">${label}</button>`;
}

function renderCompanyTab(company) {
  if (state.companyTab === "stores") return renderStoreTab(company);
  if (state.companyTab === "invoice") return renderInvoiceTab(company);
  return renderBasicTab(company);
}

function renderBasicTab(company) {
  const registrationLabel = COUNTRY_META[company.country].registrationLabel;
  const localFields =
    company.country === "MY"
      ? `<div><dt>税务识别号码（TIN）</dt><dd>${escapeHtml(company.licenses.TIN || "-")}</dd></div><div><dt>销售与服务税注册号码（SST）</dt><dd>${escapeHtml(company.licenses.SST || "-")}</dd></div>`
      : "";
  return `<div class="section-heading"><div><h2>基本信息</h2></div></div>
    <dl class="info-grid">
      <div><dt>公司名称</dt><dd>${escapeHtml(company.name)}</dd></div>
      <div><dt>${escapeHtml(registrationLabel)}</dt><dd>${escapeHtml(company.registrationNo)}</dd></div>
      <div><dt>注册国家/地区</dt><dd>${escapeHtml(COUNTRY_META[company.country].label)}</dd></div>
      <div><dt>公司类型</dt><dd>${company.type === "Head" ? "总公司" : "分公司"}</dd></div>
      <div><dt>上级公司</dt><dd>${escapeHtml(company.parent)}</dd></div>
      <div><dt>所属客户</dt><dd>${escapeHtml(company.customer)}</dd></div>
      <div><dt>客户编号</dt><dd>${escapeHtml(company.customerNo)}</dd></div>
      <div><dt>公司 ID</dt><dd>${escapeHtml(company.id)}</dd></div>
      <div><dt>注册地址</dt><dd>${escapeHtml(company.address)}</dd></div>
      <div><dt>联系电话</dt><dd>${escapeHtml(company.phone)}</dd></div>
      ${localFields}
      <div><dt>创建时间</dt><dd>${escapeHtml(company.createdAt)}</dd></div>
    </dl>`;
}

function renderStoreTab(company) {
  const rows = company.stores
    .map(
      (store) => `<tr><td>${escapeHtml(store.name)}</td><td>${escapeHtml(store.storeNo)}</td><td>${escapeHtml(store.id)}</td><td>${statusMarkup(store.status === "营业中" ? "success" : "pending", store.status)}</td><td class="action-col"><button class="button link" type="button">详情</button></td></tr>`,
    )
    .join("");
  return `<div class="section-heading"><div><h2>门店列表</h2></div></div>
    <div class="table-scroll"><table class="data-table" style="min-width:780px"><thead><tr><th>门店名称</th><th>门店号</th><th>门店 ID</th><th>营业状态</th><th class="action-col">操作</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderInvoiceTab(company) {
  return company.country === "MY" ? renderMalaysiaInvoice(company) : renderChinaInvoice(company);
}

function renderChinaInvoice(company) {
  if (!company.customerProductOpen) {
    return `<div class="notice warning"><span>所属客户尚未开通电子发票产品，请先完成客户维度产品开通。</span></div>
      <div class="invoice-empty"><div class="empty-icon">票</div><h2>暂不能开通电子发票</h2><p>客户电子发票产品开通后，才可以为具体公司开通发票功能。</p><button class="button primary" type="button" disabled>开通</button></div>`;
  }
  if (company.openStatus === "pending") {
    return `<div class="invoice-empty"><div class="empty-icon">票</div><h2>尚未开通电子发票</h2><button class="button primary" type="button" data-action="start-opening">开通</button></div>`;
  }
  if (company.openStatus === "opening" || company.openStatus === "failed") return renderChinaInvoiceSuccess(company);
  return renderChinaInvoiceSuccess(company);
}

function renderQrCard(record) {
  return `<div class="qr-card"><div class="qr-code" aria-label="授权二维码示意"></div><div><h3>腾讯乐企授权</h3><p>微信商户号：${escapeHtml(record.wxMerchantNo)}　邀请码：${escapeHtml(record.id)}</p><p>请由企业法定代表人或微信商户管理员使用微信扫描。</p><div class="link-box"><code>${escapeHtml(record.inviteUrl)}</code><button class="button border" type="button" data-action="copy-link" data-link="${escapeHtml(record.inviteUrl)}">复制授权链接</button></div></div></div>`;
}

function renderChinaInvoiceSuccess(company) {
  const tax = company.tax;
  const invoiceReady = company.openStatus === "success";
  const availability = invoiceReady ? availabilityMarkup(company) : statusMarkup("pending", "未启用");
  const availabilityAction = invoiceReady
    ? `<span>${company.enabled ? "开票功能已启用" : "开票功能已禁用"}</span><button class="switch" type="button" role="switch" aria-label="开票功能状态" aria-checked="${company.enabled}" data-action="toggle-invoice"></button>`
    : '<span>开票功能将在当前模式开通成功后启用</span><button class="switch" type="button" role="switch" aria-label="开票功能状态" aria-checked="false" aria-disabled="true" disabled></button>';
  return `<div>
    <div class="invoice-summary-card">
      <div><h2>${escapeHtml(company.name)}</h2><div class="summary-line"><span>税号：${escapeHtml(company.registrationNo)}</span><span>当前使用模式：<strong>${escapeHtml(company.currentMode ? modeLabel(company.currentMode) : "-")}</strong></span><span>${availability}</span></div></div>
      <div class="invoice-summary-action">${availabilityAction}</div>
    </div>
    <div class="section-divider"></div>
    <div class="section-heading"><div><h2>基本信息</h2></div><button class="button border" type="button" data-action="edit-tax">编辑</button></div>
    <dl class="info-grid">
      <div><dt>纳税人名称</dt><dd>${escapeHtml(company.name)}</dd></div><div><dt>税号</dt><dd>${escapeHtml(company.registrationNo)}</dd></div><div><dt>所在地区</dt><dd>${escapeHtml(company.address.split("市")[0] + "市")}</dd></div><div><dt>税务登记地址</dt><dd>${escapeHtml(tax.address || "-")}</dd></div>
      <div><dt>税务登记联系电话</dt><dd>${escapeHtml(tax.phone || "-")}</dd></div><div><dt>税务登记开户行</dt><dd>${escapeHtml(tax.bank || "-")}</dd></div><div><dt>税务登记银行账号</dt><dd>${escapeHtml(tax.bankAccount || "-")}</dd></div><div><dt>纳税人类型</dt><dd>${tax.taxpayerType === "general" ? "一般纳税人" : "小规模纳税人"}</dd></div>
      <div><dt>计税方式</dt><dd>${tax.taxMethod === "general" ? "一般计税" : "简易计税"}</dd></div><div><dt>征收率</dt><dd>${escapeHtml(tax.taxMethod === "simple" ? tax.rate || "-" : "-")}</dd></div>
    </dl>
    <div class="section-divider"></div>
    <div class="section-heading"><div><h2>开票模式</h2></div></div>
    <div class="mode-list">${["rpa", "joint", "self"].map((key) => renderModeCard(company, key)).join("")}</div>
  </div>`;
}

function renderModeCard(company, key) {
  const mode = company.modes[key] || { status: "pending" };
  const meta = MODE_META[key];
  const status = modeStatus(mode);
  const isCurrent = company.currentMode === key;
  let action = "";
  if (mode.status === "pending") {
    const disabled = key === "self" && !company.selfUseConfigured;
    action = `<button class="button ${disabled ? "" : "primary"}" type="button" data-action="open-mode" data-mode="${key}" ${disabled ? "disabled" : ""}>开通</button>`;
  } else if (mode.status === "opening") {
    action = key === "joint" ? "" : `<button class="button border" type="button" data-action="refresh-mode" data-mode="${key}">刷新状态</button>`;
  } else if (mode.status === "success" && isCurrent) {
    action = `<button class="button" type="button" disabled>当前使用</button>`;
  } else if (mode.status === "success") {
    action = `<button class="button primary" type="button" data-action="switch-mode" data-mode="${key}">切换使用</button>`;
  } else if (key === "rpa") {
    action = `<button class="button primary" type="button" data-action="resubmit-rpa">重新提交</button>`;
  } else {
    action = `<button class="button border" type="button" data-action="view-mode-progress" data-mode="${key}">查看原因</button>`;
  }
  let detail = "";
  if (key === "rpa" && (mode.accounts?.length || mode.status === "opening" || mode.status === "failed")) detail = renderRpaAccounts(mode.accounts || [], mode.status, mode.failureReason || "");
  if (key === "joint" && mode.records?.length) detail = renderJointRecords(company, mode);
  if (key === "self" && mode.status === "pending" && !company.selfUseConfigured) detail = `<div class="mode-detail"><div class="notice warning"><span>所属客户尚未完成乐企自用配置，当前不可开通。</span></div></div>`;
  if (key === "self" && mode.status === "opening") detail = '<div class="mode-detail"><div class="notice"><span>乐企自用开通正在处理，完成后可切换为当前使用模式。</span></div></div>';
  return `<article class="mode-card ${isCurrent ? "current" : ""}">
    <div class="mode-card-head"><div class="mode-icon">${meta.icon}</div><div class="mode-title"><div class="mode-title-line"><h3>${meta.label}</h3>${isCurrent ? '<span class="tag blue">当前使用</span>' : ""}</div><p>服务渠道：${meta.channel}</p></div><div>${statusMarkup(mode.status, status.label)}</div><div class="mode-actions">${action}</div></div>${detail}
  </article>`;
}

function renderRpaAccounts(accounts, status = "success", failureReason = "") {
  const rows = accounts
    .map((item) => `<tr><td>${escapeHtml(item.name)}</td><td>${escapeHtml(item.taxAccount)}</td><td>${escapeHtml(item.email)}</td><td>${escapeHtml(item.role)}</td><td>${escapeHtml(item.loginMode)}</td><td>${escapeHtml(item.loginAccount)}</td><td>${escapeHtml(item.updatedAt)}</td></tr>`)
    .join("");
  const progress = status === "opening"
    ? '<div class="notice" style="margin-bottom:16px"><span>RPA 开通申请已提交，运营人员将联系客户完成税局登录验证及后续操作。</span></div>'
    : status === "failed"
      ? `<div class="notice error" style="margin-bottom:16px"><span>${escapeHtml(failureReason || "运营人员已驳回本次开通申请，请重新提交。")}</span></div>`
      : "";
  return `<div class="mode-detail">${progress}<div class="mode-detail-head"><h4>开票人税局账户信息</h4></div><div class="table-scroll"><table class="data-table"><thead><tr><th>开票人姓名</th><th>税局账号</th><th>联系邮箱</th><th>税局角色</th><th>登录模式</th><th>登录账号</th><th>更新时间</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
}

function channelStatusLabel(status) {
  return { pending: "待授权", opening: "开通中", failed: "开通失败", success: "开通成功" }[status] || "-";
}

function channelStatusKey(status) {
  return { pending: "pending", opening: "opening", failed: "failed", success: "success" }[status] || "pending";
}

function renderJointRecords(company, mode) {
  const rows = mode.records
    .map((record) => {
      const isDefault = record.wxMerchantNo === mode.defaultWxMerchantNo;
      const allAbilities = Object.keys(ABILITY_LABELS);
      const remainingAbilities = allAbilities.filter((ability) => !record.abilities.includes(ability) && !(record.pendingAbilities || []).includes(ability));
      const actions = [];
      if (record.status === "success" && record.channelStatus === "success" && !isDefault) actions.push(`<button class="button link" type="button" data-action="set-default" data-record="${record.id}">设为默认</button>`);
      if (record.status === "success" && record.channelStatus === "success" && remainingAbilities.length) actions.push(`<button class="button link" type="button" data-action="add-ability" data-record="${record.id}">增加开通能力</button>`);
      if (record.channelStatus !== "success") {
        actions.push(`<button class="button link" type="button" data-action="view-record-qr" data-record="${record.id}">查看二维码</button>`);
        actions.push(`<button class="button link" type="button" data-action="refresh-record" data-record="${record.id}">刷新状态</button>`);
      }
      return `<tr><td><strong>${escapeHtml(record.wxMerchantNo)}</strong>${isDefault ? '<span class="tag blue" style="margin-left:8px">默认</span>' : ""}</td><td>${abilityTags(record.abilities, record.pendingAbilities || [])}</td><td>${statusMarkup(channelStatusKey(record.channelStatus), channelStatusLabel(record.channelStatus))}${record.errorReason ? `<br /><span class="muted" title="${escapeHtml(record.errorReason)}">${escapeHtml(record.errorReason)}</span>` : ""}</td><td><div class="row-actions">${actions.length ? actions.join("") : '<span class="muted">-</span>'}</div></td></tr>`;
    })
    .join("");
  return `<div class="mode-detail"><div class="mode-detail-head"><h4>微信商户号开通记录</h4><button class="button border" type="button" data-action="add-wx">新增微信商户号</button></div><div class="table-scroll"><table class="data-table" style="min-width:780px"><thead><tr><th>微信商户号</th><th>开通能力</th><th>腾讯渠道状态</th><th>操作</th></tr></thead><tbody>${rows}</tbody></table></div></div>`;
}

function renderMalaysiaInvoice(company) {
  if (company.openStatus !== "success") {
    return `<div class="invoice-empty"><div class="empty-icon">MY</div><h2>尚未开通电子发票</h2><button class="button primary" type="button" data-action="start-opening">开通</button></div>`;
  }
  return `<div>
    <div class="invoice-summary-card"><div><h2>${escapeHtml(company.name)}</h2><div class="summary-line"><span>TIN：${escapeHtml(company.licenses.TIN)}</span><span>${availabilityMarkup(company)}</span></div></div><div class="invoice-summary-action"><span>${company.enabled ? "开票功能已启用" : "开票功能已禁用"}</span><button class="switch" type="button" role="switch" aria-label="开票功能状态" aria-checked="${company.enabled}" data-action="toggle-invoice"></button></div></div>
    <div class="section-divider"></div>
    <div class="section-heading"><div><h2>基本信息</h2></div><button class="button border" type="button" data-action="edit-my-tax">编辑</button></div>
    <dl class="info-grid"><div><dt>公司名称</dt><dd>${escapeHtml(company.name)}</dd></div><div><dt>商业注册号码（BRN）</dt><dd>${escapeHtml(company.registrationNo)}</dd></div><div><dt>税务识别号码（TIN）</dt><dd>${escapeHtml(company.licenses.TIN)}</dd></div><div><dt>销售与服务税注册号码（SST）</dt><dd>${escapeHtml(company.licenses.SST)}</dd></div></dl>
  </div>`;
}

function startOpening(company, presetMode = "", lockPrefix = false) {
  state.companyId = company.id;
  state.result = null;
  if (company.country === "MY") {
    state.opening = {
      kind: "my",
      tin: company.licenses.TIN || "",
      sst: company.licenses.SST || "",
      errors: {},
    };
    state.view = "opening-my";
  } else {
    const additional = Boolean(company.currentMode) || lockPrefix;
    state.opening = {
      kind: additional ? "additional" : "initial",
      step: presetMode ? 3 : 1,
      mode: presetMode,
      tax: clone(company.tax),
      rpa: { name: "", mobile: "", password: "", role: "办税员", email: "" },
      joint: { merchantId: "", manualMerchantId: "", wxMerchantNos: [], abilities: [] },
      selfVerified: false,
      selfAccessConfirmed: false,
      selfQueryStatus: "idle",
      errors: {},
    };
    state.view = "opening-cn";
  }
  render();
  window.scrollTo({ top: 0 });
}

function renderSteps(current, additional = false) {
  const steps = ["填写税务信息", "选择开票模式", "填写开通信息", "确认提交"];
  return `<div class="steps">${steps
    .map((title, index) => {
      const step = index + 1;
      const className = step < current ? "finish" : step === current ? "process" : "";
      const visual = step < current ? "✓" : step;
      const disabledNote = additional && step < 3 ? "（已完成）" : "";
      return `${index ? `<span class="step-line ${step <= current ? "finish" : ""}"></span>` : ""}<span class="step-item ${className}" ${step === current ? 'aria-current="step"' : ""}><span class="step-circle">${visual}</span><span>${title}${disabledNote}</span></span>`;
    })
    .join("")}</div>`;
}

function renderChinaOpening() {
  const company = currentCompany();
  const opening = state.opening;
  if (!company || !opening) {
    state.view = "detail";
    render();
    return;
  }
  app.innerHTML = `
    ${breadcrumb([{ label: "主页", action: "back-customers" }, { label: "我的客户", action: "back-customers" }, { label: "客户详情", action: "back-customer-detail" }, { label: "公司详情", action: "back-detail" }, { label: "公司发票功能开通" }])}
    ${companySummary(company)}
    <section class="panel"><div class="steps-wrap">${renderSteps(opening.step, opening.kind === "additional")}</div><div class="flow-body">${renderChinaStep(company, opening)}</div></section>`;
}

function renderChinaStep(company, opening) {
  if (opening.step === 2) return renderModeSelection(company, opening);
  if (opening.step === 3) return renderModeForm(company, opening);
  if (opening.step === 4) return renderChinaReview(company, opening);
  return renderTaxForm(opening);
}

function renderTaxForm(opening) {
  const tax = opening.tax;
  const smallTaxpayer = tax.taxpayerType === "small";
  if (smallTaxpayer) tax.taxMethod = "simple";
  return `<div class="flow-section"><div class="section-heading"><div><h2>填写税务信息</h2></div></div>
    <div class="form-grid">
      <label class="field required"><span>纳税人类型</span><select class="semi-select" id="taxpayerType"><option value="general" ${tax.taxpayerType === "general" ? "selected" : ""}>一般纳税人</option><option value="small" ${tax.taxpayerType === "small" ? "selected" : ""}>小规模纳税人</option></select></label>
      <label class="field required"><span>计税方式</span><select class="semi-select" id="taxMethod" ${smallTaxpayer ? "disabled" : ""}><option value="general" ${tax.taxMethod === "general" ? "selected" : ""}>一般计税</option><option value="simple" ${tax.taxMethod === "simple" ? "selected" : ""}>简易计税</option></select></label>
      <label class="field ${tax.taxMethod === "simple" ? "required" : ""}"><span>征收率</span><select class="semi-select" id="taxRate" ${tax.taxMethod === "general" ? "disabled" : ""}><option value="">请选择</option><option value="1%" ${tax.rate === "1%" ? "selected" : ""}>1%</option><option value="3%" ${tax.rate === "3%" ? "selected" : ""}>3%</option><option value="5%" ${tax.rate === "5%" ? "selected" : ""}>5%</option></select><small class="form-error">${escapeHtml(opening.errors.rate || "")}</small></label>
      <div></div>
      <div class="tax-secondary-grid span-2"><label class="field"><span>地址</span><input class="semi-input" id="taxAddress" value="${escapeHtml(tax.address)}" /></label><label class="field"><span>电话</span><input class="semi-input" id="taxPhone" value="${escapeHtml(tax.phone)}" /></label><label class="field"><span>开户行</span><input class="semi-input" id="taxBank" value="${escapeHtml(tax.bank)}" /></label><label class="field"><span>开户行账号</span><input class="semi-input" id="taxBankAccount" value="${escapeHtml(tax.bankAccount)}" /></label></div>
    </div>
    <div class="flow-actions"><button class="button border" type="button" data-action="cancel-opening">取消</button><button class="button primary" type="button" data-action="next-opening">下一步</button></div></div>`;
}

function renderModeSelection(company, opening) {
  return `<div class="flow-section"><div class="section-heading"><div><h2>选择开票模式</h2></div></div>
    <div class="selection-cards">
      ${modeSelectionCard("rpa", opening.mode, false)}
      ${modeSelectionCard("joint", opening.mode, false)}
      ${modeSelectionCard("self", opening.mode, !company.selfUseConfigured)}
    </div>
    ${opening.errors.mode ? `<div class="form-error" style="margin-top:12px">${escapeHtml(opening.errors.mode)}</div>` : ""}
    <div class="flow-actions"><button class="button border" type="button" data-action="prev-opening">上一步</button><button class="button primary" type="button" data-action="next-opening">下一步</button></div></div>`;
}

function modeSelectionCard(key, selected, disabled) {
  return `<button class="selection-card ${selected === key ? "selected" : ""}" type="button" data-action="select-mode" data-mode="${key}" ${disabled ? "disabled" : ""}><h3>${MODE_META[key].label}</h3>${selected === key ? '<span class="selected-mark">✓</span>' : ""}</button>`;
}

function selectedMerchant(company, opening) {
  return company.merchantCatalog.find((merchant) => merchant.id === opening.joint.merchantId);
}

function renderModeForm(company, opening) {
  const mode = opening.mode;
  let content = "";
  if (mode === "rpa") content = renderRpaForm(opening);
  else if (mode === "joint") content = renderJointForm(company, opening);
  else if (mode === "self") content = renderSelfUseForm(company, opening);
  else content = `<div class="notice error"><span>请选择需要开通的模式。</span></div>`;
  const nextDisabled = mode === "self" && !opening.selfVerified;
  const formTitle = mode === "rpa" ? "填写开票人信息" : `填写${modeLabel(mode)}开通信息`;
  return `<div class="flow-section"><div class="section-heading"><div><h2>${escapeHtml(formTitle)}</h2></div></div>${content}
    <div class="flow-actions"><button class="button border" type="button" data-action="${opening.kind === "additional" ? "cancel-opening" : "prev-opening"}">${opening.kind === "additional" ? "取消" : "上一步"}</button><button class="button primary" type="button" data-action="next-opening" ${nextDisabled ? "disabled" : ""}>下一步</button></div></div>`;
}

function renderRpaForm(opening) {
  const draft = opening.rpa;
  return `<div class="form-grid">
    <label class="field required"><span>开票人姓名</span><input class="semi-input" id="rpaName" value="${escapeHtml(draft.name)}" /><small class="form-error">${escapeHtml(opening.errors.name || "")}</small></label>
    <label class="field required"><span>税局登录手机号</span><input class="semi-input" id="rpaMobile" value="${escapeHtml(draft.mobile)}" /><small class="form-error">${escapeHtml(opening.errors.mobile || "")}</small></label>
    <label class="field required"><span>税局密码</span><input class="semi-input" id="rpaPassword" type="password" value="${escapeHtml(draft.password)}" /><small class="form-error">${escapeHtml(opening.errors.password || "")}</small></label>
    <label class="field required"><span>开票人身份</span><select class="semi-select" id="rpaRole"><option value="办税员" ${draft.role === "办税员" ? "selected" : ""}>办税员</option><option value="财务负责人" ${draft.role === "财务负责人" ? "selected" : ""}>财务负责人</option><option value="法定代表人" ${draft.role === "法定代表人" ? "selected" : ""}>法定代表人</option></select></label>
    <label class="field"><span>联系邮箱</span><input class="semi-input" id="rpaEmail" value="${escapeHtml(draft.email)}" placeholder="选填" /><small class="form-error">${escapeHtml(opening.errors.email || "")}</small></label>
  </div>`;
}

function renderJointForm(company, opening) {
  const draft = opening.joint;
  const merchant = selectedMerchant(company, opening);
  const wxOptions = merchant
    ? `<div class="wx-options">${merchant.wxAccounts
        .map((wx) => `<label class="wx-option"><input type="checkbox" name="jointWx" value="${wx.no}" ${draft.wxMerchantNos.includes(wx.no) ? "checked" : ""} /><strong>${escapeHtml(wx.no)}</strong><span>${escapeHtml(wx.purpose)}</span><span>${escapeHtml(wx.institution)}</span></label>`)
        .join("")}</div>`
    : "";
  return `<div class="form-grid">
    <section class="merchant-choice-module span-2" aria-labelledby="merchantChoiceTitle"><div class="merchant-choice-head"><h3 id="merchantChoiceTitle">查询收钱吧商户</h3></div><div class="merchant-way-content"><div class="field"><div style="display:flex;gap:12px"><input class="semi-input" id="manualMerchant" aria-label="收钱吧商户号" value="${escapeHtml(draft.manualMerchantId)}" placeholder="请输入收钱吧商户号" /><button class="button border" type="button" data-action="query-merchant">查询</button></div></div></div><small class="form-error">${escapeHtml(opening.errors.merchant || "")}</small></section>
    ${merchant ? `<div class="merchant-result span-2"><h4>授权商户信息</h4><dl class="review-grid"><div><dt>收钱吧商户号</dt><dd>${escapeHtml(merchant.id)}</dd></div><div><dt>商户名称</dt><dd>${escapeHtml(merchant.name)}</dd></div><div><dt>营业执照名称</dt><dd>${escapeHtml(company.name)}</dd></div><div><dt>统一社会信用代码</dt><dd>${escapeHtml(company.registrationNo)}</dd></div></dl><div class="field-label required" style="margin-top:18px">选择微信商户号</div>${wxOptions}<small class="form-error">${escapeHtml(opening.errors.wx || "")}</small></div>` : ""}
    <fieldset class="field span-2" style="border:0;padding:0;margin:0"><legend class="field-label required">选择开票能力</legend><div class="checkbox-group">${Object.entries(ABILITY_LABELS).map(([key, label]) => `<label class="checkbox-item"><input type="checkbox" name="ability" value="${key}" ${draft.abilities.includes(key) ? "checked" : ""} />${label}</label>`).join("")}</div><small class="form-error">${escapeHtml(opening.errors.abilities || "")}</small></fieldset>
  </div>`;
}

function renderSelfUseForm(company, opening) {
  const queryResult = opening.selfQueryStatus === "checking"
    ? ""
    : opening.selfVerified
      ? `<div class="notice success"><span>已查询到使用单位信息。</span></div><div class="self-check-result"><h4>使用单位信息</h4><dl class="review-grid"><div><dt>使用单位名称</dt><dd>${escapeHtml(company.name)}</dd></div><div><dt>纳税人识别号</dt><dd>${escapeHtml(company.registrationNo)}</dd></div></dl></div>`
      : "";
  const checking = opening.selfQueryStatus === "checking";
  const accessButton = opening.selfVerified
    ? '<button class="button border self-access-button" type="button" disabled>已完成接入</button>'
    : `<button class="button primary self-access-button ${checking ? "loading" : ""}" type="button" data-action="confirm-self-access" ${checking ? "disabled" : ""}>${checking ? '<span class="query-spinner" aria-hidden="true"></span>检查中' : "已完成接入"}</button>`;
  return `<div class="self-use-access"><div class="notice"><span>请先完成使用单位接入，完成后点击下方“已完成接入”，系统将自动检查使用单位信息。</span></div>${accessButton}${queryResult}${opening.errors.self ? `<div class="form-error">${escapeHtml(opening.errors.self)}</div>` : ""}</div>`;
}

function startSelfUseAutoQuery(opening) {
  if (!opening || opening.mode !== "self" || !opening.selfAccessConfirmed) return;
  opening.selfQueryStatus = "checking";
  opening.selfVerified = false;
  window.clearTimeout(startSelfUseAutoQuery.timer);
  startSelfUseAutoQuery.timer = window.setTimeout(() => {
    if (state.opening !== opening || state.view !== "opening-cn" || opening.mode !== "self" || opening.step !== 3) return;
    opening.selfQueryStatus = "success";
    opening.selfVerified = true;
    opening.errors = {};
    render();
  }, 700);
}

function renderChinaReview(company, opening) {
  const tax = opening.tax;
  let modeDetail = "";
  if (opening.mode === "rpa") modeDetail = `<div><dt>开票人姓名</dt><dd>${escapeHtml(opening.rpa.name)}</dd></div><div><dt>税局登录手机号</dt><dd>${escapeHtml(opening.rpa.mobile)}</dd></div><div><dt>开票人身份</dt><dd>${escapeHtml(opening.rpa.role)}</dd></div><div><dt>联系邮箱</dt><dd>${escapeHtml(opening.rpa.email || "-")}</dd></div>`;
  if (opening.mode === "joint") {
    const merchant = selectedMerchant(company, opening);
    modeDetail = `<div><dt>授权商户</dt><dd>${escapeHtml(merchant?.name || "-")}（${escapeHtml(merchant?.id || "-")}）</dd></div><div><dt>微信商户号</dt><dd>${escapeHtml(opening.joint.wxMerchantNos.join("、"))}</dd></div><div><dt>开票能力</dt><dd>${opening.joint.abilities.map((key) => ABILITY_LABELS[key]).join("、")}</dd></div>`;
  }
  if (opening.mode === "self") modeDetail = `<div><dt>使用单位接入</dt><dd>已完成</dd></div><div><dt>使用单位名称</dt><dd>${escapeHtml(company.name)}</dd></div><div><dt>纳税人识别号</dt><dd>${escapeHtml(company.registrationNo)}</dd></div>`;
  return `<div class="flow-section"><div class="section-heading"><div><h2>确认提交</h2></div></div>
    <h3>公司及税务信息</h3><dl class="review-grid"><div><dt>公司名称</dt><dd>${escapeHtml(company.name)}</dd></div><div><dt>统一社会信用代码</dt><dd>${escapeHtml(company.registrationNo)}</dd></div><div><dt>纳税人类型</dt><dd>${tax.taxpayerType === "general" ? "一般纳税人" : "小规模纳税人"}</dd></div><div><dt>计税方式</dt><dd>${tax.taxMethod === "general" ? "一般计税" : "简易计税"}</dd></div><div><dt>征收率</dt><dd>${escapeHtml(tax.taxMethod === "simple" ? tax.rate : "-")}</dd></div></dl>
    <div class="section-divider"></div><h3>${escapeHtml(modeLabel(opening.mode))}开通信息</h3><dl class="review-grid">${modeDetail}</dl>
    <div class="flow-actions"><button class="button border" type="button" data-action="prev-opening">上一步</button><button class="button primary" type="button" data-action="submit-opening">确认提交</button></div></div>`;
}

function renderMalaysiaOpening() {
  const company = currentCompany();
  const opening = state.opening;
  if (!company || !opening) {
    state.view = "detail";
    render();
    return;
  }
  app.innerHTML = `
    ${breadcrumb([{ label: "主页", action: "back-customers" }, { label: "我的客户", action: "back-customers" }, { label: "客户详情", action: "back-customer-detail" }, { label: "公司详情", action: "back-detail" }, { label: "开通发票功能" }])}
    ${companySummary(company)}
    <section class="panel"><div class="flow-body"><div class="flow-section"><div class="section-heading"><div><h2>开通发票功能</h2></div></div>
      <dl class="review-grid" style="margin-bottom:24px"><div><dt>公司名称</dt><dd>${escapeHtml(company.name)}</dd></div><div><dt>注册国家/地区</dt><dd>马来西亚</dd></div><div><dt>商业注册号码（BRN）</dt><dd>${escapeHtml(company.registrationNo)}</dd></div></dl>
      <div class="form-grid"><label class="field required"><span>税务识别号码（TIN）</span><input class="semi-input" id="myTin" value="${escapeHtml(opening.tin)}" placeholder="请输入 TIN" /><small class="form-error">${escapeHtml(opening.errors.tin || "")}</small></label><label class="field required"><span>销售与服务税注册号码（SST）</span><input class="semi-input" id="mySst" value="${escapeHtml(opening.sst)}" placeholder="请输入 SST" /><small class="form-error">${escapeHtml(opening.errors.sst || "")}</small></label></div>
      <div class="notice warning" style="margin-top:24px"><span>企业需要先在马来西亚税局系统中完成发票中介机构授权。</span></div>
      <div class="flow-actions"><button class="button border" type="button" data-action="cancel-opening">取消</button><button class="button primary" type="button" data-action="submit-my-opening">确认开通</button></div>
    </div></div></section>`;
}

function openConfirm(title, message, confirmAction, payload = {}) {
  state.modal = { type: "confirm", title, message, confirmAction, payload };
  renderModal();
}

function findJointRecord(recordId) {
  return currentCompany()?.modes?.joint?.records?.find((record) => record.id === recordId);
}

function renderModal() {
  const modal = state.modal;
  if (!modal) {
    modalRoot.innerHTML = "";
    return;
  }
  let title = modal.title || "提示";
  let body = "";
  let confirmText = "确认";
  let confirmAction = modal.confirmAction || "modal-confirm";
  let wide = false;
  if (modal.type === "confirm") {
    body = `<p style="margin:0;color:#4e5969">${escapeHtml(modal.message)}</p>`;
  } else if (modal.type === "edit-tax") {
    const company = currentCompany();
    title = "编辑纳税人基本信息";
    confirmText = "保存";
    confirmAction = "save-tax";
    wide = true;
    body = `<div class="form-grid"><label class="field required"><span>纳税人类型</span><select class="semi-select" id="editTaxpayerType"><option value="general" ${company.tax.taxpayerType === "general" ? "selected" : ""}>一般纳税人</option><option value="small" ${company.tax.taxpayerType === "small" ? "selected" : ""}>小规模纳税人</option></select></label><label class="field required"><span>计税方式</span><select class="semi-select" id="editTaxMethod"><option value="general" ${company.tax.taxMethod === "general" ? "selected" : ""}>一般计税</option><option value="simple" ${company.tax.taxMethod === "simple" ? "selected" : ""}>简易计税</option></select></label><label class="field"><span>征收率</span><select class="semi-select" id="editTaxRate"><option value="">不适用</option><option value="1%" ${company.tax.rate === "1%" ? "selected" : ""}>1%</option><option value="3%" ${company.tax.rate === "3%" ? "selected" : ""}>3%</option><option value="5%" ${company.tax.rate === "5%" ? "selected" : ""}>5%</option></select></label><label class="field"><span>地址</span><input class="semi-input" id="editTaxAddress" value="${escapeHtml(company.tax.address)}" /></label><label class="field"><span>电话</span><input class="semi-input" id="editTaxPhone" value="${escapeHtml(company.tax.phone)}" /></label><label class="field"><span>开户行</span><input class="semi-input" id="editTaxBank" value="${escapeHtml(company.tax.bank)}" /></label><label class="field span-2"><span>开户行账号</span><input class="semi-input" id="editTaxBankAccount" value="${escapeHtml(company.tax.bankAccount)}" /></label><div class="form-error span-2" id="editTaxError"></div></div>`;
  } else if (modal.type === "edit-my") {
    const company = currentCompany();
    title = "编辑马来西亚税务信息";
    confirmText = "保存";
    confirmAction = "save-my-tax";
    body = `<div class="form-grid" style="grid-template-columns:1fr"><label class="field required"><span>税务识别号码（TIN）</span><input class="semi-input" id="editMyTin" value="${escapeHtml(company.licenses.TIN)}" /></label><label class="field required"><span>销售与服务税注册号码（SST）</span><input class="semi-input" id="editMySst" value="${escapeHtml(company.licenses.SST)}" /></label><div class="form-error" id="editMyError"></div></div>`;
  } else if (modal.type === "add-ability") {
    const record = findJointRecord(modal.recordId);
    const remaining = Object.keys(ABILITY_LABELS).filter((ability) => !record.abilities.includes(ability) && !(record.pendingAbilities || []).includes(ability));
    title = "增加开通能力";
    confirmText = "提交开通";
    confirmAction = "confirm-add-ability";
    body = `<dl class="review-grid" style="margin-bottom:20px"><div><dt>微信商户号</dt><dd>${escapeHtml(record.wxMerchantNo)}</dd></div><div><dt>已开通能力</dt><dd>${record.abilities.map((ability) => ABILITY_LABELS[ability]).join("、")}</dd></div></dl><fieldset class="field" style="border:0;padding:0;margin:0"><legend class="field-label required">选择需要增加的能力</legend><div class="checkbox-group">${remaining.map((ability) => `<label class="checkbox-item"><input type="checkbox" name="additionalAbility" value="${ability}" />${ABILITY_LABELS[ability]}</label>`).join("")}</div><small class="form-error" id="addAbilityError"></small></fieldset>`;
  } else if (modal.type === "qr") {
    const record = findJointRecord(modal.recordId);
    title = "腾讯乐企授权";
    confirmText = "关闭";
    confirmAction = "modal-close";
    wide = true;
    body = renderQrCard(record);
  } else if (modal.type === "progress") {
    const company = currentCompany();
    const mode = company.modes[modal.mode];
    title = `${modeLabel(modal.mode)}开通进度`;
    confirmText = "关闭";
    confirmAction = "modal-close";
    body = renderModeProgressBody(modal.mode, mode);
  }
  const singleClose = modal.type === "progress" || modal.type === "qr";
  modalRoot.innerHTML = `<div class="modal-mask" role="presentation"><section class="modal ${wide ? "wide" : ""}" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><div class="modal-head"><h2 id="modalTitle">${escapeHtml(title)}</h2><button class="modal-close" type="button" data-action="modal-close" aria-label="关闭">×</button></div><div class="modal-body">${body}</div><div class="modal-foot">${singleClose ? "" : '<button class="button border" type="button" data-action="modal-close">取消</button>'}<button class="button primary" type="button" data-action="${confirmAction}">${confirmText}</button></div></section></div>`;
}

function renderModeProgressBody(key, mode) {
  if (key === "rpa") return `<div class="notice"><span>RPA 开通申请正在由运营人员处理，销售端无需进行税局登录操作。</span></div>`;
  if (key === "self") return `<div class="notice"><span>乐企自用开通正在执行公司功能开通和模式设置。</span></div>`;
  const rows = (mode.records || []).filter((record) => record.status !== "success");
  if (!rows.length) return `<div class="notice success"><span>当前模式已开通成功。</span></div>`;
  return rows.map((record) => `<div class="notice ${record.channelStatus === "failed" ? "error" : ""}" style="margin-bottom:12px"><span>微信商户号 ${escapeHtml(record.wxMerchantNo)}：${escapeHtml(channelStatusLabel(record.channelStatus))}${record.errorReason ? `，${escapeHtml(record.errorReason)}` : ""}</span></div>`).join("");
}

function captureFilters() {
  state.filters = {
    name: document.getElementById("filterName")?.value.trim() || "",
    registration: document.getElementById("filterRegistration")?.value.trim() || "",
    type: document.getElementById("filterType")?.value || "",
    status: document.getElementById("filterStatus")?.value || "",
  };
}

function captureTaxStep() {
  const opening = state.opening;
  if (!opening) return;
  opening.tax = {
    taxpayerType: document.getElementById("taxpayerType")?.value || opening.tax.taxpayerType,
    taxMethod: document.getElementById("taxMethod")?.value || opening.tax.taxMethod,
    rate: document.getElementById("taxRate")?.value || "",
    address: document.getElementById("taxAddress")?.value.trim() || "",
    phone: document.getElementById("taxPhone")?.value.trim() || "",
    bank: document.getElementById("taxBank")?.value.trim() || "",
    bankAccount: document.getElementById("taxBankAccount")?.value.trim() || "",
  };
  if (opening.tax.taxpayerType === "small") opening.tax.taxMethod = "simple";
}

function captureRpaStep() {
  const opening = state.opening;
  opening.rpa = {
    name: document.getElementById("rpaName")?.value.trim() || "",
    mobile: document.getElementById("rpaMobile")?.value.trim() || "",
    password: document.getElementById("rpaPassword")?.value || "",
    role: document.getElementById("rpaRole")?.value || "办税员",
    email: document.getElementById("rpaEmail")?.value.trim() || "",
  };
}

function captureJointStep() {
  const opening = state.opening;
  opening.joint.manualMerchantId = document.getElementById("manualMerchant")?.value.trim() || opening.joint.manualMerchantId;
  opening.joint.wxMerchantNos = Array.from(document.querySelectorAll('input[name="jointWx"]:checked')).map((input) => input.value);
  opening.joint.abilities = Array.from(document.querySelectorAll('input[name="ability"]:checked')).map((input) => input.value);
}

function validateTaxStep() {
  const opening = state.opening;
  opening.errors = {};
  if (opening.tax.taxMethod === "simple" && !opening.tax.rate) opening.errors.rate = "请选择征收率";
  return !Object.keys(opening.errors).length;
}

function validateRpaStep() {
  const opening = state.opening;
  opening.errors = {};
  if (!opening.rpa.name) opening.errors.name = "请输入开票人姓名";
  if (!/^1\d{10}$/.test(opening.rpa.mobile)) opening.errors.mobile = "请输入有效的手机号";
  if (!opening.rpa.password) opening.errors.password = "请输入税局密码";
  if (opening.rpa.email && !/^\S+@\S+\.\S+$/.test(opening.rpa.email)) opening.errors.email = "请输入有效的邮箱";
  return !Object.keys(opening.errors).length;
}

function validateJointStep(company) {
  const opening = state.opening;
  opening.errors = {};
  const merchant = selectedMerchant(company, opening);
  if (!merchant) opening.errors.merchant = "请查询收钱吧商户";
  if (!opening.joint.wxMerchantNos.length) opening.errors.wx = "至少选择一个微信商户号";
  if (!opening.joint.abilities.length) opening.errors.abilities = "至少选择一项开票能力";
  return !Object.keys(opening.errors).length;
}

function nextOpening() {
  const company = currentCompany();
  const opening = state.opening;
  if (!company || !opening) return;
  if (opening.step === 1) {
    captureTaxStep();
    if (!validateTaxStep()) return render();
    opening.step = 2;
  } else if (opening.step === 2) {
    opening.errors = {};
    if (!opening.mode) {
      opening.errors.mode = "请选择开票模式";
      return render();
    }
    opening.step = 3;
  } else if (opening.step === 3) {
    let valid = false;
    if (opening.mode === "rpa") {
      captureRpaStep();
      valid = validateRpaStep();
    } else if (opening.mode === "joint") {
      captureJointStep();
      valid = validateJointStep(company);
    } else if (opening.mode === "self") {
      opening.errors = {};
      valid = opening.selfVerified;
      if (!valid) opening.errors.self = opening.selfAccessConfirmed ? "使用单位信息检查尚未完成，请稍候" : "请先确认已完成使用单位接入";
    }
    if (!valid) return render();
    opening.step = 4;
  }
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function prevOpening() {
  if (!state.opening) return;
  state.opening.errors = {};
  const minimumStep = state.opening.kind === "additional" ? 3 : 1;
  state.opening.step = Math.max(minimumStep, state.opening.step - 1);
  render();
}

function submitChinaOpening() {
  const company = currentCompany();
  const opening = state.opening;
  if (!company || !opening) return;
  const wasOpened = company.openStatus === "success";
  const createdRecordIds = [];
  company.tax = clone(opening.tax);
  if (opening.mode === "rpa") {
    company.modes.rpa = { status: "opening", accounts: [rpaAccount(opening.rpa.name, opening.rpa.mobile)] };
    company.modes.rpa.accounts[0].email = opening.rpa.email || "-";
    company.modes.rpa.accounts[0].role = opening.rpa.role;
  } else if (opening.mode === "joint") {
    const merchant = selectedMerchant(company, opening);
    opening.joint.wxMerchantNos.forEach((wxMerchantNo, index) => {
      const record = wxRecord({
        id: `WX-NEW-${Date.now()}-${index + 1}`,
        merchantId: merchant.id,
        merchantName: merchant.name,
        wxMerchantNo,
        abilities: clone(opening.joint.abilities),
        status: "opening",
        channelStatus: "pending",
        updatedAt: "2026-08-26 16:30",
      });
      createdRecordIds.push(record.id);
      company.modes.joint.records.push(record);
    });
    if (company.modes.joint.status !== "success") company.modes.joint.status = "opening";
  } else {
    company.modes.self = { status: "success" };
  }
  if (!wasOpened) {
    if (opening.mode === "self") {
      company.openStatus = "success";
      company.enabled = true;
      company.currentMode = "self";
    } else {
      company.openStatus = "opening";
      company.openingMode = opening.mode;
    }
  }
  state.result = { mode: opening.mode, recordIds: createdRecordIds };
  state.opening = null;
  state.view = "opening-result";
  render();
  showToast(opening.mode === "self" ? "公司发票功能已开通" : "开通申请已提交");
}

function renderOpeningResult() {
  const company = currentCompany();
  const result = state.result;
  if (!company || !result) {
    state.view = "detail";
    state.companyTab = "invoice";
    render();
    return;
  }
  const mode = result.mode;
  const success = mode === "self";
  const title = success ? "开通已成功" : "开通申请已提交";
  const description =
    mode === "rpa"
      ? "运营人员将联系客户完成税局登录验证和后续开通操作。"
      : mode === "joint"
        ? "请将下方授权二维码或授权链接转发给企业法定代表人或微信商户管理员。"
        : "公司已完成乐企自用开通，可以进入电子发票页面查看。";
  const records = mode === "joint" ? (result.recordIds || []).map(findJointRecord).filter(Boolean) : [];
  const invitations = records.length ? `<div class="result-invite-list">${records.map((record) => renderQrCard(record)).join("")}</div>` : "";
  app.innerHTML = `
    ${breadcrumb([{ label: "主页", action: "back-customers" }, { label: "我的客户", action: "back-customers" }, { label: "客户详情", action: "back-customer-detail" }, { label: "公司详情", action: "back-detail" }, { label: "开通结果" }])}
    ${companySummary(company)}
    <section class="panel opening-result"><div class="result-icon ${success ? "success" : "processing"}">${success ? "✓" : "✓"}</div><h2>${title}</h2><p>${description}</p><div class="result-mode"><span>开票模式</span><strong>${escapeHtml(modeLabel(mode))}</strong></div>${invitations}<div class="result-actions"><button class="button primary" type="button" data-action="result-finish">返回</button></div></section>`;
}

function submitMalaysiaOpening() {
  const company = currentCompany();
  const opening = state.opening;
  opening.tin = document.getElementById("myTin")?.value.trim() || "";
  opening.sst = document.getElementById("mySst")?.value.trim() || "";
  opening.errors = {};
  if (!opening.tin) opening.errors.tin = "请输入税务识别号码（TIN）";
  if (!opening.sst || opening.sst.toUpperCase() === "NA") opening.errors.sst = "请输入有效的销售与服务税注册号码（SST）";
  if (Object.keys(opening.errors).length) return render();
  company.licenses.TIN = opening.tin;
  company.licenses.SST = opening.sst;
  company.openStatus = "success";
  company.enabled = true;
  state.opening = null;
  state.view = "detail";
  state.companyTab = "invoice";
  render();
  showToast("公司发票功能已开通");
}

function confirmModalAction() {
  const modal = state.modal;
  const company = currentCompany();
  if (!modal || !company) return;
  if (modal.confirmAction === "switch-mode") {
    const mode = modal.payload.mode;
    if (company.modes[mode]?.status !== "success") return;
    company.currentMode = mode;
    state.modal = null;
    render();
    showToast(`当前使用模式已切换为${modeLabel(mode)}`);
  } else if (modal.confirmAction === "toggle-invoice") {
    company.enabled = !company.enabled;
    state.modal = null;
    render();
    showToast(company.enabled ? "开票功能已启用" : "开票功能已禁用");
  } else if (modal.confirmAction === "set-default") {
    const record = company.modes.joint.records.find((item) => item.id === modal.payload.recordId);
    if (!record || record.status !== "success") return;
    company.modes.joint.defaultWxMerchantNo = record.wxMerchantNo;
    state.modal = null;
    render();
    showToast("默认微信商户号已更新");
  }
}

function saveTaxEdit() {
  const company = currentCompany();
  const taxMethod = document.getElementById("editTaxMethod")?.value || "general";
  const rate = document.getElementById("editTaxRate")?.value || "";
  const error = document.getElementById("editTaxError");
  if (taxMethod === "simple" && !rate) {
    error.textContent = "简易计税时必须选择征收率";
    return;
  }
  company.tax = {
    taxpayerType: document.getElementById("editTaxpayerType")?.value || "general",
    taxMethod,
    rate: taxMethod === "simple" ? rate : "",
    address: document.getElementById("editTaxAddress")?.value.trim() || "",
    phone: document.getElementById("editTaxPhone")?.value.trim() || "",
    bank: document.getElementById("editTaxBank")?.value.trim() || "",
    bankAccount: document.getElementById("editTaxBankAccount")?.value.trim() || "",
  };
  state.modal = null;
  render();
  showToast("纳税人基本信息已保存");
}

function saveMalaysiaTaxEdit() {
  const company = currentCompany();
  const tin = document.getElementById("editMyTin")?.value.trim() || "";
  const sst = document.getElementById("editMySst")?.value.trim() || "";
  const error = document.getElementById("editMyError");
  if (!tin || !sst || sst.toUpperCase() === "NA") {
    error.textContent = "请填写有效的 TIN 和 SST";
    return;
  }
  company.licenses.TIN = tin;
  company.licenses.SST = sst;
  state.modal = null;
  render();
  showToast("马来西亚税务信息已保存");
}

function submitAdditionalAbility() {
  const modal = state.modal;
  const record = findJointRecord(modal?.recordId);
  if (!record) return;
  const selected = Array.from(document.querySelectorAll('input[name="additionalAbility"]:checked')).map((input) => input.value);
  const error = document.getElementById("addAbilityError");
  if (!selected.length) {
    error.textContent = "至少选择一项需要增加的能力";
    return;
  }
  record.pendingAbilities = selected;
  record.channelStatus = "pending";
  record.errorReason = "";
  record.updatedAt = "2026-08-25 18:20";
  record.inviteUrl = `https://demo.tencent.example/invite/capability-${Date.now()}`;
  state.modal = null;
  render();
  showToast("能力开通申请已提交");
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "back-customers") {
    state.view = "customers";
    state.companyId = "";
    state.opening = null;
    state.result = null;
    state.modal = null;
    render();
    return;
  }
  if (action === "open-customer") {
    state.customerNo = target.dataset.customer;
    state.view = "customer-detail";
    state.customerTab = "companies";
    state.companyId = "";
    state.filters = { name: "", registration: "", type: "", status: "" };
    state.page = 1;
    render();
    window.scrollTo({ top: 0 });
    return;
  }
  if (action === "back-customer-detail") {
    state.view = "customer-detail";
    state.customerTab = "companies";
    state.companyId = "";
    state.opening = null;
    state.result = null;
    state.modal = null;
    render();
    window.scrollTo({ top: 0 });
    return;
  }
  if (action === "open-detail") {
    state.companyId = target.dataset.id;
    state.customerNo = currentCompany()?.customerNo || state.customerNo;
    state.companyTab = "basic";
    state.view = "detail";
    render();
    window.scrollTo({ top: 0 });
    return;
  }
  if (action === "back-detail") {
    state.view = "detail";
    state.opening = null;
    state.result = null;
    state.companyTab = "invoice";
    render();
    return;
  }
  if (action === "result-finish") {
    state.result = null;
    state.view = "detail";
    state.companyTab = "invoice";
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (action === "tab") {
    state.companyTab = target.dataset.tab;
    render();
    return;
  }
  if (action === "customer-tab") {
    state.customerTab = target.dataset.tab;
    render();
    return;
  }
  if (action === "search") {
    captureFilters();
    state.page = 1;
    render();
    return;
  }
  if (action === "reset-filters") {
    state.filters = { name: "", registration: "", type: "", status: "" };
    state.page = 1;
    render();
    return;
  }
  if (action === "page") {
    state.page = Number(target.dataset.page);
    render();
    return;
  }
  if (action === "start-opening") {
    startOpening(currentCompany());
    return;
  }
  if (action === "open-mode") {
    startOpening(currentCompany(), target.dataset.mode);
    return;
  }
  if (action === "resubmit-rpa") {
    startOpening(currentCompany(), "rpa", true);
    return;
  }
  if (action === "add-wx") {
    startOpening(currentCompany(), "joint");
    return;
  }
  if (action === "cancel-opening") {
    state.opening = null;
    state.view = "detail";
    state.companyTab = "invoice";
    render();
    return;
  }
  if (action === "select-mode") {
    state.opening.mode = target.dataset.mode;
    state.opening.errors = {};
    render();
    return;
  }
  if (action === "confirm-self-access") {
    const opening = state.opening;
    if (!opening || opening.mode !== "self" || opening.selfQueryStatus === "checking") return;
    opening.selfAccessConfirmed = true;
    opening.selfVerified = false;
    opening.selfQueryStatus = "checking";
    opening.errors = {};
    render();
    startSelfUseAutoQuery(opening);
    return;
  }
  if (action === "next-opening") {
    nextOpening();
    return;
  }
  if (action === "prev-opening") {
    prevOpening();
    return;
  }
  if (action === "query-merchant") {
    captureJointStep();
    const input = state.opening.joint.manualMerchantId;
    if (!input) {
      state.opening.errors = { merchant: "请输入收钱吧商户号" };
      render();
      return;
    }
    const company = currentCompany();
    let merchant = company.merchantCatalog.find((item) => item.id === input);
    if (!merchant) {
      merchant = {
        id: input,
        name: "手动查询授权商户",
        licenseName: company.name,
        wxAccounts: [
          { no: `154${input.slice(-7)}`, payment: "微信支付", purpose: "BSC/CSB/WAP", institution: "微信直连" },
          { no: `160${input.slice(-7)}`, payment: "微信支付", purpose: "小程序支付", institution: "微信直连" },
        ],
      };
      company.merchantCatalog.push(merchant);
    }
    state.opening.joint.merchantId = merchant.id;
    state.opening.joint.wxMerchantNos = merchant.wxAccounts.length === 1 ? [merchant.wxAccounts[0].no] : [];
    state.opening.errors = {};
    render();
    showToast("授权商户查询成功");
    return;
  }
  if (action === "submit-opening") {
    submitChinaOpening();
    return;
  }
  if (action === "submit-my-opening") {
    submitMalaysiaOpening();
    return;
  }
  if (action === "toggle-invoice") {
    const company = currentCompany();
    openConfirm(company.enabled ? "禁用开票功能" : "启用开票功能", company.enabled ? "禁用后公司将暂时不能开票，但不会删除纳税人、模式配置和历史数据。" : "确认重新启用该公司的开票功能？", "toggle-invoice");
    return;
  }
  if (action === "switch-mode") {
    const mode = target.dataset.mode;
    openConfirm("切换开票模式", `确认将当前使用模式切换为${modeLabel(mode)}？原模式配置和历史数据将继续保留。`, "switch-mode", { mode });
    return;
  }
  if (action === "set-default") {
    const recordId = target.dataset.record;
    const record = currentCompany().modes.joint.records.find((item) => item.id === recordId);
    openConfirm("设置默认微信商户号", `确认将 ${record.wxMerchantNo} 设为该税号乐企联用的默认微信商户号？`, "set-default", { recordId });
    return;
  }
  if (action === "add-ability") {
    state.modal = { type: "add-ability", recordId: target.dataset.record };
    renderModal();
    return;
  }
  if (action === "view-record-qr") {
    state.modal = { type: "qr", recordId: target.dataset.record };
    renderModal();
    return;
  }
  if (action === "refresh-record") {
    showToast("已刷新腾讯渠道状态");
    return;
  }
  if (action === "refresh-mode") {
    showToast("已刷新开通状态");
    return;
  }
  if (action === "view-mode-progress") {
    state.modal = { type: "progress", mode: target.dataset.mode };
    renderModal();
    return;
  }
  if (action === "edit-tax") {
    state.modal = { type: "edit-tax" };
    renderModal();
    return;
  }
  if (action === "edit-my-tax") {
    state.modal = { type: "edit-my" };
    renderModal();
    return;
  }
  if (action === "refresh-progress") {
    showToast("已刷新腾讯渠道状态");
    return;
  }
  if (action === "copy-link") {
    const link = target.dataset.link;
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(link).catch(() => {});
    showToast("授权链接已复制");
    return;
  }
  if (action === "contact-ops") {
    showToast("已记录运营协助请求");
  }
});

app.addEventListener("change", (event) => {
  const target = event.target;
  if (target.id === "pageSize") {
    state.pageSize = Number(target.value);
    state.page = 1;
    render();
  } else if (target.id === "taxpayerType") {
    captureTaxStep();
    if (state.opening.tax.taxpayerType === "small") state.opening.tax.taxMethod = "simple";
    render();
  } else if (target.id === "taxMethod") {
    captureTaxStep();
    if (state.opening.tax.taxMethod === "general") state.opening.tax.rate = "";
    render();
  } else if (target.name === "jointWx") {
    state.opening.joint.wxMerchantNos = Array.from(document.querySelectorAll('input[name="jointWx"]:checked')).map((input) => input.value);
  } else if (target.name === "ability") {
    state.opening.joint.abilities = Array.from(document.querySelectorAll('input[name="ability"]:checked')).map((input) => input.value);
  }
});

app.addEventListener("keydown", (event) => {
  if (state.view === "customer-detail" && event.key === "Enter" && event.target.matches("input, select")) {
    event.preventDefault();
    captureFilters();
    state.page = 1;
    render();
  }
});

document.querySelector('[data-action="go-customers"]')?.addEventListener("click", () => {
  state.view = "customers";
  state.companyId = "";
  state.opening = null;
  state.result = null;
  state.modal = null;
  render();
  window.scrollTo({ top: 0 });
});

modalRoot.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  if (action === "modal-close") {
    state.modal = null;
    renderModal();
  } else if (action === "modal-confirm") {
    confirmModalAction();
  } else if (action === "save-tax") {
    saveTaxEdit();
  } else if (action === "save-my-tax") {
    saveMalaysiaTaxEdit();
  } else if (action === "confirm-add-ability") {
    submitAdditionalAbility();
  } else if (action === "copy-link") {
    const link = target.dataset.link;
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(link).catch(() => {});
    showToast("授权链接已复制");
  } else if (["switch-mode", "toggle-invoice", "set-default"].includes(action)) {
    confirmModalAction();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.modal) {
    state.modal = null;
    renderModal();
  }
});

render();
