const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-slate-400 h-20">
      <div className="flex items-center gap-2 ms-4">
        <a href="/" className="flex items-center gap-2 ms-2">
          <img
            src="../inventory-management.png"
            alt="logo"
            className="h-12 w-12 hover:cursor-pointer"
          ></img>
        </a>
        <p className="text-2xl font-bold">Inventory Management System</p>
      </div>
    </div>
  );
};

export default Navbar;
