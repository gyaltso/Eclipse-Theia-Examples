/*
 * Copyright (C) 2020 Gyaltso Technologies (https://gyaltso.com)
 *
 * All rights reserved. This program and the accompanying materials are made available
 * under the terms of the Eclipse Public License v1.0 which accompanies this distribution,
 * and is available at http://www.eclipse.org/legal/epl-v10.html
 */

import { inject, injectable } from "inversify";

import {
  LanguageClientFactory,
  BaseLanguageClientContribution,
  Languages,
  Workspace
} from "@theia/languages/lib/browser";

import {
  HELLOWORLD_LANGUAGE_FILE_EXTENSION,
  HELLOWORLD_LANGUAGE_SERVER_ID,
  HELLOWORLD_LANGUAGE_SERVER_NAME
} from "../common";

@injectable()
export class HelloWorldDslLanguageClientContribution extends BaseLanguageClientContribution {
  readonly id = HELLOWORLD_LANGUAGE_SERVER_ID;
  readonly name = HELLOWORLD_LANGUAGE_SERVER_NAME;

  constructor(
    @inject(Workspace) protected readonly workspace: Workspace,
    @inject(Languages) protected readonly languages: Languages,
    @inject(LanguageClientFactory)
    protected readonly languageClientFactory: LanguageClientFactory
  ) {
    super(workspace, languages, languageClientFactory);
  }

  protected get globPatterns(): string[] {
    return ["**/*" + HELLOWORLD_LANGUAGE_FILE_EXTENSION];
  }

  protected get documentSelector(): string[] {
    return [HELLOWORLD_LANGUAGE_SERVER_ID];
  }
}
