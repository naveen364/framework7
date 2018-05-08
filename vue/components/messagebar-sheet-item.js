import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-messagebar-sheet-item',
  props: {
    id: [
      String,
      Number
    ],
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const classes = Utils.classNames(this.props.className, 'messagebar-sheet-item', Mixins.colorClasses(this));
    return _h('div', {
      style: this.props.style,
      class: classes,
      attrs: { id: this.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }
  }
};