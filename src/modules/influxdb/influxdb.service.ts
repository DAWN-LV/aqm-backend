import { InfluxDB, Point } from '@influxdata/influxdb-client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfluxdbService {
    private client: InfluxDB

    constructor(private readonly configService: ConfigService) {
        this.client = new InfluxDB({
            url: configService.get("db.url"),
            token: configService.get("db.token")
        })
    }

    writeTestData() {
        // console.log('aaaaaaaaaaaaaaaaaaaaa')
        // let org = `test_group`
        // let bucket = `first_bucket`

        // let writeClient = this.client.getWriteApi(org, bucket, 'ns')

        // for (let i = 0; i < 5; i++) {
        //     let point = new Point('measurement1')
        //         .tag('tagname1', 'tagvalue1')
        //         .intField('field1', i)

        //     void setTimeout(() => {
        //         writeClient.writePoint(point)
        //     }, i * 1000) // separate points by 1 second

        //     void setTimeout(() => {
        //         writeClient.flush()
        //         console.log('vvvvvvvvvvvvvvvvvvvv')
        //     }, 5000)
        // }
    }
}
