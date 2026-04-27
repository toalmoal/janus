import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import express, { Express } from 'express';
import request from 'supertest';
import { StatusController } from '../../src/controller/status.controller';

describe('Status Controller', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.get('/api/status', StatusController.get);
  });

  describe('GET /api/status', () => {
    it('should return 200 status code', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);
    });

    it('should return status object with required fields', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      const body = response.body;
      
      expect(body).toHaveProperty('name');
      expect(body).toHaveProperty('version');
      expect(body).toHaveProperty('release_date');
      expect(body).toHaveProperty('timezone');
      expect(body).toHaveProperty('uptime');
      expect(body).toHaveProperty('uptime_humanised');
    });

    it('should have valid CPU information', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      const { cpu } = response.body;
      
      expect(cpu).toBeDefined();
      expect(cpu).toHaveProperty('manufacturer');
      expect(cpu).toHaveProperty('brand');
      expect(cpu).toHaveProperty('speed');
      expect(cpu).toHaveProperty('cores');
      expect(cpu).toHaveProperty('physical_cores');
      expect(cpu).toHaveProperty('processors');
      expect(cpu).toHaveProperty('current_speed');
      
      expect(cpu.current_speed).toHaveProperty('min');
      expect(cpu.current_speed).toHaveProperty('max');
      expect(cpu.current_speed).toHaveProperty('avg');
    });

    it('should have valid OS information', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      const { os } = response.body;
      
      expect(os).toBeDefined();
      expect(os).toHaveProperty('platform');
      expect(os).toHaveProperty('distro');
      expect(os).toHaveProperty('release');
      expect(os).toHaveProperty('kernel');
      expect(os).toHaveProperty('arch');
    });

    it('should have valid memory information', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      const { mem } = response.body;
      
      expect(mem).toBeDefined();
      expect(mem).toHaveProperty('total');
      expect(mem).toHaveProperty('total_humanised');
      expect(mem).toHaveProperty('free');
      expect(mem).toHaveProperty('free_humanised');
      expect(mem).toHaveProperty('used');
      expect(mem).toHaveProperty('used_humanised');
      expect(mem).toHaveProperty('active');
      expect(mem).toHaveProperty('active_humanised');
      expect(mem).toHaveProperty('available');
      expect(mem).toHaveProperty('available_humanised');
      expect(mem).toHaveProperty('swap');
      
      expect(mem.swap).toHaveProperty('total');
      expect(mem.swap).toHaveProperty('total_humanised');
      expect(mem.swap).toHaveProperty('used');
      expect(mem.swap).toHaveProperty('used_humanised');
      expect(mem.swap).toHaveProperty('free');
      expect(mem.swap).toHaveProperty('free_humanised');
    });

    it('should have valid versions information', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      const { versions } = response.body;
      
      expect(versions).toBeDefined();
      expect(typeof versions).toBe('object');
    });

    it('should have consistent name (uid) across calls', async () => {
      const response1 = await request(app).get('/api/status').expect(200);
      const response2 = await request(app).get('/api/status').expect(200);

      expect(response1.body.name).toBe(response2.body.name);
    });

    it('should have uptime as a positive number', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      expect(typeof response.body.uptime).toBe('number');
      expect(response.body.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should have valid humanised memory values', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      const { mem } = response.body;
      
      expect(typeof mem.total_humanised).toBe('string');
      expect(typeof mem.free_humanised).toBe('string');
      expect(typeof mem.used_humanised).toBe('string');
      expect(mem.total_humanised).toMatch(/\s(Bytes|KB|MB|GB|TB|PB|EB|ZB|YB)$/);
    });
  });

  describe('StatusController utilities', () => {
    it('formatBytes should format 0 as "0 Bytes"', () => {
      expect(StatusController.formatBytes(0)).toBe('0 Bytes');
    });

    it('formatBytes should format bytes correctly', () => {
      expect(StatusController.formatBytes(1024)).toBe('1 KB');
      expect(StatusController.formatBytes(1048576)).toBe('1 MB');
    });

    it('formatSeconds should format seconds only', () => {
      const result = StatusController.formatSeconds(30);
      expect(result).toBe('30 seconds');
    });

    it('formatSeconds should format minutes and seconds', () => {
      const result = StatusController.formatSeconds(90); // 1 minute 30 seconds
      expect(result).toContain('minutes');
    });

    it('formatSeconds should handle hours', () => {
      const result = StatusController.formatSeconds(3661); // 1 hour 1 minute 1 second
      expect(result).toContain('hours');
    });

    it('formatSeconds should handle days', () => {
      const result = StatusController.formatSeconds(86461); // 1 day 1 minute 1 second
      expect(result).toContain('days');
    });
  });
});
