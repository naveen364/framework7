import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-popover',
  props: {
    id: [
      String,
      Number
    ],
    opened: Boolean,
    target: [
      String,
      Object
    ],
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    return _h('div', {
      ref: 'el',
      style: self.props.style,
      class: self.classes,
      attrs: { id: self.props.id }
    }, [
      _h('div', { class: 'popover-angle' }),
      _h('div', { class: 'popover-inner' }, [this.$slots['default']])
    ]);
  },
  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.f7Popover)
        return;
      if (opened) {
        self.f7Popover.open();
      } else {
        self.f7Popover.close();
      }
    }
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, 'popover', Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this);
    }
  },
  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el)
      return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('popover:open', self.onOpenBound);
    el.addEventListener('popover:opened', self.onOpenedBound);
    el.addEventListener('popover:close', self.onCloseBound);
    el.addEventListener('popover:closed', self.onClosedBound);
    self.$f7ready(() => {
      const popoverParams = { el };
      if (self.props.target)
        popoverParams.targetEl = self.props.target;
      self.f7Popover = self.$f7.popover.create(popoverParams);
      if (self.props.opened && self.props.target) {
        self.f7Popover.open(self.props.target, false);
      }
    });
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Popover)
      self.f7Popover.destroy();
    const el = self.$refs.el;
    if (!el)
      return;
    el.removeEventListener('popover:open', self.onOpenBound);
    el.removeEventListener('popover:opened', self.onOpenedBound);
    el.removeEventListener('popover:close', self.onCloseBound);
    el.removeEventListener('popover:closed', self.onClosedBound);
  },
  methods: {
    onOpen(event) {
      this.dispatchEvent('popover:open popoverOpen', event);
    },
    onOpened(event) {
      this.dispatchEvent('popover:opened popoverOpened', event);
    },
    onClose(event) {
      this.dispatchEvent('popover:close popoverClose', event);
    },
    onClosed(event) {
      this.dispatchEvent('popover:closed popoverClosed', event);
    },
    open(target, animate) {
      const self = this;
      if (!self.$f7)
        return undefined;
      return self.$f7.popover.open(self.$refs.el, target, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7)
        return undefined;
      return self.$f7.sheet.close(self.$refs.el, animate);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};