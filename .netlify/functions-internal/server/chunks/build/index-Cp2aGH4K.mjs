import { u as useHead, f as useToast, h as _sfc_main$7, j as useRuntimeConfig } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-layout-DNQc9wwP.mjs';
import { _ as _sfc_main$2, a as _sfc_main$1, b as _sfc_main$3 } from './Pagination-B6VXqA6O.mjs';
import { _ as _sfc_main$4 } from './Modal-T0uP5UIs.mjs';
import { QrcodeStream } from 'vue-qrcode-reader';
import { defineComponent, useTemplateRef, withAsyncContext, ref, computed, mergeProps, withCtx, unref, isRef, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, renderSlot, h, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { getPaginationRowModel } from '@tanstack/vue-table';
import dayjs from 'dayjs';
import { _ as _sfc_main$1$1, a as _sfc_main$5 } from './DeleteButton-2rBOZjtU.mjs';
import { u as useAuthStore } from './auth-CYmGQrwQ.mjs';
import { u as useFetch } from './fetch-mpB_uxaL.mjs';
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
import 'unhead/server';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'node:url';
import 'ipx';
import 'pinia';
import 'vue-router';
import '@prisma/client';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';

const __nuxt_component_6 = defineComponent({
  name: "QrcodeStream",
  inheritAttrs: false,
  props: {
    formats: {
      type: Array
    }
  },
  setup(props, { attrs, slots }) {
    const { formats } = useRuntimeConfig().public.qrcode.reader;
    return () => h(QrcodeStream, {
      ...attrs,
      formats: props.formats || formats
    }, slots);
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Monitores"
    });
    const { user } = useAuthStore();
    const toast = useToast();
    const table = useTemplateRef("table");
    const UButton = _sfc_main$7;
    const { data, status, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/monitores", {
      method: "GET"
    }, "$QRYmfPchu1")), __temp = await __temp, __restore(), __temp);
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
        accessorFn: (row) => {
          var _a2;
          var _a;
          return (_a2 = (_a = row.establishment) == null ? void 0 : _a.name) != null ? _a2 : "Sem nome";
        },
        id: "establishment",
        header: "Estabelecimento"
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
            h(_sfc_main$1$1, {
              to: `/monitores/${row.original.id}`,
              role: ["admin", "employee"]
            }),
            h(
              _sfc_main$5,
              {
                onClick: () => {
                  selectedEstabelecimento.value = row.original;
                  isDeleteModalOpen.value = true;
                },
                role: ["admin"]
              },
              () => "Excluir"
            ),
            (user == null ? void 0 : user.role) === "admin" || (user == null ? void 0 : user.role) === "employee" && h(
              UButton,
              {
                class: "max-w-[120px] w-full flex items-center justify-center cursor-pointer text-neutral-950",
                color: row.original.paired ? "warning" : "neutral",
                onClick: () => {
                  selectedEstabelecimento.value = row.original;
                  if (row.original.paired) {
                    isUnpairing.value = true;
                  } else {
                    isPairing.value = true;
                  }
                }
              },
              () => row.original.paired ? "Pareado" : "Parear"
            )
          ]);
        }
      }
    ];
    const result = ref(null);
    const isValid = ref(void 0);
    const isPairing = ref(false);
    const isUnpairing = ref(false);
    const paused = ref(false);
    const isDeleteModalOpen = ref(false);
    const selectedEstabelecimento = ref(null);
    const pagination = ref({
      pageIndex: 0,
      pageSize: 10
    });
    const deleteTitle = computed(
      () => `Tem certeza que deseja excluir o monitor ${selectedEstabelecimento.value}?`
    );
    const unpairMonitorTitle = computed(
      () => `Tem certeza que deseja desparear o monitor ${selectedEstabelecimento.value}?`
    );
    const handleDeleteEstablishment = async () => {
      var _a;
      const id = (_a = selectedEstabelecimento.value) == null ? void 0 : _a.id;
      console.log(selectedEstabelecimento);
      try {
        await $fetch(`/api/monitores/${id}`, {
          method: "DELETE"
        });
        isDeleteModalOpen.value = false;
        await refresh();
        toast.add({
          title: "Sucesso",
          description: "Estabelecimento exclu\xEDdo com sucesso",
          color: "success"
        });
      } catch {
        toast.add({
          title: "Erro",
          description: "Houve um erro ao excluir o estabelecimento",
          color: "error"
        });
      }
    };
    const timeout = (ms) => {
      return new Promise((resolve) => {
        (void 0).setTimeout(resolve, ms);
      });
    };
    const onDetect = async ([firstDetectedCode]) => {
      var _a, _b;
      try {
        result.value = firstDetectedCode.rawValue;
        paused.value = true;
        await timeout(2e3);
        isValid.value = (_a = result.value) == null ? void 0 : _a.startsWith("http");
        if (result == null ? void 0 : result.value) {
          await useFetch(`/api/monitores/setup/${result.value}`, {
            method: "PATCH",
            body: {
              monitorId: (_b = selectedEstabelecimento.value) == null ? void 0 : _b.id,
              paired: true
            }
          }, "$zsW2MUtAWL");
          await refresh();
        }
        toast.add({
          title: "Sucesso",
          description: "Monitor logado com sucesso",
          color: "success"
        });
      } catch (error) {
        console.log(error);
        toast.add({
          title: "Erro",
          description: "Houve um erro ao logar o monitor",
          color: "error"
        });
      } finally {
        await timeout(2e3);
        paused.value = false;
      }
    };
    const handleUnpairMonitor = async () => {
      var _a, _b, _c;
      try {
        const { error } = await useFetch(
          `/api/monitores/setup/${(_a = selectedEstabelecimento.value) == null ? void 0 : _a.code}`,
          {
            method: "PATCH",
            body: {
              monitorId: (_b = selectedEstabelecimento.value) == null ? void 0 : _b.id,
              paired: false
            }
          },
          "$BytcxLuUnl"
        );
        if (((_c = error.value) == null ? void 0 : _c.statusCode) == 400) {
          toast.add({
            title: "Erro",
            description: "Este monitor j\xE1 foi pareado",
            color: "error"
          });
          return;
        }
        isUnpairing.value = false;
        await refresh();
        toast.add({
          title: "Sucesso",
          description: "Monitor deslogado com sucesso",
          color: "success"
        });
      } catch (error) {
        toast.add({
          title: "Erro",
          description: "Houve um erro ao desparear o monitor",
          color: "error"
        });
      }
    };
    const resetValidationState = computed(() => {
      return isValid.value = void 0;
    });
    const validationPending = computed(() => {
      return isValid.value === void 0 && paused.value;
    });
    const validationSuccess = computed(() => {
      return isValid.value === true;
    });
    const validationFailure = computed(() => {
      return isValid.value === false;
    });
    const facingMode = ref("environment");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_RegisterTitleAction = _sfc_main$2;
      const _component_UTable = _sfc_main$1;
      const _component_UPagination = _sfc_main$3;
      const _component_UModal = _sfc_main$4;
      const _component_qrcode_stream = __nuxt_component_6;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin-authenticated" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "header", {}, () => {
              _push2(ssrRenderComponent(_component_RegisterTitleAction, {
                to: "/monitores/cadastrar",
                title: "Monitores",
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
              data: (_a = unref(data)) == null ? void 0 : _a.monitores,
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
              title: unref(unpairMonitorTitle),
              open: unref(isUnpairing),
              "onUpdate:open": ($event) => isRef(isUnpairing) ? isUnpairing.value = $event : null
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`<div class="p-4 space-y-4"${_scopeId2}><h2 class="text-lg font-semibold"${_scopeId2}>Confirmar despareamento</h2><p${_scopeId2}> Tem certeza que deseja desparear o <strong${_scopeId2}>${ssrInterpolate((_a2 = unref(selectedEstabelecimento)) == null ? void 0 : _a2.name)}</strong>? </p><div class="flex justify-between gap-2 mt-12"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(UButton), {
                    class: "cursor-pointer",
                    size: "lg",
                    color: "neutral",
                    onClick: ($event) => isUnpairing.value = false
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
                    onClick: handleUnpairMonitor,
                    class: "cursor-pointer",
                    size: "lg",
                    color: "primary"
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
                      createVNode("h2", { class: "text-lg font-semibold" }, "Confirmar despareamento"),
                      createVNode("p", null, [
                        createTextVNode(" Tem certeza que deseja desparear o "),
                        createVNode("strong", null, toDisplayString((_b2 = unref(selectedEstabelecimento)) == null ? void 0 : _b2.name), 1),
                        createTextVNode("? ")
                      ]),
                      createVNode("div", { class: "flex justify-between gap-2 mt-12" }, [
                        createVNode(unref(UButton), {
                          class: "cursor-pointer",
                          size: "lg",
                          color: "neutral",
                          onClick: ($event) => isUnpairing.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancelar ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(UButton), {
                          onClick: handleUnpairMonitor,
                          class: "cursor-pointer",
                          size: "lg",
                          color: "primary"
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
            _push2(ssrRenderComponent(_component_UModal, {
              title: unref(deleteTitle),
              open: unref(isDeleteModalOpen),
              "onUpdate:open": ($event) => isRef(isDeleteModalOpen) ? isDeleteModalOpen.value = $event : null
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b2;
                if (_push3) {
                  _push3(`<div class="p-4 space-y-4"${_scopeId2}><h2 class="text-lg font-semibold"${_scopeId2}>Confirmar exclus\xE3o</h2><p${_scopeId2}> Tem certeza que deseja excluir <strong${_scopeId2}>${ssrInterpolate((_a2 = unref(selectedEstabelecimento)) == null ? void 0 : _a2.name)}</strong>? </p><div class="flex justify-between gap-2 mt-12"${_scopeId2}>`);
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
                    onClick: handleDeleteEstablishment,
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
                        createVNode("strong", null, toDisplayString((_b2 = unref(selectedEstabelecimento)) == null ? void 0 : _b2.name), 1),
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
                          onClick: handleDeleteEstablishment,
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
            _push2(ssrRenderComponent(_component_UModal, {
              class: "w-11/12",
              open: unref(isPairing),
              "onUpdate:open": ($event) => isRef(isPairing) ? isPairing.value = $event : null
            }, {
              content: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_qrcode_stream, {
                    constraints: {
                      facingMode: unref(facingMode)
                    },
                    paused: unref(paused),
                    onDetect,
                    onError: console.error,
                    onCameraOn: unref(resetValidationState)
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(validationSuccess)) {
                          _push4(`<div class="validation-success"${_scopeId3}> This is a URL </div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(validationFailure)) {
                          _push4(`<div class="validation-failure"${_scopeId3}> This is NOT a URL! </div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (unref(validationPending)) {
                          _push4(`<div class="validation-pending"${_scopeId3}> Long validation in progress... </div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          unref(validationSuccess) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "validation-success"
                          }, " This is a URL ")) : createCommentVNode("", true),
                          unref(validationFailure) ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "validation-failure"
                          }, " This is NOT a URL! ")) : createCommentVNode("", true),
                          unref(validationPending) ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "validation-pending"
                          }, " Long validation in progress... ")) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_qrcode_stream, {
                      constraints: {
                        facingMode: unref(facingMode)
                      },
                      paused: unref(paused),
                      onDetect,
                      onError: console.error,
                      onCameraOn: unref(resetValidationState)
                    }, {
                      default: withCtx(() => [
                        unref(validationSuccess) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "validation-success"
                        }, " This is a URL ")) : createCommentVNode("", true),
                        unref(validationFailure) ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "validation-failure"
                        }, " This is NOT a URL! ")) : createCommentVNode("", true),
                        unref(validationPending) ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "validation-pending"
                        }, " Long validation in progress... ")) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["constraints", "paused", "onError", "onCameraOn"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createVNode(_component_RegisterTitleAction, {
                  to: "/monitores/cadastrar",
                  title: "Monitores",
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
                  data: (_h = unref(data)) == null ? void 0 : _h.monitores,
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
                title: unref(unpairMonitorTitle),
                open: unref(isUnpairing),
                "onUpdate:open": ($event) => isRef(isUnpairing) ? isUnpairing.value = $event : null
              }, {
                content: withCtx(() => {
                  var _a2;
                  return [
                    createVNode("div", { class: "p-4 space-y-4" }, [
                      createVNode("h2", { class: "text-lg font-semibold" }, "Confirmar despareamento"),
                      createVNode("p", null, [
                        createTextVNode(" Tem certeza que deseja desparear o "),
                        createVNode("strong", null, toDisplayString((_a2 = unref(selectedEstabelecimento)) == null ? void 0 : _a2.name), 1),
                        createTextVNode("? ")
                      ]),
                      createVNode("div", { class: "flex justify-between gap-2 mt-12" }, [
                        createVNode(unref(UButton), {
                          class: "cursor-pointer",
                          size: "lg",
                          color: "neutral",
                          onClick: ($event) => isUnpairing.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancelar ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(unref(UButton), {
                          onClick: handleUnpairMonitor,
                          class: "cursor-pointer",
                          size: "lg",
                          color: "primary"
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
              }, 8, ["title", "open", "onUpdate:open"]),
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
                        createVNode("strong", null, toDisplayString((_a2 = unref(selectedEstabelecimento)) == null ? void 0 : _a2.name), 1),
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
                          onClick: handleDeleteEstablishment,
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
              }, 8, ["title", "open", "onUpdate:open"]),
              createVNode(_component_UModal, {
                class: "w-11/12",
                open: unref(isPairing),
                "onUpdate:open": ($event) => isRef(isPairing) ? isPairing.value = $event : null
              }, {
                content: withCtx(() => [
                  createVNode(_component_qrcode_stream, {
                    constraints: {
                      facingMode: unref(facingMode)
                    },
                    paused: unref(paused),
                    onDetect,
                    onError: console.error,
                    onCameraOn: unref(resetValidationState)
                  }, {
                    default: withCtx(() => [
                      unref(validationSuccess) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "validation-success"
                      }, " This is a URL ")) : createCommentVNode("", true),
                      unref(validationFailure) ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "validation-failure"
                      }, " This is NOT a URL! ")) : createCommentVNode("", true),
                      unref(validationPending) ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "validation-pending"
                      }, " Long validation in progress... ")) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["constraints", "paused", "onError", "onCameraOn"])
                ]),
                _: 1
              }, 8, ["open", "onUpdate:open"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/monitores/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cp2aGH4K.mjs.map
