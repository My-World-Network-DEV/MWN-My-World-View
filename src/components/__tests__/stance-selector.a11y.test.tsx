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

import EvidencePanel from '@/components/EvidencePanel';
import ProposalForm from '@/components/ProposalForm';

describe('Core interactive components accessibility', () => {
    it('EvidencePanel has no obvious axe violations', async () => {
        const { container } = render(<EvidencePanel header="Test" />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('ProposalForm has no obvious axe violations', async () => {
        const { container } = render(<ProposalForm onSubmit={async () => { /* noop */ }} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});


