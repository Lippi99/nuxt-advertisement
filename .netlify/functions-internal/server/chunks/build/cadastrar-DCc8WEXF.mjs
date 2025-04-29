import { _ as __nuxt_component_0 } from './nuxt-layout-DirklVT8.mjs';
import { _ as _sfc_main$1, a as __nuxt_component_2 } from './FormContainer-CzIEyyMq.mjs';
import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$3 } from './Input-K2S8Vn62.mjs';
import { u as useHead, e as useToast, f as _sfc_main$7 } from './server.mjs';
import { defineComponent, reactive, ref, withAsyncContext, mergeProps, withCtx, unref, createVNode, createTextVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import * as z from 'zod';
import { u as useFetch } from './fetch-CeGXlGm6.mjs';
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
      title: "Cadastrar playlist"
    });
    const schema = z.object({
      name: z.string({ message: "Campo obrigat\xF3rio" }).min(4, "Must be at least 4 characters")
    });
    const state = reactive({
      name: void 0
    });
    const isSubmitting = ref(false);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/propagandas", {
      method: "GET"
    }, "$osmP5hSYT7")), __temp = await __temp, __restore(), __temp);
    const toast = useToast();
    async function onSubmit(event) {
      isSubmitting.value = true;
      try {
        await $fetch("/api/playlists", {
          method: "POST",
          body: {
            name: event.data.name
          }
        });
        toast.add({
          title: "Success",
          description: "Playlist criado com sucesso",
          color: "success"
        });
        state.name = void 0;
      } catch {
        toast.add({
          title: "Erro",
          description: "Houve um erro na cria\xE7\xE3o da playlist",
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
      const _component_UButton = _sfc_main$7;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin-authenticated" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "header", {}, () => {
              _push2(ssrRenderComponent(_component_EditTitleAction, {
                title: "Playlists",
                to: "/playlists"
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
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: "Nome da playlist",
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
                            label: "Nome da playlist",
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
                      default: withCtx(() => [
                        createVNode(_component_UFormField, {
                          label: "Nome da playlist",
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
                      ]),
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
                  title: "Playlists",
                  to: "/playlists"
                })
              ]),
              createVNode(_component_FormContainer, null, {
                default: withCtx(() => [
                  createVNode(_component_UForm, {
                    schema: unref(schema),
                    state: unref(state),
                    onSubmit
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UFormField, {
                        label: "Nome da playlist",
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
                    ]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/playlists/cadastrar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cadastrar-DCc8WEXF.mjs.map
