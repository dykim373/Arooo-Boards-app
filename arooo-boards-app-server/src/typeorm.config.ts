import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const TypeormConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 13306,
    username: 'root',
    password: 'password',
    database: 'mysql',
    entities: [__dirname + '/**/*.entity.{js,ts}'],
    synchronize: true,
};