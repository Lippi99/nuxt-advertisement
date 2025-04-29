import { _ as __nuxt_component_0 } from './nuxt-layout-DirklVT8.mjs';
import { _ as _sfc_main$1, a as __nuxt_component_2 } from './FormContainer-CzIEyyMq.mjs';
import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$3 } from './Input-K2S8Vn62.mjs';
import { _ as _sfc_main$4 } from './Select-Cqif2TBp.mjs';
import { u as useHead, e as useToast, j as _sfc_main$b, f as _sfc_main$7 } from './server.mjs';
import { defineComponent, reactive, ref, withAsyncContext, mergeProps, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderList } from 'vue/server-renderer';
import * as z from 'zod';
import { u as useFetch } from './fetch-CeGXlGm6.mjs';
import { c as convertFileToBase64 } from './image-BW1VrlzF.mjs';
import 'vue-router';
import './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '@vueuse/core';
import 'reka-ui';
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
import 'tailwindcss/colors';
import '@iconify/vue';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cadastrar",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Cadastrar propaganda"
    });
    const schema = z.object({
      name: z.string({ message: "Campo obrigat\xF3rio" }).min(4, "Must be at least 4 characters"),
      playlistId: z.number({ message: "Campo obrigat\xF3rio" }).int({ message: "Campo obrigat\xF3rio" }),
      url: z.array(z.any({ message: "Arquivo inv\xE1lido" }), {
        required_error: "Campo obrigat\xF3rio"
      }).min(1, "Pelo menos um arquivo \xE9 necess\xE1rio")
    });
    const state = reactive({
      name: void 0,
      playlistId: void 0,
      url: []
    });
    const isSubmitting = ref(false);
    const toast = useToast();
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/playlists", {
      method: "GET"
    }, "$Lr2NOVMWQK")), __temp = await __temp, __restore(), __temp);
    async function handleFileUpload(event) {
      const target = event.target;
      const files = target.files;
      if (!files) return;
      for (const file of files) {
        const base64 = await convertFileToBase64(file);
        state.url.push(base64);
      }
    }
    function handleRemoveImage(index) {
      state.url.splice(index, 1);
    }
    async function onSubmit(event) {
      isSubmitting.value = true;
      try {
        await $fetch("/api/propagandas", {
          method: "POST",
          body: {
            name: event.data.name,
            url: event.data.url,
            playlistId: event.data.playlistId
          }
        });
        toast.add({
          title: "Success",
          description: "Monitor criado com sucesso",
          color: "success"
        });
        state.name = void 0;
        state.playlistId = void 0;
        state.url = void 0;
      } catch {
        toast.add({
          title: "Erro",
          description: "Houve um erro na cria\xE7\xE3o do monitor",
          color: "error"
        });
      } finally {
        isSubmitting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_EditTitleAction = _sfc_main$1;
      const _component_FormContainer = __nuxt_component_2;
      const _component_UForm = _sfc_main$2;
      const _component_UFormField = _sfc_main$1$1;
      const _component_UInput = _sfc_main$3;
      const _component_USelect = _sfc_main$4;
      const _component_NuxtImg = _sfc_main$b;
      const _component_UButton = _sfc_main$7;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin-authenticated" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "header", {}, () => {
              _push2(ssrRenderComponent(_component_EditTitleAction, {
                title: "Propagandas",
                to: "/propagandas"
              }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
            _push2(ssrRenderComponent(_component_FormContainer, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UForm, {
                    schema: unref(schema),
                    state: unref(state),
                    onSubmit
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a, _b;
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: "Nome da propaganda",
                          name: "name",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).name,
                                "onUpdate:modelValue": ($event) => unref(state).name = $event,
                                type: "text"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  size: "lg",
                                  class: "w-full mt-2",
                                  modelValue: unref(state).name,
                                  "onUpdate:modelValue": ($event) => unref(state).name = $event,
                                  type: "text"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormField, {
                          class: "mt-8",
                          label: "Nome da playlist",
                          name: "establishmentId",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a2, _b2;
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_USelect, {
                                size: "lg",
                                modelValue: unref(state).playlistId,
                                "onUpdate:modelValue": ($event) => unref(state).playlistId = $event,
                                items: (_a2 = unref(data)) == null ? void 0 : _a2.playlists,
                                "label-key": "name",
                                "value-key": "id",
                                ui: {
                                  trailingIcon: "group-data-[state=open]:rotate-180 transition-transform duration-200"
                                },
                                class: "w-full mt-2"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_USelect, {
                                  size: "lg",
                                  modelValue: unref(state).playlistId,
                                  "onUpdate:modelValue": ($event) => unref(state).playlistId = $event,
                                  items: (_b2 = unref(data)) == null ? void 0 : _b2.playlists,
                                  "label-key": "name",
                                  "value-key": "id",
                                  ui: {
                                    trailingIcon: "group-data-[state=open]:rotate-180 transition-transform duration-200"
                                  },
                                  class: "w-full mt-2"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormField, {
                          class: "mt-8",
                          label: "URL",
                          name: "url",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                onChange: handleFileUpload,
                                type: "file",
                                multiple: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  size: "lg",
                                  class: "w-full mt-2",
                                  onChange: handleFileUpload,
                                  type: "file",
                                  multiple: ""
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        if ((_a = unref(state).url) == null ? void 0 : _a.length) {
                          _push4(`<div class="flex gap-16 flex-wrap mt-8 mb-12"${_scopeId3}><!--[-->`);
                          ssrRenderList(unref(state).url, (img, index) => {
                            _push4(`<div class="relative w-44 h-44 group"${_scopeId3}>`);
                            _push4(ssrRenderComponent(_component_NuxtImg, {
                              src: img,
                              class: "w-full h-full object-cover object-center rounded-md",
                              format: "webp",
                              alt: "Propaganda"
                            }, null, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_UButton, {
                              class: "cursor-pointer mt-2 w-full flex items-center justify-center",
                              onClick: ($event) => handleRemoveImage(index),
                              color: "error"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`Remover imagem`);
                                } else {
                                  return [
                                    createTextVNode("Remover imagem")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div>`);
                          });
                          _push4(`<!--]--></div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`<div class="flex items-center justify-center"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UButton, {
                          disabled: unref(isSubmitting),
                          loading: unref(isSubmitting),
                          class: "cursor-pointer py-2.5 mt-8 max-w-xs w-full flex items-center justify-center",
                          type: "submit"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Cadastrar`);
                            } else {
                              return [
                                createTextVNode("Cadastrar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode(_component_UFormField, {
                            label: "Nome da propaganda",
                            name: "name",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).name,
                                "onUpdate:modelValue": ($event) => unref(state).name = $event,
                                type: "text"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormField, {
                            class: "mt-8",
                            label: "Nome da playlist",
                            name: "establishmentId",
                            required: ""
                          }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createVNode(_component_USelect, {
                                  size: "lg",
                                  modelValue: unref(state).playlistId,
                                  "onUpdate:modelValue": ($event) => unref(state).playlistId = $event,
                                  items: (_a2 = unref(data)) == null ? void 0 : _a2.playlists,
                                  "label-key": "name",
                                  "value-key": "id",
                                  ui: {
                                    trailingIcon: "group-data-[state=open]:rotate-180 transition-transform duration-200"
                                  },
                                  class: "w-full mt-2"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(_component_UFormField, {
                            class: "mt-8",
                            label: "URL",
                            name: "url",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                onChange: handleFileUpload,
                                type: "file",
                                multiple: ""
                              })
                            ]),
                            _: 1
                          }),
                          ((_b = unref(state).url) == null ? void 0 : _b.length) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex gap-16 flex-wrap mt-8 mb-12"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(state).url, (img, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "relative w-44 h-44 group"
                              }, [
                                createVNode(_component_NuxtImg, {
                                  src: img,
                                  class: "w-full h-full object-cover object-center rounded-md",
                                  format: "webp",
                                  alt: "Propaganda"
                                }, null, 8, ["src"]),
                                createVNode(_component_UButton, {
                                  class: "cursor-pointer mt-2 w-full flex items-center justify-center",
                                  onClick: ($event) => handleRemoveImage(index),
                                  color: "error"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Remover imagem")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center justify-center" }, [
                            createVNode(_component_UButton, {
                              disabled: unref(isSubmitting),
                              loading: unref(isSubmitting),
                              class: "cursor-pointer py-2.5 mt-8 max-w-xs w-full flex items-center justify-center",
                              type: "submit"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Cadastrar")
                              ]),
                              _: 1
                            }, 8, ["disabled", "loading"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UForm, {
                      schema: unref(schema),
                      state: unref(state),
                      onSubmit
                    }, {
                      default: withCtx(() => {
                        var _a;
                        return [
                          createVNode(_component_UFormField, {
                            label: "Nome da propaganda",
                            name: "name",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).name,
                                "onUpdate:modelValue": ($event) => unref(state).name = $event,
                                type: "text"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormField, {
                            class: "mt-8",
                            label: "Nome da playlist",
                            name: "establishmentId",
                            required: ""
                          }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createVNode(_component_USelect, {
                                  size: "lg",
                                  modelValue: unref(state).playlistId,
                                  "onUpdate:modelValue": ($event) => unref(state).playlistId = $event,
                                  items: (_a2 = unref(data)) == null ? void 0 : _a2.playlists,
                                  "label-key": "name",
                                  "value-key": "id",
                                  ui: {
                                    trailingIcon: "group-data-[state=open]:rotate-180 transition-transform duration-200"
                                  },
                                  class: "w-full mt-2"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(_component_UFormField, {
                            class: "mt-8",
                            label: "URL",
                            name: "url",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                onChange: handleFileUpload,
                                type: "file",
                                multiple: ""
                              })
                            ]),
                            _: 1
                          }),
                          ((_a = unref(state).url) == null ? void 0 : _a.length) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "flex gap-16 flex-wrap mt-8 mb-12"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(state).url, (img, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "relative w-44 h-44 group"
                              }, [
                                createVNode(_component_NuxtImg, {
                                  src: img,
                                  class: "w-full h-full object-cover object-center rounded-md",
                                  format: "webp",
                                  alt: "Propaganda"
                                }, null, 8, ["src"]),
                                createVNode(_component_UButton, {
                                  class: "cursor-pointer mt-2 w-full flex items-center justify-center",
                                  onClick: ($event) => handleRemoveImage(index),
                                  color: "error"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Remover imagem")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "flex items-center justify-center" }, [
                            createVNode(_component_UButton, {
                              disabled: unref(isSubmitting),
                              loading: unref(isSubmitting),
                              class: "cursor-pointer py-2.5 mt-8 max-w-xs w-full flex items-center justify-center",
                              type: "submit"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Cadastrar")
                              ]),
                              _: 1
                            }, 8, ["disabled", "loading"])
                          ])
                        ];
                      }),
                      _: 1
                    }, 8, ["schema", "state"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              renderSlot(_ctx.$slots, "header", {}, () => [
                createVNode(_component_EditTitleAction, {
                  title: "Propagandas",
                  to: "/propagandas"
                })
              ]),
              createVNode(_component_FormContainer, null, {
                default: withCtx(() => [
                  createVNode(_component_UForm, {
                    schema: unref(schema),
                    state: unref(state),
                    onSubmit
                  }, {
                    default: withCtx(() => {
                      var _a;
                      return [
                        createVNode(_component_UFormField, {
                          label: "Nome da propaganda",
                          name: "name",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              size: "lg",
                              class: "w-full mt-2",
                              modelValue: unref(state).name,
                              "onUpdate:modelValue": ($event) => unref(state).name = $event,
                              type: "text"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormField, {
                          class: "mt-8",
                          label: "Nome da playlist",
                          name: "establishmentId",
                          required: ""
                        }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createVNode(_component_USelect, {
                                size: "lg",
                                modelValue: unref(state).playlistId,
                                "onUpdate:modelValue": ($event) => unref(state).playlistId = $event,
                                items: (_a2 = unref(data)) == null ? void 0 : _a2.playlists,
                                "label-key": "name",
                                "value-key": "id",
                                ui: {
                                  trailingIcon: "group-data-[state=open]:rotate-180 transition-transform duration-200"
                                },
                                class: "w-full mt-2"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(_component_UFormField, {
                          class: "mt-8",
                          label: "URL",
                          name: "url",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              size: "lg",
                              class: "w-full mt-2",
                              onChange: handleFileUpload,
                              type: "file",
                              multiple: ""
                            })
                          ]),
                          _: 1
                        }),
                        ((_a = unref(state).url) == null ? void 0 : _a.length) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex gap-16 flex-wrap mt-8 mb-12"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(state).url, (img, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "relative w-44 h-44 group"
                            }, [
                              createVNode(_component_NuxtImg, {
                                src: img,
                                class: "w-full h-full object-cover object-center rounded-md",
                                format: "webp",
                                alt: "Propaganda"
                              }, null, 8, ["src"]),
                              createVNode(_component_UButton, {
                                class: "cursor-pointer mt-2 w-full flex items-center justify-center",
                                onClick: ($event) => handleRemoveImage(index),
                                color: "error"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Remover imagem")
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ]);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex items-center justify-center" }, [
                          createVNode(_component_UButton, {
                            disabled: unref(isSubmitting),
                            loading: unref(isSubmitting),
                            class: "cursor-pointer py-2.5 mt-8 max-w-xs w-full flex items-center justify-center",
                            type: "submit"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cadastrar")
                            ]),
                            _: 1
                          }, 8, ["disabled", "loading"])
                        ])
                      ];
                    }),
                    _: 1
                  }, 8, ["schema", "state"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/propagandas/cadastrar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cadastrar-7jNp9gQm.mjs.map
