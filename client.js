window.__ModuleLoader__.load({
  id: '@local/dsh-official-brand',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { FishLogo, BrandWordmark } = require('@deepseek-ai/dsh-client-ui-primitives');

    return {
      inject: ['slots', 'uiWorkspace'],
      apply(ctx) {
        const uiWorkspace = ctx.uiWorkspace;
        const startSession = () => {
          try {
            uiWorkspace.startSession();
          } catch (error) {
            console.error('[dsh-official-brand] startSession failed', error);
          }
        };
        // macOS hides the titlebar and marks the brand row as a window-drag
        // surface, so the shell renders a <span> instead of its clickable
        // <button>. Opt our brand back out of the drag region and add the
        // missing New Session click ourselves.
        const clickable = {
          display: 'inline-flex',
          alignItems: 'center',
          WebkitAppRegion: 'no-drag',
          cursor: 'pointer',
        };
        function OfficialBrandMark({ size }) {
          return h('span', { style: clickable, onClick: startSession, title: 'New Session' },
            h(FishLogo, { size }));
        }
        function OfficialBrandName() {
          return h('span', { style: clickable, onClick: startSession, title: 'New Session' },
            h(BrandWordmark, { includeMark: false }));
        }
        ctx.slots.inject('sidebar.brand.mark', () =>
          ctx.slots.inject('sidebar.brand.name', function* () {
            yield ctx.slots.register({ name: 'sidebar.brand.mark', id: 'official-brand' }, OfficialBrandMark);
            yield ctx.slots.register({ name: 'sidebar.brand.name', id: 'official-brand' }, OfficialBrandName);
          }));
      },
    };
  },
});
