import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './typeorm.config';
import { BoardRepository } from './app.repository';

@Module({
  imports: [TypeOrmModule.forRoot(TypeormConfig)],
  controllers: [AppController],
  providers: [AppService, BoardRepository],
})
export class AppModule {}
