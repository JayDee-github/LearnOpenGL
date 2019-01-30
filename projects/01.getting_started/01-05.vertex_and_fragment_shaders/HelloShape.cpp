#include <iostream>

// GLEW
#define GLEW_STATIC
#include <GL/glew.h>

// GLFW
#include <GLFW/glfw3.h>


// Function prototypes
void key_callback(GLFWwindow* window, int key, int scancode, int action, int mode);

// Window dimensions
const GLuint WIDTH = 800, HEIGHT = 600;

// Shaders
const GLchar* vertexShaderSource = "#version 330 core\n"
"layout (location = 0) in vec3 position;\n"
"void main()\n"
"{\n"
"gl_Position = vec4(position.x, position.y, position.z, 1.0);\n"
"}\0";

const GLchar* fragmentShaderSourceOrange = "#version 330 core\n"
"out vec4 color;\n"
"void main()\n"
"{\n"
"color = vec4(1.0f, 0.5f, 0.2f, 1.0f);\n"
"}\n\0";

const GLchar* fragmentShaderSourceRed = "#version 330 core\n"
"out vec4 color;\n"
"void main()\n"
"{\n"
"color = vec4(1.0f, 0.0f, 0.0f, 1.0f);\n"
"}\n\0";

const GLchar* fragmentShaderSourceGreen = "#version 330 core\n"
"out vec4 color;\n"
"void main()\n"
"{\n"
"color = vec4(0.0f, 1.0f, 0.0f, 1.0f);\n"
"}\n\0";

const GLchar* fragmentShaderSourceBlue = "#version 330 core\n"
"out vec4 color;\n"
"void main()\n"
"{\n"
"color = vec4(0.0f, 0.0f, 1.0f, 1.0f);\n"
"}\n\0";

// The MAIN function, from here we start the application and run the game loop
int main()
{
    std::cout << "Starting GLFW context, OpenGL 3.3" << std::endl;
    // Init GLFW
    glfwInit();

    // Set all the required options for GLFW
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);

    // Create a GLFWwindow object that we can use for GLFW's functions
    GLFWwindow* window = glfwCreateWindow(
        WIDTH, HEIGHT, "Multi-Color Star", nullptr, nullptr);
    glfwMakeContextCurrent(window);

    // Set the required callback functions
    glfwSetKeyCallback(window, key_callback);

    // Set this to true so GLEW knows to use a modern approach to retrieving
    // function pointers and extensions
    glewExperimental = GL_TRUE;
    // Initialize GLEW to setup the OpenGL Function pointers
    glewInit();

    // Define the viewport dimensions
    int width, height;
    glfwGetFramebufferSize(window, &width, &height);
    glViewport(0, 0, width, height);


    // Build and compile our shader program
    // Vertex shader
    GLuint vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader, 1, &vertexShaderSource, NULL);
    glCompileShader(vertexShader);
    // Check for compile time errors
    GLint success;
    GLchar infoLog[512];
    glGetShaderiv(vertexShader, GL_COMPILE_STATUS, &success);
    if (!success)
    {
        glGetShaderInfoLog(vertexShader, 512, NULL, infoLog);
        std::cout << "ERROR::SHADER::VERTEX::COMPILATION_FAILED\n" << infoLog << std::endl;
    }

    // Fragment shader
    GLuint fragmentShaderRed = glCreateShader(GL_FRAGMENT_SHADER);
    GLuint fragmentShaderGreen = glCreateShader(GL_FRAGMENT_SHADER);
    GLuint fragmentShaderBlue = glCreateShader(GL_FRAGMENT_SHADER);
    GLuint fragmentShaderOrange = glCreateShader(GL_FRAGMENT_SHADER);

    glShaderSource(fragmentShaderRed, 1, &fragmentShaderSourceRed, NULL);
    glCompileShader(fragmentShaderRed);

    glShaderSource(fragmentShaderGreen, 1, &fragmentShaderSourceGreen, NULL);
    glCompileShader(fragmentShaderGreen);

    glShaderSource(fragmentShaderBlue, 1, &fragmentShaderSourceBlue, NULL);
    glCompileShader(fragmentShaderBlue);

    glShaderSource(fragmentShaderOrange, 1, &fragmentShaderSourceOrange, NULL);
    glCompileShader(fragmentShaderOrange);

    // Link shaders
    GLuint shaderProgramRed = glCreateProgram();
    glAttachShader(shaderProgramRed, vertexShader);
    glAttachShader(shaderProgramRed, fragmentShaderRed);
    glLinkProgram(shaderProgramRed);

    GLuint shaderProgramGreen = glCreateProgram();
    glAttachShader(shaderProgramGreen, vertexShader);
    glAttachShader(shaderProgramGreen, fragmentShaderGreen);
    glLinkProgram(shaderProgramGreen);

    GLuint shaderProgramBlue = glCreateProgram();
    glAttachShader(shaderProgramBlue, vertexShader);
    glAttachShader(shaderProgramBlue, fragmentShaderBlue);
    glLinkProgram(shaderProgramBlue);

    GLuint shaderProgramOrange = glCreateProgram();
    glAttachShader(shaderProgramOrange, vertexShader);
    glAttachShader(shaderProgramOrange, fragmentShaderOrange);
    glLinkProgram(shaderProgramOrange);

    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShaderRed);
    glDeleteShader(fragmentShaderGreen);
    glDeleteShader(fragmentShaderBlue);
    glDeleteShader(fragmentShaderOrange);

    // Set up vertex data (and buffer(s)) and attribute pointers
    GLfloat topRightShape[] = {
        0.0f, 0.0f, 0.0f,
        0.0f, 0.5f, 0.0f,
        0.1f, 0.1f, 0.0f,
        0.5f, 0.0f, 0.0f
    };
    GLuint topRightShapeIndices[] = {
        0, 1, 2,  // First Triangle
        0, 2, 3   // Second Triangle
    };

    GLfloat topLeftShape[] = {
        0.0f, 0.0f, 0.0f,
        0.0f, 0.5f, 0.0f,
        -0.1f, 0.1f, 0.0f,
        -0.5f, 0.0f, 0.0f
    };
    GLuint topLeftShapeIndices[] = {
        0, 1, 2,  // First Triangle
        0, 2, 3   // Second Triangle
    };

    GLfloat bottomRightShape[] = {
        0.0f, 0.0f, 0.0f,
        0.0f, -0.5f, 0.0f,
        0.1f, -0.1f, 0.0f,
        0.5f, 0.0f, 0.0f
    };
    GLuint bottomRightShapeIndices[] = {
        0, 1, 2,  // First Triangle
        0, 2, 3   // Second Triangle
    };

    GLfloat bottomLeftShape[] = {
        0.0f, 0.0f, 0.0f,
        0.0f, -0.5f, 0.0f,
        -0.1f, -0.1f, 0.0f,
        -0.5f, 0.0f, 0.0f
    };
    GLuint bottomLeftShapeIndices[] = {
        0, 1, 2,  // First Triangle
        0, 2, 3   // Second Triangle
    };

    GLuint VBO_array[4], VAO_array[4], EBO_array[4];
    glGenVertexArrays(4, VAO_array);
    glGenBuffers(4, VBO_array);
    glGenBuffers(4, EBO_array);

    //
    // Setup Top Right Shape
    //
    glBindVertexArray(VAO_array[0]);
    glBindBuffer(GL_ARRAY_BUFFER, VBO_array[0]);
    glBufferData(GL_ARRAY_BUFFER, sizeof(topRightShape), topRightShape, GL_STATIC_DRAW);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO_array[0]);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(topRightShapeIndices), topRightShapeIndices, GL_STATIC_DRAW);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(GLfloat), (GLvoid*)0);
    glEnableVertexAttribArray(0);
    glBindBuffer(GL_ARRAY_BUFFER, 0); // Note that this is allowed, the call to glVertexAttribPointer registered VBO as the currently bound vertex buffer object so afterwards we can safely unbind
    glBindVertexArray(0);

    //
    // Setup Top Left Shape
    //
    glBindVertexArray(VAO_array[1]);
    glBindBuffer(GL_ARRAY_BUFFER, VBO_array[1]);
    glBufferData(GL_ARRAY_BUFFER, sizeof(topLeftShape), topLeftShape, GL_STATIC_DRAW);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO_array[1]);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(topLeftShapeIndices), topLeftShapeIndices, GL_STATIC_DRAW);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(GLfloat), (GLvoid*)0);
    glEnableVertexAttribArray(0);
    glBindBuffer(GL_ARRAY_BUFFER, 0); // Note that this is allowed, the call to glVertexAttribPointer registered VBO as the currently bound vertex buffer object so afterwards we can safely unbind
    glBindVertexArray(0);

    //
    // Setup Bottom Right Shape
    //
    glBindVertexArray(VAO_array[2]);
    glBindBuffer(GL_ARRAY_BUFFER, VBO_array[2]);
    glBufferData(GL_ARRAY_BUFFER, sizeof(bottomRightShape), bottomRightShape, GL_STATIC_DRAW);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO_array[2]);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(bottomRightShapeIndices), bottomRightShapeIndices, GL_STATIC_DRAW);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(GLfloat), (GLvoid*)0);
    glEnableVertexAttribArray(0);
    glBindBuffer(GL_ARRAY_BUFFER, 0); // Note that this is allowed, the call to glVertexAttribPointer registered VBO as the currently bound vertex buffer object so afterwards we can safely unbind
    glBindVertexArray(0);

    //
    // Setup Bottom Left Shape
    //
    glBindVertexArray(VAO_array[3]);
    glBindBuffer(GL_ARRAY_BUFFER, VBO_array[3]);
    glBufferData(GL_ARRAY_BUFFER, sizeof(bottomLeftShape), bottomLeftShape, GL_STATIC_DRAW);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO_array[3]);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(bottomLeftShapeIndices), bottomLeftShapeIndices, GL_STATIC_DRAW);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(GLfloat), (GLvoid*)0);
    glEnableVertexAttribArray(0);
    glBindBuffer(GL_ARRAY_BUFFER, 0); // Note that this is allowed, the call to glVertexAttribPointer registered VBO as the currently bound vertex buffer object so afterwards we can safely unbind
    glBindVertexArray(0);


    // Uncommenting this call will result in wireframe polygons.
    //glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);

    // Game loop
    while (!glfwWindowShouldClose(window))
    {
        // Check if any events have been activiated (key pressed, mouse moved etc.) and call corresponding response functions
        glfwPollEvents();

        // Render
        // Clear the colorbuffer
        glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        // Draw Top Right Shape
        glUseProgram(shaderProgramRed);
        glBindVertexArray(VAO_array[0]);
        glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);


        // Draw Top Left Shape
        glUseProgram(shaderProgramGreen);
        glBindVertexArray(VAO_array[1]);
        glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);

        // Draw Bottom Right Shape
        glUseProgram(shaderProgramBlue);
        glBindVertexArray(VAO_array[2]);
        glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);

        // Draw Bottom Left Shape
        glUseProgram(shaderProgramOrange);
        glBindVertexArray(VAO_array[3]);
        glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);

        glBindVertexArray(0);

        // Swap the screen buffers
        glfwSwapBuffers(window);
    }
    // Properly de-allocate all resources once they've outlived their purpose
    glDeleteVertexArrays(4, VAO_array);
    glDeleteBuffers(4, VBO_array);
    glDeleteBuffers(4, EBO_array);
    // Terminate GLFW, clearing any resources allocated by GLFW.
    glfwTerminate();
    return 0;
}

// Is called whenever a key is pressed/released via GLFW
void key_callback(GLFWwindow* window, int key, int scancode, int action, int mode)
{
    if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS)
        glfwSetWindowShouldClose(window, GL_TRUE);
}