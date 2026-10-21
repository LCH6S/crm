// Local interaction prototype only; no report jobs or email requests are sent.
(() => {
  const storageKey = "crm-brand-report-push-v1";
  const byId = (id) => document.getElementById(id);
  const emailMask = byId("reportEmailModal");
  const confirmMask = byId("reportPushConfirmModal");
  let configs = {};
  try { configs = JSON.parse(localStorage.getItem(storageKey) || "{}"); } catch { /* Start with empty prototype settings. */ }
  if (!configs || typeof configs !== "object" || Array.isArray(configs)) configs = {};
  let pending = null;
  let activeMask = null;
  let restoreFocus = null;
  let background = [];
  let previousOverflow = "";
  let draft = [];
  let originalRows = "";
  let editingBrand = null;
  let discarding = false;
  let emailEditing = false;
  let discardIntent = "close";
  const validEmail = (value) => value.length <= 254 && /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(value);

  function saved() {
    const value = configs[state.currentBrandCode];
    return {
      emails: Array.isArray(value?.emails) ? value.emails.filter((email) => typeof email === "string" && validEmail(email)) : [],
      subscribed: value?.subscribed === true,
    };
  }
  function persist(value) {
    const next = { ...configs, [state.currentBrandCode]: value };
    try { localStorage.setItem(storageKey, JSON.stringify(next)); }
    catch { return false; }
    configs = next;
    return true;
  }
  function focusEmailEditor() {
    const field = byId("reportEmailRows").querySelector("input");
    (field || byId("addReportEmailBtn")).focus();
  }
  function showError(message = "", index = null) {
    byId("reportEmailError").textContent = index === null ? message : "";
    byId("reportEmailError").classList.toggle("hidden", !message || index !== null);
    byId("reportEmailRows").querySelectorAll("input").forEach((field) => field.removeAttribute("aria-invalid"));
    byId("reportEmailRows").querySelectorAll("[data-email-error]").forEach((node) => { node.textContent = ""; node.classList.add("hidden"); });
    if (message && index !== null) {
      const field = byId(`reportEmailRow${index}`);
      const error = byId(`reportEmailRowError${index}`);
      if (field && error) {
        error.textContent = message;
        error.classList.remove("hidden");
        field.setAttribute("aria-invalid", "true");
        field.focus(); field.select();
      }
    } else if (message) byId("reportEmailError").scrollIntoView({ block: "nearest" });
  }
  function renderRows(focusIndex = null) {
    byId("reportEmailDraftCount").textContent = `已填写 ${draft.filter((email) => email.trim()).length} 个`;
    byId("reportEmailRows").innerHTML = draft.map((email, index) => `<div class="report-email-row-item">
      <div class="report-email-row">
        <input id="reportEmailRow${index}" type="text" inputmode="email" autocomplete="off" spellcheck="false" placeholder="请输入接收邮箱" value="${escapeHtml(email)}" data-email-row="${index}" aria-label="接收邮箱 ${index + 1}" aria-describedby="reportEmailRowError${index}" />
        <button class="report-email-remove" type="button" data-delete-report-email="${index}" aria-label="删除接收邮箱 ${index + 1}" title="删除邮箱"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.5"/><path d="M5 8h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
      </div>
      <p class="field-error hidden" id="reportEmailRowError${index}" data-email-error role="alert"></p>
    </div>`).join("") || '<p class="report-email-empty">暂无接收邮箱，点击“添加邮箱”进行配置。</p>';
    if (focusIndex !== null) byId(`reportEmailRow${focusIndex}`)?.focus();
  }
  function render() {
    const config = saved();
    byId("reportEmailCount").textContent = `共 ${config.emails.length} 个邮箱`;
    const status = byId("reportSubscriptionStatus");
    status.textContent = config.subscribed ? "已订阅" : "未订阅";
    status.classList.toggle("subscribed", config.subscribed);
    const button = byId("reportSubscribeBtn");
    button.textContent = config.subscribed ? "取消订阅" : "订阅";
    button.className = config.subscribed ? "default-btn small" : "primary-btn small";
    button.disabled = false;
  }
  function openDialog(mask, initialFocus) {
    if (activeMask) return;
    activeMask = mask;
    restoreFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    background = [...document.body.children]
      .filter((node) => node !== mask && !["SCRIPT", "STYLE"].includes(node.tagName))
      .map((node) => [node, node.inert]);
    background.forEach(([node]) => { node.inert = true; });
    openModal(mask.id);
    initialFocus.focus();
  }
  function closeDialog() {
    if (!activeMask) return;
    closeModal(activeMask.id);
    activeMask = null;
    pending = null;
    editingBrand = null;
    background.forEach(([node, wasInert]) => { node.inert = wasInert; });
    background = [];
    document.body.style.overflow = previousOverflow;
    if (restoreFocus?.isConnected) restoreFocus.focus({ preventScroll: true });
  }
  function setDiscarding(value) {
    discarding = value;
    byId("reportEmailForm").classList.toggle("hidden", value);
    byId("reportEmailDiscardText").classList.toggle("hidden", !value);
    byId("reportEmailModalTitle").textContent = value ? "放弃邮箱修改？" : "设置接收邮箱";
    byId("reportEmailDrawer").setAttribute("role", value ? "alertdialog" : "dialog");
    byId("reportEmailDrawer").setAttribute("aria-describedby", value ? "reportEmailDiscardText" : emailEditing ? "reportEmailHelp" : "reportEmailReadonlyList");
    byId("cancelReportEmailModalBtn").textContent = value ? "继续编辑" : emailEditing ? "取消" : "关闭";
    byId("saveReportEmailsBtn").textContent = value ? "放弃修改" : emailEditing ? "保存" : "编辑";
    if (activeMask === emailMask) {
      if (value) byId("cancelReportEmailModalBtn").focus();
      else if (emailEditing) focusEmailEditor();
      else byId("saveReportEmailsBtn").focus();
    }
  }
  function showEmailReadonly() {
    emailEditing = false;
    editingBrand = null;
    draft = [];
    showError();
    const emails = saved().emails;
    byId("reportEmailReadonlyList").innerHTML = emails.length
      ? emails.map((email) => `<li>${escapeHtml(email)}</li>`).join("")
      : '<li class="report-email-empty">尚未设置接收邮箱，点击“编辑”进行配置。</li>';
    byId("reportEmailDraftCount").textContent = `共 ${emails.length} 个`;
    byId("reportEmailReadonlyList").classList.remove("hidden");
    byId("reportEmailEditor").classList.add("hidden");
    byId("reportEmailRows").innerHTML = "";
    setDiscarding(false);
    byId("reportEmailModal").querySelector(".modal-body").scrollTop = 0;
  }
  function beginEmailEditing() {
    emailEditing = true;
    draft = saved().emails.length ? [...saved().emails] : [""];
    originalRows = JSON.stringify(draft);
    editingBrand = state.currentBrandCode;
    showError();
    byId("reportEmailReadonlyList").classList.add("hidden");
    byId("reportEmailEditor").classList.remove("hidden");
    renderRows();
    setDiscarding(false);
  }
  function openEmailEditor(message = "") {
    if (activeMask) return;
    showEmailReadonly();
    openDialog(emailMask, byId("saveReportEmailsBtn"));
    if (message) showError(message);
  }
  function requestCloseEmailEditor(intent = "close") {
    if (!emailEditing) { closeDialog(); return; }
    if (discarding) { setDiscarding(false); return; }
    if (JSON.stringify(draft) !== originalRows) { discardIntent = intent; setDiscarding(true); return; }
    if (intent === "view") showEmailReadonly(); else closeDialog();
  }
  function saveEmails() {
    if (!emailEditing) { beginEmailEditing(); return; }
    if (discarding) {
      if (discardIntent === "view") showEmailReadonly(); else closeDialog();
      return;
    }
    if (editingBrand !== state.currentBrandCode) { closeDialog(); return; }
    showError();
    const cleaned = [];
    const seen = new Set();
    for (let index = 0; index < draft.length; index++) {
      const email = draft[index].trim();
      if (!email) continue;
      if (/[,，;；\r\n\t]/.test(email)) { showError("每行仅可填写一个邮箱，请点击“添加邮箱”逐项添加。", index); return; }
      if (!validEmail(email)) { showError(`邮箱格式不正确：${email}`, index); return; }
      const key = email.toLowerCase();
      if (seen.has(key)) { showError(`接收邮箱重复：${email}`, index); return; }
      seen.add(key); cleaned.push(email);
    }
    if (saved().subscribed && !cleaned.length) {
      showError("存在已订阅报表，至少需要保留一个有效接收邮箱。请先取消订阅，再清空名单。", draft.length ? 0 : null);
      return;
    }
    if (!persist({ ...saved(), emails: cleaned })) {
      showError("配置保存失败，请检查浏览器存储权限后重试。");
      return;
    }
    showEmailReadonly(); render(); showToast("已保存报表接收邮箱");
  }
  function openSubscriptionConfirmation() {
    const config = saved();
    if (!config.subscribed && !config.emails.length) {
      openEmailEditor("请先配置并保存至少一个有效接收邮箱，再订阅报表。");
      return;
    }
    const subscribe = !config.subscribed;
    const brand = brands.find((item) => item.code === state.currentBrandCode);
    pending = { brand: state.currentBrandCode, subscribe };
    byId("reportPushConfirmTitle").textContent = subscribe ? "订阅报表" : "取消订阅报表";
    byId("reportPushConfirmText").textContent = subscribe
      ? `确认订阅${brand?.name || "当前品牌"}的“月度已开票订单报表”？订阅成功后，从下一个每月 1 日起，每月 1 日自动生成上月报表并发送至以下邮箱。取消订阅后，将停止后续自动生成和邮件推送。`
      : `确认取消订阅${brand?.name || "当前品牌"}的“月度已开票订单报表”？取消后，将停止后续自动生成报表和邮件推送。`;
    byId("reportPushConfirmEmails").textContent = subscribe ? config.emails.join("； ") : "";
    byId("reportPushConfirmEmails").classList.toggle("hidden", !subscribe);
    byId("cancelReportPushConfirmBtn").textContent = subscribe ? "取消" : "暂不取消";
    byId("confirmReportPushBtn").textContent = subscribe ? "确认订阅" : "确认取消订阅";
    byId("reportPushConfirmError").classList.add("hidden");
    openDialog(confirmMask, byId("cancelReportPushConfirmBtn"));
  }

  byId("editReportEmailsBtn").addEventListener("click", () => openEmailEditor());
  byId("closeReportEmailModalBtn").addEventListener("click", () => requestCloseEmailEditor("close"));
  byId("cancelReportEmailModalBtn").addEventListener("click", () => requestCloseEmailEditor(emailEditing ? "view" : "close"));
  byId("saveReportEmailsBtn").addEventListener("click", saveEmails);
  byId("addReportEmailBtn").addEventListener("click", () => {
    draft.push(""); showError(); renderRows(draft.length - 1);
  });
  byId("reportEmailRows").addEventListener("input", (event) => {
    if (!event.target.matches("[data-email-row]")) return;
    draft[Number(event.target.dataset.emailRow)] = event.target.value;
    byId("reportEmailDraftCount").textContent = `已填写 ${draft.filter((email) => email.trim()).length} 个`;
    showError();
  });
  byId("reportEmailRows").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-report-email]");
    if (!button) return;
    const index = Number(button.dataset.deleteReportEmail);
    const remaining = draft.filter((_, row) => row !== index);
    if (saved().subscribed && !remaining.some((email) => validEmail(email.trim()))) {
      showError("存在已订阅报表，至少需要保留一个有效接收邮箱。请先添加替换邮箱，或取消订阅后删除。", index);
      return;
    }
    draft = remaining;
    showError(); renderRows(draft.length ? Math.min(index, draft.length - 1) : null);
    if (!draft.length) byId("addReportEmailBtn").focus();
  });
  byId("reportSubscribeBtn").addEventListener("click", openSubscriptionConfirmation);
  ["closeReportPushConfirmBtn", "cancelReportPushConfirmBtn"].forEach((id) => byId(id).addEventListener("click", closeDialog));
  byId("confirmReportPushBtn").addEventListener("click", () => {
    if (!pending || pending.brand !== state.currentBrandCode) { closeDialog(); return; }
    const config = saved();
    const subscribe = pending.subscribe;
    if (subscribe && !config.emails.length) { closeDialog(); openEmailEditor("请先配置至少一个有效接收邮箱。"); return; }
    if (!persist({ ...config, subscribed: subscribe })) {
      byId("reportPushConfirmError").textContent = "订阅设置保存失败，请检查浏览器存储权限后重试。";
      byId("reportPushConfirmError").classList.remove("hidden");
      return;
    }
    closeDialog(); render(); showToast(subscribe ? "已订阅月度已开票订单报表" : "已取消订阅月度已开票订单报表");
  });
  [emailMask, confirmMask].forEach((mask) => {
    mask.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault(); event.stopPropagation();
        if (mask === emailMask) requestCloseEmailEditor(); else closeDialog();
        return;
      }
      if (event.key !== "Tab") return;
      const controls = [...mask.querySelectorAll("button:not(:disabled), input:not(:disabled)")].filter((node) => node.getClientRects().length);
      const index = controls.indexOf(document.activeElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); controls.at(-1).focus(); }
      else if (!event.shiftKey && (index === controls.length - 1 || index < 0)) { event.preventDefault(); controls[0].focus(); }
    });
  });
  window.resetReportPushView = () => { closeDialog(); draft = []; emailEditing = false; render(); };
  render();
  if (["#report-push", "#report-management"].includes(window.location.hash)) {
    openBrandSettings(state.currentBrandCode);
    setActiveSidebar("brandManagementMenuBtn");
    activatePanel("brandReportPushPanel");
    requestAnimationFrame(() => document.querySelector('[data-tab="brandReportPushPanel"]').scrollIntoView({block: "nearest", inline: "nearest"}));
  }
})();
