import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cluster from 'cluster';
import * as os from 'os';

async function bootstrap(){
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true,transform:true }));
  const configService = app.get(ConfigService);
  const port=parseInt(configService.get('PORT'))
  if(process.env.MULTI_MODE){
     await createMultipleInstances(app,port);
  }else{
     await startNestServer(port,app);
  }
}
async function startNestServer (port,app) {
  await app.listen(port);
}
async function createMultipleInstances(app,port) {
  const numCPUs = os.cpus().length;
  if ((cluster as any).isMaster) {
    // Fork workers
    for (let i = 0; i < numCPUs - 1; i++) {
      (cluster as any).fork();
    }
  } else {
    const worker=(cluster as any).worker.id;
    port+= worker
    await app.listen(port,() => {
      console.log(`Worker ${worker} listening on port ${port}`);
    }); // Port is incremented based on worker ID
  }
}

bootstrap();
