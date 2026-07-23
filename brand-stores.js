const brandStoreState = {
  currentBrandCode: null,
  currentStoreId: null,
  editingStoreId: null,
  activeTab: "brandBasicInfoPanel",
  filters: { id: "", name: "", storeNo: "", type: "" },
  page: 1,
  pageSize: 6,
};

const brandStores = [
  { id: "161247741357", brandCode: "700001", name: "上海梧桐旗舰店", storeNo: "122", type: "直营", region: "上海市 / 上海市 / 长宁区", address: "上海市长宁区愚园路 122 号", phone: "021-61234567", remark: "集团示例旗舰店", enabled: true, products: ["电子发票"], createdAt: "2025-03-27 11:57" },
  { id: "161247741356", brandCode: "700001", name: "上海虹桥店", storeNo: "120", type: "直营", region: "上海市 / 上海市 / 长宁区", address: "上海市长宁区虹桥路 120 号", phone: "021-61234568", remark: "-", enabled: true, products: [], createdAt: "2025-03-27 11:56" },
  { id: "161247741957", brandCode: "700001", name: "上海静安体验店", storeNo: "100", type: "直营", region: "上海市 / 上海市 / 静安区", address: "上海市静安区南京西路 100 号", phone: "021-61234569", remark: "-", enabled: true, products: ["电子发票"], createdAt: "2025-03-27 11:56" },
  { id: "161247741956", brandCode: "700001", name: "北京朝阳店", storeNo: "100-114", type: "联营", region: "北京市 / 北京市 / 朝阳区", address: "北京市朝阳区示例路 114 号", phone: "010-61234567", remark: "联营门店", enabled: true, products: [], createdAt: "2025-03-27 11:55" },
  { id: "161247751271", brandCode: "700001", name: "苏州中心店", storeNo: "122-0002", type: "直营", region: "江苏省 / 苏州市 / 工业园区", address: "苏州市工业园区星港街 1 号", phone: "0512-61234567", remark: "-", enabled: false, products: [], createdAt: "2024-09-09 14:27" },
  { id: "161247754226", brandCode: "700001", name: "杭州湖滨店", storeNo: "120-0002", type: "加盟", region: "浙江省 / 杭州市 / 上城区", address: "杭州市上城区湖滨路 20 号", phone: "0571-61234567", remark: "加盟门店", enabled: true, products: [], createdAt: "2024-09-09 14:27" },
  { id: "161247756110", brandCode: "700001", name: "深圳万象天地店", storeNo: "100-0002", type: "直营", region: "广东省 / 深圳市 / 南山区", address: "深圳市南山区深南大道 100 号", phone: "0755-61234567", remark: "-", enabled: true, products: ["电子发票"], createdAt: "2024-09-09 14:26" },
  { id: "161247760201", brandCode: "700002", name: "Swatch 上海旗舰店", storeNo: "SH-001", type: "直营", region: "上海市 / 上海市 / 静安区", address: "上海市静安区南京西路 201 号", phone: "021-61234601", remark: "-", enabled: true, products: ["电子发票"], createdAt: "2025-01-18 10:20" },
  { id: "161247760301", brandCode: "700003", name: "Omega 北京体验店", storeNo: "BJ-001", type: "直营", region: "北京市 / 北京市 / 朝阳区", address: "北京市朝阳区建国路 88 号", phone: "010-61234602", remark: "-", enabled: true, products: [], createdAt: "2025-02-12 09:30" },
  { id: "161247760401", brandCode: "700004", name: "Ralph Lauren 上海店", storeNo: "SH-001", type: "直营", region: "上海市 / 上海市 / 静安区", address: "上海市静安区南京西路 301 号", phone: "021-61234603", remark: "与其他品牌可使用相同门店号", enabled: true, products: [], createdAt: "2025-03-06 15:10" },
];

function brandStoreSafe(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function getCurrentBrand() {
  return brands.find((brand) => brand.code === brandStoreState.currentBrandCode);
}

function getCurrentBrandStore() {
  return brandStores.find((store) => store.id === brandStoreState.currentStoreId);
}

function activateBrandDetailTab(panelId) {
  brandStoreState.activeTab = panelId;
  document.querySelectorAll("[data-brand-detail-tab]").forEach((button) => button.classList.toggle("active", button.dataset.brandDetailTab === panelId));
  document.querySelectorAll(".brand-detail-tab-panel").forEach((panel) => panel.classList.toggle("active", panel.id === panelId));
  if (panelId === "brandStoreListPanel") renderBrandStores();
}

function filteredBrandStores() {
  const filters = brandStoreState.filters;
  return brandStores.filter((store) => store.brandCode === brandStoreState.currentBrandCode
    && (!filters.id || store.id === filters.id)
    && (!filters.name || store.name.toLowerCase().includes(filters.name.toLowerCase()))
    && (!filters.storeNo || store.storeNo.toLowerCase() === filters.storeNo.toLowerCase())
    && (!filters.type || store.type === filters.type));
}

function renderBrandStores() {
  const rows = filteredBrandStores();
  const pages = Math.max(1, Math.ceil(rows.length / brandStoreState.pageSize));
  brandStoreState.page = Math.min(brandStoreState.page, pages);
  const start = (brandStoreState.page - 1) * brandStoreState.pageSize;
  const pageRows = rows.slice(start, start + brandStoreState.pageSize);
  document.getElementById("brandStoreTotal").textContent = `共${rows.length}条`;
  document.getElementById("brandStorePageBtn").textContent = brandStoreState.page;
  document.getElementById("brandStorePrevBtn").disabled = brandStoreState.page <= 1;
  document.getElementById("brandStoreNextBtn").disabled = brandStoreState.page >= pages;
  document.getElementById("brandStorePageSize").value = String(brandStoreState.pageSize);
  document.getElementById("brandStoreRows").innerHTML = pageRows.length ? pageRows.map((store) => `<tr>
    <td>${brandStoreSafe(store.name)}</td><td>${brandStoreSafe(store.storeNo)}</td><td>${brandStoreSafe(store.id)}</td><td>${brandStoreSafe(store.type)}</td>
    <td>${brandStoreSafe(store.region)}</td><td>${brandStoreSafe(store.createdAt)}</td><td><button class="link-btn" data-brand-store-detail="${store.id}">详情</button></td>
  </tr>`).join("") : '<tr><td colspan="7" class="empty-cell">暂无匹配门店</td></tr>';
}

function resetBrandStoreFilters() {
  ["brandStoreIdFilter", "brandStoreNameFilter", "brandStoreNoFilter", "brandStoreTypeFilter"].forEach((id) => { document.getElementById(id).value = ""; });
  brandStoreState.filters = { id: "", name: "", storeNo: "", type: "" };
  brandStoreState.page = 1;
  renderBrandStores();
}

function readBrandStoreFilters() {
  brandStoreState.filters = {
    id: document.getElementById("brandStoreIdFilter").value.trim(),
    name: document.getElementById("brandStoreNameFilter").value.trim(),
    storeNo: document.getElementById("brandStoreNoFilter").value.trim(),
    type: document.getElementById("brandStoreTypeFilter").value,
  };
  brandStoreState.page = 1;
  renderBrandStores();
}

function openBrandStoreDrawer(storeId = null) {
  const brand = getCurrentBrand();
  const store = storeId ? brandStores.find((item) => item.id === storeId && item.brandCode === brandStoreState.currentBrandCode) : null;
  if (!brand || (storeId && !store)) return;
  brandStoreState.editingStoreId = store?.id || null;
  document.getElementById("brandStoreDrawerTitle").textContent = store ? "编辑门店信息" : "创建门店";
  document.getElementById("saveBrandStoreBtn").textContent = store ? "保存" : "创建";
  document.getElementById("brandStoreDrawerBrandName").textContent = brand.name;
  document.getElementById("brandStoreDrawerBrandCode").textContent = brand.code;
  document.querySelectorAll('input[name="brandStoreType"]').forEach((radio) => { radio.checked = radio.value === (store?.type || "直营"); });
  document.getElementById("brandStoreStatusField").classList.toggle("hidden", !store);
  document.getElementById("brandStoreStatusInput").value = store?.enabled === false ? "disabled" : "enabled";
  document.getElementById("brandStoreNameInput").value = store?.name || "";
  document.getElementById("brandStoreNoInput").value = store?.storeNo || "";
  document.getElementById("brandStoreRegionInput").value = store?.region || "";
  document.getElementById("brandStoreAddressInput").value = store?.address || "";
  document.getElementById("brandStorePhoneInput").value = store?.phone || "";
  document.getElementById("brandStoreRemarkInput").value = store?.remark === "-" ? "" : (store?.remark || "");
  document.getElementById("brandStoreNameCount").textContent = String((store?.name || "").length);
  document.getElementById("brandStoreFormError").textContent = "";
  openModal("brandStoreDrawer");
}

function validateBrandStoreForm() {
  const name = document.getElementById("brandStoreNameInput").value.trim();
  const storeNo = document.getElementById("brandStoreNoInput").value.trim();
  const region = document.getElementById("brandStoreRegionInput").value;
  const address = document.getElementById("brandStoreAddressInput").value.trim();
  if (!name || !storeNo || !region || !address) return "请完整填写门店名称、门店号、所属地区和详细地址";
  const duplicate = brandStores.find((store) => store.brandCode === brandStoreState.currentBrandCode
    && store.id !== brandStoreState.editingStoreId
    && store.storeNo.toLowerCase() === storeNo.toLowerCase());
  if (duplicate) return `门店号“${storeNo}”在当前品牌下已存在，请更换门店号`;
  const phone = document.getElementById("brandStorePhoneInput").value.trim();
  if (phone && !/^[0-9\- ]+$/.test(phone)) return "联系电话仅支持数字、短横线和空格";
  return "";
}

function saveBrandStore() {
  const error = validateBrandStoreForm();
  document.getElementById("brandStoreFormError").textContent = error;
  if (error) return;
  const existing = brandStores.find((store) => store.id === brandStoreState.editingStoreId);
  const payload = {
    brandCode: brandStoreState.currentBrandCode,
    name: document.getElementById("brandStoreNameInput").value.trim(),
    storeNo: document.getElementById("brandStoreNoInput").value.trim(),
    type: document.querySelector('input[name="brandStoreType"]:checked').value,
    region: document.getElementById("brandStoreRegionInput").value,
    address: document.getElementById("brandStoreAddressInput").value.trim(),
    phone: document.getElementById("brandStorePhoneInput").value.trim() || "-",
    remark: document.getElementById("brandStoreRemarkInput").value.trim() || "-",
  };
  if (existing) {
    Object.assign(existing, payload, { enabled: document.getElementById("brandStoreStatusInput").value === "enabled" });
  } else {
    brandStores.unshift({ id: String(161247780000 + brandStores.length + 1), ...payload, enabled: true, products: [], createdAt: "2026-07-21 20:30" });
  }
  closeModal("brandStoreDrawer");
  renderBrandStores();
  if (existing && brandStoreState.currentStoreId === existing.id) renderBrandStoreDetail();
  showToast(existing ? "门店信息已更新" : "门店创建成功");
}

function renderBrandStoreDetail() {
  const store = getCurrentBrandStore();
  const brand = getCurrentBrand();
  if (!store || !brand) return;
  document.getElementById("brandStoreDetailName").textContent = store.name;
  document.getElementById("brandStoreDetailNoTag").textContent = `门店号：${store.storeNo}`;
  document.getElementById("brandStoreDetailIdTag").textContent = `门店ID：${store.id}`;
  const fields = [
    ["门店名称", store.name], ["门店号", store.storeNo], ["所属品牌", brand.name],
    ["门店状态", `<span class="tag ${store.enabled ? "green" : "gray"}">${store.enabled ? "启用" : "禁用"}</span>`], ["门店类型", store.type], ["所属地区", store.region],
    ["详细地址", store.address], ["联系电话", store.phone || "-"], ["门店ID", store.id],
    ["创建时间", store.createdAt], ["已开通产品", store.products.length ? store.products.join("、") : "-"], ["备注", store.remark || "-"],
  ];
  document.getElementById("brandStoreDetailGrid").innerHTML = fields.map(([label, value]) => `<div><dt>${label}</dt><dd>${label === "门店状态" ? value : brandStoreSafe(value)}</dd></div>`).join("");
}

function openBrandStoreDetail(storeId) {
  const store = brandStores.find((item) => item.id === storeId && item.brandCode === brandStoreState.currentBrandCode);
  if (!store) return;
  brandStoreState.currentStoreId = storeId;
  renderBrandStoreDetail();
  setView("brandStoreDetailView");
}

function returnToBrandStoreList() {
  setView("brandDetailView");
  activateBrandDetailTab("brandStoreListPanel");
}

function buildBrandStoreBatchRows() {
  const brandCode = brandStoreState.currentBrandCode;
  const inputs = [
    { row: 1, name: "上海徐汇新店", storeNo: "SH-XH-009", type: "直营店", province: "上海市", city: "上海市", district: "徐汇区", address: "示例路 9 号", phone: "021-60000009", remark: "批量创建" },
    { row: 2, name: "杭州城西银泰店", storeNo: "HZ-CX-010", type: "加盟店", province: "浙江省", city: "杭州市", district: "西湖区", address: "示例路 10 号", phone: "0571-60000010", remark: "批量创建" },
    { row: 3, name: "重复门店号示例", storeNo: "122", type: "联营店", province: "上海市", city: "上海市", district: "长宁区", address: "示例路 12 号", phone: "021-60000012", remark: "用于演示唯一性校验" },
    { row: 4, name: "批次内重复示例", storeNo: "SH-XH-009", type: "", province: "上海市", city: "上海市", district: "徐汇区", address: "示例路 19 号", phone: "021-60000019", remark: "用于演示门店类型必填" },
  ];
  const allowedTypes = new Set(["直营店", "加盟店", "联营店"]);
  const seen = new Set(brandStores.filter((store) => store.brandCode === brandCode).map((store) => store.storeNo.toLowerCase()));
  return inputs.map((input) => {
    let check = "通过";
    let reason = "-";
    const normalized = input.storeNo.toLowerCase();
    if (![input.name, input.storeNo, input.type, input.province, input.city, input.district, input.address].every(Boolean)) { check = "不通过"; reason = "门店名称、商家门店号、门店类型、省、市、区和详细地址均为必填"; }
    else if (!allowedTypes.has(input.type)) { check = "不通过"; reason = "门店类型仅支持直营店、加盟店、联营店"; }
    else if (seen.has(normalized)) { check = "不通过"; reason = `门店号“${input.storeNo}”在当前品牌或本次文件中重复`; }
    else seen.add(normalized);
    return { ...input, brandCode, brandName: getCurrentBrand()?.name || "-", check, reason };
  });
}

function executeBrandStoreBatch(rows) {
  const typeMap = { 直营店: "直营", 加盟店: "加盟", 联营店: "联营" };
  rows.filter((row) => row.check === "通过").forEach((row) => {
    if (brandStores.some((store) => store.brandCode === row.brandCode && store.storeNo.toLowerCase() === row.storeNo.toLowerCase())) return;
    brandStores.unshift({ id: String(161247790000 + brandStores.length + row.row), brandCode: row.brandCode, name: row.name, storeNo: row.storeNo, type: typeMap[row.type] || row.type, region: [row.province, row.city, row.district].join(" / "), address: row.address, phone: row.phone || "-", remark: row.remark || "-", enabled: true, products: [], createdAt: "2026-07-21 20:45" });
  });
  renderBrandStores();
}

function openBrand(brandCode) {
  const changed = brandStoreState.currentBrandCode !== brandCode;
  brandStoreState.currentBrandCode = brandCode;
  if (changed) {
    brandStoreState.filters = { id: "", name: "", storeNo: "", type: "" };
    brandStoreState.page = 1;
  }
  activateBrandDetailTab("brandBasicInfoPanel");
}

function bindBrandStoreEvents() {
  document.querySelectorAll("[data-brand-detail-tab]").forEach((button) => button.addEventListener("click", () => activateBrandDetailTab(button.dataset.brandDetailTab)));
  document.getElementById("searchBrandStoresBtn").addEventListener("click", readBrandStoreFilters);
  document.getElementById("resetBrandStoresBtn").addEventListener("click", resetBrandStoreFilters);
  document.getElementById("createBrandStoreBtn").addEventListener("click", () => openBrandStoreDrawer());
  document.getElementById("batchCreateBrandStoresBtn").addEventListener("click", () => openBatch("brandStoreCreate"));
  document.getElementById("brandStorePrevBtn").addEventListener("click", () => { if (brandStoreState.page > 1) { brandStoreState.page -= 1; renderBrandStores(); } });
  document.getElementById("brandStoreNextBtn").addEventListener("click", () => { const pages = Math.max(1, Math.ceil(filteredBrandStores().length / brandStoreState.pageSize)); if (brandStoreState.page < pages) { brandStoreState.page += 1; renderBrandStores(); } });
  document.getElementById("brandStorePageSize").addEventListener("change", (event) => { brandStoreState.pageSize = Number(event.target.value); brandStoreState.page = 1; renderBrandStores(); });
  document.getElementById("saveBrandStoreBtn").addEventListener("click", saveBrandStore);
  document.getElementById("brandStoreNameInput").addEventListener("input", (event) => { document.getElementById("brandStoreNameCount").textContent = String(event.target.value.length); document.getElementById("brandStoreFormError").textContent = ""; });
  document.getElementById("brandStoreNoInput").addEventListener("input", () => { document.getElementById("brandStoreFormError").textContent = ""; });
  document.getElementById("editBrandStoreBtn").addEventListener("click", () => openBrandStoreDrawer(brandStoreState.currentStoreId));
  document.getElementById("backFromBrandStoreDetailBtn").addEventListener("click", returnToBrandStoreList);
  document.body.addEventListener("click", (event) => {
    const detailButton = event.target.closest("[data-brand-store-detail]");
    if (detailButton) openBrandStoreDetail(detailButton.dataset.brandStoreDetail);
  });
}

window.BrandStoreFeature = {
  openBrand,
  getMockBatchRows: buildBrandStoreBatchRows,
  executeBatchRows: executeBrandStoreBatch,
  returnFromBatch: returnToBrandStoreList,
  getScopeLabel: () => `品牌：${getCurrentBrand()?.name || "-"}（${brandStoreState.currentBrandCode || "-"}）`,
};

bindBrandStoreEvents();
