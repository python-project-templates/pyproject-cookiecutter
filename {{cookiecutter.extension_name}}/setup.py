from setuptools import setup, find_packages
from codecs import open
import os.path
import io

pjoin = os.path.join
here = os.path.abspath(os.path.dirname(__file__))
name = '{{ cookiecutter.extension_name }}'


def get_version(file, name='__version__'):
    path = os.path.realpath(file)
    version_ns = {}
    with io.open(path, encoding="utf8") as f:
        exec(f.read(), {}, version_ns)
    return version_ns[name]

version = get_version(pjoin(here, name, '_version.py'))


requires = [
    'deprecation>=2.0.6',
    'ipython>=7.2.0',
    'Pillow>=5.3.0',
    'pandas>=0.22',
    'requests>=2.21.0',
    'socketIO-client-nexus>=0.7.6',
    'sseclient>=0.0.22',
    'temporal-cache>=0.0.5',
]

requires_dev = [
    'flake8>=3.7.8',
    'mock',
    'pybind11>=2.4.0',
    'pytest>=4.3.0',
    'pytest-cov>=2.6.1',
    'Sphinx>=1.8.4',
    'sphinx-markdown-builder>=0.5.2',
] + requires


with open(path.join(here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    name=name,
    version=version,
    description='{{ cookiecutter.project_short_description }}',
    long_description=long_description,
    url='{{REPO_URL}}',
    author='Tim Paine',
    author_email='timothy.k.paine@gmail.com',
    license='Apache 2.0',

    classifiers=[
        'Development Status :: 3 - Alpha',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'Programming Language :: Python :: 3.8',
    ],

    keywords='',
    packages=find_packages(exclude=[]),
    install_requires=requires,
    extras_require={
        'dev': requires_dev,
    },
)
