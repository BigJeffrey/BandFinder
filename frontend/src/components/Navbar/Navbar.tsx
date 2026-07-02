import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { useAuth } from '../../hooks/useAuth';

export function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand" aria-label="BandFinder">
        BandFinder
      </Link>
      <nav className="navbar__links">
        <NavLink to="/bands">Ogłoszenia</NavLink>
        {user ? (
          <>
            <NavLink to="/bands/new">Dodaj ogłoszenie</NavLink>
            <span className="navbar__user">{user.name}</span>
            <Button type="button" variant="ghost" onClick={handleLogout}>
              Wyloguj
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/login">Logowanie</NavLink>
            <NavLink to="/register">Rejestracja</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
