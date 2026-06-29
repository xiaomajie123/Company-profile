package com.vectorcat.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI vectorCatOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("矢量猫科技 API")
                        .version("1.0.0")
                        .description("矢量猫科技后端接口文档"));
    }
}
