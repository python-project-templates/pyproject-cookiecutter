run:  ## clean and make target, run target
	python3.7 -m {{ cookiecutter.extension_name }}

build:  ## Build the repository
	python3.7 setup.py build 

testjs: ## Clean and Make js tests
	cd js; yarn test

testpy: ## Clean and Make unit tests
	python3.7 -m pytest -v {{ cookiecutter.extension_name }}/tests --cov={{ cookiecutter.extension_name }} --junitxml=python_junit.xml --cov-report=xml --cov-branch

tests: lint ## run the tests
	python3.7 -m pytest -v {{ cookiecutter.extension_name }}/tests --cov={{ cookiecutter.extension_name }} --junitxml=python_junit.xml --cov-report=xml --cov-branch
	cd js; yarn test

lint: ## run linter
	pylint {{ cookiecutter.extension_name }} || echo
	flake8 {{ cookiecutter.extension_name }}

annotate: ## MyPy type annotation check
	mypy -s {{ cookiecutter.extension_name }}

annotate_l: ## MyPy type annotation check - count only
	mypy -s {{ cookiecutter.extension_name }} | wc -l 

clean: ## clean the repository
	find . -name "__pycache__" | xargs  rm -rf 
	find . -name "*.pyc" | xargs rm -rf 
	find . -name ".ipynb_checkpoints" | xargs  rm -rf 
	rm -rf .coverage coverage cover htmlcov logs build dist *.egg-info lib node_modules
	make -C ./docs clean

labextension: install ## enable labextension
	cd js; jupyter labextension install .

install:  ## install to site-packages
	pip3 install .

serverextension: install ## enable serverextension
	jupyter serverextension enable --py {{cookiecutter.extension_name}}

js:  ## build javascript
	cd js; yarn
	cd js; yarn build

docs:  ## make documentation
	make -C ./docs html
	open ./docs/_build/html/index.html

dist: js  ## create dists
	rm -rf dist build
	python3.7 setup.py sdist bdist_wheel

publish: dist  ## dist to pypi and npm
	twine check dist/* && twine upload dist/*
	cd js; npm publish

# Thanks to Francoise at marmelab.com for this
.DEFAULT_GOAL := help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

print-%:
	@echo '$*=$($*)'

.PHONY: clean build run test tests help annotate annotate_l docs dist install serverextension labextension 
