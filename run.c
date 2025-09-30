#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <signal.h>
#include <sys/types.h>
#include <sys/wait.h>

pid_t pid1 = -1, pid2 = -1, chrome_pid = -1;

void handle_sigint(int sig)
{
    printf("\nCaught SIGINT, killing children...\n");
    if (pid1 > 0)
        kill(-pid1, SIGKILL); // kill process group of child1
    if (pid2 > 0)
        kill(-pid2, SIGKILL); // kill process group of child2
    if (chrome_pid > 0)
        kill(chrome_pid, SIGKILL); // kill Chrome if we launched it
    exit(0);
}

int main()
{
    signal(SIGINT, handle_sigint); // set up Ctrl+C handler

    // First child: ng serve
    pid1 = fork();
    if (pid1 == 0)
    {
        setpgid(0, 0); // put child in its own process group
        if (chdir("jobeazy") != 0)
        {
            perror("Failed to change to jobeazy directory");
            exit(1);
        }

        // Fork Chrome opener
        chrome_pid = fork();
        if (chrome_pid == 0)
        {
            sleep(10); // wait a bit for ng serve to start
            execlp("open", "open", "-a", "Google Chrome", "http://localhost:4200", NULL);
            perror("Failed to open Chrome");
            exit(1);
        }

        execlp("ng", "ng", "serve", NULL);
        perror("Failed to run ng serve");
        exit(1);
    }

    // Second child: npm run dev
    pid2 = fork();
    if (pid2 == 0)
    {
        setpgid(0, 0); // separate process group
        if (chdir("backend") != 0)
        {
            perror("Failed to change to backend directory");
            exit(1);
        }

        execlp("npm", "npm", "run", "dev", NULL);
        perror("Failed to run npm run dev");
        exit(1);
    }

    // Parent waits
    waitpid(pid1, NULL, 0);
    waitpid(pid2, NULL, 0);

    return 0;
}