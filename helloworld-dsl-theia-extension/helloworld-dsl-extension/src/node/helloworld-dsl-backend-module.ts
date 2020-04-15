import { ContainerModule } from "inversify";
import { LanguageServerContribution } from "@theia/languages/lib/node";
import { HelloWorldLanguageServerContribution } from "./helloworld-dsl-language-server-contribution";

export default new ContainerModule(bind => {
  bind(LanguageServerContribution)
    .to(HelloWorldLanguageServerContribution)
    .inSingletonScope();
});
