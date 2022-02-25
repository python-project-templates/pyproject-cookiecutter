import '../style/index.css';


/**
 * Initialization data for the {{ cookiecutter.extension_name }} extension.
 */
const extension = {
  id: "{{ cookiecutter.extension_name }}",
  autoStart: true,
  activate: (app) => {
    console.log('JupyterLab extension {{ cookiecutter.extension_name }} is activated!');
  }
};

export default extension;
