// Local prototype. Initial values and taxpayer scope confirmed by the user on 2026-09-10.
(() => {
  const settings = new Map();
  let editingTaxNo = null;
  let pending = null;
  let keyword = "";
  let editingDefault = false;
  const byId = (id) => document.getElementById(id);
  const saved = () => {
    if (!settings.has(state.currentBrandCode)) {
      settings.set(state.currentBrandCode, { enabled: false, defaultAllowed: false, showResult: false, overrides: {} });
    }
    return settings.get(state.currentBrandCode);
  };
  const candidates = () => {
    const brand = brands.find((item) => item.code === state.currentBrandCode);
    const customer = brand && getBrandCustomer(brand);
    return [...new Map(companies.filter((company) => customer && company.customerId === customer.id
      && company.invoiceStatus === "Opened")
      .map((company) => [company.uscc, company])).values()];
  };
  function renderRows() {
    const rows = Object.entries(saved().overrides).filter(([taxNo, item]) => `${taxNo} ${item.name}`.toLowerCase().includes(keyword));
    byId("autoInvoiceTaxRows").innerHTML = rows.map(([taxNo, item]) => `<tr>
      <td>${escapeHtml(taxNo)}</td><td>${escapeHtml(item.name)}</td>
      <td><span class="tag ${item.allowed ? "green" : "gray"}">${item.allowed ? "允许" : "不允许"}</span></td>
      <td>${escapeHtml(item.updated)}</td><td><div class="row-actions"><button class="link-btn" data-auto-edit="${escapeHtml(taxNo)}">编辑</button><button class="link-btn danger" data-auto-delete="${escapeHtml(taxNo)}">删除</button></div></td>
    </tr>`).join("") || `<tr><td colspan="5" class="empty-state">${keyword ? "未找到匹配的税号单独配置" : "暂无税号单独配置，当前税号将使用默认规则"}</td></tr>`;
  }
  function render() {
    const config = saved();
    byId("autoInvoiceEnabled").checked = config.enabled;
    document.querySelectorAll("[data-auto-content]").forEach((section) => section.classList.toggle("hidden", !config.enabled));
    byId("editAutoInvoiceDefaultBtn").classList.toggle("hidden", editingDefault);
    byId("cancelAutoInvoiceDefaultBtn").classList.toggle("hidden", !editingDefault);
    byId("saveAutoInvoiceDefaultBtn").classList.toggle("hidden", !editingDefault);
    byId("autoInvoiceDefaultSummary").classList.toggle("hidden", editingDefault);
    byId("autoInvoiceDefaultEditor").classList.toggle("hidden", !editingDefault);
    byId("autoInvoiceDefaultView").textContent = config.defaultAllowed ? "默认允许" : "默认不允许";
    byId("autoInvoiceShowResult").checked = config.showResult;
    renderRows();
  }
  function confirmAction(title, text, action) {
    pending = { brand: state.currentBrandCode, action };
    byId("autoInvoiceConfirmTitle").textContent = title;
    byId("autoInvoiceConfirmText").textContent = text;
    byId("confirmAutoInvoiceBtn").textContent = `确认${title.startsWith("删除") ? "删除" : title.startsWith("关闭") ? "关闭" : "开启"}`;
    openModal("autoInvoiceConfirmModal");
  }
  function editTax(taxNo = null) {
    editingTaxNo = taxNo;
    const item = taxNo ? saved().overrides[taxNo] : null;
    byId("autoInvoiceTaxTitle").textContent = item ? "编辑税号单独配置" : "新增税号单独配置";
    byId("autoInvoiceTaxInput").value = item ? `${item.name}（${taxNo}）` : "";
    byId("autoInvoiceTaxInput").readOnly = Boolean(item);
    byId("autoInvoiceTaxOptions").innerHTML = candidates().filter((company) => !Object.hasOwn(saved().overrides, company.uscc))
      .map((company) => `<option value="${escapeHtml(`${company.name}（${company.uscc}）`)}"></option>`).join("");
    byId("autoInvoiceTaxAllowed").value = (item?.allowed ?? saved().defaultAllowed) ? "allow" : "deny";
    byId("autoInvoiceTaxError").textContent = "";
    openModal("autoInvoiceTaxModal");
  }
  window.resetAutoInvoiceView = () => {
    pending = null;
    editingDefault = false;
    editingTaxNo = null;
    keyword = "";
    ["autoInvoiceConfirmModal", "autoInvoiceTaxModal"].forEach(closeModal);
    byId("autoInvoiceTaxSearch").value = "";
    render();
  };
  byId("autoInvoiceEnabled").addEventListener("change", (event) => {
    const enabled = event.target.checked;
    event.target.checked = saved().enabled;
    confirmAction(enabled ? "开启自动开票" : "关闭自动开票", enabled
      ? "开启后，仅新增订单按当前税号规则自动发起开票，已有订单不受影响。确认开启？"
      : "关闭后，仅新增订单不再自动发起开票，已有订单不受影响，配置将保留。确认关闭？",
    () => { saved().enabled = enabled; if (!enabled) editingDefault = false; });
  });
  byId("autoInvoiceShowResult").addEventListener("change", (event) => {
    const show = event.target.checked;
    event.target.checked = saved().showResult;
    confirmAction(show ? "开启开票结果展示" : "关闭开票结果展示", show
      ? "开启后，新增订单以“个人”抬头自动开具的发票将向消费者展示，已有订单不受影响。确认开启？"
      : "关闭后，新增订单以“个人”抬头自动开具的发票不向消费者展示，已有订单不受影响。确认关闭？",
    () => { saved().showResult = show; });
  });
  byId("confirmAutoInvoiceBtn").addEventListener("click", () => {
    if (!pending || pending.brand !== state.currentBrandCode) return;
    pending.action();
    pending = null;
    closeModal("autoInvoiceConfirmModal");
    render();
    showToast("设置已更新");
  });
  byId("editAutoInvoiceDefaultBtn").addEventListener("click", () => {
    document.querySelectorAll('[name="autoInvoiceDefault"]').forEach((input) => {
      input.checked = (input.value === "allow") === saved().defaultAllowed;
    });
    editingDefault = true;
    render();
  });
  byId("cancelAutoInvoiceDefaultBtn").addEventListener("click", () => { editingDefault = false; render(); });
  byId("saveAutoInvoiceDefaultBtn").addEventListener("click", () => {
    saved().defaultAllowed = document.querySelector('[name="autoInvoiceDefault"]:checked').value === "allow";
    editingDefault = false;
    render();
    showToast("已保存税号默认规则");
  });
  byId("addAutoInvoiceTaxBtn").addEventListener("click", () => editTax());
  byId("saveAutoInvoiceTaxBtn").addEventListener("click", () => {
    const value = byId("autoInvoiceTaxInput").value.trim();
    const company = candidates().find((item) => editingTaxNo ? item.uscc === editingTaxNo
      : [item.uscc, `${item.name}（${item.uscc}）`].includes(value));
    if (!company) { byId("autoInvoiceTaxError").textContent = "请选择当前客户下已开通发票功能的纳税人"; return; }
    if (!editingTaxNo && Object.hasOwn(saved().overrides, company.uscc)) {
      byId("autoInvoiceTaxError").textContent = "该税号已有单独配置，请在列表中编辑"; return;
    }
    saved().overrides[company.uscc] = { name: company.name, allowed: byId("autoInvoiceTaxAllowed").value === "allow", updated: formatCreatedAt() };
    closeModal("autoInvoiceTaxModal");
    renderRows();
    showToast("已保存税号单独配置");
  });
  byId("autoInvoiceSearchBtn").addEventListener("click", () => { keyword = byId("autoInvoiceTaxSearch").value.trim().toLowerCase(); renderRows(); });
  byId("autoInvoiceTaxSearch").addEventListener("keydown", (event) => { if (event.key === "Enter") byId("autoInvoiceSearchBtn").click(); });
  byId("autoInvoiceClearBtn").addEventListener("click", () => { keyword = ""; byId("autoInvoiceTaxSearch").value = ""; renderRows(); });
  byId("autoInvoiceTaxRows").addEventListener("click", (event) => {
    const edit = event.target.closest("[data-auto-edit]");
    const remove = event.target.closest("[data-auto-delete]");
    if (edit) editTax(edit.dataset.autoEdit);
    if (remove) {
      const taxNo = remove.dataset.autoDelete;
      confirmAction("删除税号单独配置", `删除 ${taxNo} 的单独配置后，该税号将遵循品牌默认规则（${saved().defaultAllowed ? "允许" : "不允许"}）。确认删除？`, () => { delete saved().overrides[taxNo]; });
    }
  });
  function validateBatch(rows) {
    const seen = new Set();
    return rows.map((item) => {
      const company = candidates().find((entry) => entry.uscc === item.taxNo);
      let reason = "-";
      if (item.brandCode !== state.currentBrandCode) reason = "品牌编号与当前品牌不一致";
      else if (!company) reason = "当前客户下未找到已开通发票功能的税号";
      else if (!["允许", "不允许"].includes(item.allowedText)) reason = "是否允许自动开票只能填写允许或不允许";
      else if (seen.has(item.taxNo)) reason = "文件内税号重复";
      else if (Object.hasOwn(saved().overrides, item.taxNo)) reason = "该税号已有单独配置，请在列表编辑";
      seen.add(item.taxNo);
      return { ...item, taxpayerName: company?.name || "-", check: reason === "-" ? "通过" : "不通过", reason };
    });
  }
  window.autoInvoiceBatch = {
    mockRows() {
      const options = candidates();
      const brandCode = state.currentBrandCode;
      return validateBatch([
        { row: 1, brandCode, taxNo: options[0]?.uscc || "", allowedText: "允许" },
        { row: 2, brandCode, taxNo: options[1]?.uscc || "", allowedText: "不允许" },
        { row: 3, brandCode: "其他品牌", taxNo: options[0]?.uscc || "", allowedText: "允许" },
        { row: 4, brandCode, taxNo: options[0]?.uscc || "", allowedText: "允许" },
      ]);
    },
    render(executed) {
      const rows = state.ruleBatchRows;
      const prefix = executed ? "ruleBatchExecute" : "ruleBatchCheck";
      byId(`${prefix}Head`).innerHTML = `<tr><th>行号</th><th>品牌编号</th><th>税号</th><th>纳税人名称</th><th>是否允许自动开票</th><th>${executed ? "执行结果" : "检查结果"}</th><th>原因</th></tr>`;
      byId(`${prefix}Rows`).innerHTML = rows.map((item) => `<tr><td>${item.row}</td><td>${escapeHtml(item.brandCode)}</td><td>${escapeHtml(item.taxNo)}</td><td>${escapeHtml(item.taxpayerName)}</td><td>${escapeHtml(item.allowedText)}</td><td>${executed ? item.execute : item.check}</td><td>${escapeHtml(executed ? item.executeReason : item.reason)}</td></tr>`).join("");
      if (executed) {
        byId("ruleBatchSuccessCount").textContent = rows.filter((item) => item.execute === "成功").length;
        byId("ruleBatchFailureCount").textContent = rows.filter((item) => item.execute === "失败").length;
        byId("ruleBatchSkippedCount").textContent = rows.filter((item) => item.execute === "跳过").length;
      } else {
        byId("ruleBatchCheckTotal").textContent = rows.length;
        byId("ruleBatchCheckPass").textContent = rows.filter((item) => item.check === "通过").length;
        byId("ruleBatchCheckFail").textContent = rows.filter((item) => item.check !== "通过").length;
      }
    },
    execute() {
      if (state.ruleBatchStep !== 2) return;
      const latest = validateBatch(state.ruleBatchRows);
      state.ruleBatchRows = latest.map((item) => {
        if (item.check !== "通过") return { ...item, execute: "跳过", executeReason: item.reason };
        saved().overrides[item.taxNo] = { name: item.taxpayerName, allowed: item.allowedText === "允许", updated: formatCreatedAt() };
        return { ...item, execute: "成功", executeReason: "-" };
      });
      renderRows();
      this.render(true);
      setRuleBatchStage(3);
    },
    downloadTemplate() {
      const csv = "\uFEFF品牌编号,税号,是否允许自动开票\r\n";
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = getRuleBatchMeta("autoInvoice").fileName;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
  };
  byId("importAutoInvoiceTaxBtn").addEventListener("click", () => openRuleBatch("autoInvoice"));
  render();
  if (window.location.hash === "#auto-invoice") {
    openBrandSettings(state.currentBrandCode);
    setActiveSidebar("brandManagementMenuBtn");
    activatePanel("brandAutoInvoicePanel");
  }
})();
