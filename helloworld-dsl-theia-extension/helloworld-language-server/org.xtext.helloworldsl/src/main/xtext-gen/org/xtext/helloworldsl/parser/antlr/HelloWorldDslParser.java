/*
 * Copyright (C) 2020 Gyaltso Technologies (https://gyaltso.com) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 * 
 * SPDX-License-Identifier: EPL-2.0
 */
package org.xtext.helloworldsl.parser.antlr;

import com.google.inject.Inject;
import org.eclipse.xtext.parser.antlr.AbstractAntlrParser;
import org.eclipse.xtext.parser.antlr.XtextTokenStream;
import org.xtext.helloworldsl.parser.antlr.internal.InternalHelloWorldDslParser;
import org.xtext.helloworldsl.services.HelloWorldDslGrammarAccess;

public class HelloWorldDslParser extends AbstractAntlrParser {

	@Inject
	private HelloWorldDslGrammarAccess grammarAccess;

	@Override
	protected void setInitialHiddenTokens(XtextTokenStream tokenStream) {
		tokenStream.setInitialHiddenTokens("RULE_WS", "RULE_ML_COMMENT", "RULE_SL_COMMENT");
	}
	

	@Override
	protected InternalHelloWorldDslParser createParser(XtextTokenStream stream) {
		return new InternalHelloWorldDslParser(stream, getGrammarAccess());
	}

	@Override 
	protected String getDefaultRuleName() {
		return "Model";
	}

	public HelloWorldDslGrammarAccess getGrammarAccess() {
		return this.grammarAccess;
	}

	public void setGrammarAccess(HelloWorldDslGrammarAccess grammarAccess) {
		this.grammarAccess = grammarAccess;
	}
}
