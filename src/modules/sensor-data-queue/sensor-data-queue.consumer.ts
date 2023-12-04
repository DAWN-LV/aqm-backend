import { InjectQueue, OnGlobalQueueCompleted, OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import { AddSensorDataQueueDto } from "./dto/add-sensor-data-queue.dto";
import { InfluxdbService } from "../influxdb/influxdb.service";

@Processor('SENSOR_DATA_QUEUE')
export class SensorDataQueueConsumer {
  constructor(
    @InjectQueue('SENSOR_DATA_QUEUE') private readonly sensorDataQueue: Queue,
    private readonly influxdbService: InfluxdbService
  ) {}
  
  @Process()
  async processSensorData(job: Job<AddSensorDataQueueDto>) {
    // console.log('processSensorData job: ', JSON.stringify(job.data, undefined, 2))
    // job.data 

    // console.log('processSensorData: ', JSON.stringify(job.data, undefined, 4))

    // const points: Array<Point> = []

    // Object.values(job.data.body).forEach(sensor => {
    //   sensor.data.forEach(measurement => {
    //     const point = new Point("test_measure_69")
    //       .tag("mac", job.data.mac)
    //       .tag("type", sensor.type)
    //       // .stringField("ip", job.data.ip)
    //       .intField("value", measurement.value)
    //       .timestamp(measurement.ts)
        
    //     points.push(point)
    //   })
    // })

    console.log("points length = ", points.length)
    // console.log("points = ", points)

    // points.forEach(el => {
    //   console.log(el.toString())
    // })

    await this.influxdbService.write(points)

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
