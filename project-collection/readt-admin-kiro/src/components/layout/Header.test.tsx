/**
 * Header Component Tests
 * 
 * Tests for the Header component functionality:
 * - Displays system logo and title
 * - Displays user information
 * - Handles logout functionality
 * 
 * Requirements: 2.3, 1.5
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import { useAuthStore } from '@/store/authStore';

// Mock the auth store
vi.mock('@/store/authStore', () => ({
  useAuthStore: vi.fn(),
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Header Component', () => {
  const mockOnMenuToggle = vi.fn();
  const mockOnMobileMenuToggle = vi.fn();
  const mockLogout = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    mockLogout.mockResolvedValue(undefined);
  });

  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header 
          onMenuToggle={mockOnMenuToggle}
          onMobileMenuToggle={mockOnMobileMenuToggle}
        />
      </BrowserRouter>
    );
  };

  describe('Logo and Title', () => {
    it('should display system logo', () => {
      vi.mocked(useAuthStore).mockReturnValue({
        user: null,
        logout: mockLogout,
      } as any);

      renderHeader();
      
      // Check for logo (the "A" text in the blue box)
      expect(screen.getByText('A')).toBeInTheDocument();
    });

    it('should display system title', () => {
      vi.mocked(useAuthStore).mockReturnValue({
        user: null,
        logout: mockLogout,
      } as any);

      renderHeader();
      
      expect(screen.getByText('Admin System')).toBeInTheDocument();
    });
  });

  describe('User Information', () => {
    it('should display username when user is logged in', () => {
      vi.mocked(useAuthStore).mockReturnValue({
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          role: 'admin',
          status: 'active',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        logout: mockLogout,
      } as any);

      renderHeader();
      
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });

    it('should display user initials in avatar when no avatar image', () => {
      vi.mocked(useAuthStore).mockReturnValue({
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          role: 'admin',
          status: 'active',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        logout: mockLogout,
      } as any);

      renderHeader();
      
      // Should show first letter of username
      expect(screen.getByText('T')).toBeInTheDocument();
    });

    it('should display avatar image when provided', () => {
      vi.mocked(useAuthStore).mockReturnValue({
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          role: 'admin',
          status: 'active',
          avatar: 'https://example.com/avatar.jpg',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        logout: mockLogout,
      } as any);

      renderHeader();
      
      const avatar = screen.getByAltText('testuser');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });

    it('should display default text when no user is logged in', () => {
      vi.mocked(useAuthStore).mockReturnValue({
        user: null,
        logout: mockLogout,
      } as any);

      renderHeader();
      
      expect(screen.getByText('User')).toBeInTheDocument();
      expect(screen.getByText('U')).toBeInTheDocument();
    });
  });

  describe('Logout Functionality', () => {
    it('should display logout button', () => {
      vi.mocked(useAuthStore).mockReturnValue({
        user: null,
        logout: mockLogout,
      } as any);

      renderHeader();
      
      expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    });

    it('should call logout and navigate to login page when logout button is clicked', async () => {
      vi.mocked(useAuthStore).mockReturnValue({
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          role: 'admin',
          status: 'active',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        logout: mockLogout,
      } as any);

      renderHeader();
      
      const logoutButton = screen.getByRole('button', { name: /logout/i });
      await userEvent.click(logoutButton);

      await waitFor(() => {
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });
    });

    it('should navigate to login even if logout fails', async () => {
      const mockLogoutError = vi.fn().mockRejectedValue(new Error('Logout failed'));
      
      vi.mocked(useAuthStore).mockReturnValue({
        user: {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
          role: 'admin',
          status: 'active',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        logout: mockLogoutError,
      } as any);

      renderHeader();
      
      const logoutButton = screen.getByRole('button', { name: /logout/i });
      await userEvent.click(logoutButton);

      await waitFor(() => {
        expect(mockLogoutError).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });
    });
  });

  describe('Menu Toggle Buttons', () => {
    it('should call onMobileMenuToggle when mobile menu button is clicked', async () => {
      vi.mocked(useAuthStore).mockReturnValue({
        user: null,
        logout: mockLogout,
      } as any);

      renderHeader();
      
      const mobileMenuButton = screen.getByRole('button', { name: /toggle mobile menu/i });
      await userEvent.click(mobileMenuButton);

      expect(mockOnMobileMenuToggle).toHaveBeenCalledTimes(1);
    });

    it('should call onMenuToggle when desktop sidebar toggle is clicked', async () => {
      vi.mocked(useAuthStore).mockReturnValue({
        user: null,
        logout: mockLogout,
      } as any);

      renderHeader();
      
      const sidebarToggle = screen.getByRole('button', { name: /toggle sidebar/i });
      await userEvent.click(sidebarToggle);

      expect(mockOnMenuToggle).toHaveBeenCalledTimes(1);
    });
  });
});
