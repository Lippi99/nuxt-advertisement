import { _ as __nuxt_component_0 } from './nuxt-layout-DNQc9wwP.mjs';
import { _ as _sfc_main$1, a as __nuxt_component_2 } from './FormContainer-BR6RZkaW.mjs';
import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$3 } from './Input-e683DqaG.mjs';
import { _ as _sfc_main$4 } from './Select-B7z0EKDR.mjs';
import { u as useHead, k as useRoute, f as useToast, h as _sfc_main$7 } from './server.mjs';
import { defineComponent, withAsyncContext, reactive, ref, mergeProps, withCtx, unref, createVNode, createTextVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import * as z from 'zod';
import dayjs from 'dayjs';
import { u as useFetch } from './fetch-mpB_uxaL.mjs';
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
import 'unhead/server';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'node:url';
import 'ipx';
import 'pinia';
import '@prisma/client';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b, _c, _d, _e;
    let __temp, __restore;
    useHead({
      title: "Editar usu\xE1rio"
    });
    const route = useRoute();
    const schema = z.object({
      name: z.string({ message: "Campo obrigat\xF3rio" }).min(4, "Must be at least 4 characters"),
      lastName: z.string({ message: "Campo obrigat\xF3rio" }),
      email: z.string({ message: "Campo obrigat\xF3rio" }).email({ message: "E-mail inv\xE1lido" }),
      birth: z.string({ message: "Campo obrigat\xF3rio" }),
      password: z.string().min(8, { message: "M\xEDnimo de 8 caract\xE9res" }).optional(),
      passwordRepeat: z.string().min(8, { message: "M\xEDnimo de 8 caract\xE9res" }).optional(),
      roleId: z.number().int()
    }).superRefine((data, ctx) => {
      if (data.password && data.passwordRepeat && data.password !== data.passwordRepeat) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["passwordRepeat"],
          message: "Senhas n\xE3o coincidem"
        });
      }
    });
    const id = route.params.id;
    const { data: user } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/usuarios/${id}`, "$DhwgjsmZ3y")), __temp = await __temp, __restore(), __temp);
    const state = reactive({
      name: ((_a = user.value) == null ? void 0 : _a.user.name) || void 0,
      lastName: ((_b = user.value) == null ? void 0 : _b.user.lastName) || void 0,
      email: ((_c = user.value) == null ? void 0 : _c.user.email) || void 0,
      password: void 0,
      passwordRepeat: void 0,
      birth: ((_d = user.value) == null ? void 0 : _d.user.birth) ? dayjs(user.value.user.birth).add(1, "day").format("YYYY-MM-DD") : void 0,
      roleId: ((_e = user.value) == null ? void 0 : _e.user.roleId) || void 0
    });
    const isSubmitting = ref(false);
    const toast = useToast();
    const { data: roles } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/roles", "$qpS3YZG5wD")), __temp = await __temp, __restore(), __temp);
    console.log(user.value);
    async function onSubmit(event) {
      isSubmitting.value = true;
      try {
        await $fetch(`/api/usuarios/${id}`, {
          method: "PATCH",
          body: {
            ...event.data
          }
        });
        toast.add({
          title: "Success",
          description: "Usu\xE1rio atualizado com sucesso",
          color: "success"
        });
      } catch {
        toast.add({
          title: "Erro",
          description: "Houve um erro na cria\xE7\xE3o do usu\xE1rio",
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
      const _component_UButton = _sfc_main$7;
      _push(ssrRenderComponent(_component_NuxtLayout, mergeProps({ name: "admin-authenticated" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "header", {}, () => {
              _push2(ssrRenderComponent(_component_EditTitleAction, {
                title: "Usu\xE1rio",
                to: "/usuarios"
              }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
            _push2(ssrRenderComponent(_component_FormContainer, { class: "px-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UForm, {
                    schema: unref(schema),
                    state: unref(state),
                    onSubmit
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-3.5 mb-4"${_scopeId3}><div class="flex-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: "Nome do usu\xE1rio",
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
                        _push4(`</div><div class="flex-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: "\xDAltimo nome",
                          name: "lastName",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).lastName,
                                "onUpdate:modelValue": ($event) => unref(state).lastName = $event,
                                type: "text"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  size: "lg",
                                  class: "w-full mt-2",
                                  modelValue: unref(state).lastName,
                                  "onUpdate:modelValue": ($event) => unref(state).lastName = $event,
                                  type: "text"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: "E-mail",
                          name: "email",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).email,
                                "onUpdate:modelValue": ($event) => unref(state).email = $event,
                                type: "email"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  size: "lg",
                                  class: "w-full mt-2",
                                  modelValue: unref(state).email,
                                  "onUpdate:modelValue": ($event) => unref(state).email = $event,
                                  type: "email"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="flex items-center gap-3.5 mt-4"${_scopeId3}><div class="flex-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: "Senha",
                          name: "password",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).password,
                                "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                type: "password"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  size: "lg",
                                  class: "w-full mt-2",
                                  modelValue: unref(state).password,
                                  "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                  type: "password"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="flex-1"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UFormField, {
                          label: "Repetir senha",
                          name: "passwordRepeat",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).passwordRepeat,
                                "onUpdate:modelValue": ($event) => unref(state).passwordRepeat = $event,
                                type: "password"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  size: "lg",
                                  class: "w-full mt-2",
                                  modelValue: unref(state).passwordRepeat,
                                  "onUpdate:modelValue": ($event) => unref(state).passwordRepeat = $event,
                                  type: "password"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                        _push4(ssrRenderComponent(_component_UFormField, {
                          class: "mt-4",
                          label: "Nascimento",
                          name: "birth",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).birth,
                                "onUpdate:modelValue": ($event) => unref(state).birth = $event,
                                type: "date"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UInput, {
                                  size: "lg",
                                  class: "w-full mt-2",
                                  modelValue: unref(state).birth,
                                  "onUpdate:modelValue": ($event) => unref(state).birth = $event,
                                  type: "date"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UFormField, {
                          class: "mt-4",
                          label: "Cargo",
                          name: "roleId",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a2, _b2;
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_USelect, {
                                modelValue: unref(state).roleId,
                                "onUpdate:modelValue": ($event) => unref(state).roleId = $event,
                                items: (_a2 = unref(roles)) == null ? void 0 : _a2.roles,
                                "value-key": "id",
                                "label-key": "name",
                                class: "w-full"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_USelect, {
                                  modelValue: unref(state).roleId,
                                  "onUpdate:modelValue": ($event) => unref(state).roleId = $event,
                                  items: (_b2 = unref(roles)) == null ? void 0 : _b2.roles,
                                  "value-key": "id",
                                  "label-key": "name",
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                              _push5(`Atualizar`);
                            } else {
                              return [
                                createTextVNode("Atualizar")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-3.5 mb-4" }, [
                            createVNode("div", { class: "flex-1" }, [
                              createVNode(_component_UFormField, {
                                label: "Nome do usu\xE1rio",
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
                              })
                            ]),
                            createVNode("div", { class: "flex-1" }, [
                              createVNode(_component_UFormField, {
                                label: "\xDAltimo nome",
                                name: "lastName",
                                required: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UInput, {
                                    size: "lg",
                                    class: "w-full mt-2",
                                    modelValue: unref(state).lastName,
                                    "onUpdate:modelValue": ($event) => unref(state).lastName = $event,
                                    type: "text"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode(_component_UFormField, {
                            label: "E-mail",
                            name: "email",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).email,
                                "onUpdate:modelValue": ($event) => unref(state).email = $event,
                                type: "email"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex items-center gap-3.5 mt-4" }, [
                            createVNode("div", { class: "flex-1" }, [
                              createVNode(_component_UFormField, {
                                label: "Senha",
                                name: "password",
                                required: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UInput, {
                                    size: "lg",
                                    class: "w-full mt-2",
                                    modelValue: unref(state).password,
                                    "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                    type: "password"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "flex-1" }, [
                              createVNode(_component_UFormField, {
                                label: "Repetir senha",
                                name: "passwordRepeat",
                                required: ""
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UInput, {
                                    size: "lg",
                                    class: "w-full mt-2",
                                    modelValue: unref(state).passwordRepeat,
                                    "onUpdate:modelValue": ($event) => unref(state).passwordRepeat = $event,
                                    type: "password"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          createVNode(_component_UFormField, {
                            class: "mt-4",
                            label: "Nascimento",
                            name: "birth",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).birth,
                                "onUpdate:modelValue": ($event) => unref(state).birth = $event,
                                type: "date"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UFormField, {
                            class: "mt-4",
                            label: "Cargo",
                            name: "roleId",
                            required: ""
                          }, {
                            default: withCtx(() => {
                              var _a2;
                              return [
                                createVNode(_component_USelect, {
                                  modelValue: unref(state).roleId,
                                  "onUpdate:modelValue": ($event) => unref(state).roleId = $event,
                                  items: (_a2 = unref(roles)) == null ? void 0 : _a2.roles,
                                  "value-key": "id",
                                  "label-key": "name",
                                  class: "w-full"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                              ];
                            }),
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
                                createTextVNode("Atualizar")
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
                        createVNode("div", { class: "flex items-center gap-3.5 mb-4" }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode(_component_UFormField, {
                              label: "Nome do usu\xE1rio",
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
                            })
                          ]),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode(_component_UFormField, {
                              label: "\xDAltimo nome",
                              name: "lastName",
                              required: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  size: "lg",
                                  class: "w-full mt-2",
                                  modelValue: unref(state).lastName,
                                  "onUpdate:modelValue": ($event) => unref(state).lastName = $event,
                                  type: "text"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode(_component_UFormField, {
                          label: "E-mail",
                          name: "email",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              size: "lg",
                              class: "w-full mt-2",
                              modelValue: unref(state).email,
                              "onUpdate:modelValue": ($event) => unref(state).email = $event,
                              type: "email"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex items-center gap-3.5 mt-4" }, [
                          createVNode("div", { class: "flex-1" }, [
                            createVNode(_component_UFormField, {
                              label: "Senha",
                              name: "password",
                              required: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  size: "lg",
                                  class: "w-full mt-2",
                                  modelValue: unref(state).password,
                                  "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                  type: "password"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "flex-1" }, [
                            createVNode(_component_UFormField, {
                              label: "Repetir senha",
                              name: "passwordRepeat",
                              required: ""
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UInput, {
                                  size: "lg",
                                  class: "w-full mt-2",
                                  modelValue: unref(state).passwordRepeat,
                                  "onUpdate:modelValue": ($event) => unref(state).passwordRepeat = $event,
                                  type: "password"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ])
                        ]),
                        createVNode(_component_UFormField, {
                          class: "mt-4",
                          label: "Nascimento",
                          name: "birth",
                          required: ""
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UInput, {
                              size: "lg",
                              class: "w-full mt-2",
                              modelValue: unref(state).birth,
                              "onUpdate:modelValue": ($event) => unref(state).birth = $event,
                              type: "date"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UFormField, {
                          class: "mt-4",
                          label: "Cargo",
                          name: "roleId",
                          required: ""
                        }, {
                          default: withCtx(() => {
                            var _a2;
                            return [
                              createVNode(_component_USelect, {
                                modelValue: unref(state).roleId,
                                "onUpdate:modelValue": ($event) => unref(state).roleId = $event,
                                items: (_a2 = unref(roles)) == null ? void 0 : _a2.roles,
                                "value-key": "id",
                                "label-key": "name",
                                class: "w-full"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                            ];
                          }),
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
                              createTextVNode("Atualizar")
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
                  title: "Usu\xE1rio",
                  to: "/usuarios"
                })
              ]),
              createVNode(_component_FormContainer, { class: "px-0" }, {
                default: withCtx(() => [
                  createVNode(_component_UForm, {
                    schema: unref(schema),
                    state: unref(state),
                    onSubmit
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-3.5 mb-4" }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode(_component_UFormField, {
                            label: "Nome do usu\xE1rio",
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
                          })
                        ]),
                        createVNode("div", { class: "flex-1" }, [
                          createVNode(_component_UFormField, {
                            label: "\xDAltimo nome",
                            name: "lastName",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).lastName,
                                "onUpdate:modelValue": ($event) => unref(state).lastName = $event,
                                type: "text"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode(_component_UFormField, {
                        label: "E-mail",
                        name: "email",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            size: "lg",
                            class: "w-full mt-2",
                            modelValue: unref(state).email,
                            "onUpdate:modelValue": ($event) => unref(state).email = $event,
                            type: "email"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex items-center gap-3.5 mt-4" }, [
                        createVNode("div", { class: "flex-1" }, [
                          createVNode(_component_UFormField, {
                            label: "Senha",
                            name: "password",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).password,
                                "onUpdate:modelValue": ($event) => unref(state).password = $event,
                                type: "password"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "flex-1" }, [
                          createVNode(_component_UFormField, {
                            label: "Repetir senha",
                            name: "passwordRepeat",
                            required: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UInput, {
                                size: "lg",
                                class: "w-full mt-2",
                                modelValue: unref(state).passwordRepeat,
                                "onUpdate:modelValue": ($event) => unref(state).passwordRepeat = $event,
                                type: "password"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode(_component_UFormField, {
                        class: "mt-4",
                        label: "Nascimento",
                        name: "birth",
                        required: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UInput, {
                            size: "lg",
                            class: "w-full mt-2",
                            modelValue: unref(state).birth,
                            "onUpdate:modelValue": ($event) => unref(state).birth = $event,
                            type: "date"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UFormField, {
                        class: "mt-4",
                        label: "Cargo",
                        name: "roleId",
                        required: ""
                      }, {
                        default: withCtx(() => {
                          var _a2;
                          return [
                            createVNode(_component_USelect, {
                              modelValue: unref(state).roleId,
                              "onUpdate:modelValue": ($event) => unref(state).roleId = $event,
                              items: (_a2 = unref(roles)) == null ? void 0 : _a2.roles,
                              "value-key": "id",
                              "label-key": "name",
                              class: "w-full"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                          ];
                        }),
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
                            createTextVNode("Atualizar")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/usuarios/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CXmslU10.mjs.map
