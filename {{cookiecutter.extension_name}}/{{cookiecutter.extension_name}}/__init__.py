from ._version import __version__


def _jupyter_server_extension_paths():
    return [{"module": "jupyterlab_commands.extension"}]
