import { u as useHead, e as useToast, f as _sfc_main$7 } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-layout-DirklVT8.mjs';
import { _ as _sfc_main$2, a as _sfc_main$1, b as _sfc_main$3 } from './Pagination-C-9k61Pm.mjs';
import { _ as _sfc_main$4 } from './Modal-CU8OB2FP.mjs';
import { defineComponent, useTemplateRef, withAsyncContext, ref, computed, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, toDisplayString, renderSlot, h, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { getPaginationRowModel } from '@tanstack/vue-table';
import dayjs from 'dayjs';
import { u as useFetch } from './fetch-CeGXlGm6.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';
import 'node:url';
import 'ipx';
import 'pinia';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './auth-B3q0Asa0.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Propagandas"
    });
    const toast = useToast();
    const table = useTemplateRef("table");
    const UButton = _sfc_main$7;
    const { data, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/propagandas", {
      method: "GET"
    }, "$od11l7zaCT")), __temp = await __temp, __restore(), __temp);
    const columns = [
      {
        accessorKey: "id",
        header: "Id"
      },
      {
        accessorKey: "name",
        header: "Nome"
      },
      {
        accessorKey: "_count",
        header: "Qtd.",
        cell: (value) => `${value.row.original._count.images}`
      },
      {
        accessorKey: "createdAt",
        header: "Criado em",
        cell: (value) => `${dayjs(value.renderValue()).format("DD/MM/YYYY")}`
      },
      {
        accessorKey: "actions",
        header: "A\xE7\xF5es",
        cell: ({ row }) => {
          return h("div", { class: "flex gap-3.5" }, [
            h(
              UButton,
              {
                class: "max-w-[120px] w-full flex items-center justify-center cursor-pointer text-neutral-950",
                color: "secondary",
                to: `/propagandas/${row.original.id}`
              },
              () => "Atualizar"
            ),
            h(
              UButton,
              {
                class: "max-w-[120px] w-full flex items-center justify-center cursor-pointer text-neutral-950",
                color: "error",
                onClick: () => {
                  console.log("smth happened");
                  selectedAdvertisement.value = row.original;
                  isDeleteModalOpen.value = true;
                }
              },
              () => "Excluir"
            )
          ]);
        }
      }
    ];
    const isDeleteModalOpen = ref(false);
    const selectedAdvertisement = ref(null);
    const pagination = ref({
      pageIndex: 0,
      pageSize: 10
    });
    const deleteTitle = computed(
      () => `Tem certeza que deseja excluir a propaganda ${selectedAdvertisement.value}?`
    );
    const handleDeleteAdvertisement = async () => {
      var _a;
      const id = (_a = selectedAdvertisement.value) == null ? void 0 : _a.id;
      try {
        await $fetch(`/api/propagandas/${id}`, {
          method: "DELETE"
        });
        isDeleteModalOpen.value = false;
        await refresh();
        toast.add({
          title: "Sucesso",
          description: "Propaganda exclu\xEDda com sucesso",
          color: "success"
        });
      } catch {
        toast.add({
          title: "Erro",
          description: "Houve um erro ao excluir a propaganda",
          color: "error"
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_RegisterTitleAction = _sfc_main$2;
      const _component_UTable = _sfc_main$1;
      const _component_UPagination = _sfc_main$3;
      const _component_UModal = _sfc_main$4;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin-authenticated" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "header", {}, () => {
              _push2(ssrRenderComponent(_component_RegisterTitleAction, {
                to: "/propagandas/cadastrar",
                title: "Propagandas",
                role: "admin"
              }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
            _push2(`<div class="w-full space-y-4 pb-4 mt-12"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UTable, {
              ref_key: "table",
              ref: table,
              loading: unref(status) === "pending",
              pagination: unref(pagination),
              "onUpdate:pagination": ($event) => isRef(pagination) ? pagination.value = $event : null,
              data: (_a = unref(data)) == null ? void 0 : _a.advertisements,
              columns,
              "pagination-options": {
                getPaginationRowModel: unref(getPaginationRowModel)()
              },
              class: "flex-1"
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-center border-t border-(--ui-border) pt-12"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UPagination, {
              "show-edges": "",
              class: "cursor-pointer",
              size: "lg",
              "default-page": (((_c = (_b = unref(table)) == null ? void 0 : _b.tableApi) == null ? void 0 : _c.getState().pagination.pageIndex) || 0) + 1,
              "items-per-page": (_e = (_d = unref(table)) == null ? void 0 : _d.tableApi) == null ? void 0 : _e.getState().pagination.pageSize,
              total: (_g = (_f = unref(table)) == null ? void 0 : _f.tableApi) == null ? void 0 : _g.getFilteredRowModel().rows.length,
              "onUpdate:page": (p) => {
                var _a2, _b2;
                return (_b2 = (_a2 = unref(table)) == null ? void 0 : _a2.tableApi) == null ? void 0 : _b2.setPageIndex(p - 1);
              }
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_UModal, {
              title: unref(deleteTitle),
              open: unref(isDeleteModalOpen),
              "onUpdate:open": ($event) => isRef(isDeleteModalOpen) ? isDeleteModalOpen.value = $event : null
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`<div class="p-4 space-y-4"${_scopeId2}><h2 class="text-lg font-semibold"${_scopeId2}>Confirmar exclus\xE3o</h2><p${_scopeId2}> Tem certeza que deseja excluir <strong${_scopeId2}>${ssrInterpolate((_a2 = unref(selectedAdvertisement)) == null ? void 0 : _a2.name)}</strong>? </p><div class="flex justify-between gap-2 mt-12"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(UButton), {
                    class: "cursor-pointer",
                    size: "lg",
                    color: "neutral",
                    onClick: ($event) => isDeleteModalOpen.value = false
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Cancelar `);
                      } else {
                        return [
                          createTextVNode(" Cancelar ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(UButton), {
                    onClick: handleDeleteAdvertisement,
                    class: "cursor-pointer",
                    size: "lg",
                    color: "error"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Confirmar `);
                      } else {
                        return [
                          createTextVNode(" Confirmar ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 space-y-4" }, [
                      createVNode("h2", { class: "text-lg font-semibold" }, "Confirmar exclus\xE3o"),
                      createVNode("p", null, [
                        createTextVNode(" Tem certeza que deseja excluir "),
                        createVNode("strong", null, toDisplayString((_b2 = unref(selectedAdvertisement)) == null ? void 0 : _b2.name), 1),
                        createTextVNode("? ")
                      ]),
                      createVNode("div", { class: "flex justify-between gap-2 mt-12" }, [
                        createVNode(unref(UButton), {
                          class: "cursor-pointer",
                          size: "lg",
                          color: "neutral",
                          onClick: ($event) => isDeleteModalOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancelar ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(UButton), {
                          onClick: handleDeleteAdvertisement,
                          class: "cursor-pointer",
                          size: "lg",
                          color: "error"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Confirmar ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createVNode(_component_RegisterTitleAction, {
                  to: "/propagandas/cadastrar",
                  title: "Propagandas",
                  role: "admin"
                })
              ]),
              createVNode("div", { class: "w-full space-y-4 pb-4 mt-12" }, [
                createVNode(_component_UTable, {
                  ref_key: "table",
                  ref: table,
                  loading: unref(status) === "pending",
                  pagination: unref(pagination),
                  "onUpdate:pagination": ($event) => isRef(pagination) ? pagination.value = $event : null,
                  data: (_h = unref(data)) == null ? void 0 : _h.advertisements,
                  columns,
                  "pagination-options": {
                    getPaginationRowModel: unref(getPaginationRowModel)()
                  },
                  class: "flex-1"
                }, null, 8, ["loading", "pagination", "onUpdate:pagination", "data", "pagination-options"]),
                createVNode("div", { class: "flex justify-center border-t border-(--ui-border) pt-12" }, [
                  createVNode(_component_UPagination, {
                    "show-edges": "",
                    class: "cursor-pointer",
                    size: "lg",
                    "default-page": (((_j = (_i = unref(table)) == null ? void 0 : _i.tableApi) == null ? void 0 : _j.getState().pagination.pageIndex) || 0) + 1,
                    "items-per-page": (_l = (_k = unref(table)) == null ? void 0 : _k.tableApi) == null ? void 0 : _l.getState().pagination.pageSize,
                    total: (_n = (_m = unref(table)) == null ? void 0 : _m.tableApi) == null ? void 0 : _n.getFilteredRowModel().rows.length,
                    "onUpdate:page": (p) => {
                      var _a2, _b2;
                      return (_b2 = (_a2 = unref(table)) == null ? void 0 : _a2.tableApi) == null ? void 0 : _b2.setPageIndex(p - 1);
                    }
                  }, null, 8, ["default-page", "items-per-page", "total", "onUpdate:page"])
                ])
              ]),
              createVNode(_component_UModal, {
                title: unref(deleteTitle),
                open: unref(isDeleteModalOpen),
                "onUpdate:open": ($event) => isRef(isDeleteModalOpen) ? isDeleteModalOpen.value = $event : null
              }, {
                content: withCtx(() => {
                  var _a2;
                  return [
                    createVNode("div", { class: "p-4 space-y-4" }, [
                      createVNode("h2", { class: "text-lg font-semibold" }, "Confirmar exclus\xE3o"),
                      createVNode("p", null, [
                        createTextVNode(" Tem certeza que deseja excluir "),
                        createVNode("strong", null, toDisplayString((_a2 = unref(selectedAdvertisement)) == null ? void 0 : _a2.name), 1),
                        createTextVNode("? ")
                      ]),
                      createVNode("div", { class: "flex justify-between gap-2 mt-12" }, [
                        createVNode(unref(UButton), {
                          class: "cursor-pointer",
                          size: "lg",
                          color: "neutral",
                          onClick: ($event) => isDeleteModalOpen.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancelar ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(UButton), {
                          onClick: handleDeleteAdvertisement,
                          class: "cursor-pointer",
                          size: "lg",
                          color: "error"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Confirmar ")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }),
                _: 1
              }, 8, ["title", "open", "onUpdate:open"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/propagandas/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Dsr0nWny.mjs.map
