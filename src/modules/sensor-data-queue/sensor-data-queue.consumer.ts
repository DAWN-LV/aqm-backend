import { InjectQueue, OnGlobalQueueCompleted, OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import { AddSensorDataQueueDto } from "./dto/add-sensor-data-queue.dto";
import { InfluxdbService } from "../influxdb/influxdb.service";
import { IPoint } from "influx";

@Processor('SENSOR_DATA_QUEUE')
export class SensorDataQueueConsumer {
  constructor(
    @InjectQueue('SENSOR_DATA_QUEUE') private readonly sensorDataQueue: Queue,
    private readonly influxdbService: InfluxdbService
  ) {}
  
  @Process()
  async processSensorData(job: Job<AddSensorDataQueueDto>) {
    const points: Array<IPoint> = []

    Object.values(job.data.body).forEach(sensor => {
      sensor.data.forEach(measurement => {
        const point: IPoint = {
          measurement: sensor.type,
          tags: {
            mac: job.data.mac
          },
          fields: {
            value: measurement.value
          },
          timestamp: measurement.ts
        }
        
        points.push(point)
      })
    })

    try {
      await this.influxdbService.write(points, { precision: "s" })
    } catch (err) {
      console.log("Error during influxdbService.write err = ", err)

      throw err
    }

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
