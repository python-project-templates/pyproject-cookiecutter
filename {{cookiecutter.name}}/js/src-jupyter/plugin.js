import {IJupyterWidgetRegistry} from "@jupyter-widgets/base";

import {MODULE_VERSION} from "./version";

const EXTENSION_ID = "{{cookiecutter.module}}:plugin";

/**
 * Activate the widget extension.
 */
function activateWidgetExtension(app, registry) {
  registry.registerWidget({
    // eslint-disable-next-line no-return-await
    exports: async () => await import(/* webpackChunkName: "{{cookiecutter.module}}" */ "./widget"),
    name: "{{cookiecutter.module}}",
    version: MODULE_VERSION,
  });
}

/**
 * The example plugin.
 */
const examplePlugin = {
  activate: activateWidgetExtension,
  autoStart: true,
  id: EXTENSION_ID,
  requires: [IJupyterWidgetRegistry],
};

export default examplePlugin;
