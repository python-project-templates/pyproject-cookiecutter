from ._version import __version__
{%- if cookiecutter.pattern == "cpp" %}
import os
import os.path
{%- endif %}
{%- if cookiecutter.pattern == "jupyter" %}


def _jupyter_server_extension_paths():
    return [{"module": "{{cookiecutter.module}}.extension"}]
{%- endif %}

{%- if cookiecutter.pattern == "cpp" %}


def include_path():
    return os.path.abspath(os.path.join(os.path.dirname(__file__), "include"))


def bin_path():
    return os.path.abspath(os.path.join(os.path.dirname(__file__), "bin"))


def lib_path():
    return os.path.abspath(os.path.join(os.path.dirname(__file__), "lib"))
{%- endif %}
