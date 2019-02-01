
# LearnOpenGL
This is a Visual Studio solution for https://learnopengl.com/ exercises.

The exercises are implemented as individual VS projects within the solution.

Some of the implementations closely follow the site's example code, while others make more dramatic changes.

Implementation details are outlined in the repo's wiki:

[LearnOpenGL wiki](https://github.com/JayDee-github/LearnOpenGL/wiki)

## Getting started

### Requirements
* Windows 10
* OpenGL 3.3 compatible system
* Visual Studio 2017

  (Other versions of VS may work but have not been tested)

### Installation
1. Clone the repo
2. Open the Visual Studio solution file:

    `/LearnOpenGL/opengl-template.sln`

## Solution overview
The solution is organized in the following structure:

`Solution -> Topic folder -> Implementation project`

![Solution Explorer](https://github.com/JayDee-github/LearnOpenGL/wiki/images/readme/solution_explorer.jpg)

The topic folders correspond to respective chapters on the LearnOpenGL site.

The projects implement and expand on the example code from each chapter.

## Running implementations
Before running an implementation, you must set its VS Project as the solution's **StartUp Project**:
1. Open the **Solution Explorer tab**.
2. Navigate to and **left-click** (select) the **Project** you wish to run.
3. **Right-click** on the Project name to open the options pop-up.
4. **Left-click** the **Set as Startup Project** option.

![Startup Project](https://github.com/JayDee-github/LearnOpenGL/wiki/images/readme/startup_project.JPG)

The Project you wish to run is now set as the solution's Startup Project.
* Press **F5** to run the implementation.

## Interfacing with the implementations

### Exiting
Press the **ESC** key to exit the implementation.

### Movement
The movement key-bindings follow an FPS-style scheme:
* **W** move forward
* **S** move back
* **A** move left
* **D** move right
* **Mouse-movement** look around the world.

### Graphical manipulations
The numeric keys **0-9** are used to toggle implementation specific graphical functions.

Visit the project's related wiki page for supported binding details:

[LearnOpenGL wiki](https://github.com/JayDee-github/LearnOpenGL.wiki)
