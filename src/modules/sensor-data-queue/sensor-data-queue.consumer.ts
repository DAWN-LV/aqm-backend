import { InjectQueue, OnGlobalQueueCompleted, OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import { AddSensorDataQueueDto } from "./dto/add-sensor-data-queue.dto";

@Processor('SENSOR_DATA_QUEUE')
export class SensorDataQueueConsumer {
  constructor(@InjectQueue('SENSOR_DATA_QUEUE') private readonly sensorDataQueue: Queue) {}
  
  @Process()
  processSensorData(job: Job<AddSensorDataQueueDto>) {
    // console.log('processSensorData job: ', JSON.stringify(job.data, undefined, 2))
    // job.data 

    console.log('processSensorData')

    return true
  }

  @OnQueueActive()
  onActive(job: Job<AddSensorDataQueueDto>) {
    console.log(
      `Processing... job ${job.id} of type ${job.name} with mac=${job.data.mac}`,
    );
  }

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: unknown) {
    const job = await this.sensorDataQueue.getJob(jobId);
    console.log('(Global) on completed: job ', job.id, ' -> result: ', result);
  }
}
