# Automating Source Code Editing with AI

## Introduction

The core of this repository is not a Rails application, but rather the configuration files for GitHub Actions and Issues.

In recent years, the advancement of AI has led to its increased utilization in various fields. In the world of programming, there are expectations that AI can be used to improve the efficiency and automation of coding. This article introduces an experiment that tackles the automation of source code editing using GitHub Actions and Gemini 1.5 Pro.

## Purpose of the Experiment

The purpose of this experiment is to verify the ability of Gemini 1.5 Pro, with its approximately 1,000,000-token context window, to edit source code while holding the entire source code in context. Through this, we explore the possibility of automating source code editing using AI.

## Experimental Method

The experiment was conducted using the following steps:

1. Prepare GitHub Actions configuration files and Issues
2. Extract the title and body of the Issue
3. Embed all files in the repository into the prompt in CSV text format
4. Send to Gemini API and wait for a response
5. Add the obtained information to the Issue
6. Use Cursor to have AI edit the code

ACTION CODE: https://github.com/laiso/github-issue-bot-google-gemini-api/blob/main/.github/workflows/main.yml and https://github.com/laiso/github-issue-bot-google-gemini-api/tree/main/.github/scripts

ISSUES: https://github.com/laiso/github-issue-bot-google-gemini-api/issues?q=is%3Aissue

## Experimental Results

Initially, the goal was to have the BOT receive patch files via Function Calling and automatically open pull requests. However, we were unable to generate patch files that could be applied correctly.

At this point, it can be said that the complete automation of source code editing using AI is difficult. However, partial automation, such as AI-based source code analysis and editing suggestions, is considered possible.

## Future Prospects

Although complete automation was not achieved in this experiment, we were able to demonstrate the possibility of AI-assisted source code editing. In the future, by working on the following points, the development of more practical systems is expected:

- Improving the accuracy of AI-based source code analysis
- Establishing appropriate patch file generation methods
- Gradual code editing through user interaction

## Conclusion

The automation of source code editing using AI is still a developing field, but it holds great potential. By utilizing the knowledge gained through this experiment, we would like to work on developing more advanced and practical systems.

If you are interested in the experiment introduced in this article or have ideas for solving this problem, please feel free to contact us. Let's work together to pioneer the future of AI-assisted software development.
