python: $(eval SHELL:=/bin/bash)  ## Make example project (python)
	{\
		name="pyproject-cookiecutter-example";\
		description="An example instance of [python-project-templates/pyproject-cookiecutter](https://github.com/python-project-templates/pyproject-cookiecutter), for testing";\
		url="https://github.com/python-project-templates/pyproject-cookiecutter";\
		author="Tim Paine";\
		github_account="python-project-templates";\
		email="t.paine154@gmail.com";\
		pattern="1";\
		configuration="$$name\n$$description\n$$url\n$$author\n$$github_account\n$$email\n$$pattern\n";\
		printf "$$configuration" | cookiecutter . -o .. -f;\
	}

cpp: $(eval SHELL:=/bin/bash)  ## Make example project (c++)
	{\
		name="pyproject-cookiecutter-example";\
		description="An example instance of [python-project-templates/pyproject-cookiecutter](https://github.com/python-project-templates/pyproject-cookiecutter), for testing";\
		url="https://github.com/python-project-templates/pyproject-cookiecutter";\
		author="Tim Paine";\
		github_account="python-project-templates";\
		email="t.paine154@gmail.com";\
		pattern="2";\
		configuration="$$name\n$$description\n$$url\n$$author\n$$github_account\n$$email\n$$pattern\n";\
		printf "$$configuration" | cookiecutter . -o .. -f;\
	}

jupyter: $(eval SHELL:=/bin/bash)  ## Make example project (python + js for jupyter)
	{\
		name="pyproject-cookiecutter-example";\
		description="An example instance of [python-project-templates/pyproject-cookiecutter](https://github.com/python-project-templates/pyproject-cookiecutter), for testing";\
		url="https://github.com/python-project-templates/pyproject-cookiecutter";\
		author="Tim Paine";\
		github_account="python-project-templates";\
		email="t.paine154@gmail.com";\
		pattern="5";\
		configuration="$$name\n$$description\n$$url\n$$author\n$$github_account\n$$email\n$$pattern\n";\
		printf "$$configuration" | cookiecutter . -o .. -f;\
	}

# Thanks to Francoise at marmelab.com for this
.DEFAULT_GOAL := help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

print-%:
	@echo '$*=$($*)'

.PHONY: help test python cpp jupyter
