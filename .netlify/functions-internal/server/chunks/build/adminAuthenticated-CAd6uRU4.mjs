import { b as _sfc_main$c, i as useRoute, _ as __nuxt_component_1, a as useAppConfig, l as usePortal, t as tv } from './server.mjs';
import { defineComponent, mergeProps, ref, computed, unref, withCtx, createTextVNode, createVNode, useSlots, toRef, renderSlot, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { defineStore } from 'pinia';
import { y as defu } from '../nitro/nitro.mjs';
import { useForwardPropsEmits, TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow, Primitive } from 'reka-ui';
import { reactivePick, createSharedComposable } from '@vueuse/core';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { u as useAuthStore } from './auth-B3q0Asa0.mjs';
import 'vue-router';
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

const useSidebarStore = defineStore("sidebar", () => {
  const isSidebarOpen = ref(false);
  function handleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
  return {
    isSidebarOpen,
    handleSidebar
  };
});
const kbdKeysMap = {
  meta: "",
  ctrl: "",
  alt: "",
  win: "\u229E",
  command: "\u2318",
  shift: "\u21E7",
  option: "\u2325",
  enter: "\u21B5",
  delete: "\u2326",
  backspace: "\u232B",
  escape: "\u238B",
  tab: "\u21E5",
  capslock: "\u21EA",
  arrowup: "\u2191",
  arrowright: "\u2192",
  arrowdown: "\u2193",
  arrowleft: "\u2190",
  pageup: "\u21DE",
  pagedown: "\u21DF",
  home: "\u2196",
  end: "\u2198"
};
const _useKbd = () => {
  const macOS = computed(() => false);
  const kbdKeysSpecificMap = reactive({
    meta: " ",
    alt: " ",
    ctrl: " "
  });
  function getKbdKey(value) {
    if (!value) {
      return;
    }
    if (["meta", "alt", "ctrl"].includes(value)) {
      return kbdKeysSpecificMap[value];
    }
    return kbdKeysMap[value] || value.toUpperCase();
  }
  return {
    macOS,
    getKbdKey
  };
};
const useKbd = /* @__PURE__ */ createSharedComposable(_useKbd);
const theme$1 = {
  "base": "inline-flex items-center justify-center px-1 rounded-sm font-medium font-sans",
  "variants": {
    "variant": {
      "solid": "bg-inverted text-inverted",
      "outline": "bg-default text-highlighted ring ring-inset ring-accented",
      "subtle": "bg-elevated text-default ring ring-inset ring-accented"
    },
    "size": {
      "sm": "h-4 min-w-[16px] text-[10px]",
      "md": "h-5 min-w-[20px] text-[11px]",
      "lg": "h-6 min-w-[24px] text-[12px]"
    }
  },
  "defaultVariants": {
    "variant": "outline",
    "size": "md"
  }
};
const _sfc_main$3 = {
  __name: "Kbd",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false, default: "kbd" },
    value: { type: null, required: false },
    variant: { type: null, required: false },
    size: { type: null, required: false },
    class: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const { getKbdKey } = useKbd();
    const appConfig = useAppConfig();
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme$1), ...((_a = appConfig.ui) == null ? void 0 : _a.kbd) || {} });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value({ variant: __props.variant, size: __props.size, class: props.class })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`${ssrInterpolate(unref(getKbdKey)(__props.value))}`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(toDisplayString(unref(getKbdKey)(__props.value)), 1)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Kbd.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const theme = {
  "slots": {
    "content": "flex items-center gap-1 bg-default text-highlighted shadow-sm rounded-sm ring ring-default h-6 px-2 py-1 text-xs select-none data-[state=delayed-open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-tooltip-content-transform-origin) pointer-events-auto",
    "arrow": "fill-default",
    "text": "truncate",
    "kbds": "hidden lg:inline-flex items-center shrink-0 gap-0.5 before:content-['\xB7'] before:me-0.5",
    "kbdsSize": "sm"
  }
};
const _sfc_main$2 = {
  __name: "Tooltip",
  __ssrInlineRender: true,
  props: {
    text: { type: String, required: false },
    kbds: { type: Array, required: false },
    content: { type: Object, required: false },
    arrow: { type: [Boolean, Object], required: false },
    portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
    class: { type: null, required: false },
    ui: { type: null, required: false },
    defaultOpen: { type: Boolean, required: false },
    open: { type: Boolean, required: false },
    delayDuration: { type: Number, required: false },
    disableHoverableContent: { type: Boolean, required: false },
    disableClosingTrigger: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    ignoreNonKeyboardFocus: { type: Boolean, required: false }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const rootProps = useForwardPropsEmits(reactivePick(props, "defaultOpen", "open", "delayDuration", "disableHoverableContent", "disableClosingTrigger", "disabled", "ignoreNonKeyboardFocus"), emits);
    const portalProps = usePortal(toRef(() => props.portal));
    const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
    const arrowProps = toRef(() => props.arrow);
    const ui = computed(() => {
      var _a;
      return tv({ extend: tv(theme), ...((_a = appConfig.ui) == null ? void 0 : _a.tooltip) || {} })({
        side: contentProps.value.side
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipRoot), mergeProps(unref(rootProps), _attrs), {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.default) {
              _push2(ssrRenderComponent(unref(TooltipTrigger), mergeProps(_ctx.$attrs, {
                "as-child": "",
                class: props.class
              }), {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", { open })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(TooltipPortal), unref(portalProps), {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(unref(TooltipContent), mergeProps(contentProps.value, {
                    class: ui.value.content({ class: [!slots.default && props.class, (_a = props.ui) == null ? void 0 : _a.content] })
                  }), {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      var _a2, _b2;
                      if (_push4) {
                        ssrRenderSlot(_ctx.$slots, "content", {}, () => {
                          var _a3, _b3, _c;
                          if (__props.text) {
                            _push4(`<span class="${ssrRenderClass(ui.value.text({ class: (_a3 = props.ui) == null ? void 0 : _a3.text }))}"${_scopeId3}>${ssrInterpolate(__props.text)}</span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if ((_b3 = __props.kbds) == null ? void 0 : _b3.length) {
                            _push4(`<span class="${ssrRenderClass(ui.value.kbds({ class: (_c = props.ui) == null ? void 0 : _c.kbds }))}"${_scopeId3}><!--[-->`);
                            ssrRenderList(__props.kbds, (kbd, index) => {
                              var _a4;
                              _push4(ssrRenderComponent(_sfc_main$3, mergeProps({
                                key: index,
                                size: ((_a4 = props.ui) == null ? void 0 : _a4.kbdsSize) || ui.value.kbdsSize(),
                                ref_for: true
                              }, typeof kbd === "string" ? { value: kbd } : kbd), null, _parent4, _scopeId3));
                            });
                            _push4(`<!--]--></span>`);
                          } else {
                            _push4(`<!---->`);
                          }
                        }, _push4, _parent4, _scopeId3);
                        if (!!__props.arrow) {
                          _push4(ssrRenderComponent(unref(TooltipArrow), mergeProps(arrowProps.value, {
                            class: ui.value.arrow({ class: (_a2 = props.ui) == null ? void 0 : _a2.arrow })
                          }), null, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          renderSlot(_ctx.$slots, "content", {}, () => {
                            var _a3, _b3, _c;
                            return [
                              __props.text ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: ui.value.text({ class: (_a3 = props.ui) == null ? void 0 : _a3.text })
                              }, toDisplayString(__props.text), 3)) : createCommentVNode("", true),
                              ((_b3 = __props.kbds) == null ? void 0 : _b3.length) ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: ui.value.kbds({ class: (_c = props.ui) == null ? void 0 : _c.kbds })
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                                  var _a4;
                                  return openBlock(), createBlock(_sfc_main$3, mergeProps({
                                    key: index,
                                    size: ((_a4 = props.ui) == null ? void 0 : _a4.kbdsSize) || ui.value.kbdsSize(),
                                    ref_for: true
                                  }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                                }), 128))
                              ], 2)) : createCommentVNode("", true)
                            ];
                          }),
                          !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: (_b2 = props.ui) == null ? void 0 : _b2.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(TooltipContent), mergeProps(contentProps.value, {
                      class: ui.value.content({ class: [!slots.default && props.class, (_b = props.ui) == null ? void 0 : _b.content] })
                    }), {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          renderSlot(_ctx.$slots, "content", {}, () => {
                            var _a3, _b2, _c;
                            return [
                              __props.text ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: ui.value.text({ class: (_a3 = props.ui) == null ? void 0 : _a3.text })
                              }, toDisplayString(__props.text), 3)) : createCommentVNode("", true),
                              ((_b2 = __props.kbds) == null ? void 0 : _b2.length) ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: ui.value.kbds({ class: (_c = props.ui) == null ? void 0 : _c.kbds })
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                                  var _a4;
                                  return openBlock(), createBlock(_sfc_main$3, mergeProps({
                                    key: index,
                                    size: ((_a4 = props.ui) == null ? void 0 : _a4.kbdsSize) || ui.value.kbdsSize(),
                                    ref_for: true
                                  }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                                }), 128))
                              ], 2)) : createCommentVNode("", true)
                            ];
                          }),
                          !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: (_a2 = props.ui) == null ? void 0 : _a2.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 3
                    }, 16, ["class"])
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              !!slots.default ? (openBlock(), createBlock(unref(TooltipTrigger), mergeProps({ key: 0 }, _ctx.$attrs, {
                "as-child": "",
                class: props.class
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default", { open })
                ]),
                _: 2
              }, 1040, ["class"])) : createCommentVNode("", true),
              createVNode(unref(TooltipPortal), unref(portalProps), {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode(unref(TooltipContent), mergeProps(contentProps.value, {
                      class: ui.value.content({ class: [!slots.default && props.class, (_a = props.ui) == null ? void 0 : _a.content] })
                    }), {
                      default: withCtx(() => {
                        var _a2;
                        return [
                          renderSlot(_ctx.$slots, "content", {}, () => {
                            var _a3, _b, _c;
                            return [
                              __props.text ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: ui.value.text({ class: (_a3 = props.ui) == null ? void 0 : _a3.text })
                              }, toDisplayString(__props.text), 3)) : createCommentVNode("", true),
                              ((_b = __props.kbds) == null ? void 0 : _b.length) ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: ui.value.kbds({ class: (_c = props.ui) == null ? void 0 : _c.kbds })
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.kbds, (kbd, index) => {
                                  var _a4;
                                  return openBlock(), createBlock(_sfc_main$3, mergeProps({
                                    key: index,
                                    size: ((_a4 = props.ui) == null ? void 0 : _a4.kbdsSize) || ui.value.kbdsSize(),
                                    ref_for: true
                                  }, typeof kbd === "string" ? { value: kbd } : kbd), null, 16, ["size"]);
                                }), 128))
                              ], 2)) : createCommentVNode("", true)
                            ];
                          }),
                          !!__props.arrow ? (openBlock(), createBlock(unref(TooltipArrow), mergeProps({ key: 0 }, arrowProps.value, {
                            class: ui.value.arrow({ class: (_a2 = props.ui) == null ? void 0 : _a2.arrow })
                          }), null, 16, ["class"])) : createCommentVNode("", true)
                        ];
                      }),
                      _: 3
                    }, 16, ["class"])
                  ];
                }),
                _: 3
              }, 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/Tooltip.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const cn = (...classes) => twMerge(clsx(...classes));
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuthSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const sidebarStore = useSidebarStore();
    const authStore = useAuthStore();
    const route = useRoute();
    const includesPrefix = (routeName) => {
      var _a;
      return (_a = route.name) == null ? void 0 : _a.toString().startsWith(routeName);
    };
    const welcomeUser = computed(() => {
      var _a;
      return `Bem vindo(a), ${(_a = authStore.user) == null ? void 0 : _a.name}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_UIcon = _sfc_main$c;
      const _component_NuxtLink = __nuxt_component_1;
      const _component_UTooltip = _sfc_main$2;
      _push(`<!--[--><div class="${ssrRenderClass(
        ("cn" in _ctx ? _ctx.cn : unref(cn))(
          "bg-neutral-900 text-white w-64 fixed md:relative md:translate-x-0 transform -translate-x-full md:transform-none transition-transform duration-300 ease-in-out z-50 h-screen",
          {
            "translate-x-0": unref(sidebarStore).isSidebarOpen
          }
        )
      )}"><button type="button" class="absolute top-4 right-4 text-white md:hidden">`);
      _push(ssrRenderComponent(_component_UIcon, {
        class: "text-3xl",
        name: "i-heroicons-x-mark"
      }, null, _parent));
      _push(`</button><div class="py-5 h-full mt-8 flex flex-col relative"><h1 class="text-center mt-4 text-xl">${ssrInterpolate(unref(welcomeUser))}</h1><ul class="mt-4 text-lg">`);
      if (((_a = unref(authStore).user) == null ? void 0 : _a.role) === "admin") {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: [
            "w-full h-full inline-block pl-7 py-3.5 text-neutral-400",
            { "text-primary-400": includesPrefix("usuarios") }
          ],
          to: "/usuarios"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Usu\xE1rios `);
            } else {
              return [
                createTextVNode(" Usu\xE1rios ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: [
          "w-full h-full inline-block pl-7 py-3.5 text-neutral-400",
          { "text-primary-400": includesPrefix("estabelecimentos") }
        ],
        to: "/estabelecimentos"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Estabelecimentos `);
          } else {
            return [
              createTextVNode(" Estabelecimentos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: [[
          "w-full h-full inline-block pl-7 py-3.5 text-neutral-400",
          { "text-primary-400": includesPrefix("monitores") }
        ], "w-full h-full inline-block pl-7 py-3.5 text-neutral-400"],
        to: "/monitores"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Monitores `);
          } else {
            return [
              createTextVNode(" Monitores ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: [[
          "w-full h-full inline-block pl-7 py-3.5 text-neutral-400",
          { "text-primary-400": includesPrefix("propagandas") }
        ], "w-full h-full inline-block pl-7 py-3.5 text-neutral-400"],
        to: "/propagandas"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Propagandas `);
          } else {
            return [
              createTextVNode(" Propagandas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: [[
          "w-full h-full inline-block pl-7 py-3.5 text-neutral-400",
          { "text-primary-400": includesPrefix("playlists") }
        ], "w-full h-full inline-block pl-7 py-3.5 text-neutral-400"],
        to: "/playlists"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Playlists `);
          } else {
            return [
              createTextVNode(" Playlists ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><div class="absolute left-18 right-0 bottom-20"><button type="button">`);
      _push(ssrRenderComponent(_component_UTooltip, {
        "delay-duration": 0,
        text: "Sair"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              class: "cursor-pointer size-6 text-red-500",
              name: "i-lucide-log-out"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                class: "cursor-pointer size-6 text-red-500",
                name: "i-lucide-log-out"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</button></div></div></div>`);
      if (unref(sidebarStore).isSidebarOpen) {
        _push(`<div class="fixed inset-0 bg-black opacity-50 z-40 md:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuthSidebar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "adminAuthenticated",
  __ssrInlineRender: true,
  setup(__props) {
    const { handleSidebar } = useSidebarStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen overflow-y-hidden" }, _attrs))}>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<main class="relative flex-1 ml-0 md:ml-12 py-5"><button type="button" class="cursor-pointer p-4 md:hidden text-white">`);
      _push(ssrRenderComponent(_component_UIcon, {
        class: "text-4xl",
        name: "i-heroicons-bars-3"
      }, null, _parent));
      _push(`</button><div class="px-4 mt-11">`);
      ssrRenderSlot(_ctx.$slots, "#header", {}, null, _push, _parent);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/adminAuthenticated.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=adminAuthenticated-CAd6uRU4.mjs.map
