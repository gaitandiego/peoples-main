import React from 'react';
import { render, screen, waitFor, fireEvent, act, within } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router';
import HomePage from './HomePage';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
    fetchMock.resetMocks();
});

test('fetches and displays people data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([
        { id: 1, first_name: 'Juan', last_name: 'Perez', email: 'juan@example.com' },
        { id: 2, first_name: 'Diego', last_name: 'Gomez', email: 'diego@example.com' },
        { id: 3, first_name: 'Luisa', last_name: 'Martinez', email: 'luisa@example.com' },
        { id: 4, first_name: 'Jery', last_name: 'Lopez', email: 'jery@example.com' }
    ]));

    await act(async () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
    });

    const table = screen.getByRole('grid');
    expect(table).toBeInTheDocument();

    await waitFor(() => {
        const rows = within(table).getAllByRole('row');
        expect(within(rows[1]).getByText('Juan')).toBeInTheDocument();
        expect(within(rows[1]).getByText('Perez')).toBeInTheDocument();
        expect(within(rows[2]).getByText('Diego')).toBeInTheDocument();
        expect(within(rows[2]).getByText('Gomez')).toBeInTheDocument();
        expect(within(rows[3]).getByText('Luisa')).toBeInTheDocument();
        expect(within(rows[3]).getByText('Martinez')).toBeInTheDocument();
        expect(within(rows[4]).getByText('Jery')).toBeInTheDocument();
        expect(within(rows[4]).getByText('Lopez')).toBeInTheDocument();
    });
});

test('displays loading message while fetching data', async () => {
    fetchMock.mockResponseOnce(
        () => new Promise(resolve => setTimeout(() => resolve({
            body: JSON.stringify([
                { id: 1, first_name: 'Juan', last_name: 'Perez', email: 'juan@example.com' }
            ])
        }), 500))
    );

    await act(async () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
    });

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(/Loading/i)).toBeNull());
});

test('handles fetch error gracefully', async () => {
    fetchMock.mockRejectOnce(new Error('Failed to fetch'));

    await act(async () => {
        render(
            <MemoryRouter>
                <HomePage />
            </MemoryRouter>
        );
    });

    await waitFor(() => expect(screen.getByText(/Failed to fetch/i)).toBeInTheDocument());
});

