const companyState = {
  keyword: "",
  type: "",
  invoiceStatus: "",
  enableCompanyId: null,
  enableStep: 1,
  batchMode: "create",
  batchStep: 1,
  batchFileName: "",
  batchRows: [],
  detailCompanyId: null,
  detailTab: "companyFunctionStatusPanel",
  branchKeyword: "",
  storeFilters: { brand: "", name: "", storeNo: "", storeId: "" },
  storePickerFilters: { brand: "", name: "", storeNo: "", storeId: "" },
  storePickerOnlyAvailable: false,
  selectedStoreIds: new Set(),
  removingStoreId: null,
};

const companies = [
  { id: "company-1", companyCode: "G-COMP-001", name: "中国石油天然气集团有限公司", uscc: "91110000100010433L", type: "Branch", parentId: "company-3", parent: "上海悦投贸易有限公司", invoiceStatus: "Unopened", createdAt: "2026-06-18 10:20", remark: "集团旗下零售业务公司" },
  { id: "company-2", companyCode: "G-COMP-002", name: "上海烟草集团有限责任公司", uscc: "913100001322004345", type: "Branch", parentId: "company-3", parent: "上海悦投贸易有限公司", invoiceStatus: "Opening", createdAt: "2026-06-20 14:35", remark: "华东区域分公司", application: { taxpayerType: "一般纳税人", taxMethod: "一般计税", levyRate: "-", name: "张珺", phone: "13812346801", role: "办税员", email: "invoice@sqb-demo.cn", submittedAt: "2026-07-20 15:18" } },
  { id: "company-3", companyCode: "G-COMP-003", name: "上海悦投贸易有限公司", uscc: "91310120MA1HRP974K", type: "Head", parentId: "", parent: "-", invoiceStatus: "Opened", createdAt: "2026-06-16 09:18", remark: "集团开票主体总公司", application: { taxpayerType: "一般纳税人", taxMethod: "简易计税", levyRate: "3%", name: "刘辰浩", phone: "13912345678", role: "财务负责人", email: "finance@sqb-demo.cn", submittedAt: "2026-07-19 10:05" } },
  { id: "company-4", companyCode: "G-COMP-004", name: "华东示例商贸有限公司", uscc: "91310115MA1FAIL001", type: "Branch", parentId: "company-3", parent: "上海悦投贸易有限公司", invoiceStatus: "Failed", createdAt: "2026-06-22 16:42", remark: "待核对工商登记信息", failureReason: "企业工商信息与税务局备案不一致，请核实统一社会信用代码", application: { taxpayerType: "小规模纳税人", taxMethod: "简易计税", levyRate: "3%", name: "李玥", phone: "13912345678", role: "办税员", email: "invoice-fail@sqb-demo.cn", submittedAt: "2026-07-18 09:42" } },
];

const groupStores = [
  { id: "161247749031", storeNo: "050013", name: "福州华荣馆", brand: "华祥苑", companyId: "company-1" },
  { id: "161247749724", storeNo: "7256", name: "上海环球港", brand: "Ralph Lauren", companyId: "company-1" },
  { id: "161247749721", storeNo: "011367", name: "苏州中心店", brand: "Ubras", companyId: "company-1" },
  { id: "161247750102", storeNo: "SHDMSD091B", name: "上海闵行中庚漫游城", brand: "林清轩", companyId: "company-2" },
  { id: "161247750103", storeNo: "WX-HLGC1", name: "MAIA ACTIVE 恒隆广场", brand: "MAIA ACTIVE", companyId: "company-3" },
  { id: "161247750104", storeNo: "BJ-SKP01", name: "北京 SKP 店", brand: "Ralph Lauren", companyId: "" },
  { id: "161247750105", storeNo: "HZ-MIXC08", name: "杭州万象城店", brand: "Ubras", companyId: "" },
  { id: "161247750106", storeNo: "NJ-IFC06", name: "南京德基店", brand: "林清轩", companyId: "company-4" },
  { id: "161247750107", storeNo: "SZ-COCO9", name: "深圳星河 COCO Park 店", brand: "MAIA ACTIVE", companyId: "" },
];

const batchTasks = [
  {
    id: "TASK-20260720-002",
    type: "ENABLE_INVOICE",
    fileName: "集团公司批量开通发票.xlsx",
    operator: "刘辰浩",
    createdAt: "2026-07-20 15:18",
    status: "ExecutionCompleted",
    total: 3,
    pass: 2,
    fail: 1,
    success: 2,
    executeFail: 0,
    skipped: 1,
    rows: [
      { row: 1, uscc: "91110000100010433L", name: "中国石油天然气集团有限公司", taxpayerType: "一般纳税人", taxMethod: "一般计税", levyRate: "-", check: "通过", execute: "成功", reason: "-" },
      { row: 2, uscc: "913100001322004345", name: "上海烟草集团有限责任公司", taxpayerType: "一般纳税人", taxMethod: "简易计税", levyRate: "3%", check: "通过", execute: "成功", reason: "-" },
      { row: 3, uscc: "91310120MA1HRP974K", name: "上海悦投贸易有限公司", taxpayerType: "一般纳税人", taxMethod: "一般计税", levyRate: "-", check: "不通过", execute: "跳过", reason: "公司已开通发票功能" },
    ],
  },
  {
    id: "TASK-20260719-001",
    type: "CREATE_COMPANY",
    fileName: "集团公司批量创建.xlsx",
    operator: "刘辰浩",
    createdAt: "2026-07-19 10:05",
    status: "ExecutionCompleted",
    total: 3,
    pass: 3,
    fail: 0,
    success: 3,
    executeFail: 0,
    skipped: 0,
    rows: [
      { row: 1, uscc: "91310120MA1HRP974K", name: "上海悦投贸易有限公司", check: "通过", execute: "成功", reason: "-" },
      { row: 2, uscc: "91110000100010433L", name: "中国石油天然气集团有限公司", check: "通过", execute: "成功", reason: "-" },
      { row: 3, uscc: "913100001322004345", name: "上海烟草集团有限责任公司", check: "通过", execute: "成功", reason: "-" },
    ],
  },
];

function companySafe(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function companyStatusMeta(status) {
  const map = {
    Unopened: { label: "未开通", className: "status-unopened" },
    Opening: { label: "开通中", className: "status-opening" },
    Opened: { label: "已开通", className: "status-opened" },
    Failed: { label: "开通失败", className: "status-failed" },
  };
  return map[status] || map.Unopened;
}

function renderCompanies() {
  const keyword = companyState.keyword.toLowerCase();
  const rows = companies.filter((company) => {
    const matchesKeyword = !keyword || company.name.toLowerCase().includes(keyword) || company.uscc.toLowerCase().includes(keyword);
    return matchesKeyword && (!companyState.type || company.type === companyState.type) && (!companyState.invoiceStatus || company.invoiceStatus === companyState.invoiceStatus);
  });
  document.getElementById("companyTotal").textContent = `共${rows.length}条`;
  document.getElementById("companyRows").innerHTML = rows.length
    ? rows.map((company) => {
      const status = companyStatusMeta(company.invoiceStatus);
      return `<tr>
        <td>${companySafe(company.name)}</td><td>${companySafe(company.uscc)}</td>
        <td><span class="company-type ${company.type === "Head" ? "head-office" : "branch"}">${company.type === "Head" ? "总公司" : "分公司"}</span></td>
        <td>${companySafe(company.parent || "-")}</td><td><span class="company-invoice-status ${status.className}">${status.label}</span></td>
        <td><div class="company-row-actions"><button class="link-btn" data-company-detail="${company.id}">详情</button><span class="separator">|</span><button class="link-btn" data-company-invoice-action="enable" data-company-id="${company.id}">开通</button></div></td>
      </tr>`;
    }).join("")
    : '<tr><td colspan="6" class="empty-cell">未找到匹配的公司</td></tr>';
}

function getCompanyDetail() {
  return companies.find((company) => company.id === companyState.detailCompanyId);
}

function companyFunctionDescription(company) {
  const descriptions = {
    Unopened: "尚未开通发票功能",
    Opening: "已提交开通申请，运营处理中",
    Opened: "发票功能已开通",
    Failed: "开通失败，请查看原因并重新提交",
  };
  return descriptions[company.invoiceStatus] || descriptions.Unopened;
}

function activateCompanyDetailTab(panelId) {
  const company = getCompanyDetail();
  if (!company || (panelId === "companyBranchesPanel" && company.type !== "Head")) panelId = "companyFunctionStatusPanel";
  companyState.detailTab = panelId;
  document.querySelectorAll("[data-company-detail-tab]").forEach((button) => button.classList.toggle("active", button.dataset.companyDetailTab === panelId));
  document.querySelectorAll(".company-detail-tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === panelId));
}

function getStoreFilterValues(prefix) {
  return {
    brand: document.getElementById(`${prefix}BrandFilter`).value,
    name: document.getElementById(`${prefix}NameFilter`).value.trim(),
    storeNo: document.getElementById(`${prefix}NoFilter`).value.trim(),
    storeId: document.getElementById(`${prefix}IdFilter`).value.trim(),
  };
}

function resetStoreFilterInputs(prefix) {
  [`${prefix}BrandFilter`, `${prefix}NameFilter`, `${prefix}NoFilter`, `${prefix}IdFilter`].forEach((id) => { document.getElementById(id).value = ""; });
}

function storeMatchesFilters(store, filters) {
  return (!filters.brand || store.brand === filters.brand)
    && (!filters.name || store.name.toLowerCase().includes(filters.name.toLowerCase()))
    && (!filters.storeNo || store.storeNo === filters.storeNo)
    && (!filters.storeId || store.id === filters.storeId);
}

function renderCompanyStores() {
  const company = getCompanyDetail();
  if (!company) return;
  const stores = groupStores.filter((store) => store.companyId === company.id && storeMatchesFilters(store, companyState.storeFilters));
  document.getElementById("companyStoreTotal").textContent = `共${stores.length}条`;
  document.getElementById("companyStoreRows").innerHTML = stores.length ? stores.map((store) => `<tr>
    <td>${companySafe(store.name)}</td><td>${companySafe(store.storeNo)}</td><td>${companySafe(store.id)}</td><td>${companySafe(store.brand)}</td><td><button class="link-btn danger" data-company-store-remove="${store.id}">移除</button></td>
  </tr>`).join("") : '<tr><td colspan="5" class="empty-cell">暂无匹配的已关联门店</td></tr>';
}

function renderStorePicker() {
  const company = getCompanyDetail();
  if (!company) return;
  const stores = groupStores.filter((store) => storeMatchesFilters(store, companyState.storePickerFilters) && (!companyState.storePickerOnlyAvailable || !store.companyId));
  document.getElementById("storePickerTotal").textContent = `共${stores.length}条`;
  document.getElementById("storePickerRows").innerHTML = stores.length ? stores.map((store) => {
    const linkedCurrent = store.companyId === company.id;
    const linkedOther = Boolean(store.companyId && !linkedCurrent);
    const linkedCompany = companies.find((item) => item.id === store.companyId);
    const disabled = linkedCurrent || linkedOther;
    const explanation = linkedCurrent ? "已关联当前公司" : linkedOther ? `不可添加，已关联到【${linkedCompany?.name || "其他公司"}】` : "-";
    return `<tr class="${disabled ? "store-row-disabled" : ""}">
      <td class="checkbox-col"><input type="checkbox" data-store-picker-id="${store.id}" ${disabled ? "disabled" : ""} ${companyState.selectedStoreIds.has(store.id) ? "checked" : ""} aria-label="选择${companySafe(store.name)}" /></td>
      <td>${companySafe(store.name)}</td><td>${companySafe(store.storeNo)}</td><td>${companySafe(store.id)}</td><td>${companySafe(store.brand)}</td><td class="${linkedOther ? "danger-text" : "muted-text"}">${companySafe(explanation)}</td>
    </tr>`;
  }).join("") : '<tr><td colspan="6" class="empty-cell">未找到匹配的集团门店</td></tr>';
  const available = stores.filter((store) => !store.companyId);
  const selectAll = document.getElementById("selectAllAvailableStores");
  selectAll.disabled = available.length === 0;
  selectAll.checked = available.length > 0 && available.every((store) => companyState.selectedStoreIds.has(store.id));
  selectAll.indeterminate = available.some((store) => companyState.selectedStoreIds.has(store.id)) && !selectAll.checked;
  document.getElementById("storePickerSelectedCount").textContent = companyState.selectedStoreIds.size;
  document.getElementById("confirmManageStoresBtn").disabled = companyState.selectedStoreIds.size === 0;
}

function openManageStores() {
  companyState.storePickerFilters = { brand: "", name: "", storeNo: "", storeId: "" };
  companyState.storePickerOnlyAvailable = false;
  companyState.selectedStoreIds.clear();
  resetStoreFilterInputs("storePicker");
  document.getElementById("storePickerOnlyAvailable").checked = false;
  renderStorePicker();
  openModal("manageStoresModal");
}

function confirmManageStores() {
  const company = getCompanyDetail();
  if (!company || companyState.selectedStoreIds.size === 0) return;
  groupStores.forEach((store) => {
    if (companyState.selectedStoreIds.has(store.id) && !store.companyId) store.companyId = company.id;
  });
  const count = companyState.selectedStoreIds.size;
  companyState.selectedStoreIds.clear();
  closeModal("manageStoresModal");
  renderCompanyStores();
  showToast(`已添加 ${count} 家管理门店`);
}

function openRemoveStoreConfirm(storeId) {
  const store = groupStores.find((item) => item.id === storeId && item.companyId === companyState.detailCompanyId);
  if (!store) return;
  companyState.removingStoreId = storeId;
  document.getElementById("removeStoreName").textContent = store.name;
  openModal("removeStoreConfirmModal");
}

function confirmRemoveStore() {
  const store = groupStores.find((item) => item.id === companyState.removingStoreId && item.companyId === companyState.detailCompanyId);
  if (!store) return;
  store.companyId = "";
  companyState.removingStoreId = null;
  closeModal("removeStoreConfirmModal");
  renderCompanyStores();
  showToast("门店关联已解除");
}

function renderCompanyBranches() {
  const company = getCompanyDetail();
  if (!company) return;
  const keyword = companyState.branchKeyword.toLowerCase();
  const branches = companies.filter((item) => item.type === "Branch" && item.parentId === company.id && (!keyword || item.name.toLowerCase().includes(keyword) || item.uscc.toLowerCase().includes(keyword) || (item.companyCode || item.id).toLowerCase().includes(keyword)));
  document.getElementById("companyBranchTotal").textContent = `共${branches.length}条`;
  document.getElementById("companyBranchRows").innerHTML = branches.length ? branches.map((branch) => `<tr>
    <td>${companySafe(branch.name)}</td><td>${companySafe(branch.uscc)}</td><td>${companySafe(branch.remark || "-")}</td><td>${companySafe(branch.companyCode || branch.id)}</td><td>${companySafe(branch.createdAt || "-")}</td><td><button class="link-btn" data-company-detail="${branch.id}">详情</button></td>
  </tr>`).join("") : '<tr><td colspan="6" class="empty-cell">暂无匹配的分公司</td></tr>';
}

function renderCompanyDetail() {
  const company = getCompanyDetail();
  if (!company) return;
  const status = companyStatusMeta(company.invoiceStatus);
  document.getElementById("companyDetailName").textContent = company.name;
  document.getElementById("companyDetailUscc").textContent = company.uscc;
  document.getElementById("companyDetailCode").textContent = company.companyCode || company.id;
  document.getElementById("companyDetailParent").textContent = company.parent || "-";
  document.getElementById("companyDetailCreatedAt").textContent = company.createdAt || "-";
  document.getElementById("companyDetailRemark").textContent = company.remark || "-";
  const typeNode = document.getElementById("companyDetailType");
  typeNode.textContent = company.type === "Head" ? "总公司" : "分公司";
  typeNode.className = `company-type ${company.type === "Head" ? "head-office" : "branch"}`;
  const statusNode = document.getElementById("companyDetailInvoiceStatus");
  statusNode.textContent = status.label;
  statusNode.className = `company-invoice-status ${status.className}`;
  document.getElementById("companyInvoiceFunctionDescription").textContent = companyFunctionDescription(company);
  const failureNode = document.getElementById("companyInvoiceFailureReason");
  failureNode.textContent = company.failureReason || "-";
  failureNode.classList.toggle("hidden", company.invoiceStatus !== "Failed");
  document.getElementById("companyBranchesTab").classList.toggle("hidden", company.type !== "Head");
  if (company.type !== "Head" && companyState.detailTab === "companyBranchesPanel") companyState.detailTab = "companyFunctionStatusPanel";
  activateCompanyDetailTab(companyState.detailTab);
  renderCompanyBranches();
  renderCompanyStores();
}

function openCompanyDetail(companyId) {
  if (!companies.some((company) => company.id === companyId)) return;
  companyState.detailCompanyId = companyId;
  companyState.detailTab = "companyFunctionStatusPanel";
  companyState.branchKeyword = "";
  companyState.storeFilters = { brand: "", name: "", storeNo: "", storeId: "" };
  document.getElementById("companyBranchKeyword").value = "";
  resetStoreFilterInputs("companyStore");
  renderCompanyDetail();
  setView("companyDetailView");
}

function openEditCompany() {
  const company = getCompanyDetail();
  if (!company) return;
  document.getElementById("editCompanyName").textContent = company.name;
  document.getElementById("editCompanyUscc").textContent = company.uscc;
  document.getElementById("editCompanyCode").textContent = company.companyCode || company.id;
  document.getElementById("editCompanyCreatedAt").textContent = company.createdAt || "-";
  document.querySelector(`input[name="editCompanyType"][value="${company.type}"]`).checked = true;
  const parentSelect = document.getElementById("editCompanyParent");
  parentSelect.innerHTML = `<option value="">请选择上级公司</option>${companies.filter((item) => item.type === "Head" && item.id !== company.id).map((item) => `<option value="${item.id}">${companySafe(item.name)}</option>`).join("")}`;
  parentSelect.value = company.parentId || "";
  document.getElementById("editCompanyParentField").classList.toggle("hidden", company.type !== "Branch");
  document.getElementById("editCompanyRemark").value = company.remark || "";
  document.getElementById("editCompanyError").textContent = "";
  openModal("editCompanyDrawer");
}

function saveCompanyDetail() {
  const company = getCompanyDetail();
  if (!company) return;
  const type = document.querySelector('input[name="editCompanyType"]:checked')?.value;
  const parentId = document.getElementById("editCompanyParent").value;
  if (type === "Branch" && !parentId) {
    document.getElementById("editCompanyError").textContent = "请选择上级公司";
    return;
  }
  const parent = companies.find((item) => item.id === parentId);
  company.type = type;
  company.parentId = type === "Branch" ? parentId : "";
  company.parent = type === "Branch" ? parent.name : "-";
  company.remark = document.getElementById("editCompanyRemark").value.trim();
  closeModal("editCompanyDrawer");
  renderCompanies();
  renderCompanyDetail();
  showToast("公司信息已保存");
}

function resetCreateCompanyForm() {
  document.getElementById("newCompanyUscc").value = "";
  document.getElementById("newCompanyName").value = "";
  document.querySelector('input[name="newCompanyBranch"][value="Head"]').checked = true;
  document.getElementById("newCompanyParentField").classList.add("hidden");
  document.getElementById("newCompanyRemark").value = "";
  document.getElementById("createCompanyError").textContent = "";
  document.getElementById("newCompanyParent").innerHTML = companies.filter((company) => company.type === "Head").map((company) => `<option value="${company.id}">${companySafe(company.name)}</option>`).join("");
}

function lookupCompanyName() {
  const input = document.getElementById("newCompanyUscc");
  const nameInput = document.getElementById("newCompanyName");
  const error = document.getElementById("createCompanyError");
  input.value = input.value.trim().toUpperCase();
  if (!input.value) return;
  if (!/^[0-9A-Z]{18}$/.test(input.value)) {
    error.textContent = "统一社会信用代码格式不正确，请输入18位数字或大写字母";
    nameInput.value = "";
    return;
  }
  const existing = companies.find((company) => company.uscc === input.value);
  if (existing) {
    error.textContent = "该统一社会信用代码已存在，请勿重复创建";
    nameInput.value = existing.name;
    return;
  }
  error.textContent = "";
  nameInput.value = `新建示例企业 ${input.value.slice(-4)} 有限公司`;
}

function confirmCreateCompany() {
  lookupCompanyName();
  const uscc = document.getElementById("newCompanyUscc").value;
  const name = document.getElementById("newCompanyName").value;
  const error = document.getElementById("createCompanyError");
  if (!uscc || !name || error.textContent) return;
  const type = document.querySelector('input[name="newCompanyBranch"]:checked').value;
  const parentSelect = document.getElementById("newCompanyParent");
  if (type === "Branch" && !parentSelect.value) {
    error.textContent = "请选择上级公司";
    return;
  }
  companies.unshift({
    id: `company-${Date.now()}`,
    companyCode: `G-COMP-${String(companies.length + 1).padStart(3, "0")}`,
    name,
    uscc,
    type,
    parentId: type === "Branch" ? parentSelect.value : "",
    parent: type === "Branch" ? parentSelect.options[parentSelect.selectedIndex].text : "-",
    invoiceStatus: "Unopened",
    createdAt: new Date().toLocaleString("zh-CN", { hour12: false }).replaceAll("/", "-"),
    remark: document.getElementById("newCompanyRemark").value.trim(),
  });
  closeModal("createCompanyDrawer");
  renderCompanies();
  showToast("公司创建成功");
}

function validateInvoiceTaxConfig(taxpayerType, taxMethod, levyRate) {
  if (!taxpayerType) return "请选择纳税人类型";
  if (!taxMethod) return "请选择计税方式";
  if (taxpayerType === "小规模纳税人" && taxMethod !== "简易计税") return "小规模纳税人仅支持简易计税";
  if (taxMethod === "一般计税" && levyRate !== "-") return "一般计税不配置征收率";
  if (taxMethod === "简易计税" && !["1%", "3%", "5%"].includes(levyRate)) return "简易计税必须选择征收率";
  return "";
}

function syncEnableInvoiceTaxFields({ taxpayerTypeChanged = false, levyRateValue } = {}) {
  const taxpayerType = document.getElementById("enableTaxpayerType");
  const taxMethod = document.getElementById("enableTaxMethod");
  const levyRate = document.getElementById("enableLevyRate");
  const requestedLevyRate = levyRateValue ?? levyRate.value;
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
  document.getElementById("enableLevyRateRequired").classList.toggle("hidden", !usesSimpleTax);
  if (usesSimpleTax) {
    levyRate.innerHTML = "<option>1%</option><option>3%</option><option>5%</option>";
    levyRate.value = ["1%", "3%", "5%"].includes(requestedLevyRate) ? requestedLevyRate : "3%";
  } else {
    levyRate.innerHTML = '<option value="-">不适用</option>';
    levyRate.value = "-";
  }
}

function setEnableInvoiceStep(step) {
  companyState.enableStep = step;
  document.querySelectorAll(".invoice-enable-step").forEach((item) => item.classList.toggle("active", Number(item.dataset.enableStep) === step));
  document.getElementById("enableInvoiceTitle").textContent = step === 1 ? "开通功能" : "开通发票功能";
  document.getElementById("enableInvoicePrevBtn").classList.toggle("hidden", step === 1);
  document.getElementById("enableInvoiceNextBtn").classList.toggle("hidden", step !== 1);
  document.getElementById("submitEnableInvoiceBtn").classList.toggle("hidden", step !== 2);
}

function openEnableInvoice(companyId) {
  const company = companies.find((item) => item.id === companyId);
  if (!company) return;
  companyState.enableCompanyId = companyId;
  document.getElementById("enableCompanyName").textContent = company.name;
  document.getElementById("enableCompanyUscc").textContent = company.uscc;
  document.getElementById("enableTaxpayerName").textContent = company.name;
  document.getElementById("enableTaxNo").textContent = company.uscc;
  const status = companyStatusMeta(company.invoiceStatus);
  const statusNode = document.getElementById("enableCompanyStatus");
  statusNode.textContent = status.label;
  statusNode.className = `status-tag ${status.className}`;
  const functionOption = document.querySelector("#enableInvoiceDrawer .invoice-function-option");
  const functionCheckbox = document.getElementById("invoiceFunctionSelected");
  const functionDescription = document.getElementById("invoiceFunctionDescription");
  const viewSubmissionBtn = document.getElementById("viewInvoiceSubmissionBtn");
  const isReadonly = company.invoiceStatus === "Opening" || company.invoiceStatus === "Opened";
  functionOption.classList.toggle("is-failed", company.invoiceStatus === "Failed");
  functionOption.classList.toggle("is-readonly", isReadonly);
  functionCheckbox.checked = company.invoiceStatus !== "Opened";
  functionCheckbox.disabled = isReadonly;
  const descriptions = {
    Unopened: "可发起开通",
    Failed: `失败原因：${company.failureReason}`,
    Opening: "发票功能开通处理中，请稍后再试",
    Opened: "发票功能已开通，无需重复开通",
  };
  functionDescription.textContent = descriptions[company.invoiceStatus] || descriptions.Unopened;
  viewSubmissionBtn.classList.toggle("hidden", company.invoiceStatus !== "Opening");
  document.getElementById("enableInvoiceNextBtn").disabled = isReadonly;
  document.getElementById("enableInvoicerName").value = company.application?.name || "";
  document.getElementById("enableTaxpayerType").value = company.application?.taxpayerType || "一般纳税人";
  document.getElementById("enableTaxMethod").value = company.application?.taxMethod || "一般计税";
  syncEnableInvoiceTaxFields({ levyRateValue: company.application?.levyRate || "-" });
  document.getElementById("enableTaxPhone").value = company.application?.phone || "";
  document.getElementById("enableTaxPassword").value = "";
  document.getElementById("enableInvoicerRole").value = company.application?.role || "开票员";
  document.getElementById("enableContactEmail").value = company.application?.email || "";
  const failureBanner = document.getElementById("enablePreviousFailureBanner");
  failureBanner.classList.toggle("hidden", company.invoiceStatus !== "Failed");
  document.getElementById("enablePreviousFailureReason").textContent = company.failureReason || "-";
  document.getElementById("enableInvoiceError").textContent = "";
  document.getElementById("enableTaxMethodHelpPopover").classList.add("hidden");
  document.getElementById("enableTaxMethodHelpBtn").setAttribute("aria-expanded", "false");
  setEnableInvoiceStep(1);
  openModal("enableInvoiceDrawer");
}

function submitEnableInvoice() {
  const taxpayerType = document.getElementById("enableTaxpayerType").value;
  const taxMethod = document.getElementById("enableTaxMethod").value;
  const levyRate = document.getElementById("enableLevyRate").value;
  const name = document.getElementById("enableInvoicerName").value.trim();
  const phone = document.getElementById("enableTaxPhone").value.trim();
  const password = document.getElementById("enableTaxPassword").value;
  const email = document.getElementById("enableContactEmail").value.trim();
  const error = document.getElementById("enableInvoiceError");
  const taxConfigError = validateInvoiceTaxConfig(taxpayerType, taxMethod, levyRate);
  if (taxConfigError) {
    error.textContent = taxConfigError;
    return;
  }
  if (!name || !/^1\d{10}$/.test(phone) || !password) {
    error.textContent = "请完整填写开票人姓名、11位税局登录手机号和税局密码";
    return;
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    error.textContent = "联系邮箱格式不正确";
    return;
  }
  const company = companies.find((item) => item.id === companyState.enableCompanyId);
  if (!company) return;
  company.invoiceStatus = "Opening";
  company.failureReason = "";
  company.application = { taxpayerType, taxMethod, levyRate, name, phone, role: document.getElementById("enableInvoicerRole").value, email, submittedAt: new Date().toLocaleString("zh-CN", { hour12: false }).replaceAll("/", "-") };
  closeModal("enableInvoiceDrawer");
  renderCompanies();
  if (companyState.detailCompanyId === company.id) renderCompanyDetail();
  showToast("发票开通申请已提交");
}

function openInvoiceProgress(companyId) {
  const company = companies.find((item) => item.id === companyId);
  if (!company) return;
  document.getElementById("progressCompanyName").textContent = company.name;
  document.getElementById("progressCompanyUscc").textContent = company.uscc;
  document.getElementById("progressTaxpayerType").textContent = company.application?.taxpayerType || "-";
  document.getElementById("progressTaxMethod").textContent = company.application?.taxMethod || "-";
  document.getElementById("progressLevyRate").textContent = company.application?.levyRate === "-" ? "不适用" : (company.application?.levyRate || "-");
  document.getElementById("progressCompanyStatus").textContent = companyStatusMeta(company.invoiceStatus).label;
  const progressCard = document.getElementById("invoiceProgressStatusCard");
  progressCard.classList.toggle("is-opened", company.invoiceStatus === "Opened");
  document.getElementById("progressCompanyStatusDescription").textContent = company.invoiceStatus === "Opened" ? "发票功能已开通" : "已提交开通申请，运营处理中";
  document.getElementById("progressSubmittedAt").textContent = company.application?.submittedAt || "-";
  document.getElementById("progressInvoicerName").textContent = company.application?.name || "-";
  document.getElementById("progressTaxPhone").textContent = company.application?.phone || "-";
  document.getElementById("progressInvoicerRole").textContent = company.application?.role || "-";
  document.getElementById("progressContactEmail").textContent = company.application?.email || "-";
  openModal("invoiceProgressDrawer");
}

function buildInvoiceBatchRow(row, input) {
  const company = companies.find((item) => item.uscc === input.uscc);
  let check = "通过";
  let reason = "-";
  if (!company) {
    check = "不通过";
    reason = "当前集团客户下未找到该公司";
  } else if (company.invoiceStatus === "Opening") {
    check = "不通过";
    reason = "已有开通中的申请";
  } else if (company.invoiceStatus === "Opened") {
    check = "不通过";
    reason = "公司已开通发票功能";
  } else {
    const taxConfigError = validateInvoiceTaxConfig(input.taxpayerType, input.taxMethod, input.levyRate);
    if (taxConfigError) {
      check = "不通过";
      reason = taxConfigError;
    }
  }
  return {
    row,
    ...input,
    companyId: company?.id || "",
    name: company?.name || "-",
    current: company ? companyStatusMeta(company.invoiceStatus).label : "-",
    check,
    reason,
  };
}

function getMockBatchRows(mode) {
  if (mode === "create") {
    return [
      { row: 1, uscc: "91310115MA1NEW0001", name: "上海示例商业一有限公司", type: "总公司", parent: "-", check: "通过", reason: "-" },
      { row: 2, uscc: "91310115MA1NEW0002", name: "上海示例商业二有限公司", type: "分公司", parent: "上海示例商业一有限公司", check: "通过", reason: "-" },
      { row: 3, uscc: "91310120MA1HRP974K", name: "上海悦投贸易有限公司", type: "总公司", parent: "-", check: "不通过", reason: "统一社会信用代码已存在" },
    ];
  }
  if (mode === "store") {
    return [
      buildStoreBatchRow(1, { clientNo: "160247730638", uscc: "91110000100010433L", companyName: "", storeNo: "BJ-SKP01", storeName: "北京 SKP 店" }),
      buildStoreBatchRow(2, { clientNo: "160247730638", uscc: "91110000100010433L", companyName: "中国石油天然气集团有限公司", storeNo: "050013", storeName: "" }),
      buildStoreBatchRow(3, { clientNo: "160247730638", uscc: "91110000100010433L", companyName: "", storeNo: "SHDMSD091B", storeName: "上海闵行中庚漫游城" }),
      buildStoreBatchRow(4, { clientNo: "160247730638", uscc: "91310120MA1HRP974K", companyName: "上海悦投贸易有限公司", storeNo: "STORE-NOT-FOUND", storeName: "示例不存在门店" }),
    ];
  }
  return [
    buildInvoiceBatchRow(1, { uscc: "91110000100010433L", taxpayerType: "一般纳税人", taxMethod: "一般计税", levyRate: "-", invoicer: "张珺", phone: "13812346801", role: "办税员" }),
    buildInvoiceBatchRow(2, { uscc: "91310115MA1FAIL001", taxpayerType: "小规模纳税人", taxMethod: "简易计税", levyRate: "3%", invoicer: "李玥", phone: "13912345678", role: "办税员" }),
    buildInvoiceBatchRow(3, { uscc: "913100001322004345", taxpayerType: "一般纳税人", taxMethod: "一般计税", levyRate: "-", invoicer: "张珺", phone: "13812346801", role: "办税员" }),
    buildInvoiceBatchRow(4, { uscc: "91110000100010433L", taxpayerType: "一般纳税人", taxMethod: "简易计税", levyRate: "-", invoicer: "刘辰浩", phone: "13712345678", role: "财务负责人" }),
  ];
}

function buildStoreBatchRow(row, input) {
  let check = "通过";
  let reason = "-";
  const company = companies.find((item) => item.uscc === input.uscc);
  const store = groupStores.find((item) => item.storeNo === input.storeNo);
  if (input.clientNo !== "160247730638") {
    check = "不通过"; reason = "客户编号与当前集团客户不一致";
  } else if (!company) {
    check = "不通过"; reason = "当前集团客户下未找到该公司";
  } else if (input.companyName && input.companyName !== company.name) {
    check = "不通过"; reason = "公司名称与统一社会信用代码不一致";
  } else if (!store) {
    check = "不通过"; reason = "当前集团客户下未找到该门店";
  } else if (input.storeName && input.storeName !== store.name) {
    check = "不通过"; reason = "门店名称与门店编号不一致";
  } else if (store.companyId === company.id) {
    check = "不通过"; reason = "门店已关联当前公司";
  } else if (store.companyId) {
    const linkedCompany = companies.find((item) => item.id === store.companyId);
    check = "不通过"; reason = `门店已关联其他公司：${linkedCompany?.name || "-"}`;
  }
  return { row, ...input, companyId: company?.id || "", storeId: store?.id || "", resolvedCompanyName: company?.name || input.companyName || "-", resolvedStoreName: store?.name || input.storeName || "-", name: company?.name || input.companyName || "-", check, reason };
}

function getBatchModeMeta(mode = companyState.batchMode) {
  const map = {
    create: { title: "批量创建公司", executeLabel: "执行导入", hint: "请下载批量创建公司模板，按模板填写公司信息。", fileName: "集团公司批量创建.xlsx", taskType: "CREATE_COMPANY", fields: ["客户编号", "统一社会信用代码", "是否分公司", "上级公司统一社会信用代码", "公司名称", "备注"] },
    invoice: { title: "批量开通发票申请", executeLabel: "执行申请", hint: "请下载批量开通发票模板，按模板填写税务主体和开票人信息。", fileName: "集团公司批量开通发票.xlsx", taskType: "ENABLE_INVOICE", fields: ["集团编号", "统一社会信用代码", "纳税人类型", "计税方式", "征收率", "开票人姓名", "税局登录手机号", "税局密码", "开票人身份"] },
    store: { title: "批量关联门店", executeLabel: "执行关联", hint: "请下载批量关联门店模板，按模板填写公司和门店信息。", fileName: "集团公司批量关联门店.xlsx", taskType: "ASSOCIATE_STORE", fields: ["客户编号", "统一社会信用代码", "公司名称（选填）", "门店编号", "门店名称（选填）"] },
  };
  return map[mode] || map.create;
}

function setBatchStage(step) {
  companyState.batchStep = step;
  document.querySelectorAll(".batch-stage").forEach((item) => item.classList.toggle("active", Number(item.dataset.batchStage) === step));
  document.querySelectorAll(".batch-step").forEach((item) => {
    const itemStep = Number(item.dataset.batchStep);
    item.classList.toggle("active", itemStep === step);
    item.classList.toggle("completed", itemStep < step);
  });
}

function openBatch(mode) {
  companyState.batchMode = mode;
  companyState.batchFileName = "";
  companyState.batchRows = [];
  const meta = getBatchModeMeta(mode);
  document.getElementById("batchBreadcrumb").textContent = meta.title;
  document.getElementById("batchPageTitle").textContent = meta.title;
  document.getElementById("batchExecuteStepName").textContent = meta.executeLabel;
  document.getElementById("batchTemplateHint").textContent = meta.hint;
  document.getElementById("batchTemplateFields").innerHTML = meta.fields.map((field) => `<span>${companySafe(field)}</span>`).join("");
  document.getElementById("batchFileCard").classList.add("hidden");
  document.getElementById("startBatchCheckBtn").disabled = true;
  setBatchStage(1);
  setView("companyBatchView");
}

function selectMockBatchFile() {
  companyState.batchFileName = getBatchModeMeta().fileName;
  companyState.batchRows = getMockBatchRows(companyState.batchMode);
  document.getElementById("batchFileName").textContent = companyState.batchFileName;
  document.getElementById("batchFileCard").classList.remove("hidden");
  document.getElementById("startBatchCheckBtn").disabled = false;
}

function renderBatchCheck() {
  const isCreate = companyState.batchMode === "create";
  const isStore = companyState.batchMode === "store";
  document.getElementById("batchCheckTotal").textContent = companyState.batchRows.length;
  document.getElementById("batchCheckPass").textContent = companyState.batchRows.filter((item) => item.check === "通过").length;
  document.getElementById("batchCheckFail").textContent = companyState.batchRows.filter((item) => item.check !== "通过").length;
  document.getElementById("executeBatchBtn").textContent = getBatchModeMeta().executeLabel;
  document.getElementById("batchCheckHead").innerHTML = isCreate
    ? "<tr><th>行号</th><th>统一社会信用代码</th><th>公司名称</th><th>是否分公司</th><th>上级公司</th><th>检查结果</th><th>原因</th></tr>"
    : isStore
      ? "<tr><th>行号</th><th>客户编号</th><th>统一社会信用代码</th><th>公司名称</th><th>门店编号</th><th>门店名称</th><th>检查结果</th><th>原因</th></tr>"
      : "<tr><th>行号</th><th>统一社会信用代码</th><th>公司名称</th><th>当前状态</th><th>纳税人类型</th><th>计税方式</th><th>征收率</th><th>开票人姓名</th><th>手机号</th><th>身份</th><th>检查结果</th><th>原因</th></tr>";
  document.getElementById("batchCheckRows").innerHTML = companyState.batchRows.map((item) => {
    const result = `<span class="result-badge ${item.check === "通过" ? "result-success" : "result-fail"}">${item.check}</span>`;
    if (isCreate) return `<tr><td>${item.row}</td><td>${item.uscc}</td><td>${item.name}</td><td>${item.type === "分公司" ? "是" : "否"}</td><td>${item.parent}</td><td>${result}</td><td>${item.reason}</td></tr>`;
    if (isStore) return `<tr><td>${item.row}</td><td>${item.clientNo}</td><td>${item.uscc}</td><td>${companySafe(item.resolvedCompanyName)}</td><td>${companySafe(item.storeNo)}</td><td>${companySafe(item.resolvedStoreName)}</td><td>${result}</td><td>${companySafe(item.reason)}</td></tr>`;
    return `<tr><td>${item.row}</td><td>${item.uscc}</td><td>${item.name}</td><td>${item.current}</td><td>${item.taxpayerType}</td><td>${item.taxMethod}</td><td>${item.levyRate === "-" ? "不适用" : item.levyRate}</td><td>${item.invoicer}</td><td>${item.phone}</td><td>${item.role}</td><td>${result}</td><td>${item.reason}</td></tr>`;
  }).join("");
}

function executeBatch() {
  const passedRows = companyState.batchRows.filter((item) => item.check === "通过");
  companyState.batchRows.forEach((item) => {
    item.execute = item.check === "通过" ? "成功" : "跳过";
    item.executeReason = item.check === "通过" ? "-" : item.reason;
  });
  if (companyState.batchMode === "create") {
    passedRows.forEach((item) => {
      if (companies.some((company) => company.uscc === item.uscc)) return;
      const parent = companies.find((company) => company.name === item.parent);
      companies.push({ id: `company-${Date.now()}-${item.row}`, companyCode: `G-COMP-${String(companies.length + 1).padStart(3, "0")}`, name: item.name, uscc: item.uscc, type: item.type === "分公司" ? "Branch" : "Head", parentId: parent?.id || "", parent: item.parent, invoiceStatus: "Unopened", createdAt: "2026-07-20 20:30", remark: "批量创建" });
    });
  } else if (companyState.batchMode === "invoice") {
    passedRows.forEach((item) => {
      const company = companies.find((entry) => entry.id === item.companyId);
      if (company) {
        company.invoiceStatus = "Opening";
        company.failureReason = "";
        company.application = {
          taxpayerType: item.taxpayerType,
          taxMethod: item.taxMethod,
          levyRate: item.levyRate,
          name: item.invoicer,
          phone: item.phone,
          role: item.role,
          email: "",
          submittedAt: "2026-07-20 20:30",
        };
      }
    });
  } else {
    passedRows.forEach((item) => {
      const store = groupStores.find((entry) => entry.id === item.storeId);
      if (store && !store.companyId) store.companyId = item.companyId;
    });
  }
  const modeMeta = getBatchModeMeta();
  const task = {
    id: `TASK-${Date.now()}`,
    type: modeMeta.taskType,
    fileName: companyState.batchFileName,
    operator: "刘辰浩",
    createdAt: "2026-07-20 20:30",
    status: "ExecutionCompleted",
    total: companyState.batchRows.length,
    pass: passedRows.length,
    fail: companyState.batchRows.length - passedRows.length,
    success: passedRows.length,
    executeFail: 0,
    skipped: companyState.batchRows.length - passedRows.length,
    rows: companyState.batchRows.map((item) => ({ row: item.row, clientNo: item.clientNo, uscc: item.uscc, name: item.name, companyName: item.resolvedCompanyName || item.name, storeNo: item.storeNo, storeName: item.resolvedStoreName, taxpayerType: item.taxpayerType, taxMethod: item.taxMethod, levyRate: item.levyRate, check: item.check, execute: item.execute, reason: item.executeReason })),
  };
  batchTasks.unshift(task);
  renderCompanies();
  renderBatchExecute();
  setBatchStage(3);
}

function renderBatchExecute() {
  const success = companyState.batchRows.filter((item) => item.execute === "成功").length;
  const skipped = companyState.batchRows.filter((item) => item.execute === "跳过").length;
  document.getElementById("batchSuccessCount").textContent = success;
  document.getElementById("batchFailureCount").textContent = "0";
  document.getElementById("batchSkippedCount").textContent = skipped;
  const isStore = companyState.batchMode === "store";
  const isInvoice = companyState.batchMode === "invoice";
  document.getElementById("batchExecuteHead").innerHTML = isStore
    ? "<tr><th>行号</th><th>客户编号</th><th>统一社会信用代码</th><th>公司名称</th><th>门店编号</th><th>门店名称</th><th>执行结果</th><th>原因/备注</th></tr>"
    : isInvoice
      ? "<tr><th>行号</th><th>统一社会信用代码</th><th>公司名称</th><th>纳税人类型</th><th>计税方式</th><th>征收率</th><th>执行结果</th><th>原因/备注</th></tr>"
      : "<tr><th>行号</th><th>统一社会信用代码</th><th>公司名称</th><th>执行结果</th><th>原因/备注</th></tr>";
  document.getElementById("batchExecuteRows").innerHTML = companyState.batchRows.map((item) => {
    const result = `<span class="result-badge ${item.execute === "成功" ? "result-success" : "status-unopened"}">${item.execute}</span>`;
    if (isStore) return `<tr><td>${item.row}</td><td>${item.clientNo}</td><td>${item.uscc}</td><td>${companySafe(item.resolvedCompanyName)}</td><td>${companySafe(item.storeNo)}</td><td>${companySafe(item.resolvedStoreName)}</td><td>${result}</td><td>${companySafe(item.executeReason)}</td></tr>`;
    if (isInvoice) return `<tr><td>${item.row}</td><td>${item.uscc}</td><td>${item.name}</td><td>${item.taxpayerType}</td><td>${item.taxMethod}</td><td>${item.levyRate === "-" ? "不适用" : item.levyRate}</td><td>${result}</td><td>${item.executeReason}</td></tr>`;
    return `<tr><td>${item.row}</td><td>${item.uscc}</td><td>${item.name}</td><td>${result}</td><td>${item.executeReason}</td></tr>`;
  }).join("");
}

function batchTaskStatusMeta(status) {
  const map = {
    CheckCompleted: { label: "待执行", className: "status-pending" },
    ExecutionCompleted: { label: "执行完成", className: "status-opened" },
    ExecutionFailed: { label: "执行失败", className: "status-failed" },
  };
  return map[status] || { label: status, className: "status-unopened" };
}

function batchTaskTypeLabel(type) {
  const labels = { CREATE_COMPANY: "批量创建公司", ENABLE_INVOICE: "批量开通发票申请", ASSOCIATE_STORE: "批量关联门店" };
  return labels[type] || type;
}

function renderBatchRecords() {
  const type = document.getElementById("batchRecordTypeFilter").value;
  const status = document.getElementById("batchRecordStatusFilter").value;
  const keyword = document.getElementById("batchRecordKeyword").value.trim().toLowerCase();
  const tasks = batchTasks.filter((task) => (!type || task.type === type) && (!status || task.status === status) && (!keyword || task.fileName.toLowerCase().includes(keyword) || task.operator.toLowerCase().includes(keyword)));
  document.getElementById("batchRecordRows").innerHTML = tasks.length ? tasks.map((task) => {
    const statusMeta = batchTaskStatusMeta(task.status);
    return `<tr><td>${task.createdAt}</td><td>${batchTaskTypeLabel(task.type)}</td><td>${companySafe(task.fileName)}</td><td>${task.operator}</td><td><span class="batch-status ${statusMeta.className}">${statusMeta.label}</span></td><td>${task.total}</td><td><span class="success-text">${task.pass}</span> / <span class="danger-text">${task.fail}</span></td><td>${task.success} 成 / ${task.executeFail} 败 / ${task.skipped} 跳</td><td><button class="link-btn" data-batch-task-detail="${task.id}">详情</button></td></tr>`;
  }).join("") : '<tr><td colspan="9" class="empty-cell">未找到匹配的批量操作记录</td></tr>';
}

function openBatchRecords() {
  document.getElementById("batchRecordListPanel").classList.remove("hidden");
  document.getElementById("batchRecordDetailPanel").classList.add("hidden");
  renderBatchRecords();
  setView("batchRecordsView");
}

function openBatchTaskDetail(taskId) {
  const task = batchTasks.find((item) => item.id === taskId);
  if (!task) return;
  document.getElementById("batchRecordListPanel").classList.add("hidden");
  document.getElementById("batchRecordDetailPanel").classList.remove("hidden");
  document.getElementById("batchRecordDetailTitle").textContent = `${batchTaskTypeLabel(task.type)}任务详情`;
  document.getElementById("batchRecordDetailMeta").textContent = `${task.id} · ${task.fileName} · ${task.operator} · ${task.createdAt}`;
  document.getElementById("batchRecordDetailStats").innerHTML = `<span>总行数：<strong>${task.total}</strong></span><span class="success-text">通过：<strong>${task.pass}</strong></span><span class="danger-text">不通过：<strong>${task.fail}</strong></span><span class="success-text">执行成功：<strong>${task.success}</strong></span><span>跳过：<strong>${task.skipped}</strong></span>`;
  const isStore = task.type === "ASSOCIATE_STORE";
  const isInvoice = task.type === "ENABLE_INVOICE";
  document.getElementById("batchRecordDetailHead").innerHTML = isStore
    ? "<tr><th>行号</th><th>客户编号</th><th>统一社会信用代码</th><th>公司名称</th><th>门店编号</th><th>门店名称</th><th>检查结果</th><th>执行结果</th><th>原因/备注</th></tr>"
    : isInvoice
      ? "<tr><th>行号</th><th>统一社会信用代码</th><th>公司名称</th><th>纳税人类型</th><th>计税方式</th><th>征收率</th><th>检查结果</th><th>执行结果</th><th>原因/备注</th></tr>"
      : "<tr><th>行号</th><th>统一社会信用代码</th><th>公司名称</th><th>检查结果</th><th>执行结果</th><th>原因/备注</th></tr>";
  document.getElementById("batchRecordDetailRows").innerHTML = task.rows.map((row) => {
    if (isStore) return `<tr><td>${row.row}</td><td>${row.clientNo}</td><td>${row.uscc}</td><td>${companySafe(row.companyName)}</td><td>${companySafe(row.storeNo)}</td><td>${companySafe(row.storeName)}</td><td>${row.check}</td><td>${row.execute}</td><td>${companySafe(row.reason)}</td></tr>`;
    if (isInvoice) return `<tr><td>${row.row}</td><td>${row.uscc}</td><td>${row.name}</td><td>${row.taxpayerType || "-"}</td><td>${row.taxMethod || "-"}</td><td>${row.levyRate === "-" ? "不适用" : (row.levyRate || "-")}</td><td>${row.check}</td><td>${row.execute}</td><td>${row.reason}</td></tr>`;
    return `<tr><td>${row.row}</td><td>${row.uscc}</td><td>${row.name}</td><td>${row.check}</td><td>${row.execute}</td><td>${row.reason}</td></tr>`;
  }).join("");
}

function bindCompanyEvents() {
  const brandOptions = [...new Set(groupStores.map((store) => store.brand))].sort((a, b) => a.localeCompare(b, "zh-CN"));
  ["companyStoreBrandFilter", "storePickerBrandFilter"].forEach((id) => {
    const select = document.getElementById(id);
    select.innerHTML = `<option value="">全部品牌</option>${brandOptions.map((brand) => `<option value="${companySafe(brand)}">${companySafe(brand)}</option>`).join("")}`;
  });
  document.getElementById("createCompanyBtn").addEventListener("click", () => { resetCreateCompanyForm(); openModal("createCompanyDrawer"); });
  document.getElementById("batchCreateCompanyBtn").addEventListener("click", () => openBatch("create"));
  document.getElementById("batchEnableInvoiceBtn").addEventListener("click", () => openBatch("invoice"));
  document.getElementById("batchAssociateStoresBtn").addEventListener("click", () => openBatch("store"));
  document.getElementById("batchOperationRecordsBtn").addEventListener("click", openBatchRecords);
  document.getElementById("companySearchBtn").addEventListener("click", () => {
    companyState.keyword = document.getElementById("companyKeyword").value.trim();
    companyState.type = document.getElementById("companyTypeFilter").value;
    companyState.invoiceStatus = document.getElementById("companyInvoiceStatusFilter").value;
    renderCompanies();
  });
  document.getElementById("companyResetBtn").addEventListener("click", () => {
    ["companyKeyword", "companyTypeFilter", "companyInvoiceStatusFilter"].forEach((id) => { document.getElementById(id).value = ""; });
    companyState.keyword = ""; companyState.type = ""; companyState.invoiceStatus = ""; renderCompanies();
  });
  document.getElementById("newCompanyUscc").addEventListener("blur", lookupCompanyName);
  document.getElementById("newCompanyUscc").addEventListener("input", (event) => { event.target.value = event.target.value.toUpperCase(); document.getElementById("newCompanyName").value = ""; document.getElementById("createCompanyError").textContent = ""; });
  document.querySelectorAll('input[name="newCompanyBranch"]').forEach((radio) => radio.addEventListener("change", () => document.getElementById("newCompanyParentField").classList.toggle("hidden", radio.value !== "Branch" || !radio.checked)));
  document.getElementById("confirmCreateCompanyBtn").addEventListener("click", confirmCreateCompany);
  document.getElementById("invoiceFunctionSelected").addEventListener("change", (event) => { document.getElementById("enableInvoiceNextBtn").disabled = !event.target.checked; });
  document.getElementById("enableTaxpayerType").addEventListener("change", () => syncEnableInvoiceTaxFields({ taxpayerTypeChanged: true }));
  document.getElementById("enableTaxMethod").addEventListener("change", () => syncEnableInvoiceTaxFields());
  document.getElementById("enableTaxMethodHelpBtn").addEventListener("click", () => {
    const popover = document.getElementById("enableTaxMethodHelpPopover");
    const willOpen = popover.classList.contains("hidden");
    popover.classList.toggle("hidden", !willOpen);
    document.getElementById("enableTaxMethodHelpBtn").setAttribute("aria-expanded", String(willOpen));
  });
  document.addEventListener("click", (event) => {
    if (event.target.closest(".field-help-wrap")) return;
    document.getElementById("enableTaxMethodHelpPopover").classList.add("hidden");
    document.getElementById("enableTaxMethodHelpBtn").setAttribute("aria-expanded", "false");
  });
  document.getElementById("enableInvoiceNextBtn").addEventListener("click", () => { if (document.getElementById("invoiceFunctionSelected").checked) setEnableInvoiceStep(2); });
  document.getElementById("enableInvoicePrevBtn").addEventListener("click", () => setEnableInvoiceStep(1));
  document.getElementById("submitEnableInvoiceBtn").addEventListener("click", submitEnableInvoice);
  document.getElementById("viewInvoiceSubmissionBtn").addEventListener("click", () => { closeModal("enableInvoiceDrawer"); openInvoiceProgress(companyState.enableCompanyId); });
  document.getElementById("backFromCompanyDetailBtn").addEventListener("click", () => setView("productsView"));
  document.getElementById("copyCompanyCodeBtn").addEventListener("click", async () => {
    const company = getCompanyDetail();
    if (!company) return;
    try { await navigator.clipboard.writeText(company.companyCode || company.id); } catch (_) { /* file previews can block clipboard access */ }
    showToast("公司ID已复制");
  });
  document.getElementById("editCompanyDetailBtn").addEventListener("click", openEditCompany);
  document.querySelectorAll('input[name="editCompanyType"]').forEach((radio) => radio.addEventListener("change", () => document.getElementById("editCompanyParentField").classList.toggle("hidden", radio.value !== "Branch" || !radio.checked)));
  document.getElementById("saveCompanyDetailBtn").addEventListener("click", saveCompanyDetail);
  document.querySelectorAll("[data-company-detail-tab]").forEach((button) => button.addEventListener("click", () => activateCompanyDetailTab(button.dataset.companyDetailTab)));
  document.getElementById("searchCompanyBranchesBtn").addEventListener("click", () => { companyState.branchKeyword = document.getElementById("companyBranchKeyword").value.trim(); renderCompanyBranches(); });
  document.getElementById("resetCompanyBranchesBtn").addEventListener("click", () => { companyState.branchKeyword = ""; document.getElementById("companyBranchKeyword").value = ""; renderCompanyBranches(); });
  document.getElementById("searchCompanyStoresBtn").addEventListener("click", () => { companyState.storeFilters = getStoreFilterValues("companyStore"); renderCompanyStores(); });
  document.getElementById("resetCompanyStoresBtn").addEventListener("click", () => { companyState.storeFilters = { brand: "", name: "", storeNo: "", storeId: "" }; resetStoreFilterInputs("companyStore"); renderCompanyStores(); });
  document.getElementById("addManagedStoresBtn").addEventListener("click", openManageStores);
  document.getElementById("searchStorePickerBtn").addEventListener("click", () => { companyState.storePickerFilters = getStoreFilterValues("storePicker"); renderStorePicker(); });
  document.getElementById("resetStorePickerBtn").addEventListener("click", () => { companyState.storePickerFilters = { brand: "", name: "", storeNo: "", storeId: "" }; resetStoreFilterInputs("storePicker"); renderStorePicker(); });
  document.getElementById("storePickerOnlyAvailable").addEventListener("change", (event) => { companyState.storePickerOnlyAvailable = event.target.checked; renderStorePicker(); });
  document.getElementById("selectAllAvailableStores").addEventListener("change", (event) => {
    groupStores.filter((store) => !store.companyId && storeMatchesFilters(store, companyState.storePickerFilters)).forEach((store) => {
      if (event.target.checked) companyState.selectedStoreIds.add(store.id);
      else companyState.selectedStoreIds.delete(store.id);
    });
    renderStorePicker();
  });
  document.getElementById("confirmManageStoresBtn").addEventListener("click", confirmManageStores);
  document.getElementById("confirmRemoveStoreBtn").addEventListener("click", confirmRemoveStore);
  document.getElementById("companyInvoiceFunctionCard").addEventListener("click", () => {
    const company = getCompanyDetail();
    if (!company) return;
    if (company.invoiceStatus === "Unopened" || company.invoiceStatus === "Failed") openEnableInvoice(company.id);
    else openInvoiceProgress(company.id);
  });
  document.getElementById("backCompanyListBtn").addEventListener("click", () => setView("productsView"));
  document.getElementById("batchBackToCompanyBtn").addEventListener("click", () => setView("productsView"));
  document.getElementById("batchRecordsShortcutBtn").addEventListener("click", openBatchRecords);
  document.getElementById("viewBatchRecordsBtn").addEventListener("click", openBatchRecords);
  document.getElementById("backFromBatchRecordsBtn").addEventListener("click", () => setView("productsView"));
  document.getElementById("downloadBatchTemplateBtn").addEventListener("click", () => showToast(`已下载${getBatchModeMeta().title}模板`));
  document.getElementById("selectBatchFileBtn").addEventListener("click", selectMockBatchFile);
  document.getElementById("removeBatchFileBtn").addEventListener("click", () => { companyState.batchFileName = ""; companyState.batchRows = []; document.getElementById("batchFileCard").classList.add("hidden"); document.getElementById("startBatchCheckBtn").disabled = true; });
  document.getElementById("startBatchCheckBtn").addEventListener("click", () => { renderBatchCheck(); setBatchStage(2); });
  document.getElementById("reuploadBatchBtn").addEventListener("click", () => setBatchStage(1));
  document.getElementById("executeBatchBtn").addEventListener("click", executeBatch);
  document.getElementById("restartBatchBtn").addEventListener("click", () => openBatch(companyState.batchMode));
  document.getElementById("searchBatchRecordsBtn").addEventListener("click", renderBatchRecords);
  document.getElementById("resetBatchRecordsBtn").addEventListener("click", () => { ["batchRecordTypeFilter", "batchRecordStatusFilter", "batchRecordKeyword"].forEach((id) => { document.getElementById(id).value = ""; }); renderBatchRecords(); });
  document.getElementById("backToBatchRecordListBtn").addEventListener("click", () => { document.getElementById("batchRecordListPanel").classList.remove("hidden"); document.getElementById("batchRecordDetailPanel").classList.add("hidden"); });
  document.body.addEventListener("click", (event) => {
    const removeStore = event.target.closest("[data-company-store-remove]");
    if (removeStore) openRemoveStoreConfirm(removeStore.dataset.companyStoreRemove);
    const companyDetail = event.target.closest("[data-company-detail]");
    if (companyDetail) openCompanyDetail(companyDetail.dataset.companyDetail);
    const invoiceAction = event.target.closest("[data-company-invoice-action]");
    if (invoiceAction) {
      if (invoiceAction.dataset.companyInvoiceAction === "enable") openEnableInvoice(invoiceAction.dataset.companyId);
      else openInvoiceProgress(invoiceAction.dataset.companyId);
    }
    const detail = event.target.closest("[data-batch-task-detail]");
    if (detail) openBatchTaskDetail(detail.dataset.batchTaskDetail);
  });
  document.body.addEventListener("change", (event) => {
    const storeCheckbox = event.target.closest("[data-store-picker-id]");
    if (!storeCheckbox || storeCheckbox.disabled) return;
    if (storeCheckbox.checked) companyState.selectedStoreIds.add(storeCheckbox.dataset.storePickerId);
    else companyState.selectedStoreIds.delete(storeCheckbox.dataset.storePickerId);
    renderStorePicker();
  });
}

renderCompanies();
bindCompanyEvents();
