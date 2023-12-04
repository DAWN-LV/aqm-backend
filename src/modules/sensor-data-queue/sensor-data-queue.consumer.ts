import { IPoint } from "influx";
import { Job, Queue } from "bull";
import {
  InjectQueue, 
  OnGlobalQueueCompleted, 
  OnGlobalQueueDrained, 
  OnQueueActive, 
  OnQueueCleaned, 
  OnQueueError, 
  OnQueueFailed, 
  OnQueuePaused, 
  OnQueueResumed, 
  OnQueueStalled, 
  OnQueueWaiting, 
  Process, 
  Processor
} from "@nestjs/bull";

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

  @OnQueueWaiting()
  onWaiting(jobId: number | string) {
    console.log(`Job with id=${jobId} is waiting`)
  }

  @OnQueueError()
  onError(err: Error) {
    console.log('Error in queue: err = ', err)
  }

  @OnQueueStalled()
  onStalled(job: Job) {
    console.log(`Job has been marked as stalled: job = `, job)
  }

  @OnQueueFailed()
  onfailed(job: Job, err: Error) {
    console.log(`Job with id=${job.id} has been failed with reason err = `, err)
  }

  @OnQueuePaused()
  onPaused() {
    console.warn("The queue has been paused")
  }

  @OnQueueResumed()
  onResumed(job: Job) {
    console.log("The queue has been resumed")
  }

  @OnQueueCleaned()
  onCleaned(jobs: Job[], type: string) {
    console.log(`Old jobs have been cleaned from the queue: type=${type} jobs=${jobs.map(j => j.id)}`)
  }

  @OnGlobalQueueDrained()
  onGlobalDrained() {
    console.log(`The queue has processed all the waiting jobs`)
  }

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: unknown) {
    console.log('(Global) on completed: job ', jobId, ' -> result: ', result);
  }
}
