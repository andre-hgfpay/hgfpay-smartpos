import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
	const options = new DocumentBuilder()
		.setTitle('HGFPAY-Api Local')
		.setDescription('Aplicação SmartPOS Hgfpay')
		.setVersion('1.0')
		.setContact('André Soares', 'https://hgfpay.com.br/', 'andre.luis@hgfpay.com.br')
		.addBearerAuth()
		.build();

	const custom: SwaggerCustomOptions = {
		customSiteTitle: 'HGFPAY-Api Local',
		customfavIcon: 'https://hgfpay.com.br/favicon.ico'
	};

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('/api-docs', app, document, custom);
}