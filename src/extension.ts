import * as vscode from 'vscode';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {

    let disposable = vscode.commands.registerCommand('gitignore.add', (selectedFile) => {
        let filePath: string = selectedFile.path.substr(vscode.workspace.workspaceFolders!.length + 1, selectedFile.path.length)
        fs.open(vscode.workspace.workspaceFolders![0] + '/.gitignore', 'a', function (err, fd) {
            fs.readFile(vscode.workspace.workspaceFolders![0] + '/.gitignore', 'utf8', function (err, data) {
                if (data.indexOf(filePath) !== -1) return;
                if (err || data.lastIndexOf('\n') !== data.length - 1) filePath = '\n' + filePath;

                let buffer = Buffer.alloc(filePath.length, filePath);
                fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                    if (err) throw 'error writing file: ' + err;
                    fs.close(fd, function () {
                        console.log('file written');
                    })
                });
            });
        });

    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}