import { _ as __nuxt_component_0 } from './nuxt-layout-DNQc9wwP.mjs';
import { _ as _sfc_main$1, a as __nuxt_component_2 } from './FormContainer-BR6RZkaW.mjs';
import { _ as _sfc_main$2, a as _sfc_main$1$1, b as _sfc_main$3 } from './Input-e683DqaG.mjs';
import { _ as _sfc_main$4 } from './Select-B7z0EKDR.mjs';
import { u as useHead, k as useRoute, f as useToast, l as _sfc_main$b, h as _sfc_main$7 } from './server.mjs';
import { _ as _sfc_main$5 } from './Modal-T0uP5UIs.mjs';
import { defineComponent, withAsyncContext, reactive, ref, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderList } from 'vue/server-renderer';
import * as z from 'zod';
import { u as useFetch } from './fetch-mpB_uxaL.mjs';
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
    var _a, _b;
    let __temp, __restore;
    useHead({
      title: "Editar monitor"
    });
    const route = useRoute();
    const schema = z.object({
      name: z.string({ message: "Campo obrigat\xF3rio" }).min(4, "Must be at least 4 characters"),
      playlistId: z.number({ message: "Campo obrigat\xF3rio" }).int({ message: "Campo obrigat\xF3rio" }),
      url: z.array(z.any({ message: "Arquivo inv\xE1lido" }), {
        required_error: "Campo obrigat\xF3rio"
      }).optional()
    }).refine(
      (data2) => {
        var _a2, _b2, _c;
        const hasExistingImages = ((_a2 = advertisement.value) == null ? void 0 : _a2.advertisement.images) && ((_c = (_b2 = advertisement.value) == null ? void 0 : _b2.advertisement.images) == null ? void 0 : _c.length) > 0;
        const hasNewUploads = data2.url && data2.url.length > 0;
        return hasExistingImages || hasNewUploads;
      },
      {
        path: ["url"],
        message: "Pelo menos um arquivo \xE9 necess\xE1rio"
      }
    );
    const id = route.params.id;
    const { data: advertisement, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/propagandas/${id}`,
      "$lfryAwBQDp"
    )), __temp = await __temp, __restore(), __temp);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/playlists`, "$5ZwXoXZ7hK")), __temp = await __temp, __restore(), __temp);
    const state = reactive({
      name: ((_a = advertisement.value) == null ? void 0 : _a.advertisement.name) || void 0,
      playlistId: ((_b = advertisement.value) == null ? void 0 : _b.advertisement.playlistId) || void 0,
      url: []
    });
    const isSubmitting = ref(false);
    const isDeletingImageVideo = ref(false);
    const toast = useToast();
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
        await $fetch(`/api/propagandas/${id}`, {
          method: "PATCH",
          body: {
            name: event.data.name,
            url: event.data.url,
            playlistId: event.data.playlistId
          }
        });
        toast.add({
          title: "Success",
          description: "Propaganda atualizada com sucesso",
          color: "success"
        });
      } catch {
        toast.add({
          title: "Erro",
          description: "Houve um erro ao atualizar a propaganda",
          color: "error"
        });
      } finally {
        isSubmitting.value = false;
      }
    }
    async function handleDeleteImageVideo(id2) {
      isDeletingImageVideo.value = true;
      try {
        await useFetch(`/api/propaganda-imagem/${id2}`, {
          method: "DELETE"
        }, "$CBrqD6PF-U");
        await refresh();
        toast.add({
          title: "Success",
          description: "Imagem exclu\xEDda com sucesso",
          color: "success"
        });
      } catch (error) {
        toast.add({
          title: "Error",
          description: "Houve um erro ao excluir a imagem",
          color: "success"
        });
      } finally {
        isDeletingImageVideo.value = false;
      }
    }
    const hasImages = computed(
      () => {
        var _a2, _b2;
        return ((_a2 = advertisement.value) == null ? void 0 : _a2.advertisement.images) && ((_b2 = advertisement.value) == null ? void 0 : _b2.advertisement.images.length) > 0;
      }
    );
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
      const _component_UModal = _sfc_main$5;
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
                      var _a2, _b2, _c, _d;
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
                          name: "playlistId",
                          required: ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a3, _b3;
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_USelect, {
                                size: "lg",
                                modelValue: unref(state).playlistId,
                                "onUpdate:modelValue": ($event) => unref(state).playlistId = $event,
                                items: (_a3 = unref(data)) == null ? void 0 : _a3.playlists,
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
                                  items: (_b3 = unref(data)) == null ? void 0 : _b3.playlists,
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
                          required: !unref(hasImages)
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
                        if ((_a2 = unref(state).url) == null ? void 0 : _a2.length) {
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
                        _push4(`<div class="my-8"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UModal, {
                          title: `Imagens / v\xEDdeos da propaganda ${(_b2 = unref(advertisement)) == null ? void 0 : _b2.advertisement.name}`
                        }, {
                          body: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a3, _b3;
                            if (_push5) {
                              _push5(`<div${_scopeId4}><h2 class="mb-4"${_scopeId4}>Imagens:</h2><div class="flex flex-wrap gap-12"${_scopeId4}><!--[-->`);
                              ssrRenderList((_a3 = unref(advertisement)) == null ? void 0 : _a3.advertisement.images, (image) => {
                                _push5(`<div class="flex flex-col"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_NuxtImg, {
                                  class: "w-44 h-44 object-cover object-center rounded-md",
                                  format: "webp",
                                  src: image.url,
                                  alt: `Propaganda - ${image.id}`,
                                  placeholder: ""
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_UButton, {
                                  onClick: ($event) => handleDeleteImageVideo(image.id),
                                  loading: unref(isDeletingImageVideo),
                                  color: "error",
                                  class: "cursor-pointer mt-3.5"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`Remover propaganda`);
                                    } else {
                                      return [
                                        createTextVNode("Remover propaganda")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`</div>`);
                              });
                              _push5(`<!--]--></div></div>`);
                            } else {
                              return [
                                createVNode("div", null, [
                                  createVNode("h2", { class: "mb-4" }, "Imagens:"),
                                  createVNode("div", { class: "flex flex-wrap gap-12" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList((_b3 = unref(advertisement)) == null ? void 0 : _b3.advertisement.images, (image) => {
                                      return openBlock(), createBlock("div", {
                                        key: image.id,
                                        class: "flex flex-col"
                                      }, [
                                        createVNode(_component_NuxtImg, {
                                          class: "w-44 h-44 object-cover object-center rounded-md",
                                          format: "webp",
                                          src: image.url,
                                          alt: `Propaganda - ${image.id}`,
                                          placeholder: ""
                                        }, null, 8, ["src", "alt"]),
                                        createVNode(_component_UButton, {
                                          onClick: ($event) => handleDeleteImageVideo(image.id),
                                          loading: unref(isDeletingImageVideo),
                                          color: "error",
                                          class: "cursor-pointer mt-3.5"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Remover propaganda")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick", "loading"])
                                      ]);
                                    }), 128))
                                  ])
                                ])
                              ];
                            }
                          }),
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            var _a3, _b3;
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UButton, {
                                class: "cursor-pointer",
                                size: "lg",
                                label: `Consultar imagens (${(_a3 = unref(advertisement)) == null ? void 0 : _a3.advertisement.images.length})`,
                                color: "info"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UButton, {
                                  class: "cursor-pointer",
                                  size: "lg",
                                  label: `Consultar imagens (${(_b3 = unref(advertisement)) == null ? void 0 : _b3.advertisement.images.length})`,
                                  color: "info"
                                }, null, 8, ["label"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="flex items-center justify-center"${_scopeId3}>`);
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
                            name: "playlistId",
                            required: ""
                          }, {
                            default: withCtx(() => {
                              var _a3;
                              return [
                                createVNode(_component_USelect, {
                                  size: "lg",
                                  modelValue: unref(state).playlistId,
                                  "onUpdate:modelValue": ($event) => unref(state).playlistId = $event,
                                  items: (_a3 = unref(data)) == null ? void 0 : _a3.playlists,
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
                            required: !unref(hasImages)
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
                          }, 8, ["required"]),
                          ((_c = unref(state).url) == null ? void 0 : _c.length) ? (openBlock(), createBlock("div", {
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
                          createVNode("div", { class: "my-8" }, [
                            createVNode(_component_UModal, {
                              title: `Imagens / v\xEDdeos da propaganda ${(_d = unref(advertisement)) == null ? void 0 : _d.advertisement.name}`
                            }, {
                              body: withCtx(() => {
                                var _a3;
                                return [
                                  createVNode("div", null, [
                                    createVNode("h2", { class: "mb-4" }, "Imagens:"),
                                    createVNode("div", { class: "flex flex-wrap gap-12" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList((_a3 = unref(advertisement)) == null ? void 0 : _a3.advertisement.images, (image) => {
                                        return openBlock(), createBlock("div", {
                                          key: image.id,
                                          class: "flex flex-col"
                                        }, [
                                          createVNode(_component_NuxtImg, {
                                            class: "w-44 h-44 object-cover object-center rounded-md",
                                            format: "webp",
                                            src: image.url,
                                            alt: `Propaganda - ${image.id}`,
                                            placeholder: ""
                                          }, null, 8, ["src", "alt"]),
                                          createVNode(_component_UButton, {
                                            onClick: ($event) => handleDeleteImageVideo(image.id),
                                            loading: unref(isDeletingImageVideo),
                                            color: "error",
                                            class: "cursor-pointer mt-3.5"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Remover propaganda")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick", "loading"])
                                        ]);
                                      }), 128))
                                    ])
                                  ])
                                ];
                              }),
                              default: withCtx(() => {
                                var _a3;
                                return [
                                  createVNode(_component_UButton, {
                                    class: "cursor-pointer",
                                    size: "lg",
                                    label: `Consultar imagens (${(_a3 = unref(advertisement)) == null ? void 0 : _a3.advertisement.images.length})`,
                                    color: "info"
                                  }, null, 8, ["label"])
                                ];
                              }),
                              _: 1
                            }, 8, ["title"])
                          ]),
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
                      default: withCtx(() => {
                        var _a2, _b2;
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
                            name: "playlistId",
                            required: ""
                          }, {
                            default: withCtx(() => {
                              var _a3;
                              return [
                                createVNode(_component_USelect, {
                                  size: "lg",
                                  modelValue: unref(state).playlistId,
                                  "onUpdate:modelValue": ($event) => unref(state).playlistId = $event,
                                  items: (_a3 = unref(data)) == null ? void 0 : _a3.playlists,
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
                            required: !unref(hasImages)
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
                          }, 8, ["required"]),
                          ((_a2 = unref(state).url) == null ? void 0 : _a2.length) ? (openBlock(), createBlock("div", {
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
                          createVNode("div", { class: "my-8" }, [
                            createVNode(_component_UModal, {
                              title: `Imagens / v\xEDdeos da propaganda ${(_b2 = unref(advertisement)) == null ? void 0 : _b2.advertisement.name}`
                            }, {
                              body: withCtx(() => {
                                var _a3;
                                return [
                                  createVNode("div", null, [
                                    createVNode("h2", { class: "mb-4" }, "Imagens:"),
                                    createVNode("div", { class: "flex flex-wrap gap-12" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList((_a3 = unref(advertisement)) == null ? void 0 : _a3.advertisement.images, (image) => {
                                        return openBlock(), createBlock("div", {
                                          key: image.id,
                                          class: "flex flex-col"
                                        }, [
                                          createVNode(_component_NuxtImg, {
                                            class: "w-44 h-44 object-cover object-center rounded-md",
                                            format: "webp",
                                            src: image.url,
                                            alt: `Propaganda - ${image.id}`,
                                            placeholder: ""
                                          }, null, 8, ["src", "alt"]),
                                          createVNode(_component_UButton, {
                                            onClick: ($event) => handleDeleteImageVideo(image.id),
                                            loading: unref(isDeletingImageVideo),
                                            color: "error",
                                            class: "cursor-pointer mt-3.5"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode("Remover propaganda")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick", "loading"])
                                        ]);
                                      }), 128))
                                    ])
                                  ])
                                ];
                              }),
                              default: withCtx(() => {
                                var _a3;
                                return [
                                  createVNode(_component_UButton, {
                                    class: "cursor-pointer",
                                    size: "lg",
                                    label: `Consultar imagens (${(_a3 = unref(advertisement)) == null ? void 0 : _a3.advertisement.images.length})`,
                                    color: "info"
                                  }, null, 8, ["label"])
                                ];
                              }),
                              _: 1
                            }, 8, ["title"])
                          ]),
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
                      var _a2, _b2;
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
                          name: "playlistId",
                          required: ""
                        }, {
                          default: withCtx(() => {
                            var _a3;
                            return [
                              createVNode(_component_USelect, {
                                size: "lg",
                                modelValue: unref(state).playlistId,
                                "onUpdate:modelValue": ($event) => unref(state).playlistId = $event,
                                items: (_a3 = unref(data)) == null ? void 0 : _a3.playlists,
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
                          required: !unref(hasImages)
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
                        }, 8, ["required"]),
                        ((_a2 = unref(state).url) == null ? void 0 : _a2.length) ? (openBlock(), createBlock("div", {
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
                        createVNode("div", { class: "my-8" }, [
                          createVNode(_component_UModal, {
                            title: `Imagens / v\xEDdeos da propaganda ${(_b2 = unref(advertisement)) == null ? void 0 : _b2.advertisement.name}`
                          }, {
                            body: withCtx(() => {
                              var _a3;
                              return [
                                createVNode("div", null, [
                                  createVNode("h2", { class: "mb-4" }, "Imagens:"),
                                  createVNode("div", { class: "flex flex-wrap gap-12" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList((_a3 = unref(advertisement)) == null ? void 0 : _a3.advertisement.images, (image) => {
                                      return openBlock(), createBlock("div", {
                                        key: image.id,
                                        class: "flex flex-col"
                                      }, [
                                        createVNode(_component_NuxtImg, {
                                          class: "w-44 h-44 object-cover object-center rounded-md",
                                          format: "webp",
                                          src: image.url,
                                          alt: `Propaganda - ${image.id}`,
                                          placeholder: ""
                                        }, null, 8, ["src", "alt"]),
                                        createVNode(_component_UButton, {
                                          onClick: ($event) => handleDeleteImageVideo(image.id),
                                          loading: unref(isDeletingImageVideo),
                                          color: "error",
                                          class: "cursor-pointer mt-3.5"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("Remover propaganda")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick", "loading"])
                                      ]);
                                    }), 128))
                                  ])
                                ])
                              ];
                            }),
                            default: withCtx(() => {
                              var _a3;
                              return [
                                createVNode(_component_UButton, {
                                  class: "cursor-pointer",
                                  size: "lg",
                                  label: `Consultar imagens (${(_a3 = unref(advertisement)) == null ? void 0 : _a3.advertisement.images.length})`,
                                  color: "info"
                                }, null, 8, ["label"])
                              ];
                            }),
                            _: 1
                          }, 8, ["title"])
                        ]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/propagandas/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CXbfx6TJ.mjs.map
