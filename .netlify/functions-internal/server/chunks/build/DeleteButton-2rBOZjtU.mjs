import { h as _sfc_main$7 } from './server.mjs';
import { defineComponent, computed, unref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuthStore } from './auth-CYmGQrwQ.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UpdateButton",
  __ssrInlineRender: true,
  props: {
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
      if (unref(permission)) {
        _push(ssrRenderComponent(_component_UButton, mergeProps({
          to: _ctx.to,
          color: "secondary",
          class: "max-w-[120px] w-full flex items-center justify-center cursor-pointer text-neutral-950"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Atualizar`);
            } else {
              return [
                createTextVNode("Atualizar")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/UpdateButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeleteButton",
  __ssrInlineRender: true,
  props: {
    onClick: {},
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
      if (unref(permission)) {
        _push(ssrRenderComponent(_component_UButton, mergeProps({
          onClick: _ctx.onClick,
          color: "error",
          class: "max-w-[120px] w-full flex items-center justify-center cursor-pointer text-neutral-950"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Excluir`);
            } else {
              return [
                createTextVNode("Excluir")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/DeleteButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$1 as _, _sfc_main as a };
//# sourceMappingURL=DeleteButton-2rBOZjtU.mjs.map
