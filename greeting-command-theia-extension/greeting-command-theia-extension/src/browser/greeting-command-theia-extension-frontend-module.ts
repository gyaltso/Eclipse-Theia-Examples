/**
 * Generated using theia-extension-generator
 */
import { ContainerModule } from "inversify";
import { CommandContribution, MenuContribution } from "@theia/core/lib/common";

import {
  SayHelloCommandContribution,
  SayGoodByeCommandContribution,
  GreetingCommandMenuContribution,
} from "./greeting-command-theia-extension-contribution";

export default new ContainerModule((bind) => {
  bind(CommandContribution).to(SayHelloCommandContribution);
  bind(CommandContribution).to(SayGoodByeCommandContribution);
  bind(MenuContribution).to(GreetingCommandMenuContribution);
});
