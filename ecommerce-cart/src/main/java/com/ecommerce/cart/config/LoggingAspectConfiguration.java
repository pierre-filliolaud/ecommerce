package com.ecommerce.cart.config;

import com.ecommerce.cart.aop.logging.LoggingAspect;
import org.springframework.context.annotation.*;

@Configuration
@EnableAspectJAutoProxy
public class LoggingAspectConfiguration {

    @Bean
    @Profile(Constants.SPRING_PROFILE_DEVELOPMENT)
    public LoggingAspect loggingAspect() {
        return new LoggingAspect();
    }
}
