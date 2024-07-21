import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingPage from '@/app/loading';

// Mock the PuffLoader to conditionally render based on the loading prop
jest.mock('react-spinners/PuffLoader', () => ({ color, loading, size, 'aria-label': ariaLabel, cssOverride }) => (
    loading ? <div data-testid="puff-loader" color={color} size={size} aria-label={ariaLabel} style={cssOverride} /> : null
));

describe('LoadingPage Component', () => {
    it('should display the loader when loading is true', () => {
        render(<LoadingPage loading={true} />); // Arrange
        const loaderComponent = screen.getByTestId('puff-loader'); // Act
        expect(loaderComponent).toBeInTheDocument(); // Assert
    });

    it('should not display the loader when loading is false', () => {
        render(<LoadingPage loading={false} />); // Arrange
        const loaderComponent = screen.queryByTestId('puff-loader'); // Act
        expect(loaderComponent).not.toBeInTheDocument(); // Assert
    });

    it('should have aria-label="Loading Spinner"', () => {
        render(<LoadingPage loading={true} />); // Arrange
        const loaderComponent = screen.getByLabelText('Loading Spinner'); // Act
        expect(loaderComponent).toBeInTheDocument(); // Assert
    });

    it('should have the correct size', () => {
        render(<LoadingPage loading={true} />); // Arrange
        const loaderComponent = screen.getByTestId('puff-loader'); // Act
        expect(loaderComponent).toHaveAttribute('size', '150'); // Assert
    });

    it('should have the correct color', () => {
        render(<LoadingPage loading={true} />); // Arrange
        const loaderComponent = screen.getByTestId('puff-loader'); // Act
        expect(loaderComponent).toHaveAttribute('color', '#18918b'); // Assert
    });

    it('should have the correct CSS override styles', () => {
        render(<LoadingPage loading={true} />); // Arrange
        const loaderComponent = screen.getByTestId('puff-loader'); // Act
        expect(loaderComponent).toHaveAttribute('style', 'display: block; margin: 140px auto;'); // Assert
    });
});
