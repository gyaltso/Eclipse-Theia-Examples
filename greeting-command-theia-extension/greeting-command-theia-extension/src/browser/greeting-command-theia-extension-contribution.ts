import { injectable, inject } from "inversify";
import {
  CommandContribution,
  CommandRegistry,
  MenuContribution,
  MenuModelRegistry,
  MessageService,
} from "@theia/core/lib/common";
import { CommonMenus } from "@theia/core/lib/browser";

export const SayHelloCommand = {
  id: "sayhello.command",
  label: "Hello",
};

export const SayGoodByeCommand = {
  id: "saygoodbye.command",
  label: "Goodbye",
};

@injectable()
export class SayHelloCommandContribution implements CommandContribution {
  constructor(
    @inject(MessageService) private readonly messageService: MessageService
  ) {}

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(SayHelloCommand, {
      execute: () => this.messageService.info("Hello!"),
    });
  }
}

@injectable()
export class SayGoodByeCommandContribution implements CommandContribution {
  constructor(
    @inject(MessageService) private readonly messageService: MessageService
  ) {}

  registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(SayGoodByeCommand, {
      execute: () => this.messageService.info("Goodbye!"),
    });
  }
}

@injectable()
export class GreetingCommandMenuContribution implements MenuContribution {
  registerMenus(menus: MenuModelRegistry): void {
    menus.registerMenuAction(CommonMenus.EDIT_FIND, {
      commandId: SayHelloCommand.id,
      label: SayHelloCommand.label,
    });

    menus.registerMenuAction(CommonMenus.EDIT_FIND, {
      commandId: SayGoodByeCommand.id,
      label: SayGoodByeCommand.label,
    });
  }
}
