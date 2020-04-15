import {
  BaseLanguageServerContribution,
  IConnection
} from "@theia/languages/lib/node";
import { injectable } from "inversify";
import * as net from "net";
import { join, resolve } from "path";
import { createSocketConnection } from "vscode-ws-jsonrpc/lib/server";
import {
  HELLOWORLD_LANGUAGE_SERVER_ID,
  HELLOWORLD_LANGUAGE_SERVER_NAME
} from "../common";

const EXECUTABLE_NAME = "helloworld-language-server.jar";
const EXECUTABLE_PATH = resolve(
  join(__dirname, "..", "..", "build", EXECUTABLE_NAME)
);

@injectable()
export class HelloWorldLanguageServerContribution extends BaseLanguageServerContribution {
  readonly id = HELLOWORLD_LANGUAGE_SERVER_ID;
  readonly name = HELLOWORLD_LANGUAGE_SERVER_NAME;

  getPort(): number | undefined {
    let arg = process.argv.filter(arg => arg.startsWith("--LSP_PORT="))[0];
    if (!arg) {
      return undefined;
    } else {
      return Number.parseInt(arg.substring("--LSP_PORT=".length), 10);
    }
  }

  start(clientConnection: IConnection): void {
    let socketPort = this.getPort();
    if (socketPort) {
      const socket = new net.Socket();
      socket.connect(socketPort);
      const serverConnection = createSocketConnection(socket, socket, () => {
        socket.destroy();
      });
      this.forward(clientConnection, serverConnection);
    } else {
      const command = "java";
      const args: string[] = ["-jar", EXECUTABLE_PATH];
      const serverConnection = this.createProcessStreamConnection(
        command,
        args
      );
      this.forward(clientConnection, serverConnection);
    }
  }
}
