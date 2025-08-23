import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import StanceSelector from '@/components/StanceSelector';

expect.extend(toHaveNoViolations);

describe('StanceSelector accessibility', () => {
    it('has no obvious axe violations', async () => {
        const { container } = render(<StanceSelector />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});


