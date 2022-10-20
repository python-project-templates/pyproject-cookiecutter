{%- if cookiecutter.pattern == "cpp" -%}
from skbuild import setup
{%- else -%}
from setuptools import setup
{%- endif %}

{%- if cookiecutter.pattern == "cpp" %}


setup(
    packages=["{{cookiecutter.module}}"],
    cmake_install_dir="{{cookiecutter.module}}",
    # cmake_with_sdist=True,
)
{%- else %}


setup()
{%- endif %}
