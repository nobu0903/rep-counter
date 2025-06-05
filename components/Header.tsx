export default function Header() {
  return (
    <header className="w-full bg-orange-500 text-white shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* ロゴ */}
        <a href="#" className="font-extrabold text-xl md:text-2xl tracking-wide text-blue-900 header__logo">筋トレ記録アプリ</a>
        {/* ナビゲーション */}
        <nav className="flex-1 flex justify-center header__nav">
          <ul className="flex gap-12 font-semibold text-blue-900">
            <li><a href="#" className="hover:underline transition px-4 py-2">ホーム</a></li>
            <li><a href="#" className="hover:underline transition px-4 py-2">記録一覧</a></li>
            <li><a href="#" className="hover:underline transition px-4 py-2">使い方</a></li>
            <li><a href="#" className="hover:underline transition px-4 py-2">お問い合わせ</a></li>
          </ul>
        </nav>
        {/* ユーザー名（仮） */}
        <div className="flex items-center header__button">
          <span className="font-bold text-blue-900 bg-white rounded px-3 py-1">ユーザー名</span>
        </div>
      </div>
    </header>
  );
}
  