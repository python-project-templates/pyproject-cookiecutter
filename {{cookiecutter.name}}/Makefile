#########
# BUILD #
#########
develop:  ## install dependencies and build library
{%- if cookiecutter.pattern == "cpp" %}
	python -m pip install -U cython ninja pip pybind11[global] scikit-build twine wheel
{%- endif %}
	python -m pip install -e .[develop]
{%- if cookiecutter.pattern in ("js", "jupyter") %}
	cd js; yarn
{%- endif %}

build-py:  ## build the python library
{%- if cookiecutter.pattern in ("js", "jupyter") %}
	python -m build .
{%- else %}
	python setup.py build build_ext --inplace
{%- endif %}

{%- if cookiecutter.pattern in ("js", "jupyter") %}
build-js:  ## build javascript
	cd js; yarn build
{%- endif %}

{%- if cookiecutter.pattern in ("js", "jupyter") %}
build: build-py build-js  ## build the library
{%- else %}
build: build-py  ## build the library
{%- endif %}

install:  ## install library
	python -m pip install .

{%- if cookiecutter.pattern == "jupyter" %}
serverextension: install ## enable the jupyter server extension
	python -m jupyter server extension enable --py {{cookiecutter.module}}

labextension: js ## build and install the labextension
	cd js; python -m jupyter labextension install .
{%- endif %}

#########
# LINTS #
#########
lint-py:  ## run python linter with flake8 and black
	python -m ruff {{cookiecutter.module}} setup.py
	python -m black --check {{cookiecutter.module}} setup.py


{%- if cookiecutter.pattern in ("js", "jupyter") %}
lint-js:  ## run javascript linter with eslint
	cd js; yarn lint
{%- endif %}

{%- if cookiecutter.pattern == "cpp" %}
lint-cpp:  ## run C++ linter with clang-format
	clang-format --dry-run -Werror -i -style=file `find ./cpp/{src,include} -name "*.*pp"`
{%- endif %}

{%- if cookiecutter.pattern in ("js", "jupyter") %}
lint: lint-py lint-js  ## run all lints
{%- elif cookiecutter.pattern == "cpp" %}
# lint: lint-py lint-cpp  ## run all lints
lint: lint-py  ## run all lints
{%- else %}
lint: lint-py  ## run all lints
{%- endif %}

# Alias
lints: lint

fix-py:  ## fix python formatting with black
	python -m ruff {{cookiecutter.module}}/ setup.py --fix
	python -m black {{cookiecutter.module}}/ setup.py

{%- if cookiecutter.pattern in ("js", "jupyter") %}
fix-js:  ## fix javascript formatting with eslint
	cd js; yarn fix
{%- endif %}

{%- if cookiecutter.pattern == "cpp" %}
fix-cpp:  ## fix C++ formatting with clang-format
	clang-format -i -style=file `find ./cpp/{src,include} -name "*.*pp"`
{%- endif %}

{%- if cookiecutter.pattern in ("js", "jupyter") %}
fix: fix-py fix-js  ## run all autofixers
{%- elif cookiecutter.pattern == "cpp" %}
fix: fix-py fix-cpp  ## run all autofixers
{%- else %}
fix: fix-py  ## run all autofixers
{%- endif %}

# alias
format: fix

################
# Other Checks #
################
check-manifest:  ## check python sdist manifest with check-manifest
	check-manifest -v

semgrep:  ## check for possible errors with semgrep
	semgrep ci --config auto

checks: check-manifest semgrep

# Alias
check: checks

annotate:  ## run python type annotation checks with mypy
	python -m mypy ./{{cookiecutter.module}}

semgrep: 

#########
# TESTS #
#########
test-py:  ## run python tests
	python -m pytest -v {{cookiecutter.module}}/tests --junitxml=junit.xml

{%- if cookiecutter.pattern in ("js", "jupyter") %}
test-js: ## run javascript tests
	cd js; yarn test
{%- endif %}

coverage-py:  ## run tests and collect test coverage
	python -m pytest -v {{cookiecutter.module}}/tests --junitxml=junit.xml --cov={{cookiecutter.module}} --cov-report=xml:.coverage/coverage.xml --cov-branch --cov-fail-under=80 --cov-report term-missing

{%- if cookiecutter.pattern in ("js", "jupyter") %}
test: test-py test-js ## run all tests
coverage: coverage-py test-js  ## run all tests with coverage collection
{%- else %}
test: test-py  ## run all tests
coverage: coverage-py  ## run all tests with coverage collection
{%- endif %}

# Alias
tests: test

########
# DOCS #
########
docs:  ## build html documentation
	make -C ./docs html

show-docs:  ## show docs with running webserver
	cd ./docs/_build/html/ && PYTHONBUFFERED=1 python -m http.server | sec -u "s/0\.0\.0\.0/$$(hostname)/g"

###########
# VERSION #
###########
show-version:  ## show current library version
	bump2version --dry-run --allow-dirty setup.py --list | grep current | awk -F= '{print $2}'

patch:  ## bump a patch version
	bump2version patch

minor:  ## bump a minor version
	bump2version minor

major:  ## bump a major version
	bump2version major

########
# DIST #
########
{%- if cookiecutter.pattern == "cpp" %}
dist-py: dist-py-sdist  # build python dist
dist-py-sdist:  ## build python sdist
	python setup.py sdist

dist-py-local-wheel:  ## build python wheel
	python setup.py bdist_wheel

{%- else %}
dist-py:  # build python dists
	python setup.py sdist bdist_wheel
{%- endif %}

dist-check:  ## run python dist checker with twine
	python -m twine check dist/*

{%- if cookiecutter.pattern == "js" %}
dist: clean build js dist-py dist-check  ## build all distts
{%- else %}
dist: clean build dist-py dist-check  ## build all dists
{%- endif %}

publish-py:  # publish python assets
	python -m twine upload dist/* --skip-existing

{%- if cookiecutter.pattern in ("js", "jupyter") %}
publish-js:  ## pulbish javascript assets
	cd js; npm publish || echo "can't publish - might already exist"
{%- endif %}

{%- if cookiecutter.pattern in ("js", "jupyter") %}
publish: dist publish-py publish-js  ## publish dists
{%- else %}
publish: dist publish-py  ## publish all dists
{%- endif %}

#########
# CLEAN #
#########
deep-clean: ## clean everything from the repository
	git clean -fdx

clean: ## clean the repository
	rm -rf .coverage coverage cover htmlcov logs build dist *.egg-info
{%- if cookiecutter.pattern == "js" %}
	rm -rf js/lib js/dist
{%- elif cookiecutter.pattern == "jupyter" %}
	rm -rf js/lib js/dist {{cookiecutter.module}}/labextension {{cookiecutter.module}}/nbextension
{%- elif cookiecutter.pattern == "cpp" %}
	rm -rf {{cookiecutter.module}}/lib {{cookiecutter.module}}/bin {{cookiecutter.module}}/include {{cookiecutter.module}}/*.so {{cookiecutter.module}}/*.dll {{cookiecutter.module}}/*.dylib _skbuild
{%- elif cookiecutter.pattern == "rust" %}
{%- endif %}

############################################################################################

# Thanks to Francoise at marmelab.com for this
.DEFAULT_GOAL := help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

print-%:
	@echo '$*=$($*)'

.PHONY: develop build-py build-js build build install serverextension labextension lint-py lint-js lint-cpp lint lints fix-py fix-js fix-cpp fix format check-manifest checks check annotate semgrep test-py test-js coverage-py test tests docs show-docs show-version patch minor major dist-py dist-py-sdist dist-py-local-wheel dist-check dist publish-py publish-js publish deep-clean clean help 
