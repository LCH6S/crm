const state = {
  statusTarget: null,
  currentTheme: "black-gold",
  entryTheme: "black-gold",
  itemNameSource: "order-item",
  itemNameSourceDraft: "order-item",
  qrExpireDays: "30",
  pageStyle: "经典",
  invoiceNoteHtml:
    "<p>请确认订单信息后提交开票申请。专票申请提交后由商家财务审核处理。</p><p>如订单已发生退换货，请以当前可开票金额为准。</p>",
  invoiceNoteDraftHtml: "",
  ruleCategoryKeyword: "",
  ruleTaxCodeKeyword: "",
  defaultTaxNoKeyword: "",
  defaultTaxCodeKeyword: "",
  currentBrandCode: "700001",
  selfReissueByBrand: {},
  selfReissueDraft: null,
  selfSpecialInvoiceByBrand: {},
  discountInvoiceModeByBrand: {},
  discountInvoiceModeDraft: null,
  merchantCallbackByBrand: {},
  merchantCallbackDraft: null,
  brandLogoSchemeByBrand: {},
  brandLogoSchemeDraft: "",
  brandLogoPickerDraft: "",
  serviceTermsByBrand: {},
  serviceTermsDraft: [],
  serviceTermsEditing: false,
  editingServiceTermIndex: null,
  customerBrandViewMode: "list",
  customerBrandNameKeyword: "",
  customerBrandCodeKeyword: "",
  customerBrandPage: 1,
  customerBrandPageSize: 6,
  currentBrandDetailCode: null,
  newBrandLogos: { standard: "", horizontal: "" },
  editingBrandLogoSetId: null,
  brandLogoSetDraft: { standard: "", horizontal: "" },
  editingRuleIndex: null,
  editingPaymentIndex: null,
  editingDefaultTaxCodeIndex: null,
  currentTaxNoId: null,
  ruleBatchMode: "category",
  ruleBatchStep: 1,
  ruleBatchFileName: "",
  ruleBatchRows: [],
  customerNameKeyword: "",
  customerNumberKeyword: "",
  customerSalesKeyword: "",
  taxpayerNameKeyword: "",
  taxpayerTaxNoKeyword: "",
  taxpayerTypeFilter: "",
  taxpayerMethodFilter: "",
  managedBrandNameKeyword: "",
  managedBrandCodeKeyword: "",
  managedBrandCustomerKeyword: "",
  currentCustomerId: "160247730638",
  agreementManagementTab: "agreementResourceListPanel",
  agreementResourceNameKeyword: "",
  agreementResourceTypeFilter: "",
  confirmationSchemeNameKeyword: "",
  confirmationSchemeStatusFilter: "",
  editingAgreementResourceId: null,
  agreementResourceDraft: null,
  editingConfirmationSchemeId: null,
  confirmationSchemeDraft: null,
  brandInvoiceDescriptionResourceByBrand: { "700001": "resource-service-invoice" },
  brandConfirmationSchemeByBrand: { "700001": "scheme-retail-common" },
  invoiceDescriptionResourcePickerDraft: "",
  confirmationSchemePickerDraft: "",
  brandDetailSource: "customer",
  brandSettingsSource: "brandDetail",
  superAdminContext: null,
  pendingSuperAdminDelete: null,
  editingStoreInvoiceId: null,
  storeInvoiceCompanyDraft: "",
  storeInvoiceCompanyNameKeyword: "",
  storeInvoiceCompanyUsccKeyword: "",
  storeInvoiceCompanyOpenedOnly: false,
  storeNameKeyword: "",
  storeCodeKeyword: "",
  storeInvoiceBatchStep: 1,
  storeInvoiceBatchFileName: "",
  storeInvoiceBatchRows: [],
};

const BRAND_LOGO_SET_LIMIT = 7;

const customers = [
  {
    id: "160247730651",
    name: "isv_test0",
    shortName: "ISV 测试客户",
    projectCode: "KA-SH-LYQ-A000477",
    contactName: "周宁",
    contactPhone: "13912345678",
    contactEmail: "zhou.ning@sqb-demo.cn",
    sales: "余赛波",
    salesOrg: "大客户 / 华东区 / 余赛波的组织",
    customerExecutive: "沈知行",
    createdAt: "2020-01-20 10:57",
    einvoiceEnabled: false,
    superAdmin: null,
  },
  {
    id: "160247730638",
    name: "集团商户一号",
    shortName: "集团一号",
    projectCode: "KA-SH-LYQ-A000478",
    contactName: "王岚",
    contactPhone: "13812346801",
    contactEmail: "wanglan@sqb-demo.cn",
    sales: "张珺",
    salesOrg: "大客户 / 总部 / Stanley的组织",
    customerExecutive: "陈雨欣",
    createdAt: "2019-11-01 13:48",
    einvoiceEnabled: true,
    superAdmin: { id: "group-admin-1", userName: "陈晴", loginAccount: "chenqing" },
  },
];

const agreementResources = [
  {
    id: "resource-service-invoice",
    customerId: "160247730638",
    name: "电子发票开票说明",
    type: "service",
    version: "V1.2",
    status: "published",
    updatedAt: "2026-08-10 14:20",
    content: "<h2>电子发票开票说明</h2><p>请确认订单信息后提交开票申请。专票申请提交后由商家财务审核处理。</p><p>如订单已发生退换货，请以当前可开票金额为准。</p>",
  },
  {
    id: "resource-agreement-privacy",
    customerId: "160247730638",
    name: "隐私政策",
    type: "agreement",
    version: "V2.1",
    status: "published",
    updatedAt: "2026-08-09 09:35",
    content: "<h2>隐私政策</h2><p>本政策用于说明在零售订单开票服务中，个人信息的收集、使用和保护方式。</p><h3>信息使用</h3><ul><li>用于校验订单与开票申请。</li><li>用于发送发票开具结果。</li></ul>",
  },
  {
    id: "resource-agreement-terms",
    customerId: "160247730638",
    name: "使用条款",
    type: "agreement",
    version: "V1.3",
    status: "published",
    updatedAt: "2026-08-08 16:10",
    content: "<h2>使用条款</h2><p>提交开票申请前，请确认订单、抬头和联系方式真实准确。</p><p>申请人应对所填信息的真实性负责。</p>",
  },
  {
    id: "resource-agreement-cross-border",
    customerId: "160247730638",
    name: "个人信息跨境传输说明",
    type: "agreement",
    version: "V1.0",
    status: "published",
    updatedAt: "2026-08-07 11:45",
    content: "<h2>个人信息跨境传输说明</h2><p>为支持跨境业务服务，部分信息可能由境外系统处理。请阅读并确认本说明。</p>",
  },
];

const confirmationSchemes = [
  {
    id: "scheme-retail-common",
    customerId: "160247730638",
    name: "零售开票通用确认方案",
    description: "零售订单开票申请页通用",
    status: "enabled",
    updatedAt: "2026-08-10 15:05",
    items: [
      { id: "confirm-item-privacy", text: "我已阅读并同意", resourceIds: ["resource-agreement-privacy", "resource-agreement-terms"] },
      { id: "confirm-item-cross-border", text: "我已阅读并同意", resourceIds: ["resource-agreement-cross-border"] },
    ],
  },
  {
    id: "scheme-privacy-basic",
    customerId: "160247730638",
    name: "基础隐私确认方案",
    description: "仅确认隐私政策和使用条款",
    status: "enabled",
    updatedAt: "2026-08-09 10:18",
    items: [
      { id: "confirm-item-basic", text: "我已阅读并同意", resourceIds: ["resource-agreement-privacy", "resource-agreement-terms"] },
    ],
  },
];

function getCurrentCustomer() {
  return customers.find((item) => item.id === state.currentCustomerId) || null;
}

const themeNames = {
  "black-gold": "黑金",
  "black-white": "黑白",
  "red-white": "红白",
};

const taxCodeNames = {
  "1040201000000000000": "服装",
  "1040207000000000000": "箱包",
  "3049900000000000000": "其他现代服务",
};

const itemNameSourceNames = {
  "order-item": "取订单商品名称",
  "category-alias": "取商品大类别名",
};

const taxRegions = [
  "北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "大连市（计划单列市）", "吉林省", "黑龙江省",
  "上海市", "江苏省", "浙江省", "宁波市（计划单列市）", "安徽省", "福建省", "厦门市（计划单列市）", "江西省",
  "山东省", "青岛市（计划单列市）", "河南省", "湖北省", "湖南省", "广东省", "深圳市（计划单列市）", "广西壮族自治区",
  "海南省", "重庆市", "四川省", "贵州省", "云南省", "西藏自治区", "陕西省", "甘肃省", "青海省", "宁夏回族自治区", "新疆维吾尔自治区",
];

const taxNos = [
  {
    id: "tax-1",
    name: "上海我有示例商贸有限公司",
    taxNo: "91310115MA1K3DEMOA",
    taxpayerType: "一般纳税人",
    taxMethod: "一般计税",
    levyRate: "-",
    region: "上海市",
    address: "上海市静安区南京西路示例路 88 号",
    phone: "021-61234567",
    bankName: "招商银行上海静安支行",
    bankAccount: "3100 1234 5678 9012",
    createdAt: "2026-06-18 10:20",
    invoiceChannel: "企享云 RPA",
    invoiceUsers: [
      {
        name: "张珺",
        taxAccount: "sh_wosai_invoice",
        email: "invoice@sqb-demo.cn",
        role: "开票员",
        loginMode: "账号密码登录",
        loginAccount: "138****6801",
        createdAt: "2026-06-18 11:10",
        updatedAt: "2026-07-06 15:10",
      },
    ],
    enabled: true,
    reason: "-",
  },
  {
    id: "tax-2",
    name: "南京示例零售有限公司",
    taxNo: "91320100MA1RDEMO01",
    taxpayerType: "小规模纳税人",
    taxMethod: "简易计税",
    levyRate: "3%",
    region: "江苏省",
    address: "南京市玄武区中山路示例路 66 号",
    phone: "025-61234567",
    bankName: "中国工商银行南京新街口支行",
    bankAccount: "4301 5678 9012 3456",
    createdAt: "2026-06-20 14:35",
    invoiceChannel: "腾讯乐企联用",
    invoiceUsers: [
      {
        name: "李玥",
        taxAccount: "nj_demo_invoice",
        email: "finance@nj-demo.cn",
        role: "开票员",
        loginMode: "扫码登录",
        loginAccount: "li.yue",
        createdAt: "2026-06-20 15:00",
        updatedAt: "2026-07-05 09:25",
      },
    ],
    enabled: false,
    reason: "客户上线前暂不开通南京区域",
  },
];

const brands = [
  {
    name: "WOSAI Demo Shop",
    code: "700001",
    desc: "集团零售订单开票示例品牌",
    industry: "餐饮服务",
    groupName: "集团商户一号",
    createdAt: "2020-05-12 22:24",
    logoUrl: createBrandLogo("W", "#3156c9"),
    logoHorizontalUrl: createBrandLogo("WOSAI Demo Shop", "#3156c9", true),
  },
  {
    name: "Swatch",
    code: "700002",
    desc: "腕表零售品牌",
    industry: "钟表零售",
    groupName: "集团商户一号",
    createdAt: "2020-06-18 11:35",
    logoUrl: createBrandLogo("S", "#d9363e"),
    logoHorizontalUrl: createBrandLogo("SWATCH", "#d9363e", true),
  },
  {
    name: "Omega",
    code: "700003",
    desc: "高端腕表零售品牌",
    industry: "钟表零售",
    groupName: "集团商户一号",
    createdAt: "2020-07-03 09:40",
    logoUrl: createBrandLogo("Ω", "#8c6f3d"),
    logoHorizontalUrl: createBrandLogo("OMEGA", "#8c6f3d", true),
  },
  {
    name: "Ralph Lauren",
    code: "700004",
    desc: "国际时装与生活方式品牌",
    industry: "服饰零售",
    groupName: "集团商户一号",
    createdAt: "2020-08-16 14:20",
    logoUrl: createBrandLogo("RL", "#24364b"),
    logoHorizontalUrl: createBrandLogo("RALPH LAUREN", "#24364b", true),
  },
  {
    name: "Ubras",
    code: "700005",
    desc: "舒适贴身服饰品牌",
    industry: "服饰零售",
    groupName: "集团商户一号",
    createdAt: "2020-09-22 16:08",
    logoUrl: createBrandLogo("U", "#bf5b76"),
    logoHorizontalUrl: createBrandLogo("UBRAS", "#bf5b76", true),
  },
  {
    name: "林清轩",
    code: "700006",
    desc: "山茶花护肤品牌",
    industry: "美妆零售",
    groupName: "集团商户一号",
    createdAt: "2020-10-11 10:16",
    logoUrl: createBrandLogo("林", "#8f3d2c"),
    logoHorizontalUrl: createBrandLogo("林清轩", "#8f3d2c", true),
  },
  {
    name: "MAIA ACTIVE",
    code: "700007",
    desc: "女性运动服饰品牌",
    industry: "运动服饰",
    groupName: "集团商户一号",
    createdAt: "2020-11-05 18:30",
    logoUrl: createBrandLogo("M", "#7766a7"),
    logoHorizontalUrl: createBrandLogo("MAIA ACTIVE", "#7766a7", true),
  },
  {
    name: "Hazzys",
    code: "700008",
    desc: "英伦风格服饰品牌",
    industry: "服饰零售",
    groupName: "集团商户一号",
    createdAt: "2020-12-19 12:05",
    logoUrl: "",
    logoHorizontalUrl: "",
  },
];

brands.forEach((brand, index) => {
  brand.operatingCountry ||= "CN";
  brand.superAdmin = index === 0
    ? { id: "brand-admin-1", userName: "林默", loginAccount: "linmo" }
    : null;
});

const operatingCountryNames = {
  CN: "中国",
  MY: "马来西亚",
};

brands[0].logoSets = [
  {
    id: "700001-default",
    name: "默认版本",
    standardUrl: brands[0].logoUrl,
    horizontalUrl: brands[0].logoHorizontalUrl,
    isDefault: true,
    createdAt: brands[0].createdAt,
  },
  {
    id: "700001-dark",
    name: "深色背景版",
    standardUrl: createBrandLogo("W", "#111827"),
    horizontalUrl: createBrandLogo("WOSAI Demo Shop", "#111827", true),
    isDefault: false,
    createdAt: "2026-07-22 14:20",
  },
];

function ensureBrandLogoSets(brand) {
  if (!Array.isArray(brand.logoSets) || !brand.logoSets.length) {
    brand.logoSets = [{
      id: `${brand.code}-default`,
      name: "默认版本",
      standardUrl: brand.logoUrl || "",
      horizontalUrl: brand.logoHorizontalUrl || "",
      isDefault: true,
      createdAt: brand.createdAt || formatCreatedAt(),
    }];
  }
  let defaultSet = brand.logoSets.find((item) => item.isDefault);
  if (!defaultSet) {
    defaultSet = brand.logoSets[0];
    defaultSet.isDefault = true;
  }
  brand.logoSets.forEach((item) => {
    if (item !== defaultSet) item.isDefault = false;
  });
  brand.logoUrl = defaultSet.standardUrl || "";
  brand.logoHorizontalUrl = defaultSet.horizontalUrl || "";
  return brand.logoSets;
}

function getCurrentBrandDetail() {
  return brands.find((item) => item.code === state.currentBrandDetailCode) || null;
}

const storeInvoiceSettings = new Map();

function ensureStoreInvoiceSetting(store) {
  if (!storeInvoiceSettings.has(store.id)) {
    storeInvoiceSettings.set(store.id, {
      id: store.id,
      brandCode: store.brandCode,
      name: store.name,
      code: store.storeNo,
      invoiceCompanyId: "",
      enabled: false,
      reason: "未设置默认开票主体",
      updated: "-",
    });
  }
  const setting = storeInvoiceSettings.get(store.id);
  setting.brandCode = store.brandCode;
  setting.name = store.name;
  setting.code = store.storeNo;
  return setting;
}

function getInvoiceStores() {
  return brandStores
    .filter((store) => store.brandCode === state.currentBrandCode)
    .map(ensureStoreInvoiceSetting);
}

const rules = [
  {
    brandCode: "700001",
    category: "服饰",
    alias: "服装",
    taxCode: "1040201000000000000",
    taxName: "服装",
    rate: "13%",
    policy: "无",
    specifiedTaxNo: "91310115MA1K3DEMOA",
    updated: "2026-07-06 15:02",
  },
  {
    brandCode: "700001",
    category: "箱包",
    alias: "箱包配饰",
    taxCode: "1040207000000000000",
    taxName: "箱包",
    rate: "13%",
    policy: "无",
    specifiedTaxNo: "",
    updated: "2026-07-06 15:02",
  },
  {
    brandCode: "700001",
    category: "维修服务",
    alias: "售后维修",
    taxCode: "3049900000000000000",
    taxName: "其他现代服务",
    rate: "6%",
    policy: "无",
    specifiedTaxNo: "91320100MA1RDEMO01",
    updated: "2026-07-05 19:40",
  },
];

const payments = [
  {
    code: "GIFT_CARD",
    desc: "礼品卡",
    status: "启用",
    updated: "2026-07-06 13:18",
  },
  {
    code: "PREPAID_CARD",
    desc: "储值卡",
    status: "启用",
    updated: "2026-07-06 13:18",
  },
];

const defaultTaxCodes = [
  {
    brandCode: "700001",
    taxNo: "91320100MA1RDEMO01",
    taxpayerName: "南京示例零售有限公司",
    alias: "零售商品",
    taxCode: "1040201000000000000",
    taxName: "服装",
    rate: "3%",
    policy: "无",
    updated: "2026-07-06 15:08",
  },
];

const brandFallbackByBrand = {
  "700001": {
    enabled: false,
    config: {
      alias: "零售商品",
      taxCode: "1040201000000000000",
      taxName: "服装",
      rate: "13%",
      policy: "无",
      updated: "2026-08-04 14:30",
    },
  },
};

function getBrandFallbackSetting(brandCode = state.currentBrandCode) {
  if (!brandFallbackByBrand[brandCode]) {
    brandFallbackByBrand[brandCode] = { enabled: false, config: null };
  }
  return brandFallbackByBrand[brandCode];
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function createBrandLogo(label, background, wide = false) {
  const width = wide ? 320 : 160;
  const height = 160;
  const fontSize = wide ? 34 : 54;
  const safeLabel = String(label).replace(/[<>&"']/g, "");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" rx="12" fill="${background}"/><text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="${fontSize}" font-weight="700">${safeLabel}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const detailDrawerViewIds = new Set(["brandStoreDetailView", "taxNoDetailView"]);

function syncDetailDrawerLayer() {
  const activeDrawer = document.querySelector(".detail-drawer-view.active");
  const backdrop = document.getElementById("detailDrawerBackdrop");
  document.body.classList.toggle("detail-drawer-open", Boolean(activeDrawer));
  if (backdrop) {
    backdrop.classList.toggle("active", Boolean(activeDrawer));
    backdrop.setAttribute("aria-hidden", String(!activeDrawer));
  }
  document.querySelectorAll(".detail-drawer-view").forEach((drawer) => {
    drawer.setAttribute("aria-hidden", String(drawer !== activeDrawer));
  });
}

function setView(view) {
  const target = document.getElementById(view);
  if (!target) return;
  if (detailDrawerViewIds.has(view)) {
    document.querySelectorAll(".detail-drawer-view").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".page-view:not(.detail-drawer-view)").forEach((item) => item.classList.remove("active"));
    document.getElementById(target.dataset.drawerBase || "productsView")?.classList.add("active");
    target.classList.add("active");
    target.scrollTop = 0;
    requestAnimationFrame(() => target.focus({ preventScroll: true }));
  } else {
    document.querySelectorAll(".page-view").forEach((item) => item.classList.remove("active"));
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  syncDetailDrawerLayer();
}

function setActiveSidebar(menuId) {
  document.querySelectorAll(".sidebar .side-child").forEach((item) => item.classList.toggle("active", item.id === menuId));
}

function closeActiveDetailDrawer() {
  const activeDrawer = document.querySelector(".detail-drawer-view.active");
  if (!activeDrawer) return;
  setView(activeDrawer.dataset.drawerBase || "productsView");
}

function syncTabSemantics() {
  document.querySelectorAll(".workspace-tabs").forEach((tablist) => {
    tablist.querySelectorAll("button[data-tab]").forEach((button) => {
      const panel = document.getElementById(button.dataset.tab);
      const isActive = button.classList.contains("active");
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", String(isActive));
      button.setAttribute("aria-controls", button.dataset.tab);
      if (panel) {
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-hidden", String(!isActive));
      }
    });
  });
}

function activateTab(button) {
  const group = button.closest(".workspace-tabs").dataset.tabGroup;
  document.querySelectorAll(`.workspace-tabs[data-tab-group="${group}"] button`).forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(`.tab-panel[data-tab-group="${group}"]`).forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  document.getElementById(button.dataset.tab).classList.add("active");
  syncTabSemantics();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("active");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("active"), 2200);
}

function renderCustomers() {
  const nameKeyword = state.customerNameKeyword.trim().toLowerCase();
  const numberKeyword = state.customerNumberKeyword.trim().toLowerCase();
  const salesKeyword = state.customerSalesKeyword.trim().toLowerCase();
  const rows = customers.filter((item) => {
    const matchesName = !nameKeyword || item.name.toLowerCase().includes(nameKeyword);
    const matchesNumber = !numberKeyword || item.id.toLowerCase().includes(numberKeyword);
    const matchesSales = !salesKeyword || item.sales.toLowerCase().includes(salesKeyword);
    return matchesName && matchesNumber && matchesSales;
  });
  document.getElementById("customerListRows").innerHTML = rows.length
    ? rows
      .map(
        (item) => `
          <tr>
            <td>${escapeHtml(item.name)}</td>
            <td>${escapeHtml(item.shortName || "-")}</td>
            <td>${escapeHtml(item.id)}</td>
            <td>${escapeHtml(item.sales)}</td>
            <td>${escapeHtml(item.createdAt)}</td>
            <td><button class="link-btn" type="button" data-customer-detail="${escapeHtml(item.id)}">详情</button></td>
          </tr>
        `,
      )
      .join("")
    : '<tr><td colspan="6"><div class="table-empty">暂无符合条件的客户</div></td></tr>';
  document.getElementById("customerListTotal").textContent = `共${rows.length}条`;
}

function getBrandCustomer(brand) {
  return customers.find((item) => item.name === brand.groupName) || null;
}

function filteredManagedBrands() {
  const nameKeyword = state.managedBrandNameKeyword.trim().toLowerCase();
  const codeKeyword = state.managedBrandCodeKeyword.trim().toLowerCase();
  const customerKeyword = state.managedBrandCustomerKeyword.trim().toLowerCase();
  return brands.filter((brand) => {
    const customer = getBrandCustomer(brand);
    if (!customer) return false;
    if (nameKeyword && !brand.name.toLowerCase().includes(nameKeyword)) return false;
    if (codeKeyword && !brand.code.toLowerCase().includes(codeKeyword)) return false;
    if (customerKeyword && ![customer.name, customer.id, customer.shortName].some((value) => String(value || "").toLowerCase().includes(customerKeyword))) return false;
    return true;
  });
}

function renderManagedBrands() {
  const rows = filteredManagedBrands();
  document.getElementById("managedBrandRows").innerHTML = rows.length ? rows.map((brand) => {
    const customer = getBrandCustomer(brand);
    return `
      <tr>
        <td><strong>${escapeHtml(brand.name)}</strong></td>
        <td>${escapeHtml(brand.code)}</td>
        <td>${escapeHtml(customer.name)}</td>
        <td>${escapeHtml(customer.id)}</td>
        <td>${escapeHtml(operatingCountryNames[brand.operatingCountry] || "-")}</td>
        <td>${escapeHtml(brand.createdAt || "-")}</td>
        <td><button class="link-btn" type="button" data-managed-brand-detail="${escapeHtml(brand.code)}">详情</button></td>
      </tr>`;
  }).join("") : '<tr><td colspan="7"><div class="table-empty">暂无符合条件的品牌</div></td></tr>';
  document.getElementById("managedBrandTotal").textContent = `共${rows.length}条`;
}

function openBrandManagement() {
  setActiveSidebar("brandManagementMenuBtn");
  renderManagedBrands();
  setView("brandManagementView");
}

function renderCustomerEinvoiceFeature(customer = getCurrentCustomer()) {
  if (!customer) return;
  const enabled = Boolean(customer.einvoiceEnabled);
  const status = document.getElementById("customerEinvoiceStatus");
  const button = document.getElementById("enterEinvoiceBtn");
  status.textContent = enabled ? "已开通" : "未开通";
  status.classList.toggle("enabled", enabled);
  status.classList.toggle("disabled", !enabled);
  button.textContent = enabled ? "设置" : "开通";
  button.disabled = false;
}

function openCustomerEinvoiceFeature() {
  const customer = getCurrentCustomer();
  if (!customer) return;
  if (customer.einvoiceEnabled) {
    setView("einvoiceView");
    return;
  }
  openModal("enableCustomerEinvoiceConfirmModal");
}

function confirmEnableCustomerEinvoice() {
  const customer = getCurrentCustomer();
  if (!customer) return;
  customer.einvoiceEnabled = true;
  renderCustomerEinvoiceFeature(customer);
  closeModal("enableCustomerEinvoiceConfirmModal");
  showToast("电子发票功能已开通");
}

function openCustomerDetail(customerId) {
  const customer = customers.find((item) => item.id === customerId);
  if (!customer) return;
  state.currentCustomerId = customer.id;
  setActiveSidebar("myCustomersMenuBtn");
  document.getElementById("customerSummaryName").textContent = customer.name;
  document.getElementById("customerSummaryNumber").textContent = `客户编号：${customer.id}`;
  document.getElementById("customerBasicName").textContent = customer.name;
  document.getElementById("customerBasicShortName").textContent = customer.shortName || "-";
  document.getElementById("customerBasicNumber").textContent = customer.id;
  document.getElementById("customerBasicProjectCode").textContent = customer.projectCode || "-";
  document.getElementById("customerContactName").textContent = customer.contactName || "-";
  document.getElementById("customerContactPhone").textContent = customer.contactPhone || "-";
  document.getElementById("customerContactEmail").textContent = customer.contactEmail || "-";
  document.getElementById("customerBasicSales").textContent = customer.sales;
  document.getElementById("customerBasicSalesOrg").textContent = customer.salesOrg;
  document.getElementById("customerExecutive").textContent = customer.customerExecutive || "-";
  document.getElementById("customerBasicCreatedAt").textContent = customer.createdAt;
  renderCustomerEinvoiceFeature(customer);
  renderGroupSuperAdmins();
  activateCustomerTab("customerBasicInfoPanel");
  setView("productsView");
}

function renderSuperAdminSetting(admin, level) {
  const scopeName = level === "group" ? "集团" : "品牌";
  return admin
    ? `
      <div class="super-admin-setting-view">
        <dl class="super-admin-info">
          <div><dt>用户名称</dt><dd>${escapeHtml(admin.userName)}</dd></div>
          <div><dt>登录账号</dt><dd>${escapeHtml(admin.loginAccount)}</dd></div>
        </dl>
        <button class="link-btn danger" type="button" data-super-admin-delete="${level}">删除</button>
      </div>
    `
    : `<div class="super-admin-empty">暂未设置${scopeName}超级管理员</div>`;
}

function syncSuperAdminSetting(target, level, settingId, actionButtonId) {
  const admin = target?.superAdmin || null;
  const actionButton = document.getElementById(actionButtonId);
  document.getElementById(settingId).innerHTML = renderSuperAdminSetting(admin, level);
  actionButton.textContent = admin ? "更换超级管理员" : "添加超级管理员";
  actionButton.className = admin ? "default-btn small" : "primary-btn small";
}

function renderGroupSuperAdmins() {
  syncSuperAdminSetting(getCurrentCustomer(), "group", "groupSuperAdminSetting", "addGroupSuperAdminBtn");
}

function renderBrandSuperAdmins() {
  syncSuperAdminSetting(getCurrentBrandDetail(), "brand", "brandSuperAdminSetting", "addBrandSuperAdminBtn");
}

function getSuperAdminTarget(level) {
  return level === "group" ? getCurrentCustomer() : getCurrentBrandDetail();
}

function setSuperAdminFieldError(field, message = "") {
  const error = document.getElementById(field === "userName" ? "superAdminUserNameError" : "superAdminLoginAccountError");
  error.textContent = message;
  error.classList.toggle("hidden", !message);
}

function openSuperAdminModal(level) {
  const target = getSuperAdminTarget(level);
  if (!target) return;
  const existingAdmin = target.superAdmin || null;
  const actionName = existingAdmin ? "更换" : "添加";
  const scopeName = level === "group" ? "集团" : "品牌";
  state.superAdminContext = { level, replacing: Boolean(existingAdmin) };
  document.getElementById("superAdminModalTitle").textContent = `${actionName}${scopeName}超级管理员`;
  document.getElementById("superAdminForm").reset();
  document.getElementById("superAdminUserName").value = existingAdmin?.userName || "";
  document.getElementById("superAdminLoginAccount").value = existingAdmin?.loginAccount || "";
  document.getElementById("confirmAddSuperAdminBtn").textContent = existingAdmin ? "确认更换" : "确认添加";
  setSuperAdminFieldError("userName");
  setSuperAdminFieldError("loginAccount");
  openModal("superAdminModal");
  window.setTimeout(() => document.getElementById("superAdminUserName").focus(), 0);
}

function confirmAddSuperAdmin() {
  const level = state.superAdminContext?.level;
  const target = getSuperAdminTarget(level);
  if (!target) return;
  const userName = document.getElementById("superAdminUserName").value.trim();
  const loginAccount = document.getElementById("superAdminLoginAccount").value.trim();
  setSuperAdminFieldError("userName", userName ? "" : "请输入用户名称");
  setSuperAdminFieldError("loginAccount", loginAccount ? "" : "请输入登录账号");
  if (!userName || !loginAccount) return;
  const replaced = Boolean(target.superAdmin);
  target.superAdmin = {
    id: target.superAdmin?.id || `${level}-admin-${Date.now()}`,
    userName,
    loginAccount,
  };
  closeModal("superAdminModal");
  if (level === "group") renderGroupSuperAdmins();
  else renderBrandSuperAdmins();
  showToast(replaced ? "超级管理员已更换" : "超级管理员已添加");
}

function openDeleteSuperAdminConfirm(level) {
  const target = getSuperAdminTarget(level);
  const admin = target?.superAdmin;
  if (!admin) return;
  state.pendingSuperAdminDelete = { level };
  document.getElementById("deleteSuperAdminConfirmText").textContent = `确认删除超级管理员“${admin.userName}”（${admin.loginAccount}）吗？`;
  openModal("deleteSuperAdminConfirmModal");
}

function confirmDeleteSuperAdmin() {
  const pending = state.pendingSuperAdminDelete;
  const target = getSuperAdminTarget(pending?.level);
  if (!pending || !target) return;
  target.superAdmin = null;
  closeModal("deleteSuperAdminConfirmModal");
  if (pending.level === "group") renderGroupSuperAdmins();
  else renderBrandSuperAdmins();
  state.pendingSuperAdminDelete = null;
  showToast("超级管理员已删除");
}

function backToCustomerList() {
  setActiveSidebar("myCustomersMenuBtn");
  setView("customerListView");
}

function statusTag(enabled) {
  return enabled ? '<span class="tag green">启用</span>' : '<span class="tag gray">禁用</span>';
}

function statusAction(kind, item) {
  const action = item.enabled ? "disable" : "enable";
  const text = item.enabled ? "禁用" : "开启";
  return `<button class="link-btn ${item.enabled ? "danger" : ""}" data-status-action="${action}" data-kind="${kind}" data-id="${item.id}">${text}</button>`;
}

function renderTaxNos() {
  const nameKeyword = state.taxpayerNameKeyword.trim().toLowerCase();
  const taxNoKeyword = state.taxpayerTaxNoKeyword.trim().toLowerCase();
  const filtered = taxNos.filter((item) => {
    const nameMatched = !nameKeyword || item.name.toLowerCase().includes(nameKeyword);
    const taxNoMatched = !taxNoKeyword || item.taxNo.toLowerCase().includes(taxNoKeyword);
    const typeMatched = !state.taxpayerTypeFilter || item.taxpayerType === state.taxpayerTypeFilter;
    const methodMatched = !state.taxpayerMethodFilter || item.taxMethod === state.taxpayerMethodFilter;
    return nameMatched && taxNoMatched && typeMatched && methodMatched;
  });

  document.getElementById("taxNoRows").innerHTML = filtered.length
    ? filtered
      .map(
        (item) => `
          <tr>
            <td>${escapeHtml(item.name)}</td>
            <td>${escapeHtml(item.taxNo)}</td>
            <td>${escapeHtml(item.taxpayerType)}</td>
            <td>${escapeHtml(item.taxMethod)}</td>
            <td>${escapeHtml(item.levyRate)}</td>
            <td>${statusTag(item.enabled)}</td>
            <td>
              <button class="link-btn" data-tax-detail="${item.id}">详情</button>
              ${statusAction("taxNo", item)}
            </td>
          </tr>
        `,
      )
      .join("")
    : '<tr><td colspan="7"><div class="table-empty">暂无符合条件的纳税人</div></td></tr>';
}

function searchTaxpayers() {
  state.taxpayerNameKeyword = document.getElementById("taxpayerNameKeyword").value;
  state.taxpayerTaxNoKeyword = document.getElementById("taxpayerTaxNoKeyword").value;
  state.taxpayerTypeFilter = document.getElementById("taxpayerTypeFilter").value;
  state.taxpayerMethodFilter = document.getElementById("taxpayerMethodFilter").value;
  renderTaxNos();
}

function resetTaxpayerQuery() {
  document.getElementById("taxpayerNameKeyword").value = "";
  document.getElementById("taxpayerTaxNoKeyword").value = "";
  document.getElementById("taxpayerTypeFilter").value = "";
  document.getElementById("taxpayerMethodFilter").value = "";
  state.taxpayerNameKeyword = "";
  state.taxpayerTaxNoKeyword = "";
  state.taxpayerTypeFilter = "";
  state.taxpayerMethodFilter = "";
  renderTaxNos();
}

function renderBrandLogo(url, alt, variant = "") {
  if (!url) return `<div class="brand-logo-placeholder ${variant}"><span>暂无 Logo</span></div>`;
  return `<img src="${url}" alt="${escapeHtml(alt)}" />`;
}

function setBrandBasicEditError(message = "") {
  const error = document.getElementById("editBrandBasicError");
  error.textContent = message;
  error.classList.toggle("hidden", !message);
}

function openBrandBasicEditor() {
  const brand = getCurrentBrandDetail();
  if (!brand) return;
  document.getElementById("editBrandName").value = brand.name;
  document.getElementById("editBrandOperatingCountry").value = brand.operatingCountry || "CN";
  document.getElementById("editBrandIndustry").value = brand.industry || "";
  document.getElementById("editBrandDescription").value = brand.desc === "-" ? "" : brand.desc || "";
  setBrandBasicEditError();
  openModal("editBrandBasicDrawer");
  window.setTimeout(() => document.getElementById("editBrandName").focus(), 0);
}

function saveBrandBasicInfo() {
  const brand = getCurrentBrandDetail();
  if (!brand) return;
  const name = document.getElementById("editBrandName").value.trim();
  const operatingCountry = document.getElementById("editBrandOperatingCountry").value;
  const industry = document.getElementById("editBrandIndustry").value;
  const desc = document.getElementById("editBrandDescription").value.trim();
  if (!name || !operatingCountry || !industry) {
    setBrandBasicEditError("请完整填写品牌名称、经营国家/地区和所属行业");
    return;
  }
  if (brands.some((item) => item.code !== brand.code && item.name.toLowerCase() === name.toLowerCase())) {
    setBrandBasicEditError("当前客户下已存在同名品牌");
    return;
  }
  brand.name = name;
  brand.operatingCountry = operatingCountry;
  brand.industry = industry;
  brand.desc = desc || "-";
  closeModal("editBrandBasicDrawer");
  openCustomerBrandDetail(brand.code, state.brandDetailSource);
  renderCustomerBrands();
  renderManagedBrands();
  showToast("品牌基础信息已保存");
}

function setBrandLogoSetError(message = "") {
  const error = document.getElementById("brandLogoSetError");
  error.textContent = message;
  error.classList.toggle("hidden", !message);
}

function syncBrandLogoSetPreview(kind) {
  const isStandard = kind === "standard";
  const preview = document.getElementById(isStandard ? "brandLogoSetStandardPreview" : "brandLogoSetHorizontalPreview");
  const url = state.brandLogoSetDraft[kind];
  preview.innerHTML = url
    ? `<img src="${url}" alt="${isStandard ? "品牌标准 Logo" : "品牌横版 Logo"} 预览" />`
    : `＋<small>上传图片</small>`;
}

function renderBrandLogoSets() {
  const brand = getCurrentBrandDetail();
  if (!brand) return;
  const logoSets = ensureBrandLogoSets(brand);
  const addButton = document.getElementById("addBrandLogoSetBtn");
  const countLabel = document.getElementById("brandLogoSetCount");
  const reachedLimit = logoSets.length >= BRAND_LOGO_SET_LIMIT;
  countLabel.textContent = `已设置 ${logoSets.length} / ${BRAND_LOGO_SET_LIMIT} 组`;
  addButton.disabled = reachedLimit;
  addButton.title = reachedLimit ? `最多可设置 ${BRAND_LOGO_SET_LIMIT} 组 Logo 方案（含默认版本）` : "";
  addButton.setAttribute("aria-disabled", String(reachedLimit));
  document.getElementById("brandLogoSetList").innerHTML = logoSets.map((item) => `
    <article class="brand-logo-set-card">
      <div class="brand-logo-set-head">
        <div><h3>${escapeHtml(item.name)}</h3>${item.isDefault ? '<span class="status-tag enabled">默认方案</span>' : ""}</div>
        <div class="brand-logo-set-actions">
          <button class="link-btn" type="button" data-edit-brand-logo-set="${escapeHtml(item.id)}">编辑</button>
          ${item.isDefault ? "" : `<button class="link-btn danger" type="button" data-delete-brand-logo-set="${escapeHtml(item.id)}">删除</button>`}
        </div>
      </div>
      <div class="brand-logo-set-previews">
        <div><span>标准 Logo</span><div class="brand-logo-stage square">${renderBrandLogo(item.standardUrl, `${brand.name} ${item.name} 标准 Logo`)}</div></div>
        <div><span>横版 Logo</span><div class="brand-logo-stage horizontal">${renderBrandLogo(item.horizontalUrl, `${brand.name} ${item.name} 横版 Logo`, "horizontal")}</div></div>
      </div>
      <div class="brand-logo-set-meta">创建时间：${escapeHtml(item.createdAt || "-")}</div>
    </article>`).join("");
}

function openBrandLogoSetEditor(logoSetId = null) {
  const brand = getCurrentBrandDetail();
  if (!brand) return;
  const logoSets = ensureBrandLogoSets(brand);
  if (!logoSetId && logoSets.length >= BRAND_LOGO_SET_LIMIT) {
    showToast(`每个品牌最多可设置 ${BRAND_LOGO_SET_LIMIT} 组 Logo 方案（含默认版本）`);
    return;
  }
  const logoSet = logoSetId ? logoSets.find((item) => item.id === logoSetId) : null;
  state.editingBrandLogoSetId = logoSet?.id || null;
  state.brandLogoSetDraft = {
    standard: logoSet?.standardUrl || "",
    horizontal: logoSet?.horizontalUrl || "",
  };
  document.getElementById("brandLogoSetDrawerTitle").textContent = logoSet ? "编辑 Logo 方案" : "添加 Logo 方案";
  document.getElementById("brandLogoSetName").value = logoSet?.name || "";
  document.getElementById("brandLogoSetStandardFile").value = "";
  document.getElementById("brandLogoSetHorizontalFile").value = "";
  syncBrandLogoSetPreview("standard");
  syncBrandLogoSetPreview("horizontal");
  setBrandLogoSetError();
  openModal("brandLogoSetDrawer");
  window.setTimeout(() => document.getElementById("brandLogoSetName").focus(), 0);
}

function handleBrandLogoSetFile(kind, file) {
  if (!file) return;
  if (!["image/png", "image/jpeg"].includes(file.type)) {
    setBrandLogoSetError("Logo 仅支持 png、jpg 格式");
    return;
  }
  if (file.size > 4 * 1024 * 1024) {
    setBrandLogoSetError("Logo 文件不能大于 4M");
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.brandLogoSetDraft[kind] = String(reader.result || "");
    syncBrandLogoSetPreview(kind);
    setBrandLogoSetError();
  });
  reader.readAsDataURL(file);
}

function saveBrandLogoSet() {
  const brand = getCurrentBrandDetail();
  if (!brand) return;
  const logoSets = ensureBrandLogoSets(brand);
  const name = document.getElementById("brandLogoSetName").value.trim();
  if (!name || !state.brandLogoSetDraft.standard || !state.brandLogoSetDraft.horizontal) {
    setBrandLogoSetError("请填写方案名称并上传标准 Logo 和横版 Logo");
    return;
  }
  if (logoSets.some((item) => item.id !== state.editingBrandLogoSetId && item.name.toLowerCase() === name.toLowerCase())) {
    setBrandLogoSetError("当前品牌下已存在同名 Logo 方案");
    return;
  }
  const editingSet = logoSets.find((item) => item.id === state.editingBrandLogoSetId);
  if (editingSet) {
    editingSet.name = name;
    editingSet.standardUrl = state.brandLogoSetDraft.standard;
    editingSet.horizontalUrl = state.brandLogoSetDraft.horizontal;
    if (editingSet.isDefault) {
      brand.logoUrl = editingSet.standardUrl;
      brand.logoHorizontalUrl = editingSet.horizontalUrl;
    }
  } else {
    if (logoSets.length >= BRAND_LOGO_SET_LIMIT) {
      setBrandLogoSetError(`每个品牌最多可设置 ${BRAND_LOGO_SET_LIMIT} 组 Logo 方案（含默认版本）`);
      return;
    }
    logoSets.push({
      id: `${brand.code}-${Date.now()}`,
      name,
      standardUrl: state.brandLogoSetDraft.standard,
      horizontalUrl: state.brandLogoSetDraft.horizontal,
      isDefault: false,
      createdAt: formatCreatedAt(),
    });
  }
  closeModal("brandLogoSetDrawer");
  renderBrandLogoSets();
  renderCustomerBrands();
  renderManagedBrands();
  showToast(editingSet ? "Logo 方案已保存" : "Logo 方案已添加");
}

function deleteBrandLogoSet(logoSetId) {
  const brand = getCurrentBrandDetail();
  if (!brand) return;
  const logoSets = ensureBrandLogoSets(brand);
  const logoSet = logoSets.find((item) => item.id === logoSetId);
  if (!logoSet) return;
  if (logoSet.isDefault) {
    showToast("默认方案不可删除");
    return;
  }
  if (!window.confirm(`确认删除 Logo 方案“${logoSet.name}”？`)) return;
  brand.logoSets = logoSets.filter((item) => item.id !== logoSetId);
  renderBrandLogoSets();
  showToast("Logo 方案已删除");
}

function filteredCustomerBrands() {
  const nameKeyword = state.customerBrandNameKeyword.trim().toLowerCase();
  const codeKeyword = state.customerBrandCodeKeyword.trim().toLowerCase();
  return brands.filter((brand) => {
    if (nameKeyword && !brand.name.toLowerCase().includes(nameKeyword)) return false;
    if (codeKeyword && !brand.code.toLowerCase().includes(codeKeyword)) return false;
    return true;
  });
}

function renderCustomerBrands() {
  const filteredBrands = filteredCustomerBrands();
  const total = filteredBrands.length;
  const totalPages = Math.max(1, Math.ceil(total / state.customerBrandPageSize));
  state.customerBrandPage = Math.min(state.customerBrandPage, totalPages);
  const start = (state.customerBrandPage - 1) * state.customerBrandPageSize;
  const pageItems = filteredBrands.slice(start, start + state.customerBrandPageSize);
  const isList = state.customerBrandViewMode === "list";

  document.getElementById("brandListViewBtn").classList.toggle("active", isList);
  document.getElementById("brandCardViewBtn").classList.toggle("active", !isList);
  document.getElementById("brandListViewBtn").setAttribute("aria-pressed", String(isList));
  document.getElementById("brandCardViewBtn").setAttribute("aria-pressed", String(!isList));
  document.getElementById("customerBrandListView").classList.toggle("hidden", !isList || total === 0);
  document.getElementById("customerBrandCardView").classList.toggle("hidden", isList || total === 0);
  document.getElementById("customerBrandEmpty").classList.toggle("hidden", total !== 0);
  document.querySelector(".customer-brand-pagination").classList.toggle("hidden", total === 0);

  document.getElementById("customerBrandRows").innerHTML = pageItems.map((item) => `
    <tr>
      <td><strong>${escapeHtml(item.name)}</strong></td>
      <td>${escapeHtml(item.code)}</td>
      <td>${escapeHtml(operatingCountryNames[item.operatingCountry] || "-")}</td>
      <td>${escapeHtml(item.desc)}</td>
      <td>${escapeHtml(item.createdAt)}</td>
      <td><button class="link-btn" data-customer-brand-detail="${item.code}">详情</button></td>
    </tr>`).join("");

  document.getElementById("customerBrandCardView").innerHTML = pageItems.map((item) => `
    <article class="customer-brand-card">
      <div class="customer-brand-card-main">
        <div class="customer-brand-card-copy">
          <h3>${escapeHtml(item.name)}</h3>
          <div class="customer-brand-card-meta">
            <span>品牌编号：${escapeHtml(item.code)}</span>
            <span>经营国家/地区：${escapeHtml(operatingCountryNames[item.operatingCountry] || "-")}</span>
          </div>
          <p>${escapeHtml(item.desc)}</p>
        </div>
      </div>
      <div class="customer-brand-card-foot"><span>创建时间：${escapeHtml(item.createdAt)}</span><button class="link-btn" data-customer-brand-detail="${item.code}">详情</button></div>
    </article>`).join("");

  document.getElementById("customerBrandTotal").textContent = `共${total}条`;
  document.getElementById("customerBrandPageBtn").textContent = state.customerBrandPage;
  document.getElementById("customerBrandPrevBtn").disabled = state.customerBrandPage <= 1;
  document.getElementById("customerBrandNextBtn").disabled = state.customerBrandPage >= totalPages;
  document.getElementById("customerBrandPageSize").value = String(state.customerBrandPageSize);
}

function setCreateBrandError(message = "") {
  const error = document.getElementById("createBrandError");
  error.textContent = message;
  error.classList.toggle("hidden", !message);
}

function syncNewBrandLogoPreview(kind) {
  const isStandard = kind === "standard";
  const preview = document.getElementById(isStandard ? "newBrandStandardLogoPreview" : "newBrandHorizontalLogoPreview");
  const url = state.newBrandLogos[kind];
  preview.innerHTML = url
    ? `<img src="${url}" alt="${isStandard ? "品牌标准 Logo" : "品牌横版 Logo"} 预览" />`
    : `＋<small>上传图片</small>`;
}

function resetCreateBrandForm() {
  document.getElementById("createBrandForm").reset();
  document.getElementById("newBrandOperatingCountry").value = "CN";
  state.newBrandLogos = { standard: "", horizontal: "" };
  syncNewBrandLogoPreview("standard");
  syncNewBrandLogoPreview("horizontal");
  setCreateBrandError();
}

function openCreateBrandDrawer() {
  resetCreateBrandForm();
  openModal("createBrandDrawer");
  window.setTimeout(() => document.getElementById("newBrandName").focus(), 0);
}

function handleNewBrandLogoFile(kind, file) {
  if (!file) return;
  if (!['image/png', 'image/jpeg'].includes(file.type)) {
    setCreateBrandError("Logo 仅支持 png、jpg 格式");
    return;
  }
  if (file.size > 4 * 1024 * 1024) {
    setCreateBrandError("Logo 文件不能大于 4M");
    return;
  }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    state.newBrandLogos[kind] = String(reader.result || "");
    syncNewBrandLogoPreview(kind);
    setCreateBrandError();
  });
  reader.readAsDataURL(file);
}

function getNextBrandCode() {
  const maxCode = brands.reduce((max, item) => Math.max(max, Number(item.code) || 0), 700000);
  return String(maxCode + 1).padStart(6, "0");
}

function formatCreatedAt(date = new Date()) {
  const parts = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()]
    .map((value) => String(value).padStart(2, "0"));
  return `${parts[0]}-${parts[1]}-${parts[2]} ${parts[3]}:${parts[4]}`;
}

function confirmCreateBrand() {
  const name = document.getElementById("newBrandName").value.trim();
  const operatingCountry = document.getElementById("newBrandOperatingCountry").value;
  const industry = document.getElementById("newBrandIndustry").value;
  const desc = document.getElementById("newBrandDescription").value.trim();
  if (!name || !operatingCountry || !industry || !state.newBrandLogos.standard || !state.newBrandLogos.horizontal) {
    setCreateBrandError("请完整填写品牌名称、经营国家/地区、所属行业，并上传两种 Logo");
    return;
  }
  if (brands.some((item) => item.name.toLowerCase() === name.toLowerCase())) {
    setCreateBrandError("当前客户下已存在同名品牌");
    return;
  }
  const code = getNextBrandCode();
  const createdAt = formatCreatedAt();
  const customer = getCurrentCustomer();
  brands.unshift({
    name,
    code,
    desc: desc || "-",
    industry,
    operatingCountry: operatingCountry || "CN",
    groupName: customer?.name || "-",
    superAdmin: null,
    createdAt,
    logoUrl: state.newBrandLogos.standard,
    logoHorizontalUrl: state.newBrandLogos.horizontal,
    logoSets: [{
      id: `${code}-default`,
      name: "默认版本",
      standardUrl: state.newBrandLogos.standard,
      horizontalUrl: state.newBrandLogos.horizontal,
      isDefault: true,
      createdAt,
    }],
  });
  document.getElementById("customerBrandNameKeyword").value = "";
  document.getElementById("customerBrandCodeKeyword").value = "";
  state.customerBrandNameKeyword = "";
  state.customerBrandCodeKeyword = "";
  state.customerBrandPage = 1;
  renderCustomerBrands();
  closeModal("createBrandDrawer");
  showToast("品牌创建成功");
}

function activateCustomerTab(panelId) {
  document.querySelectorAll("[data-customer-tab]").forEach((item) => item.classList.toggle("active", item.dataset.customerTab === panelId));
  document.querySelectorAll(".customer-tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === panelId));
  if (panelId === "companyListPanel" && typeof renderCompanies === "function") renderCompanies();
  if (panelId === "customerAgreementManagementPanel") {
    activateAgreementManagementTab(state.agreementManagementTab || "agreementResourceListPanel");
    renderAgreementResources();
    renderConfirmationSchemes();
  }
}

function agreementResourceTypeLabel(type) {
  return type === "agreement" ? "协议条款" : "服务说明";
}

function agreementResourceStatusLabel(status) {
  return status === "published" ? "已发布" : "草稿";
}

function confirmationSchemeStatusLabel(status) {
  return status === "enabled" ? "已启用" : "已停用";
}

function getCustomerAgreementResources(customerId = state.currentCustomerId) {
  return agreementResources.filter((item) => item.customerId === customerId);
}

function getCustomerConfirmationSchemes(customerId = state.currentCustomerId) {
  return confirmationSchemes.filter((item) => item.customerId === customerId);
}

function getAgreementResource(resourceId) {
  return agreementResources.find((item) => item.id === resourceId) || null;
}

function getConfirmationScheme(schemeId) {
  return confirmationSchemes.find((item) => item.id === schemeId) || null;
}

function getCurrentBrandCustomerId() {
  const brand = brands.find((item) => item.code === state.currentBrandCode);
  return getBrandCustomer(brand)?.id || state.currentCustomerId;
}

function truncateUsage(values) {
  const unique = [...new Set(values.filter(Boolean))];
  if (!unique.length) return "尚未使用";
  return unique.length === 1 ? unique[0] : `${unique[0]} 等 ${unique.length} 处`;
}

function getAgreementResourceUsage(resource) {
  if (resource.type === "service") {
    return truncateUsage(brands
      .filter((brand) => state.brandInvoiceDescriptionResourceByBrand[brand.code] === resource.id)
      .map((brand) => `${brand.name} / 开票申请页`));
  }
  return truncateUsage(confirmationSchemes
    .filter((scheme) => scheme.items.some((item) => item.resourceIds.includes(resource.id)))
    .map((scheme) => scheme.name));
}

function getConfirmationSchemeUsage(scheme) {
  return truncateUsage(brands
    .filter((brand) => state.brandConfirmationSchemeByBrand[brand.code] === scheme.id)
    .map((brand) => `${brand.name} / 开票申请页`));
}

function activateAgreementManagementTab(panelId) {
  state.agreementManagementTab = panelId;
  document.querySelectorAll("[data-agreement-management-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.agreementManagementTab === panelId);
  });
  document.querySelectorAll(".agreement-management-subpanel").forEach((panel) => panel.classList.toggle("active", panel.id === panelId));
}

function renderAgreementResources() {
  const nameKeyword = state.agreementResourceNameKeyword.trim().toLowerCase();
  const type = state.agreementResourceTypeFilter;
  const rows = getCustomerAgreementResources().filter((item) => {
    if (nameKeyword && !item.name.toLowerCase().includes(nameKeyword)) return false;
    return !type || item.type === type;
  });
  document.getElementById("agreementResourceRows").innerHTML = rows.length ? rows.map((item) => `
    <tr>
      <td><strong>${escapeHtml(item.name)}</strong></td>
      <td><span class="agreement-resource-type ${item.type}">${agreementResourceTypeLabel(item.type)}</span></td>
      <td>${escapeHtml(item.version)}</td>
      <td><span class="status-tag ${item.status === "published" ? "enabled" : "status-unopened"}">${agreementResourceStatusLabel(item.status)}</span></td>
      <td class="agreement-usage-cell">${escapeHtml(getAgreementResourceUsage(item))}</td>
      <td>${escapeHtml(item.updatedAt)}</td>
      <td><div class="row-actions"><button class="link-btn" type="button" data-preview-agreement-resource="${escapeHtml(item.id)}">预览</button><button class="link-btn" type="button" data-edit-agreement-resource="${escapeHtml(item.id)}">编辑</button></div></td>
    </tr>`).join("") : '<tr><td colspan="7"><div class="table-empty">暂无符合条件的内容资源</div></td></tr>';
}

function countSchemeAgreementResources(scheme) {
  return new Set(scheme.items.flatMap((item) => item.resourceIds)).size;
}

function renderConfirmationSchemes() {
  const nameKeyword = state.confirmationSchemeNameKeyword.trim().toLowerCase();
  const status = state.confirmationSchemeStatusFilter;
  const rows = getCustomerConfirmationSchemes().filter((item) => {
    if (nameKeyword && !item.name.toLowerCase().includes(nameKeyword)) return false;
    return !status || item.status === status;
  });
  document.getElementById("confirmationSchemeRows").innerHTML = rows.length ? rows.map((item) => `
    <tr>
      <td><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.description || "-")}</small></td>
      <td>${item.items.length} 个</td>
      <td>${countSchemeAgreementResources(item)} 份</td>
      <td class="agreement-usage-cell">${escapeHtml(getConfirmationSchemeUsage(item))}</td>
      <td><span class="status-tag ${item.status === "enabled" ? "enabled" : "status-unopened"}">${confirmationSchemeStatusLabel(item.status)}</span></td>
      <td>${escapeHtml(item.updatedAt)}</td>
      <td><button class="link-btn" type="button" data-edit-confirmation-scheme="${escapeHtml(item.id)}">编辑</button></td>
    </tr>`).join("") : '<tr><td colspan="7"><div class="table-empty">暂无符合条件的确认方案</div></td></tr>';
}

function sanitizeRichHtml(html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  template.content.querySelectorAll("script,style,iframe,object,embed").forEach((node) => node.remove());
  template.content.querySelectorAll("*").forEach((node) => {
    [...node.attributes].forEach((attribute) => {
      if (node.tagName === "A" && attribute.name === "href" && /^https?:\/\//i.test(attribute.value)) return;
      node.removeAttribute(attribute.name);
    });
    if (node.tagName === "A") node.setAttribute("target", "_blank");
  });
  return template.innerHTML;
}

function syncAgreementResourcePreview() {
  const editor = document.getElementById("agreementResourceContentEditor");
  document.getElementById("agreementResourceContentPreview").innerHTML = sanitizeRichHtml(editor.innerHTML) || '<div class="agreement-preview-empty">在左侧编辑内容后，这里会实时展示效果</div>';
}

function openAgreementResourceEditor(resourceId = null) {
  const resource = resourceId ? getAgreementResource(resourceId) : null;
  if (resource && resource.customerId !== state.currentCustomerId) return;
  state.editingAgreementResourceId = resource?.id || null;
  state.agreementResourceDraft = resource ? { ...resource } : {
    id: null,
    customerId: state.currentCustomerId,
    name: "",
    type: "service",
    version: "V1.0",
    status: "published",
    content: "<h2>请输入标题</h2><p>请输入资源内容。</p>",
  };
  const title = resource ? "编辑内容资源" : "新建内容资源";
  document.getElementById("agreementResourceEditorBreadcrumb").textContent = title;
  document.getElementById("agreementResourceEditorTitle").textContent = title;
  document.getElementById("agreementResourceNameInput").value = state.agreementResourceDraft.name;
  document.getElementById("agreementResourceTypeInput").value = state.agreementResourceDraft.type;
  document.getElementById("agreementResourceVersionInput").value = state.agreementResourceDraft.version;
  document.getElementById("agreementResourceStatusInput").value = state.agreementResourceDraft.status;
  document.getElementById("agreementResourceContentEditor").innerHTML = state.agreementResourceDraft.content;
  document.getElementById("agreementResourceEditorError").textContent = "";
  syncAgreementResourcePreview();
  setActiveSidebar("myCustomersMenuBtn");
  setView("agreementResourceEditorView");
}

function backToAgreementManagement(panelId = "agreementResourceListPanel") {
  openCustomerDetail(state.currentCustomerId);
  state.agreementManagementTab = panelId;
  activateCustomerTab("customerAgreementManagementPanel");
  activateAgreementManagementTab(panelId);
}

function saveAgreementResource() {
  const name = document.getElementById("agreementResourceNameInput").value.trim();
  const version = document.getElementById("agreementResourceVersionInput").value.trim();
  const content = sanitizeRichHtml(document.getElementById("agreementResourceContentEditor").innerHTML.trim());
  const error = document.getElementById("agreementResourceEditorError");
  if (!name || !version || !content || !document.getElementById("agreementResourceContentEditor").textContent.trim()) {
    error.textContent = "请完整填写资源名称、版本号和资源内容";
    return;
  }
  const values = {
    customerId: state.currentCustomerId,
    name,
    type: document.getElementById("agreementResourceTypeInput").value,
    version,
    status: document.getElementById("agreementResourceStatusInput").value,
    content,
    updatedAt: "2026-08-11 16:30",
  };
  if (state.editingAgreementResourceId) {
    const target = getAgreementResource(state.editingAgreementResourceId);
    if (target) Object.assign(target, values);
  } else {
    agreementResources.unshift({ id: `resource-${Date.now()}`, ...values });
  }
  showToast(state.editingAgreementResourceId ? "内容资源已更新" : "内容资源已创建");
  backToAgreementManagement("agreementResourceListPanel");
}

function openAgreementResourcePreview(resourceId) {
  const resource = getAgreementResource(resourceId);
  if (!resource) return;
  document.getElementById("agreementResourcePreviewTitle").textContent = resource.name;
  document.getElementById("agreementResourcePreviewMeta").textContent = `${agreementResourceTypeLabel(resource.type)} · ${resource.version} · ${agreementResourceStatusLabel(resource.status)}`;
  document.getElementById("agreementResourcePreviewContent").innerHTML = sanitizeRichHtml(resource.content);
  openModal("agreementResourcePreviewModal");
}

function cloneConfirmationScheme(scheme) {
  return { ...scheme, items: scheme.items.map((item) => ({ ...item, resourceIds: [...item.resourceIds] })) };
}

function getPublishedAgreementResources(customerId = state.currentCustomerId) {
  return getCustomerAgreementResources(customerId).filter((item) => item.type === "agreement" && item.status === "published");
}

function renderConfirmationSchemePreview() {
  const preview = document.getElementById("confirmationSchemePreview");
  const draft = state.confirmationSchemeDraft;
  if (!draft?.items.length) {
    preview.innerHTML = '<div class="agreement-preview-empty">添加确认项后，这里会展示消费者看到的勾选内容</div>';
    return;
  }
  preview.innerHTML = draft.items.map((item, index) => {
    const resources = item.resourceIds.map(getAgreementResource).filter(Boolean);
    const links = resources.length ? resources.map((resource) => `《${escapeHtml(resource.name)}》`).join("和") : '<span class="confirmation-preview-missing">请选择协议条款</span>';
    return `<div class="confirmation-preview-line"><span class="confirmation-preview-checkbox"></span><span>${escapeHtml(item.text || "请输入勾选文案")}${links}</span><small>确认项 ${index + 1}</small></div>`;
  }).join("");
}

function renderConfirmationItemEditor() {
  const draft = state.confirmationSchemeDraft;
  const resources = getPublishedAgreementResources();
  const list = document.getElementById("confirmationItemEditorList");
  if (!draft?.items.length) {
    list.innerHTML = '<div class="confirmation-item-empty">暂未添加勾选确认项</div>';
    renderConfirmationSchemePreview();
    return;
  }
  list.innerHTML = draft.items.map((item, index) => `
    <section class="confirmation-item-editor-card">
      <div class="confirmation-item-editor-card-head"><strong>确认项 ${index + 1}</strong><button class="link-btn danger" type="button" data-remove-confirmation-item="${index}">删除</button></div>
      <label><span class="field-label">勾选文案 <em>*</em></span><input maxlength="40" data-confirmation-item-text="${index}" value="${escapeHtml(item.text)}" placeholder="例如：我已阅读并同意" /></label>
      <fieldset><legend>协议条款 <em>*</em><small>可多选</small></legend><div class="confirmation-resource-options">
        ${resources.map((resource) => `<label><input type="checkbox" data-confirmation-item-resource="${index}" value="${escapeHtml(resource.id)}" ${item.resourceIds.includes(resource.id) ? "checked" : ""} /><span><strong>${escapeHtml(resource.name)}</strong><small>${escapeHtml(resource.version)}</small></span></label>`).join("")}
      </div></fieldset>
    </section>`).join("");
  renderConfirmationSchemePreview();
}

function openConfirmationSchemeEditor(schemeId = null) {
  const scheme = schemeId ? getConfirmationScheme(schemeId) : null;
  if (scheme && scheme.customerId !== state.currentCustomerId) return;
  state.editingConfirmationSchemeId = scheme?.id || null;
  state.confirmationSchemeDraft = scheme ? cloneConfirmationScheme(scheme) : {
    id: null,
    customerId: state.currentCustomerId,
    name: "",
    description: "",
    status: "enabled",
    items: [{ id: `confirm-item-${Date.now()}`, text: "我已阅读并同意", resourceIds: [] }],
  };
  const title = scheme ? "编辑确认方案" : "新建确认方案";
  document.getElementById("confirmationSchemeEditorBreadcrumb").textContent = title;
  document.getElementById("confirmationSchemeEditorTitle").textContent = title;
  document.getElementById("confirmationSchemeNameInput").value = state.confirmationSchemeDraft.name;
  document.getElementById("confirmationSchemeStatusInput").value = state.confirmationSchemeDraft.status;
  document.getElementById("confirmationSchemeDescriptionInput").value = state.confirmationSchemeDraft.description || "";
  document.getElementById("confirmationSchemeEditorError").textContent = "";
  renderConfirmationItemEditor();
  setActiveSidebar("myCustomersMenuBtn");
  setView("confirmationSchemeEditorView");
}

function addConfirmationItem() {
  state.confirmationSchemeDraft.items.push({ id: `confirm-item-${Date.now()}`, text: "我已阅读并同意", resourceIds: [] });
  renderConfirmationItemEditor();
}

function saveConfirmationScheme() {
  const name = document.getElementById("confirmationSchemeNameInput").value.trim();
  const error = document.getElementById("confirmationSchemeEditorError");
  const items = state.confirmationSchemeDraft?.items || [];
  if (!name || !items.length) {
    error.textContent = "请填写方案名称并至少添加一个勾选确认项";
    return;
  }
  const invalidIndex = items.findIndex((item) => !item.text.trim() || !item.resourceIds.length);
  if (invalidIndex >= 0) {
    error.textContent = `请完善确认项 ${invalidIndex + 1} 的勾选文案，并至少选择一份协议条款`;
    return;
  }
  const values = {
    customerId: state.currentCustomerId,
    name,
    description: document.getElementById("confirmationSchemeDescriptionInput").value.trim(),
    status: document.getElementById("confirmationSchemeStatusInput").value,
    updatedAt: "2026-08-11 16:35",
    items: items.map((item) => ({ ...item, text: item.text.trim(), resourceIds: [...item.resourceIds] })),
  };
  if (state.editingConfirmationSchemeId) {
    const target = getConfirmationScheme(state.editingConfirmationSchemeId);
    if (target) Object.assign(target, values);
  } else {
    confirmationSchemes.unshift({ id: `scheme-${Date.now()}`, ...values });
  }
  showToast(state.editingConfirmationSchemeId ? "确认方案已更新" : "确认方案已创建");
  backToAgreementManagement("confirmationSchemeListPanel");
}

function renderSharedResourceEmpty(text) {
  return `<div class="brand-shared-resource-empty"><span class="brand-shared-resource-empty-icon">◇</span><span>${escapeHtml(text)}</span></div>`;
}

function getCurrentBrandInvoiceDescriptionResource() {
  const resource = getAgreementResource(state.brandInvoiceDescriptionResourceByBrand[state.currentBrandCode]);
  return resource?.customerId === getCurrentBrandCustomerId() && resource.type === "service" ? resource : null;
}

function getCurrentBrandConfirmationScheme() {
  const scheme = getConfirmationScheme(state.brandConfirmationSchemeByBrand[state.currentBrandCode]);
  return scheme?.customerId === getCurrentBrandCustomerId() ? scheme : null;
}

function renderPhoneConfirmationScheme(scheme) {
  const container = document.getElementById("phoneServiceTerms");
  container.classList.toggle("hidden", !scheme?.items.length);
  if (!scheme?.items.length) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = scheme.items.map((item, index) => {
    const resources = item.resourceIds.map(getAgreementResource).filter(Boolean);
    return `<div class="phone-service-term-row"><input id="phoneConfirmationItem-${index}" data-phone-service-consent type="checkbox" aria-label="${escapeHtml(item.text)}" /><div><label for="phoneConfirmationItem-${index}">${escapeHtml(item.text)}</label>${resources.map((resource) => `<button class="phone-term-link" type="button" data-preview-agreement-resource="${escapeHtml(resource.id)}">《${escapeHtml(resource.name)}》</button>`).join("")}</div></div>`;
  }).join("");
}

function syncBrandSharedResourceSelections() {
  const resource = getCurrentBrandInvoiceDescriptionResource();
  const descriptionView = document.getElementById("brandInvoiceDescriptionResourceView");
  descriptionView.innerHTML = resource ? `
    <div class="brand-shared-resource-summary"><div><span class="agreement-resource-type service">服务说明</span><strong>${escapeHtml(resource.name)}</strong><small>${escapeHtml(resource.version)} · ${agreementResourceStatusLabel(resource.status)}</small></div><button class="link-btn" type="button" data-preview-agreement-resource="${escapeHtml(resource.id)}">预览</button></div>` : renderSharedResourceEmpty("未选择开票说明");
  document.getElementById("selectInvoiceDescriptionResourceBtn").textContent = resource ? "更换开票说明" : "选择开票说明";
  document.getElementById("phoneInvoiceDescriptionResource").innerHTML = resource
    ? `<button type="button" data-preview-agreement-resource="${escapeHtml(resource.id)}">查看《${escapeHtml(resource.name)}》</button>`
    : "未配置开票说明";

  const scheme = getCurrentBrandConfirmationScheme();
  const schemeView = document.getElementById("brandConfirmationSchemeView");
  schemeView.innerHTML = scheme ? `
    <div class="brand-confirmation-scheme-summary"><div class="brand-confirmation-scheme-title"><span class="status-tag enabled">已启用</span><strong>${escapeHtml(scheme.name)}</strong><small>${scheme.items.length} 个勾选确认项 · ${countSchemeAgreementResources(scheme)} 份协议条款</small></div><div class="brand-confirmation-scheme-lines">${scheme.items.map((item) => `<p><span>□</span>${escapeHtml(item.text)}${item.resourceIds.map(getAgreementResource).filter(Boolean).map((agreement) => `《${escapeHtml(agreement.name)}》`).join("和")}</p>`).join("")}</div></div>` : renderSharedResourceEmpty("未选择确认方案");
  document.getElementById("selectConfirmationSchemeBtn").textContent = scheme ? "更换确认方案" : "选择确认方案";
  renderPhoneConfirmationScheme(scheme);
}

function renderInvoiceDescriptionResourcePicker() {
  const resources = getCustomerAgreementResources(getCurrentBrandCustomerId()).filter((item) => item.type === "service" && item.status === "published");
  document.getElementById("invoiceDescriptionResourcePickerOptions").innerHTML = resources.length ? resources.map((item) => `
    <label class="shared-resource-picker-option ${state.invoiceDescriptionResourcePickerDraft === item.id ? "selected" : ""}"><input type="radio" name="invoiceDescriptionResourcePicker" value="${escapeHtml(item.id)}" ${state.invoiceDescriptionResourcePickerDraft === item.id ? "checked" : ""} /><span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.version)} · 更新于 ${escapeHtml(item.updatedAt)}</small></span><button class="link-btn" type="button" data-preview-agreement-resource="${escapeHtml(item.id)}">预览</button></label>`).join("") : '<div class="table-empty">当前客户暂无已发布的服务说明</div>';
  document.getElementById("confirmInvoiceDescriptionResourceBtn").disabled = !resources.length || !state.invoiceDescriptionResourcePickerDraft;
}

function openInvoiceDescriptionResourcePicker() {
  state.invoiceDescriptionResourcePickerDraft = getCurrentBrandInvoiceDescriptionResource()?.id || "";
  renderInvoiceDescriptionResourcePicker();
  openModal("invoiceDescriptionResourcePickerModal");
}

function renderConfirmationSchemePicker() {
  const schemes = getCustomerConfirmationSchemes(getCurrentBrandCustomerId()).filter((item) => item.status === "enabled");
  document.getElementById("confirmationSchemePickerOptions").innerHTML = schemes.length ? schemes.map((scheme) => `
    <label class="shared-resource-picker-option scheme ${state.confirmationSchemePickerDraft === scheme.id ? "selected" : ""}"><input type="radio" name="confirmationSchemePicker" value="${escapeHtml(scheme.id)}" ${state.confirmationSchemePickerDraft === scheme.id ? "checked" : ""} /><span><strong>${escapeHtml(scheme.name)}</strong><small>${scheme.items.length} 个勾选确认项 · ${countSchemeAgreementResources(scheme)} 份协议条款</small><span class="shared-resource-picker-preview">${scheme.items.map((item) => `□ ${escapeHtml(item.text)}${item.resourceIds.map(getAgreementResource).filter(Boolean).map((resource) => `《${escapeHtml(resource.name)}》`).join("和")}`).join("<br>")}</span></span></label>`).join("") : '<div class="table-empty">当前客户暂无已启用的确认方案</div>';
  document.getElementById("confirmConfirmationSchemeBtn").disabled = !schemes.length || !state.confirmationSchemePickerDraft;
}

function openConfirmationSchemePicker() {
  state.confirmationSchemePickerDraft = getCurrentBrandConfirmationScheme()?.id || "";
  renderConfirmationSchemePicker();
  openModal("confirmationSchemePickerModal");
}

function renderBrandProductFeatures(brand, customer = getBrandCustomer(brand)) {
  const enabled = Boolean(customer?.einvoiceEnabled);
  const status = document.getElementById("brandRetailInvoiceStatus");
  const button = document.getElementById("enterBrandRetailInvoiceBtn");
  status.textContent = enabled ? "已开通" : "未开通";
  status.classList.toggle("enabled", enabled);
  status.classList.toggle("disabled", !enabled);
  document.getElementById("brandRetailInvoiceAutoNote").textContent = enabled
    ? "所属集团客户已开通电子发票，本品牌已自动开通。"
    : "集团未开通电子发票功能。";
  button.classList.toggle("hidden", !enabled);
  button.disabled = !enabled;
  button.textContent = "设置";
}

function openCustomerBrandDetail(brandCode, source = "customer") {
  const brand = brands.find((item) => item.code === brandCode);
  if (!brand) return;
  const customer = customers.find((item) => item.name === brand.groupName) || getCurrentCustomer();
  state.brandDetailSource = source;
  state.currentBrandDetailCode = brandCode;
  if (customer) state.currentCustomerId = customer.id;
  setActiveSidebar(source === "management" ? "brandManagementMenuBtn" : "myCustomersMenuBtn");
  ensureBrandLogoSets(brand);
  document.getElementById("brandDetailBreadcrumb").innerHTML = source === "management"
    ? "主页&nbsp;&nbsp;/&nbsp;&nbsp;品牌管理"
    : "主页&nbsp;&nbsp;/&nbsp;&nbsp;我的客户";
  document.getElementById("backFromBrandDetailBtn").textContent = source === "management" ? "返回品牌管理" : "返回";
  document.getElementById("brandDetailName").textContent = brand.name;
  document.getElementById("brandDetailCode").textContent = brand.code;
  document.getElementById("brandBasicName").textContent = brand.name;
  document.getElementById("brandBasicCode").textContent = brand.code;
  document.getElementById("brandDetailIndustry").textContent = brand.industry || "-";
  document.getElementById("brandDetailOperatingCountry").textContent = operatingCountryNames[brand.operatingCountry] || "-";
  document.getElementById("brandDetailCreatedAt").textContent = brand.createdAt || "-";
  document.getElementById("brandDetailDescription").textContent = brand.desc || "-";
  document.getElementById("brandCustomerName").textContent = customer?.name || brand.groupName || "-";
  document.getElementById("brandCustomerNumber").textContent = customer?.id || "-";
  document.getElementById("brandCustomerShortName").textContent = customer?.shortName || "-";
  renderBrandSuperAdmins();
  renderBrandLogoSets();
  renderBrandProductFeatures(brand, customer);
  setView("brandDetailView");
  window.BrandStoreFeature?.openBrand(brandCode);
}

function openBrandCustomerDetail() {
  const brand = getCurrentBrandDetail();
  const customer = brand ? getBrandCustomer(brand) : null;
  if (!customer) return;
  openCustomerDetail(customer.id);
}

function backToCustomerBrandList() {
  if (state.brandDetailSource === "management") {
    openBrandManagement();
    return;
  }
  setActiveSidebar("myCustomersMenuBtn");
  setView("productsView");
  activateCustomerTab("customerBrandListPanel");
}

function renderStores() {
  const nameKeyword = state.storeNameKeyword.trim().toLowerCase();
  const codeKeyword = state.storeCodeKeyword.trim().toLowerCase();
  const rows = getInvoiceStores().filter((item) => {
    if (nameKeyword && !item.name.toLowerCase().includes(nameKeyword)) return false;
    if (codeKeyword && !item.code.toLowerCase().includes(codeKeyword)) return false;
    return true;
  });
  document.getElementById("storeRows").innerHTML = rows
    .map((item) => {
      const company = companies.find((candidate) => candidate.id === item.invoiceCompanyId);
      const companyCell = company
        ? `<div class="store-invoice-company-cell"><strong>${escapeHtml(company.name)}</strong></div>`
        : '<span class="store-invoice-unset">未设置</span>';
      const status = company
        ? item.enabled
          ? '<span class="tag green">可开票</span>'
          : '<span class="tag gray">不可开票</span>'
        : '<span class="tag gray">未设置</span>';
      const statusActionButton = company
        ? `<button class="link-btn ${item.enabled ? "danger" : ""}" data-status-action="${item.enabled ? "disable" : "enable"}" data-kind="store" data-id="${item.id}">${item.enabled ? "关闭" : "开启"}</button>`
        : "";
      return `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.code)}</td>
          <td>${companyCell}</td>
          <td>${escapeHtml(company?.uscc || "-")}</td>
          <td>${status}</td>
          <td>${escapeHtml(item.updated)}</td>
          <td><div class="store-invoice-actions"><button class="link-btn" data-store-invoice-company="${item.id}">${company ? "变更主体" : "设置主体"}</button>${statusActionButton}</div></td>
        </tr>
      `;
    })
    .join("");
}

function storeInvoiceCompanyStatusMeta(status) {
  const map = {
    Unopened: { label: "未开通", className: "status-unopened" },
    Opening: { label: "开通中", className: "status-opening" },
    Opened: { label: "已开通", className: "status-opened" },
    Failed: { label: "开通失败", className: "status-failed" },
  };
  return map[status] || map.Unopened;
}

function renderStoreInvoiceCompanyOptions() {
  const nameKeyword = state.storeInvoiceCompanyNameKeyword.trim().toLowerCase();
  const usccKeyword = state.storeInvoiceCompanyUsccKeyword.trim().toLowerCase();
  const rows = companies.filter((company) => {
    if (state.storeInvoiceCompanyOpenedOnly && company.invoiceStatus !== "Opened") return false;
    if (nameKeyword && !company.name.toLowerCase().includes(nameKeyword)) return false;
    if (usccKeyword && !company.uscc.toLowerCase().includes(usccKeyword)) return false;
    return true;
  });
  document.getElementById("storeInvoiceCompanyTotal").textContent = `共 ${rows.length} 家公司`;
  document.getElementById("storeInvoiceCompanyOptions").innerHTML = rows.length
    ? rows.map((company) => {
        const available = company.invoiceStatus === "Opened";
        const status = storeInvoiceCompanyStatusMeta(company.invoiceStatus);
        const checked = company.id === state.storeInvoiceCompanyDraft;
        return `<tr class="${available ? "" : "unavailable"} ${checked ? "selected" : ""}">
          <td>${escapeHtml(company.name)}</td>
          <td>${escapeHtml(company.uscc)}</td>
          <td><span class="company-invoice-status ${status.className}">${status.label}</span></td>
          <td class="store-invoice-company-select-cell"><input type="radio" name="storeInvoiceCompany" value="${company.id}" aria-label="选择${escapeHtml(company.name)}" ${checked ? "checked" : ""} ${available ? "" : "disabled"} /></td>
        </tr>`;
      }).join("")
    : '<tr class="store-invoice-company-empty"><td colspan="4">暂无符合条件的公司</td></tr>';
}

function applyStoreInvoiceCompanyFilters() {
  state.storeInvoiceCompanyNameKeyword = document.getElementById("storeInvoiceCompanyNameKeyword").value;
  state.storeInvoiceCompanyUsccKeyword = document.getElementById("storeInvoiceCompanyUsccKeyword").value;
  state.storeInvoiceCompanyOpenedOnly = document.getElementById("storeInvoiceCompanyOpenedOnly").checked;
  renderStoreInvoiceCompanyOptions();
}

function resetStoreInvoiceCompanyFilters() {
  state.storeInvoiceCompanyNameKeyword = "";
  state.storeInvoiceCompanyUsccKeyword = "";
  state.storeInvoiceCompanyOpenedOnly = false;
  document.getElementById("storeInvoiceCompanyNameKeyword").value = "";
  document.getElementById("storeInvoiceCompanyUsccKeyword").value = "";
  document.getElementById("storeInvoiceCompanyOpenedOnly").checked = false;
  renderStoreInvoiceCompanyOptions();
}

function openStoreInvoiceCompanyDrawer(storeId) {
  const store = getInvoiceStores().find((item) => item.id === storeId);
  if (!store) return;
  state.editingStoreInvoiceId = store.id;
  state.storeInvoiceCompanyDraft = store.invoiceCompanyId;
  document.getElementById("storeInvoiceCompanyDrawerTitle").textContent = store.invoiceCompanyId ? "变更默认开票主体" : "设置默认开票主体";
  document.getElementById("saveStoreInvoiceCompanyBtn").textContent = store.invoiceCompanyId ? "确认变更" : "确认设置";
  document.getElementById("storeInvoiceCompanyStoreName").textContent = store.name;
  document.getElementById("storeInvoiceCompanyStoreCode").textContent = `门店编号：${store.code}`;
  document.getElementById("storeInvoiceCompanyError").textContent = "";
  resetStoreInvoiceCompanyFilters();
  openModal("storeInvoiceCompanyDrawer");
}

function saveStoreInvoiceCompany() {
  const store = getInvoiceStores().find((item) => item.id === state.editingStoreInvoiceId);
  const company = companies.find((item) => item.id === state.storeInvoiceCompanyDraft);
  const error = document.getElementById("storeInvoiceCompanyError");
  if (!store || !company) {
    error.textContent = "请选择默认开票公司";
    return;
  }
  if (company.invoiceStatus !== "Opened") {
    error.textContent = "该公司尚未开通发票功能，请先完成开通";
    return;
  }
  const changed = Boolean(store.invoiceCompanyId);
  store.invoiceCompanyId = company.id;
  if (!changed) store.enabled = true;
  store.reason = "-";
  store.updated = "2026-08-03 17:10";
  closeModal("storeInvoiceCompanyDrawer");
  renderStores();
  showToast(changed ? "默认开票主体已变更" : "默认开票主体已设置，门店已自动开启开票");
}

function buildStoreInvoiceBatchRows() {
  const currentStores = getInvoiceStores();
  const openedCompanies = companies.filter((company) => company.invoiceStatus === "Opened");
  const unopenedCompany = companies.find((company) => company.invoiceStatus === "Unopened") || companies[0];
  const inputs = [
    { row: 1, brandCode: state.currentBrandCode, storeNo: currentStores[0]?.code || "122", uscc: openedCompanies[0]?.uscc || "" },
    { row: 2, brandCode: state.currentBrandCode, storeNo: currentStores[1]?.code || "120", uscc: openedCompanies[1]?.uscc || openedCompanies[0]?.uscc || "" },
    { row: 3, brandCode: state.currentBrandCode, storeNo: currentStores[2]?.code || "100", uscc: unopenedCompany?.uscc || "" },
  ];
  const seenStores = new Set();
  return inputs.map((input) => {
    const store = currentStores.find((item) => item.code === input.storeNo);
    const company = companies.find((item) => item.uscc === input.uscc);
    let check = "通过";
    let reason = "-";
    if (!input.brandCode || !input.storeNo || !input.uscc) {
      check = "不通过";
      reason = "存在必填字段为空";
    } else if (input.brandCode !== state.currentBrandCode) {
      check = "不通过";
      reason = "品牌编号与当前品牌不一致";
    } else if (!store) {
      check = "不通过";
      reason = "当前品牌下未找到该门店编号";
    } else if (seenStores.has(input.storeNo)) {
      check = "不通过";
      reason = "同一文件中一家门店只能设置一家默认开票公司";
    } else if (!company) {
      check = "不通过";
      reason = "当前集团客户下未找到该统一社会信用代码";
    } else if (company.invoiceStatus !== "Opened") {
      check = "不通过";
      reason = "公司未开通发票功能，请先完成开通";
    }
    seenStores.add(input.storeNo);
    return {
      ...input,
      companyId: company?.id || "",
      companyName: company?.name || "-",
      invoiceStatus: company ? storeInvoiceCompanyStatusMeta(company.invoiceStatus).label : "-",
      check,
      reason,
      execute: check === "通过" ? "待执行" : "跳过",
      executeReason: reason,
    };
  });
}

function setStoreInvoiceBatchStage(step) {
  state.storeInvoiceBatchStep = step;
  document.querySelectorAll("[data-store-invoice-batch-step]").forEach((item) => {
    const value = Number(item.dataset.storeInvoiceBatchStep);
    item.classList.toggle("active", value === step);
    item.classList.toggle("completed", value < step);
  });
  document.querySelectorAll("[data-store-invoice-batch-stage]").forEach((item) => item.classList.toggle("active", Number(item.dataset.storeInvoiceBatchStage) === step));
}

function openStoreInvoiceBatch() {
  const brand = brands.find((item) => item.code === state.currentBrandCode);
  state.storeInvoiceBatchFileName = "";
  state.storeInvoiceBatchRows = [];
  document.getElementById("storeInvoiceBatchBrandTag").textContent = `品牌编号：${brand?.code || "-"}`;
  document.getElementById("storeInvoiceBatchFileCard").classList.add("hidden");
  document.getElementById("startStoreInvoiceBatchCheckBtn").disabled = true;
  setStoreInvoiceBatchStage(1);
  setView("storeInvoiceBatchView");
}

function selectMockStoreInvoiceBatchFile() {
  state.storeInvoiceBatchFileName = "门店默认开票主体批量设置示例.xlsx";
  state.storeInvoiceBatchRows = buildStoreInvoiceBatchRows();
  document.getElementById("storeInvoiceBatchFileName").textContent = state.storeInvoiceBatchFileName;
  document.getElementById("storeInvoiceBatchFileCard").classList.remove("hidden");
  document.getElementById("startStoreInvoiceBatchCheckBtn").disabled = false;
}

function renderStoreInvoiceBatchCheck() {
  const rows = state.storeInvoiceBatchRows;
  document.getElementById("storeInvoiceBatchCheckTotal").textContent = rows.length;
  document.getElementById("storeInvoiceBatchCheckPass").textContent = rows.filter((item) => item.check === "通过").length;
  document.getElementById("storeInvoiceBatchCheckFail").textContent = rows.filter((item) => item.check !== "通过").length;
  document.getElementById("storeInvoiceBatchCheckRows").innerHTML = rows.map((item) => `<tr>
    <td>${item.row}</td><td>${escapeHtml(item.brandCode)}</td><td>${escapeHtml(item.storeNo)}</td><td>${escapeHtml(item.uscc)}</td>
    <td>${escapeHtml(item.companyName)}</td><td>${escapeHtml(item.invoiceStatus)}</td>
    <td><span class="result-badge ${item.check === "通过" ? "result-success" : "result-fail"}">${item.check}</span></td><td>${escapeHtml(item.reason)}</td>
  </tr>`).join("");
}

function executeStoreInvoiceBatch() {
  state.storeInvoiceBatchRows.forEach((row) => {
    if (row.check !== "通过") return;
    const store = getInvoiceStores().find((item) => item.code === row.storeNo);
    const company = companies.find((item) => item.id === row.companyId && item.invoiceStatus === "Opened");
    if (!store || !company) {
      row.execute = "失败";
      row.executeReason = "执行时未找到可用的门店或开票公司";
      return;
    }
    const changed = Boolean(store.invoiceCompanyId);
    store.invoiceCompanyId = company.id;
    if (!changed) store.enabled = true;
    store.reason = "-";
    store.updated = "2026-08-03 17:20";
    row.execute = "成功";
    row.executeReason = changed
      ? `已变更默认开票主体，门店开票状态保持${store.enabled ? "可开票" : "不可开票"}`
      : "已设置默认开票主体，门店已自动开启开票";
  });
  const rows = state.storeInvoiceBatchRows;
  document.getElementById("storeInvoiceBatchSuccessCount").textContent = rows.filter((item) => item.execute === "成功").length;
  document.getElementById("storeInvoiceBatchFailureCount").textContent = rows.filter((item) => item.execute === "失败").length;
  document.getElementById("storeInvoiceBatchSkippedCount").textContent = rows.filter((item) => item.execute === "跳过").length;
  document.getElementById("storeInvoiceBatchExecuteRows").innerHTML = rows.map((item) => `<tr>
    <td>${item.row}</td><td>${escapeHtml(item.brandCode)}</td><td>${escapeHtml(item.storeNo)}</td><td>${escapeHtml(item.uscc)}</td><td>${escapeHtml(item.companyName)}</td>
    <td><span class="result-badge ${item.execute === "成功" ? "result-success" : "status-unopened"}">${item.execute}</span></td><td>${escapeHtml(item.executeReason)}</td>
  </tr>`).join("");
  setStoreInvoiceBatchStage(3);
}

function backToStoreInvoiceSettings() {
  openBrandSettings(state.currentBrandCode);
  activatePanel("brandStorePanel");
  renderStores();
}

function renderRules() {
  const categoryKeyword = state.ruleCategoryKeyword;
  const taxCodeKeyword = state.ruleTaxCodeKeyword;
  const rows = rules.filter((item) => {
    if (item.brandCode !== state.currentBrandCode) return false;
    if (categoryKeyword && !item.category.includes(categoryKeyword)) return false;
    if (taxCodeKeyword && !item.taxCode.includes(taxCodeKeyword)) return false;
    return true;
  });
  document.getElementById("ruleRows").innerHTML = rows
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.category)}</td>
          <td>${escapeHtml(item.alias)}</td>
          <td>${escapeHtml(item.taxCode)}</td>
          <td>${escapeHtml(item.taxName)}</td>
          <td>${escapeHtml(item.rate)}</td>
          <td>${escapeHtml(item.policy)}</td>
          <td>${escapeHtml(item.specifiedTaxNo || "-")}</td>
          <td>${escapeHtml(item.updated)}</td>
          <td>
            <button class="link-btn" data-edit-rule="${rules.indexOf(item)}">编辑</button>
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderDefaultTaxCodes() {
  const fallbackSetting = getBrandFallbackSetting();
  const brandConfig = fallbackSetting.config;
  const toggle = document.getElementById("fallbackEnabledToggle");
  toggle.checked = fallbackSetting.enabled;
  toggle.setAttribute("aria-checked", String(fallbackSetting.enabled));
  document.querySelector(".brand-fallback-card").classList.toggle("hidden", !fallbackSetting.enabled);
  document.querySelector(".tax-fallback-exception-card").classList.toggle("hidden", !fallbackSetting.enabled);
  const status = document.getElementById("brandFallbackConfigStatus");
  status.textContent = brandConfig ? "已配置" : "未配置";
  status.className = `tag ${brandConfig ? "green" : "gray"}`;
  document.getElementById("editBrandFallbackBtn").textContent = brandConfig ? "编辑" : "配置";
  document.getElementById("brandFallbackConfigView").classList.toggle("hidden", !brandConfig);
  document.getElementById("brandFallbackEmptyState").classList.toggle("hidden", Boolean(brandConfig));
  document.getElementById("brandFallbackAlias").textContent = brandConfig?.alias || "-";
  document.getElementById("brandFallbackTaxCode").textContent = brandConfig?.taxCode || "-";
  document.getElementById("brandFallbackTaxName").textContent = brandConfig?.taxName || "-";
  document.getElementById("brandFallbackRate").textContent = brandConfig?.rate || "-";
  document.getElementById("brandFallbackPolicy").textContent = brandConfig?.policy || "-";
  document.getElementById("brandFallbackUpdated").textContent = brandConfig?.updated || "-";

  const taxNoKeyword = state.defaultTaxNoKeyword;
  const taxCodeKeyword = state.defaultTaxCodeKeyword;
  const rows = defaultTaxCodes.filter((item) => {
    if (item.brandCode !== state.currentBrandCode) return false;
    if (taxNoKeyword && !item.taxNo.includes(taxNoKeyword)) return false;
    if (taxCodeKeyword && !item.taxCode.includes(taxCodeKeyword)) return false;
    return true;
  });
  document.getElementById("defaultTaxCodeRows").innerHTML = rows.length ? rows
    .map((item) => {
      const index = defaultTaxCodes.indexOf(item);
      return `
        <tr>
          <td>${escapeHtml(item.taxNo)}</td>
          <td>${escapeHtml(item.taxpayerName)}</td>
          <td>${escapeHtml(item.alias)}</td>
          <td>${escapeHtml(item.taxCode)}</td>
          <td>${escapeHtml(item.taxName)}</td>
          <td>${escapeHtml(item.rate)}</td>
          <td>${escapeHtml(item.policy)}</td>
          <td>${escapeHtml(item.updated)}</td>
          <td>
            <div class="row-actions">
              <button class="link-btn" data-edit-default-tax-code="${index}">编辑</button>
              <button class="link-btn danger" data-delete-default-tax-code="${index}">删除</button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("") : `<tr><td colspan="9" class="empty-state">${brandConfig ? "暂无税号单独配置，当前税号将使用品牌统一兜底配置" : "暂无税号单独配置"}</td></tr>`;
}

function openBrandFallbackModal() {
  const config = getBrandFallbackSetting().config;
  document.getElementById("brandFallbackAliasInput").value = config?.alias || "";
  document.getElementById("brandFallbackTaxCodeInput").value = config?.taxCode || "";
  syncTaxClassificationName("brandFallbackTaxCodeInput", "brandFallbackTaxNameInput");
  document.getElementById("brandFallbackTaxRateInput").value = config?.rate || "13%";
  document.getElementById("brandFallbackPolicyInput").value = config?.policy || "无";
  document.getElementById("brandFallbackError").textContent = "";
  openModal("brandFallbackModal");
}

function confirmBrandFallback() {
  const setting = getBrandFallbackSetting();
  const alias = document.getElementById("brandFallbackAliasInput").value.trim();
  const taxCode = document.getElementById("brandFallbackTaxCodeInput").value.trim();
  const taxName = document.getElementById("brandFallbackTaxNameInput").value.trim();
  if (!alias || !taxCode || !taxName) {
    document.getElementById("brandFallbackError").textContent = "请完整填写兜底开票项目和税收分类编码";
    return;
  }
  setting.config = {
    alias,
    taxCode,
    taxName,
    rate: document.getElementById("brandFallbackTaxRateInput").value,
    policy: document.getElementById("brandFallbackPolicyInput").value,
    updated: "2026-08-04 15:10",
  };
  closeModal("brandFallbackModal");
  renderDefaultTaxCodes();
  showToast("已保存品牌统一兜底配置");
}

function handleFallbackToggle(event) {
  if (event.target.checked) {
    event.target.checked = false;
    openModal("fallbackEnableConfirmModal");
    return;
  }
  event.target.checked = true;
  openModal("fallbackDisableConfirmModal");
}

function confirmEnableFallback() {
  const setting = getBrandFallbackSetting();
  closeModal("fallbackEnableConfirmModal");
  setting.enabled = true;
  renderDefaultTaxCodes();
  showToast("已启用品牌兜底开票");
}

function confirmDisableFallback() {
  getBrandFallbackSetting().enabled = false;
  closeModal("fallbackDisableConfirmModal");
  renderDefaultTaxCodes();
  showToast("已关闭品牌兜底开票，原配置已保留");
}

function getRuleBatchMeta(mode = state.ruleBatchMode) {
  const map = {
    category: {
      title: "批量导入商品大类匹配规则",
      hint: "请下载商品大类匹配规则模板，按模板填写规则信息。",
      fileName: "商品大类匹配规则导入模板.xlsx",
      sampleFileName: "商品大类匹配规则导入示例.xlsx",
      fields: ["品牌编号", "商品大类", "大类别名", "税收分类编码", "税率", "优惠政策"],
      returnPanel: "categoryRulePanel",
    },
    taxNo: {
      title: "批量导入税号单独配置",
      hint: "仅导入与品牌统一配置不同的税号；一个税号只能保留一条单独配置。",
      fileName: "税号单独兜底配置导入模板.xlsx",
      sampleFileName: "税号单独兜底配置导入示例.xlsx",
      fields: ["税号", "纳税人名称", "兜底开票项目", "税收分类编码", "税收分类简称", "税率", "优惠政策"],
      returnPanel: "defaultRulePanel",
      backLabel: "返回兜底开票项目设置",
    },
    payment: {
      title: "批量导入不可开票支付方式",
      hint: "请下载不可开票支付方式模板，支付方式编号必填，支付方式名称选填。",
      fileName: "不可开票支付方式导入模板.xlsx",
      sampleFileName: "不可开票支付方式导入示例.xlsx",
      fields: ["品牌编号", "支付方式编号", "支付方式名称（选填）"],
      returnPanel: "brandPaymentPanel",
      backLabel: "返回不可开票支付方式",
    },
  };
  return map[mode] || map.category;
}

function setRuleBatchStage(step) {
  state.ruleBatchStep = step;
  document.querySelectorAll(".rule-batch-stage").forEach((item) => item.classList.toggle("active", Number(item.dataset.ruleBatchStage) === step));
  document.querySelectorAll(".rule-batch-step").forEach((item) => {
    const itemStep = Number(item.dataset.ruleBatchStep);
    item.classList.toggle("active", itemStep === step);
    item.classList.toggle("completed", itemStep < step);
  });
}

function openRuleBatch(mode) {
  state.ruleBatchMode = mode;
  state.ruleBatchFileName = "";
  state.ruleBatchRows = [];
  const meta = getRuleBatchMeta(mode);
  const brand = brands.find((item) => item.code === state.currentBrandCode) || brands[0];
  document.getElementById("ruleBatchBreadcrumb").textContent = meta.title;
  document.getElementById("ruleBatchPageTitle").textContent = meta.title;
  document.getElementById("ruleBatchBrandTag").textContent = `品牌：${brand.name}（${brand.code}）`;
  document.getElementById("ruleBatchTemplateHint").textContent = meta.hint;
  document.getElementById("ruleBatchTemplateFields").innerHTML = meta.fields.map((field) => `<span>${escapeHtml(field)}</span>`).join("");
  document.getElementById("ruleBatchBackToRulesBtn").textContent = meta.backLabel || "返回开票规则设置";
  document.getElementById("ruleBatchFileCard").classList.add("hidden");
  document.getElementById("startRuleBatchCheckBtn").disabled = true;
  setRuleBatchStage(1);
  setView("ruleBatchView");
}

function getMockRuleBatchRows(mode = state.ruleBatchMode) {
  if (mode === "payment") {
    return validatePaymentBatchRows([
      { row: 1, brandCode: state.currentBrandCode, code: "CASH_COUPON", desc: "现金券" },
      { row: 2, brandCode: state.currentBrandCode, code: "EMPLOYEE_CARD", desc: "" },
      { row: 3, brandCode: state.currentBrandCode, code: "GIFT_CARD", desc: "礼品卡" },
    ]);
  }
  if (mode === "taxNo") {
    const seenTaxNos = new Set();
    return [
      { row: 1, taxNo: "91310115MA1K3DEMOA", taxpayerName: "上海我有示例商贸有限公司", alias: "鞋履商品", taxCode: "1040201000000000000", taxName: "服装", rate: "13%", policy: "无" },
      { row: 2, taxNo: "91320100MA1RDEMO01", taxpayerName: "南京示例零售有限公司", alias: "售后服务", taxCode: "3049900000000000000", taxName: "其他现代服务", rate: "3%", policy: "无" },
      { row: 3, taxNo: "91310115MA1UNKNOWN", taxpayerName: "未知纳税人", alias: "零售商品", taxCode: "1040201000000000000", taxName: "服装", rate: "13%", policy: "无" },
      { row: 4, taxNo: "91310115MA1K3DEMOA", taxpayerName: "上海我有示例商贸有限公司", alias: "零售商品", taxCode: "1040207000000000000", taxName: "箱包", rate: "13%", policy: "无" },
    ].map((item) => validateTaxNoBatchRow(item, seenTaxNos));
  }
  return [
    { row: 1, brandCode: state.currentBrandCode, category: "鞋履", alias: "鞋靴", taxCode: "1040201000000000000", rate: "13%", policy: "无" },
    { row: 2, brandCode: state.currentBrandCode, category: "数码配件", alias: "配件商品", taxCode: "1040207000000000000", rate: "13%", policy: "无" },
    { row: 3, brandCode: "700099", category: "家居用品", alias: "家居", taxCode: "1040207000000000000", rate: "13%", policy: "无" },
    { row: 4, brandCode: state.currentBrandCode, category: "服饰", alias: "服装", taxCode: "1040201000000000000", rate: "13%", policy: "无" },
  ].map(validateCategoryBatchRow);
}

function validateCategoryBatchRow(item) {
  let check = "通过";
  let reason = "-";
  if (!item.brandCode || !item.category || !item.alias || !item.taxCode || !item.rate || !item.policy) {
    check = "不通过";
    reason = "存在必填字段为空";
  } else if (item.brandCode !== state.currentBrandCode) {
    check = "不通过";
    reason = "品牌编号与当前品牌不一致";
  } else if (!taxCodeNames[item.taxCode]) {
    check = "不通过";
    reason = "税收分类编码不存在";
  } else if (rules.some((rule) => rule.brandCode === state.currentBrandCode && rule.category === item.category)) {
    check = "不通过";
    reason = "当前品牌已存在相同商品大类规则";
  }
  return { ...item, taxName: taxCodeNames[item.taxCode] || "-", check, reason };
}

function validateTaxNoBatchRow(item, seenTaxNos = new Set()) {
  let check = "通过";
  let reason = "-";
  const taxpayer = taxNos.find((entry) => entry.taxNo === item.taxNo);
  if (!item.taxNo || !item.taxpayerName || !item.alias || !item.taxCode || !item.taxName || !item.rate || !item.policy) {
    check = "不通过";
    reason = "存在必填字段为空";
  } else if (!taxpayer) {
    check = "不通过";
    reason = "当前集团客户下未找到该税号";
  } else if (taxpayer.name !== item.taxpayerName) {
    check = "不通过";
    reason = "纳税人名称与税号不一致";
  } else if (!taxCodeNames[item.taxCode] || taxCodeNames[item.taxCode] !== item.taxName) {
    check = "不通过";
    reason = "税收分类编码与简称不一致";
  } else if (seenTaxNos.has(item.taxNo)) {
    check = "不通过";
    reason = "文件内同一税号存在多条配置";
  } else if (defaultTaxCodes.some((rule) => rule.brandCode === state.currentBrandCode && rule.taxNo === item.taxNo)) {
    check = "不通过";
    reason = "当前品牌已存在该税号的单独配置";
  }
  seenTaxNos.add(item.taxNo);
  return { ...item, check, reason };
}

function validatePaymentBatchRows(rows) {
  const seenCodes = new Set();
  return rows.map((item) => {
    let check = "通过";
    let reason = "-";
    const normalizedCode = String(item.code || "").trim().toUpperCase();
    if (!item.brandCode || !normalizedCode) {
      check = "不通过";
      reason = "品牌编号和支付方式编号为必填项";
    } else if (item.brandCode !== state.currentBrandCode) {
      check = "不通过";
      reason = "品牌编号与当前品牌不一致";
    } else if (seenCodes.has(normalizedCode)) {
      check = "不通过";
      reason = "文件内支付方式编号重复";
    } else if (payments.some((payment) => payment.code.toUpperCase() === normalizedCode)) {
      check = "不通过";
      reason = "当前品牌已存在相同支付方式编号";
    }
    seenCodes.add(normalizedCode);
    return { ...item, code: normalizedCode, check, reason };
  });
}

function selectMockRuleBatchFile() {
  const meta = getRuleBatchMeta();
  state.ruleBatchFileName = meta.sampleFileName;
  state.ruleBatchRows = getMockRuleBatchRows();
  document.getElementById("ruleBatchFileName").textContent = state.ruleBatchFileName;
  document.getElementById("ruleBatchFileCard").classList.remove("hidden");
  document.getElementById("startRuleBatchCheckBtn").disabled = false;
}

function renderRuleBatchCheck() {
  const rows = state.ruleBatchRows;
  const isTaxNo = state.ruleBatchMode === "taxNo";
  const isPayment = state.ruleBatchMode === "payment";
  document.getElementById("ruleBatchCheckTotal").textContent = rows.length;
  document.getElementById("ruleBatchCheckPass").textContent = rows.filter((item) => item.check === "通过").length;
  document.getElementById("ruleBatchCheckFail").textContent = rows.filter((item) => item.check !== "通过").length;
  document.getElementById("ruleBatchCheckHead").innerHTML = isPayment
    ? "<tr><th>行号</th><th>品牌编号</th><th>支付方式编号</th><th>支付方式名称</th><th>检查结果</th><th>原因</th></tr>"
    : isTaxNo
      ? "<tr><th>行号</th><th>税号</th><th>纳税人名称</th><th>兜底开票项目</th><th>税收分类编码</th><th>税收分类简称</th><th>税率</th><th>优惠政策</th><th>检查结果</th><th>原因</th></tr>"
      : "<tr><th>行号</th><th>品牌编号</th><th>商品大类</th><th>大类别名</th><th>税收分类编码</th><th>税率</th><th>优惠政策</th><th>检查结果</th><th>原因</th></tr>";
  document.getElementById("ruleBatchCheckRows").innerHTML = rows.map((item) => {
    const result = `<span class="result-badge ${item.check === "通过" ? "result-success" : "result-fail"}">${item.check}</span>`;
    if (isPayment) return `<tr><td>${item.row}</td><td>${escapeHtml(item.brandCode)}</td><td>${escapeHtml(item.code)}</td><td>${escapeHtml(item.desc || "-")}</td><td>${result}</td><td>${escapeHtml(item.reason)}</td></tr>`;
    if (isTaxNo) return `<tr><td>${item.row}</td><td>${escapeHtml(item.taxNo)}</td><td>${escapeHtml(item.taxpayerName)}</td><td>${escapeHtml(item.alias)}</td><td>${escapeHtml(item.taxCode)}</td><td>${escapeHtml(item.taxName)}</td><td>${escapeHtml(item.rate)}</td><td>${escapeHtml(item.policy)}</td><td>${result}</td><td>${escapeHtml(item.reason)}</td></tr>`;
    return `<tr><td>${item.row}</td><td>${escapeHtml(item.brandCode)}</td><td>${escapeHtml(item.category)}</td><td>${escapeHtml(item.alias)}</td><td>${escapeHtml(item.taxCode)}</td><td>${escapeHtml(item.rate)}</td><td>${escapeHtml(item.policy)}</td><td>${result}</td><td>${escapeHtml(item.reason)}</td></tr>`;
  }).join("");
}

function executeRuleBatch() {
  const passedRows = state.ruleBatchRows.filter((item) => item.check === "通过");
  state.ruleBatchRows.forEach((item) => {
    item.execute = item.check === "通过" ? "成功" : "跳过";
    item.executeReason = item.check === "通过" ? "-" : item.reason;
  });
  if (state.ruleBatchMode === "payment") {
    passedRows.forEach((item) => payments.unshift({ code: item.code, desc: item.desc, status: "启用", updated: "2026-08-04 10:30" }));
    renderPayments();
  } else if (state.ruleBatchMode === "taxNo") {
    passedRows.forEach((item) => defaultTaxCodes.unshift({ brandCode: state.currentBrandCode, taxNo: item.taxNo, taxpayerName: item.taxpayerName, alias: item.alias, taxCode: item.taxCode, taxName: item.taxName, rate: item.rate, policy: item.policy, updated: "2026-07-21 10:30" }));
    renderDefaultTaxCodes();
  } else {
    passedRows.forEach((item) => rules.unshift({ brandCode: state.currentBrandCode, category: item.category, alias: item.alias, taxCode: item.taxCode, taxName: item.taxName, rate: item.rate, policy: item.policy, specifiedTaxNo: "", updated: "2026-07-21 10:30" }));
    renderRules();
  }
  renderRuleBatchExecute();
  setRuleBatchStage(3);
}

function renderRuleBatchExecute() {
  const isTaxNo = state.ruleBatchMode === "taxNo";
  const isPayment = state.ruleBatchMode === "payment";
  const rows = state.ruleBatchRows;
  document.getElementById("ruleBatchSuccessCount").textContent = rows.filter((item) => item.execute === "成功").length;
  document.getElementById("ruleBatchFailureCount").textContent = "0";
  document.getElementById("ruleBatchSkippedCount").textContent = rows.filter((item) => item.execute === "跳过").length;
  document.getElementById("ruleBatchExecuteHead").innerHTML = isPayment
    ? "<tr><th>行号</th><th>品牌编号</th><th>支付方式编号</th><th>支付方式名称</th><th>执行结果</th><th>原因/备注</th></tr>"
    : isTaxNo
      ? "<tr><th>行号</th><th>税号</th><th>纳税人名称</th><th>兜底开票项目</th><th>税收分类编码</th><th>税率</th><th>执行结果</th><th>原因/备注</th></tr>"
      : "<tr><th>行号</th><th>品牌编号</th><th>商品大类</th><th>大类别名</th><th>税收分类编码</th><th>税率</th><th>执行结果</th><th>原因/备注</th></tr>";
  document.getElementById("ruleBatchExecuteRows").innerHTML = rows.map((item) => {
    const result = `<span class="result-badge ${item.execute === "成功" ? "result-success" : "status-unopened"}">${item.execute}</span>`;
    if (isPayment) return `<tr><td>${item.row}</td><td>${escapeHtml(item.brandCode)}</td><td>${escapeHtml(item.code)}</td><td>${escapeHtml(item.desc || "-")}</td><td>${result}</td><td>${escapeHtml(item.executeReason)}</td></tr>`;
    if (isTaxNo) return `<tr><td>${item.row}</td><td>${escapeHtml(item.taxNo)}</td><td>${escapeHtml(item.taxpayerName)}</td><td>${escapeHtml(item.alias)}</td><td>${escapeHtml(item.taxCode)}</td><td>${escapeHtml(item.rate)}</td><td>${result}</td><td>${escapeHtml(item.executeReason)}</td></tr>`;
    return `<tr><td>${item.row}</td><td>${escapeHtml(item.brandCode)}</td><td>${escapeHtml(item.category)}</td><td>${escapeHtml(item.alias)}</td><td>${escapeHtml(item.taxCode)}</td><td>${escapeHtml(item.rate)}</td><td>${result}</td><td>${escapeHtml(item.executeReason)}</td></tr>`;
  }).join("");
}

function backToRuleSettings() {
  const meta = getRuleBatchMeta();
  openBrandSettings(state.currentBrandCode);
  const targetTab = meta.returnPanel === "defaultRulePanel" ? "defaultRulePanel" : meta.returnPanel === "brandPaymentPanel" ? "brandPaymentPanel" : "brandRulePanel";
  activatePanel(targetTab);
}

function renderPayments() {
  document.getElementById("paymentRows").innerHTML = payments
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.code)}</td>
          <td>${escapeHtml(item.desc || "-")}</td>
          <td>${escapeHtml(item.updated)}</td>
          <td><button class="link-btn" data-edit-payment="${payments.indexOf(item)}">编辑</button></td>
        </tr>
      `,
    )
    .join("");
}

function findTarget(kind, id) {
  return (kind === "taxNo" ? taxNos : getInvoiceStores()).find((item) => item.id === id);
}

function openModal(id) {
  document.getElementById(id).classList.add("active");
  document.getElementById(id).setAttribute("aria-hidden", "false");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
  document.getElementById(id).setAttribute("aria-hidden", "true");
}

function openStatusPopover(button, kind, id, action) {
  const target = findTarget(kind, id);
  if (!target) return;
  if (kind === "store" && action === "enable") {
    const company = companies.find((item) => item.id === target.invoiceCompanyId);
    if (!company) {
      showToast("请先设置门店默认开票主体");
      return;
    }
    if (company.invoiceStatus !== "Opened") {
      showToast("默认开票公司的发票功能不可用，请先变更开票主体");
      return;
    }
  }
  const isEnable = action === "enable";
  const actionText = isEnable ? "开启" : (kind === "store" ? "关闭" : "禁用");
  const targetLabel = kind === "taxNo" ? "纳税人" : "门店";
  const popover = document.getElementById("statusPopover");
  state.statusTarget = { kind, id, action };
  document.getElementById("statusPopoverText").textContent = `确认${actionText}${targetLabel}开票能力？`;
  popover.classList.remove("hidden");

  const rect = button.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const left = Math.min(Math.max(12, rect.left + rect.width - popoverRect.width), window.innerWidth - popoverRect.width - 12);
  let top = rect.bottom + 8;
  if (top + popoverRect.height > window.innerHeight - 12) {
    top = rect.top - popoverRect.height - 8;
  }
  popover.style.left = `${left}px`;
  popover.style.top = `${Math.max(12, top)}px`;
}

function openDefaultTaxCodeDeletePopover(button, index) {
  const config = defaultTaxCodes[index];
  if (!config) return;
  const popover = document.getElementById("statusPopover");
  state.statusTarget = { kind: "defaultTaxCode", index, action: "delete" };
  document.getElementById("statusPopoverText").textContent = "删除后，该税号将使用品牌统一兜底配置。确认删除？";
  popover.classList.remove("hidden");

  const rect = button.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const left = Math.min(Math.max(12, rect.left + rect.width - popoverRect.width), window.innerWidth - popoverRect.width - 12);
  let top = rect.bottom + 8;
  if (top + popoverRect.height > window.innerHeight - 12) {
    top = rect.top - popoverRect.height - 8;
  }
  popover.style.left = `${left}px`;
  popover.style.top = `${Math.max(12, top)}px`;
}

function openBrandFeatureTogglePopover(control, feature, nextEnabled) {
  const labels = {
    selfSpecialInvoice: "自助申请专票",
  };
  const label = labels[feature];
  if (!label) return;
  const popover = document.getElementById("statusPopover");
  state.statusTarget = { kind: "brandFeature", feature, nextEnabled };
  document.getElementById("statusPopoverText").textContent = `确认${nextEnabled ? "开启" : "关闭"}${label}？`;
  popover.classList.remove("hidden");

  const rect = control.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const left = Math.min(Math.max(12, rect.left + rect.width - popoverRect.width), window.innerWidth - popoverRect.width - 12);
  let top = rect.bottom + 8;
  if (top + popoverRect.height > window.innerHeight - 12) {
    top = rect.top - popoverRect.height - 8;
  }
  popover.style.left = `${left}px`;
  popover.style.top = `${Math.max(12, top)}px`;
}

function closeStatusPopover() {
  const popover = document.getElementById("statusPopover");
  popover.classList.add("hidden");
  state.statusTarget = null;
}

function confirmStatusChange() {
  if (!state.statusTarget) return;
  const { kind, id, action } = state.statusTarget;
  if (kind === "brandFeature") {
    const { feature, nextEnabled } = state.statusTarget;
    if (feature === "selfSpecialInvoice") {
      state.selfSpecialInvoiceByBrand[state.currentBrandCode] = nextEnabled;
      syncSelfSpecialInvoiceView();
    }
    closeStatusPopover();
    return;
  }
  if (kind === "defaultTaxCode" && action === "delete") {
    const { index } = state.statusTarget;
    if (typeof index !== "number" || !defaultTaxCodes[index]) {
      closeStatusPopover();
      return;
    }
    defaultTaxCodes.splice(index, 1);
    closeStatusPopover();
    renderDefaultTaxCodes();
    showToast("已删除税号单独配置");
    return;
  }
  const target = findTarget(kind, id);
  if (!target) return;
  if (kind === "store" && action === "enable") {
    const company = companies.find((item) => item.id === target.invoiceCompanyId);
    if (!company || company.invoiceStatus !== "Opened") {
      closeStatusPopover();
      showToast("默认开票公司的发票功能不可用，请先完成设置");
      return;
    }
  }
  target.enabled = action === "enable";
  target.reason = "-";
  target.updated = "2026-07-07 10:30";
  closeStatusPopover();
  renderTaxNos();
  renderStores();
  if (kind === "taxNo" && state.currentTaxNoId === id) renderTaxNoDetailStatus();
  showToast(kind === "store" ? `门店已设为${action === "enable" ? "可开票" : "不可开票"}` : `已${action === "enable" ? "开启" : "禁用"}开票能力`);
}

function openRuleModal(ruleIndex = null) {
  const isEditing = ruleIndex !== null;
  const rule = isEditing ? rules[ruleIndex] : null;
  state.editingRuleIndex = isEditing ? ruleIndex : null;
  document.getElementById("ruleModalTitle").textContent = isEditing ? "编辑商品开票规则" : "新增商品开票规则";
  document.getElementById("ruleCategory").value = rule?.category || "";
  document.getElementById("ruleAlias").value = rule?.alias || "";
  document.getElementById("ruleTaxCode").value = rule?.taxCode || "";
  syncTaxClassificationName("ruleTaxCode", "ruleTaxName");
  document.getElementById("ruleRate").value = rule?.rate || "13%";
  document.getElementById("rulePolicy").value = rule?.policy || "无";
  setTaxpayerSuggestSelection("rule", rule?.specifiedTaxNo || "");
  document.getElementById("ruleError").textContent = "";
  openModal("ruleModal");
}

function confirmRule() {
  const category = document.getElementById("ruleCategory").value.trim();
  const alias = document.getElementById("ruleAlias").value.trim();
  const taxCode = document.getElementById("ruleTaxCode").value.trim();
  const taxName = document.getElementById("ruleTaxName").value.trim();
  if (!category || !alias || !taxCode || !taxName) {
    document.getElementById("ruleError").textContent = "请完整填写商品大类、大类别名和税收分类编码";
    return;
  }
  const specifiedTaxNo = resolveTaxpayerSuggestSelection("rule");
  if (specifiedTaxNo === null) {
    document.getElementById("ruleError").textContent = "请从搜索结果中选择指定开票税号，或清空后使用门店默认开票主体";
    return;
  }
  const duplicateCategory = rules.some((item, index) => item.brandCode === state.currentBrandCode && item.category === category && index !== state.editingRuleIndex);
  if (duplicateCategory) {
    document.getElementById("ruleError").textContent = "当前商品大类已有开票规则，请直接编辑原规则";
    return;
  }
  const payload = {
    brandCode: state.currentBrandCode,
    category,
    alias,
    taxCode,
    taxName,
    rate: document.getElementById("ruleRate").value,
    policy: document.getElementById("rulePolicy").value,
    specifiedTaxNo,
    updated: "2026-07-07 10:30",
  };
  if (state.editingRuleIndex !== null) {
    Object.assign(rules[state.editingRuleIndex], payload);
  } else {
    rules.unshift(payload);
  }
  closeModal("ruleModal");
  renderRules();
  showToast(state.editingRuleIndex !== null ? "已更新商品开票规则" : "已新增商品开票规则");
  state.editingRuleIndex = null;
}

function openPaymentModal(paymentIndex = null) {
  const isEditing = paymentIndex !== null;
  const payment = isEditing ? payments[paymentIndex] : null;
  state.editingPaymentIndex = isEditing ? paymentIndex : null;
  document.getElementById("paymentTitle").textContent = isEditing ? "编辑不可开票支付方式" : "新增不可开票支付方式";
  document.getElementById("paymentCode").value = payment?.code || "";
  document.getElementById("paymentDesc").value = payment?.desc || "";
  document.getElementById("paymentError").textContent = "";
  openModal("paymentModal");
}

function confirmPayment() {
  const code = document.getElementById("paymentCode").value.trim();
  const desc = document.getElementById("paymentDesc").value.trim();
  if (!code) {
    document.getElementById("paymentError").textContent = "请填写支付方式编号";
    return;
  }
  const payload = {
    code,
    desc,
    status: "启用",
    updated: "2026-07-07 10:30",
  };
  if (state.editingPaymentIndex !== null) {
    Object.assign(payments[state.editingPaymentIndex], payload);
  } else {
    payments.unshift(payload);
  }
  closeModal("paymentModal");
  renderPayments();
  showToast(state.editingPaymentIndex !== null ? "已更新不可开票支付方式" : "已新增不可开票支付方式");
  state.editingPaymentIndex = null;
}

function openTaxNoDetail(id, drawerBase = "einvoiceView") {
  const item = taxNos.find((taxNo) => taxNo.id === id);
  if (!item) {
    showToast("未找到纳税人信息");
    return;
  }
  state.currentTaxNoId = id;
  document.getElementById("taxNoDetailView").dataset.drawerBase = drawerBase;
  renderTaxNoDetail();
  closeModal("editTaxNoBasicDrawer");
  setView("taxNoDetailView");
}

function getCurrentTaxNoDetail() {
  return taxNos.find((item) => item.id === state.currentTaxNoId);
}

function renderTaxNoDetailItem(label, value) {
  return `<div class="tax-detail-read-item"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "-")}</dd></div>`;
}

function openTaxNoBasicEditor() {
  renderTaxNoDetail();
  openModal("editTaxNoBasicDrawer");
}

function renderTaxRegionOptions() {
  const regionSelect = document.getElementById("detailRegion");
  if (regionSelect.options.length) return;
  regionSelect.innerHTML = taxRegions.map((region) => `<option>${escapeHtml(region)}</option>`).join("");
}

function syncTaxCalculationFields({ taxpayerTypeChanged = false } = {}) {
  const taxpayerType = document.getElementById("detailTaxpayerType");
  const taxMethod = document.getElementById("detailTaxMethod");
  const levyRate = document.getElementById("detailLevyRate");
  const isSmallScale = taxpayerType.value === "小规模纳税人";
  if (isSmallScale) {
    taxMethod.value = "简易计税";
    taxMethod.disabled = true;
  } else {
    taxMethod.disabled = false;
    if (taxpayerTypeChanged) taxMethod.value = "一般计税";
  }
  const usesSimpleTax = taxMethod.value === "简易计税";
  levyRate.disabled = !usesSimpleTax;
  if (!usesSimpleTax) levyRate.value = "-";
  else if (levyRate.value === "-") levyRate.value = "3%";
}

function renderTaxNoDetail() {
  const item = getCurrentTaxNoDetail();
  if (!item) return;
  document.getElementById("taxNoDetailTitle").textContent = `${item.name}详情`;
  document.getElementById("taxNoDetailSummary").textContent = `税号：${item.taxNo}`;
  document.getElementById("taxNoRegistrationView").innerHTML = [
    ["纳税人名称", item.name], ["税号", item.taxNo], ["所在地区", item.region], ["税务登记地址", item.address],
    ["税务登记联系电话", item.phone], ["税务登记开户行", item.bankName], ["税务登记银行账号", item.bankAccount], ["创建时间", item.createdAt],
  ].map(([label, value]) => renderTaxNoDetailItem(label, value)).join("");
  document.getElementById("taxNoTaxInfoView").innerHTML = [
    ["纳税人类型", item.taxpayerType], ["计税方式", item.taxMethod], ["征收率", item.levyRate],
  ].map(([label, value]) => renderTaxNoDetailItem(label, value)).join("");
  renderTaxRegionOptions();
  document.getElementById("detailTaxpayerName").value = item.name;
  document.getElementById("detailTaxNo").value = item.taxNo;
  document.getElementById("detailRegion").value = item.region;
  document.getElementById("detailAddress").value = item.address;
  document.getElementById("detailPhone").value = item.phone;
  document.getElementById("detailBankName").value = item.bankName;
  document.getElementById("detailBankAccount").value = item.bankAccount;
  document.getElementById("detailCreatedAt").value = item.createdAt;
  document.getElementById("detailTaxpayerType").value = item.taxpayerType;
  document.getElementById("detailTaxMethod").value = item.taxMethod;
  document.getElementById("detailLevyRate").value = item.levyRate;
  syncTaxCalculationFields();
  const issuerRows = item.invoiceUsers || [];
  document.getElementById("taxNoIssuerRows").innerHTML = issuerRows.length ? issuerRows.map((issuer) => `
    <tr><td>${escapeHtml(issuer.name)}</td><td>${escapeHtml(issuer.taxAccount)}</td><td>${escapeHtml(issuer.email)}</td>
    <td>${escapeHtml(issuer.role)}</td><td>${escapeHtml(issuer.loginMode)}</td><td>${escapeHtml(issuer.loginAccount)}</td>
    <td>${escapeHtml(issuer.createdAt)}</td><td>${escapeHtml(issuer.updatedAt)}</td></tr>`).join("")
    : '<tr><td colspan="8" class="empty-cell">暂无开票人信息</td></tr>';
  renderTaxNoDetailStatus();
}

function renderTaxNoDetailStatus() {
  const item = getCurrentTaxNoDetail();
  if (!item) return;
  document.getElementById("detailInvoiceStatus").innerHTML = statusTag(item.enabled);
  document.getElementById("detailInvoiceChannel").textContent = item.invoiceChannel || "-";
  const statusButton = document.getElementById("detailInvoiceStatusBtn");
  statusButton.textContent = item.enabled ? "禁用" : "开启";
  statusButton.className = item.enabled ? "default-btn small danger-outline" : "primary-btn small";
  statusButton.dataset.statusAction = item.enabled ? "disable" : "enable";
  statusButton.dataset.kind = "taxNo";
  statusButton.dataset.id = item.id;
}

function saveTaxNoBasicInfo() {
  const item = getCurrentTaxNoDetail();
  if (!item) return;
  item.region = document.getElementById("detailRegion").value.trim();
  item.address = document.getElementById("detailAddress").value.trim();
  item.phone = document.getElementById("detailPhone").value.trim();
  item.bankName = document.getElementById("detailBankName").value.trim();
  item.bankAccount = document.getElementById("detailBankAccount").value.trim();
  item.taxpayerType = document.getElementById("detailTaxpayerType").value;
  item.taxMethod = document.getElementById("detailTaxMethod").value;
  item.levyRate = document.getElementById("detailLevyRate").value;
  renderTaxNos();
  renderTaxNoDetail();
  closeModal("editTaxNoBasicDrawer");
  showToast("已更新纳税人基本信息");
}

function backToTaxNoList() {
  const drawerBase = document.getElementById("taxNoDetailView").dataset.drawerBase || "einvoiceView";
  if (drawerBase !== "einvoiceView") {
    setView(drawerBase);
    state.currentTaxNoId = null;
    return;
  }
  const taxNoTab = document.querySelector('.workspace-tabs[data-tab-group="customerEinvoice"] button[data-tab="taxNoPanel"]');
  if (taxNoTab) activateTab(taxNoTab);
  setView("einvoiceView");
  state.currentTaxNoId = null;
}

function getTaxpayerNameByTaxNo(taxNoValue) {
  return taxNos.find((item) => item.taxNo === taxNoValue)?.name || "";
}

const taxpayerSuggestConfigs = {
  rule: {
    inputId: "ruleSpecifiedTaxNo",
    optionsId: "ruleSpecifiedTaxNoOptions",
    optional: true,
  },
  default: {
    inputId: "defaultTaxpayerSuggest",
    optionsId: "defaultTaxpayerSuggestOptions",
    optional: false,
    taxNoId: "defaultTaxNo",
    taxpayerNameId: "defaultTaxpayerName",
  },
};

function getTaxpayerSuggestConfig(kind) {
  return taxpayerSuggestConfigs[kind];
}

function formatTaxpayerSuggestValue(taxpayer) {
  return taxpayer ? `${taxpayer.name}（${taxpayer.taxNo}）` : "";
}

function setTaxpayerSuggestSelection(kind, taxNoValue = "", taxpayerName = "") {
  const config = getTaxpayerSuggestConfig(kind);
  const input = document.getElementById(config.inputId);
  const taxpayer = taxNos.find((item) => item.taxNo === taxNoValue);
  const resolvedName = taxpayer?.name || taxpayerName;
  input.dataset.selectedTaxNo = taxNoValue;
  input.value = taxNoValue ? `${resolvedName}（${taxNoValue}）` : "";
  input.setAttribute("aria-expanded", "false");
  document.getElementById(config.optionsId).classList.add("hidden");
  if (config.taxNoId) document.getElementById(config.taxNoId).value = taxNoValue;
  if (config.taxpayerNameId) document.getElementById(config.taxpayerNameId).value = resolvedName;
}

function clearTaxpayerSuggestSelection(kind) {
  const config = getTaxpayerSuggestConfig(kind);
  const input = document.getElementById(config.inputId);
  input.dataset.selectedTaxNo = "";
  if (config.taxNoId) document.getElementById(config.taxNoId).value = "";
  if (config.taxpayerNameId) document.getElementById(config.taxpayerNameId).value = "";
}

function closeTaxpayerSuggest(kind) {
  const config = getTaxpayerSuggestConfig(kind);
  document.getElementById(config.optionsId).classList.add("hidden");
  document.getElementById(config.inputId).setAttribute("aria-expanded", "false");
}

function closeAllTaxpayerSuggests(exceptKind = "") {
  Object.keys(taxpayerSuggestConfigs).forEach((kind) => {
    if (kind !== exceptKind) closeTaxpayerSuggest(kind);
  });
}

function getTaxpayerSuggestMatches(input) {
  const selectedTaxNo = input.dataset.selectedTaxNo || "";
  const keyword = selectedTaxNo ? "" : input.value.trim().toLowerCase();
  return taxNos.filter((item) => !keyword || item.name.toLowerCase().includes(keyword) || item.taxNo.toLowerCase().includes(keyword));
}

function renderTaxpayerSuggest(kind) {
  const config = getTaxpayerSuggestConfig(kind);
  const input = document.getElementById(config.inputId);
  const options = document.getElementById(config.optionsId);
  const matches = getTaxpayerSuggestMatches(input);
  const candidateItems = matches.map((item) => `
    <button class="taxpayer-suggest-option" type="button" role="option" data-taxpayer-suggest-kind="${kind}" data-taxpayer-tax-no="${escapeHtml(item.taxNo)}" aria-selected="${String(input.dataset.selectedTaxNo === item.taxNo)}">
      <strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.taxNo)}</span>
    </button>`).join("");
  options.innerHTML = candidateItems || '<div class="taxpayer-suggest-empty">未找到匹配的纳税人</div>';
  options.classList.remove("hidden");
  input.setAttribute("aria-expanded", "true");
  closeAllTaxpayerSuggests(kind);
}

function resolveTaxpayerSuggestSelection(kind) {
  const config = getTaxpayerSuggestConfig(kind);
  const input = document.getElementById(config.inputId);
  const selectedTaxNo = input.dataset.selectedTaxNo || "";
  if (selectedTaxNo) return selectedTaxNo;
  const value = input.value.trim();
  if (!value && config.optional) return "";
  const normalized = value.toLowerCase();
  const exact = taxNos.find((item) => item.taxNo.toLowerCase() === normalized || item.name.toLowerCase() === normalized || formatTaxpayerSuggestValue(item).toLowerCase() === normalized);
  if (!exact) return null;
  setTaxpayerSuggestSelection(kind, exact.taxNo);
  return exact.taxNo;
}

function bindTaxpayerSuggest(kind) {
  const config = getTaxpayerSuggestConfig(kind);
  const input = document.getElementById(config.inputId);
  const options = document.getElementById(config.optionsId);
  input.addEventListener("focus", () => renderTaxpayerSuggest(kind));
  input.addEventListener("input", () => {
    clearTaxpayerSuggestSelection(kind);
    renderTaxpayerSuggest(kind);
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeTaxpayerSuggest(kind);
      return;
    }
    if (event.key !== "Enter") return;
    const firstOption = options.querySelector("[data-taxpayer-tax-no], [data-empty-taxpayer]");
    if (!firstOption) return;
    event.preventDefault();
    firstOption.click();
  });
  options.addEventListener("click", (event) => {
    const option = event.target.closest("[data-taxpayer-suggest-kind]");
    if (!option) return;
    if (option.dataset.emptyTaxpayer === "true") setTaxpayerSuggestSelection(kind, "");
    else setTaxpayerSuggestSelection(kind, option.dataset.taxpayerTaxNo || "");
  });
}

function syncTaxClassificationName(codeInputId, nameInputId) {
  const taxCode = document.getElementById(codeInputId).value.trim();
  document.getElementById(nameInputId).value = taxCodeNames[taxCode] || "";
}

function openDefaultTaxCodeModal(defaultIndex = null) {
  const isEditing = defaultIndex !== null;
  const config = isEditing ? defaultTaxCodes[defaultIndex] : null;
  state.editingDefaultTaxCodeIndex = isEditing ? defaultIndex : null;
  document.getElementById("defaultTaxCodeTitle").textContent = isEditing ? "编辑税号单独配置" : "新增税号单独配置";
  setTaxpayerSuggestSelection("default", config?.taxNo || "", config?.taxpayerName || "");
  document.getElementById("defaultAlias").value = config?.alias || "";
  document.getElementById("defaultTaxCode").value = config?.taxCode || "";
  syncTaxClassificationName("defaultTaxCode", "defaultTaxName");
  document.getElementById("defaultTaxRate").value = config?.rate || "13%";
  document.getElementById("defaultPolicy").value = config?.policy || "无";
  document.getElementById("defaultTaxCodeError").textContent = "";
  openModal("defaultTaxCodeModal");
}

function confirmDefaultTaxCode() {
  const selectedTaxNo = resolveTaxpayerSuggestSelection("default");
  const taxNo = selectedTaxNo || "";
  const taxpayerName = document.getElementById("defaultTaxpayerName").value.trim();
  const alias = document.getElementById("defaultAlias").value.trim();
  const taxCode = document.getElementById("defaultTaxCode").value.trim();
  const taxName = document.getElementById("defaultTaxName").value.trim();
  if (selectedTaxNo === null) {
    document.getElementById("defaultTaxCodeError").textContent = "请通过纳税人名称或税号搜索，并从结果中选择纳税人";
    return;
  }
  if (!taxNo || !taxpayerName || !alias || !taxCode || !taxName) {
    document.getElementById("defaultTaxCodeError").textContent = "请完整选择纳税人并填写兜底开票项目、税收分类编码";
    return;
  }
  const duplicate = defaultTaxCodes.some((item, index) => item.brandCode === state.currentBrandCode && item.taxNo === taxNo && index !== state.editingDefaultTaxCodeIndex);
  if (duplicate) {
    document.getElementById("defaultTaxCodeError").textContent = "当前税号已有单独配置，请直接编辑原配置";
    return;
  }
  const payload = {
    brandCode: state.currentBrandCode,
    taxNo,
    taxpayerName,
    alias,
    taxCode,
    taxName,
    rate: document.getElementById("defaultTaxRate").value,
    policy: document.getElementById("defaultPolicy").value,
    updated: "2026-07-07 10:30",
  };
  if (state.editingDefaultTaxCodeIndex !== null) {
    Object.assign(defaultTaxCodes[state.editingDefaultTaxCodeIndex], payload);
  } else {
    defaultTaxCodes.unshift(payload);
  }
  closeModal("defaultTaxCodeModal");
  renderDefaultTaxCodes();
  showToast(state.editingDefaultTaxCodeIndex !== null ? "已更新税号单独配置" : "已新增税号单独配置");
  state.editingDefaultTaxCodeIndex = null;
}

function setItemNameSourceMode(isEditing) {
  document.querySelectorAll('[data-view-for="item-name-source"]').forEach((item) => item.classList.toggle("hidden", isEditing));
  document.querySelectorAll('[data-edit-for="item-name-source"]').forEach((item) => item.classList.toggle("hidden", !isEditing));
}

function syncItemNameSourceView() {
  document.getElementById("itemNameSourceView").textContent = itemNameSourceNames[state.itemNameSource] || "-";
  document.getElementById("itemNameSourceSelect").value = state.itemNameSourceDraft;
}

function editItemNameSource() {
  state.itemNameSourceDraft = state.itemNameSource;
  syncItemNameSourceView();
  setItemNameSourceMode(true);
}

function saveItemNameSource() {
  state.itemNameSource = document.getElementById("itemNameSourceSelect").value;
  state.itemNameSourceDraft = state.itemNameSource;
  syncItemNameSourceView();
  setItemNameSourceMode(false);
  showToast("已保存发票明细项目名称");
}

function cancelItemNameSource() {
  state.itemNameSourceDraft = state.itemNameSource;
  syncItemNameSourceView();
  setItemNameSourceMode(false);
}

function openBrandSettings(brandCode, source = state.brandSettingsSource || "brandDetail") {
  const brand = brands.find((item) => item.code === brandCode) || brands[0];
  state.brandSettingsSource = source;
  state.currentBrandCode = brand.code;
  document.getElementById("brandSettingsBreadcrumb").textContent = source === "brandDetail"
    ? "品牌管理 / 品牌详情 / 产品管理"
    : "我的客户";
  document.getElementById("brandSettingsTitle").textContent = `${brand.name} 零售订单开票设置`;
  document.getElementById("brandCodeTag").textContent = `品牌编号：${brand.code}`;
  document.getElementById("storeNameKeyword").value = "";
  document.getElementById("storeCodeKeyword").value = "";
  state.storeNameKeyword = "";
  state.storeCodeKeyword = "";
  renderStores();
  renderRules();
  renderDefaultTaxCodes();
  syncSelfReissueView();
  syncSelfSpecialInvoiceView();
  state.discountInvoiceModeDraft = null;
  syncDiscountInvoiceModeView();
  syncMerchantCallbackView();
  syncBrandLogoView();
  syncServiceTermsView();
  state.serviceTermsDraft = cloneServiceTerms(getServiceTerms());
  state.serviceTermsEditing = false;
  setEntrySettingMode("self-reissue", false);
  setEntrySettingMode("appearance", false);
  setEntrySettingMode("service-terms", false);
  setEntrySettingMode("merchant-callback", false);
  setDiscountInvoiceModeEditing(false);
  setView("brandSettingsView");
}

function backFromBrandSettings() {
  openCustomerBrandDetail(state.currentBrandCode, state.brandDetailSource);
  document.querySelector('[data-brand-detail-tab="brandProductManagementPanel"]')?.click();
}

function updatePreviewTheme(theme) {
  state.currentTheme = theme;
  document.querySelectorAll(".theme-chip").forEach((item) => item.classList.toggle("active", item.dataset.theme === theme));
  const preview = document.getElementById("phonePreview");
  preview.classList.toggle("theme-black-white", theme === "black-white");
  preview.classList.toggle("theme-red-white", theme === "red-white");
}

function setEntrySettingMode(section, isEditing) {
  document.querySelectorAll(`[data-view-for="${section}"]`).forEach((item) => item.classList.toggle("hidden", isEditing));
  document.querySelectorAll(`[data-edit-for="${section}"]`).forEach((item) => item.classList.toggle("hidden", !isEditing));
}

function syncEntrySettingViews() {
  document.getElementById("qrExpireView").textContent = state.qrExpireDays;
  document.getElementById("pageStyleView").textContent = state.pageStyle;
  document.getElementById("themeColorView").textContent = themeNames[state.entryTheme] || "-";
  document.getElementById("invoiceNoteView").innerHTML = state.invoiceNoteHtml || "-";
  syncBrandLogoView();
  syncBrandSharedResourceSelections();
}

function getBrandLogoSchemes() {
  const brand = brands.find((item) => item.code === state.currentBrandCode) || brands[0];
  return ensureBrandLogoSets(brand).filter((item) => Boolean(item.horizontalUrl));
}

function getBrandLogoSelection(schemeId = state.brandLogoSchemeByBrand[state.currentBrandCode]) {
  const schemes = getBrandLogoSchemes();
  return schemes.find((item) => item.id === schemeId)
    || schemes.find((item) => item.isDefault)
    || schemes[0]
    || null;
}

function getBrandLogoSchemeLabel(scheme) {
  if (!scheme) return "暂无可用横版 Logo";
  return scheme.isDefault ? `${scheme.name}（默认方案）` : scheme.name;
}

function renderBrandLogoPreview(target, scheme) {
  if (!target) return;
  const brandName = getCurrentBrandName();
  target.innerHTML = "";
  target.classList.toggle("custom", Boolean(scheme?.horizontalUrl));
  if (scheme?.horizontalUrl) {
    const image = document.createElement("img");
    image.src = scheme.horizontalUrl;
    image.alt = `${brandName} ${scheme.name} 横版 Logo`;
    target.appendChild(image);
    return;
  }
  target.textContent = brandName;
}

function syncBrandLogoView() {
  const scheme = getBrandLogoSelection();
  renderBrandLogoPreview(document.getElementById("brandLogoViewPreview"), scheme);
  renderBrandLogoPreview(document.getElementById("phoneBrandLogo"), scheme);
  document.getElementById("brandLogoSchemeView").textContent = getBrandLogoSchemeLabel(scheme);
}

function syncBrandLogoEdit() {
  const scheme = getBrandLogoSelection(state.brandLogoSchemeDraft);
  state.brandLogoSchemeDraft = scheme?.id || "";
  renderBrandLogoPreview(document.getElementById("phoneBrandLogo"), scheme);
  document.getElementById("openBrandLogoPickerBtn").disabled = !scheme;
}

function renderBrandLogoPickerOptions() {
  const brandName = getCurrentBrandName();
  const schemes = getBrandLogoSchemes();
  document.getElementById("brandLogoPickerOptions").innerHTML = schemes.map((item) => `
    <label class="brand-logo-picker-option ${item.id === state.brandLogoPickerDraft ? "selected" : ""}">
      <input type="radio" name="brandLogoPicker" value="${escapeHtml(item.id)}" ${item.id === state.brandLogoPickerDraft ? "checked" : ""} />
      <span class="brand-logo-picker-preview">${renderBrandLogo(item.horizontalUrl, `${brandName} ${item.name} 横版 Logo`, "horizontal")}</span>
      <span class="brand-logo-picker-meta"><strong>${escapeHtml(item.name)}</strong>${item.isDefault ? '<span class="status-tag enabled">默认方案</span>' : ""}</span>
    </label>
  `).join("");
}

function openBrandLogoPicker() {
  state.brandLogoSchemeDraft = getBrandLogoSelection()?.id || "";
  state.brandLogoPickerDraft = state.brandLogoSchemeDraft;
  renderBrandLogoPickerOptions();
  openModal("brandLogoPickerModal");
}

function confirmBrandLogoPicker() {
  if (!state.brandLogoPickerDraft) return;
  state.brandLogoSchemeDraft = state.brandLogoPickerDraft;
  state.brandLogoSchemeByBrand[state.currentBrandCode] = state.brandLogoSchemeDraft;
  syncBrandLogoView();
  closeModal("brandLogoPickerModal");
  showToast("已更换品牌 Logo");
}

function cloneServiceTerms(terms) {
  return terms.map((item) => ({ ...item, files: (item.files || []).map((file) => ({ ...file })) }));
}

function getServiceTerms() {
  return state.serviceTermsByBrand[state.currentBrandCode] || [];
}

function getPreviewServiceTerms() {
  return state.serviceTermsEditing ? state.serviceTermsDraft : getServiceTerms();
}

function openServiceTermPreview(file) {
  if (!file?.dataUrl) return;
  document.getElementById("serviceTermPreviewTitle").textContent = file.displayName || file.fileName || "服务条款预览";
  document.getElementById("serviceTermPdfPreview").src = file.dataUrl;
  openModal("serviceTermPreviewModal");
}

function renderPhoneServiceTerms(terms) {
  const container = document.getElementById("phoneServiceTerms");
  container.classList.toggle("hidden", terms.length === 0);
  if (!terms.length) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = terms.map((item, groupIndex) => `
    <div class="phone-service-term-row">
      <input id="phoneServiceTermCheckbox-${groupIndex}" data-phone-service-consent type="checkbox" aria-label="${escapeHtml(item.name)}" />
      <div><label for="phoneServiceTermCheckbox-${groupIndex}">${escapeHtml(item.name)}</label>${item.files.map((file, fileIndex) => `<button class="phone-term-link" type="button" data-phone-service-term-group="${groupIndex}" data-phone-service-term-file="${fileIndex}">《${escapeHtml(file.displayName)}》</button>`).join("")}</div>
    </div>
  `).join("");
}

function syncServiceTermsView() {
  syncBrandSharedResourceSelections();
}

function clearServiceTermsInlineError() {
  const error = document.getElementById("serviceTermsInlineError");
  error.textContent = "";
  error.classList.add("hidden");
}

function showServiceTermsInlineError(message) {
  const error = document.getElementById("serviceTermsInlineError");
  error.textContent = message;
  error.classList.remove("hidden");
}

function editServiceTerms() {
  state.serviceTermsDraft = cloneServiceTerms(getServiceTerms());
  state.serviceTermsEditing = true;
  state.editingServiceTermIndex = null;
  clearServiceTermsInlineError();
  renderServiceTermList();
  setEntrySettingMode("service-terms", true);
}

function saveServiceTerms() {
  const normalizedTerms = state.serviceTermsDraft.map((item) => ({
    ...item,
    name: item.name.trim(),
    files: (item.files || []).map((file) => ({ ...file })),
  }));
  const incompleteIndex = normalizedTerms.findIndex((item) => !item.name || !item.files.length);
  if (incompleteIndex >= 0) {
    showServiceTermsInlineError(`请完善第 ${incompleteIndex + 1} 个勾选项的文案，并至少添加一个 PDF 文件`);
    document.querySelector(`[data-service-term-name="${incompleteIndex}"]`)?.focus();
    return;
  }
  state.serviceTermsDraft = normalizedTerms;
  state.serviceTermsByBrand[state.currentBrandCode] = cloneServiceTerms(state.serviceTermsDraft);
  state.serviceTermsEditing = false;
  state.editingServiceTermIndex = null;
  clearServiceTermsInlineError();
  setEntrySettingMode("service-terms", false);
  syncServiceTermsView();
  showToast("已保存服务条款设置");
}

function cancelServiceTerms() {
  state.serviceTermsDraft = cloneServiceTerms(getServiceTerms());
  state.serviceTermsEditing = false;
  state.editingServiceTermIndex = null;
  clearServiceTermsInlineError();
  setEntrySettingMode("service-terms", false);
  renderPhoneServiceTerms(getServiceTerms());
}

function renderServiceTermList() {
  const list = document.getElementById("serviceTermList");
  if (!state.serviceTermsDraft.length) {
    list.innerHTML = '<div class="service-term-empty">暂未添加勾选项</div>';
    renderPhoneServiceTerms([]);
    return;
  }
  list.innerHTML = state.serviceTermsDraft.map((item, index) => `
    <section class="service-term-inline-item" data-service-term-index="${index}">
      <div class="service-term-inline-item-head">
        <strong>勾选项 ${index + 1}</strong>
        <button class="link-btn danger" type="button" data-delete-service-term="${index}">删除</button>
      </div>
      <label class="service-term-inline-field required-field">
        <span class="required">勾选项文案</span>
        <input maxlength="40" data-service-term-name="${index}" value="${escapeHtml(item.name)}" placeholder="例如：我已阅读并同意" />
      </label>
      <div class="service-term-inline-file-field required-field">
        <div class="service-term-inline-file-head"><span class="required">条款文件</span><button class="default-btn small" type="button" data-add-service-term-file="${index}">添加 PDF 文件</button></div>
        <div class="service-term-inline-files">
          ${item.files.length
            ? item.files.map((file, fileIndex) => `<div class="service-term-inline-file"><div><strong>${escapeHtml(file.fileName)}</strong><small>PDF</small></div><div><button class="link-btn" type="button" data-preview-service-term-group="${index}" data-preview-service-term-file="${fileIndex}">预览</button><button class="link-btn danger" type="button" data-delete-service-term-file="${fileIndex}" data-service-term-group="${index}">删除</button></div></div>`).join("")
            : '<div class="service-term-file-empty">暂未添加条款文件</div>'}
        </div>
        <small class="service-term-inline-hint">仅支持 PDF 格式，可一次选择多个文件</small>
      </div>
    </section>
  `).join("");
  renderPhoneServiceTerms(state.serviceTermsDraft);
}

function addServiceTerm() {
  state.serviceTermsDraft.push({
    id: `service-term-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: "我已阅读并同意",
    files: [],
  });
  clearServiceTermsInlineError();
  renderServiceTermList();
  const index = state.serviceTermsDraft.length - 1;
  window.setTimeout(() => document.querySelector(`[data-service-term-name="${index}"]`)?.focus(), 0);
}

function handleServiceTermPdfFiles(fileList) {
  const files = Array.from(fileList || []);
  if (!files.length) return;
  const targetIndex = state.editingServiceTermIndex;
  const targetTerm = state.serviceTermsDraft[targetIndex];
  if (!targetTerm) return;
  if (files.some((file) => !/\.pdf$/i.test(file.name) || (file.type && file.type !== "application/pdf"))) {
    showServiceTermsInlineError("仅支持 PDF 文件");
    return;
  }
  const selectedNames = files.map((file) => file.name);
  const existingNames = new Set((targetTerm.files || []).map((file) => file.fileName));
  if (new Set(selectedNames).size !== selectedNames.length || selectedNames.some((name) => existingNames.has(name))) {
    showServiceTermsInlineError("同一勾选项内不能添加同名文件");
    return;
  }
  const targetId = targetTerm.id;
  Promise.all(files.map((file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve({
      id: `service-term-file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      fileName: file.name,
      displayName: file.name.replace(/\.pdf$/i, ""),
      dataUrl: String(reader.result || ""),
    }));
    reader.readAsDataURL(file);
  }))).then((uploadedFiles) => {
    const currentTerm = state.serviceTermsDraft.find((item) => item.id === targetId);
    if (!currentTerm) return;
    currentTerm.files.push(...uploadedFiles);
    clearServiceTermsInlineError();
    renderServiceTermList();
  });
}

function deleteServiceTerm(index) {
  state.serviceTermsDraft.splice(index, 1);
  clearServiceTermsInlineError();
  renderServiceTermList();
}

function deleteServiceTermFile(groupIndex, fileIndex) {
  state.serviceTermsDraft[groupIndex]?.files.splice(fileIndex, 1);
  clearServiceTermsInlineError();
  renderServiceTermList();
}

function handlePhoneSubmit() {
  const scheme = getCurrentBrandConfirmationScheme();
  const consentCheckboxes = Array.from(document.querySelectorAll("#phoneServiceTerms [data-phone-service-consent]"));
  if (scheme?.items.length && (consentCheckboxes.length !== scheme.items.length || consentCheckboxes.some((checkbox) => !checkbox.checked))) {
    showToast("请勾选并同意全部协议条款");
    return;
  }
  showToast("已提交开票申请（Demo）");
}

function getSelfReissueConfig() {
  return state.selfReissueByBrand[state.currentBrandCode] || {
    enabled: true,
    maxCount: 2,
    validDays: 180,
  };
}

function syncSelfReissueView() {
  const { enabled, maxCount, validDays } = getSelfReissueConfig();
  document.getElementById("selfReissueView").innerHTML = enabled
    ? `<dl class="detail-list compact"><div><dt>自助换开</dt><dd>已开启</dd></div><div><dt>每张发票最多换开</dt><dd>${maxCount} 次</dd></div><div><dt>可换开时间范围</dt><dd>原发票开具成功后 ${validDays} 天内</dd></div></dl>`
    : `<dl class="detail-list compact"><div><dt>自助换开</dt><dd>已关闭</dd></div></dl><p class="setting-hint">消费者不能通过收钱吧开票申请页自助换开。</p>`;
}

function getSelfSpecialInvoiceEnabled() {
  return Boolean(state.selfSpecialInvoiceByBrand[state.currentBrandCode]);
}

function syncSelfSpecialInvoiceView() {
  const enabled = getSelfSpecialInvoiceEnabled();
  document.getElementById("selfSpecialInvoiceEnabled").checked = enabled;
  document.getElementById("selfSpecialInvoiceStatus").textContent = enabled ? "已开启" : "已关闭";
  document.getElementById("phoneSpecialInvoiceTab").classList.toggle("hidden", !enabled);
}

function getDiscountInvoiceMode() {
  return state.discountInvoiceModeByBrand[state.currentBrandCode] || "separate";
}

function syncDiscountInvoiceModeView() {
  const mode = getDiscountInvoiceMode();
  const draft = state.discountInvoiceModeDraft || mode;
  document.querySelectorAll('input[name="discountInvoiceMode"]').forEach((input) => {
    input.checked = input.value === draft;
  });
  document.querySelectorAll("[data-discount-invoice-mode-view]").forEach((item) => {
    const selected = item.dataset.discountInvoiceModeView === mode;
    item.classList.toggle("is-selected", selected);
    item.classList.toggle("is-muted", !selected);
  });
}

function setDiscountInvoiceModeEditing(isEditing) {
  document.querySelectorAll('[data-view-for="discount-invoice-mode"]').forEach((item) => item.classList.toggle("hidden", isEditing));
  document.querySelectorAll('[data-edit-for="discount-invoice-mode"]').forEach((item) => item.classList.toggle("hidden", !isEditing));
}

function editDiscountInvoiceMode() {
  state.discountInvoiceModeDraft = getDiscountInvoiceMode();
  syncDiscountInvoiceModeView();
  setDiscountInvoiceModeEditing(true);
}

function saveDiscountInvoiceMode() {
  const mode = state.discountInvoiceModeDraft || getDiscountInvoiceMode();
  state.discountInvoiceModeByBrand[state.currentBrandCode] = mode;
  state.discountInvoiceModeDraft = null;
  syncDiscountInvoiceModeView();
  setDiscountInvoiceModeEditing(false);
  showToast("已保存商品销售折扣金额开票方式");
}

function cancelDiscountInvoiceMode() {
  state.discountInvoiceModeDraft = null;
  syncDiscountInvoiceModeView();
  setDiscountInvoiceModeEditing(false);
}

function openDiscountInvoiceExample() {
  openModal("discountInvoiceExampleModal");
}

function getMerchantCallbackConfig() {
  return state.merchantCallbackByBrand[state.currentBrandCode] || {
    invoiceStatus: "",
    invoiceStatusAndDocument: "",
  };
}

function syncMerchantCallbackView() {
  const config = getMerchantCallbackConfig();
  document.getElementById("invoiceStatusCallbackView").textContent = config.invoiceStatus || "未设置";
  document.getElementById("invoiceStatusAndDocumentCallbackView").textContent = config.invoiceStatusAndDocument || "未设置";
}

function syncMerchantCallbackFields() {
  const draft = state.merchantCallbackDraft || getMerchantCallbackConfig();
  document.getElementById("invoiceStatusCallbackUrl").value = draft.invoiceStatus;
  document.getElementById("invoiceStatusAndDocumentCallbackUrl").value = draft.invoiceStatusAndDocument;
}

function isValidHttpsUrl(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && Boolean(url.hostname);
  } catch (_error) {
    return false;
  }
}

function editMerchantCallbackSetting() {
  state.merchantCallbackDraft = { ...getMerchantCallbackConfig() };
  syncMerchantCallbackFields();
  document.getElementById("merchantCallbackError").classList.add("hidden");
  setEntrySettingMode("merchant-callback", true);
}

function saveMerchantCallbackSetting() {
  const invoiceStatus = document.getElementById("invoiceStatusCallbackUrl").value.trim();
  const invoiceStatusAndDocument = document.getElementById("invoiceStatusAndDocumentCallbackUrl").value.trim();
  const error = document.getElementById("merchantCallbackError");
  if (!isValidHttpsUrl(invoiceStatus) || !isValidHttpsUrl(invoiceStatusAndDocument)) {
    error.textContent = "回调地址必须以 https:// 开头并填写完整域名";
    error.classList.remove("hidden");
    return;
  }
  state.merchantCallbackByBrand[state.currentBrandCode] = { invoiceStatus, invoiceStatusAndDocument };
  state.merchantCallbackDraft = { ...state.merchantCallbackByBrand[state.currentBrandCode] };
  error.classList.add("hidden");
  syncMerchantCallbackView();
  setEntrySettingMode("merchant-callback", false);
  showToast("已保存商户回调地址设置");
}

function cancelMerchantCallbackSetting() {
  state.merchantCallbackDraft = { ...getMerchantCallbackConfig() };
  syncMerchantCallbackFields();
  document.getElementById("merchantCallbackError").classList.add("hidden");
  setEntrySettingMode("merchant-callback", false);
}

function syncSelfReissueFields() {
  const { enabled, maxCount, validDays } = state.selfReissueDraft;
  document.getElementById("selfReissueEnabled").checked = enabled;
  document.getElementById("selfReissueMaxCount").value = maxCount;
  document.getElementById("selfReissueValidDays").value = validDays;
  document.querySelectorAll("#selfReissueFields input").forEach((input) => {
    input.disabled = !enabled;
  });
}

function editSelfReissue() {
  state.selfReissueDraft = { ...getSelfReissueConfig() };
  document.getElementById("selfReissueError").classList.add("hidden");
  syncSelfReissueFields();
  setEntrySettingMode("self-reissue", true);
}

function validatePositiveInteger(value) {
  return value !== "" && Number.isInteger(Number(value)) && Number(value) > 0;
}

function saveSelfReissue() {
  const enabled = document.getElementById("selfReissueEnabled").checked;
  const maxCount = document.getElementById("selfReissueMaxCount").value;
  const validDays = document.getElementById("selfReissueValidDays").value;
  const error = document.getElementById("selfReissueError");

  if (enabled && (!validatePositiveInteger(maxCount) || !validatePositiveInteger(validDays))) {
    error.textContent = "换开次数和可换开天数必须填写正整数";
    error.classList.remove("hidden");
    return;
  }

  const previous = getSelfReissueConfig();
  state.selfReissueByBrand[state.currentBrandCode] = {
    enabled,
    maxCount: Number(maxCount) || previous.maxCount,
    validDays: Number(validDays) || previous.validDays,
  };
  state.selfReissueDraft = { ...state.selfReissueByBrand[state.currentBrandCode] };
  error.classList.add("hidden");
  syncSelfReissueView();
  setEntrySettingMode("self-reissue", false);
  showToast("已保存自助换开设置");
}

function cancelSelfReissue() {
  state.selfReissueDraft = { ...getSelfReissueConfig() };
  document.getElementById("selfReissueError").classList.add("hidden");
  syncSelfReissueFields();
  setEntrySettingMode("self-reissue", false);
}

function editQrSetting() {
  document.getElementById("receiptExpire").value = state.qrExpireDays;
  setEntrySettingMode("qr", true);
}

function saveQrSetting() {
  const value = document.getElementById("receiptExpire").value.trim();
  state.qrExpireDays = value || "30";
  syncEntrySettingViews();
  setEntrySettingMode("qr", false);
  showToast("已保存开票二维码有效期");
}

function cancelQrSetting() {
  document.getElementById("receiptExpire").value = state.qrExpireDays;
  setEntrySettingMode("qr", false);
}

function editAppearanceSetting() {
  document.getElementById("pageStyleSelect").value = state.pageStyle;
  updatePreviewTheme(state.entryTheme);
  setEntrySettingMode("appearance", true);
}

function saveAppearanceSetting() {
  state.pageStyle = document.getElementById("pageStyleSelect").value;
  state.entryTheme = state.currentTheme;
  syncEntrySettingViews();
  setEntrySettingMode("appearance", false);
  showToast("已保存页面样式与主题色");
}

function cancelAppearanceSetting() {
  document.getElementById("pageStyleSelect").value = state.pageStyle;
  updatePreviewTheme(state.entryTheme);
  setEntrySettingMode("appearance", false);
}

function syncInvoiceNoteLivePreview() {
  const editor = document.getElementById("invoiceNote");
  const preview = document.getElementById("invoiceNoteLivePreview");
  state.invoiceNoteDraftHtml = editor.innerHTML.trim();
  preview.innerHTML = state.invoiceNoteDraftHtml || '<p class="empty-copy">暂未设置开票说明</p>';
}

function openInvoiceNoteEditor() {
  state.invoiceNoteDraftHtml = state.invoiceNoteHtml;
  document.getElementById("invoiceNote").innerHTML = state.invoiceNoteDraftHtml;
  syncInvoiceNoteLivePreview();
  openModal("invoiceNoteEditorModal");
  window.setTimeout(() => document.getElementById("invoiceNote").focus(), 0);
}

function hasUnsavedInvoiceNote() {
  return document.getElementById("invoiceNote").innerHTML.trim() !== state.invoiceNoteHtml.trim();
}

function closeInvoiceNoteEditor(force = false) {
  if (!force && hasUnsavedInvoiceNote() && !window.confirm("当前内容尚未保存，确认关闭吗？")) return;
  state.invoiceNoteDraftHtml = state.invoiceNoteHtml;
  closeModal("invoiceNoteEditorModal");
}

function saveInvoiceNote() {
  state.invoiceNoteHtml = document.getElementById("invoiceNote").innerHTML.trim();
  state.invoiceNoteDraftHtml = state.invoiceNoteHtml;
  document.getElementById("invoiceNoteView").innerHTML = state.invoiceNoteHtml || "未设置";
  closeInvoiceNoteEditor(true);
  showToast("已保存开票说明");
}

function applyInvoiceNoteCommand(command, value = null) {
  const editor = document.getElementById("invoiceNote");
  editor.focus();
  if (command === "createLink") {
    const url = window.prompt("请输入链接地址（https://）", "https://");
    if (!url) return;
    document.execCommand("createLink", false, url);
  } else {
    document.execCommand(command, false, value);
  }
  syncInvoiceNoteLivePreview();
}

function getCurrentBrandName() {
  return brands.find((item) => item.code === state.currentBrandCode)?.name || "全部品牌";
}

function activatePanel(panelId) {
  const button = document.querySelector(`.workspace-tabs button[data-tab="${panelId}"]`);
  if (button) activateTab(button);
}

function setSpecifiedTaxNoHelpOpen(open) {
  const button = document.getElementById("specifiedTaxNoHelpBtn");
  const popover = document.getElementById("specifiedTaxNoHelpPopover");
  button.setAttribute("aria-expanded", String(open));
  popover.classList.toggle("hidden", !open);
  if (!open) return;
  const rect = button.getBoundingClientRect();
  const left = Math.min(rect.left, window.innerWidth - 320);
  popover.style.left = `${Math.max(12, left)}px`;
  popover.style.top = `${rect.bottom + 8}px`;
}

function bindEvents() {
  document.getElementById("myCustomersMenuBtn").addEventListener("click", backToCustomerList);
  document.getElementById("brandManagementMenuBtn").addEventListener("click", openBrandManagement);
  document.getElementById("searchManagedBrandsBtn").addEventListener("click", () => {
    state.managedBrandNameKeyword = document.getElementById("managedBrandNameKeyword").value;
    state.managedBrandCodeKeyword = document.getElementById("managedBrandCodeKeyword").value;
    state.managedBrandCustomerKeyword = document.getElementById("managedBrandCustomerKeyword").value;
    renderManagedBrands();
  });
  ["managedBrandNameKeyword", "managedBrandCodeKeyword", "managedBrandCustomerKeyword"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      document.getElementById("searchManagedBrandsBtn").click();
    });
  });
  document.getElementById("resetManagedBrandsBtn").addEventListener("click", () => {
    document.getElementById("managedBrandNameKeyword").value = "";
    document.getElementById("managedBrandCodeKeyword").value = "";
    document.getElementById("managedBrandCustomerKeyword").value = "";
    state.managedBrandNameKeyword = "";
    state.managedBrandCodeKeyword = "";
    state.managedBrandCustomerKeyword = "";
    renderManagedBrands();
  });
  document.getElementById("managedBrandRows").addEventListener("click", (event) => {
    const detail = event.target.closest("[data-managed-brand-detail]");
    if (detail) openCustomerBrandDetail(detail.dataset.managedBrandDetail, "management");
  });
  document.getElementById("searchCustomersBtn").addEventListener("click", () => {
    state.customerNameKeyword = document.getElementById("customerNameKeyword").value;
    state.customerNumberKeyword = document.getElementById("customerNumberKeyword").value;
    state.customerSalesKeyword = document.getElementById("customerSalesKeyword").value;
    renderCustomers();
  });
  ["customerNameKeyword", "customerNumberKeyword", "customerSalesKeyword"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      document.getElementById("searchCustomersBtn").click();
    });
  });
  document.getElementById("resetCustomersBtn").addEventListener("click", () => {
    document.getElementById("customerNameKeyword").value = "";
    document.getElementById("customerNumberKeyword").value = "";
    document.getElementById("customerSalesKeyword").value = "";
    state.customerNameKeyword = "";
    state.customerNumberKeyword = "";
    state.customerSalesKeyword = "";
    renderCustomers();
  });
  document.getElementById("customerListRows").addEventListener("click", (event) => {
    const detailButton = event.target.closest("[data-customer-detail]");
    if (detailButton) openCustomerDetail(detailButton.dataset.customerDetail);
  });
  document.getElementById("enterEinvoiceBtn").addEventListener("click", openCustomerEinvoiceFeature);
  document.getElementById("confirmEnableCustomerEinvoiceBtn").addEventListener("click", confirmEnableCustomerEinvoice);
  document.getElementById("backCustomerProductsBtn").addEventListener("click", () => setView("productsView"));
  document.getElementById("searchTaxpayersBtn").addEventListener("click", searchTaxpayers);
  document.getElementById("resetTaxpayersBtn").addEventListener("click", resetTaxpayerQuery);
  ["taxpayerNameKeyword", "taxpayerTaxNoKeyword"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      searchTaxpayers();
    });
  });
  document.getElementById("backEinvoiceBtn").addEventListener("click", backFromBrandSettings);
  document.getElementById("backTaxNoListBtn").addEventListener("click", backToTaxNoList);
  document.getElementById("editTaxNoBasicBtn").addEventListener("click", openTaxNoBasicEditor);
  document.getElementById("cancelTaxNoBasicBtn").addEventListener("click", () => {
    renderTaxNoDetail();
    closeModal("editTaxNoBasicDrawer");
  });
  document.getElementById("saveTaxNoBasicBtn").addEventListener("click", saveTaxNoBasicInfo);
  document.getElementById("detailTaxpayerType").addEventListener("change", () => syncTaxCalculationFields({ taxpayerTypeChanged: true }));
  document.getElementById("detailTaxMethod").addEventListener("change", () => syncTaxCalculationFields());
  document.getElementById("searchStoreInvoiceBtn").addEventListener("click", () => {
    state.storeNameKeyword = document.getElementById("storeNameKeyword").value;
    state.storeCodeKeyword = document.getElementById("storeCodeKeyword").value;
    renderStores();
  });
  ["storeNameKeyword", "storeCodeKeyword"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      document.getElementById("searchStoreInvoiceBtn").click();
    });
  });
  document.getElementById("resetStoreInvoiceBtn").addEventListener("click", () => {
    document.getElementById("storeNameKeyword").value = "";
    document.getElementById("storeCodeKeyword").value = "";
    state.storeNameKeyword = "";
    state.storeCodeKeyword = "";
    renderStores();
  });
  document.getElementById("batchSetStoreInvoiceCompanyBtn").addEventListener("click", openStoreInvoiceBatch);
  document.getElementById("saveStoreInvoiceCompanyBtn").addEventListener("click", saveStoreInvoiceCompany);
  document.getElementById("searchStoreInvoiceCompanyBtn").addEventListener("click", applyStoreInvoiceCompanyFilters);
  document.getElementById("resetStoreInvoiceCompanyBtn").addEventListener("click", resetStoreInvoiceCompanyFilters);
  document.getElementById("storeInvoiceCompanyOpenedOnly").addEventListener("change", applyStoreInvoiceCompanyFilters);
  ["storeInvoiceCompanyNameKeyword", "storeInvoiceCompanyUsccKeyword"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      applyStoreInvoiceCompanyFilters();
    });
  });
  document.getElementById("storeInvoiceCompanyOptions").addEventListener("change", (event) => {
    if (event.target.name !== "storeInvoiceCompany") return;
    state.storeInvoiceCompanyDraft = event.target.value;
    document.getElementById("storeInvoiceCompanyError").textContent = "";
    renderStoreInvoiceCompanyOptions();
  });

  document.querySelectorAll("[data-customer-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activateCustomerTab(button.dataset.customerTab);
    });
  });
  document.querySelectorAll("[data-agreement-management-tab]").forEach((button) => {
    button.addEventListener("click", () => activateAgreementManagementTab(button.dataset.agreementManagementTab));
  });
  document.getElementById("searchAgreementResourcesBtn").addEventListener("click", () => {
    state.agreementResourceNameKeyword = document.getElementById("agreementResourceNameFilter").value;
    state.agreementResourceTypeFilter = document.getElementById("agreementResourceTypeFilter").value;
    renderAgreementResources();
  });
  document.getElementById("resetAgreementResourcesBtn").addEventListener("click", () => {
    document.getElementById("agreementResourceNameFilter").value = "";
    document.getElementById("agreementResourceTypeFilter").value = "";
    state.agreementResourceNameKeyword = "";
    state.agreementResourceTypeFilter = "";
    renderAgreementResources();
  });
  document.getElementById("searchConfirmationSchemesBtn").addEventListener("click", () => {
    state.confirmationSchemeNameKeyword = document.getElementById("confirmationSchemeNameFilter").value;
    state.confirmationSchemeStatusFilter = document.getElementById("confirmationSchemeStatusFilter").value;
    renderConfirmationSchemes();
  });
  document.getElementById("resetConfirmationSchemesBtn").addEventListener("click", () => {
    document.getElementById("confirmationSchemeNameFilter").value = "";
    document.getElementById("confirmationSchemeStatusFilter").value = "";
    state.confirmationSchemeNameKeyword = "";
    state.confirmationSchemeStatusFilter = "";
    renderConfirmationSchemes();
  });
  document.getElementById("createAgreementResourceBtn").addEventListener("click", () => openAgreementResourceEditor());
  document.getElementById("createConfirmationSchemeBtn").addEventListener("click", () => openConfirmationSchemeEditor());
  document.getElementById("backFromAgreementResourceEditorBtn").addEventListener("click", () => backToAgreementManagement("agreementResourceListPanel"));
  document.getElementById("cancelAgreementResourceEditorBtn").addEventListener("click", () => backToAgreementManagement("agreementResourceListPanel"));
  document.getElementById("saveAgreementResourceBtn").addEventListener("click", saveAgreementResource);
  document.getElementById("agreementResourceContentEditor").addEventListener("input", syncAgreementResourcePreview);
  document.getElementById("agreementResourceBlockFormat").addEventListener("change", (event) => {
    document.getElementById("agreementResourceContentEditor").focus();
    document.execCommand("formatBlock", false, event.target.value);
    syncAgreementResourcePreview();
  });
  document.querySelectorAll("[data-agreement-rich-command]").forEach((button) => button.addEventListener("click", () => {
    document.getElementById("agreementResourceContentEditor").focus();
    document.execCommand(button.dataset.agreementRichCommand, false);
    syncAgreementResourcePreview();
  }));
  document.getElementById("agreementResourceInsertLinkBtn").addEventListener("click", () => {
    const url = window.prompt("请输入 HTTPS 链接地址", "https://");
    if (!/^https:\/\//i.test(url || "")) {
      if (url) showToast("仅支持 HTTPS 链接");
      return;
    }
    document.getElementById("agreementResourceContentEditor").focus();
    document.execCommand("createLink", false, url);
    syncAgreementResourcePreview();
  });
  document.getElementById("agreementResourceClearFormatBtn").addEventListener("click", () => {
    document.getElementById("agreementResourceContentEditor").focus();
    document.execCommand("removeFormat", false);
    syncAgreementResourcePreview();
  });
  document.getElementById("backFromConfirmationSchemeEditorBtn").addEventListener("click", () => backToAgreementManagement("confirmationSchemeListPanel"));
  document.getElementById("cancelConfirmationSchemeEditorBtn").addEventListener("click", () => backToAgreementManagement("confirmationSchemeListPanel"));
  document.getElementById("saveConfirmationSchemeBtn").addEventListener("click", saveConfirmationScheme);
  document.getElementById("addConfirmationItemBtn").addEventListener("click", addConfirmationItem);
  document.getElementById("confirmationItemEditorList").addEventListener("input", (event) => {
    const input = event.target.closest("[data-confirmation-item-text]");
    if (!input || !state.confirmationSchemeDraft) return;
    state.confirmationSchemeDraft.items[Number(input.dataset.confirmationItemText)].text = input.value;
    renderConfirmationSchemePreview();
  });
  document.getElementById("confirmationItemEditorList").addEventListener("change", (event) => {
    const checkbox = event.target.closest("[data-confirmation-item-resource]");
    if (!checkbox || !state.confirmationSchemeDraft) return;
    const item = state.confirmationSchemeDraft.items[Number(checkbox.dataset.confirmationItemResource)];
    if (!item) return;
    item.resourceIds = checkbox.checked ? [...new Set([...item.resourceIds, checkbox.value])] : item.resourceIds.filter((id) => id !== checkbox.value);
    renderConfirmationSchemePreview();
  });
  document.getElementById("confirmationItemEditorList").addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-confirmation-item]");
    if (!removeButton || !state.confirmationSchemeDraft) return;
    state.confirmationSchemeDraft.items.splice(Number(removeButton.dataset.removeConfirmationItem), 1);
    renderConfirmationItemEditor();
  });
  document.getElementById("selectInvoiceDescriptionResourceBtn").addEventListener("click", openInvoiceDescriptionResourcePicker);
  document.getElementById("selectConfirmationSchemeBtn").addEventListener("click", openConfirmationSchemePicker);
  document.getElementById("invoiceDescriptionResourcePickerOptions").addEventListener("change", (event) => {
    if (event.target.name !== "invoiceDescriptionResourcePicker") return;
    state.invoiceDescriptionResourcePickerDraft = event.target.value;
    renderInvoiceDescriptionResourcePicker();
  });
  document.getElementById("confirmationSchemePickerOptions").addEventListener("change", (event) => {
    if (event.target.name !== "confirmationSchemePicker") return;
    state.confirmationSchemePickerDraft = event.target.value;
    renderConfirmationSchemePicker();
  });
  document.getElementById("confirmInvoiceDescriptionResourceBtn").addEventListener("click", () => {
    if (!state.invoiceDescriptionResourcePickerDraft) return;
    state.brandInvoiceDescriptionResourceByBrand[state.currentBrandCode] = state.invoiceDescriptionResourcePickerDraft;
    closeModal("invoiceDescriptionResourcePickerModal");
    syncBrandSharedResourceSelections();
    showToast("已更换开票说明");
  });
  document.getElementById("clearInvoiceDescriptionResourceBtn").addEventListener("click", () => {
    delete state.brandInvoiceDescriptionResourceByBrand[state.currentBrandCode];
    closeModal("invoiceDescriptionResourcePickerModal");
    syncBrandSharedResourceSelections();
    showToast("已取消使用开票说明");
  });
  document.getElementById("confirmConfirmationSchemeBtn").addEventListener("click", () => {
    if (!state.confirmationSchemePickerDraft) return;
    state.brandConfirmationSchemeByBrand[state.currentBrandCode] = state.confirmationSchemePickerDraft;
    closeModal("confirmationSchemePickerModal");
    syncBrandSharedResourceSelections();
    showToast("已更换确认方案");
  });
  document.getElementById("clearConfirmationSchemeBtn").addEventListener("click", () => {
    delete state.brandConfirmationSchemeByBrand[state.currentBrandCode];
    closeModal("confirmationSchemePickerModal");
    syncBrandSharedResourceSelections();
    showToast("已取消使用确认方案");
  });

  document.getElementById("brandListViewBtn").addEventListener("click", () => {
    state.customerBrandViewMode = "list";
    renderCustomerBrands();
  });
  document.getElementById("brandCardViewBtn").addEventListener("click", () => {
    state.customerBrandViewMode = "card";
    renderCustomerBrands();
  });
  document.getElementById("searchCustomerBrandsBtn").addEventListener("click", () => {
    state.customerBrandNameKeyword = document.getElementById("customerBrandNameKeyword").value;
    state.customerBrandCodeKeyword = document.getElementById("customerBrandCodeKeyword").value;
    state.customerBrandPage = 1;
    renderCustomerBrands();
  });
  ["customerBrandNameKeyword", "customerBrandCodeKeyword"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      document.getElementById("searchCustomerBrandsBtn").click();
    });
  });
  document.getElementById("resetCustomerBrandsBtn").addEventListener("click", () => {
    document.getElementById("customerBrandNameKeyword").value = "";
    document.getElementById("customerBrandCodeKeyword").value = "";
    state.customerBrandNameKeyword = "";
    state.customerBrandCodeKeyword = "";
    state.customerBrandPage = 1;
    renderCustomerBrands();
  });
  document.getElementById("createCustomerBrandBtn").addEventListener("click", openCreateBrandDrawer);
  document.getElementById("confirmCreateBrandBtn").addEventListener("click", confirmCreateBrand);
  document.getElementById("editBrandBasicBtn").addEventListener("click", openBrandBasicEditor);
  document.getElementById("saveBrandBasicBtn").addEventListener("click", saveBrandBasicInfo);
  document.getElementById("addBrandLogoSetBtn").addEventListener("click", () => openBrandLogoSetEditor());
  document.getElementById("saveBrandLogoSetBtn").addEventListener("click", saveBrandLogoSet);
  document.getElementById("brandLogoSetStandardBtn").addEventListener("click", () => document.getElementById("brandLogoSetStandardFile").click());
  document.getElementById("brandLogoSetHorizontalBtn").addEventListener("click", () => document.getElementById("brandLogoSetHorizontalFile").click());
  document.getElementById("brandLogoSetStandardFile").addEventListener("change", (event) => handleBrandLogoSetFile("standard", event.target.files?.[0]));
  document.getElementById("brandLogoSetHorizontalFile").addEventListener("change", (event) => handleBrandLogoSetFile("horizontal", event.target.files?.[0]));
  document.getElementById("newBrandStandardLogoBtn").addEventListener("click", () => document.getElementById("newBrandStandardLogoFile").click());
  document.getElementById("newBrandHorizontalLogoBtn").addEventListener("click", () => document.getElementById("newBrandHorizontalLogoFile").click());
  document.getElementById("newBrandStandardLogoFile").addEventListener("change", (event) => handleNewBrandLogoFile("standard", event.target.files?.[0]));
  document.getElementById("newBrandHorizontalLogoFile").addEventListener("change", (event) => handleNewBrandLogoFile("horizontal", event.target.files?.[0]));
  document.getElementById("customerBrandPrevBtn").addEventListener("click", () => {
    if (state.customerBrandPage <= 1) return;
    state.customerBrandPage -= 1;
    renderCustomerBrands();
  });
  document.getElementById("customerBrandNextBtn").addEventListener("click", () => {
    const totalPages = Math.max(1, Math.ceil(filteredCustomerBrands().length / state.customerBrandPageSize));
    if (state.customerBrandPage >= totalPages) return;
    state.customerBrandPage += 1;
    renderCustomerBrands();
  });
  document.getElementById("customerBrandPageSize").addEventListener("change", (event) => {
    state.customerBrandPageSize = Number(event.target.value);
    state.customerBrandPage = 1;
    renderCustomerBrands();
  });
  document.getElementById("backFromBrandDetailBtn").addEventListener("click", backToCustomerBrandList);
  document.getElementById("brandCustomerNumber").addEventListener("click", openBrandCustomerDetail);
  document.getElementById("enterBrandRetailInvoiceBtn").addEventListener("click", () => {
    const brand = brands.find((item) => item.code === state.currentBrandDetailCode);
    if (!brand || !getBrandCustomer(brand)?.einvoiceEnabled) return;
    openBrandSettings(brand.code, "brandDetail");
  });
  document.getElementById("addGroupSuperAdminBtn").addEventListener("click", () => openSuperAdminModal("group"));
  document.getElementById("addBrandSuperAdminBtn").addEventListener("click", () => openSuperAdminModal("brand"));
  document.getElementById("confirmAddSuperAdminBtn").addEventListener("click", confirmAddSuperAdmin);
  document.getElementById("confirmDeleteSuperAdminBtn").addEventListener("click", confirmDeleteSuperAdmin);
  document.getElementById("superAdminUserName").addEventListener("input", () => setSuperAdminFieldError("userName"));
  document.getElementById("superAdminLoginAccount").addEventListener("input", () => setSuperAdminFieldError("loginAccount"));
  document.getElementById("copyBrandCodeBtn").addEventListener("click", async () => {
    const brand = brands.find((item) => item.code === state.currentBrandDetailCode);
    if (!brand) return;
    try { await navigator.clipboard.writeText(brand.code); } catch (_error) { /* file:// 下可能无法读取剪贴板权限 */ }
    showToast("品牌编号已复制");
  });

  document.querySelectorAll(".workspace-tabs button[data-tab]").forEach((button) => {
    button.addEventListener("click", () => activateTab(button));
  });

  document.body.addEventListener("click", (event) => {
    if (!event.target.closest("#specifiedTaxNoHelpBtn") && !event.target.closest("#specifiedTaxNoHelpPopover")) {
      setSpecifiedTaxNoHelpOpen(false);
    }
    const drawerMask = event.target.closest(".drawer-mask");
    if (drawerMask && event.target === drawerMask) {
      closeModal(drawerMask.id);
      return;
    }
    const previewAgreementResourceBtn = event.target.closest("[data-preview-agreement-resource]");
    if (previewAgreementResourceBtn) {
      event.preventDefault();
      event.stopPropagation();
      openAgreementResourcePreview(previewAgreementResourceBtn.dataset.previewAgreementResource);
      return;
    }
    const editAgreementResourceBtn = event.target.closest("[data-edit-agreement-resource]");
    if (editAgreementResourceBtn) {
      openAgreementResourceEditor(editAgreementResourceBtn.dataset.editAgreementResource);
      return;
    }
    const editConfirmationSchemeBtn = event.target.closest("[data-edit-confirmation-scheme]");
    if (editConfirmationSchemeBtn) {
      openConfirmationSchemeEditor(editConfirmationSchemeBtn.dataset.editConfirmationScheme);
      return;
    }
    const statusActionBtn = event.target.closest("[data-status-action]");
    if (statusActionBtn) {
      event.stopPropagation();
      openStatusPopover(statusActionBtn, statusActionBtn.dataset.kind, statusActionBtn.dataset.id, statusActionBtn.dataset.statusAction);
      return;
    }
    const brandFeatureToggle = event.target.closest("[data-brand-feature-toggle]");
    if (brandFeatureToggle) {
      event.stopPropagation();
      const feature = brandFeatureToggle.dataset.brandFeatureToggle;
      const currentEnabled = getSelfSpecialInvoiceEnabled();
      brandFeatureToggle.checked = currentEnabled;
      openBrandFeatureTogglePopover(brandFeatureToggle.closest(".switch-control"), feature, !currentEnabled);
      return;
    }
    const storeCompanyBtn = event.target.closest("[data-store-invoice-company]");
    if (storeCompanyBtn) {
      openStoreInvoiceCompanyDrawer(storeCompanyBtn.dataset.storeInvoiceCompany);
      return;
    }
    if (!event.target.closest("#statusPopover")) closeStatusPopover();
    const closeBtn = event.target.closest("[data-close]");
    if (closeBtn) closeModal(closeBtn.dataset.close);
    const customerBrandDetailBtn = event.target.closest("[data-customer-brand-detail]");
    if (customerBrandDetailBtn) openCustomerBrandDetail(customerBrandDetailBtn.dataset.customerBrandDetail);
    const editBrandLogoSetBtn = event.target.closest("[data-edit-brand-logo-set]");
    if (editBrandLogoSetBtn) openBrandLogoSetEditor(editBrandLogoSetBtn.dataset.editBrandLogoSet);
    const deleteBrandLogoSetBtn = event.target.closest("[data-delete-brand-logo-set]");
    if (deleteBrandLogoSetBtn) deleteBrandLogoSet(deleteBrandLogoSetBtn.dataset.deleteBrandLogoSet);
    const deleteSuperAdminBtn = event.target.closest("[data-super-admin-delete]");
    if (deleteSuperAdminBtn) openDeleteSuperAdminConfirm(deleteSuperAdminBtn.dataset.superAdminDelete);
    const taxDetailBtn = event.target.closest("[data-tax-detail]");
    if (taxDetailBtn) openTaxNoDetail(taxDetailBtn.dataset.taxDetail);
    const editRuleBtn = event.target.closest("[data-edit-rule]");
    if (editRuleBtn) openRuleModal(Number(editRuleBtn.dataset.editRule));
    const editDefaultTaxCodeBtn = event.target.closest("[data-edit-default-tax-code]");
    if (editDefaultTaxCodeBtn) openDefaultTaxCodeModal(Number(editDefaultTaxCodeBtn.dataset.editDefaultTaxCode));
    const deleteDefaultTaxCodeBtn = event.target.closest("[data-delete-default-tax-code]");
    if (deleteDefaultTaxCodeBtn) {
      event.stopPropagation();
      openDefaultTaxCodeDeletePopover(deleteDefaultTaxCodeBtn, Number(deleteDefaultTaxCodeBtn.dataset.deleteDefaultTaxCode));
      return;
    }
    const editPaymentBtn = event.target.closest("[data-edit-payment]");
    if (editPaymentBtn) openPaymentModal(Number(editPaymentBtn.dataset.editPayment));
  });

  document.getElementById("cancelStatusPopoverBtn").addEventListener("click", (event) => {
    event.stopPropagation();
    closeStatusPopover();
  });
  document.getElementById("confirmStatusPopoverBtn").addEventListener("click", (event) => {
    event.stopPropagation();
    confirmStatusChange();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeStatusPopover();
    }
  });
  document.getElementById("addRuleBtn").addEventListener("click", () => openRuleModal());
  document.getElementById("confirmRuleBtn").addEventListener("click", confirmRule);
  bindTaxpayerSuggest("rule");
  bindTaxpayerSuggest("default");
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".taxpayer-suggest")) closeAllTaxpayerSuggests();
  });
  document.getElementById("specifiedTaxNoHelpBtn").addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = event.currentTarget.getAttribute("aria-expanded") === "true";
    setSpecifiedTaxNoHelpOpen(!isOpen);
  });
  document.getElementById("ruleTaxCode").addEventListener("input", (event) => {
    syncTaxClassificationName("ruleTaxCode", "ruleTaxName");
  });
  document.getElementById("ruleSearchBtn").addEventListener("click", () => {
    state.ruleCategoryKeyword = document.getElementById("ruleCategoryKeyword").value.trim();
    state.ruleTaxCodeKeyword = document.getElementById("ruleTaxCodeKeyword").value.trim();
    renderRules();
  });
  ["ruleCategoryKeyword", "ruleTaxCodeKeyword"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      document.getElementById("ruleSearchBtn").click();
    });
  });
  document.getElementById("ruleResetBtn").addEventListener("click", () => {
    document.getElementById("ruleCategoryKeyword").value = "";
    document.getElementById("ruleTaxCodeKeyword").value = "";
    state.ruleCategoryKeyword = "";
    state.ruleTaxCodeKeyword = "";
    renderRules();
  });
  document.getElementById("importRuleBtn").addEventListener("click", () => openRuleBatch("category"));

  document.getElementById("backStoreInvoiceSettingsBtn").addEventListener("click", backToStoreInvoiceSettings);
  document.getElementById("storeInvoiceBatchBackBtn").addEventListener("click", backToStoreInvoiceSettings);
  document.getElementById("downloadStoreInvoiceBatchTemplateBtn").addEventListener("click", () => showToast("已下载门店默认开票主体批量设置模板.xlsx"));
  document.getElementById("selectStoreInvoiceBatchFileBtn").addEventListener("click", selectMockStoreInvoiceBatchFile);
  document.getElementById("removeStoreInvoiceBatchFileBtn").addEventListener("click", () => {
    state.storeInvoiceBatchFileName = "";
    state.storeInvoiceBatchRows = [];
    document.getElementById("storeInvoiceBatchFileCard").classList.add("hidden");
    document.getElementById("startStoreInvoiceBatchCheckBtn").disabled = true;
  });
  document.getElementById("startStoreInvoiceBatchCheckBtn").addEventListener("click", () => {
    renderStoreInvoiceBatchCheck();
    setStoreInvoiceBatchStage(2);
  });
  document.getElementById("reuploadStoreInvoiceBatchBtn").addEventListener("click", openStoreInvoiceBatch);
  document.getElementById("executeStoreInvoiceBatchBtn").addEventListener("click", executeStoreInvoiceBatch);
  document.getElementById("restartStoreInvoiceBatchBtn").addEventListener("click", openStoreInvoiceBatch);

  document.getElementById("addPaymentBtn").addEventListener("click", () => openPaymentModal());
  document.getElementById("importPaymentBtn").addEventListener("click", () => openRuleBatch("payment"));
  document.getElementById("confirmPaymentBtn").addEventListener("click", confirmPayment);
  document.getElementById("fallbackEnabledToggle").addEventListener("change", handleFallbackToggle);
  document.getElementById("editBrandFallbackBtn").addEventListener("click", openBrandFallbackModal);
  document.getElementById("confirmBrandFallbackBtn").addEventListener("click", confirmBrandFallback);
  document.getElementById("confirmEnableFallbackBtn").addEventListener("click", confirmEnableFallback);
  document.getElementById("confirmDisableFallbackBtn").addEventListener("click", confirmDisableFallback);
  document.getElementById("addDefaultTaxCodeBtn").addEventListener("click", () => openDefaultTaxCodeModal());
  document.getElementById("importDefaultTaxCodeBtn").addEventListener("click", () => openRuleBatch("taxNo"));
  document.getElementById("confirmDefaultTaxCodeBtn").addEventListener("click", confirmDefaultTaxCode);
  document.getElementById("defaultTaxCodeSearchBtn").addEventListener("click", () => {
    state.defaultTaxNoKeyword = document.getElementById("defaultTaxNoKeyword").value.trim();
    state.defaultTaxCodeKeyword = document.getElementById("defaultTaxCodeKeyword").value.trim();
    renderDefaultTaxCodes();
  });
  ["defaultTaxNoKeyword", "defaultTaxCodeKeyword"].forEach((id) => {
    document.getElementById(id).addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      document.getElementById("defaultTaxCodeSearchBtn").click();
    });
  });
  document.getElementById("defaultTaxCodeResetBtn").addEventListener("click", () => {
    document.getElementById("defaultTaxNoKeyword").value = "";
    document.getElementById("defaultTaxCodeKeyword").value = "";
    state.defaultTaxNoKeyword = "";
    state.defaultTaxCodeKeyword = "";
    renderDefaultTaxCodes();
  });
  document.getElementById("defaultTaxCode").addEventListener("input", () => syncTaxClassificationName("defaultTaxCode", "defaultTaxName"));
  document.getElementById("brandFallbackTaxCodeInput").addEventListener("input", () => syncTaxClassificationName("brandFallbackTaxCodeInput", "brandFallbackTaxNameInput"));
  document.getElementById("backRuleSettingsBtn").addEventListener("click", backToRuleSettings);
  document.getElementById("ruleBatchBackToRulesBtn").addEventListener("click", backToRuleSettings);
  document.getElementById("downloadRuleBatchTemplateBtn").addEventListener("click", () => showToast(`已下载${getRuleBatchMeta().fileName}`));
  document.getElementById("selectRuleBatchFileBtn").addEventListener("click", selectMockRuleBatchFile);
  document.getElementById("removeRuleBatchFileBtn").addEventListener("click", () => {
    state.ruleBatchFileName = "";
    state.ruleBatchRows = [];
    document.getElementById("ruleBatchFileCard").classList.add("hidden");
    document.getElementById("startRuleBatchCheckBtn").disabled = true;
  });
  document.getElementById("startRuleBatchCheckBtn").addEventListener("click", () => {
    renderRuleBatchCheck();
    setRuleBatchStage(2);
  });
  document.getElementById("reuploadRuleBatchBtn").addEventListener("click", () => openRuleBatch(state.ruleBatchMode));
  document.getElementById("executeRuleBatchBtn").addEventListener("click", executeRuleBatch);
  document.getElementById("restartRuleBatchBtn").addEventListener("click", () => openRuleBatch(state.ruleBatchMode));
  document.getElementById("editItemNameSourceBtn").addEventListener("click", editItemNameSource);
  document.getElementById("saveItemNameSourceBtn").addEventListener("click", saveItemNameSource);
  document.getElementById("cancelItemNameSourceBtn").addEventListener("click", cancelItemNameSource);
  document.getElementById("editQrBtn").addEventListener("click", editQrSetting);
  document.getElementById("saveQrBtn").addEventListener("click", saveQrSetting);
  document.getElementById("cancelQrBtn").addEventListener("click", cancelQrSetting);
  document.getElementById("editSelfReissueBtn").addEventListener("click", editSelfReissue);
  document.getElementById("saveSelfReissueBtn").addEventListener("click", saveSelfReissue);
  document.getElementById("cancelSelfReissueBtn").addEventListener("click", cancelSelfReissue);
  document.getElementById("selfReissueEnabled").addEventListener("change", (event) => {
    state.selfReissueDraft.enabled = event.target.checked;
    syncSelfReissueFields();
  });
  document.getElementById("selfReissueMaxCount").addEventListener("input", (event) => {
    state.selfReissueDraft.maxCount = event.target.value;
  });
  document.getElementById("selfReissueValidDays").addEventListener("input", (event) => {
    state.selfReissueDraft.validDays = event.target.value;
  });
  document.querySelectorAll('input[name="discountInvoiceMode"]').forEach((input) => {
    input.addEventListener("change", (event) => {
      if (!event.target.checked) return;
      state.discountInvoiceModeDraft = event.target.value;
      syncDiscountInvoiceModeView();
    });
  });
  document.getElementById("editDiscountInvoiceModeBtn").addEventListener("click", editDiscountInvoiceMode);
  document.getElementById("saveDiscountInvoiceModeBtn").addEventListener("click", saveDiscountInvoiceMode);
  document.getElementById("cancelDiscountInvoiceModeBtn").addEventListener("click", cancelDiscountInvoiceMode);
  document.getElementById("viewDiscountInvoiceExampleBtn").addEventListener("click", openDiscountInvoiceExample);
  document.getElementById("editAppearanceBtn").addEventListener("click", editAppearanceSetting);
  document.getElementById("saveAppearanceBtn").addEventListener("click", saveAppearanceSetting);
  document.getElementById("cancelAppearanceBtn").addEventListener("click", cancelAppearanceSetting);
  document.getElementById("editInvoiceNoteBtn").addEventListener("click", openInvoiceNoteEditor);
  document.getElementById("saveInvoiceNoteBtn").addEventListener("click", saveInvoiceNote);
  document.getElementById("cancelInvoiceNoteBtn").addEventListener("click", () => closeInvoiceNoteEditor());
  document.getElementById("closeInvoiceNoteEditorBtn").addEventListener("click", () => closeInvoiceNoteEditor());
  document.getElementById("invoiceNote").addEventListener("input", syncInvoiceNoteLivePreview);
  document.getElementById("invoiceNoteBlockFormat").addEventListener("change", (event) => applyInvoiceNoteCommand("formatBlock", event.target.value));
  document.getElementById("invoiceNoteTextColor").addEventListener("input", (event) => applyInvoiceNoteCommand("foreColor", event.target.value));
  document.getElementById("invoiceNoteBackgroundColor").addEventListener("input", (event) => applyInvoiceNoteCommand("hiliteColor", event.target.value));
  document.querySelectorAll("[data-rich-command]").forEach((button) => button.addEventListener("click", () => applyInvoiceNoteCommand(button.dataset.richCommand)));
  document.getElementById("editMerchantCallbackBtn").addEventListener("click", editMerchantCallbackSetting);
  document.getElementById("saveMerchantCallbackBtn").addEventListener("click", saveMerchantCallbackSetting);
  document.getElementById("cancelMerchantCallbackBtn").addEventListener("click", cancelMerchantCallbackSetting);
  document.getElementById("openBrandLogoPickerBtn").addEventListener("click", openBrandLogoPicker);
  document.getElementById("confirmBrandLogoPickerBtn").addEventListener("click", confirmBrandLogoPicker);
  document.getElementById("brandLogoPickerOptions").addEventListener("change", (event) => {
    if (event.target.name !== "brandLogoPicker") return;
    state.brandLogoPickerDraft = event.target.value;
    renderBrandLogoPickerOptions();
  });
  document.getElementById("editServiceTermsBtn").addEventListener("click", editServiceTerms);
  document.getElementById("saveServiceTermsBtn").addEventListener("click", saveServiceTerms);
  document.getElementById("cancelServiceTermsBtn").addEventListener("click", cancelServiceTerms);
  document.getElementById("addServiceTermBtn").addEventListener("click", addServiceTerm);
  document.getElementById("serviceTermPdfFile").addEventListener("change", (event) => {
    handleServiceTermPdfFiles(event.target.files);
    event.target.value = "";
  });
  document.getElementById("serviceTermList").addEventListener("click", (event) => {
    const preview = event.target.closest("[data-preview-service-term-file]");
    if (preview) openServiceTermPreview(state.serviceTermsDraft[Number(preview.dataset.previewServiceTermGroup)]?.files[Number(preview.dataset.previewServiceTermFile)]);
    const addFile = event.target.closest("[data-add-service-term-file]");
    if (addFile) {
      state.editingServiceTermIndex = Number(addFile.dataset.addServiceTermFile);
      document.getElementById("serviceTermPdfFile").click();
    }
    const removeFile = event.target.closest("[data-delete-service-term-file]");
    if (removeFile) deleteServiceTermFile(Number(removeFile.dataset.serviceTermGroup), Number(removeFile.dataset.deleteServiceTermFile));
    const remove = event.target.closest("[data-delete-service-term]");
    if (remove) deleteServiceTerm(Number(remove.dataset.deleteServiceTerm));
  });
  document.getElementById("serviceTermList").addEventListener("input", (event) => {
    const input = event.target.closest("[data-service-term-name]");
    if (!input) return;
    const term = state.serviceTermsDraft[Number(input.dataset.serviceTermName)];
    if (!term) return;
    term.name = input.value;
    clearServiceTermsInlineError();
    renderPhoneServiceTerms(state.serviceTermsDraft);
  });
  document.getElementById("serviceTermsView").addEventListener("click", (event) => {
    const button = event.target.closest("[data-view-service-term-file]");
    if (button) openServiceTermPreview(getServiceTerms()[Number(button.dataset.viewServiceTermGroup)]?.files[Number(button.dataset.viewServiceTermFile)]);
  });
  document.getElementById("phoneServiceTerms").addEventListener("click", (event) => {
    const button = event.target.closest("[data-phone-service-term-file]");
    if (button) openServiceTermPreview(getPreviewServiceTerms()[Number(button.dataset.phoneServiceTermGroup)]?.files[Number(button.dataset.phoneServiceTermFile)]);
  });
  document.getElementById("phoneSubmitBtn").addEventListener("click", handlePhoneSubmit);

  document.getElementById("detailDrawerBackdrop").addEventListener("click", closeActiveDetailDrawer);
  document.addEventListener("keydown", (event) => {
    const blockingLayer = document.querySelector(".modal-mask.active");
    if (event.key === "Escape" && document.getElementById("invoiceNoteEditorModal").classList.contains("active")) {
      closeInvoiceNoteEditor();
      return;
    }
    if (event.key === "Escape" && !blockingLayer && document.querySelector(".detail-drawer-view.active")) closeActiveDetailDrawer();
  });

  document.querySelectorAll(".theme-chip").forEach((button) => {
    button.addEventListener("click", () => updatePreviewTheme(button.dataset.theme));
  });
  document.querySelectorAll(".editor-toolbar [data-command]").forEach((button) => {
    button.addEventListener("click", () => {
      document.execCommand(button.dataset.command, false);
    });
  });

}

syncEntrySettingViews();
syncSelfReissueView();
syncDiscountInvoiceModeView();
syncItemNameSourceView();
updatePreviewTheme(state.entryTheme);
renderCustomers();
renderGroupSuperAdmins();
renderTaxNos();
renderCustomerBrands();
renderManagedBrands();
renderAgreementResources();
renderConfirmationSchemes();
renderRules();
renderDefaultTaxCodes();
renderPayments();
bindEvents();
syncTabSemantics();
