import { expect, it, describe } from 'vitest';
import { GET as getMotionCensus } from '@/app/api/census/motion/[motionId]/route';

const makeReq = () => new Request('http://localhost');

describe('GET /api/census/motion/:motionId', () => {
  it('returns 400 when motionId missing', async () => {
    // @ts-expect-error emulate missing params
    const res = await getMotionCensus(makeReq(), { params: {} });
    expect(res.status).toBe(400);
  });
});


