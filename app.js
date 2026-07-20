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
  ruleCategoryKeyword: "",
  ruleTaxCodeKeyword: "",
  defaultTaxNoKeyword: "",
  defaultTaxCodeKeyword: "",
  currentBrandCode: "700001",
  selfReissueByBrand: {},
  selfReissueDraft: null,
  editingRuleIndex: null,
  editingPaymentIndex: null,
  editingDefaultTaxCodeIndex: null,
  currentTaxNoId: null,
};

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
  },
  {
    name: "Swatch",
    code: "700002",
    desc: "腕表零售品牌",
  },
  {
    name: "Omega",
    code: "700003",
    desc: "高端腕表零售品牌",
  },
];

const stores = [
  {
    id: "store-1",
    name: "上海静安旗舰店",
    code: "ST700001001",
    company: "上海我有示例商贸有限公司",
    enabled: true,
    reason: "-",
    updated: "2026-07-06 15:20",
  },
  {
    id: "store-2",
    name: "南京新街口店",
    code: "ST700001021",
    company: "南京示例零售有限公司",
    enabled: false,
    reason: "门店仍在做公司税号关联核对",
    updated: "2026-07-06 14:12",
  },
  {
    id: "store-3",
    name: "杭州湖滨店",
    code: "ST700001033",
    company: "上海我有示例商贸有限公司",
    enabled: true,
    reason: "-",
    updated: "2026-07-05 18:36",
  },
];

const rules = [
  {
    brandCode: "700001",
    category: "服饰",
    alias: "服装",
    taxCode: "1040201000000000000",
    taxName: "服装",
    rate: "13%",
    policy: "无",
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
    taxNo: "91310115MA1K3DEMOA",
    taxpayerName: "上海我有示例商贸有限公司",
    alias: "零售商品",
    taxCode: "1040201000000000000",
    taxName: "服装",
    rate: "13%",
    policy: "无",
    updated: "2026-07-06 15:08",
  },
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function setView(view) {
  document.querySelectorAll(".page-view").forEach((item) => item.classList.remove("active"));
  document.getElementById(view).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
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

function statusTag(enabled) {
  return enabled ? '<span class="tag green">启用</span>' : '<span class="tag gray">禁用</span>';
}

function statusAction(kind, item) {
  const action = item.enabled ? "disable" : "enable";
  const text = item.enabled ? "禁用" : "开启";
  return `<button class="link-btn ${item.enabled ? "danger" : ""}" data-status-action="${action}" data-kind="${kind}" data-id="${item.id}">${text}</button>`;
}

function renderTaxNos() {
  document.getElementById("taxNoRows").innerHTML = taxNos
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
    .join("");
}

function renderBrands() {
  document.getElementById("brandRows").innerHTML = brands
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.code)}</td>
          <td>${escapeHtml(item.desc)}</td>
          <td><button class="link-btn" data-brand-code="${item.code}">设置</button></td>
        </tr>
      `,
    )
    .join("");
}

function renderStores() {
  const keyword = document.getElementById("storeSearch").value.trim();
  const rows = stores.filter((item) => !keyword || item.name.includes(keyword) || item.code.includes(keyword));
  document.getElementById("storeRows").innerHTML = rows
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.code)}</td>
          <td>${escapeHtml(item.company)}</td>
          <td>${statusTag(item.enabled)}</td>
          <td>${escapeHtml(item.updated)}</td>
          <td>${statusAction("store", item)}</td>
        </tr>
      `,
    )
    .join("");
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
  const taxNoKeyword = state.defaultTaxNoKeyword;
  const taxCodeKeyword = state.defaultTaxCodeKeyword;
  const rows = defaultTaxCodes.filter((item) => {
    if (item.brandCode !== state.currentBrandCode) return false;
    if (taxNoKeyword && !item.taxNo.includes(taxNoKeyword)) return false;
    if (taxCodeKeyword && !item.taxCode.includes(taxCodeKeyword)) return false;
    return true;
  });
  document.getElementById("defaultTaxCodeRows").innerHTML = rows
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
    .join("");
}

function renderPayments() {
  document.getElementById("paymentRows").innerHTML = payments
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.code)}</td>
          <td>${escapeHtml(item.desc)}</td>
          <td>${escapeHtml(item.updated)}</td>
          <td><button class="link-btn" data-edit-payment="${payments.indexOf(item)}">编辑</button></td>
        </tr>
      `,
    )
    .join("");
}

function findTarget(kind, id) {
  return (kind === "taxNo" ? taxNos : stores).find((item) => item.id === id);
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
  const isEnable = action === "enable";
  const actionText = isEnable ? "开启" : "禁用";
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
  document.getElementById("statusPopoverText").textContent = "确认删除税号匹配规则？";
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

function closeStatusPopover() {
  const popover = document.getElementById("statusPopover");
  popover.classList.add("hidden");
  state.statusTarget = null;
}

function confirmStatusChange() {
  if (!state.statusTarget) return;
  const { kind, id, action } = state.statusTarget;
  if (kind === "defaultTaxCode" && action === "delete") {
    const { index } = state.statusTarget;
    if (typeof index !== "number" || !defaultTaxCodes[index]) {
      closeStatusPopover();
      return;
    }
    defaultTaxCodes.splice(index, 1);
    closeStatusPopover();
    renderDefaultTaxCodes();
    showToast("已删除税号匹配规则");
    return;
  }
  const target = findTarget(kind, id);
  if (!target) return;
  target.enabled = action === "enable";
  target.reason = "-";
  target.updated = "2026-07-07 10:30";
  closeStatusPopover();
  renderTaxNos();
  renderStores();
  if (kind === "taxNo" && state.currentTaxNoId === id) renderTaxNoDetailStatus();
  showToast(`已${action === "enable" ? "开启" : "禁用"}开票能力`);
}

function openRuleModal(ruleIndex = null) {
  const isEditing = ruleIndex !== null;
  const rule = isEditing ? rules[ruleIndex] : null;
  state.editingRuleIndex = isEditing ? ruleIndex : null;
  document.getElementById("ruleModalTitle").textContent = isEditing ? "编辑商品开票规则" : "新增商品开票规则";
  document.getElementById("ruleCategory").value = rule?.category || "";
  document.getElementById("ruleAlias").value = rule?.alias || "";
  document.getElementById("ruleTaxCode").value = rule?.taxCode || "";
  document.getElementById("ruleTaxName").value = rule?.taxName || "";
  document.getElementById("ruleRate").value = rule?.rate || "13%";
  document.getElementById("rulePolicy").value = rule?.policy || "无";
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
  const payload = {
    brandCode: state.currentBrandCode,
    category,
    alias,
    taxCode,
    taxName,
    rate: document.getElementById("ruleRate").value,
    policy: document.getElementById("rulePolicy").value,
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
  if (!code || !desc) {
    document.getElementById("paymentError").textContent = "请填写支付方式编号和支付方式名称";
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

function openTaxNoDetail(id) {
  const item = taxNos.find((taxNo) => taxNo.id === id);
  if (!item) {
    showToast("未找到纳税人信息");
    return;
  }
  state.currentTaxNoId = id;
  renderTaxNoDetail();
  setTaxNoBasicInfoMode(false);
  setView("taxNoDetailView");
}

function getCurrentTaxNoDetail() {
  return taxNos.find((item) => item.id === state.currentTaxNoId);
}

function renderTaxNoDetailItem(label, value) {
  return `<div class="tax-detail-read-item"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "-")}</dd></div>`;
}

function setTaxNoBasicInfoMode(isEditing) {
  document.querySelectorAll('[data-view-for="tax-no-basic"]').forEach((element) => element.classList.toggle("hidden", isEditing));
  document.querySelectorAll('[data-edit-for="tax-no-basic"]').forEach((element) => element.classList.toggle("hidden", !isEditing));
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
    ["纳税人名称", item.name], ["税号", item.taxNo], ["所在地区", item.region], ["地址", item.address],
    ["联系电话", item.phone], ["开户行名称", item.bankName], ["开户行账号", item.bankAccount], ["创建时间", item.createdAt],
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
  setTaxNoBasicInfoMode(false);
  showToast("已更新纳税人基本信息");
}

function backToTaxNoList() {
  const taxNoTab = document.querySelector('.workspace-tabs[data-tab-group="customerEinvoice"] button[data-tab="taxNoPanel"]');
  if (taxNoTab) activateTab(taxNoTab);
  setView("einvoiceView");
  state.currentTaxNoId = null;
}

function getTaxpayerNameByTaxNo(taxNoValue) {
  return taxNos.find((item) => item.taxNo === taxNoValue)?.name || "";
}

function openDefaultTaxCodeModal(defaultIndex = null) {
  const isEditing = defaultIndex !== null;
  const config = isEditing ? defaultTaxCodes[defaultIndex] : null;
  state.editingDefaultTaxCodeIndex = isEditing ? defaultIndex : null;
  document.getElementById("defaultTaxCodeTitle").textContent = isEditing ? "编辑税号匹配规则" : "新增税号匹配规则";
  document.getElementById("defaultTaxNo").value = config?.taxNo || "";
  document.getElementById("defaultTaxpayerName").value = config?.taxpayerName || "";
  document.getElementById("defaultAlias").value = config?.alias || "";
  document.getElementById("defaultTaxCode").value = config?.taxCode || "";
  document.getElementById("defaultTaxName").value = config?.taxName || "";
  document.getElementById("defaultTaxRate").value = config?.rate || "13%";
  document.getElementById("defaultPolicy").value = config?.policy || "无";
  document.getElementById("defaultTaxCodeError").textContent = "";
  openModal("defaultTaxCodeModal");
}

function confirmDefaultTaxCode() {
  const taxNo = document.getElementById("defaultTaxNo").value.trim();
  const taxpayerName = document.getElementById("defaultTaxpayerName").value.trim();
  const alias = document.getElementById("defaultAlias").value.trim();
  const taxCode = document.getElementById("defaultTaxCode").value.trim();
  const taxName = document.getElementById("defaultTaxName").value.trim();
  if (!taxNo || !taxpayerName || !alias || !taxCode || !taxName) {
    document.getElementById("defaultTaxCodeError").textContent = "请完整填写税号、纳税人名称、大类别名和税收分类编码";
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
  showToast(state.editingDefaultTaxCodeIndex !== null ? "已更新税号匹配规则" : "已新增税号匹配规则");
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

function openBrandSettings(brandCode) {
  const brand = brands.find((item) => item.code === brandCode) || brands[0];
  state.currentBrandCode = brand.code;
  document.getElementById("brandSettingsTitle").textContent = `${brand.name} 开票设置`;
  document.getElementById("brandCodeTag").textContent = `品牌编号：${brand.code}`;
  renderRules();
  renderDefaultTaxCodes();
  syncSelfReissueView();
  setEntrySettingMode("self-reissue", false);
  setView("brandSettingsView");
}

function updatePreviewTheme(theme) {
  state.currentTheme = theme;
  document.querySelectorAll(".theme-chip").forEach((item) => item.classList.toggle("active", item.dataset.theme === theme));
  const preview = document.getElementById("phonePreview");
  preview.classList.toggle("theme-black-white", theme === "black-white");
  preview.classList.toggle("theme-red-white", theme === "red-white");
}

function updatePreviewNote() {
  const text = document.getElementById("invoiceNote").innerText.trim();
  document.getElementById("previewNote").textContent = text || "请确认订单信息后提交开票申请。";
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

function editPageSetting() {
  document.getElementById("pageStyleSelect").value = state.pageStyle;
  document.getElementById("invoiceNote").innerHTML = state.invoiceNoteHtml;
  updatePreviewTheme(state.entryTheme);
  updatePreviewNote();
  setEntrySettingMode("page", true);
}

function savePageSetting() {
  state.pageStyle = document.getElementById("pageStyleSelect").value;
  state.entryTheme = state.currentTheme;
  state.invoiceNoteHtml = document.getElementById("invoiceNote").innerHTML.trim();
  syncEntrySettingViews();
  updatePreviewNote();
  setEntrySettingMode("page", false);
  showToast("已保存开票申请页设置");
}

function cancelPageSetting() {
  document.getElementById("pageStyleSelect").value = state.pageStyle;
  document.getElementById("invoiceNote").innerHTML = state.invoiceNoteHtml;
  updatePreviewTheme(state.entryTheme);
  updatePreviewNote();
  setEntrySettingMode("page", false);
}

function getCurrentBrandName() {
  return brands.find((item) => item.code === state.currentBrandCode)?.name || "全部品牌";
}

function updateAiContext() {
  const activeView = document.querySelector(".page-view.active")?.id;
  const brandName = getCurrentBrandName();
  let scope = "当前范围：斯沃琪集团电子发票";
  let brandContext = "品牌：全部品牌";
  let tabContext = "页面：产品管理";

  if (activeView === "einvoiceView") {
    const activeTab = document.querySelector('.workspace-tabs[data-tab-group="customerEinvoice"] button.active')?.textContent.trim();
    tabContext = `页面：${activeTab || "纳税人管理"}`;
  }

  if (activeView === "brandSettingsView") {
    const activeBrandTab = document.querySelector('.workspace-tabs[data-tab-group="brandSettings"] button.active')?.textContent.trim();
    const activeRuleTab = document.querySelector('.workspace-tabs[data-tab-group="brandRuleSettings"] button.active')?.textContent.trim();
    scope = `当前范围：${brandName} 开票设置`;
    brandContext = `品牌：${brandName}`;
    tabContext = `页面：${activeBrandTab || "门店开票设置"}`;
    if (activeBrandTab === "订单开票规则设置" && activeRuleTab) {
      tabContext = `页面：订单开票规则设置 / ${activeRuleTab}`;
    }
  }

  document.getElementById("aiScopeText").textContent = scope;
  document.getElementById("aiBrandContext").textContent = brandContext;
  document.getElementById("aiTabContext").textContent = tabContext;
}

function openAiChat() {
  updateAiContext();
  const mask = document.getElementById("aiChatMask");
  mask.classList.add("active");
  mask.setAttribute("aria-hidden", "false");
  document.getElementById("aiFloatBall").classList.add("hidden");
  window.setTimeout(() => document.getElementById("aiInput").focus(), 0);
}

function closeAiChat() {
  const mask = document.getElementById("aiChatMask");
  mask.classList.remove("active");
  mask.setAttribute("aria-hidden", "true");
  document.getElementById("aiFloatBall").classList.remove("hidden");
}

function activatePanel(panelId) {
  const button = document.querySelector(`.workspace-tabs button[data-tab="${panelId}"]`);
  if (button) activateTab(button);
}

function focusBrandRulePanel(subPanelId) {
  setView("brandSettingsView");
  activatePanel("brandRulePanel");
  if (subPanelId) activatePanel(subPanelId);
  updateAiContext();
}

function addAiMessage(role, content, isHtml = false) {
  const list = document.getElementById("aiMessages");
  const message = document.createElement("div");
  message.className = `ai-message ${role}`;

  const avatar = document.createElement("div");
  avatar.className = "ai-avatar";
  avatar.textContent = role === "user" ? "我" : "AI";

  const bubble = document.createElement("div");
  bubble.className = "ai-bubble";
  if (isHtml) {
    bubble.innerHTML = content;
  } else {
    bubble.innerHTML = `<p>${escapeHtml(content)}</p>`;
  }

  message.append(avatar, bubble);
  list.appendChild(message);
  list.scrollTop = list.scrollHeight;
}

function addCategoryRuleByAi(prompt) {
  const category = prompt.includes("鞋") ? "鞋履" : prompt.includes("配件") ? "配件" : "鞋履";
  const alias = category === "配件" ? "配件商品" : "鞋靴";
  const existing = rules.find((item) => item.brandCode === state.currentBrandCode && item.category === category);
  focusBrandRulePanel("categoryRulePanel");

  if (!existing) {
    rules.unshift({
      brandCode: state.currentBrandCode,
      category,
      alias,
      taxCode: "1040201000000000000",
      taxName: "服装",
      rate: "13%",
      policy: "无",
      updated: "2026-07-07 10:30",
    });
    renderRules();
    showToast("AI 已新增商品大类匹配规则");
  }

  return `
    <div class="ai-result-card">
      <strong>${existing ? "商品大类规则已存在" : "AI 已直接新增商品大类规则"}</strong>
      <ul>
        <li>商品大类：${escapeHtml(category)}</li>
        <li>大类别名：${escapeHtml(alias)}</li>
        <li>税收分类编码：1040201000000000000</li>
        <li>税率：13%，优惠政策：无</li>
      </ul>
    </div>
  `;
}

function updateTaxNoByAi(prompt) {
  const target = prompt.includes("南京")
    ? taxNos.find((item) => item.name.includes("南京"))
    : taxNos.find((item) => !item.enabled) || taxNos[0];
  if (!target) return "<p>未找到可操作的纳税人。</p>";
  const shouldDisable = prompt.includes("禁用") || prompt.includes("关闭");
  const shouldEnable = prompt.includes("开启") || prompt.includes("启用") || !shouldDisable;
  target.enabled = shouldEnable;
  target.reason = "-";
  target.updated = "2026-07-07 10:30";
  setView("einvoiceView");
  activatePanel("taxNoPanel");
  renderTaxNos();
  renderStores();
  updateAiContext();
  showToast(`AI 已${shouldEnable ? "开启" : "禁用"}纳税人开票能力`);

  return `
    <div class="ai-result-card">
      <strong>AI 已直接${shouldEnable ? "开启" : "禁用"}纳税人开票能力</strong>
      <ul>
        <li>纳税人名称：${escapeHtml(target.name)}</li>
        <li>税号：${escapeHtml(target.taxNo)}</li>
        <li>当前状态：${shouldEnable ? "启用" : "禁用"}</li>
      </ul>
    </div>
  `;
}

function addPaymentByAi(prompt) {
  const code = prompt.includes("积分") ? "POINTS" : "COUPON";
  const desc = prompt.includes("积分") ? "积分抵扣" : "优惠券";
  const existing = payments.find((item) => item.code === code);
  setView("brandSettingsView");
  activatePanel("brandPaymentPanel");
  updateAiContext();

  if (!existing) {
    payments.unshift({
      code,
      desc,
      status: "启用",
      updated: "2026-07-07 10:30",
    });
    renderPayments();
    showToast("AI 已新增不可开票支付方式");
  }

  return `
    <div class="ai-result-card">
      <strong>${existing ? "不可开票支付方式已存在" : "AI 已直接新增不可开票支付方式"}</strong>
      <ul>
        <li>支付方式编号：${escapeHtml(code)}</li>
        <li>支付方式名称：${escapeHtml(desc)}</li>
        <li>命中支付方式的金额不计入零售订单可开票金额。</li>
      </ul>
    </div>
  `;
}

function getAiResponse(prompt) {
  const currentBrandRules = rules.filter((item) => item.brandCode === state.currentBrandCode);
  const currentDefaultRules = defaultTaxCodes.filter((item) => item.brandCode === state.currentBrandCode);
  const disabledTaxNos = taxNos.filter((item) => !item.enabled);
  const disabledStores = stores.filter((item) => !item.enabled);

  if (prompt.includes("检查")) {
    return `
      <div class="ai-result-card">
        <strong>配置检查结果</strong>
        <ul>
          <li>当前品牌有 ${currentBrandRules.length} 条商品大类匹配规则。</li>
          <li>当前品牌有 ${currentDefaultRules.length} 条按税号匹配规则。</li>
          <li>${disabledTaxNos.length} 个纳税人处于禁用状态，使用该税号的订单不可开票。</li>
          <li>${disabledStores.length} 个门店处于禁用状态，涉及门店的零售订单不可开票。</li>
        </ul>
      </div>
    `;
  }

  if (prompt.includes("商品大类") || prompt.includes("鞋履") || prompt.includes("配件")) {
    return addCategoryRuleByAi(prompt);
  }

  if (prompt.includes("税号") || prompt.includes("纳税人")) {
    return updateTaxNoByAi(prompt);
  }

  if (prompt.includes("支付")) {
    return addPaymentByAi(prompt);
  }

  return `
    <div class="ai-result-card">
      <strong>未识别到可直接执行的配置动作</strong>
      <ul>
        <li>可以输入“新增鞋履商品大类规则”。</li>
        <li>可以输入“开启南京税号”或“禁用南京税号”。</li>
        <li>可以输入“新增优惠券不可开票支付方式”。</li>
      </ul>
    </div>
  `;
}

function sendAiMessage(promptValue = "") {
  const input = document.getElementById("aiInput");
  const prompt = (promptValue || input.value).trim();
  if (!prompt) return;
  addAiMessage("user", prompt);
  input.value = "";
  window.setTimeout(() => addAiMessage("assistant", getAiResponse(prompt), true), 180);
}

function bindEvents() {
  document.getElementById("enterEinvoiceBtn").addEventListener("click", () => setView("einvoiceView"));
  document.getElementById("backCustomerProductsBtn").addEventListener("click", () => setView("productsView"));
  document.getElementById("backEinvoiceBtn").addEventListener("click", () => setView("einvoiceView"));
  document.getElementById("backTaxNoListBtn").addEventListener("click", backToTaxNoList);
  document.getElementById("editTaxNoBasicBtn").addEventListener("click", () => setTaxNoBasicInfoMode(true));
  document.getElementById("cancelTaxNoBasicBtn").addEventListener("click", () => {
    renderTaxNoDetail();
    setTaxNoBasicInfoMode(false);
  });
  document.getElementById("saveTaxNoBasicBtn").addEventListener("click", saveTaxNoBasicInfo);
  document.getElementById("detailTaxpayerType").addEventListener("change", () => syncTaxCalculationFields({ taxpayerTypeChanged: true }));
  document.getElementById("detailTaxMethod").addEventListener("change", () => syncTaxCalculationFields());
  document.getElementById("storeSearch").addEventListener("input", renderStores);

  document.querySelectorAll("[data-customer-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-customer-tab]").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".customer-tab-panel").forEach((panel) => panel.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.customerTab).classList.add("active");
    });
  });

  document.querySelectorAll(".workspace-tabs button[data-tab]").forEach((button) => {
    button.addEventListener("click", () => activateTab(button));
  });

  document.body.addEventListener("click", (event) => {
    const drawerMask = event.target.closest(".drawer-mask");
    if (drawerMask && event.target === drawerMask) {
      closeModal(drawerMask.id);
      return;
    }
    const statusActionBtn = event.target.closest("[data-status-action]");
    if (statusActionBtn) {
      event.stopPropagation();
      openStatusPopover(statusActionBtn, statusActionBtn.dataset.kind, statusActionBtn.dataset.id, statusActionBtn.dataset.statusAction);
      return;
    }
    if (!event.target.closest("#statusPopover")) closeStatusPopover();
    const closeBtn = event.target.closest("[data-close]");
    if (closeBtn) closeModal(closeBtn.dataset.close);
    const brandBtn = event.target.closest("[data-brand-code]");
    if (brandBtn) openBrandSettings(brandBtn.dataset.brandCode);
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
      closeAiChat();
    }
  });
  document.getElementById("aiFloatBall").addEventListener("click", openAiChat);
  document.getElementById("closeAiChatBtn").addEventListener("click", closeAiChat);
  document.getElementById("aiChatMask").addEventListener("click", (event) => {
    if (event.target.id === "aiChatMask") closeAiChat();
  });
  document.getElementById("sendAiMessageBtn").addEventListener("click", () => sendAiMessage());
  document.getElementById("aiInput").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    sendAiMessage();
  });
  document.querySelectorAll("[data-ai-prompt]").forEach((button) => {
    button.addEventListener("click", () => sendAiMessage(button.dataset.aiPrompt));
  });
  document.getElementById("addRuleBtn").addEventListener("click", () => openRuleModal());
  document.getElementById("confirmRuleBtn").addEventListener("click", confirmRule);
  document.getElementById("ruleTaxCode").addEventListener("input", (event) => {
    document.getElementById("ruleTaxName").value = taxCodeNames[event.target.value.trim()] || "";
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
  document.getElementById("importRuleBtn").addEventListener("click", () => openModal("importModal"));
  document.getElementById("mockImportBtn").addEventListener("click", () => {
    rules.unshift({
      brandCode: state.currentBrandCode,
      category: "鞋履",
      alias: "鞋靴",
      taxCode: "1040201000000000000",
      taxName: "服装",
      rate: "13%",
      policy: "无",
      updated: "2026-07-07 10:30",
    });
    closeModal("importModal");
    renderRules();
    showToast("已导入 1 条商品开票规则");
  });

  document.getElementById("addPaymentBtn").addEventListener("click", () => openPaymentModal());
  document.getElementById("confirmPaymentBtn").addEventListener("click", confirmPayment);
  document.getElementById("addDefaultTaxCodeBtn").addEventListener("click", () => openDefaultTaxCodeModal());
  document.getElementById("importDefaultTaxCodeBtn").addEventListener("click", () => openModal("defaultImportModal"));
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
  document.getElementById("defaultTaxNo").addEventListener("input", (event) => {
    const taxpayerName = getTaxpayerNameByTaxNo(event.target.value.trim());
    if (taxpayerName) document.getElementById("defaultTaxpayerName").value = taxpayerName;
  });
  document.getElementById("defaultTaxCode").addEventListener("input", (event) => {
    const taxName = taxCodeNames[event.target.value.trim()];
    if (taxName) document.getElementById("defaultTaxName").value = taxName;
  });
  document.getElementById("mockDefaultImportBtn").addEventListener("click", () => {
    defaultTaxCodes.unshift({
      brandCode: state.currentBrandCode,
      taxNo: "91310115MA1K3DEMOA",
      taxpayerName: "上海我有示例商贸有限公司",
      alias: "配件商品",
      taxCode: "1040207000000000000",
      taxName: "箱包",
      rate: "13%",
      policy: "无",
      updated: "2026-07-07 10:30",
    });
    closeModal("defaultImportModal");
    renderDefaultTaxCodes();
    showToast("已导入 1 条税号匹配规则");
  });
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
  document.getElementById("editPageBtn").addEventListener("click", editPageSetting);
  document.getElementById("savePageBtn").addEventListener("click", savePageSetting);
  document.getElementById("cancelPageBtn").addEventListener("click", cancelPageSetting);

  document.querySelectorAll(".theme-chip").forEach((button) => {
    button.addEventListener("click", () => updatePreviewTheme(button.dataset.theme));
  });
  document.querySelectorAll(".editor-toolbar button").forEach((button) => {
    button.addEventListener("click", () => {
      document.execCommand(button.dataset.command, false);
      updatePreviewNote();
    });
  });
  document.getElementById("invoiceNote").addEventListener("input", updatePreviewNote);

}

syncEntrySettingViews();
syncSelfReissueView();
syncItemNameSourceView();
updatePreviewTheme(state.entryTheme);
updatePreviewNote();
renderTaxNos();
renderBrands();
renderStores();
renderRules();
renderDefaultTaxCodes();
renderPayments();
bindEvents();
syncTabSemantics();
