import { products } from "../data/data";
import { ProductType } from "../types/Product";
import Input from "./ui/Input";
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
      <hr className="border-t-2 border-gray-300 w-full mb-2" />
      <div className="flex justify-center items-center text-center">
        <Input
          text="search : "
          placeholder="searching product"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
