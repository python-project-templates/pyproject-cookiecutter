# Contributing

If you want to contribute to this repository here are some helpful guidelines.

## Reporting bugs, feature requests, etc.

To report bugs, request new features or similar, please open an issue on the Github
repository.

A good bug report includes:

- Expected behavior
- Actual behavior
- Steps to reproduce (preferably as minimal as possible)
- Possibly any output from the browser console (typically available via Ctrl + Shift + J or via F12).

## Minor changes, typos etc.

Minor changes can be contributed by navigating to the relevant files on the Github repository,
and clicking the "edit file" icon. By following the instructions on the page you should be able to
create a pull-request proposing your changes. A repository maintainer will then review your changes,
and either merge them, propose some modifications to your changes, or reject them (with a reason for
the rejection).

## Setting up a development environment

If you want to help resolve an issue by making some changes that are larger than that covered by the above paragraph, it is recommended that you:

- Fork the repository on Github
- Clone your fork to your computer
- Run the following commands inside the cloned repository:
  - `pip install -e .[dev]` - This will install the Python package in development
    mode.
  - `jupyter labextension install .` - This will add the lab extension in development
    mode.
  - `jupyter serverextension enable --py {{cookiecutter.extension_name}}` - This will enable the server extension.
- Validate the install by running the tests:
  - `py.test` - This command will run the Python tests.
  - `npm test` - This command will run the JS tests.

Once you have such a development setup, you should:

- Make the changes you consider necessary
- Run the tests to ensure that your changes does not break anything
- If you add new code, preferably write one or more tests for checking that your code works as expected.
- Commit your changes and publish the branch to your github repo.
- Open a pull-request (PR) back to the main repo on Github.

# Releasing

To make a new release of jupyterlab_celltests:

1. `bumpversion patch` (replacing `patch` with whatever is appropriate for the current release, e.g. `minor`, `major`, etc) - This will also create a git commit and tag.
2. `git push --follow-tags` - This will trigger python and npm package builds on azure, and upload to [our azure feed](https://dev.azure.com/tpaine154/jupyter/_packaging?_a=feed&feed=python-packages).
3. Check the resulting packages:
  - Install and test in a clean environment:
    - You can install for python with `pip install --index-url=https://pkgs.dev.azure.com/tpaine154/jupyter/_packaging/python-packages/pypi/simple/ jupyterlab_celltests --extra-index-url=https://pypi.org/simple`, modifying as appropriate to use the wheel or the sdist.
    - TODO npm
  - Inspect the sdist, wheel, and npm tgz to make sure they contain the right files, version numbers, etc.
4. Once satisfied, `bumpversion release` until "final", and then grab the resulting release from azure and upload to pypi and npm.

