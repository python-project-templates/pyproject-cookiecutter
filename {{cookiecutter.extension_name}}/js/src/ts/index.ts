import {
  JupyterLabFrontEnd, JupyterLabFrontEndPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the {{ cookiecutter.extension_name }} extension.
 */
const extension: JupyterLabFrontEndPlugin<void> = {
  id: '{{ cookiecutter.extension_name }}',
  autoStart: true,
  activate: (app: JupyterLabFrontEnd) => {
    console.log('JupyterLab extension {{ cookiecutter.extension_name }} is activated!');
  }
};

export default extension;
