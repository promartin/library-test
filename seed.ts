import { NestFactory } from "@nestjs/core";
import { USERS } from "factory/user.factory";
import { AppModule } from "src/app.module";
import { User } from "src/users/entities/user.entity";
import { DataSource } from "typeorm";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dataSource = app.get(DataSource);
  await dataSource.initialize();

  const userRepository = dataSource.getRepository(User);

  try {
    const existingUsers = await userRepository.find();
    if (existingUsers.length === 0) {
      await userRepository.save(USERS);
      console.log('Users seeded successfully');
    } else {
      console.log('Users already exist, skipping seed');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await dataSource.destroy();
    process.exit();
  }
}

bootstrap();
