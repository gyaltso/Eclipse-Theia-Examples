import { injectable } from "inversify";

import {
  LanguageGrammarDefinitionContribution,
  TextmateRegistry
} from "@theia/monaco/lib/browser/textmate";

import {
  HELLOWORLD_LANGUAGE_FILE_EXTENSION,
  HELLOWORLD_LANGUAGE_SERVER_ID,
  HELLOWORLD_LANGUAGE_SERVER_NAME
} from "../common";

@injectable()
export class HelloWorldDslGrammarContribution
  implements LanguageGrammarDefinitionContribution {
  registerTextmateLanguage(registry: TextmateRegistry) {
    monaco.languages.register({
      id: HELLOWORLD_LANGUAGE_SERVER_ID,
      aliases: [HELLOWORLD_LANGUAGE_SERVER_NAME, HELLOWORLD_LANGUAGE_SERVER_ID],
      extensions: [HELLOWORLD_LANGUAGE_FILE_EXTENSION],
      mimetypes: ["text/hw"]
    });

    monaco.languages.setLanguageConfiguration(
      HELLOWORLD_LANGUAGE_SERVER_ID,
      this.configuration
    );

    const helloworldGrammar = require("../../data/helloworld.tmLanguage.json");
    registry.registerTextmateGrammarScope("source.hw", {
      async getGrammarDefinition() {
        return {
          format: "json",
          content: helloworldGrammar
        };
      }
    });
    registry.mapLanguageIdToTextmateGrammar(
      HELLOWORLD_LANGUAGE_SERVER_ID,
      "source.hw"
    );
  }

  protected configuration: monaco.languages.LanguageConfiguration = {
    comments: {
      lineComment: "//",
      blockComment: ["/*", "*/"]
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"]
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "'", close: "'", notIn: ["string", "comment"] },
      { open: '"', close: '"', notIn: ["string"] },
      { open: "/**", close: " */", notIn: ["string"] }
    ],
    surroundingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" },
      { open: "'", close: "'" },
      { open: '"', close: '"' },
      { open: "`", close: "`" }
    ],
    folding: {
      markers: {
        start: new RegExp("^\\s*//\\s*#?region\\b"),
        end: new RegExp("^\\s*//\\s*#?endregion\\b")
      }
    }
  };
}
