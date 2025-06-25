import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
    @ApiOperation({ summary: 'Health check endpoint' })
    @ApiResponse({
        status: 200,
        description: 'Service is healthy',
        schema: {
            type: 'object',
            properties: {
                status: { type: 'string', example: 'ok' },
                service: { type: 'string', example: 'user-service' },
                timestamp: { type: 'string', example: '2025-01-15T10:30:00Z' }
            }
        }
    })
    @Get()
    healthCheck() {
        return {
            status: 'ok',
            service: 'user-service',
            timestamp: new Date().toISOString()
        };
    }
} 