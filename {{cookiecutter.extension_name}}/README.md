# {{ cookiecutter.extension_name }}

{{ cookiecutter.project_short_description }}

[![Build Status](https://travis-ci.org/timkpaine/{{ cookiecutter.extension_name }}.svg?branch=master)](https://travis-ci.org/timkpaine/{{ cookiecutter.extension_name }})
[![GitHub issues](https://img.shields.io/github/issues/timkpaine/{{ cookiecutter.extension_name }}.svg)]()
[![codecov](https://codecov.io/gh/timkpaine/{{ cookiecutter.extension_name }}/branch/master/graph/badge.svg)](https://codecov.io/gh/timkpaine/{{ cookiecutter.extension_name }})
[![BCH compliance](https://bettercodehub.com/edge/badge/timkpaine/{{ cookiecutter.extension_name }}?branch=master)](https://bettercodehub.com/)
[![PyPI](https://img.shields.io/pypi/l/{{ cookiecutter.extension_name }}.svg)](https://pypi.python.org/pypi/{{ cookiecutter.extension_name }})
[![PyPI](https://img.shields.io/pypi/v/{{ cookiecutter.extension_name }}.svg)](https://pypi.python.org/pypi/{{ cookiecutter.extension_name }})
[![npm](https://img.shields.io/npm/v/{{ cookiecutter.extension_name }}.svg)](https://www.npmjs.com/package/{{ cookiecutter.extension_name }})
[![Docs](https://img.shields.io/readthedocs/{{ cookiecutter.extension_name }}.svg)](https://{{ cookiecutter.extension_name }}.readthedocs.io)

## Install
To install the base package from pip:

`pip install {{ cookiecutter.extension_name }}`

To Install from source:

`make install`


To install the JupyterLab extension:

`jupyter labextension install {{ cookiecutter.extension_name }}`

or from source:

`make labextension`

To enable the Jupyter server extension:

`jupyter serverextension enable --py {{ cookiecutter.extension_name }}`


## Getting Started
[Read the docs!](http://{{ cookiecutter.extension_name }}.readthedocs.io/en/latest/index.html)

