const fs = require('fs');
const https = require('https');
const { execSync } = require('child_process');

const model = 'gemini-1.5-pro-latest';

function getGitTrackedFiles() {
    const command = 'git ls-files';
    try {
        const stdout = execSync(command);
        return stdout.toString().split(/\r?\n/).filter(line => line);
    } catch (err) {
        console.error(`Error executing git ls-files: ${err}`);
        return [];
    }
}

function getFilesContent() {
    const files = getGitTrackedFiles();
    const filesContent = [];
    files.forEach(file => {
        if (!file.startsWith('.github/')) {
            try {
                const data = fs.readFileSync(file, 'utf8').replace(/"/g, '""'); // Escape double quotes
                filesContent.push(`"${file}","${data}"`); // Format as CSV
            } catch (err) {
                console.error(`Error reading file: ${err}`);
            }
        }
    });
    return filesContent.join('\n');
}

function generateComment(filesContent, issue) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            "contents": [
                {
                    "role": "user",
                    "parts": {
                        "text": `You should propose specific source code changes to resolve the Issue.
                        ISSUE: ${issue} 
                        FILES: ${filesContent}`
                    }
                }
            ]
        });

        const options = {
            hostname: 'generativelanguage.googleapis.com',
            path: `/v1beta/models/${model}:generateContent`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                'x-goog-api-key': process.env.GOOGLE_API_KEY
            }
        };

        const req = https.request(options, (res) => {
            console.log('HTTP Status Code:', res.statusCode);
            let responseBody = '';
            res.on('data', (d) => {
                responseBody += d;
            });
            res.on('end', () => {
                if (res.statusCode >= 400) {
                    console.log('Response Body:', responseBody);
                    reject(new Error('API request failed'));
                } else {
                    const responseJson = JSON.parse(responseBody);
                    const content = responseJson.candidates[0].content.parts[0].text;
                    resolve(content);
                }
            });
        });

        req.on('error', (e) => {
            console.error('Error accessing the website:', e);
            reject(e);
        });

        req.write(data);
        req.end();
    });
}

async function generateCommentForIssue(issue) {
    const filesContent = getFilesContent();

    try {
        const comment = await generateComment(filesContent, issue);
        return comment;
    } catch (error) {
        console.error('Error generating comment:', error);
        return 'Error generating comment';
    }
}

module.exports = generateCommentForIssue;