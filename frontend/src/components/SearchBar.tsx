import { products } from "../data/data";
import { ProductType } from "../types/Product";
interface props {
  setProductList: React.Dispatch<React.SetStateAction<ProductType[]>>;
}
const SearchBar = ({ setProductList }: props) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm),
    );
    setProductList(filtered);
  };

  return (
    <div className="flex items-center flex-col my-3 gap-2">
      <p className="font-bold text-lg">Available Products</p>
      <div className="flex justify-center items-center text-center">
        <p className="">search : &nbsp;</p>
        <input
          type="text"
          className="rounded-xl border-2 border-gray-500 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
