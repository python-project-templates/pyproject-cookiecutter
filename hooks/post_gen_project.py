import os
import os.path
import shutil


if __name__ == "__main__":
    if not {{cookiecutter.pattern == "cpp"}}:
        shutil.rmtree("cpp")
        os.remove(".clang-format")
        os.remove("CmakeLists.txt")
        os.remove("{{cookiecutter.module}}/CmakeLists.txt")
        os.remove("{{cookiecutter.module}}/_cyextension.pyx")

    if not {{cookiecutter.pattern in ("jupyter", "js") }}:
        shutil.rmtree("js")
        shutil.rmtree(".vscode")
    else:
        shutil.rmtree("js/src")
        shutil.rmtree("js/tests")

        if {{cookiecutter.pattern == "jupyter"}}:
            shutil.rmtree("js/src-js")
            shutil.move("js/src-jupyter", "js/src")
            shutil.move("js/tests-jupyter", "js/tests")
        else:
            shutil.rmtree("js/src-jupyter")
            shutil.rmtree("js/tests-jupyter")
            shutil.move("js/src-js", "js/src")

    if not {{cookiecutter.pattern == "js" }}:
        shutil.rmtree("{{cookiecutter.module}}/server")

    if not {{cookiecutter.pattern == "jupyter" }}:
        shutil.rmtree("{{cookiecutter.module}}/nbextension")
        shutil.rmtree("{{cookiecutter.module}}/extension")
        shutil.rmtree("binder")

    if not {{cookiecutter.pattern == "rust" }}:
        shutil.rmtree("rust")
        os.remove("Cargo.toml")
