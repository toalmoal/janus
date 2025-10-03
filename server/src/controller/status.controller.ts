import { Request,
         Response }         from 'express';

import si                   from 'systeminformation';

import ServerResponse       from 'view/server-response.view';
import RandomNameGenerator  from 'utils/random-name.generator';

class StatusController {

  static uid: string = RandomNameGenerator.get();

  static formatBytes = (a, b = 2) => {
    if (0 === a)
      return "0 Bytes";
    const c = 0>b? 0: b;
    const d = Math.floor(Math.log(a) / Math.log(1024));
    return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d];
  }

  static formatSeconds = (value: number) => {
    var days = Math.floor(value / 86400); 
    var hours = Math.floor(((value % 31536000) % 86400) / 3600);
    var minutes = Math.floor((((value % 31536000) % 86400) % 3600) / 60);
    var seconds = (((value % 31536000) % 86400) % 3600) % 60;
    let formatted = '';
    if (days > 0) {
      formatted = days + " days, ";
    }
    if (hours > 0 || formatted.length > 0) {
      formatted = hours + " hours, ";
    }
    if (minutes > 0 || formatted.length > 0) {
      formatted = minutes + " minutes, ";
    }
    if (seconds > 0 || formatted.length > 0) {
      formatted = Math.floor(seconds) + " seconds";
    }
    return formatted;
}

  static get = async (request: Request, response: Response) => {
    const time = si.time();
    const status: any = {
      name: StatusController.uid,
      version: process.env.JANUS_VERSION || 'unknown',
      release_date: process.env.JANUS_RELEASE_DATE || 'unknown',
      timezone: time.timezone,
      uptime: Math.floor(process.uptime() * 1000),
      uptime_humanised: StatusController.formatSeconds(process.uptime())
    };
    const cpu = await si.cpu();
    const currentSpeed = await si.cpuCurrentSpeed();
    status.cpu = {
      manufacturer: cpu.manufacturer,
      brand: cpu.brand,
      speed: cpu.speed,
      cores: cpu.cores,
      physical_cores: cpu.physicalCores,
      processors: cpu.processors,
      current_speed: { min: currentSpeed.min, max: currentSpeed.max, avg: currentSpeed.avg }
    };
    const os = await si.osInfo();
    status.os = {
      platform: os.platform,
      distro: os.distro,
      release: os.release,
      kernel: os.kernel,
      arch: os.arch,
    };
    const mem = await si.mem();
    status.mem = {
      total: mem.total,
      total_humanised: StatusController.formatBytes(mem.total),
      free: mem.free,
      free_humanised: StatusController.formatBytes(mem.free),
      used: mem.used,
      used_humanised: StatusController.formatBytes(mem.used),
      active: mem.active,
      active_humanised: StatusController.formatBytes(mem.active),
      available: mem.available,
      available_humanised: StatusController.formatBytes(mem.available),
      buffers: mem.buffers,
      buffers_humanised: StatusController.formatBytes(mem.buffers),
      cached: mem.cached,
      cached_humanised: StatusController.formatBytes(mem.cached),
      slab: mem.slab,
      slab_humanised: StatusController.formatBytes(mem.slab),
      buffcache: mem.buffcache,
      buffcache_humanised: StatusController.formatBytes(mem.buffcache),
      swap: {
        total: mem.swaptotal,
        total_humanised: StatusController.formatBytes(mem.swaptotal),
        used: mem.swapused,
        used_humanised: StatusController.formatBytes(mem.swapused),
        free: mem.swapfree,
        free_humanised: StatusController.formatBytes(mem.swapfree)
      }
    };
    status.versions = process.versions;
    response.send(ServerResponse.success({ Status: status }));
  }

}
export default StatusController;
