<p align="center">
  <img src="https://root-projects.s3.us-east-1.amazonaws.com/Tiquirentlogo-01.png" width="500" alt="Tiquirent" />
</p>

Description will be added soon...

## Authors

Warren González Reyes
- [@warrgonz](https://github.com/Warrgonz)

Alejandro Castro García
- [@acastrog38](https://github.com/acastrog38)

Yuliana Fallas Aguilar
- [@Yulianaaf](https://github.com/acastrog38)

Rebeca Hurtado Araya
- [@rhurtado29](https://github.com/acastrog38)

## Table of Contents
- [Setup](#setup)
  - [Creating a Virtual Environment](#creating-a-virtual-environment)
  - [Installing Requirements](#installing-requirements)
  - [Running Requirements](#running-requirements)
- [Features](#features)
- [Support](#support)

## Setup

### Creating a Virtual Environment

To create a virtual environment in Python, follow these steps:

1. Open your terminal (or command prompt).
2. Navigate to your project directory.

> [!IMPORTANT]
> You must have to install Python in your computer and be sure that you added Python to PATH. You can check if you have Python and Pip using the following command in your terminal (PowerShell, Git Bash, etc.)

```sh
python3 --version
pip --version
```

3. Run the following command to create a virtual environment:

Install virtualenv

```sh
pip install virtualenv
```

Create the virtual environment

```sh
virtualenv -p python3 env
```

Activate the virtual environment

- Git Bash

```sh
source env/Scripts/activate
```

- Powershell

```sh
    .\env\Scripts\Activate
```

### Installing Requirements

After activating your virtual environment, you need to install the necessary packages. Make sure you have a `requirements.txt` file in your project directory. Run the following command:

```sh
pip install -r requirements.txt
```
> [!NOTE]
> To manage dependencies, you can use the following prompts

- Install the package and update requirements.txt, change `<Monofino>` to the package required instead.

```sh
pip install <Monofino> && pip freeze > requirements.txt
```
- Verify that the package is installed

```sh
pip show <Monofino>
```

- Uninstall the package (If required)

```sh
pip uninstall <Monofino>
```

- Update requirements.txt

```sh
pip freeze > requirements.txt
```

### Running project

To server start, you can use `flask run --debug` in your terminal where the proyect will initialize in your localhost.

## Features

This item will be added soon...

## Support

For support, you can contact us to `wgonzalez90631@ufide.ac.cr`, `acastro40720@ufide.ac.cr`, `yaguilar40766@ufide.ac.cr`, `rhurtado50476@ufide.ac.cr`.
