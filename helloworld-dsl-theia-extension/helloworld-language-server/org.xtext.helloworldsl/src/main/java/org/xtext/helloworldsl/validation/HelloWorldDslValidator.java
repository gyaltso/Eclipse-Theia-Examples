/*
 * Copyright (C) 2020 Gyaltso Technologies (https://gyaltso.com) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 * 
 * SPDX-License-Identifier: EPL-2.0
 */
package org.xtext.helloworldsl.validation;

import org.eclipse.xtext.validation.Check;
import org.xtext.helloworldsl.helloWorldDsl.Greeting;
import org.xtext.helloworldsl.helloWorldDsl.HelloWorldDslPackage;

/**
 * This class contains custom validation rules. 
 *
 * See https://www.eclipse.org/Xtext/documentation/303_runtime_concepts.html#validation
 */
public class HelloWorldDslValidator extends AbstractHelloWorldDslValidator {
	
	public static final String INVALID_NAME = "invalidName";

	@Check
	public void checkGreetingStartsWithCapital(Greeting greeting) {
		if (!Character.isUpperCase(greeting.getName().charAt(0))) {
			warning("Name should start with a capital",
					HelloWorldDslPackage.Literals.GREETING__NAME,
					INVALID_NAME);
		}
	}
	
}
