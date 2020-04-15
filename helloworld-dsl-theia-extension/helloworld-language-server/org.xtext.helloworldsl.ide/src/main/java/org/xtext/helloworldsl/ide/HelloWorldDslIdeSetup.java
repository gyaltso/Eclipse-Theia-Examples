/*
 * Copyright (C) 2020 Gyaltso Technologies (https://gyaltso.com) and others.
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 * 
 * SPDX-License-Identifier: EPL-2.0
 */
package org.xtext.helloworldsl.ide;

import com.google.inject.Guice;
import com.google.inject.Injector;
import org.eclipse.xtext.util.Modules2;
import org.xtext.helloworldsl.HelloWorldDslRuntimeModule;
import org.xtext.helloworldsl.HelloWorldDslStandaloneSetup;

/**
 * Initialization support for running Xtext languages as language servers.
 */
public class HelloWorldDslIdeSetup extends HelloWorldDslStandaloneSetup {

	@Override
	public Injector createInjector() {
		return Guice.createInjector(Modules2.mixin(new HelloWorldDslRuntimeModule(), new HelloWorldDslIdeModule()));
	}
	
}
