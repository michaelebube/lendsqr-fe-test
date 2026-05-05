import { Bell, Menu, Search } from 'lucide-react';
import { Logo } from './Logo';

type TopbarProps = {
  onMenuClick: () => void;
};

export function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="topbar">
      <button className="icon-button topbar__menu" type="button" onClick={onMenuClick} aria-label="Open navigation">
        <Menu size={22} />
      </button>
      <Logo />
      <form className="topbar__search" role="search">
        <input aria-label="Search" placeholder="Search for anything" />
        <button type="submit" aria-label="Search">
          <Search size={18} />
        </button>
      </form>
      <a className="topbar__docs" href="/dashboard">
        Docs
      </a>
      <button className="icon-button" type="button" aria-label="Notifications">
        <Bell size={20} />
      </button>
      <div className="topbar__profile">
        <img src="https://i.pravatar.cc/80?img=12" alt="Adedeji" />
        <span>Adedeji</span>
      </div>
    </header>
  );
}
