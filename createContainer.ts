import * as dotenv from 'dotenv';
import * as a from 'node:child_process';

dotenv.config()

a.execSync('docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=' + process.env.DATABASE_PASSWORD + ' --name database mysql')