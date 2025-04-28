import { h as _sfc_main$7, v as useLocale, a as useAppConfig, t as tv } from './server.mjs';
import { defineComponent, mergeModels, computed, mergeProps, unref, useSlots, ref, useModel, watch, withCtx, createVNode, createBlock, createCommentVNode, openBlock, renderSlot, createTextVNode, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderSlot, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-CYmGQrwQ.mjs';
import { Primitive, useForwardPropsEmits, PaginationRoot, PaginationList, PaginationFirst, PaginationPrev, PaginationListItem, PaginationEllipsis, PaginationNext, PaginationLast } from 'reka-ui';
import { a3 as upperFirst } from '../nitro/nitro.mjs';
import { useVueTable, getExpandedRowModel, getSortedRowModel, getFilteredRowModel, getCoreRowModel, FlexRender } from '@tanstack/vue-table';
import { reactiveOmit, reactivePick } from '@vueuse/core';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RegisterTitleAction",
  __ssrInlineRender: true,
  props: {
    title: {},
    to: {},
    role: {}
  },
  setup(__props) {
    var _a;
    const props = __props;
    const authStore = useAuthStore();
    const userRole = (_a = authStore.user) == null ? void 0 : _a.role;
    const permission = computed(
      () => Array.isArray(props.role) ? props.role.includes(userRole) : userRole === props.role
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap gap-3.5 items-center" }, _attrs))}><h1 class="text-4xl">${ssrInterpolate(_ctx.title)}</h1>`);
      if (unref(permission)) {
        _push(ssrRenderComponent(_component_UButton, {
          to: _ctx.to,
          color: "primary",
          class: "cursor-pointer flex items-center justify-center max-w-[200px] py-3 w-full text-neutral-950",
          size: "lg",
          label: "Cadastrar"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RegisterTitleAction.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const theme$1 = {
  "slots": {
    "root": "relative overflow-auto",
    "base": "min-w-full overflow-clip",
    "caption": "sr-only",
    "thead": "relative [&>tr]:after:absolute [&>tr]:after:inset-x-0 [&>tr]:after:bottom-0 [&>tr]:after:h-px [&>tr]:after:bg-(--ui-border-accented)",
    "tbody": "divide-y divide-default [&>tr]:data-[selectable=true]:hover:bg-elevated/50 [&>tr]:data-[selectable=true]:focus-visible:outline-primary",
    "tr": "data-[selected=true]:bg-elevated/50",
    "th": "px-4 py-3.5 text-sm text-highlighted text-left rtl:text-right font-semibold [&:has([role=checkbox])]:pe-0",
    "td": "p-4 text-sm text-muted whitespace-nowrap [&:has([role=checkbox])]:pe-0",
    "empty": "py-6 text-center text-sm text-muted",
    "loading": "py-6 text-center"
  },
  "variants": {
    "pinned": {
      "true": {
        "th": "sticky bg-default/75 data-[pinned=left]:left-0 data-[pinned=right]:right-0",
        "td": "sticky bg-default/75 data-[pinned=left]:left-0 data-[pinned=right]:right-0"
      }
    },
    "sticky": {
      "true": {
        "thead": "sticky top-0 inset-x-0 bg-default/75 z-[1] backdrop-blur"
      }
    },
    "loading": {
      "true": {
        "thead": "after:absolute after:bottom-0 after:inset-x-0 after:h-px"
      }
    },
    "loadingAnimation": {
      "carousel": "",
      "carousel-inverse": "",
      "swing": "",
      "elastic": ""
    },
    "loadingColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    }
  },
  "compoundVariants": [
    {
      "loading": true,
      "loadingColor": "primary",
      "class": {
        "thead": "after:bg-primary"
      }
    },
    {
      "loading": true,
      "loadingColor": "secondary",
      "class": {
        "thead": "after:bg-secondary"
      }
    },
    {
      "loading": true,
      "loadingColor": "success",
      "class": {
        "thead": "after:bg-success"
      }
    },
    {
      "loading": true,
      "loadingColor": "info",
      "class": {
        "thead": "after:bg-info"
      }
    },
    {
      "loading": true,
      "loadingColor": "warning",
      "class": {
        "thead": "after:bg-warning"
      }
    },
    {
      "loading": true,
      "loadingColor": "error",
      "class": {
        "thead": "after:bg-error"
      }
    },
    {
      "loading": true,
      "loadingColor": "neutral",
      "class": {
        "thead": "after:bg-inverted"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "carousel",
      "class": {
        "thead": "after:animate-[carousel_2s_ease-in-out_infinite] rtl:after:animate-[carousel-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "carousel-inverse",
      "class": {
        "thead": "after:animate-[carousel-inverse_2s_ease-in-out_infinite] rtl:after:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "swing",
      "class": {
        "thead": "after:animate-[swing_2s_ease-in-out_infinite]"
      }
    },
    {
      "loading": true,
      "loadingAnimation": "elastic",
      "class": {
        "thead": "after:animate-[elastic_2s_ease-in-out_infinite]"
      }
    }
  ],
  "defaultVariants": {
    "loadingColor": "primary",
    "loadingAnimation": "carousel"
  }
};
const _sfc_main$1 = {
  __name: "Table",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    as: { type: null, required: false },
    data: { type: Array, required: false },
    columns: { type: Array, required: false },
    caption: { type: String, required: false },
    meta: { type: Object, required: false },
    empty: { type: String, required: false },
    sticky: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    loadingColor: { type: null, required: false },
    loadingAnimation: { type: null, required: false },
    watchOptions: { type: Object, required: false, default: () => ({
      deep: true
    }) },
    globalFilterOptions: { type: Object, required: false },
    columnFiltersOptions: { type: Object, required: false },
    columnPinningOptions: { type: Object, required: false },
    columnSizingOptions: { type: Object, required: false },
    visibilityOptions: { type: Object, required: false },
    sortingOptions: { type: Object, required: false },
    groupingOptions: { type: Object, required: false },
    expandedOptions: { type: Object, required: false },
    rowSelectionOptions: { type: Object, required: false },
    rowPinningOptions: { type: Object, required: false },
    paginationOptions: { type: Object, required: false },
    facetedOptions: { type: Object, required: false },
    onSelect: { type: Function, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    state: { type: Object, required: false },
    onStateChange: { type: Function, required: false },
    renderFallbackValue: { type: null, required: false },
    _features: { type: Array, required: false },
    autoResetAll: { type: Boolean, required: false },
    debugAll: { type: Boolean, required: false },
    debugCells: { type: Boolean, required: false },
    debugColumns: { type: Boolean, required: false },
    debugHeaders: { type: Boolean, required: false },
    debugRows: { type: Boolean, required: false },
    debugTable: { type: Boolean, required: false },
    defaultColumn: { type: Object, required: false },
    getRowId: { type: Function, required: false },
    getSubRows: { type: Function, required: false },
    initialState: { type: Object, required: false },
    mergeOptions: { type: Function, required: false }
  }, {
    "globalFilter": { type: String, ...{ default: void 0 } },
    "globalFilterModifiers": {},
    "columnFilters": { type: Array, ...{ default: [] } },
    "columnFiltersModifiers": {},
    "columnOrder": { type: Array, ...{ default: [] } },
    "columnOrderModifiers": {},
    "columnVisibility": { type: Object, ...{ default: {} } },
    "columnVisibilityModifiers": {},
    "columnPinning": { type: Object, ...{ default: {} } },
    "columnPinningModifiers": {},
    "columnSizing": { type: Object, ...{ default: {} } },
    "columnSizingModifiers": {},
    "columnSizingInfo": { type: Object, ...{ default: {} } },
    "columnSizingInfoModifiers": {},
    "rowSelection": { type: Object, ...{ default: {} } },
    "rowSelectionModifiers": {},
    "rowPinning": { type: Object, ...{ default: {} } },
    "rowPinningModifiers": {},
    "sorting": { type: Array, ...{ default: [] } },
    "sortingModifiers": {},
    "grouping": { type: Array, ...{ default: [] } },
    "groupingModifiers": {},
    "expanded": { type: [Boolean, Object], ...{ default: {} } },
    "expandedModifiers": {},
    "pagination": { type: Object, ...{ default: {} } },
    "paginationModifiers": {}
  }),
  emits: ["update:globalFilter", "update:columnFilters", "update:columnOrder", "update:columnVisibility", "update:columnPinning", "update:columnSizing", "update:columnSizingInfo", "update:rowSelection", "update:rowPinning", "update:sorting", "update:grouping", "update:expanded", "update:pagination"],
  setup(__props, { expose: __expose }) {
    var _a;
    const props = __props;
    const slots = useSlots();
    const { t } = useLocale();
    const appConfig = useAppConfig();
    const data = ref((_a = props.data) != null ? _a : []);
    const columns = computed(() => {
      var _a2, _b;
      return (_b = props.columns) != null ? _b : Object.keys((_a2 = data.value[0]) != null ? _a2 : {}).map((accessorKey) => ({ accessorKey, header: upperFirst(accessorKey) }));
    });
    const meta = computed(() => {
      var _a2;
      return (_a2 = props.meta) != null ? _a2 : {};
    });
    const ui = computed(() => {
      var _a2;
      return tv({ extend: tv(theme$1), ...((_a2 = appConfig.ui) == null ? void 0 : _a2.table) || {} })({
        sticky: props.sticky,
        loading: props.loading,
        loadingColor: props.loadingColor,
        loadingAnimation: props.loadingAnimation
      });
    });
    const globalFilterState = useModel(__props, "globalFilter", { type: String, ...{ default: void 0 } });
    const columnFiltersState = useModel(__props, "columnFilters", { type: Array, ...{ default: [] } });
    const columnOrderState = useModel(__props, "columnOrder", { type: Array, ...{ default: [] } });
    const columnVisibilityState = useModel(__props, "columnVisibility", { type: Object, ...{ default: {} } });
    const columnPinningState = useModel(__props, "columnPinning", { type: Object, ...{ default: {} } });
    const columnSizingState = useModel(__props, "columnSizing", { type: Object, ...{ default: {} } });
    const columnSizingInfoState = useModel(__props, "columnSizingInfo", { type: Object, ...{ default: {} } });
    const rowSelectionState = useModel(__props, "rowSelection", { type: Object, ...{ default: {} } });
    const rowPinningState = useModel(__props, "rowPinning", { type: Object, ...{ default: {} } });
    const sortingState = useModel(__props, "sorting", { type: Array, ...{ default: [] } });
    const groupingState = useModel(__props, "grouping", { type: Array, ...{ default: [] } });
    const expandedState = useModel(__props, "expanded", { type: [Boolean, Object], ...{ default: {} } });
    const paginationState = useModel(__props, "pagination", { type: Object, ...{ default: {} } });
    const tableRef = ref();
    const tableApi = useVueTable({
      ...reactiveOmit(props, "as", "data", "columns", "caption", "sticky", "loading", "loadingColor", "loadingAnimation", "class", "ui"),
      data,
      columns: columns.value,
      meta: meta.value,
      getCoreRowModel: getCoreRowModel(),
      ...props.globalFilterOptions || {},
      onGlobalFilterChange: (updaterOrValue) => valueUpdater(updaterOrValue, globalFilterState),
      ...props.columnFiltersOptions || {},
      getFilteredRowModel: getFilteredRowModel(),
      onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFiltersState),
      onColumnOrderChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnOrderState),
      ...props.visibilityOptions || {},
      onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibilityState),
      ...props.columnPinningOptions || {},
      onColumnPinningChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnPinningState),
      ...props.columnSizingOptions || {},
      onColumnSizingChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnSizingState),
      onColumnSizingInfoChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnSizingInfoState),
      ...props.rowSelectionOptions || {},
      onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelectionState),
      ...props.rowPinningOptions || {},
      onRowPinningChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowPinningState),
      ...props.sortingOptions || {},
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sortingState),
      ...props.groupingOptions || {},
      onGroupingChange: (updaterOrValue) => valueUpdater(updaterOrValue, groupingState),
      ...props.expandedOptions || {},
      getExpandedRowModel: getExpandedRowModel(),
      onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expandedState),
      ...props.paginationOptions || {},
      onPaginationChange: (updaterOrValue) => valueUpdater(updaterOrValue, paginationState),
      ...props.facetedOptions || {},
      state: {
        get globalFilter() {
          return globalFilterState.value;
        },
        get columnFilters() {
          return columnFiltersState.value;
        },
        get columnOrder() {
          return columnOrderState.value;
        },
        get columnVisibility() {
          return columnVisibilityState.value;
        },
        get columnPinning() {
          return columnPinningState.value;
        },
        get expanded() {
          return expandedState.value;
        },
        get rowSelection() {
          return rowSelectionState.value;
        },
        get sorting() {
          return sortingState.value;
        },
        get grouping() {
          return groupingState.value;
        },
        get rowPinning() {
          return rowPinningState.value;
        },
        get columnSizing() {
          return columnSizingState.value;
        },
        get columnSizingInfo() {
          return columnSizingInfoState.value;
        },
        get pagination() {
          return paginationState.value;
        }
      }
    });
    function valueUpdater(updaterOrValue, ref2) {
      ref2.value = typeof updaterOrValue === "function" ? updaterOrValue(ref2.value) : updaterOrValue;
    }
    function handleRowSelect(row, e) {
      if (!props.onSelect) {
        return;
      }
      const target = e.target;
      const isInteractive = target.closest("button") || target.closest("a");
      if (isInteractive) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      props.onSelect(row, e);
    }
    watch(
      () => props.data,
      () => {
        data.value = props.data ? [...props.data] : [];
      },
      props.watchOptions
    );
    __expose({
      tableRef,
      tableApi
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.root({ class: [props.class, (_a2 = props.ui) == null ? void 0 : _a2.root] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a22, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          if (_push2) {
            _push2(`<table class="${ssrRenderClass(ui.value.base({ class: [(_a22 = props.ui) == null ? void 0 : _a22.base] }))}"${_scopeId}>`);
            if (__props.caption || !!slots.caption) {
              _push2(`<caption class="${ssrRenderClass(ui.value.caption({ class: [(_b = props.ui) == null ? void 0 : _b.caption] }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "caption", {}, () => {
                _push2(`${ssrInterpolate(__props.caption)}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</caption>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<thead class="${ssrRenderClass(ui.value.thead({ class: [(_c = props.ui) == null ? void 0 : _c.thead] }))}"${_scopeId}><!--[-->`);
            ssrRenderList(unref(tableApi).getHeaderGroups(), (headerGroup) => {
              var _a3;
              _push2(`<tr class="${ssrRenderClass(ui.value.tr({ class: [(_a3 = props.ui) == null ? void 0 : _a3.tr] }))}"${_scopeId}><!--[-->`);
              ssrRenderList(headerGroup.headers, (header) => {
                var _a4, _b2, _c2, _d2, _e2;
                _push2(`<th${ssrRenderAttr("data-pinned", header.column.getIsPinned())}${ssrRenderAttr("colspan", header.colSpan > 1 ? header.colSpan : void 0)} class="${ssrRenderClass(ui.value.th({
                  class: [
                    (_a4 = props.ui) == null ? void 0 : _a4.th,
                    typeof ((_c2 = (_b2 = header.column.columnDef.meta) == null ? void 0 : _b2.class) == null ? void 0 : _c2.th) === "function" ? header.column.columnDef.meta.class.th(header) : (_e2 = (_d2 = header.column.columnDef.meta) == null ? void 0 : _d2.class) == null ? void 0 : _e2.th
                  ],
                  pinned: !!header.column.getIsPinned()
                }))}"${_scopeId}>`);
                ssrRenderSlot(_ctx.$slots, `${header.id}-header`, mergeProps({ ref_for: true }, header.getContext()), () => {
                  if (!header.isPlaceholder) {
                    _push2(ssrRenderComponent(unref(FlexRender), {
                      render: header.column.columnDef.header,
                      props: header.getContext()
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                }, _push2, _parent2, _scopeId);
                _push2(`</th>`);
              });
              _push2(`<!--]--></tr>`);
            });
            _push2(`<!--]--></thead><tbody class="${ssrRenderClass(ui.value.tbody({ class: [(_d = props.ui) == null ? void 0 : _d.tbody] }))}"${_scopeId}>`);
            if ((_e = unref(tableApi).getRowModel().rows) == null ? void 0 : _e.length) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(tableApi).getRowModel().rows, (row) => {
                var _a3, _b2, _c2, _d2, _e2, _f2, _g2;
                _push2(`<!--[--><tr${ssrRenderAttr("data-selected", row.getIsSelected())}${ssrRenderAttr("data-selectable", !!props.onSelect)}${ssrRenderAttr("data-expanded", row.getIsExpanded())}${ssrRenderAttr("role", props.onSelect ? "button" : void 0)}${ssrRenderAttr("tabindex", props.onSelect ? 0 : void 0)} class="${ssrRenderClass(ui.value.tr({
                  class: [
                    (_a3 = props.ui) == null ? void 0 : _a3.tr,
                    typeof ((_c2 = (_b2 = unref(tableApi).options.meta) == null ? void 0 : _b2.class) == null ? void 0 : _c2.tr) === "function" ? unref(tableApi).options.meta.class.tr(row) : (_e2 = (_d2 = unref(tableApi).options.meta) == null ? void 0 : _d2.class) == null ? void 0 : _e2.tr
                  ]
                }))}"${_scopeId}><!--[-->`);
                ssrRenderList(row.getVisibleCells(), (cell) => {
                  var _a4, _b3, _c3, _d3, _e3;
                  _push2(`<td${ssrRenderAttr("data-pinned", cell.column.getIsPinned())} class="${ssrRenderClass(ui.value.td({
                    class: [
                      (_a4 = props.ui) == null ? void 0 : _a4.td,
                      typeof ((_c3 = (_b3 = cell.column.columnDef.meta) == null ? void 0 : _b3.class) == null ? void 0 : _c3.td) === "function" ? cell.column.columnDef.meta.class.td(cell) : (_e3 = (_d3 = cell.column.columnDef.meta) == null ? void 0 : _d3.class) == null ? void 0 : _e3.td
                    ],
                    pinned: !!cell.column.getIsPinned()
                  }))}"${_scopeId}>`);
                  ssrRenderSlot(_ctx.$slots, `${cell.column.id}-cell`, mergeProps({ ref_for: true }, cell.getContext()), () => {
                    _push2(ssrRenderComponent(unref(FlexRender), {
                      render: cell.column.columnDef.cell,
                      props: cell.getContext()
                    }, null, _parent2, _scopeId));
                  }, _push2, _parent2, _scopeId);
                  _push2(`</td>`);
                });
                _push2(`<!--]--></tr>`);
                if (row.getIsExpanded()) {
                  _push2(`<tr class="${ssrRenderClass(ui.value.tr({ class: [(_f2 = props.ui) == null ? void 0 : _f2.tr] }))}"${_scopeId}><td${ssrRenderAttr("colspan", row.getAllCells().length)} class="${ssrRenderClass(ui.value.td({ class: [(_g2 = props.ui) == null ? void 0 : _g2.td] }))}"${_scopeId}>`);
                  ssrRenderSlot(_ctx.$slots, "expanded", { row }, null, _push2, _parent2, _scopeId);
                  _push2(`</td></tr>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]-->`);
            } else if (__props.loading && !!slots["loading"]) {
              _push2(`<tr${_scopeId}><td${ssrRenderAttr("colspan", (_f = columns.value) == null ? void 0 : _f.length)} class="${ssrRenderClass(ui.value.loading({ class: (_g = props.ui) == null ? void 0 : _g.loading }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "loading", {}, null, _push2, _parent2, _scopeId);
              _push2(`</td></tr>`);
            } else {
              _push2(`<tr${_scopeId}><td${ssrRenderAttr("colspan", (_h = columns.value) == null ? void 0 : _h.length)} class="${ssrRenderClass(ui.value.empty({ class: (_i = props.ui) == null ? void 0 : _i.empty }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "empty", {}, () => {
                _push2(`${ssrInterpolate(__props.empty || unref(t)("table.noData"))}`);
              }, _push2, _parent2, _scopeId);
              _push2(`</td></tr>`);
            }
            _push2(`</tbody></table>`);
          } else {
            return [
              createVNode("table", {
                ref_key: "tableRef",
                ref: tableRef,
                class: ui.value.base({ class: [(_j = props.ui) == null ? void 0 : _j.base] })
              }, [
                __props.caption || !!slots.caption ? (openBlock(), createBlock("caption", {
                  key: 0,
                  class: ui.value.caption({ class: [(_k = props.ui) == null ? void 0 : _k.caption] })
                }, [
                  renderSlot(_ctx.$slots, "caption", {}, () => [
                    createTextVNode(toDisplayString(__props.caption), 1)
                  ])
                ], 2)) : createCommentVNode("", true),
                createVNode("thead", {
                  class: ui.value.thead({ class: [(_l = props.ui) == null ? void 0 : _l.thead] })
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(tableApi).getHeaderGroups(), (headerGroup) => {
                    var _a3;
                    return openBlock(), createBlock("tr", {
                      key: headerGroup.id,
                      class: ui.value.tr({ class: [(_a3 = props.ui) == null ? void 0 : _a3.tr] })
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(headerGroup.headers, (header) => {
                        var _a4, _b2, _c2, _d2, _e2;
                        return openBlock(), createBlock("th", {
                          key: header.id,
                          "data-pinned": header.column.getIsPinned(),
                          colspan: header.colSpan > 1 ? header.colSpan : void 0,
                          class: ui.value.th({
                            class: [
                              (_a4 = props.ui) == null ? void 0 : _a4.th,
                              typeof ((_c2 = (_b2 = header.column.columnDef.meta) == null ? void 0 : _b2.class) == null ? void 0 : _c2.th) === "function" ? header.column.columnDef.meta.class.th(header) : (_e2 = (_d2 = header.column.columnDef.meta) == null ? void 0 : _d2.class) == null ? void 0 : _e2.th
                            ],
                            pinned: !!header.column.getIsPinned()
                          })
                        }, [
                          renderSlot(_ctx.$slots, `${header.id}-header`, mergeProps({ ref_for: true }, header.getContext()), () => [
                            !header.isPlaceholder ? (openBlock(), createBlock(unref(FlexRender), {
                              key: 0,
                              render: header.column.columnDef.header,
                              props: header.getContext()
                            }, null, 8, ["render", "props"])) : createCommentVNode("", true)
                          ])
                        ], 10, ["data-pinned", "colspan"]);
                      }), 128))
                    ], 2);
                  }), 128))
                ], 2),
                createVNode("tbody", {
                  class: ui.value.tbody({ class: [(_m = props.ui) == null ? void 0 : _m.tbody] })
                }, [
                  ((_n = unref(tableApi).getRowModel().rows) == null ? void 0 : _n.length) ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(tableApi).getRowModel().rows, (row) => {
                    var _a3, _b2, _c2, _d2, _e2, _f2, _g2;
                    return openBlock(), createBlock(Fragment, {
                      key: row.id
                    }, [
                      createVNode("tr", {
                        "data-selected": row.getIsSelected(),
                        "data-selectable": !!props.onSelect,
                        "data-expanded": row.getIsExpanded(),
                        role: props.onSelect ? "button" : void 0,
                        tabindex: props.onSelect ? 0 : void 0,
                        class: ui.value.tr({
                          class: [
                            (_a3 = props.ui) == null ? void 0 : _a3.tr,
                            typeof ((_c2 = (_b2 = unref(tableApi).options.meta) == null ? void 0 : _b2.class) == null ? void 0 : _c2.tr) === "function" ? unref(tableApi).options.meta.class.tr(row) : (_e2 = (_d2 = unref(tableApi).options.meta) == null ? void 0 : _d2.class) == null ? void 0 : _e2.tr
                          ]
                        }),
                        onClick: ($event) => handleRowSelect(row, $event)
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(row.getVisibleCells(), (cell) => {
                          var _a4, _b3, _c3, _d3, _e3;
                          return openBlock(), createBlock("td", {
                            key: cell.id,
                            "data-pinned": cell.column.getIsPinned(),
                            class: ui.value.td({
                              class: [
                                (_a4 = props.ui) == null ? void 0 : _a4.td,
                                typeof ((_c3 = (_b3 = cell.column.columnDef.meta) == null ? void 0 : _b3.class) == null ? void 0 : _c3.td) === "function" ? cell.column.columnDef.meta.class.td(cell) : (_e3 = (_d3 = cell.column.columnDef.meta) == null ? void 0 : _d3.class) == null ? void 0 : _e3.td
                              ],
                              pinned: !!cell.column.getIsPinned()
                            })
                          }, [
                            renderSlot(_ctx.$slots, `${cell.column.id}-cell`, mergeProps({ ref_for: true }, cell.getContext()), () => [
                              createVNode(unref(FlexRender), {
                                render: cell.column.columnDef.cell,
                                props: cell.getContext()
                              }, null, 8, ["render", "props"])
                            ])
                          ], 10, ["data-pinned"]);
                        }), 128))
                      ], 10, ["data-selected", "data-selectable", "data-expanded", "role", "tabindex", "onClick"]),
                      row.getIsExpanded() ? (openBlock(), createBlock("tr", {
                        key: 0,
                        class: ui.value.tr({ class: [(_f2 = props.ui) == null ? void 0 : _f2.tr] })
                      }, [
                        createVNode("td", {
                          colspan: row.getAllCells().length,
                          class: ui.value.td({ class: [(_g2 = props.ui) == null ? void 0 : _g2.td] })
                        }, [
                          renderSlot(_ctx.$slots, "expanded", { row })
                        ], 10, ["colspan"])
                      ], 2)) : createCommentVNode("", true)
                    ], 64);
                  }), 128)) : __props.loading && !!slots["loading"] ? (openBlock(), createBlock("tr", { key: 1 }, [
                    createVNode("td", {
                      colspan: (_o = columns.value) == null ? void 0 : _o.length,
                      class: ui.value.loading({ class: (_p = props.ui) == null ? void 0 : _p.loading })
                    }, [
                      renderSlot(_ctx.$slots, "loading")
                    ], 10, ["colspan"])
                  ])) : (openBlock(), createBlock("tr", { key: 2 }, [
                    createVNode("td", {
                      colspan: (_q = columns.value) == null ? void 0 : _q.length,
                      class: ui.value.empty({ class: (_r = props.ui) == null ? void 0 : _r.empty })
                    }, [
                      renderSlot(_ctx.$slots, "empty", {}, () => [
                        createTextVNode(toDisplayString(__props.empty || unref(t)("table.noData")), 1)
                      ])
                    ], 10, ["colspan"])
                  ]))
                ], 2)
              ], 2)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Table.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "root": "",
    "list": "flex items-center gap-1",
    "ellipsis": "pointer-events-none",
    "label": "min-w-5 text-center",
    "first": "",
    "prev": "",
    "item": "",
    "next": "",
    "last": ""
  }
};
const _sfc_main = {
  __name: "Pagination",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    firstIcon: { type: String, required: false },
    prevIcon: { type: String, required: false },
    nextIcon: { type: String, required: false },
    lastIcon: { type: String, required: false },
    ellipsisIcon: { type: String, required: false },
    color: { type: null, required: false, default: "neutral" },
    variant: { type: null, required: false, default: "outline" },
    activeColor: { type: null, required: false, default: "primary" },
    activeVariant: { type: null, required: false, default: "solid" },
    showControls: { type: Boolean, required: false, default: true },
    size: { type: null, required: false, default: "md" },
    to: { type: Function, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultPage: { type: Number, required: false },
    disabled: { type: Boolean, required: false },
    itemsPerPage: { type: Number, required: false, default: 10 },
    page: { type: Number, required: false },
    showEdges: { type: Boolean, required: false, default: false },
    siblingCount: { type: Number, required: false, default: 2 },
    total: { type: Number, required: false, default: 0 }
  },
  emits: ["update:page"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const { dir } = useLocale();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "as", "defaultPage", "disabled", "itemsPerPage", "page", "showEdges", "siblingCount", "total"), emits);
    const firstIcon = computed(() => props.firstIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft));
    const prevIcon = computed(() => props.prevIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft));
    const nextIcon = computed(() => props.nextIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight));
    const lastIcon = computed(() => props.lastIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight));
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme), ...((_a = appConfig.ui) == null ? void 0 : _a.pagination) || {} })();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(ssrRenderComponent(unref(PaginationRoot), mergeProps(unref(rootProps), {
        class: ui.value.root({ class: [props.class, (_a = props.ui) == null ? void 0 : _a.root] })
      }, _attrs), {
        default: withCtx(({ page, pageCount }, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(PaginationList), {
              class: ui.value.list({ class: (_a2 = props.ui) == null ? void 0 : _a2.list })
            }, {
              default: withCtx(({ items }, _push3, _parent3, _scopeId2) => {
                var _a3, _b2, _c, _d, _e, _f, _g, _h;
                if (_push3) {
                  if (__props.showControls || !!slots.first) {
                    _push3(ssrRenderComponent(unref(PaginationFirst), {
                      "as-child": "",
                      class: ui.value.first({ class: (_a3 = props.ui) == null ? void 0 : _a3.first })
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "first", {}, () => {
                            var _a4;
                            _push4(ssrRenderComponent(_sfc_main$7, {
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: firstIcon.value,
                              to: (_a4 = __props.to) == null ? void 0 : _a4.call(__props, 1)
                            }, null, _parent4, _scopeId3));
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "first", {}, () => {
                              var _a4;
                              return [
                                createVNode(_sfc_main$7, {
                                  color: __props.color,
                                  variant: __props.variant,
                                  size: __props.size,
                                  icon: firstIcon.value,
                                  to: (_a4 = __props.to) == null ? void 0 : _a4.call(__props, 1)
                                }, null, 8, ["color", "variant", "size", "icon", "to"])
                              ];
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.showControls || !!slots.prev) {
                    _push3(ssrRenderComponent(unref(PaginationPrev), {
                      "as-child": "",
                      class: ui.value.prev({ class: (_b2 = props.ui) == null ? void 0 : _b2.prev })
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "prev", {}, () => {
                            var _a4;
                            _push4(ssrRenderComponent(_sfc_main$7, {
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: prevIcon.value,
                              to: page > 1 ? (_a4 = __props.to) == null ? void 0 : _a4.call(__props, page - 1) : void 0
                            }, null, _parent4, _scopeId3));
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "prev", {}, () => {
                              var _a4;
                              return [
                                createVNode(_sfc_main$7, {
                                  color: __props.color,
                                  variant: __props.variant,
                                  size: __props.size,
                                  icon: prevIcon.value,
                                  to: page > 1 ? (_a4 = __props.to) == null ? void 0 : _a4.call(__props, page - 1) : void 0
                                }, null, 8, ["color", "variant", "size", "icon", "to"])
                              ];
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(items, (item, index) => {
                    var _a4, _b3;
                    _push3(`<!--[-->`);
                    if (item.type === "page") {
                      _push3(ssrRenderComponent(unref(PaginationListItem), {
                        key: index,
                        "as-child": "",
                        value: item.value,
                        class: ui.value.item({ class: (_a4 = props.ui) == null ? void 0 : _a4.item })
                      }, {
                        default: withCtx((_, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, { item, index, page, pageCount }), () => {
                              var _a5;
                              _push4(ssrRenderComponent(_sfc_main$7, {
                                color: page === item.value ? __props.activeColor : __props.color,
                                variant: page === item.value ? __props.activeVariant : __props.variant,
                                size: __props.size,
                                label: String(item.value),
                                ui: { label: ui.value.label() },
                                to: (_a5 = __props.to) == null ? void 0 : _a5.call(__props, item.value),
                                square: ""
                              }, null, _parent4, _scopeId3));
                            }, _push4, _parent4, _scopeId3);
                          } else {
                            return [
                              renderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, { item, index, page, pageCount }), () => {
                                var _a5;
                                return [
                                  createVNode(_sfc_main$7, {
                                    color: page === item.value ? __props.activeColor : __props.color,
                                    variant: page === item.value ? __props.activeVariant : __props.variant,
                                    size: __props.size,
                                    label: String(item.value),
                                    ui: { label: ui.value.label() },
                                    to: (_a5 = __props.to) == null ? void 0 : _a5.call(__props, item.value),
                                    square: ""
                                  }, null, 8, ["color", "variant", "size", "label", "ui", "to"])
                                ];
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(ssrRenderComponent(unref(PaginationEllipsis), {
                        key: item.type,
                        index,
                        "as-child": "",
                        class: ui.value.ellipsis({ class: (_b3 = props.ui) == null ? void 0 : _b3.ellipsis })
                      }, {
                        default: withCtx((_, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderSlot(_ctx.$slots, "ellipsis", {}, () => {
                              _push4(ssrRenderComponent(_sfc_main$7, {
                                color: __props.color,
                                variant: __props.variant,
                                size: __props.size,
                                icon: __props.ellipsisIcon || unref(appConfig).ui.icons.ellipsis
                              }, null, _parent4, _scopeId3));
                            }, _push4, _parent4, _scopeId3);
                          } else {
                            return [
                              renderSlot(_ctx.$slots, "ellipsis", {}, () => [
                                createVNode(_sfc_main$7, {
                                  color: __props.color,
                                  variant: __props.variant,
                                  size: __props.size,
                                  icon: __props.ellipsisIcon || unref(appConfig).ui.icons.ellipsis
                                }, null, 8, ["color", "variant", "size", "icon"])
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    }
                    _push3(`<!--]-->`);
                  });
                  _push3(`<!--]-->`);
                  if (__props.showControls || !!slots.next) {
                    _push3(ssrRenderComponent(unref(PaginationNext), {
                      "as-child": "",
                      class: ui.value.next({ class: (_c = props.ui) == null ? void 0 : _c.next })
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "next", {}, () => {
                            var _a4;
                            _push4(ssrRenderComponent(_sfc_main$7, {
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: nextIcon.value,
                              to: page < pageCount ? (_a4 = __props.to) == null ? void 0 : _a4.call(__props, page + 1) : void 0
                            }, null, _parent4, _scopeId3));
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "next", {}, () => {
                              var _a4;
                              return [
                                createVNode(_sfc_main$7, {
                                  color: __props.color,
                                  variant: __props.variant,
                                  size: __props.size,
                                  icon: nextIcon.value,
                                  to: page < pageCount ? (_a4 = __props.to) == null ? void 0 : _a4.call(__props, page + 1) : void 0
                                }, null, 8, ["color", "variant", "size", "icon", "to"])
                              ];
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.showControls || !!slots.last) {
                    _push3(ssrRenderComponent(unref(PaginationLast), {
                      "as-child": "",
                      class: ui.value.last({ class: (_d = props.ui) == null ? void 0 : _d.last })
                    }, {
                      default: withCtx((_, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "last", {}, () => {
                            var _a4;
                            _push4(ssrRenderComponent(_sfc_main$7, {
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: lastIcon.value,
                              to: (_a4 = __props.to) == null ? void 0 : _a4.call(__props, pageCount)
                            }, null, _parent4, _scopeId3));
                          }, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "last", {}, () => {
                              var _a4;
                              return [
                                createVNode(_sfc_main$7, {
                                  color: __props.color,
                                  variant: __props.variant,
                                  size: __props.size,
                                  icon: lastIcon.value,
                                  to: (_a4 = __props.to) == null ? void 0 : _a4.call(__props, pageCount)
                                }, null, 8, ["color", "variant", "size", "icon", "to"])
                              ];
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    __props.showControls || !!slots.first ? (openBlock(), createBlock(unref(PaginationFirst), {
                      key: 0,
                      "as-child": "",
                      class: ui.value.first({ class: (_e = props.ui) == null ? void 0 : _e.first })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "first", {}, () => {
                          var _a4;
                          return [
                            createVNode(_sfc_main$7, {
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: firstIcon.value,
                              to: (_a4 = __props.to) == null ? void 0 : _a4.call(__props, 1)
                            }, null, 8, ["color", "variant", "size", "icon", "to"])
                          ];
                        })
                      ]),
                      _: 3
                    }, 8, ["class"])) : createCommentVNode("", true),
                    __props.showControls || !!slots.prev ? (openBlock(), createBlock(unref(PaginationPrev), {
                      key: 1,
                      "as-child": "",
                      class: ui.value.prev({ class: (_f = props.ui) == null ? void 0 : _f.prev })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "prev", {}, () => {
                          var _a4;
                          return [
                            createVNode(_sfc_main$7, {
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: prevIcon.value,
                              to: page > 1 ? (_a4 = __props.to) == null ? void 0 : _a4.call(__props, page - 1) : void 0
                            }, null, 8, ["color", "variant", "size", "icon", "to"])
                          ];
                        })
                      ]),
                      _: 2
                    }, 1032, ["class"])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                      var _a4, _b3;
                      return openBlock(), createBlock(Fragment, null, [
                        item.type === "page" ? (openBlock(), createBlock(unref(PaginationListItem), {
                          key: index,
                          "as-child": "",
                          value: item.value,
                          class: ui.value.item({ class: (_a4 = props.ui) == null ? void 0 : _a4.item })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, { item, index, page, pageCount }), () => {
                              var _a5;
                              return [
                                createVNode(_sfc_main$7, {
                                  color: page === item.value ? __props.activeColor : __props.color,
                                  variant: page === item.value ? __props.activeVariant : __props.variant,
                                  size: __props.size,
                                  label: String(item.value),
                                  ui: { label: ui.value.label() },
                                  to: (_a5 = __props.to) == null ? void 0 : _a5.call(__props, item.value),
                                  square: ""
                                }, null, 8, ["color", "variant", "size", "label", "ui", "to"])
                              ];
                            })
                          ]),
                          _: 2
                        }, 1032, ["value", "class"])) : (openBlock(), createBlock(unref(PaginationEllipsis), {
                          key: item.type,
                          index,
                          "as-child": "",
                          class: ui.value.ellipsis({ class: (_b3 = props.ui) == null ? void 0 : _b3.ellipsis })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "ellipsis", {}, () => [
                              createVNode(_sfc_main$7, {
                                color: __props.color,
                                variant: __props.variant,
                                size: __props.size,
                                icon: __props.ellipsisIcon || unref(appConfig).ui.icons.ellipsis
                              }, null, 8, ["color", "variant", "size", "icon"])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["index", "class"]))
                      ], 64);
                    }), 256)),
                    __props.showControls || !!slots.next ? (openBlock(), createBlock(unref(PaginationNext), {
                      key: 2,
                      "as-child": "",
                      class: ui.value.next({ class: (_g = props.ui) == null ? void 0 : _g.next })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "next", {}, () => {
                          var _a4;
                          return [
                            createVNode(_sfc_main$7, {
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: nextIcon.value,
                              to: page < pageCount ? (_a4 = __props.to) == null ? void 0 : _a4.call(__props, page + 1) : void 0
                            }, null, 8, ["color", "variant", "size", "icon", "to"])
                          ];
                        })
                      ]),
                      _: 2
                    }, 1032, ["class"])) : createCommentVNode("", true),
                    __props.showControls || !!slots.last ? (openBlock(), createBlock(unref(PaginationLast), {
                      key: 3,
                      "as-child": "",
                      class: ui.value.last({ class: (_h = props.ui) == null ? void 0 : _h.last })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "last", {}, () => {
                          var _a4;
                          return [
                            createVNode(_sfc_main$7, {
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: lastIcon.value,
                              to: (_a4 = __props.to) == null ? void 0 : _a4.call(__props, pageCount)
                            }, null, 8, ["color", "variant", "size", "icon", "to"])
                          ];
                        })
                      ]),
                      _: 2
                    }, 1032, ["class"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(PaginationList), {
                class: ui.value.list({ class: (_b = props.ui) == null ? void 0 : _b.list })
              }, {
                default: withCtx(({ items }) => {
                  var _a3, _b2, _c, _d;
                  return [
                    __props.showControls || !!slots.first ? (openBlock(), createBlock(unref(PaginationFirst), {
                      key: 0,
                      "as-child": "",
                      class: ui.value.first({ class: (_a3 = props.ui) == null ? void 0 : _a3.first })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "first", {}, () => {
                          var _a4;
                          return [
                            createVNode(_sfc_main$7, {
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: firstIcon.value,
                              to: (_a4 = __props.to) == null ? void 0 : _a4.call(__props, 1)
                            }, null, 8, ["color", "variant", "size", "icon", "to"])
                          ];
                        })
                      ]),
                      _: 3
                    }, 8, ["class"])) : createCommentVNode("", true),
                    __props.showControls || !!slots.prev ? (openBlock(), createBlock(unref(PaginationPrev), {
                      key: 1,
                      "as-child": "",
                      class: ui.value.prev({ class: (_b2 = props.ui) == null ? void 0 : _b2.prev })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "prev", {}, () => {
                          var _a4;
                          return [
                            createVNode(_sfc_main$7, {
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: prevIcon.value,
                              to: page > 1 ? (_a4 = __props.to) == null ? void 0 : _a4.call(__props, page - 1) : void 0
                            }, null, 8, ["color", "variant", "size", "icon", "to"])
                          ];
                        })
                      ]),
                      _: 2
                    }, 1032, ["class"])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(items, (item, index) => {
                      var _a4, _b3;
                      return openBlock(), createBlock(Fragment, null, [
                        item.type === "page" ? (openBlock(), createBlock(unref(PaginationListItem), {
                          key: index,
                          "as-child": "",
                          value: item.value,
                          class: ui.value.item({ class: (_a4 = props.ui) == null ? void 0 : _a4.item })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "item", mergeProps({ ref_for: true }, { item, index, page, pageCount }), () => {
                              var _a5;
                              return [
                                createVNode(_sfc_main$7, {
                                  color: page === item.value ? __props.activeColor : __props.color,
                                  variant: page === item.value ? __props.activeVariant : __props.variant,
                                  size: __props.size,
                                  label: String(item.value),
                                  ui: { label: ui.value.label() },
                                  to: (_a5 = __props.to) == null ? void 0 : _a5.call(__props, item.value),
                                  square: ""
                                }, null, 8, ["color", "variant", "size", "label", "ui", "to"])
                              ];
                            })
                          ]),
                          _: 2
                        }, 1032, ["value", "class"])) : (openBlock(), createBlock(unref(PaginationEllipsis), {
                          key: item.type,
                          index,
                          "as-child": "",
                          class: ui.value.ellipsis({ class: (_b3 = props.ui) == null ? void 0 : _b3.ellipsis })
                        }, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "ellipsis", {}, () => [
                              createVNode(_sfc_main$7, {
                                color: __props.color,
                                variant: __props.variant,
                                size: __props.size,
                                icon: __props.ellipsisIcon || unref(appConfig).ui.icons.ellipsis
                              }, null, 8, ["color", "variant", "size", "icon"])
                            ])
                          ]),
                          _: 2
                        }, 1032, ["index", "class"]))
                      ], 64);
                    }), 256)),
                    __props.showControls || !!slots.next ? (openBlock(), createBlock(unref(PaginationNext), {
                      key: 2,
                      "as-child": "",
                      class: ui.value.next({ class: (_c = props.ui) == null ? void 0 : _c.next })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "next", {}, () => {
                          var _a4;
                          return [
                            createVNode(_sfc_main$7, {
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: nextIcon.value,
                              to: page < pageCount ? (_a4 = __props.to) == null ? void 0 : _a4.call(__props, page + 1) : void 0
                            }, null, 8, ["color", "variant", "size", "icon", "to"])
                          ];
                        })
                      ]),
                      _: 2
                    }, 1032, ["class"])) : createCommentVNode("", true),
                    __props.showControls || !!slots.last ? (openBlock(), createBlock(unref(PaginationLast), {
                      key: 3,
                      "as-child": "",
                      class: ui.value.last({ class: (_d = props.ui) == null ? void 0 : _d.last })
                    }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "last", {}, () => {
                          var _a4;
                          return [
                            createVNode(_sfc_main$7, {
                              color: __props.color,
                              variant: __props.variant,
                              size: __props.size,
                              icon: lastIcon.value,
                              to: (_a4 = __props.to) == null ? void 0 : _a4.call(__props, pageCount)
                            }, null, 8, ["color", "variant", "size", "icon", "to"])
                          ];
                        })
                      ]),
                      _: 2
                    }, 1032, ["class"])) : createCommentVNode("", true)
                  ];
                }),
                _: 2
              }, 1032, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Pagination.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$2 as _, _sfc_main$1 as a, _sfc_main as b };
//# sourceMappingURL=Pagination-B6VXqA6O.mjs.map
