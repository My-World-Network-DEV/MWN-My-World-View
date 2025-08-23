import { expect, it, describe } from 'vitest';
import { POST as postStance } from '@/app/api/stance-events/route';

describe('POST /api/stance-events', () => {
  it('rejects invalid body', async () => {
    const req = new Request('http://localhost', { method: 'POST', body: JSON.stringify({}) });
    const res = await postStance(req);
    expect(res.status).toBe(400);
  });
});


