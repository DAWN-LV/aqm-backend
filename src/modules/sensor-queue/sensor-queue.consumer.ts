import { IPoint } from 'influx'
import { Job, Queue } from 'bull'
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
  Processor,
} from '@nestjs/bull'

import { CreateSensorQueueDTO, SensorDataDTO, SensorMeasurementDTO } from '@/modules/sensor-queue/dto/create-sensor-queue.dto'
import { InfluxdbService } from '@/modules/influxdb/influxdb.service'

@Processor('sensor-queue')
export class SensorDataQueueConsumer {
  constructor(
    @InjectQueue('sensor-queue') private readonly sensorDataQueue: Queue, // ?
    private readonly influxdbService: InfluxdbService,
  ) {}

  @Process()
  async handleJob(job: Job<CreateSensorQueueDTO>) {
    try {
      const points = job.data.body.flatMap(sensor => 
        sensor.data.map(measurement => this.createPoint(sensor, measurement, job.data.mac))
      )

      await this.influxdbService.write(points, { precision: 's' })
    } catch (error) {
      console.log(`Error during influxdbService.write for job ${job.id}:`, error)
      throw error
    }

    return true
  }

  @OnQueueActive()
  onActive(job: Job<CreateSensorQueueDTO>) {
    console.log(`Processing job ${job.id} of type ${ job.name } with mac=${ job.data.mac }`)
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
    console.log(`Job with id=${ job.id } has been failed with reason err = `, err)
  }

  @OnQueuePaused()
  onPaused() {
    console.warn('The queue has been paused')
  }

  @OnQueueResumed()
  onResumed(job: Job) {
    console.log('The queue has been resumed')
  }

  @OnQueueCleaned()
  onCleaned(jobs: Job[], type: string) {
    console.log(`Old jobs have been cleaned from the queue: type=${ type } jobs=${ jobs.map((j) => j.id )}`)
  }

  @OnGlobalQueueDrained()
  onGlobalDrained() {
    console.log(`The queue has processed all the waiting jobs`)
  }

  @OnGlobalQueueCompleted()
  async onGlobalCompleted(jobId: number, result: unknown) {
    console.log('(Global) on completed: job ', jobId, ' -> result: ', result)
  }

  private createPoint(sensor: SensorDataDTO, measurement: SensorMeasurementDTO, mac: string): IPoint {
    return {
      measurement: sensor.type,
      tags: { mac },
      fields: { value: measurement.value },
      timestamp: measurement.ts,
    }
  }
}
