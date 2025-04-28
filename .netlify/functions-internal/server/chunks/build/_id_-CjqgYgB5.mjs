import { u as useHead, k as useRoute, e as useRouter, l as _sfc_main$b } from './server.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Propagandas"
    });
    const route = useRoute();
    useRouter();
    const id = route.params.id;
    const { data: propagandas } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      `/api/propagandas/assistir/${id}`,
      { method: "GET" },
      "$2vTVsLqV1P"
    )), __temp = await __temp, __restore(), __temp);
    const allImages = computed(() => {
      var _a, _b, _c, _d;
      const ads = ((_d = (_c = (_b = (_a = propagandas.value) == null ? void 0 : _a.monitor) == null ? void 0 : _b.monitor) == null ? void 0 : _c.playlist) == null ? void 0 : _d.advertisements) || [];
      return ads.flatMap((ad) => {
        var _a2;
        return (_a2 = ad.images) != null ? _a2 : [];
      });
    });
    const currentIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtImg = _sfc_main$b;
      if (allImages.value.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-screen h-screen relative overflow-hidden" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: (_a = allImages.value[currentIndex.value]) == null ? void 0 : _a.url,
          class: "absolute top-0 left-0 w-full h-full object-cover blur-xl scale-110 z-0 transition-all duration-700",
          alt: "Background"
        }, null, _parent));
        _push(`<div class="relative z-10 w-full h-full flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          src: (_b = allImages.value[currentIndex.value]) == null ? void 0 : _b.url,
          class: "max-w-full max-h-full object-contain transition-all duration-700",
          alt: "Slideshow"
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/monitores/assistir/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-CjqgYgB5.mjs.map
