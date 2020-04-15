/**
 * Generated using theia-extension-generator
 */

import { ContainerModule } from "inversify";

import { LanguageClientContribution } from "@theia/languages/lib/browser";
import { LanguageGrammarDefinitionContribution } from "@theia/monaco/lib/browser/textmate";
import { HelloWorldDslGrammarContribution } from "./helloworld-dsl-grammar-contribution";
import { HelloWorldDslLanguageClientContribution } from "./helloworld-dsl-language-client-contribution";

export default new ContainerModule(bind => {
  bind(HelloWorldDslLanguageClientContribution)
    .toSelf()
    .inSingletonScope();
  bind(LanguageClientContribution).toService(
    HelloWorldDslLanguageClientContribution
  );
  bind(LanguageGrammarDefinitionContribution)
    .to(HelloWorldDslGrammarContribution)
    .inSingletonScope();
});
