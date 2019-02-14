run:  ## clean and make target, run target
	python3 -m {{ cookiecutter.extension_name }}

build:  ## Build the repository
	python3 setup.py build 

testjs: ## Clean and Make js tests
	npm run test

testpy: ## Clean and Make unit tests
	python3 -m pytest -v tests --cov={{ cookiecutter.extension_name }}

test: lint ## run the tests for travis CI
	@ python3 -m pytest -v tests --cov={{ cookiecutter.extension_name }}
	npm install && npm run test

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
	rm -rf .coverage cover htmlcov logs build dist *.egg-info
	make -C ./docs clean

serverextension: install ## enable serverextension
	jupyter serverextension enable --py {{ cookiecutter.extension_name }}

labextension: install ## enable labextension
	jupyter labextension install .

install:  ## install to site-packages
	python3 setup.py install

docs:  ## make documentation
	make -C ./docs html
	open ./docs/_build/html/index.html

dist:  ## dist to pypi
	python3 setup.py sdist upload -r pypi

# Thanks to Francoise at marmelab.com for this
.DEFAULT_GOAL := help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

print-%:
	@echo '$*=$($*)'

.PHONY: clean build run test tests help annotate annotate_l docs dist
